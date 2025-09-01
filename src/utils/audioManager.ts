// Audio Manager Implementation
import { Howl, Howler } from 'howler';

const ensureAudioContext = () => {
  // Howler automatically creates context when needed
  // We just need to ensure it's available
  if (!Howler.ctx) {
    // Play silent sound to initialize audio context
    const silentSound = new Howl({ src: ['data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...'] });
    silentSound.play();
    silentSound.stop();
  }
  return Howler.ctx;
};

export interface SoundOptions {
  loop?: boolean;
  volume?: number;
  onend?: () => void;
  onerror?: (error: Error) => void;
  preload?: boolean;
  [key: string]: any; // Allow additional properties
}

interface Sound {
  key: string;
  sound: Howl;
  path: string;
}

export interface AudioSettings {
  areSoundsMuted: boolean;
  isMusicMuted: boolean;
  sfxVolume: number;
  musicVolume: number;
  wordVolume: number;
}

class AudioManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, Sound> = new Map();
  private music: Map<string, Howl> = new Map();
  private activeMusic: { key: string; instance: Howl } | null = null;

  constructor() {
    ensureAudioContext();
  }

  public settings: AudioSettings = {
    areSoundsMuted: false,
    isMusicMuted: false,
    sfxVolume: 0.7,
    musicVolume: 0.7,
    wordVolume: 1.0,
  };

  /**
   * Load a sound effect
   * @param key Unique identifier for the sound
   * @param src Path to the audio file
   * @param options Sound options
   */
  public loadSound(
    key: string,
    src: string,
    options: SoundOptions = {}
  ): void {
    if (this.sounds.has(key)) {
      return;
    }

    const {
      loop = false,
      volume = this.settings.sfxVolume,
      onend,
      onerror,
      preload = true,
    } = options;

    const sound = new Howl({
      src: [src],
      loop,
      volume,
      preload,
      onload: () => {
        console.log(`Sound loaded: ${key}`);
      },
      onloaderror: (_, error) => {
        console.error(`Error loading sound ${key}:`, error);
        if (onerror) onerror(new Error(`Failed to load sound: ${key}`));
      },
      onend: () => {
        if (onend) onend();
      },
      onplayerror: () => {
        const error = new Error(`Failed to play sound: ${key}`);
        console.error(error.message);
        if (onerror) onerror(error);
      },
    });

    this.sounds.set(key, { key, sound, path: src });
  }

  /**
   * Check if a sound is loaded
   * @param keyOrPath Sound key or path
   */
  public isSoundLoaded(keyOrPath: string): boolean {
    // Check by key
    const sound = this.sounds.get(keyOrPath);
    if (sound) {
      return sound.sound.state() === 'loaded';
    }

    // Check by path
    for (const snd of this.sounds.values()) {
      if (snd.path === keyOrPath) {
        return snd.sound.state() === 'loaded';
      }
    }

    return false;
  }

  /**
   * Get a sound by key
   * @param key Sound key
   */
  public getSound(key: string): Howl | undefined {
    return this.sounds.get(key)?.sound;
  }

  /**
   * Get a music track by key
   * @param key Music key
   */
  public getMusic(key: string): Howl | undefined {
    return this.music.get(key);
  }

  /**
   * Play a sound effect
   * @param keyOrPath Sound key or path
   * @param options Sound options
   * @returns Sound ID or null if failed
   */
  public playSound(
    keyOrPath: string,
    options: Omit<SoundOptions, 'preload'> = {}
  ): number | null {
    if (this.settings.areSoundsMuted) {
      return null;
    }

    const {
      loop = false,
      volume = this.settings.sfxVolume,
      onend,
      onerror,
    } = options;

    // Try to find by key first
    let sound = this.sounds.get(keyOrPath);

    // If not found by key, try to find by path
    if (!sound) {
      for (const [_, snd] of this.sounds) {
        if (snd.path === keyOrPath) {
          sound = snd;
          break;
        }
      }

      // If still not found, try to load it
      if (!sound) {
        this.loadSound(keyOrPath, keyOrPath, { ...options, preload: true });
        console.warn(`Sound not preloaded: ${keyOrPath}, attempting to load...`);
        return null;
      }
    }

    // Set volume and loop
    sound.sound.volume(volume);
    sound.sound.loop(loop);

    // Set up event handlers
    if (onend) {
      sound.sound.off('end');
      sound.sound.on('end', onend);
    }

    if (onerror) {
      sound.sound.off('loaderror');
      sound.sound.on('loaderror', (_, error) => onerror(new Error(`Failed to load sound: ${error}`)));
      sound.sound.off('playerror');
      sound.sound.on('playerror', () => onerror(new Error('Failed to play sound')));
    }

    // Play the sound
    const soundId = sound.sound.play();
    return soundId;
  }

  /**
   * Stop a playing sound
   * @param keyOrId Sound key or Howl instance ID
   */
  public stopSound(keyOrId: string | number): void {
    if (typeof keyOrId === 'number') {
      // Stop a specific sound by ID
      // We'll need to find the sound instance that contains this ID
      // and stop it directly
      for (const sound of this.sounds.values()) {
        // Try to stop the sound by ID
        sound.sound.stop(keyOrId);
      }
    } else {
      // Stop all sounds with this key
      const sound = this.sounds.get(keyOrId);
      if (sound) {
        sound.sound.stop();
      }
    }
  }

  /**
   * Load a music track
   * @param key Unique identifier for the music
   * @param src Path to the audio file
   * @param options Music options
   */
  public loadMusic(
    key: string,
    src: string,
    options: Omit<SoundOptions, 'volume'> = {}
  ): void {
    if (this.music.has(key)) {
      return;
    }

    const { loop = true, onend, onerror, preload = true } = options;

    const music = new Howl({
      src: [src],
      loop,
      volume: this.settings.musicVolume,
      preload,
      onload: () => {
        console.log(`Music loaded: ${key}`);
      },
      onloaderror: (_, error) => {
        console.error(`Error loading music ${key}:`, error);
        if (onerror) onerror(new Error(`Failed to load music: ${key}`));
      },
      onend: () => {
        if (onend) onend();
      },
      onplayerror: () => {
        const error = new Error(`Failed to play music: ${key}`);
        console.error(error.message);
        if (onerror) onerror(error);
      },
    });

    this.music.set(key, music);
  }

  /**
   * Play a music track
   * @param key Music key
   * @param options Music options
   * @returns Sound ID or null if failed
   */
  public playMusic(
    key: string,
    options: Omit<SoundOptions, 'preload' | 'volume'> = {}
  ): number | null {
    if (this.settings.isMusicMuted) {
      return null;
    }

    const { loop = true, onend, onerror } = options;
    const music = this.music.get(key);

    if (!music) {
      console.error(`Music not found: ${key}`);
      if (onerror) onerror(new Error(`Music not found: ${key}`));
      return null;
    }

    // Stop currently playing music if any
    this.stopMusic();

    // Set loop and volume
    music.loop(loop);
    music.volume(this.settings.musicVolume);

    // Set up event handlers
    if (onend) {
      music.off('end');
      music.on('end', onend);
    }

    if (onerror) {
      music.off('loaderror');
      music.on('loaderror', (_, error) => onerror(new Error(`Failed to load music: ${error}`)));
      music.off('playerror');
      music.on('playerror', () => onerror(new Error('Failed to play music')));
    }

    // Play the music
    const musicId = music.play();
    this.activeMusic = { key, instance: music };
    return musicId;
  }

  /**
   * Stop the currently playing music
   */
  public stopMusic(): void {
    if (this.activeMusic) {
      this.activeMusic.instance.stop();
      this.activeMusic = null;
    }
  }

  /**
   * Pause the currently playing music
   */
  public pauseMusic(): void {
    if (this.activeMusic) {
      this.activeMusic.instance.pause();
    }
  }

  /**
   * Resume the currently paused music
   */
  public resumeMusic(): void {
    if (this.activeMusic && !this.activeMusic.instance.playing()) {
      this.activeMusic.instance.play();
    }
  }

  /**
   * Set the volume for sound effects
   * @param volume Volume level (0.0 to 1.0)
   */
  public setSfxVolume(volume: number): void {
    this.settings.sfxVolume = Math.max(0, Math.min(1, volume));
    Howler.volume(this.settings.sfxVolume);
  }

  /**
   * Set the volume for music
   * @param volume Volume level (0.0 to 1.0)
   */
  public setMusicVolume(volume: number): void {
    this.settings.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.activeMusic) {
      this.activeMusic.instance.volume(this.settings.musicVolume);
    }
  }

  /**
   * Toggle mute state for sound effects
   * @param muted Whether to mute or unmute
   */
  public toggleSounds(muted?: boolean): void {
    this.settings.areSoundsMuted = muted !== undefined ? muted : !this.settings.areSoundsMuted;
    Howler.mute(this.settings.areSoundsMuted);
  }

  /**
   * Toggle mute state for music
   * @param muted Whether to mute or unmute
   */
  public toggleMusic(muted?: boolean): void {
    this.settings.isMusicMuted = muted !== undefined ? muted : !this.settings.isMusicMuted;
    if (this.activeMusic) {
      this.activeMusic.instance.mute(this.settings.isMusicMuted);
    }
  }

  /**
   * Load settings from localStorage
   */
  public loadSettings(): void {
    try {
      const savedSettings = localStorage.getItem('audioSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        this.settings = { ...this.settings, ...settings };

        // Apply loaded settings
        this.setSfxVolume(this.settings.sfxVolume);
        this.setMusicVolume(this.settings.musicVolume);

        if (this.settings.areSoundsMuted) {
          Howler.mute(true);
        }
      }
    } catch (error) {
      console.error('Error loading audio settings:', error);
    }
  }

  /**
   * Save settings to localStorage
   */
  public saveSettings(): void {
    try {
      localStorage.setItem('audioSettings', JSON.stringify(this.settings));
    } catch (error) {
      console.error('Error saving audio settings:', error);
    }
  }
}

// Create and export the audio manager instance
export const audioManager = new AudioManager();

// Load settings when the module is imported
audioManager.loadSettings();

export default audioManager;
