import React from 'react';
import { Word } from '../types';

interface DefinitionQuizProps {
  word: Word;
  distractors: string[];
  onAnswer: (correct: boolean) => void;
}

const DefinitionQuiz: React.FC<DefinitionQuizProps> = ({ word, distractors, onAnswer }) => {
  const [selected, setSelected] = React.useState<number | null>(null);

  const options = React.useMemo(() => {
    const defs = [...distractors, word.definition];
    for (let i = defs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [defs[i], defs[j]] = [defs[j], defs[i]];
    }
    return defs;
  }, [word, distractors]);

  const handleSelect = (def: string, idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    onAnswer(def === word.definition);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          What is the definition of <span className="text-yellow-600">{word.word}</span>?
        </h2>
        <div className="flex flex-col gap-2">
          {options.map((def, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(def, idx)}
              disabled={selected !== null}
              className={`px-4 py-2 rounded-lg border text-left ${
                selected === idx
                  ? def === word.definition
                    ? 'bg-green-300'
                    : 'bg-red-300'
                  : 'bg-yellow-100 hover:bg-yellow-200'
              }`}
            >
              {def}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefinitionQuiz;
