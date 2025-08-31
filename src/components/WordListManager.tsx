import { useState, useEffect } from 'react';
import { Download, Upload, Trash2, Plus, Save, X } from 'lucide-react';

export interface WordList {
  id: string;
  name: string;
  description?: string;
  words: Array<{
    word: string;
    definition: string;
    difficulty?: 'easy' | 'medium' | 'hard';
  }>;
  createdAt: string;
  updatedAt: string;
}

interface WordListManagerProps {
  onSelectList?: (list: WordList) => void;
  onClose?: () => void;
}

export default function WordListManager({ onSelectList, onClose }: WordListManagerProps) {
  const [wordLists, setWordLists] = useState<WordList[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('wordLists') || '[]');
    } catch {
      return [];
    }
  });
  const [currentList, setCurrentList] = useState<WordList | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importData, setImportData] = useState('');
  const [error, setError] = useState('');

  // Save word lists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wordLists', JSON.stringify(wordLists));
  }, [wordLists]);

  const createNewList = () => {
    const newList: WordList = {
      id: Date.now().toString(),
      name: 'New Word List',
      description: '',
      words: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCurrentList(newList);
    setIsEditing(true);
  };

  const saveList = () => {
    if (!currentList) return;
    
    setWordLists(prev => {
      const existingIndex = prev.findIndex(list => list.id === currentList.id);
      const updatedList = {
        ...currentList,
        updatedAt: new Date().toISOString(),
      };
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = updatedList;
        return updated;
      } else {
        return [...prev, updatedList];
      }
    });
    
    setIsEditing(false);
  };

  const deleteList = (id: string) => {
    if (window.confirm('Are you sure you want to delete this word list?')) {
      setWordLists(prev => prev.filter(list => list.id !== id));
      if (currentList?.id === id) {
        setCurrentList(null);
        setIsEditing(false);
      }
    }
  };

  const exportList = (list: WordList) => {
    const data = JSON.stringify(list, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${list.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      const data = JSON.parse(importData);
      // Basic validation
      if (!data.name || !Array.isArray(data.words)) {
        throw new Error('Invalid word list format');
      }
      
      // Generate a new ID to avoid conflicts
      const importedList: WordList = {
        ...data,
        id: Date.now().toString(),
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setWordLists(prev => [...prev, importedList]);
      setImportData('');
      setIsImporting(false);
      setCurrentList(importedList);
      setError('');
    } catch (err) {
      setError('Failed to import word list. Please check the format and try again.');
      console.error('Import error:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Word List Manager</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close word list manager"
        >
          <X size={24} />
        </button>
      </div>

      {!isEditing && !isImporting && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Word Lists</h3>
            <div className="space-x-2">
              <button
                onClick={() => setIsImporting(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                <Upload size={16} /> Import
              </button>
              <button
                onClick={createNewList}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200"
              >
                <Plus size={16} /> New List
              </button>
            </div>
          </div>

          {wordLists.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No word lists found. Create your first word list to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wordLists.map(list => (
                <div key={list.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-lg">{list.name}</h4>
                      {list.description && <p className="text-sm text-gray-600 mt-1">{list.description}</p>}
                      <p className="text-xs text-gray-500 mt-2">
                        {list.words.length} words • Updated {new Date(list.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => exportList(list)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        aria-label={`Export ${list.name}`}
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentList(list);
                          setIsEditing(true);
                        }}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                        aria-label={`Edit ${list.name}`}
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={() => deleteList(list.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        aria-label={`Delete ${list.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => onSelectList?.(list)}
                      className="w-full py-1.5 text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded"
                    >
                      Use This List
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isImporting && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Import Word List</h3>
            <button
              onClick={() => {
                setIsImporting(false);
                setError('');
                setImportData('');
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="import-data" className="block text-sm font-medium text-gray-700">
              Paste your word list (JSON format):
            </label>
            <textarea
              id="import-data"
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder={
                '{\n  "name": "My Word List",\n  "description": "Description of the list",\n  "words": [\n    {\n      "word": "example",\n      "definition": "A representative form or pattern",\n      "difficulty": "easy"\n    }\n  ]\n}'
              }
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={() => {
                setIsImporting(false);
                setError('');
                setImportData('');
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={!importData.trim()}
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${!importData.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Import
            </button>
          </div>
        </div>
      )}

      {isEditing && currentList && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {wordLists.some(l => l.id === currentList.id) ? 'Edit' : 'New'} Word List
            </h3>
            <button
              onClick={() => {
                setIsEditing(false);
                setCurrentList(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="list-name" className="block text-sm font-medium text-gray-700">
                List Name *
              </label>
              <input
                type="text"
                id="list-name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={currentList.name}
                onChange={(e) => setCurrentList({...currentList, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label htmlFor="list-description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="list-description"
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={currentList.description || ''}
                onChange={(e) => setCurrentList({...currentList, description: e.target.value})}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Words</label>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentList({
                      ...currentList,
                      words: [...currentList.words, { word: '', definition: '', difficulty: 'medium' }]
                    });
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add Word
                </button>
              </div>
              
              <div className="mt-2 space-y-2">
                {currentList.words.map((word, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Word"
                      className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                      value={word.word}
                      onChange={(e) => {
                        const words = [...currentList.words];
                        words[index] = { ...words[index], word: e.target.value };
                        setCurrentList({ ...currentList, words });
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Definition"
                      className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                      value={word.definition}
                      onChange={(e) => {
                        const words = [...currentList.words];
                        words[index] = { ...words[index], definition: e.target.value };
                        setCurrentList({ ...currentList, words });
                      }}
                    />
                    <select
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                      value={word.difficulty || 'medium'}
                      onChange={(e) => {
                        const words = [...currentList.words];
                        words[index] = { 
                          ...words[index], 
                          difficulty: e.target.value as 'easy' | 'medium' | 'hard' 
                        };
                        setCurrentList({ ...currentList, words });
                      }}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const words = currentList.words.filter((_, i) => i !== index);
                        setCurrentList({ ...currentList, words });
                      }}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Remove word"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                
                {currentList.words.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No words added yet. Click "Add Word" to get started.</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentList(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveList}
                disabled={!currentList.name.trim() || currentList.words.length === 0}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
                  !currentList.name.trim() || currentList.words.length === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                Save List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
