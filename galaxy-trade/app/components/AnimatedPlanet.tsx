import React from 'react';
import Image from 'next/image';
import '../styles/planetAnimation.css';

const AnimatedPlanet = () => {
  return (
    <div className="animated-planet">
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
