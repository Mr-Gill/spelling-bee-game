import { useEffect, useRef } from 'react';
import { avatars } from '@constants/avatars';

type AvatarType = 'bee' | 'book' | 'trophy' | 'wizard' | 'ninja';

type AvatarSelectorProps = {
  currentAvatar: AvatarType;
  onSelect: (avatar: AvatarType) => void;
  availableAvatars?: AvatarType[];
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
};

export default function AvatarSelector({ 
  currentAvatar, 
  onSelect, 
  availableAvatars, 
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy
}: AvatarSelectorProps) {
  const avatarListRef = useRef<HTMLDivElement>(null);
  
  const displayAvatars = availableAvatars && availableAvatars.length > 0
    ? Object.fromEntries(
        availableAvatars
          .filter((key): key is AvatarType => key in avatars)
          .map((key) => [key, avatars[key]])
      )
    : avatars;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!avatarListRef.current) return;
      
      const buttons = Array.from(
        avatarListRef.current.querySelectorAll<HTMLButtonElement>('[role="radio"]')
      );
      
      if (!buttons.length) return;
      
      const currentIndex = buttons.findIndex(button => 
        button.getAttribute('aria-checked') === 'true'
      );
      
      let nextIndex = currentIndex;
      
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = (currentIndex + 1) % buttons.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = buttons.length - 1;
          break;
        default:
          return;
      }
      
      buttons[nextIndex]?.focus();
    };
    
    const list = avatarListRef.current;
    list?.addEventListener('keydown', handleKeyDown);
    
    return () => {
      list?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div 
      ref={avatarListRef}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      className="avatar-selector flex flex-wrap gap-4 p-2"
    >
      {Object.entries(displayAvatars).map(([key, avatar]) => {
        const isSelected = currentAvatar === key;
        return (
          <button
            key={key}
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            className={`avatar-option p-2 rounded-full transition-all ${
              isSelected 
                ? 'ring-4 ring-yellow-400 scale-110' 
                : 'hover:bg-white/20 focus:ring-2 focus:ring-yellow-400'
            }`}
            onClick={() => onSelect(key as AvatarType)}
            aria-label={`Select ${avatar.name} avatar`}
          >
            <img 
              src={avatar.icon} 
              alt="" 
              className="w-12 h-12" 
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
};
