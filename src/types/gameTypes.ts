export interface Participant {
  id: string;
  name: string;
  score: number;
  currentWord: Word | null;
  maxScore?: number;
  points?: number;
  correct?: number;
  attempted?: number;
  wordsCorrect?: number;
  wordsAttempted?: number;
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
