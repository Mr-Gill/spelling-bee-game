import { Word, Participant, Team } from './types';
import { GameConfig as ConfigType } from './types';

export interface GameResults {
  winner: Participant | Team | null;
  participants: Participant[];
  teams?: Team[];
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
  participants: (Participant & {
    currentWord?: Word | null;
    input: string;
    feedback?: { message: string; type: 'success' | 'error' | 'info' };
  })[];
  currentParticipantIndex: number;
  currentWordIndex: number;
  timeLeft: number;
  gameStarted: boolean;
  gameEnded: boolean;
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
  skipsRemaining: number;
  askFriendRemaining: number;
  letters: string[];
  totalWords: number;
  currentHelp: string | null;
  musicConfirmed: boolean;
  showWord: boolean;
  gameProgress: number;
}

export interface GameScreenProps {
  config: ConfigType;
  onEndGame: (results: GameResults) => void;
}
