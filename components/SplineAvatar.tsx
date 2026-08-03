'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Target } from 'lucide-react';

// 1. Native Next.js dynamic loading
const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center z-0">
      <div className="animate-pulse bg-accent-glow w-72 h-72 rounded-full blur-3xl"></div>
    </div>
  )
});

interface SplineAvatarProps {
  onTalkClick?: () => void;
  isChatOpen?: boolean;
}

export default function SplineAvatar({ onTalkClick, isChatOpen }: SplineAvatarProps) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 4200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center pointer-events-auto bg-transparent">
      <motion.div 
        animate={
          isChatOpen 
            ? { scale: [1, 1.03, 1], filter: 'brightness(1.25) drop-shadow(0 0 35px rgba(6,182,212,0.6))' } 
            : { scale: 1, filter: 'none' }
        }
        transition={{ duration: 2, ease: 'easeInOut', repeat: isChatOpen ? Infinity : 0, repeatType: 'reverse' }}
        className="w-full h-full absolute inset-0 z-0 flex items-center justify-center pointer-events-auto"
      >
        <Spline 
          scene="https://prod.spline.design/jcvFsh5CNoyqI8Hn/scene.splinecode" 
          onLoad={(splineApp) => {
            try {
              splineApp.setBackgroundColor('transparent');
            } catch (e) {
              console.error("Spline setBackgroundColor error:", e);
            }
          }}
        />
      </motion.div>
      
      {/* Integrated Chest HUD Entity (Sitting on dark robot model in both modes) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: showText ? 1 : 0, scale: showText ? 1 : 0.98 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[20] pointer-events-none select-none text-center"
      >
        <div className="flex flex-col items-center pointer-events-auto">
          {/* Bulls Eye Icon */}
          <Target className="w-5 h-5 text-white/60 mb-2 animate-pulse drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" strokeWidth={1} />
          
          {/* Role Title */}
          <h1 className="text-sm sm:text-base font-mono font-bold tracking-[0.3em] uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] mb-2">
            CREDIT RISK & ANALYTICS
          </h1>

          {/* Integrated CTA */}
          <button
            onClick={onTalkClick}
            className="mt-6 font-mono text-[10px] sm:text-xs tracking-[0.5em] text-white/80 hover:text-cyan-400 transition-all cursor-pointer uppercase border-b border-white/30 pb-1 hover:border-cyan-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] animate-[gentlePulse_3s_ease-in-out_infinite]"
          >
            talk to me
          </button>
        </div>
      </motion.div>
    </div>
  );
}
