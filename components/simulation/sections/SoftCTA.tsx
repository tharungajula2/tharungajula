"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function SoftCTA() {
  return (
    <div className="mt-20 py-12 border-t border-white/5 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-6">
        <Sparkles className="w-5 h-5 text-cyan-400" />
      </div>
      <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3">Modularizing Clinical Operations</h3>
      <p className="text-sm text-slate-500 max-w-md mb-8 leading-relaxed">
        This simulation reflects the internal tooling built to scale a high-touch longitudinal care model from a founder's perspective.
      </p>
      <button 
        onClick={() => window.open('https://github.com/tharungajula', '_blank')}
        className="group relative flex items-center gap-3 px-8 py-4 bg-white text-slate-950 font-black uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-cyan-400 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
      >
        <span>Review Founder's Perspective</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
