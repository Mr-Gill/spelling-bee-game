import React, { useEffect, useState } from 'react';
import { LeaderboardEntry } from './types';

interface LeaderboardScreenProps {
  onBack: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const stored: LeaderboardEntry[] = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const sorted = stored.sort((a, b) => b.score - a.score).slice(0, 10);
    setEntries(sorted);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-8 text-yellow-300">Leaderboard</h1>
      <div className="bg-white/10 p-8 rounded-lg w-full max-w-md">
        {entries.length === 0 ? (
          <div className="text-xl">No scores yet.</div>
        ) : (
          entries.map((e, index) => (
            <div key={index} className="flex justify-between text-xl mb-2">
              <span className="font-bold">{index + 1}. {e.name}</span>
              <span className="text-yellow-300">{e.score}</span>
            </div>
          ))
        )}
      </div>
      <button
        onClick={onBack}
        className="mt-8 bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl text-2xl font-bold"
      >
        Back
      </button>
    </div>
  );
};

export default LeaderboardScreen;
