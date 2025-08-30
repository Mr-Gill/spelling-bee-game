import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Volume1, Volume2 as Volume2Icon } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import { useClickAway } from '../hooks/useClickAway';

export const AudioControls: React.FC = () => {
  const {
    isMuted,
    isMusicMuted,
    volume,
    currentTrack,
    toggleMute,
    toggleMusic,
    setVolume,
    playSound
  } = useAudio();
  
  const [isOpen, setIsOpen] = useState(false);
  const [localVolume, setLocalVolume] = useState(volume);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useClickAway(dropdownRef, () => {
    setIsOpen(false);
  });
  
  // Sync local volume with context
  useEffect(() => {
    setLocalVolume(volume);
  }, [volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    
    // Update volume with debounce
    const timer = setTimeout(() => {
      setVolume(newVolume);
      if (newVolume > 0 && isMuted) {
        toggleMute();
      }
      
      // Play a sound when adjusting volume (if not muted)
      if (!isMuted && !isMusicMuted) {
        playSound('ui_click', { volume: 0.3 });
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isMuted, isMusicMuted, setVolume, toggleMute, playSound]);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all"
          aria-label="Audio controls"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {isMuted ? (
            <VolumeX size={24} />
          ) : volume > 0.5 ? (
            <Volume2Icon size={24} />
          ) : volume > 0 ? (
            <Volume1 size={24} />
          ) : (
            <VolumeX size={24} />
          )}
        </button>

        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="volume" className="text-sm font-medium text-gray-700">
                Volume
              </label>
              <button
                onClick={() => {
                  toggleMute();
                  playSound('ui_click', { volume: 0.3 });
                }}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <VolumeX size={16} className="text-gray-500" />
              <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={localVolume}
                onChange={handleVolumeChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                aria-valuemin={0}
                aria-valuemax={1}
                aria-valuenow={localVolume}
                aria-valuetext={`${Math.round(localVolume * 100)}%`}
              />
              <Volume2 size={16} className="text-gray-500" />
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  toggleMusic();
                  playSound('ui_click', { volume: 0.3 });
                }}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 w-full p-2 rounded hover:bg-gray-100"
                aria-label={isMusicMuted ? 'Enable music' : 'Disable music'}
              >
                <Music size={16} className={isMusicMuted ? 'text-red-500' : 'text-green-500'} />
                <span>{isMusicMuted ? 'Music Off' : 'Music On'}</span>
                {currentTrack && (
                  <span className="ml-auto text-xs text-gray-500 truncate max-w-[120px]">
                    {currentTrack}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioControls;
