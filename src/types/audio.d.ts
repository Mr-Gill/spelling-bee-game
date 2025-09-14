declare module '../utils/audio.ts' {
  export interface AudioSettings {
    areSoundsMuted: boolean;
    isMusicMuted: boolean;
    sfxVolume: number;
    musicVolume: number;
  }

  export interface AudioManager {
    settings: AudioSettings;
    activeMusic: { key: string } | null;
    
    // Sound effects
    playSound(key: string, options?: { volume?: number; loop?: boolean }): void;
    stopSound(key: string): void;
    setSfxVolume(volume: number): void;
    
    // Music
    playMusic(key: string, options?: { volume?: number; fadeIn?: boolean }): void;
    stopMusic(fadeOut?: boolean): void;
    pauseMusic(): void;
    resumeMusic(): void;
    setMusicVolume(volume: number): void;
    
    // Settings
    toggleMute(): void;
    toggleMusic(): void;
    saveSettings(): void;
  }

  const audioManager: AudioManager;
  export default audioManager;
  export type { AudioSettings };
}
