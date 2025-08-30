import { FC } from 'react';
import { avatars } from '@constants/avatars';

type AvatarType = 'bee' | 'book' | 'trophy' | 'wizard' | 'ninja';

type AvatarSelectorProps = {
  currentAvatar: AvatarType;
  onSelect: (avatar: AvatarType) => void;
  availableAvatars?: AvatarType[];
};

export default function AvatarSelector({ currentAvatar, onSelect, availableAvatars }: AvatarSelectorProps) {
  const displayAvatars = availableAvatars
    ? Object.fromEntries(
        availableAvatars
          .filter((key) => avatars[key])
          .map((key) => [key, avatars[key]])
      )
    : avatars;

  return (
    <div className="avatar-selector">
      {Object.entries(displayAvatars).map(([key, avatar]) => (
        <button
          key={key}
          className={`avatar-option ${currentAvatar === key ? 'selected' : ''}`}
          onClick={() => onSelect(key as AvatarType)}
        >
          <img src={avatar.icon} alt={avatar.name} />
        </button>
      ))}
    </div>
  );
};
