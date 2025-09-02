import { useState, useEffect } from 'react';
import { loadAudioFiles } from './audioLoader';

/**
 * React hook to load and play an audio clip.
 * @returns Function to trigger the sound
 */
export default function useSound() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioBuffers, setAudioBuffers] = useState<Record<string, AudioBuffer>>({});

  useEffect(() => {
    const initAudio = async () => {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);
      
      const files = await loadAudioFiles();
      const buffers: Record<string, AudioBuffer> = {};
      
      for (const [key, url] of Object.entries(files)) {
        if (url) {
          const response = await fetch(url);
          const arrayBuffer = await response.arrayBuffer();
          buffers[key] = await ctx.decodeAudioData(arrayBuffer);
        }
      }
      
      setAudioBuffers(buffers);
    };

    initAudio();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const playSound = (soundKey: string) => {
    if (!audioContext || !audioBuffers[soundKey]) return;
    
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffers[soundKey];
    source.connect(audioContext.destination);
    source.start(0);
  };

  return { playSound };
}
