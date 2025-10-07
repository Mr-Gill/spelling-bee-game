import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import useMusic from '../utils/useMusic';
import { audioManager } from '../utils/audio.ts';

const mockHowl = {
  on: jest.fn(),
  off: jest.fn(),
  playing: jest.fn().mockReturnValue(false),
};

jest.mock('../constants', () => ({
  musicFiles: {
    funk: 'funk.mp3',
    funk_instrumental: 'funk-instrumental.mp3',
  },
  DEFAULT_STYLE: 'funk',
}));

jest.mock('../utils/audio.ts', () => ({
  audioManager: {
    setMusicVolume: jest.fn(),
    getMusic: jest.fn(() => mockHowl),
    loadMusic: jest.fn(),
    playMusic: jest.fn().mockReturnValue(1),
    pauseMusic: jest.fn(),
    resumeMusic: jest.fn(),
    stopMusic: jest.fn(),
  },
}));

describe('useMusic', () => {
  const mockedAudioManager = audioManager as jest.Mocked<typeof audioManager>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockHowl.playing.mockReturnValue(false);
  });

  it('loads and plays music when enabled', async () => {
    renderHook(() => useMusic('Funk', 'vocal', 0.5, true, 'menu', true));

    await waitFor(() => {
      expect(mockedAudioManager.loadMusic).toHaveBeenCalledWith(
        'funk',
        'funk.mp3',
        expect.objectContaining({ loop: true })
      );
      expect(mockedAudioManager.playMusic).toHaveBeenCalledWith(
        'funk',
        expect.objectContaining({ loop: true })
      );
    });
  });

  it('pauses music when sound is disabled', async () => {
    const { rerender } = renderHook(
      ({ enabled }) => useMusic('Funk', 'vocal', 0.5, enabled, 'menu', true),
      { initialProps: { enabled: true } }
    );

    await waitFor(() => {
      expect(mockedAudioManager.playMusic).toHaveBeenCalled();
    });

    rerender({ enabled: false });

    await waitFor(() => {
      expect(mockedAudioManager.pauseMusic).toHaveBeenCalled();
    });
  });

  it('pauses and resumes when toggling playback', async () => {
    const { rerender } = renderHook(
      ({ playing }) => useMusic('Funk', 'vocal', 0.5, true, 'menu', playing),
      { initialProps: { playing: true } }
    );

    await waitFor(() => {
      expect(mockedAudioManager.playMusic).toHaveBeenCalled();
    });

    rerender({ playing: false });

    await waitFor(() => {
      expect(mockedAudioManager.pauseMusic).toHaveBeenCalled();
    });

    rerender({ playing: true });

    await waitFor(() => {
      expect(mockedAudioManager.resumeMusic).toHaveBeenCalled();
    });
  });
});
