import React from 'react';
import { Participant } from './types';

const ScoreboardScreen: React.FC = () => {
  const [participants, setParticipants] = React.useState<Participant[]>([]);

  React.useEffect(() => {
    const channel = new BroadcastChannel('scoreboard');
    channel.onmessage = (e) => {
      const data = e.data;
      if (data && data.participants) {
        setParticipants(data.participants as Participant[]);
      }
    };
    return () => channel.close();
  }, []);

  return (
    <div className="p-4 bg-black text-white min-h-screen flex flex-col items-center justify-center">
      {participants.map((p) => (
        <div key={p.name} className="my-8 text-center">
          <div className="text-5xl font-bold">{p.name}</div>
          <div className="text-6xl text-red-500">{'❤️'.repeat(p.lives)}</div>
          <div className="text-5xl text-green-400">{p.points} pts</div>
        </div>
      ))}
    </div>
  );
};

export default ScoreboardScreen;
