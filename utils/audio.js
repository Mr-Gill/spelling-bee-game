// utils/audio.js
class AudioManager {
  constructor() {
    this.sounds = {};
    this.music = null;
    this.isMusicMuted = false;
    this.areSoundsMuted = false;
    this.volume = {
      music: 0.5,
      sfx: 0.7
    };
  }

  // Preload all audio files
  async preloadSounds(soundMap) {
    for (const [key, path] of Object.entries(soundMap)) {
      try {
        const audio = new Audio(path);
        await new Promise((resolve) => {
          audio.addEventListener('canplaythrough', resolve, { once: true });
          audio.load();
        });
        this.sounds[key] = audio;
      } catch (error) {
        console.warn(`Failed to load sound ${key}:`, error);
      }
    }
  }

  // Play a sound effect
  playSound(key, { volume = 1, loop = false } = {}) {
    if (this.areSoundsMuted) return null;

    const sound = this.sounds[key];
    if (!sound) {
      console.warn(`Sound "${key}" not found`);
      return null;
    }

    // Clone the audio element to allow overlapping sounds
    const audio = sound.cloneNode();
    audio.volume = this.volume.sfx * volume;
    audio.loop = loop;

    audio.play().catch(e => console.warn(`Could not play sound ${key}:`, e));
    return audio;
  }

  // Play background music
  playMusic(key, { loop = true, fadeIn = 1000 } = {}) {
    if (this.music) {
      this.stopMusic();
    }

    const music = this.sounds[key];
    if (!music) {
      console.warn(`Music "${key}" not found`);
      return;
    }

    this.music = music.cloneNode();
    this.music.volume = this.isMusicMuted ? 0 : this.volume.music;
    this.music.loop = loop;

    if (fadeIn > 0) {
      this.music.volume = 0;
      const fadeInInterval = setInterval(() => {
        if (this.music.volume < this.volume.music) {
          this.music.volume = Math.min(this.volume.music, this.music.volume + 0.1);
        } else {
          clearInterval(fadeInInterval);
        }
      }, fadeIn / 10);
    }

    this.music.play().catch(e => console.warn('Could not play music:', e));
  }

  // Stop music with optional fade out
  stopMusic(fadeOut = 500) {
    if (!this.music) return;

    if (fadeOut > 0) {
      const fadeOutInterval = setInterval(() => {
        if (this.music.volume > 0.1) {
          this.music.volume = Math.max(0, this.music.volume - 0.1);
        } else {
          this.music.pause();
          this.music.currentTime = 0;
          this.music = null;
          clearInterval(fadeOutInterval);
        }
      }, fadeOut / 10);
    } else {
      this.music.pause();
      this.music.currentTime = 0;
      this.music = null;
    }
  }

  // Toggle music on/off
  toggleMusic() {
    if (!this.music) return;

    this.isMusicMuted = !this.isMusicMuted;
    this.music.volume = this.isMusicMuted ? 0 : this.volume.music;
    return !this.isMusicMuted;
  }

  // Toggle sound effects on/off
  toggleSound() {
    this.areSoundsMuted = !this.areSoundsMuted;
    return !this.areSoundsMuted;
  }

  // Set music volume (0-1)
  setMusicVolume(volume) {
    this.volume.music = Math.max(0, Math.min(1, volume));
    if (this.music) {
      this.music.volume = this.volume.music;
    }
  }

  // Set sound effects volume (0-1)
  setSfxVolume(volume) {
    this.volume.sfx = Math.max(0, Math.min(1, volume));
  }
}

// Export a singleton instance
export const audioManager = new AudioManager();
