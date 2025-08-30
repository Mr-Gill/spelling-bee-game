import { audioManager } from '../audio';

/**
 * Play the pronunciation of a word
 * @param word The word to pronounce
 * @param onEnd Optional callback when playback finishes
 */
export function playWordPronunciation(word: string, onEnd?: () => void): void {
  if (!word) return;
  
  const safeWord = word.toLowerCase().trim();
  const audioPath = `/audio/words/${safeWord}.mp3`;
  
  // Try to play the word pronunciation
  const sound = audioManager.playSound(audioPath, {
    onend: onEnd,
    onerror: (error) => {
      console.warn(`Failed to play word pronunciation for "${word}":`, error);
      // Fallback to TTS if available
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.onend = onEnd ? () => onEnd() : null;
        window.speechSynthesis.speak(utterance);
      } else if (onEnd) {
        onEnd();
      }
    }
  });
  
  // If sound couldn't be played, try the fallback
  if (!sound && window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(word);
    if (onEnd) {
      utterance.onend = () => onEnd();
    }
    window.speechSynthesis.speak(utterance);
  }
}

/**
 * Preload word pronunciation audio file
 * @param word The word to preload
 */
export function preloadWordAudio(word: string): void {
  if (!word) return;
  
  const safeWord = word.toLowerCase().trim();
  const audioPath = `/audio/words/${safeWord}.mp3`;
  
  // Only preload if not already loaded
  if (!audioManager.isSoundLoaded(audioPath)) {
    audioManager.loadSound(`word_${safeWord}`, audioPath, { preload: true });
  }
}

/**
 * Preload multiple word pronunciations
 * @param words Array of words to preload
 */
export function preloadWordsAudio(words: string[]): void {
  words.forEach(word => preloadWordAudio(word));
}

/**
 * Check if a word's audio is loaded
 * @param word The word to check
 * @returns boolean indicating if the audio is loaded
 */
export function isWordAudioLoaded(word: string): boolean {
  if (!word) return false;
  
  const safeWord = word.toLowerCase().trim();
  const audioPath = `/audio/words/${safeWord}.mp3`;
  
  return audioManager.isSoundLoaded(audioPath) || 
         (window.speechSynthesis && window.speechSynthesis.getVoices().length > 0);
}
