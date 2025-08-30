interface WordData {
  word: string;
  syllables: string[];
  definition: string;
  origin: string;
  example: string;
  prefix: string;
  suffix: string;
  pronunciation: string;
}

let cachedWordList: WordData[] | null = null;

/**
 * Fetches the generated word list from the public directory
 */
export async function getWordList(): Promise<WordData[]> {
  // Use cached version if available
  if (cachedWordList) {
    return cachedWordList;
  }

  try {
    const response = await fetch('/wordlist.json');
    if (!response.ok) {
      throw new Error('Failed to load word list');
    }
    
    const wordList = await response.json();
    
    // Cache the result
    cachedWordList = wordList;
    
    return wordList;
  } catch (error) {
    console.error('Error loading word list:', error);
    // Return empty array if the word list can't be loaded
    return [];
  }
}

/**
 * Filters words by topic (case-insensitive partial match)
 */
export async function getWordsByTopic(topic: string, count: number = 10): Promise<WordData[]> {
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

/**
 * Helper function to get a random selection of words
 */
function getRandomWords(words: WordData[], count: number): WordData[] {
  const shuffled = [...words].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// For backward compatibility
export const generateWordList = getWordsByTopic;
