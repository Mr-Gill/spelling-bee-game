import React from 'react';
import { SkipForward, Play, Pause, Volume2, VolumeX } from 'lucide-react';
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
import { getContextualMascot } from './utils/mascot';
import ParticipantStats from './components/ParticipantStats';
import { HelpShop } from './components/HelpShop';

const musicStyles = ['Funk', 'Country', 'Deep Bass', 'Rock', 'Jazz', 'Classical'];

interface GameScreenProps {
  config: GameConfig;
  onEndGame: (results: GameResults) => void;
  musicStyle: string;
  musicVolume: number;
  onMusicStyleChange: (style: string) => void;
  onMusicVolumeChange: (volume: number) => void;
  soundEnabled: boolean;
  onSoundEnabledChange: (enabled: boolean) => void;
  isMusicPlaying: boolean;
  onToggleMusicPlaying: () => void;
}

interface Feedback {
  message: string;
  type: string;
}


const GameScreen: React.FC<GameScreenProps> = ({
  config,
  onEndGame,
  musicStyle,
  musicVolume,
  onMusicStyleChange,
  onMusicVolumeChange,
  soundEnabled,
  onSoundEnabledChange,
  isMusicPlaying,
  onToggleMusicPlaying,
}) => {
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
  const isTeamMode = config.gameMode === 'team';
  const [showWord, setShowWord] = React.useState(true);
  const [usedHint, setUsedHint] = React.useState(false);
  const [letters, setLetters] = React.useState<string[]>([]);
  const [feedback, setFeedback] = React.useState<Feedback>({ message: '', type: '' });
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
  } = useGameTimer(config.timerDuration, soundEnabled, handleIncorrectAttempt);
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
  }, [currentWord, isPaused, letters]);

  React.useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-honeycomb');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const advanceToWord = (level: number) => {
    const nextWord = selectNextWord(level);
    if (nextWord) {
      setAttemptedParticipants(new Set());
      setExtraAttempt(false);
      setIsHelpOpen(false);
      setUsedHint(false);
      setLetters(Array(nextWord.word.length).fill(''));
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
    setCurrentParticipantIndex(prevIndex => (prevIndex + 1) % participants.length);
  };

  function handleIncorrectAttempt() {
    if (extraAttempt) {
      setFeedback({ message: 'Incorrect. You still have one more attempt!', type: 'error' });
      setExtraAttempt(false);
      if (currentWord) setLetters(Array(currentWord.word.length).fill(''));
      startTimer();
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
        setFeedback({ message: 'Next team can steal this word!', type: 'info' });
        nextTurn();
        startTimer();
      } else if (newAttempted.size >= participants.length) {
        // All participants have attempted this word, move to next word and add to review queue
        if (currentWord) {
          setWordQueues(prev => ({ ...prev, review: [...prev.review, currentWord] }));
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
      const participant = updatedParticipants[currentParticipantIndex];
      const newlyUnlocked = defaultAchievements.filter(
        ach => participant.wordsCorrect >= ach.threshold && !unlockedAchievements.includes(ach.id)
      );

      if (newlyUnlocked.length > 0) {
        const updatedUnlocked = [...unlockedAchievements, ...newlyUnlocked.map(a => a.id)];
        setUnlockedAchievements(updatedUnlocked);
        localStorage.setItem('unlockedAchievements', JSON.stringify(updatedUnlocked));
        const first = newlyUnlocked[0];
        setToast(`Achievement unlocked: ${first.icon} ${first.name}!`);
        setTimeout(() => setToast(''), 3000);
      }
      
      playCorrect();
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (config.effectsEnabled && !prefersReducedMotion) {
        launchConfetti();
      }
      
      setFeedback({ message: 'Correct! 🎉', type: 'success' });
      
      setTimeout(() => {
        const nextIndex = (currentParticipantIndex + 1) % updatedParticipants.length;
        const nextDifficulty = updatedParticipants[nextIndex].difficultyLevel;
        setFeedback({ message: '', type: '' });
        advanceToWord(nextDifficulty);
        nextTurn();
      }, 2000);
      
      return; // Stop execution for the correct case
    }
    
    // This part only runs if the answer was incorrect
    playWrong();
    handleIncorrectAttempt();
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
      advanceToWord(nextDifficulty);
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
      advanceToWord(config.participants[0].difficultyLevel);
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
        aria-hidden="true"
        tabIndex={-1}
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
            <div className="text-xl font-black bg-gradient-to-r from-white to-kahoot-yellow-300 bg-clip-text text-transparent">
              {p.name}
            </div>
            <div className="text-3xl font-bold my-2">{'❤️'.repeat(p.lives)}</div>
            <div className="text-2xl font-black text-kahoot-green-400">{p.points} pts</div>
          </div>
        ))}
      </div>

      {/* Participant statistics */}
      <ParticipantStats
        participants={participants}
        currentIndex={currentParticipantIndex}
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
        <div className="text-lg font-bold">seconds left</div>
        <button
          onClick={isPaused ? resumeTimer : pauseTimer}
          className="mt-4 bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-yellow-600 hover:from-kahoot-yellow-500 hover:to-kahoot-yellow-700 text-black px-6 py-3 rounded-2xl font-black text-lg shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          {isPaused ? '▶️ Resume' : '⏸️ Pause'}
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
            🎯 WORD FOR {isTeamMode ? 'TEAM' : 'STUDENT'}: {participants[currentParticipantIndex]?.name?.toUpperCase() || (isTeamMode ? 'TEAM' : 'STUDENT')}
          </h2>
          
          {/* Dramatic Word Display */}
          <div className="relative mb-12 pt-10">
            {showWord && (
              <div className="inline-block text-6xl md:text-8xl font-black text-white drop-shadow-2xl bg-gradient-to-r from-purple-900/80 to-indigo-900/80 backdrop-blur-sm px-8 py-6 rounded-3xl border-4 border-white/20 animate-bounce-in excitement-glow">
                {currentWord.word}
                {currentWord.pronunciation && (
                  <span className="ml-6 text-4xl md:text-5xl text-kahoot-yellow-300 font-bold">{currentWord.pronunciation}</span>
                )}
              </div>
            )}
            <button
              onClick={() => speak(currentWord.word)}
              className="absolute top-0 left-0 bg-gradient-to-r from-kahoot-blue-500 to-kahoot-blue-600 hover:from-kahoot-blue-600 hover:to-kahoot-blue-700 text-white px-6 py-3 rounded-2xl font-black text-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              🔊 Replay Word
            </button>
            <button
              onClick={() => setShowWord(!showWord)}
              className="absolute top-0 right-0 bg-gradient-to-r from-kahoot-yellow-500 to-kahoot-yellow-600 hover:from-kahoot-yellow-600 hover:to-kahoot-yellow-700 text-black px-6 py-3 rounded-2xl font-black text-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              {showWord ? '👁️ Hide Word' : '👁️ Show Word'}
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
          <div className="flex gap-3 justify-center mb-8 px-4">
            {letters.map((letter, idx) => (
              <div
                key={idx}
                className={`w-16 h-20 text-5xl font-black flex items-center justify-center rounded-2xl border-4 transition-all duration-300 transform ${
                  letter
                    ? letter.toLowerCase() === currentWord.word[idx].toLowerCase()
                      ? 'bg-gradient-to-br from-kahoot-green-400 to-kahoot-green-600 border-kahoot-green-300 text-white scale-110 animate-bounce shadow-2xl'
                      : 'bg-gradient-to-br from-kahoot-red-400 to-kahoot-red-600 border-kahoot-red-300 text-white animate-shake'
                    : 'bg-white/20 border-white/40 text-white hover:bg-white/30'
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
            <div className="text-2xl text-white/80 mt-4">Game is paused. Click resume to continue!</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
