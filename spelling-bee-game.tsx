import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
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
    // Mock teams data for now, as there's no UI to add them yet.
    const [teams, setTeams] = useState([
        { name: "Team Alpha", lives: 5 },
        { name: "Team Beta", lives: 5 }
    ]);
    const [gameMode, setGameMode] = useState("team");
    const [timerDuration, setTimerDuration] = useState(30);
    // ... other setup states

    const handleStart = () => {
        const config = { teams, gameMode, timerDuration /* ... other configs */ };
        onStartGame(config);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold mb-4 text-yellow-300">🏆 SPELLING BEE CHAMPIONSHIP</h1>
                    <p className="text-2xl">Get ready to spell your way to victory!</p>
                </div>

                {/* Timer selection UI */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4 text-center">Select Timer Duration</h2>
                    <div className="flex justify-center gap-4">
                        {[15, 30, 45, 60].map(time => (
                            <button
                                key={time}
                                onClick={() => setTimerDuration(time)}
                                className={`px-6 py-3 rounded-lg text-xl font-bold ${timerDuration === time ? 'bg-yellow-300 text-black' : 'bg-blue-500 hover:bg-blue-400'}`}
                            >
                                {time}s
                            </button>
                        ))}
                    </div>
                </div>

                {/* All the setup UI goes here */}
                <button onClick={handleStart} className="w-full bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl text-2xl font-bold mt-8">
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
    const [timeLeft, setTimeLeft] = useState(config.timerDuration);
    // ... other game states

    // Timer effect
    useEffect(() => {
        if (!currentWord || timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [currentWord, timeLeft]);

    const selectRandomWord = (difficulty) => {
        const words = wordDatabase[difficulty] || wordDatabase.easy;
        const word = words[Math.floor(Math.random() * words.length)];
        setTimeLeft(config.timerDuration); // Reset timer when a new word is selected
        return word;
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


    const [inputValue, setInputValue] = useState("");
    const [feedback, setFeedback] = useState({ message: "", type: "" });

    const handleSpellingSubmit = () => {
        if (!currentWord) return;

        const isCorrect = inputValue.trim().toLowerCase() === currentWord.word.toLowerCase();

        if (isCorrect) {
            setFeedback({ message: "Correct!", type: "success" });
        } else {
            setFeedback({ message: "Incorrect. Try again next time!", type: "error" });
            const updatedTeams = teams.map((team, index) => {
                if (index === currentTeamIndex) {
                    return { ...team, lives: team.lives - 1 };
                }
                return team;
            });
            setTeams(updatedTeams);
        }

        // Clear input and feedback after a short delay, then move to the next turn
        setTimeout(() => {
            setFeedback({ message: "", type: "" });
            setInputValue("");
            const newWord = selectRandomWord('easy'); // or current difficulty
            setCurrentWord(newWord);
            nextTurn();
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white flex flex-col items-center justify-center">
            {/* Team Lives Display */}
            <div className="absolute top-8 left-8 flex gap-8">
                {teams.map((team, index) => (
                    <div key={index} className="text-center">
                        <div className="text-2xl font-bold">{team.name}</div>
                        <div className="text-4xl font-bold text-yellow-300">{'❤️'.repeat(team.lives)}</div>
                    </div>
                ))}
            </div>

            {/* Feedback Message */}
            {feedback.message && (
                <div className={`absolute top-8 text-2xl font-bold px-6 py-3 rounded-lg ${feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {feedback.message}
                </div>
            )}

            {/* Timer Display */}
            <div className="absolute top-8 right-8 text-center">
                <div className={`text-6xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-yellow-300'}`}>{timeLeft}</div>
                <div className="text-lg">seconds left</div>
            </div>

            {currentWord && (
                <div className="w-full max-w-4xl text-center">
                    <h2 className="text-4xl font-bold mb-4">Word for Team: {teams[currentTeamIndex]?.name || 'Team'}</h2>
                    <div className="bg-white/10 p-6 rounded-lg mb-8">
                        <p className="text-2xl mb-2"><strong className="text-yellow-300">Definition:</strong> {currentWord.definition}</p>
                        <p className="text-xl mb-2"><strong className="text-yellow-300">Origin:</strong> {currentWord.origin}</p>
                        <p className="text-xl"><strong className="text-yellow-300">In a sentence:</strong> "{currentWord.sentence}"</p>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="text-2xl p-4 rounded-lg bg-white/20 border-2 border-transparent focus:border-yellow-300 focus:outline-none w-1/2"
                            placeholder="Type the word here..."
                        />
                        <button onClick={handleSpellingSubmit} className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-2xl font-bold">
                            Submit
                        </button>
                    </div>
                </div>
            )}

            <button onClick={skipWord} className="absolute bottom-8 right-8 bg-orange-500 hover:bg-orange-600 p-4 rounded-lg text-xl">
                <SkipForward size={24} />
            </button>
        </div>
    );
};

const ResultsScreen = ({ results, onRestart }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold mb-4 text-yellow-300">🏆 Game Over! 🏆</h1>
            {results && results.winner ? (
                <h2 className="text-4xl mb-8">Winner: {results.winner.name}</h2>
            ) : (
                <h2 className="text-4xl mb-8">It's a draw!</h2>
            )}

            <div className="bg-white/10 p-8 rounded-lg w-full max-w-md">
                <h3 className="text-3xl font-bold mb-4">Final Scores</h3>
                {results && results.teams.map((team, index) => (
                    <div key={index} className="flex justify-between items-center text-2xl mb-2">
                        <span>{team.name}</span>
                        <span className="font-bold text-yellow-300">{team.lives} lives remaining</span>
                    </div>
                ))}
            </div>

            <button onClick={onRestart} className="mt-12 bg-blue-500 hover:bg-blue-600 px-10 py-5 rounded-xl text-2xl font-bold">
                Play Again
            </button>
        </div>
    );
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
