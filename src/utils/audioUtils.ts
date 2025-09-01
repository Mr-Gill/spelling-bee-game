import { Howl } from 'howler';

const audioCache: Record<string, Howl> = {};

export const loadAudio = (src: string): Promise<Howl> => {
  return new Promise((resolve, reject) => {
    // Return cached audio if available
    if (audioCache[src]) {
      resolve(audioCache[src]);
      return;
    }

    const sound = new Howl({
      src: [src],
      html5: true, // Force HTML5 Audio for better streaming
      onload: () => {
        audioCache[src] = sound;
        resolve(sound);
      },
      onloaderror: (_, error) => {
        reject(error);
      }
    });
  });
};

// Preload critical sounds
export const preloadCriticalSounds = async () => {
  const criticalSounds = [
    '/sounds/correct.mp3',
    '/sounds/incorrect.mp3'
  ];
  
  await Promise.all(criticalSounds.map(loadAudio));
};

// Preload background music after initial render
export const preloadBackgroundMusic = async () => {
  const bgMusic = [
    '/sounds/background-music.mp3'
  ];
  
  // Load without blocking
  bgMusic.forEach(src => loadAudio(src).catch(console.error));
};
