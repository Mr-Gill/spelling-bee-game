import { BaseParticipant } from './participant';

export interface Participant extends BaseParticipant {
  currentWord: Word | null;
  maxScore?: number;
  wordsAttempted: number;
  wordsCorrect: number;
  lives: number;
  difficultyLevel: number;
  streak: number;
  skipsRemaining: number;
  askFriendRemaining: number;
}

export interface Word {
  word: string;
  difficulty: 'easy' | 'medium' | 'hard';
  definition?: string;
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
