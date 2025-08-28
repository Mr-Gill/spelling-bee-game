import { useEffect, useRef, useCallback } from 'react';

/**
 * React hook to load and play an audio clip.
 * @param src Path to the audio file
 * @param enabled Whether audio should play
 * @returns Function to trigger the sound
 */
const useSound = (src: string, enabled: boolean = true) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
  }, [src]);

  const play = useCallback(() => {
    if (!enabled || !audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }, [enabled]);

  return play;
};

export default useSound;
