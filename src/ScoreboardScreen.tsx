import React from 'react';
import type { Participant } from './types';

const CHANNEL_NAME = 'spelling-bee-scoreboard';
const STORAGE_KEY = 'scoreboardParticipants';
const HIDE_NAMES_STORAGE_KEY = 'scoreboardHideNames';

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
  const [hideNames, setHideNames] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(HIDE_NAMES_STORAGE_KEY) === 'true';
  });

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
      if (event.key === HIDE_NAMES_STORAGE_KEY) setHideNames(event.newValue === 'true');
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
            {participants.map((participant, index) => (
              <div key={`${participant.name}-${index}`} className="rounded-3xl border border-white/20 bg-white/10 p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4 text-4xl font-black">
                    {hideNames && participant.avatar && (
                      <img src={participant.avatar} alt="" className="h-14 w-14 rounded-full border-2 border-yellow-300 bg-white/10 object-cover" />
                    )}
                    <span>{hideNames ? `Player ${index + 1}` : participant.name}</span>
                  </div>
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

export const publishScoreboard = (participants: Participant[], options?: { hideNames?: boolean }) => {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
  window.localStorage.setItem(HIDE_NAMES_STORAGE_KEY, String(Boolean(options?.hideNames)));
  if (typeof BroadcastChannel !== 'undefined') {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage(participants);
    channel.close();
  }
};

export default ScoreboardScreen;
