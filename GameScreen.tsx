import React from 'react';
import { SkipForward } from 'lucide-react';
import { GameConfig, Word, Participant, GameResults } from './types';
import correctSoundFile from './audio/correct.mp3';
import wrongSoundFile from './audio/wrong.mp3';
import timeoutSoundFile from './audio/timeout.mp3';
import { launchConfetti } from './utils/confetti';
import { speak } from './utils/tts';
import OnScreenKeyboard from './components/OnScreenKeyboard';

interface GameScreenProps {
  config: GameConfig;
  onEndGame: (results: GameResults) => void;
}

interface Feedback {
  message: string;
  type: string;
}

interface WordQueues {
  easy: Word[];
  medium: Word[];
  tricky: Word[];
  review: Word[];
}

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
        setLetters(prev => {
          const index = prev.findIndex(l => l === '');
          if (index === -1) return prev;
          const newLetters = [...prev];
          newLetters[index] = e.key;
          return newLetters;
        });
      } else if (e.key === 'Backspace') {
        setLetters(prev => {
          const reverseIndex = [...prev].reverse().findIndex(l => l !== '');
          if (reverseIndex === -1) return prev;
          const index = prev.length - 1 - reverseIndex;
          const newLetters = [...prev];
          newLetters[index] = '';
          return newLetters;
        });
      } else if (e.key === 'Enter') {
        handleSpellingSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentWord, isPaused]);

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
      setRevealedSyllables(Array.from({ length: nextWord.syllables.length }, () => false));
      setExtraAttempt(false);
      setIsHelpOpen(false);
      setShowHint(false);
      setUsedHint(false);
      setShowDefinition(false);
      setShowOrigin(false);
      setShowSentence(false);
      setLetters(Array.from({ length: nextWord.word.length }, () => ''));
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = '';
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
  };

  const handleHangmanReveal = () => {
    const cost = 6;
    if (participants[currentParticipantIndex].points < cost || !currentWord) return;
    spendPoints(currentParticipantIndex, cost);
    setUsedHint(true);
    const unrevealed = revealedLetters
      .map((rev, idx) => (!rev ? idx : null))
      .filter(idx => idx !== null) as number[];
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
    const newRevealed = currentWord.word.split('').map((letter, idx) => {
      return revealedLetters[idx] || 'aeiou'.includes(letter.toLowerCase());
    });
    setRevealedLetters(newRevealed);
  };

  const handleFriendSubstitution = () => {
    const cost = 5;
    if (participants[currentParticipantIndex].points < cost) return;
    spendPoints(currentParticipantIndex, cost);
    setExtraAttempt(true);
    setUsedHint(true);
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

  const handleVirtualLetter = (letter: string) => {
    setLetters(prev => {
      const index = prev.findIndex(l => l === '');
      if (index === -1) return prev;
      const newLetters = [...prev];
      newLetters[index] = letter;
      return newLetters;
    });
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
    const nextIndex = (currentParticipantIndex + 1) % participants.length;
    
    setParticipants(prev => {
      const newParticipants = prev.map((p, index) => {
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
            difficultyLevel: isCorrect
              ? (usedHint ? p.difficultyLevel : p.difficultyLevel + config.progressionSpeed)
              : p.difficultyLevel
          };
        }
        return p;
      });

      const nextDifficulty = newParticipants[nextIndex].difficultyLevel;

      if (isCorrect) {
        if (config.soundEnabled) {
          correctAudio.current.currentTime = 0;
          correctAudio.current.play();
        }
        if (config.effectsEnabled) {
          launchConfetti();
        }
        setFeedback({ message: 'Correct! 🎉', type: 'success' });
        if (currentWord) setLetters(Array(currentWord.word.length).fill(''));
        setTimeout(() => {
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
      return newParticipants;
    });
  };

  const skipWord = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    const isLivesPenalty = config.skipPenaltyType === 'lives';
    const deduction = isLivesPenalty
      ? `-${config.skipPenaltyValue} life${config.skipPenaltyValue > 1 ? 's' : ''}`
      : `-${config.skipPenaltyValue} pts`;
      
    setParticipants(prev => {
        const updatedParticipants = prev.map((p, index) => {
        if (index === currentParticipantIndex) {
          const updated = {
            ...p,
            streak: 0,
            wordsAttempted: p.wordsAttempted + 1
          };
          return isLivesPenalty
            ? { ...updated, lives: p.lives - config.skipPenaltyValue }
            : { ...updated, points: p.points - config.skipPenaltyValue };
        }
        return p;
      });

      setFeedback({ message: `Word Skipped (${deduction})`, type: 'info' });
      if (currentWord) {
        setWordQueues(queuePrev => ({ ...queuePrev, review: [...queuePrev.review, currentWord] }));
      }
      setAttemptedParticipants(new Set());
      const nextIndex = (currentParticipantIndex + 1) % participants.length;
      const nextDifficulty = updatedParticipants[nextIndex].difficultyLevel;

      setTimeout(() => {
        setFeedback({ message: '', type: '' });
        if (currentWord) setLetters(Array(currentWord.word.length).fill(''));
        selectNextWord(nextDifficulty);
        nextTurn();
      }, 1500);

      return updatedParticipants;
    });
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
    selectNextWord(participants[0].difficultyLevel);
  }, []);

  React.useEffect(() => {
    if (!participants || participants.length === 0) return;
    const activeParticipants = participants.filter(p => p.lives > 0);
    if (activeParticipants.length <= 1) {
      onEndGameWithMissedWords();
    }
  }, [participants]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white flex flex-col items-center justify-center">
      <input
        ref={hiddenInputRef}
        type="text"
        className="absolute opacity-0 pointer-events-none"
        aria-hidden="true"
      />
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
        <div className={`absolute top-8 text-2xl font-bold px-6 py-3 rounded-lg ${
          feedback.type === 'success' ? 'bg-green-500' : feedback.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="absolute top-8 right-8 text-center z-50">
        <div className={`text-6xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-yellow-300'}`}>{timeLeft}</div>
        <div className="text-lg">seconds left</div>
        <button
          onClick={isPaused ? resumeTimer : pauseTimer}
          className="mt-2 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>

      {currentWord && (
        <div className="w-full max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Word for {isTeamMode ? 'Team' : 'Student'}: {participants[currentParticipantIndex]?.name || (isTeamMode ? 'Team' : 'Student')}
          </h2>
          <div className="relative mb-8 pt-10">
            {showWord && (
              <div className="inline-block text-7xl font-extrabold text-white drop-shadow-lg bg-black/40 px-6 py-3 rounded-lg">
                {currentWord.word}
                {currentWord.pronunciation && (
                  <span className="ml-4 text-5xl text-yellow-300">{currentWord.pronunciation}</span>
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
              {showWord ? 'Hide Word' : 'Show Word'}
            </button>
          </div>
          <div className="bg-white/10 p-6 rounded-lg mb-8">
            {revealedLetters.some(r => r) && (
              <p className="text-3xl font-mono mb-4">
                {currentWord.word
                  .split('')
                  .map((letter, idx) => (revealedLetters[idx] ? letter : '_'))
                  .join(' ')}
              </p>
            )}
            {showDefinition && (
              <p className="text-2xl mb-2">
                <strong className="text-yellow-300">Definition:</strong> {currentWord.definition}
              </p>
            )}
            <button
              onClick={() => {
                setShowHint(!showHint);
                if (!showHint) setUsedHint(true);
              }}
              className="mt-4 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            {showHint && currentWord && (
              <div className="mt-4 flex flex-col items-center gap-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentWord.syllables.map((syllable, idx) => (
                    <button
                      key={idx}
                      onClick={() => speak(syllable)}
                      disabled={!revealedSyllables[idx] || !showWord}
                      className="bg-yellow-100 text-black px-2 py-1 rounded disabled:opacity-50"
                    >
                      {showWord && revealedSyllables[idx] ? syllable : '???'}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentWord.syllables.map((_, idx) =>
                    !revealedSyllables[idx] && (
                      <button
                        key={`reveal-${idx}`}
                        onClick={() => handleRevealSyllable(idx)}
                        disabled={participants[currentParticipantIndex].points < 3}
                        className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
                      >
                        {`Reveal syllable ${idx + 1} (-3)`}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
            {showOrigin && (
              <p className="text-xl mb-2">
                <strong className="text-yellow-300">Origin:</strong> {currentWord.origin}
              </p>
            )}
            {showSentence && (
              <p className="text-xl">
                <strong className="text-yellow-300">Example:</strong> "{currentWord.example}"
              </p>
            )}
            <div className="mt-4 flex gap-4 justify-center">
              {!showDefinition && (
                <button
                  onClick={() => {
                    if (participants[currentParticipantIndex].points < 1) return;
                    spendPoints(currentParticipantIndex, 1);
                    setShowDefinition(true);
                  }}
                  disabled={participants[currentParticipantIndex].points < 1}
                  className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
                >
                  Buy Definition (-1)
                </button>
              )}
              {!showOrigin && (
                <button
                  onClick={() => {
                    if (participants[currentParticipantIndex].points < 1) return;
                    spendPoints(currentParticipantIndex, 1);
                    setShowOrigin(true);
                  }}
                  disabled={participants[currentParticipantIndex].points < 1}
                  className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
                >
                  Buy Origin (-1)
                </button>
              )}
              {!showSentence && (
                <button
                  onClick={() => {
                    if (participants[currentParticipantIndex].points < 1) return;
                    spendPoints(currentParticipantIndex, 1);
                    setShowSentence(true);
                  }}
                  disabled={participants[currentParticipantIndex].points < 1}
                  className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
                >
                  Buy Sentence (-1)
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-2 justify-center mb-4">
            {letters.map((letter, idx) => (
              <div
                key={idx}
                className={`w-12 h-16 text-4xl flex items-center justify-center rounded-lg border-b-2 ${
                  letter
                    ? letter.toLowerCase() === currentWord.word[idx].toLowerCase()
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : 'bg-white/20'
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
          />

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

      <button
        onClick={skipWord}
        className="absolute bottom-8 right-8 bg-orange-500 hover:bg-orange-600 p-4 rounded-lg text-xl"
      >
        <SkipForward size={24} />
      </button>

      {isPaused && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-6xl font-bold z-40">
          Paused
        </div>
      )}
    </div>
  );
};

export default GameScreen;