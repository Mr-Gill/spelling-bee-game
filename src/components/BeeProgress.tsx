import React from 'react';

interface ProgressBarProps {
  progress: number;
  color?: string | string[]; // Accept single color or gradient
  height?: number;
  animated?: boolean;
  showMilestones?: boolean;
  showPercentage?: boolean;
}

const BeeProgress: React.FC<ProgressBarProps> = ({
  progress = 0,
  color = '#4CAF50',
  height = 8,
  animated = true,
  showMilestones = false,
  showPercentage = false
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  // Handle gradient or single color
  const getBackground = () => {
    if (Array.isArray(color)) {
      return `linear-gradient(to right, ${color.join(', ')})`;
    }
    return color;
  };

  return (
    <div className="relative">
      <div 
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          height: `${height}px`,
          backgroundColor: '#e0e0e0',
          borderRadius: height,
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${clampedProgress}%`,
            background: getBackground(),
            height: '100%',
            transition: animated ? 'width 300ms ease-out' : 'none',
            borderRadius: height
          }}
        />
      </div>
      
      {showPercentage && (
        <div className="text-center mt-1 text-sm">
          {clampedProgress}%
        </div>
      )}
      
      {showMilestones && (
        <div className="flex justify-between mt-1">
          {[25, 50, 75, 100].map((milestone) => (
            <div 
              key={milestone}
              className={`w-2 h-2 rounded-full ${clampedProgress >= milestone ? 'bg-green-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BeeProgress;
export const CircularProgress = BeeProgress;
export const LinearProgress = BeeProgress;
