import confetti from 'canvas-confetti';

export const launchConfetti = (): void => {
  if (typeof window === 'undefined') return;
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};
