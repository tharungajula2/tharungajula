import React from "react";
import { Metadata } from "next";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { UniverseCard } from "@/components/life-lab/UniverseCard";
import { LIFE_LAB_UNIVERSES } from "@/lib/life-lab/data";

export const metadata: Metadata = {
  title: "Tharun Life Lab | Knowledge Core",
  description: "A structured public learning archive for health, thinking, reasoning, and the human systems that shape everyday life.",
  openGraph: {
    title: "Tharun Life Lab | Knowledge Core",
    description: "Built to turn dense topics into clear, trustworthy learning for serious beginners and curious general audiences.",
    type: "website",
    url: "https://tharungajula.com/life-lab",
  }
};

export default function LifeLabPage() {
  // Sort universes by the canonical 'order' property 1-5
  const sortedUniverses = [...LIFE_LAB_UNIVERSES].sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* NAVIGATION RAIL (Top) */}
      <nav className="flex items-center justify-between py-6 border-b border-white/5 mb-20">
        <div className="flex items-center gap-2">
           <BookOpen className="w-4 h-4 text-cyan-400" />
           <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest font-black text-white/40">Life Lab // Knowledge Core</span>
        </div>
        <Link 
          href="/" 
          className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-black text-slate-500 hover:text-white transition-colors"
        >
          Return to Home
        </Link>
      </nav>

      {/* QUIET HERO */}
      <section className="text-center max-w-3xl mx-auto space-y-8 pt-10 md:pt-20 mb-32">
        <div className="inline-block px-3 py-1 bg-cyan-400/5 border border-cyan-400/10 rounded-full mb-4">
           <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-cyan-400/60 font-bold flex items-center gap-2">
             <BookOpen className="w-3 h-3" />
             Private Archive
           </span>
        </div>
        
        <div className="space-y-6">
           <h1 className="font-heading text-6xl md:text-8xl font-black tracking-tighter text-white">
             LIFE LAB
           </h1>
           <p className="font-body text-lg md:text-xl text-slate-400 leading-relaxed font-light tracking-wide max-w-2xl mx-auto italic opacity-80 antialiased">
             A structured public learning archive for health, thinking, reasoning, and the human systems that shape everyday life.
           </p>
           <p className="font-body text-sm text-slate-500 leading-relaxed font-light max-w-xl mx-auto">
             Built to turn dense topics into clear, trustworthy learning for serious beginners and curious general audiences.
           </p>
        </div>
      </section>

      {/* UNIVERSES SECTIONS */}
      <section className="space-y-24">
        <div className="flex items-center gap-6 mb-16">
           <div className="h-px w-12 bg-cyan-500/20" />
           <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">Canonical Universes</h3>
           <div className="h-px flex-1 bg-white/5" />
         </div>
         
         <div className="grid grid-cols-1 gap-12">
            {sortedUniverses.map((universe, index) => (
              <div key={universe.id} className="relative group">
                {/* Numerical ID for the index */}
                <div className="absolute -left-12 top-4 hidden xl:block">
                   <span className="font-mono text-[11px] font-black text-slate-800 group-hover:text-cyan-400/20 transition-colors">
                    U{index + 1}
                  </span>
                </div>
                
                <UniverseCard universe={universe} />
              </div>
            ))}
         </div>
      </section>

      {/* FOOTER RAILS */}
      <footer className="mt-64 pt-20 border-t border-white/5 text-center pb-20">
         <div className="inline-flex items-center gap-4 text-slate-700">
            <span className="w-12 h-px bg-white/5" />
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] font-black">Life Lab Protocol // Five-Universe Build</span>
            <span className="w-12 h-px bg-white/5" />
         </div>
      </footer>
    </div>
  );
}
