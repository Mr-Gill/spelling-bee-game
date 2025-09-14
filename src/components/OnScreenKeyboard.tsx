import React from "react";
import useSound from "../utils/useSound";
import letterCorrectSoundFile from "../audio/letter-correct.mp3";

interface OnScreenKeyboardProps {
  onLetter: (letter: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
  soundEnabled: boolean;
  usedLetters: Set<string>;
  currentWord: string;
  'aria-label'?: string;
}

const letters = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i),
);

const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({
  onLetter,
  onBackspace,
  onSubmit,
  soundEnabled,
  usedLetters,
  currentWord,
  'aria-label': ariaLabel
}) => {
  const playLetterSound = useSound(letterCorrectSoundFile, soundEnabled);
  
  const handleLetterClick = (letter: string) => {
    playLetterSound();
    onLetter(letter);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8 px-4">
      {letters.map((letter) => {
        const lower = letter.toLowerCase();
        const isUsed = usedLetters?.has(lower) ?? false;
        const isDisabled = false;
        if (currentWord) {
          const targetLetter = currentWord[letters.indexOf(letter)]?.toLowerCase();
          const isHighlighted = lower === targetLetter;
          return (
            <button
              key={letter}
              onClick={() => handleLetterClick(lower)}
              disabled={isUsed || isDisabled}
              className={`w-12 h-12 md:w-16 md:h-16 text-xl md:text-2xl font-black rounded-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg ${
                isUsed 
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50" 
                  : isDisabled 
                  ? "bg-gray-600 text-gray-800 cursor-not-allowed opacity-50" 
                  : isHighlighted 
                  ? "bg-gradient-to-br from-kahoot-blue-400 to-kahoot-blue-600 text-white hover:from-kahoot-blue-500 hover:to-kahoot-blue-700 animate-glow" 
                  : "bg-gradient-to-br from-kahoot-yellow-400 to-kahoot-yellow-600 text-black hover:from-kahoot-yellow-500 hover:to-kahoot-yellow-700"
              }`}
            >
              {letter}
            </button>
          );
        } else {
          return (
            <button
              key={letter}
              onClick={() => handleLetterClick(lower)}
              disabled={isUsed || isDisabled}
              className={`w-12 h-12 md:w-16 md:h-16 text-xl md:text-2xl font-black rounded-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg ${
                isUsed 
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50" 
                  : isDisabled 
                  ? "bg-gray-600 text-gray-800 cursor-not-allowed opacity-50" 
                  : "bg-gradient-to-br from-kahoot-yellow-400 to-kahoot-yellow-600 text-black hover:from-kahoot-yellow-500 hover:to-kahoot-yellow-700"
              }`}
            >
              {letter}
            </button>
          );
        }
      })}
      <button
        onClick={() => {
          handleLetterClick("");
          onBackspace();
        }}
        className="w-16 h-12 md:w-20 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xl md:text-2xl font-black rounded-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg"
        aria-label="Backspace"
      >
        <span aria-hidden="true">⌫</span>
      </button>
      <button
        onClick={() => {
          handleLetterClick("");
          onSubmit();
        }}
        className="w-16 h-12 md:w-20 md:h-16 bg-gradient-to-br from-kahoot-green-500 to-kahoot-green-600 hover:from-kahoot-green-600 hover:to-kahoot-green-700 text-white text-xl md:text-2xl font-black rounded-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg animate-glow"
        aria-label="Submit"
      >
        <span aria-hidden="true">✅</span>
      </button>
    </div>
  );
};

export default OnScreenKeyboard;
