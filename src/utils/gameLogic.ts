/**
 * Game logic utilities for spelling bee game
 * Contains pure business logic functions that can be easily tested
 */

import { Participant, GameConfig } from '../types';

/**
 * Validates a spelling submission and returns whether it's correct
 */
export function handleSpellingSubmit(letters: string[], currentWord: string | { word: string }): { isCorrect: boolean } {
  if (!currentWord) {
    return { isCorrect: false };
  }

  const guess = letters.join('').trim().toLowerCase();
  const targetWord = typeof currentWord === 'string' ? currentWord : currentWord.word;
  const isCorrect = guess === targetWord.toLowerCase();
  
  return { isCorrect };
}

/**
 * Calculates scoring for a participant based on their performance
 */
export function calculateParticipantScore(
  participant: Participant,
  isCorrect: boolean,
  difficulty: string,
  shouldCountWord: boolean,
  config: GameConfig,
  usedHint: boolean = false
): Participant {
  const multipliers: Record<string, number> = { easy: 1, medium: 2, tricky: 3 };
  const basePoints = 5;
  const multiplier = multipliers[difficulty] || 1;
  const bonus = participant.streak * 2;
  const pointsEarned = basePoints * multiplier + bonus;

  return {
    ...participant,
    attempted: participant.attempted + 1,
    correct: participant.correct + (isCorrect ? 1 : 0),
    wordsAttempted: participant.wordsAttempted + (shouldCountWord ? 1 : 0),
    wordsCorrect: participant.wordsCorrect + (shouldCountWord && isCorrect ? 1 : 0),
    points: isCorrect ? participant.points + pointsEarned : participant.points,
    streak: isCorrect ? participant.streak + 1 : 0,
    difficultyLevel: isCorrect ? (usedHint ? participant.difficultyLevel : participant.difficultyLevel + config.progressionSpeed) : participant.difficultyLevel
  };
}

/**
 * Validates word submission format
 */
export function validateWordSubmission(letters: string[]): boolean {
  if (!Array.isArray(letters)) {
    return false;
  }
  
  return letters.length > 0 && letters.some(letter => letter.trim() !== '');
}

/**
 * Calculates points for a word based on difficulty and streak
 */
export function calculateWordPoints(difficulty: string, streak: number): number {
  const multipliers: Record<string, number> = { easy: 1, medium: 2, tricky: 3 };
  const basePoints = 5;
  const multiplier = multipliers[difficulty] || 1;
  const bonus = streak * 2;
  
  return basePoints * multiplier + bonus;
}