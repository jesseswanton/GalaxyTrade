// Navigation bar component

import { FC } from 'react';
import Link from 'next/link';

const Navbar: FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>GalaxyTrade 🌌</h1>
      </div>
      <div className="links">
        <Link href="/">Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;