import React, { useEffect, useRef, useState } from 'react';
import { Word } from '../types';
import { speak } from '../utils/tts';
import { BATTLE_POWERS } from '../utils/battleProgression';

// ─── Types ────────────────────────────────────────────────────────────────────

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
  /**
   * Whether the current team has already made at least one spelling attempt on
   * this word. Used to enforce the 2-hint-before-first-attempt limit.
   */
  hasAttemptedCurrentWord?: boolean;
  /** Adds 15 seconds to the current word timer. */
  onAddTime?: () => void;
  /** Skips the current word without deducting lives. */
  onSkipWord?: () => void;
  /** Called when the Word Length hint has been successfully purchased, so the letter boxes can be revealed. */
  onWordLengthRevealed?: () => void;
  /** Called when the confirmation dialog opens so the parent can pause the word timer. */
  onRequestPause?: () => void;
  /** Called when the confirmation dialog closes (confirm or cancel) so the parent can resume the word timer. */
  onReleasePause?: () => void;
  /** Called whenever a hint is successfully activated, with its ID, display icon, and point cost. */
  onHintUsedWithId?: (id: string, icon: string, cost: number) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Look up cost from the canonical BATTLE_POWERS list. */
const getPowerCost = (id: string): number =>
  BATTLE_POWERS.find(p => p.id === id)?.cost ?? 0;

/**
 * Powers that may only be used once per word per team.
 * (Note: skipWord ends the word so it is implicitly once-per-word.)
 */
const ONCE_PER_WORD = new Set(['extraTime', 'multipleAttempts', 'vowels', 'quickPeek']);

/** Maximum number of hints a team may use before their first attempt on a word. */
const MAX_HINTS_BEFORE_ATTEMPT = 2;

/** Duration (ms) the Quick Peek word flash stays visible. */
const QUICK_PEEK_DURATION_MS = 1500;

/**
 * Derives a spelling-pattern clue for the given word using basic heuristics.
 * Returns null if no recognisable pattern is found.
 */
function getSpellingPattern(word: string): string | null {
  const w = word.toLowerCase();
  if (w.includes('ph')) return 'This word uses "ph" for the /f/ sound.';
  if (/tion$/.test(w)) return 'This word ends with "-tion" (sounds like "shun").';
  if (/sion$/.test(w)) return 'This word ends with "-sion".';
  if (/ough/.test(w)) return 'This word contains "-ough", which can sound different ways.';
  if (/ight$/.test(w)) return 'This word ends with "-ight" — the "gh" is silent.';
  if (/ness$/.test(w)) return 'This word ends with "-ness".';
  if (/ment$/.test(w)) return 'This word ends with "-ment".';
  if (/able$/.test(w)) return 'This word ends with "-able".';
  if (/ible$/.test(w)) return 'This word ends with "-ible".';
  if (/ful$/.test(w)) return 'This word ends with "-ful".';
  const dc = /([bcdfghjklmnpqrstvwxyz])\1/i.exec(w);
  if (dc) return `This word has a double "${dc[1].toUpperCase()}".`;
  if (/[aeiou][^aeiou]e$/.test(w)) return 'This word follows the silent-e pattern (vowel → consonant → silent e).';
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

const HintPanel: React.FC<HintPanelProps> = ({
  word,
  participantPoints,
  participantIndex,
  spendPoints,
  onHintUsed,
  onExtraAttempt,
  unlockedPowers,
  hasAttemptedCurrentWord = false,
  onAddTime,
  onSkipWord,
  onWordLengthRevealed,
  onRequestPause,
  onReleasePause,
  onHintUsedWithId,
}) => {
  // ── Display states (revealed hint content) ──────────────────────────────────
  const [showSentence, setShowSentence] = useState(false);
  const [showSyllables, setShowSyllables] = useState(false);
  const [showWordLength, setShowWordLength] = useState(false);
  const [showDefinition, setShowDefinition] = useState(false);
  const [showSoundItOut, setShowSoundItOut] = useState(false);
  const [showAffixes, setShowAffixes] = useState(false);
  const [showSpellingPattern, setShowSpellingPattern] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);

  // ── Letter-reveal state (vowels + hangman) ──────────────────────────────────
  const [revealedLetters, setRevealedLetters] = useState<boolean[]>([]);

  // ── Quick Peek flash ────────────────────────────────────────────────────────
  const [quickPeekVisible, setQuickPeekVisible] = useState(false);
  const quickPeekTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Usage tracking ──────────────────────────────────────────────────────────
  /** Counts how many hints have been used before the first spelling attempt. */
  const [hintsBeforeAttempt, setHintsBeforeAttempt] = useState(0);
  /** Power IDs that have already been used once this word (once-per-word guard). */
  const [usedOncePowers, setUsedOncePowers] = useState<Set<string>>(new Set());

  // ── Validation messages ─────────────────────────────────────────────────────
  const [validationMsg, setValidationMsg] = useState('');
  const validationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Onboarding banner (shown once ever, stored in localStorage) ────────────
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem('hasSeenHintIntro')
  );
  const onboardingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Power confirmation ───────────────────────────────────────────────────────
  /** ID of the power awaiting confirmation before its points are spent. */
  const [pendingPowerId, setPendingPowerId] = useState<string | null>(null);
  /** Handler to invoke once the player confirms the pending power. */
  const pendingHandlerRef = useRef<(() => void) | null>(null);

  // ── Reset on word change ────────────────────────────────────────────────────
  useEffect(() => {
    if (!word) return;
    setShowSentence(false);
    setShowSyllables(false);
    setShowWordLength(false);
    setShowDefinition(false);
    setShowSoundItOut(false);
    setShowAffixes(false);
    setShowSpellingPattern(false);
    setShowOrigin(false);
    setRevealedLetters(Array(word.word.length).fill(false));
    setQuickPeekVisible(false);
    setHintsBeforeAttempt(0);
    setUsedOncePowers(new Set());
    setValidationMsg('');
    setPendingPowerId(null);
    pendingHandlerRef.current = null;
    if (quickPeekTimer.current) clearTimeout(quickPeekTimer.current);
    if (validationTimer.current) clearTimeout(validationTimer.current);
  }, [word]);

  // Auto-dismiss the onboarding banner after 10 seconds
  useEffect(() => {
    if (!showOnboarding) return;
    onboardingTimerRef.current = setTimeout(() => dismissOnboarding(), 10000);
    return () => {
      if (onboardingTimerRef.current) clearTimeout(onboardingTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOnboarding]);

  const dismissOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenHintIntro', '1');
    if (onboardingTimerRef.current) clearTimeout(onboardingTimerRef.current);
  };

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
              No word selected. The next word is on its way.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Derived word data ───────────────────────────────────────────────────────
  const sentenceText = word.example || '';
  const syllableText = word.syllables?.join('-') || '';
  const wordLengthCount = word.word.replace(/[^a-zA-Z]/g, '').length;
  const wordLengthBlanks = word.word.split('').map(ch => (/[a-zA-Z]/.test(ch) ? '_' : ch)).join(' ');
  const definitionText = word.definition || '';
  const soundItOutText = word.pronunciation || (word.phonemes?.join('-') ?? '');
  const originText = word.origin || '';
  const prefixText = word.prefix || '';
  const suffixText = word.suffix || '';
  const prefixMeaning = word.prefixMeaning || '';
  const suffixMeaning = word.suffixMeaning || '';
  const spellingPatternText = getSpellingPattern(word.word);

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const isPowerUnlocked = (id: string) =>
    !unlockedPowers || unlockedPowers.includes(id);

  const showValidation = (msg: string) => {
    setValidationMsg(msg);
    if (validationTimer.current) clearTimeout(validationTimer.current);
    validationTimer.current = setTimeout(() => setValidationMsg(''), 4000);
  };

  /**
   * Validates and activates a power.
   * @param powerId the power ID
   * @param countAsHint whether this counts toward the pre-attempt hint limit
   * @returns true if the power should proceed; false if validation failed
   */
  const tryUsePower = (powerId: string, countAsHint = true): boolean => {
    const cost = getPowerCost(powerId);

    if (participantPoints < cost) {
      showValidation(
        `Not enough points — this hint costs ${cost} point${cost === 1 ? '' : 's'} and you have ${participantPoints}.`
      );
      return false;
    }

    if (ONCE_PER_WORD.has(powerId) && usedOncePowers.has(powerId)) {
      showValidation('You have already used this power for this word.');
      return false;
    }

    if (countAsHint && unlockedPowers && !hasAttemptedCurrentWord && hintsBeforeAttempt >= MAX_HINTS_BEFORE_ATTEMPT) {
      showValidation(
        `You can only use ${MAX_HINTS_BEFORE_ATTEMPT} hints before your first attempt. Make a spelling attempt first!`
      );
      return false;
    }

    // All checks passed — deduct cost and record usage
    spendPoints(participantIndex, cost);
    onHintUsed();
    const power = BATTLE_POWERS.find(p => p.id === powerId);
    if (power) onHintUsedWithId?.(powerId, power.icon, power.cost);

    if (countAsHint && unlockedPowers && !hasAttemptedCurrentWord) {
      setHintsBeforeAttempt(prev => prev + 1);
    }
    if (ONCE_PER_WORD.has(powerId)) {
      setUsedOncePowers(prev => new Set(prev).add(powerId));
    }

    return true;
  };

  /**
   * Queues a power for confirmation before spending points.
   * Runs pre-lock checks (unlocked, affordable, once-per-word) immediately so
   * errors appear without opening the dialog; only opens the dialog when valid.
   */
  const requestPower = (id: string, execute: () => void) => {
    const cost = getPowerCost(id);

    if (participantPoints < cost) {
      showValidation(
        `Not enough points — this hint costs ${cost} point${cost === 1 ? '' : 's'} and you have ${participantPoints}.`
      );
      return;
    }

    if (ONCE_PER_WORD.has(id) && usedOncePowers.has(id)) {
      showValidation('You have already used this power for this word.');
      return;
    }

    if (unlockedPowers && !hasAttemptedCurrentWord && hintsBeforeAttempt >= MAX_HINTS_BEFORE_ATTEMPT) {
      const countAsHint = id !== 'skipWord';
      if (countAsHint) {
        showValidation(
          `You can only use ${MAX_HINTS_BEFORE_ATTEMPT} hints before your first attempt. Make a spelling attempt first!`
        );
        return;
      }
    }

    pendingHandlerRef.current = execute;
    setPendingPowerId(id);
    onRequestPause?.();
  };

  const confirmPower = () => {
    pendingHandlerRef.current?.();
    pendingHandlerRef.current = null;
    setPendingPowerId(null);
    onReleasePause?.();
  };

  const cancelPower = () => {
    pendingHandlerRef.current = null;
    setPendingPowerId(null);
    onReleasePause?.();
  };

  // ── Power handlers ───────────────────────────────────────────────────────────

  const handleSentence = () => {
    if (!isPowerUnlocked('sentence') || showSentence) return;
    if (!tryUsePower('sentence')) return;
    setShowSentence(true);
  };

  const handleSyllables = () => {
    if (!isPowerUnlocked('syllables') || showSyllables) return;
    if (!tryUsePower('syllables')) return;
    setShowSyllables(true);
  };

  const handleWordLength = () => {
    if (!isPowerUnlocked('wordLength') || showWordLength) return;
    if (!tryUsePower('wordLength')) return;
    setShowWordLength(true);
    onWordLengthRevealed?.();
  };

  const handleDefinition = () => {
    if (!isPowerUnlocked('definition') || showDefinition) return;
    if (!tryUsePower('definition')) return;
    setShowDefinition(true);
  };

  const handleExtraTime = () => {
    if (!isPowerUnlocked('extraTime')) return;
    if (!tryUsePower('extraTime')) return;
    onAddTime?.();
  };

  const handleSoundItOut = () => {
    if (!isPowerUnlocked('soundItOut') || showSoundItOut) return;
    if (!tryUsePower('soundItOut')) return;
    setShowSoundItOut(true);
  };

  const handleAffixes = () => {
    if (!isPowerUnlocked('affixes') || showAffixes) return;
    if (!prefixText && !suffixText) {
      showValidation('No prefix or suffix data is available for this word.');
      return;
    }
    if (!tryUsePower('affixes')) return;
    setShowAffixes(true);
  };

  const handleSpellingPattern = () => {
    if (!isPowerUnlocked('spellingPattern') || showSpellingPattern) return;
    if (!tryUsePower('spellingPattern')) return;
    setShowSpellingPattern(true);
  };

  const handleOrigin = () => {
    if (!isPowerUnlocked('origin') || showOrigin) return;
    if (!tryUsePower('origin')) return;
    setShowOrigin(true);
  };

  const handleMultipleAttempts = () => {
    if (!isPowerUnlocked('multipleAttempts')) return;
    if (!tryUsePower('multipleAttempts')) return;
    onExtraAttempt();
  };

  const handleVowelReveal = () => {
    if (!isPowerUnlocked('vowels')) return;
    if (!tryUsePower('vowels')) return;
    setRevealedLetters(word.word.split('').map((l, i) => revealedLetters[i] || 'aeiouAEIOU'.includes(l)));
  };

  const handleHangmanReveal = () => {
    if (!isPowerUnlocked('hangman')) return;
    // Only consider actual letter positions — never reveal spaces, hyphens, or punctuation
    const unrevealedLetterIndices = revealedLetters
      .map((r, i) => (!r && /[a-zA-Z]/.test(word.word[i]) ? i : null))
      .filter((i): i is number => i !== null);
    if (unrevealedLetterIndices.length === 0) {
      showValidation('All letters are already revealed!');
      return;
    }
    if (!tryUsePower('hangman')) return;
    // If Vowel Reveal was already used, all vowels are already in revealedLetters,
    // so unrevealedLetterIndices naturally only contains consonants. No extra filtering needed.
    const pick = unrevealedLetterIndices[Math.floor(Math.random() * unrevealedLetterIndices.length)];
    setRevealedLetters(prev => {
      const next = [...prev];
      next[pick] = true;
      return next;
    });
  };

  const handleQuickPeek = () => {
    if (!isPowerUnlocked('quickPeek')) return;
    if (!tryUsePower('quickPeek')) return;
    setQuickPeekVisible(true);
    if (quickPeekTimer.current) clearTimeout(quickPeekTimer.current);
    quickPeekTimer.current = setTimeout(() => setQuickPeekVisible(false), QUICK_PEEK_DURATION_MS);
  };

  const handleFriendSub = () => {
    if (!isPowerUnlocked('friendSub')) return;
    showValidation('Friend Substitution is not available yet.');
  };

  const handleSkipWord = () => {
    if (!isPowerUnlocked('skipWord')) return;
    // Skip word doesn't count toward the pre-attempt hint limit
    if (!tryUsePower('skipWord', false)) return;
    onSkipWord?.();
  };

  // ── Locked powers strip data ─────────────────────────────────────────────────
  const lockedPowers = unlockedPowers
    ? BATTLE_POWERS.filter(p => !unlockedPowers.includes(p.id))
    : [];
  const nextLockedPower = lockedPowers[0] ?? null;

  // ── Button style helpers ─────────────────────────────────────────────────────
  const btnBase = 'flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm transition-all duration-200';
  const btnPrimary = `${btnBase} bg-yellow-300 hover:bg-yellow-400 text-black disabled:opacity-40`;
  const btnBlue = `${btnBase} bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-40`;
  const btnPurple = `${btnBase} bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-40`;
  const btnPink = `${btnBase} bg-pink-500 hover:bg-pink-600 text-white disabled:opacity-40`;
  const btnOrange = `${btnBase} bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-40`;
  const btnTeal = `${btnBase} bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-40`;
  const btnRed = `${btnBase} bg-red-500 hover:bg-red-600 text-white disabled:opacity-40`;
  /** Style for once-per-word powers that have already been used this word. */
  const btnUsed = `${btnBase} bg-white/10 text-white/40 cursor-default`;

  const canAfford = (id: string) => participantPoints >= getPowerCost(id);
  const isOnceUsed = (id: string) => ONCE_PER_WORD.has(id) && usedOncePowers.has(id);

  return (
    <div className="bg-white/10 p-4 rounded-xl mb-6 space-y-3">

      {/* ── Quick Peek flash overlay ─────────────────────────────────────── */}
      {quickPeekVisible && (
        <div
          className="fixed inset-0 bg-black/85 flex items-center justify-center z-[70] pointer-events-none"
          role="status"
          aria-live="assertive"
        >
          <div className="text-center">
            <p className="text-white/60 text-sm mb-2 uppercase tracking-widest font-bold">🔍 Quick Peek!</p>
            <p className="text-5xl font-black text-yellow-300 drop-shadow-2xl">{word.word}</p>
            <p className="text-white/50 text-xs mt-3">Memorize it — it disappears in {QUICK_PEEK_DURATION_MS / 1000}s</p>
          </div>
        </div>
      )}

      {/* ── Onboarding banner (first visit only) ────────────────────────── */}
      {showOnboarding && (
        <div className="flex items-start gap-3 bg-yellow-400/20 border border-yellow-400/50 rounded-xl px-4 py-3" role="status">
          <span className="text-2xl flex-shrink-0" aria-hidden="true">💡</span>
          <div className="flex-1 text-sm text-yellow-100">
            <strong className="block font-black text-yellow-300 mb-0.5">Hint powers available!</strong>
            You have starter hints below. Tap any to read what it does before spending points.
          </div>
          <button
            onClick={dismissOnboarding}
            className="flex-shrink-0 text-yellow-300/70 hover:text-yellow-200 text-lg leading-none font-bold"
            aria-label="Dismiss hint introduction"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Validation / error message ───────────────────────────────────── */}
      {validationMsg && (
        <div className="bg-red-500/20 border border-red-400/50 rounded-lg px-3 py-2 text-sm text-red-200 font-medium" role="alert">
          ⚠️ {validationMsg}
        </div>
      )}

      {/* ── Hint limit indicator (team mode, before first attempt) ──────── */}
      {!hasAttemptedCurrentWord && unlockedPowers && (
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-1.5" aria-hidden="true">
            {Array.from({ length: MAX_HINTS_BEFORE_ATTEMPT }, (_, i) => (
              <span
                key={i}
                className={`w-3.5 h-3.5 rounded-full transition-colors duration-200 ${
                  i < hintsBeforeAttempt ? 'bg-red-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <span
            className={`text-xs font-bold ${hintsBeforeAttempt >= MAX_HINTS_BEFORE_ATTEMPT ? 'text-red-300' : 'text-white/60'}`}
            aria-live="polite"
          >
            {hintsBeforeAttempt >= MAX_HINTS_BEFORE_ATTEMPT
              ? '🐝 Hint limit reached — attempt the word first.'
              : `💡 ${hintsBeforeAttempt}/${MAX_HINTS_BEFORE_ATTEMPT} hints used before attempt`}
          </span>
        </div>
      )}

      {/* ── Revealed letters display (hangman / vowel reveals) ──────────── */}
      {revealedLetters.some(r => r) && (
        <p className="text-3xl font-mono text-center tracking-widest py-1">
          {word.word.split('').map((ch, i) => {
            if (!/[a-zA-Z]/.test(ch)) return ch; // preserve spaces, hyphens, apostrophes
            return revealedLetters[i] ? ch : '_';
          }).join(' ')}
        </p>
      )}

      {/* ── Purchased hint content ───────────────────────────────────────── */}
      <div className="space-y-2">
        {showWordLength && (
          <div className="relative bg-blue-500/20 rounded-lg px-3 py-2">
            <span className="absolute top-1 right-2 text-xs text-blue-300/60 font-bold" aria-hidden="true">−{getPowerCost('wordLength')}pt</span>
            <span className="text-blue-200 font-bold text-sm">🔢 Word Length: </span>
            <span className="text-white text-sm">
              This word has <strong>{wordLengthCount}</strong> letter{wordLengthCount === 1 ? '' : 's'}.
            </span>
            <p className="font-mono text-lg text-white/80 mt-1 tracking-widest">{wordLengthBlanks}</p>
          </div>
        )}

        {showSentence && (
          <div className="relative bg-green-500/20 rounded-lg px-3 py-2">
            <span className="absolute top-1 right-2 text-xs text-green-300/60 font-bold" aria-hidden="true">−{getPowerCost('sentence')}pt</span>
            <span className="text-green-200 font-bold text-sm">📝 Sentence: </span>
            <span className="text-white text-sm italic">
            {`"${sentenceText || 'No sentence available. The word prefers mystery.'}"`}
            </span>
          </div>
        )}

        {showSyllables && (
          <div className="relative bg-yellow-500/20 rounded-lg px-3 py-2">
            <span className="absolute top-1 right-2 text-xs text-yellow-300/60 font-bold" aria-hidden="true">−{getPowerCost('syllables')}pt</span>
            <span className="text-yellow-200 font-bold text-sm">🧩 Syllables: </span>
            {syllableText ? (
              <span className="text-white text-sm">
                {word.syllables!.map((syl, i) => (
                  <button
                    key={i}
                    onClick={() => speak(syl)}
                    className="inline-block mx-0.5 px-1.5 py-0.5 bg-yellow-300/30 hover:bg-yellow-300/50 text-yellow-100 rounded text-sm font-mono transition"
                    title="Click to hear this syllable"
                  >
                    {syl}
                  </button>
                ))}
              </span>
            ) : (
              <span className="text-white/70 text-sm italic">No syllable breakdown available. Try listening for the chunks.</span>
            )}
          </div>
        )}

        {showDefinition && (
          <div className="relative bg-amber-500/20 rounded-lg px-3 py-2">
            <span className="absolute top-1 right-2 text-xs text-amber-300/60 font-bold" aria-hidden="true">−{getPowerCost('definition')}pt</span>
            <span className="text-amber-200 font-bold text-sm">📖 Definition: </span>
            <span className="text-white text-sm">
              {definitionText || 'No definition available. The word\'s job description is missing.'}
            </span>
          </div>
        )}

        {showSoundItOut && (
          <div className="relative bg-cyan-500/20 rounded-lg px-3 py-2">
            <span className="absolute top-1 right-2 text-xs text-cyan-300/60 font-bold" aria-hidden="true">−{getPowerCost('soundItOut')}pt</span>
            <span className="text-cyan-200 font-bold text-sm">🔊 Sound It Out: </span>
            <span className="text-white text-sm font-mono">
              {soundItOutText || 'No sound-it-out hint available. Listen carefully.'}
            </span>
          </div>
        )}

        {showAffixes && (
          <div className="relative bg-orange-500/20 rounded-lg px-3 py-2 space-y-1">
            <span className="absolute top-1 right-2 text-xs text-orange-300/60 font-bold" aria-hidden="true">−{getPowerCost('affixes')}pt</span>
            <span className="text-orange-200 font-bold text-sm block">🔠 Word Parts:</span>
            {prefixText ? (
              <p className="text-white text-sm">
                <strong>Prefix:</strong> {prefixText}
                {prefixMeaning && <span className="text-white/70"> — "{prefixMeaning}"</span>}
              </p>
            ) : null}
            {suffixText ? (
              <p className="text-white text-sm">
                <strong>Suffix:</strong> {suffixText}
                {suffixMeaning && <span className="text-white/70"> — "{suffixMeaning}"</span>}
              </p>
            ) : null}
            {!prefixText && !suffixText && (
              <p className="text-white/70 text-sm italic">No word-part data available. This word is keeping its components private.</p>
            )}
          </div>
        )}

        {showSpellingPattern && (
          <div className="relative bg-violet-500/20 rounded-lg px-3 py-2">
            <span className="absolute top-1 right-2 text-xs text-violet-300/60 font-bold" aria-hidden="true">−{getPowerCost('spellingPattern')}pt</span>
            <span className="text-violet-200 font-bold text-sm">🧠 Spelling Pattern: </span>
            <span className="text-white text-sm">
              {spellingPatternText || 'No spelling pattern identified. The word is being difficult in a plain way.'}
            </span>
          </div>
        )}

        {showOrigin && (
          <div className="relative bg-emerald-500/20 rounded-lg px-3 py-2">
            <span className="absolute top-1 right-2 text-xs text-emerald-300/60 font-bold" aria-hidden="true">−{getPowerCost('origin')}pt</span>
            <span className="text-emerald-200 font-bold text-sm">🌍 Origin: </span>
            <span className="text-white text-sm">
              {originText || 'No origin hint available. The word\'s passport is missing.'}
            </span>
          </div>
        )}
      </div>

      {/* ── Power confirmation dialog ────────────────────────────────────── */}
      {pendingPowerId && (() => {
        const power = BATTLE_POWERS.find(p => p.id === pendingPowerId);
        if (!power) return null;
        return (
          <div className="bg-black/60 border border-white/30 rounded-2xl p-4 text-center space-y-3" role="dialog" aria-modal="true" aria-labelledby="confirm-power-title">
            <div className="text-4xl">{power.icon}</div>
            <h3 id="confirm-power-title" className="text-white font-black text-lg">{power.name}</h3>
            <p className="text-white/80 text-sm">{power.description}</p>
            <p className="text-kahoot-yellow-300 font-bold text-sm" aria-label={`Cost: ${power.cost} ${power.cost === 1 ? 'point' : 'points'}. You have: ${participantPoints}`}>
              Cost: {power.cost} {power.cost === 1 ? 'point' : 'points'}{' '}
              <span aria-hidden="true">·</span>{' '}
              You have: {participantPoints}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={confirmPower}
                autoFocus
                className="flex-1 py-2 bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-yellow-500 hover:from-kahoot-yellow-500 hover:to-kahoot-yellow-600 text-black font-black rounded-xl transition-all duration-200 hover:scale-105"
              >
                Use it (−{power.cost}pt)
              </button>
              <button
                onClick={cancelPower}
                className="flex-1 py-2 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition-all duration-200"
              >
                Never mind
              </button>
            </div>
          </div>
        );
      })()}

      {/* ── Available power buttons ──────────────────────────────────────── */}
      {!pendingPowerId && (
      <div className="flex flex-wrap gap-2 justify-center pt-1">

        {/* Starter powers (unlockAt: 0) */}
        {isPowerUnlocked('sentence') && !showSentence && (
          <button onClick={() => requestPower('sentence', handleSentence)} disabled={!canAfford('sentence')} className={btnPrimary}>
            📝 Sentence <span className="opacity-70 text-xs">(-{getPowerCost('sentence')})</span>
          </button>
        )}
        {isPowerUnlocked('syllables') && !showSyllables && (
          <button onClick={() => requestPower('syllables', handleSyllables)} disabled={!canAfford('syllables')} className={btnPrimary}>
            🧩 Syllables <span className="opacity-70 text-xs">(-{getPowerCost('syllables')})</span>
          </button>
        )}
        {isPowerUnlocked('wordLength') && !showWordLength && (
          <button onClick={() => requestPower('wordLength', handleWordLength)} disabled={!canAfford('wordLength')} className={btnPrimary}>
            🔢 Word Length <span className="opacity-70 text-xs">(-{getPowerCost('wordLength')})</span>
          </button>
        )}

        {/* Definition */}
        {isPowerUnlocked('definition') && !showDefinition && (
          <button onClick={() => requestPower('definition', handleDefinition)} disabled={!canAfford('definition')} className={btnPrimary}>
            📖 Definition <span className="opacity-70 text-xs">(-{getPowerCost('definition')})</span>
          </button>
        )}

        {/* Extra Time (once per word) */}
        {isPowerUnlocked('extraTime') && (
          isOnceUsed('extraTime') ? (
            <button disabled className={btnUsed} aria-label="Extra Time already used this word">
              ⏱️ +15s <span className="text-xs ml-1">✓ used</span>
            </button>
          ) : (
            <button onClick={() => requestPower('extraTime', handleExtraTime)} disabled={!canAfford('extraTime')} className={btnBlue}>
              ⏱️ +15s <span className="opacity-70 text-xs">(-{getPowerCost('extraTime')})</span>
            </button>
          )
        )}

        {/* Sound It Out */}
        {isPowerUnlocked('soundItOut') && !showSoundItOut && (
          <button onClick={() => requestPower('soundItOut', handleSoundItOut)} disabled={!canAfford('soundItOut')} className={btnBlue}>
            🔊 Sound It Out <span className="opacity-70 text-xs">(-{getPowerCost('soundItOut')})</span>
          </button>
        )}

        {/* Affixes */}
        {isPowerUnlocked('affixes') && !showAffixes && (
          <button onClick={() => requestPower('affixes', handleAffixes)} disabled={!canAfford('affixes')} className={btnOrange}>
            🔠 Word Parts <span className="opacity-70 text-xs">(-{getPowerCost('affixes')})</span>
          </button>
        )}

        {/* Spelling Pattern */}
        {isPowerUnlocked('spellingPattern') && !showSpellingPattern && (
          <button onClick={() => requestPower('spellingPattern', handleSpellingPattern)} disabled={!canAfford('spellingPattern')} className={btnPurple}>
            🧠 Pattern <span className="opacity-70 text-xs">(-{getPowerCost('spellingPattern')})</span>
          </button>
        )}

        {/* Origin */}
        {isPowerUnlocked('origin') && !showOrigin && (
          <button onClick={() => requestPower('origin', handleOrigin)} disabled={!canAfford('origin')} className={btnTeal}>
            🌍 Origin <span className="opacity-70 text-xs">(-{getPowerCost('origin')})</span>
          </button>
        )}

        {/* Multiple Attempts (once per word) */}
        {isPowerUnlocked('multipleAttempts') && (
          isOnceUsed('multipleAttempts') ? (
            <button disabled className={btnUsed} aria-label="Multiple Attempts already used this word">
              🎯 Multiple Attempts <span className="text-xs ml-1">✓ used</span>
            </button>
          ) : (
            <button onClick={() => requestPower('multipleAttempts', handleMultipleAttempts)} disabled={!canAfford('multipleAttempts')} className={btnPink}>
              🎯 Multiple Attempts <span className="opacity-70 text-xs">(-{getPowerCost('multipleAttempts')})</span>
            </button>
          )
        )}

        {/* Vowel Reveal (once per word) */}
        {isPowerUnlocked('vowels') && (
          isOnceUsed('vowels') ? (
            <button disabled className={btnUsed} aria-label="Vowel Reveal already used this word">
              🔤 Vowel Reveal <span className="text-xs ml-1">✓ used</span>
            </button>
          ) : (
            <button onClick={() => requestPower('vowels', handleVowelReveal)} disabled={!canAfford('vowels')} className={btnPurple}>
              🔤 Vowel Reveal <span className="opacity-70 text-xs">(-{getPowerCost('vowels')})</span>
            </button>
          )
        )}

        {/* Hangman Reveal */}
        {isPowerUnlocked('hangman') && (
          <button onClick={() => requestPower('hangman', handleHangmanReveal)} disabled={!canAfford('hangman')} className={btnBlue}>
            🕵️ Reveal Letter <span className="opacity-70 text-xs">(-{getPowerCost('hangman')})</span>
          </button>
        )}

        {/* Quick Peek (once per word) */}
        {isPowerUnlocked('quickPeek') && (
          isOnceUsed('quickPeek') ? (
            <button disabled className={btnUsed} aria-label="Quick Peek already used this word">
              🔍 Quick Peek <span className="text-xs ml-1">✓ used</span>
            </button>
          ) : (
            <button onClick={() => requestPower('quickPeek', handleQuickPeek)} disabled={!canAfford('quickPeek')} className={btnOrange}>
              🔍 Quick Peek <span className="opacity-70 text-xs">(-{getPowerCost('quickPeek')})</span>
            </button>
          )
        )}

        {/* Friend Substitution */}
        {isPowerUnlocked('friendSub') && (
          <button onClick={handleFriendSub} className={btnPink}>
            👥 Friend Sub
          </button>
        )}

        {/* Skip Word */}
        {isPowerUnlocked('skipWord') && (
          <button onClick={() => requestPower('skipWord', handleSkipWord)} disabled={!canAfford('skipWord')} className={btnRed}>
            ⏭️ Skip Word <span className="opacity-70 text-xs">(-{getPowerCost('skipWord')})</span>
          </button>
        )}
      </div>
      )}

      {/* ── Locked powers strip ──────────────────────────────────────────── */}
      {unlockedPowers && lockedPowers.length > 0 && (
        <div className="mt-4 border-t border-white/20 pt-3">
          <p className="text-white/50 text-xs text-center mb-2 font-bold uppercase tracking-wider">
            🔒 Coming up next…
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {lockedPowers.slice(0, 6).map((p, i) => (
              <div
                key={p.id}
                className="flex flex-col items-center gap-0.5 opacity-50 max-w-[60px] cursor-help"
                aria-label={`${p.name} — locked. Unlocks after ${p.unlockAt} correct answer${p.unlockAt === 1 ? '' : 's'}. Costs ${p.cost} point${p.cost === 1 ? '' : 's'}. ${p.description}`}
                title={`${p.name}: ${p.description} Unlocks at ${p.unlockAt} correct answers · ${p.cost}pt`}
              >
                <span className="text-xl grayscale" aria-hidden="true">{p.icon}</span>
                <span className="text-xs text-white/60 text-center leading-tight">
                  {i === 0 && (
                    <span className="text-yellow-300 font-bold block" aria-hidden="true">
                      @{p.unlockAt}✓
                    </span>
                  )}
                  {p.name}
                </span>
                <span className="text-xs text-white/40">-{p.cost}pt</span>
              </div>
            ))}
            {lockedPowers.length > 6 && (
              <div className="flex flex-col items-center gap-0.5 opacity-40">
                <span className="text-xl">…</span>
                <span className="text-xs text-white/40">{lockedPowers.length - 6} more</span>
              </div>
            )}
          </div>
          {nextLockedPower && (
            <p className="mt-2 text-white/40 text-xs text-center">
              Next: <strong className="text-white/70">{nextLockedPower.icon} {nextLockedPower.name}</strong>{' '}
              at {nextLockedPower.unlockAt} correct answer{nextLockedPower.unlockAt === 1 ? '' : 's'} · {nextLockedPower.cost}pt
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HintPanel;
