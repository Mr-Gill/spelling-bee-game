import useTimer from '../utils/useTimer';
import useSound from '../utils/useSound';
import timeoutSoundFile from '../audio/timeout.mp3';

const useGameTimer = (duration: number, soundEnabled: boolean, onExpire: () => void) => {
  const playTimeout = useSound(timeoutSoundFile, soundEnabled);
  return useTimer(duration, () => {
    playTimeout();
    onExpire();
  });
};

export default useGameTimer;
