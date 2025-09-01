import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { AudioProvider, useAudio } from '../AudioContext';

describe('AudioContext', () => {
  it('should provide audio context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AudioProvider>{children}</AudioProvider>
    );
    
    const { result } = renderHook(() => useAudio(), { wrapper });
    expect(result.current).toHaveProperty('playSound');
    expect(result.current).toHaveProperty('preloadSound');
  });

  it('should throw error when used outside provider', () => {
    const { result } = renderHook(() => useAudio());
    expect(result.error).toBeDefined();
  });
});
