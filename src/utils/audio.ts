// Audio utility file that re-exports the audio manager
import { audioManager } from './audioManager';
import type { AudioSettings } from './audioManager';

// Preload common sounds
const loadAudioAssets = () => {
  try {
    // Sound effects - using files served from /assets/audio/
    audioManager.loadSound('ui_click', '/assets/audio/letter-correct.mp3');
    audioManager.loadSound('correct', '/assets/audio/correct.mp3');
    audioManager.loadSound('wrong', '/assets/audio/wrong.mp3');
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
