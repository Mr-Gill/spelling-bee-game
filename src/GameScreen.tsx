import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useHelpSystem } from './contexts/HelpSystemContext';
import { Word } from './types';
import { GameScreenProps, GameScreenState } from './gameTypes';

// Audio
import { loadAudio, preloadCriticalSounds, preloadBackgroundMusic } from './utils/audioUtils';
import correctSoundFile from "../audio/correct.mp3";
import wrongSoundFile from "../audio/wrong.mp3";
import letterCorrectSoundFile from "../audio/letter-correct.mp3";
import letterWrongSoundFile from "../audio/letter-wrong.mp3";

// Components
import CircularTimer from './components/CircularTimer';
import OnScreenKeyboard from './components/OnScreenKeyboard';
import HintPanel from './components/HintPanel';
import Button from './components/Button';
// Progress components
import { CircularProgress, LinearProgress } from './components/BeeProgress';

// Constants
const MAX_SKIP_TURNS = 3;
const MAX_ASK_FRIEND = 1;
const initialTime = 60;

import classNames from 'classnames';

// Default words
const DEFAULT_WORDS = [
  { word: 'apple', difficulty: 'easy' },
  { word: 'banana', difficulty: 'easy' },
  { word: 'cherry', difficulty: 'easy' },
  { word: 'date', difficulty: 'easy' },
  { word: 'elderberry', difficulty: 'medium' },
  { word: 'fig', difficulty: 'medium' },
  { word: 'grape', difficulty: 'medium' },
  { word: 'honeydew', difficulty: 'hard' },
];

// Import custom hooks
import { useGameState } from './hooks/useGameState';
import { useParticipants } from './hooks/useParticipants';
import { useWordQueue } from './hooks/useWordQueue';

// Main GameScreen component
export const GameScreen: React.FC<GameScreenProps> = ({ config }) => {
  // Use custom hooks for state management
  const { gameStarted, gameEnded, timeLeft, startGame, endGame, setTimeLeft } = useGameState();
  const { participants, currentParticipantIndex, setParticipants, setCurrentParticipantIndex } = useParticipants(config.participants);
  const { wordQueues, setWordQueues } = useWordQueue();
  
  // Remaining state
  const [state, setState] = useState<GameScreenState>({
    message: null,
    showDefinition: false,
    musicConfirmed: false
  });
  const [coins, setCoins] = useState(0);
  const [skipsRemaining, setSkipsRemaining] = useState(3);
  const [usedLetters, setUsedLetters] = useState(new Set<string>());
  const [revealedIndices, setRevealedIndices] = useState(new Set<number>());
  const [feedback, setFeedback] = useState(null);
  const [letters, setLetters] = useState([]);
  const [totalWords, setTotalWords] = useState(0);
  const [currentHelp, setCurrentHelp] = useState(null);
  const [gameProgress, setGameProgress] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const { 
    getDefinition: getDefinitionHelp, 
    addTime: addTimeHelp, 
    skipWord: skipWordHelp, 
    isHelpUsed, 
    setHelpUsed 
  } = useHelpSystem();

  const timerRef = useRef<any>(null);

  // Calculate game progress
  useEffect(() => {
    // Update total words when word database is available
    if (config?.wordDatabase) {
      const words = Object.values(config.wordDatabase).flat();
      setTotalWords(words.length);
      
      // Update participants' max score
      setParticipants(prev => prev.map(p => ({
        ...p,
        maxScore: words.length * 10 // 10 points per word
      })));
    }
  }, [config?.wordDatabase]);

  useEffect(() => {
    const gameProgress = totalWords > 0 
      ? Math.min(100, Math.round((currentParticipantIndex / totalWords) * 100))
      : 0;
    setGameProgress(gameProgress);
  }, [currentParticipantIndex, totalWords]);

  useEffect(() => {
    // Preload critical sounds
    preloadCriticalSounds()
      .then(() => setAudioLoaded(true))
      .catch(console.error);
    
    // Preload background music after initial render
    const timer = setTimeout(() => {
      preloadBackgroundMusic();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleShowDefinition = useCallback(async (word: string) => {
    setState(prev => ({ ...prev, showDefinition: true }));
    try {
      const definition = await getDefinitionHelp(word);
      setHelpUsed('hint-definition');
      setCurrentHelp(`Definition: ${definition}`);
      setState(prev => ({ ...prev, message: 'Definition shown' }));
    } catch (error) {
      setState(prev => ({ ...prev, message: 'Failed to load definition' }));
    }
  }, [getDefinitionHelp, setHelpUsed]);

  const handleAddTimeHelp = useCallback(() => {
    addTimeHelp(30);
    setHelpUsed('extra-time');
    setCurrentHelp('Added 30 seconds to the timer!');
    setState(prev => ({ ...prev, message: 'Added 30 seconds to the timer!' }));
  }, [addTimeHelp, setHelpUsed]);

  const handleSkipWordHelp = useCallback(() => {
    skipWordHelp();
    setHelpUsed('skip-word');
    setCurrentHelp('Skipped to the next word!');
    setState(prev => ({ ...prev, message: 'Skipped to the next word!' }));
    handleNextWord();
  }, [skipWordHelp, setHelpUsed, handleNextWord]);

  // Function to play sounds asynchronously
  const playSound = async (soundPath: string) => {
    try {
      const sound = await loadAudio(soundPath);
      sound.play();
    } catch (error) {
      console.error('Failed to play sound', error);
    }
  };

  const currentWord = currentParticipant?.currentWord?.word || '';
  const currentParticipant = participants[currentParticipantIndex];

  const handleSpellingSubmit = useCallback(() => {
    if (!currentWord) return;

    const submittedWord = letters.join('');
    const isCorrect = submittedWord.toLowerCase() === currentWord.toLowerCase();
    
    // Play sound based on correctness
    playSound(isCorrect ? correctSoundFile : wrongSoundFile);

    setParticipants(prev => {
      const updatedParticipants = [...prev];
      const currentParticipant = updatedParticipants[currentParticipantIndex];
      
      currentParticipant.attempted += 1;
      currentParticipant.wordsAttempted += 1;
      
      if (isCorrect) {
        currentParticipant.correct += 1;
        currentParticipant.wordsCorrect += 1;
        currentParticipant.score += 10;
        currentParticipant.points += 5;
        
        return {
          ...prev,
          participants: updatedParticipants,
          coins: coins + 5,
          feedback: { message: `Correct!`, type: 'success' },
          attemptedParticipants: new Set<number>()
        };
      } else {
        return {
          ...prev,
          participants: updatedParticipants,
          feedback: { message: 'Try again!', type: 'error' },
          attemptedParticipants: new Set([...prev.attemptedParticipants, currentParticipantIndex])
        };
      }
    });

    if (isCorrect) {
      setTimeout(handleNextWord, 1500);
    }
  }, [currentWord, letters, handleNextWord, playSound]);

  const typeLetter = useCallback((letter: string) => {
    if (!currentWord || !currentWord) return;
    
    const currentLetter = currentWord[currentWord.length - letters.length - 1].toLowerCase();
    playSound(currentLetter === letter.toLowerCase() ? letterCorrectSoundFile : letterWrongSoundFile);
    
    setLetters([...letters, letter]);
    setUsedLetters(new Set([...usedLetters, letter.toLowerCase()]));
  }, [currentWord, letters.length, usedLetters, playSound]);

  const handleRevealLetter = useCallback(() => {
    if (!currentWord) return;
    
    const word = currentWord;
    const unrevealedIndices = word
      .split('')
      .map((_, i) => i)
      .filter(i => !revealedIndices.has(i));
    
    if (unrevealedIndices.length > 0) {
      const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
      setRevealedIndices(new Set([...revealedIndices, randomIndex]));
      setCoins(coins - 2);
      setCurrentHelp('Revealed a letter! -2 coins');
      setState(prev => ({ ...prev, message: 'Revealed a letter!' }));
    }
  }, [currentWord, revealedIndices, coins]);

  // Set up event listeners for help system
  useEffect(() => {
    const handleAddTime = (e: CustomEvent<{ seconds: number }>) => {
      const { seconds } = e.detail;
      if (timerRef.current) {
        timerRef.current.addSeconds(seconds);
      }
    };

    const handleSkipWord = () => handleNextWord();

    window.addEventListener('addTime', handleAddTime as EventListener);
    window.addEventListener('skipWord', handleSkipWord);

    return () => {
      window.removeEventListener('addTime', handleAddTime as EventListener);
      window.removeEventListener('skipWord', handleSkipWord);
    };
  }, [handleNextWord]);

  // Clear current help and feedback after delay
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    if (currentHelp) {
      const timer = setTimeout(() => 
        setCurrentHelp(null), 3000);
      timers.push(timer);
    }
    
    if (state.message) {
      const timer = setTimeout(() => 
        setState(prev => ({ ...prev, message: null })), 3000);
      timers.push(timer);
    }
    
    return () => timers.forEach(clearTimeout);
  }, [currentHelp, state.message]);

  useEffect(() => {
    const abortController = new AbortController();
    
    const loadWordList = async () => {
      try {
        const response = await fetch('./wordlists/example.json', {
          signal: abortController.signal
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const words = await response.json();
        if (!abortController.signal.aborted) {
          setWordQueues(prev => ({
            ...prev,
            easy: words
          }));
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else if (!abortController.signal.aborted) {
          console.error('Failed to load bundled word list', error);
          setWordQueues(prev => ({
            ...prev,
            easy: DEFAULT_WORDS
          }));
          setState(prev => ({ ...prev, message: 'Failed to load word list. Using default words.' }));
        }
      }
    };

    loadWordList();
    
    return () => {
      abortController.abort();
    };
  }, []);

  const handleNextWord = useCallback(() => {
    setCurrentParticipantIndex(prev => (prev + 1) % participants.length);
    setLetters([]);
    setRevealedIndices(new Set<number>());
    setState(prev => ({ ...prev, showDefinition: false }));
    setFeedback(null);
    setUsedLetters(new Set<string>());
  }, [participants]);

  // Memoized components
  const MemoizedProgress = React.memo(CircularProgress);
  const MemoizedTimer = React.memo(CircularTimer);

  // Optimized game loop
  const gameLoop = useCallback(() => {
    if (!gameStarted) return;
    requestAnimationFrame(() => {
      updateGameState();
      gameLoop();
    });
  }, [gameStarted, updateGameState]);

  // Memoize participants data
  const memoizedParticipants = useMemo(() => participants, [participants]);

  return (
    <div className="game-screen">
      <div className="game-area">
        <header className="game-header">
          <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl">
            <div className="flex flex-col items-center">
              <MemoizedProgress 
                value={gameProgress}
                className="text-primary"
                size="lg"
              />
              <span className="label-small text-on-surface-variant mt-1">Game Progress</span>
            </div>
            
            <div className="flex flex-col items-center">
              <MemoizedProgress 
                value={Math.round((currentParticipant?.score / currentParticipant?.maxScore) * 100)}
                className="text-secondary"
                size="md"
              />
              <span className="label-small text-on-surface-variant mt-1">Score</span>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between label-medium text-on-surface">
                <span>Words: {currentParticipantIndex}/{totalWords}</span>
                <span>{Math.round((currentParticipantIndex / totalWords) * 100)}%</span>
              </div>
              <LinearProgress 
                value={Math.round((currentParticipantIndex / totalWords) * 100)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="timer-container">
            <MemoizedTimer 
              timeLeft={timeLeft}
              total={initialTime}
            />
          </div>
          <div className="coins-display">
            {state.musicConfirmed && (
              <img 
                src={`
                  ${process.env.PUBLIC_URL}/img/${
                    Number(timeLeft) < 15 ? 'TimePressureBee' : 
                    Number(letters.length) > 0 ? 'TypingBee' : 'DefaultBee'
                  }.svg`} 
                alt="Bee avatar"
                className={!state.musicConfirmed ? 'hidden' : ''}
                onError={(e) => e.currentTarget.src = `${process.env.PUBLIC_URL}/img/DefaultBee.svg`}
              />
            )}
            {coins}
          </div>
        </header>

        <div className="word-area">
          <div className="p-6 bg-surface-container-high rounded-xl shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <h2 className="headline-small text-on-surface">Current Word</h2>
              
              {state.showDefinition && currentWord && (
                <div className="flex gap-2">
                  {currentWord.split('').map((letter, index) => (
                    <div 
                      key={index}
                      className={classNames(
                        'w-12 h-16 flex items-center justify-center rounded-md',
                        'text-headline-medium font-medium',
                        revealedIndices.has(index) 
                          ? 'bg-primary-container text-on-primary-container'
                          : 'bg-surface-container-highest text-on-surface-variant'
                      )}
                    >
                      {revealedIndices.has(index) ? letter : '?'}
                    </div>
                  ))}
                </div>
              )}
              
              {currentWord && (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="label-medium text-on-surface-variant">
                      Difficulty: {currentParticipant?.currentWord?.difficulty}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="label-medium text-on-surface-variant">
                        {currentParticipant?.currentWord?.difficulty === 'easy' ? 'Simple' :
                         currentParticipant?.currentWord?.difficulty === 'medium' ? 'Medium' : 'Challenging'}
                      </span>
                      <div className="w-24">
                        <LinearProgress 
                          value={currentParticipant?.currentWord?.difficulty === 'easy' ? 33 : 
                                currentParticipant?.currentWord?.difficulty === 'medium' ? 66 : 100}
                          variant={currentParticipant?.currentWord?.difficulty === 'easy' ? 'success' :
                                  currentParticipant?.currentWord?.difficulty === 'medium' ? 'warning' : 'danger'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <HintPanel 
            word={currentWord}
            onRevealLetter={handleRevealLetter}
            onShowDefinition={() => handleShowDefinition(currentWord)}
            onAddTime={handleAddTimeHelp}
            onSkipWord={handleSkipWordHelp}
            isHelpUsed={isHelpUsed}
            coins={coins}
          />

          {feedback && (
            <div className={`feedback ${feedback.type}`}>
              {feedback.message}
            </div>
          )}

          {currentHelp && (
            <div className="help-message">
              {currentHelp}
            </div>
          )}
          {state.message && (
            <div className="help-message">
              {state.message}
            </div>
          )}
          <div className="space-y-4">
            <OnScreenKeyboard 
              onLetter={typeLetter}
              onBackspace={() => setLetters(letters.slice(0, -1))}
              onSubmit={handleSpellingSubmit}
              soundEnabled={audioLoaded}
              usedLetters={usedLetters}
              currentWord={currentWord}
            />
            
            <div className="flex gap-4">
              <Button 
                variant="filled"
                onClick={handleSpellingSubmit}
                disabled={letters.length === 0}
                className="flex-1"
              >
                Submit
              </Button>
              
              <Button 
                variant="outlined" 
                onClick={() => setLetters([])}
                disabled={letters.length === 0}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        {state.showDefinition && (
          <HelpShop 
            onClose={() => setState(prev => ({ ...prev, showDefinition: false }))}
            onPurchase={(cost) => setCoins(coins - cost)}
          />
        )}
      </div>
    </div>
  );
};

// HelpShop component
const HelpShop = ({ onClose, onPurchase }: { 
  onClose: () => void; 
  onPurchase: (cost: number) => void 
}) => (
  <div className="help-shop">
    <button onClick={() => onPurchase(2)}>
      Reveal Letter ({2} coins)
    </button>
    <button onClick={onClose}>
      Close
    </button>
  </div>
);

// HelpSystemProvider component
const HelpSystemProvider = ({ children }: { children: React.ReactNode }) => (
  <div className="help-system">{children}</div>
);

// Wrap with HelpSystemProvider
export const GameScreenWithProvider: React.FC<GameScreenProps> = (props) => {
  return (
    <HelpSystemProvider>
      <GameScreen {...props} />
    </HelpSystemProvider>
  );
};

export default GameScreen;
