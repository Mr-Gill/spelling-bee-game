import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CountdownScreen from './CountdownScreen';
import LeaderboardScreen from './LeaderboardScreen';
import SetupScreen from './SetupScreen';
import GameScreen from './GameScreen';
import ResultsScreen from './ResultsScreen';
import AchievementsScreen from './AchievementsScreen';
import HistoryScreen from './HistoryScreen';
import ShopScreen from './ShopScreen';
import PracticeScreen from './PracticeScreen';
import TeamDisplay from './TeamDisplay';
import ScoreboardScreen from './ScoreboardScreen';
import useMusic from './utils/useMusic';
import { applyThemeClass } from './utils/theme';
import { applyAccessibilitySettings } from './components/AccessibilitySettings';
import { audioManager } from './utils/audio.ts';
import { AudioProvider } from './AudioContext';
import { HelpSystemProvider } from './contexts/HelpSystemContext';
import { getWordList, clearWordListCache, type Word as WordListWord } from './services/wordlistService';
import { getDueReviewWords } from './utils/reviewQueue';

// Import types
import type { GameConfig, Word } from './types';

// --- Main App Component ---
const SpellingBeeGame = () => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('team') === '1') {
      return <TeamDisplay />;
    }
    if (params.get('scoreboard') === '1') {
      return <ScoreboardScreen />;
    }
  }

  const [gameState, setGameState] = useState('setup');
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [pendingGameConfig, setPendingGameConfig] = useState<GameConfig | null>(null);
  const [gameResults, setGameResults] = useState<any>(null);
  const [customWords, setCustomWords] = useState<GameConfig['wordDatabase']>({ easy: [], medium: [], tricky: [] });
  const [wordDatabase, setWordDatabase] = useState<GameConfig['wordDatabase']>({ easy: [], medium: [], tricky: [] });
  const [musicStyle, setMusicStyle] = useState('Funk');
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  // Helper function to convert WordListWord to Word type
  const convertWord = (w: WordListWord): Word => ({
    word: w.word,
    syllables: w.syllables || null,
    phonemes: w.phonemes || Array.from(w.word.toUpperCase()),
    definition: w.definition || null,
    origin: w.origin || null,
    example: w.example || null,
    prefix: w.prefix || null,
    suffix: w.suffix || null,
    pronunciation: w.pronunciation || undefined,
    difficulty: w.difficulty,
  });

  useEffect(() => {
    // Load word list from wordlistService (supports custom word lists)
    const loadWordList = () => {
      getWordList()
        .then(wordsFromService => {
          // Convert words to the expected type
          const words = wordsFromService.map(convertWord);

          // Convert flat word array to WordDatabase format
          const wordDatabase: GameConfig['wordDatabase'] = {
            easy: words.filter(w => w.difficulty === 'easy' || !w.difficulty),
            medium: words.filter(w => w.difficulty === 'medium'),
            tricky: words.filter(w => w.difficulty === 'hard'),
          };

          // If no words have difficulties, distribute by word length
          if (wordDatabase.easy.length === 0 && wordDatabase.medium.length === 0 && wordDatabase.tricky.length === 0) {
            wordDatabase.easy = words.filter(w => w.word.length <= 5);
            wordDatabase.medium = words.filter(w => w.word.length > 5 && w.word.length <= 8);
            wordDatabase.tricky = words.filter(w => w.word.length > 8);
          }

          setWordDatabase(wordDatabase);
        })
        .catch(err => console.error('Failed to load word list', err));
    };

    loadWordList();
  }, []);

  // Reload word list when returning to setup screen
  useEffect(() => {
    if (gameState === 'setup') {
      getWordList()
        .then(wordsFromService => {
          // Convert words to the expected type
          const words = wordsFromService.map(convertWord);

          // Convert flat word array to WordDatabase format
          const wordDatabase: GameConfig['wordDatabase'] = {
            easy: words.filter(w => w.difficulty === 'easy' || !w.difficulty),
            medium: words.filter(w => w.difficulty === 'medium'),
            tricky: words.filter(w => w.difficulty === 'hard'),
          };

          // If no words have difficulties, distribute by word length
          if (wordDatabase.easy.length === 0 && wordDatabase.medium.length === 0 && wordDatabase.tricky.length === 0) {
            wordDatabase.easy = words.filter(w => w.word.length <= 5);
            wordDatabase.medium = words.filter(w => w.word.length > 5 && w.word.length <= 8);
            wordDatabase.tricky = words.filter(w => w.word.length > 8);
          }

          setWordDatabase(wordDatabase);
        })
        .catch(err => console.error('Failed to load word list', err));
    }
  }, [gameState]);

  const handleAddCustomWords = (newWords: any[]) => {
    const easy = newWords.filter(w => w.difficulty === 'easy' || (!w.difficulty && w.word.length <= 5));
    const medium = newWords.filter(w => w.difficulty === 'medium' || (!w.difficulty && w.word.length > 5 && w.word.length <= 8));
    const tricky = newWords.filter(w => w.difficulty === 'hard' || w.difficulty === 'tricky' || (!w.difficulty && w.word.length > 8));
    setCustomWords({ easy, medium, tricky });
  };

  const handleStartGame = (config: GameConfig) => {
    let finalWordDatabase;
    if (config.dailyChallenge) {
      finalWordDatabase = customWords;
    } else {
      finalWordDatabase = {
        easy: [...wordDatabase.easy, ...customWords.easy],
        medium: [...wordDatabase.medium, ...customWords.medium],
        tricky: [...wordDatabase.tricky, ...customWords.tricky],
      };
    }
    setPendingGameConfig({ ...config, wordDatabase: finalWordDatabase });
    setSoundEnabled(config.soundEnabled);
    setMusicStyle(config.musicStyle);
    setMusicVolume(config.musicVolume);
    setIsMusicPlaying(true);
    setGameState('countdown');
  };

  const handleEndGame = (results: any) => {
    setGameResults(results);
    setGameState('results');
  };

  const handleRestart = () => {
    setGameState('setup');
    setGameConfig(null);
    setGameResults(null);
    // Clear word list cache to reload the latest selected word list
    clearWordListCache();
  };

  const handleViewLeaderboard = () => {
    setGameState('leaderboard');
  };

  const handleViewAchievements = () => {
    setGameState('achievements');
  };

  const handleViewHistory = () => {
    setGameState('history');
  };

  const handleViewShop = () => {
    setGameState('shop');
  };

  const handleBackToSetup = () => {
    setGameState('setup');
    // Clear word list cache to reload the latest selected word list
    clearWordListCache();
  };

  const handleStartWarmup = () => {
    setGameState('warmup');
  };

  const handleQuitToSetup = () => {
    setGameState('setup');
    // Clear word list cache to reload the latest selected word list
    clearWordListCache();
  };

  const handleExitGame = () => {
    // Return to setup when exiting game
    setGameState('setup');
    // Clear word list cache to reload the latest selected word list
    clearWordListCache();
  };

  const handleResumeGame = (savedState: any) => {
    // Resume game with saved state
    setGameConfig(savedState.gameConfig);
    setGameState('playing');
  };

  useEffect(() => {
    applyAccessibilitySettings();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      applyThemeClass(savedTheme);
    }
  }, []);

  // Handle background music on different screens
  const screen = gameState === 'playing' ? 'game' : 'menu';
  const trackVariant = screen === 'game' ? 'instrumental' : 'vocal';
  useMusic(musicStyle, trackVariant, musicVolume, soundEnabled, screen, isMusicPlaying);

  const handleSoundEnabledChange = (enabled: boolean) => {
    setSoundEnabled(enabled);

    if (!enabled) {
      audioManager.pauseMusic();
    } else if (isMusicPlaying) {
      audioManager.resumeMusic();
    }
  };

  const handleToggleMusicPlaying = () => {
    setIsMusicPlaying(prev => {
      const next = !prev;
      if (!next) {
        audioManager.pauseMusic();
      } else if (soundEnabled) {
        audioManager.resumeMusic();
      }
      return next;
    });
  };

  const wordListsReady = wordDatabase.easy.length + wordDatabase.medium.length + wordDatabase.tricky.length > 0;

  if (gameState === 'setup') {
    return (
      <SetupScreen
        onStartGame={handleStartGame}
        onAddCustomWords={handleAddCustomWords}
        onViewAchievements={handleViewAchievements}
        onResumeGame={handleResumeGame}
        onViewHistory={handleViewHistory}
        onViewShop={() => handleViewShop()}
        onStartWarmup={handleStartWarmup}
        wordListsReady={wordListsReady}
      />
    );
  }
  if (gameState === 'countdown') {
    return (
      <CountdownScreen
        onDone={() => {
          const nextGameConfig = pendingGameConfig;

          if (!nextGameConfig) {
            setPendingGameConfig(null);
            setGameState('setup');
            return;
          }

          setGameConfig(nextGameConfig);
          setPendingGameConfig(null);
          setGameState('playing');
        }}
      />
    );
  }
  if (gameState === 'warmup') {
    const reviewWords = getDueReviewWords();
    const practiceWords = [
      ...wordDatabase.easy,
      ...wordDatabase.medium,
      ...wordDatabase.tricky,
      ...customWords.easy,
      ...customWords.medium,
      ...customWords.tricky,
    ];
    return <PracticeScreen words={practiceWords} reviewWords={reviewWords} onBack={handleBackToSetup} />;
  }
  if (gameState === 'playing' && gameConfig) {
    return (
      <GameScreen
        config={gameConfig}
        onEndGame={handleEndGame}
        onExitGame={handleExitGame}
        musicStyle={musicStyle}
        musicVolume={musicVolume}
        onMusicStyleChange={setMusicStyle}
        onMusicVolumeChange={setMusicVolume}
        soundEnabled={soundEnabled}
        onSoundEnabledChange={handleSoundEnabledChange}
        isMusicPlaying={isMusicPlaying}
        onToggleMusicPlaying={handleToggleMusicPlaying}
      />
    );
  }
  if (gameState === 'results') {
    return (
      <ResultsScreen
        results={gameResults}
        config={gameConfig}
        onRestart={handleRestart}
        onViewLeaderboard={handleViewLeaderboard}
      />
    );
  }
  if (gameState === 'leaderboard') {
    return <LeaderboardScreen onBack={handleBackToSetup} />;
  }
  if (gameState === 'achievements') {
    return <AchievementsScreen onBack={handleBackToSetup} />;
  }
  if (gameState === 'history') {
    return <HistoryScreen onBack={handleBackToSetup} />;
  }
  if (gameState === 'shop') {
    return <ShopScreen onBack={handleBackToSetup} />;
  }
  return null;
};

// --- App Rendering ---
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <AudioProvider>
        <HelpSystemProvider>
          <SpellingBeeGame />
        </HelpSystemProvider>
      </AudioProvider>
    </React.StrictMode>
  );
}

export default SpellingBeeGame;
