import React, { useState } from 'react';
import { achievements } from '@constants/achievements';

interface AchievementsScreenProps {
  onBack: () => void;
}

type AchievementProps = {
  unlocked: boolean;
  title: string;
  description: string;
  icon: string;
};

const AchievementBadge = ({ unlocked, title, description, icon }: AchievementProps) => (
    <div className={`p-6 rounded-xl ${unlocked ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-on-surface-variant'} shadow-elevation-1`}>
      <div className="flex items-center gap-4">
        <img src={icon} alt={title} className="w-12 h-12" />
        <div>
          <h3 className="text-lg font-medium uppercase font-sans">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
);

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ onBack }) => {
  const [unlocked] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlocked));
  }, [unlocked]);

  return (
      <div className="min-h-screen bg-surface p-8 text-on-surface font-body">
        <h1 className="text-4xl text-center mb-8 uppercase font-sans text-primary">Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {Object.entries(achievements).map(([key, achievement]) => (
          <AchievementBadge
            key={key}
            unlocked={unlocked.includes(key)}
            title={achievement.title}
            description={achievement.description}
            icon={achievement.icon}
          />
        ))}
      </div>
      <button
        onClick={onBack}
        className="mt-8 block mx-auto bg-primary text-on-primary px-6 py-3 rounded-full font-bold hover:shadow-elevation-1"
      >
        Back
      </button>
    </div>
  );
};

export default AchievementsScreen;
