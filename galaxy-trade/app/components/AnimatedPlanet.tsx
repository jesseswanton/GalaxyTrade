import React, { useState } from 'react';
import Image from 'next/image';
import '../styles/planetAnimation.css';

const AnimatedPlanet = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div 
      className={`animated-planet ${isAnimating ? 'animate' : ''}`} 
      onClick={() => setIsAnimating(true)} // Start animation on click
    >
      <Image
        src="/planet.png"
        alt="Animated Planet"
        width={400}
        height={400}
      />
    </div>
  );
};

export default AnimatedPlanet;