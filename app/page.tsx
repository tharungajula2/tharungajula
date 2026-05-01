"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import SplineAvatar from "@/components/SplineAvatar";
import { NeuralGraph } from "@/components/NeuralGraph";
import EvolutionTimeline from "@/components/EvolutionTimeline";
import ConnectPage from "@/components/ConnectPage";
import AIChatPanel from "@/components/ui/AIChatPanel";

export const dynamic = 'force-dynamic';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'thesis' | 'neural' | 'evolution' | 'connect'>('thesis');
  const [activeNode, setActiveNode] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="h-[100svh] w-full overflow-hidden relative bg-black select-none">
      {/* STICKY HEADER */}
      <header className="fixed top-0 left-0 w-full h-16 bg-black/40 backdrop-blur-2xl border-b border-white/10 z-50 flex items-center justify-between px-6 sm:px-10">
        <button 
          onClick={() => { setActiveTab('thesis'); setActiveNode(null); }}
          className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase select-none text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400 cursor-pointer hover:opacity-80 transition-opacity"
        >
          THARUN GAJULA
        </button>
        
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
      <div className={cn(
        "absolute inset-0 z-0",
        activeTab === 'thesis' ? "fixed inset-0 overflow-hidden touch-none" : "overflow-y-auto no-scrollbar scroll-smooth pt-24"
      )}>
        {activeTab === 'thesis' && <SplineAvatar />}
        {activeTab === 'neural' && <NeuralGraph onNodeClick={(node) => setActiveNode(node)} />}
        {activeTab === 'evolution' && <EvolutionTimeline />}
        {activeTab === 'connect' && <ConnectPage />}
      </div>

      {/* SPLINE LOGO MASKING ENGINE (Floating Pill Style) */}
      <div className="fixed bottom-5 right-5 hidden md:flex z-[60] bg-black/60 backdrop-blur-2xl border border-white/10 px-8 py-3 rounded-full items-center gap-3 select-none pointer-events-none shadow-2xl min-w-[200px] justify-center">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[10px] text-white/60 font-mono tracking-[0.4em] uppercase">SYSTEM: ONLINE</span>
      </div>

      {/* EXACT REPLACEMENT FOR BOTTOM NAV DOCK */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] h-14 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-between px-4 z-[70] shadow-2xl pointer-events-auto">
        
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
            href="#connect" 
            onClick={(e) => { e.preventDefault(); setActiveTab('connect'); }}
            className={cn(
              "text-[10px] sm:text-xs font-mono tracking-widest whitespace-nowrap transition-colors uppercase",
              activeTab === 'connect' ? "text-cyan-400 font-bold" : "text-white/70 hover:text-cyan-400"
            )}
          >
            <span className="opacity-50">//</span> CONNECT
          </a>
        </div>

        {/* ASK AI Button */}
        <button 
          onClick={() => setIsChatOpen(true)}
          className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide shrink-0 whitespace-nowrap hover:scale-105 transition-transform uppercase cursor-pointer"
        >
          ASK AI
        </button>
      </div>

      {/* ACTIVE NODE POPUP HUD */}
      {activeNode && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-black/50 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl z-40 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-5 fade-in duration-500">
          
          {/* Header & Close Button */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/60 block mb-1 uppercase select-none">
                // SYSTEM_NODE_ACTIVE
              </span>
              <h3 className="text-xl font-bold tracking-widest text-white uppercase">{activeNode.name}</h3>
            </div>
            <button 
              onClick={() => setActiveNode(null)} 
              className="text-white/30 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full w-8 h-8 flex items-center justify-center text-xs transition-all"
            >
              ✕
            </button>
          </div>
          
          {/* Description */}
          <div className="space-y-4">
            <p className="text-sm text-white/70 leading-relaxed font-light">
              {activeNode.description || "System logic expanding..."}
            </p>
            
            {/* Metadata Tag (Clinical Feel) */}
            <div className="flex items-center gap-2 py-2 border-y border-white/5">
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Status:</span>
              <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-[0.2em] animate-pulse">Online</span>
              <span className="text-white/10 ml-auto font-mono text-[9px]">{activeNode.id?.toUpperCase()}</span>
            </div>
          </div>
          
          {/* Action Button (Only if link exists) */}
          {activeNode.link && (
            <a 
              href={activeNode.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 flex items-center justify-center w-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all text-[10px] font-mono py-3 rounded-xl tracking-[0.3em] uppercase group"
            >
              [ INITIALIZE_CONNECTION ]
            </a>
          )}
        </div>
      )}

      {/* SUBTLE SCANLINE EFFECT */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />

      {/* AI CHAT PANEL */}
      <AIChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}
