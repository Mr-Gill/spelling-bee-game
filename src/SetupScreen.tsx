import React, { useState, useEffect } from 'react';
import { Word, Participant, GameConfig } from './types';
import { IMAGE_ASSETS } from './assets';
import { parseWordList as parseWordListUtil } from './utils/parseWordList';
import { getMascotImage } from './utils/mascot';
import { hasSavedGame, getSavedGameInfo, loadGameState, clearSavedGame } from './utils/gameStateManager';
import { applyThemeClass, type ThemeName } from './utils/theme';
import AccessibilitySettings from './components/AccessibilitySettings';
import { getStudentDifficultyLevel } from './utils/studentProgress';

// Gather available music styles.
// This is hardcoded as a workaround for build tools that don't support `import.meta.glob`.
const musicStyles = ['Funk', 'Country', 'Deep Bass', 'Rock', 'Jazz', 'Classical'];

const buildAIWordListPrompt = (topic: string, count: number) => `ROLE
Generate a CSV for an AU Years 7-8 spelling bee on TOPIC. Your voice is a witty, knowledgeable lexicographer with dry Antipodean comic timing: precise, deadpan, gently surreal, and classroom-safe.

INPUT
TOPIC (string) and N (int). If N invalid/missing -> N=10.

OUTPUT (CSV ONLY)

One CSV. No preface, no code fences, no blank lines.

Header EXACTLY: "word","syllables","definition","origin","example","prefix","suffix","pronunciation"

Then exactly N rows.

ASCII only; straight quotes (").

Quote every field.

The syllables field is a JSON string of a string array.

CORRECT: "[\\"har\\",\\"mo\\",\\"ny\\"]"

INCORRECT: [""har"",""mo"",""ny""]

CONTENT

AU/UK spelling. At least 70% headwords clearly fit TOPIC (others closely related).

Difficulty: about 30% 1-2 syllables (foundational), about 50% 2-3 (core), about 20% 4+ (stretch).

Minima when N>=10: at least 3 one-syllable; at least 3 with 4+ syllables; at least 3 with prefixes; at least 3 with suffixes.

Definition: 10-18 words; witty, accurate, student-friendly. Define by job, ingredients, effect, or an unexpected sensation (not flowery/abstract).

Origin: Real and specific (e.g., Latin; Greek; Old French via Latin). No jokes or speculation.

Example: 12-25 words; exactly one sentence; vividly funny or gently surreal. Bee humour only in examples and in at most floor(N/2) rows.

Bee headwords: Bee words appear only in examples unless TOPIC is bees.

Prefix/Suffix: Include only productive, meaningful derivational affixes (e.g., "re-" in "remake", "-tion" in "creation").

Do not treat compounds as suffixes (e.g., laneway, skyline -> suffix="").

Do not invent prefixes from stems (e.g., federation != "fed-").

Only include a prefix if it carries its usual meaning in the headword (e.g., "im-" in "impossible").

Pronunciation: Hyphenated with PRIMARY stress in CAPS (e.g., par-muh-ZAN, mot-suh-REL-uh).

One-syllable exception: write the syllable in CAPS (e.g., TRAM).

Headwords: standard dictionary items; no brands or proper names (unless TOPIC explicitly requires them - then at most 1 such row).

VALIDATION (silent)
Before printing, fix any violations and output only the valid CSV. Per-row checks: non-empty fields; definition 10-18 words; example 12-25 words; syllables is a JSON string with backslash-escaped inner quotes; real origin; derivational prefix/suffix only; pronunciation format obeyed. After N rows: counts satisfied (one-syllable, 4+ syllables, prefixes, suffixes), at least 70% on-topic, bee examples at most floor(N/2), ASCII-only, no blank lines. If any check fails, regenerate offending rows and re-validate.

TOPIC: ${topic.trim() || 'general classroom vocabulary'}
N: ${Number.isFinite(count) && count > 0 ? count : 10}`;

interface SetupPreset {
  gameMode: 'team' | 'individual';
  teams: Participant[];
  students: Participant[];
  timerDuration: number;
  sessionDurationMinutes: number;
  skipPenaltyType: 'lives' | 'points';
  skipPenaltyValue: number;
  soundEnabled: boolean;
  effectsEnabled: boolean;
  musicStyle: string;
  musicVolume: number;
  initialDifficulty: number;
  progressionSpeed: number;
  theme: ThemeName;
  teacherMode: boolean;
  hideNames: boolean;
}

const PRESETS_STORAGE_KEY = 'setupPresets';
const GITHUB_MODELS_ENDPOINT = 'https://models.github.ai/inference/chat/completions';
const GITHUB_MODELS_MODEL = 'openai/gpt-4.1-mini';
const GITHUB_MODELS_API_VERSION = '2022-11-28';
const AI_PROXY_URL = process.env.VITE_WORDLIST_URL || 'http://localhost:3001/wordlist';
const GITHUB_WORDLIST_WORKFLOW_URL = 'https://github.com/Mr-Gill/spelling-bee-game/actions/workflows/generate-wordlist.yml';

const getDefaultProxyUrl = () => {
  if (typeof window === 'undefined') return AI_PROXY_URL;
  const host = window.location.hostname;
  if (host === 'mr-gill.github.io') return '';
  return AI_PROXY_URL;
};

interface SetupScreenProps {
  onStartGame: (config: GameConfig) => void;
  onAddCustomWords: (words: Word[]) => void;
  onViewAchievements: () => void;
  onResumeGame?: (savedState: any) => void;
  onViewHistory?: () => void;
  onViewShop?: () => void;
  onStartWarmup?: () => void;
  wordListsReady: boolean;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame, onAddCustomWords, onViewAchievements, onResumeGame, onViewHistory, onViewShop, onStartWarmup, wordListsReady }) => {
  // Include both traditional avatars and mascot images
  const avatars = [IMAGE_ASSETS.avatars.bee, IMAGE_ASSETS.avatars.book, IMAGE_ASSETS.avatars.trophy, getMascotImage({ isDefault: true }), getMascotImage({ isCelebrating: true })];
  const getRandomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)];

  const getDefaultTeams = (): Participant[] => [
    { name: 'Team Alpha', lives: 10, difficultyLevel: 0, points: 5, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar() },
    { name: 'Team Beta', lives: 10, difficultyLevel: 0, points: 5, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar() }
  ];

  const normaliseTeam = (team: Participant): Participant => {
    const [name, rosterText] = team.name.split(/:\s(.+)/);
    const roster = team.roster || (rosterText ? rosterText.split(',').map(student => student.trim()).filter(Boolean) : undefined);
    return {
      ...team,
      name: name.trim() || team.name,
      roster,
      avatar: team.avatar || getRandomAvatar()
    };
  };

  const [teams, setTeams] = useState<Participant[]>(getDefaultTeams());
  const [gameMode, setGameMode] = useState<'team' | 'individual'>('team');
  const [timerDuration, setTimerDuration] = useState(30);
  const [sessionDurationMinutes, setSessionDurationMinutes] = useState(20);
  const [customWordListText, setCustomWordListText] = useState('');
  const [parsedCustomWords, setParsedCustomWords] = useState<Word[]>([]);
  const [missedWordsCollection, setMissedWordsCollection] = useState<Record<string, Word[]>>({});
  const [includeMissedWords, setIncludeMissedWords] = useState(false);
  const [error, setError] = useState('');
  const bundledWordLists = [
    { label: 'Template CSV', file: 'template.csv' },
    { label: 'Template TSV', file: 'template.tsv' },
    { label: 'Template TXT', file: 'template.txt' },
    { label: 'Template JSON', file: 'template.json' },
    { label: 'Example JSON', file: 'example.json' },
    { label: 'Example CSV', file: 'example.csv' },
    { label: 'Example TSV', file: 'example.tsv' }
  ];
  const downloadableTemplates = [
    { label: 'CSV', file: 'template.csv' },
    { label: 'TSV', file: 'template.tsv' },
    { label: 'TXT', file: 'template.txt' },
    { label: 'JSON', file: 'template.json' },
  ];
  const [selectedBundledList, setSelectedBundledList] = useState('');
  const [students, setStudents] = useState<Participant[]>([]);
  const [studentName, setStudentName] = useState('');
  const [bulkStudentText, setBulkStudentText] = useState('');
  const [bulkStudentError, setBulkStudentError] = useState('');
  const [randomTeamCount, setRandomTeamCount] = useState(0);
  const [randomTeamSize, setRandomTeamSize] = useState(0);
  const [randomizeError, setRandomizeError] = useState('');
  const [skipPenaltyType, setSkipPenaltyType] = useState<'lives' | 'points'>('lives');
  const [skipPenaltyValue, setSkipPenaltyValue] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => localStorage.getItem('soundEnabled') !== 'false');
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [musicStyle, setMusicStyle] = useState<string>(() => localStorage.getItem('musicStyle') ?? 'Funk');
  const [musicVolume, setMusicVolume] = useState<number>(() => parseFloat(localStorage.getItem('musicVolume') ?? '1'));
  const [initialDifficulty, setInitialDifficulty] = useState(0);
  const [progressionSpeed, setProgressionSpeed] = useState(1);
  const [theme, setTheme] = useState<ThemeName>('light');
  const [teacherMode, setTeacherMode] = useState<boolean>(() => localStorage.getItem('teacherMode') === 'true');
  const [hideNames, setHideNames] = useState<boolean>(() => localStorage.getItem('hideNames') === 'true');
  const [showAccessibilitySettings, setShowAccessibilitySettings] = useState(false);
  const [presets, setPresets] = useState<Record<string, SetupPreset>>(() => {
    try {
      return JSON.parse(localStorage.getItem(PRESETS_STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  });
  const [selectedPreset, setSelectedPreset] = useState('');
  const [presetName, setPresetName] = useState('');
  const [presetMessage, setPresetMessage] = useState('');
  const [aiGrade, setAiGrade] = useState(5);
  const [aiTopic, setAiTopic] = useState('');
  const [aiCount, setAiCount] = useState(10);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiToken, setAiToken] = useState(() => {
    if (typeof window === 'undefined') return '';
    return sessionStorage.getItem('githubModelsToken') || '';
  });
  const [aiProxyPassword, setAiProxyPassword] = useState(() => {
    if (typeof window === 'undefined') return '';
    return sessionStorage.getItem('aiProxyPassword') || '';
  });
  const [aiProxyUrl, setAiProxyUrl] = useState(() => {
    if (typeof window === 'undefined') return AI_PROXY_URL;
    return sessionStorage.getItem('aiProxyUrl') || getDefaultProxyUrl();
  });
  
  // Saved game state
  const [savedGameAvailable, setSavedGameAvailable] = useState(false);
  const [savedGameInfo, setSavedGameInfo] = useState<any>(null);

  useEffect(() => {
    if (teacherMode) {
      document.body.classList.add('teacher-mode');
    } else {
      document.body.classList.remove('teacher-mode');
    }
    localStorage.setItem('teacherMode', String(teacherMode));
  }, [teacherMode]);

  useEffect(() => {
    localStorage.setItem('hideNames', String(hideNames));
  }, [hideNames]);
  
  useEffect(() => {
    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) try { setTeams(JSON.parse(savedTeams).map((t: Participant) => normaliseTeam(t))); } catch {}
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) try { setStudents(JSON.parse(savedStudents).map((s: Participant) => ({ ...s, avatar: s.avatar || getRandomAvatar() }))); } catch {}
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const normalized = applyThemeClass(savedTheme);
      setTheme(normalized);
    } else {
      applyThemeClass(theme);
    }
  }, []);

  useEffect(() => localStorage.setItem('soundEnabled', String(soundEnabled)), [soundEnabled]);
  useEffect(() => localStorage.setItem('musicStyle', musicStyle), [musicStyle]);
  useEffect(() => localStorage.setItem('musicVolume', String(musicVolume)), [musicVolume]);

  // Check for saved games on component mount
  useEffect(() => {
    const checkSavedGame = () => {
      setSavedGameAvailable(hasSavedGame());
      setSavedGameInfo(getSavedGameInfo());
    };
    
    checkSavedGame();
    
    // Re-check when component becomes visible (in case user returned from game)
    const interval = setInterval(checkSavedGame, 1000);
    return () => clearInterval(interval);
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
    setTeams(getDefaultTeams());
    setStudents([]);
  };

  const createParticipant = (name: string, difficulty: number): Participant => ({
    name: name.trim(), lives: 5, points: 5, difficultyLevel: difficulty, streak: 0, attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0, avatar: getRandomAvatar()
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

  const randomizeTeams = () => {
    if (students.length < 2) {
      setRandomizeError('Add at least two students to create teams.');
      return;
    }
    let count = 0;
    if (randomTeamCount > 0) {
      count = randomTeamCount;
    } else if (randomTeamSize > 0) {
      count = Math.ceil(students.length / randomTeamSize);
    }
    if (count <= 0) {
      setRandomizeError('Specify number of teams or team size.');
      return;
    }
    const shuffled = [...students];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const groups: Participant[][] = Array.from({ length: count }, () => []);
    shuffled.forEach((student, idx) => {
      groups[idx % count].push(student);
    });
    const newTeams = groups
      .filter(group => group.length > 0)
      .map((group, index) => {
        const teamName = `Team ${index + 1}`;
        const participant = createParticipant(teamName, initialDifficulty);
        participant.avatar = teams[index]?.avatar || participant.avatar;
        participant.roster = group.map(s => s.name);
        return participant;
      });
    updateTeams(newTeams);
    setRandomizeError('');
  };
  
  const parseWordList = (content: string) => {
    try {
      const words = parseWordListUtil(content);
      setParsedCustomWords(words);
      setError('');
    } catch (e: any) {
      setError(e.message || 'Invalid word list format.');
    }
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

  const generateAIWords = async () => {
    setAiLoading(true);
    setAiError('');
    const wordCount = Math.min(Math.max(1, Number(aiCount) || 10), 50);
    const prompt = buildAIWordListPrompt(aiTopic, wordCount);
    setAiPrompt(prompt);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      let content = '';
      const trimmedToken = aiToken.trim();
      if (trimmedToken) {
        sessionStorage.setItem('githubModelsToken', trimmedToken);
        const res = await fetch(`${GITHUB_MODELS_ENDPOINT}?api-version=${GITHUB_MODELS_API_VERSION}`, {
          method: 'POST',
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${trimmedToken}`,
            'Content-Type': 'application/json',
            'X-GitHub-Api-Version': GITHUB_MODELS_API_VERSION,
          },
          body: JSON.stringify({
            model: GITHUB_MODELS_MODEL,
            messages: [
              {
                role: 'system',
                content: 'You generate classroom spelling bee word lists. Return only the requested CSV text, with no markdown fences or commentary.',
              },
              { role: 'user', content: prompt },
            ],
            temperature: 0.8,
            top_p: 1,
            max_tokens: 3000,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          const errorText = await res.text();
          const trimmedError = (errorText || '').trim().slice(0, 500);
          throw new Error(`GITHUB_MODELS_${res.status}:${trimmedError}`);
        }

        const data = await res.json();
        content = String(data?.choices?.[0]?.message?.content || '');
      } else {
        const proxyUrl = aiProxyUrl.trim();
        if (!proxyUrl) {
          if (typeof window !== 'undefined') {
            window.open(GITHUB_WORDLIST_WORKFLOW_URL, '_blank', 'noopener,noreferrer');
          }
          throw new Error('PROXY_URL_MISSING_WORKFLOW_OPENED');
        }
        sessionStorage.setItem('aiProxyUrl', proxyUrl);

        const proxyPassword = aiProxyPassword.trim();
        if (proxyPassword) {
          sessionStorage.setItem('aiProxyPassword', proxyPassword);
        } else {
          sessionStorage.removeItem('aiProxyPassword');
        }

        const proxyHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
        if (proxyPassword) proxyHeaders['X-AI-Password'] = proxyPassword;

        const res = await fetch(proxyUrl, {
          method: 'POST',
          headers: proxyHeaders,
          body: JSON.stringify({ grade: aiGrade, topic: aiTopic, count: wordCount, prompt }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          const errorText = await res.text();
          const trimmedError = (errorText || '').trim().slice(0, 500);
          throw new Error(`PROXY_${res.status}:${trimmedError}`);
        }

        const data = await res.json();
        content = String(data.wordList || data.csv || data.content || '');
      }

      const cleanContent = content.trim().replace(/^```(?:csv|json|tsv)?\s*/i, '').replace(/\s*```$/i, '').trim();
      const generatedWords = parseWordListUtil(cleanContent);
      if (!Array.isArray(generatedWords) || generatedWords.length === 0) throw new Error('Invalid response');
      setParsedCustomWords(prev => [...prev, ...generatedWords]);
      setCustomWordListText('');
      setAiError(`Generated ${generatedWords.length} words. Total words: ${parsedCustomWords.length + generatedWords.length}`);
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err || '');
      let directTokenHint = aiToken.trim()
        ? 'The GitHub Models request failed.'
        : 'Use a proxy URL with server-side token env, then enter proxy password if required.';

      if (errMessage.startsWith('GITHUB_MODELS_401')) {
        directTokenHint = 'GitHub Models returned 401 Unauthorized. Use a fresh token with models: read permission.';
      } else if (errMessage.startsWith('GITHUB_MODELS_403')) {
        directTokenHint = 'GitHub Models returned 403 Forbidden. Enable Models in repository settings, and confirm org model policy allows the selected model.';
      } else if (errMessage.startsWith('GITHUB_MODELS_429')) {
        directTokenHint = 'GitHub Models returned 429 rate limit. Wait and try again, or reduce requests.';
      } else if (errMessage === 'PROXY_URL_MISSING') {
        directTokenHint = 'Add your AI proxy URL in AI connection settings.';
      } else if (errMessage === 'PROXY_URL_MISSING_WORKFLOW_OPENED') {
        directTokenHint = 'No proxy URL set. Opened GitHub Actions workflow. Run it there, then refresh this page after deploy finishes.';
      } else if (errMessage.startsWith('PROXY_401') || errMessage.includes('AI proxy password is invalid')) {
        directTokenHint = 'Proxy password rejected. Check the shared password configured on the proxy server.';
      } else if (errMessage.startsWith('PROXY_404')) {
        directTokenHint = 'Proxy URL is wrong (404). Use the full /wordlist endpoint URL.';
      } else if (errMessage.startsWith('PROXY_500')) {
        directTokenHint = 'Proxy is running but not configured. Check MODELS_TOKEN on the proxy service.';
      } else if (errMessage.includes('Failed to fetch')) {
        directTokenHint = 'Browser request failed. Check network, ad/privacy extensions, and proxy URL availability.';
      } else if (errMessage.includes('AbortError')) {
        directTokenHint = 'Request timed out after 30 seconds. Try again or reduce requested word count.';
      }

      try {
        await navigator.clipboard?.writeText(prompt);
        setAiError(`${directTokenHint} I copied the exact word-list prompt so you can paste AI CSV output into the box above.`);
      } catch {
        setAiError(`${directTokenHint} Use the template prompt below, then paste AI CSV output into the box above.`);
      }
    } finally {
      setAiLoading(false);
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

  const handleResumeGame = () => {
    const savedState = loadGameState();
    if (savedState && onResumeGame) {
      onResumeGame(savedState);
    }
  };

  const handleDeleteSavedGame = () => {
    if (window.confirm('Are you sure you want to delete the saved game? This cannot be undone.')) {
      clearSavedGame();
      setSavedGameAvailable(false);
      setSavedGameInfo(null);
    }
  };

  const savePresets = (nextPresets: Record<string, SetupPreset>) => {
    setPresets(nextPresets);
    localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(nextPresets));
  };

  const buildPreset = (): SetupPreset => ({
    gameMode,
    teams,
    students,
    timerDuration,
    sessionDurationMinutes,
    skipPenaltyType,
    skipPenaltyValue,
    soundEnabled,
    effectsEnabled,
    musicStyle,
    musicVolume,
    initialDifficulty,
    progressionSpeed,
    theme,
    teacherMode,
    hideNames,
  });

  const handleSavePreset = () => {
    const name = presetName.trim();
    if (!name) {
      setPresetMessage('Name the preset first.');
      return;
    }
    savePresets({ ...presets, [name]: buildPreset() });
    setSelectedPreset(name);
    setPresetMessage(`Saved "${name}".`);
  };

  const handleLoadPreset = (name = selectedPreset) => {
    const preset = presets[name];
    if (!preset) {
      setPresetMessage('Choose a preset to load.');
      return;
    }

    setGameMode(preset.gameMode);
    updateTeams(preset.teams?.length ? preset.teams : getDefaultTeams());
    updateStudents(preset.students || []);
    setTimerDuration(preset.timerDuration || 30);
    setSessionDurationMinutes(preset.sessionDurationMinutes || 20);
    setSkipPenaltyType(preset.skipPenaltyType || 'lives');
    setSkipPenaltyValue(preset.skipPenaltyValue ?? 1);
    setSoundEnabled(preset.soundEnabled !== false);
    setEffectsEnabled(preset.effectsEnabled !== false);
    setMusicStyle(preset.musicStyle || 'Funk');
    setMusicVolume(typeof preset.musicVolume === 'number' ? preset.musicVolume : 1);
    setInitialDifficulty(preset.initialDifficulty || 0);
    setProgressionSpeed(preset.progressionSpeed || 1);
    const normalizedTheme = applyThemeClass(preset.theme || 'light');
    setTheme(normalizedTheme);
    localStorage.setItem('theme', normalizedTheme);
    setTeacherMode(Boolean(preset.teacherMode));
    setHideNames(Boolean(preset.hideNames));
    setPresetName(name);
    setPresetMessage(`Loaded "${name}".`);
  };

  const handleDeletePreset = () => {
    if (!selectedPreset || !presets[selectedPreset]) {
      setPresetMessage('Choose a preset to delete.');
      return;
    }

    const nextPresets = { ...presets };
    delete nextPresets[selectedPreset];
    savePresets(nextPresets);
    setPresetMessage(`Deleted "${selectedPreset}".`);
    setSelectedPreset('');
  };

  const handleStart = async (isSessionChallenge = false) => {
    if (!isSessionChallenge && !wordListsReady) {
      setError('Word lists are still loading. Please try again in a moment.');
      return;
    }

    let challengeWords: Word[] = [];
    if (isSessionChallenge) {
      try {
        const randomList = bundledWordLists[Math.floor(Math.random() * bundledWordLists.length)];
        const response = await fetch(`wordlists/${randomList.file}`);
        const text = await response.text();
        challengeWords = parseWordListUtil(text);
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
        finalParticipants = trimmedTeams.map(t => ({...normaliseTeam(t), difficultyLevel: initialDifficulty}));
    } else {
        const trimmedStudents = students.filter(student => student.name.trim() !== "");
        if (trimmedStudents.length < 1 && isSessionChallenge) {
             finalParticipants = [createParticipant('Player 1', initialDifficulty)];
        } else if (trimmedStudents.length < 2 && !isSessionChallenge) {
            setError('Please add at least two students for a custom game.');
            return;
        } else {
             finalParticipants = trimmedStudents.map(s => ({
               ...s,
               difficultyLevel: getStudentDifficultyLevel(s.name, initialDifficulty)
             }));
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
      hideNames,
      gameMode, timerDuration, sessionDuration: sessionDurationMinutes * 60, skipPenaltyType, skipPenaltyValue, soundEnabled, effectsEnabled, difficultyLevel: initialDifficulty, progressionSpeed, musicStyle, musicVolume,
    };
    onStartGame(config);
  };
  
  return (
    <div className="screen-container text-white min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-particle top-10 left-10 delay-100"></div>
        <div className="floating-particle top-20 right-20 delay-200"></div>
        <div className="floating-particle bottom-20 left-20 delay-300"></div>
        <div className="floating-particle bottom-10 right-10 delay-400"></div>
        <div className="floating-particle top-1/2 left-1/2 delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with excitement */}
        <div className="text-center mb-12 animate-bounce-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="icons/icon.svg" alt="Bee mascot" className="w-12 h-12 md:w-16 md:h-16 animate-wiggle" />
            <h1 className="screen-title excitement-glow animate-rainbow">🏆 SPELLING BEE CHAMPIONSHIP</h1>
          </div>
          <p className="screen-subtitle text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-kahoot-yellow-300 bg-clip-text text-transparent animate-sparkle">
            The words are ready. Are you?
          </p>
        </div>

        <div className="game-card mb-8 animate-scale-in delay-100">
          <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-green-400 bg-clip-text text-transparent">
            Setup Presets 💾
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto_auto] gap-3 items-end">
            <div>
              <label htmlFor="preset-name" className="block mb-2 font-bold">Preset Name</label>
              <input
                id="preset-name"
                type="text"
                value={presetName}
                onChange={e => setPresetName(e.target.value)}
                className="p-2 rounded-md bg-white/20 text-white"
                placeholder="Friday groups"
              />
            </div>
            <div>
              <label htmlFor="preset-select" className="block mb-2 font-bold">Saved Presets</label>
              <select
                id="preset-select"
                value={selectedPreset}
                onChange={e => setSelectedPreset(e.target.value)}
                className="p-2 rounded-md bg-white/20 text-white"
              >
                <option value="">-- Select preset --</option>
                {Object.keys(presets).sort().map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <button type="button" onClick={handleSavePreset} className="bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg font-bold">
              Save
            </button>
            <button type="button" onClick={() => handleLoadPreset()} disabled={!selectedPreset} className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-lg font-bold disabled:opacity-50">
              Load
            </button>
            <button type="button" onClick={handleDeletePreset} disabled={!selectedPreset} className="bg-red-500 hover:bg-red-600 px-4 py-3 rounded-lg font-bold disabled:opacity-50">
              Delete
            </button>
          </div>
          {presetMessage && <p className="mt-3 text-sm text-yellow-200" role="status">{presetMessage}</p>}
        </div>

        {/* Game Mode Selection - Kahoot Style */}
        <div className="game-card mb-8 animate-scale-in delay-200">
          <h2 className="text-3xl font-black mb-6 text-center bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-red-400 bg-clip-text text-transparent">
            Select Game Mode 🎮
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button 
              onClick={() => setGameMode('team')} 
              className={`team-selector ${gameMode === 'team' ? 'game-mode-active' : ''} animate-glow`}
            >
              👥 TEAM BATTLE
            </button>
            <button 
              onClick={() => setGameMode('individual')} 
              className={`individual-selector ${gameMode === 'individual' ? 'game-mode-active' : ''} animate-glow`}
            >
              🧑‍🎓 SOLO CHALLENGE
            </button>
          </div>
        </div>
        
        {/* Teams/Students Section - Enhanced */}
        <div className="game-card mb-8 animate-scale-in delay-300">
          <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-kahoot-blue-400 to-kahoot-green-400 bg-clip-text text-transparent">
            {gameMode === 'team' ? '👥 TEAM ROSTER' : '🧑‍🎓 STUDENT LINEUP'}
          </h2>
          {gameMode === 'team' ? (
            <>
              {teams.map((team, index) => (
                <div key={index} className="flex flex-wrap items-center gap-4 mb-4 p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                  <img src={team.avatar || avatars[0]} alt="avatar" className="w-12 h-12 rounded-full border-2 border-kahoot-yellow-400 shadow-lg animate-float" />
                  <input 
                    type="text" 
                    value={team.name} 
                    onChange={e => updateTeamName(index, e.target.value)} 
                    placeholder={`Team ${index + 1} Name`} 
                    className="min-w-48 flex-grow p-3 rounded-xl bg-white/20 text-white placeholder-white/70 font-semibold text-lg border border-white/30 focus:border-kahoot-yellow-400 focus:ring-2 focus:ring-kahoot-yellow-300 transition-all duration-200" 
                  />
                  {teams.length > 1 && (
                    <button 
                      onClick={() => removeTeam(index)} 
                      className="px-4 py-2 bg-gradient-to-r from-kahoot-red-500 to-kahoot-red-600 hover:from-kahoot-red-600 hover:to-kahoot-red-700 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                      Remove
                    </button>
                  )}
                  {team.roster && team.roster.length > 0 && (
                    <div className="min-w-0 flex-1 text-sm text-white/75 md:max-w-md">
                      <div className="truncate">
                        {team.roster.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={addTeam} 
                className="mt-4 bg-gradient-to-r from-kahoot-green-500 to-kahoot-green-600 hover:from-kahoot-green-600 hover:to-kahoot-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                ➕ Add Team
              </button>
            </>
          ) : (
            <>
              <div className="flex gap-4 mb-4">
                <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} className="flex-grow p-2 rounded-md bg-white/20 text-white" placeholder="Student name" />
                <button onClick={addStudent} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold">Add</button>
              </div>
              <div className="mb-4">
                <textarea value={bulkStudentText} onChange={e => setBulkStudentText(e.target.value)} className="w-full p-2 rounded-md bg-white/20 text-white mb-2" placeholder="Paste names, one per line or separated by commas" rows={4}></textarea>
                <button onClick={addBulkStudents} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold">Add Names</button>
                {bulkStudentError && <p className="text-red-300 mt-2">{bulkStudentError}</p>}
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Randomize Teams</h3>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <input type="number" min={1} value={randomTeamCount || ''} onChange={e => { setRandomTeamCount(Number(e.target.value)); setRandomTeamSize(0); }} placeholder="Number of teams" className="p-2 rounded-md bg-white/20 text-white flex-grow" />
                  <span>or</span>
                  <input type="number" min={1} value={randomTeamSize || ''} onChange={e => { setRandomTeamSize(Number(e.target.value)); setRandomTeamCount(0); }} placeholder="Team size" className="p-2 rounded-md bg-white/20 text-white flex-grow" />
                  <button onClick={randomizeTeams} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Randomize</button>
                </div>
                {randomizeError && <p className="text-red-300">{randomizeError}</p>}
              </div>
              {students.map((student, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <img src={student.avatar || avatars[0]} alt="avatar" className="w-8 h-8 rounded-full" />
                  <input type="text" value={student.name} onChange={e => updateStudentName(index, e.target.value)} placeholder="Student name" className="flex-grow p-2 rounded-md bg-white/20 text-white" />
                  {students.length > 0 && (<button onClick={() => removeStudent(index)} className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded">Remove</button>)}
                </div>
              ))}
            </>
          )}
          <button onClick={clearRoster} className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Clear Saved Roster</button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Skip Penalty ⏭️</h2>
                <div className="flex gap-4">
                    <select value={skipPenaltyType} onChange={e => setSkipPenaltyType(e.target.value as 'lives' | 'points')} className="p-2 rounded-md bg-white/20 text-white">
                        <option value="lives">Lives</option>
                        <option value="points">Points</option>
                    </select>
                    <input type="number" min={0} value={skipPenaltyValue} onChange={e => setSkipPenaltyValue(Number(e.target.value))} className="p-2 rounded-md bg-white/20 text-white w-24" />
                </div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Difficulty Settings 🎚️</h2>
                <div className="flex gap-4">
                    <div>
                        <label className="block mb-2">Initial Difficulty</label>
                        <select value={initialDifficulty} onChange={e => setInitialDifficulty(Number(e.target.value))} className="p-2 rounded-md bg-white/20 text-white">
                            <option value={0}>Easy</option>
                            <option value={1}>Medium</option>
                            <option value={2}>Tricky</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Progression Speed</label>
                        <input type="number" min={1} value={progressionSpeed} onChange={e => setProgressionSpeed(Number(e.target.value))} className="p-2 rounded-md bg-white/20 text-white w-24" />
                    </div>
                </div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Session Timer ⏳</h2>
                <label htmlFor="session-duration" className="block mb-2">Session Length (minutes)</label>
                <input
                  id="session-duration"
                  type="number"
                  min={1}
                  max={120}
                  value={sessionDurationMinutes}
                  onChange={e => setSessionDurationMinutes(Math.max(1, Number(e.target.value) || 1))}
                  className="p-2 rounded-md bg-white/20 text-white w-28"
                />
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Audio & Effects 🔊✨</h2>
                <label className="flex items-center space-x-3 mb-2"><input type="checkbox" checked={soundEnabled} onChange={e => setSoundEnabled(e.target.checked)} /><span>Enable Sound</span></label>
                <label className="flex items-center space-x-3"><input type="checkbox" checked={effectsEnabled} onChange={e => setEffectsEnabled(e.target.checked)} /><span>Enable Visual Effects</span></label>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Theme 🎨</h2>
                <select value={theme} onChange={e => { const normalized = applyThemeClass(e.target.value); setTheme(normalized); localStorage.setItem('theme', normalized); }} className="p-2 rounded-md bg-white/20 text-white">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="honeycomb">Honeycomb</option>
                </select>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Teacher Mode 👩‍🏫</h2>
                <label className="flex items-center gap-2 text-white"><input type="checkbox" checked={teacherMode} onChange={e => setTeacherMode(e.target.checked)} /><span>Enable larger fonts and spacing</span></label>
                <button
                  type="button"
                  onClick={() => setShowAccessibilitySettings(true)}
                  className="mt-4 w-full rounded-xl bg-yellow-300 px-4 py-3 font-black text-black transition hover:bg-yellow-400"
                >
                  Accessibility Settings
                </button>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Privacy Display 🙈</h2>
                <label className="flex items-center gap-2 text-white"><input type="checkbox" checked={hideNames} onChange={e => setHideNames(e.target.checked)} /><span>Hide names on game and scoreboard displays</span></label>
            </div>
             <div className="bg-white/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Music 🎵</h2>
                <div className="mb-4">
                    <label className="block mb-2">Style</label>
                    <select value={musicStyle} onChange={e => setMusicStyle(e.target.value)} className="p-2 rounded-md bg-white/20 text-white">
                        {musicStyles.map(style => (<option key={style} value={style}>{style}</option>))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2">Volume: {Math.round(musicVolume * 100)}%</label>
                    <input type="range" min={0} max={1} step={0.01} value={musicVolume} onChange={e => setMusicVolume(parseFloat(e.target.value))} className="w-full" />
                </div>
            </div>
        </div>
        
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
                    <p className="text-sm text-gray-300 mb-2">Upload a CSV, TSV, TXT, or JSON word list.</p>
                    <input id="file-upload" type="file" accept=".json,.tsv,.txt,.csv" onChange={handleFileChange} className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-300 file:text-black hover:file:bg-yellow-400" />
                </div>
                <div>
                    <label htmlFor="paste-area" className="block text-lg font-medium mb-2">Or Paste Word List Data</label>
                    <p className="text-sm text-gray-300 mb-2">Paste the AI CSV output or spreadsheet data here.</p>
                    <textarea id="paste-area" rows={4} value={customWordListText} onChange={e => setCustomWordListText(e.target.value)} className="w-full p-2 rounded-md bg-white/20 text-white" placeholder={'"word","syllables","definition","origin","example","prefix","suffix","pronunciation"'}></textarea>
                </div>
            </div>
            <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_120px_auto] gap-2">
                    <input type="text" value={aiTopic} onChange={e => setAiTopic(e.target.value)} className="p-2 rounded-md bg-white/20 text-white" placeholder="Topic (for example: cars)" />
                    <input type="number" min={1} value={aiCount} onChange={e => setAiCount(Number(e.target.value))} className="p-2 rounded-md bg-white/20 text-white" placeholder="# Words" />
                    <button onClick={generateAIWords} disabled={aiLoading} className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded w-full md:w-auto">{aiLoading ? 'Generating...' : 'Generate with AI'}</button>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-300">
                  <a
                    href={GITHUB_WORDLIST_WORKFLOW_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded bg-white/20 px-2 py-1 font-bold text-white hover:bg-white/30"
                  >
                    Generate in GitHub Actions
                  </a>
                  <span>Use this when you do not have a proxy URL.</span>
                </div>
                <details className="mt-3 rounded-xl bg-black/20 p-3 text-sm text-gray-100">
                  <summary className="cursor-pointer font-bold">AI connection settings</summary>
                  <div className="mt-3 grid grid-cols-1 gap-3">
                    <div>
                      <label htmlFor="ai-proxy-url" className="block text-sm font-bold text-gray-200">AI Proxy URL</label>
                      <input
                        id="ai-proxy-url"
                        type="url"
                        value={aiProxyUrl}
                        onChange={e => setAiProxyUrl(e.target.value)}
                        className="mt-1 w-full rounded-md bg-white/20 p-2 text-white placeholder-white/60"
                        placeholder="https://your-proxy.example.com/wordlist"
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <label htmlFor="ai-proxy-password" className="block text-sm font-bold text-gray-200">AI Proxy Password (optional)</label>
                      <input
                        id="ai-proxy-password"
                        type="password"
                        value={aiProxyPassword}
                        onChange={e => setAiProxyPassword(e.target.value)}
                        className="mt-1 w-full rounded-md bg-white/20 p-2 text-white placeholder-white/60"
                        placeholder="Shared password for your AI proxy"
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <label htmlFor="github-models-token" className="block text-sm font-bold text-gray-200">GitHub Models Token (fallback)</label>
                      <input
                        id="github-models-token"
                        type="password"
                        value={aiToken}
                        onChange={e => setAiToken(e.target.value)}
                        className="mt-1 w-full rounded-md bg-white/20 p-2 text-white placeholder-white/60"
                        placeholder="Optional. Browser session only."
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-300">Recommended: leave token blank and use proxy URL + password.</p>
                </details>
                {aiError && <p className="text-yellow-200 mt-2">{aiError}</p>}
                {aiPrompt && (
                  <details className="mt-3 rounded-xl bg-black/30 p-3 text-sm text-gray-100">
                    <summary className="cursor-pointer font-bold">AI prompt</summary>
                    <textarea readOnly value={aiPrompt} className="mt-3 min-h-40 w-full rounded-lg bg-white/90 p-3 text-xs text-gray-900" />
                  </details>
                )}
            </div>
            <div className="mt-4 text-sm text-gray-300">
                <p><strong>Format:</strong> use the exact CSV header: "word","syllables","definition","origin","example","prefix","suffix","pronunciation". Quote every field.</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {downloadableTemplates.map(template => (
                <a
                  key={template.file}
                  href={`wordlists/${template.file}`}
                  download
                  className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Download {template.label} Template
                </a>
              ))}
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

        {error && <p className="text-red-300 text-center mb-4 animate-shake">{error}</p>}
        
        {/* Resume Game Section */}
        {savedGameAvailable && savedGameInfo && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-400/30 animate-scale-in">
            <h2 className="text-2xl font-black mb-4 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              🎮 Resume Previous Game
            </h2>
            <div className="text-center mb-4">
              <p className="text-white mb-2">
                You have a saved {savedGameInfo.gameMode} game with {savedGameInfo.participantCount} participants
              </p>
              <p className="text-gray-300 text-sm">
                Saved: {new Date(savedGameInfo.savedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={handleResumeGame}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl text-xl font-bold shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                ▶️ Resume Game
              </button>
              <button 
                onClick={handleDeleteSavedGame}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl text-xl font-bold shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                🗑️ Delete Save
              </button>
            </div>
          </div>
        )}
        
        {/* Epic Game Start Buttons */}
        <div className="flex flex-col md:flex-row gap-6 mt-12 animate-scale-in delay-500">
          {onStartWarmup && (
            <button
              onClick={onStartWarmup}
              disabled={!wordListsReady}
              className="w-full bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white px-8 py-6 rounded-3xl text-3xl font-black shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-4 border-white/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              🐝 WARM-UP
            </button>
          )}
          <button 
            onClick={() => handleStart(false)} 
            disabled={!wordListsReady}
            className="w-full bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-yellow-600 hover:from-kahoot-yellow-500 hover:to-kahoot-yellow-700 text-black px-8 py-6 rounded-3xl text-3xl font-black shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-4 border-white/20 excitement-glow animate-glow disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            🚀 START CUSTOM GAME
          </button>
          <button 
            onClick={() => handleStart(true)} 
            className="w-full bg-gradient-to-r from-kahoot-red-400 to-kahoot-red-600 hover:from-kahoot-red-500 hover:to-kahoot-red-700 text-white px-8 py-6 rounded-3xl text-3xl font-black shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-4 border-white/20 animate-glow"
          >
            ⚡ SESSION CHALLENGE
          </button>
        </div>
        
        {/* Teacher Guidance Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-2xl border border-white/20 animate-scale-in delay-600">
          <h2 className="text-2xl font-black mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            👩‍🏫 Teacher Guide: How to Run the Game
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="text-lg font-bold mb-2 text-yellow-300">🎯 Gameplay Flow</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-300">
                <li>Read the word aloud to the student/team</li>
                <li>Give definition, example sentence, or other context as needed</li>
                <li>Student/team spells the word using on-screen keyboard</li>
                <li>Click ✅ when they submit their spelling</li>
                <li>Game automatically moves to next participant</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-yellow-300">💡 Hint Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li><strong>Definition (−1 pt):</strong> What the word means — a quick, affordable clue</li>
                <li><strong>Origin (−2 pts):</strong> Where the word came from — some spellings make more sense after checking their passport</li>
                <li><strong>Sentence (−1 pt):</strong> See the word in context — a tiny window into the word&apos;s private life</li>
                <li><strong>Hangman-Style Reveal (−3 pts):</strong> Reveals letters in a hangman-style pattern — use it carefully</li>
                <li><strong>Swap Speller (−4 pts):</strong> Tag in a teammate for this word — team mode only</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-yellow-300">🏆 Team Mode</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li><strong>Shared Lives:</strong> Teams have 10 lives total</li>
                <li><strong>Steal Mechanic:</strong> If one team misspells, the next team may attempt the same word</li>
                <li><strong>Strategic Hints:</strong> Teams decide when to spend points on clues</li>
                <li><strong>Redemption Round:</strong> Missed words return later in the game</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-yellow-300">🧑‍🎓 Individual Mode</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li><strong>Personal Challenge:</strong> Each student has 5 lives</li>
                <li><strong>Individual Progress:</strong> Students advance at their own pace</li>
                <li><strong>Classic Format:</strong> Traditional spelling bee experience</li>
                <li><strong>Achievement Tracking:</strong> Personal milestones recorded along the way</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center animate-bounce-in delay-700">
          <button 
            onClick={onViewAchievements} 
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-8 py-4 rounded-2xl font-black text-2xl shadow-xl transform transition-all duration-300 hover:scale-105 animate-sparkle"
          >
            🏆 VIEW ACHIEVEMENTS
          </button>
        </div>
      </div>
      {showAccessibilitySettings && (
        <AccessibilitySettings onClose={() => setShowAccessibilitySettings(false)} />
      )}
    </div>
  );
};

export default SetupScreen;
