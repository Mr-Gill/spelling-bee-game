import React, { useState } from 'react';
import type { Word } from '../types';
import { extractTextFromFile, generateWords } from '../utils/textExtractor';

const WordListPrompt: React.FC = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [passage, setPassage] = useState('');
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await extractTextFromFile(file);
      setPassage(text);
    } catch (err) {
      console.error('Failed to extract text', err);
    }
  };

  const handleGenerate = async () => {
    if (!bookTitle || !passage) return;
    setLoading(true);
    try {
      const generated = await generateWords(passage, bookTitle);
      setWords(generated);
    } catch (err) {
      console.error('Failed to generate words', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 p-6 rounded-lg">
      <div className="mb-4">
        <label className="block mb-2 font-bold">Book Title</label>
        <input
          type="text"
          value={bookTitle}
          onChange={e => setBookTitle(e.target.value)}
          className="w-full p-2 rounded-md bg-white/20 text-white"
          placeholder="e.g., Alice in Wonderland"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Paste Passage</label>
        <textarea
          rows={4}
          value={passage}
          onChange={e => setPassage(e.target.value)}
          className="w-full p-2 rounded-md bg-white/20 text-white"
          placeholder="Paste text here or upload a file below"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-bold">Upload Passage</label>
        <input type="file" accept=".txt,.pdf" onChange={handleFile} className="w-full" />
      </div>
      <button
        onClick={handleGenerate}
        disabled={!bookTitle || !passage || loading}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Words'}
      </button>
      {words.length > 0 && (
        <pre className="mt-4 bg-black/30 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(words, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default WordListPrompt;

