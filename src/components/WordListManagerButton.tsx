import { useState } from 'react';
import { List, X } from 'lucide-react';
import WordListManager from './WordListManager';
import { getActiveListId, setActiveListId } from '../services/wordlistService';

interface WordListManagerButtonProps {
  onSelectList?: () => void;
  className?: string;
}

export default function WordListManagerButton({ onSelectList, className = '' }: WordListManagerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeListId = getActiveListId();

  const handleSelectList = (list: any) => {
    setActiveListId(list.id);
    onSelectList?.();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors ${className}`}
        aria-label="Manage word lists"
      >
        <List size={18} />
        <span>{activeListId ? 'Change Word List' : 'Select Word List'}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Word List Manager</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <WordListManager 
                onSelectList={handleSelectList} 
                onClose={() => setIsOpen(false)} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
