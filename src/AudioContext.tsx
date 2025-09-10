import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AudioManager {
  muted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioManager | undefined>(undefined);

export const AudioProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [muted, setMuted] = useState(false);
  
  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <AudioContext.Provider value={{ muted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
