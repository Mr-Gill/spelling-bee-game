import { useRef, useCallback } from 'react';

/**
 * React hook to load and play an audio clip.
 * @param audioFile - The audio file URL/path
 * @param enabled - Whether audio is enabled
 * @returns Function to trigger the sound
 */
export default function useSound(audioFile: string, enabled: boolean = true) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element lazily
  if (!audioRef.current && audioFile) {
    audioRef.current = new Audio(audioFile);
    audioRef.current.preload = 'auto';
  }

  const playSound = useCallback(() => {
    if (!enabled || !audioRef.current) return;
    
    try {
      // Reset the audio to the beginning
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        // Silently handle audio play errors (common in browsers with autoplay restrictions)
        console.debug('Audio play failed:', error);
      });
    } catch (error) {
      console.debug('Audio play error:', error);
    }
  }, [enabled]);

  return playSound;
}
