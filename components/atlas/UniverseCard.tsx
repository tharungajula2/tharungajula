"use client";

import React from "react";
import { ChevronRight, Database, Layers, Binary } from "lucide-react";
import { AtlasUniverse } from "@/lib/atlas/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface UniverseCardProps {
  universe: AtlasUniverse;
}

export function UniverseCard({ universe }: UniverseCardProps) {
  return (
    <Link 
      href={`/atlas/${universe.id}`}
      className="group relative block"
    >
      <div className="relative p-8 md:p-12 bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-400/20 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
               <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded font-mono text-[9px] text-slate-500 uppercase font-black tracking-widest">
                 Universe {universe.id === "foundations-of-human-health" ? "01" : "xx"}
               </span>
            </div>
            
            <h2 className="font-heading text-3xl md:text-5xl font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-500">
              {universe.title}
            </h2>
            
            <p className="font-body text-sm md:text-base text-slate-400 leading-relaxed font-light line-clamp-2 italic opacity-80 decoration-cyan-400/20 underline underline-offset-8">
              {universe.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
               <div className="flex items-center gap-2 text-slate-500 font-mono">
                  <Layers className="w-3.5 h-3.5 text-cyan-500/50" />
                  <span className="text-[10px] uppercase font-black tracking-widest">{universe.moduleCount} Clinical Modules</span>
               </div>
               <div className="flex items-center gap-2 text-slate-500 font-mono">
                  <Binary className="w-3.5 h-3.5 text-cyan-500/50" />
                  <span className="text-[10px] uppercase font-black tracking-widest">{universe.contentType}</span>
               </div>
            </div>
          </div>

          {/* RIGHT: ACTION & STATS */}
          <div className="flex flex-col items-end gap-3 shrink-0">
             <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-400/20 rounded-md">
                <span className="font-mono text-[9px] text-cyan-400 uppercase font-black tracking-widest">Scientific Foundation</span>
             </div>
             
             <div className="flex items-center gap-2 text-slate-500 group-hover:text-white transition-colors">
                <span className="font-mono text-[10px] uppercase font-black tracking-widest">Explore Universe</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
