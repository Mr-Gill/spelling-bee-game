import { Participant } from './participant';
import { Team } from './participant';
import { WordType } from './word';

export type GameConfig = {
  participants: (Participant | Team)[];
  options: OptionsState;
  wordList: WordType[];
};

export type OptionsState = {
  initialDifficulty: number;
  gameMode: 'individual' | 'team';
  audioEnabled: boolean;
  soundEffectsEnabled: boolean;
  wordSource: 'curriculum' | 'custom' | 'news';
  customWordList?: string;
};
