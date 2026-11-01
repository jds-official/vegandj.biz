import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // AVIF first (about 30% smaller than WebP at the same quality), WebP fallback.
    formats: ['image/avif', 'image/webp'],
    // Allowed `quality` values. 75 is the default; the hero asks for 85.
    qualities: [75, 85],
  },
};

export default nextConfig;
