export interface Word {
  word: string;
  syllables: string[];
  definition: string;
  origin: string;
  example: string;
  prefix?: string;
  suffix?: string;
  pronunciation?: string;
}

export interface Participant {
  name: string;
  lives: number;
  points: number;
  difficultyLevel: number;
  streak: number;
  attempted: number;
  correct: number;
  wordsAttempted: number;
  wordsCorrect: number;
  accuracy?: number;
  avatar?: string;
}

export interface WordDatabase {
  easy: Word[];
  medium: Word[];
  tricky: Word[];
}

export interface GameConfig {
  participants: Participant[];
  gameMode: 'team' | 'individual';
  timerDuration: number;
  wordDatabase: WordDatabase;
  skipPenaltyType: 'lives' | 'points';
  skipPenaltyValue: number;
  soundEnabled: boolean;
  effectsEnabled: boolean;

  musicStyle: string;
  musicVolume: number;
  difficultyLevel: number;
  progressionSpeed: number;
  adaptiveDifficulty: boolean;
  /** When true, the game uses the daily challenge word list */
  dailyChallenge?: boolean;
}

export interface GameResults {
  winner: Participant | null;
  participants: Participant[];
  gameMode: 'team' | 'individual';
  duration: number;
  missedWords: Word[];
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
  avatar?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  threshold: number;
}

export const defaultAchievements: Achievement[] = [
  {
    id: 'ten-words',
    name: 'Novice Speller',
    description: 'Get 10 words correct',
    icon: '🐣',
    threshold: 10,
  },
  {
    id: 'fifty-words',
    name: 'Word Wizard',
    description: 'Get 50 words correct',
    icon: '🧙',
    threshold: 50,
  },
  {
    id: 'hundred-words',
    name: 'Master Speller',
    description: 'Get 100 words correct',
    icon: '🏆',
    threshold: 100,
  },
];
