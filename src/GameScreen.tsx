import { useState, useEffect, useRef, useCallback } from 'react';
import { config } from './config';

// Icons
import { Volume2, VolumeX, SkipForward, Users } from 'lucide-react';

// Utils
import { launchConfetti } from './utils/confetti';
import { speak } from './utils/tts';
import useSound from './utils/useSound';
import useTimer from './utils/useTimer';
import { useAudio } from './contexts/AudioContext';

// Types
interface Word {
  id: string;
  word: string;
  definition: string;
  difficulty: 'easy' | 'medium' | 'hard';
  phonetic: string;
  example?: string;
  synonyms?: string[];
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  score: number;
  lives: number;
  teamId?: string;
}

interface Team {
  id: string;
  name: string;
  score: number;
  participants: string[];
  lives: number;
}

interface GameResults {
  participants: Participant[];
  teams: Team[];
  wordsAttempted: number;
  wordsCorrect: number;
  timePlayed: number;
  achievements: string[];
}

interface GameConfig {
  timePerWord: number;
  lives: number;
  difficulty: 'easy' | 'medium' | 'hard';
  teams: boolean;
  wordList: Word[];
}

// Constants
const MAX_SKIP_TURNS = 3;
const MAX_ASK_FRIEND = 1;

// Achievement type
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockDate?: Date;
}

// Mock default achievements
const defaultAchievements: Achievement[] = [];

// WordDatabase type
interface WordDatabase {
  easy: Word[];
  medium: Word[];
  hard: Word[];
  review: Word[];
}

// Extend the window interface to include custom events
declare global {
  interface WindowEventMap {
    addTime: CustomEvent<{ seconds: number }>;
    skipWord: Event;
  }
}

// Types
interface Feedback {
  message: string;
  type: 'success' | 'error' | 'info';
}

type AvatarType = 'bee' | 'book' | 'trophy';

interface GameScreenState {
  participants: (Participant | Team)[];
  currentParticipantIndex: number;
  currentWordIndex: number;
  showShop: boolean;
  coins: number;
  revealedIndices: Set<number>;
  showDefinition: boolean;
  currentHelp: string | null;
  feedback: Feedback | null;
  usedHint: boolean;
  showWord: boolean;
  isHelpOpen: boolean;
  letters: string[];
  usedLetters: Set<string>;
  wordQueues: {
    easy: Word[];
    medium: Word[];
    hard: Word[];
  };
  extraAttempt: boolean;
  attemptedParticipants: Set<number>;
  missedWords: Word[];
}
import correctSoundFile from "../audio/correct.mp3";
import wrongSoundFile from "../audio/wrong.mp3";
import timeoutSoundFile from "../audio/timeout.mp3";
import letterCorrectSoundFile from "../audio/letter-correct.mp3";
import letterWrongSoundFile from "../audio/letter-wrong.mp3";
import shopSoundFile from "../audio/shop.mp3";
import loseLifeSoundFile from "../audio/lose-life.mp3";

// Mock implementations for missing modules
const useHelpSystem = () => ({
  revealLetter: () => {},
  getDefinition: () => {},
  addTime: () => {},
  skipWord: () => {},
  isHelpUsed: false,
  setHelpUsed: () => {},
});

interface GameScreenProps {
  config: GameConfig & { publicUrl?: string };
  onEndGame: (results: GameResults) => void;
}

interface Feedback {
  message: string;
  type: 'success' | 'error' | 'info';
}

const GameScreen: FC<GameScreenProps> = ({ config, onEndGame }) => {
  const publicUrl = config.publicUrl || '';
  // Wrap the game screen with HelpSystemProvider
  return (
    <HelpSystemProvider>
      <GameScreenContent config={config} onEndGame={onEndGame} />
    </HelpSystemProvider>
  );
};

const GameScreenContent: FC<GameScreenProps> = ({ config, onEndGame }) => {
  const isTeamMode = config.gameMode === "team";
  
  // Game state
  const [participants, setParticipants] = useState<(Participant | Team)[]>(
    (config.participants as (Participant | Team)[]).map((p) => ({
      ...p,
      attempted: 0,
      correct: 0,
      wordsAttempted: 0,
      wordsCorrect: 0,
      skipsRemaining: 1,
      askFriendRemaining: 1,
      achievements: [],
      points: 0,
      teamId: '',
      avatar: 'bee' as const
    }))
  );

  // Help system state
  const [showShop, setShowShop] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [showDefinition, setShowDefinition] = useState(false);
  const [currentHelp, setCurrentHelp] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  
  // Help system hooks
  const { 
    revealLetter, 
    getDefinition, 
    addTime, 
    skipWord, 
    isHelpUsed, 
    setHelpUsed 
  } = useHelpSystem();
  
  // Refs
  const timerRef = useRef<any>(null); // Will be set by the timer component
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);

  const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const [teamQueues, setTeamQueues] = useState<Participant[][]>(() => {
    if (!isTeamMode) return [];
    return (config.participants as Team[]).map((t) => shuffle([...t.students]));
  });

  const [usedHint, setUsedHint] = useState(false);
  const [showWord, setShowWord] = useState(true);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [letters, setLetters] = useState<string[]>([]);
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set());
  const [wordQueues, setWordQueues] = useState({
    easy: [] as Word[],
    medium: [] as Word[],
    hard: [] as Word[]
  });
  // Set up event listeners for help system
  useEffect(() => {
    const handleAddTime = (e: CustomEvent<{ seconds: number }>) => {
      const { seconds } = e.detail;
      // Add time to the timer
      if (timerRef.current) {
        timerRef.current.addSeconds(seconds);
      }
    };

    const handleSkipWord = () => {
      handleNextWord();
    };

    window.addEventListener('addTime', handleAddTime as EventListener);
    window.addEventListener('skipWord', handleSkipWord);

    return () => {
      window.removeEventListener('addTime', handleAddTime as EventListener);
      window.removeEventListener('skipWord', handleSkipWord);
    };
  }, [handleNextWord]);

  const handleRevealLetter = useCallback(() => {
    if (!currentWord) return;
    
    const result = revealLetter(currentWord, revealedIndices);
    if (result) {
      setRevealedIndices(prev => new Set([...prev, result.index]));
      // playSound(letterCorrectSound);
      setHelpUsed('hint-letter');
      setCurrentHelp({ message: `Revealed letter: ${result.letter}`, type: 'info' });
      setFeedback({ message: `Revealed letter: ${result.letter}`, type: 'info' });
    }
  }, [currentWord, revealLetter, revealedIndices, setHelpUsed]);

  const handleShowDefinition = useCallback(async () => {
    if (!currentWord) return;
    
    setShowDefinition(true);
    try {
      const definition = await getDefinition(currentWord);
      setCurrentHelp({ message: `Definition: ${definition}`, type: 'info' });
      setHelpUsed('hint-definition');
      setFeedback({ message: 'Definition shown', type: 'info' });
    } catch (error) {
      setFeedback({ message: 'Failed to load definition', type: 'error' });
    }
  }, [currentWord, getDefinition, setHelpUsed]);

  const handleAddTimeHelp = useCallback(() => {
    addTime(30); // Add 30 seconds
    setHelpUsed('extra-time');
    setCurrentHelp({ message: 'Added 30 seconds to the timer!', type: 'success' });
    setFeedback({ message: 'Added 30 seconds to the timer!', type: 'success' });
  }, [addTime, setHelpUsed]);

  const handleSkipWordHelp = useCallback(() => {
    skipWord();
    setHelpUsed('skip-word');
    setCurrentHelp({ message: 'Skipped to the next word!', type: 'info' });
    setFeedback({ message: 'Skipped to the next word!', type: 'info' });
    handleNextWord();
  }, [skipWord, setHelpUsed, handleNextWord]);

  // Clear current help and feedback after delay
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    if (currentHelp) {
      const timer = setTimeout(() => setCurrentHelp(null), 3000);
      timers.push(timer);
    }
    
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 3000);
      timers.push(timer);
    }
    
    return () => timers.forEach(clearTimeout);
  }, [currentHelp, feedback]);
  const [extraAttempt, setExtraAttempt] = useState(false);
  const {
    currentWord,
    currentDifficulty,
    selectNextWord,
  } = useWordSelection(config.wordDatabase as unknown as WordDatabase);
  const [attemptedParticipants, setAttemptedParticipants] = useState<
    Set<number>
  >(new Set());
  const [missedWords, setMissedWords] = useState<Word[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("unlockedAchievements") || "[]");
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState("");
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [startTime] = useState(Date.now());
  const [coins, setCoins] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem("coins");
    return stored ? parseInt(stored, 10) : 100; // Default to 100 coins if not set
  });
  const [ownedAvatars] = useState<string[]>(() => {
    if (typeof window === "undefined") return ["bee", "book", "trophy"];
    try {
      return JSON.parse(
        localStorage.getItem("ownedAvatars") || "[\"bee\",\"book\",\"trophy\"]",
      );
    } catch {
      return ["bee", "book", "trophy"];
    }
  });
  const [currentAvatar, setCurrentAvatar] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('equippedAvatar') || '';
  });
  // Current difficulty is managed by useWordSelection hook
  useEffect(() => {
    localStorage.setItem('equippedAvatar', currentAvatar);
  }, [currentAvatar]);

  const { muted, toggleMute } = useAudio();

  const playCorrect = useSound(correctSoundFile, !muted);
  const playWrong = useSound(wrongSoundFile, !muted);
  const playTimeout = useSound(timeoutSoundFile, !muted);
  const playLetterCorrect = useSound(
    letterCorrectSoundFile,
    !muted,
  );
  const playLetterWrong = useSound(letterWrongSoundFile, !muted);
  const playShop = useSound(shopSoundFile, !muted);
  const playLoseLife = useSound(loseLifeSoundFile, !muted);

  const {
    timeLeft,
    start: startTimer,
    pause: pauseTimer,
    resume: resumeTimer,
    reset: resetTimer,
    stop: stopTimer,
    isPaused,
  } = useTimer(config.timerDuration, () => {
    playTimeout();
    handleIncorrectAttempt();
  });
  useEffect(() => {
    if (!isPaused) {
      setShowAudioSettings(false);
    }
  }, [isPaused]);
  useEffect(() => {
    if (localStorage.getItem('teacherMode') === 'true') {
      document.body.classList.add('teacher-mode');
    } else {
      document.body.classList.remove("teacher-mode");
    }
  }, []);

  useEffect(() => {
    if (currentWord) {
      setLetters(Array.from({ length: currentWord.word.length }, () => ""));
    }
  }, [currentWord]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentWord || isPaused) return;
      if (/^[a-zA-Z]$/.test(e.key)) {
        typeLetter(e.key);
      } else if (e.key === "Backspace") {
        handleVirtualBackspace();
      } else if (e.key === "Enter") {
        handleSpellingSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentWord, isPaused, letters]);

  const selectNextWordForLevel = (level: number) => {
    const nextWord = selectNextWord(level);
    if (nextWord) {
      setAttemptedParticipants(new Set());
      setExtraAttempt(false);
      setIsHelpOpen(false);
      setUsedHint(false);
      setLetters(Array(nextWord.word.length).fill(""));
      if (hiddenInputRef.current) {
        hiddenInputRef.current.focus();
      }
      speak(nextWord.word);
      startTimer();
    } else {
      onEndGameWithMissedWords();
    }
  };

  const nextTurn = () => {
    if (isTeamMode) {
      setTeamQueues((prev) => {
        const newQueues = [...prev];
        const queue = [...newQueues[currentParticipantIndex]];
        queue.shift();
        if (queue.length === 0) {
          const team = participants[currentParticipantIndex] as Team;
          newQueues[currentParticipantIndex] = shuffle([...team.students]);
        } else {
          newQueues[currentParticipantIndex] = queue;
        }
        return newQueues;
      });
    }
    setCurrentParticipantIndex(
      (prevIndex) => (prevIndex + 1) % participants.length,
    );
  };

  function handleIncorrectAttempt() {
    if (extraAttempt) {
      setFeedback({
        message: "Incorrect. You still have one more attempt!",
        type: "error",
      });
      setExtraAttempt(false);
      if (currentWord) setLetters(Array(currentWord.word.length).fill(""));
      startTimer();
      return;
    }

    setFeedback({ message: "Incorrect. Try again next time!", type: "error" });
    if (currentWord) setMissedWords((prev) => [...prev, currentWord]);

    const updatedParticipants = participants.map((p, index) => {
      if (index === currentParticipantIndex) {
        return {
          ...p,
          lives: p.lives - 1,
          streak: 0,
          difficultyLevel: Math.max(
            0,
            p.difficultyLevel - config.progressionSpeed,
          ),
        };
      }
      return p;
    });
    setParticipants(updatedParticipants);

    playLoseLife();
    if (currentWord) setLetters(Array(currentWord.word.length).fill(""));

    const newAttempted = new Set(attemptedParticipants);
    newAttempted.add(currentParticipantIndex);

    setTimeout(() => {
      setFeedback({ message: "", type: "" });
      if (newAttempted.size >= participants.length) {
        if (currentWord) {
          setWordQueues((prev) => ({
            ...prev,
            review: [...prev.review, currentWord],
          }));
        }
        setAttemptedParticipants(new Set());
        const nextIndex = (currentParticipantIndex + 1) % participants.length;
        selectNextWordForLevel(updatedParticipants[nextIndex].difficultyLevel);
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
    setParticipants((prev) =>
      prev.map((p, index) => {
        if (index === participantIndex) {
          return { ...p, points: p.points - cost };
        }
        return p;
      }),
    );
    playShop();
  };

  const typeLetter = (letter: string) => {
    if (!currentWord) return;
    setLetters((prev) => {
      const index = prev.findIndex((l) => l === "");
      if (index === -1) return prev;
      const newLetters = [...prev];
      newLetters[index] = letter;
      const isCorrectLetter =
        currentWord.word[index].toLowerCase() === letter.toLowerCase();
      const play = isCorrectLetter ? playLetterCorrect : playLetterWrong;
      play();
      return newLetters;
    });
  };

  const handleVirtualLetter = (letter: string) => {
    typeLetter(letter);
  };

  const handleVirtualBackspace = () => {
    setLetters((prev) => {
      const reverseIndex = [...prev].reverse().findIndex((l) => l !== "");
      if (reverseIndex === -1) return prev;
      const index = prev.length - 1 - reverseIndex;
      const newLetters = [...prev];
      newLetters[index] = "";
      return newLetters;
    });
  };

  const handleSpellingSubmit = () => {
    if (!currentWord) return;
    stopTimer();

    const guess = letters.join("").trim().toLowerCase();
    const isCorrect = guess === currentWord.word.toLowerCase();
    const shouldCountWord = isCorrect || !extraAttempt;

    const updatedParticipants = participants.map((p, index) => {
      if (index === currentParticipantIndex) {
        const multipliers: Record<string, number> = {
          easy: 1,
          medium: 2,
          tricky: 3,
        };
        const basePoints = 5;
        const multiplier = multipliers[currentDifficulty] || 1;
        const bonus = p.streak * 2;
        const pointsEarned = basePoints * multiplier + bonus;
        return {
          ...p,
          attempted: p.attempted + 1,
          correct: p.correct + (isCorrect ? 1 : 0),
          wordsAttempted: p.wordsAttempted + (shouldCountWord ? 1 : 0),
          wordsCorrect: p.wordsCorrect + (shouldCountWord && isCorrect ? 1 : 0),
          points: isCorrect ? p.points + pointsEarned : p.points,
          streak: isCorrect ? p.streak + 1 : 0,
          difficultyLevel: isCorrect
            ? usedHint
              ? p.difficultyLevel
              : p.difficultyLevel + config.progressionSpeed
            : p.difficultyLevel,
        };
      }
      return p;
    });
    setParticipants(updatedParticipants);

    if (isCorrect) {
      const participant = updatedParticipants[currentParticipantIndex];
      const newlyUnlocked = defaultAchievements.filter(
        (ach) =>
          participant.wordsCorrect >= ach.threshold &&
          !unlockedAchievements.includes(ach.id),
      );

      if (newlyUnlocked.length > 0) {
        const updatedUnlocked = [
          ...unlockedAchievements,
          ...newlyUnlocked.map((a) => a.id),
        ];
        setUnlockedAchievements(updatedUnlocked);
        localStorage.setItem(
          "unlockedAchievements",
          JSON.stringify(updatedUnlocked),
        );
        const first = newlyUnlocked[0];
        setToast(`Achievement unlocked: ${first.icon} ${first.name}!`);
        setTimeout(() => setToast(""), 3000);
      }

      playCorrect();

      const coinReward = 1;
      const newCoins = coins + coinReward;
      setCoins(newCoins);
      localStorage.setItem("coins", String(newCoins));

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (config.effectsEnabled && !prefersReducedMotion) {
        void launchConfetti();
      }

      setFeedback({ message: "Correct! 🎉", type: "success" });

      setTimeout(() => {
        const nextIndex =
          (currentParticipantIndex + 1) % updatedParticipants.length;
        const nextDifficulty = updatedParticipants[nextIndex].difficultyLevel;
        setFeedback({ message: "", type: "" });
        selectNextWordForLevel(nextDifficulty);
        nextTurn();
      }, 2000);

      return; // Stop execution for the correct case
    }

    // This part only runs if the answer was incorrect
    playWrong();
    handleIncorrectAttempt();
  };

  const handleSkipTurn = () => {
    if (!currentWord) return;
    stopTimer();
    const updatedParticipants = participants.map((p, index) =>
      index === currentParticipantIndex
        ? { ...p, skipsRemaining: (p.skipsRemaining || 0) - 1 }
        : p,
    );
    setParticipants(updatedParticipants);

    try {
      const existing = JSON.parse(localStorage.getItem("skippedTurns") || "[]");
      existing.push({
        name: participants[currentParticipantIndex].name,
        word: currentWord.word,
        time: new Date().toISOString(),
      });
      localStorage.setItem("skippedTurns", JSON.stringify(existing));
    } catch {
      // ignore logging errors
    }

    setWordQueues((prev) => ({
      ...prev,
      review: [...prev.review, currentWord],
    }));
    setFeedback({ message: "Turn Skipped", type: "info" });
    setAttemptedParticipants(new Set());

    setTimeout(() => {
      const nextIndex =
        (currentParticipantIndex + 1) % updatedParticipants.length;
      const nextDifficulty = updatedParticipants[nextIndex].difficultyLevel;
      setFeedback({ message: "", type: "" });
      setLetters(Array(currentWord.word.length).fill(""));
      selectNextWordForLevel(nextDifficulty);
      nextTurn();
    }, 1000);
  };

  const handleAskFriend = () => {
    const remaining =
      participants[currentParticipantIndex].askFriendRemaining || 0;
    if (remaining <= 0) return;
    setParticipants((prev) =>
      prev.map((p, index) =>
        index === currentParticipantIndex
          ? { ...p, askFriendRemaining: remaining - 1 }
          : p,
      ),
    );
    setIsHelpOpen(true);
    setFeedback({ message: "A teammate may help!", type: "info" });
    setTimeout(() => setFeedback({ message: "", type: "" }), 2000);
  };

  const onEndGameWithMissedWords = () => {
    const lessonKey = new Date().toISOString().split("T")[0];
    const stored = JSON.parse(
      localStorage.getItem("missedWordsCollection") || "{}",
    );
    const existing = stored[lessonKey] || [];
    stored[lessonKey] = [...existing, ...missedWords];
    localStorage.setItem("missedWordsCollection", JSON.stringify(stored));
    const activeParticipants = participants.filter((p) => p.lives > 0);
    const finalParticipants = participants.map((p) => ({
      ...p,
      accuracy:
        p.wordsAttempted > 0 ? (p.wordsCorrect / p.wordsAttempted) * 100 : 0,
    }));
    onEndGame({
      winner: activeParticipants.length === 1 ? activeParticipants[0] : null,
      participants: finalParticipants,
      gameMode: config.gameMode,
      duration: Math.round((Date.now() - startTime) / 1000),
      missedWords,
    });
  };

  useEffect(() => {
    if (config.participants.length > 0) {
      selectNextWordForLevel(config.participants[0].difficultyLevel);
    }
  }, []);

  useEffect(() => {
    if (!participants || participants.length === 0) return;
    const activeParticipants = participants.filter((p) => p.lives > 0);
    if (activeParticipants.length <= 1) {
      onEndGameWithMissedWords();
    }
  }, [participants]);

  const [showAudioSettings, setShowAudioSettings] = useState(false);

  const { 
    revealLetter, 
    getDefinition, 
    addTime, 
    skipWord, 
    isHelpUsed, 
    setHelpUsed 
  } = useHelpSystem();
      />
      {toast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {toast}
        </div>
      )}
      <div className="absolute top-8 left-8 flex gap-8 items-center">
        <img src={`${config.publicUrl || ''}/img/bee.svg`} alt="Bee" className="w-12 h-12" />
        {participants.map((p, index) => (
          <div key={index} className="text-center bg-white/10 p-4 rounded-lg">
            <div className="text-2xl font-bold">{p.name}</div>
            <div className="text-4xl font-bold text-yellow-300">
              {"❤️".repeat(p.lives)}
            </div>
            <div className="text-xl font-bold text-green-400">
              {p.points} pts
            </div>
          </div>
        ))}
      </div>

      {feedback.message && (
        <div
          className={`absolute top-8 text-2xl font-bold px-6 py-3 rounded-lg ${
            feedback.type === "success"
              ? "bg-green-500"
              : feedback.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="absolute top-8 right-8 text-center z-50 bg-white/10 p-4 rounded-lg">
        <CircularTimer timeLeft={timeLeft} total={config.timerDuration} />
        <div className="text-lg mt-2">seconds left</div>
        <button
          onClick={isPaused ? resumeTimer : pauseTimer}
          className="mt-2 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>

      {/* TODO: Replace with proper audio management */}
      {/* <audio-controls className="audio-controls">
        <button
          className={`audio-btn ${soundEnabled ? "" : "muted"}`}
          onClick={() => {
            soundEnabled ? playWrong() : playCorrect();
          }}
        >
          {soundEnabled ? "🔊" : "🔇"}
        </button>
      </audio-controls> */}

      <AvatarSelector
        currentAvatar={currentAvatar}
        onSelect={(avatar) => setCurrentAvatar(avatar)}
        availableAvatars={ownedAvatars}
      />

      {currentWord && (
        <div className="w-full max-w-4xl text-center">
          <img src={`${config.publicUrl}/img/books.svg`} alt="Book icon" className="w-10 h-10 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6 uppercase font-sans">
            Word for {isTeamMode ? 'Team' : 'Student'}: {participants[currentParticipantIndex]?.name || (isTeamMode ? 'Team' : 'Student')}
          </h2>
          {isTeamMode && currentStudent && (
            <div className="text-xl mb-6">Hot Seat: {currentStudent.name}</div>
          )}
          <div className="relative mb-10 pt-12">
            {showWord && (
              <div className="inline-block text-7xl font-extrabold text-white drop-shadow-lg bg-black/40 px-6 py-3 rounded-lg">
                {currentWord.word}
                {currentWord.pronunciation && (
                  <span className="ml-4 text-5xl text-yellow-300">
                    {currentWord.pronunciation}
                  </span>
                )}
              </div>
            )}
            <button
              onClick={() => speak(currentWord.word)}
              className="absolute top-0 left-0 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
            >
              Replay Word
            </button>
            <button
              onClick={() => setShowWord(!showWord)}
              className="absolute top-0 right-0 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
            >
              {showWord ? "Hide Word" : "Show Word"}
            </button>
          </div>
          <HintPanel
            word={currentWord}
            participantPoints={participants[currentParticipantIndex].points}
            participantIndex={currentParticipantIndex}
            spendPoints={spendPoints}
            isTeamMode={isTeamMode}
            showWord={showWord}
            onHintUsed={() => setUsedHint(true)}
            onExtraAttempt={() => setExtraAttempt(true)}
          />
          {currentWord.phonemes && (
            <div className="mt-6">
              <PhonicsBreakdown phonemes={currentWord.phonemes} />
            </div>
          )}
          <div className="flex gap-2 justify-center mb-8">
            {letters.map((letter, idx) => (
              <div
                key={idx}
                className={`w-12 h-16 text-4xl flex items-center justify-center rounded-lg border-b-2 ${
                  letter
                    ? letter.toLowerCase() ===
                      currentWord.word[idx].toLowerCase()
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-white/20"
                }`}
              >
                {letter.toUpperCase()}
              </div>
            ))}
          </div>
          <OnScreenKeyboard
            onLetter={handleVirtualLetter}
            onBackspace={handleVirtualBackspace}
            onSubmit={handleSpellingSubmit}
            soundEnabled={!muted}
            usedLetters={usedLetters}
          />
        </div>
      )}

      <div className="absolute bottom-8 right-8 flex flex-col gap-4">
        <button
          onClick={handleSkipTurn}
          disabled={
            (participants[currentParticipantIndex].skipsRemaining || 0) <= 0
          }
          className="bg-orange-500 hover:bg-orange-600 p-4 rounded-lg text-xl disabled:opacity-50 flex items-center"
        >
          <SkipForward size={24} className="mr-2" /> Skip Turn
        </button>
        <button
          onClick={handleAskFriend}
          disabled={
            (participants[currentParticipantIndex].askFriendRemaining || 0) <=
            0
          }
          className="bg-blue-500 hover:bg-blue-600 p-4 rounded-lg text-xl disabled:opacity-50 flex items-center"
        >
          <Users size={24} className="mr-2" /> Ask a Friend
        </button>
      </div>

      {isHelpOpen && (
        <div className="absolute bottom-32 right-8 bg-blue-500 p-4 rounded-lg text-xl">
          Friend assisting...
        </div>
      )}

      {isPaused && !showAudioSettings && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-6xl font-bold z-40 gap-8">
          <div>Paused</div>
          <button
            onClick={() => setShowAudioSettings(true)}
            className="bg-yellow-300 text-black px-6 py-3 rounded-lg text-2xl font-bold hover:bg-yellow-400 transition-colors"
          >
            Audio Settings
          </button>
        </div>
      )}

      {showAudioSettings && isPaused && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full relative">
            <button
              onClick={() => setShowAudioSettings(false)}
              className="absolute top-2 right-2 text-black"
              aria-label="Close audio settings"
            >
              ✕
            </button>
            <AudioSettings />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
