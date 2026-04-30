"use client";

import { cn } from "@/lib/utils";

export default function ProjectArc() {
  return (
    <div className="min-h-[100svh] pt-32 pb-40 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* LEFT COLUMN: MANIFESTO & ROADMAP (Takes up 5 columns on desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-12">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 opacity-60 uppercase">
                // STRATEGIC_INTENT
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-widest uppercase italic">
                OPERATION: <br/>ARC REACTOR
              </h2>
            </div>
            
            <div className="bg-black/50 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
              {/* Subtle background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
              
              <p className="text-sm md:text-base text-white/70 leading-relaxed font-light relative z-10">
                A 270-day sprint to engineer a multi-agent Family Health Operating System. Built to ingest disparate clinical data, track daily biometrics, and deploy personalized, preventative LLM analysis for my family. 
                <br/><br/>
                <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-[10px] font-mono bg-cyan-400/10 px-3 py-1 rounded-md border border-cyan-400/20">
                  MISSION_STATUS: CRITICAL_ASSET
                </span>
              </p>
            </div>
          </div>

          {/* PHASE ROADMAP */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase ml-1">
              Deployment Pipeline
            </span>
            <div className="flex flex-col gap-3 font-mono text-xs tracking-[0.15em]">
              
              {/* Active Phase */}
              <div className="flex items-center gap-5 bg-cyan-950/20 border border-cyan-400/30 text-cyan-400 p-4 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.05)]">
                {/* Premium Radar Ping Dot */}
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
                <div className="flex flex-col">
                  <span className="font-bold opacity-60 text-[9px] mb-0.5 tracking-[0.3em]">PHASE 01</span>
                  <span className="truncate uppercase font-bold text-xs">DATA PIPELINES</span>
                </div>
                <span className="ml-auto text-[9px] opacity-40 uppercase tracking-widest">[IN_PROGRESS]</span>
              </div>

              {/* Pending Phase 02 */}
              <div className="flex items-center gap-5 bg-white/5 border border-white/5 text-white/20 p-4 rounded-2xl grayscale opacity-60">
                <span className="h-2 w-2 rounded-full bg-white/20 shrink-0 ml-[1px]"></span>
                <div className="flex flex-col">
                  <span className="font-bold opacity-60 text-[9px] mb-0.5 tracking-[0.3em]">PHASE 02</span>
                  <span className="truncate uppercase font-bold text-xs text-white/40">MULTI-AGENT SYNTHESIS</span>
                </div>
              </div>

              {/* Pending Phase 03 */}
              <div className="flex items-center gap-5 bg-white/5 border border-white/5 text-white/20 p-4 rounded-2xl grayscale opacity-60">
                <span className="h-2 w-2 rounded-full bg-white/20 shrink-0 ml-[1px]"></span>
                <div className="flex flex-col">
                  <span className="font-bold opacity-60 text-[9px] mb-0.5 tracking-[0.3em]">PHASE 03</span>
                  <span className="truncate uppercase font-bold text-xs text-white/40">CLINICAL DEPLOYMENT</span>
                </div>
              </div>

            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN: THE TERMINAL (Takes up 7 columns on desktop) */}
        <div className="lg:col-span-7 w-full rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10 bg-black/40 backdrop-blur-3xl flex flex-col h-[600px] group hover:border-cyan-500/20 transition-colors duration-700">
          
          {/* Mac-Style Terminal Header */}
          <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-6 justify-between shrink-0">
            <div className="flex gap-2.5">
              <div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/20"></div>
            </div>
            <div className="text-[9px] text-white/40 font-mono tracking-[0.4em] uppercase italic select-none">system_pipeline_terminal.exe</div>
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>

          {/* Terminal Body */}
          <div className="p-8 md:p-10 overflow-y-auto font-mono text-xs md:text-[13px] space-y-6 h-full no-scrollbar">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-[10px] text-cyan-400/50 mb-1">
                <span>[LOG_ENTRY_001]</span>
                <div className="h-px flex-1 bg-cyan-400/10" />
              </div>
              <div className="text-white/70 flex gap-4">
                <span className="text-cyan-400/40 shrink-0 select-none">&gt;</span> 
                <span className="leading-relaxed tracking-wide">Initialized Next.js 16 environment. Configured Prisma ORM for biometric ingestion. Optimized SQLite local storage for HIPAA compliance baseline.</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-[10px] text-cyan-400/50 mb-1">
                <span>[LOG_ENTRY_002]</span>
                <div className="h-px flex-1 bg-cyan-400/10" />
              </div>
              <div className="text-white/70 flex gap-4">
                <span className="text-cyan-400/40 shrink-0 select-none">&gt;</span> 
                <span className="leading-relaxed tracking-wide">Integrated Apple HealthKit mock data streams. Mapping heart-rate variability and VO2 max indices to longitudinal graph state.</span>
              </div>
            </div>

            <div className="pt-6">
              <div className="text-cyan-400/40 flex gap-4 animate-pulse items-center">
                <span className="shrink-0 select-none font-bold">&gt;</span> 
                <span className="flex items-center gap-2 italic tracking-[0.3em] uppercase text-[10px]">
                  Awaiting next sequence
                  <span className="w-2 h-4 bg-cyan-400 animate-pulse ml-1" />
                </span>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
