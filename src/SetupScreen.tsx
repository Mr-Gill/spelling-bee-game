import React, { useState, useEffect, FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GameConfig, OptionsState } from './types/game';
import type { Participant, Team } from './types/participant';
import { parseWordList } from './utils/parseWordList';
import TeamForm from './components/TeamForm';
import WordListPrompt from './components/WordListPrompt';
import useRoster from '../hooks/useRoster';
import { getRandomAvatar } from '../constants/avatars';

// Gather available music styles.
// This is hardcoded as a workaround for build tools that don't support `import.meta.glob`.
const musicStyles = ['Funk', 'Country', 'Deep Bass', 'Rock', 'Jazz', 'Classical'];

type GameMode = 'team' | 'individual';

type WordDatabase = {
  easy: any[];
  medium: any[];
  tricky: any[];
};

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
  onAddCustomWords: (words: any[]) => void;
  onViewAchievements: () => void;
  onViewHistory: () => void;
  onViewShop?: () => void;
}

// Using direct paths to assets in the public directory
const beeImg = `${process.env.PUBLIC_URL}/img/HelpBee.png`;
const bookImg = `${process.env.PUBLIC_URL}/img/avatars/book.svg`;
const trophyImg = `${process.env.PUBLIC_URL}/img/avatars/trophy.svg`;

// Available avatars for participants
const availableAvatars = [beeImg, bookImg, trophyImg];

const SetupScreen: FC<SetupScreenProps> = ({ onStartGame, onAddCustomWords, onViewAchievements, onViewHistory }) => {

  const [gameMode, setGameMode] = useState<GameMode>('team');
  const [startingLives, setStartingLives] = useState(10);

  const [optionsState, setOptionsState] = useState<OptionsState>({
    gameMode: 'individual',
    audioEnabled: true,
    soundEffectsEnabled: true,
    soundEnabled: true,
    effectsEnabled: true,
    musicStyle: 'default',
    musicVolume: 0.5,
    initialDifficulty: 1,
    progressionSpeed: 1,
    wordSource: 'curriculum',
    skipPenaltyType: 'points',
    skipPenaltyValue: 0,
    timerDuration: 60,
    teacherMode: false,
    theme: 'light',
    musicEnabled: true,
    startingLives: 3
  });

  const createParticipant = (name: string, teamId?: string, avatar: string = availableAvatars[Math.floor(Math.random() * availableAvatars.length)]): Participant => {
    return {
      id: uuidv4(),
      name,
      teamId: teamId ?? null,
      avatar,
      score: 0,
      lives: optionsState.initialDifficulty,
      difficultyLevel: 1,
      points: 0,
      streak: 0,
      attempted: 0,
      correct: 0,
      incorrect: 0,
      wordsAttempted: 0,
      wordsCorrect: 0
    };
  };

  const createTeam = (name: string, avatar: string = availableAvatars[Math.floor(Math.random() * availableAvatars.length)]): Team => {
    return {
      id: uuidv4(),
      name,
      participants: [],
      teamId: uuidv4(),
      avatar,
      score: 0,
      lives: startingLives,
      difficulty: 'easy',
      wordsAttempted: 0,
      wordsCorrect: 0,
      streak: 0,
      skipsRemaining: 3,
      askFriendRemaining: 2,
      achievements: [],
      points: 0,
      difficultyLevel: 0,
      attempted: 0,
      correct: 0,
      students: []
    };
  };

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [teams, setTeams] = useState<Team[]>([
    {
      id: uuidv4(),
      name: "",
      participants: [],
      teamId: uuidv4(),
      avatar: availableAvatars[Math.floor(Math.random() * availableAvatars.length)],
      score: 0,
      lives: startingLives,
      difficulty: 'easy',
      wordsAttempted: 0,
      wordsCorrect: 0,
      streak: 0,
      skipsRemaining: 3,
      askFriendRemaining: 2,
      achievements: [],
      points: 0,
      difficultyLevel: 0,
      attempted: 0,
      correct: 0,
      students: []
    }
  ]);

  const handleAddParticipant = (name: string, teamId?: string) => {
    if (name.trim() === '') return null;
    
    const newParticipant: Participant = createParticipant(name, teamId);
    
    setParticipants(prev => [...prev, newParticipant]);
    return newParticipant;
  };

  const removeTeamByIndex = (index: number) => {
    setTeams(prev => prev.filter((_, i) => i !== index));
  };

  const updateTeamNameByIndex = (index: number, name: string) => {
    setTeams(prev => {
      const newTeams = [...prev];
      newTeams[index] = { ...newTeams[index], name };
      return newTeams;
    });
  };

  const addBulkStudents = (students: Participant[]) => {
    setParticipants(prev => [...prev, ...students]);
  };

  const updateStudentName = (id: string, name: string) => {
    setParticipants(prev => 
      prev.map(p => p.id === id ? { ...p, name } : p)
    );
  };

  const addParticipantToRoster = (participant: Participant) => {
    setParticipants(prev => [...prev, participant]);
  };

  const addTeam = (team: Team) => {
    setTeams([...teams, team]);
  };

  const removeTeam = (id: string) => {
    setTeams(teams.filter(t => t.id !== id));
  };

  const updateTeam = (id: string, updates: Partial<Team>) => {
    setTeams(teams.map(t => t.id === id ? {...t, ...updates} : t));
  };

  const [timerDuration, setTimerDuration] = useState(30);
  const [customWordListText, setCustomWordListText] = useState('');
  const [parsedCustomWords, setParsedCustomWords] = useState<any[]>([]);
  const [missedWordsCollection, setMissedWordsCollection] = useState<Record<string, any[]>>({});
  const [includeMissedWords, setIncludeMissedWords] = useState(false);
  const [error, setError] = useState('');
  const bundledWordLists = [
    { label: 'Example JSON', file: 'example.json' },
    { label: 'Example CSV', file: 'example.csv' },
    { label: 'Example TSV', file: 'example.tsv' }
  ];
  const [selectedBundledList, setSelectedBundledList] = useState('');
  const [studentName, setStudentName] = useState<string | undefined>('');
  const [bulkStudentText, setBulkStudentText] = useState('');
  const [randomTeamCount, setRandomTeamCount] = useState(0);
  const [randomTeamSize, setRandomTeamSize] = useState(0);
  const [randomizeError, setRandomizeError] = useState('');
  const [skipPenaltyType, setSkipPenaltyType] = useState<'lives' | 'points'>('lives');
  const [skipPenaltyValue, setSkipPenaltyValue] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => localStorage.getItem('soundEnabled') !== 'false');
  const [musicStyle, setMusicStyle] = useState<string>(() => localStorage.getItem('musicStyle') ?? 'Funk');
  const [musicVolume, setMusicVolume] = useState<number>(() => parseFloat(localStorage.getItem('musicVolume') ?? '1'));
  const [initialDifficulty, setInitialDifficulty] = useState(0);
  const [progressionSpeed, setProgressionSpeed] = useState(1);
  const [theme, setTheme] = useState('light');
  const [teacherMode, setTeacherMode] = useState<boolean>(() => localStorage.getItem('teacherMode') === 'true');
  const [aiGrade, setAiGrade] = useState(5);
  const [aiTopic, setAiTopic] = useState('');
  const [aiCount, setAiCount] = useState(10);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<string>(() => localStorage.getItem('selectedVoice') ?? '');

  const applyTheme = (t: string) => {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-honeycomb');
    document.body.classList.add(`theme-${t}`);
  };

  useEffect(() => {
    if (teacherMode) {
      document.body.classList.add('teacher-mode');
    } else {
      document.body.classList.remove('teacher-mode');
    }
    try {
      localStorage.setItem('teacherMode', String(teacherMode));
    } catch (error) {
      console.error('Failed to save teacherMode to localStorage', error);
    }
  }, [teacherMode]);

  useEffect(() => {
    setStartingLives(gameMode === 'team' ? 10 : 5);
  }, [gameMode]);

  useEffect(() => {
    setOptionsState(o => ({ ...o, gameMode }));
  }, [gameMode]);
  
  useEffect(() => {
    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) try { setTeams(JSON.parse(savedTeams).map((t: Team) => ({ ...t, avatar: t.avatar || availableAvatars[Math.floor(Math.random() * availableAvatars.length)] }))); } catch {}
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) try { setParticipants(JSON.parse(savedStudents).map((s: Participant) => ({ ...s, avatar: s.avatar || availableAvatars[Math.floor(Math.random() * availableAvatars.length)] }))); } catch {}
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme(theme);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('soundEnabled', String(soundEnabled));
    } catch (error) {
      console.error('Failed to save soundEnabled to localStorage', error);
    }
  }, [soundEnabled]);
  useEffect(() => {
    try {
      localStorage.setItem('musicStyle', musicStyle);
    } catch (error) {
      console.error('Failed to save musicStyle to localStorage', error);
    }
  }, [musicStyle]);
  useEffect(() => {
    try {
      localStorage.setItem('musicVolume', String(musicVolume));
    } catch (error) {
      console.error('Failed to save musicVolume to localStorage', error);
    }
  }, [musicVolume]);
  useEffect(() => {
    if (selectedVoice) {
      try {
        localStorage.setItem('selectedVoice', selectedVoice);
      } catch (error) {
        console.error('Failed to save selectedVoice to localStorage', error);
      }
    } else {
      try {
        localStorage.removeItem('selectedVoice');
      } catch (error) {
        console.error('Failed to remove selectedVoice from localStorage', error);
      }
    }
  }, [selectedVoice]);

  const updateTeams = () => {
    const updatedTeams = teams.map(team => ({
      ...team,
      participants: team.participants.map((p: string | Participant) => typeof p === 'string' ? p : p.id)
    }));
    setTeams(updatedTeams);
  };

  const updateStudents = (newStudents: Participant[]) => {
    setParticipants(newStudents);
    try {
      localStorage.setItem('students', JSON.stringify(newStudents, getCircularReplacer()));
    } catch (error) {
      console.error('Failed to save students to localStorage', error);
    }
  };

  useEffect(() => {
    if (gameMode === 'team') {
      updateTeams();
    } else {
      updateStudents(participants.map(s => ({ ...s, lives: startingLives })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startingLives, gameMode]);

  const clearRoster = () => {
    try {
      localStorage.removeItem('teams');
    } catch (error) {
      console.error('Failed to remove teams from localStorage', error);
    }
    try {
      localStorage.removeItem('students');
    } catch (error) {
      console.error('Failed to remove students from localStorage', error);
    }
    setTeams([]);
    setParticipants([]);
  };

  const addStudent = () => {
    if (studentName?.trim()) {
      const newStudent = createParticipant(studentName);
      setParticipants(prev => [...prev, newStudent]);
      setStudentName('');
    }
  };

  const removeStudent = (index: number) => {
    setParticipants(prev => prev.filter((_, i) => i !== index));
  };

  const randomizeTeams = () => {
    if (participants.length < 2) {
      setRandomizeError('Add at least two students to create teams.');
      return;
    }
    let count = 0;
    if (randomTeamCount > 0) {
      count = randomTeamCount;
    } else if (randomTeamSize > 0) {
      count = Math.ceil(participants.length / randomTeamSize);
    }
    if (count <= 0) {
      setRandomizeError('Specify number of teams or team size.');
      return;
    }
    const shuffled = [...participants];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const groups: Participant[][] = Array.from({ length: count }, () => []);
    shuffled.forEach((student, idx) => {
      groups[idx % count].push(student);
    });
    const newTeams = groups
      .filter(group => group.length > 0)
      .map((group, index) => {
        const teamName = `Team ${index + 1}: ${group.map(s => s.name).join(', ')}`;
        const participant = createParticipant(teamName);
        participant.avatar = teams[index]?.avatar || participant.avatar;
        return participant;
      });
    updateTeams(newTeams);
    setRandomizeError('');
  };
  
  const parseCustomWordList = (content: string) => {
    try {
      const words = parseWordList(content);
      setParsedCustomWords(words);
      setError('');
    } catch (e: any) {
      setError(e.message || 'Invalid word list format.');
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const content = e.target?.result as string;
        setCustomWordListText(content);
      };
      reader.readAsText(file);
    }
  };

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (_key: string, value: any) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  const generateAIWords = async () => {
    setAiLoading(true);
    setAiError('');
    try {
      const res = await fetch('http://localhost:3001/wordlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade: aiGrade, topic: aiTopic, count: aiCount }),
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid response');
      setParsedCustomWords(prev => [...prev, ...data]);
    } catch (err) {
      console.error('Failed to generate AI word list', err);
      setAiError('Failed to generate words.');
    } finally {
      setAiLoading(false);
    }
  };
  
  useEffect(() => {
    if (selectedBundledList) {
      fetch(`wordlists/${selectedBundledList}`)
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.text();
        })
        .then(text => {
          setCustomWordListText(text);
          setError('');
        })
        .catch(err => {
          console.error('Failed to load bundled word list', err);
          setError('Failed to load bundled word list.');
        });
    }
  }, [selectedBundledList]);

  useEffect(() => {
    if (customWordListText) {
      parseCustomWordList(customWordListText);
    }
  }, [customWordListText]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('missedWordsCollection') || '{}');
    setMissedWordsCollection(stored);
  }, []);

  const missedWordCount = Object.values(missedWordsCollection).reduce((acc, arr) => acc + arr.length, 0);

  const handleStart = async (isSessionChallenge = false) => {
    if (!optionsState) return;

    let challengeWords: any[] = [];
    if (isSessionChallenge) {
      try {
        const randomList = bundledWordLists[Math.floor(Math.random() * bundledWordLists.length)];
        const response = await fetch(`wordlists/${randomList.file}`);
        const text = await response.text();
        challengeWords = parseWordList(text);
      } catch (err) {
        console.error('Failed to load session challenge words', err);
        setError('Failed to load session challenge words.');
        return;
      }
    }

    let finalParticipants: Participant[];
    if (gameMode === 'team') {
        const trimmedTeams = teams.filter(team => team.name && team.name.trim() !== "");
        if (trimmedTeams.length < 2) {
            setError('Please add at least two teams with names.');
            return;
        }
        finalParticipants = trimmedTeams.map(t => ({...t, difficultyLevel: optionsState.initialDifficulty}));
    } else {
        const trimmedStudents = participants.filter(student => student.name && student.name.trim() !== "");
        if (trimmedStudents.length < 1 && isSessionChallenge) {
             finalParticipants = [createParticipant('Player 1', undefined)];
        } else if (trimmedStudents.length < 2 && !isSessionChallenge) {
            setError('Please add at least two students for a custom game.');
            return;
        } else {
             finalParticipants = trimmedStudents.map(s => ({...s, difficultyLevel: optionsState.initialDifficulty}));
        }
    }

    setError('');
    
    let finalWords: any[] = isSessionChallenge ? challengeWords : parsedCustomWords;
    if (includeMissedWords && !isSessionChallenge) {
      const extraWords = Object.values(missedWordsCollection).flat();
      finalWords = [...finalWords, ...extraWords];
    }
    
    const config: GameConfig = {
      teams: gameMode === 'team' ? teams : [],
      participants: gameMode === 'individual' ? participants : [],
      options: {
        audioEnabled: optionsState.audioEnabled,
        soundEffectsEnabled: optionsState.soundEffectsEnabled,
        wordSource: optionsState.wordSource,
        timerDuration: optionsState.timerDuration,
        startingLives
      }
    };
    onStartGame(config);
  };

  const handleOptionChange = (option: keyof OptionsState, value: any) => {
    setOptionsState(prev => ({
      ...prev,
      [option]: value,
    }));
  };

  const [activeTab, setActiveTab] = useState<'setup' | 'settings' | 'words'>('setup');

  return (
    <div className="min-h-screen p-4 md:p-8 bg-surface text-on-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex flex-col items-center mb-4">
            <div className="mb-2">
              <img 
                src={`${process.env.PUBLIC_URL}/img/HelpBee.png`} 
                alt="Bee mascot" 
                className="w-16 h-16 md:w-20 md:h-20 mx-auto"
                onError={(e) => e.currentTarget.src = `${process.env.PUBLIC_URL}/img/DefaultBee.png`}
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary font-sans tracking-wide">
              Spelling Bee Championship
            </h1>
          </div>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
            Get ready to spell your way to victory!
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 border-b border-outline-variant">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'setup' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant'}`}
            onClick={() => setActiveTab('setup')}
          >
            Game Setup
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'settings' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'words' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant'}`}
            onClick={() => setActiveTab('words')}
          >
            Word List
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-surface-container-high rounded-xl p-6 mb-8 shadow-elevation-1">
          {activeTab === 'setup' && (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 uppercase font-sans">Select Game Mode</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => setGameMode('team')} 
                    className={`px-6 py-3 rounded-full text-lg font-bold transition-all ${gameMode === 'team' ? 'bg-primary text-on-primary shadow-elevation-1' : 'bg-secondary-container text-on-secondary-container hover:shadow-elevation-1'}`}
                  >
                    Team Mode
                  </button>
                  <button 
                    onClick={() => setGameMode('individual')} 
                    className={`px-6 py-3 rounded-full text-lg font-bold transition-all ${gameMode === 'individual' ? 'bg-primary text-on-primary shadow-elevation-1' : 'bg-secondary-container text-on-secondary-container hover:shadow-elevation-1'}`}
                  >
                    Individual Mode
                  </button>
                </div>
              </div>
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 uppercase font-sans">
                  {gameMode === 'team' ? 'Teams' : 'Students'}
                </h2>
                {gameMode === 'team' ? (
                  <TeamForm
                    teams={teams}
                    avatars={availableAvatars}
                    addTeam={() => addTeam(createTeam(''))}
                    removeTeam={removeTeamByIndex}
                    updateTeamName={updateTeamNameByIndex}
                  />
                ) : (
                  <>
                    <div className="flex gap-4 mb-4">
                      <input 
                        type="text" 
                        value={studentName} 
                        onChange={e => setStudentName(e.target.value)} 
                        className="flex-grow p-3 rounded-lg bg-surface-container-high text-on-surface placeholder:text-on-surface-variant" 
                        placeholder="Student name" 
                      />
                      <button 
                        onClick={addStudent} 
                        className="bg-primary-container text-on-primary-container px-4 py-3 rounded-lg font-bold hover:shadow-elevation-1"
                      >
                        Add
                      </button>
                    </div>
                    <div className="mb-4">
                      <textarea 
                        value={bulkStudentText} 
                        onChange={e => setBulkStudentText(e.target.value)} 
                        className="w-full p-3 rounded-lg bg-surface-container-high text-on-surface placeholder:text-on-surface-variant mb-2" 
                        placeholder="Paste names, one per line or separated by commas" 
                        rows={4}
                      ></textarea>
                      <button 
                        onClick={() => addBulkStudents(bulkStudentText.split('\n').map(name => createParticipant(name, undefined)))} 
                        className="bg-primary-container text-on-primary-container px-4 py-3 rounded-lg font-bold hover:shadow-elevation-1"
                      >
                        Add Names
                      </button>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">Randomize Teams</h3>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <input type="number" min={1} value={randomTeamCount || ''} onChange={e => { setRandomTeamCount(Number(e.target.value)); setRandomTeamSize(0); }} placeholder="Number of teams" className="p-2 rounded-md bg-surface-variant text-on-surface flex-grow" />
                        <span>or</span>
                        <input type="number" min={1} value={randomTeamSize || ''} onChange={e => { setRandomTeamSize(Number(e.target.value)); setRandomTeamCount(0); }} placeholder="Team size" className="p-2 rounded-md bg-surface-variant text-on-surface flex-grow" />
                        <button onClick={randomizeTeams} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Randomize</button>
                      </div>
                      {randomizeError && <p className="text-red-300">{randomizeError}</p>}
                    </div>
                    {participants.map((student) => (
                      <div key={student.id} className="flex items-center gap-2 mb-2">
                        <img 
                          src={student.avatar || `${process.env.PUBLIC_URL}/img/DefaultBee.png`} 
                          alt="avatar" 
                          className="w-8 h-8 rounded-full" 
                          onError={(e) => e.currentTarget.src = `${process.env.PUBLIC_URL}/img/DefaultBee.png`}
                        />
                        <input 
                          type="text" 
                          value={student.name} 
                          onChange={e => updateStudentName(student.id, e.target.value)} 
                          placeholder="Student name" 
                          className="flex-grow p-3 rounded-lg bg-surface-container-high text-on-surface" 
                        />
                        {participants.length > 1 && (
                          <button 
                            onClick={() => removeStudent(participants.findIndex(s => s.id === student.id))} 
                            className="px-3 py-1 bg-error-container text-on-error-container hover:shadow-elevation-1 rounded-lg"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                )}
                <button onClick={clearRoster} className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Clear Saved Roster</button>
              </div>
            </>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-surface-container-low p-6 rounded-xl shadow-elevation-1">
                <h2 className="text-2xl font-bold mb-4 uppercase font-sans">Skip Penalty ⏭️</h2>
                <div className="flex gap-4">
                  <select 
                    value={optionsState.skipPenaltyType} 
                    onChange={e => handleOptionChange('skipPenaltyType', e.target.value)} 
                    className="p-2 rounded-lg bg-surface-container-high text-on-surface"
                  >
                    <option value="lives">Lives</option>
                    <option value="points">Points</option>
                  </select>
                  <input 
                    type="number" 
                    min={0} 
                    value={optionsState.skipPenaltyValue} 
                    onChange={e => handleOptionChange('skipPenaltyValue', Number(e.target.value))} 
                    className="p-2 rounded-lg bg-surface-container-high text-on-surface w-24" 
                  />
                </div>
              </div>
              <div className="bg-surface-container-low p-6 rounded-xl shadow-elevation-1">
                <h2 className="text-2xl font-bold mb-4 uppercase font-sans">Difficulty Settings 🎚️</h2>
                <div className="flex gap-4">
                  <div>
                    <label className="block mb-2">Initial Difficulty</label>
                    <select value={optionsState.initialDifficulty} onChange={e => handleOptionChange('initialDifficulty', Number(e.target.value))} className="p-2 rounded-lg bg-surface-container-high text-on-surface">
                      <option value={0}>Easy</option>
                      <option value={1}>Medium</option>
                      <option value={2}>Tricky</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2">Progression Speed</label>
                    <input type="number" min={1} value={optionsState.progressionSpeed} onChange={e => handleOptionChange('progressionSpeed', Number(e.target.value))} className="p-2 rounded-lg bg-surface-container-high text-on-surface w-24" />
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low p-6 rounded-xl shadow-elevation-1">
                <h2 className="text-2xl font-bold mb-4 uppercase font-sans">Audio & Effects 🔊✨</h2>
                <label className="flex items-center space-x-3 mb-2"><input type="checkbox" checked={optionsState.soundEnabled} onChange={e => handleOptionChange('soundEnabled', e.target.checked)} /><span>Enable Sound</span></label>
                <label className="flex items-center space-x-3"><input type="checkbox" checked={optionsState.effectsEnabled} onChange={e => handleOptionChange('effectsEnabled', e.target.checked)} /><span>Enable Visual Effects</span></label>
              </div>
              <div className="bg-surface-container-low p-6 rounded-xl shadow-elevation-1">
                <h2 className="text-2xl font-bold mb-4 uppercase font-sans">Theme 🎨</h2>
                <select value={theme} onChange={e => { const t = e.target.value; setTheme(t); try { localStorage.setItem('theme', t); } catch (error) { console.error('Failed to save theme to localStorage', error); } applyTheme(t); }} className="p-2 rounded-lg bg-surface-container-high text-on-surface">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="honeycomb">Honeycomb</option>
                </select>
              </div>
              <div className="bg-surface-container-low p-6 rounded-xl shadow-elevation-1">
                <h2 className="text-2xl font-bold mb-4 uppercase font-sans">Teacher Mode 👩‍🏫</h2>
                <label className="flex items-center gap-2 text-on-surface"><input type="checkbox" checked={teacherMode} onChange={e => setTeacherMode(e.target.checked)} /><span>Enable larger fonts and spacing</span></label>
              </div>
               <div className="bg-surface-container-low p-6 rounded-xl shadow-elevation-1">
                <h2 className="text-2xl font-bold mb-4 uppercase font-sans">Music 🎵</h2>
                <div className="mb-4">
                  <label className="block mb-2">Style</label>
                  <select value={optionsState.musicStyle} onChange={e => handleOptionChange('musicStyle', e.target.value)} className="p-2 rounded-lg bg-surface-container-high text-on-surface">
                    {musicStyles.map(style => (<option key={style} value={style}>{style}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Volume: {Math.round(optionsState.musicVolume * 100)}%</label>
                  <input type="range" min={0} max={1} step={0.01} value={optionsState.musicVolume} onChange={e => handleOptionChange('musicVolume', parseFloat(e.target.value))} className="w-full" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'words' && (
            <div>
              <h2 className="text-xl font-bold mb-4 uppercase font-sans">Word List</h2>
              <div className="mb-6">
                <label htmlFor="bundled-list" className="block text-lg font-medium mb-2 text-on-surface">Choose Bundled Word List</label>
                <select 
                  id="bundled-list" 
                  value={selectedBundledList} 
                  onChange={e => setSelectedBundledList(e.target.value)} 
                  className="w-full p-3 rounded-lg bg-surface-container-high text-on-surface"
                >
                  <option value="">-- Select a list --</option>
                  {bundledWordLists.map(list => (<option key={list.file} value={list.file}>{list.label}</option>))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="file-upload" className="block text-lg font-medium mb-2 text-on-surface">Upload File</label>
                  <p className="text-sm text-on-surface-variant mb-2">Upload a JSON or TSV file.</p>
                  <input 
                    id="file-upload" 
                    type="file" 
                    accept=".json,.tsv,.txt,.csv" 
                    onChange={handleFileChange} 
                    className="block w-full text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-tertiary-container file:text-on-tertiary-container hover:file:bg-tertiary" 
                  />
                </div>
                <div>
                  <label htmlFor="paste-area" className="block text-lg font-medium mb-2 text-on-surface">Or Paste Spreadsheet Data</label>
                  <p className="text-sm text-on-surface-variant mb-2">Paste data from Excel or Google Sheets (tab-separated).</p>
                  <textarea 
                    id="paste-area" 
                    rows={4} 
                    value={customWordListText} 
                    onChange={e => setCustomWordListText(e.target.value)} 
                    className="w-full p-3 rounded-lg bg-surface-container-high text-on-surface placeholder:text-on-surface-variant" 
                    placeholder="Paste your tab-separated values here..."
                  ></textarea>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex flex-col md:flex-row gap-2 mb-2">
                  <input type="number" min={1} value={aiGrade} onChange={e => setAiGrade(Number(e.target.value))} className="p-2 rounded-md bg-surface-variant text-on-surface w-full md:w-24" placeholder="Grade" />
                  <input type="number" min={1} value={aiCount} onChange={e => setAiCount(Number(e.target.value))} className="p-2 rounded-md bg-surface-variant text-on-surface w-full md:w-24" placeholder="# Words" />
                  <button onClick={generateAIWords} disabled={aiLoading} className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded w-full md:w-auto">{aiLoading ? 'Generating...' : 'Generate with AI'}</button>
                </div>
                <WordListPrompt value={aiTopic} onChange={setAiTopic} />
                {aiError && <p className="text-red-300 mt-2">{aiError}</p>}
              </div>
              <div className="mt-4 text-sm text-on-surface-variant">
                <p>
                  <strong>Format:</strong> The first row should be headers: `word`, `syllables`, `definition`, `origin`, `example`,
                  `prefix`, `suffix`, `pronunciation`.
                </p>
                <a
                  href="wordlists/example.csv"
                  download
                  className="inline-block bg-green-500 hover:bg-green-600 text-on-surface px-4 py-2 rounded mt-2"
                >
                  Download Template
                </a>
              </div>
            </div>
          )}
        </div>

        {missedWordCount > 0 && (
          <div className="bg-surface-variant p-4 rounded-lg mb-8">
            <label className="flex items-center space-x-3">
              <input type="checkbox" checked={includeMissedWords} onChange={e => setIncludeMissedWords(e.target.checked)} />
              <span>Include {missedWordCount} missed words from previous sessions</span>
            </label>
          </div>
        )}

        {error && <p className="text-red-300 text-center mb-4">{error}</p>}
        
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <button onClick={() => handleStart(false)} className="w-full bg-primary hover:bg-primary-pressed text-on-primary px-6 py-4 rounded-xl text-2xl font-bold">Start Custom Game</button>
          <button onClick={() => handleStart(true)} className="w-full bg-orange-500 hover:bg-orange-600 text-on-surface px-6 py-4 rounded-xl text-2xl font-bold">Start Session Challenge</button>
        </div>
        <div className="mt-4 text-center flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onViewAchievements}
            className="bg-purple-500 hover:bg-purple-600 text-on-surface px-6 py-3 rounded-xl text-xl font-bold"
          >
            View Achievements
          </button>
          <button
            onClick={onViewHistory}
            className="bg-blue-500 hover:bg-blue-600 text-on-surface px-6 py-3 rounded-xl text-xl font-bold"
          >
            View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
