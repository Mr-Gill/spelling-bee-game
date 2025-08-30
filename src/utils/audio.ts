// Audio utility file that re-exports the audio manager
import { audioManager } from './audioManager';
import type { AudioSettings } from './audioManager';

// Preload common sounds
const loadAudioAssets = () => {
  try {
    // Sound effects
    audioManager.loadSound('ui_click', '/sounds/click.mp3');
    audioManager.loadSound('correct', '/sounds/correct.mp3');
    audioManager.loadSound('wrong', '/sounds/wrong.mp3');
    audioManager.loadSound('letter_correct', '/sounds/letter-correct.mp3');
    audioManager.loadSound('letter_wrong', '/sounds/letter-wrong.mp3');
    
    // Music
    audioManager.loadMusic('background', '/music/background.mp3');
    audioManager.loadMusic('menu', '/music/menu.mp3');
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
