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
      'See the word used in a full sentence. If you know what it means, the spelling often follows. If you don\'t, the sentence will at least give you a clue about the kind of word you\'re dealing with.',
    icon: '📝',
    cost: 1,
    unlockAt: 0,
  },
  {
    id: 'syllables',
    name: 'Syllable Breakdown',
    description:
      'Break the word into syllables and tackle each piece separately. Big words are small words waiting to be taken apart.',
    icon: '🧩',
    cost: 1,
    unlockAt: 0,
  },
  {
    id: 'wordLength',
    name: 'Word Length Hint',
    description:
      'See how many letters the word contains. This won\'t tell you which letters they are. It will tell you how many there are. That already narrows it down.',
    icon: '🔢',
    cost: 1,
    unlockAt: 0,
  },

  // ── Unlock at 2 combined correct ─────────────────────────────────────────
  {
    id: 'definition',
    name: 'Definition Hint',
    description:
      "Knowing what a word means and knowing how it's spelled are different skills, but they talk to each other. The definition appears.",
    icon: '📖',
    cost: 1,
    unlockAt: 2,
  },

  // ── Unlock at 4 combined correct ─────────────────────────────────────────
  {
    id: 'extraTime',
    name: 'Extra Time',
    description:
      'Adds 15 seconds to the timer. The clock did not agree to this, but the bee has the authority.',
    icon: '⏱️',
    cost: 2,
    unlockAt: 4,
  },

  // ── Unlock at 6 combined correct ─────────────────────────────────────────
  {
    id: 'soundItOut',
    name: 'Sound It Out Hint',
    description:
      "Every sound in the word is displayed phonetically. Some words sound exactly like they're spelled. Others have been lying about this for centuries.",
    icon: '🔊',
    cost: 2,
    unlockAt: 6,
  },

  // ── Unlock at 8 combined correct ─────────────────────────────────────────
  {
    id: 'affixes',
    name: 'Prefix / Suffix / Root Hint',
    description:
      'See the word\'s component parts. Words assembled from Latin and Greek pieces often look complicated but spell predictably once you know what the pieces are — which is the whole point of this hint.',
    icon: '🔠',
    cost: 2,
    unlockAt: 8,
  },

  // ── Unlock at 10 combined correct ────────────────────────────────────────
  {
    id: 'spellingPattern',
    name: 'Spelling Pattern Hint',
    description:
      "A clue about this word's specific spelling pattern — a silent letter, a doubled consonant, a borrowed ending. English has many of these. This hint reveals which one is in play today.",
    icon: '🧠',
    cost: 2,
    unlockAt: 10,
  },

  // ── Unlock at 12 combined correct ────────────────────────────────────────
  {
    id: 'origin',
    name: 'Origin Hint',
    description:
      "See where the word came from. Words carry their history in their spelling, which is why borrowed words often look like they belong somewhere else.",
    icon: '🌍',
    cost: 2,
    unlockAt: 12,
  },

  // ── Unlock at 14 combined correct ────────────────────────────────────────
  {
    id: 'multipleAttempts',
    name: 'Multiple Attempts',
    description:
      'A second attempt at this word becomes available. The first attempt remains on record. Only the final outcome counts.',
    icon: '🎯',
    cost: 3,
    unlockAt: 14,
  },

  // ── Unlock at 16 combined correct ────────────────────────────────────────
  {
    id: 'vowels',
    name: 'Vowel Reveal',
    description:
      'All the vowels appear. The consonants will not be participating at this time.',
    icon: '🔤',
    cost: 3,
    unlockAt: 16,
  },

  // ── Unlock at 18 combined correct ────────────────────────────────────────
  {
    id: 'hangman',
    name: 'Hangman-Style Reveal',
    description:
      'One letter is revealed. The bee chooses which one. Do not attempt to negotiate with the bee about this. The bee has a system.',
    icon: '🕵️',
    cost: 3,
    unlockAt: 18,
  },

  // ── Unlock at 20 combined correct ────────────────────────────────────────
  {
    id: 'quickPeek',
    name: 'Quick Peek',
    description:
      'The complete word appears on screen for 1.5 seconds. Then it\'s gone. What your team does with those 1.5 seconds is entirely up to you.',
    icon: '🔍',
    cost: 4,
    unlockAt: 20,
  },

  // ── Unlock at 22 combined correct ────────────────────────────────────────
  {
    id: 'friendSub',
    name: 'Friend Substitution',
    description:
      'Substitute a different teammate as speller. A change of perspective is sometimes what a word needs. The word doesn\'t care who spells it, as long as someone does.',
    icon: '👥',
    cost: 4,
    unlockAt: 22,
  },

  // ── Unlock at 24 combined correct ────────────────────────────────────────
  {
    id: 'skipWord',
    name: 'Skip Word',
    description:
      'Skip this word entirely. No penalty, no points. It will reappear in the review session with no memory of being skipped. Words are professional about these things.',
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
