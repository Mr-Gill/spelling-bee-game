import React from 'react';

interface CircularTimerProps {
  timeLeft: number;
  total: number;
  warningThreshold?: number;
}

const CircularTimer: React.FC<CircularTimerProps> = ({
  timeLeft,
  total,
  warningThreshold = 10,
}) => {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = timeLeft / total;
  const strokeDashoffset = circumference - progress * circumference;
  const isWarning = timeLeft <= warningThreshold;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="transform -rotate-90 w-32 h-32"
    >
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className="text-gray-700"
      />
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        className={`${isWarning ? 'text-red-500 animate-pulse' : 'text-yellow-300'} transition-stroke`}
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-3xl font-bold fill-current text-white rotate-90"
      >
        {timeLeft}
      </text>
    </svg>
  );
};

export default CircularTimer;
