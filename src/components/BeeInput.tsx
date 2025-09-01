import React, { InputHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';

interface BeeInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled';
  fullWidth?: boolean;
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
  disabled,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-label-small',
    md: 'h-10 px-4 text-label-medium',
    lg: 'h-12 px-4 text-label-large',
  };
  
  const variantClasses = {
    outlined: classNames(
      'bg-surface text-on-surface',
      'border border-outline',
      'hover:border-on-surface',
      'focus:border-primary focus:ring-1 focus:ring-primary',
      'disabled:bg-on-surface/12 disabled:border-on-surface/12',
      'rounded-extra-small',
      error && 'border-error focus:border-error focus:ring-error'
    ),
    filled: classNames(
      'bg-surface-container-highest text-on-surface',
      'border-b border-on-surface-variant',
      'hover:bg-surface-container-high',
      'focus:border-b-primary focus:bg-surface-container-high',
      'disabled:bg-on-surface/12 disabled:border-on-surface/38',
      'rounded-t-extra-small',
      error && 'border-b-error focus:border-b-error'
    ),
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
  };

  return (
    <div className={classNames('space-y-1', fullWidth && 'w-full')}>
      {label && (
        <label 
          htmlFor={props.id || props.name}
          className={classNames(
            'block text-label-medium',
            error ? 'text-error' : 'text-on-surface-variant',
            disabled && 'text-on-surface/38'
          )}
        >
          {label}
        </label>
      )}
      
      <div className={classNames(
        'relative',
        fullWidth && 'w-full',
        'flex items-center'
      )}>
        {leftIcon && (
          <div className={classNames(
            'absolute left-3 flex items-center justify-center',
            'h-5 w-5',
            error ? 'text-error' : 'text-on-surface-variant',
            disabled && 'text-on-surface/38'
          )}>
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={classNames([
            'w-full',
            sizeClasses[size],
            variantClasses[variant],
            leftIcon ? 'pl-10' : '',
            rightIcon ? 'pr-10' : '',
            disabled ? 'cursor-not-allowed' : 'cursor-text',
            className
          ])}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {rightIcon && (
          <div className={classNames(
            'absolute right-3 flex items-center justify-center',
            'h-5 w-5',
            error ? 'text-error' : 'text-on-surface-variant',
            disabled && 'text-on-surface/38'
          )}>
            {rightIcon}
          </div>
        )}
      </div>
      
      {(helperText || error) && (
        <p className={classNames(
          'text-label-small',
          error ? 'text-error' : 'text-on-surface-variant',
          disabled && 'text-on-surface/38'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

BeeInput.displayName = 'BeeInput';

export default BeeInput;
