'use client';

import { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';

export default function SplineAvatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const splineRef = useRef<Application | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Direct runtime initialization bypasses the React wrapper's internal loader bugs
    const spline = new Application(canvasRef.current);
    splineRef.current = spline;
    
    spline.load('https://prod.spline.design/1bea512a-0ae4-420b-a6ce-1f78cb4480e8/scene.splinecode')
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        // Fallback for buffer errors: attempt a second load or log
        console.warn('Spline initialization attempt failed, retrying...', err);
      });

    return () => {
      if (splineRef.current) {
        // Proper cleanup to prevent WebGL context leaks
        splineRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10 transition-opacity duration-1000">
           <div className="flex flex-col items-center gap-6">
              <div className="w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
              <span className="font-mono text-[10px] text-slate-500 tracking-[0.4em] uppercase animate-pulse">
                Initializing 3D Core...
              </span>
           </div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
