"use client";

import { cn } from "@/lib/utils";

export default function ProjectArc() {
  return (
    <div className="min-h-[100svh] pt-32 pb-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: MANIFESTO & ROADMAP (Takes up 5 columns on desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-widest uppercase mb-4">
              OPERATION: ARC REACTOR
            </h2>
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl">
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-light">
                A 270-day sprint to engineer a multi-agent Family Health Operating System. Built to ingest disparate clinical data, track daily biometrics, and deploy personalized, preventative LLM analysis for my family. 
                <br/><br/>
                <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs">This is not a prototype. This is enterprise-grade survival.</span>
              </p>
            </div>
          </div>

          {/* PHASE ROADMAP */}
          <div className="flex flex-col gap-3 font-mono text-xs sm:text-sm tracking-widest mt-6">
            
            {/* Active Phase */}
            <div className="flex items-center gap-4 bg-cyan-950/40 border border-cyan-400/50 text-cyan-300 p-3.5 rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.15)]">
              {/* Premium Radar Ping Dot */}
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
              </span>
              <span className="font-bold opacity-90 tracking-[0.2em]">PHASE 01</span>
              <span className="text-cyan-500/50">//</span>
              <span className="truncate uppercase">DATA PIPELINES</span>
            </div>

            {/* Pending Phase 02 */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 text-white/40 p-3.5 rounded-xl">
              <span className="h-2 w-2 rounded-full bg-white/20 shrink-0 ml-[1px]"></span>
              <span className="font-bold opacity-80 tracking-[0.2em]">PHASE 02</span>
              <span className="text-white/20">//</span>
              <span className="truncate uppercase">MULTI-AGENT SYNTHESIS</span>
            </div>

            {/* Pending Phase 03 */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 text-white/40 p-3.5 rounded-xl">
              <span className="h-2 w-2 rounded-full bg-white/20 shrink-0 ml-[1px]"></span>
              <span className="font-bold opacity-80 tracking-[0.2em]">PHASE 03</span>
              <span className="text-white/20">//</span>
              <span className="truncate uppercase">CLINICAL DEPLOYMENT</span>
            </div>

          </div>
          
        </div>

        {/* RIGHT COLUMN: THE TERMINAL (Takes up 7 columns on desktop) */}
        <div className="lg:col-span-7 w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/10 bg-[#050505] flex flex-col h-[500px]">
          
          {/* Mac-Style Terminal Header */}
          <div className="h-10 bg-[#111111] border-b border-white/5 flex items-center px-4 justify-between shrink-0">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.2)]"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.2)]"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.2)]"></div>
            </div>
            <div className="text-[10px] text-white/30 font-mono tracking-widest uppercase italic">health-os-pipeline.exe</div>
            <div className="w-12"></div> {/* Spacer for centering */}
          </div>

          {/* Terminal Body */}
          <div className="p-6 overflow-y-auto font-mono text-xs md:text-sm space-y-4 h-full bg-black/40">
            <div className="text-white/70 flex gap-3">
              <span className="text-cyan-400 shrink-0 select-none">root@tharun:~$</span> 
              <span className="leading-relaxed">Commit Day 001: Initialized Next.js 14 environment. Configured Prisma ORM for biometric ingestion. Optimized SQLite local storage for HIPAA compliance baseline.</span>
            </div>
            <div className="text-white/70 flex gap-3">
              <span className="text-cyan-400 shrink-0 select-none">root@tharun:~$</span> 
              <span className="leading-relaxed">Commit Day 002: Integrated Apple HealthKit mock data streams. Mapping heart-rate variability and VO2 max indices to longitudinal graph state.</span>
            </div>
            <div className="text-white/40 flex gap-3 animate-pulse mt-8 items-center">
              <span className="text-cyan-400/50 shrink-0 select-none">root@tharun:~$</span> 
              <span className="flex items-center gap-1 italic">
                Awaiting next deployment
                <span className="w-1.5 h-4 bg-cyan-400/50 animate-pulse ml-1" />
              </span>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
