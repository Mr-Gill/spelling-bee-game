import React from 'react';
import { Participant } from '../types';
import ScoreCard from './ScoreCard';

interface ParticipantStatsProps {
  participants: Participant[];
  currentIndex: number;
}

const ParticipantStats: React.FC<ParticipantStatsProps> = ({ participants, currentIndex }) => {
  return (
    <div className="absolute top-8 left-8 flex gap-6 items-center z-40">
      <img src="img/bee.svg" alt="Bee icon" className="w-16 h-16 animate-wiggle" />
      {participants.map((p, index) => (
        <ScoreCard key={index} participant={p} isActive={index === currentIndex} />
      ))}
    </div>
  );
};

export default ParticipantStats;
