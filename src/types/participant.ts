export interface BaseParticipant {
  id: string;
  name: string;
  avatar: string;
  score: number;
  lives: number;
  difficulty: 'easy' | 'medium' | 'hard';
  wordsAttempted: number;
  wordsCorrect: number;
  streak: number;
  skipsRemaining: number;
  askFriendRemaining: number;
  achievements: string[];
  points: number;
  teamId?: string;
}

export interface Participant extends BaseParticipant {
  teamId?: string;
}

export interface Team extends BaseParticipant {
  participants: string[];
  teamId: string;
  students?: Participant[];
  difficultyLevel: number;
  attempted: number;
  correct: number;
}
