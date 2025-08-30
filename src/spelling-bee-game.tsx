import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
// Import components
import { AudioProvider } from './contexts/AudioContext';
import { AudioControls } from './components/AudioControls';
import SetupScreen from './SetupScreen';
import GameScreen from './GameScreen';

// Import types
import type { GameConfig } from './types';

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
  const [musicStyle, setMusicStyle] = useState('');
  const [musicVolume, setMusicVolume] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  
  // Initialize game with configuration
  const handleStartGame = (config: GameConfig & { customWords?: any }) => {
    const wordDatabase = config.wordDatabase || { easy: [], medium: [], tricky: [] };
    const customWords = config.customWords || { easy: [], medium: [], tricky: [] };

    const finalWordDatabase = config.dailyChallenge ? customWords : {
        easy: [...wordDatabase.easy, ...customWords.easy],
        medium: [...wordDatabase.medium, ...customWords.medium],
        tricky: [...wordDatabase.tricky, ...customWords.tricky],
    };
    setGameConfig({ ...config, wordDatabase: finalWordDatabase });
    setMusicStyle(config.musicStyle);
    setMusicVolume(config.musicVolume);
    setSoundEnabled(config.soundEnabled);
    setIsMusicPlaying(true);
    setGameState("playing");
  };
  
  // Handle adding custom words
  const handleAddCustomWords = (words: any[]) => {
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
