import React from 'react';
import { Participant } from './types';

interface ScoreboardScreenProps {
  participants: Participant[];
  hideNames?: boolean;
}

const ScoreboardScreen: React.FC<ScoreboardScreenProps> = ({ participants, hideNames }) => {
  const shouldHide = hideNames ?? (typeof window !== 'undefined' && localStorage.getItem('hideNames') === 'true');
  return (
    <div className="absolute top-8 left-8 flex gap-8 items-center">
      <img src="img/bee.svg" alt="Bee icon" className="w-12 h-12" />
      {participants.map((p, index) => (
        <div key={index} className="text-center scorecard">
          <div className="text-2xl font-bold">
            {shouldHide ? (
              p.avatar ? (
                <img
                  src={p.avatar}
                  alt={`Team ${index + 1}`}
                  className="w-8 h-8 rounded-full mx-auto"
                />
              ) : (
                `Team ${index + 1}`
              )
            ) : (
              p.name
            )}
          </div>
          <div className="text-4xl font-bold text-yellow-300">
            {'❤️'.repeat(p.lives)}
          </div>
          <div className="text-xl font-bold text-green-400">{p.points} pts</div>
        </div>
      ))}
    </div>
  );
};

export default ScoreboardScreen;
