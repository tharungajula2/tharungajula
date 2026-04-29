'use client';
import dynamic from 'next/dynamic';

// 1. Native Next.js dynamic loading (No buggy Suspense wrappers)
const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center z-0">
      <div className="animate-pulse bg-cyan-600/20 w-72 h-72 rounded-full blur-3xl"></div>
    </div>
  )
});

export default function SplineAvatar() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center pointer-events-auto">
      {/* 2. The True Production Payload */}
      <Spline scene="https://prod.spline.design/jcvFsh5CNoyqI8Hn/scene.splinecode" />
    </div>
  );
}
