import React from 'react';

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
  const imageSrc = variant === 'flying' 
    ? `${process.env.PUBLIC_URL}/img/FlyingBee.png`
    : `${process.env.PUBLIC_URL}/img/bee.png`;
  
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
        onError={(e) => {
          e.currentTarget.src = `${process.env.PUBLIC_URL}/img/default-bee.png`;
        }}
      />
    </div>
  );
};

export default BeeElement;
