// Audio Manager Implementation
import { Howl, Howler } from 'howler';

interface Sound {
  key: string;
  sound: Howl;
}

export interface AudioSettings {
  areSoundsMuted: boolean;
  isMusicMuted: boolean;
  sfxVolume: number;
  musicVolume: number;
}

class AudioManager {
  private sounds: Map<string, Sound> = new Map();
  private music: Map<string, Howl> = new Map();
  private activeMusic: { key: string; instance: Howl } | null = null;
  
  public settings: AudioSettings = {
    areSoundsMuted: false,
    isMusicMuted: false,
    sfxVolume: 0.7,
    musicVolume: 0.7,
  };

  // Load a sound effect
  public loadSound(key: string, src: string, loop = false): void {
    const sound = new Howl({
      src: [src],
      loop,
      volume: this.settings.sfxVolume,
      onloaderror: (_, error) => {
        console.error(`Error loading sound ${key}:`, error);
      },
    });

    this.sounds.set(key, { key, sound });
  }

  // Get a sound by key
  public getSound(key: string): Howl | undefined {
    return this.sounds.get(key)?.sound;
  }

  // Get a music track by key
  public getMusic(key: string): Howl | undefined {
    return this.music.get(key);
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
    
    sound.play();
  }

  // Stop a sound effect
  public stopSound(key: string): void {
    const soundData = this.sounds.get(key);
    soundData?.sound.stop();
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
