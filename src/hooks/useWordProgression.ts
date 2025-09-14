import React from 'react';
import { Word } from '../types';
import useWordSelection from '../utils/useWordSelection';

const useWordProgression = (wordDatabase: Word[]) => {
  const { wordQueues, setWordQueues, currentWord, currentDifficulty, selectNextWord } =
    useWordSelection(wordDatabase);

  const selectNextWordForLevel = React.useCallback(
    (level: number) => {
      return selectNextWord(level);
    },
    [selectNextWord]
  );

  return { wordQueues, setWordQueues, currentWord, currentDifficulty, selectNextWordForLevel };
};

export default useWordProgression;
