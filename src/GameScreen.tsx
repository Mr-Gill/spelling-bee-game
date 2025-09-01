import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHelpSystem } from './contexts/HelpSystemContext';
import { HelpSystemProvider } from './contexts/HelpSystemContext';
import { 
  Word, 
  Participant, 
  Team 
} from '../types';
import { 
  GameScreenProps, 
  GameScreenState, 
  GameResults 
} from './gameTypes';

// Audio
import correctSoundFile from "../audio/correct.mp3";
import wrongSoundFile from "../audio/wrong.mp3";
import letterCorrectSoundFile from "../audio/letter-correct.mp3";
import letterWrongSoundFile from "../audio/letter-wrong.mp3";

// Components
import CircularTimer from './components/CircularTimer';
import OnScreenKeyboard from './components/OnScreenKeyboard';
import HintPanel from './components/HintPanel';
import { HelpShop } from './components/HelpShop'; // Fix HelpShop import
import Button from './components/Button'; // Import Button component
// Progress components
import { CircularProgress, LinearProgress } from './components/BeeProgress';

// Icons
import { Award } from 'lucide-react';

// Constants
const MAX_SKIP_TURNS = 3;
const MAX_ASK_FRIEND = 1;
const initialTime = 60;

// Types
interface Feedback {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface GameScreenProps {
  config: GameConfig & { publicUrl?: string; words: Word[]; wordDatabase: WordDatabase };
  onEndGame: (results: GameResults) => void;
}

interface GameScreenState {
  participants: (Participant & {
    score: number;
    maxScore: number;
  })[];
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
  totalWords: number;
  gameProgress: number;
  timeLeft: number;
  musicConfirmed: boolean;
}

// Main GameScreen component
export const GameScreen: React.FC<GameScreenProps> = ({ config, onEndGame }) => {
  const isTeamMode = config?.gameMode === 'team';
  const handleNextWord = useCallback(() => {
    setState(prev => {
      const nextIndex = (prev.currentParticipantIndex + 1) % prev.participants.length;
      return {
        ...prev,
        currentParticipantIndex: nextIndex,
        currentWordIndex: prev.currentWordIndex + 1,
        revealedIndices: new Set<number>(),
        showDefinition: false,
        feedback: null,
        usedLetters: new Set<string>()
      };
    });
  }, []);

  const [state, setState] = useState<GameScreenState>({
    participants: (config?.participants as Participant[]).map(p => ({
      ...p,
      attempted: 0,
      correct: 0,
      wordsAttempted: 0,
      wordsCorrect: 0,
      skipsRemaining: MAX_SKIP_TURNS,
      askFriendRemaining: MAX_ASK_FRIEND,
      achievements: [],
      points: 0,
      teamId: isTeamMode ? (p as Team).teamId : `p-${Date.now()}`,
      avatar: 'bee' as const,
      score: 0,
      maxScore: 100 // Base max score, will be updated
    })),
    currentParticipantIndex: 0,
    currentWordIndex: 0,
    showShop: false,
    coins: 100,
    revealedIndices: new Set<number>(),
    showDefinition: false,
    currentHelp: null,
    feedback: null,
    usedHint: false,
    showWord: true,
    isHelpOpen: false,
    letters: [],
    usedLetters: new Set<string>(),
    wordQueues: {
      easy: [],
      medium: [],
      hard: []
    },
    extraAttempt: false,
    attemptedParticipants: new Set<number>(),
    missedWords: [],
    totalWords: 0,
    gameProgress: 0,
    timeLeft: initialTime,
    musicConfirmed: false
  });

  const { 
    revealLetter: revealLetterHelp, 
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
      setState(prev => ({ ...prev, totalWords: words.length }));
      
      // Update participants' max score
      setState(prev => ({
        ...prev,
        participants: prev.participants.map(p => ({
          ...p,
          maxScore: words.length * 10 // 10 points per word
        }))
      }));
    }
  }, [config?.wordDatabase]);

  useEffect(() => {
    const gameProgress = state.totalWords > 0 
      ? Math.min(100, Math.round((state.currentWordIndex / state.totalWords) * 100))
      : 0;
    setState(prev => ({ ...prev, gameProgress }));
  }, [state.currentWordIndex, state.totalWords]);

  const handleShowDefinition = useCallback(async (word: string) => {
    setState(prev => ({ ...prev, showDefinition: true }));
    try {
      const definition = await getDefinitionHelp(word);
      setHelpUsed('hint-definition');
      setState(prev => ({
        ...prev,
        currentHelp: `Definition: ${definition}`,
        feedback: { message: 'Definition shown', type: 'info' }
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        feedback: { message: 'Failed to load definition', type: 'error' }
      }));
    }
  }, [getDefinitionHelp, setHelpUsed]);

  const handleAddTimeHelp = useCallback(() => {
    addTimeHelp(30);
    setHelpUsed('extra-time');
    setState(prev => ({
      ...prev,
      currentHelp: 'Added 30 seconds to the timer!',
      feedback: { message: 'Added 30 seconds to the timer!', type: 'success' }
    }));
  }, [addTimeHelp, setHelpUsed]);

  const handleSkipWordHelp = useCallback(() => {
    skipWordHelp();
    setHelpUsed('skip-word');
    setState(prev => ({
      ...prev,
      currentHelp: 'Skipped to the next word!',
      feedback: { message: 'Skipped to the next word!', type: 'info' }
    }));
    handleNextWord();
  }, [skipWordHelp, setHelpUsed, handleNextWord]);

  // Sound effects function
  const playSound = useCallback((soundFile: string) => {
    const audio = new Audio(soundFile);
    audio.volume = 0.3;
    audio.play().catch(e => console.error("Audio playback failed:", e));
  }, []);

  const currentWord = config?.words[state.currentWordIndex];
  const currentParticipant = state.participants[state.currentParticipantIndex];

  const handleSpellingSubmit = useCallback(() => {
    if (!currentWord) return;

    const submittedWord = state.letters.join('');
    const isCorrect = submittedWord.toLowerCase() === currentWord.word.toLowerCase();
    
    // Calculate time bonus (max 5 points for quick answers)
    const timeLeftPercentage = state.timeLeft / 60;
    const timeBonus = Math.floor(timeLeftPercentage * 5);

    // Play sound based on correctness
    playSound(isCorrect ? correctSoundFile : wrongSoundFile);

    setState(prev => {
      const updatedParticipants = [...prev.participants];
      const currentParticipant = updatedParticipants[prev.currentParticipantIndex];
      
      currentParticipant.attempted += 1;
      currentParticipant.wordsAttempted += 1;
      
      if (isCorrect) {
        currentParticipant.correct += 1;
        currentParticipant.wordsCorrect += 1;
        currentParticipant.score += 10 + timeBonus;
        currentParticipant.points += 5 + timeBonus;
        
        return {
          ...prev,
          participants: updatedParticipants,
          coins: prev.coins + 5 + timeBonus,
          feedback: { message: `Correct! +${timeBonus} time bonus`, type: 'success' },
          attemptedParticipants: new Set<number>()
        };
      } else {
        return {
          ...prev,
          participants: updatedParticipants,
          feedback: { message: 'Try again!', type: 'error' },
          attemptedParticipants: new Set([...prev.attemptedParticipants, prev.currentParticipantIndex])
        };
      }
    });

    if (isCorrect) {
      setTimeout(handleNextWord, 1500);
    }
  }, [currentWord, state.letters, state.timeLeft, handleNextWord, playSound]);

  const typeLetter = useCallback((letter: string) => {
    if (!currentWord || !currentWord.word) return;
    
    const currentLetter = currentWord.word[state.letters.length].toLowerCase();
    playSound(currentLetter === letter.toLowerCase() ? letterCorrectSoundFile : letterWrongSoundFile);
    
    setState(prev => ({
      ...prev,
      letters: [...prev.letters, letter],
      usedLetters: new Set([...prev.usedLetters, letter.toLowerCase()])
    }));
  }, [currentWord, state.letters.length, state.usedLetters, playSound]);

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
    
    if (state.currentHelp) {
      const timer = setTimeout(() => 
        setState(prev => ({ ...prev, currentHelp: null })), 3000);
      timers.push(timer);
    }
    
    if (state.feedback) {
      const timer = setTimeout(() => 
        setState(prev => ({ ...prev, feedback: null })), 3000);
      timers.push(timer);
    }
    
    return () => timers.forEach(clearTimeout);
  }, [state.currentHelp, state.feedback]);

  const loadWordList = async () => {
    try {
      // Try to load the bundled word list
      const response = await fetch('./wordlists/example.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const words = await response.json();
      setState(prev => ({ ...prev, wordQueues: { ...prev.wordQueues, easy: words } }));
    } catch (error) {
      console.error('Failed to load bundled word list', error);
      // Fallback to default words
      setState(prev => ({ ...prev, wordQueues: { ...prev.wordQueues, easy: [] } }));
    }
  };

  useEffect(() => {
    loadWordList();
  }, []);

  return (
    <div className="game-screen">
      <div className="game-area">
        <header className="game-header">
          <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl">
            <div className="flex flex-col items-center">
              <CircularProgress 
                value={state.gameProgress}
                className="text-primary"
                size="lg"
              />
              <span className="label-small text-on-surface-variant mt-1">Game Progress</span>
            </div>
            
            <div className="flex flex-col items-center">
              <CircularProgress 
                value={Math.round((currentParticipant.score / currentParticipant.maxScore) * 100)}
                className="text-secondary"
                size="md"
              />
              <span className="label-small text-on-surface-variant mt-1">Score</span>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between label-medium text-on-surface">
                <span>Words: {state.currentWordIndex}/{state.totalWords}</span>
                <span>{Math.round((state.currentWordIndex / state.totalWords) * 100)}%</span>
              </div>
              <LinearProgress 
                value={Math.round((state.currentWordIndex / state.totalWords) * 100)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="timer-container">
            <CircularTimer 
              timeLeft={state.timeLeft}
              total={initialTime}
            />
          </div>
          <div className="coins-display">
            {state.musicConfirmed && (
              <img 
                src={`${process.env.PUBLIC_URL}/img/${
                  state.timeLeft < 15 ? 'TimePressureBee' : 
                  state.letters.length > 0 ? 'TypingBee' : 
                  'DefaultBee'
                }.svg`} 
                alt="Bee avatar"
                className={!state.musicConfirmed ? 'hidden' : ''}
                onError={(e) => e.currentTarget.src = `${process.env.PUBLIC_URL}/img/DefaultBee.svg`}
              />
            )}
            {state.coins}
          </div>
        </header>

        <div className="word-area">
          <div className="p-6 bg-surface-container-high rounded-xl shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <h2 className="headline-small text-on-surface">Current Word</h2>
              
              {state.showWord && currentWord && currentWord.word && (
                <div className="flex gap-2">
                  {currentWord.word.split('').map((letter, index) => (
                    <div 
                      key={index}
                      className={classNames(
                        'w-12 h-16 flex items-center justify-center rounded-md',
                        'text-headline-medium font-medium',
                        state.revealedIndices.has(index) 
                          ? 'bg-primary-container text-on-primary-container'
                          : 'bg-surface-container-highest text-on-surface-variant'
                      )}
                    >
                      {state.revealedIndices.has(index) ? letter : '?'}
                    </div>
                  ))}
                </div>
              )}
              
              {currentWord && currentWord.word && (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="label-medium text-on-surface-variant">
                      Difficulty: {currentWord.difficulty}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="label-medium text-on-surface-variant">
                        {currentWord.difficulty === 'easy' ? 'Simple' :
                         currentWord.difficulty === 'medium' ? 'Medium' : 'Challenging'}
                      </span>
                      <div className="w-24">
                        <LinearProgress 
                          value={currentWord.difficulty === 'easy' ? 33 : 
                                currentWord.difficulty === 'medium' ? 66 : 100}
                          variant={currentWord.difficulty === 'easy' ? 'success' :
                                  currentWord.difficulty === 'medium' ? 'warning' : 'danger'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <HintPanel 
            word={currentWord?.word || ''}
            onRevealLetter={() => handleRevealLetter(
              currentWord?.word || '',
              state.revealedIndices
            )}
            onShowDefinition={() => handleShowDefinition(currentWord?.word || '')}
            onAddTime={handleAddTimeHelp}
            onSkipWord={handleSkipWordHelp}
            isHelpUsed={isHelpUsed}
            coins={state.coins}
          />

          {state.feedback && (
            <div className={`feedback ${state.feedback.type}`}>
              {state.feedback.message}
            </div>
          )}

          {state.currentHelp && (
            <div className="help-message">
              {state.currentHelp}
            </div>
          )}
          <div className="space-y-4">
            <OnScreenKeyboard 
              onLetter={typeLetter}
              onBackspace={() => setState(prev => ({...prev, letters: prev.letters.slice(0, -1)}))}
              onSubmit={handleSpellingSubmit}
              soundEnabled={true}
              usedLetters={state.usedLetters}
              currentWord={currentWord?.word}
              className="bg-surface-container-high p-4 rounded-xl"
            />
            
            <div className="flex gap-4">
              <Button 
                variant="filled"
                onClick={handleSpellingSubmit}
                disabled={state.letters.length === 0}
                className="flex-1"
              >
                Submit
              </Button>
              
              <Button 
                variant="outlined" 
                onClick={() => setState(prev => ({...prev, letters: []}))}
                disabled={state.letters.length === 0}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        {state.showShop && (
          <HelpShop 
            onClose={() => setState(prev => ({ ...prev, showShop: false }))}
            coins={state.coins}
            onPurchase={(cost) => setState(prev => ({ ...prev, coins: prev.coins - cost }))}
          />
        )}
      </div>
    </div>
  );
};

// Wrap with HelpSystemProvider
export const GameScreenWithProvider: React.FC<GameScreenProps> = (props) => {
  return (
    <HelpSystemProvider>
      <GameScreen {...props} />
    </HelpSystemProvider>
  );
};

export default GameScreenWithProvider;
