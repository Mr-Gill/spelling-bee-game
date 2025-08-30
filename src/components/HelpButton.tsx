import React, { useState } from 'react';
import { useHelpSystem } from '../contexts/HelpSystemContext';

interface HelpButtonProps {
  helpId: string;
  label: string;
  icon: string;
  price: number;
  cooldown?: number;
  onActivate: () => void;
  disabled?: boolean;
}

export const HelpButton: React.FC<HelpButtonProps> = ({
  helpId,
  label,
  icon,
  price,
  cooldown,
  onActivate,
  disabled = false,
}) => {
  const [isActive, setIsActive] = useState(false);
  const { isHelpUsed } = useHelpSystem();
  
  const handleClick = () => {
    if (disabled || isHelpUsed(helpId)) return;
    onActivate();
    setIsActive(true);
    // Reset active state after animation
    setTimeout(() => setIsActive(false), 1000);
  };

  const used = isHelpUsed(helpId);
  
  return (
    <button
      onClick={handleClick}
      disabled={disabled || used}
      className={`relative p-2 rounded-lg flex flex-col items-center justify-center 
        ${used 
          ? 'bg-gray-200 text-gray-500' 
          : disabled 
            ? 'bg-gray-100 text-gray-400' 
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        } 
        transition-all duration-200 ${isActive ? 'scale-110' : ''}`}
      aria-label={used ? `${label} (Used)` : label}
    >
      <span className="text-xl mb-1">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
      {!used && (
        <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs 
          rounded-full w-5 h-5 flex items-center justify-center">
          {price}
        </span>
      )}
      {cooldown && used && (
        <span className="absolute -bottom-1 -right-1 bg-gray-600 text-white text-[10px] 
          rounded-full w-4 h-4 flex items-center justify-center">
          ⌛
        </span>
      )}
    </button>
  );
};
