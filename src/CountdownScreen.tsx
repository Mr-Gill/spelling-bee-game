import React, { useState, useEffect } from 'react';

interface CountdownScreenProps {
  onDone: () => void;
}

const CountdownScreen: React.FC<CountdownScreenProps> = ({ onDone }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      const t = setTimeout(onDone, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
      <div className="mb-6 text-6xl animate-bounce">🐝</div>
      <div
        key={count}
        className="text-[12rem] font-black leading-none text-white drop-shadow-2xl"
        style={{ animation: 'countdownPop 0.6s ease-out both' }}
      >
        {count > 0 ? count : '🚀'}
      </div>
      <p className="mt-8 text-4xl font-black text-white/90 tracking-wide">
        {count > 0 ? 'Get ready…' : "LET'S SPELL!"}
      </p>

      <style>{`
        @keyframes countdownPop {
          0%   { transform: scale(1.6); opacity: 0; }
          40%  { transform: scale(0.9); opacity: 1; }
          70%  { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CountdownScreen;
