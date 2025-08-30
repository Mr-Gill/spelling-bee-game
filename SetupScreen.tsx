import React, { useState, useEffect } from 'react';
import { Word, Participant, GameConfig } from './types';
import beeImg from './img/avatars/bee.svg';
import bookImg from './img/avatars/book.svg';
import trophyImg from './img/avatars/trophy.svg';
import TeamForm from './components/TeamForm';
import StudentRoster from './components/StudentRoster';
import GameOptions, { OptionsState } from './components/GameOptions';
import useRoster from './hooks/useRoster';

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
  onAddCustomWords: (words: Word[]) => void;
  onViewAchievements: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame, onAddCustomWords, onViewAchievements }) => {
  const avatars = [beeImg, bookImg, trophyImg];
  const getRandomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)];

  const getDefaultTeams = (): Participant[] => [
    { name: 'Team Alpha', lives: 5, difficultyLevel: 0, points: 0, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar() },
    { name: 'Team Beta', lives: 5, difficultyLevel: 0, points: 0, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar() }
  ];

  const {
    participants: teams,
    addParticipant: addTeamParticipant,
    removeParticipant: removeTeam,
    updateName: updateTeamName,
    clear: clearTeams,
  } = useRoster('teams', getDefaultTeams());

  const {
    participants: students,
    addParticipant: addStudentParticipant,
    removeParticipant: removeStudent,
    updateName: updateStudentName,
    clear: clearStudents,
  } = useRoster('students', []);

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

  const [options, setOptions] = useState<OptionsState>({
    skipPenaltyType: 'lives',
    skipPenaltyValue: 1,
    initialDifficulty: 0,
    progressionSpeed: 1,
    soundEnabled: localStorage.getItem('soundEnabled') !== 'false',
    effectsEnabled: true,
    theme: localStorage.getItem('theme') ?? 'light',
    teacherMode: localStorage.getItem('teacherMode') === 'true',
    musicStyle: localStorage.getItem('musicStyle') ?? 'Funk',
    musicVolume: parseFloat(localStorage.getItem('musicVolume') ?? '1'),
  });

  const createParticipant = (name: string, difficulty: number): Participant => ({
    name: name.trim(),
    lives: 5,
    points: 0,
    difficultyLevel: difficulty,
    streak: 0,
    attempted: 0,
    correct: 0,
    wordsAttempted: 0,
    wordsCorrect: 0,
    avatar: getRandomAvatar(),
  });

  const addTeam = () => addTeamParticipant(createParticipant('', 0));

  const clearRoster = () => {
    clearTeams();
    clearStudents();
  };
  
  const parseWordList = (content: string) => {
    try {
      const parsed = JSON.parse(content) as Word[];
      if (Array.isArray(parsed)) {
        setParsedCustomWords(parsed);
        return;
      }
    } catch (e) {}

    const lines = content.trim().split('\n');
    if (lines.length < 2) return;
    const delimiter = lines[0].includes(',') ? ',' : '\t';
    const headers = lines[0].split(delimiter).map(h => h.trim());
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
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.text();
        })
        .then(text => {
          setCustomWordListText(text);
          setError('');
        })
        .catch(err => {
          console.error('Failed to load bundled word list', err);
          setError('Failed to load bundled word list.');
        });
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

  const handleStart = async (isSessionChallenge = false) => {
    let challengeWords: Word[] = [];
    if (isSessionChallenge) {
      try {
        const randomList = bundledWordLists[Math.floor(Math.random() * bundledWordLists.length)];
        const response = await fetch(`wordlists/${randomList.file}`);
        const text = await response.text();
        challengeWords = JSON.parse(text);
      } catch (err) {
        console.error('Failed to load session challenge words', err);
        setError('Failed to load session challenge words.');
        return;
      }
    }

    let finalParticipants: Participant[];
    if (gameMode === 'team') {
        const trimmedTeams = teams.filter(team => team.name.trim() !== "");
        if (trimmedTeams.length < 2) {
            setError('Please add at least two teams with names.');
            return;
        }
        finalParticipants = trimmedTeams.map(t => ({...t, difficultyLevel: options.initialDifficulty}));
    } else {
        const trimmedStudents = students.filter(student => student.name.trim() !== "");
        if (trimmedStudents.length < 1 && isSessionChallenge) {
             finalParticipants = [createParticipant('Player 1', options.initialDifficulty)];
        } else if (trimmedStudents.length < 2 && !isSessionChallenge) {
            setError('Please add at least two students for a custom game.');
            return;
        } else {
             finalParticipants = trimmedStudents.map(s => ({...s, difficultyLevel: options.initialDifficulty}));
        }
    }

    setError('');
    
    let finalWords: Word[] = isSessionChallenge ? challengeWords : parsedCustomWords;
    if (includeMissedWords && !isSessionChallenge) {
      const extraWords = Object.values(missedWordsCollection).flat();
      finalWords = [...finalWords, ...extraWords];
    }
    
    onAddCustomWords(finalWords);
    
    const config: GameConfig = {
      participants: finalParticipants,
      gameMode,
      timerDuration,
      skipPenaltyType: options.skipPenaltyType,
      skipPenaltyValue: options.skipPenaltyValue,
      soundEnabled: options.soundEnabled,
      effectsEnabled: options.effectsEnabled,
      difficultyLevel: options.initialDifficulty,
      progressionSpeed: options.progressionSpeed,
      musicStyle: options.musicStyle,
      musicVolume: options.musicVolume,
    };
    onStartGame(config);
  };
  
  return (
    <div className="min-h-screen p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
                <img src="icons/icon.svg" alt="Bee mascot" className="w-12 h-12 md:w-16 md:h-16" />
                <h1 className="text-4xl md:text-6xl font-bold text-yellow-300">🏆 SPELLING BEE CHAMPIONSHIP</h1>
            </div>
            <p className="text-xl md:text-2xl">Get ready to spell your way to victory!</p>
        </div>

        <div className="bg-white/10 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Select Game Mode 🎮</h2>
          <div className="flex justify-center gap-4">
            <button onClick={() => setGameMode('team')} className={`px-6 py-3 rounded-lg text-xl font-bold ${gameMode === 'team' ? 'bg-yellow-300 text-black' : 'bg-blue-500 hover:bg-blue-400'}`}>Team</button>
            <button onClick={() => setGameMode('individual')} className={`px-6 py-3 rounded-lg text-xl font-bold ${gameMode === 'individual' ? 'bg-yellow-300 text-black' : 'bg-blue-500 hover:bg-blue-400'}`}>Individual</button>
          </div>
        </div>
        
        <div className="bg-white/10 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">{gameMode === 'team' ? 'Teams 👥' : 'Students 🧑‍🎓'}</h2>
          {gameMode === 'team' ? (
            <TeamForm
              teams={teams}
              avatars={avatars}
              addTeam={addTeam}
              removeTeam={removeTeam}
              updateTeamName={updateTeamName}
            />
          ) : (
            <StudentRoster
              students={students}
              avatars={avatars}
              addParticipant={addStudentParticipant}
              removeStudent={removeStudent}
              updateStudentName={updateStudentName}
              createParticipant={createParticipant}
              initialDifficulty={options.initialDifficulty}
            />
          )}
          <button onClick={clearRoster} className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Clear Saved Roster</button>
        </div>

        <GameOptions options={options} setOptions={setOptions} />
        
        <div className="bg-white/10 p-6 rounded-lg mb-8 mt-8">
            <h2 className="text-2xl font-bold mb-4">Add Custom Word List 📝</h2>
            <div className="mb-6">
                <label htmlFor="bundled-list" className="block text-lg font-medium mb-2">Choose Bundled Word List</label>
                <select id="bundled-list" value={selectedBundledList} onChange={e => setSelectedBundledList(e.target.value)} className="w-full p-2 rounded-md bg-white/20 text-white">
                    <option value="">-- Select a list --</option>
                    {bundledWordLists.map(list => (<option key={list.file} value={list.file}>{list.label}</option>))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="file-upload" className="block text-lg font-medium mb-2">Upload File</label>
                    <p className="text-sm text-gray-300 mb-2">Upload a JSON or TSV file.</p>
                    <input id="file-upload" type="file" accept=".json,.tsv,.txt,.csv" onChange={handleFileChange} className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-300 file:text-black hover:file:bg-yellow-400" />
                </div>
                <div>
                    <label htmlFor="paste-area" className="block text-lg font-medium mb-2">Or Paste Spreadsheet Data</label>
                    <p className="text-sm text-gray-300 mb-2">Paste data from Excel or Google Sheets (tab-separated).</p>
                    <textarea id="paste-area" rows={4} value={customWordListText} onChange={e => setCustomWordListText(e.target.value)} className="w-full p-2 rounded-md bg-white/20 text-white" placeholder="Paste your tab-separated values here..."></textarea>
                </div>
            </div>
            <div className="mt-4 text-sm text-gray-300">
                <p><strong>Format:</strong> The first row should be headers: `word`, `syllables`, `definition`, `origin`, `example`, `prefix`, `suffix`, `pronunciation`.</p>
            </div>
        </div>
        
        {missedWordCount > 0 && (
            <div className="bg-white/10 p-4 rounded-lg mb-8">
                <label className="flex items-center space-x-3">
                    <input type="checkbox" checked={includeMissedWords} onChange={e => setIncludeMissedWords(e.target.checked)} />
                    <span>Include {missedWordCount} missed words from previous sessions</span>
                </label>
            </div>
        )}

        {error && <p className="text-red-300 text-center mb-4">{error}</p>}
        
        <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button onClick={() => handleStart(false)} className="w-full bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-4 rounded-xl text-2xl font-bold">Start Custom Game</button>
            <button onClick={() => handleStart(true)} className="w-full bg-orange-500 hover:bg-orange-600 text-black px-6 py-4 rounded-xl text-2xl font-bold">Start Session Challenge</button>
        </div>
        <div className="mt-4 text-center">
            <button onClick={onViewAchievements} className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl text-xl font-bold">View Achievements</button>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
