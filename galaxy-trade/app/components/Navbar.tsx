// Navigation bar component
import Link from 'next/link';
import Login from './login'
import Logout from './logout'
// import { getProfilePic } from '../lib/actions';

export default function Navbar({ isLoggedIn, username }: { isLoggedIn: boolean, username: string }) { 
  // const getUsersPic = async (username: string) => {
  //   const profilePic = await getProfilePic(username)
  //   return profilePic
  // }
 
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>GalaxyTrade 🌌</h1>
      </div>
      <div className="links">
        <Link href="/">Home</Link>
        {isLoggedIn ? (
          <Logout username={username}/>
        ) : (
          <Login />
        )}
      </div>
    </nav>
  );
};
