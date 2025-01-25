import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['apod.nasa.gov'],
  },
};

export default nextConfig;
