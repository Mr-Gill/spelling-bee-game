import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Users, BookOpen, Play, Volume2, Globe, RotateCcw, SkipForward } from 'lucide-react';

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
        { name: "Team Alpha", lives: 5, points: 0, streak: 0 },
        { name: "Team Beta", lives: 5, points: 0, streak: 0 }
    ]);
    const [gameMode, setGameMode] = useState("team");
    const [timerDuration, setTimerDuration] = useState(30);
    const [customWordListText, setCustomWordListText] = useState("");
    const [parsedCustomWords, setParsedCustomWords] = useState([]);
    const [missedWordsCollection, setMissedWordsCollection] = useState({});
    const [includeMissedWords, setIncludeMissedWords] = useState(false);
    const [error, setError] = useState("");
    
    const bundledWordLists = [
        { label: "Example JSON", file: "example.json" },
        { label: "Example CSV", file: "example.csv" },
        { label: "Example TSV", file: "example.tsv" }
    ];
    const [selectedBundledList, setSelectedBundledList] = useState("");
    
    const [students, setStudents] = useState([]);
    const [studentName, setStudentName] = useState("");

    const addTeam = () => {
        setTeams([...teams, { name: "", lives: 5, points: 0, streak: 0 }]);
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

    const addStudent = () => {
        if (studentName.trim()) {
            setStudents([...students, { name: studentName.trim(), lives: 5, points: 0, streak: 0 }]);
            setStudentName("");
        }
    };

    const removeStudent = (index) => {
        setStudents(students.filter((_, i) => i !== index));
    };

    const updateStudentName = (index, name) => {
        const newStudents = students.map((student, i) => 
            i === index ? { ...student, name } : student
        );
        setStudents(newStudents);
    };

    const parseWordList = (content) => {
        try {
            const parsed = JSON.parse(content);
            if (Array.isArray(parsed)) {
                setParsedCustomWords(parsed);
                return;
            }
        } catch (e) {
        }

        const lines = content.trim().split('\n');
        if (lines.length < 2) return;

        const headerLine = lines[0];
        const delimiter = headerLine.includes(',') ? ',' : '\t';

        const headers = headerLine.split(delimiter).map(h => h.trim());
        const words = lines.slice(1).map(line => {
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
            };
            reader.readAsText(file);
        }
    };
    
    useEffect(() => {
        if (selectedBundledList) {
            fetch(`wordlists/${selectedBundledList}`)
                .then(res => res.text())
                .then(text => setCustomWordListText(text));
        }
    }, [selectedBundledList]);

    useEffect(() => {
        if(customWordListText) {
            parseWordList(customWordListText)
        }
    }, [customWordListText]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('missedWordsCollection') || '{}');
        setMissedWordsCollection(stored);
    }, []);

    const missedWordCount = Object.values(missedWordsCollection).reduce((acc, arr) => acc + arr.length, 0);

    const handleStart = () => {
        let finalParticipants;
        if (gameMode === 'team') {
            const trimmedTeams = teams.map(team => ({ ...team, name: team.name.trim() })).filter(team => team.name !== "");
            if (trimmedTeams.length < 2) {
                setError("Please enter names for at least two teams.");
                return;
            }
            // Combine point and streak fields with new stat-tracking fields
            finalParticipants = trimmedTeams.map(t => ({ ...t, attempted: 0, correct: 0 }));
        } else {
            const trimmedStudents = students.map(student => ({ ...student, name: student.name.trim() })).filter(student => student.name !== "");
            if (trimmedStudents.length < 2) {
                setError("Please enter names for at least two students.");
                return;
            }
            finalParticipants = trimmedStudents.map(s => ({ ...s, attempted: 0, correct: 0 }));
        }
        
        setError("");
        
        let finalWords = parsedCustomWords;
        if (includeMissedWords) {
            const extraWords = Object.values(missedWordsCollection).flat();
            finalWords = [...finalWords, ...extraWords];
        }
        onAddCustomWords(finalWords);
        
        const config = { participants: finalParticipants, gameMode, timerDuration };
        onStartGame(config);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold mb-4 text-yellow-300">🏆 SPELLING BEE CHAMPIONSHIP</h1>
                    <p className="text-2xl">Get ready to spell your way to victory!</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4 text-center">Select Game Mode</h2>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setGameMode('team')}
                            className={`px-6 py-3 rounded-lg text-xl font-bold ${gameMode === 'team' ? 'bg-yellow-300 text-black' : 'bg-blue-500 hover:bg-blue-400'}`}
                        >
                            Team
                        </button>
                        <button
                            onClick={() => setGameMode('individual')}
                            className={`px-6 py-3 rounded-lg text-xl font-bold ${gameMode === 'individual' ? 'bg-yellow-300 text-black' : 'bg-blue-500 hover:bg-blue-400'}`}
                        >
                            Individual
                        </button>
                    </div>
                </div>

                <div className="bg-white/10 p-6 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4">{gameMode === 'team' ? 'Teams' : 'Students'}</h2>
                    {gameMode === 'team' ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <div className="flex gap-4 mb-4">
                                <input
                                    type="text"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    className="flex-grow p-2 rounded-md bg-white/20 text-white"
                                    placeholder="Student name"
                                />
                                <button
                                    onClick={addStudent}
                                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold"
                                >
                                    Add
                                </button>
                            </div>
                            {students.map((student, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={student.name}
                                        onChange={(e) => updateStudentName(index, e.target.value)}
                                        placeholder="Student name"
                                        className="flex-grow p-2 rounded-md bg-white/20 text-white"
                                    />
                                    {students.length > 1 && (
                                        <button
                                            onClick={() => removeStudent(index)}
                                            className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <div className="bg-white/10 p-6 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4">Add Custom Word List</h2>
                    <div className="mb-6">
                        <label htmlFor="bundled-list" className="block text-lg font-medium mb-2">Choose Bundled Word List</label>
                        <select
                            id="bundled-list"
                            value={selectedBundledList}
                            onChange={(e) => setSelectedBundledList(e.target.value)}
                            className="w-full p-2 rounded-md bg-white/20 text-white"
                        >
                            <option value="">-- Select a list --</option>
                            {bundledWordLists.map(list => (
                                <option key={list.file} value={list.file}>{list.label}</option>
                            ))}
                        </select>
                    </div>
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
                
                {error && <p className="text-red-300 text-center mb-4">{error}</p>}
                
                <button onClick={handleStart} className="w-full bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl text-2xl font-bold mt-8">
                    START GAME
                </button>
            </div>
        </div>
    );
};

const GameScreen = ({ config, onEndGame }) => {
    const [participants, setParticipants] = useState(
        config.participants.map(p => ({ ...p, attempted: 0, correct: 0 }))
    );
    const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(null);
    const [timeLeft, setTimeLeft] = useState(config.timerDuration);
    const isTeamMode = config.gameMode === 'team';
    const [showWord, setShowWord] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [feedback, setFeedback] = useState({ message: "", type: "" });
    const timerRef = useRef(null);
    const [startTime] = useState(Date.now());
    const [revealedLetters, setRevealedLetters] = useState([]);
    const [extraAttempt, setExtraAttempt] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
    const [wordQueues, setWordQueues] = useState({
        easy: shuffleArray(config.wordDatabase.easy),
        medium: shuffleArray(config.wordDatabase.medium),
        tricky: shuffleArray(config.wordDatabase.tricky),
        review: []
    });
    const [currentDifficulty, setCurrentDifficulty] = useState('easy');
    const [attemptedParticipants, setAttemptedParticipants] = useState(new Set());
    const [missedWords, setMissedWords] = useState([]);

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
            setAttemptedParticipants(new Set());
            setRevealedLetters(Array.from({ length: nextWord.word.length }, () => false));
            setExtraAttempt(false);
            // From the other branch, this logic belongs here
            setIsHelpOpen(false);
        } else {
            onEndGameWithMissedWords();
        }
    };

    const nextTurn = () => {
        setCurrentParticipantIndex(prevIndex => (prevIndex + 1) % participants.length);
    };

    const handleIncorrectAttempt = () => {
        if (extraAttempt) {
            setFeedback({ message: "Incorrect. You still have one more attempt!", type: "error" });
            setExtraAttempt(false);
            setInputValue("");
            setTimeLeft(config.timerDuration);
            return;
        }
        
        setFeedback({ message: "Incorrect. Try again next time!", type: "error" });
        setMissedWords(prev => [...prev, currentWord]);
        const updatedParticipants = participants.map((p, index) => {
            if (index === currentParticipantIndex) {
                return { ...p, lives: p.lives - 1, streak: 0 };
            }
            return p;
        });
        setParticipants(updatedParticipants);
        setInputValue("");
        
        const newAttempted = new Set(attemptedParticipants);
        newAttempted.add(currentParticipantIndex);

        setTimeout(() => {
            setFeedback({ message: "", type: "" });
            if (newAttempted.size >= participants.length) {
                setWordQueues(prev => ({ ...prev, review: [...prev.review, currentWord] }));
                setAttemptedParticipants(new Set());
                selectNextWord();
                nextTurn();
            } else {
                setAttemptedParticipants(newAttempted);
                nextTurn();
                setTimeLeft(config.timerDuration);
            }
        }, 2000);
    };
    
    const spendPoints = (participantIndex, cost) => {
        setParticipants(prev =>
            prev.map((p, index) => {
                if (index === participantIndex) {
                    return { ...p, points: p.points - cost };
                }
                return p;
            })
        );
    };

    const handleHangmanReveal = () => {
        const cost = 5;
        if (participants[currentParticipantIndex].points < cost || !currentWord) return;
        spendPoints(currentParticipantIndex, cost);
        const unrevealed = revealedLetters
            .map((rev, idx) => (!rev ? idx : null))
            .filter((idx) => idx !== null);
        if (unrevealed.length === 0) return;
        const randomIndex = unrevealed[Math.floor(Math.random() * unrevealed.length)];
        const newRevealed = [...revealedLetters];
        newRevealed[randomIndex] = true;
        setRevealedLetters(newRevealed);
    };

    const handleVowelReveal = () => {
        const cost = 3;
        if (participants[currentParticipantIndex].points < cost || !currentWord) return;
        spendPoints(currentParticipantIndex, cost);
        const newRevealed = currentWord.word.split('').map((letter, idx) => {
            return revealedLetters[idx] || 'aeiou'.includes(letter.toLowerCase());
        });
        setRevealedLetters(newRevealed);
    };

    const handleFriendSubstitution = () => {
        const cost = 4;
        if (participants[currentParticipantIndex].points < cost) return;
        spendPoints(currentParticipantIndex, cost);
        setExtraAttempt(true);
    };

    const handleSpellingSubmit = () => {
        if (!currentWord) return;
        clearInterval(timerRef.current);

        const isCorrect = inputValue.trim().toLowerCase() === currentWord.word.toLowerCase();

        setParticipants(prev =>
            prev.map((p, index) => {
                if (index === currentParticipantIndex) {
                    const multipliers = { easy: 1, medium: 2, tricky: 3 };
                    const basePoints = 10;
                    const multiplier = multipliers[currentDifficulty] || 1;
                    const bonus = p.streak * 5;
                    const pointsEarned = basePoints * multiplier + bonus;
                    
                    return {
                        ...p,
                        attempted: p.attempted + 1,
                        correct: p.correct + (isCorrect ? 1 : 0),
                        lives: isCorrect ? p.lives : p.lives - 1,
                        points: isCorrect ? p.points + pointsEarned : p.points,
                        streak: isCorrect ? p.streak + 1 : 0,
                    };
                }
                return p;
            })
        );

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
        setAttemptedParticipants(new Set());
        
        setTimeout(() => {
            setFeedback({ message: "", type: "" });
            setInputValue("");
            selectNextWord();
            nextTurn();
        }, 1500);
    };

    const onEndGameWithMissedWords = () => {
        const lessonKey = new Date().toISOString().split('T')[0];
        const stored = JSON.parse(localStorage.getItem('missedWordsCollection') || '{}');
        const existing = stored[lessonKey] || [];
        stored[lessonKey] = [...existing, ...missedWords];
        localStorage.setItem('missedWordsCollection', JSON.stringify(stored));
        const activeParticipants = participants.filter(p => p.lives > 0);
        const finalParticipants = participants.map(p => ({
            ...p,
            accuracy: p.attempted > 0 ? (p.correct / p.attempted) * 100 : 0,
        }));
        onEndGame({ winner: activeParticipants.length === 1 ? activeParticipants[0] : null, participants: finalParticipants, gameMode: config.gameMode, duration: Math.round((Date.now() - startTime) / 1000) });
    };

    useEffect(() => {
        selectNextWord();
    }, []);

    useEffect(() => {
        if (!participants || participants.length === 0) return;
        const activeParticipants = participants.filter(p => p.lives > 0);
        if (activeParticipants.length <= 1) {
            onEndGameWithMissedWords();
        }
    }, [participants, onEndGame]);

    const buyHint = (hintKey, cost) => {
        // The hints logic from the other branch is for the old UI, which is being replaced.
        // The point-spending logic has been integrated into the new 'help shop' functions.
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white flex flex-col items-center justify-center">
            <div className="absolute top-8 left-8 flex gap-8">
                {participants.map((p, index) => (
                    <div key={index} className="text-center">
                        <div className="text-2xl font-bold">{p.name}</div>
                        <div className="text-4xl font-bold text-yellow-300">{'❤️'.repeat(p.lives)}</div>
                        <div className="text-xl font-bold text-green-400">{p.points} pts</div>
                    </div>
                ))}
            </div>

            {feedback.message && (
                <div className={`absolute top-8 text-2xl font-bold px-6 py-3 rounded-lg ${feedback.type === 'success' ? 'bg-green-500' : feedback.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {feedback.message}
                </div>
            )}

            <div className="absolute top-8 right-8 text-center">
                <div className={`text-6xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-yellow-300'}`}>{timeLeft}</div>
                <div className="text-lg">seconds left</div>
            </div>

            {currentWord && (
                <div className="w-full max-w-4xl text-center">
                    <h2 className="text-4xl font-bold mb-4">Word for {isTeamMode ? 'Team' : 'Student'}: {participants[currentParticipantIndex]?.name || (isTeamMode ? 'Team' : 'Student')}</h2>
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
                        {revealedLetters.some(r => r) && (
                            <p className="text-3xl font-mono mb-4">
                                {currentWord.word.split('').map((letter, idx) => (
                                    revealedLetters[idx] ? letter : '_'
                                )).join(' ')}
                            </p>
                        )}
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

                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={handleHangmanReveal}
                            disabled={participants[currentParticipantIndex].points < 5 || isTeamMode === false}
                            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded-lg"
                        >
                            Hangman Reveal (-5)
                        </button>
                        <button
                            onClick={handleVowelReveal}
                            disabled={participants[currentParticipantIndex].points < 3 || isTeamMode === false}
                            className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 px-4 py-2 rounded-lg"
                        >
                            Vowel Reveal (-3)
                        </button>
                        <button
                            onClick={handleFriendSubstitution}
                            disabled={participants[currentParticipantIndex].points < 4 || isTeamMode === false}
                            className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 px-4 py-2 rounded-lg"
                        >
                            Friend Sub (-4)
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
        const { winner, participants } = results;
        if (winner) {
            return `Winner: ${winner.name}`;
        }
        const activeParticipants = participants.filter(p => p.lives > 0);
        if (activeParticipants.length > 1) {
            const names = activeParticipants.map(p => p.name).join(' and ');
            return `It's a draw between ${names}!`;
        }
        return "No one wins this round!";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold mb-4 text-yellow-300">🏆 Game Over! 🏆</h1>
            <h2 className="text-4xl mb-8">{getWinnerMessage()}</h2>

            {results?.duration && (
                <div className="text-2xl mb-6">Game Duration: {results.duration} seconds</div>
            )}

            <div className="bg-white/10 p-8 rounded-lg w-full max-w-md">
                <h3 className="text-3xl font-bold mb-4">Final Scores</h3>
                {results && results.participants.map((p, index) => (
                    <div key={index} className="text-left text-xl mb-3">
                        <div className="font-bold">{p.name}</div>
                        <div className="text-yellow-300">
                            {p.correct}/{p.attempted} correct (
                            {(p.correct / p.attempted * 100).toFixed(0)}%) - {p.lives} lives
                            remaining - {p.points} points
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-6 mt-12">
                <button
                    onClick={handleExport}
                    className="bg-green-500 hover:bg-green-600 px-8 py-5 rounded-xl text-2xl font-bold"
                >
                    Export Results
                </button>
                <button
                    onClick={onRestart}
                    className="bg-blue-500 hover:bg-blue-600 px-10 py-5 rounded-xl text-2xl font-bold"
                >
                    Play Again
                </button>
            </div>
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