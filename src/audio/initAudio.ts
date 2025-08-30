import { audioManager } from '../utils/audio';

// Sound effects mapping
const SOUND_EFFECTS = {
  // UI Sounds
  'ui/click': '/audio/ui/ui_click.mp3',
  'ui/back': '/audio/ui/ui_back.mp3',
  'ui/select': '/audio/ui/ui_select.mp3',
  'ui/next': '/audio/ui/ui_next.mp3',
  'ui/start': '/audio/ui/ui_start.mp3',
  'ui/submit': '/audio/ui/ui_submit.mp3',
  
  // Feedback Sounds
  'feedback/correct': '/audio/feedback/correct.mp3',
  'feedback/wrong': '/audio/feedback/wrong.mp3',
  'feedback/level_up': '/audio/feedback/level_up.mp3',
  'feedback/great_job': '/audio/feedback/great_job.mp3',
  'feedback/try_again': '/audio/feedback/try_again.mp3',
  'feedback/perfect': '/audio/feedback/perfect.mp3',
  
  // Game Sounds
  'game/page_turn': '/audio/sfx/page_turn.mp3',
  'game/success': '/audio/sfx/success.mp3'
};

// Music tracks
const MUSIC_TRACKS = {
  'background': '/audio/music/background_music.mp3',
  'menu': '/audio/music/menu_music.mp3'
};

// Load all audio files
function loadAudioFiles() {
  // Load sound effects
  Object.entries(SOUND_EFFECTS).forEach(([key, path]) => {
    audioManager.loadSound(key, path);
  });
  
  // Load music tracks
  Object.entries(MUSIC_TRACKS).forEach(([key, path]) => {
    audioManager.loadMusic(key, path);
  });
}

// Export a function to preload all audio
export const preloadAudio = async (): Promise<void> => {
  // Load all audio files
  loadAudioFiles();
  
  // Preload sounds
  await Promise.all([
    ...Object.keys(SOUND_EFFECTS).map(key => 
      new Promise<void>((resolve) => {
        const sound = audioManager.getSound(key);
        if (sound) {
          sound.once('load', () => resolve());
          sound.once('loaderror', () => {
            console.warn(`Failed to load sound: ${key}`);
            resolve();
          });
        } else {
          console.warn(`Sound not found: ${key}`);
          resolve();
        }
      })
    ),
    
    // Preload music tracks
    ...Object.keys(MUSIC_TRACKS).map(key => 
      new Promise<void>((resolve) => {
        const music = audioManager.getMusic(key);
        if (music) {
          music.once('load', () => resolve());
          music.once('loaderror', () => {
            console.warn(`Failed to load music: ${key}`);
            resolve();
          });
        } else {
          console.warn(`Music not found: ${key}`);
          resolve();
        }
      })
    )
  ]);
  
  console.log('Audio preloading complete');
};

export default preloadAudio;
