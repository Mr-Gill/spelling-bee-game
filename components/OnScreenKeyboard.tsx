import React from 'react';
import useSound from '../utils/useSound';
import letterSoundFile from '../audio/letter-correct.mp3';

interface OnScreenKeyboardProps {
  onLetter: (letter: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
  soundEnabled: boolean;
}

const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({ onLetter, onBackspace, onSubmit, soundEnabled }) => {
  const playKey = useSound(letterSoundFile, soundEnabled);

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {letters.map(letter => (
        <button
          key={letter}
          onClick={() => {
            playKey();
            onLetter(letter.toLowerCase());
          }}
          className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
        >
          {letter}
        </button>
      ))}
      <button
        onClick={() => {
          playKey();
          onBackspace();
        }}
        className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
        aria-label="Backspace"
      >
        <span aria-hidden="true">⌫</span>
      </button>
      <button
        onClick={() => {
          playKey();
          onSubmit();
        }}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold"
        aria-label="Submit"
      >
        <span aria-hidden="true">✅</span>
      </button>
    </div>
  );
};

export default OnScreenKeyboard;
