import { useEffect, useRef, useState, useCallback } from 'react';

// Default music style
const DEFAULT_STYLE = 'Funk';

/**
 * React hook to manage background music for the app.
 * Loads menu and gameplay tracks for a given style and
 * exposes controls to play, stop, change style and adjust volume.
 */
const useMusic = (initialStyle: string = DEFAULT_STYLE) => {
  const menuRef = useRef<HTMLAudioElement | null>(null);
  const gameRef = useRef<HTMLAudioElement | null>(null);

  const [style, setStyle] = useState(initialStyle);
  const [volume, setVolume] = useState(1);

  const stop = useCallback(() => {
    if (menuRef.current) {
      menuRef.current.pause();
      menuRef.current.currentTime = 0;
    }
    if (gameRef.current) {
      gameRef.current.pause();
      gameRef.current.currentTime = 0;
    }
  }, []);

  const loadTracks = useCallback((trackStyle: string) => {
    const basePath = "audio/It's a Spelling Bee!";
    const menuSrc = `${basePath} (${trackStyle}).mp3`;
    const gameSrc = `${basePath} (${trackStyle} Instrumental).mp3`;

    const menuAudio = new Audio(menuSrc);
    menuAudio.loop = true;
    menuAudio.volume = volume;
    menuAudio.onerror = () => {
      console.warn(`Menu music file not found: ${menuSrc}`);
      if (menuRef.current === menuAudio) menuRef.current = null;
    };

    const gameAudio = new Audio(gameSrc);
    gameAudio.loop = true;
    gameAudio.volume = volume;
    gameAudio.onerror = () => {
      console.warn(`Gameplay music file not found: ${gameSrc}`);
      if (gameRef.current === gameAudio) gameRef.current = null;
    };

    menuRef.current = menuAudio;
    gameRef.current = gameAudio;
  }, [volume]);

  useEffect(() => {
    loadTracks(style);
    return () => {
      stop();
    };
  }, [loadTracks, style, stop]);

  const playMenu = useCallback(() => {
    stop();
    menuRef.current?.play().catch(() => {});
  }, [stop]);

  const playGame = useCallback(() => {
    stop();
    gameRef.current?.play().catch(() => {});
  }, [stop]);

  const changeStyle = useCallback((newStyle: string) => {
    setStyle(newStyle);
  }, []);

  const changeVolume = useCallback((v: number) => {
    setVolume(v);
    if (menuRef.current) menuRef.current.volume = v;
    if (gameRef.current) gameRef.current.volume = v;
  }, []);

  return {
    playMenu,
    playGame,
    stop,
    setStyle: changeStyle,
    setVolume: changeVolume,
    style,
    volume,
  };
};

export default useMusic;
