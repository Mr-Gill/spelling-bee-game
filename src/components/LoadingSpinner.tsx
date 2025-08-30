import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'yellow' | 'black';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'yellow',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const colorClasses = {
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    yellow: 'text-bee-yellow-500',
    black: 'text-bee-black-500',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Bee body */}
        <div className={`${sizeClasses[size]} ${colorClasses[color]} relative`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin"
            style={{
              animationDuration: '1.5s',
            }}
          >
            <path
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <path
              d="M12 2a9.95 9.95 0 00-7.071 2.929A9.95 9.95 0 002 12h2a8 8 0 018-8V2z"
              fill="currentColor"
            />
          </svg>
          
          {/* Wings */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/30 rounded-full animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-white/30 rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-yellow-100/30 blur-md -z-10 animate-pulse" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
