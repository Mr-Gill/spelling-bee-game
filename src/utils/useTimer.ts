import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Countdown timer hook.
 * @param duration Initial duration in seconds
 * @param onExpire Callback invoked when timer reaches 0
 */
const useTimer = (duration: number, onExpire: () => void) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clear = () => clearInterval(intervalRef.current as NodeJS.Timeout);

  const tick = useCallback(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        clear();
        onExpire();
        return 0;
      }
      return prev - 1;
    });
  }, [onExpire]);

  const start = useCallback(() => {
    clear();
    setTimeLeft(duration);
    intervalRef.current = setInterval(tick, 1000);
    setIsPaused(false);
  }, [duration, tick]);

  const pause = useCallback(() => {
    clear();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (!isPaused) return;
    intervalRef.current = setInterval(tick, 1000);
    setIsPaused(false);
  }, [isPaused, tick]);

  const reset = useCallback(() => setTimeLeft(duration), [duration]);

  const stop = useCallback(() => {
    clear();
  }, []);

  useEffect(() => () => clear(), []);

  return { timeLeft, start, pause, resume, reset, stop, isPaused };
};

export default useTimer;
