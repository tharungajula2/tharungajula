import React from "react";
import { Metadata } from "next";
import { BookOpen, Library } from "lucide-react";
import Link from "next/link";
import { UniverseCard } from "@/components/atlas/UniverseCard";
import { ATLAS_UNIVERSES } from "@/lib/atlas/data";

export const metadata: Metadata = {
  title: "Atlas OS | Global Health Masterclass & Clinical Compendium",
  description: "A centralized repository of long-form clinical insights, human health systems architecture, and fundamental biology protocols. Curated for longevity and systemic wellness.",
  openGraph: {
    title: "Atlas OS | Knowledge Core",
    description: "Deep reading for the foundations of human health.",
    type: "website",
    url: "https://tharungajula.com/atlas",
  }
};

export default function AtlasPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* NAVIGATION RAIL (Top) */}
      <nav className="flex items-center justify-between py-6 border-b border-white/5 mb-20">
        <div className="flex items-center gap-2">
           <BookOpen className="w-4 h-4 text-cyan-400" />
           <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest font-black text-white/40">Atlas OS // Knowledge Core</span>
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
             Deep Knowledge Archive
           </span>
        </div>
        
        <div className="space-y-6">
           <h1 className="font-heading text-6xl md:text-8xl font-black tracking-tighter text-white">
             ATLAS OS
           </h1>
           <p className="font-body text-lg md:text-xl text-slate-400 leading-relaxed font-light tracking-wide max-w-2xl mx-auto italic opacity-80">
             A compendium of clinical insights, systemic health wisdom, and the longitudinal architecture of human vitality.
           </p>
        </div>
      </section>

      {/* UNIVERSES SECTIONS */}
      <section className="space-y-32">
        {/* SECTION 1: CORE HEALTH LADDER */}
        <div className="space-y-12">
          <div className="flex items-center gap-6">
             <div className="h-px w-12 bg-cyan-500/20" />
             <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">Core Health Ladder</h3>
             <div className="h-px flex-1 bg-white/5" />
          </div>
          
          <div className="grid grid-cols-1 gap-12">
             {ATLAS_UNIVERSES.filter(u => u.sectionGrouping === "Core Health Ladder").map((universe) => (
               <UniverseCard key={universe.id} universe={universe} />
             ))}
          </div>
        </div>

        {/* SECTION 2: PARALLEL AUXILIARY UNIVERSES */}
        <div className="space-y-12">
          <div className="flex items-center gap-6">
             <div className="h-px w-12 bg-slate-500/20" />
             <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">Parallel Auxiliary Universes</h3>
             <div className="h-px flex-1 bg-white/5" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {ATLAS_UNIVERSES.filter(u => u.sectionGrouping === "Parallel Auxiliary Universes").map((universe) => (
               <UniverseCard key={universe.id} universe={universe} />
             ))}
          </div>
        </div>
      </section>

      {/* FOOTER RAILS */}
      <footer className="mt-64 pt-20 border-t border-white/5 text-center pb-20">
         <div className="inline-flex items-center gap-4 text-slate-700">
            <span className="w-12 h-px bg-white/5" />
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] font-black">Atlas Protocol v4.0.2</span>
            <span className="w-12 h-px bg-white/5" />
         </div>
      </footer>
    </div>
  );
}
