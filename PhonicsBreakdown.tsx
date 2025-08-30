import React from 'react';
import PronunciationRecorder from './components/PronunciationRecorder';

interface Phoneme {
  symbol: string;
  sampleUrl: string;
}

interface PhonicsBreakdownProps {
  phonemes: Phoneme[];
}

const PhonicsBreakdown: React.FC<PhonicsBreakdownProps> = ({ phonemes }) => {
  return (
    <div className="space-y-4">
      {phonemes.map((p, idx) => (
        <div key={idx} className="space-y-1">
          <div className="font-bold">{p.symbol}</div>
          <PronunciationRecorder id={`${p.symbol}-${idx}`} sampleUrl={p.sampleUrl} />
        </div>
      ))}
    </div>
  );
};

export default PhonicsBreakdown;

