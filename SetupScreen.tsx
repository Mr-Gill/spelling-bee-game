import React, { useState, useEffect } from 'react';
import { Word, Participant, GameConfig } from './types';
import { fetchDailyWordList, getStreakInfo } from './DailyChallenge';

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
  onAddCustomWords: (words: Word[]) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame, onAddCustomWords }) => {
  const avatarOptions = [
    { label: '🐝 Bee', src: 'avatars/bee.svg' },
    { label: '📘 Book', src: 'avatars/book.svg' },
    { label: '🏆 Trophy', src: 'avatars/trophy.svg' }
  ];

  const defaultTeams: Participant[] = [
    { name: 'Team Alpha', lives: 5, difficultyLevel: 0, points: 0, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: avatarOptions[0].src },
    { name: 'Team Beta', lives: 5, difficultyLevel: 0, points: 0, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: avatarOptions[1].src }
  ];

  const [teams, setTeams] = useState<Participant[]>(defaultTeams);
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
  const [musicStyle] = useState('Funk');
  const [musicVolume] = useState(0.5);
  
  const applyTheme = (t: string) => {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-honeycomb');
    document.body.classList.add(`theme-${t}`);
  };

  useEffect(() => {
    // Load saved teams
    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) {
      try {
        const parsed: Participant[] = JSON.parse(savedTeams);
        setTeams(parsed.map(t => ({ avatar: avatarOptions[0].src, ...t })));
      } catch {}
    }
    // Load saved students
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      try {
        const parsed: Participant[] = JSON.parse(savedStudents);
        setStudents(parsed.map(s => ({ avatar: avatarOptions[0].src, ...s })));
      } catch {}
    }
    // Load and apply theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme(theme);
    }
    // Load daily streak info
    try {
      setDailyStreak(getStreakInfo().currentStreak);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('soundEnabled', String(soundEnabled));
  }, [soundEnabled]);

  // All participant and word list handling functions remain here...
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
    avatar: avatarOptions[0].src
  });

  const handleStart = () => {
    // Standard game start logic...
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
        musicStyle,
        musicVolume,
        difficultyLevel: initialDifficulty,
        progressionSpeed,
        dailyChallenge: true,
      } as GameConfig;
      onStartGame(config);
    } catch {
      setError('Daily challenge not available today.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* All UI sections for game setup remain here */}
        
        <div className="bg-white/10 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Theme 🎨</h2>
          <select
            value={theme}
            onChange={e => {
              const t = e.target.value;
              setTheme(t);
              localStorage.setItem('theme', t);
              applyTheme(t);
            }}
            className="p-2 rounded-md bg-white/20 text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="honeycomb">Honeycomb</option>
          </select>
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