import React from "react";

const defaultPhrases = [
  "Great job!",
  "Keep it up!",
  "You're doing awesome!",
  "Nice effort!",
  "Believe in yourself!",
];

interface EncouragementBannerProps {
  onDone?: () => void;
  duration?: number;
}

const getCustomPhrases = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("encouragementPhrases") || "[]");
  } catch {
    return [];
  }
};

const EncouragementBanner: React.FC<EncouragementBannerProps> = ({ onDone, duration = 1500 }) => {
  const [visible, setVisible] = React.useState(true);
  const [phrase, setPhrase] = React.useState("");

  React.useEffect(() => {
    const custom = getCustomPhrases();
    const phrases = [...defaultPhrases, ...custom];
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
    const hide = setTimeout(() => setVisible(false), duration);
    const cleanup = setTimeout(() => {
      if (onDone) onDone();
    }, duration + 500);
    return () => {
      clearTimeout(hide);
      clearTimeout(cleanup);
    };
  }, [duration, onDone]);

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
        {phrase}
      </div>
    </div>
  );
};

export default EncouragementBanner;
