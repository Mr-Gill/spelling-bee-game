// Remove duplicate exports and fix augmentation issues
export {}; // Empty export to mark as module

export interface Word {
  word: string;
  syllables: string[] | null;
  phonemes: string[] | null;
  definition: string | null;
  origin: string | null;
  example: string | null;
  prefix?: string | null;
  suffix?: string | null;
  prefixMeaning?: string;
  suffixMeaning?: string;
  pronunciation?: string;
  source?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
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
  /** Optional team assignment used during setup */
  team?: string;
  /** Remaining skip turns available for this participant */
  skipsRemaining?: number;
  /** Remaining "ask a friend" opportunities */
  askFriendRemaining?: number;
  score: number;
  maxScore: number;
}

/**
 * Represents a team in team mode. Extends `Participant` so existing logic that
 * operates on participants (like score and life tracking) continues to work.
 * Each team maintains a roster of students who will take turns in the game.
 */
export interface Team extends Participant {
  students: Participant[];
}

export interface WordDatabase {
  easy: Word[];
  medium: Word[];
  tricky: Word[];
  hard?: Word[];
}

export interface GameConfig {
  publicUrl?: string;
  baseUrl: string;
  githubToken: string;
  githubApiUrl: string;
  elevenLabsApiKey: string;
  newsApiKey: string;
  openAiApiKey: string;
  isProduction: boolean;
  dailyChallenge: boolean;
  soundEnabled: boolean;
  effectsEnabled: boolean;
  wordDatabase: WordDatabase;
  participants: Participant[] | Team[];
  gameMode: 'team' | 'individual';
  timerDuration: number;
  skipPenaltyType: 'lives' | 'points';
  skipPenaltyValue: number;
  musicStyle: string;
  musicVolume: number;
  difficultyLevel: number;
  progressionSpeed: number;
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

export interface OptionsState {
  soundEnabled: boolean;
  musicEnabled: boolean;
  musicStyle: string;
  musicVolume: number;
  teacherMode: boolean;
  skipPenaltyType: 'lives' | 'points';
  skipPenaltyValue: number;
  initialDifficulty: number;
  progressionSpeed: number;
  effectsEnabled: boolean;
  theme: string;
}

export interface ContentItem {
  type: 'text' | 'image';
  value: string;
}

// Use standard SVG module declaration
declare module '*.svg' {
  const content: string;
  export default content;
}
