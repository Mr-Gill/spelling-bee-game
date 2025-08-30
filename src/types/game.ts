import { Participant } from './participant';
import { Team } from './participant';
import { WordType } from './word';

export type GameConfig = {
  participants: (Participant | Team)[];
  options: OptionsState;
  wordList: WordType[];
};

export interface OptionsState {
  gameMode: 'individual' | 'team';
  audioEnabled: boolean;
  soundEffectsEnabled: boolean;
  wordSource: 'curriculum' | 'news' | 'custom';
  timerDuration: number;
  skipPenaltyType: 'points' | 'lives'; // Finalized values
  skipPenaltyValue: number;
  progressionSpeed: number; // Changed to number
  musicStyle: string;
  musicVolume: number;
  initialDifficulty: number;
  soundEnabled: boolean;
  effectsEnabled: boolean;
  teacherMode: boolean;
  theme: string;
  musicEnabled: boolean;
}
