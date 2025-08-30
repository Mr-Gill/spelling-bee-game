import { useState, useEffect } from 'react';

/**
 * Manage a roster of items (participants, teams, etc.) with localStorage
 * persistence.
 * @param storageKey Key used to persist the roster
 * @param defaultParticipants Initial participants when none are stored
 */
export const useRoster = <T>(
  storageKey: string,
  defaultParticipants: T[] = []
) => {
  const [participants, setParticipants] = useState<T[]>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved) as T[];
      } catch {
        return defaultParticipants;
      }
    }
    return defaultParticipants;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(participants));
  }, [storageKey, participants]);

  const addParticipant = (participant: T) =>
    setParticipants(prev => [...prev, participant]);

  const removeParticipant = (index: number) =>
    setParticipants(prev => prev.filter((_, i) => i !== index));

  const updateName = (index: number, name: string) =>
    setParticipants(prev =>
      prev.map((p, i) =>
        i === index ? ({ ...(p as any), name } as T) : p,
      ),
    );

  const clear = () => {
    localStorage.removeItem(storageKey);
    setParticipants(defaultParticipants);
  };

  return {
    participants,
    addParticipant,
    removeParticipant,
    updateName,
    clear,
    setParticipants,
  };
};

export default useRoster;
