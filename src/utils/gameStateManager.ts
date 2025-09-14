/**
 * Game State Manager - Handles saving and loading game state to/from localStorage
 */

import { GameConfig, Participant, Word, Team } from '../types';

export interface SavedGameState {
  gameConfig: GameConfig;
  currentParticipants: Participant[] | Team[];
  currentWordIndex: number;
  currentWord: Word | null;
  currentParticipantIndex: number;
  gameStartTime: number;
  timeRemaining: number;
  totalWordsUsed: number;
  missedWords: Word[];
  currentInput: string;
  gamePhase: 'spelling' | 'waiting' | 'results';
  difficulty: 'easy' | 'medium' | 'tricky';
  savedAt: string;
  gameId: string;
}

const GAME_STATE_KEY = 'spelling_bee_saved_game';

/**
 * Save current game state to localStorage
 */
export function saveGameState(gameState: SavedGameState): void {
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
    console.log('Game state saved successfully');
  } catch (error) {
    console.error('Failed to save game state:', error);
    throw new Error('Failed to save game state');
  }
}

/**
 * Load saved game state from localStorage
 */
export function loadGameState(): SavedGameState | null {
  try {
    const savedData = localStorage.getItem(GAME_STATE_KEY);
    if (!savedData) {
      return null;
    }
    
    const gameState = JSON.parse(savedData) as SavedGameState;
    
    // Validate that the saved state has all required properties
    if (!gameState.gameConfig || !gameState.currentParticipants || !gameState.gameId) {
      console.warn('Invalid saved game state found, clearing it');
      clearSavedGame();
      return null;
    }
    
    return gameState;
  } catch (error) {
    console.error('Failed to load game state:', error);
    clearSavedGame(); // Clear corrupted save
    return null;
  }
}

/**
 * Check if there's a saved game available
 */
export function hasSavedGame(): boolean {
  return loadGameState() !== null;
}

/**
 * Clear saved game state
 */
export function clearSavedGame(): void {
  try {
    localStorage.removeItem(GAME_STATE_KEY);
    console.log('Saved game cleared successfully');
  } catch (error) {
    console.error('Failed to clear saved game:', error);
  }
}

/**
 * Get saved game info without loading full state (for UI display)
 */
export function getSavedGameInfo(): { savedAt: string; gameMode: string; participantCount: number } | null {
  const gameState = loadGameState();
  if (!gameState) {
    return null;
  }
  
  return {
    savedAt: gameState.savedAt,
    gameMode: gameState.gameConfig.gameMode,
    participantCount: gameState.currentParticipants.length,
  };
}

/**
 * Generate a unique game ID
 */
export function generateGameId(): string {
  return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Auto-save game state (debounced to prevent excessive saves)
 */
let autoSaveTimeout: NodeJS.Timeout | null = null;

export function autoSaveGameState(gameState: SavedGameState): void {
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout);
  }
  
  autoSaveTimeout = setTimeout(() => {
    try {
      saveGameState(gameState);
    } catch (error) {
      console.warn('Auto-save failed:', error);
    }
  }, 1000); // Save after 1 second of inactivity
}