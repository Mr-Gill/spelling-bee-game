import React, { createContext, useContext, ReactNode } from 'react';
import useMusic from './utils/useMusic';

interface AudioContextValue {
  playSound: (url: string) => Promise<void>;
  preloadSound: (url: string) => Promise<void>;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { loadAudio, initAudio, getAudioContext } = useMusic();
  
  const playSound = async (url: string): Promise<void> => {
    initAudio();
    const buffer = await loadAudio(url);
    const ctx = getAudioContext();
    if (buffer && ctx) {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    }
  };

  const preloadSound = async (url: string): Promise<void> => {
    initAudio();
    await loadAudio(url);
  };

  return (
    <AudioContext.Provider value={{ playSound, preloadSound }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextValue => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
