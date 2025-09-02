import React, { memo } from 'react';
import { motion } from 'framer-motion';

type BeeState = 'idle' | 'happy' | 'stressed';

interface BeeElementProps {
  state?: BeeState;
  size?: number;
  speed?: number;
}

const BeeElement: React.FC<BeeElementProps> = memo(({
  state = 'idle',
  size = 40,
  speed = 1
}) => {
  // Animation variants
  const variants = {
    idle: {
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 2 * speed,
        repeat: Infinity
      }
    },
    happy: {
      y: [0, -10, 0],
      rotate: [0, 15, 0],
      transition: {
        duration: 1 * speed,
        repeat: Infinity
      }
    },
    stressed: {
      x: [0, 5, -5, 0],
      transition: {
        duration: 0.5 * speed,
        repeat: Infinity
      }
    }
  };

  return (
    <motion.div
      animate={state}
      variants={variants}
      style={{
        width: size,
        height: size
      }}
    >
      {/* SVG bee illustration */}
      <svg viewBox="0 0 100 100">
        <path 
          d="M50,20 Q70,30 50,40 Q30,30 50,20" 
          fill="#FFD700" 
          stroke="#000"
        />
        <circle cx="50" cy="30" r="10" fill="#000" />
        <path d="M40,40 Q50,50 60,40" stroke="#000" fill="transparent" />
      </svg>
    </motion.div>
  );
});

export default BeeElement;
