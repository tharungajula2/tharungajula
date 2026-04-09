"use client";

import React from "react";
import { ChevronRight, Database, Layers, Binary } from "lucide-react";
import { LifeLabUniverse } from "@/lib/life-lab/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface UniverseCardProps {
  universe: LifeLabUniverse;
}

export function UniverseCard({ universe }: UniverseCardProps) {
  const isLocked = universe.status === "locked";
  const isPlanned = universe.status === "planned";
  const isLive = universe.status === "live";
  const isParallel = universe.universeClass === "parallel_wing";

  return (
    <Link 
      href={`/life-lab/${universe.id}`}
      className={cn(
        "group relative block transition-all duration-500",
        isLocked && "cursor-not-allowed opacity-80",
        isPlanned && "cursor-not-allowed opacity-60"
      )}
    >
      <div className={cn(
        "relative p-8 md:p-12 bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden transition-all duration-500",
        isLive && "hover:border-cyan-400/20",
        isLocked && "grayscale hover:grayscale-0 border-amber-900/10",
        isPlanned && "grayscale border-white/5"
      )}>
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br transition-opacity duration-700",
          isLive && "from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100",
          isLocked && "from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100",
          isPlanned && "from-slate-500/5 via-transparent to-transparent opacity-0"
        )} />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded font-mono text-[9px] text-slate-500 uppercase font-black tracking-widest">
                 Universe {String(universe.order).padStart(2, '0')}
               </span>
               {universe.currentState && (
                 <span className={cn(
                   "px-2 py-0.5 rounded font-mono text-[9px] uppercase font-black tracking-widest",
                   isLocked && "bg-amber-400/10 border border-amber-400/20 text-amber-500/80",
                   isPlanned && "bg-slate-400/10 border border-slate-400/20 text-slate-500",
                   isLive && isParallel && "bg-cyan-400/10 border border-cyan-400/20 text-cyan-400/80",
                   isLive && !isParallel && "bg-emerald-400/10 border border-emerald-400/20 text-emerald-400/80"
                 )}>
                   {universe.currentState}
                 </span>
               )}
            </div>
            
            <h2 className={cn(
              "font-heading text-3xl md:text-5xl font-black text-white tracking-tight transition-colors duration-500",
              isLive && "group-hover:text-cyan-400",
              isLocked && "group-hover:text-amber-400",
              isPlanned && "text-slate-500"
            )}>
              {universe.title}
            </h2>
            
            <p className="font-body text-sm md:text-base text-slate-400 leading-relaxed font-light line-clamp-2 italic opacity-80 decoration-white/10 underline underline-offset-8">
              {universe.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
               <div className="flex items-center gap-2 text-slate-500 font-mono">
                  <Layers className={cn("w-3.5 h-3.5", isLive ? "text-cyan-500/50" : "text-slate-600")} />
                  <span className="text-[10px] uppercase font-black tracking-widest">
                    {universe.id === "wellness" && "ACTIVE BUILDOUT"}
                    {universe.id === "cognition" && "FOUNDATION BUILDOUT"}
                    {universe.id === "reasoning" && "PRACTICE ARCHIVE"}
                    {universe.id === "human-ecosystem" && "FOUNDATIONAL ENTRIES"}
                    {universe.id === "sandbox" && "NO FIXED CANON"}
                  </span>
               </div>
               <div className="flex items-center gap-2 text-slate-500 font-mono">
                  <Binary className={cn("w-3.5 h-3.5", isLive ? "text-cyan-500/50" : "text-slate-600")} />
                  <span className="text-[10px] uppercase font-black tracking-widest">
                    {universe.id === "wellness" && "FLAGSHIP CORE"}
                    {universe.id === "cognition" && "MENTAL BACKBONE"}
                    {universe.id === "reasoning" && "RIGOR TRAINING"}
                    {universe.id === "human-ecosystem" && "HUMAN SYSTEMS"}
                    {universe.id === "sandbox" && "OPEN BUFFER"}
                  </span>
               </div>
            </div>
          </div>

          {/* RIGHT: ACTION & STATS */}
          <div className="flex flex-col items-end gap-3 shrink-0">
             <div className={cn(
               "px-3 py-1 rounded-md border text-center min-w-[120px]",
               isLive && "bg-cyan-500/10 border-cyan-400/20 text-cyan-400",
               isLocked && "bg-amber-500/10 border-amber-400/20 text-amber-400",
               isPlanned && "bg-white/5 border-white/10 text-slate-600"
             )}>
                <span className="font-mono text-[9px] uppercase font-black tracking-widest">
                  {universe.id === "wellness" && "Active Core"}
                  {universe.id === "cognition" && "Backbone Buildout"}
                  {universe.id === "reasoning" && "Practice Wing"}
                  {universe.id === "human-ecosystem" && "Architecture Wing"}
                  {universe.id === "sandbox" && "Mystery Box"}
                  {!["wellness", "cognition", "reasoning", "human-ecosystem", "sandbox"].includes(universe.id) && (isParallel ? "Parallel Wing" : "System Core")}
                </span>
             </div>
             
             <div className={cn(
               "flex items-center gap-2 transition-colors",
               isLive ? "text-slate-500 group-hover:text-white" : "text-slate-700"
             )}>
                <span className="font-mono text-[10px] uppercase font-black tracking-widest">
                  {universe.id === "sandbox" ? "Open Box" : isLive ? "Explore Universe" : isLocked ? "Preview Architecture" : "Planned Concept"}
                </span>
                <ChevronRight className={cn(
                  "w-4 h-4 transition-transform",
                  isLive && "group-hover:translate-x-1"
                )} />
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
