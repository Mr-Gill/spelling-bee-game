import React, { useEffect } from 'react';

interface OptionsState {
  soundEnabled: boolean;
  musicEnabled: boolean;
  musicStyle: string;
  musicVolume: number;
  teacherMode: boolean;
  skipPenaltyType: 'lives' | 'points';
  skipPenaltyValue: number;
  initialDifficulty: number;
  progressionSpeed: number;
  effectsEnabled: boolean;
  theme: string;
  customPhrases: string;
}

interface GameOptionsProps {
  options: OptionsState;
  setOptions: React.Dispatch<React.SetStateAction<OptionsState>>;
}

const GameOptions: React.FC<GameOptionsProps> = ({ options, setOptions }) => {
  const applyTheme = (t: string) => {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-honeycomb');
    document.body.classList.add(`theme-${t}`);
  };

  useEffect(() => {
    localStorage.setItem('soundEnabled', String(options.soundEnabled));
  }, [options.soundEnabled]);

  useEffect(() => {
    localStorage.setItem('musicEnabled', String(options.musicEnabled));
  }, [options.musicEnabled]);

  useEffect(() => {
    localStorage.setItem('musicStyle', options.musicStyle);
  }, [options.musicStyle]);

  useEffect(() => {
    localStorage.setItem('musicVolume', String(options.musicVolume));
  }, [options.musicVolume]);

  useEffect(() => {
    const lines = options.customPhrases
      .split('\n')
      .map(p => p.trim())
      .filter(Boolean);
    localStorage.setItem('encouragementPhrases', JSON.stringify(lines));
  }, [options.customPhrases]);

  useEffect(() => {
    if (options.teacherMode) {
      document.body.classList.add('teacher-mode');
    } else {
      document.body.classList.remove('teacher-mode');
    }
    localStorage.setItem('teacherMode', String(options.teacherMode));
  }, [options.teacherMode]);

  useEffect(() => {
    applyTheme(options.theme);
    localStorage.setItem('theme', options.theme);
  }, [options.theme]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white/10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Skip Penalty ⏭️</h2>
        <div className="flex gap-4">
          <select
            value={options.skipPenaltyType}
            onChange={e =>
              setOptions(o => ({ ...o, skipPenaltyType: e.target.value as 'lives' | 'points' }))
            }
            className="p-2 rounded-md bg-white/20 text-white"
          >
            <option value="lives">Lives</option>
            <option value="points">Points</option>
          </select>
          <input
            type="number"
            min={0}
            value={options.skipPenaltyValue}
            onChange={e =>
              setOptions(o => ({ ...o, skipPenaltyValue: Number(e.target.value) }))
            }
            className="p-2 rounded-md bg-white/20 text-white w-24"
          />
        </div>
      </div>

      <div className="bg-white/10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Difficulty Settings 🎚️</h2>
        <div className="flex gap-4">
          <div>
            <label className="block mb-2">Initial Difficulty</label>
            <select
              value={options.initialDifficulty}
              onChange={e =>
                setOptions(o => ({ ...o, initialDifficulty: Number(e.target.value) }))
              }
              className="p-2 rounded-md bg-white/20 text-white"
            >
              <option value={0}>Easy</option>
              <option value={1}>Medium</option>
              <option value={2}>Tricky</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Progression Speed</label>
            <input
              type="number"
              min={1}
              value={options.progressionSpeed}
              onChange={e =>
                setOptions(o => ({ ...o, progressionSpeed: Number(e.target.value) }))
              }
              className="p-2 rounded-md bg-white/20 text-white w-24"
            />
          </div>
        </div>
      </div>

      <div className="bg-white/10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Audio & Effects 🔊✨</h2>
        <label className="flex items-center space-x-3 mb-2">
          <input
            type="checkbox"
            checked={options.soundEnabled}
            onChange={e => setOptions(o => ({ ...o, soundEnabled: e.target.checked }))}
          />
          <span>Enable Sound</span>
        </label>
        <label className="flex items-center space-x-3 mb-2">
          <input
            type="checkbox"
            checked={options.musicEnabled}
            onChange={e => setOptions(o => ({ ...o, musicEnabled: e.target.checked }))}
          />
          <span>Enable Music</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={options.effectsEnabled}
            onChange={e => setOptions(o => ({ ...o, effectsEnabled: e.target.checked }))}
          />
          <span>Enable Visual Effects</span>
        </label>
      </div>

      <div className="bg-white/10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Theme 🎨</h2>
        <select
          value={options.theme}
          onChange={e => setOptions(o => ({ ...o, theme: e.target.value }))}
          className="p-2 rounded-md bg-white/20 text-white"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="honeycomb">Honeycomb</option>
        </select>
      </div>

      <div className="bg-white/10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Teacher Mode 👩‍🏫</h2>
        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={options.teacherMode}
            onChange={e => setOptions(o => ({ ...o, teacherMode: e.target.checked }))}
          />
          <span>Enable larger fonts and spacing</span>
        </label>
      </div>

      <div className="bg-white/10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Music 🎵</h2>
        <div className="mb-4">
          <label className="block mb-2">Style</label>
          <select
            value={options.musicStyle}
            onChange={e => setOptions(o => ({ ...o, musicStyle: e.target.value }))}
            className="p-2 rounded-md bg-white/20 text-white"
          >
            {['Funk', 'Country', 'Deep Bass', 'Rock', 'Jazz', 'Classical'].map(style => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Volume: {Math.round(options.musicVolume * 100)}%</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={options.musicVolume}
            onChange={e =>
              setOptions(o => ({ ...o, musicVolume: parseFloat(e.target.value) }))
            }
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-white/10 p-6 rounded-lg md:col-span-2 lg:col-span-3">
        <h2 className="text-2xl font-bold mb-4">Encouragement Phrases 💬</h2>
        <textarea
          value={options.customPhrases}
          onChange={e =>
            setOptions(o => ({ ...o, customPhrases: e.target.value }))
          }
          className="w-full p-2 rounded-md bg-white/20 text-white"
          placeholder="Enter phrases, one per line"
          rows={3}
        />
      </div>
    </div>
  );
};

export default GameOptions;
