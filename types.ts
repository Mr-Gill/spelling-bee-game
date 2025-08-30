export interface Word {
  word: string;
  syllables: string[];
  definition: string;
  origin: string;
  example: string;
  prefix?: string;
  suffix?: string;
  prefixMeaning?: string;
  suffixMeaning?: string;
  pronunciation?: string;
  /** Optional source the word list was generated from */
  source?: string;
}

export interface Participant {
  name: string;
  lives: number;
  points: number;
  difficultyLevel: number;
  streak: number;
  attempted: number;
  correct: number;
  wordsAttempted: number;
  wordsCorrect: number;
  accuracy?: number;
  avatar?: string;
  /** Optional team assignment used during setup */
  team?: string;
}

/**
 * Represents a team in team mode. Extends `Participant` so existing logic that
 * operates on participants (like score and life tracking) continues to work.
 * Each team maintains a roster of students who will take turns in the game.
 */
export interface Team extends Participant {
  students: Participant[];
}

export interface WordDatabase {
  easy: Word[];
  medium: Word[];
  tricky: Word[];
}

export interface GameConfig {
  /**
   * Participants in the game. In individual mode this is an array of
   * `Participant` objects. In team mode it is an array of `Team` objects.
   */
  participants: Participant[] | Team[];
  gameMode: 'team' | 'individual';
  timerDuration: number;
  wordDatabase: WordDatabase;
  skipPenaltyType: 'lives' | 'points';
  skipPenaltyValue: number;
  soundEnabled: boolean;
  effectsEnabled: boolean;

  musicStyle: string;
  musicVolume: number;
  difficultyLevel: number;
  progressionSpeed: number;
  /** When true, the game uses the daily challenge word list */
  dailyChallenge?: boolean;
}

export interface GameResults {
  winner: Participant | null;
  participants: Participant[];
  gameMode: 'team' | 'individual';
  duration: number;
  missedWords: Word[];
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
  avatar?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  threshold: number;
}

export const defaultAchievements: Achievement[] = [
  {
    id: 'ten-words',
    name: 'Novice Speller',
    description: 'Get 10 words correct',
    icon: '🐣',
    threshold: 10,
  },
  {
    id: 'fifty-words',
    name: 'Word Wizard',
    description: 'Get 50 words correct',
    icon: '🧙',
    threshold: 50,
  },
  {
    id: 'hundred-words',
    name: 'Master Speller',
    description: 'Get 100 words correct',
    icon: '🏆',
    threshold: 100,
  },
];

import React from 'react';

export interface OptionsState {
  soundEnabled: boolean;
  musicEnabled: boolean;
  musicStyle: string;
  musicVolume: number;
  teacherMode: boolean;
  skipPenaltyType: 'lives' | 'points';
  skipPenaltyValue: number;
  initialDifficulty: number;
  progressionSpeed: number;
  effectsEnabled: boolean;
  theme: string;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
