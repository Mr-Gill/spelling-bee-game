// utils/audio.js

class AudioManager {
  constructor() {
    this.sounds = {};
    if (typeof window !== 'undefined' && window.localStorage) {
      this.volume = {
        music: parseFloat(localStorage.getItem('musicVolume') ?? '1'),
        sfx: parseFloat(localStorage.getItem('sfxVolume') ?? '1'),
      };
      this.isMusicMuted = localStorage.getItem('musicMuted') === 'true';
      this.areSoundsMuted = localStorage.getItem('soundsMuted') === 'true';
    } else {
      this.volume = { music: 1, sfx: 1 };
      this.isMusicMuted = false;
      this.areSoundsMuted = false;
    }
  }

  loadSound(key, path) {
    this.sounds[key] = new Audio(path);
  }

  playSound(key, { volume = 1, loop = false } = {}) {
    if (!this.sounds[key]) return null;

    const sound = this.sounds[key].cloneNode();
    const effectiveVolume = this.areSoundsMuted ? 0 : this.volume.sfx * volume;
    sound.volume = effectiveVolume;
    sound.loop = loop;
    sound.play();
    return sound;
  }

  setMusicVolume(volume) {
    this.volume.music = Math.max(0, Math.min(1, volume));
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('musicVolume', this.volume.music.toString());
    }
  }

  setSfxVolume(volume) {
    this.volume.sfx = Math.max(0, Math.min(1, volume));
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('sfxVolume', this.volume.sfx.toString());
    }
  }

  toggleMusic() {
    this.isMusicMuted = !this.isMusicMuted;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('musicMuted', this.isMusicMuted.toString());
    }
    return !this.isMusicMuted;
  }

  toggleSound() {
    this.areSoundsMuted = !this.areSoundsMuted;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('soundsMuted', this.areSoundsMuted.toString());
    }
    return !this.areSoundsMuted;
  }

  toggleMute() {
    const muted = this.isMusicMuted && this.areSoundsMuted;
    this.isMusicMuted = !muted;
    this.areSoundsMuted = !muted;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('musicMuted', this.isMusicMuted.toString());
      localStorage.setItem('soundsMuted', this.areSoundsMuted.toString());
    }
  }
}

export const audioManager = new AudioManager();
