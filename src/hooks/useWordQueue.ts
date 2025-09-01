import { useState, useEffect } from 'react';
import type { Word } from '../types';

export function useWordQueue() {
  const [wordQueues, setWordQueues] = useState({
    easy: [] as Word[],
    medium: [] as Word[],
    hard: [] as Word[],
  });
  
  // Word loading logic with error handling
  useEffect(() => {
    // ... existing word loading implementation
  }, []);
  
  return {
    wordQueues,
    setWordQueues
  };
}
