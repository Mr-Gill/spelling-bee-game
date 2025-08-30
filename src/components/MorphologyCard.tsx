import React, { useMemo } from 'react';
import { Word, WordDatabase } from '../types';

interface MorphologyCardProps {
  word: Word;
  database: WordDatabase;
}

const MorphologyCard: React.FC<MorphologyCardProps> = ({ word, database }) => {
  const allWords = useMemo(() =>
    Object.values(database).flat(),
  [database]);

  const prefixExamples = useMemo(() => {
    if (!word.prefix) return [] as string[];
    return allWords
      .filter(w => w.word !== word.word && w.prefix === word.prefix)
      .map(w => w.word)
      .slice(0, 3);
  }, [allWords, word]);

  const suffixExamples = useMemo(() => {
    if (!word.suffix) return [] as string[];
    return allWords
      .filter(w => w.word !== word.word && w.suffix === word.suffix)
      .map(w => w.word)
      .slice(0, 3);
  }, [allWords, word]);

  if (!word.prefix && !word.suffix) return null;

  return (
    <div className="bg-white/10 p-3 rounded-md mt-2 text-sm">
      {word.prefix && (
        <div className="mb-2">
          <div className="font-bold">Prefix: {word.prefix}</div>
          {word.prefixMeaning && (
            <div className="text-gray-200">{word.prefixMeaning}</div>
          )}
          {prefixExamples.length > 0 && (
            <div className="text-gray-300">
              Example words: {prefixExamples.join(', ')}
            </div>
          )}
        </div>
      )}
      {word.suffix && (
        <div>
          <div className="font-bold">Suffix: {word.suffix}</div>
          {word.suffixMeaning && (
            <div className="text-gray-200">{word.suffixMeaning}</div>
          )}
          {suffixExamples.length > 0 && (
            <div className="text-gray-300">
              Example words: {suffixExamples.join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MorphologyCard;
