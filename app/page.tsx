"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import SplineAvatar from "@/components/SplineAvatar";
import EvolutionTimeline from "@/components/EvolutionTimeline";
import ConnectPage from "@/components/ConnectPage";
import { useRouter } from "next/navigation";
import WorkOverview from "@/components/WorkOverview";
import WorkGallery from "@/components/WorkGallery";
import { motion, AnimatePresence } from "framer-motion";
import JarvizCockpit from "@/components/jarviz/JarvizCockpit";

export const dynamic = 'force-dynamic';

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'thesis' | 'neural' | 'evolution' | 'connect'>('thesis');
  const [workTab, setWorkTab] = useState<'overview' | 'product_lab' | 'analytics_quant'>('product_lab');
  const [isCockpitOpen, setIsCockpitOpen] = useState(false);

  return (
    <main className="h-[100svh] w-full overflow-hidden relative bg-black select-none">
      {/* STICKY HEADER */}
      <header className="fixed top-0 left-0 w-full h-16 bg-black/40 backdrop-blur-2xl border-b border-white/10 z-50 flex items-center justify-between px-6 sm:px-10">
        <button
          onClick={() => { setActiveTab('thesis'); }}
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
        {activeTab === 'thesis' && <SplineAvatar onTalkClick={() => setIsCockpitOpen(true)} />}
        {activeTab === 'neural' && (
          <>
            {workTab === 'overview' && <WorkOverview />}
            {workTab === 'product_lab' && <WorkGallery type="product_lab" />}
            {workTab === 'analytics_quant' && <WorkGallery type="analytics_quant" />}
          </>
        )}
        {activeTab === 'evolution' && <EvolutionTimeline />}
        {activeTab === 'connect' && <ConnectPage />}
      </div>

      {/* WORK VIEW TOGGLE — sleek 3-Tab glassmorphic selector visible only on WORK tab */}
      {activeTab === 'neural' && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[55] flex items-center bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full p-1 max-w-[95%] sm:max-w-none overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <button
            onClick={() => setWorkTab('overview')}
            className={cn(
              "text-[10px] font-mono tracking-widest px-4 py-1.5 rounded-full transition-all cursor-pointer uppercase whitespace-nowrap",
              workTab === 'overview' ? "bg-white/10 text-cyan-400 font-bold" : "text-white/40 hover:text-white/70"
            )}
          >
            Overview
          </button>
          <button
            onClick={() => setWorkTab('product_lab')}
            className={cn(
              "text-[10px] font-mono tracking-widest px-4 py-1.5 rounded-full transition-all cursor-pointer uppercase whitespace-nowrap",
              workTab === 'product_lab' ? "bg-white/10 text-cyan-400 font-bold" : "text-white/40 hover:text-white/70"
            )}
          >
            Product Lab<span className="hidden sm:inline"> (AI Systems)</span>
          </button>
          <button
            onClick={() => setWorkTab('analytics_quant')}
            className={cn(
              "text-[10px] font-mono tracking-widest px-4 py-1.5 rounded-full transition-all cursor-pointer uppercase whitespace-nowrap",
              workTab === 'analytics_quant' ? "bg-white/10 text-cyan-400 font-bold" : "text-white/40 hover:text-white/70"
            )}
          >
            Analytics<span className="hidden sm:inline"> & Quant</span>
          </button>
        </div>
      )}

      {/* SPLINE LOGO MASKING ENGINE (Floating Pill Style) */}
      <div className="fixed bottom-5 right-5 hidden md:flex z-[60] bg-black/60 backdrop-blur-2xl border border-white/10 px-8 py-3 rounded-full items-center gap-3 select-none pointer-events-none shadow-2xl min-w-[200px] justify-center">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[10px] text-white/60 font-mono tracking-[0.4em] uppercase">SYSTEM: ONLINE</span>
      </div>

      {/* BOTTOM NAV DOCK */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] h-14 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-center px-4 z-[70] shadow-2xl pointer-events-auto">
        {/* Link Container */}
        <div className="flex items-center gap-5 sm:gap-10 overflow-hidden">
          <a
            href="#map"
            onClick={(e) => {
              e.preventDefault();
              const nextTab = activeTab === 'neural' ? 'thesis' : 'neural';
              setActiveTab(nextTab);
              if (nextTab === 'neural') {
                setWorkTab('product_lab');
              }
            }}
            className={cn(
              "text-[10px] sm:text-xs font-mono tracking-widest whitespace-nowrap transition-colors uppercase",
              activeTab === 'neural' ? "text-cyan-400 font-bold" : "text-white/70 hover:text-cyan-400"
            )}
          >
            <span className="opacity-50">//</span> WORK
          </a>
          <a
            href="#evolution"
            onClick={(e) => { e.preventDefault(); setActiveTab('evolution'); }}
            className={cn(
              "text-[10px] sm:text-xs font-mono tracking-widest whitespace-nowrap transition-colors uppercase",
              activeTab === 'evolution' ? "text-cyan-400 font-bold" : "text-white/70 hover:text-cyan-400"
            )}
          >
            <span className="opacity-50">//</span> STORY
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
      </div>

      {/* JARVIZ MULTIMODAL COCKPIT OVERLAY */}
      <JarvizCockpit
        isOpen={isCockpitOpen}
        onClose={() => setIsCockpitOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* SUBTLE SCANLINE EFFECT */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />

    </main>
  );
}
