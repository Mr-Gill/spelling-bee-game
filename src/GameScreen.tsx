import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHelpSystem } from './contexts/HelpSystemContext';
import { 
  Word, 
  GameScreenProps, 
  GameScreenState
} from '../types';

// Components
import CircularTimer from './components/CircularTimer';
import OnScreenKeyboard from './components/OnScreenKeyboard';
import HintPanel from './components/HintPanel';
import Button from './components/Button';
// Progress components
import BeeProgress from './components/BeeProgress';
import BeeElement from './components/BeeElement';

// Constants
const initialTime = 60;

// Default words
const DEFAULT_WORDS = {
  easy: [
    { word: 'apple', difficulty: 'easy', syllables: ['ap', 'ple'], phonemes: ['/æ/', '/p/', '/əl/'], definition: 'a fruit', origin: 'Old English', example: 'I ate an apple.' },
    { word: 'banana', difficulty: 'easy', syllables: ['ba', 'na', 'na'], phonemes: ['/b/', '/ə/', '/n/', '/ɑː/', '/n/', '/ə/'], definition: 'a fruit', origin: 'Spanish', example: 'I ate a banana.' },
    { word: 'cherry', difficulty: 'easy', syllables: ['cher', 'ry'], phonemes: ['/tʃ/', '/ɛ/', '/r/', '/i/'], definition: 'a fruit', origin: 'Old English', example: 'I ate a cherry.' },
    { word: 'date', difficulty: 'easy', syllables: ['date'], phonemes: ['/deɪt/'], definition: 'a fruit', origin: 'Old English', example: 'I ate a date.' },
    { word: 'elderberry', difficulty: 'medium', syllables: ['el', 'der', 'ber', 'ry'], phonemes: ['/ɛ/', '/l/', '/d/', '/ə/', '/r/', '/b/', '/ɛ/', '/r/', '/i/'], definition: 'a fruit', origin: 'Old English', example: 'I ate an elderberry.' },
    { word: 'fig', difficulty: 'medium', syllables: ['fig'], phonemes: ['/fɪɡ/'], definition: 'a fruit', origin: 'Old English', example: 'I ate a fig.' },
    { word: 'grape', difficulty: 'medium', syllables: ['grape'], phonemes: ['/ɡ/', '/r/', '/eɪ/', '/p/'], definition: 'a fruit', origin: 'Old English', example: 'I ate a grape.' },
    { word: 'honeydew', difficulty: 'hard', syllables: ['hon', 'ey', 'dew'], phonemes: ['/h/', '/ʌ/', '/n/', '/i/', '/d/', '/uː/'], definition: 'a fruit', origin: 'Old English', example: 'I ate a honeydew.' },
  ],
  medium: [
    // ...
  ],
  hard: [
    // ...
  ]
};

// Import custom hooks
import { useGameState } from './hooks/useGameState';
import { useParticipants } from './hooks/useParticipants';
import { useWordQueue } from './hooks/useWordQueue';
import { generateWordList } from './api/githubAIService';

// Main GameScreen component
export const GameScreen: React.FC<GameScreenProps> = ({ config }) => {
  // Use custom hooks for state management
  const { gameStarted, timeLeft } = useGameState();
  const { participants, currentParticipantIndex, setParticipants, setCurrentParticipantIndex } = useParticipants(config.participants);
  const { setWordQueues } = useWordQueue();
  
  // Remaining state
  const [state, setState] = useState<GameScreenState>({
    message: null,
    showDefinition: false,
    musicConfirmed: false
  });
  const [coins, setCoins] = useState(0);
  const [usedLetters, setUsedLetters] = useState(new Set<string>());
  const [revealedIndices, setRevealedIndices] = useState(new Set<number>());
  const [feedback, setFeedback] = useState<{message: string, type: string} | null>(null);
  const [letters, setLetters] = useState<string[]>([]);
  const [totalWords, setTotalWords] = useState(0);
  const [currentHelp, setCurrentHelp] = useState<string | null>(null);
  const [gameProgress, setGameProgress] = useState(0);

  const handleNextWord = useCallback(() => {
    setCurrentParticipantIndex(prev => (prev + 1) % participants.length);
    setLetters([]);
    setRevealedIndices(new Set<number>());
    setState(prev => ({ ...prev, showDefinition: false }));
    setFeedback(null);
    setUsedLetters(new Set<string>());
  }, [participants]);

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

  const handleShowDefinition = useCallback(async (word: string) => {
    setState(prev => ({ ...prev, showDefinition: true }));
    try {
      const definition = await getDefinitionHelp(word);
      setHelpUsed('hint-definition');
      setCurrentHelp(`Definition: ${definition}`);
      setState(prev => ({ ...prev, message: 'Definition shown' }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setState(prev => ({ ...prev, message: 'Failed to load definition' }));
      }
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
  }, [skipWordHelp, setHelpUsed]);

  const currentParticipant = participants[currentParticipantIndex];

  const handleSpellingSubmit = useCallback(() => {
    if (!currentParticipant?.currentWord) return;

    const submittedWord = letters.join('');
    const isCorrect = submittedWord.toLowerCase() === currentParticipant.currentWord.word.toLowerCase();
    
    setParticipants(prev => {
      const updated = [...prev];
      updated[currentParticipantIndex] = {
        ...updated[currentParticipantIndex],
        currentWord: currentParticipant.currentWord,
        attempted: updated[currentParticipantIndex].attempted || 0,
        correct: updated[currentParticipantIndex].correct || 0
      };
      return updated;
    });

    if (isCorrect) {
      setTimeout(handleNextWord, 1500);
    }
  }, [currentParticipant, letters, handleNextWord]);

  const typeLetter = useCallback((letter: string) => {
    if (!currentParticipant?.currentWord) return;
    
    setLetters([...letters, letter]);
    setUsedLetters(new Set([...usedLetters, letter.toLowerCase()]));
  }, [currentParticipant, letters, usedLetters]);

  const handleRevealLetter = useCallback(() => {
    if (!currentParticipant?.currentWord) return;
    
    const word = currentParticipant.currentWord.word;
    const unrevealedIndices = word
      .split('')
      .map((_: string, i: number) => i)
      .filter((i: number) => !revealedIndices.has(i));
    
    if (unrevealedIndices.length > 0) {
      const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
      setRevealedIndices(new Set([...revealedIndices, randomIndex]));
      setCoins(coins - 2);
      setCurrentHelp('Revealed a letter! -2 coins');
      setState(prev => ({ ...prev, message: 'Revealed a letter!' }));
    }
  }, [currentParticipant, revealedIndices, coins]);

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
        const aiWordList = await generateWordList("Generate a list of spelling bee words for grade level");
        if (!abortController.signal.aborted) {
          setWordQueues(prev => ({
            ...prev,
            easy: aiWordList.map((w: Word) => ({
              word: w.word,
              difficulty: w.difficulty === 'easy' ? 'easy' : w.difficulty === 'medium' ? 'medium' : 'hard',
              syllables: w.syllables || [],
              phonemes: w.phonemes || [],
              definition: w.definition || '',
              origin: w.origin || '',
              example: w.example || ''
            }))
          }));
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.log('Fetch aborted');
          } else if (!abortController.signal.aborted) {
            console.error('Failed to load AI word list', error);
            setWordQueues(prev => ({
              ...prev,
              easy: DEFAULT_WORDS.easy
            }));
            setState(prev => ({ ...prev, message: 'Failed to load word list. Using default words.' }));
          }
        }
      }
    };

    loadWordList();
    
    return () => {
      abortController.abort();
    };
  }, []);

  // Memoized components
  const MemoizedProgress = React.memo(BeeProgress);
  const MemoizedTimer = React.memo(CircularTimer);
  const MemoizedButton = React.memo(Button);
  const MemoizedHintPanel = React.memo(HintPanel);

  // Optimized game loop
  const gameLoop = useCallback(() => {
    if (!gameStarted) return;
    requestAnimationFrame(() => {
      // updateGameState();
      gameLoop();
    });
  }, [gameStarted]);

  const handleLetter = useCallback((letter: string) => {
    typeLetter(letter);
  }, [typeLetter]);

  // WordLetter component for displaying letters
  const WordLetter = ({ letter, revealed }: { letter: string; revealed: boolean }) => (
    <span className={`letter ${revealed ? 'revealed' : 'hidden'}`}>
      {revealed ? letter : '_'}
    </span>
  );

  const { playGameMusic } = useContext(AudioContext);
  
  useEffect(() => {
    playGameMusic('Funk'); // Default to Funk genre
  }, []);

  return (
    <div className="game-screen">
      <header className="flex items-center justify-between p-4 bg-primary text-on-primary">
        <BeeElement variant="flying" size="medium" className="mr-2" />
        <h1 className="text-2xl font-bold">Spelling Bee</h1>
        <BeeElement size="medium" className="ml-2" />
      </header>
      <div className="game-area bg-surface-container p-6 rounded-lg">
        <div className="absolute top-1/4 left-4 opacity-30">
          <BeeElement size="small" />
        </div>
        <div className="absolute bottom-1/4 right-4 opacity-30">
          <BeeElement variant="flying" size="small" />
        </div>
        <div className="game-header">
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
                value={currentParticipant?.score && currentParticipant?.maxScore 
                  ? Math.round((currentParticipant.score / currentParticipant.maxScore) * 100)
                  : 0}
                className="text-secondary"
                size="md"
              />
              <span className="label-small text-on-surface-variant mt-1">Score</span>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between label-medium text-on-surface">
                <span>Words: {currentParticipantIndex}/{totalWords}</span>
                <span>{currentParticipantIndex && totalWords 
                  ? Math.round((currentParticipantIndex / totalWords) * 100)
                  : 0}%</span>
              </div>
              <BeeProgress 
                value={currentParticipantIndex && totalWords 
                  ? Math.round((currentParticipantIndex / totalWords) * 100)
                  : 0}
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
        </div>

        <div className="word-area">
          <div className="p-6 bg-surface-container-high rounded-xl shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <h2 className="headline-small text-on-surface">Current Word</h2>
              
              {state.showDefinition && currentParticipant?.currentWord && (
                <div className="flex gap-2">
                  {currentParticipant.currentWord.word.split('').map((letter, index) => (
                    <WordLetter 
                      key={index}
                      letter={letter}
                      revealed={revealedIndices.has(index)}
                    />
                  ))}
                </div>
              )}
              
              {currentParticipant?.currentWord && (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="label-medium text-on-surface-variant">
                      Difficulty: {currentParticipant.currentWord.difficulty}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="label-medium text-on-surface-variant">
                        {currentParticipant.currentWord.difficulty === 'easy' ? 'Simple' :
                         currentParticipant.currentWord.difficulty === 'medium' ? 'Medium' : 'Challenging'}
                      </span>
                      <div className="w-24">
                        <BeeProgress 
                          value={currentParticipant.currentWord.difficulty === 'easy' ? 33 : 
                                currentParticipant.currentWord.difficulty === 'medium' ? 66 : 100}
                          variant={currentParticipant.currentWord.difficulty === 'easy' ? 'success' :
                                  currentParticipant.currentWord.difficulty === 'medium' ? 'warning' : 'danger'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <MemoizedHintPanel 
            word={currentParticipant?.currentWord}
            onRevealLetter={handleRevealLetter}
            onShowDefinition={() => handleShowDefinition(currentParticipant?.currentWord?.word || '')}
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
              onLetter={handleLetter}
              onBackspace={() => setLetters(letters.slice(0, -1))}
              onSubmit={handleSpellingSubmit}
              soundEnabled={false}
              usedLetters={usedLetters}
              currentWord={currentParticipant?.currentWord?.word || ''}
              aria-label="Spelling keyboard"
            />
            
            <div className="flex gap-4">
              <MemoizedButton 
                variant="filled"
                onClick={handleSpellingSubmit}
                disabled={letters.length === 0}
                className="bg-primary-container text-on-primary-container px-4 py-2 rounded-full flex-1"
                aria-label="Submit spelling"
                aria-disabled={letters.length === 0}
              >
                Submit
              </MemoizedButton>
              
              <MemoizedButton 
                variant="outlined" 
                onClick={() => setLetters([])}
                disabled={letters.length === 0}
                aria-label="Clear letters"
                aria-disabled={letters.length === 0}
              >
                Clear
              </MemoizedButton>
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
