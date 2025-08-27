import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Play, Volume2, Globe, RotateCcw, SkipForward } from 'lucide-react';

const wordDatabase = {
    easy: [
        { word: "friend", syllables: "friend (1 syllable)", definition: "A person you like and know well", origin: "Old English 'freond', from Germanic root meaning 'to love'", sentence: "My best friend and I love to play together.", prefixSuffix: "Base word with no prefix or suffix", pronunciation: "FREND" },
        { word: "happy", syllables: "hap-py (2 syllables)", definition: "Feeling or showing pleasure and contentment", origin: "Middle English 'happy', from 'hap' meaning luck or fortune", sentence: "The children were happy to see the circus.", prefixSuffix: "Base word 'hap' + suffix '-py'", pronunciation: "HAP-ee" },
    ],
    medium: [
        { word: "necessary", syllables: "nec-es-sar-y (4 syllables)", definition: "Required to be done or achieved; essential", origin: "Latin 'necessarius', from 'necesse' meaning unavoidable", sentence: "It is necessary to study hard for the test.", prefixSuffix: "Base 'necess' + suffix '-ary'", pronunciation: "NES-uh-ser-ee" },
    ],
    tricky: [
        { word: "chrysanthemum", syllables: "chry-san-the-mum (4 syllables)", definition: "A type of flower with many thin petals", origin: "Greek 'chrysos' (gold) + 'anthemon' (flower)", sentence: "The chrysanthemum bloomed beautifully in autumn.", prefixSuffix: "Greek compound: chryso- (gold) + -anthemum (flower)", pronunciation: "kri-SAN-thuh-mum" },
    ],
};

const SpellingBeeGame = () => {
    const [gameState, setGameState] = useState("setup");
    const [gameConfig, setGameConfig] = useState(null);
    const [gameResults, setGameResults] = useState(null);

    const handleStartGame = (config) => {
        setGameConfig(config);
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

    if (gameState === "setup") {
        return <SetupScreen onStartGame={handleStartGame} />;
    }
    if (gameState === "playing") {
        return <GameScreen config={gameConfig} onEndGame={handleEndGame} />;
    }
    if (gameState === "results") {
        return <ResultsScreen results={gameResults} onRestart={handleRestart} />;
    }
    return null;
};

const SetupScreen = ({ onStartGame }) => {
    const [teams, setTeams] = useState([]);
    const [gameMode, setGameMode] = useState("team");
    // ... other setup states

    const handleStart = () => {
        const config = { teams, gameMode /* ... other configs */ };
        onStartGame(config);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold mb-4 text-yellow-300">🏆 SPELLING BEE CHAMPIONSHIP</h1>
                    <p className="text-2xl">Get ready to spell your way to victory!</p>
                </div>
                {/* All the setup UI goes here */}
                <button onClick={handleStart} className="w-full bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl text-2xl font-bold">
                    START GAME
                </button>
            </div>
        </div>
    );
};

const GameScreen = ({ config, onEndGame }) => {
    const [teams, setTeams] = useState(config.teams);
    const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(null);
    // ... other game states

    const selectRandomWord = (difficulty) => {
        // ... logic to select a word
    };

    const skipWord = () => {
        // Logic for skipping a word
        // For example, select a new word and move to the next turn
        const newWord = selectRandomWord('easy'); // or current difficulty
        setCurrentWord(newWord);
        // maybe penalize the team
        nextTurn();
    };

    const nextTurn = () => {
        setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
    };

    useEffect(() => {
        setCurrentWord(selectRandomWord('easy'));
    }, []);

    // Check for game over condition
    useEffect(() => {
        if (!teams || teams.length === 0) return;
        const activeTeams = teams.filter(t => t.lives > 0);
        if (activeTeams.length <= 1) {
            onEndGame({ winner: activeTeams[0], teams });
        }
    }, [teams, onEndGame]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white">
            {/* All the game UI, passing props down to smaller components */}
            <button onClick={skipWord} className="bg-orange-500 hover:bg-orange-600 p-2 rounded-lg">
                <SkipForward /> Skip Word
            </button>
        </div>
    );
};

const ResultsScreen = ({ results, onRestart }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center">
            <h1 className="text-5xl font-bold mb-4">Game Over!</h1>
            {results && results.winner && <h2 className="text-3xl text-yellow-300">Winner: {results.winner.name}</h2>}
            {/* Display scores and other results */}
            <button onClick={onRestart} className="mt-8 bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl text-xl font-semibold">
                Play Again
            </button>
        </div>
    );
};

export default SpellingBeeGame;
