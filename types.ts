export interface Word {
  word: string;
  syllables: string;
  definition: string;
  origin: string;
  sentence: string;
  prefixSuffix?: string;
  pronunciation?: string;
}

export interface Participant {
  name: string;
  lives: number;
  points: number;
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
}

export interface GameResults {
  winner: Participant | null;
  participants: Participant[];
  gameMode: 'team' | 'individual';
  duration: number;
  missedWords: Word[];
}
