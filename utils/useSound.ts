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
    const audio = new Audio(src);
    audio.load();
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(() => {
    if (!enabled || !audioRef.current) return;
    audioRef.current.currentTime = 0;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  }, [enabled]);

  return play;
};

export default useSound;
