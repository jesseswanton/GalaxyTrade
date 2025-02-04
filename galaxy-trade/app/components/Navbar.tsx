"use client";

// import Link from 'next/link';
import Carousel from "./Carousel";
// import { Spacer } from '@chakra-ui/react';
import Login from "./login";
import Logout from "./logout";
// import { getProfilePic } from '../lib/actions';

export default function Navbar({
  isLoggedIn,
  username,
}: {
  isLoggedIn: boolean;
  username: string;
}) {

  return (
    <nav className="navbar flex items-center justify-between px-4 py-2 bg-gray-900 text-white">
      <div className="flex-grow" />
      <div className="carousel-container flex flex-col items-center justify-center">
        <Carousel />
        <h1 className="carousel-title text-xl font-bold mt-2">GalaxyTrade</h1>
      </div>
      <div className="links flex-grow flex items-center justify-end">
        {/* <Link href="/">Home</Link> */}
        {isLoggedIn ? <Logout username={username} /> : <Login />}
      </div>
    </nav>
  );
}
