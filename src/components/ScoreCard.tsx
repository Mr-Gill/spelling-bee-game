import React from 'react';
import { Participant } from '../types';

interface ScoreCardProps {
  participant: Participant;
  isActive: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ participant, isActive }) => {
  return (
    <div
      className={`text-center scorecard transition-transform ${
        isActive ? 'border-2 border-yellow-300 rounded-lg shadow-lg scale-105' : ''
      }`}
    >
      <div className="text-2xl font-bold">{participant.name}</div>
      <div className="text-4xl font-bold text-yellow-300">{'❤️'.repeat(participant.lives)}</div>
      <div className="text-xl font-bold text-green-400">{participant.points} pts</div>
    </div>
  );
};

export default ScoreCard;

