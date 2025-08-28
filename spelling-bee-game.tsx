import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import SetupScreen from './SetupScreen';
import GameScreen from './GameScreen';
import ResultsScreen from './ResultsScreen';
import LeaderboardScreen from './LeaderboardScreen';

// --- Main App Component ---
const SpellingBeeGame = () => {
    const [gameState, setGameState] = useState("setup");
    const [gameConfig, setGameConfig] = useState(null);
    const [gameResults, setGameResults] = useState(null);
    const [customWords, setCustomWords] = useState({ easy: [], medium: [], tricky: [] });
    const [wordDatabase, setWordDatabase] = useState({ easy: [], medium: [], tricky: [] });

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

    const handleStartGame = (config) => {
        const finalWordDatabase = {
            easy: [...wordDatabase.easy, ...customWords.easy],
            medium: [...wordDatabase.medium, ...customWords.medium],
            tricky: [...wordDatabase.tricky, ...customWords.tricky],
        };
        setGameConfig({ ...config, wordDatabase: finalWordDatabase });
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

    const handleBackToSetup = () => {
        setGameState("setup");
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.remove('theme-light', 'theme-dark', 'theme-honeycomb');
            document.body.classList.add(`theme-${savedTheme}`);
        }
    }, []);

    if (gameState === "setup") {
        return <SetupScreen onStartGame={handleStartGame} onAddCustomWords={handleAddCustomWords} />;
    }
    if (gameState === "playing") {
        return <GameScreen config={gameConfig} onEndGame={handleEndGame} />;
    }
    if (gameState === "results") {
        return <ResultsScreen results={gameResults} config={gameConfig} onRestart={handleRestart} onViewLeaderboard={handleViewLeaderboard} />;
    }
    if (gameState === "leaderboard") {
        return <LeaderboardScreen onBack={handleBackToSetup} />;
    }
    return null;
};


// --- App Rendering ---
const container = document.getElementById('root');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <SpellingBeeGame />
        </React.StrictMode>
    );
}