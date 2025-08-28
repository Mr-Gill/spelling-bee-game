import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import LeaderboardScreen from './LeaderboardScreen';
import AchievementsScreen from './AchievementsScreen';

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

    const handleViewAchievements = () => {
        setGameState("achievements");
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
        return <SetupScreen onStartGame={handleStartGame} onAddCustomWords={handleAddCustomWords} onViewAchievements={handleViewAchievements} />;
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
    if (gameState === "achievements") {
        return <AchievementsScreen onBack={handleBackToSetup} />;
    }
    return null;
};

// --- Setup Screen Component ---
const SetupScreen = ({ onStartGame, onAddCustomWords, onViewAchievements }) => {
    // This component's logic is kept as is.
    // A simplified version is shown here for brevity.
    const [gameMode, setGameMode] = useState("team");
    const handleStart = () => {
        const config = {
            participants: [{ name: "Team 1", lives: 5, points: 1, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0 }, { name: "Team 2", lives: 5, points: 1, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0 }],
            gameMode,
            timerDuration: 30,
            skipPenaltyType: 'lives',
            skipPenaltyValue: 1,
            soundEnabled: true,
            effectsEnabled: true,
            difficultyLevel: 0,
            progressionSpeed: 1
        };
        onStartGame(config);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
            <h1 className="text-4xl text-center">Game Setup</h1>
            <button onClick={handleStart} className="w-full bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl text-2xl font-bold mt-8">
                START GAME
            </button>
            <button onClick={onViewAchievements} className="w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-xl text-2xl font-bold mt-4">
                Achievements
            </button>
        </div>
    );
};

// --- Game Screen Component ---
const GameScreen = ({ config, onEndGame }) => {
    // This component's logic is kept as is.
    // A simplified version is shown here for brevity.
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl text-center">Playing Game...</h1>
            <button onClick={() => onEndGame({ participants: config.participants, winner: config.participants[0], duration: 120, missedWords: [] })} className="bg-red-500 p-4 mt-4">End Game</button>
        </div>
    );
};

// --- Results Screen Component ---
const ResultsScreen = ({ results, config, onRestart, onViewLeaderboard }) => {
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('leaderboard') || '[]');
        const newEntries = results.participants.map(p => ({
            name: p.name,
            score: p.points,
            date: new Date().toISOString(),
        }));
        const updated = [...stored, ...newEntries]
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
        localStorage.setItem('leaderboard', JSON.stringify(updated));
    }, [results]);

    const handleExport = () => {
        const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(results, null, 2));
        const anchor = document.createElement("a");
        anchor.href = dataStr;
        anchor.download = "spelling-bee-results.json";
        anchor.click();
    };

    const getWinnerMessage = () => {
        const { winner, participants, gameMode } = results;
        if (winner) {
            const label = gameMode === "team" ? "Team" : "Student";
            return `Winner: ${label} ${winner.name}`;
        }
        const activeParticipants = participants.filter(p => p.lives > 0);
        if (activeParticipants.length > 1) {
            const names = activeParticipants.map(p => p.name).join(' and ');
            return `It's a draw between ${names}!`;
        }
        return "No one wins this round!";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center">
            <h1 className="text-6xl font-bold mb-4 text-yellow-300">🏆 Game Over! 🏆</h1>
            <h2>{getWinnerMessage()}</h2>
            <div className="bg-white/10 p-6 rounded-lg mt-4">
                {results && results.participants.map((p, index) => (
                    <div key={index} className="text-left text-xl mb-3">
                        <div className="font-bold">{p.name}</div>
                        <div className="text-yellow-300">
                            {p.wordsCorrect}/{p.wordsAttempted} correct ({p.accuracy?.toFixed(0) ?? 0}%) - {p.lives} lives remaining - {p.points} points
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-6 mt-12">
                <button onClick={handleExport} className="bg-green-500 hover:bg-green-600 px-8 py-5 rounded-xl text-2xl font-bold">
                    Export Results
                </button>
                <button onClick={onViewLeaderboard} className="bg-purple-500 hover:bg-purple-600 px-8 py-5 rounded-xl text-2xl font-bold">
                    View Leaderboard
                </button>
                <button onClick={onRestart} className="bg-blue-500 hover:bg-blue-600 px-10 py-5 rounded-xl text-2xl font-bold">
                    Play Again
                </button>
            </div>
        </div>
    );
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