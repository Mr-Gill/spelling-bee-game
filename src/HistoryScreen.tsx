import React, { useEffect, useState } from 'react';
import { loadHistory, clearHistory } from './utils/history';

interface SessionEntry {
  date: string;
  score: number;
  duration?: number;
}

interface HistoryScreenProps {
  onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBack }) => {
  const [history, setHistory] = useState<SessionEntry[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center flex flex-col items-center justify-center font-body">
      <h1 className="font-bold mb-8 text-yellow-300 uppercase font-sans">📘 Session History</h1>
      <div className="bg-white/10 p-8 rounded-lg w-full max-w-md">
        {history.length === 0 ? (
          <div className="text-xl">No session history.</div>
        ) : (
          <ul className="text-xl space-y-2">
            {history.map((entry, index) => (
              <li key={index} className="flex justify-between">
                <span>{new Date(entry.date).toLocaleString()}</span>
                <span className="text-yellow-300">
                  {entry.score} pts{entry.duration !== undefined && ` / ${entry.duration}s`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex gap-4 mt-8">
        <button onClick={onBack} className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl text-2xl font-bold">
          Back
        </button>
        {history.length > 0 && (
          <button onClick={handleClearHistory} className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-xl text-2xl font-bold">
            Clear History
          </button>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;

