import React from "react";
import { LifeLabModule } from "@/lib/life-lab/types";
import { CheckCircle2, ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleItemProps {
  module: LifeLabModule;
}

export function ModuleItem({ module }: ModuleItemProps) {
  const isAvailable = module.status !== "draft";

  return (
    <div className={cn(
      "group relative p-6 md:p-8 bg-slate-900/20 backdrop-blur-3xl border border-white/5 rounded-2xl transition-all duration-500",
      isAvailable ? "hover:bg-slate-900/60 hover:border-white/10" : "opacity-60 grayscale-[0.5]"
    )}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pointer-events-none select-none">
        
        {/* LEFT: ORDER & TITLE */}
        <div className="flex items-center gap-6 flex-1">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex flex-col items-center justify-center font-mono shrink-0">
             <span className="text-[9px] text-slate-500 font-bold uppercase -mb-0.5">M</span>
             <span className="text-sm font-black text-white leading-none">
               {module.moduleNumber < 10 ? `0${module.moduleNumber}` : module.moduleNumber}
             </span>
          </div>
          
          <div className="space-y-1">
            <h3 className="font-heading text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              {module.title}
            </h3>
            <p className="font-body text-[13px] md:text-sm text-slate-500 font-light max-w-xl group-hover:text-slate-400 transition-colors">
              {module.summary}
            </p>
          </div>
        </div>

        {/* RIGHT: METADATA & CTA */}
        <div className="flex items-center gap-8 justify-between md:justify-end shrink-0 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
          <div className="flex items-center gap-6">
             <div className="text-right">
                <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-0.5">Session</p>
                <p className="text-sm font-mono text-white font-black">{module.readingTime} Min</p>
             </div>
             
             {isAvailable ? (
               <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 opacity-60" />
               </div>
             ) : (
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 text-slate-600" />
                </div>
             )}
          </div>

          <ChevronRight className={cn(
            "w-5 h-5 transition-all duration-500",
            isAvailable ? "text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1" : "text-slate-800"
          )} />
        </div>

      </div>

      {/* AMBIENT GLYPH LINE (Visual flourish) */}
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent group-hover:via-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
}
