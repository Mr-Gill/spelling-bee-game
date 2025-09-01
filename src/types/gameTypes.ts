export interface Participant {
  id: string;
  name: string;
  score: number;
  currentWord: Word | null;
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
