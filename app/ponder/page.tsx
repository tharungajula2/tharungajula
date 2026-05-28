"use client";

import Link from "next/link";
import { ArrowLeft, FileText, MessageSquare, Activity } from "lucide-react";
import { usePonderStore } from "@/stores/ponderStore";
import DocumentPanel from "@/components/ponder/DocumentPanel";
import ChatPanel from "@/components/ponder/ChatPanel";
import TracePanel from "@/components/ponder/TracePanel";

export default function PonderPage() {
  const { 
    activeMobilePanel, 
    setActiveMobilePanel 
  } = usePonderStore();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden font-body">
      
      {/* Background ambient HUD nodes (Glow & Scan grid matching layout.tsx) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] pointer-events-none" />
      </div>

      {/* Top HUD command header */}
      <header className="border-b border-white/10 bg-zinc-950/40 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-4">
          {/* Neon pulsating status ring */}
          <div className="relative w-8 h-8 rounded-full border border-cyan-400/30 flex items-center justify-center bg-cyan-950/20 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="absolute w-full h-full rounded-full border border-cyan-400/20 animate-ping opacity-30" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2.5">
              <span className="text-[9px] font-mono tracking-widest text-cyan-400 font-bold bg-cyan-950/30 border border-cyan-400/20 px-2 py-0.5 rounded">
                // PONDER_AGENT_CONSOLE
              </span>
              <span className="text-[9px] font-mono tracking-widest text-cyan-400 font-bold bg-cyan-950/30 border border-cyan-400/20 px-2 py-0.5 rounded animate-pulse">
                SYSTEM: LIVE_AGENT_ACTIVE
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-xl font-bold font-outfit text-white tracking-wide">Ponder</h1>
              <p className="text-xs text-white/50 font-sans">
                AI that thinks before it speaks.
              </p>
            </div>
          </div>
        </div>

        {/* Back navigation button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white/60 hover:text-cyan-400 border border-white/10 hover:border-cyan-400/30 bg-white/5 hover:bg-cyan-950/20 px-3.5 py-2 rounded-xl transition-all duration-300 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>// RETURN_HOME</span>
        </Link>
      </header>

      {/* Main Grid Workspace */}
      <div className="flex-1 w-full max-w-[1700px] mx-auto p-4 sm:p-6 overflow-hidden flex flex-col min-h-0">
        
        {/* DESKTOP Cockpit Layout */}
        <div className="hidden lg:grid lg:grid-cols-[300px_1fr_400px] gap-6 flex-1 min-h-0 items-stretch">
          
          {/* Left panel: Documents */}
          <div className="min-h-0 h-full">
            <DocumentPanel />
          </div>

          {/* Center panel: Main Agent Dialogue */}
          <div className="min-h-0 h-full">
            <ChatPanel />
          </div>

          {/* Right panel: Reasoning Trace */}
          <div className="min-h-0 h-full">
            <TracePanel />
          </div>
          
        </div>

        {/* MOBILE Responsive Layout (Tabbed) */}
        <div className="flex lg:hidden flex-col flex-1 min-h-0 space-y-4">
          
          {/* Mobile navigation tab buttons */}
          <div className="grid grid-cols-3 gap-2 bg-zinc-950/60 border border-white/10 rounded-xl p-1 shrink-0">
            <button
              onClick={() => setActiveMobilePanel('docs')}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-mono text-[10px] font-bold tracking-wider transition-all uppercase ${
                activeMobilePanel === 'docs'
                  ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-400/20'
                  : 'text-white/40 border border-transparent hover:text-white/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CONTEXT</span>
            </button>
            <button
              onClick={() => setActiveMobilePanel('chat')}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-mono text-[10px] font-bold tracking-wider transition-all uppercase ${
                activeMobilePanel === 'chat'
                  ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-400/20'
                  : 'text-white/40 border border-transparent hover:text-white/60'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>DIALOGUE</span>
            </button>
            <button
              onClick={() => setActiveMobilePanel('trace')}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-mono text-[10px] font-bold tracking-wider transition-all uppercase ${
                activeMobilePanel === 'trace'
                  ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-400/20'
                  : 'text-white/40 border border-transparent hover:text-white/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>TRACE</span>
            </button>
          </div>

          {/* Active mobile viewport panel */}
          <div className="flex-1 min-h-0">
            {activeMobilePanel === 'docs' && (
              <DocumentPanel />
            )}
            {activeMobilePanel === 'chat' && (
              <ChatPanel />
            )}
            {activeMobilePanel === 'trace' && (
              <TracePanel />
            )}
          </div>

        </div>

      </div>

    </main>
  );
}
