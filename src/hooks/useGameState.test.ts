import { renderHook, act } from '@testing-library/react';
import { useGameState } from './useGameState';

describe('useGameState', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useGameState());
    
    expect(result.current.gameStarted).toBe(false);
    expect(result.current.gameEnded).toBe(false);
    expect(result.current.timeLeft).toBe(0);
  });

  it('should start the game', () => {
    const { result } = renderHook(() => useGameState());
    
    act(() => {
      result.current.startGame(60);
    });
    
    expect(result.current.gameStarted).toBe(true);
    expect(result.current.gameEnded).toBe(false);
    expect(result.current.timeLeft).toBe(60);
  });

  it('should end the game', () => {
    const { result } = renderHook(() => useGameState());
    
    act(() => {
      result.current.startGame(60);
      result.current.endGame();
    });
    
    expect(result.current.gameStarted).toBe(true);
    expect(result.current.gameEnded).toBe(true);
  });

  it('should update time left', () => {
    const { result } = renderHook(() => useGameState());
    
    act(() => {
      result.current.startGame(60);
      result.current.setTimeLeft(30);
    });
    
    expect(result.current.timeLeft).toBe(30);
  });
});
