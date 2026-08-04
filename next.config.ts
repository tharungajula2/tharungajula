import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/notebook',
        permanent: true,
      },
      {
        source: '/blog/notes',
        destination: '/notebook/notes',
        permanent: true,
      },
      {
        source: '/blog/notes/:slug',
        destination: '/notebook/notes/:slug',
        permanent: true,
      },
      {
        source: '/blog/notes/:slug/:section',
        destination: '/notebook/notes/:slug/:section',
        permanent: true,
      },
      {
        source: '/blog/specimen',
        destination: '/notebook/specimen',
        permanent: true,
      },
      {
        source: '/blog/:track',
        destination: '/notebook/library/:track',
        permanent: true,
      },
      {
        source: '/blog/:track/:volume',
        destination: '/notebook/library/:track/:volume',
        permanent: true,
      },
      {
        source: '/blog/:track/:volume/:chapter',
        destination: '/notebook/library/:track/:volume/:chapter',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
