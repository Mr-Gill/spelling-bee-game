import { Word } from '../services/wordlistService';
import { WordList } from '../components/WordListManager';

/**
 * Converts a WordList to the Word format used by the spelling bee game
 */
export function convertToWordList(wordList: WordList): Word[] {
  return wordList.words.map((wordItem, index) => ({
    word: wordItem.word,
    syllables: splitIntoSyllables(wordItem.word),
    definition: wordItem.definition,
    origin: '',
    example: '',
    prefix: '',
    suffix: '',
    pronunciation: '',
    difficulty: wordItem.difficulty || 'medium',
    id: `${wordList.id}-${index}`,
  }));
}

/**
 * Simple syllable splitting function - can be enhanced with a proper library
 */
function splitIntoSyllables(word: string): string[] {
  // This is a very basic implementation
  // In a real app, you might want to use a library like `syllable`
  return word.split(/(?=[A-Z])|[-_]/).map(part => part.toLowerCase());
}

/**
 * Validates a word list JSON file
 */
export function validateWordList(data: any): data is WordList {
  if (!data || typeof data !== 'object') return false;
  if (!data.name || typeof data.name !== 'string') return false;
  if (!Array.isArray(data.words)) return false;
  
  return data.words.every((word: any) => {
    return (
      word && 
      typeof word === 'object' &&
      typeof word.word === 'string' && 
      word.word.trim() !== '' &&
      typeof word.definition === 'string' &&
      (!word.difficulty || ['easy', 'medium', 'hard'].includes(word.difficulty))
    );
  });
}

/**
 * Imports a word list from a file
 */
export async function importWordListFromFile(file: File): Promise<WordList> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (validateWordList(data)) {
          resolve({
            ...data,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        } else {
          reject(new Error('Invalid word list format'));
        }
      } catch (error) {
        reject(new Error('Failed to parse JSON file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
}

/**
 * Filters words by difficulty
 */
export function filterByDifficulty(words: Word[], difficulty?: 'easy' | 'medium' | 'hard'): Word[] {
  if (!difficulty) return words;
  return words.filter(word => word.difficulty === difficulty);
}

/**
 * Searches words by query (word or definition)
 */
export function searchWords(words: Word[], query: string): Word[] {
  if (!query.trim()) return words;
  
  const searchTerm = query.toLowerCase().trim();
  return words.filter(
    word => 
      word.word.toLowerCase().includes(searchTerm) ||
      word.definition.toLowerCase().includes(searchTerm)
  );
}
