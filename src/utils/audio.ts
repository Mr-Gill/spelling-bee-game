// Audio utility file that re-exports the audio manager
import { audioManager } from './audioManager';
import type { AudioSettings } from './audioManager';

// Preload common sounds
const loadAudioAssets = () => {
  try {
    // Sound effects - using only the audio files that exist in the public directory
    audioManager.loadSound('ui_click', '/sounds/ui_click.mp3');
    audioManager.loadSound('correct', '/sounds/correct.mp3');
    audioManager.loadSound('wrong', '/sounds/wrong.mp3');
    
    // Music - using the correct file names from the public directory
    audioManager.loadMusic('background', '/music/background_music.mp3');
    audioManager.loadMusic('menu', '/music/menu_music.mp3');
  } catch (error) {
    console.error('Error loading audio assets:', error);
  }
};

// Load audio assets when the module is imported
if (typeof window !== 'undefined') {
  loadAudioAssets();
}

// Export the audio manager and types
export { audioManager };
export type { AudioSettings };
export default audioManager;
