import React, { useState } from 'react';
import { achievements } from '@constants/achievements';
import { defaultAchievements } from './types';

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
  <div className={`achievement ${unlocked ? 'unlocked' : 'locked'}`}>
    <img src={icon} alt={title} />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ onBack }) => {
  const [userAchievements, setUserAchievements] = useState<string[]>([]);

  const unlocked = React.useMemo(() => {
    if (typeof window === 'undefined') return [] as string[];
    try {
      return JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
    } catch {
      return [];
    }
<<<<<<< Updated upstream
  }, []);
=======
  });
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  return (
    <div className="screen-container bg-gradient-to-br from-green-600 to-teal-800 text-white">
      <h1 className="screen-title text-center mb-8">Achievements</h1>
      <div className="achievements-grid max-w-xl mx-auto">
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
        className="mt-8 block mx-auto bg-yellow-300 text-black btn-responsive font-bold"
      >
        Back
      </button>
    </div>
  );
};

export default AchievementsScreen;
