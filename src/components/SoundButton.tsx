// components/SoundButton.tsx
import React from 'react';
import { useAudio } from '../../hooks/useAudio';

export type SoundButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';

export interface SoundButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  soundKey?: string;
  disabled?: boolean;
  variant?: SoundButtonVariant;
}

export function SoundButton({
  soundKey,
  children,
  className = '',
  onClick,
  disabled = false,
  variant = 'primary',
  ...props
}: SoundButtonProps): JSX.Element {
  const { play } = useAudio(soundKey || 'BUTTON_CLICK');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      play();
      if (onClick) onClick(e);
    }
  };

  const baseClasses =
    'btn interactive focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform active:scale-95';

  const variantClasses: Record<SoundButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
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
