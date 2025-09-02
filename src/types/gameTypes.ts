import { BaseParticipant } from './participant';

export interface Participant extends BaseParticipant {
  id: string;
  name: string;
  score: number;
  currentWord: WordLetter[];
  maxScore?: number;
  attempted: number;
  correct: number;
  lives: number;
  difficultyLevel: number;
  streak: number;
  skipsRemaining: number;
  askFriendRemaining: number;
  [key: string]: any; // For any additional dynamic properties
}

export interface WordLetter {
  letter: string;
  isCorrect: boolean;
  isRevealed: boolean;
}

export interface Word {
  word: string;
  difficulty: string;
  syllables: string[];
  phonemes: string[];
  definition: string;
  origin: string;
  example: string;
}

export interface GameState {
  participants: Participant[];
  currentRound: number;
  isGameRunning: boolean;
}

export interface GameScreenProps {
  config: {
    participants: Participant[];
    wordDatabase?: Record<string, Word[]>;
  };
}

export interface GameScreenState {
  message: string | null;
  showDefinition: boolean;
  musicConfirmed: boolean;
}

export interface WordQueues {
  easy: Word[];
  medium: Word[];
  hard: Word[];
}
