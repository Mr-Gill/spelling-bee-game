import React, { useState, useEffect } from 'react';
import { Word, Participant, GameConfig } from './types';

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
  onAddCustomWords: (words: Word[]) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame, onAddCustomWords }) => {
  const [teams, setTeams] = useState<Participant[]>([
    { name: 'Team Alpha', lives: 5, points: 0, streak: 0, attempted: 0, correct: 0 },
    { name: 'Team Beta', lives: 5, points: 0, streak: 0, attempted: 0, correct: 0 }
  ]);
  const [gameMode, setGameMode] = useState<'team' | 'individual'>('team');
  const [timerDuration] = useState(30);
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
  const [skipPenaltyType, setSkipPenaltyType] = useState<'lives' | 'points'>('lives');
  const [skipPenaltyValue, setSkipPenaltyValue] = useState(1);
  const [initialDifficulty, setInitialDifficulty] = useState(0);
  const [progressionSpeed, setProgressionSpeed] = useState(1);

  const addTeam = () => {
    setTeams([...teams, { name: '', lives: 5, points: 0, streak: 0, attempted: 0, correct: 0 }]);
  };

  const removeTeam = (index: number) => {
    setTeams(teams.filter((_, i) => i !== index));
  };

  const updateTeamName = (index: number, name: string) => {
    const newTeams = teams.map((team, i) => (i === index ? { ...team, name } : team));
    setTeams(newTeams);
  };

  const addStudent = () => {
    if (studentName.trim()) {
      setStudents([
        ...students,
        { name: studentName.trim(), lives: 5, points: 0, streak: 0, attempted: 0, correct: 0 }
      ]);
      setStudentName('');
    }
  };

  const removeStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const updateStudentName = (index: number, name: string) => {
    const newStudents = students.map((student, i) => (i === index ? { ...student, name } : student));
    setStudents(newStudents);
  };

  const parseWordList = (content: string) => {
    try {
      const parsed = JSON.parse(content) as Word[];
      if (Array.isArray(parsed)) {
        setParsedCustomWords(parsed);
        return;
      }
    } catch (e) {
      // ignore
    }

    const lines = content.trim().split('\n');
    if (lines.length < 2) return;

    const headerLine = lines[0];
    const delimiter = headerLine.includes(',') ? ',' : '\t';

    const headers = headerLine.split(delimiter).map(h => h.trim());
    const words = lines.slice(1).map(line => {
      const values = line.split(delimiter);
      const wordObj: any = {};
      headers.forEach((header, index) => {
        wordObj[header] = values[index] ? values[index].trim() : '';
      });
      return wordObj as Word;
    });
    setParsedCustomWords(words);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const content = e.target?.result as string;
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
    if (customWordListText) {
      parseWordList(customWordListText);
    }
  }, [customWordListText]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('missedWordsCollection') || '{}');
    setMissedWordsCollection(stored);
  }, []);

  const missedWordCount = Object.values(missedWordsCollection).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  const handleStart = () => {
    let finalParticipants: Participant[];
    if (gameMode === 'team') {
      const trimmedTeams = teams
        .map(team => ({ ...team, name: team.name.trim() }))
        .filter(team => team.name !== '');
      if (trimmedTeams.length < 2) {
        setError('Please enter names for at least two teams.');
        return;
      }
      finalParticipants = trimmedTeams.map(t => ({ ...t, attempted: 0, correct: 0 }));
    } else {
      const trimmedStudents = students
        .map(student => ({ ...student, name: student.name.trim() }))
        .filter(student => student.name !== '');
      if (trimmedStudents.length < 2) {
        setError('Please enter names for at least two students.');
        return;
      }
      finalParticipants = trimmedStudents.map(s => ({ ...s, attempted: 0, correct: 0 }));
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
      difficultyLevel: initialDifficulty,
      progressionSpeed
    } as GameConfig;
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
                    onChange={e => updateTeamName(index, e.target.value)}
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
          <h2 className="text-2xl font-bold mb-4">Skip Penalty</h2>
          <div className="flex gap-4">
            <select
              value={skipPenaltyType}
              onChange={e => setSkipPenaltyType(e.target.value as 'lives' | 'points')}
              className="p-2 rounded-md bg-white/20 text-white"
            >
              <option value="lives">Lives</option>
              <option value="points">Points</option>
            </select>
            <input
              type="number"
              min={0}
              value={skipPenaltyValue}
              onChange={e => setSkipPenaltyValue(Number(e.target.value))}
              className="p-2 rounded-md bg-white/20 text-white w-24"
            />
          </div>
        </div>

        <div className="bg-white/10 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Difficulty Settings</h2>
          <div className="flex gap-4">
            <div>
              <label className="block mb-2">Initial Difficulty</label>
              <select
                value={initialDifficulty}
                onChange={e => setInitialDifficulty(Number(e.target.value))}
                className="p-2 rounded-md bg-white/20 text-white"
              >
                <option value={0}>Easy</option>
                <option value={1}>Medium</option>
                <option value={2}>Tricky</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Progression Speed</label>
              <input
                type="number"
                min={1}
                value={progressionSpeed}
                onChange={e => setProgressionSpeed(Number(e.target.value))}
                className="p-2 rounded-md bg-white/20 text-white w-24"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/10 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Add Custom Word List</h2>
          <div className="mb-6">
            <label htmlFor="bundled-list" className="block text-lg font-medium mb-2">
              Choose Bundled Word List
            </label>
            <select
              id="bundled-list"
              value={selectedBundledList}
              onChange={e => setSelectedBundledList(e.target.value)}
              className="w-full p-2 rounded-md bg-white/20 text-white"
            >
              <option value="">-- Select a list --</option>
              {bundledWordLists.map(list => (
                <option key={list.file} value={list.file}>
                  {list.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="file-upload" className="block text-lg font-medium mb-2">
                Upload File
              </label>
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
              <label htmlFor="paste-area" className="block text-lg font-medium mb-2">
                Or Paste Spreadsheet Data
              </label>
              <p className="text-sm text-gray-300 mb-2">Paste data from Excel or Google Sheets (tab-separated).</p>
              <textarea
                id="paste-area"
                rows={4}
                value={customWordListText}
                onChange={e => setCustomWordListText(e.target.value)}
                className="w-full p-2 rounded-md bg-white/20 text-white"
                placeholder="Paste your tab-separated values here..."
              ></textarea>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-300">
            <p>
              <strong>Format:</strong> The first row should be headers: `word`, `syllables`, `definition`, `origin`, `sentence`,
              `prefixSuffix`, `pronunciation`. The difficulty will be determined by word length.
            </p>
          </div>
        </div>

        {missedWordCount > 0 && (
          <div className="bg-white/10 p-4 rounded-lg mb-8">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeMissedWords}
                onChange={e => setIncludeMissedWords(e.target.checked)}
              />
              <span>Include {missedWordCount} missed words from previous sessions</span>
            </label>
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
