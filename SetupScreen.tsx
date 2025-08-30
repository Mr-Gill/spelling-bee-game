import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { GameConfig, Word, Participant, OptionsState } from './types';
import { parseWordList } from './utils/parseWordList';
import beeImg from './img/avatars/bee.svg';
import bookImg from './img/avatars/book.svg';
import trophyImg from './img/avatars/trophy.svg';
import TeamForm from './components/TeamForm';
import StudentRoster from './components/StudentRoster';
import GameOptions from './components/GameOptions';
=======
import { GameConfig, Word, Participant, Team } from './types';
import { parseWordList } from './utils/parseWordList';
import useRoster from './hooks/useRoster';
import TeamForm from './components/TeamForm';
import StudentRoster from './components/StudentRoster';
import { OptionsState } from './components/GameOptions';
import beeImg from './img/avatars/bee.svg';
import bookImg from './img/avatars/book.svg';
import trophyImg from './img/avatars/trophy.svg';
>>>>>>> 75cbce2 (feat: add team rosters and hot seat)

// Gather available music styles.
// This is hardcoded as a workaround for build tools that don't support `import.meta.glob`.
const musicStyles = ['Funk', 'Country', 'Deep Bass', 'Rock', 'Jazz', 'Classical'];

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
  onAddCustomWords: (words: Word[]) => void;
  onViewAchievements: () => void;
  onViewShop: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame, onAddCustomWords, onViewAchievements, onViewShop }) => {
  const avatars = [beeImg, bookImg, trophyImg];
  const getRandomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)];

  const [gameMode, setGameMode] = useState<'team' | 'individual'>('team');
  const [startingLives, setStartingLives] = useState(10);
  const [timerDuration, setTimerDuration] = useState(60);

  const getDefaultTeams = (): Team[] => [
    {
      name: 'Team Alpha',
      lives: startingLives,
      difficultyLevel: 0,
      points: 0,
      streak: 0,
      attempted: 0,
      correct: 0,
      wordsAttempted: 0,
      wordsCorrect: 0,
      avatar: getRandomAvatar(),
      team: '',
      students: [],
    },
    {
      name: 'Team Beta',
      lives: startingLives,
      difficultyLevel: 0,
      points: 0,
      streak: 0,
      attempted: 0,
      correct: 0,
      wordsAttempted: 0,
      wordsCorrect: 0,
      avatar: getRandomAvatar(),
      team: '',
      students: [],
    },
  ];

  const getDefaultTeams = (): Team[] => [
    {
      name: 'Team Alpha',
      lives: startingLives,
      difficultyLevel: 0,
      points: 0,
      streak: 0,
      attempted: 0,
      correct: 0,
      wordsAttempted: 0,
      wordsCorrect: 0,
      avatar: getRandomAvatar(),
      team: '',
      students: [],
    },
    {
      name: 'Team Beta',
      lives: startingLives,
      difficultyLevel: 0,
      points: 0,
      streak: 0,
      attempted: 0,
      correct: 0,
      wordsAttempted: 0,
      wordsCorrect: 0,
      avatar: getRandomAvatar(),
      team: '',
      students: [],
    },
  ];

<<<<<<< HEAD
  const [teams, setTeams] = useState<Participant[]>(getDefaultTeams());
  const [students, setStudents] = useState<Participant[]>([]);
  const [studentName, setStudentName] = useState('');
  const [bulkStudentText, setBulkStudentText] = useState('');
  const [bulkStudentError, setBulkStudentError] = useState('');
  const [randomTeamCount, setRandomTeamCount] = useState(0);
  const [randomTeamSize, setRandomTeamSize] = useState(0);
  const [randomizeError, setRandomizeError] = useState('');
  const [rosterError, setRosterError] = useState('');
=======
  const {
    participants: teams,
    addParticipant: addTeamParticipant,
    removeParticipant: removeTeam,
    updateName: updateTeamName,
    clear: clearTeams,
    setParticipants: setTeams,
  } = useRoster<Team>('teams', getDefaultTeams());
    setParticipants: setTeams,
  } = useRoster<Team>('teams', getDefaultTeams());

  const {
    participants: students,
    addParticipant: addStudentParticipant,
    removeParticipant: removeStudent,
    updateName: updateStudentName,
    clear: clearStudents,
    setParticipants: setStudents,
  } = useRoster<Participant>('students', []);
    setParticipants: setStudents,
  } = useRoster<Participant>('students', []);

  const [timerDuration, setTimerDuration] = useState(30);
  const [customWordListText, setCustomWordListText] = useState('');
  const [parsedCustomWords, setParsedCustomWords] = useState<Word[]>([]);
  const [missedWordsCollection, setMissedWordsCollection] = useState<Record<string, Word[]>>({});
  const [includeMissedWords, setIncludeMissedWords] = useState(false);
  const [error, setError] = useState('');
  const [randomTeamCount, setRandomTeamCount] = useState(0);
  const [randomTeamSize, setRandomTeamSize] = useState(0);
  const [randomizeError, setRandomizeError] = useState('');
  const [rosterError, setRosterError] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  const bundledWordLists = [
    { label: 'Example JSON', file: 'example.json' },
    { label: 'Example CSV', file: 'example.csv' },
    { label: 'Example TSV', file: 'example.tsv' }
  ];
  const [selectedBundledList, setSelectedBundledList] = useState('');
>>>>>>> 75cbce2 (feat: add team rosters and hot seat)
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

  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://your-production-api.com' 
    : 'http://localhost:3001';

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

  const updateTeams = (newTeams: Team[]) => {
    const teamsWithRoster = newTeams.map((t) => ({
      ...t,
      students: students.filter((s) => s.team === t.name),
    }));
    setTeams(teamsWithRoster);
    localStorage.setItem('teams', JSON.stringify(teamsWithRoster));
  };

  const updateStudents = (newStudents: Participant[]) => {
    setStudents(newStudents);
    // Rebuild team rosters when students change
    const teamsWithRoster = teams.map((t) => ({
      ...t,
      students: newStudents.filter((s) => s.team === t.name),
    }));
    setTeams(teamsWithRoster);
    localStorage.setItem('students', JSON.stringify(newStudents));
    localStorage.setItem('teams', JSON.stringify(teamsWithRoster));
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

<<<<<<< HEAD
  const handleExportRoster = () => {
    try {
      const data = JSON.stringify({ teams, students }, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'roster.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export roster', err);
    }
  };

  const handleImportRoster = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target?.result as string);
        const { teams: importedTeams, students: importedStudents } = data || {};
        if (!Array.isArray(importedTeams) || !Array.isArray(importedStudents)) throw new Error();

        const sanitize = (items: any[], existing: Participant[]): Participant[] =>
          items
            .filter(item => item && typeof item.name === 'string')
            .map(item => {
              const base = createParticipant(item.name, item.difficultyLevel ?? 0);
              const existingAvatar = existing.find(e => e.name === item.name)?.avatar;
              return { ...base, ...item, avatar: item.avatar || existingAvatar || getRandomAvatar() };
            });

        const newTeams = sanitize(importedTeams, teams);
        const newStudents = sanitize(importedStudents, students);
        updateTeams(newTeams);
        updateStudents(newStudents);
        setRosterError('');
      } catch (err) {
        console.error('Failed to import roster', err);
        setRosterError('Invalid roster file.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const createParticipant = (name: string, difficulty: number): Participant => ({
    name: name.trim(), lives: startingLives, points: 0, difficultyLevel: difficulty, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar()
  });

  const addTeam = (): void => {
    if (!teams || !setTeams || !createParticipant || !options) return;
    setTeams([...teams, createParticipant('New Team', options.initialDifficulty)]);
=======
  const [options, setOptions] = useState<OptionsState>({
    skipPenaltyType: 'lives',
    skipPenaltyValue: 1,
    initialDifficulty: 0,
    progressionSpeed: 1,
    soundEnabled: localStorage.getItem('soundEnabled') !== 'false',
    effectsEnabled: true,
    theme: localStorage.getItem('theme') ?? 'light',
    teacherMode: localStorage.getItem('teacherMode') === 'true',
    musicStyle: localStorage.getItem('musicStyle') ?? 'Funk',
    musicVolume: parseFloat(localStorage.getItem('musicVolume') ?? '1'),
  });

  const createParticipant = (
    name: string,
    difficulty: number,
  ): Participant => ({
    name: name.trim(),
    lives: startingLives,
    points: 0,
    difficultyLevel: difficulty,
    streak: 0,
    attempted: 0,
    correct: 0,
    wordsAttempted: 0,
    wordsCorrect: 0,
    avatar: getRandomAvatar(),
    team: '',
  });

  const addTeam = () =>
    addTeamParticipant({ ...createParticipant('', 0), students: [] });

  const clearRoster = () => {
    clearTeams();
    clearStudents();
>>>>>>> 75cbce2 (feat: add team rosters and hot seat)
  };

  // Helper to randomize team rosters if needed in the future
  const randomizeTeams = () => {
    const shuffled = [...students];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const count = teams.length;
    const groups: Participant[][] = Array.from({ length: count }, () => []);
    shuffled.forEach((student, idx) => {
      groups[idx % count].push(student);
    });
    const newTeams = groups.map((group, index) => ({
      ...teams[index],
      students: group,
    }));
    updateTeams(newTeams as Team[]);
  };
  
<<<<<<< HEAD
  const handleParseWordList = (content: string) => {
    const words = parseWordList(content);
    setParsedCustomWords(words);
=======
  const parseWordListText = (content: string) => {
    try {
      const words = parseWordList(content);
      setParsedCustomWords(words);
      setError('');
    } catch (e: any) {
      setError(e.message || 'Invalid word list format.');
    }
>>>>>>> 75cbce2 (feat: add team rosters and hot seat)
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
      const res = await fetch(`${API_URL}/wordlist`, {
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
<<<<<<< HEAD
      handleParseWordList(customWordListText);
=======
      parseWordListText(customWordListText);
>>>>>>> 75cbce2 (feat: add team rosters and hot seat)
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

    let finalParticipants: (Participant | Team)[];
    let finalParticipants: (Participant | Team)[];
    if (gameMode === 'team') {
      const trimmedTeams = (teams as Team[]).filter(
        (team) => team.name.trim() !== '',
      );
      if (trimmedTeams.length < 2) {
        setError('Please add at least two teams with names.');
        return;
      }
      // Ensure each team has its roster saved
      const teamsWithDifficulty = trimmedTeams.map((t) => ({
        ...t,
        difficultyLevel: options.initialDifficulty,
        students: students.filter((s) => s.team === t.name),
      }));
      if (teamsWithDifficulty.some((t) => t.students.length === 0)) {
        setError('Each team must have at least one student assigned.');
        return;
      }
      finalParticipants = teamsWithDifficulty;
      const trimmedTeams = (teams as Team[]).filter(
        (team) => team.name.trim() !== '',
      );
      if (trimmedTeams.length < 2) {
        setError('Please add at least two teams with names.');
        return;
      }
      // Ensure each team has its roster saved
      const teamsWithDifficulty = trimmedTeams.map((t) => ({
        ...t,
        difficultyLevel: options.initialDifficulty,
        students: students.filter((s) => s.team === t.name),
      }));
      if (teamsWithDifficulty.some((t) => t.students.length === 0)) {
        setError('Each team must have at least one student assigned.');
        return;
      }
      finalParticipants = teamsWithDifficulty;
    } else {
      const trimmedStudents = students.filter(
        (student) => student.name.trim() !== '',
      );
      if (trimmedStudents.length < 1 && isSessionChallenge) {
        finalParticipants = [
          createParticipant('Player 1', options.initialDifficulty),
        ];
      } else if (trimmedStudents.length < 2 && !isSessionChallenge) {
        setError('Please add at least two students for a custom game.');
        return;
      } else {
        finalParticipants = trimmedStudents.map((s) => ({
          ...s,
          difficultyLevel: options.initialDifficulty,
        }));
      }
      const trimmedStudents = students.filter(
        (student) => student.name.trim() !== '',
      );
      if (trimmedStudents.length < 1 && isSessionChallenge) {
        finalParticipants = [
          createParticipant('Player 1', options.initialDifficulty),
        ];
      } else if (trimmedStudents.length < 2 && !isSessionChallenge) {
        setError('Please add at least two students for a custom game.');
        return;
      } else {
        finalParticipants = trimmedStudents.map((s) => ({
          ...s,
          difficultyLevel: options.initialDifficulty,
        }));
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
                <img src={student.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                <input type="text" value={student.name} onChange={e => updateStudentName(index, e.target.value)} placeholder="Student name" className="flex-grow p-2 rounded-md bg-white/20 text-white" />
                {students.length > 0 && (<button onClick={() => removeStudent(index)} className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded">Remove</button>)}
              </div>
            ))}
          </div>
        )}
        <div className="bg-white/10 p-6 rounded-lg mb-8">
<<<<<<< HEAD
          <h2 className="text-2xl font-bold mb-4">{gameMode === 'team' ? 'Teams 👥' : 'Students 🧑‍🎓'}</h2>
          {gameMode === 'team' ? (
            <>
              {teams.map((team, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <img src={team.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <input type="text" value={team.name} onChange={e => updateTeamName(index, e.target.value)} placeholder={`Team ${index + 1} Name`} className="flex-grow p-2 rounded-md bg-white/20 text-white" />
                  {teams.length > 1 && (<button onClick={() => removeTeam(index)} className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded">Remove</button>)}
                </div>
              ))}
              <button onClick={addTeam} className="mt-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded">Add Team</button>
            </>
          ) : (
=======
          <h2 className="text-2xl font-bold mb-4 uppercase font-heading">{gameMode === 'team' ? 'Teams 👥' : 'Students 🧑‍🎓'}</h2>
          {gameMode === 'team' && (
>>>>>>> 75cbce2 (feat: add team rosters and hot seat)
            <>
              <TeamForm
                teams={teams}
                avatars={avatars}
                addTeam={addTeam}
                removeTeam={removeTeam}
                updateTeamName={updateTeamName}
              />
              <div className="mt-4">
                <StudentRoster
                  students={students}
                  avatars={avatars}
                  addParticipant={addStudentParticipant}
                  removeStudent={removeStudent}
                  updateStudentName={updateStudentName}
                  createParticipant={createParticipant}
                  initialDifficulty={options.initialDifficulty}
                  teams={teams as any}
                  onAssignTeam={(index, teamName) => {
                    const updated = students.map((s, i) =>
                      i === index ? { ...s, team: teamName } : s,
                    );
                    updateStudents(updated);
                  }}
                />
              </div>
<<<<<<< HEAD
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
                  <img src={student.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <input type="text" value={student.name} onChange={e => updateStudentName(index, e.target.value)} placeholder="Student name" className="flex-grow p-2 rounded-md bg-white/20 text-white" />
                  {students.length > 0 && (<button onClick={() => removeStudent(index)} className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded">Remove</button>)}
                </div>
              ))}
            </>
=======
            </>
          )}
          {gameMode === 'individual' && (
            <StudentRoster
              students={students}
              avatars={avatars}
              addParticipant={addStudentParticipant}
              removeStudent={removeStudent}
              updateStudentName={updateStudentName}
              createParticipant={createParticipant}
              initialDifficulty={options.initialDifficulty}
            />
>>>>>>> 75cbce2 (feat: add team rosters and hot seat)
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={handleExportRoster} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Export Roster</button>
            <label htmlFor="import-roster" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded cursor-pointer">Import Roster</label>
            <input id="import-roster" type="file" accept="application/json" className="hidden" onChange={handleImportRoster} />
            <button onClick={clearRoster} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Clear Saved Roster</button>
          </div>
          {rosterError && <p className="text-red-300 mt-2">{rosterError}</p>}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg">
<<<<<<< HEAD
                <h2 className="text-2xl font-bold mb-4">Skip Penalty ⏭️</h2>
=======
                <h2 className="text-2xl font-bold mb-4 uppercase font-heading">Starting Lives ❤️</h2>
                <input type="number" min={1} value={startingLives} onChange={e => setStartingLives(Number(e.target.value))} className="p-2 rounded-md bg-white/20 text-white w-full" />
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 uppercase font-heading">Skip Penalty ⏭️</h2>
>>>>>>> 75cbce2 (feat: add team rosters and hot seat)
                <div className="flex gap-4">
                    <select value={options.skipPenaltyType} onChange={e => setOptions({ ...options, skipPenaltyType: e.target.value as 'lives' | 'points' })} className="p-2 rounded-md bg-white/20 text-white">
                        <option value="lives">Lives</option>
                        <option value="points">Points</option>
                    </select>
                    <input type="number" min={0} value={options.skipPenaltyValue} onChange={e => setOptions({ ...options, skipPenaltyValue: Number(e.target.value) })} className="p-2 rounded-md bg-white/20 text-white w-24" />
                </div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Difficulty Settings 🎚️</h2>
                <div className="flex gap-4">
                    <div>
                        <label className="block mb-2">Initial Difficulty</label>
                        <select value={options.initialDifficulty} onChange={e => setOptions({ ...options, initialDifficulty: Number(e.target.value) })} className="p-2 rounded-md bg-white/20 text-white">
                            <option value={0}>Easy</option>
                            <option value={1}>Medium</option>
                            <option value={2}>Tricky</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Progression Speed</label>
                        <input type="number" min={1} value={options.progressionSpeed} onChange={e => setOptions({ ...options, progressionSpeed: Number(e.target.value) })} className="p-2 rounded-md bg-white/20 text-white w-24" />
                    </div>
                </div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Audio & Effects 🔊✨</h2>
                <label className="flex items-center space-x-3 mb-2"><input type="checkbox" checked={soundEnabled} onChange={e => setSoundEnabled(e.target.checked)} /><span>Enable Sound</span></label>
                <label className="flex items-center space-x-3"><input type="checkbox" checked={effectsEnabled} onChange={e => setEffectsEnabled(e.target.checked)} /><span>Enable Visual Effects</span></label>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Theme 🎨</h2>
                <select value={theme} onChange={e => { const t = e.target.value; setTheme(t); localStorage.setItem('theme', t); applyTheme(t); }} className="p-2 rounded-md bg-white/20 text-white">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="honeycomb">Honeycomb</option>
                </select>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Teacher Mode 👩‍🏫</h2>
                <label className="flex items-center gap-2 text-white"><input type="checkbox" checked={teacherMode} onChange={e => setTeacherMode(e.target.checked)} /><span>Enable larger fonts and spacing</span></label>
            </div>
             <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Music 🎵</h2>
                <div className="mb-4">
                    <label className="block mb-2">Style</label>
                    <select value={options.musicStyle} onChange={e => setOptions({ ...options, musicStyle: e.target.value })} className="p-2 rounded-md bg-white/20 text-white">
                        {musicStyles.map(style => (<option key={style} value={style}>{style}</option>))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2">Volume: {Math.round(options.musicVolume * 100)}%</label>
                    <input type="range" min={0} max={1} step={0.01} value={options.musicVolume} onChange={e => setOptions({ ...options, musicVolume: parseFloat(e.target.value) })} className="w-full" />
                </div>
            </div>
        </div>
        
        <div className="bg-white/10 p-6 rounded-lg mb-8 mt-8">
            <h2 className="text-2xl font-bold mb-4">Add Custom Word List 📝</h2>
            <div className="mb-6">
                <label htmlFor="bundled-list" className="block text-lg font-medium mb-2">Choose Bundled Word List</label>
                <select id="bundled-list" value={selectedBundledList} onChange={e => setSelectedBundledList(e.target.value)} className="w-full p-2 rounded-md bg-white/20 text-white">
                    <option value="">-- Select a list --</option>
                    {bundledWordLists.map(list => (<option key={list.file} value={list.file}>{list.label}</option>))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="file-upload" className="block text-lg font-medium mb-2">Upload File</label>
                    <p className="text-sm text-gray-300 mb-2">Upload a JSON or TSV file.</p>
                    <input id="file-upload" type="file" accept=".json,.tsv,.txt,.csv" onChange={handleFileChange} className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-300 file:text-black hover:file:bg-yellow-400" />
                </div>
                <div>
                    <label htmlFor="paste-area" className="block text-lg font-medium mb-2">Or Paste Spreadsheet Data</label>
                    <p className="text-sm text-gray-300 mb-2">Paste data from Excel or Google Sheets (tab-separated).</p>
                    <textarea id="paste-area" rows={4} value={customWordListText} onChange={e => setCustomWordListText(e.target.value)} className="w-full p-2 rounded-md bg-white/20 text-white" placeholder="Paste your tab-separated values here..."></textarea>
                </div>
            </div>
            <div className="mt-6">
                <div className="flex flex-col md:flex-row gap-2">
                    <input type="number" min={1} value={aiGrade} onChange={e => setAiGrade(Number(e.target.value))} className="p-2 rounded-md bg-white/20 text-white w-full md:w-24" placeholder="Grade" />
                    <input type="text" value={aiTopic} onChange={e => setAiTopic(e.target.value)} className="p-2 rounded-md bg-white/20 text-white flex-1" placeholder="Topic (optional)" />
                    <input type="number" min={1} value={aiCount} onChange={e => setAiCount(Number(e.target.value))} className="p-2 rounded-md bg-white/20 text-white w-full md:w-24" placeholder="# Words" />
                    <button onClick={generateAIWords} disabled={aiLoading} className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded w-full md:w-auto">{aiLoading ? 'Generating...' : 'Generate with AI'}</button>
                </div>
                {aiError && <p className="text-red-300 mt-2">{aiError}</p>}
            </div>
            <div className="mt-4 text-sm text-gray-300">
                <p><strong>Format:</strong> The first row should be headers: `word`, `syllables`, `definition`, `origin`, `example`, `prefix`, `suffix`, `pronunciation`.</p>
            </div>
            <div className="mt-2">
              <a href="wordlists/example.csv" download className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                Download Template
              </a>
            </div>
        </div>
        
        {missedWordCount > 0 && (
            <div className="bg-white/10 p-4 rounded-lg mb-8">
                <label className="flex items-center space-x-3">
                    <input type="checkbox" checked={includeMissedWords} onChange={e => setIncludeMissedWords(e.target.checked)} />
                    <span>Include {missedWordCount} missed words from previous sessions</span>
                </label>
            </div>
        )}

        {error && <p className="text-red-300 text-center mb-4">{error}</p>}
        
        <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button onClick={() => handleStart(false)} className="w-full bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl text-2xl font-bold">Start Custom Game</button>
            <button onClick={() => handleStart(true)} className="w-full bg-orange-500 hover:bg-orange-600 text-black px-6 py-4 rounded-xl text-2xl font-bold">Start Session Challenge</button>
        </div>
        <div className="mt-4 flex justify-center gap-4">
            <button onClick={onViewAchievements} className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl text-xl font-bold">View Achievements</button>
            <button onClick={onViewShop} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-xl font-bold">Shop</button>
        </div>
      </div>
    </div>
  );
};
