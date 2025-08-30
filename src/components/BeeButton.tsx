import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface BeeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  isActive?: boolean;
}

const BeeButton: React.FC<BeeButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  isActive = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  const variantClasses = {
    primary: classNames(
      'bg-gradient-to-r from-bee-yellow-500 to-bee-yellow-600 text-bee-black-700',
      'hover:from-bee-yellow-600 hover:to-bee-yellow-700',
      'focus:ring-bee-yellow-500',
      'shadow-md hover:shadow-lg shadow-bee-yellow-500/30 hover:shadow-bee-yellow-500/40',
      'border-2 border-bee-yellow-700',
      isActive && 'ring-2 ring-offset-2 ring-bee-yellow-500'
    ),
    secondary: classNames(
      'bg-gradient-to-r from-primary-500 to-primary-600 text-white',
      'hover:from-primary-600 hover:to-primary-700',
      'focus:ring-primary-500',
      'shadow-md hover:shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40',
      'border-2 border-primary-600',
      isActive && 'ring-2 ring-offset-2 ring-primary-500'
    ),
    outline: classNames(
      'bg-white/80 text-bee-black-700 border-2 border-bee-yellow-500',
      'hover:bg-bee-yellow-50/50 hover:border-bee-yellow-600',
      'focus:ring-bee-yellow-500',
      'dark:bg-gray-800/80 dark:text-gray-200 dark:border-bee-yellow-600',
      'dark:hover:bg-gray-700/80 dark:hover:border-bee-yellow-500',
      'backdrop-blur-sm',
      isActive && 'ring-2 ring-offset-2 ring-bee-yellow-500'
    ),
    ghost: classNames(
      'text-bee-black-600 hover:text-bee-black-800',
      'dark:text-gray-300 dark:hover:text-white',
      'hover:bg-bee-yellow-100/50 dark:hover:bg-gray-700/50',
      'focus:ring-bee-yellow-500',
      isActive && 'bg-bee-yellow-100/80 dark:bg-gray-700/80'
    ),
  };

  return (
    <button
      className={classNames(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        isFullWidth && 'w-full',
        'relative overflow-hidden',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 backdrop-blur-sm">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-bee-yellow-500 border-t-transparent" />
        </div>
      )}
      
      {/* Button content */}
      <span className={classNames(
        'flex items-center gap-2',
        isLoading ? 'opacity-0' : 'opacity-100'
      )}>
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </span>
      
      {/* Hover effect */}
      <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="absolute inset-0 bg-gradient-to-r from-yellow-100/20 to-transparent" />
      </span>
    </button>
  );
};

export default BeeButton;
