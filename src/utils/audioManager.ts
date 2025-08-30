// Audio Manager Implementation
import { Howl, Howler } from 'howler';

export interface SoundOptions {
  loop?: boolean;
  volume?: number;
  onend?: () => void;
  onerror?: (error: any) => void;
  preload?: boolean;
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
  private sounds: Map<string, Sound> = new Map();
  private music: Map<string, Howl> = new Map();
  private activeMusic: { key: string; instance: Howl } | null = null;
  // AudioContext is reserved for future use
  // private globalAudioContext: AudioContext | null = null;
  
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
    const {
      loop = false,
      volume = this.settings.sfxVolume,
      onend,
      onerror,
      preload = true
    } = options;

    // Skip if already loaded
    if (this.sounds.has(key)) {
      return;
    }

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
        if (onerror) onerror(error);
      },
      onend: () => {
        if (onend) onend();
      },
      onplayerror: () => {
        console.error(`Error playing sound: ${key}`);
        if (onerror) onerror(new Error(`Failed to play sound: ${key}`));
      }
    });

    this.sounds.set(key, { key, sound, path: src });
  }

  /**
   * Check if a sound is loaded
   * @param key Sound key or path
   */
  public isSoundLoaded(keyOrPath: string): boolean {
    // Check by key first
    const sound = this.sounds.get(keyOrPath);
    if (sound) {
      return sound.sound.state() === 'loaded';
    }
    
    // Check by path
    for (const [_, snd] of this.sounds) {
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
   * @param key Sound key or path
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
      onerror
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
    
    try {
      // Update sound settings
      sound.sound.loop(loop);
      sound.sound.volume(volume);
      
      // Set up event handlers
      if (onend) {
        sound.sound.off('end');
        sound.sound.once('end', onend);
      }
      
      if (onerror) {
        sound.sound.off('loaderror');
        sound.sound.once('loaderror', (_, error) => onerror(error));
      }
      
      // Play the sound
      return sound.sound.play();
    } catch (error) {
      console.error(`Error playing sound ${keyOrPath}:`, error);
      if (onerror) onerror(error);
      return null;
    }
  }

  // Load a music track
  public loadMusic(key: string, src: string, loop = true): void {
    const music = new Howl({
      src: [src],
      loop,
      volume: this.settings.musicVolume,
      onloaderror: (_, error) => {
        console.error(`Error loading music ${key}:`, error);
      },
      onend: () => {
        if (this.activeMusic?.key === key) {
          this.activeMusic = null;
        }
      },
    });

    this.music.set(key, music);
  }

  // Play a sound effect
  public playSound(key: string, options: { volume?: number; loop?: boolean } = {}): void {
    if (this.settings.areSoundsMuted) return;

    const soundData = this.sounds.get(key);
    if (!soundData) {
      console.warn(`Sound ${key} not found`);
      return;
    }

    const { sound } = soundData;
    
    // Stop any existing instance of this sound
    sound.stop();
    
    // Update volume if provided
    if (options.volume !== undefined) {
      sound.volume(options.volume);
    }
    
    // Update loop setting if provided
    if (options.loop !== undefined) {
      sound.loop(options.loop);
    }
  }

  // Play music
  public playMusic(key: string, options: { volume?: number; fadeIn?: boolean } = {}): void {
    if (this.settings.isMusicMuted) return;

    const music = this.music.get(key);
    if (!music) {
      console.warn(`Music ${key} not found`);
      return;
    }

    // Stop currently playing music
    this.stopMusic();

    // Set volume
    const volume = options.volume ?? this.settings.musicVolume;
    
    if (options.fadeIn) {
      music.volume(0);
      music.play();
      music.fade(0, volume, 1000);
    } else {
      music.volume(volume);
      music.play();
    }

    this.activeMusic = { key, instance: music };
  }

  // Stop music
  public stopMusic(fadeOut = false): void {
    if (!this.activeMusic) return;

    const { instance } = this.activeMusic;
    
    if (fadeOut) {
      instance.fade(instance.volume(), 0, 1000);
      setTimeout(() => {
        instance.stop();
        this.activeMusic = null;
      }, 1000);
    } else {
      instance.stop();
      this.activeMusic = null;
    }
  }

  // Pause music
  public pauseMusic(): void {
    if (!this.activeMusic) return;
    this.activeMusic.instance.pause();
  }

  // Resume music
  public resumeMusic(): void {
    if (!this.activeMusic) return;
    this.activeMusic.instance.play();
  }

  // Set SFX volume
  public setSfxVolume(volume: number): void {
    this.settings.sfxVolume = volume;
    Howler.volume(volume);
  }

  // Set music volume
  public setMusicVolume(volume: number): void {
    this.settings.musicVolume = volume;
    if (this.activeMusic) {
      this.activeMusic.instance.volume(volume);
    }
  }

  // Toggle mute state
  public toggleMute(): void {
    this.settings.areSoundsMuted = !this.settings.areSoundsMuted;
    Howler.mute(this.settings.areSoundsMuted);
  }

  // Toggle music state
  public toggleMusic(): void {
    this.settings.isMusicMuted = !this.settings.isMusicMuted;
    
    if (this.settings.isMusicMuted) {
      this.pauseMusic();
    } else if (this.activeMusic) {
      this.resumeMusic();
    }
  }

  // Save settings to localStorage
  public saveSettings(): void {
    try {
      localStorage.setItem('audioSettings', JSON.stringify(this.settings));
    } catch (error) {
      console.error('Error saving audio settings:', error);
    }
  }

  // Load settings from localStorage
  public loadSettings(): void {
    try {
      const savedSettings = localStorage.getItem('audioSettings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        this.settings = { ...this.settings, ...parsedSettings };
        
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
}

// Create a singleton instance
export const audioManager = new AudioManager();

// Load settings when the module is imported
audioManager.loadSettings();

export default audioManager;
