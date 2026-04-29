/**
 * Battle Progression System
 *
 * In team battle mode, hint powers are locked at the start and unlock one-by-one
 * as teams collectively get words correct. Each unlock comes with a tutorial
 * modal explaining what the power does.
 *
 * Powers with unlockAt: 0 are available immediately from the start of the game.
 * All others unlock when the combined correct-answer count reaches their threshold.
 */

export interface BattlePower {
  /** Unique identifier — must match the key used in HintPanel */
  id: string;
  /** Display name */
  name: string;
  /** Tutorial description shown in the unlock modal */
  description: string;
  /** Emoji icon */
  icon: string;
  /** Point cost to use the hint */
  cost: number;
  /** Combined correct answers needed before this power unlocks (0 = available from start) */
  unlockAt: number;
}

export const BATTLE_POWERS: BattlePower[] = [
  // ── Available from the start of the game (unlockAt: 0) ──────────────────
  {
    id: 'sentence',
    name: 'Sentence Hint',
    description:
      'See the word used in a real sentence. Understanding the context helps you connect meaning to spelling.',
    icon: '📝',
    cost: 1,
    unlockAt: 0,
  },
  {
    id: 'syllables',
    name: 'Syllable Breakdown',
    description:
      'Break the word into smaller sound chunks. Spell one part at a time instead of guessing the whole word.',
    icon: '🧩',
    cost: 1,
    unlockAt: 0,
  },
  {
    id: 'wordLength',
    name: 'Word Length Hint',
    description:
      'See how many letters are in the word. Knowing the length helps you plan your spelling from the start.',
    icon: '🔢',
    cost: 1,
    unlockAt: 0,
  },

  // ── Unlock at 2 combined correct ─────────────────────────────────────────
  {
    id: 'definition',
    name: 'Definition Hint',
    description:
      "See what the word means. Understanding the meaning helps you connect it to how it's spelled.",
    icon: '📖',
    cost: 1,
    unlockAt: 2,
  },

  // ── Unlock at 4 combined correct ─────────────────────────────────────────
  {
    id: 'extraTime',
    name: 'Extra Time',
    description:
      'Add 15 seconds to the timer! Use this when your team needs more thinking time. Once per word.',
    icon: '⏱️',
    cost: 2,
    unlockAt: 4,
  },

  // ── Unlock at 6 combined correct ─────────────────────────────────────────
  {
    id: 'soundItOut',
    name: 'Sound It Out Hint',
    description:
      "Get the phonetic breakdown of the word. Hearing each sound helps your team spell it correctly.",
    icon: '🔊',
    cost: 2,
    unlockAt: 6,
  },

  // ── Unlock at 8 combined correct ─────────────────────────────────────────
  {
    id: 'affixes',
    name: 'Prefix / Suffix / Root Hint',
    description:
      'See the word broken into its parts — prefix, root, and suffix. Word structure reveals spelling patterns.',
    icon: '🔠',
    cost: 2,
    unlockAt: 8,
  },

  // ── Unlock at 10 combined correct ────────────────────────────────────────
  {
    id: 'spellingPattern',
    name: 'Spelling Pattern Hint',
    description:
      "Get a clue about the word's spelling pattern — like a silent letter, double consonant, or special ending.",
    icon: '🧠',
    cost: 2,
    unlockAt: 10,
  },

  // ── Unlock at 12 combined correct ────────────────────────────────────────
  {
    id: 'origin',
    name: 'Origin Hint',
    description:
      "Find out where the word comes from. A word's language of origin often explains why it's spelled the way it is.",
    icon: '🌍',
    cost: 2,
    unlockAt: 12,
  },

  // ── Unlock at 14 combined correct ────────────────────────────────────────
  {
    id: 'multipleAttempts',
    name: 'Multiple Attempts',
    description:
      'Get one extra chance to spell the word. Use it wisely — your team only gets one bonus attempt per word.',
    icon: '🎯',
    cost: 3,
    unlockAt: 14,
  },

  // ── Unlock at 16 combined correct ────────────────────────────────────────
  {
    id: 'vowels',
    name: 'Vowel Reveal',
    description:
      'All vowels in the word are revealed! Use this to narrow down the spelling when the consonants are the hard part.',
    icon: '🔤',
    cost: 3,
    unlockAt: 16,
  },

  // ── Unlock at 18 combined correct ────────────────────────────────────────
  {
    id: 'hangman',
    name: 'Hangman-Style Reveal',
    description:
      'One hidden letter is revealed at random. If vowels are already shown, a consonant will be chosen first.',
    icon: '🕵️',
    cost: 3,
    unlockAt: 18,
  },

  // ── Unlock at 20 combined correct ────────────────────────────────────────
  {
    id: 'quickPeek',
    name: 'Quick Peek',
    description:
      'The full word flashes on screen for 1.5 seconds! Your team must memorise it and spell it from memory. Once per word.',
    icon: '🔍',
    cost: 4,
    unlockAt: 20,
  },

  // ── Unlock at 22 combined correct ────────────────────────────────────────
  {
    id: 'friendSub',
    name: 'Friend Substitution',
    description:
      'Swap the current speller with a teammate. A fresh perspective can make all the difference!',
    icon: '👥',
    cost: 4,
    unlockAt: 22,
  },

  // ── Unlock at 24 combined correct ────────────────────────────────────────
  {
    id: 'skipWord',
    name: 'Skip Word',
    description:
      'Skip this word and move on — no life lost, but no points earned either. The word is saved for review.',
    icon: '⏭️',
    cost: 5,
    unlockAt: 24,
  },
];

/**
 * Returns powers that should be newly unlocked when moving from
 * `previousCount` to `newCount` total correct answers.
 */
export function getNewlyUnlockedPowers(
  previousCount: number,
  newCount: number
): BattlePower[] {
  return BATTLE_POWERS.filter(
    p => p.unlockAt > previousCount && p.unlockAt <= newCount
  );
}

/**
 * Returns all power IDs that are unlocked for a given total correct count.
 * Powers with unlockAt: 0 are always included.
 */
export function getUnlockedPowerIds(totalCorrect: number): string[] {
  return BATTLE_POWERS.filter(p => p.unlockAt <= totalCorrect).map(p => p.id);
}

/**
 * Returns the next power that hasn't unlocked yet, or null if all are unlocked.
 */
export function getNextLockedPower(totalCorrect: number): BattlePower | null {
  return BATTLE_POWERS.find(p => p.unlockAt > totalCorrect) ?? null;
}
