import React, { useState, useEffect } from 'react';
import { Word, Participant, GameConfig } from './types';
import beeImg from './img/avatars/bee.svg';
import bookImg from './img/avatars/book.svg';
import trophyImg from './img/avatars/trophy.svg';

// Gather available music styles from the audio directory
// Temporarily hardcoded until import.meta.glob is properly supported
const musicStyles = ['Funk', 'Country', 'Deep Bass', 'Rock', 'Jazz', 'Classical'];

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
  const [musicStyle, setMusicStyle] = useState<string>(() => localStorage.getItem('musicStyle') ?? 'Funk');
  const [musicVolume, setMusicVolume] = useState<number>(() => parseFloat(localStorage.getItem('musicVolume') ?? '1'));
  const [initialDifficulty, setInitialDifficulty] = useState(0);
  const [progressionSpeed, setProgressionSpeed] = useState(1);
  const [theme, setTheme] = useState('light');
  const [teacherMode, setTeacherMode] = useState<boolean>(() => localStorage.getItem('teacherMode') === 'true');

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

  const createParticipant = (name: string, difficulty: number): Participant => ({
    name: name.trim(), lives: 5, points: 0, difficultyLevel: difficulty, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar()
  });

  // All other participant and word list handling functions are assumed to be here...
  const handleStart = () => { /* Logic for custom game */ };

  const startSessionChallenge = async () => {
    try {
      const randomList = bundledWordLists[Math.floor(Math.random() * bundledWordLists.length)];
      const response = await fetch(`wordlists/${randomList.file}`);
      const words: Word[] = await response.json();
      onAddCustomWords(words);
      const config: GameConfig = {
        participants: gameMode === 'team' ? teams : students,
        gameMode, timerDuration, skipPenaltyType, skipPenaltyValue, soundEnabled, effectsEnabled, difficultyLevel: initialDifficulty, progressionSpeed, musicStyle, musicVolume,
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
          <h2 className="text-2xl font-bold mb-4">Music 🎵</h2>
          <div className="mb-4">
            <label className="block mb-2">Style</label>
            <select value={musicStyle} onChange={e => setMusicStyle(e.target.value)} className="p-2 rounded-md bg-white/20 text-white">
              {musicStyles.map(style => (<option key={style} value={style}>{style}</option>))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Volume: {Math.round(musicVolume * 100)}%</label>
            <input type="range" min={0} max={1} step={0.01} value={musicVolume} onChange={e => setMusicVolume(parseFloat(e.target.value))} className="w-full" />
          </div>
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