export const launchConfetti = () => {
  if (typeof window === 'undefined') return;
  const scriptId = 'confetti-script';
  const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!existing) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    script.onload = () => {
      (window as any).confetti?.();
    };
    document.body.appendChild(script);
  } else {
    (window as any).confetti?.();
  }
};
