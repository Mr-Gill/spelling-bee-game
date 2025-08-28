import React, { useEffect, useState } from 'react';
import { LeaderboardEntry } from './types';

interface LeaderboardScreenProps {
  onBack: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('leaderboard');
    if (stored) {
      setEntries(JSON.parse(stored));
    } else {
      fetch('leaderboard.json')
        .then(res => res.json())
        .then(data => setEntries(data));
    }
  }, []);

  const sorted = [...entries].sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 p-8 text-white">
      <h1 className="text-5xl font-bold mb-8 text-center">Leaderboard</h1>
      <div className="bg-white/10 p-8 rounded-lg max-w-md mx-auto">
        {sorted.length === 0 ? (
          <p className="text-center text-xl">No scores yet.</p>
        ) : (
          <ol className="text-xl">
            {sorted.map((entry, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>{index + 1}. {entry.name}</span>
                <span className="text-yellow-300">{entry.score}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <button
        onClick={onBack}
        className="mt-8 bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl text-2xl font-bold block mx-auto"
      >
        Back
      </button>
    </div>
  );
};

export default LeaderboardScreen;
