import { useState, useEffect, useCallback, useRef } from 'react';
import { audioManager } from '../utils/audio';

export interface AudioPlayer {
  // State
  isMuted: boolean;
  isMusicMuted: boolean;
  volume: number;
  isPlaying: boolean;
  currentTrack: string | null;
  
  // Actions
  playSound: (key: string, options?: { volume?: number; loop?: boolean }) => void;
  playMusic: (key: string, options?: { volume?: number; fadeIn?: boolean }) => void;
  stopMusic: () => void;
  toggleMute: () => void;
  toggleMusic: () => void;
  setVolume: (volume: number) => void;
}

const DEFAULT_VOLUME = 0.7;

export const useAudioPlayer = (initialVolume = DEFAULT_VOLUME): AudioPlayer => {
  const [isMuted, setIsMuted] = useState(audioManager.settings.areSoundsMuted);
  const [isMusicMuted, setIsMusicMuted] = useState(audioManager.settings.isMusicMuted);
  const [volume, setVolume] = useState(initialVolume);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const settingsLoaded = useRef(false);

  // Initialize audio settings
  useEffect(() => {
    if (settingsLoaded.current) return;
    
    // Load saved settings from the audio manager
    const loadSettings = () => {
      try {
        const { sfxVolume, areSoundsMuted, isMusicMuted } = audioManager.settings;
        
        setVolume(sfxVolume);
        setIsMuted(areSoundsMuted);
        setIsMusicMuted(isMusicMuted);
        
        if (isMusicMuted && audioManager.activeMusic) {
          audioManager.stopMusic();
        }
      } catch (error) {
        console.error('Error loading audio settings:', error);
      } finally {
        settingsLoaded.current = true;
      }
    };
    
    loadSettings();
  }, []);

  // Play sound effect
  const playSound = useCallback((key: string, options: { volume?: number; loop?: boolean } = {}) => {
    if (isMuted) return null;
    try {
      return audioManager.playSound(key, {
        ...options,
        volume: volume * (options.volume ?? 1),
      });
    } catch (error) {
      console.error('Error playing sound:', error);
      return null;
    }
  }, [isMuted, volume]);

  // Play music track
  const playMusic = useCallback((key: string, options: { volume?: number; fadeIn?: boolean } = {}) => {
    if (isMusicMuted) {
      setCurrentTrack(key);
      setIsPlaying(false);
      return;
    }
    
    try {
      audioManager.playMusic(key, {
        ...options,
        volume: volume * (options.volume ?? 1),
      });
      
      setCurrentTrack(key);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing music:', error);
      setIsPlaying(false);
    }
  }, [isMusicMuted, volume]);

  // Stop music
  const stopMusic = useCallback(() => {
    try {
      audioManager.stopMusic();
      setIsPlaying(false);
      setCurrentTrack(null);
    } catch (error) {
      console.error('Error stopping music:', error);
    }
  }, []);

  // Toggle mute state
  const toggleMute = useCallback(() => {
    try {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      audioManager.settings.areSoundsMuted = newMuted;
      localStorage.setItem('isMuted', String(newMuted));
      
      // Play a sound when toggling mute (if not muting)
      if (!newMuted) {
        playSound('ui_click');
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  }, [isMuted, playSound]);

  // Toggle music state
  const toggleMusic = useCallback(() => {
    try {
      const newMusicMuted = !isMusicMuted;
      setIsMusicMuted(newMusicMuted);
      audioManager.settings.isMusicMuted = newMusicMuted;
      localStorage.setItem('isMusicMuted', String(newMusicMuted));

      if (newMusicMuted) {
        stopMusic();
      } else if (currentTrack) {
        playMusic(currentTrack, { fadeIn: true });
      }
      
      // Play a sound when toggling music (if not muting)
      if (!isMuted) {
        playSound('ui_click');
      }
    } catch (error) {
      console.error('Error toggling music:', error);
    }
  }, [currentTrack, isMusicMuted, isMuted, playMusic, stopMusic, playSound]);

  // Update volume
  const updateVolume = useCallback((newVolume: number) => {
    try {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      setVolume(clampedVolume);
      audioManager.setSfxVolume(clampedVolume);
      audioManager.setMusicVolume(clampedVolume);
      audioManager.saveSettings();
      
      // Play a sound when adjusting volume (if not muted)
      if (!isMuted) {
        playSound('ui_click', { volume: 0.3 });
      }
    } catch (error) {
      console.error('Error updating volume:', error);
    }
  }, [isMuted, playSound]);

  // Handle window focus/blur events
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause audio when tab is hidden
        if (currentTrack && isPlaying) {
          // Store current time and pause
          const audioElement = document.querySelector('audio');
          if (audioElement) {
            audioElement.pause();
          }
        }
      } else if (currentTrack && isPlaying) {
        // Resume audio when tab is visible again
        const audioElement = document.querySelector('audio');
        if (audioElement) {
          audioElement.play().catch(e => console.error('Error resuming audio:', e));
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Don't stop music on unmount, let it continue playing
    };
  }, [currentTrack, isPlaying]);

  return {
    // State
    isMuted,
    isMusicMuted,
    volume,
    isPlaying,
    currentTrack,
    
    // Actions
    playSound,
    playMusic,
    stopMusic,
    toggleMute,
    toggleMusic,
    setVolume: updateVolume,
  };
};
