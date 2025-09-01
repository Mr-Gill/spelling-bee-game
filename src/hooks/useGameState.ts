import { useState, useCallback } from 'react';

export function useGameState(initialState = { timeLeft: 0 }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialState.timeLeft);
  
  const startGame = useCallback(() => {
    setGameStarted(true);
    // Additional start game logic
  }, []);
  
  const endGame = useCallback(() => {
    setGameEnded(true);
    // Additional end game logic
  }, []);
  
  return {
    gameStarted,
    gameEnded,
    timeLeft,
    startGame,
    endGame,
    setTimeLeft
  };
}
