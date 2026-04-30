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
      'See the word in a full sentence. Context helps when the word is acting innocent.',
    icon: '📝',
    cost: 1,
    unlockAt: 0,
  },
  {
    id: 'syllables',
    name: 'Syllable Breakdown',
    description:
      'Break the word into chunks. Long words are less frightening when handled one piece at a time.',
    icon: '🧩',
    cost: 1,
    unlockAt: 0,
  },
  {
    id: 'wordLength',
    name: 'Word Length Hint',
    description:
      'See how many letters you\'re dealing with. The word can\'t hide its length.',
    icon: '🔢',
    cost: 1,
    unlockAt: 0,
  },

  // ── Unlock at 2 combined correct ─────────────────────────────────────────
  {
    id: 'definition',
    name: 'Definition Hint',
    description:
      'Find out what the word means. Knowing the meaning and knowing the spelling are different skills — but they talk to each other.',
    icon: '📖',
    cost: 1,
    unlockAt: 2,
  },

  // ── Unlock at 4 combined correct ─────────────────────────────────────────
  {
    id: 'extraTime',
    name: 'Extra Time',
    description:
      'Add 15 seconds. Enough time for a team huddle and one dramatic stare at the ceiling.',
    icon: '⏱️',
    cost: 2,
    unlockAt: 4,
  },

  // ── Unlock at 6 combined correct ─────────────────────────────────────────
  {
    id: 'soundItOut',
    name: 'Sound It Out Hint',
    description:
      'See every sound in the word written out. Some words sound exactly like they\'re spelled. Others have been misleading people for centuries.',
    icon: '🔊',
    cost: 2,
    unlockAt: 6,
  },

  // ── Unlock at 8 combined correct ─────────────────────────────────────────
  {
    id: 'affixes',
    name: 'Prefix / Suffix / Root Hint',
    description:
      'Check the word\'s parts — prefix, suffix, root. English looks chaotic, but it sometimes leaves clues.',
    icon: '🔠',
    cost: 2,
    unlockAt: 8,
  },

  // ── Unlock at 10 combined correct ────────────────────────────────────────
  {
    id: 'spellingPattern',
    name: 'Spelling Pattern Hint',
    description:
      'Spot the specific trick: silent letter, double consonant, borrowed ending. Useful information, arriving a little late.',
    icon: '🧠',
    cost: 2,
    unlockAt: 10,
  },

  // ── Unlock at 12 combined correct ────────────────────────────────────────
  {
    id: 'origin',
    name: 'Origin Hint',
    description:
      'See where the word came from. Some spellings make more sense once you check their passport.',
    icon: '🌍',
    cost: 2,
    unlockAt: 12,
  },

  // ── Unlock at 14 combined correct ────────────────────────────────────────
  {
    id: 'multipleAttempts',
    name: 'Multiple Attempts',
    description:
      'Buy a second attempt. Mistakes are just information arriving rudely. Only the final result counts.',
    icon: '🎯',
    cost: 3,
    unlockAt: 14,
  },

  // ── Unlock at 16 combined correct ────────────────────────────────────────
  {
    id: 'vowels',
    name: 'Vowel Reveal',
    description:
      'Reveal the vowels. The consonants can continue being mysterious.',
    icon: '🔤',
    cost: 3,
    unlockAt: 16,
  },

  // ── Unlock at 18 combined correct ────────────────────────────────────────
  {
    id: 'hangman',
    name: 'Hangman-Style Reveal',
    description:
      'One letter is revealed. The bee picks which one. Negotiation is not available.',
    icon: '🕵️',
    cost: 3,
    unlockAt: 18,
  },

  // ── Unlock at 20 combined correct ────────────────────────────────────────
  {
    id: 'quickPeek',
    name: 'Quick Peek',
    description:
      'The full word appears for 1.5 seconds. Then it leaves, like it has somewhere better to be.',
    icon: '🔍',
    cost: 4,
    unlockAt: 20,
  },

  // ── Unlock at 22 combined correct ────────────────────────────────────────
  {
    id: 'friendSub',
    name: 'Friend Substitution',
    description:
      'Swap in a teammate as speller. Choose someone who looks unusually calm about this.',
    icon: '👥',
    cost: 4,
    unlockAt: 22,
  },

  // ── Unlock at 24 combined correct ────────────────────────────────────────
  {
    id: 'skipWord',
    name: 'Skip Word',
    description:
      'Skip this word. No penalty, no points. It will return in the review session, possibly with an attitude.',
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
