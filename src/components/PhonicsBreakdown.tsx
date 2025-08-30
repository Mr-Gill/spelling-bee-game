import React from 'react';
import PronunciationRecorder from './PronunciationRecorder';

interface PhonicsBreakdownProps {
  phonemes: string[];
}

const PhonicsBreakdown: React.FC<PhonicsBreakdownProps> = ({ phonemes }) => {
  return (
    <div className="space-y-4">
      {phonemes.map((symbol, idx) => (
        <div key={idx} className="space-y-1">
          <div className="font-bold">{symbol}</div>
          <PronunciationRecorder
            id={`${symbol}-${idx}`}
            sampleUrl={`/phonemes/${symbol}.mp3`}
          />
        </div>
      ))}
    </div>
  );
};

export default PhonicsBreakdown;

