import React from "react";
import Link from "next/link";

export default function AtlasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col font-body bg-transparent selection:bg-cyan-500/30 selection:text-white">
      {/* ATLAS NAVIGATION HEAD */}
      <header className="fixed top-0 left-0 w-full h-16 md:h-20 bg-slate-950/40 backdrop-blur-3xl border-b border-white/5 px-6 md:px-12 flex items-center justify-between z-50 transition-all duration-300">
          <Link href="/atlas" className="flex items-center gap-3 group">
              <span className="font-mono text-[10px] md:text-[11px] font-black text-cyan-400 tracking-[0.4em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                  ATLAS OS
              </span>
              <div className="h-px w-8 bg-white/10 group-hover:bg-cyan-400/30 transition-colors" />
              <span className="font-mono text-[9px] md:text-[10px] text-slate-500 uppercase tracking-widest hidden sm:block">
                  Knowledge Core
              </span>
          </Link>
          
          <Link 
            href="/" 
            className="text-[10px] md:text-[11px] font-mono text-slate-500 hover:text-white transition-all uppercase tracking-widest px-3 py-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 mr-2 md:mr-0"
          >
            Return to Home
          </Link>
      </header>

      {/* SEAMLESS SPACIOUS CONTENT CONTAINER */}
      <main className="flex-1 pt-24 md:pt-32 pb-24 px-6 relative z-10">
          <div className="max-w-5xl mx-auto w-full h-full">
            {children}
          </div>
      </main>

      {/* AMBIENT SOFT GLOW (Subtle for Atlas) */}
      <div className="fixed top-0 right-0 w-[40%] h-[40%] bg-cyan-600/5 blur-[120px] pointer-events-none -z-5" />
    </div>
  );
}
