// utils/audio.js

/**
 * AudioManager - Handles all audio operations for the application
 * Features:
 * - Background music with crossfade
 * - Sound effects with pooling
 * - Volume controls per category
 * - Mute controls
 * - Persistent settings
 * - Error handling
 */
class AudioManager {
  constructor() {
    // Audio context for Web Audio API
    this.audioContext = null;
    
    // Sound storage
    this.sounds = new Map();
    this.musicTracks = new Map();
    this.activeSounds = new Set();
    this.activeMusic = null;
    
    // Audio settings with defaults
    this.settings = {
      musicVolume: 0.7,
      sfxVolume: 0.8,
      isMusicMuted: false,
      areSoundsMuted: false,
      musicFadeDuration: 1000, // ms
      maxConcurrentSounds: 10
    };
    
    this.initialize();
  }
  
  /**
   * Initialize audio context and load settings
   */
  initialize() {
    try {
      // Create audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioContext = new AudioContext();
        
        // Resume audio context on user interaction
        const resumeAudio = () => {
          if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
          }
          document.removeEventListener('click', resumeAudio);
          document.removeEventListener('keydown', resumeAudio);
        };
        
        document.addEventListener('click', resumeAudio, { once: true });
        document.addEventListener('keydown', resumeAudio, { once: true });
      }
      
      // Load settings from localStorage
      this.loadSettings();
    } catch (error) {
      console.error('Audio initialization error:', error);
    }
  }
  
  /**
   * Load settings from localStorage
   */
  loadSettings() {
    if (typeof window === 'undefined' || !window.localStorage) return;
    
    try {
      const savedSettings = {
        musicVolume: localStorage.getItem('musicVolume'),
        sfxVolume: localStorage.getItem('sfxVolume'),
        isMusicMuted: localStorage.getItem('isMusicMuted'),
        areSoundsMuted: localStorage.getItem('areSoundsMuted')
      };
      
      // Apply saved settings or keep defaults
      Object.keys(savedSettings).forEach(key => {
        if (savedSettings[key] !== null) {
          this.settings[key] = 
            typeof this.settings[key] === 'boolean'
              ? savedSettings[key] === 'true'
              : parseFloat(savedSettings[key]);
        }
      });
    } catch (error) {
      console.error('Error loading audio settings:', error);
    }
  }
  
  /**
   * Save settings to localStorage
   */
  saveSettings() {
    if (typeof window === 'undefined' || !window.localStorage) return;
    
    try {
      Object.entries({
        musicVolume: this.settings.musicVolume,
        sfxVolume: this.settings.sfxVolume,
        isMusicMuted: this.settings.isMusicMuted,
        areSoundsMuted: this.settings.areSoundsMuted
      }).forEach(([key, value]) => {
        localStorage.setItem(key, value.toString());
      });
    } catch (error) {
      console.error('Error saving audio settings:', error);
    }
  }
  
  /**
   * Preload a sound effect
   * @param {string} key - Unique identifier for the sound
   * @param {string} path - Path to the audio file
   * @returns {Promise<AudioBuffer>}
   */
  async loadSound(key, path) {
    if (this.sounds.has(key)) return this.sounds.get(key);
    
    try {
      const response = await fetch(path);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.sounds.set(key, audioBuffer);
      return audioBuffer;
    } catch (error) {
      console.error(`Error loading sound ${key}:`, error);
      throw error;
    }
  }
  
  /**
   * Preload a music track
   * @param {string} key - Unique identifier for the track
   * @param {string} path - Path to the audio file
   * @returns {Promise<AudioBuffer>}
   */
  async loadMusic(key, path) {
    if (this.musicTracks.has(key)) return this.musicTracks.get(key);
    
    try {
      const response = await fetch(path);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.musicTracks.set(key, audioBuffer);
      return audioBuffer;
    } catch (error) {
      console.error(`Error loading music ${key}:`, error);
      throw error;
    }
  }
  
  /**
   * Play a sound effect
   * @param {string} key - Sound identifier
   * @param {Object} options - Playback options
   * @returns {AudioBufferSourceNode|null}
   */
  playSound(key, { 
    volume = 1, 
    loop = false, 
    playbackRate = 1.0,
    onEnded = null 
  } = {}) {
    if (this.settings.areSoundsMuted || !this.audioContext) return null;
    
    // Clean up finished sounds
    this.cleanupFinishedSounds();
    
    // Limit concurrent sounds
    if (this.activeSounds.size >= this.settings.maxConcurrentSounds) {
      console.warn('Maximum concurrent sounds reached');
      return null;
    }
    
    const audioBuffer = this.sounds.get(key);
    if (!audioBuffer) {
      console.warn(`Sound not found: ${key}`);
      return null;
    }
    
    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = audioBuffer;
      source.playbackRate.value = playbackRate;
      source.loop = loop;
      
      // Set initial volume
      gainNode.gain.value = this.settings.sfxVolume * volume;
      
      // Connect nodes: source -> gain -> destination
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Start playback
      source.start();
      
      // Handle sound end
      const onEnd = () => {
        source.stop();
        gainNode.disconnect();
        source.disconnect();
        this.activeSounds.delete(source);
        if (typeof onEnded === 'function') onEnded();
      };
      
      source.onended = onEnd;
      this.activeSounds.add(source);
      
      return {
        source,
        gainNode,
        stop: () => {
          if (source) {
            source.stop();
            onEnd();
          }
        },
        setVolume: (newVolume) => {
          if (gainNode) {
            gainNode.gain.value = this.settings.sfxVolume * newVolume;
          }
        }
      };
    } catch (error) {
      console.error(`Error playing sound ${key}:`, error);
      return null;
    }
  }
  
  /**
   * Play background music with crossfade
   * @param {string} key - Music track identifier
   * @param {Object} options - Playback options
   */
  playMusic(key, { fadeIn = true, loop = true } = {}) {
    if (this.settings.isMusicMuted || !this.audioContext) return;
    
    const audioBuffer = this.musicTracks.get(key);
    if (!audioBuffer) {
      console.warn(`Music track not found: ${key}`);
      return;
    }
    
    // Stop current music with fade out
    if (this.activeMusic) {
      this.stopMusic({ fadeOut: true });
    }
    
    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = audioBuffer;
      source.loop = loop;
      
      // Set initial volume
      const initialVolume = fadeIn ? 0 : this.settings.musicVolume;
      gainNode.gain.value = initialVolume;
      
      // Connect nodes
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Start playback
      source.start();
      
      // Fade in if needed
      if (fadeIn) {
        gainNode.gain.linearRampToValueAtTime(
          this.settings.musicVolume,
          this.audioContext.currentTime + (this.settings.musicFadeDuration / 1000)
        );
      }
      
      // Store active music
      this.activeMusic = { source, gainNode };
      
    } catch (error) {
      console.error(`Error playing music ${key}:`, error);
    }
  }
  
  /**
   * Stop currently playing music
   * @param {Object} options - Stop options
   */
  stopMusic({ fadeOut = true } = {}) {
    if (!this.activeMusic) return;
    
    const { source, gainNode } = this.activeMusic;
    
    try {
      if (fadeOut && this.audioContext) {
        // Fade out and then stop
        gainNode.gain.linearRampToValueAtTime(
          0,
          this.audioContext.currentTime + (this.settings.musicFadeDuration / 1000)
        );
        
        // Schedule stop after fade out
        setTimeout(() => {
          if (source) {
            source.stop();
            this.cleanupMusic();
          }
        }, this.settings.musicFadeDuration);
      } else {
        // Stop immediately
        source.stop();
        this.cleanupMusic();
      }
    } catch (error) {
      console.error('Error stopping music:', error);
      this.cleanupMusic();
    }
  }
  
  /**
   * Clean up music resources
   */
  /**
   * Clean up music resources
   * @private
   */
  cleanupMusic() {
    if (!this.activeMusic) return;
    
    const { source, gainNode } = this.activeMusic;
    
    if (source) {
      try { 
        source.stop(); 
      } catch (error) {
        console.error('Error stopping music source:', error);
      }
      try { 
        source.disconnect(); 
      } catch (error) {
        console.error('Error disconnecting music source:', error);
      }
    }
    
    if (gainNode) {
      try { 
        gainNode.disconnect(); 
      } catch (error) {
        console.error('Error disconnecting gain node:', error);
      }
    }
    
    this.activeMusic = null;
  }
  
  /**
   * Clean up finished sounds
   */
  /**
   * Clean up finished sounds from the active sounds set
   * @private
   */
  cleanupFinishedSounds() {
    const finishedSounds = [];
    
    // First, collect finished sounds
    for (const sound of this.activeSounds) {
      if (sound.playbackState === sound.FINISHED_STATE) {
        finishedSounds.push(sound);
      }
    }
    
    // Then remove and clean them up
    for (const sound of finishedSounds) {
      try {
        sound.disconnect();
        this.activeSounds.delete(sound);
      } catch (error) {
        console.error('Error cleaning up finished sound:', error);
      }
    }
  }
  
  /**
   * Set music volume (0-1)
   * @param {number} volume - Volume level (0-1)
   */
  setMusicVolume(volume) {
    const newVolume = Math.max(0, Math.min(1, volume));
    this.settings.musicVolume = newVolume;
    
    if (this.activeMusic?.gainNode) {
      this.activeMusic.gainNode.gain.value = newVolume;
    }
    
    this.saveSettings();
  }
  
  /**
   * Set SFX volume (0-1)
   * @param {number} volume - Volume level (0-1)
   */
  setSfxVolume(volume) {
    this.settings.sfxVolume = Math.max(0, Math.min(1, volume));
    this.saveSettings();
  }
  
  /**
   * Toggle music mute state
   */
  toggleMusicMute() {
    this.settings.isMusicMuted = !this.settings.isMusicMuted;
    
    if (this.activeMusic?.gainNode) {
      this.activeMusic.gainNode.gain.value = this.settings.isMusicMuted 
        ? 0 
        : this.settings.musicVolume;
    }
    
    this.saveSettings();
  }
  
  /**
   * Toggle SFX mute state
   */
  toggleSfxMute() {
    this.settings.areSoundsMuted = !this.settings.areSoundsMuted;
    this.saveSettings();
  }
  
  /**
   * Stop all sounds and music
   */
  stopAll() {
    // Stop music
    this.stopMusic({ fadeOut: false });
    
    // Stop all active sounds
    for (const sound of this.activeSounds) {
      try {
        sound.stop();
        sound.disconnect();
      } catch (e) {
        console.error('Error stopping sound:', e);
      }
    }
    
    this.activeSounds.clear();
  }
  
  /**
   * Clean up all resources
   */
  destroy() {
    this.stopAll();
    
    // Clear caches
    this.sounds.clear();
    this.musicTracks.clear();
    
    // Close audio context if possible
    if (this.audioContext?.state !== 'closed') {
      this.audioContext?.close();
    }
  }
  /**
   * Toggle mute state for all audio
   * @returns {boolean} New mute state (true if muted, false otherwise)
   */
  toggleMute() {
    const muted = this.settings.isMusicMuted && this.settings.areSoundsMuted;
    this.settings.isMusicMuted = !muted;
    this.settings.areSoundsMuted = !muted;
    
    // Update audio context based on mute state
    if (this.activeMusic?.gainNode) {
      this.activeMusic.gainNode.gain.value = this.settings.isMusicMuted 
        ? 0 
        : this.settings.musicVolume;
    }
    
    this.saveSettings();
    return muted;
  }
}

export const audioManager = new AudioManager();
