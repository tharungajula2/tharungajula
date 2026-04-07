import React from "react";
import { Metadata } from "next";
import { ArrowUpRight, Monitor, Settings, Zap, Globe } from "lucide-react"; // Custom lucide-react icons
import Link from "next/link";
import { TopStatusRail } from "@/components/layout/TopStatusRail";
import { systemsData } from "@/data/systems";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Systems Index | Tharun Gajula",
  description: "A centralized index of structural digital systems, concept-operating environments, and quantitative portfolios built by Tharun Gajula.",
  openGraph: {
    title: "Systems Index | Knowledge Hub",
    description: "Operating systems for learning, health, and analysis.",
    type: "website",
  }
};

export default function SystemsPage() {
  return (
    <main className="min-h-screen w-full bg-slate-950 relative overflow-x-hidden pt-16 md:pt-18 pb-32">
      {/* GLOBAL HUD RAIL */}
      <TopStatusRail />

      {/* AMBIENT BACKGROUND LAYER (Static but premium) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-900/10 blur-[150px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 md:pt-32">
        {/* HERO HEADER */}
        <section className="mb-24 md:mb-32">
          <div className="inline-block px-3 py-1 bg-cyan-400/5 border border-cyan-400/20 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-bold">
              // SYSTEMS_ARCHIVE
            </span>
          </div>
          
          <div className="max-w-3xl space-y-8">
            <h1 className="font-heading text-5xl md:text-8xl font-black tracking-tighter text-white uppercase animate-in fade-in slide-in-from-left-4 duration-1000">
              Systems I Build
            </h1>
            <p className="font-body text-lg md:text-2xl text-slate-400 leading-relaxed font-light tracking-wide animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              A public index of structural digital systems, concept-operating environments, and quantitative portfolios. Each represents a unique environment built to make complex domains clearer and more usable.
            </p>
          </div>
        </section>

        {/* SYSTEMS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {systemsData.map((project, i) => (
            <div 
              key={project.id}
              className="group glass-card p-10 md:p-12 rounded-3xl border border-white/5 hover:border-cyan-400/20 transition-all duration-700 bg-slate-900/20 hover:bg-slate-900/40 relative overflow-hidden flex flex-col justify-between animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[8px] md:text-[10px] tracking-[0.4em] text-slate-500 uppercase font-black group-hover:text-cyan-400 transition-colors">
                    {project.label}
                  </span>
                  <div className={cn(
                    "px-2.5 py-1 rounded-full border text-[8px] md:text-[9px] font-mono tracking-widest uppercase",
                    project.status === "Live" ? "text-cyan-400 border-cyan-400/20 bg-cyan-400/5" : "text-slate-500 border-white/5 bg-white/5"
                  )}>
                    {project.status}
                  </div>
                </div>

                <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6 group-hover:tracking-wider transition-all duration-500">
                  {project.title}
                </h3>
                
                <p className="font-body text-base md:text-lg text-slate-400 leading-relaxed font-light mb-10 antialiased">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-12">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full font-mono text-[8.5px] uppercase tracking-wider text-slate-500 border border-transparent group-hover:border-white/5 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link 
                href={project.href}
                target={project.isExternal ? "_blank" : undefined}
                rel={project.isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-3 font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white hover:text-cyan-400 transition-all duration-300 group/link"
              >
                {project.ctaLabel}
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover/link:text-cyan-400 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 duration-300" />
              </Link>
            </div>
          ))}
        </div>

        {/* FINAL CLOSING NOTE */}
        <footer className="mt-32 pt-20 border-t border-white/5 text-center">
          <p className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.5em] text-slate-600 font-medium">
            Symmetry in Thought. Coherence in Execution.
          </p>
        </footer>
      </div>
    </main>
  );
}
