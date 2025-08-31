import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface HelpSystemContextType {
  revealLetter: (word: string, revealedIndices: Set<number>) => { letter: string; index: number } | null;
  getDefinition: (word: string) => Promise<string>;
  addTime: (seconds: number) => void;
  skipWord: () => void;
  isHelpUsed: (helpId: string) => boolean;
  setHelpUsed: (helpId: string) => void;
}

const HelpSystemContext = createContext<HelpSystemContextType | undefined>(undefined);

export const HelpSystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usedHelpItems, setUsedHelpItems] = useState<Set<string>>(new Set());

  const revealLetter = useCallback((word: string, revealedIndices: Set<number>): { letter: string; index: number } | null => {
    const hiddenIndices = [];
    for (let i = 0; i < word.length; i++) {
      if (!revealedIndices.has(i)) {
        hiddenIndices.push(i);
      }
    }
    
    if (hiddenIndices.length === 0) return null;
    
    const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
    return {
      letter: word[randomIndex],
      index: randomIndex
    };
  }, []);

  const getDefinition = useCallback(async (word: string): Promise<string> => {
    try {
      // In a real app, you would call your dictionary API here
      // For now, we'll return a mock response
      return `The definition of "${word}" would appear here.`;
    } catch (error) {
      console.error('Error fetching definition:', error);
      return 'Could not fetch definition. Please try again later.';
    }
  }, []);

  const addTime = useCallback((seconds: number) => {
    // This will be connected to the game timer in the GameScreen component
    // For now, we'll just dispatch a custom event
    window.dispatchEvent(new CustomEvent('addTime', { detail: { seconds } }));
  }, []);

  const skipWord = useCallback(() => {
    // This will be handled by the GameScreen component
    window.dispatchEvent(new CustomEvent('skipWord'));
  }, []);

  const isHelpUsed = useCallback((helpId: string): boolean => {
    return usedHelpItems.has(helpId);
  }, [usedHelpItems]);

  const setHelpUsed = useCallback((helpId: string) => {
    setUsedHelpItems(prev => new Set([...prev, helpId]));
  }, []);

  return (
    <HelpSystemContext.Provider 
      value={{
        revealLetter,
        getDefinition,
        addTime,
        skipWord,
        isHelpUsed,
        setHelpUsed,
      }}
    >
      {children}
    </HelpSystemContext.Provider>
  );
};

export const useHelpSystem = (): HelpSystemContextType => {
  const context = useContext(HelpSystemContext);
  if (!context) {
    throw new Error('useHelpSystem must be used within a HelpSystemProvider');
  }
  return context;
};
