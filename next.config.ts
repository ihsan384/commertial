import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
