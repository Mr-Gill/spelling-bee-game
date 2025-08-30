import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHelpSystem } from './contexts/HelpSystemContext';
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

// Components
import CircularTimer from './components/CircularTimer';
import OnScreenKeyboard from './components/OnScreenKeyboard';
import HintPanel from './components/HintPanel';
// Progress components
import { ProgressBar, CircularProgress } from './components/BeeProgress';

// Icons
import { Volume2, VolumeX, Award } from 'lucide-react';

// Constants
const MAX_SKIP_TURNS = 3;
const MAX_ASK_FRIEND = 1;

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
}

// Main GameScreen component
export const GameScreen: React.FC<GameScreenProps> = ({ config, onEndGame }) => {
  const isTeamMode = config.gameMode === 'team';
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
    participants: (config.participants as Participant[]).map(p => ({
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
    gameProgress: 0
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
    if (config.wordDatabase) {
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
  }, [config.wordDatabase]);

  useEffect(() => {
    const gameProgress = state.totalWords > 0 
      ? Math.min(100, Math.round((state.currentWordIndex / state.totalWords) * 100))
      : 0;
    setState(prev => ({ ...prev, gameProgress }));
  }, [state.currentWordIndex, state.totalWords]);

  // Handle next word logic
  const handleNextWord = useCallback(() => {
    setState(prev => {
      const nextWordIndex = prev.currentWordIndex + 1;
      const nextParticipantIndex = (prev.currentParticipantIndex + 1) % prev.participants.length;
      
      if (nextWordIndex >= (config.words?.length || 0)) {
        onEndGame({
          participants: prev.participants as Participant[],
          wordsAttempted: nextWordIndex,
          wordsCorrect: prev.participants.reduce((sum, p) => sum + (p as any).correct, 0),
          timeElapsed: 0,
          date: new Date().toISOString(),
        });
        return prev;
      }

      return {
        ...prev,
        currentWordIndex: nextWordIndex,
        currentParticipantIndex: nextParticipantIndex,
        revealedIndices: new Set<number>(),
        showDefinition: false,
        currentHelp: null,
        usedHint: false,
        letters: [],
        usedLetters: new Set<string>(),
        attemptedParticipants: new Set<number>()
      };
    });
  }, [config.words, onEndGame]);

  // Help system handlers
  const handleRevealLetter = useCallback((word: string, indices: Set<number>) => {
    const result = revealLetterHelp(word, indices);
    if (result) {
      setState(prev => ({
        ...prev,
        revealedIndices: new Set([...prev.revealedIndices, result.index]),
        currentHelp: `Revealed letter: ${result.letter}`,
        feedback: { message: `Revealed letter: ${result.letter}`, type: 'info' }
      }));
      setHelpUsed('hint-letter');
    }
    return result;
  }, [revealLetterHelp, setHelpUsed]);

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

  const currentWord = config.words[state.currentWordIndex];
  const currentParticipant = state.participants[state.currentParticipantIndex];

  return (
    <div className="game-screen">
      <div className="game-area">
        <header className="game-header">
          <div className="timer-container">
            <CircularTimer 
              ref={timerRef}
              initialTime={60}
              onComplete={handleNextWord}
            />
          </div>
          <div className="coins-display">
            Coins: {state.coins}
          </div>
        </header>

        <div className="word-area">
          {state.showWord && currentWord && (
            <div className="current-word">
              {currentWord.word.split('').map((letter, index) => (
                <span 
                  key={index} 
                  className={`letter ${state.revealedIndices.has(index) ? 'revealed' : ''}`}
                >
                  {state.revealedIndices.has(index) ? letter : '_'}
                </span>
              ))}
            </div>
          )}

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
        </div>

        <OnScreenKeyboard 
          onKeyPress={(key: string) => {
            // Handle key press
            console.log('Key pressed:', key);
          }}
          usedLetters={state.usedLetters}
        />
      </div>

      {state.showShop && (
        <div className="shop-modal">
          <h2>Help Shop</h2>
          <button onClick={() => setState(prev => ({ ...prev, showShop: false }))}>
            Close
          </button>
        </div>
      )}
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
