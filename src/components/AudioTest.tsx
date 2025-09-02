import React from 'react';
import { useAudio } from '../contexts/AudioContext';

const AudioTest: React.FC = () => {
  const { 
    playSound, 
    playMusic, 
    stopMusic, 
    isPlaying, 
    currentTrack,
    toggleMute,
    toggleMusic,
    isMuted,
    isMusicMuted,
    volume,
    setVolume
  } = useAudio();

  return (
    <div className="p-4 max-w-md mx-auto mt-8 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Audio Test</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Sound Effects:</span>
          <span className={`font-bold ${isMuted ? 'text-red-500' : 'text-green-500'}`}>
            {isMuted ? 'Muted' : 'Unmuted'}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span>Music:</span>
          <span className={`font-bold ${isMusicMuted ? 'text-red-500' : 'text-green-500'}`}>
            {isMusicMuted ? 'Muted' : 'Unmuted'}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span>Volume: {Math.round(volume * 100)}%</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            name="volume"
            className="w-32"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => playSound('ui_click')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Play UI Click
          </button>
          
          <button
            onClick={() => playSound('correct')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Play Correct
          </button>
          
          <button
            onClick={() => playMusic('background')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
            disabled={isPlaying && currentTrack === 'background'}
          >
            {isPlaying && currentTrack === 'background' ? 'Playing Background' : 'Play Background'}
          </button>
          
          <button
            onClick={() => playMusic('menu')}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
            disabled={isPlaying && currentTrack === 'menu'}
          >
            {isPlaying && currentTrack === 'menu' ? 'Playing Menu' : 'Play Menu'}
          </button>
          
          <button
            onClick={stopMusic}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded col-span-2"
            disabled={!isPlaying}
          >
            Stop Music
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={toggleMute}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            {isMuted ? 'Unmute Sounds' : 'Mute Sounds'}
          </button>
          
          <button
            onClick={toggleMusic}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            {isMusicMuted ? 'Enable Music' : 'Disable Music'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioTest;
