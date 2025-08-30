import { useEffect, useRef, useCallback } from 'react';

/**
 * React hook to manage background music for the app.
 *
 * @param style The musical style to load.
 * @param variant Whether to use the vocal or instrumental audio files.
 * @param volume Playback volume (0-1).
 * @param enabled Whether music should be playing at all.
 * @param screen Which screen is currently active.
 */
const useMusic = (
  style: string,
  variant: 'instrumental' | 'vocal',
  volume: number,
  enabled: boolean,
  screen: 'menu' | 'game',
) => {
  const menuRef = useRef<Record<'instrumental' | 'vocal', HTMLAudioElement | null>>({
    instrumental: null,
    vocal: null,
  });
  const gameRef = useRef<Record<'instrumental' | 'vocal', HTMLAudioElement | null>>({
    instrumental: null,
    vocal: null,
  });
  const promptRef = useRef(false);

  const stop = useCallback(() => {
    (['instrumental', 'vocal'] as const).forEach((v) => {
      const menuAudio = menuRef.current[v];
      if (menuAudio) {
        menuAudio.pause();
        menuAudio.currentTime = 0;
      }
      const gameAudio = gameRef.current[v];
      if (gameAudio) {
        gameAudio.pause();
        gameAudio.currentTime = 0;
      }
    });
  }, []);

  const buildSrc = useCallback((trackStyle: string, trackVariant: 'instrumental' | 'vocal') => {
    const basePath = "audio/It's a Spelling Bee!";
    const variantSuffix = trackVariant === 'instrumental' ? ' Instrumental' : '';
    return `${basePath} (${trackStyle}${variantSuffix}).mp3`;
  }, []);

  const loadTracks = useCallback(
    (trackStyle: string) => {
      (['instrumental', 'vocal'] as const).forEach((trackVariant) => {
        const menuSrc = buildSrc(trackStyle, trackVariant);
        const gameSrc = buildSrc(trackStyle, trackVariant);

        const menuAudio = new Audio(menuSrc);
        menuAudio.loop = true;
        menuAudio.volume = volume;
        menuAudio.onerror = () => {
          console.warn(`Menu music file not found: ${menuSrc}`);
          menuRef.current[trackVariant] = null;
        };
        menuAudio.load();

        const gameAudio = new Audio(gameSrc);
        gameAudio.loop = true;
        gameAudio.volume = volume;
        gameAudio.onerror = () => {
          console.warn(`Gameplay music file not found: ${gameSrc}`);
          gameRef.current[trackVariant] = null;
        };
        gameAudio.load();

        menuRef.current[trackVariant] = menuAudio;
        gameRef.current[trackVariant] = gameAudio;
      });
    },
    [buildSrc, volume],
  );

  // Load tracks whenever style changes
  useEffect(() => {
    stop();
    loadTracks(style);
  }, [style, loadTracks, stop]);

  // Keep volumes in sync with state
  useEffect(() => {
    (['instrumental', 'vocal'] as const).forEach((v) => {
      if (menuRef.current[v]) menuRef.current[v]!.volume = volume;
      if (gameRef.current[v]) gameRef.current[v]!.volume = volume;
    });
  }, [volume]);

  // Play the correct track based on screen, variant, and enabled flag
  useEffect(() => {
    if (!enabled) {
      stop();
      return;
    }

    const refs = screen === 'menu' ? menuRef.current : gameRef.current;
    const track = refs[variant];
    stop();
    track?.play().catch(() => {
      if (promptRef.current) return;
      promptRef.current = true;
      const enable = () => {
        track.play().catch(() => {});
      };
      document.addEventListener('click', enable, { once: true });
      alert('Click anywhere to enable audio');
    });
  }, [screen, variant, enabled, stop]);

  // Clean up on unmount
  useEffect(() => () => stop(), [stop]);
};

export default useMusic;
