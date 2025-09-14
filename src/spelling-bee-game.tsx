import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import LeaderboardScreen from './LeaderboardScreen';
import SetupScreen from './SetupScreen';
import GameScreen from './GameScreen';
import ResultsScreen from './ResultsScreen';
import AchievementsScreen from './AchievementsScreen';
import ShopScreen from './ShopScreen';
import useMusic from './utils/useMusic';
import { AudioProvider } from "./AudioContext";
import ScoreboardScreen from './ScoreboardScreen';

// --- Type Definitions ---
type Participant = {
  // Add participant properties here
};

type WordDatabase = {
  easy: string[];
  medium: string[];
  tricky: string[];
};

type GameConfig = {
  participants: Participant[];
  gameMode: 'team' | 'individual';
  timerDuration: number;
  skipPenaltyType: 'lives' | 'points';
  skipPenaltyValue: number;
  soundEnabled: boolean;
  effectsEnabled: boolean;
  difficultyLevel: number;
  progressionSpeed: number;
  musicStyle: string;
  musicVolume: number;
  wordDatabase: WordDatabase;
};

// --- Main App Component ---
const SpellingBeeGame = () => {
    const [gameState, setGameState] = useState("setup");
    const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
    const [gameResults, setGameResults] = useState(null);
    const [customWords, setCustomWords] = useState({ easy: [], medium: [], tricky: [] });
    const [wordDatabase, setWordDatabase] = useState<WordDatabase>({ easy: [], medium: [], tricky: [] });
    const [musicStyle, setMusicStyle] = useState('Funk');
    const [musicVolume, setMusicVolume] = useState(0.5);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [isMusicPlaying, setIsMusicPlaying] = useState(true);

    useEffect(() => {
        fetch('words.json')
            .then(res => res.json())
            .then(data => setWordDatabase(data))
            .catch(err => console.error('Failed to load word list', err));
    }, []);

    const handleAddCustomWords = (newWords) => {
        const easy = newWords.filter(w => w.word.length <= 5);
        const medium = newWords.filter(w => w.word.length > 5 && w.word.length <= 8);
        const tricky = newWords.filter(w => w.word.length > 8);
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
        setGameConfig(config);
        setSoundEnabled(config.soundEnabled);
        setMusicStyle(config.musicStyle);
        setMusicVolume(config.musicVolume);
        setIsMusicPlaying(true);
        setGameState("playing");
    };

    const handleEndGame = (results) => {
        setGameResults(results);
        setGameState("results");
    };

    const handleRestart = () => {
        setGameState("setup");
        setGameConfig(null);
        setGameResults(null);
    };

    const handleViewLeaderboard = () => {
        setGameState("leaderboard");
    };

    const handleViewAchievements = () => {
        setGameState("achievements");
    };

    const handleViewShop = () => {
        setGameState("shop");
    };

    const handleBackToSetup = () => {
        setGameState("setup");
    };

    const handleQuitToSetup = () => {
        setGameState("setup");
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.remove('theme-light', 'theme-dark', 'theme-honeycomb');
            document.body.classList.add(`theme-${savedTheme}`);
        }
    }, []);

    // Handle background music on different screens
    const screen = gameState === 'playing' ? 'game' : 'menu';
    const trackVariant = screen === 'game' ? 'instrumental' : 'vocal';
    useMusic(musicStyle, trackVariant, musicVolume, soundEnabled, screen);

    const [scoreboardWindow, setScoreboardWindow] = useState<Window | null>(null);

    const openScoreboard = () => {
        if (typeof window === 'undefined') return;
        if (scoreboardWindow && !scoreboardWindow.closed) {
            scoreboardWindow.focus();
            return;
        }
        const win = window.open('', 'scoreboard', 'width=600,height=400');
        if (win) {
            win.document.title = 'Scoreboard';
            const rootEl = win.document.createElement('div');
            win.document.body.appendChild(rootEl);
            ReactDOM.createRoot(rootEl).render(<ScoreboardScreen />);
            setScoreboardWindow(win);
        }
    };

    let content = null;
    if (gameState === "setup") {
        content = (
          <SetupScreen
            onStartGame={handleStartGame}
            onAddCustomWords={handleAddCustomWords}
            onViewAchievements={handleViewAchievements}
            onViewShop={() => handleViewShop()}
          />
        );
    } else if (gameState === "playing") {
        content = (
            <GameScreen
                config={gameConfig}
                onEndGame={handleEndGame}
                musicStyle={musicStyle}
                musicVolume={musicVolume}
                onMusicStyleChange={setMusicStyle}
                onMusicVolumeChange={setMusicVolume}
                soundEnabled={soundEnabled}
                onSoundEnabledChange={setSoundEnabled}
                isMusicPlaying={isMusicPlaying}
                onToggleMusicPlaying={() => setIsMusicPlaying(prev => !prev)}
                onQuit={handleQuitToSetup}
            />
        );
    } else if (gameState === "results") {
        content = <ResultsScreen results={gameResults} config={gameConfig} onRestart={handleRestart} onViewLeaderboard={handleViewLeaderboard} />;
    } else if (gameState === "leaderboard") {
        content = <LeaderboardScreen onBack={handleBackToSetup} />;
    } else if (gameState === "achievements") {
        content = <AchievementsScreen onBack={handleBackToSetup} />;
    } else if (gameState === "shop") {
        content = <ShopScreen onBack={handleBackToSetup} />;
    }

    return (
        <>
            <button
                className="absolute top-2 right-2 bg-yellow-300 text-black px-4 py-2 rounded"
                onClick={openScoreboard}
            >
                Show Scoreboard
            </button>
            {content}
        </>
    );
};

// --- App Rendering ---
const container = document.getElementById('root');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <AudioProvider>
                <SpellingBeeGame />
            </AudioProvider>
        </React.StrictMode>
    );
}