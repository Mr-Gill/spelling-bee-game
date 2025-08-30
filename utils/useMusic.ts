import { useEffect, useRef, useCallback } from 'react';

/**
 * React hook to manage background music for the app.
 *
 * @param style The musical style to load.
 * @param variant Whether to play the vocal or instrumental version.
 * @param volume Playback volume (0-1).
 * @param enabled Whether music should be playing at all.
 */
const useMusic = (
  style: string,
  variant: 'instrumental' | 'vocal',
  volume: number,
  enabled: boolean,
) => {
  const menuRef = useRef<HTMLAudioElement | null>(null);
  const gameRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    if (menuRef.current) {
      menuRef.current.pause();
      menuRef.current.currentTime = 0;
    }
    if (gameRef.current) {
      gameRef.current.pause();
      gameRef.current.currentTime = 0;
    }
  }, []);

  const buildSrc = useCallback((trackStyle: string, trackVariant: 'instrumental' | 'vocal') => {
    const basePath = "audio/It's a Spelling Bee!";
    const variantSuffix = trackVariant === 'instrumental' ? ' Instrumental' : '';
    return `${basePath} (${trackStyle}${variantSuffix}).mp3`;
  }, []);

  const loadTracks = useCallback(
    (trackStyle: string, trackVariant: 'instrumental' | 'vocal') => {
      const menuSrc = buildSrc(trackStyle, trackVariant);
      const gameSrc = buildSrc(trackStyle, trackVariant);

      const menuAudio = new Audio(menuSrc);
      menuAudio.loop = true;
      menuAudio.volume = volume;
      menuAudio.onerror = () => {
        console.warn(`Menu music file not found: ${menuSrc}`);
        if (menuRef.current === menuAudio) menuRef.current = null;
      };

      const gameAudio = new Audio(gameSrc);
      gameAudio.loop = true;
      gameAudio.volume = volume;
      gameAudio.onerror = () => {
        console.warn(`Gameplay music file not found: ${gameSrc}`);
        if (gameRef.current === gameAudio) gameRef.current = null;
      };

      menuRef.current = menuAudio;
      gameRef.current = gameAudio;
    },
    [buildSrc, volume],
  );

  // Load tracks whenever style or variant changes
  useEffect(() => {
    stop();
    loadTracks(style, variant);
  }, [style, variant, loadTracks, stop]);

  // Keep volumes in sync with state
  useEffect(() => {
    if (menuRef.current) menuRef.current.volume = volume;
    if (gameRef.current) gameRef.current.volume = volume;
  }, [volume]);

  // Play the correct track based on variant and enabled flag
  useEffect(() => {
    if (!enabled) {
      stop();
      return;
    }

    const track = variant === 'instrumental' ? gameRef.current : menuRef.current;
    stop();
    track?.play().catch(() => {});
  }, [variant, enabled, stop]);

  // Clean up on unmount
  useEffect(() => () => stop(), [stop]);
};

export default useMusic;
