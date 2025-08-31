import React, { useState, useEffect } from 'react';
import { ProgressBar, CircularProgress } from '../components/BeeProgress';

export const ProgressDemo: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-bee-yellow-600 dark:text-bee-yellow-400">
        Progress Components
      </h1>
      
      <div className="space-y-8">
        {/* Basic Progress Bar */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Basic Progress Bar</h2>
          <ProgressBar value={progress} showLabel />
        </div>
        
        {/* Variants */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Color Variants</h2>
          <div className="space-y-3">
            {['primary', 'success', 'danger', 'warning', 'info'].map((variant) => (
              <div key={variant}>
                <p className="capitalize text-sm mb-1">{variant}</p>
                <ProgressBar 
                  value={progress} 
                  variant={variant as any} 
                  className="mb-4"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Sizes */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Sizes</h2>
          <div className="space-y-3">
            {['sm', 'md', 'lg'].map((size) => (
              <div key={size}>
                <p className="capitalize text-sm mb-1">{size}</p>
                <ProgressBar 
                  value={progress} 
                  size={size as any}
                  showLabel
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Circular Progress */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Circular Progress</h2>
          <div className="flex flex-wrap gap-8 items-center">
            {['primary', 'success', 'danger', 'warning', 'info'].map((variant) => (
              <div key={variant} className="flex flex-col items-center">
                <CircularProgress 
                  value={progress} 
                  variant={variant as any}
                  size={60}
                  strokeWidth={6}
                />
                <span className="mt-2 text-sm capitalize">{variant}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Loading State */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Loading State</h2>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            {isLoading ? (
              <div className="flex items-center space-x-4">
                <CircularProgress value={progress} />
                <div className="flex-1">
                  <p className="font-medium">Loading your content...</p>
                  <ProgressBar 
                    value={progress} 
                    size="sm" 
                    className="mt-2"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="text-lg font-medium">All done!</h3>
                <p className="text-gray-600 dark:text-gray-400">Your content is ready.</p>
                <button
                  onClick={() => {
                    setProgress(0);
                    setIsLoading(true);
                    setTimeout(() => {
                      const timer = setInterval(() => {
                        setProgress((prev) => {
                          if (prev >= 100) {
                            clearInterval(timer);
                            setIsLoading(false);
                            return 100;
                          }
                          return prev + 5;
                        });
                      }, 200);
                    }, 300);
                  }}
                  className="mt-4 bg-bee-yellow-500 hover:bg-bee-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Reset Demo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDemo;
