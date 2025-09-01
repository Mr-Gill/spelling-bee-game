import React from 'react';

const FlyingBee: React.FC = () => {
  const [top] = React.useState(() => Math.random() * 80);
  return (
    <img
      src={`${process.env.PUBLIC_URL}/img/bee.png`}
      alt="Flying bee"
      className="flying-bee"
      style={{ top: `${top}vh` }}
    />
  );
};

export default FlyingBee;
