import React from 'react';
import { Participant } from '../types';

interface ScoreCardProps {
  participant: Participant;
  isActive: boolean;
  displayName?: string;
  hideName?: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ participant, isActive, displayName, hideName }) => {
  return (
    <div
      className={`scorecard transition-transform text-center rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md ${
        isActive ? 'border-yellow-300 shadow-lg scale-105' : 'shadow-md'
      }`}
    >
      {hideName ? (
        <div className="flex flex-col items-center gap-2">
          {participant.avatar && <img src={participant.avatar} alt="" className="h-10 w-10 rounded-full border-2 border-yellow-300 bg-white/20 object-cover" />}
          <div className="text-xl font-bold text-white drop-shadow-sm">{displayName}</div>
        </div>
      ) : (
        <div className="max-w-48 truncate text-2xl font-bold text-white drop-shadow-sm" title={participant.name}>{participant.name}</div>
      )}
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
