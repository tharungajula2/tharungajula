'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// 1. Native Next.js dynamic loading
const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center z-0">
      <div className="animate-pulse bg-cyan-600/20 w-72 h-72 rounded-full blur-3xl"></div>
    </div>
  )
});

export default function SplineAvatar() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Increased delay to ensure robot completes its welcome sequence
    const timer = setTimeout(() => setShowText(true), 4200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center pointer-events-auto">
      <Spline scene="https://prod.spline.design/jcvFsh5CNoyqI8Hn/scene.splinecode" />

      {/* Robot Chest Overlay - Perfectly Timed Sequence */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: showText ? 1 : 0, scale: showText ? 1 : 0.98 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[20] pointer-events-none select-none text-center"
      >
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-mono tracking-[0.5em] text-white/20 block mb-1 uppercase">
            // TARGET_ARCHITECTURE
          </span>
          <h1 className="text-sm sm:text-base font-mono font-bold tracking-[0.3em] uppercase bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]">
            AI PRODUCT MANAGER
          </h1>
        </div>
      </motion.div>
    </div>
  );
}
