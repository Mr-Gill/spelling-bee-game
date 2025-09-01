import { useState, useCallback } from 'react';
import type { Participant } from '../types';

export function useParticipants(initialParticipants: Participant[] = []) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
  
  const addParticipant = useCallback((participant: Participant) => {
    setParticipants(prev => [...prev, participant]);
  }, []);
  
  const nextParticipant = useCallback(() => {
    setCurrentParticipantIndex(prev => (prev + 1) % participants.length);
  }, [participants.length]);
  
  return {
    participants,
    currentParticipantIndex,
    addParticipant,
    nextParticipant,
    setParticipants,
    setCurrentParticipantIndex
  };
}
