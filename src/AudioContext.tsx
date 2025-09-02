import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useMusic } from './utils/useMusic';
import { Howl } from 'howler';

interface AudioContextValue {
  playTitleMusic: (genre?: any) => void;
  playGameMusic: (genre?: any) => void;
  playSoundEffect: (effect: 'correct' | 'wrong' | 'win' | 'lose') => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentTrack, playTitleMusic, playGameMusic } = useMusic();
  
  // Initialize audio context and setup audio elements
  useEffect(() => {
    // Setup audio elements and event listeners
  }, [currentTrack]);

  const playSoundEffect = (effect: 'correct' | 'wrong' | 'win' | 'lose') => {
    const sound = new Howl({
      src: [`${process.env.PUBLIC_URL}/audio/${effect}.mp3`]
    });
    sound.play();
  };

  return (
    <AudioContext.Provider value={{ playTitleMusic, playGameMusic, playSoundEffect }}>
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
