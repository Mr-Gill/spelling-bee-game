// components/AudioSettings.jsx
import React from 'react';
import { audioManager } from '../utils/audio';

export function AudioSettings() {
  const [musicVolume, setMusicVolume] = React.useState(audioManager.volume.music * 100);
  const [sfxVolume, setSfxVolume] = React.useState(audioManager.volume.sfx * 100);
  const [isMusicMuted, setIsMusicMuted] = React.useState(audioManager.isMusicMuted);
  const [areSoundsMuted, setAreSoundsMuted] = React.useState(audioManager.areSoundsMuted);

  const handleMusicVolumeChange = (e) => {
    const volume = parseInt(e.target.value) / 100;
    setMusicVolume(volume * 100);
    audioManager.setMusicVolume(volume);
  };

  const handleSfxVolumeChange = (e) => {
    const volume = parseInt(e.target.value) / 100;
    setSfxVolume(volume * 100);
    audioManager.setSfxVolume(volume);
  };

  const toggleMusicMute = () => {
    const isPlaying = audioManager.toggleMusic();
    setIsMusicMuted(!isPlaying);
  };

  const toggleSoundsMute = () => {
    const isEnabled = audioManager.toggleSound();
    setAreSoundsMuted(!isEnabled);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-6">
        <h3 className="section-header">Audio Settings</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-white bg-opacity-80 rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">Music Volume</label>
            <button
              onClick={toggleMusicMute}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={isMusicMuted ? 'Unmute music' : 'Mute music'}
            >
              {isMusicMuted ? (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={musicVolume}
            onChange={handleMusicVolumeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isMusicMuted}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>{Math.round(musicVolume)}%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="bg-white bg-opacity-80 rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">Sound Effects</label>
            <button
              onClick={toggleSoundsMute}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={areSoundsMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            >
              {areSoundsMuted ? (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072" />
                </svg>
              )}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sfxVolume}
            onChange={handleSfxVolumeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={areSoundsMuted}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>{Math.round(sfxVolume)}%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">Audio settings are saved automatically</p>
      </div>
    </div>
  );
}
