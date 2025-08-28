import React, 'react';
import { Word, Participant, GameConfig } from './types';
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

  const [teams, setTeams] = React.useState<Participant[]>(getDefaultTeams());
  const [gameMode, setGameMode] = React.useState<'team' | 'individual'>('team');
  const [timerDuration, setTimerDuration] = React.useState(30);
  const [customWordListText, setCustomWordListText] = React.useState('');
  const [parsedCustomWords, setParsedCustomWords] = React.useState<Word[]>([]);
  const [missedWordsCollection, setMissedWordsCollection] = React.useState<Record<string, Word[]>>({});
  const [includeMissedWords, setIncludeMissedWords] = React.useState(false);
  const [error, setError] = React.useState('');
  const bundledWordLists = [
    { label: 'Example JSON', file: 'example.json' },
    { label: 'Example CSV', file: 'example.csv' },
    { label: 'Example TSV', file: 'example.tsv' }
  ];
  const [selectedBundledList, setSelectedBundledList] = React.useState('');
  const [students, setStudents] = React.useState<Participant[]>([]);
  const [studentName, setStudentName] = React.useState('');
  const [bulkStudentText, setBulkStudentText] = React.useState('');
  const [bulkStudentError, setBulkStudentError] = React.useState('');
  const [skipPenaltyType, setSkipPenaltyType] = React.useState<'lives' | 'points'>('lives');
  const [skipPenaltyValue, setSkipPenaltyValue] = React.useState(1);
  const [soundEnabled, setSoundEnabled] = React.useState<boolean>(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? saved === 'true' : true;
  });
  const [effectsEnabled, setEffectsEnabled] = React.useState(true);
  const [initialDifficulty, setInitialDifficulty] = React.useState(0);
  const [progressionSpeed, setProgressionSpeed] = React.useState(1);
  const [theme, setTheme] = React.useState('light');
  const [teacherMode, setTeacherMode] = React.useState<boolean>(() => {
    const saved = localStorage.getItem('teacherMode');
    return saved === 'true';
  });

  const applyTheme = (t: string) => {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-honeycomb');
    document.body.classList.add(`theme-${t}`);
  };

  React.useEffect(() => {
    if (teacherMode) {
      document.body.classList.add('teacher-mode');
    } else {
      document.body.classList.remove('teacher-mode');
    }
    localStorage.setItem('teacherMode', String(teacherMode));
  }, [teacherMode]);
  
  React.useEffect(() => {
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
  }, []);

  React.useEffect(() => {
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

  const handleStart = () => {
    // Logic for starting a custom game
  };

  const startSessionChallenge = async () => {
    try {
      const randomList = bundledWordLists[Math.floor(Math.random() * bundledWordLists.length)];
      const response = await fetch(`wordlists/${randomList.file}`);
      const words: Word[] = await response.json();
      onAddCustomWords(words); // This will categorize words into easy/medium/tricky in the main app
      
      const config: GameConfig = {
        participants: gameMode === 'team' ? teams : students,
        gameMode,
        timerDuration,
        skipPenaltyType,
        skipPenaltyValue,
        soundEnabled,
        effectsEnabled,
        difficultyLevel: initialDifficulty,
        progressionSpeed,
      };
      onStartGame(config);
    } catch {
      setError('Failed to load session challenge.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* All UI sections for game setup are assumed to be here... */}

        <div className="bg-white/10 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">{gameMode === 'team' ? 'Teams 👥' : 'Students 🧑‍🎓'}</h2>
            {/* Roster UI with random avatars */}
        </div>
        
        {/* Other settings panels... */}

        <div className="flex gap-4 mt-8">
            <button onClick={handleStart} className="w-full bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl text-2xl font-bold">
                Start Custom Game
            </button>
            <button onClick={startSessionChallenge} className="w-full bg-orange-500 hover:bg-orange-600 text-black px-6 py-4 rounded-xl text-2xl font-bold">
                Start Session Challenge
            </button>
        </div>
        {error && <div className="mt-4 text-red-300 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default SetupScreen;