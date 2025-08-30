import React, { useEffect, useRef } from "react";
import AvatarSelector from "./src/components/AvatarSelector";
import { useFocusTrap } from "./src/hooks/useFocusTrap";

interface ShopScreenProps {
  onBack: () => void;
}

type AvatarType = 'bee' | 'book' | 'trophy' | 'wizard' | 'ninja';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  type: "avatar" | "accessory" | "help";
  cooldown?: number; // in seconds
  effect?: () => void;
}

const shopItems: ShopItem[] = [
  { 
    id: "wizard", 
    name: "Wizard Avatar", 
    description: "A magical wizard avatar with special powers",
    icon: "/img/avatars/bee.svg", 
    price: 50, 
    type: "avatar" 
  },
  { 
    id: "top-hat", 
    name: "Top Hat", 
    description: "A fancy top hat for your avatar",
    icon: "/img/avatars/book.svg", 
    price: 30, 
    type: "accessory" 
  },
  {
    id: "hint-letter",
    name: "Hint: Reveal a Letter",
    description: "Reveals one correct letter in the current word",
    icon: "?",
    price: 20,
    type: "help",
    cooldown: 60
  },
  {
    id: "hint-definition",
    name: "Hint: Show Definition",
    description: "Shows the definition of the current word",
    icon: "D",
    price: 15,
    type: "help",
    cooldown: 30
  },
  {
    id: "extra-time",
    name: "Extra Time",
    description: "Adds 30 seconds to the current round's timer",
    icon: "⏱️",
    price: 25,
    type: "help",
    cooldown: 90
  },
  {
    id: "skip-word",
    name: "Skip Word",
    description: "Skip the current word without penalty",
    icon: "⏭️",
    price: 40,
    type: "help",
    cooldown: 120
  }
];

const ShopScreen: React.FC<ShopScreenProps> = ({ onBack }) => {
  // Cooldown timers for help items
  const [cooldowns, setCooldowns] = React.useState<Record<string, number>>({});
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

  // Update cooldowns every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCooldowns(prevCooldowns => {
        const updated = { ...prevCooldowns };
        Object.keys(updated).forEach(key => {
          if (updated[key] > 0) {
            updated[key]--;
            if (updated[key] <= 0) {
              delete updated[key];
            }
          }
        });
        return Object.keys(updated).length ? updated : {};
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const purchaseItem = (item: ShopItem) => {
    if (coins < item.price) {
      alert('Not enough coins!');
      return;
    }
    
    // Check cooldown for help items
    if (item.type === 'help' && cooldowns[item.id]) {
      alert(`This item is on cooldown for ${cooldowns[item.id]} more seconds`);
      return;
    }

    const newCoins = coins - item.price;
    setCoins(newCoins);
    localStorage.setItem("coins", String(newCoins));

    if (item.type === "avatar" && !ownedAvatars.includes(item.id)) {
      const updated = [...ownedAvatars, item.id];
      setOwnedAvatars(updated);
      localStorage.setItem("ownedAvatars", JSON.stringify(updated));
    } else if (item.type === "accessory" && !ownedAccessories.includes(item.id)) {
      const updated = [...ownedAccessories, item.id];
      setOwnedAccessories(updated);
      localStorage.setItem("ownedAccessories", JSON.stringify(updated));
    } else if (item.type === 'help') {
      // Apply help item effect
      if (item.effect) {
        item.effect();
      }
      
      // Set cooldown
      if (item.cooldown) {
        setCooldowns(prev => ({
          ...prev,
          [item.id]: item.cooldown!
        }));
      }
      
      // Close shop after using a help item
      onBack();
      return; // Don't proceed with normal purchase flow
    }
  };

  const isOwned = (item: ShopItem) => {
    if (item.type === "avatar") {
      return ownedAvatars.includes(item.id);
    } else if (item.type === "accessory") {
      return ownedAccessories.includes(item.id);
    }
    return false; // Help items are never "owned"
  };
  
  const isOnCooldown = (item: ShopItem) => {
    return item.type === 'help' && cooldowns[item.id] > 0;
  };
  
  const formatCooldown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          {shopItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 border rounded-lg mb-4 ${
                isOwned(item) 
                  ? 'bg-green-50 border-green-200' 
                  : isOnCooldown(item)
                    ? 'bg-gray-50 opacity-75'
                    : 'bg-white hover:shadow-md'
              } transition-all`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-100 rounded-lg">
                    {item.icon.startsWith('/') ? (
                      <img src={item.icon} alt="" className="w-8 h-8" />
                    ) : (
                      <span className="text-xl">{item.icon}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-700">
                        {item.price} coins
                      </span>
                      {item.type === 'help' && item.cooldown && (
                        <span className="text-xs text-gray-500">
                          {isOnCooldown(item) 
                            ? `Cooldown: ${formatCooldown(cooldowns[item.id])}`
                            : `Cooldown: ${formatCooldown(item.cooldown)}`
                          }
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => purchaseItem(item)}
                    disabled={isOwned(item) || isOnCooldown(item)}
                    className={`px-3 py-1.5 rounded text-sm font-medium ${
                      isOwned(item)
                        ? 'bg-green-100 text-green-800 cursor-default'
                        : isOnCooldown(item)
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    aria-label={
                      isOwned(item) 
                        ? 'Already owned' 
                        : isOnCooldown(item)
                          ? `On cooldown for ${formatCooldown(cooldowns[item.id])}`
                          : `Buy ${item.name}`
                    }
                  >
                    {isOwned(item) 
                      ? 'Owned' 
                      : isOnCooldown(item)
                        ? 'On Cooldown'
                        : 'Buy'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShopScreen;
