// Navigation bar component

import Link from 'next/link';
import Carousel from './Carousel';
import { Spacer } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>GalaxyTrade 🌌</h1>
      </div>
      <Spacer />
      <Carousel />
      <Spacer />
      <div className="links">
        <Link href="/">Inventory 💎</Link>
      </div>
    </nav>
  );
};

export default Navbar;