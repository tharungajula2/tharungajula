'use client';

import { useJarvizStore } from '@/lib/jarviz/useJarvizStore';
import VisionEngine from '../VisionEngine';
import { Eye, ShieldAlert } from 'lucide-react';

export default function GestureTelemetry() {
  const store = useJarvizStore();

  return (
    <div className="flex flex-col space-y-3 bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl w-full max-w-[280px] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
          <Eye className="w-3.5 h-3.5" />
          <span>VISION_TELEMETRY</span>
        </div>
        {store.cameraActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        )}
      </div>

      {/* Embedded Camera PiP Window */}
      <VisionEngine enabled={store.cameraActive} />

      {/* Telemetry Readouts */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider">
          <span className="text-white/40">Active Gesture</span>
          <span className="text-white font-bold text-cyan-300">
            {store.lastGesture}
          </span>
        </div>

        <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider">
          <span className="text-white/40">Confidence</span>
          <div className="flex items-center gap-1">
            <span className="text-white font-mono">
              {(store.gestureConfidence * 100).toFixed(0)}%
            </span>
            <div className="w-12 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-300"
                style={{ width: `${store.gestureConfidence * 100}%` }}
              />
            </div>
          </div>
        </div>

        {store.cameraActive && (
          <div className="flex items-start gap-1.5 text-[8px] font-mono text-white/30 uppercase mt-2 leading-normal">
            <ShieldAlert className="w-3.5 h-3.5 text-white/40 shrink-0 mt-0.5" />
            <span>ON-DEVICE CV INFERENCE PRIVATE FEED</span>
          </div>
        )}
      </div>
    </div>
  );
}
