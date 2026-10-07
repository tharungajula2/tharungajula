import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://tharungajula.vercel.app/notes',
        permanent: true,
      },
      {
        source: '/agentic-ai-ba-cheatsheet',
        destination: 'https://tharungajula.vercel.app/notes/agentic-ai-ba-cheatsheet',
        permanent: true,
      },
      {
        source: '/my-work-cheatsheet',
        destination: 'https://tharungajula.vercel.app/notes/my-work-cheatsheet',
        permanent: true,
      },
      {
        source: '/credit-risk-cheatsheet',
        destination: 'https://tharungajula.vercel.app/notes/credit-risk-cheatsheet',
        permanent: true,
      },
      {
        source: '/agent',
        destination: '/',
        permanent: true,
      },
      {
        source: '/connect',
        destination: '/',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/',
        permanent: true,
      },
      {
        source: '/story',
        destination: '/',
        permanent: true,
      },
      {
        source: '/notebook',
        destination: '/notes',
        permanent: true,
      },
      {
        source: '/notebook/:path*',
        destination: '/notes/:path*',
        permanent: true,
      },
      {
        source: '/vault',
        destination: '/builds',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/notes/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
