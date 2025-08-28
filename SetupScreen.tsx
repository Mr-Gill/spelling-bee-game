import React, { useState, useEffect } from 'react';
import { Word, Participant, GameConfig } from './types';
import { fetchDailyWordList, getStreakInfo } from './DailyChallenge';
import beeImg from './img/avatars/bee.svg';
import bookImg from './img/avatars/book.svg';
import trophyImg from './img/avatars/trophy.svg';

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
  onAddCustomWords: (words: Word[]) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame, onAddCustomWords }) => {
  const avatars = [beeImg, bookImg, trophyImg];
  const getRandomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)];

  const getDefaultTeams = (): Participant[] => [
    { name: 'Team Alpha', lives: 5, difficultyLevel: 0, points: 0, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar() },
    { name: 'Team Beta', lives: 5, difficultyLevel: 0, points: 0, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar() }
  ];

  const [teams, setTeams] = useState<Participant[]>(getDefaultTeams());
  const [gameMode, setGameMode] = useState<'team' | 'individual'>('team');
  const [timerDuration, setTimerDuration] = useState(30);
  const [customWordListText, setCustomWordListText] = useState('');
  const [parsedCustomWords, setParsedCustomWords] = useState<Word[]>([]);
  const [missedWordsCollection, setMissedWordsCollection] = useState<Record<string, Word[]>>({});
  const [includeMissedWords, setIncludeMissedWords] = useState(false);
  const [error, setError] = useState('');
  const bundledWordLists = [
    { label: 'Example JSON', file: 'example.json' },
    { label: 'Example CSV', file: 'example.csv' },
    { label: 'Example TSV', file: 'example.tsv' }
  ];
  const [selectedBundledList, setSelectedBundledList] = useState('');
  const [students, setStudents] = useState<Participant[]>([]);
  const [studentName, setStudentName] = useState('');
  const [bulkStudentText, setBulkStudentText] = useState('');
  const [bulkStudentError, setBulkStudentError] = useState('');
  const [skipPenaltyType, setSkipPenaltyType] = useState<'lives' | 'points'>('lives');
  const [skipPenaltyValue, setSkipPenaltyValue] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? saved === 'true' : true;
  });
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [initialDifficulty, setInitialDifficulty] = useState(0);
  const [progressionSpeed, setProgressionSpeed] = useState(1);
  const [theme, setTheme] = useState('light');
  const [dailyStreak, setDailyStreak] = useState(0);
  const [teacherMode, setTeacherMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('teacherMode');
    return saved === 'true';
  });

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
    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) {
      try {
        const parsed: Participant[] = JSON.parse(savedTeams);
        setTeams(parsed.map(t => ({ ...t, avatar: t.avatar || getRandomAvatar() })));
      } catch {}
    }
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      try {
        const parsed: Participant[] = JSON.parse(savedStudents);
        setStudents(parsed.map(s => ({ ...s, avatar: s.avatar || getRandomAvatar() })));
      } catch {}
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme(theme);
    }
    try {
      setDailyStreak(getStreakInfo().currentStreak);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('soundEnabled', String(soundEnabled));
  }, [soundEnabled]);

  const updateTeams = (newTeams: Participant[]) => {
    setTeams(newTeams);
    localStorage.setItem('teams', JSON.stringify(newTeams));
  };

  const updateStudents = (newStudents: Participant[]) => {
    setStudents(newStudents);
    localStorage.setItem('students', JSON.stringify(newStudents));
  };

  const clearRoster = () => {
    localStorage.removeItem('teams');
    localStorage.removeItem('students');
    setTeams(getDefaultTeams());
    setStudents([]);
  };

  const createParticipant = (name: string, difficulty: number): Participant => ({
    name: name.trim(),
    lives: 5,
    points: 0,
    difficultyLevel: difficulty,
    streak: 0,
    attempted: 0,
    correct: 0,
    wordsAttempted: 0,
    wordsCorrect: 0,
    avatar: getRandomAvatar()
  });

  const addTeam = () => updateTeams([...teams, createParticipant('', 0)]);
  const removeTeam = (index: number) => updateTeams(teams.filter((_, i) => i !== index));

  const updateTeamName = (index: number, name: string) => {
    const newTeams = teams.map((team, i) => (i === index ? { ...team, name } : team));
    updateTeams(newTeams);
  };

  const addStudent = () => {
    if (studentName.trim()) {
      updateStudents([...students, createParticipant(studentName, initialDifficulty)]);
      setStudentName('');
    }
  };

  const removeStudent = (index: number) => updateStudents(students.filter((_, i) => i !== index));

  const updateStudentName = (index: number, name: string) => {
    const newStudents = students.map((student, i) => (i === index ? { ...student, name } : student));
    updateStudents(newStudents);
  };

  const parseStudentNames = (text: string) =>
    text.split(/\r?\n/).flatMap(line => line.split(',')).map(name => name.trim()).filter(name => name !== '');

  const addBulkStudents = () => {
    const names = parseStudentNames(bulkStudentText);
    const existing = new Set(students.map(s => s.name));
    const uniqueNames = Array.from(new Set(names)).filter(name => !existing.has(name));
    if (uniqueNames.length === 0) {
      setBulkStudentError('No new unique names detected.');
      return;
    }
    const newStudents = uniqueNames.map(name => createParticipant(name, initialDifficulty));
    updateStudents([...students, ...newStudents]);
    setBulkStudentText('');
    setBulkStudentError('');
  };

  const handleDailyChallenge = async () => {
    try {
      const dailyWords = await fetchDailyWordList();
      onAddCustomWords(dailyWords);
      const player: Participant = createParticipant('Player', 0);
      const config: GameConfig = {
        participants: [player],
        gameMode: 'individual',
        timerDuration,
        skipPenaltyType,
        skipPenaltyValue,
        soundEnabled,
        effectsEnabled,
        difficultyLevel: initialDifficulty,
        progressionSpeed,
        dailyChallenge: true,
      } as GameConfig;
      onStartGame(config);
    } catch {
      setError('Daily challenge not available today.');
    }
  };
  
  const handleStart = () => { /* ... */ };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* All UI sections for game setup are assumed to be here... */}

        <div className="bg-white/10 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">{gameMode === 'team' ? 'Teams 👥' : 'Students 🧑‍🎓'}</h2>
            {gameMode === 'team' ? (
                <>
                    {teams.map((team, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <img src={team.avatar || avatars[0]} alt="avatar" className="w-8 h-8 rounded-full" />
                            <input
                                type="text"
                                value={team.name}
                                onChange={e => updateTeamName(index, e.target.value)}
                                placeholder={`Team ${index + 1} Name`}
                                className="flex-grow p-2 rounded-md bg-white/20 text-white"
                            />
                            {teams.length > 1 && (
                                <button
                                    onClick={() => removeTeam(index)}
                                    className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button onClick={addTeam} className="mt-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded">Add Team</button>
                </>
            ) : (
                <>
                    {/* Simplified Student UI */}
                    {students.map((student, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <img src={student.avatar || avatars[0]} alt="avatar" className="w-8 h-8 rounded-full" />
                            <input
                                type="text"
                                value={student.name}
                                onChange={e => updateStudentName(index, e.target.value)}
                                placeholder="Student name"
                                className="flex-grow p-2 rounded-md bg-white/20 text-white"
                            />
                            {students.length > 1 && (
                                <button onClick={() => removeStudent(index)} className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded">
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                </>
            )}
            <button onClick={clearRoster} className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Clear Saved Roster</button>
        </div>
        
        <div className="bg-white/10 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Theme 🎨</h2>
            {/* Theme selector UI */}
        </div>
        
        <div className="bg-white/10 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Teacher Mode 👩‍🏫</h2>
            {/* Teacher Mode UI */}
        </div>

        {/* Other UI sections... */}
        
        <button
          onClick={handleStart}
          className="w-full bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl text-2xl font-bold mt-8"
        >
          START GAME
        </button>
        <button
          onClick={handleDailyChallenge}
          className="w-full bg-orange-500 hover:bg-orange-600 text-black px-6 py-4 rounded-xl text-2xl font-bold mt-4"
        >
          Daily Challenge 🔥{dailyStreak > 0 ? ` (Streak ${dailyStreak})` : ''}
        </button>
      </div>
    </div>
  );
};

export default SetupScreen;