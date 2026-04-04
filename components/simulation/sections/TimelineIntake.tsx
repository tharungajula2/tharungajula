"use client";

import React from "react";
import { SimulationState, TimelineEvent } from "@/types/simulation";
import { 
  FileText, 
  Search, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  AlertTriangle,
  Calendar,
  Activity,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  state: SimulationState;
}

export function TimelineIntake({ state }: SectionProps) {
  const { timeline, member } = state;

  return (
    <div className="space-y-8 max-w-5xl">
       {/* HEADER RAILS */}
       <div className="flex items-end justify-between border-b border-white/5 pb-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-white tracking-tight uppercase">Informatics Timeline</h2>
          <p className="text-sm text-slate-500 font-mono tracking-tight uppercase mt-1">Longitudinal Data Review | Member {member.id}</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                 <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                 <Activity className="w-4 h-4 text-cyan-400" />
              </div>
           </div>
           <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Review Status: Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT COLUMN: SOURCE LIST */}
        <div className="lg:col-span-1 space-y-4">
           <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-4">Source Informatics</h3>
           {timeline.filter(e => e.source).map(event => (
              <div key={event.id} className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-xl p-4 group hover:border-white/10 transition-all cursor-pointer">
                 <div className="flex items-center justify-between mb-2">
                    <FileText className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-white transition-colors" />
                 </div>
                 <p className="text-[11px] font-bold text-white leading-tight mb-1">{event.source}</p>
                 <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-500 uppercase">{event.date}</span>
                    <span className="text-[9px] font-mono text-emerald-500/60 uppercase">Extracted</span>
                 </div>
              </div>
           ))}
           
           <div className="bg-slate-900/20 border border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-white/20 transition-all">
              <Search className="w-6 h-6 text-slate-600 mb-2 group-hover:text-cyan-400 transition-colors" />
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Capture Source</p>
           </div>
        </div>

        {/* CENTER COLUMN: THE TIMELINE RAIL */}
        <div className="lg:col-span-3 space-y-12 pl-4 border-l border-white/5 relative">
           {/* THE LINE */}
           <div className="absolute left-[-1px] top-4 bottom-4 w-px bg-gradient-to-b from-cyan-400/50 via-slate-800 to-transparent" />

           {timeline.map((event, index) => {
             const Icon = getCategoryIcon(event.category);
             const isLast = index === timeline.length - 1;

             return (
               <div key={event.id} className="relative pl-10 group">
                  {/* NODE */}
                  <div className={cn(
                    "absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full border border-slate-950 z-10 transition-all duration-300",
                    event.status === "verified" ? "bg-cyan-500 shadow-[0_0_10px_#22d3ee]" : "bg-amber-500 shadow-[0_0_10px_#f59e0b]",
                    "group-hover:scale-125"
                  )} />

                  {/* DATE BOX */}
                  <div className="flex items-center gap-3 mb-2">
                     <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{event.date}</span>
                     <div className="h-px bg-white/5 flex-1" />
                     <div className={cn(
                        "text-[9px] font-mono px-2 py-0.5 rounded border uppercase",
                        event.category === "clinical" ? "text-cyan-400 border-cyan-400/20 bg-cyan-400/5" :
                        event.category === "lifestyle" ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/5" :
                        "text-slate-400 border-white/10 bg-white/5"
                     )}>
                        {event.category}
                     </div>
                  </div>

                  {/* CONTENT BOX */}
                  <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 group-hover:bg-slate-900/60 transition-all duration-300">
                     <div className="flex items-start justify-between mb-3">
                        <h4 className="text-sm font-bold text-white tracking-tight uppercase">{event.title}</h4>
                        <Icon className="w-4 h-4 text-slate-500" />
                     </div>
                     <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                        {event.description}
                     </p>
                     
                     {event.source && (
                        <div className="mt-4 flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                           <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">Verified_Source: {event.source}</span>
                        </div>
                     )}
                  </div>
               </div>
             );
           })}

            {/* UNRESOLVED GAPS RAIL */}
            <div className="relative pl-10 flex items-center border-t border-white/5 pt-12 mt-12 mb-8">
               <div className="absolute left-[-4px] top-12 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse" />
               <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-6 w-full flex items-center justify-between group-hover:border-rose-500/20 transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-rose-400" />
                     </div>
                     <div>
                        <h4 className="text-[13px] font-bold text-rose-400 uppercase tracking-widest underline decoration-rose-400/30">Verification Gap: 2021–2023 Informatics</h4>
                        <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase font-bold tracking-tight">Source: Apollo Hospitals | Mumbai Informatics Portal</p>
                     </div>
                  </div>
                  <button className="bg-rose-500/10 px-4 py-2 rounded-xl text-[10px] font-bold text-rose-400 uppercase tracking-[0.1em] border border-rose-400/20 hover:bg-rose-500/20 transition-all">
                     Follow-up Required
                  </button>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "clinical": return Heart;
    case "lifestyle": return Activity;
    case "diagnostic": return Search;
    case "event": return Calendar;
    default: return Clock;
  }
}
