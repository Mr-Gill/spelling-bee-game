import React from 'react';
import { useHelpSystem } from '../contexts/HelpSystemContext';

interface HelpItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
}

interface HelpShopProps {
  onClose: () => void;
  coins: number;
  onPurchase: (cost: number) => void;
}

export const HelpShop: React.FC<HelpShopProps> = ({ onClose, coins, onPurchase }) => {
  const { isHelpUsed, setHelpUsed } = useHelpSystem();
  
  const handlePurchase = (item: HelpItem) => {
    if (coins >= item.cost) {
      onPurchase(item.cost);
      setHelpUsed(item.id);
    }
  };

  const helpItems: HelpItem[] = [
    {
      id: 'reveal-letter',
      name: 'Reveal Letter',
      description: 'Reveals one random letter in the current word',
      cost: 10,
      icon: '🔤',
    },
    {
      id: 'show-definition',
      name: 'Show Definition',
      description: 'Displays the definition of the current word',
      cost: 15,
      icon: '📖',
    },
    {
      id: 'add-time',
      name: 'Add Time',
      description: 'Adds 30 seconds to the timer',
      cost: 20,
      icon: '⏱️',
    },
    {
      id: 'skip-word',
      name: 'Skip Word',
      description: 'Skips to the next word',
      cost: 25,
      icon: '⏭️',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Help Shop</h2>
          <div className="flex items-center">
            <span className="mr-2">Your coins:</span>
            <span className="font-bold">{coins}</span>
          </div>
        </div>
        <div className="space-y-4">
          {helpItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <button 
                className={`px-3 py-1 rounded-md ${coins >= item.cost && !isHelpUsed(item.id) 
                  ? 'bg-bee-yellow-500 text-white' 
                  : 'bg-gray-200 text-gray-500'}`}
                disabled={isHelpUsed(item.id) || coins < item.cost}
                onClick={() => handlePurchase(item)}
              >
                {item.cost} pts
              </button>
            </div>
          ))}
        </div>
        <button 
          onClick={onClose}
          className="mt-6 w-full py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};
