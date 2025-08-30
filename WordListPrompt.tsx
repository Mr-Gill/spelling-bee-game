import React, { useState } from 'react';
import { Word } from './types';
import { generateWords } from './api/aiWordGenerator';

interface WordListPromptProps {
  onAddWords: (words: Word[]) => void;
  onClose: () => void;
}

const WordListPrompt: React.FC<WordListPromptProps> = ({ onAddWords, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await generateWords(prompt);
      setWords(result);
    } catch (err) {
      setError('Failed to generate words.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-lg text-black">
        <h2 className="text-xl font-bold mb-2">AI Word List Generator</h2>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Describe the words you want..."
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <ul className="mt-4 space-y-2 max-h-60 overflow-y-auto">
          {words.map((w, i) => (
            <li key={i} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{w.word}</span>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                onClick={() => onAddWords([w])}
              >
                Add to session
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WordListPrompt;
