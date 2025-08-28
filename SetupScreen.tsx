import React, { useState, useEffect } from 'react';
import { Word, Participant, GameConfig } from './types';

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
  onAddCustomWords: (words: Word[]) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame, onAddCustomWords }) => {
  const avatarOptions = [
    { label: '🐝 Bee', src: 'avatars/bee.svg' },
    { label: '📘 Book', src: 'avatars/book.svg' },
    { label: '🏆 Trophy', src: 'avatars/trophy.svg' }
  ];

  const defaultTeams: Participant[] = [
    { name: 'Team Alpha', lives: 5, difficultyLevel: 0, points: 0, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: avatarOptions[0].src },
    { name: 'Team Beta', lives: 5, difficultyLevel: 0, points: 0, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: avatarOptions[1].src }
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
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? saved === 'true' : true;
  });
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [initialDifficulty, setInitialDifficulty] = useState(0);
  const [progressionSpeed, setProgressionSpeed] = useState(1);
  const [theme, setTheme] = useState('light');
  const [teacherMode, setTeacherMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('teacherMode');
    return saved === 'true';
  });

  const applyTheme = (t: string) => {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-honeycomb');
    document.body.classList.add(`theme-${t}`);
  };

  useEffect(() => {
    if (teacherMode) {
      document.body.classList.add('teacher-mode');
    } else {
      document.body.classList.remove('teacher-mode');
    }
    localStorage.setItem('teacherMode', String(teacherMode));
  }, [teacherMode]);

  useEffect(() => {
    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) {
      try {
        const parsed: Participant[] = JSON.parse(savedTeams);
        setTeams(parsed.map(t => ({ avatar: avatarOptions[0].src, ...t })));
      } catch {}
    }
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      try {
        const parsed: Participant[] = JSON.parse(savedStudents);
        setStudents(parsed.map(s => ({ avatar: avatarOptions[0].src, ...s })));
      } catch {}
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme(theme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('soundEnabled', String(soundEnabled));
  }, [soundEnabled]);

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
    wordsCorrect: 0,
    avatar: avatarOptions[0].src
  });

  const addTeam = () => updateTeams([...teams, createParticipant('', 0)]);
  const removeTeam = (index: number) => updateTeams(teams.filter((_, i) => i !== index));

  const updateTeamName = (index: number, name: string) => {
    const newTeams = teams.map((team, i) => (i === index ? { ...team, name } : team));
    updateTeams(newTeams);
  };

  const updateTeamAvatar = (index: number, avatar: string) => {
    const newTeams = teams.map((team, i) => (i === index ? { ...team, avatar } : team));
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

  const updateStudentAvatar = (index: number, avatar: string) => {
    const newStudents = students.map((student, i) => (i === index ? { ...student, avatar } : student));
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

  // Other functions like parseWordList, handleFileChange, etc. remain here...

  const handleStart = () => {
    // handleStart logic remains here...
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header and Game Mode sections remain here... */}
        
        <div className="bg-white/10 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">{gameMode === 'team' ? 'Teams 👥' : 'Students 🧑‍🎓'}</h2>
          {gameMode === 'team' ? (
            <>
              {teams.map((team, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <img src={team.avatar || avatarOptions[0].src} alt="avatar" className="w-8 h-8 rounded-full" />
                  <input type="text" value={team.name} onChange={e => updateTeamName(index, e.target.value)} placeholder={`Team ${index + 1} Name`} className="flex-grow p-2 rounded-md bg-white/20 text-white" />
                  <select value={team.avatar} onChange={e => updateTeamAvatar(index, e.target.value)} className="p-2 rounded-md bg-white/20 text-white">
                    {avatarOptions.map(a => (<option key={a.src} value={a.src}>{a.label}</option>))}
                  </select>
                  {teams.length > 1 && (<button onClick={() => removeTeam(index)} className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded">Remove</button>)}
                </div>
              ))}
              <button onClick={addTeam} className="mt-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded">Add Team</button>
            </>
          ) : (
            <>
              {/* Single and Bulk Student Add UI remains here... */}
              {students.map((student, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <img src={student.avatar || avatarOptions[0].src} alt="avatar" className="w-8 h-8 rounded-full" />
                  <input type="text" value={student.name} onChange={e => updateStudentName(index, e.target.value)} placeholder="Student name" className="flex-grow p-2 rounded-md bg-white/20 text-white" />
                  <select value={student.avatar} onChange={e => updateStudentAvatar(index, e.target.value)} className="p-2 rounded-md bg-white/20 text-white">
                    {avatarOptions.map(a => (<option key={a.src} value={a.src}>{a.label}</option>))}
                  </select>
                  {students.length > 1 && (<button onClick={() => removeStudent(index)} className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded">Remove</button>)}
                </div>
              ))}
            </>
          )}
          <button onClick={clearRoster} className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Clear Saved Roster</button>
        </div>
        
        {/* Other settings panels like Skip Penalty, Difficulty, etc. remain here... */}

        <div className="bg-white/10 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Theme 🎨</h2>
          <select
            value={theme}
            onChange={e => {
              const t = e.target.value;
              setTheme(t);
              localStorage.setItem('theme', t);
              applyTheme(t);
            }}
            className="p-2 rounded-md bg-white/20 text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="honeycomb">Honeycomb</option>
          </select>
        </div>

        <div className="bg-white/10 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Teacher Mode 👩‍🏫</h2>
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={teacherMode}
              onChange={e => setTeacherMode(e.target.checked)}
            />
            <span>Enable larger fonts and spacing</span>
          </label>
        </div>

        <div className="bg-white/10 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Add Custom Word List 📝</h2>
          {/* Word List UI remains here... */}
        </div>

        {/* Start Game Button and other elements remain here... */}
      </div>
    </div>
  );
};

export default SetupScreen;