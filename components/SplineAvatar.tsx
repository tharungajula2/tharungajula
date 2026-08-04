'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Target } from 'lucide-react';

const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center z-0 bg-surface-raised rounded-2xl">
      <div className="animate-pulse bg-accent-glow/30 w-72 h-72 rounded-full blur-3xl"></div>
    </div>
  )
});

interface SplineAvatarProps {
  onTalkClick?: () => void;
  isChatOpen?: boolean;
}

function checkCanAffordSpline(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Prefers reduced motion check
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  if (prefersReducedMotion) return false;

  // 2. Network connection check
  const nav = navigator as unknown as {
    connection?: { saveData?: boolean; effectiveType?: string };
    mozConnection?: { saveData?: boolean; effectiveType?: string };
    webkitConnection?: { saveData?: boolean; effectiveType?: string };
    hardwareConcurrency?: number;
    deviceMemory?: number;
  };

  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (connection) {
    if (connection.saveData === true) return false;
    if (connection.effectiveType && ['slow-2g', '2g', '3g'].includes(connection.effectiveType)) {
      return false;
    }
  }

  // 3. Viewport width vs Hardware capability check
  const width = window.innerWidth;
  if (width >= 768) return true;

  const concurrency = nav.hardwareConcurrency;
  const memory = nav.deviceMemory;

  if (typeof concurrency === 'number' && typeof memory === 'number') {
    return concurrency >= 4 && memory >= 4;
  }

  // Fallback to viewport width test alone
  return width >= 768;
}

export default function SplineAvatar({ onTalkClick, isChatOpen }: SplineAvatarProps) {
  const [showText, setShowText] = useState(false);
  const [canLoadSpline, setCanLoadSpline] = useState<boolean | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 4200);
    return () => clearTimeout(timer);
  }, []);

  // Evaluate capability on mount
  useEffect(() => {
    setCanLoadSpline(checkCanAffordSpline());
  }, []);

  // IntersectionObserver with 200px rootMargin
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldRenderSpline = canLoadSpline === true && isIntersecting;

  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0 z-0 flex items-center justify-center pointer-events-auto bg-transparent">
      {shouldRenderSpline ? (
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
      ) : (
        /* STATIC FALLBACK POSTER CONTAINER AT EXACT SAME DIMENSIONS TO PREVENT LAYOUT SHIFT */
        <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center bg-surface-raised/40 rounded-3xl border border-hairline-faint shadow-inner">
          <div className="w-72 h-72 bg-accent-glow/20 rounded-full blur-3xl" />
        </div>
      )}
      
      {/* Integrated Chest HUD Entity */}
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
          <h1 className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] mb-2 max-w-[220px] sm:max-w-[320px] mx-auto text-center flex flex-col items-center gap-0.5 leading-tight">
            <span>ANALYTICS</span>
            <span className="text-white/90">PRODUCT MANAGEMENT</span>
            <span className="text-cyan-300/90 font-semibold">AGENTIC AI</span>
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
