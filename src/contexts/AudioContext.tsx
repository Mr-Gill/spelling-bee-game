import React, { createContext, useContext, ReactNode } from 'react';
import { useAudioPlayer, type AudioPlayer } from '../hooks/useAudioPlayer';

// Create context with default values
const defaultAudioContext: AudioPlayer = {
  isMuted: false,
  isMusicMuted: false,
  volume: 0.7,
  isPlaying: false,
  currentTrack: null,
  playSound: () => null,
  playMusic: () => {},
  stopMusic: () => {},
  toggleMute: () => {},
  toggleMusic: () => {},
  setVolume: () => {},
};

const AudioContext = createContext<AudioPlayer>(defaultAudioContext);

interface AudioProviderProps {
  children: ReactNode;
  initialVolume?: number;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ 
  children, 
  initialVolume = 0.7 
}) => {
  const audio = useAudioPlayer(initialVolume);

  return (
    <AudioContext.Provider value={audio}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioPlayer => {
  const context = useContext(AudioContext);
  
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  
  return context;
};

export default AudioContext;
