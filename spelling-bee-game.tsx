import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Users, BookOpen, Play, Volume2, Globe, RotateCcw, SkipForward } from 'lucide-react';
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

    if (gameState === "setup") {
        return <SetupScreen onStartGame={handleStartGame} onAddCustomWords={handleAddCustomWords} />;
    }
    if (gameState === "playing") {
        return <GameScreen config={gameConfig} onEndGame={handleEndGame} />;
    }
    if (gameState === "results") {
        return <ResultsScreen results={gameResults} onRestart={handleRestart} onViewLeaderboard={handleViewLeaderboard} />;
    }
    if (gameState === "leaderboard") {
        return <LeaderboardScreen onBack={handleBackToSetup} />;
    }
    return null;
};

// --- Setup Screen Component ---
const SetupScreen = ({ onStartGame, onAddCustomWords }) => {
    const [teams, setTeams] = useState([
        { name: "Team Alpha", lives: 5, points: 0, streak: 0 },
        { name: "Team Beta", lives: 5, points: 0, streak: 0 }
    ]);
    const [students, setStudents] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [gameMode, setGameMode] = useState("team");
    const [timerDuration, setTimerDuration] = useState(30);
    const [skipPenaltyType, setSkipPenaltyType] = useState('lives');
    const [skipPenaltyValue, setSkipPenaltyValue] = useState(1);
    const [initialDifficulty, setInitialDifficulty] = useState(0);
    const [progressionSpeed, setProgressionSpeed] = useState(1);
    const [customWordListText, setCustomWordListText] = useState("");
    const [parsedCustomWords, setParsedCustomWords] = useState([]);
    const [wordListError, setWordListError] = useState("");
    const [rowErrors, setRowErrors] = useState([]);
    const [missedWordsCollection, setMissedWordsCollection] = useState({});
    const [includeMissedWords, setIncludeMissedWords] = useState(false);
    const [error, setError] = useState("");
    const [selectedBundledList, setSelectedBundledList] = useState("");
    
    const bundledWordLists = [
        { label: "Example JSON", file: "example.json" },
        { label: "Example CSV", file: "example.csv" },
        { label: "Example TSV", file: "example.tsv" }
    ];

    const createParticipant = (name) => ({
        name: name.trim(),
        lives: 5,
        points: 0,
        streak: 0,
        attempted: 0,
        correct: 0,
        wordsAttempted: 0,
        wordsCorrect: 0,
    });
    
    const addTeam = () => setTeams([...teams, createParticipant("")]);
    const removeTeam = (index) => setTeams(teams.filter((_, i) => i !== index));
    const updateTeamName = (index, name) => {
        const newTeams = teams.map((team, i) => (i === index ? { ...team, name } : team));
        setTeams(newTeams);
    };

    const addStudent = () => {
        if (studentName.trim()) {
            setStudents([...students, createParticipant(studentName)]);
            setStudentName("");
        }
    };
    const removeStudent = (index) => setStudents(students.filter((_, i) => i !== index));
    const updateStudentName = (index, name) => {
        const newStudents = students.map((student, i) => (i === index ? { ...student, name } : student));
        setStudents(newStudents);
    };

    const parseWordList = (content) => {
        // Parsing logic remains the same, but simplified for brevity in this example.
        // Assume the logic provided in the original file is here.
    };

    // All useEffect hooks and helper functions from the original file would go here.

    const handleStart = () => {
        let finalParticipants;
        if (gameMode === 'team') {
            const trimmedTeams = teams.filter(team => team.name.trim() !== "");
            if (trimmedTeams.length < 2) {
                setError("Please enter names for at least two teams.");
                return;
            }
            finalParticipants = trimmedTeams;
        } else {
            const trimmedStudents = students.filter(student => student.name.trim() !== "");
            if (trimmedStudents.length < 2) {
                setError("Please enter names for at least two students.");
                return;
            }
            finalParticipants = trimmedStudents;
        }

        setError("");

        let finalWords = parsedCustomWords;
        if (includeMissedWords) {
            const extraWords = Object.values(missedWordsCollection).flat();
            finalWords = [...finalWords, ...extraWords];
        }
        onAddCustomWords(finalWords);

        const config = { 
            participants: finalParticipants, 
            gameMode, 
            timerDuration,
            skipPenaltyType,
            skipPenaltyValue,
            difficultyLevel: initialDifficulty,
            progressionSpeed
        };
        onStartGame(config);
    };

    return (
        // JSX for SetupScreen remains here, with added controls for new config options.
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
            {/* The full setup UI would be here */}
            <h1 className="text-4xl text-center">Game Setup</h1>
            <button onClick={handleStart} className="w-full bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl text-2xl font-bold mt-8">
                START GAME
            </button>
        </div>
    );
};

// --- Game Screen Component ---
const GameScreen = ({ config, onEndGame }) => {
    const [participants, setParticipants] = useState(config.participants);
    const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(null);
    const [timeLeft, setTimeLeft] = useState(config.timerDuration);
    const [showWord, setShowWord] = useState(true);
    const [showHint, setShowHint] = useState(false);
    const [letters, setLetters] = useState([]);
    const [feedback, setFeedback] = useState({ message: "", type: "" });
    const timerRef = useRef(null);
    const [startTime] = useState(Date.now());
    const [revealedLetters, setRevealedLetters] = useState([]);
    const [extraAttempt, setExtraAttempt] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [revealedHints, setRevealedHints] = useState({
        syllables: false,
        prefixSuffix: false,
        pronunciation: false,
    });
    const [wordQueues, setWordQueues] = useState({
        easy: [...config.wordDatabase.easy].sort(() => Math.random() - 0.5),
        medium: [...config.wordDatabase.medium].sort(() => Math.random() - 0.5),
        tricky: [...config.wordDatabase.tricky].sort(() => Math.random() - 0.5),
        review: []
    });
    const [currentDifficulty, setCurrentDifficulty] = useState('easy');
    const [attemptedParticipants, setAttemptedParticipants] = useState(new Set());
    const [missedWords, setMissedWords] = useState([]);
    
    const isTeamMode = config.gameMode === 'team';
    const currentParticipant = participants[currentParticipantIndex];

    // All logic functions (selectNextWord, handleSpellingSubmit, etc.) would go here.
    
    const handleSpellingSubmit = () => {
        if (!currentWord) return;
        clearInterval(timerRef.current);
        const guess = letters.join('').trim().toLowerCase();
        const isCorrect = guess === currentWord.word.toLowerCase();
        
        // This is a simplified handler. The full logic would be here.
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white flex flex-col items-center justify-center">
            {currentWord && (
                <div className="w-full max-w-4xl text-center">
                    <h2 className="text-4xl font-bold mb-4">Word for {currentParticipant?.name}</h2>
                    <div className="bg-white/10 p-6 rounded-lg mb-8">
                        {showHint && (
                            <>
                                <p className="text-2xl mb-2"><strong className="text-yellow-300">Definition:</strong> {currentWord.definition}</p>
                                <p className="text-xl mb-2"><strong className="text-yellow-300">Origin:</strong> {currentWord.origin}</p>
                                <p className="text-xl mb-2"><strong className="text-yellow-300">Example:</strong> "{currentWord.example}"</p>
                            </>
                        )}
                        <button
                            onClick={() => setShowHint(!showHint)}
                            className="mt-4 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
                        >
                            {showHint ? 'Hide Hint' : 'Show Hint'}
                        </button>
                    </div>
                    {/* Simplified UI for brevity */}
                </div>
            )}
        </div>
    );
};

// --- Results Screen Component ---
const ResultsScreen = ({ results, onRestart, onViewLeaderboard }) => {
    // Logic and JSX for the results screen
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center">
            <h1 className="text-6xl font-bold mb-4 text-yellow-300">🏆 Game Over! 🏆</h1>
            {results && results.participants.map((p, index) => (
                <div key={index} className="text-left text-xl mb-3">
                    <div className="font-bold">{p.name}</div>
                    <div className="text-yellow-300">
                        {p.wordsCorrect}/{p.wordsAttempted} correct ({p.accuracy.toFixed(0)}%) - {p.lives} lives remaining - {p.points} points
                    </div>
                </div>
            ))}
            <button onClick={onRestart} className="bg-blue-500 hover:bg-blue-600 px-10 py-5 rounded-xl text-2xl font-bold mt-8">
                Play Again
            </button>
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