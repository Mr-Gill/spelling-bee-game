import { FC } from 'react';
import { avatars } from '@constants/avatars';

type AvatarSelectorProps = {
  currentAvatar: string;
  onSelect: (avatar: string) => void;
};

export default function AvatarSelector({ currentAvatar, onSelect }: { currentAvatar: string; onSelect: (avatar: string) => void }) {
  return (
    <div className="avatar-selector">
      {Object.entries(avatars).map(([key, avatar]) => (
        <button
          key={key}
          className={`avatar-option ${currentAvatar === key ? 'selected' : ''}`}
          onClick={() => onSelect(key)}
        >
          <img src={avatar.icon} alt={avatar.name} />
        </button>
      ))}
    </div>
  );
};
