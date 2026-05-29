'use client';

import { X } from 'lucide-react';

interface CommandMapProps {
  onClose: () => void;
}

export default function CommandMap({ onClose }: CommandMapProps) {
  return (
    <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-[60] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-neutral-950/95 border border-cyan-400/20 p-6 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col space-y-4 relative select-none">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer border border-white/10 p-1 rounded-full hover:bg-white/5 active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold block">
            // DIRECTORY_MAP
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight uppercase">
            JARVIZ HUD Matrix Manual
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Gestures column */}
          <div className="space-y-2 border-r border-white/5 pr-0 sm:pr-4">
            <h4 className="text-[10px] font-mono text-cyan-400/70 tracking-widest uppercase border-b border-white/10 pb-1">
              GESTURES
            </h4>
            <div className="space-y-2.5 font-mono text-[9px] uppercase tracking-wide">
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">OPEN PALM</span>
                <span>SYSTEM WAKE / GREET</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">SWIPE RIGHT</span>
                <span>NAVIGATE: WORK</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">SWIPE LEFT</span>
                <span>NAVIGATE: STORY</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">POINT UP</span>
                <span>NAVIGATE: CONNECT</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">THUMB UP</span>
                <span>HIGHLIGHT METRICS</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">FIST / TWO HANDS</span>
                <span>PAUSE / MANUAL MAP</span>
              </div>
            </div>
          </div>

          {/* Voice column */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-purple-400/70 tracking-widest uppercase border-b border-white/10 pb-1">
              VOICE GRAMMAR
            </h4>
            <div className="space-y-2.5 font-mono text-[9px] uppercase tracking-wide">
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">&quot;show work&quot;</span>
                <span>neural hub</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">&quot;open story&quot;</span>
                <span>evolution</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">&quot;connect&quot;</span>
                <span>terminal links</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">&quot;go home&quot;</span>
                <span>core thesis</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">&quot;help&quot;</span>
                <span>command matrix</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">&quot;pause&quot;</span>
                <span>sleep mode</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-4 text-[9px] font-mono text-white/30 uppercase leading-relaxed">
          deterministic commands execute instantly offline. open-ended questions fallback to gemini 2.5 flash-lite on-demand.
        </div>
      </div>
    </div>
  );
}
