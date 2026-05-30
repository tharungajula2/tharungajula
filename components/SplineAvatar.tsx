'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Target } from 'lucide-react';
import { splineController } from '@/components/jarviz/SplineController';

// 1. Native Next.js dynamic loading
const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center z-0">
      <div className="animate-pulse bg-cyan-600/20 w-72 h-72 rounded-full blur-3xl"></div>
    </div>
  )
});

import { useJarvizStore } from '@/lib/jarviz/useJarvizStore';

interface SplineAvatarProps {
  onTalkClick?: () => void;
}

export default function SplineAvatar({ onTalkClick }: SplineAvatarProps) {
  const [showText, setShowText] = useState(false);
  const store = useJarvizStore();
  const reaction = store.robotReaction;

  useEffect(() => {
    // Sync with robot animation stop
    const timer = setTimeout(() => setShowText(true), 4200);
    return () => {
      clearTimeout(timer);
      splineController.dispose(); // clean up spline controller on unmount
    };
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center pointer-events-auto">
      <motion.div 
        animate={
          reaction === 'wake' ? { scale: [1, 1.08, 1], filter: 'brightness(1.25) drop-shadow(0 0 35px rgba(6,182,212,0.6))' } :
          reaction === 'acknowledge' ? { scale: [1, 1.05, 1], y: [0, -8, 0], filter: 'brightness(1.2) drop-shadow(0 0 30px rgba(16,185,129,0.5))' } :
          reaction === 'listen' ? { scale: 1.02, filter: 'brightness(1.05) drop-shadow(0 0 20px rgba(168,85,247,0.35))' } :
          reaction === 'thinking' ? { scale: [1, 1.015, 1], filter: 'brightness(0.95) drop-shadow(0 0 35px rgba(240,46,170,0.5))' } :
          reaction === 'speaking' ? { scale: [1.02, 1.04, 1.02], filter: 'brightness(1.15) drop-shadow(0 0 30px rgba(6,182,212,0.45))' } :
          reaction === 'error' ? { scale: [1, 0.96, 1], filter: 'brightness(0.75) grayscale(0.2) drop-shadow(0 0 25px rgba(239,68,68,0.55))' } :
          reaction === 'pause' || reaction === 'sleep' ? { scale: 0.94, filter: 'brightness(0.35) grayscale(0.85)' } :
          { scale: 1, y: 0, filter: 'none' }
        }
        transition={{ duration: reaction === 'acknowledge' ? 0.35 : 0.8, ease: 'easeInOut' }}
        className="w-full h-full absolute inset-0 z-0 flex items-center justify-center pointer-events-auto"
      >
        <Spline 
          scene="https://prod.spline.design/jcvFsh5CNoyqI8Hn/scene.splinecode" 
          onLoad={(app) => splineController.setApplication(app)}
        />
      </motion.div>
      
      {/* Integrated Chest HUD Entity */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: showText ? 1 : 0, scale: showText ? 1 : 0.98 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[20] pointer-events-none select-none text-center"
      >
        <div className="flex flex-col items-center pointer-events-auto">
          {/* Bulls Eye Icon */}
          <Target className="w-5 h-5 text-white/30 mb-2 animate-pulse" strokeWidth={1} />
          
          {/* Role Title */}
          <h1 className="text-sm sm:text-base font-mono font-bold tracking-[0.3em] uppercase bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.25)] mb-2">
            PRODUCT MANAGER
          </h1>

          {/* Integrated CTA */}
          <button
            onClick={onTalkClick}
            className="mt-6 font-mono text-[10px] sm:text-xs tracking-[0.5em] text-white/60 hover:text-white transition-all cursor-pointer uppercase border-b border-white/10 pb-1 hover:border-white/40 animate-[gentlePulse_3s_ease-in-out_infinite]"
          >
            talk to me
          </button>
        </div>
      </motion.div>
    </div>
  );
}
