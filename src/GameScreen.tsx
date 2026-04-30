import React from 'react';
import { SkipForward, Play, Pause, Volume2, VolumeX, LogOut, MessageCircle } from 'lucide-react';
import { GameConfig, Word, Participant, GameResults, defaultAchievements } from './types';
import correctSoundFile from './audio/correct.mp3';
import wrongSoundFile from './audio/wrong.mp3';
import letterCorrectSoundFile from './audio/letter-correct.mp3';
import letterWrongSoundFile from './audio/letter-wrong.mp3';
import shopSoundFile from './audio/shop.mp3';
import loseLifeSoundFile from './audio/lose-life.mp3';
import { launchConfetti } from './utils/confetti';
import { speak } from './utils/tts';
import useSound from './utils/useSound';
import useGameTimer from './hooks/useGameTimer';
import useWordProgression from './hooks/useWordProgression';
import OnScreenKeyboard from './components/OnScreenKeyboard';
import HintPanel from './components/HintPanel';
import AvatarSelector from './components/AvatarSelector';
import PhonicsBreakdown from './components/PhonicsBreakdown';
import { getContextualMascot } from './utils/mascot';
import ParticipantStats from './components/ParticipantStats';
import { HelpShop } from './components/HelpShop';
import { saveGameState, generateGameId, autoSaveGameState, type SavedGameState } from './utils/gameStateManager';
import { applyThemeClass } from './utils/theme';
import AccessibilitySettings from './components/AccessibilitySettings';
import EncouragementBanner, {
  DEFAULT_ENCOURAGEMENT_PHRASES,
  loadEncouragementPhrases,
  normaliseEncouragementPhrases,
  pickEncouragementPhrase,
  saveEncouragementPhrases,
} from './components/EncouragementBanner';
import { addReviewWord } from './utils/reviewQueue';
import { publishTeamDisplayWord } from './TeamDisplay';
import { publishScoreboard } from './ScoreboardScreen';
import BattlePowerUnlock from './components/BattlePowerUnlock';
import {
  getNewlyUnlockedPowers,
  getUnlockedPowerIds,
  type BattlePower,
} from './utils/battleProgression';
import { saveStudentProgress } from './utils/studentProgress';

const musicStyles = ['Funk', 'Country', 'Deep Bass', 'Rock', 'Jazz', 'Classical'];

const CORRECT_FEEDBACK = [
  'That worked. Weirdly clean.',
  'Nobody act surprised.',
  'Yes. Suspiciously correct.',
  'The word had a reputation. You ignored it completely.',
  'Fine. The letters cooperated. Don\'t push it.',
  'You heard it, you spelled it, and now we all have to live with that.',
  'The word came in, got dealt with, left.',
  'The bee would clap, but it has small arms and a complicated schedule.',
  'That word did not stand a chance once you showed up.',
  'Correct. Nobody panic.',
  'Every letter, in the right order. That\'s the whole thing.',
  'A correct spelling in a classroom spelling game. Unprecedented.',
  'That word had opinions. You overruled all of them.',
  'The word saw that coming and was powerless to stop it.',
  'Correct. The word has accepted its situation.',
  'That word is now behind you. It won\'t cause further trouble.',
  'Correct. That felt inevitable once it happened.',
  'The alphabet briefly made sense.',
  'Done. The word did not argue.',
  'The room has witnessed spelling.',
  'That one landed well.',
  'Correct. Nobody looked surprised, which is its own kind of compliment.',
  'The word came. You spelled it. That\'s the whole story.',
  'Correct. Efficient. Clinical. Slightly unsettling.',
  'You heard it. You knew it. You spelled it. All three things, in order.',
  'Correct. The word stepped forward, got handled, stepped back.',
  'That spelling went in clean. No drama.',
  'Well done. The word won\'t say it, but we will.',
  'Right. Make a note of how that felt.',
  'Correct. The word had nowhere to go.',
];

const INCORRECT_FEEDBACK = [
  'Close. Emotionally, not alphabetically.',
  'The word saw that and is choosing silence.',
  'An investigation has been opened.',
  'Not correct, but not a disaster. Annoying middle ground.',
  'The spelling had confidence. That was not the issue.',
  'Let\'s move past this with dignity.',
  'Fine. Not correct, but emotionally survivable.',
  'The word is fine. Totally fine. Not even slightly wounded by that.',
  'Nearly. One letter has gone somewhere it shouldn\'t. The rest are fine.',
  'Close. The word watched and stayed very calm, which felt pointed.',
  'That spelling arrived confidently and was immediately questioned.',
  'Not quite. The word requires a specific arrangement. That was a different one.',
  'Other words have been spelled worse. This is cold comfort, but it is comfort.',
  'Nobody is going to bring this up later. Probably.',
  'The word did not say anything. But it definitely thought something.',
  'Everyone in the room pretended not to notice. Very generous.',
  'That was almost a word. Unfortunately, it was this word.',
  'We recover. We regroup. We blame English.',
  'Incorrect. The word remains present and available for another attempt.',
  'The letters attended. They just had different ideas about the order.',
  'Some of those letters were correct. The rest have questions to answer.',
  'Close. The alphabet is giving you another look.',
  'Wrong. The word is still there, unfortunately.',
  'That miss was useful. Annoying, but useful.',
  'The letters had a meeting and reached a different conclusion.',
  'Good attempt. Try a different arrangement.',
  'Not quite. The correct spelling is close. Go again.',
  'Nearly. One letter wandered off. The rest were solid.',
  'The word has been standing here the whole time. It would like another try.',
  'That spelling existed. It just wasn\'t this spelling.',
];

const pickRandom = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];

interface GameScreenProps {
  config: GameConfig;
  onEndGame: (results: GameResults) => void;
  onExitGame?: () => void;
  musicStyle: string;
  musicVolume: number;
  onMusicStyleChange: (style: string) => void;
  onMusicVolumeChange: (volume: number) => void;
  soundEnabled: boolean;
  onSoundEnabledChange: (enabled: boolean) => void;
  isMusicPlaying: boolean;
  onToggleMusicPlaying: () => void;
  gameId?: string;
  initialGameState?: SavedGameState;
}

interface Feedback {
  message: string;
  type: string;
}

const MIN_DIFFICULTY_LEVEL = 0;
const MAX_DIFFICULTY_LEVEL = 2;

const clampDifficultyLevel = (level: number) => {
  if (!Number.isFinite(level)) return MIN_DIFFICULTY_LEVEL;
  return Math.max(MIN_DIFFICULTY_LEVEL, Math.min(MAX_DIFFICULTY_LEVEL, level));
};

const GameScreen: React.FC<GameScreenProps> = ({
  config,
  onEndGame,
  onExitGame,
  musicStyle,
  musicVolume,
  onMusicStyleChange,
  onMusicVolumeChange,
  soundEnabled,
  onSoundEnabledChange,
  isMusicPlaying,
  onToggleMusicPlaying,
  gameId,
  initialGameState,
}) => {
  const [participants, setParticipants] = React.useState<Participant[]>(
    config.participants.map(p => ({
      ...p,
      difficultyLevel: clampDifficultyLevel(p.difficultyLevel),
      attempted: 0,
      correct: 0,
      wordsAttempted: 0,
      wordsCorrect: 0
    }))
  );
  const [currentParticipantIndex, setCurrentParticipantIndex] = React.useState(0);
  const isTeamMode = config.gameMode === 'team';
  const [showWord, setShowWord] = React.useState(false);
  const [showPhonics, setShowPhonics] = React.useState(false);
  const [usedHint, setUsedHint] = React.useState(false);
  const [wordLengthRevealed, setWordLengthRevealed] = React.useState(false);
  const [letters, setLetters] = React.useState<string[]>([]);
  const [feedback, setFeedback] = React.useState<Feedback>({ message: '', type: '' });
  const [encouragementMessage, setEncouragementMessage] = React.useState('');
  const [encouragementPhrases, setEncouragementPhrases] = React.useState<string[]>(loadEncouragementPhrases);
  const [showEncouragementSettings, setShowEncouragementSettings] = React.useState(false);
  const [encouragementDraft, setEncouragementDraft] = React.useState(() => loadEncouragementPhrases().join('\n'));
  const [encouragementSaveMessage, setEncouragementSaveMessage] = React.useState('');
  const [extraAttempt, setExtraAttempt] = React.useState(false);
  const [isHelpOpen, setIsHelpOpen] = React.useState(false);
  const { wordQueues, setWordQueues, currentWord, currentDifficulty, selectNextWordForLevel: selectNextWord } =
    useWordProgression(config.wordDatabase);
  const [attemptedParticipants, setAttemptedParticipants] = React.useState<Set<number>>(new Set());
  const [missedWords, setMissedWords] = React.useState<Word[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = React.useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
    } catch {
      return [];
    }
  });
  const [toast, setToast] = React.useState('');
  const hiddenInputRef = React.useRef<HTMLInputElement>(null);
  const [startTime] = React.useState(Date.now());
  const [currentAvatar, setCurrentAvatar] = React.useState('');
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'light');
  
  // Game state management
  const [currentGameId] = React.useState(gameId || generateGameId());
  const [showExitConfirm, setShowExitConfirm] = React.useState(false);
  const [showAccessibilitySettings, setShowAccessibilitySettings] = React.useState(false);
  const [wordIndex, setWordIndex] = React.useState(initialGameState?.currentWordIndex || 0);
  const [totalWordsUsed, setTotalWordsUsed] = React.useState(initialGameState?.totalWordsUsed || 0);
  const shouldHideNames = Boolean(config.hideNames);

  // Hint tracking: record which hints were purchased for the current word
  const [hintsUsedThisWord, setHintsUsedThisWord] = React.useState<Array<{ icon: string; cost: number }>>([]);
  // Brief summary line shown in the feedback area after each word
  const [hintSummary, setHintSummary] = React.useState('');

  // Individual-mode hint nudge: shown once per session when ≥2 words completed without any hint
  const [, setTotalWordsCompleted] = React.useState(0);
  const [hasEverUsedHint, setHasEverUsedHint] = React.useState(false);
  const [showHintNudge, setShowHintNudge] = React.useState(false);
  const hintNudgeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dialog-pause: pause the word timer while the hint confirmation dialog is open
  const [pausedByHintDialog, setPausedByHintDialog] = React.useState(false);

  // Battle progression (team mode only): tracks collective correct answers to drive power unlocks.
  // In individual mode, unlockedPowers stays empty — HintPanel treats undefined/empty differently:
  // undefined = no progression (all hints visible); empty array = progression active but none unlocked yet.
  // Here we pass undefined for individual mode so all hints are always available.
  const [teamCorrectCount, setTeamCorrectCount] = React.useState(0);
  // getUnlockedPowerIds(0) returns the three starter powers (sentence, syllables, wordLength),
  // which all have unlockAt: 0 and are immediately available in team mode.
  const [unlockedPowers, setUnlockedPowers] = React.useState<string[]>(() =>
    isTeamMode ? getUnlockedPowerIds(0) : []
  );
  const [pendingUnlocks, setPendingUnlocks] = React.useState<BattlePower[]>([]);

  const playCorrect = useSound(correctSoundFile, soundEnabled);
  const playWrong = useSound(wrongSoundFile, soundEnabled);
  const playLetterCorrect = useSound(letterCorrectSoundFile, soundEnabled);
  const playLetterWrong = useSound(letterWrongSoundFile, soundEnabled);
  const playShop = useSound(shopSoundFile, soundEnabled);
  const playLoseLife = useSound(loseLifeSoundFile, soundEnabled);

  const {
    timeLeft,
    start: startTimer,
    pause: pauseTimer,
    resume: resumeTimer,
    reset: resetTimer,
    stop: stopTimer,
    isPaused,
    addSeconds: addTimeToTimer,
  } = useGameTimer(config.timerDuration, soundEnabled, handleIncorrectAttempt);
  const {
    timeLeft: sessionTimeLeft,
    start: startSessionTimer,
    pause: pauseSessionTimer,
    resume: resumeSessionTimer,
    stop: stopSessionTimer,
  } = useGameTimer(config.sessionDuration || 20 * 60, soundEnabled, onEndGameWithMissedWords);

  const togglePause = () => {
    if (isPaused) {
      resumeTimer();
      resumeSessionTimer();
    } else {
      pauseTimer();
      pauseSessionTimer();
    }
  };

  /** Called by HintPanel when the power-confirmation dialog opens. */
  const handleHintDialogOpen = () => {
    if (!isPaused) {
      pauseTimer();
      pauseSessionTimer();
      setPausedByHintDialog(true);
    }
  };

  /** Called by HintPanel when the power-confirmation dialog closes (confirm or cancel). */
  const handleHintDialogClose = () => {
    if (pausedByHintDialog) {
      resumeTimer();
      resumeSessionTimer();
      setPausedByHintDialog(false);
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem('teacherMode') === 'true') {
      document.body.classList.add('teacher-mode');
    } else {
      document.body.classList.remove('teacher-mode');
    }
  }, []);

  React.useEffect(() => {
    if (currentWord) {
      setLetters(Array.from({ length: currentWord.word.length }, () => ''));
      setWordLengthRevealed(false);
      publishTeamDisplayWord(currentWord.word);
      setShowPhonics(false);
      setShowWord(false);
    }
  }, [currentWord]);

  React.useEffect(() => {
    publishScoreboard(participants, { hideNames: shouldHideNames });
  }, [participants, shouldHideNames]);

  React.useEffect(() => {
    if (config.gameMode !== 'individual') return;
    participants.forEach(saveStudentProgress);
  }, [participants, config.gameMode]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentWord || isPaused) return;
      if (/^[a-zA-Z]$/.test(e.key)) {
        typeLetter(e.key);
      } else if (e.key === 'Backspace') {
        handleVirtualBackspace();
      } else if (e.key === 'Enter') {
        handleSpellingSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentWord, isPaused, letters]);

  React.useEffect(() => {
    const normalized = applyThemeClass(theme);
    localStorage.setItem('theme', normalized);
  }, [theme]);

  React.useEffect(() => {
    setEncouragementDraft(encouragementPhrases.join('\n'));
  }, [encouragementPhrases]);

  // Auto-save game state when key properties change
  React.useEffect(() => {
    if (currentWord && participants.length > 0) {
      const gameState: SavedGameState = {
        gameConfig: config,
        currentParticipants: participants,
        currentWordIndex: wordIndex,
        currentWord,
        currentParticipantIndex,
        gameStartTime: startTime,
        timeRemaining: timeLeft,
        totalWordsUsed,
        missedWords,
        currentInput: letters.join(''),
        gamePhase: 'spelling',
        difficulty: currentDifficulty,
        savedAt: new Date().toISOString(),
        gameId: currentGameId,
      };
      
      autoSaveGameState(gameState);
    }
  }, [participants, currentWord, currentParticipantIndex, timeLeft, letters, wordIndex, totalWordsUsed, missedWords, currentDifficulty]);

  const advanceToWord = (level: number) => {
    const nextWord = selectNextWord(clampDifficultyLevel(level));
    if (nextWord) {
      setAttemptedParticipants(new Set());
      setExtraAttempt(false);
      setIsHelpOpen(false);
      setUsedHint(false);
      setShowWord(false);
      setLetters(Array(nextWord.word.length).fill(''));
      setHintsUsedThisWord([]);
      setHintSummary('');
      if (hiddenInputRef.current) {
        hiddenInputRef.current.focus();
      }
      speak(nextWord.word);
      startTimer();

      // Individual-mode hint nudge: show once on word 2 or 3 if no hints ever used
      if (!isTeamMode && !hasEverUsedHint) {
        setTotalWordsCompleted(prev => {
          const next = prev + 1;
          if (next === 2 || next === 3) {
            setShowHintNudge(true);
            if (hintNudgeTimerRef.current) clearTimeout(hintNudgeTimerRef.current);
            hintNudgeTimerRef.current = setTimeout(() => setShowHintNudge(false), 7000);
          }
          return next;
        });
      }
    } else {
      onEndGameWithMissedWords();
    }
  };

  const nextTurn = () => {
    setCurrentParticipantIndex(prevIndex => (prevIndex + 1) % participants.length);
  };

  function handleIncorrectAttempt() {
    if (extraAttempt) {
      setFeedback({ message: 'Not quite. The word remains patient. One more attempt.', type: 'error' });
      setExtraAttempt(false);
      if (currentWord) setLetters(Array(currentWord.word.length).fill(''));
      startTimer();
      return;
    }

    setFeedback({ message: pickRandom(INCORRECT_FEEDBACK), type: 'error' });
    if (currentWord) setMissedWords(prev => [...prev, currentWord]);

    // Post-word hint summary
    if (hintsUsedThisWord.length > 0) {
      const totalHintCost = hintsUsedThisWord.reduce((s, h) => s + h.cost, 0);
      const icons = hintsUsedThisWord.map(h => h.icon).join(' ');
      setHintSummary(`Hints used: ${icons} · −${totalHintCost}pt`);
    }

    const updatedParticipants = participants.map((p, index) => {
      if (index === currentParticipantIndex) {
        return {
          ...p,
          attempted: p.attempted + 1,
          wordsAttempted: p.wordsAttempted + 1,
          lives: p.lives - 1,
          streak: 0,
          difficultyLevel: clampDifficultyLevel(p.difficultyLevel - config.progressionSpeed)
        };
      }
      return p;
    });
    setParticipants(updatedParticipants);

    playLoseLife();
    if (currentWord) setLetters(Array(currentWord.word.length).fill(''));

    const newAttempted = new Set(attemptedParticipants);
    newAttempted.add(currentParticipantIndex);

    setTimeout(() => {
      setFeedback({ message: '', type: '' });
      
      // In team mode, implement "steal" feature - if a team misspells, next team gets a chance
      if (config.gameMode === 'team' && newAttempted.size < participants.length) {
        setAttemptedParticipants(newAttempted);
        setUsedHint(false);
        setFeedback({ message: 'The next team may now attempt this word.', type: 'info' });
        nextTurn();
        startTimer();
      } else if (config.gameMode === 'individual') {
        if (currentWord) {
          setWordQueues(prev => ({ ...prev, review: [...prev.review, currentWord] }));
          addReviewWord(currentWord);
        }
        setAttemptedParticipants(new Set());
        setUsedHint(false);
        const nextIndex = (currentParticipantIndex + 1) % participants.length;
        advanceToWord(updatedParticipants[nextIndex].difficultyLevel);
        nextTurn();
      } else if (newAttempted.size >= participants.length) {
        // All participants have attempted this word, move to next word and add to review queue
        if (currentWord) {
          setWordQueues(prev => ({ ...prev, review: [...prev.review, currentWord] }));
          addReviewWord(currentWord);
        }
        setAttemptedParticipants(new Set());
        const nextIndex = (currentParticipantIndex + 1) % participants.length;
        advanceToWord(updatedParticipants[nextIndex].difficultyLevel);
        nextTurn();
      } else {
        setAttemptedParticipants(newAttempted);
        setUsedHint(false);
        nextTurn();
        startTimer();
      }
    }, 2000);
  }

  const spendPoints = (participantIndex: number, cost: number) => {
    setParticipants(prev =>
      prev.map((p, index) => {
        if (index === participantIndex) {
          return { ...p, points: p.points - cost };
        }
        return p;
      })
    );
    playShop();
  };

  const typeLetter = (letter: string) => {
    if (!currentWord) return;
    setLetters(prev => {
      const index = prev.findIndex(l => l === '');
      if (index === -1) return prev;
      const newLetters = [...prev];
      newLetters[index] = letter;
      const isCorrectLetter = currentWord.word[index].toLowerCase() === letter.toLowerCase();
      const play = isCorrectLetter ? playLetterCorrect : playLetterWrong;
      play();
      return newLetters;
    });
  };

  const handleVirtualLetter = (letter: string) => {
    typeLetter(letter);
  };

  const handleVirtualBackspace = () => {
    setLetters(prev => {
      const reverseIndex = [...prev].reverse().findIndex(l => l !== '');
      if (reverseIndex === -1) return prev;
      const index = prev.length - 1 - reverseIndex;
      const newLetters = [...prev];
      newLetters[index] = '';
      return newLetters;
    });
  };

  const handleSpellingSubmit = () => {
    if (!currentWord) return;
    stopTimer();

    const guess = letters.join('').trim().toLowerCase();
    const isCorrect = guess === currentWord.word.toLowerCase();

    if (!isCorrect) {
      playWrong();
      handleIncorrectAttempt();
      return;
    }

    const updatedParticipants = participants.map((p, index) => {
      if (index === currentParticipantIndex) {
        const multipliers: Record<string, number> = { easy: 1, medium: 2, tricky: 3 };
        const basePoints = 5;
        const multiplier = multipliers[currentDifficulty] || 1;
        const bonus = p.streak * 2;
        const pointsEarned = basePoints * multiplier + bonus;
        return {
          ...p,
          attempted: p.attempted + 1,
          correct: p.correct + 1,
          wordsAttempted: p.wordsAttempted + 1,
          wordsCorrect: p.wordsCorrect + 1,
          points: p.points + pointsEarned,
          streak: p.streak + 1,
          difficultyLevel: usedHint
            ? clampDifficultyLevel(p.difficultyLevel)
            : clampDifficultyLevel(p.difficultyLevel + config.progressionSpeed)
        };
      }
      return p;
    });
    setParticipants(updatedParticipants);

    const participant = updatedParticipants[currentParticipantIndex];
    const newlyUnlocked = defaultAchievements.filter(
      ach => participant.wordsCorrect >= ach.threshold && !unlockedAchievements.includes(ach.id)
    );

    if (newlyUnlocked.length > 0) {
      const updatedUnlocked = [...unlockedAchievements, ...newlyUnlocked.map(a => a.id)];
      setUnlockedAchievements(updatedUnlocked);
      localStorage.setItem('unlockedAchievements', JSON.stringify(updatedUnlocked));
      const first = newlyUnlocked[0];
      setToast(`Achievement unlocked: ${first.icon} ${first.name}`);
      setTimeout(() => setToast(''), 3000);
    }

    if (isTeamMode) {
      const prevCount = teamCorrectCount;
      const newCount = prevCount + 1;
      setTeamCorrectCount(newCount);
      const newPowers = getNewlyUnlockedPowers(prevCount, newCount);
      if (newPowers.length > 0) {
        setUnlockedPowers(getUnlockedPowerIds(newCount));
        setPendingUnlocks(prev => [...prev, ...newPowers]);
      }
    }

    playCorrect();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (config.effectsEnabled && !prefersReducedMotion) {
      launchConfetti();
    }

    setFeedback({ message: pickRandom(CORRECT_FEEDBACK), type: 'success' });
    setEncouragementMessage(pickEncouragementPhrase(encouragementPhrases, participant.name));

    // Post-word hint summary
    if (hintsUsedThisWord.length > 0) {
      const totalHintCost = hintsUsedThisWord.reduce((s, h) => s + h.cost, 0);
      const icons = hintsUsedThisWord.map(h => h.icon).join(' ');
      setHintSummary(`Hints used: ${icons} · −${totalHintCost}pt`);
    }

    setTimeout(() => {
      const nextIndex = (currentParticipantIndex + 1) % updatedParticipants.length;
      const nextDifficulty = updatedParticipants[nextIndex].difficultyLevel;
      setFeedback({ message: '', type: '' });
      setEncouragementMessage('');
      advanceToWord(nextDifficulty);
      nextTurn();
    }, 2000);
  };

  const saveEncouragementSettings = () => {
    const phrases = normaliseEncouragementPhrases(encouragementDraft);
    const nextPhrases = phrases.length > 0 ? phrases : DEFAULT_ENCOURAGEMENT_PHRASES;
    setEncouragementPhrases(nextPhrases);
    saveEncouragementPhrases(nextPhrases);
    setEncouragementSaveMessage('Phrases saved. The bee approves.');
    setTimeout(() => setEncouragementSaveMessage(''), 2500);
  };

  const resetEncouragementSettings = () => {
    setEncouragementPhrases(DEFAULT_ENCOURAGEMENT_PHRASES);
    saveEncouragementPhrases(DEFAULT_ENCOURAGEMENT_PHRASES);
    setEncouragementSaveMessage('Default phrases restored. The original bee is back.');
    setTimeout(() => setEncouragementSaveMessage(''), 2500);
  };

  const skipWord = () => {
    stopTimer();
    const isLivesPenalty = config.skipPenaltyType === 'lives';
    const deduction = isLivesPenalty
      ? `-${config.skipPenaltyValue} life${config.skipPenaltyValue > 1 ? 's' : ''}`
      : `-${config.skipPenaltyValue} pts`;

    const updatedParticipants = participants.map((p, index) => {
      if (index === currentParticipantIndex) {
        const updated = { ...p, streak: 0, wordsAttempted: p.wordsAttempted + 1 };
        return isLivesPenalty
          ? { ...updated, lives: p.lives - config.skipPenaltyValue }
          : { ...updated, points: p.points - config.skipPenaltyValue };
      }
      return p;
    });
    setParticipants(updatedParticipants);

    if (isLivesPenalty) {
      playLoseLife();
    }
    setFeedback({ message: `Word skipped (${deduction}). It will return later, probably with notes.`, type: 'info' });
    if (currentWord) {
      setWordQueues(prev => ({ ...prev, review: [...prev.review, currentWord] }));
      addReviewWord(currentWord);
    }
    setAttemptedParticipants(new Set());

    setTimeout(() => {
      const nextIndex = (currentParticipantIndex + 1) % updatedParticipants.length;
      const nextDifficulty = updatedParticipants[nextIndex].difficultyLevel;
      setFeedback({ message: '', type: '' });
      if (currentWord) setLetters(Array(currentWord.word.length).fill(''));
      advanceToWord(nextDifficulty);
      nextTurn();
    }, 1500);
  };

  /**
   * Skips the current word without applying any lives/points penalty.
   * Used by the Skip Word battle power (team has already paid points to use it).
   * The word is still tracked for review but the team does not lose a life.
   */
  const skipWordFree = () => {
    stopTimer();
    if (currentWord) {
      setWordQueues(prev => ({ ...prev, review: [...prev.review, currentWord] }));
      addReviewWord(currentWord);
    }
    setAttemptedParticipants(new Set());
    setFeedback({ message: 'Word Skipped ⏭️', type: 'info' });
    setTimeout(() => {
      const nextIndex = (currentParticipantIndex + 1) % participants.length;
      const nextDifficulty = participants[nextIndex].difficultyLevel;
      setFeedback({ message: '', type: '' });
      if (currentWord) setLetters(Array(currentWord.word.length).fill(''));
      advanceToWord(nextDifficulty);
      nextTurn();
    }, 1500);
  };

  function onEndGameWithMissedWords() {
    stopSessionTimer();
    const lessonKey = new Date().toISOString().split('T')[0];
    const stored = JSON.parse(localStorage.getItem('missedWordsCollection') || '{}');
    const existing = stored[lessonKey] || [];
    stored[lessonKey] = [...existing, ...missedWords];
    localStorage.setItem('missedWordsCollection', JSON.stringify(stored));
    const activeParticipants = participants.filter(p => p.lives > 0);
    const finalParticipants = participants.map(p => ({
      ...p,
      accuracy: p.wordsAttempted > 0 ? (p.wordsCorrect / p.wordsAttempted) * 100 : 0
    }));
    onEndGame({
      winner: activeParticipants.length === 1 ? activeParticipants[0] : null,
      participants: finalParticipants,
      gameMode: config.gameMode,
      duration: Math.round((Date.now() - startTime) / 1000),
      missedWords
    });
  }

  React.useEffect(() => {
    if (config.participants.length > 0) {
      advanceToWord(config.participants[0].difficultyLevel);
      startSessionTimer();
    }
  }, []);

  React.useEffect(() => {
    if (!participants || participants.length === 0) return;
    const activeParticipants = participants.filter(p => p.lives > 0);
    if (activeParticipants.length <= 1) {
      onEndGameWithMissedWords();
    }
  }, [participants]);

  const handleMuteToggle = () => {
    audioManager.toggleMute();
  };

  const handleExitGame = () => {
    setShowExitConfirm(true);
  };

  const confirmExitGame = () => {
    // Save the current game state before exiting
    const gameState: SavedGameState = {
      gameConfig: config,
      currentParticipants: participants,
      currentWordIndex: wordIndex,
      currentWord,
      currentParticipantIndex,
      gameStartTime: startTime,
      timeRemaining: timeLeft,
      totalWordsUsed,
      missedWords,
      currentInput: letters.join(''),
      gamePhase: 'spelling',
      difficulty: currentDifficulty,
      savedAt: new Date().toISOString(),
      gameId: currentGameId,
    };
    
    try {
      saveGameState(gameState);
      console.log('Game state saved before exit');
    } catch (error) {
      console.error('Failed to save game state on exit:', error);
    }
    
    setShowExitConfirm(false);
    if (onExitGame) {
      onExitGame();
    }
  };

  const cancelExitGame = () => {
    setShowExitConfirm(false);
  };

  return (
    <div className="relative screen-container bg-gradient-to-br from-indigo-600 to-purple-800 text-white flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-particle top-10 left-10 delay-100"></div>
        <div className="floating-particle top-20 right-20 delay-200"></div>
        <div className="floating-particle bottom-20 left-20 delay-300"></div>
        <div className="floating-particle bottom-10 right-10 delay-400"></div>
        <div className="floating-particle top-1/2 left-1/4 delay-500"></div>
        <div className="floating-particle top-1/3 right-1/4 delay-600"></div>
      </div>
      
      <input
        ref={hiddenInputRef}
        type="text"
        className="absolute opacity-0 pointer-events-none"
        tabIndex={-1}
        aria-label="Hidden input for keyboard capture"
      />
      {toast && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-kahoot-green-500 to-kahoot-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 animate-bounce-in font-bold">
          🎉 {toast}
        </div>
      )}
      
      {/* Enhanced Team Score Cards */}
      <div className="absolute top-8 left-8 flex gap-6 items-center z-40">
        <img 
          src={getContextualMascot({
            isCorrectAnswer: feedback.type === 'correct',
            isWrongAnswer: feedback.type === 'incorrect',
            timeRemaining: timeLeft,
            maxTime: config.timerDuration,
            isShowingHelp: isHelpOpen,
            isTyping: letters.some(letter => letter !== '')
          })} 
          alt="Mascot" 
          className="w-16 h-16 animate-wiggle" 
        />
        {participants.map((p, index) => (
          <div 
            key={index} 
            className={`text-center game-card p-4 min-w-[140px] transform transition-all duration-500 ${
              index === currentParticipantIndex ? 'scale-110 ring-4 ring-kahoot-yellow-400 animate-glow' : ''
            }`}
          >
            {shouldHideNames ? (
              <div className="flex flex-col items-center gap-2">
                {p.avatar && <img src={p.avatar} alt="" className="h-10 w-10 rounded-full border-2 border-kahoot-yellow-300 bg-white/20 object-cover" />}
                <div className="text-lg font-black text-kahoot-yellow-200">
                  {isTeamMode ? `Team ${index + 1}` : `Player ${index + 1}`}
                </div>
              </div>
            ) : (
              <div className="text-xl font-black bg-gradient-to-r from-white to-kahoot-yellow-300 bg-clip-text text-transparent">
                {p.name}
              </div>
            )}
            <div className="text-3xl font-bold my-2">{'❤️'.repeat(p.lives)}</div>
            <div className="text-2xl font-black text-kahoot-green-400">{p.points} pts</div>
          </div>
        ))}
      </div>

      {/* Participant statistics */}
      <ParticipantStats
        participants={participants}
        currentIndex={currentParticipantIndex}
        hideNames={shouldHideNames}
        isTeamMode={isTeamMode}
      />
      
      {/* Enhanced Feedback Messages */}
      {feedback.message && (
        <div className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-black px-8 py-4 rounded-3xl z-50 animate-bounce-in shadow-2xl ${
          feedback.type === 'success' 
            ? 'bg-gradient-to-r from-kahoot-green-500 to-kahoot-green-600 text-white' 
            : feedback.type === 'error' 
            ? 'bg-gradient-to-r from-kahoot-red-500 to-kahoot-red-600 text-white animate-shake' 
            : 'bg-gradient-to-r from-kahoot-blue-500 to-kahoot-blue-600 text-white'
        }`}
        >
          {feedback.type === 'success' ? '🎉 ' : feedback.type === 'error' ? '💥 ' : '🎯 '}
          {feedback.message}
          {hintSummary && (
            <p className="mt-2 text-base font-bold opacity-80">{hintSummary}</p>
          )}
        </div>
      )}

      {encouragementMessage && (
        <EncouragementBanner message={encouragementMessage} />
      )}

      {/* Individual-mode hint nudge */}
      {showHintNudge && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-yellow-400/90 text-black px-5 py-3 rounded-2xl shadow-xl animate-bounce-in text-sm font-bold max-w-xs text-center">
          <span className="text-2xl flex-shrink-0">📖</span>
          <span>Stuck? Try the <strong>Sentence</strong> or <strong>Syllables</strong> hint below — costs just 1 point!</span>
          <button
            onClick={() => { setShowHintNudge(false); if (hintNudgeTimerRef.current) clearTimeout(hintNudgeTimerRef.current); }}
            className="flex-shrink-0 text-black/60 hover:text-black text-lg font-black leading-none"
            aria-label="Dismiss hint suggestion"
          >
            ✕
          </button>
        </div>
      )}

      {/* Exciting Timer Display */}
      <div className="absolute top-8 right-8 text-center z-50 game-card">
        <div className={`text-6xl md:text-8xl font-black mb-2 transition-all duration-300 ${
          timeLeft <= 10 
            ? 'text-kahoot-red-500 animate-pulse scale-110' 
            : timeLeft <= 20 
            ? 'text-kahoot-yellow-500 animate-bounce'
            : 'text-kahoot-green-500'
        }`}>
          {timeLeft}
        </div>
        <div className="text-lg font-bold" aria-live="polite" aria-atomic="true">
          {timeLeft <= 5 ? 'Final seconds.' : timeLeft <= 10 ? 'Time is getting rude.' : 'seconds left'}
        </div>
        <button
          onClick={togglePause}
          className="mt-4 bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-yellow-600 hover:from-kahoot-yellow-500 hover:to-kahoot-yellow-700 text-black px-6 py-3 rounded-2xl font-black text-lg shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          {isPaused ? '▶️ Resume' : '⏸️ Pause'}
        </button>
        <div className={`mt-3 rounded-xl bg-black/30 px-3 py-2 text-sm font-black ${
          sessionTimeLeft <= 120 ? 'text-kahoot-red-400 animate-pulse' : 'text-white'
        }`}>
          Session {Math.floor(sessionTimeLeft / 60)}:{String(sessionTimeLeft % 60).padStart(2, '0')}
        </div>
        <button
          onClick={() => setShowAccessibilitySettings(true)}
          className="mt-3 bg-white/90 hover:bg-white text-black px-5 py-2 rounded-2xl font-black text-base shadow-lg transition-all duration-200 hover:scale-105"
        >
          Accessibility
        </button>
      </div>
      <div className="absolute bottom-8 left-8 bg-black/50 p-4 rounded-lg z-50 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsHelpOpen(true)}
            className="bg-yellow-300 text-black p-2 rounded"
            aria-label="Open help shop"
          >
            ❓
          </button>
          <button
            onClick={() => setShowEncouragementSettings(true)}
            className="bg-yellow-300 text-black p-2 rounded"
            aria-label="Edit encouragement phrases"
            title="Edit encouragement phrases"
          >
            <MessageCircle size={16} />
          </button>
          <button
            onClick={onToggleMusicPlaying}
            className="bg-yellow-300 text-black p-2 rounded"
            aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
          >
            {isMusicPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={() => onSoundEnabledChange(!soundEnabled)}
            className="bg-yellow-300 text-black p-2 rounded"
            aria-label={soundEnabled ? 'Mute audio' : 'Unmute audio'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            onClick={handleExitGame}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors"
            aria-label="Exit game"
            title="Exit and save game"
          >
            <LogOut size={16} />
          </button>
          <button
            onClick={() => window.open(`${window.location.pathname}?team=1`, '_blank', 'noopener,noreferrer')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors"
            aria-label="Open team display"
            title="Open team display"
          >
            📺
          </button>
          <button
            onClick={() => window.open(`${window.location.pathname}?scoreboard=1`, '_blank', 'noopener,noreferrer')}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition-colors"
            aria-label="Open scoreboard display"
            title="Open scoreboard display"
          >
            🏆
          </button>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={musicVolume}
          onChange={e => onMusicVolumeChange(parseFloat(e.target.value))}
          className="w-32"
        />
        <select
          value={musicStyle}
          onChange={e => onMusicStyleChange(e.target.value)}
          className="text-black rounded p-1"
        >
          {musicStyles.map(style => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </div>

      {isHelpOpen && (
        <HelpShop
          onClose={() => setIsHelpOpen(false)}
          coins={participants[currentParticipantIndex].points}
          onPurchase={cost => spendPoints(currentParticipantIndex, cost)}
        />
      )}

      {/* Battle power unlock modal (team mode progression) */}
      {pendingUnlocks.length > 0 && (
        <BattlePowerUnlock
          power={pendingUnlocks[0]}
          onDismiss={() => setPendingUnlocks(prev => prev.slice(1))}
        />
      )}

      {/* Exit Game Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="text-6xl mb-4">🚪</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Leave the words?</h2>
            <p className="text-gray-600 mb-6">
              The game will wait. The words have nowhere else to be.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={cancelExitGame}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
              >
                Stay
              </button>
              <button
                onClick={confirmExitGame}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
                Leave quietly
              </button>
            </div>
          </div>
        </div>
      )}

      {showAccessibilitySettings && (
        <AccessibilitySettings onClose={() => setShowAccessibilitySettings(false)} />
      )}

      {showEncouragementSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 text-gray-900 shadow-2xl">
            <h2 className="mb-2 text-2xl font-black">Encouragement phrases</h2>
            <p className="mb-4 text-sm text-gray-600">One phrase per line. Use {'{name}'} to include the current player or team.</p>
            <label htmlFor="encouragement-phrases" className="sr-only">Encouragement phrases</label>
            <textarea
              id="encouragement-phrases"
              value={encouragementDraft}
              onChange={event => setEncouragementDraft(event.target.value)}
              className="min-h-48 w-full rounded-xl border-2 border-gray-300 p-3 text-base text-gray-900 focus:border-kahoot-purple-500 focus:outline-none"
            />
            {encouragementSaveMessage && (
              <div className="mt-3 rounded-lg bg-green-100 px-3 py-2 font-bold text-green-800" role="status">
                {encouragementSaveMessage}
              </div>
            )}
            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <button
                onClick={resetEncouragementSettings}
                className="rounded-xl bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300"
              >
                Reset
              </button>
              <button
                onClick={() => setShowEncouragementSettings(false)}
                className="rounded-xl bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={saveEncouragementSettings}
                className="rounded-xl bg-kahoot-purple-600 px-4 py-2 font-bold text-white hover:bg-kahoot-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <AvatarSelector
        currentAvatar={currentAvatar}
        onSelect={(avatar) => setCurrentAvatar(avatar)}
      />

      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      {currentWord && (
        <div className="w-full max-w-6xl text-center z-30 animate-scale-in">
          <img 
            src={getContextualMascot({
              isHelping: true,
              isShowingHelp: showWord
            })} 
            alt="Teaching Bee" 
            className="w-16 h-16 mx-auto mb-6 animate-float" 
          />
          
          {/* Epic Word Display Header */}
          <h2 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-red-400 bg-clip-text text-transparent animate-sparkle">
            🎯 WORD FOR {isTeamMode ? 'TEAM' : 'STUDENT'}: {shouldHideNames ? `${isTeamMode ? 'TEAM' : 'PLAYER'} ${currentParticipantIndex + 1}` : (participants[currentParticipantIndex]?.name?.toUpperCase().slice(0, 32) || (isTeamMode ? 'TEAM' : 'STUDENT'))}
          </h2>
          
          {/* Dramatic Word Display */}
          <div className="relative mb-12">
            <div className="mb-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => speak(currentWord.word)}
                className="bg-gradient-to-r from-kahoot-blue-500 to-kahoot-blue-600 hover:from-kahoot-blue-600 hover:to-kahoot-blue-700 text-white px-6 py-3 rounded-2xl font-black text-lg shadow-lg transform transition-all duration-200 hover:scale-105"
              >
                🔊 Replay Word
              </button>
              <button
                onClick={() => setShowWord(!showWord)}
                className="bg-gradient-to-r from-kahoot-yellow-500 to-kahoot-yellow-600 hover:from-kahoot-yellow-600 hover:to-kahoot-yellow-700 text-black px-6 py-3 rounded-2xl font-black text-lg shadow-lg transform transition-all duration-200 hover:scale-105"
              >
                {showWord ? '👁️ Hide Word' : '👁️ Show Word'}
              </button>
            </div>
            {showWord && (
              <div className="inline-block text-6xl md:text-8xl font-black text-white drop-shadow-2xl bg-gradient-to-r from-purple-900/80 to-indigo-900/80 backdrop-blur-sm px-8 py-6 rounded-3xl border-4 border-white/20 animate-bounce-in excitement-glow">
                {currentWord.word}
                {currentWord.pronunciation && (
                  <span className="ml-6 text-4xl md:text-5xl text-kahoot-yellow-300 font-bold">{currentWord.pronunciation}</span>
                )}
              </div>
            )}
          </div>
          {currentWord.phonemes && currentWord.phonemes.length > 0 && (
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setShowPhonics(value => !value)}
                className="rounded-2xl bg-yellow-300 px-6 py-3 text-lg font-black text-black transition hover:bg-yellow-400"
              >
                {showPhonics ? 'Hide Phonics' : 'Show Phonics'}
              </button>
            </div>
          )}
          <HintPanel
            word={currentWord}
            participantPoints={participants[currentParticipantIndex].points}
            participantIndex={currentParticipantIndex}
            spendPoints={spendPoints}
            isTeamMode={isTeamMode}
            showWord={showWord}
            onHintUsed={() => setUsedHint(true)}
            onHintUsedWithId={(_id, icon, cost) => {
              setHintsUsedThisWord(prev => [...prev, { icon, cost }]);
              setHasEverUsedHint(true);
              setShowHintNudge(false);
              if (hintNudgeTimerRef.current) clearTimeout(hintNudgeTimerRef.current);
            }}
            onExtraAttempt={() => setExtraAttempt(true)}
            unlockedPowers={isTeamMode ? unlockedPowers : undefined}
            hasAttemptedCurrentWord={attemptedParticipants.has(currentParticipantIndex)}
            onAddTime={() => addTimeToTimer(15)}
            onSkipWord={skipWordFree}
            onWordLengthRevealed={() => setWordLengthRevealed(true)}
            onRequestPause={handleHintDialogOpen}
            onReleasePause={handleHintDialogClose}
          />
          {showPhonics && currentWord.phonemes && (
            <PhonicsBreakdown phonemes={currentWord.phonemes} />
          )}
          <div className="flex gap-3 justify-center mb-8 px-4 flex-wrap">
            {(() => {
              // When the Word Length hint has NOT been purchased, only show filled
              // boxes plus one empty "cursor" box — so the total count isn't given away.
              const firstEmptyIdx = letters.findIndex(l => l === '');
              const filledCount = firstEmptyIdx === -1 ? letters.length : firstEmptyIdx;
              const visibleLetters = wordLengthRevealed
                ? letters
                : letters.slice(0, filledCount + 1);
              return visibleLetters.map((letter, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-20 text-5xl font-black flex items-center justify-center rounded-2xl border-4 transition-all duration-300 transform ${
                    letter
                      ? letter.toLowerCase() === currentWord.word[idx].toLowerCase()
                        ? 'bg-gradient-to-br from-kahoot-green-400 to-kahoot-green-600 border-kahoot-green-300 text-white scale-110 animate-bounce shadow-2xl'
                        : 'bg-gradient-to-br from-kahoot-red-400 to-kahoot-red-600 border-kahoot-red-300 text-white animate-shake'
                      : idx === filledCount
                        ? 'bg-white/30 border-white/70 text-white animate-pulse'
                        : 'bg-white/20 border-white/40 text-white hover:bg-white/30'
                  }`}
                >
                  {letter.toUpperCase()}
                </div>
              ));
            })()}
          </div>
          <OnScreenKeyboard
            onLetter={handleVirtualLetter}
            onBackspace={handleVirtualBackspace}
            onSubmit={handleSpellingSubmit}
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      <button
        onClick={skipWord}
        className="absolute bottom-8 right-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 p-6 rounded-3xl text-2xl font-black text-white shadow-2xl transform transition-all duration-200 hover:scale-105 animate-glow"
        title="Skip Word"
      >
        ⏭️ <SkipForward size={32} />
      </button>

      {/* Epic Pause Overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="text-center animate-scale-in">
            <div className="text-8xl md:text-9xl font-black text-white mb-4 animate-pulse">⏸️</div>
            <div className="text-6xl md:text-8xl font-black bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-red-400 bg-clip-text text-transparent">
              PAUSED
            </div>
            <div className="text-2xl text-white/80 mt-4">The words are waiting. They're being very professional about it.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
