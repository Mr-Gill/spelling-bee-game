import React, { useState, useEffect } from 'react';
import { GameConfig, Word, Participant, OptionsState } from './types';
import { parseWordList } from './utils/parseWordList';
import BookSvg from './img/avatars/book.svg?component';
import TeamForm from './components/TeamForm';
import StudentRoster from './components/StudentRoster';
import GameOptions from './components/GameOptions';

// Gather available music styles.
// This is hardcoded as a workaround for build tools that don't support `import.meta.glob`.
const musicStyles = ['Funk', 'Country', 'Deep Bass', 'Rock', 'Jazz', 'Classical'];

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
  onAddCustomWords: (words: Word[]) => void;
  onViewAchievements: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame, onAddCustomWords, onViewAchievements }) => {
  const avatars = [BookSvg];
  const getRandomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)];

  const [gameMode, setGameMode] = useState<'team' | 'individual'>('team');
  const [startingLives, setStartingLives] = useState(10);
  const [timerDuration, setTimerDuration] = useState(60);

  const getDefaultTeams = (): Participant[] => [
    { name: 'Team Alpha', lives: startingLives, difficultyLevel: 0, points: 0, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar() },
    { name: 'Team Beta', lives: startingLives, difficultyLevel: 0, points: 0, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar() }
  ];

  const [teams, setTeams] = useState<Participant[]>(getDefaultTeams());
  const [students, setStudents] = useState<Participant[]>([]);
  const [studentName, setStudentName] = useState('');
  const [bulkStudentText, setBulkStudentText] = useState('');
  const [bulkStudentError, setBulkStudentError] = useState('');
  const [randomTeamCount, setRandomTeamCount] = useState(0);
  const [randomTeamSize, setRandomTeamSize] = useState(0);
  const [randomizeError, setRandomizeError] = useState('');
  const [skipPenaltyType, setSkipPenaltyType] = useState<'lives' | 'points'>('lives');
  const [skipPenaltyValue, setSkipPenaltyValue] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => localStorage.getItem('soundEnabled') !== 'false');
  const [effectsEnabled, setEffectsEnabled] = useState(true);
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
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>(() => localStorage.getItem('selectedVoice') ?? '');

  const [options, setOptions] = useState<OptionsState>({
    soundEnabled: true,
    musicEnabled: true,
    musicStyle: 'country',
    musicVolume: 0.5,
    teacherMode: false,
    skipPenaltyType: 'lives',
    skipPenaltyValue: 1,
    initialDifficulty: 0,
    progressionSpeed: 1,
    effectsEnabled: true,
    theme: 'light'
  });

  const [customWordListText, setCustomWordListText] = useState('');
  const [parsedCustomWords, setParsedCustomWords] = useState<Word[]>([]);
  const [error, setError] = useState('');
  const [selectedBundledList, setSelectedBundledList] = useState('');
  const [missedWordsCollection, setMissedWordsCollection] = useState<Record<string, Word[]>>({});
  const [includeMissedWords, setIncludeMissedWords] = useState(false);
  const [bundledWordLists, setBundledWordLists] = useState([
    { file: 'example.json', label: 'Example List' },
    { file: 'words.json', label: 'Standard Words' }
  ]);

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
    localStorage.setItem('teacherMode', String(teacherMode));
  }, [teacherMode]);

  useEffect(() => {
    setStartingLives(gameMode === 'team' ? 10 : 5);
  }, [gameMode]);
  
  useEffect(() => {
    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) try { setTeams(JSON.parse(savedTeams).map((t: Participant) => ({ ...t, avatar: t.avatar || getRandomAvatar() }))); } catch {}
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) try { setStudents(JSON.parse(savedStudents).map((s: Participant) => ({ ...s, avatar: s.avatar || getRandomAvatar() }))); } catch {}
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme(theme);
    }
  }, []);

  useEffect(() => localStorage.setItem('soundEnabled', String(soundEnabled)), [soundEnabled]);
  useEffect(() => localStorage.setItem('musicStyle', musicStyle), [musicStyle]);
  useEffect(() => localStorage.setItem('musicVolume', String(musicVolume)), [musicVolume]);
  useEffect(() => {
    if (selectedVoice) {
      localStorage.setItem('selectedVoice', selectedVoice);
    } else {
      localStorage.removeItem('selectedVoice');
    }
  }, [selectedVoice]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const updateTeams = (newTeams: Participant[]) => {
    setTeams(newTeams);
    localStorage.setItem('teams', JSON.stringify(newTeams));
  };

  const updateStudents = (newStudents: Participant[]) => {
    setStudents(newStudents);
    localStorage.setItem('students', JSON.stringify(newStudents));
  };

  useEffect(() => {
    if (gameMode === 'team') {
      updateTeams(teams.map(t => ({ ...t, lives: startingLives })));
    } else {
      updateStudents(students.map(s => ({ ...s, lives: startingLives })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startingLives, gameMode]);

  const clearRoster = () => {
    localStorage.removeItem('teams');
    localStorage.removeItem('students');
    setTeams(getDefaultTeams());
    setStudents([]);
  };

  const createParticipant = (name: string, difficulty: number): Participant => ({
    name: name.trim(), lives: startingLives, points: 0, difficultyLevel: difficulty, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar()
  });

  const addTeam = (): void => {
    if (!teams || !setTeams || !createParticipant || !options) return;
    setTeams([...teams, createParticipant('New Team', options.initialDifficulty)]);
  };

  const randomizeTeams = () => {
    if (students.length < 2) {
      setRandomizeError('Add at least two students to create teams.');
      return;
    }
    let count = 0;
    if (randomTeamCount > 0) {
      count = randomTeamCount;
    } else if (randomTeamSize > 0) {
      count = Math.ceil(students.length / randomTeamSize);
    }
    if (count <= 0) {
      setRandomizeError('Specify number of teams or team size.');
      return;
    }
    const shuffled = [...students];
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
        const participant = createParticipant(teamName, initialDifficulty);
        participant.avatar = teams[index]?.avatar || participant.avatar;
        return participant;
      });
    updateTeams(newTeams);
    setRandomizeError('');
  };
  
  const parseWordList = (content: string): Word[] => {
    try {
      return parseWordList(content);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid word list format');
      return [];
    }
  };
  
  const handleParseWordList = (content: string) => {
    const words = parseWordList(content);
    setParsedCustomWords(words);
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
      handleParseWordList(customWordListText);
    }
  }, [customWordListText]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('missedWordsCollection') || '{}');
    setMissedWordsCollection(stored);
  }, []);

  const missedWordCount = Object.values(missedWordsCollection).reduce((acc, arr) => acc + arr.length, 0);

  const handleStart = async (isSessionChallenge = false) => {
    let challengeWords: Word[] = [];
    if (isSessionChallenge) {
      try {
        const randomList = bundledWordLists[Math.floor(Math.random() * bundledWordLists.length)];
        const response = await fetch(`wordlists/${randomList.file}`);
        const text = await response.text();
        challengeWords = JSON.parse(text);
      } catch (err) {
        console.error('Failed to load session challenge words', err);
        setError('Failed to load session challenge words.');
        return;
      }
    }

    let finalParticipants: Participant[];
    if (gameMode === 'team') {
        const trimmedTeams = teams.filter(team => team.name.trim() !== "");
        if (trimmedTeams.length < 2) {
            setError('Please add at least two teams with names.');
            return;
        }
        finalParticipants = trimmedTeams.map(t => ({...t, difficultyLevel: options.initialDifficulty}));
    } else {
        const trimmedStudents = students.filter(student => student.name.trim() !== "");
        if (trimmedStudents.length < 1 && isSessionChallenge) {
             finalParticipants = [createParticipant('Player 1', options.initialDifficulty)];
        } else if (trimmedStudents.length < 2 && !isSessionChallenge) {
            setError('Please add at least two students for a custom game.');
            return;
        } else {
             finalParticipants = trimmedStudents.map(s => ({...s, difficultyLevel: options.initialDifficulty}));
        }
    }

    setError('');
    
    let finalWords: Word[] = isSessionChallenge ? challengeWords : parsedCustomWords;
    if (includeMissedWords && !isSessionChallenge) {
      const extraWords = Object.values(missedWordsCollection).flat();
      finalWords = [...finalWords, ...extraWords];
    }
    
    onAddCustomWords(finalWords);
    
    const config: GameConfig = {
      participants: finalParticipants,
      gameMode,
      timerDuration,
      skipPenaltyType: options.skipPenaltyType,
      skipPenaltyValue: options.skipPenaltyValue,
      soundEnabled: options.soundEnabled,
      effectsEnabled: options.effectsEnabled,
      difficultyLevel: options.initialDifficulty,
      progressionSpeed: options.progressionSpeed,
      musicStyle: options.musicStyle,
      musicVolume: options.musicVolume,
      wordDatabase: {
        easy: finalWords,
        medium: finalWords,
        tricky: finalWords
      }
    };
    onStartGame(config);
  };
  
  const addStudent = () => {
    if (!studentName.trim()) return;
    updateStudents([...students, createParticipant(studentName, initialDifficulty)]);
    setStudentName('');
  };

  const addBulkStudents = () => {
    if (!bulkStudentText.trim()) return;
    const names = bulkStudentText.split(/[\n,]+/).filter(name => name.trim());
    updateStudents([...students, ...names.map(name => createParticipant(name, initialDifficulty))]);
    setBulkStudentText('');
  };

  const updateStudentName = (index: number, name: string) => {
    const updated = [...students];
    updated[index] = {...updated[index], name};
    updateStudents(updated);
  };

  const removeStudent = (index: number) => {
    updateStudents(students.filter((_, i) => i !== index));
  };

  const updateTeamName = (index: number, name: string) => {
    const updated = [...teams];
    updated[index] = {...updated[index], name};
    updateTeams(updated);
  };

  const removeTeam = (index: number) => {
    updateTeams(teams.filter((_, i) => i !== index));
  };

  return (
    <div className="setup-container">
      <div className="content-wrapper">
        {gameMode === 'individual' && (
          <div className="student-section">
            <div className="flex gap-4 mb-4">
              <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} className="flex-grow p-2 rounded-md bg-white/20 text-white" placeholder="Student name" />
              <button onClick={addStudent} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold">Add</button>
            </div>
            <div className="mb-4">
              <textarea value={bulkStudentText} onChange={e => setBulkStudentText(e.target.value)} className="w-full p-2 rounded-md bg-white/20 text-white mb-2" placeholder="Paste names, one per line or separated by commas" rows={4}></textarea>
              <button onClick={addBulkStudents} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold">Add Names</button>
              {bulkStudentError && <p className="text-red-300 mt-2">{bulkStudentError}</p>}
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Randomize Teams</h3>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <input type="number" min={1} value={randomTeamCount || ''} onChange={e => { setRandomTeamCount(Number(e.target.value)); setRandomTeamSize(0); }} placeholder="Number of teams" className="p-2 rounded-md bg-white/20 text-white flex-grow" />
                <span>or</span>
                <input type="number" min={1} value={randomTeamSize || ''} onChange={e => { setRandomTeamSize(Number(e.target.value)); setRandomTeamCount(0); }} placeholder="Team size" className="p-2 rounded-md bg-white/20 text-white flex-grow" />
                <button onClick={randomizeTeams} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Randomize</button>
              </div>
              {randomizeError && <p className="text-red-300">{randomizeError}</p>}
            </div>
            {students.map((student, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <img src={student.avatar || avatars[0]} alt="avatar" className="w-8 h-8 rounded-full" />
                <input type="text" value={student.name} onChange={e => updateStudentName(index, e.target.value)} placeholder="Student name" className="flex-grow p-2 rounded-md bg-white/20 text-white" />
                {students.length > 0 && (<button onClick={() => removeStudent(index)} className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded">Remove</button>)}
              </div>
            ))}
          </div>
        )}
        <GameOptions 
          options={options}
          setOptions={setOptions}
        />
      </div>
    </div>
  );
};

export default SetupScreen;
