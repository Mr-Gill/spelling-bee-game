import React, { useEffect, useState } from 'react';
import { Word } from './types';
import OnScreenKeyboard from './components/OnScreenKeyboard';
import HintPanel from './components/HintPanel';
import { speak } from './utils/tts';

interface PracticeScreenProps {
  words: Word[];
  onBack: () => void;
  soundEnabled?: boolean;
}

const PracticeScreen: React.FC<PracticeScreenProps> = ({ words, onBack, soundEnabled = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  const currentWord = words[currentIndex];

  useEffect(() => {
    if (currentWord) {
      setLetters(Array(currentWord.word.length).fill(''));
      speak(currentWord.word);
    }
  }, [currentWord]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentWord) return;
      if (/^[a-zA-Z]$/.test(e.key)) {
        typeLetter(e.key.toLowerCase());
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter') {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [letters, currentWord]);

  const typeLetter = (letter: string) => {
    setLetters(prev => {
      const index = prev.findIndex(l => l === '');
      if (index === -1) return prev;
      const updated = [...prev];
      updated[index] = letter;
      return updated;
    });
  };

  const handleBackspace = () => {
    setLetters(prev => {
      const index = prev.slice().reverse().findIndex(l => l !== '');
      if (index === -1) return prev;
      const updated = [...prev];
      updated[prev.length - 1 - index] = '';
      return updated;
    });
  };

  const handleSubmit = () => {
    if (!currentWord) return;
    const attempt = letters.join('').toLowerCase();
    if (attempt === currentWord.word.toLowerCase()) {
      setFeedback('Correct!');
      setTimeout(() => {
        setFeedback('');
        setCurrentIndex(i => i + 1);
      }, 1000);
    } else {
      setFeedback('Try again!');
    }
  };

  if (!currentWord) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-6">All words practiced!</h1>
        <button onClick={onBack} className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg text-2xl font-bold">🔙 Back to Results</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-6">Practice Missed Words</h1>
      <div className="text-3xl font-mono mb-4">{letters.map(l => l || '_').join(' ')}</div>
      <HintPanel
        word={currentWord}
        participantPoints={999}
        participantIndex={0}
        spendPoints={() => {}}
        isTeamMode={false}
        showWord={true}
        onHintUsed={() => {}}
        onExtraAttempt={() => {}}
      />
      <OnScreenKeyboard
        onLetter={typeLetter}
        onBackspace={handleBackspace}
        onSubmit={handleSubmit}
        soundEnabled={soundEnabled}
      />
      {feedback && (
        <div className={`mt-4 text-2xl ${feedback === 'Correct!' ? 'text-green-400' : 'text-red-400'}`}>{feedback}</div>
      )}
      <button onClick={onBack} className="mt-8 bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg text-2xl font-bold">⬅️ Back</button>
    </div>
  );
};

export default PracticeScreen;
