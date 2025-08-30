import React, { useEffect, useState } from 'react';
import { LeaderboardEntry } from './types';
import beeImg from '../img/avatars/bee.svg';

interface LeaderboardScreenProps {
  onBack: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('leaderboard');
    if (storedData) {
      const parsedEntries: LeaderboardEntry[] = JSON.parse(storedData);
      const sorted = parsedEntries.sort((a, b) => b.score - a.score).slice(0, 10);
      setEntries(sorted);
    } else {
      // Fallback to a default leaderboard if nothing is in storage
      fetch('leaderboard.json')
        .then(res => res.json())
        .then((data: LeaderboardEntry[]) => {
          const sorted = data.sort((a, b) => b.score - a.score).slice(0, 10);
          setEntries(sorted);
        })
        .catch(err => console.error("Could not load default leaderboard", err));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('teacherMode') === 'true') {
      document.body.classList.add('teacher-mode');
    } else {
      document.body.classList.remove('teacher-mode');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-8 text-yellow-300">🏅 Leaderboard</h1>
      <div className="bg-white/10 p-8 rounded-lg w-full max-w-md scorecard">
        {entries.length === 0 ? (
          <div className="text-xl">No scores yet.</div>
        ) : (
          <ol className="text-xl space-y-2">
            {entries.map((entry, index) => (
              <li key={index} className="flex justify-between items-center py-1">
                <span className="flex items-center font-bold">
                  {index < 3 && <span className="mr-2">{['🥇', '🥈', '🥉'][index]}</span>}
                  <img
                    src={entry.avatar || beeImg}
                    alt={`${entry.name}'s avatar`}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  {index + 1}. {entry.name}
                </span>
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