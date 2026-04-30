import React from 'react';
import { BattlePower } from '../utils/battleProgression';

interface BattlePowerUnlockProps {
  power: BattlePower;
  onDismiss: () => void;
}

/** Milliseconds before the modal auto-dismisses. */
const AUTO_DISMISS_DURATION_MS = 8000;

/**
 * Celebratory modal shown when a new battle power is unlocked.
 * Auto-dismisses after AUTO_DISMISS_DURATION_MS milliseconds.
 */
const BattlePowerUnlock: React.FC<BattlePowerUnlockProps> = ({ power, onDismiss }) => {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    timeoutRef.current = setTimeout(onDismiss, AUTO_DISMISS_DURATION_MS);
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="power-unlock-title"
    >
      <div className="relative bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 rounded-3xl p-8 max-w-sm w-full mx-4 text-white shadow-2xl text-center animate-bounce-in">
        {/* Sparkle ring */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-kahoot-yellow-400 via-kahoot-red-400 to-kahoot-yellow-400 opacity-60 blur-sm -z-10" />

        <div className="text-xs font-black uppercase tracking-widest text-kahoot-yellow-300 mb-2">
          🐝 New Power. The hive approved it.
        </div>

        <div className="text-7xl my-4 animate-wiggle select-none">{power.icon}</div>

        <h2
          id="power-unlock-title"
          className="text-2xl font-black mb-2 bg-gradient-to-r from-white to-kahoot-yellow-300 bg-clip-text text-transparent"
        >
          {power.name}
        </h2>

        <p className="text-white/90 text-base mb-2">{power.description}</p>

        <p className="text-kahoot-yellow-300 font-bold text-sm mb-6">
          Cost: {power.cost} {power.cost === 1 ? 'point' : 'points'} to use
        </p>

        <button
          onClick={onDismiss}
          className="w-full py-3 bg-gradient-to-r from-kahoot-yellow-400 to-kahoot-yellow-500 hover:from-kahoot-yellow-500 hover:to-kahoot-yellow-600 text-black font-black text-lg rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105"
          autoFocus
        >
          Got it. Let's go.
        </button>

        {/* Progress bar countdown — animation duration must match AUTO_DISMISS_DURATION_MS (8s) */}
        <div className="mt-4 h-1 w-full bg-white/20 rounded-full overflow-hidden">
          {/* animate-[shrink_8s_linear_forwards] must stay as a static string for Tailwind JIT scanning */}
          <div className="h-full bg-kahoot-yellow-400 rounded-full animate-[shrink_8s_linear_forwards]" />
        </div>
        <p className="mt-1 text-white/50 text-xs">The bee will move on in {AUTO_DISMISS_DURATION_MS / 1000} seconds.</p>
      </div>
    </div>
  );
};

export default BattlePowerUnlock;
