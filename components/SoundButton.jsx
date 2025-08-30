// components/SoundButton.jsx
import React from 'react';
import { useAudio } from '../hooks/useAudio';

export function SoundButton({
  soundKey,
  children,
  className = '',
  onClick,
  disabled = false,
  variant = 'primary',
  ...props
}) {
  const { play } = useAudio(soundKey || 'BUTTON_CLICK');

  const handleClick = (e) => {
    if (!disabled) {
      play();
      if (onClick) onClick(e);
    }
  };

  const baseClasses = 'btn interactive focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform active:scale-95';

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
