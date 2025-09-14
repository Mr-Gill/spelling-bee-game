// hooks/useAudio.ts
import { useEffect, useRef } from 'react';
import { audioManager } from '../src/utils/audio';
import type { SoundOptions } from '../src/utils/audioManager';

interface UseAudioOptions extends Omit<SoundOptions, 'preload'> {
  playOnMount?: boolean;
}

type PlayOptions = Omit<SoundOptions, 'preload'>;

export function useAudio(
  key: string,
  { volume = 1, loop = false, playOnMount = false }: UseAudioOptions = {},
) {
  const audioRef = useRef<number | null>(null);

  const play = (options: PlayOptions = {}): number | null => {
    if (audioRef.current !== null) {
      audioManager.stopSound(audioRef.current);
      audioRef.current = null;
    }
    audioRef.current = audioManager.playSound(key, { volume, loop, ...options });
    return audioRef.current;
  };

  const stop = (): void => {
    if (audioRef.current !== null) {
      audioManager.stopSound(audioRef.current);
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
