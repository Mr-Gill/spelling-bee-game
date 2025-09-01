import { useEffect, useRef, useCallback, useState } from 'react';

type AudioContextType = typeof window.AudioContext | typeof window.webkitAudioContext;

interface UseMusicReturn {
  loadAudio: (url: string) => Promise<AudioBuffer | null>;
  initAudio: () => void;
  getAudioContext: () => AudioContext | null;
  stop: () => void;
  buildSrc: (trackStyle: string, trackVariant: 'instrumental' | 'vocal') => string;
  loadTracks: (trackStyle: string) => Promise<void>;
}

/**
 * React hook to manage background music for the app.
 *
 * @param style The musical style to load.
 * @param variant Whether to use the vocal or instrumental audio files.
 * @param volume Playback volume (0-1).
 * @param enabled Whether music should be playing at all.
 * @param screen Which screen is currently active.
 */
const useMusic = (
  style: string,
  variant: 'instrumental' | 'vocal',
  volume: number,
  enabled: boolean,
  screen: 'menu' | 'game',
): UseMusicReturn => {
  const menuRef = useRef<Record<'instrumental' | 'vocal', HTMLAudioElement | null>>({
    instrumental: null,
    vocal: null,
  });
  const gameRef = useRef<Record<'instrumental' | 'vocal', HTMLAudioElement | null>>({
    instrumental: null,
    vocal: null,
  });
  const promptRef = useRef(false);

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioBuffers, setAudioBuffers] = useState<Record<string, AudioBuffer>>({});

  const stop = useCallback(() => {
    (['instrumental', 'vocal'] as const).forEach((v) => {
      const menuAudio = menuRef.current[v];
      if (menuAudio) {
        menuAudio.pause();
        menuAudio.currentTime = 0;
      }
      const gameAudio = gameRef.current[v];
      if (gameAudio) {
        gameAudio.pause();
        gameAudio.currentTime = 0;
      }
    });
  }, []);

  const buildSrc = useCallback((trackStyle: string, trackVariant: 'instrumental' | 'vocal') => {
    const basePath = "audio/It's a Spelling Bee!";
    const variantSuffix = trackVariant === 'instrumental' ? ' Instrumental' : '';
    // Map 'default' style to 'Country' since we don't have default versions
    const style = trackStyle === 'default' ? 'Country' : trackStyle;
    return `${basePath} (${style}${variantSuffix}).mp3`;
  }, []);

  const loadAudio = useCallback(async (url: string): Promise<AudioBuffer | null> => {
    const ctx = getAudioContext();
    if (!ctx) return null;
    
    if (audioBuffers[url]) return audioBuffers[url];

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await ctx.decodeAudioData(arrayBuffer);
      if (buffer) {
        setAudioBuffers(prev => ({ ...prev, [url]: buffer }));
      }
      return buffer;
    } catch (error) {
      console.error('Failed to load audio:', error);
      return null;
    }
  }, [audioBuffers, getAudioContext]);

  const loadTracks = useCallback(
    async (trackStyle: string) => {
      (['instrumental', 'vocal'] as const).forEach(async (trackVariant) => {
        const menuSrc = buildSrc(trackStyle, trackVariant);
        const gameSrc = buildSrc(trackStyle, trackVariant);

        const menuBuffer = await loadAudio(menuSrc);
        const gameBuffer = await loadAudio(gameSrc);

        if (menuBuffer) {
          const menuAudio = new Audio();
          menuAudio.loop = true;
          menuAudio.volume = volume;
          menuAudio.onerror = () => {
            console.warn(`Menu music file not found: ${menuSrc}`);
            menuRef.current[trackVariant] = null;
          };
          menuAudio.srcObject = menuBuffer;
          menuRef.current[trackVariant] = menuAudio;
        }

        if (gameBuffer) {
          const gameAudio = new Audio();
          gameAudio.loop = true;
          gameAudio.volume = volume;
          gameAudio.onerror = () => {
            console.warn(`Gameplay music file not found: ${gameSrc}`);
            gameRef.current[trackVariant] = null;
          };
          gameAudio.srcObject = gameBuffer;
          gameRef.current[trackVariant] = gameAudio;
        }
      });
    },
    [buildSrc, loadAudio, volume],
  );

  // Initialize AudioContext on user interaction
  const initAudio = useCallback(() => {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      setAudioContext(new AudioCtx());
    }
  }, [audioContext]);

  // Load tracks whenever style changes
  useEffect(() => {
    stop();
    loadTracks(style);
  }, [style, loadTracks, stop]);

  // Keep volumes in sync with state
  useEffect(() => {
    (['instrumental', 'vocal'] as const).forEach((v) => {
      if (menuRef.current[v]) menuRef.current[v]!.volume = volume;
      if (gameRef.current[v]) gameRef.current[v]!.volume = volume;
    });
  }, [volume]);

  // Play the correct track based on screen, variant, and enabled flag
  useEffect(() => {
    if (!enabled) {
      stop();
      return;
    }

    const refs = screen === 'menu' ? menuRef.current : gameRef.current;
    const track = refs[variant];
    stop();
    track?.play().catch(() => {
      if (promptRef.current) return;
      promptRef.current = true;
      const enable = () => {
        track.play().catch(() => {});
      };
      document.addEventListener('click', enable, { once: true });
      alert('Click anywhere to enable audio');
    });
  }, [screen, variant, enabled, stop]);

  // Clean up on unmount
  useEffect(() => () => stop(), [stop]);

  const getAudioContext = () => audioContext;

  return { loadAudio, initAudio, getAudioContext, stop, buildSrc, loadTracks };
};

export default useMusic;
