"use client";

import Carousel from "./Carousel";
import Login from "./login";
import Logout from "./logout";
import UploadImage from "./UploadImage";
import ImageLibrary from "./ImageLibrary";

export default function Navbar({
  isLoggedIn,
  username,
}: {
  isLoggedIn: boolean;
  username: string;
}) {
  return (
    <nav className="navbar flex items-center justify-between px-4 py-2 bg-gray-900 text-white">
      <div className="flex items-center space-x-4">
        <UploadImage />
        <ImageLibrary />
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="carousel-container">
          <Carousel />
          <h1 className="carousel-title">GalaxyTrade</h1>
        </div>
      </div>

      <div className="links flex-grow flex items-center justify-end">
        {isLoggedIn ? <Logout username={username} /> : <Login />}
      </div>
    </nav>
  );
}
