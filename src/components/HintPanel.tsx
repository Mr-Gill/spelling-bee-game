import React, { useEffect, useState } from 'react';
import { Word } from '../types';
import { speak } from '../utils/tts';

interface HintPanelProps {
  word: Word;
  participantPoints: number;
  participantIndex: number;
  spendPoints: (participantIndex: number, cost: number) => void;
  isTeamMode: boolean;
  showWord: boolean;
  onHintUsed: () => void;
  onExtraAttempt: () => void;
  powerUpHintTrigger?: number;
}

const HintPanel: React.FC<HintPanelProps> = ({
  word,
  participantPoints,
  participantIndex,
  spendPoints,
  isTeamMode,
  showWord,
  onHintUsed,
  onExtraAttempt,
  powerUpHintTrigger = 0,
}) => {
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
    setRevealedSyllables(Array(word.syllables.length).fill(false));
    setShowHint(false);
    setShowDefinition(false);
    setShowOrigin(false);
    setShowSentence(false);
    setShowPrefix(false);
    setShowSuffix(false);
  }, [word]);

  useEffect(() => {
    if (powerUpHintTrigger > 0) {
      const unrevealed = revealedLetters
        .map((r, i) => (!r ? i : null))
        .filter(i => i !== null) as number[];
      if (unrevealed.length > 0) {
        const randomIndex = unrevealed[Math.floor(Math.random() * unrevealed.length)];
        setRevealedLetters(prev => {
          const updated = [...prev];
          updated[randomIndex] = true;
          return updated;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [powerUpHintTrigger]);

  useEffect(() => {
    if (!showWord) {
      setRevealedSyllables(Array(word.syllables.length).fill(false));
    }
  }, [showWord, word.syllables.length]);

  const handleRevealSyllable = (idx: number) => {
    const cost = 3;
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
    const cost = 6;
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
    onExtraAttempt();
  };

  const handlePrefixReveal = () => {
    const cost = 3;
    if (participantPoints < cost || !word.prefix) return;
    spendPoints(participantIndex, cost);
    onHintUsed();
    setShowPrefix(true);
  };

  const handleSuffixReveal = () => {
    const cost = 3;
    if (participantPoints < cost || !word.suffix) return;
    spendPoints(participantIndex, cost);
    onHintUsed();
    setShowSuffix(true);
  };

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
          <strong className="text-yellow-300">Definition:</strong> {word.definition}
        </p>
      )}
      <button
        onClick={() => {
          setShowHint(!showHint);
          if (!showHint) onHintUsed();
        }}
        className="mt-4 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>
      {showHint && (
        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {word.syllables.map((syllable, idx) => (
              <button
                key={idx}
                onClick={() => speak(syllable)}
                disabled={!revealedSyllables[idx] || !showWord}
                className="bg-yellow-100 text-black px-2 py-1 rounded disabled:opacity-50"
              >
                {showWord && revealedSyllables[idx] ? syllable : '???'}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {word.syllables.map((_, idx) =>
              !revealedSyllables[idx] && (
                <button
                  key={`reveal-${idx}`}
                  onClick={() => handleRevealSyllable(idx)}
                  disabled={participantPoints < 3}
                  className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
                >
                  {`Reveal syllable ${idx + 1} (-3)`}
                </button>
              )
            )}
          </div>
        </div>
      )}
      {showOrigin && (
        <p className="text-xl mb-2">
          <strong className="text-yellow-300">Origin:</strong> {word.origin}
        </p>
      )}
      {showSentence && (
        <p className="text-xl">
          <strong className="text-yellow-300">Example:</strong> "{word.example}"
        </p>
      )}
      {showPrefix && showWord && word.prefix && (
        <p className="text-xl mb-2">
          <strong className="text-yellow-300">Prefix:</strong> {word.prefix}
        </p>
      )}
      {showSuffix && showWord && word.suffix && (
        <p className="text-xl mb-2">
          <strong className="text-yellow-300">Suffix:</strong> {word.suffix}
        </p>
      )}
      <div className="mt-4 flex gap-4 justify-center">
        {!showDefinition && (
          <button
            onClick={() => {
              if (participantPoints < 1) return;
              spendPoints(participantIndex, 1);
              onHintUsed();
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
              spendPoints(participantIndex, 1);
              onHintUsed();
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
              if (participantPoints < 1) return;
              spendPoints(participantIndex, 1);
              onHintUsed();
              setShowSentence(true);
            }}
            disabled={participantPoints < 1}
            className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            Buy Sentence (-1)
          </button>
        )}
      </div>
      <div className="mt-4 flex gap-4 justify-center">
        {!showPrefix && word.prefix && (
          <button
            onClick={handlePrefixReveal}
            disabled={participantPoints < 3}
            className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            Reveal Prefix (-3)
          </button>
        )}
        {!showSuffix && word.suffix && (
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
          disabled={participantPoints < 5 || !isTeamMode}
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded-lg"
        >
          Hangman Reveal (-5)
        </button>
        <button
          onClick={handleVowelReveal}
          disabled={participantPoints < 3 || !isTeamMode}
          className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 px-4 py-2 rounded-lg"
        >
          Vowel Reveal (-3)
        </button>
        <button
          onClick={handleFriendSubstitution}
          disabled={participantPoints < 4 || !isTeamMode}
          className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 px-4 py-2 rounded-lg"
        >
          Friend Sub (-4)
        </button>
      </div>
    </div>
  );
};

export default HintPanel;
