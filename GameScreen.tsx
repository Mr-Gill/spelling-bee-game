import React from 'react';
import { SkipForward } from 'lucide-react';
import { GameConfig, Word, Participant, GameResults, defaultAchievements } from './types';
import correctSoundFile from './audio/correct.mp3';
import wrongSoundFile from './audio/wrong.mp3';
import timeoutSoundFile from './audio/timeout.mp3';
import letterCorrectSoundFile from './audio/letter-correct.mp3';
import letterWrongSoundFile from './audio/letter-wrong.mp3';
import shopSoundFile from './audio/shop.mp3';
import loseLifeSoundFile from './audio/lose-life.mp3';
import { launchConfetti } from './utils/confetti';
import { speak } from './utils/tts';
import useSound from './utils/useSound';
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
      attempted: 0, correct: 0, wordsAttempted: 0, wordsCorrect: 0
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

  const playCorrect = useSound(correctSoundFile, config.soundEnabled);
  const playWrong = useSound(wrongSoundFile, config.soundEnabled);
  const playTimeout = useSound(timeoutSoundFile, config.soundEnabled);
  const playLetterCorrect = useSound(letterCorrectSoundFile, config.soundEnabled);
  const playLetterWrong = useSound(letterWrongSoundFile, config.soundEnabled);
  const playShop = useSound(shopSoundFile, config.soundEnabled);
  const playLoseLife = useSound(loseLifeSoundFile, config.soundEnabled);
  const hiddenInputRef = React.useRef<HTMLInputElement>(null);

  const [wordQueues, setWordQueues] = React.useState<WordQueues>({
    easy: [...config.wordDatabase.easy].sort(() => Math.random() - 0.5),
    medium: [...config.wordDatabase.medium].sort(() => Math.random() - 0.5),
    tricky: [...config.wordDatabase.tricky].sort(() => Math.random() - 0.5),
    review: []
  });
  const [currentDifficulty, setCurrentDifficulty] = React.useState<'easy' | 'medium' | 'tricky' | 'review'>(
    difficultyOrder[Math.min(config.difficultyLevel, difficultyOrder.length - 1)]
  );
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

  React.useEffect(() => {
    if (localStorage.getItem('teacherMode') === 'true') {
      document.body.classList.add('teacher-mode');
    } else {
      document.body.classList.remove('teacher-mode');
    }
  }, []);
  
  // All other hooks and functions are assumed to be here, corrected and in order...

const handleSpellingSubmit = () => {
    if (!currentWord) return;
    clearInterval(timerRef.current as NodeJS.Timeout);

    const guess = letters.join('').trim().toLowerCase();
    const isCorrect = guess === currentWord.word.toLowerCase();
    const shouldCountWord = isCorrect || !extraAttempt;

    // 1. Update participant stats first
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

    // 2. Handle the "Correct" case
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
        selectNextWord(nextDifficulty);
        nextTurn();
      }, 2000);
      
      return; // This is the crucial missing piece
    }
    
    // 3. Handle the "Incorrect" case (this part only runs if isCorrect was false)
    playWrong();
    handleIncorrectAttempt();
  };
  
  // The rest of the component is assumed to be here...
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white flex flex-col items-center justify-center">
      {/* All JSX is assumed to be here */}
    </div>
  );
};

export default GameScreen;
