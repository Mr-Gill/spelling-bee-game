import { Word, Participant, Team } from './types';

export interface GameResults {
  winner: Participant | Team | null;
  participants: (Participant | Team)[];
  gameMode: 'team' | 'individual';
  duration: number;
  missedWords: Word[];
  wordsAttempted: number;
  wordsCorrect: number;
  achievements: string[];
  timestamp: string;
  settings: {
    timerDuration: number;
    difficultyLevel: number;
  };
}

export interface GameScreenState {
  participants: (Participant | Team)[];
  currentParticipantIndex: number;
  currentWordIndex: number;
  showShop: boolean;
  coins: number;
  usedLetters: Set<string>;
  wordQueues: {
    easy: Word[];
    medium: Word[];
    hard: Word[];
  };
  extraAttempt: boolean;
  attemptedParticipants: Set<number>;
  missedWords: Word[];
  revealedIndices: Set<number>;
  showDefinition: boolean;
  feedback: {
    message: string;
    type: 'success' | 'error' | 'info';
  } | null;
}

export interface GameScreenProps {
  config: GameConfig & { publicUrl?: string; words: Word[] };
  onEndGame: (results: GameResults) => void;
}

export interface GameConfig {
  participants: (Participant | Team)[];
  gameMode: 'team' | 'individual';
  timerDuration: number;
  wordDatabase: {
    easy: Word[];
    medium: Word[];
    tricky: Word[];
    hard?: Word[];
  };
  skipPenaltyType: 'lives' | 'points';
  skipPenaltyValue: number;
  soundEnabled: boolean;
  effectsEnabled: boolean;
  musicStyle: string;
  musicVolume: number;
  difficultyLevel: number;
  progressionSpeed: number;
  dailyChallenge?: boolean;
}
