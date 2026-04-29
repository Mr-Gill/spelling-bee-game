import React from 'react';
import { Participant } from '../types';
import ScoreCard from './ScoreCard';

interface ParticipantStatsProps {
  participants: Participant[];
  currentIndex: number;
  hideNames?: boolean;
  isTeamMode?: boolean;
}

const ParticipantStats: React.FC<ParticipantStatsProps> = ({ participants, currentIndex, hideNames = false, isTeamMode = false }) => {
  return (
    <div className="absolute top-8 left-8 flex gap-6 items-center z-40">
      <img src="img/avatars/bee.svg" alt="Bee icon" className="w-16 h-16 animate-wiggle" />
      {participants.map((p, index) => (
        <ScoreCard
          key={index}
          participant={p}
          isActive={index === currentIndex}
          hideName={hideNames}
          displayName={isTeamMode ? `Team ${index + 1}` : `Player ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default ParticipantStats;
