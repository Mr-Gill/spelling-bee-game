import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { sizeMap } from './sizeMap';

type ProgressVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info';

export const ProgressBar: React.FC<{
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}> = ({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const progress = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const variantClasses = {
    primary: 'bg-bee-yellow-500',
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500',
  };
  
  const sizeClasses = {
    sm: 'h-1.5 text-xs',
    md: 'h-3 text-sm',
    lg: 'h-4 text-base',
  };
  
  return (
    <div className="w-full">
      <div className={classNames(
        'w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden',
        sizeClasses[size],
        className
      )}>
        <div className={classNames(
          'h-full flex items-center justify-end',
          variantClasses[variant]
        )}>
          <motion.div
            className="h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {showLabel && progress > 20 && (
              <span className="text-white font-medium px-2">
                {Math.round(progress)}%
              </span>
            )}
          </motion.div>
        </div>
      </div>
      {showLabel && progress <= 20 && (
        <div className="mt-1 text-right">
          <span className="text-gray-600 dark:text-gray-300">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export const LinearProgress = ProgressBar;

export const CircularProgress: React.FC<{
  value: number;
  size?: 'sm' | 'md' | 'lg';
  strokeWidth?: number;
  variant?: ProgressVariant;
  className?: string;
}> = ({
  value = 0,
  size = 'md',
  strokeWidth = 4,
  variant = 'primary',
  className = '',
}) => {
  const numericSize = sizeMap[size] || sizeMap.md;
  const radius = (numericSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(Math.max(0, value), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const variantColors = {
    primary: '#F59E0B', // bee yellow
    success: '#10B981', // green-500
    danger: '#EF4444',  // red-500
    warning: '#F59E0B', // amber-500
    info: '#3B82F6',   // blue-500
  };
  
  return (
    <div className={classNames('relative inline-flex items-center justify-center', className)}>
      <svg
        className="transform -rotate-90"
        width={numericSize}
        height={numericSize}
        viewBox={`0 0 ${numericSize} ${numericSize}`}
      >
        <circle
          className="text-gray-100 dark:text-gray-700"
          cx={numericSize / 2}
          cy={numericSize / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={numericSize / 2}
          cy={numericSize / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          stroke={variantColors[variant]}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-gray-800 dark:text-white">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};
