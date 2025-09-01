import React, { useEffect, useState } from 'react';
import { LeaderboardEntry } from './types';
import { config } from './config';

interface LeaderboardScreenProps {
  onBack: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('leaderboard');
    if (storedData) {
      const parsedEntries: LeaderboardEntry[] = JSON.parse(storedData);
      const sorted = parsedEntries.sort((a, b) => b.score - a.score).slice(0, 10);
      setEntries(sorted);
    } else {
      // Fallback to a default leaderboard if nothing is in storage
      fetch('leaderboard.json')
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then((data: LeaderboardEntry[]) => {
          const sorted = data.sort((a, b) => b.score - a.score).slice(0, 10);
          setEntries(sorted);
          setError('');
        })
        .catch(err => {
          console.error('Could not load default leaderboard', err);
          setError('Failed to load leaderboard.');
        });
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
      <div className="min-h-screen bg-surface p-8 text-on-surface text-center flex flex-col items-center justify-center font-body">
        <h1 className="text-4xl font-bold mb-8 text-primary uppercase font-sans">🏅 Leaderboard</h1>
      <div className="bg-surface-container-high p-6 rounded-xl w-full max-w-md shadow-elevation-1">
        {error ? (
          <div className="text-xl text-error">{error}</div>
        ) : entries.length === 0 ? (
          <div className="text-xl text-on-surface-variant">No scores yet.</div>
        ) : (
          <ol className="text-lg space-y-3">
            {entries.map((entry, index) => (
              <li key={index} className="flex justify-between items-center py-2 px-3 rounded-lg bg-surface-container-low">
                <span className="flex items-center font-medium">
                  {index < 3 && <span className="mr-2 text-primary">{['🥇', '🥈', '🥉'][index]}</span>}
                  <img
                    src={`${config.baseUrl}img/avatars/${entry.name}.png`}
                    alt={`${entry.name}'s avatar`}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  {index + 1}. {entry.name}
                </span>
                <span className="text-primary font-bold">{entry.score}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <button
        onClick={onBack}
        className="mt-8 bg-primary text-on-primary px-6 py-3 rounded-full text-lg font-bold hover:shadow-elevation-1"
      >
        Back
      </button>
    </div>
  );
};

export default LeaderboardScreen;