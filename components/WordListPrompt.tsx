import React, { useState } from 'react';
import { promptPresets, PromptCategory } from '../constants/promptPresets';

interface WordListPromptProps {
  value: string;
  onChange: (value: string) => void;
}

const tabLabels: Record<PromptCategory | 'custom', string> = {
  currentEvents: 'Current Events',
  books: 'Books',
  subjects: 'Subjects',
  custom: 'Saved',
};

const WordListPrompt: React.FC<WordListPromptProps> = ({ value, onChange }) => {
  const [activeTab, setActiveTab] = useState<PromptCategory | 'custom'>('currentEvents');
  const [customPrompts, setCustomPrompts] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('customPrompts') || '[]');
    } catch {
      return [];
    }
  });

  const categories = { ...promptPresets, custom: customPrompts } as Record<PromptCategory | 'custom', string[]>;
  const tabs = Object.keys(categories) as (PromptCategory | 'custom')[];

  const handleSelectPrompt = (prompt: string) => {
    onChange(prompt);
  };

  const handleSavePrompt = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const updated = Array.from(new Set([...customPrompts, trimmed]));
    setCustomPrompts(updated);
    localStorage.setItem('customPrompts', JSON.stringify(updated));
  };

  return (
    <div className="flex-1">
      <div className="flex gap-2 mb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 py-1 rounded ${activeTab === tab ? 'bg-yellow-300 text-black' : 'bg-white/20 text-white'}`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {categories[activeTab].map(prompt => (
          <button
            key={prompt}
            onClick={() => handleSelectPrompt(prompt)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded"
          >
            {prompt}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="p-2 rounded-md bg-white/20 text-white flex-1"
          placeholder="Topic (optional)"
        />
        <button
          onClick={handleSavePrompt}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default WordListPrompt;
