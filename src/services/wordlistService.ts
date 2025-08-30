export interface Word {
  word: string;
  syllables: string[];
  definition: string;
  origin: string;
  example: string;
  prefix: string;
  suffix: string;
  pronunciation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  id?: string;
  listId?: string;
}

// Paths to word lists
const DEFAULT_WORDLIST_PATH = '/wordlist.json';
const CUSTOM_WORDLISTS_KEY = 'wordLists';

let cachedWordList: Word[] | null = null;
let activeListId: string | null = null;

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
    pronunciation: 'ej-oo-KAY-shun',
    difficulty: 'medium'
  },
  {
    word: 'spelling',
    syllables: ['spell', 'ing'],
    definition: 'The process of writing or naming the letters of a word.',
    origin: 'Old English "spellian" meaning "to tell, speak, utter".',
    example: 'She won first place in the school spelling competition.',
    prefix: '',
    suffix: '-ing',
    pronunciation: 'SPEL-ing',
    difficulty: 'easy'
  }
];

/**
 * Gets the active word list ID
 */
export function getActiveListId(): string | null {
  return activeListId || localStorage.getItem('activeWordListId');
}

/**
 * Sets the active word list ID
 */
export function setActiveListId(listId: string | null): void {
  if (listId) {
    activeListId = listId;
    localStorage.setItem('activeWordListId', listId);
  } else {
    activeListId = null;
    localStorage.removeItem('activeWordListId');
  }
}

/**
 * Gets the active word list from localStorage or the default list
 */
export async function getWordList(): Promise<Word[]> {
  // Return cached word list if available
  if (cachedWordList) {
    return cachedWordList;
  }

  // Try to load from active custom list first
  const activeListId = getActiveListId();
  if (activeListId) {
    const customList = getCustomWordList(activeListId);
    if (customList) {
      cachedWordList = customList;
      return cachedWordList;
    }
  }

  // Fall back to default word list
  try {
    // Try to fetch from the public directory first
    const response = await fetch(DEFAULT_WORDLIST_PATH);
    if (!response.ok) {
      throw new Error(`Failed to fetch word list: ${response.statusText}`);
    }
    
    const data = await response.json();
    cachedWordList = (Array.isArray(data) ? data : []).map(word => ({
      ...word,
      id: `default-${word.word}`,
      listId: 'default',
    }));
    
    // Validate the word list structure
    if (!Array.isArray(cachedWordList) || cachedWordList.length === 0) {
      console.warn('Word list is empty or invalid, using fallback words');
      return FALLBACK_WORDS.map(word => ({
        ...word,
        id: `fallback-${word.word}`,
        listId: 'fallback',
      }));
    }
    
    return cachedWordList;
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

/**
 * Gets a custom word list by ID
 */
export function getCustomWordList(listId: string): Word[] | null {
  try {
    const lists = JSON.parse(localStorage.getItem(CUSTOM_WORDLISTS_KEY) || '[]');
    const list = lists.find((l: any) => l.id === listId);
    if (!list) return null;
    
    return list.words.map((word: any, index: number) => ({
      ...word,
      id: `${listId}-${index}`,
      listId,
      syllables: word.syllables || splitIntoSyllables(word.word),
      origin: word.origin || '',
      example: word.example || '',
      prefix: word.prefix || '',
      suffix: word.suffix || '',
      pronunciation: word.pronunciation || '',
    }));
  } catch (error) {
    console.error('Error loading custom word list:', error);
    return null;
  }
}

/**
 * Simple syllable splitting function
 */
function splitIntoSyllables(word: string): string[] {
  // This is a very basic implementation
  return word.split(/(?=[A-Z])|[-_]/).map(part => part.toLowerCase());
}

/**
 * Gets all available word lists (default + custom)
 */
export function getAllWordLists(): Array<{
  id: string;
  name: string;
  description?: string;
  wordCount: number;
  isDefault: boolean;
}> {
  const defaultList = {
    id: 'default',
    name: 'Default Word List',
    description: 'Built-in word list',
    wordCount: cachedWordList?.length || 0,
    isDefault: true,
  };

  try {
    const customLists = JSON.parse(localStorage.getItem(CUSTOM_WORDLISTS_KEY) || '[]')
      .map((list: any) => ({
        id: list.id,
        name: list.name,
        description: list.description,
        wordCount: list.words?.length || 0,
        isDefault: false,
      }));
    
    return [defaultList, ...customLists];
  } catch (error) {
    console.error('Error loading word lists:', error);
    return [defaultList];
  }
}
