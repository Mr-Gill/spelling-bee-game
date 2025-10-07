import { useEffect, useMemo, useRef, useState } from 'react';
import type { Howl } from 'howler';
import { audioManager } from './audio.ts';
import { musicFiles, DEFAULT_STYLE } from '../constants';

type TrackVariant = 'vocal' | 'instrumental';
type ScreenType = 'menu' | 'game';

type MusicKey = keyof typeof musicFiles;

// Validate volume to be between 0 and 1 and finite
const validateVolume = (volume: number) => {
  return Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : 0.5;
};

const buildTrackKey = (style: string, variant: TrackVariant): MusicKey => {
  const normalizedStyle = style?.toLowerCase().replace(/\s+/g, '_') || DEFAULT_STYLE;
  const candidateKey = (variant === 'instrumental'
    ? `${normalizedStyle}_instrumental`
    : normalizedStyle) as MusicKey;

  if (musicFiles[candidateKey]) {
    return candidateKey;
  }

  const fallback = (variant === 'instrumental'
    ? `${DEFAULT_STYLE}_instrumental`
    : DEFAULT_STYLE) as MusicKey;

  return fallback;
};

const registerPlaybackListeners = (
  howl: Howl | undefined,
  onPlay: () => void,
  onStop: () => void
) => {
  if (!howl) {
    return () => {};
  }

  howl.on('play', onPlay);
  howl.on('stop', onStop);
  howl.on('pause', onStop);
  howl.on('end', onStop);

  return () => {
    howl.off('play', onPlay);
    howl.off('stop', onStop);
    howl.off('pause', onStop);
    howl.off('end', onStop);
  };
};

const useMusic = (
  musicStyle: string = DEFAULT_STYLE,
  trackVariant: TrackVariant = 'vocal',
  musicVolume: number = 0.7,
  soundEnabled: boolean = true,
  screen: ScreenType = 'menu',
  shouldPlay: boolean = true
) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentVolume, setCurrentVolume] = useState<number>(validateVolume(musicVolume));
  const [currentTrack, setCurrentTrack] = useState<string>('');
  const previousTrackKey = useRef<MusicKey | null>(null);

  const trackKey = useMemo(
    () => buildTrackKey(musicStyle || DEFAULT_STYLE, trackVariant),
    [musicStyle, trackVariant]
  );

  useEffect(() => {
    const validatedVolume = validateVolume(musicVolume);
    setCurrentVolume(validatedVolume);
    audioManager.setMusicVolume(validatedVolume);
  }, [musicVolume]);

  useEffect(() => {
    const trackSource = musicFiles[trackKey];
    if (!trackSource) {
      setIsPlaying(false);
      return;
    }

    setCurrentTrack(trackSource);

    if (!soundEnabled || !shouldPlay) {
      audioManager.pauseMusic();
      setIsPlaying(false);
      return;
    }

    if (!audioManager.getMusic(trackKey)) {
      audioManager.loadMusic(trackKey, trackSource, { preload: true, loop: true });
    }

    const musicInstance = audioManager.getMusic(trackKey);
    const cleanupListeners = registerPlaybackListeners(
      musicInstance,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );

    // If the track changed, play the new one. Otherwise attempt to resume.
    if (previousTrackKey.current !== trackKey) {
      const id = audioManager.playMusic(trackKey, { loop: true });
      setIsPlaying(id !== null);
      previousTrackKey.current = trackKey;
    } else if (musicInstance && !musicInstance.playing()) {
      audioManager.resumeMusic();
    }

    return () => {
      cleanupListeners();

      if (screen === 'menu') {
        audioManager.stopMusic();
        previousTrackKey.current = null;
      }
    };
  }, [trackKey, soundEnabled, shouldPlay, screen]);

  return {
    isPlaying,
    currentTrack,
    volume: currentVolume,
  };
};

export default useMusic;
