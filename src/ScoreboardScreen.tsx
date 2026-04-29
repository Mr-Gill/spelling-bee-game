import React from 'react';
import type { Participant } from './types';

const CHANNEL_NAME = 'spelling-bee-scoreboard';
const STORAGE_KEY = 'scoreboardParticipants';

const readStoredParticipants = (): Participant[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const ScoreboardScreen: React.FC = () => {
  const [participants, setParticipants] = React.useState<Participant[]>(() => readStoredParticipants());

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof BroadcastChannel === 'undefined') return;

    const channel = new BroadcastChannel(CHANNEL_NAME);
    const handleMessage = (event: MessageEvent<Participant[]>) => setParticipants(event.data || []);
    channel.addEventListener('message', handleMessage);
    return () => channel.close();
  }, []);

  React.useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setParticipants(readStoredParticipants());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center">
        <p className="mb-8 text-center text-lg font-bold uppercase tracking-wide text-yellow-300">Live Scoreboard</p>
        {participants.length > 0 ? (
          <div className="grid gap-5">
            {participants.map(participant => (
              <div key={participant.name} className="rounded-3xl border border-white/20 bg-white/10 p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="text-4xl font-black">{participant.name}</div>
                  <div className="text-4xl font-black text-green-300">{participant.points} pts</div>
                </div>
                <div className="mt-4 text-3xl" aria-label={`${participant.lives} lives`}>
                  {'❤️'.repeat(Math.max(0, participant.lives))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-3xl font-bold text-white/70">Waiting for scores...</div>
        )}
      </div>
    </div>
  );
};

export const publishScoreboard = (participants: Participant[]) => {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
  if (typeof BroadcastChannel !== 'undefined') {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage(participants);
    channel.close();
  }
};

export default ScoreboardScreen;
