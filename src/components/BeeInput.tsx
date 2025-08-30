import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import classNames from 'classnames';

interface BeeInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled' | 'flushed';
  fullWidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperTextClassName?: string;
}

const BeeInput = forwardRef<HTMLInputElement, BeeInputProps>(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'outlined',
  fullWidth = false,
  className = '',
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  helperTextClassName = '',
  disabled,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-3',
    lg: 'h-12 px-4 text-lg',
  };
  
  const variantClasses = {
    outlined: classNames(
      'bg-white/80 dark:bg-gray-800/80 border-2',
      'border-gray-300 dark:border-gray-600',
      'focus:border-bee-yellow-500 focus:ring-1 focus:ring-bee-yellow-500/30',
      'hover:border-gray-400 dark:hover:border-gray-500',
      'disabled:bg-gray-100 dark:disabled:bg-gray-700/50 disabled:border-gray-200 dark:disabled:border-gray-700',
      'transition-colors duration-200',
      'placeholder-gray-400 dark:placeholder-gray-500',
      'text-gray-900 dark:text-white',
      'focus:outline-none',
      'backdrop-blur-sm',
      error && 'border-red-500 dark:border-red-600 focus:border-red-500 dark:focus:border-red-600',
      isFocused && 'ring-2 ring-bee-yellow-500/30',
      'rounded-xl'
    ),
    filled: classNames(
      'bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent',
      'focus:border-bee-yellow-400 focus:ring-1 focus:ring-bee-yellow-500/30',
      'hover:bg-gray-100 dark:hover:bg-gray-700/70',
      'disabled:bg-gray-100 dark:disabled:bg-gray-800/50',
      'transition-colors duration-200',
      'placeholder-gray-500 dark:placeholder-gray-400',
      'text-gray-900 dark:text-white',
      'focus:outline-none',
      'backdrop-blur-sm',
      error && 'border-red-500 dark:border-red-600',
      isFocused && 'ring-2 ring-bee-yellow-500/30',
      'rounded-xl'
    ),
    flushed: classNames(
      'bg-transparent border-b-2',
      'border-gray-300 dark:border-gray-600',
      'focus:border-bee-yellow-500 focus:ring-0',
      'hover:border-gray-400 dark:hover:border-gray-500',
      'disabled:opacity-60',
      'transition-colors duration-200',
      'px-0.5',
      'placeholder-gray-400 dark:placeholder-gray-500',
      'text-gray-900 dark:text-white',
      'focus:outline-none',
      'rounded-none',
      error && 'border-red-500 dark:border-red-600',
      'pb-1'
    ),
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={classNames(
      'space-y-1.5',
      fullWidth && 'w-full',
      containerClassName
    )}>
      {label && (
        <label 
          htmlFor={props.id || props.name}
          className={classNames(
            'block text-sm font-medium',
            error ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300',
            disabled && 'opacity-60',
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      
      <div className={classNames(
        'relative',
        fullWidth && 'w-full',
        'flex items-center',
        variant !== 'flushed' && 'rounded-xl',
        isFocused && 'ring-2 ring-bee-yellow-500/30 rounded-xl',
        error && 'ring-2 ring-red-500/30 rounded-xl',
        'transition-all duration-200'
      )}>
        {leftIcon && (
          <div className={classNames(
            'absolute left-3 flex items-center justify-center',
            size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
            error ? 'text-red-500' : 'text-gray-400',
            disabled && 'opacity-50'
          )}>
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={classNames(
            'w-full',
            sizeClasses[size],
            variantClasses[variant],
            leftIcon && size === 'sm' ? 'pl-9' : leftIcon ? 'pl-10' : '',
            rightIcon && size === 'sm' ? 'pr-9' : rightIcon ? 'pr-10' : '',
            disabled ? 'cursor-not-allowed' : 'cursor-text',
            'transition-all duration-200',
            inputClassName,
            className
          )}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {rightIcon && (
          <div className={classNames(
            'absolute right-3 flex items-center justify-center',
            size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
            error ? 'text-red-500' : 'text-gray-400',
            disabled && 'opacity-50'
          )}>
            {rightIcon}
          </div>
        )}
      </div>
      
      {(helperText || error) && (
        <p className={classNames(
          'text-xs',
          error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400',
          disabled && 'opacity-60',
          helperTextClassName
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

BeeInput.displayName = 'BeeInput';

export default BeeInput;
