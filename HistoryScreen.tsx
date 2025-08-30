import React, { useEffect, useState } from 'react';

interface HistoryEntry {
  date: string;
  score: number;
  duration?: number;
}

interface HistoryScreenProps {
  onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBack }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored: HistoryEntry[] = JSON.parse(localStorage.getItem('sessionHistory') || '[]');
    setHistory(stored.reverse());
    if (localStorage.getItem('teacherMode') === 'true') {
      document.body.classList.add('teacher-mode');
    } else {
      document.body.classList.remove('teacher-mode');
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem('sessionHistory');
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-8 text-yellow-300">\uD83D\uDCDC Session History</h1>
      <div className="bg-white/10 p-8 rounded-lg w-full max-w-md scorecard">
        {history.length === 0 ? (
          <div className="text-xl">No history yet.</div>
        ) : (
          <ol className="text-xl space-y-2">
            {history.map((entry, index) => (
              <li key={index} className="flex justify-between items-center py-1">
                <span>{new Date(entry.date).toLocaleString()}</span>
                <span className="text-yellow-300">{entry.score}</span>
                <span>{entry.duration ?? 0}s</span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="flex gap-4 mt-8 flex-wrap justify-center">
        <button onClick={handleClear} className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-xl text-2xl font-bold">Clear History</button>
        <button onClick={onBack} className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl text-2xl font-bold">Back</button>
      </div>
    </div>
  );
};

export default HistoryScreen;
