import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/profile',
        permanent: true,
      },
      {
        source: '/story',
        destination: '/profile',
        permanent: true,
      },
      {
        source: '/notebook',
        destination: '/profile',
        permanent: true,
      },
      {
        source: '/notebook/:path*',
        destination: '/profile',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/profile',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
