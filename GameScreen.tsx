import React, { useState, useEffect, useRef } from 'react';
import { SkipForward } from 'lucide-react';
import { GameConfig, Word, Participant, GameResults, GameState } from './types';
import correctSoundFile from './audio/correct.mp3';
import wrongSoundFile from './audio/wrong.mp3';
import timeoutSoundFile from './audio/timeout.mp3';
import { launchConfetti } from './utils/confetti';
import { speak } from './utils/tts';

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
  const [participants, setParticipants] = useState<Participant[]>(
    config.participants.map(p => ({
      ...p,
      attempted: 0,
      correct: 0,
      wordsAttempted: 0,
      wordsCorrect: 0
    }))
  );
  const [gameState, setGameState] = useState<GameState>({ difficultyLevel: config.difficultyLevel });
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [timeLeft, setTimeLeft] = useState(config.timerDuration);
  const isTeamMode = config.gameMode === 'team';
  const [showWord, setShowWord] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [letters, setLetters] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback>({ message: '', type: '' });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [startTime] = useState(Date.now());
  const [revealedLetters, setRevealedLetters] = useState<boolean[]>([]);
  const [extraAttempt, setExtraAttempt] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const correctAudio = useRef<HTMLAudioElement>(new Audio(correctSoundFile));
  const wrongAudio = useRef<HTMLAudioElement>(new Audio(wrongSoundFile));
  const timeoutAudio = useRef<HTMLAudioElement>(new Audio(timeoutSoundFile));

  const shuffleArray = (arr: Word[]) => [...arr].sort(() => Math.random() - 0.5);
  const [wordQueues, setWordQueues] = useState<WordQueues>({
    easy: shuffleArray(config.wordDatabase.easy),
    medium: shuffleArray(config.wordDatabase.medium),
    tricky: shuffleArray(config.wordDatabase.tricky),
    review: []
  });
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'tricky' | 'review'>(
    difficultyOrder[Math.min(config.difficultyLevel, difficultyOrder.length - 1)]
  );
  const [attemptedParticipants, setAttemptedParticipants] = useState<Set<number>>(new Set());
  const [missedWords, setMissedWords] = useState<Word[]>([]);

  useEffect(() => {
    if (!currentWord) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          timeoutAudio.current.currentTime = 0;
          timeoutAudio.current.play();
          clearInterval(timerRef.current as NodeJS.Timeout);
          handleIncorrectAttempt();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, [currentWord]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentWord) return;
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
  }, [currentWord, letters]);

  const selectNextWord = (level: number = gameState.difficultyLevel) => {
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
      setExtraAttempt(false);
      setIsHelpOpen(false);
      setShowHint(false);
      setLetters(Array.from({ length: nextWord.word.length }, () => ''));
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
        return { ...p, lives: p.lives - 1, streak: 0 };
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
        selectNextWord();
        nextTurn();
      } else {
        setAttemptedParticipants(newAttempted);
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
    const cost = 5;
    if (participants[currentParticipantIndex].points < cost || !currentWord) return;
    spendPoints(currentParticipantIndex, cost);
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
    clearInterval(timerRef.current as NodeJS.Timeout);

    const guess = letters.join('').trim().toLowerCase();
    const isCorrect = guess === currentWord.word.toLowerCase();

    setParticipants(prev =>
      prev.map((p, index) => {
        if (index === currentParticipantIndex) {
          const multipliers: Record<string, number> = { easy: 1, medium: 2, tricky: 3 };
          const basePoints = 10;
          const multiplier = multipliers[currentDifficulty] || 1;
          const bonus = p.streak * 5;
          const pointsEarned = basePoints * multiplier + bonus;

          return {
            ...p,
            attempted: p.attempted + 1,
            correct: p.correct + (isCorrect ? 1 : 0),
            wordsAttempted: p.wordsAttempted + 1,
            wordsCorrect: p.wordsCorrect + (isCorrect ? 1 : 0),
            lives: isCorrect ? p.lives : p.lives - 1,
            points: isCorrect ? p.points + pointsEarned : p.points,
            streak: isCorrect ? p.streak + 1 : 0
          };
        }
        return p;
      })
    );

    if (isCorrect) {
      launchConfetti();
      correctAudio.current.currentTime = 0;
      correctAudio.current.play();
      setFeedback({ message: 'Correct! 🎉', type: 'success' });
      if (currentWord) setLetters(Array(currentWord.word.length).fill(''));
      const newLevel = gameState.difficultyLevel + config.progressionSpeed;
      setGameState(prev => ({ ...prev, difficultyLevel: newLevel }));
      setTimeout(() => {
        setFeedback({ message: '', type: '' });
        selectNextWord(newLevel);
        nextTurn();
      }, 2000);
      return;
    }

    wrongAudio.current.currentTime = 0;
    wrongAudio.current.play();
    handleIncorrectAttempt();
  };

  const skipWord = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);

    const penalty = 2;
    let deduction = '';
    const updatedParticipants = participants.map((p, index) => {
      if (index === currentParticipantIndex) {
        if (p.points >= penalty) {
          deduction = `-${penalty} pts`;
          return { ...p, points: p.points - penalty };
        }
        deduction = '-1 life';
        return { ...p, lives: p.lives - 1 };
      }
      return p;
    });
    setParticipants(updatedParticipants);
    setFeedback({ message: `Word Skipped (${deduction})`, type: 'info' });
    if (currentWord) {
      setWordQueues(prev => ({ ...prev, review: [...prev.review, currentWord] }));
    }
    setParticipants(prev =>
      prev.map((p, index) => {
        if (index === currentParticipantIndex) {
          if (config.skipPenaltyType === 'lives') {
            return {
              ...p,
              lives: p.lives - config.skipPenaltyValue,
              streak: 0,
              wordsAttempted: p.wordsAttempted + 1
            };
          }
          return {
            ...p,
            points: p.points - config.skipPenaltyValue,
            streak: 0,
            wordsAttempted: p.wordsAttempted + 1
          };
        }
        return p;
      })
    );
    setAttemptedParticipants(new Set());

    setTimeout(() => {
      setFeedback({ message: '', type: '' });
      if (currentWord) setLetters(Array(currentWord.word.length).fill(''));
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
      accuracy:
        p.wordsAttempted > 0 ? (p.wordsCorrect / p.wordsAttempted) * 100 : 0
    }));
    onEndGame({
      winner: activeParticipants.length === 1 ? activeParticipants[0] : null,
      participants: finalParticipants,
      gameMode: config.gameMode,
      duration: Math.round((Date.now() - startTime) / 1000),
      missedWords
    });
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
  }, [participants]);

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
        <div className={`absolute top-8 text-2xl font-bold px-6 py-3 rounded-lg ${
          feedback.type === 'success' ? 'bg-green-500' : feedback.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="absolute top-8 right-8 text-center">
        <div className={`text-6xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-yellow-300'}`}>{timeLeft}</div>
        <div className="text-lg">seconds left</div>
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
            {showHint && (
              <>
                <p className="text-2xl mb-2">
                  <strong className="text-yellow-300">Definition:</strong> {currentWord.definition}
                </p>
                <p className="text-xl mb-2">
                  <strong className="text-yellow-300">Origin:</strong> {currentWord.origin}
                </p>
                <p className="text-xl">
                  <strong className="text-yellow-300">Example:</strong> "{currentWord.example}"
                </p>
              </>
            )}
            <button
              onClick={() => setShowHint(!showHint)}
              className="mt-4 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
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
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleSpellingSubmit}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-2xl font-bold"
            >
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

      <button
        onClick={skipWord}
        className="absolute bottom-8 right-8 bg-orange-500 hover:bg-orange-600 p-4 rounded-lg text-xl"
      >
        <SkipForward size={24} />
      </button>
    </div>
  );
};

export default GameScreen;