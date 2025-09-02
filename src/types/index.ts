// Import types first to handle circular dependencies
import type { Participant, Team } from './participant';

export interface GameResults {
  participants: (Participant | Team)[];
  wordsAttempted: number;
  wordsCorrect: number;
  totalScore: number;
  date: Date;
  duration: number;
}

export interface Feedback {
  message: string;
  type: 'success' | 'error' | 'info';
}

export type AvatarType = 'bee' | 'book' | 'trophy';

// Re-export all types
export * from './gameTypes';
export * from './participant';
export * from './team';
export * from './word';
export * from './game';
export * from './audio';
export * from './images';
