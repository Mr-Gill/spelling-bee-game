import React, { useEffect, useState } from 'react';
import { Word } from './types';
import { speak } from './utils/tts';

interface PracticeScreenProps {
  words: Word[];
  onComplete: () => void;
}

const PracticeScreen: React.FC<PracticeScreenProps> = ({ words, onComplete }) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [seconds, setSeconds] = useState(0);

  // choose a new random word
  const nextWord = () => {
    if (words.length === 0) return;
    const w = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(w);
    setInput('');
    setFeedback('');
    speak(w.word);
  };

  // start timer and first word on mount
  useEffect(() => {
    nextWord();
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord) return;
    if (input.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      setFeedback('Great job!');
      setTimeout(nextWord, 1000);
    } else {
      setFeedback('Try again!');
    }
  };

  return (
    <div className="min-h-screen p-8 text-white text-center font-body">
      <h2 className="text-3xl font-bold mb-4">Warm-Up Practice</h2>
      <div className="text-xl mb-6">Time: {seconds}s</div>
      {currentWord && (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => speak(currentWord.word)}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            Hear Word
          </button>
          <input
            className="p-2 rounded-md bg-white/20 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <button type="submit" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
            Check
          </button>
          {feedback && <div>{feedback}</div>}
        </form>
      )}
      <button
        onClick={onComplete}
        className="bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl text-2xl font-bold"
      >
        I'm ready
      </button>
    </div>
  );
};

export default PracticeScreen;

