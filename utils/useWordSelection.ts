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

const useWordSelection = (
  db: WordDatabase,
  onRecommendDifficulty?: (difficulty: Difficulty) => void
) => {
  const [wordQueues, setWordQueues] = useState<WordQueues>({
    easy: shuffleArray(db.easy),
    medium: shuffleArray(db.medium),
    tricky: shuffleArray(db.tricky),
    review: [],
  });
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('easy');
  const [recentResults, setRecentResults] = useState<boolean[]>([]);
  const [accuracy, setAccuracy] = useState(0);

  const recordResult = useCallback(
    (isCorrect: boolean) => {
      setRecentResults(prev => {
        const updated = [...prev, isCorrect].slice(-5);
        const acc = updated.filter(Boolean).length / updated.length;
        setAccuracy(acc);
        if (acc > 0.8 && onRecommendDifficulty) {
          const currentIndex = difficultyOrder.indexOf(currentDifficulty);
          const nextIndex = Math.min(currentIndex + 1, difficultyOrder.length - 2);
          const recommended = difficultyOrder[nextIndex];
          if (recommended !== currentDifficulty) {
            onRecommendDifficulty(recommended);
          }
        }
        return updated;
      });
    },
    [currentDifficulty, onRecommendDifficulty]
  );

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

  return {
    wordQueues,
    setWordQueues,
    currentWord,
    currentDifficulty,
    selectNextWord,
    setCurrentWord,
    setCurrentDifficulty,
    recordResult,
    accuracy,
  };
};

export default useWordSelection;
