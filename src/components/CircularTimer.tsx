import React from "react";

interface CircularTimerProps {
  timeLeft: number;
  total: number;
}

const CircularTimer: React.FC<CircularTimerProps> = ({ timeLeft, total }) => {
  const radius = 50;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = timeLeft / total;
  const strokeDashoffset = circumference - progress * circumference;
  const isEnding = timeLeft <= Math.max(10, total * 0.1);

  return (
    <div className="relative w-24 h-24">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          strokeLinecap="round"
          stroke="#f59e0b"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={`transition-all duration-1000 ease-linear ${
            isEnding ? "animate-pulse stroke-red-500" : "stroke-yellow-300"
          }`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
        {timeLeft}
      </div>
    </div>
  );
};

export default CircularTimer;
