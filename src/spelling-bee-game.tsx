import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
// Import components
import { AudioProvider } from './contexts/AudioContext';
import { AudioControls } from './components/AudioControls';
import SetupScreen from './SetupScreen';
import GameScreen from './GameScreen';

// Import types
import type { GameConfig } from './types/game';
import type { WordType } from './types/word';

// Import global styles
import './tailwind.css';

// --- Main App Component ---
const SpellingBeeGame = () => {
  // Initialize audio when component mounts
  useEffect(() => {
    const initAudio = async () => {
      try {
        const { preloadAudio } = await import('./audio/initAudio');
        await preloadAudio();
        console.log('Audio system initialized');
      } catch (error) {
        console.error('Failed to initialize audio:', error);
      }
    };
    
    initAudio();
    
    // Cleanup audio on unmount
    return () => {
      const { audioManager } = require('./utils/audio');
      audioManager.stopAll();
    };
  }, []);
  const [gameState, setGameState] = useState('setup');
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  
  // Initialize game with configuration
  const handleStartGame = (config: Omit<GameConfig, 'wordList'>) => {
    // Create a default word list for now
    const defaultWordList: WordType[] = [];
    
    const fullConfig: GameConfig = {
      ...config,
      wordList: defaultWordList,
    };
    
    setGameConfig(fullConfig);
    setGameState('playing');
  };
  
  // Handle adding custom words
  const handleAddCustomWords = (words: WordType[]) => {
    console.log('Adding custom words:', words);
    // Implement custom words logic here
  };
  
  // Handle viewing achievements
  const handleViewAchievements = () => {
    console.log('Viewing achievements');
    // Navigate to achievements screen
  };
  
  // Handle game end
  const handleEndGame = (results: any) => {
    setGameState('results');
  };
  
  // Render the appropriate screen based on game state
  const renderScreen = () => {
    switch (gameState) {
      case 'setup':
        return (
          <SetupScreen 
            onStartGame={handleStartGame} 
            onAddCustomWords={handleAddCustomWords}
            onViewAchievements={handleViewAchievements}
          />
        );
      case 'playing':
        return gameConfig ? (
          <GameScreen
            config={gameConfig}
            onEndGame={handleEndGame}
          />
        ) : null;
      case 'results':
        return <div>Game Over</div>;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <AudioProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Uncomment to test audio controls */}
        {/* <AudioTest /> */}
        
        <main className="container mx-auto px-4 py-8">
          {renderScreen()}
        </main>

        {/* Global Audio Controls */}
        <AudioControls />
      </div>
    </AudioProvider>
  );
};

// Render the app
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <SpellingBeeGame />
    </React.StrictMode>
  );
}

export default SpellingBeeGame;
