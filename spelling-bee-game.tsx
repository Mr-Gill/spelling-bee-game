import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Users, BookOpen, Play, Volume2, Globe, RotateCcw, SkipForward } from 'lucide-react';

// The wordDatabase remains unchanged
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
    const [customWords, setCustomWords] = useState({ easy: [], medium: [], tricky: [] });

    const handleAddCustomWords = (newWords) => {
        // Simple difficulty assignment based on word length for now
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

    if (gameState === "setup") {
        return <SetupScreen onStartGame={handleStartGame} onAddCustomWords={handleAddCustomWords} />;
    }
    if (gameState === "playing") {
        return <GameScreen config={gameConfig} onEndGame={handleEndGame} />;
    }
    if (gameState === "results") {
        return <ResultsScreen results={gameResults} onRestart={handleRestart} />;
    }
    return null;
};

const SetupScreen = ({ onStartGame, onAddCustomWords }) => {
    const [teams, setTeams] = useState([
        { name: "Team Alpha", lives: 5 },
        { name: "Team Beta", lives: 5 }
    ]);
    const [gameMode, setGameMode] = useState("team");
    const [timerDuration, setTimerDuration] = useState(30);
    const [customWordListText, setCustomWordListText] = useState("");
    const [parsedCustomWords, setParsedCustomWords] = useState([]); // From codex branch
    const [missedWordsCollection, setMissedWordsCollection] = useState({}); // From codex branch
    const [includeMissedWords, setIncludeMissedWords] = useState(false); // From codex branch
    const [error, setError] = useState("");

    const addTeam = () => {
        setTeams([...teams, { name: "", lives: 5 }]);
    };

    const removeTeam = (index) => {
        setTeams(teams.filter((_, i) => i !== index));
    };

    const updateTeamName = (index, name) => {
        const newTeams = teams.map((team, i) =>
            i === index ? { ...team, name } : team
        );
        setTeams(newTeams);
    };

    const parseWordList = (content) => {
        try {
            // Try parsing as JSON first
            const parsed = JSON.parse(content);
            if (Array.isArray(parsed)) {
                setParsedCustomWords(parsed);
                return;
            }
        } catch (e) {
            // Not a valid JSON array, try parsing as TSV
        }

        // Parse as CSV or TSV
        const lines = content.trim().split('\n');
        if (lines.length < 2) return; // Need at least a header and one data row

        const headerLine = lines[0];
        const delimiter = headerLine.includes(',') ? ',' : '\t';

        const headers = headerLine.split(delimiter).map(h => h.trim());
        const words = lines.slice(1).map(line => {
            // Basic CSV parsing - doesn't handle commas inside quotes.
            // For this application, it's a reasonable starting point.
            const values = line.split(delimiter);
            const wordObj = {};
            headers.forEach((header, index) => {
                wordObj[header] = values[index] ? values[index].trim() : "";
            });
            return wordObj;
        });
        setParsedCustomWords(words);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                setCustomWordListText(content);
                parseWordList(content);
            };
            reader.readAsText(file);
        }
    };

    useEffect(() => {
        if(customWordListText) {
            parseWordList(customWordListText)
        }
    }, [customWordListText]);

    // From codex branch
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('missedWordsCollection') || '{}');
        setMissedWordsCollection(stored);
    }, []);

    const missedWordCount = Object.values(missedWordsCollection).reduce((acc, arr) => acc + arr.length, 0);

    const handleStart = () => {
        const trimmedTeams = teams.map(team => ({ ...team, name: team.name.trim() })).filter(team => team.name !== "");
        if (trimmedTeams.length < 2) {
            setError("Please enter names for at least two teams.");
            return;
        }
        setError("");
        
        let finalWords = parsedCustomWords;
        if (includeMissedWords) {
            const extraWords = Object.values(missedWordsCollection).flat();
            finalWords = [...finalWords, ...extraWords];
        }
        onAddCustomWords(finalWords);
        
        const config = { teams: trimmedTeams, gameMode, timerDuration };
        onStartGame(config);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold mb-4 text-yellow-300">🏆 SPELLING BEE CHAMPIONSHIP</h1>
                    <p className="text-2xl">Get ready to spell your way to victory!</p>
                </div>

                {/* Custom Word List Section */}
                <div className="bg-white/10 p-6 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4">Add Custom Word List</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="file-upload" className="block text-lg font-medium mb-2">Upload File</label>
                            <p className="text-sm text-gray-300 mb-2">Upload a JSON or TSV file.</p>
                            <input
                                id="file-upload"
                                type="file"
                                accept=".json,.tsv,.txt,.csv"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-300 file:text-black hover:file:bg-yellow-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="paste-area" className="block text-lg font-medium mb-2">Or Paste Spreadsheet Data</label>
                            <p className="text-sm text-gray-300 mb-2">Paste data from Excel or Google Sheets (tab-separated).</p>
                            <textarea
                                id="paste-area"
                                rows="4"
                                value={customWordListText}
                                onChange={(e) => setCustomWordListText(e.target.value)}
                                className="w-full p-2 rounded-md bg-white/20 text-white"
                                placeholder="Paste your tab-separated values here..."
                            ></textarea>
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-300">
                        <p><strong>Format:</strong> The first row should be headers: `word`, `syllables`, `definition`, `origin`, `sentence`, `prefixSuffix`, `pronunciation`. The difficulty will be determined by word length.</p>
                    </div>
                </div>

                {/* New Feature: Include missed words */}
                {missedWordCount > 0 && (
                    <div className="bg-white/10 p-4 rounded-lg mb-8">
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={includeMissedWords}
                                onChange={(e) => setIncludeMissedWords(e.target.checked)}
                            />
                            <span>Include {missedWordCount} missed words from previous sessions</span>
                        </label>
                    </div>
                )}
                
                {/* Team setup section */}
                <div className="bg-white/10 p-6 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4">Teams</h2>
                    {teams.map((team, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                value={team.name}
                                onChange={(e) => updateTeamName(index, e.target.value)}
                                placeholder={`Team ${index + 1} Name`}
                                className="flex-grow p-2 rounded-md bg-white/20 text-white"
                            />
                            {teams.length > 1 && (
                                <button
                                    onClick={() => removeTeam(index)}
                                    className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={addTeam}
                        className="mt-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                    >
                        Add Team
                    </button>
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

                {error && <p className="text-red-300 text-center mb-4">{error}</p>}
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
    const [showWord, setShowWord] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [feedback, setFeedback] = useState({ message: "", type: "" });
    const timerRef = useRef(null);

    const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
    const [wordQueues, setWordQueues] = useState({
        easy: shuffleArray(config.wordDatabase.easy),
        medium: shuffleArray(config.wordDatabase.medium),
        tricky: shuffleArray(config.wordDatabase.tricky),
        review: []
    });
    const [currentDifficulty, setCurrentDifficulty] = useState('easy');
    const [attemptedTeams, setAttemptedTeams] = useState(new Set());
    const [missedWords, setMissedWords] = useState([]); // from codex branch

    // Timer effect
    useEffect(() => {
        if (!currentWord) return;
        timerRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timerRef.current);
                    handleIncorrectAttempt();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [currentWord]);
    
    const difficultyOrder = ['easy', 'medium', 'tricky', 'review'];

    const selectNextWord = () => {
        let index = difficultyOrder.indexOf(currentDifficulty);
        let nextWord = null;
        let nextDifficulty = currentDifficulty;

        while (index < difficultyOrder.length) {
            const diff = difficultyOrder[index];
            const queue = wordQueues[diff];
            if (queue.length > 0) {
                nextWord = queue[0];
                setWordQueues(prev => ({
                    ...prev,
                    [diff]: prev[diff].slice(1)
                }));
                nextDifficulty = diff;
                break;
            }
            index++;
        }

        if (nextWord) {
            setCurrentDifficulty(nextDifficulty);
            setCurrentWord(nextWord);
            setTimeLeft(config.timerDuration);
            setAttemptedTeams(new Set());
        } else {
            const activeTeams = teams.filter(t => t.lives > 0);
            onEndGame({ winner: activeTeams.length === 1 ? activeTeams[0] : null, teams });
        }
    };

    const nextTurn = () => {
        setCurrentTeamIndex(prevIndex => (prevIndex + 1) % teams.length);
    };

    const handleIncorrectAttempt = () => {
        setFeedback({ message: "Incorrect. Try again next time!", type: "error" });
        setMissedWords(prev => [...prev, currentWord]); // from codex branch
        const updatedTeams = teams.map((team, index) => {
            if (index === currentTeamIndex) {
                return { ...team, lives: team.lives - 1 };
            }
            return team;
        });
        setTeams(updatedTeams);
        setInputValue("");
        
        const newAttempted = new Set(attemptedTeams);
        newAttempted.add(currentTeamIndex);

        setTimeout(() => {
            setFeedback({ message: "", type: "" });
            if (newAttempted.size >= teams.length) {
                // All teams had a turn, move to next word and put current word in review
                setWordQueues(prev => ({ ...prev, review: [...prev.review, currentWord] }));
                setAttemptedTeams(new Set());
                selectNextWord();
                nextTurn();
            } else {
                // Move to the next team's turn with the same word
                setAttemptedTeams(newAttempted);
                nextTurn();
                setTimeLeft(config.timerDuration);
            }
        }, 2000);
    };
    
    const handleSpellingSubmit = () => {
        if (!currentWord) return;
        clearInterval(timerRef.current);

        const isCorrect = inputValue.trim().toLowerCase() === currentWord.word.toLowerCase();

        if (isCorrect) {
            setFeedback({ message: "Correct! 🎉", type: "success" });
            setTimeout(() => {
                setFeedback({ message: "", type: "" });
                setInputValue("");
                selectNextWord();
                nextTurn();
            }, 2000);
            return;
        }

        handleIncorrectAttempt();
    };

    const skipWord = () => {
        clearInterval(timerRef.current);
        setFeedback({ message: "Word Skipped", type: "info" });
        setWordQueues(prev => ({ ...prev, review: [...prev.review, currentWord] }));
        setAttemptedTeams(new Set());
        
        setTimeout(() => {
            setFeedback({ message: "", type: "" });
            setInputValue("");
            selectNextWord();
            nextTurn();
        }, 1500);
    };

    // from codex branch
    const onEndGameWithMissedWords = () => {
        const lessonKey = new Date().toISOString().split('T')[0];
        const stored = JSON.parse(localStorage.getItem('missedWordsCollection') || '{}');
        const existing = stored[lessonKey] || [];
        stored[lessonKey] = [...existing, ...missedWords];
        localStorage.setItem('missedWordsCollection', JSON.stringify(stored));
        const activeTeams = teams.filter(t => t.lives > 0);
        onEndGame({ winner: activeTeams.length === 1 ? activeTeams[0] : null, teams });
    };

    useEffect(() => {
        selectNextWord();
    }, []);

    // Check for game over condition
    useEffect(() => {
        if (!teams || teams.length === 0) return;
        const activeTeams = teams.filter(t => t.lives > 0);
        if (activeTeams.length <= 1) {
            onEndGameWithMissedWords();
        }
    }, [teams, onEndGame]);

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
                <div className={`absolute top-8 text-2xl font-bold px-6 py-3 rounded-lg ${feedback.type === 'success' ? 'bg-green-500' : feedback.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}>
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
                    <div className="relative mb-8 pt-10">
                        {showWord && (
                            <div className="inline-block text-7xl font-extrabold text-white drop-shadow-lg bg-black/40 px-6 py-3 rounded-lg">
                                {currentWord.word}
                            </div>
                        )}
                        <button
                            onClick={() => setShowWord(!showWord)}
                            className="absolute top-0 right-0 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
                        >
                            {showWord ? 'Hide Word' : 'Show Word'}
                        </button>
                    </div>
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