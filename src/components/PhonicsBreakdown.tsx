import React from 'react';
import { speak } from '../utils/tts';

interface PhonicsBreakdownProps {
  phonemes: string[];
}

const PhonicsBreakdown: React.FC<PhonicsBreakdownProps> = ({ phonemes }) => {
  if (!phonemes.length) return null;

  return (
    <div className="mb-6 rounded-2xl border border-white/20 bg-white/10 p-4 text-white">
      <h3 className="mb-3 text-xl font-black text-yellow-300">Phonics Breakdown</h3>
      <div className="flex flex-wrap justify-center gap-2">
      {phonemes.map((symbol, idx) => (
        <button
          key={`${symbol}-${idx}`}
          type="button"
          onClick={() => speak(symbol, { rate: 0.75 })}
          className="rounded-xl bg-yellow-300 px-4 py-2 font-black text-black transition hover:bg-yellow-400"
        >
          {symbol}
        </button>
      ))}
      </div>
    </div>
  );
};

export default PhonicsBreakdown;
