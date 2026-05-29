'use client';

import { ReactNode } from 'react';

interface HudFrameProps {
  children: ReactNode;
}

export default function HudFrame({ children }: HudFrameProps) {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
      {/* CORNER TECH LABELS & BORDERS */}
      {/* Top Left */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-16 h-16 border-t border-l border-cyan-500/40 pointer-events-none">
        <div className="absolute top-1 left-2 text-[8px] font-mono text-cyan-400/60 tracking-[0.2em] uppercase select-none">
          SYS_INTEL_V1.0
        </div>
      </div>

      {/* Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-16 h-16 border-t border-r border-cyan-500/40 pointer-events-none flex justify-end">
        <div className="absolute top-1 right-2 text-[8px] font-mono text-cyan-400/60 tracking-[0.2em] uppercase select-none">
          LOC_CAM_ACTIVE
        </div>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-16 h-16 border-b border-l border-cyan-500/40 pointer-events-none flex items-end">
        <div className="absolute bottom-1 left-2 text-[8px] font-mono text-cyan-400/60 tracking-[0.2em] uppercase select-none">
          SECURE_NODE
        </div>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-16 h-16 border-b border-r border-cyan-500/40 pointer-events-none flex items-end justify-end">
        <div className="absolute bottom-1 right-2 text-[8px] font-mono text-cyan-400/60 tracking-[0.2em] uppercase select-none font-bold animate-pulse">
          ● ONLINE
        </div>
      </div>

      {/* SCANLINE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(6,182,212,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,6px_100%] opacity-35" />

      {/* AMBIENT GLOW BORDERS */}
      <div className="absolute inset-0 border border-cyan-500/10 pointer-events-none shadow-[inset_0_0_80px_rgba(6,182,212,0.05)]" />

      {/* Actual Content Wrapper */}
      <div className="w-full h-full pointer-events-auto z-10">
        {children}
      </div>
    </div>
  );
}
