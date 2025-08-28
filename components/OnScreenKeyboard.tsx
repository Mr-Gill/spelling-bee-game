import React from 'react';

interface OnScreenKeyboardProps {
  onLetter: (letter: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
}

const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({ onLetter, onBackspace, onSubmit }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {letters.map(letter => (
        <button
          key={letter}
          onClick={() => onLetter(letter.toLowerCase())}
          className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
        >
          {letter}
        </button>
      ))}
      <button
        onClick={onBackspace}
        className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
        aria-label="Backspace"
      >
        <span aria-hidden="true">⌫</span>
      </button>
      <button
        onClick={onSubmit}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold"
        aria-label="Submit"
      >
        <span aria-hidden="true">✅</span>
      </button>
    </div>
  );
};

export default OnScreenKeyboard;
