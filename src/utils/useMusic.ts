import { useState, useEffect, useRef } from 'react';

// Validate volume to be between 0 and 1 and finite
const validateVolume = (volume: number) => {
  return Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : 0.5;
};

// Check if the audio file is valid
const checkAudioFile = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.startsWith('audio/')) {
      throw new Error('Invalid audio content type');
    }
    return true;
  } catch (error) {
    console.error(`Audio file validation failed for ${url}:`, error);
    return false;
  }
};

type MusicGenre = 'Funk' | 'Country' | 'Deep Bass' | 'Rock' | 'Jazz' | 'Classical';
type TrackVariant = 'vocal' | 'instrumental';
type ScreenType = 'menu' | 'game';

const DEFAULT_GENRE: MusicGenre = 'Funk';

const useMusic = (
  musicStyle: string,
  trackVariant: TrackVariant,
  musicVolume: number,
  soundEnabled: boolean,
  screen: ScreenType
) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentVolume, setCurrentVolume] = useState<number>(validateVolume(musicVolume));
  const [currentTrack, setCurrentTrack] = useState<string>('');
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize audio context
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioContext();

    return () => {
      // Cleanup
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Function to build the correct audio file path
  const buildAudioPath = (style: string, variant: TrackVariant): string => {
    const genre = style as MusicGenre;
    const isInstrumental = variant === 'instrumental';
    const suffix = isInstrumental ? ' Instrumental' : '';
    return `/audio/It's a Spelling Bee! (${genre}${suffix}).mp3`;
  };

  // Effect to handle music changes based on screen and settings
  useEffect(() => {
    if (!soundEnabled) {
      stop();
      return;
    }

    const targetTrack = buildAudioPath(musicStyle, trackVariant);
    
    if (currentTrack !== targetTrack) {
      setCurrentTrack(targetTrack);
      if (isPlaying) {
        play(targetTrack);
      }
    }
  }, [musicStyle, trackVariant, soundEnabled, screen]);

  // Effect to handle volume changes
  useEffect(() => {
    setCurrentVolume(validateVolume(musicVolume));
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = validateVolume(musicVolume);
    }
  }, [musicVolume]);

  // Auto-start music when enabled
  useEffect(() => {
    if (soundEnabled && currentTrack && !isPlaying) {
      play(currentTrack);
    }
  }, [soundEnabled, currentTrack]);

  const loadAudio = async (url: string) => {
    if (!audioContextRef.current) return null;

    try {
      // Validate the audio file first
      const isValid = await checkAudioFile(url);
      if (!isValid) {
        throw new Error(`Invalid audio file: ${url}`);
      }

      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return await audioContextRef.current.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error('Error loading audio:', error);
      return null;
    }
  };

  const play = async (url: string) => {
    if (!audioContextRef.current) return;

    // Stop any currently playing audio
    stop();

    // Load new audio
    const audioBuffer = await loadAudio(url);
    if (!audioBuffer) return;

    audioBufferRef.current = audioBuffer;

    // Create and configure nodes
    sourceNodeRef.current = audioContextRef.current.createBufferSource();
    sourceNodeRef.current.buffer = audioBufferRef.current;

    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.gain.value = currentVolume;

    // Connect nodes
    sourceNodeRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContextRef.current.destination);

    // Start playing
    sourceNodeRef.current.start(0);
    setIsPlaying(true);

    // Handle end of playback
    sourceNodeRef.current.onended = () => {
      setIsPlaying(false);
    };
  };

  const stop = () => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  const setVolume = (newVolume: number) => {
    const validatedVolume = validateVolume(newVolume);
    setCurrentVolume(validatedVolume);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = validatedVolume;
    }
  };

  // The hook is used as a side effect, so we can return minimal info for debugging
  return {
    isPlaying,
    currentTrack,
    volume: currentVolume,
  };
};

export default useMusic;
