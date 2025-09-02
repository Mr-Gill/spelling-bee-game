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
export * from './game';
export * from './participant';

export { Team } from './participant'; // Explicitly re-export Team from participant

export type { Participant, Word } from './gameTypes';
