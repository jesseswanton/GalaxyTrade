'use client'

import Link from 'next/link';
import Carousel from './Carousel';
// import { Spacer } from '@chakra-ui/react';
import Login from './login'
import Logout from './logout'
// import { getProfilePic } from '../lib/actions';

import UploadImage from './UploadImage';
import DisplayImage from './DisplayImage';

export default function Navbar({ isLoggedIn, username }: { isLoggedIn: boolean, username: string }) { 
  // const getUsersPic = async (username: string) => {
  //   const profilePic = await getProfilePic(username)
  //   return profilePic
  // }
  
  return (
    <nav className="navbar">
      <div className="flex items-center">
        <UploadImage />
        <DisplayImage />
      </div>
      <div className="carousel-container">
        <Carousel />
        <h1 className="carousel-title">GalaxyTrade</h1>
      </div>
      <div className="links flex items-center">
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