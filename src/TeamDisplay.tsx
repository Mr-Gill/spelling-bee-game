import React from 'react';

const CHANNEL_NAME = 'spelling-bee-team-display';
const STORAGE_KEY = 'teamDisplayWord';

const readStoredWord = () => {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(STORAGE_KEY) || '';
};

const TeamDisplay: React.FC = () => {
  const [word, setWord] = React.useState(() => readStoredWord());

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof BroadcastChannel === 'undefined') return;

    const channel = new BroadcastChannel(CHANNEL_NAME);
    const handleMessage = (event: MessageEvent<string>) => setWord(event.data);
    channel.addEventListener('message', handleMessage);
    return () => channel.close();
  }, []);

  React.useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setWord(event.newValue || '');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        <p className="mb-6 text-lg font-bold uppercase tracking-wide text-yellow-300">Team Display</p>
        {word ? (
          <div className="max-w-5xl break-words text-6xl font-black uppercase md:text-8xl">
            {word}
          </div>
        ) : (
          <div className="text-3xl font-bold text-white/70">Waiting for the next word...</div>
        )}
      </div>
    </div>
  );
};

export const publishTeamDisplayWord = (word: string) => {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(STORAGE_KEY, word);
  if (typeof BroadcastChannel !== 'undefined') {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage(word);
    channel.close();
  }
};

export default TeamDisplay;
