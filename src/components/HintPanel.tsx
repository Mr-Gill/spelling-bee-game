import React, { useEffect, useState } from 'react';
import { Word } from '../types';
import { speak } from '../utils/tts';

interface HintPanelProps {
  word: Word | null;
  participantPoints: number;
  participantIndex: number;
  spendPoints: (participantIndex: number, cost: number) => void;
  isTeamMode: boolean;
  showWord: boolean;
  onHintUsed: () => void;
  onExtraAttempt: () => void;
}

const HintPanel: React.FC<HintPanelProps> = ({
  word,
  participantPoints,
  participantIndex,
  spendPoints,
  isTeamMode,
  showWord,
  onHintUsed,
  onExtraAttempt
}) => {
  if (!word) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              No word selected. Please wait for the next word.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const safeAccess = (obj: any, path: string, fallback = 'N/A') => {
    return path.split('.').reduce((acc, part) => (acc && acc[part] ? acc[part] : fallback), obj);
  };

  const definition = safeAccess(word, 'definition', '');
  const origin = safeAccess(word, 'origin', '');
  const example = safeAccess(word, 'example', '');
  const prefix = safeAccess(word, 'prefix', '');
  const suffix = safeAccess(word, 'suffix', '');

  const [showHint, setShowHint] = useState(false);
  const [showDefinition, setShowDefinition] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);
  const [showSentence, setShowSentence] = useState(false);
  const [showPrefix, setShowPrefix] = useState(false);
  const [showSuffix, setShowSuffix] = useState(false);
  const [revealedLetters, setRevealedLetters] = useState<boolean[]>([]);
  const [revealedSyllables, setRevealedSyllables] = useState<boolean[]>([]);

  useEffect(() => {
    setRevealedLetters(Array(word.word.length).fill(false));
    setRevealedSyllables(Array(word.syllables?.length || 0).fill(false));
    setShowHint(false);
    setShowDefinition(false);
    setShowOrigin(false);
    setShowSentence(false);
    setShowPrefix(false);
    setShowSuffix(false);
  }, [word]);

  const handleRevealSyllable = (idx: number) => {
    const cost = 2;
    if (participantPoints < cost) return;
    spendPoints(participantIndex, cost);
    onHintUsed();
    setRevealedSyllables(prev => {
      const updated = [...prev];
      updated[idx] = true;
      return updated;
    });
  };

  const handleHangmanReveal = () => {
    const cost = 3;
    if (participantPoints < cost) return;
    spendPoints(participantIndex, cost);
    onHintUsed();
    const unrevealed = revealedLetters
      .map((r, i) => (!r ? i : null))
      .filter(i => i !== null) as number[];
    if (unrevealed.length === 0) return;
    const randomIndex = unrevealed[Math.floor(Math.random() * unrevealed.length)];
    setRevealedLetters(prev => {
      const updated = [...prev];
      updated[randomIndex] = true;
      return updated;
    });
  };

  const handleVowelReveal = () => {
    const cost = 4;
    if (participantPoints < cost) return;
    spendPoints(participantIndex, cost);
    onHintUsed();
    setRevealedLetters(word.word.split('').map((l, idx) => revealedLetters[idx] || 'aeiou'.includes(l.toLowerCase())));
  };

  const handleFriendSubstitution = () => {
    const cost = 4;
    if (participantPoints < cost) return;
    spendPoints(participantIndex, cost);
    onHintUsed();
    // Friend substitution could add time or give some other benefit
  };

  const handlePrefixReveal = () => {
    const cost = 3;
    if (participantPoints < cost || !prefix) return;
    spendPoints(participantIndex, cost);
    onHintUsed();
    setShowPrefix(true);
  };

  const handleSuffixReveal = () => {
    const cost = 3;
    if (participantPoints < cost || !suffix) return;
    spendPoints(participantIndex, cost);
    onHintUsed();
    setShowSuffix(true);
  };

  const handleSecondChance = () => {
    const cost = 3;
    if (participantPoints < cost) return;
    spendPoints(participantIndex, cost);
    onHintUsed();
    onExtraAttempt();
  };

  const syllableCount = word?.syllables?.length || 0;

  return (
    <div className="bg-white/10 p-6 rounded-lg mb-8">
      {revealedLetters.some(r => r) && (
        <p className="text-3xl font-mono mb-4">
          {word.word
            .split('')
            .map((letter, idx) => (revealedLetters[idx] ? letter : '_'))
            .join(' ')}
        </p>
      )}
      {showDefinition && (
        <p className="text-2xl mb-2">
          <strong className="text-yellow-300">Definition:</strong> {definition || 'Definition not available'}
        </p>
      )}
      <button
        onClick={() => {
          setShowHint(!showHint);
          if (!showHint) {
            spendPoints(participantIndex, 1);
            onHintUsed();
          }
        }}
        className="mt-4 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>
      {showHint && (
        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {word.syllables?.map((syllable, idx) => (
              <button
                key={idx}
                onClick={() => speak(syllable)}
                disabled={!revealedSyllables[idx]}
                className="bg-yellow-100 text-black px-2 py-1 rounded disabled:opacity-50"
              >
                {revealedSyllables[idx] ? syllable : '???'}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {word.syllables?.map((_, idx) =>
              !revealedSyllables[idx] && (
                <button
                  key={`reveal-${idx}`}
                  onClick={() => handleRevealSyllable(idx)}
                  disabled={participantPoints < 2}
                  className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
                >
                  {`Reveal syllable ${idx + 1} (-2)`}
                </button>
              )
            )}
          </div>
        </div>
      )}
      {showOrigin && (
        <p className="text-xl mb-2">
          <strong className="text-yellow-300">Origin:</strong> {origin || 'Origin not available'}
        </p>
      )}
      {showSentence && (
        <p className="text-xl">
          <strong className="text-yellow-300">Example:</strong> "{example || 'Example not available'}"
        </p>
      )}
      {showPrefix && (
        <p className="text-xl mb-2">
          <strong className="text-yellow-300">Prefix:</strong> {prefix || 'Prefix not available'}
        </p>
      )}
      {showSuffix && (
        <p className="text-xl mb-2">
          <strong className="text-yellow-300">Suffix:</strong> {suffix || 'Suffix not available'}
        </p>
      )}
      <div className="mt-4 flex gap-4 justify-center">
        {!showDefinition && (
          <button
            onClick={() => {
              if (participantPoints < 1) return;
              spendPoints(participantIndex, 1); onHintUsed();
              setShowDefinition(true);
            }}
            disabled={participantPoints < 1}
            className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            Buy Definition (-1)
          </button>
        )}
        {!showOrigin && (
          <button
            onClick={() => {
              if (participantPoints < 1) return;
              spendPoints(participantIndex, 1); onHintUsed();
              setShowOrigin(true);
            }}
            disabled={participantPoints < 1}
            className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            Buy Origin (-1)
          </button>
        )}
        {!showSentence && (
          <button
            onClick={() => {
              if (participantPoints < 2) return;
              spendPoints(participantIndex, 1); onHintUsed();
              setShowSentence(true);
            }}
            disabled={participantPoints < 2}
            className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            Buy Sentence (-2)
          </button>
        )}
      </div>
      <div className="mt-4 flex gap-4 justify-center">
        {!showPrefix && prefix && (
          <button
            onClick={handlePrefixReveal}
            disabled={participantPoints < 3}
            className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            Reveal Prefix (-3)
          </button>
        )}
        {!showSuffix && suffix && (
          <button
            onClick={handleSuffixReveal}
            disabled={participantPoints < 3}
            className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            Reveal Suffix (-3)
          </button>
        )}
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={handleHangmanReveal}
          disabled={participantPoints < 3}
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded-lg"
        >
          Hangman Reveal (-3)
        </button>
        <button
          onClick={handleVowelReveal}
          disabled={participantPoints < 3}
          className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 px-4 py-2 rounded-lg"
        >
          Vowel Reveal (-3)
        </button>
        <button
          onClick={handleFriendSubstitution}
          disabled={participantPoints < 4}
          className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 px-4 py-2 rounded-lg"
        >
          Friend Sub (-4)
        </button>
        {onGrantExtraAttempt && (
          <button
            onClick={handleSecondChance}
            disabled={participantPoints < 3}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 px-4 py-2 rounded-lg"
          >
            Second Chance (-3)
          </button>
        )}
      </div>
      {word && (
        <>
          <div className="hint-section mt-4 text-center">
            <h3 className="text-lg font-bold text-yellow-300">Syllables</h3>
            {showHint ? (
              <p className="text-2xl">{syllableCount}</p>
            ) : (
              <button
                onClick={() => {
                  if (participantPoints < 2) return;
                  spendPoints(participantIndex, 2);
                  onHintUsed();
                  setShowHint(true);
                }}
                disabled={participantPoints < 2}
                className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50 mt-2"
              >
                Show Syllable Count (-2)
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HintPanel;
