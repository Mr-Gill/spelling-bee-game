import React from "react";
import AvatarSelector from "./src/components/AvatarSelector";
import { powerUps, PowerUp } from "@constants/powerups";

interface ShopScreenProps {
  onBack: () => void;
}

interface ShopItem {
  id: string;
  name: string;
  icon: string;
  price: number;
  type: "avatar" | "accessory";
}

const shopItems: ShopItem[] = [
  { id: "wizard", name: "Wizard Avatar", icon: "/img/avatars/bee.svg", price: 50, type: "avatar" },
  { id: "top-hat", name: "Top Hat", icon: "/img/avatars/book.svg", price: 30, type: "accessory" },
];

const ShopScreen: React.FC<ShopScreenProps> = ({ onBack }) => {
  const [coins, setCoins] = React.useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem("coins");
    return stored ? parseInt(stored, 10) : 0;
  });

  const [ownedAvatars, setOwnedAvatars] = React.useState<string[]>(() => {
    if (typeof window === "undefined") return ["bee", "book", "trophy"];
    try {
      return JSON.parse(
        localStorage.getItem("ownedAvatars") || "[\"bee\",\"book\",\"trophy\"]",
      );
    } catch {
      return ["bee", "book", "trophy"];
    }
  });

  const [ownedAccessories, setOwnedAccessories] = React.useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("ownedAccessories") || "[]");
    } catch {
      return [];
    }
  });

  const [ownedPowerUps, setOwnedPowerUps] = React.useState<Record<string, number>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("ownedPowerUps") || "{}");
    } catch {
      return {};
    }
  });

  const [currentAvatar, setCurrentAvatar] = React.useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("equippedAvatar") || "";
  });

  React.useEffect(() => {
    localStorage.setItem("equippedAvatar", currentAvatar);
  }, [currentAvatar]);

  const purchaseItem = (item: ShopItem) => {
    if (coins < item.price) return;
    const newCoins = coins - item.price;
    setCoins(newCoins);
    localStorage.setItem("coins", String(newCoins));

    if (item.type === "avatar" && !ownedAvatars.includes(item.id)) {
      const updated = [...ownedAvatars, item.id];
      setOwnedAvatars(updated);
      localStorage.setItem("ownedAvatars", JSON.stringify(updated));
    }
    if (item.type === "accessory" && !ownedAccessories.includes(item.id)) {
      const updated = [...ownedAccessories, item.id];
      setOwnedAccessories(updated);
      localStorage.setItem("ownedAccessories", JSON.stringify(updated));
    }
  };

  const isOwned = (item: ShopItem) => {
    return item.type === "avatar"
      ? ownedAvatars.includes(item.id)
      : ownedAccessories.includes(item.id);
  };

  const purchasePowerUp = (pu: PowerUp) => {
    if (coins < pu.cost) return;
    const newCoins = coins - pu.cost;
    setCoins(newCoins);
    localStorage.setItem("coins", String(newCoins));
    const count = (ownedPowerUps[pu.id] || 0) + 1;
    const updated = { ...ownedPowerUps, [pu.id]: count };
    setOwnedPowerUps(updated);
    localStorage.setItem("ownedPowerUps", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 text-white p-8">
      <button
        onClick={onBack}
        className="mb-4 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-4">Shop</h1>
      <div className="mb-4">Coins: {coins}</div>

      <h2 className="text-2xl font-bold mb-2">Your Avatar</h2>
      <AvatarSelector
        currentAvatar={currentAvatar}
        onSelect={setCurrentAvatar}
        availableAvatars={ownedAvatars}
      />

      <h2 className="text-2xl font-bold mt-8 mb-2">Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shopItems.map((item) => (
          <div
            key={item.id}
            className="bg-white/10 p-4 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img src={item.icon} alt={item.name} className="w-16 h-16" />
              <div>
                <div className="font-bold">{item.name}</div>
                <div>{item.price} coins</div>
              </div>
            </div>
            {isOwned(item) ? (
              <span className="text-green-400 font-bold">Owned</span>
            ) : (
              <button
                onClick={() => purchaseItem(item)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Buy
              </button>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-2">Power Ups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {powerUps.map((pu) => (
          <div
            key={pu.id}
            className="bg-white/10 p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <div className="font-bold">{pu.name}</div>
              <div>{pu.cost} coins</div>
              <div className="text-sm">{pu.description}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-300">x{ownedPowerUps[pu.id] || 0}</span>
              <button
                onClick={() => purchasePowerUp(pu)}
                disabled={coins < pu.cost}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopScreen;
