import React from 'react';
import { Participant } from '../types';

interface ScoreCardProps {
  participant: Participant;
  isActive: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ participant, isActive }) => {
  return (
    <div
      className={`scorecard transition-transform text-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md ${
        isActive ? 'border-yellow-300 shadow-lg scale-105' : 'shadow-md'
      }`}
    >
      <div className="text-2xl font-bold text-white drop-shadow-sm">{participant.name}</div>
      <div
        className="mt-2 flex flex-wrap justify-center gap-1 text-4xl leading-none"
        aria-label={`${participant.lives} lives`}
      >
        {Array.from({ length: participant.lives }).map((_, index) => (
          <span key={index} className="font-bold text-yellow-300">
            ❤️
          </span>
        ))}
      </div>
      <div className="mt-2 text-xl font-bold text-green-300 drop-shadow-sm">
        {participant.points} pts
      </div>
    </div>
  );
};

export default ScoreCard;

