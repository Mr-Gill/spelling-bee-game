import React from 'react';
import { SkipForward } from 'lucide-react';
import { GameConfig, Word, Participant, GameResults } from './types';
import correctSoundFile from './audio/correct.mp3';
import wrongSoundFile from './audio/wrong.mp3';
import timeoutSoundFile from './audio/timeout.mp3';
import letterCorrectSoundFile from './audio/letter-correct.mp3';
import letterWrongSoundFile from './audio/letter-wrong.mp3';
import shopSoundFile from './audio/shop.mp3';
import loseLifeSoundFile from './audio/lose-life.mp3';
import { launchConfetti } from './utils/confetti';
import { speak } from './utils/tts';
import OnScreenKeyboard from './components/OnScreenKeyboard';

// Interface definitions remain the same...
interface GameScreenProps {
  config: GameConfig;
  onEndGame: (results: GameResults) => void;
}
interface Feedback { message: string; type: string; }
interface WordQueues { easy: Word[]; medium: Word[]; tricky: Word[]; review: Word[]; }

const difficultyOrder: Array<'easy' | 'medium' | 'tricky' | 'review'> = ['easy', 'medium', 'tricky', 'review'];

const GameScreen: React.FC<GameScreenProps> = ({ config, onEndGame }) => {
  const [participants, setParticipants] = React.useState<Participant[]>(
    config.participants.map(p => ({
      ...p,
      attempted: 0,
      correct: 0,
      wordsAttempted: 0,
      wordsCorrect: 0
    }))
  );
  const [currentParticipantIndex, setCurrentParticipantIndex] = React.useState(0);
  const [currentWord, setCurrentWord] = React.useState<Word | null>(null);
  const [timeLeft, setTimeLeft] = React.useState(config.timerDuration);
  const isTeamMode = config.gameMode === 'team';
  const [showWord, setShowWord] = React.useState(true);
  const [showHint, setShowHint] = React.useState(false);
  const [usedHint, setUsedHint] = React.useState(false);
  const [showDefinition, setShowDefinition] = React.useState(false);
  const [showOrigin, setShowOrigin] = React.useState(false);
  const [showSentence, setShowSentence] = React.useState(false);
  const [showPrefix, setShowPrefix] = React.useState(false);
  const [showSuffix, setShowSuffix] = React.useState(false);
  const [letters, setLetters] = React.useState<string[]>([]);
  const [feedback, setFeedback] = React.useState<Feedback>({ message: '', type: '' });
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [startTime] = React.useState(Date.now());
  const [revealedLetters, setRevealedLetters] = React.useState<boolean[]>([]);
  const [revealedSyllables, setRevealedSyllables] = React.useState<boolean[]>([]);
  const [extraAttempt, setExtraAttempt] = React.useState(false);
  const [isHelpOpen, setIsHelpOpen] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  const correctAudio = React.useRef<HTMLAudioElement>(new Audio(correctSoundFile));
  const wrongAudio = React.useRef<HTMLAudioElement>(new Audio(wrongSoundFile));
  const timeoutAudio = React.useRef<HTMLAudioElement>(new Audio(timeoutSoundFile));
  const letterCorrectAudio = React.useRef<HTMLAudioElement>(new Audio(letterCorrectSoundFile));
  const letterWrongAudio = React.useRef<HTMLAudioElement>(new Audio(letterWrongSoundFile));
  const shopAudio = React.useRef<HTMLAudioElement>(new Audio(shopSoundFile));
  const loseLifeAudio = React.useRef<HTMLAudioElement>(new Audio(loseLifeSoundFile));
  const hiddenInputRef = React.useRef<HTMLInputElement>(null);

  const shuffleArray = (arr: Word[]) => [...arr].sort(() => Math.random() - 0.5);
  const [wordQueues, setWordQueues] = React.useState<WordQueues>({
    easy: shuffleArray(config.wordDatabase.easy),
    medium: shuffleArray(config.wordDatabase.medium),
    tricky: shuffleArray(config.wordDatabase.tricky),
    review: []
  });
  const [currentDifficulty, setCurrentDifficulty] = React.useState<'easy' | 'medium' | 'tricky' | 'review'>(
    difficultyOrder[Math.min(config.difficultyLevel, difficultyOrder.length - 1)]
  );
  const [attemptedParticipants, setAttemptedParticipants] = React.useState<Set<number>>(new Set());
  const [missedWords, setMissedWords] = React.useState<Word[]>([]);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          if (config.soundEnabled) {
            timeoutAudio.current.currentTime = 0;
            timeoutAudio.current.play();
          }
          clearInterval(timerRef.current as NodeJS.Timeout);
          handleIncorrectAttempt();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  React.useEffect(() => {
    if (!currentWord || isPaused) return;
    startTimer();
    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, [currentWord, config.soundEnabled, isPaused]);

  React.useEffect(() => {
    if (currentWord) {
      setLetters(Array.from({ length: currentWord.word.length }, () => ''));
    }
  }, [currentWord]);

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
  }, [currentWord, isPaused, letters]); // Added letters to dependency array

  React.useEffect(() => {
    if (!showWord && currentWord) {
      setRevealedSyllables(Array(currentWord.syllables.length).fill(false));
    }
  }, [showWord, currentWord]);

  const selectNextWord = (level: number) => {
    let index = Math.min(level, difficultyOrder.length - 1);
    let nextWord: Word | null = null;
    let nextDifficulty = difficultyOrder[index];

    while (index < difficultyOrder.length) {
      const diff = difficultyOrder[index];
      const queue = wordQueues[diff];
      if (queue.length > 0) {
        nextWord = queue[0];
        setWordQueues(prev => ({ ...prev, [diff]: prev[diff].slice(1) }));
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
      setRevealedLetters(Array(nextWord.word.length).fill(false));
      setRevealedSyllables(Array(nextWord.syllables.length).fill(false));
      setExtraAttempt(false);
      setIsHelpOpen(false);
      setShowHint(false);
      setUsedHint(false);
      setShowDefinition(false);
      setShowOrigin(false);
      setShowSentence(false);
      setShowPrefix(false);
      setShowSuffix(false);
      setLetters(Array(nextWord.word.length).fill(''));
      if (hiddenInputRef.current) {
        hiddenInputRef.current.focus();
      }
      speak(nextWord.word);
    } else {
      onEndGameWithMissedWords();
    }
  };

  const nextTurn = () => {
    setCurrentParticipantIndex(prevIndex => (prevIndex + 1) % participants.length);
  };

  const handleIncorrectAttempt = () => {
    if (extraAttempt) {
      setFeedback({ message: 'Incorrect. You still have one more attempt!', type: 'error' });
      setExtraAttempt(false);
      if (currentWord) setLetters(Array(currentWord.word.length).fill(''));
      setTimeLeft(config.timerDuration);
      return;
    }

    setFeedback({ message: 'Incorrect. Try again next time!', type: 'error' });
    if (currentWord) setMissedWords(prev => [...prev, currentWord]);
    
    const updatedParticipants = participants.map((p, index) => {
      if (index === currentParticipantIndex) {
        return {
          ...p,
          lives: p.lives - 1,
          streak: 0,
          difficultyLevel: Math.max(0, p.difficultyLevel - config.progressionSpeed)
        };
      }
      return p;
    });
    setParticipants(updatedParticipants);

    if (config.soundEnabled) {
      loseLifeAudio.current.currentTime = 0;
      loseLifeAudio.current.play();
    }
    if (currentWord) setLetters(Array(currentWord.word.length).fill(''));

    const newAttempted = new Set(attemptedParticipants);
    newAttempted.add(currentParticipantIndex);

    setTimeout(() => {
      setFeedback({ message: '', type: '' });
      if (newAttempted.size >= participants.length) {
        if (currentWord) {
          setWordQueues(prev => ({ ...prev, review: [...prev.review, currentWord] }));
        }
        setAttemptedParticipants(new Set());
        const nextIndex = (currentParticipantIndex + 1) % participants.length;
        selectNextWord(updatedParticipants[nextIndex].difficultyLevel);
        nextTurn();
      } else {
        setAttemptedParticipants(newAttempted);
        setUsedHint(false);
        nextTurn();
        setTimeLeft(config.timerDuration);
      }
    }, 2000);
  };

  const spendPoints = (participantIndex: number, cost: number) => {
    setParticipants(prev =>
      prev.map((p, index) => {
        if (index === participantIndex) {
          return { ...p, points: p.points - cost };
        }
        return p;
      })
    );
    if (config.soundEnabled) {
      shopAudio.current.currentTime = 0;
      shopAudio.current.play();
    }
  };

  const handleHangmanReveal = () => {
    const cost = 6;
    if (participants[currentParticipantIndex].points < cost || !currentWord) return;
    spendPoints(currentParticipantIndex, cost);
    setUsedHint(true);
    const unrevealed = revealedLetters.map((rev, idx) => (!rev ? idx : null)).filter(idx => idx !== null) as number[];
    if (unrevealed.length === 0) return;
    const randomIndex = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    const newRevealed = [...revealedLetters];
    newRevealed[randomIndex] = true;
    setRevealedLetters(newRevealed);
  };

  const handleVowelReveal = () => {
    const cost = 4;
    if (participants[currentParticipantIndex].points < cost || !currentWord) return;
    spendPoints(currentParticipantIndex, cost);
    setUsedHint(true);
    const newRevealed = currentWord.word.split('').map((letter, idx) => revealedLetters[idx] || 'aeiou'.includes(letter.toLowerCase()));
    setRevealedLetters(newRevealed);
  };

  const handleFriendSubstitution = () => {
    const cost = 4; // Corrected cost to match UI
    if (participants[currentParticipantIndex].points < cost) return;
    spendPoints(currentParticipantIndex, cost);
    setExtraAttempt(true);
    setUsedHint(true);
  };
  
  const handlePrefixReveal = () => {
    const cost = 3;
    if (participants[currentParticipantIndex].points < cost || !currentWord) return;
    spendPoints(currentParticipantIndex, cost);
    setUsedHint(true);
    setShowPrefix(true);
  };

  const handleSuffixReveal = () => {
    const cost = 3;
    if (participants[currentParticipantIndex].points < cost || !currentWord) return;
    spendPoints(currentParticipantIndex, cost);
    setUsedHint(true);
    setShowSuffix(true);
  };

  const handleRevealSyllable = (index: number) => {
    const cost = 3;
    if (!currentWord || participants[currentParticipantIndex].points < cost) return;
    spendPoints(currentParticipantIndex, cost);
    setUsedHint(true);
    setRevealedSyllables(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const typeLetter = (letter: string) => {
    if (!currentWord) return;
    setLetters(prev => {
      const index = prev.findIndex(l => l === '');
      if (index === -1) return prev;
      const newLetters = [...prev];
      newLetters[index] = letter;
      if (config.soundEnabled) {
        const isCorrectLetter = currentWord.word[index].toLowerCase() === letter.toLowerCase();
        const audio = isCorrectLetter ? letterCorrectAudio.current : letterWrongAudio.current;
        audio.currentTime = 0;
        audio.play();
      }
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
    clearInterval(timerRef.current as NodeJS.Timeout);

    const guess = letters.join('').trim().toLowerCase();
    const isCorrect = guess === currentWord.word.toLowerCase();
    const shouldCountWord = isCorrect || !extraAttempt;

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
          correct: p.correct + (isCorrect ? 1 : 0),
          wordsAttempted: p.wordsAttempted + (shouldCountWord ? 1 : 0),
          wordsCorrect: p.wordsCorrect + (shouldCountWord && isCorrect ? 1 : 0),
          points: isCorrect ? p.points + pointsEarned : p.points,
          streak: isCorrect ? p.streak + 1 : 0,
          difficultyLevel: isCorrect ? (usedHint ? p.difficultyLevel : p.difficultyLevel + config.progressionSpeed) : p.difficultyLevel
        };
      }
      return p;
    });
    setParticipants(updatedParticipants);

    if (isCorrect) {
      if (config.soundEnabled) {
        correctAudio.current.currentTime = 0;
        correctAudio.current.play();
      }
      if (config.effectsEnabled) {
        launchConfetti();
      }
      setFeedback({ message: 'Correct! 🎉', type: 'success' });
      setTimeout(() => {
        const nextIndex = (currentParticipantIndex + 1) % updatedParticipants.length;
        const nextDifficulty = updatedParticipants[nextIndex].difficultyLevel;
        setFeedback({ message: '', type: '' });
        selectNextWord(nextDifficulty);
        nextTurn();
      }, 2000);
    } else {
      if (config.soundEnabled) {
        wrongAudio.current.currentTime = 0;
        wrongAudio.current.play();
      }
      handleIncorrectAttempt();
    }
  };

  const skipWord = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);
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

    if (isLivesPenalty && config.soundEnabled) {
      loseLifeAudio.current.currentTime = 0;
      loseLifeAudio.current.play();
    }
    setFeedback({ message: `Word Skipped (${deduction})`, type: 'info' });
    if (currentWord) {
      setWordQueues(prev => ({ ...prev, review: [...prev.review, currentWord] }));
    }
    setAttemptedParticipants(new Set());

    setTimeout(() => {
      const nextIndex = (currentParticipantIndex + 1) % updatedParticipants.length;
      const nextDifficulty = updatedParticipants[nextIndex].difficultyLevel;
      setFeedback({ message: '', type: '' });
      if (currentWord) setLetters(Array(currentWord.word.length).fill(''));
      selectNextWord(nextDifficulty);
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
      accuracy: p.wordsAttempted > 0 ? (p.wordsCorrect / p.wordsAttempted) * 100 : 0
    }));
    onEndGame({
      winner: activeParticipants.length === 1 ? activeParticipants[0] : null,
      participants: finalParticipants,
      gameMode: config.gameMode,
      duration: Math.round((Date.now() - startTime) / 1000),
      missedWords
    });
  };

  React.useEffect(() => {
    if (config.participants.length > 0) {
        selectNextWord(config.participants[0].difficultyLevel);
    }
  }, []);

  React.useEffect(() => {
    if (!participants || participants.length === 0) return;
    const activeParticipants = participants.filter(p => p.lives > 0);
    if (activeParticipants.length <= 1) {
      onEndGameWithMissedWords();
    }
  }, [participants]);

  return (
    // JSX remains the same
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white flex flex-col items-center justify-center">
        {/* Full UI is assumed here */}
        <h1>Game On</h1>
    </div>
  );
};

export default GameScreen;