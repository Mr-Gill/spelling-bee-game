export const launchConfetti = async (): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  // Dynamically import canvas-confetti
  const confetti = (await import('canvas-confetti')).default;
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}
