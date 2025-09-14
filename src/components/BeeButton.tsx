import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface BeeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'tonal' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  ripple?: boolean;
}

const BeeButton: React.FC<BeeButtonProps> = ({
  children,
  variant = 'filled',
  size = 'md',
  isFullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  ripple = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-full transition-all duration-medium1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus-visible:ring-4 focus-visible:transition focus-visible:duration-short2 disabled:opacity-38 disabled:pointer-events-none';
  
  const sizeClasses = {
    sm: 'h-8 px-4 text-label-medium',
    md: 'h-10 px-6 text-label-large',
    lg: 'h-12 px-8 text-label-large',
  };

  const variantClasses = {
    filled: classNames(
      'bg-primary-500 text-on-primary',
      'hover:bg-primary-600',
      'focus:bg-primary-700',
      'shadow-elevation-1 hover:shadow-elevation-2',
      'disabled:bg-on-surface/12'
    ),
    tonal: classNames(
      'bg-secondary-container text-on-secondary-container',
      'hover:bg-secondary-container-hover',
      'focus:bg-secondary-container-focus',
      'shadow-elevation-1 hover:shadow-elevation-2',
      'disabled:bg-on-surface/12'
    ),
    outlined: classNames(
      'bg-surface text-primary',
      'border border-outline',
      'hover:bg-primary-8',
      'focus:bg-primary-12',
      'disabled:border-on-surface/12'
    ),
    text: classNames(
      'text-primary',
      'hover:bg-primary-8',
      'focus:bg-primary-12',
      'disabled:text-on-surface/38'
    ),
  };

  return (
    <button
      className={classNames(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        isFullWidth && 'w-full',
        'relative',
        ripple &&
          'overflow-hidden after:content-[""] after:absolute after:inset-0 after:rounded-full after:bg-current after:opacity-0 after:transition-transform after:duration-short4 after:scale-0 active:after:opacity-20 active:after:scale-125',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/8">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
        </div>
      )}
      
      <span className={classNames(
        'flex items-center gap-2',
        isLoading ? 'opacity-0' : 'opacity-100'
      )}>
        {leftIcon && <span className="material-symbols-outlined text-xl">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="material-symbols-outlined text-xl">{rightIcon}</span>}
      </span>
    </button>
  );
};

export default BeeButton;
