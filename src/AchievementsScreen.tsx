import React from 'react';
import { defaultAchievements } from './types';

interface AchievementsScreenProps {
  onBack: () => void;
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ onBack }) => {
  const unlocked = React.useMemo(() => {
    if (typeof window === 'undefined') return [] as string[];
    try {
      return JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
    } catch {
      return [];
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-teal-800 p-8 text-white">
      <h1 className="text-4xl text-center mb-8">Achievements</h1>
      <div className="grid gap-6 max-w-xl mx-auto">
        {defaultAchievements.map(ach => {
          const earned = unlocked.includes(ach.id);
          return (
            <div
              key={ach.id}
              className={`flex items-center gap-4 p-4 rounded-lg ${earned ? 'bg-white/20' : 'bg-white/5 opacity-50'}`}
            >
              <span className="text-3xl">{ach.icon}</span>
              <div>
                <div className="font-bold text-xl">{ach.name}</div>
                <div className="text-sm">{ach.description}</div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={onBack}
        className="mt-8 block mx-auto bg-yellow-300 text-black px-6 py-3 rounded-lg font-bold"
      >
        Back
      </button>
    </div>
  );
};

export default AchievementsScreen;

