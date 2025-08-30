import React, { useEffect, useRef } from "react";
import AvatarSelector from "./src/components/AvatarSelector";
import { useFocusTrap } from "./src/hooks/useFocusTrap";

interface ShopScreenProps {
  onBack: () => void;
}

type AvatarType = 'bee' | 'book' | 'trophy' | 'wizard' | 'ninja';

interface ShopItem {
  id: AvatarType | string;
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
  const [coins, setCoins] = React.useState(() => {
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

  // Focus management for accessibility
  const mainHeadingRef = useRef<HTMLHeadingElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  
  // Focus trap for keyboard navigation
  const shopRef = useFocusTrap<HTMLDivElement>();
  
  // Set initial focus when component mounts
  useEffect(() => {
    if (mainHeadingRef.current) {
      mainHeadingRef.current.focus();
    }
  }, []);

  const handleBackClick = () => {
    onBack();
    // Return focus to the element that opened the shop
    const lastFocused = document.activeElement as HTMLElement;
    if (lastFocused) {
      lastFocused.focus();
    }
  };

  return (
    <div 
      ref={shopRef}
      className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 text-white p-8"
      role="region"
      aria-label="Shop"
    >
      <button
        ref={backButtonRef}
        onClick={handleBackClick}
        className="mb-4 bg-yellow-300 text-black px-4 py-2 rounded-lg font-bold focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 focus:outline-none"
        aria-label="Go back to previous screen"
      >
        Back
      </button>
      <h1 
        ref={mainHeadingRef}
        className="text-3xl font-bold mb-4"
        tabIndex={-1}
      >
        Shop
      </h1>
      <div 
        className="mb-4 text-xl font-semibold"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="sr-only">You have</span>
        <span aria-hidden="true">🪙</span>
        <span className="ml-2">{coins} coins</span>
      </div>

      <section aria-labelledby="avatar-heading">
        <h2 
          id="avatar-heading"
          className="text-2xl font-bold mb-2"
        >
          Your Avatar
        </h2>
        <AvatarSelector
          currentAvatar={currentAvatar as AvatarType}
          onSelect={setCurrentAvatar}
          availableAvatars={ownedAvatars as AvatarType[]}
          aria-label="Select your avatar"
        />
      </section>

      <section aria-labelledby="items-heading" className="mt-8">
        <h2 
          id="items-heading"
          className="text-2xl font-bold mb-4"
        >
          Available Items
        </h2>
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          role="list"
          aria-label="List of available items for purchase"
        >
          {shopItems.map((item) => {
            const owned = isOwned(item);
            return (
              <article
                key={item.id}
                className={`bg-white/10 p-4 rounded-lg flex items-center justify-between ${
                  owned ? 'ring-2 ring-green-400' : ''
                }`}
                aria-labelledby={`${item.id}-name`}
                aria-describedby={`${item.id}-desc`}
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={item.icon} 
                    alt="" 
                    className="w-16 h-16" 
                    aria-hidden="true"
                  />
                  <div>
                    <h3 
                      id={`${item.id}-name`}
                      className="font-bold text-lg"
                    >
                      {item.name}
                    </h3>
                    <p id={`${item.id}-desc`}>
                      <span className="sr-only">Price: </span>
                      <span aria-hidden="true">🪙</span>
                      <span className="ml-1">{item.price} coins</span>
                    </p>
                  </div>
                </div>
                {owned ? (
                  <span 
                    className="text-green-400 font-bold px-4 py-2"
                    aria-label={`${item.name} already owned`}
                  >
                    Owned
                  </span>
                ) : (
                  <button
                    onClick={() => purchaseItem(item)}
                    disabled={coins < item.price}
                    className={`px-4 py-2 rounded font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                      coins >= item.price
                        ? 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400'
                        : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    }`}
                    aria-label={`Buy ${item.name} for ${item.price} coins`}
                    aria-disabled={coins < item.price}
                  >
                    Buy
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ShopScreen;

