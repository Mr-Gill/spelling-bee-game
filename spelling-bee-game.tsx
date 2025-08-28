import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import SetupScreen from './SetupScreen';
import GameScreen from './GameScreen';
import ResultsScreen from './ResultsScreen';
import { GameConfig, GameResults, Word, WordDatabase } from './types';

const SpellingBeeGame: React.FC = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'results'>('setup');
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [gameResults, setGameResults] = useState<GameResults | null>(null);
  const [customWords, setCustomWords] = useState<WordDatabase>({ easy: [], medium: [], tricky: [] });
  const [wordDatabase, setWordDatabase] = useState<WordDatabase>({ easy: [], medium: [], tricky: [] });

  useEffect(() => {
    fetch('words.json')
      .then(res => res.json())
      .then((data: WordDatabase) => setWordDatabase(data))
      .catch(err => console.error('Failed to load word list', err));
  }, []);

  const handleAddCustomWords = (newWords: Word[]) => {
    const easy = newWords.filter(w => w.word.length <= 5);
    const medium = newWords.filter(w => w.word.length > 5 && w.word.length <= 8);
    const tricky = newWords.filter(w => w.word.length > 8);
    setCustomWords({ easy, medium, tricky });
  };

  const handleStartGame = (config: GameConfig) => {
    const finalWordDatabase: WordDatabase = {
      easy: [...wordDatabase.easy, ...customWords.easy],
      medium: [...wordDatabase.medium, ...customWords.medium],
      tricky: [...wordDatabase.tricky, ...customWords.tricky]
    };
    setGameConfig({ ...config, wordDatabase: finalWordDatabase });
    setGameState('playing');
  };

  const handleEndGame = (results: GameResults) => {
    setGameResults(results);
    setGameState('results');
  };

  const handleRestart = () => {
    setGameState('setup');
    setGameConfig(null);
    setGameResults(null);
  };

  if (gameState === 'setup') {
    return <SetupScreen onStartGame={handleStartGame} onAddCustomWords={handleAddCustomWords} />;
  }
  if (gameState === 'playing' && gameConfig) {
    return <GameScreen config={gameConfig} onEndGame={handleEndGame} />;
  }
  if (gameState === 'results' && gameResults) {
    return <ResultsScreen results={gameResults} onRestart={handleRestart} />;
  }
  return null;
};

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <SpellingBeeGame />
    </React.StrictMode>
  );
}
