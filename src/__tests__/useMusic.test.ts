import { renderHook } from '@testing-library/react-hooks';
import useMusic from '../utils/useMusic';

describe('useMusic', () => {
  beforeEach(() => {
    window.AudioContext = jest.fn().mockImplementation(() => ({
      decodeAudioData: jest.fn()
    }));
  });

  it('should initialize audio context', async () => {
    const { result } = renderHook(() => useMusic());
    result.current.initAudio();
    expect(result.current.getAudioContext()).toBeDefined();
  });

  it('should load audio successfully', async () => {
    const { result } = renderHook(() => useMusic());
    result.current.initAudio();
    
    const mockBuffer = {};
    const mockDecode = jest.fn().mockResolvedValue(mockBuffer);
    const mockFetch = jest.fn().mockResolvedValue({ arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8)) });
    
    global.fetch = mockFetch;
    (result.current.getAudioContext() as any).decodeAudioData = mockDecode;
    
    const buffer = await result.current.loadAudio('test.mp3');
    expect(buffer).toBe(mockBuffer);
  });
});
