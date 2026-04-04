"use client";

import React from "react";
import { SimulationSidebar } from "../../components/simulation/layout/SimulationSidebar";
import { SimulationHeader } from "../../components/simulation/layout/SimulationHeader";
import { mockMember } from "../../data/simulation/mockMember";

export default function SimulationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-transparent overflow-hidden font-body text-slate-300">
      {/* SIDEBAR - SLEEK FIXED RAIL */}
      <SimulationSidebar />

      {/* SIMULATION FRAMING BANNER */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-cyan-500/10 backdrop-blur-md border-b border-cyan-400/20 px-6 py-1.5 flex items-center justify-between pointer-events-none select-none">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
             <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-[0.2em]">Product Simulation</span>
           </div>
           <div className="w-px h-3 bg-white/10" />
           <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic">Research & Methodology Thinking</span>
        </div>
        <div className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter">
           Local Mock Data | Not Clinical Advice
        </div>
      </div>

      <div className="relative flex flex-col h-full w-full overflow-hidden pt-8">
        {/* HEADER - MEMBER SNAPSHOT */}
        <SimulationHeader 
          member={mockMember.member} 
          lastUpdated={mockMember.lastUpdated}
        />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
            {children}
          </div>
        </main>
      </div>

      {/* RE-INFORCE GRID BACKGROUND JUST FOR SIMULATION DEPTH */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px:32px]" />
      </div>
    </div>
  );
}
