import React, { useState, useEffect } from 'react';
import { Word, Participant, GameConfig } from './types';

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
  onAddCustomWords: (words: Word[]) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame, onAddCustomWords }) => {
  const defaultTeams: Participant[] = [
    { name: 'Team Alpha', lives: 5, difficultyLevel: 0, points: 0, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0 },
    { name: 'Team Beta', lives: 5, difficultyLevel: 0, points: 0, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0 }
  ];
  const [teams, setTeams] = useState<Participant[]>(defaultTeams);
  const [gameMode, setGameMode] = useState<'team' | 'individual'>('team');
  const [timerDuration, setTimerDuration] = useState(30);
  const [customWordListText, setCustomWordListText] = useState('');
  const [parsedCustomWords, setParsedCustomWords] = useState<Word[]>([]);
  const [missedWordsCollection, setMissedWordsCollection] = useState<Record<string, Word[]>>({});
  const [includeMissedWords, setIncludeMissedWords] = useState(false);
  const [error, setError] = useState('');
  const bundledWordLists = [
    { label: 'Example JSON', file: 'example.json' },
    { label: 'Example CSV', file: 'example.csv' },
    { label: 'Example TSV', file: 'example.tsv' }
  ];
  const [selectedBundledList, setSelectedBundledList] = useState('');
  const [students, setStudents] = useState<Participant[]>([]);
  const [studentName, setStudentName] = useState('');
  const [bulkStudentText, setBulkStudentText] = useState('');
  const [bulkStudentError, setBulkStudentError] = useState('');
  const [skipPenaltyType, setSkipPenaltyType] = useState<'lives' | 'points'>('lives');
  const [skipPenaltyValue, setSkipPenaltyValue] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [initialDifficulty, setInitialDifficulty] = useState(0);
  const [progressionSpeed, setProgressionSpeed] = useState(1);

  useEffect(() => {
    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) {
      try {
        setTeams(JSON.parse(savedTeams));
      } catch {}
    }
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      try {
        setStudents(JSON.parse(savedStudents));
      } catch {}
    }
  }, []);

  const updateTeams = (newTeams: Participant[]) => {
    setTeams(newTeams);
    localStorage.setItem('teams', JSON.stringify(newTeams));
  };

  const updateStudents = (newStudents: Participant[]) => {
    setStudents(newStudents);
    localStorage.setItem('students', JSON.stringify(newStudents));
  };

  const clearRoster = () => {
    localStorage.removeItem('teams');
    localStorage.removeItem('students');
    setTeams(defaultTeams);
    setStudents([]);
  };

  const createParticipant = (name: string, difficulty: number): Participant => ({
    name: name.trim(),
    lives: 5,
    points: 0,
    difficultyLevel: difficulty,
    streak: 0,
    attempted: 0,
    correct: 0,
    wordsAttempted: 0,
    wordsCorrect: 0
  });
  
  const addTeam = () => updateTeams([...teams, createParticipant('', 0)]);
  const removeTeam = (index: number) => updateTeams(teams.filter((_, i) => i !== index));
  const updateTeamName = (index: number, name: string) => {
    const newTeams = teams.map((team, i) => (i === index ? { ...team, name } : team));
    updateTeams(newTeams);
  };

  const addStudent = () => {
    if (studentName.trim()) {
      updateStudents([...students, createParticipant(studentName, initialDifficulty)]);
      setStudentName('');
    }
  };
  
  const removeStudent = (index: number) => updateStudents(students.filter((_, i) => i !== index));
  const updateStudentName = (index: number, name: string) => {
    const newStudents = students.map((student, i) => (i === index ? { ...student, name } : student));
    updateStudents(newStudents);
  };

  const parseStudentNames = (text: string) =>
    text.split(/\r?\n/).flatMap(line => line.split(',')).map(name => name.trim()).filter(name => name !== '');

  const addBulkStudents = () => {
    const names = parseStudentNames(bulkStudentText);
    const existing = new Set(students.map(s => s.name));
    const uniqueNames = Array.from(new Set(names)).filter(name => !existing.has(name));
    if (uniqueNames.length === 0) {
      setBulkStudentError('No new unique names detected.');
      return;
    }
    const newStudents = uniqueNames.map(name => createParticipant(name, initialDifficulty));
    updateStudents([...students, ...newStudents]);
    setBulkStudentText('');
    setBulkStudentError('');
  };

  const parseWordList = (content: string) => {
      // Parsing logic...
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // File change logic...
  };
  
  useEffect(() => {
    if (selectedBundledList) {
      fetch(`wordlists/${selectedBundledList}`)
        .then(res => res.text())
        .then(text => setCustomWordListText(text));
    }
  }, [selectedBundledList]);

  useEffect(() => {
    if (customWordListText) {
      parseWordList(customWordListText);
    }
  }, [customWordListText]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('missedWordsCollection') || '{}');
    setMissedWordsCollection(stored);
  }, []);

  const missedWordCount = Object.values(missedWordsCollection).reduce((acc, arr) => acc + arr.length, 0);

  const handleStart = () => {
    let finalParticipants: Participant[];
    if (gameMode === 'team') {
      const trimmedTeams = teams.map(team => ({ ...team, name: team.name.trim() })).filter(team => team.name !== '');
      if (trimmedTeams.length < 2) {
        setError('Please enter names for at least two teams.');
        return;
      }
      finalParticipants = trimmedTeams.map(t => ({ ...t, difficultyLevel: initialDifficulty }));
    } else {
      const trimmedStudents = students.map(student => ({ ...student, name: student.name.trim() })).filter(student => student.name !== '');
      if (trimmedStudents.length < 2) {
        setError('Please enter names for at least two students.');
        return;
      }
      finalParticipants = trimmedStudents.map(s => ({ ...s, difficultyLevel: initialDifficulty }));
    }

    setError('');
    let finalWords: Word[] = parsedCustomWords;
    if (includeMissedWords) {
      const extraWords = Object.values(missedWordsCollection).flat();
      finalWords = [...finalWords, ...extraWords];
    }
    onAddCustomWords(finalWords);

    const config: GameConfig = {
      participants: finalParticipants,
      gameMode,
      timerDuration,
      skipPenaltyType,
      skipPenaltyValue,
      soundEnabled,
      effectsEnabled,
      difficultyLevel: initialDifficulty,
      progressionSpeed
    } as GameConfig;
    onStartGame(config);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
                <img src="icons/icon.svg" alt="Bee mascot" className="w-12 h-12 md:w-16 md:h-16" />
                <h1 className="text-6xl font-bold text-yellow-300">🏆 SPELLING BEE CHAMPIONSHIP</h1>
            </div>
            <p className="text-2xl">Get ready to spell your way to victory!</p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Select Game Mode 🎮</h2>
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
          <h2 className="text-2xl font-bold mb-4">{gameMode === 'team' ? 'Teams 👥' : 'Students 🧑‍🎓'}</h2>
          {gameMode === 'team' ? (
            <>
              {teams.map((team, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={team.name}
                    onChange={e => updateTeamName(index, e.target.value)}
                    placeholder={`Team ${index + 1} Name`}
                    className="flex-grow p-2 rounded-md bg-white/20 text-white"
                  />
                  {teams.length > 1 && (
                    <button onClick={() => removeTeam(index)} className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded">
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addTeam} className="mt-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                Add Team
              </button>
            </>
          ) : (
            <>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="flex-grow p-2 rounded-md bg-white/20 text-white"
                  placeholder="Student name"
                />
                <button onClick={addStudent} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold">
                  Add
                </button>
              </div>
              <div className="mb-4">
                <textarea
                  value={bulkStudentText}
                  onChange={e => setBulkStudentText(e.target.value)}
                  className="w-full p-2 rounded-md bg-white/20 text-white mb-2"
                  placeholder="Paste names, one per line or separated by commas"
                  rows={4}
                ></textarea>
                <button
                  onClick={addBulkStudents}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold"
                >
                  Add Names
                </button>
                {bulkStudentError && <p className="text-red-300 mt-2">{bulkStudentError}</p>}
              </div>
              {students.map((student, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={student.name}
                    onChange={e => updateStudentName(index, e.target.value)}
                    placeholder="Student name"
                    className="flex-grow p-2 rounded-md bg-white/20 text-white"
                  />
                  {students.length > 1 && (
                    <button onClick={() => removeStudent(index)} className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded">
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </>
          )}
          <button
            onClick={clearRoster}
            className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Clear Saved Roster
          </button>
        </div>

        <div className="bg-white/10 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Skip Penalty ⏭️</h2>
          {/* Skip Penalty UI */}
        </div>
        <div className="bg-white/10 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Difficulty Settings 🎚️</h2>
          {/* Difficulty Settings UI */}
        </div>
        <div className="bg-white/10 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Audio & Effects 🔊✨</h2>
            {/* Audio & Effects UI */}
        </div>
        <div className="bg-white/10 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Add Custom Word List 📝</h2>
            {/* Word List UI */}
        </div>

        {missedWordCount > 0 && (
          <div className="bg-white/10 p-4 rounded-lg mb-8">
            {/* Missed Words UI */}
          </div>
        )}

        {error && <p className="text-red-300 text-center mb-4">{error}</p>}

        <button
          onClick={handleStart}
          className="w-full bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl text-2xl font-bold mt-8"
        >
          START GAME
        </button>
      </div>
    </div>
  );
};

export default SetupScreen;