import React from 'react';
import { Word } from '../types';
import { speak } from '../utils/tts';

interface PhonicsBreakdownProps {
  word: Word;
}

const PhonicsBreakdown: React.FC<PhonicsBreakdownProps> = ({ word }) => {
  if (!word.phonemes || word.phonemes.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center mb-4">
      {word.phonemes.map((p, idx) => (
        <button
          key={idx}
          onClick={() => speak(p)}
          className="m-1 px-2 py-1 bg-yellow-300 text-black rounded"
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default PhonicsBreakdown;
