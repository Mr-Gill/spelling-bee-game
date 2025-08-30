export interface Participant {
  id: string;
  name: string;
  avatar: string;
  score: number;
  lives: number;
  teamId: string | null;
  points: number;
  difficultyLevel: number;
  streak: number;
  attempted: number;
  correct: number;
  incorrect: number;
  wordsAttempted: number;
  wordsCorrect: number;
}

export type Team = {
  id: string;
  name: string;
  students: Participant[];
  score: number;
  lives: number;
};
