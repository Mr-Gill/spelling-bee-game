import React from 'react';
import type { Word } from './types';
import { speak } from './utils/tts';
import { rescheduleReviewWord } from './utils/reviewQueue';

interface PracticeScreenProps {
  words: Word[];
  onBack: () => void;
  reviewWords?: Word[];
}

const pickWord = (words: Word[], previousWord?: string) => {
  if (words.length === 0) return null;
  if (words.length === 1) return words[0];

  let next = words[Math.floor(Math.random() * words.length)];
  while (next.word === previousWord) {
    next = words[Math.floor(Math.random() * words.length)];
  }
  return next;
};

const PracticeScreen: React.FC<PracticeScreenProps> = ({ words, onBack, reviewWords = [] }) => {
  const practiceWords = React.useMemo(() => {
    const seen = new Set<string>();
    return [...reviewWords, ...words].filter(word => {
      const key = word.word.trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [reviewWords, words]);

  const [currentWord, setCurrentWord] = React.useState<Word | null>(() => pickWord(practiceWords));
  const [answer, setAnswer] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [correctCount, setCorrectCount] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const moveToNextWord = React.useCallback(() => {
    setCurrentWord(previous => pickWord(practiceWords, previous?.word));
    setAnswer('');
    setFeedback('');
    inputRef.current?.focus();
  }, [practiceWords]);

  React.useEffect(() => {
    setCurrentWord(pickWord(practiceWords));
  }, [practiceWords]);

  React.useEffect(() => {
    if (currentWord) speak(currentWord.word);
  }, [currentWord]);

  const checkAnswer = (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentWord) return;

    if (answer.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      rescheduleReviewWord(currentWord, true);
      setCorrectCount(count => count + 1);
      setFeedback('Correct. Nice warm-up.');
      window.setTimeout(moveToNextWord, 700);
      return;
    }

    rescheduleReviewWord(currentWord, false);
    setFeedback('Not quite. Listen again and have another go.');
    speak(currentWord.word);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-sky-800 to-indigo-900 p-6 text-white font-body">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-4xl flex-col items-center justify-center text-center">
        <div className="mb-8 w-full rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-yellow-200">Practice Mode</p>
          <h1 className="mb-4 text-4xl font-black md:text-6xl">Warm-Up Practice</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/90">
            Quick low-pressure spelling before the main game. Missed words appear first when they are due.
          </p>
        </div>

        {currentWord ? (
          <form onSubmit={checkAnswer} className="w-full max-w-2xl rounded-3xl border border-white/20 bg-black/30 p-6 shadow-2xl">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => speak(currentWord.word)}
                className="rounded-2xl bg-yellow-300 px-6 py-3 text-lg font-black text-black transition hover:bg-yellow-400"
              >
                Hear Word
              </button>
              <button
                type="button"
                onClick={moveToNextWord}
                className="rounded-2xl bg-white/90 px-6 py-3 text-lg font-black text-black transition hover:bg-white"
              >
                Try Another
              </button>
            </div>

            {currentWord.definition && (
              <p className="mb-5 rounded-2xl bg-white/10 p-4 text-left text-white/90">
                <span className="font-bold text-yellow-200">Meaning:</span> {currentWord.definition}
              </p>
            )}

            <label htmlFor="warmup-answer" className="mb-2 block text-left text-lg font-bold">
              Spell the word
            </label>
            <input
              id="warmup-answer"
              ref={inputRef}
              value={answer}
              onChange={event => setAnswer(event.target.value)}
              autoFocus
              autoComplete="off"
              className="mb-4 w-full rounded-2xl border-4 border-white/30 bg-white px-5 py-4 text-2xl font-bold text-gray-900"
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-emerald-400 px-6 py-4 text-2xl font-black text-black transition hover:bg-emerald-300"
            >
              Check
            </button>

            {feedback && (
              <p className="mt-5 text-xl font-bold text-yellow-200" role="status">
                {feedback}
              </p>
            )}
          </form>
        ) : (
          <div className="w-full max-w-2xl rounded-3xl border border-white/20 bg-black/30 p-6 shadow-2xl">
            <p className="text-xl font-bold">Words are still loading. Head back and try again in a moment.</p>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <div className="rounded-2xl bg-white/10 px-5 py-3 font-bold">
            Correct in warm-up: {correctCount}
          </div>
          <button
            type="button"
            onClick={onBack}
            className="rounded-2xl bg-white px-6 py-3 text-lg font-black text-gray-900 transition hover:bg-yellow-100"
          >
            Back to Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeScreen;
