import React, { useEffect, useState } from 'react';
import { Word } from '../types';
import { speak } from '../utils/tts';
import { BATTLE_POWERS } from '../utils/battleProgression';

interface HintPanelProps {
  word: Word | null;
  participantPoints: number;
  participantIndex: number;
  spendPoints: (participantIndex: number, cost: number) => void;
  isTeamMode: boolean;
  showWord: boolean;
  onHintUsed: () => void;
  onExtraAttempt: () => void;
  /**
   * When provided, only powers whose IDs appear in this array are available.
   * Used in team battle mode to progressively unlock hints.
   * When omitted (individual mode), all hints are available immediately.
   */
  unlockedPowers?: string[];
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
  unlockedPowers,
}) => {
  // Helper: is a given power available?
  const isPowerAvailable = (id: string) =>
    !unlockedPowers || unlockedPowers.includes(id);
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
  const prefixMeaning = safeAccess(word, 'prefixMeaning', '');
  const suffixMeaning = safeAccess(word, 'suffixMeaning', '');

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
    const cost = 5;
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
    const cost = 3;
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

  const handleDefinitionReveal = () => {
    const cost = 1;
    if (participantPoints < cost) return;
    spendPoints(participantIndex, cost);
    onHintUsed();
    setShowDefinition(true);
  };

  const handleOriginReveal = () => {
    const cost = 1;
    if (participantPoints < cost) return;
    spendPoints(participantIndex, cost);
    onHintUsed();
    setShowOrigin(true);
  };

  const handleSentenceReveal = () => {
    const cost = 2;
    if (participantPoints < cost) return;
    spendPoints(participantIndex, cost);
    onHintUsed();
    setShowSentence(true);
  };

  const syllableCount = word?.syllables?.length || 0;

  // Powers that are still locked (only relevant in team mode with progression)
  const lockedPowers = unlockedPowers
    ? BATTLE_POWERS.filter(p => !unlockedPowers.includes(p.id))
    : [];

  const nextLockedPower = lockedPowers[0] ?? null;

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

      {/* Show "no powers yet" message in team mode before first unlock */}
      {unlockedPowers && unlockedPowers.length === 0 && (
        <p className="text-white/70 text-sm text-center italic mb-2">
          🔒 Get your first correct answer to unlock your first power!
        </p>
      )}

      {isPowerAvailable('syllables') && (
        <button
          onClick={() => {
            setShowHint(!showHint);
            if (!showHint) onHintUsed();
          }}
          className="mt-4 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
        >
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
      )}
      {showHint && isPowerAvailable('syllables') && (
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
      {showOrigin && isPowerAvailable('origin') && (
        <p className="text-xl mb-2">
          <strong className="text-yellow-300">Origin:</strong> {origin || 'Origin not available'}
        </p>
      )}
      {showSentence && isPowerAvailable('sentence') && (
        <p className="text-xl">
          <strong className="text-yellow-300">Example:</strong> "{example || 'Example not available'}"
        </p>
      )}
      {showPrefix && isPowerAvailable('affixes') && (
        <div className="text-xl mb-2">
          <strong className="text-yellow-300">Prefix:</strong> {prefix || 'Prefix not available'}
          {prefixMeaning && <span className="text-lg text-gray-300"> (meaning: {prefixMeaning})</span>}
        </div>
      )}
      {showSuffix && isPowerAvailable('affixes') && (
        <div className="text-xl mb-2">
          <strong className="text-yellow-300">Suffix:</strong> {suffix || 'Suffix not available'}
          {suffixMeaning && <span className="text-lg text-gray-300"> (meaning: {suffixMeaning})</span>}
        </div>
      )}
      <div className="mt-4 flex gap-4 justify-center flex-wrap">
        {isPowerAvailable('definition') && !showDefinition && (
          <button
            onClick={handleDefinitionReveal}
            disabled={participantPoints < 1}
            className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            📖 Buy Definition (-1)
          </button>
        )}
        {isPowerAvailable('origin') && !showOrigin && (
          <button
            onClick={handleOriginReveal}
            disabled={participantPoints < 1}
            className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            🌍 Buy Origin (-1)
          </button>
        )}
        {isPowerAvailable('sentence') && !showSentence && (
          <button
            onClick={handleSentenceReveal}
            disabled={participantPoints < 2}
            className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            💬 Buy Sentence (-2)
          </button>
        )}
      </div>
      <div className="mt-4 flex gap-4 justify-center flex-wrap">
        {isPowerAvailable('affixes') && !showPrefix && prefix && (
          <button
            onClick={handlePrefixReveal}
            disabled={participantPoints < 3}
            className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            🔠 Reveal Prefix (-3)
          </button>
        )}
        {isPowerAvailable('affixes') && !showSuffix && suffix && (
          <button
            onClick={handleSuffixReveal}
            disabled={participantPoints < 3}
            className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold disabled:opacity-50"
          >
            🔠 Reveal Suffix (-3)
          </button>
        )}
      </div>
      <div className="mt-6 flex justify-center gap-4 flex-wrap">
        {isPowerAvailable('hangman') && (
          <button
            onClick={handleHangmanReveal}
            disabled={participantPoints < 5}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded-lg"
          >
            🕵️ Hangman Reveal (-5)
          </button>
        )}
        {isPowerAvailable('vowels') && (
          <button
            onClick={handleVowelReveal}
            disabled={participantPoints < 3}
            className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 px-4 py-2 rounded-lg"
          >
            🔤 Vowel Reveal (-3)
          </button>
        )}
        {isPowerAvailable('extraAttempt') && (
          <button
            onClick={handleFriendSubstitution}
            disabled={participantPoints < 4}
            className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 px-4 py-2 rounded-lg"
          >
            🎯 Extra Attempt (-4)
          </button>
        )}
      </div>
      {word && (
        <>
          <div className="hint-section">
            <h3>Syllables</h3>
            <p>{syllableCount}</p>
          </div>
        </>
      )}

      {/* Locked powers strip — shown only in team mode with progression */}
      {unlockedPowers && lockedPowers.length > 0 && (
        <div className="mt-6 border-t border-white/20 pt-4">
          <p className="text-white/60 text-xs text-center mb-2 font-bold uppercase tracking-wider">
            🔒 Coming up next…
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {lockedPowers.map((p, i) => (
              <div
                key={p.id}
                className="flex flex-col items-center gap-1 opacity-50"
                title={`Unlocks at ${p.unlockAt} correct answer${p.unlockAt === 1 ? '' : 's'}: ${p.description}`}
              >
                <span className="text-2xl grayscale">{p.icon}</span>
                <span className="text-xs text-white/70 text-center max-w-[64px] leading-tight">
                  {i === 0 ? (
                    <span className="text-kahoot-yellow-300 font-bold not-italic">
                      @{p.unlockAt}✓
                    </span>
                  ) : null}
                  {' '}{p.name}
                </span>
              </div>
            ))}
          </div>
          {nextLockedPower && (
            <p className="mt-2 text-white/50 text-xs text-center">
              Next: <strong className="text-white/80">{nextLockedPower.name}</strong> unlocks at {nextLockedPower.unlockAt} correct answer{nextLockedPower.unlockAt === 1 ? '' : 's'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HintPanel;
