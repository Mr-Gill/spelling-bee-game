import React from 'react';
import { getDueReviewWords, rescheduleReviewWord } from './utils/reviewQueue';

interface PracticeScreenProps {
  onBack: () => void;
}

const PracticeScreen: React.FC<PracticeScreenProps> = ({ onBack }) => {
  const [queue, setQueue] = React.useState(() => getDueReviewWords());
  const current = queue[0];

  const handleResult = (success: boolean) => {
    if (!current) return;
    rescheduleReviewWord(current.word, success);
    const updated = getDueReviewWords();
    setQueue(updated);
  };

  if (!current) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-indigo-600 to-purple-800 text-white'>
        <p className='text-2xl'>No review words due!</p>
        <button className='px-4 py-2 bg-yellow-500 rounded' onClick={onBack}>Back</button>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-indigo-600 to-purple-800 text-white'>
      <h2 className='text-3xl mb-4'>Practice Word</h2>
      <div className='text-4xl font-bold'>{current.word}</div>
      <div className='flex gap-4 mt-6'>
        <button className='px-4 py-2 bg-green-600 rounded' onClick={() => handleResult(true)}>Got it</button>
        <button className='px-4 py-2 bg-red-600 rounded' onClick={() => handleResult(false)}>Missed</button>
      </div>
      <button className='mt-6 underline' onClick={onBack}>Quit</button>
    </div>
  );
};

export default PracticeScreen;
