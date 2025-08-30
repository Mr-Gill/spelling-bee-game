import { useCallback, useState } from 'react';
import { Word } from '../types';

export type Difficulty = 'easy' | 'medium' | 'tricky' | 'review';
export const difficultyOrder: Difficulty[] = ['easy', 'medium', 'tricky', 'review'];

interface WordDatabase {
  easy: Word[];
  medium: Word[];
  tricky: Word[];
}

interface WordQueues {
  easy: Word[];
  medium: Word[];
  tricky: Word[];
  review: Word[];
}

const shuffleArray = (arr: Word[]) => [...arr].sort(() => Math.random() - 0.5);

const useWordSelection = (db: WordDatabase) => {
  const [wordQueues, setWordQueues] = useState<WordQueues>({
    easy: shuffleArray(db.easy),
    medium: shuffleArray(db.medium),
    tricky: shuffleArray(db.tricky),
    review: [],
  });
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('easy');

  const selectNextWord = useCallback(
    (level: number) => {
      let index = Math.min(level, difficultyOrder.length - 1);
      let nextWord: Word | null = null;
      let nextDifficulty: Difficulty = difficultyOrder[index];

      while (index < difficultyOrder.length) {
        const diff = difficultyOrder[index];
        const queue = wordQueues[diff];
        if (queue.length > 0) {
          nextWord = queue[0];
          setWordQueues(prev => ({ ...prev, [diff]: prev[diff].slice(1) }));
          nextDifficulty = diff;
          break;
        }
        index++;
      }

      setCurrentDifficulty(nextDifficulty);
      setCurrentWord(nextWord);
      return nextWord;
    },
    [wordQueues]
  );

  return { wordQueues, setWordQueues, currentWord, currentDifficulty, selectNextWord, setCurrentWord };
};

export default useWordSelection;
