import React from 'react';
import beeImage from '../img/bee.png';
import flyingBeeImage from '../img/FlyingBee.png';

type BeeElementProps = {
  variant?: 'default' | 'flying';
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

const BeeElement: React.FC<BeeElementProps> = ({
  variant = 'default',
  size = 'medium',
  className = ''
}) => {
  const imageSrc = variant === 'flying' ? flyingBeeImage : beeImage;
  
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src={imageSrc} 
        alt="Decorative bee"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default BeeElement;
