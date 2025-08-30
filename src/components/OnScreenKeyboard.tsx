import React from "react";
import useSound from "../utils/useSound";
import letterSoundFile from "../../audio/letter-correct.mp3";

interface OnScreenKeyboardProps {
  onLetter: (letter: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
  soundEnabled: boolean;
  usedLetters: Set<string>;
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
}) => {
  const playKey = useSound(letterSoundFile, soundEnabled);

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {letters.map((letter) => {
        const lower = letter.toLowerCase();
        const isUsed = usedLetters.has(lower);
        return (
          <button
            key={letter}
            onClick={() => {
              playKey();
              onLetter(lower);
            }}
            disabled={isUsed}
            className={`px-4 py-2 rounded-lg font-bold transition-transform active:scale-95 ${
              isUsed ? "bg-gray-300 text-gray-500" : "bg-yellow-300 text-black"
            }`}
          >
            {letter}
          </button>
        );
      })}
      <button
        onClick={() => {
          playKey();
          onBackspace();
        }}
        className="bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold transition-transform active:scale-95"
        aria-label="Backspace"
      >
        <span aria-hidden="true">⌫</span>
      </button>
      <button
        onClick={() => {
          playKey();
          onSubmit();
        }}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition-transform active:scale-95"
        aria-label="Submit"
      >
        <span aria-hidden="true">✅</span>
      </button>
    </div>
  );
};

export default OnScreenKeyboard;
