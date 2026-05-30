'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { robotReact } from '@/lib/jarviz/useJarvizStore';

interface CommandMapProps {
  onClose: () => void;
}

export default function CommandMap({ onClose }: CommandMapProps) {
  // Checklist items for demo confidence
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const checklist = [
    'Enable Camera',
    'Open palm to wake/greet',
    'Swipe right to navigate to Work',
    'Swipe left to navigate to Story',
    'Point up to navigate to Connect',
    'Enable Voice mode',
    'Say "go home" to return to Thesis',
    'Ask open-ended question: "Why is this portfolio different?"',
    'Exit Cockpit to clean up safely',
  ];

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-[60] flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-neutral-950/95 border border-cyan-400/20 p-6 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col space-y-5 relative select-none max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer border border-white/10 p-1.5 rounded-full hover:bg-white/5 active:scale-95 z-10 animate-fadeIn"
          aria-label="Close Command Map"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold block uppercase">
            // TERMINAL_DIRECTORY_&_DEMO_CHECKLIST
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight uppercase">
            JARVIZ HUD Matrix Manual
          </h3>
        </div>

        {/* 2-Column Command Grammar Mapping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
          {/* Gestures column */}
          <div className="space-y-3 border-r border-white/5 pr-0 sm:pr-4">
            <h4 className="text-[10px] font-mono text-cyan-400/70 tracking-widest uppercase border-b border-white/10 pb-1">
              GESTURES (COMPUTER VISION)
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
                <span className="text-white/40">VICTORY / 2 HANDS</span>
                <span>COMMAND DIRECTORY</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">FIST</span>
                <span>PAUSE VISION</span>
              </div>
            </div>
          </div>

          {/* Voice & Type column */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono text-purple-400/70 tracking-widest uppercase border-b border-white/10 pb-1">
              VOICE GRAMMAR / TYPED INPUTS
            </h4>
            <div className="space-y-2.5 font-mono text-[9px] uppercase tracking-wide">
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">&quot;show work&quot; / work</span>
                <span>Work / Neural</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">&quot;show story&quot; / story</span>
                <span>Story / Evolution</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">&quot;connect&quot; / connect</span>
                <span>Connect page</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">&quot;go home&quot; / home</span>
                <span>Thesis page</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">&quot;commands&quot; / commands</span>
                <span>Command map</span>
              </div>
              <div className="flex justify-between items-center text-white/80">
                <span className="text-white/40">&quot;pause&quot; / pause</span>
                <span>Deactivate system</span>
              </div>
              <div className="flex justify-between items-center text-cyan-400 font-semibold border-t border-white/5 pt-1.5">
                <span className="text-cyan-400/70">OPEN-ENDED QUESTION</span>
                <span>GEMINI STREAM ANSWER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Mode Checklist Section */}
        <div className="bg-neutral-900/60 border border-white/5 p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
            <h4 className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">
              ★ RECRUITER & DEVELOPER DEMO WALKTHROUGH CHECKLIST
            </h4>
            <span className="text-[8px] font-mono text-white/30 uppercase">
              {Object.keys(checkedItems).filter(k => checkedItems[Number(k)]).length} / {checklist.length} DONE
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {checklist.map((item, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-[9px] cursor-pointer select-none transition-all duration-300 ${
                    isChecked 
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' 
                      : 'bg-black/20 border-white/5 text-white/50 hover:bg-white/5 hover:text-white/90'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                    isChecked ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-white/20'
                  }`}>
                    {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span className="uppercase tracking-wide leading-tight flex-1">{item}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROBOT DIAGNOSTICS SECTION */}
        <div className="bg-neutral-900/60 border border-cyan-400/20 p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
            <h4 className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase font-bold">
              ⚡ CHARACTER DIAGNOSTICS & FORCE TELEMETRY INJECTOR
            </h4>
            <span className="text-[8px] font-mono text-white/30 uppercase">
              FORCE OVERRIDE ACTIVE
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {(['wake', 'track', 'acknowledge', 'listen', 'thinking', 'speaking', 'error', 'pause', 'sleep'] as const).map((reactState) => (
              <button
                key={reactState}
                type="button"
                onClick={() => {
                  robotReact(reactState, true);
                }}
                className="bg-black/40 hover:bg-cyan-950 border border-white/10 hover:border-cyan-400/50 text-[9px] font-mono text-white hover:text-cyan-400 uppercase py-2 px-1 rounded-xl transition-all cursor-pointer text-center active:scale-95 shadow-md tracking-wider font-bold"
              >
                {reactState}
              </button>
            ))}
          </div>
        </div>

        {/* Technical architecture footer */}
        <div className="border-t border-white/5 pt-3 text-[9px] font-mono text-white/30 uppercase leading-relaxed text-center animate-fadeIn">
          Computer vision runs in-browser. Voice transcription depends on browser support. Gemini answers use the server API route.
        </div>
      </div>
    </div>
  );
}
