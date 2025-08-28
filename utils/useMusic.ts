import { useEffect, useRef } from 'react';

/**
 * React hook for background music playback with seamless style switching.
 * It preserves the playback position when changing between vocal and
 * instrumental tracks of the same style.
 *
 * @param style   Music style identifier (e.g. "Funk")
 * @param variant "vocal" or "instrumental" track variant
 * @param volume  Volume between 0 and 1
 * @param enabled Whether music should play
 */
export default function useMusic(
  style: string,
  variant: 'vocal' | 'instrumental',
  volume: number,
  enabled: boolean = true
) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeRef = useRef(0);

  // Load and switch tracks when style or variant changes
  useEffect(() => {
    // remember current time of previous track
    if (audioRef.current) {
      timeRef.current = audioRef.current.currentTime;
      audioRef.current.pause();
    }

    const fileName = `It's a Spelling Bee! (${style}${
      variant === 'instrumental' ? ' Instrumental' : ''
    }).mp3`;
    const src = `audio/${encodeURIComponent(fileName)}`;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audio.currentTime = timeRef.current;
    if (enabled) audio.play();
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, [style, variant]);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Enable/disable playback
  useEffect(() => {
    if (!audioRef.current) return;
    if (enabled) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [enabled]);
}

