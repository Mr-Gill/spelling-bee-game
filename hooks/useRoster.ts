import { useState, useEffect } from 'react';
import { Participant } from '../types';

/**
 * Manage a roster of participants with localStorage persistence.
 * @param storageKey Key used to persist the roster
 * @param defaultParticipants Initial participants when none are stored
 */
export const useRoster = (
  storageKey: string,
  defaultParticipants: Participant[] = []
) => {
  const [participants, setParticipants] = useState<Participant[]>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved) as Participant[];
      } catch {
        return defaultParticipants;
      }
    }
    return defaultParticipants;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(participants));
  }, [storageKey, participants]);

  const addParticipant = (participant: Participant) =>
    setParticipants(prev => [...prev, participant]);

  const removeParticipant = (index: number) =>
    setParticipants(prev => prev.filter((_, i) => i !== index));

  const updateName = (index: number, name: string) =>
    setParticipants(prev => prev.map((p, i) => (i === index ? { ...p, name } : p)));

  const clear = () => {
    localStorage.removeItem(storageKey);
    setParticipants(defaultParticipants);
  };

  return { participants, addParticipant, removeParticipant, updateName, clear, setParticipants };
};

export default useRoster;
