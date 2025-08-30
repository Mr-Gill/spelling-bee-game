// utils/audio.js
class AudioManager {
  constructor() {
    this.sounds = {};
    this.masterVolume = 1;
    this.muted = false;
  }

  loadSound(key, path) {
    this.sounds[key] = new Audio(path);
  }

  play(key, { volume = 1, loop = false } = {}) {
    if (!this.sounds[key]) return;
    
    const sound = this.sounds[key].cloneNode();
    sound.volume = this.muted ? 0 : this.masterVolume * volume;
    sound.loop = loop;
    sound.play();
    return sound;
  }

  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  toggleMute() {
    this.muted = !this.muted;
  }
}

export const audioManager = new AudioManager();
