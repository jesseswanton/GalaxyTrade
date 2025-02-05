"use client";

import Carousel from "./Carousel";
import Login from "./login";
import Logout from "./logout";
import UploadImage from "./UploadImage";
import ImageLibrary from "./ImageLibrary";
import { useSession } from "next-auth/react";

export default function Navbar({
  isLoggedIn,
  username,
}: {
  isLoggedIn: boolean;
  username: string;
}) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="navbar flex items-center justify-between px-4 py-2 bg-gray-900 text-white">
      <div className="space-x-4 z-50 relative">
        {user && (
          <>
            <UploadImage />
            <ImageLibrary />
          </>
        )}
      </div>

      <div className="">
        <div className="carousel-container">
          <Carousel />
          <h1 className="carousel-title">GalaxyTrade</h1>
        </div>
      </div>

      <div className="links flex items-center justify-end">
        {isLoggedIn ? <Logout username={username} /> : <Login />}
      </div>
    </nav>
  );
}
