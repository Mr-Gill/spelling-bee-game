import React from 'react';

const TeamDisplay: React.FC = () => {
  const [word, setWord] = React.useState('');

  React.useEffect(() => {
    const channel = new BroadcastChannel('word');
    const handleMessage = (e: MessageEvent<string>) => setWord(e.data);
    channel.addEventListener('message', handleMessage);
    return () => channel.close();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <span className="text-6xl font-bold">{word}</span>
    </div>
  );
};

export default TeamDisplay;
