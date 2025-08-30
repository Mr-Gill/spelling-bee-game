export interface Word {
  word: string;
  syllables: string[];
  definition: string;
  origin: string;
  example: string;
  prefix: string;
  suffix: string;
  pronunciation: string;
}

// Path to the word list in the public directory
const WORDLIST_PATH = '/wordlist.json';

let cachedWordList: Word[] | null = null;

// Fallback word list in case the file fails to load
const FALLBACK_WORDS: Word[] = [
  {
    word: 'education',
    syllables: ['ed', 'u', 'ca', 'tion'],
    definition: 'The process of receiving or giving systematic instruction, especially at a school or university.',
    origin: 'Latin "educatio", from "educare" meaning "to bring up, rear, educate".',
    example: 'The school is committed to providing quality education to all its students.',
    prefix: '',
    suffix: '-tion',
    pronunciation: 'ej-oo-KAY-shun'
  },
  {
    word: 'spelling',
    syllables: ['spell', 'ing'],
    definition: 'The process of writing or naming the letters of a word.',
    origin: 'Old English "spellian" meaning "to tell, speak, utter".',
    example: 'She won first place in the school spelling competition.',
    prefix: '',
    suffix: '-ing',
    pronunciation: 'SPEL-ing'
  }
];

/**
 * Fetches the word list from the public directory or returns a cached version if available
 */
export async function getWordList(): Promise<Word[]> {
  // Return cached word list if available
  if (cachedWordList) {
    return cachedWordList;
  }

  try {
    // Try to fetch from the public directory first
    const response = await fetch(WORDLIST_PATH);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch word list: ${response.statusText}`);
    }
    
    const wordList = await response.json();
    
    // Validate the word list structure
    if (!Array.isArray(wordList) || wordList.length === 0) {
      console.warn('Word list is empty or invalid, using fallback words');
      return FALLBACK_WORDS;
    }
    
    // Cache the word list for future use
    cachedWordList = wordList;
    
    return wordList;
  } catch (error) {
    console.error('Error loading word list, using fallback words:', error);
    
    // Return fallback words if there's an error
    return FALLBACK_WORDS;
  }
}

/**
 * Gets a random word from the word list
 */
export async function getRandomWord(): Promise<Word> {
  const wordList = await getWordList();
  
  if (wordList.length === 0) {
    // This should never happen because we have fallback words
    throw new Error('No words available in the word list');
  }
  
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

/**
 * Gets a word by its exact spelling (case-insensitive)
 */
export async function getWordBySpelling(word: string): Promise<Word | null> {
  if (!word) return null;
  
  const wordList = await getWordList();
  const lowerCaseWord = word.toLowerCase();
  
  return wordList.find(w => w.word.toLowerCase() === lowerCaseWord) || null;
}

/**
 * Gets a random selection of words from the provided list
 */
function getRandomWords(words: Word[], count: number): Word[] {
  if (words.length <= count) {
    return [...words];
  }
  
  const shuffled = [...words].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Filters words by topic (case-insensitive partial match)
 */
export async function getWordsByTopic(topic: string, count: number = 10): Promise<Word[]> {
  const allWords = await getWordList();
  
  if (!topic) {
    // If no topic is provided, return a random selection
    return getRandomWords(allWords, count);
  }
  
  // Filter words that match the topic in word, definition, or example
  const topicLower = topic.toLowerCase();
  const matchingWords = allWords.filter(word => 
    word.word.toLowerCase().includes(topicLower) ||
    word.definition.toLowerCase().includes(topicLower) ||
    word.example.toLowerCase().includes(topicLower)
  );
  
  // If we don't have enough matching words, fill the rest with random words
  if (matchingWords.length < count) {
    const remainingCount = count - matchingWords.length;
    const otherWords = allWords.filter(word => !matchingWords.includes(word));
    return [...matchingWords, ...getRandomWords(otherWords, remainingCount)];
  }
  
  // Return a random selection of matching words
  return getRandomWords(matchingWords, count);
}

// For backward compatibility
export const generateWordList = getWordsByTopic;
