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
  difficultyLevel: number;
  progressionSpeed: number;
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