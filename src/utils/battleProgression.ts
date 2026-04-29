/**
 * Battle Progression System
 *
 * In team battle mode, hint powers are locked at the start and unlock one-by-one
 * as teams collectively get words correct. Each unlock comes with a tutorial
 * modal explaining what the power does.
 */

export interface BattlePower {
  /** Unique identifier — must match the key used in HintPanel */
  id: string;
  /** Display name */
  name: string;
  /** Short tutorial description shown in the unlock modal */
  description: string;
  /** Emoji icon */
  icon: string;
  /** Point cost to use the hint (informational, shown in modal) */
  cost: number;
  /** Minimum total correct answers across all teams before this power unlocks */
  unlockAt: number;
}

export const BATTLE_POWERS: BattlePower[] = [
  {
    id: 'definition',
    name: 'Word Definition',
    description: "See the word's meaning to help figure out the spelling!",
    icon: '📖',
    cost: 1,
    unlockAt: 1,
  },
  {
    id: 'syllables',
    name: 'Syllable Breakdown',
    description: 'Break the word into parts — perfect for sounding it out!',
    icon: '🔡',
    cost: 3,
    unlockAt: 3,
  },
  {
    id: 'sentence',
    name: 'Example Sentence',
    description: 'See the word used in a real sentence!',
    icon: '💬',
    cost: 2,
    unlockAt: 5,
  },
  {
    id: 'vowels',
    name: 'Vowel Reveal',
    description: 'Reveal all the vowels to narrow it down!',
    icon: '🔤',
    cost: 3,
    unlockAt: 8,
  },
  {
    id: 'origin',
    name: 'Word Origin',
    description: 'See where the word comes from — origins help you spell it!',
    icon: '🌍',
    cost: 1,
    unlockAt: 11,
  },
  {
    id: 'hangman',
    name: 'Hangman Reveal',
    description: 'Reveal one random letter in the word!',
    icon: '🕵️',
    cost: 5,
    unlockAt: 14,
  },
  {
    id: 'extraAttempt',
    name: 'Extra Attempt',
    description: 'Get a second chance to spell the word!',
    icon: '🎯',
    cost: 4,
    unlockAt: 18,
  },
  {
    id: 'affixes',
    name: 'Prefix & Suffix',
    description: 'Decode the structure with prefix and suffix hints!',
    icon: '🔠',
    cost: 3,
    unlockAt: 22,
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
