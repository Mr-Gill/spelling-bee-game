// hooks/useAudio.js
import { useEffect, useRef } from 'react';
import { audioManager } from '../utils/audio';

export function useAudio(key, { volume = 1, loop = false, playOnMount = false } = {}) {
  const audioRef = useRef(null);

  const play = (options = {}) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = audioManager.playSound(key, { volume, loop, ...options });
    return audioRef.current;
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  useEffect(() => {
    if (playOnMount) {
      play();
    }
    return stop;
  }, [key]);

  return { play, stop };
}
