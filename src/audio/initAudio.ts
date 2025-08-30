import { audioManager } from '../utils/audio';

// Load sound effects
audioManager.loadSound('ui_click', '/sounds/ui_click.mp3');
audioManager.loadSound('correct', '/sounds/correct.mp3');
audioManager.loadSound('wrong', '/sounds/wrong.mp3');
audioManager.loadSound('level_up', '/sounds/level_up.mp3');

// Load music tracks
audioManager.loadMusic('background', '/music/background_music.mp3');
audioManager.loadMusic('menu', '/music/menu_music.mp3');

// Export a function to preload all audio
export const preloadAudio = async (): Promise<void> => {
  const sounds = ['ui_click', 'correct', 'wrong', 'level_up'];
  const musicTracks = ['background', 'menu'];
  
  // Preload sounds
  await Promise.all(sounds.map(key => 
    new Promise<void>((resolve) => {
      const sound = audioManager.getSound(key);
      if (sound) {
        sound.once('load', () => resolve());
      } else {
        resolve();
      }
    })
  ));
  
  // Preload music tracks
  await Promise.all(musicTracks.map(key => 
    new Promise<void>((resolve) => {
      const music = audioManager.getMusic(key);
      if (music) {
        music.once('load', () => resolve());
      } else {
        resolve();
      }
    })
  ));
};

export default preloadAudio;
