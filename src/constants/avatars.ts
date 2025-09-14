import { IMAGE_ASSETS } from '../assets';

export const avatars = {
  bee: { name: 'Bee', icon: IMAGE_ASSETS.avatars.bee },
  book: { name: 'Book', icon: IMAGE_ASSETS.avatars.book },
  trophy: { name: 'Trophy', icon: IMAGE_ASSETS.avatars.trophy },
  wizard: { name: 'Wizard', icon: IMAGE_ASSETS.avatars.bee },
  ninja: { name: 'Ninja', icon: IMAGE_ASSETS.avatars.book },
};

export function getRandomAvatar() {
  const avatarKeys = Object.keys(avatars);
  return avatarKeys[Math.floor(Math.random() * avatarKeys.length)];
}
