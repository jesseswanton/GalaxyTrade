// Navigation bar component
import Link from 'next/link';
import Login from './login'
import Logout from './logout'

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) { 
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>GalaxyTrade 🌌</h1>
      </div>
      <div className="links">
        <Link href="/">Home</Link>
        {isLoggedIn ? (
          <Logout />
        ) : (
          <Login />
        )}
      </div>
    </nav>
  );
};
