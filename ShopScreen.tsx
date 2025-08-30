import React from 'react';
import { avatars } from './constants/avatars';
import { powerUps } from './constants/powerups';
import { Participant } from './types';

interface ShopScreenProps {
  participant: Participant;
  onPurchaseAvatar: (avatar: string, cost: number) => void;
  onPurchasePowerUp: (id: string, cost: number) => void;
  onBack: () => void;
}

const ShopScreen: React.FC<ShopScreenProps> = ({
  participant,
  onPurchaseAvatar,
  onPurchasePowerUp,
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">Shop</h1>
      <p className="mb-6">Coins: {participant.points}</p>
      <div className="mb-8">
        <h2 className="text-3xl mb-4">Avatars</h2>
        <div className="flex gap-4">
          {Object.entries(avatars).map(([key, avatar]) => (
            <button
              key={key}
              onClick={() => onPurchaseAvatar(key, 10)}
              className="bg-yellow-300 text-black px-4 py-2 rounded-lg"
            >
              <img src={avatar} alt={key} className="w-16 h-16" />
            </button>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-3xl mb-4">Power Ups</h2>
        <div className="flex gap-4">
          {powerUps.map(pu => (
            <button
              key={pu.id}
              onClick={() => onPurchasePowerUp(pu.id, pu.cost)}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
            >
              {pu.name} (-{pu.cost})
            </button>
          ))}
        </div>
      </div>
      <button onClick={onBack} className="bg-gray-600 px-4 py-2 rounded-lg">
        Back
      </button>
    </div>
  );
};

export default ShopScreen;
