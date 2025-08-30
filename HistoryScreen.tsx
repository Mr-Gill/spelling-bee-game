import React, { useEffect, useState } from 'react';

interface SessionRecord {
  date: string;
  score: number;
  mood?: string;
}

interface HistoryScreenProps {
  onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBack }) => {
  const [history, setHistory] = useState<SessionRecord[]>([]);

  useEffect(() => {
    const stored: SessionRecord[] = JSON.parse(localStorage.getItem('sessionHistory') || '[]');
    setHistory(stored);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('teacherMode') === 'true') {
      document.body.classList.add('teacher-mode');
    } else {
      document.body.classList.remove('teacher-mode');
    }
  }, []);

  const moodCounts = history.reduce<Record<string, number>>((acc, h) => {
    if (h.mood) {
      acc[h.mood] = (acc[h.mood] || 0) + 1;
    }
    return acc;
  }, {});
  const totalMoodEntries = Object.values(moodCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-8 text-white text-center flex flex-col items-center justify-center font-body">
      <h1 className="text-6xl font-bold mb-8 text-yellow-300 uppercase font-heading">📚 History</h1>
      <div className="bg-white/10 p-8 rounded-lg w-full max-w-md scorecard">
        {history.length === 0 ? (
          <div className="text-xl">No history yet.</div>
        ) : (
          <>
            <div className="text-left text-xl mb-4">
              <div>Total Sessions: {history.length}</div>
              {totalMoodEntries > 0 && (
                <div className="mt-2 space-y-1">
                  <div>😊 {moodCounts['😊'] || 0} ({Math.round(((moodCounts['😊'] || 0) / totalMoodEntries) * 100)}%)</div>
                  <div>😐 {moodCounts['😐'] || 0} ({Math.round(((moodCounts['😐'] || 0) / totalMoodEntries) * 100)}%)</div>
                  <div>😢 {moodCounts['😢'] || 0} ({Math.round(((moodCounts['😢'] || 0) / totalMoodEntries) * 100)}%)</div>
                </div>
              )}
            </div>
            <ul className="text-xl space-y-2 max-h-64 overflow-y-auto">
              {history
                .slice()
                .reverse()
                .map((h, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{new Date(h.date).toLocaleString()}</span>
                    <span>{h.score} pts {h.mood || ''}</span>
                  </li>
                ))}
            </ul>
          </>
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

export default HistoryScreen;
