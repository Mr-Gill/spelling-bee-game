import React, { useState } from 'react';

interface HistoryEntry {
  date: string;
  score: number;
  duration?: number;
}

const HistoryScreen: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('sessionHistory') || '[]');
    } catch {
      return [];
    }
  });

  const clearHistory = () => {
    localStorage.removeItem('sessionHistory');
    setHistory([]);
  };

  return (
    <div>
      <h1>History</h1>
      <ul>
        {history.map((entry, index) => (
          <li key={index} data-testid="history-entry">
            {entry.date} - {entry.score} - {entry.duration ?? 0}
          </li>
        ))}
      </ul>
      {history.length > 0 && (
        <button onClick={clearHistory}>Clear History</button>
      )}
    </div>
  );
};

export default HistoryScreen;
