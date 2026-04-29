"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SplineAvatar from "@/components/SplineAvatar";
import { NeuralGraph } from "@/components/NeuralGraph";
import EvolutionTimeline from "@/components/EvolutionTimeline";
import ProjectArc from "@/components/ProjectArc";

export const dynamic = 'force-dynamic';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'thesis' | 'neural' | 'evolution' | 'arc'>('thesis');
  const [activeNode, setActiveNode] = useState<any>(null);

  return (
    <main className="h-[100svh] w-full overflow-hidden relative bg-black select-none">
      {/* STICKY HEADER */}
      <header className="fixed top-0 left-0 w-full h-16 bg-black/40 backdrop-blur-2xl border-b border-white/10 z-50 flex items-center justify-between px-6 sm:px-10">
        <h1 className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase select-none text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">
          THARUN GAJULA
        </h1>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="https://github.com/tharungajula2" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono tracking-[0.2em] text-white/50 hover:text-cyan-400 transition-colors uppercase">
            GITHUB
          </a>
          <a href="https://linkedin.com/in/tharungajula" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono tracking-[0.2em] text-white/50 hover:text-cyan-400 transition-colors uppercase">
            LINKEDIN
          </a>
        </div>
      </header>

      {/* 3D BACKGROUND / VIEW LAYER */}
      <div className="absolute inset-0 z-0 overflow-y-auto no-scrollbar scroll-smooth pt-24">
        {activeTab === 'thesis' && <SplineAvatar />}
        {activeTab === 'neural' && <NeuralGraph onNodeClick={(node) => setActiveNode(node)} />}
        {activeTab === 'evolution' && <EvolutionTimeline />}
        {activeTab === 'arc' && <ProjectArc />}
      </div>

      {/* EXACT REPLACEMENT FOR BOTTOM NAV DOCK */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] h-14 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-between px-4 z-50 shadow-2xl">
        
        {/* Link Container */}
        <div className="flex items-center gap-3 sm:gap-5 overflow-hidden">
          <a 
            href="#map" 
            onClick={(e) => { e.preventDefault(); setActiveTab(activeTab === 'neural' ? 'thesis' : 'neural'); }}
            className={cn(
              "text-[10px] sm:text-xs font-mono tracking-widest whitespace-nowrap transition-colors uppercase",
              activeTab === 'neural' ? "text-cyan-400 font-bold" : "text-white/70 hover:text-cyan-400"
            )}
          >
            <span className="opacity-50">//</span> MAP
          </a>
          <a 
            href="#evolution" 
            onClick={(e) => { e.preventDefault(); setActiveTab('evolution'); }}
            className={cn(
              "text-[10px] sm:text-xs font-mono tracking-widest whitespace-nowrap transition-colors uppercase",
              activeTab === 'evolution' ? "text-cyan-400 font-bold" : "text-white/70 hover:text-cyan-400"
            )}
          >
            <span className="opacity-50">//</span> EVOLVE
          </a>
          <a 
            href="#arc" 
            onClick={(e) => { e.preventDefault(); setActiveTab('arc'); }}
            className={cn(
              "text-[10px] sm:text-xs font-mono tracking-widest whitespace-nowrap transition-colors uppercase",
              activeTab === 'arc' ? "text-cyan-400 font-bold" : "text-white/70 hover:text-cyan-400"
            )}
          >
            <span className="opacity-50">//</span> ARC
          </a>
        </div>

        {/* Connect Button */}
        <Link 
          href="mailto:tharun.gajula@gmail.com"
          className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide shrink-0 whitespace-nowrap hover:scale-105 transition-transform"
        >
          CONNECT
        </Link>
      </div>

      {/* ACTIVE NODE POPUP HUD */}
      {activeNode && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-black/80 backdrop-blur-xl border border-white/20 p-5 rounded-2xl z-40 text-white shadow-[0_0_30px_rgba(0,255,255,0.1)] animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header & Close Button */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold tracking-wide text-cyan-400">{activeNode.name}</h3>
            <button onClick={() => setActiveNode(null)} className="text-white/50 hover:text-white bg-white/10 rounded-full w-6 h-6 flex items-center justify-center text-xs">✕</button>
          </div>
          
          {/* Description */}
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            {activeNode.description || "System logic expanding..."}
          </p>
          
          {/* Action Button (Only if link exists) */}
          {activeNode.link && (
            <a href={activeNode.link} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center bg-cyan-900/40 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black transition-all text-xs font-mono py-2 rounded-lg tracking-widest">
              [ INITIALIZE SYSTEM ]
            </a>
          )}
        </div>
      )}

      {/* SUBTLE SCANLINE EFFECT */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />
    </main>
  );
}
