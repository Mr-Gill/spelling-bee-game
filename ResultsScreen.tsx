import React, { useEffect } from 'react';
import { GameResults, LeaderboardEntry } from './types';

interface ResultsScreenProps {
  results: GameResults;
  onRestart: () => void;
  onViewLeaderboard: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, onRestart, onViewLeaderboard }) => {
  useEffect(() => {
    const stored: LeaderboardEntry[] = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const newEntries: LeaderboardEntry[] = results.participants.map(p => ({
      name: p.name,
      score: p.points,
      date: new Date().toISOString(),
    }));
    const updated = [...stored, ...newEntries]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(updated));
  }, [results]);
  const handleExport = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(results, null, 2));
    const anchor = document.createElement('a');
    anchor.href = dataStr;
    anchor.download = 'spelling-bee-results.json';
    anchor.click();
  };

  const getWinnerMessage = () => {
    const { winner, participants } = results;
    if (winner) {
      return `Winner: ${winner.name}`;
    }
    const activeParticipants = participants.filter(p => p.lives > 0);
    if (activeParticipants.length > 1) {
      const names = activeParticipants.map(p => p.name).join(' and ');
      return `It's a draw between ${names}!`;
    }
    return 'No one wins this round!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4 text-yellow-300">🏆 Game Over! 🏆</h1>
      <h2 className="text-4xl mb-8">{getWinnerMessage()}</h2>

      {results?.duration && (
        <div className="text-2xl mb-6">Game Duration: {results.duration} seconds</div>
      )}

      <div className="bg-white/10 p-8 rounded-lg w-full max-w-md">
        <h3 className="text-3xl font-bold mb-4">Final Scores</h3>
        {results && results.participants.map((p, index) => (
          <div key={index} className="text-left text-xl mb-3">
            <div className="font-bold">{p.name}</div>
            <div className="text-yellow-300">
              {p.correct}/{p.attempted} correct ({(p.correct / p.attempted * 100).toFixed(0)}%) - {p.lives} lives remaining - {p.points} points
            </div>
          </div>
        ))}
      </div>

      {results.missedWords && results.missedWords.length > 0 && (
        <div className="bg-white/10 p-8 rounded-lg w-full max-w-md mt-8">
          <h3 className="text-3xl font-bold mb-4">Missed Words</h3>
          {results.missedWords.map((w, index) => (
            <div key={index} className="text-left text-xl mb-2">
              <span className="font-bold">{w.word}</span> - {w.definition}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-6 mt-12">
        <button
          onClick={handleExport}
          className="bg-green-500 hover:bg-green-600 px-8 py-5 rounded-xl text-2xl font-bold"
        >
          Export Results
        </button>
        <button
          onClick={onViewLeaderboard}
          className="bg-purple-500 hover:bg-purple-600 px-8 py-5 rounded-xl text-2xl font-bold"
        >
          View Leaderboard
        </button>
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 px-10 py-5 rounded-xl text-2xl font-bold"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
