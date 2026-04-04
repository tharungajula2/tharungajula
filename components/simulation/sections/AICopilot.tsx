"use client";

import React from "react";
import { SimulationState, AIInsightCard } from "@/types/simulation";
import { 
  Zap, 
  Terminal, 
  Brain, 
  ShieldCheck, 
  AlertCircle, 
  Code, 
  History, 
  Sparkles,
  ChevronRight,
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  state: SimulationState;
}

export function AICopilot({ state }: SectionProps) {
  const { insights, member } = state;

  return (
    <div className="space-y-8 max-w-6xl">
       {/* HEADER RAILS */}
       <div className="flex items-end justify-between border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-white tracking-tight uppercase">Clinical Assistant</h1>
          <p className="text-sm text-slate-500 font-mono tracking-tight uppercase mt-1">Case Synthesis & Evidence Mapping | Member {member.id}</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-black tracking-widest italic tracking-tighter">Analytical Framework: v4.2</span>
           </div>
           <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-400/20 rounded-full">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest">Review Ready</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: ACTIVE SYNTHESIS CARDS */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* THE INTELLIGENCE TERMINAL */}
           <div className="bg-slate-900 border border-white/10 rounded-2xl p-0 overflow-hidden shadow-2xl relative group">
              <div className="bg-slate-800/50 px-6 py-3 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Database className="w-3.5 h-3.5 text-slate-500" />
                     <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Synthesis Output</span>
                  </div>
                  <div className="flex gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-slate-700" />
                     <div className="w-2 h-2 rounded-full bg-slate-700" />
                     <div className="w-2 h-2 rounded-full bg-slate-700" />
                  </div>
               </div>
               
               <div className="p-8 space-y-12 relative z-10">
                  {insights.map((insight) => (
                     <div key={insight.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              {React.createElement(getInsightIcon(insight.type), { className: "w-4 h-4 text-emerald-400" })}
                              <h4 className="text-[13px] font-bold text-white uppercase tracking-tight">{insight.title}</h4>
                           </div>
                           <div className="flex items-center gap-4 font-mono text-[9px] uppercase">
                              <div className="flex items-center gap-1.5">
                                 <span className="text-slate-600 font-bold">Confidence:</span>
                                 <span className="text-emerald-400 font-black">{(insight.confidence * 100).toFixed(0)}%</span>
                              </div>
                              <div className={cn(
                                 "px-2 py-0.5 rounded border font-bold",
                                 insight.impact === "high" ? "text-rose-400 border-rose-400/20 bg-rose-400/5" : "text-amber-400 border-amber-400/20 bg-amber-400/5"
                              )}>
                                 {insight.impact} impact
                              </div>
                           </div>
                        </div>
                        
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 relative overflow-hidden group/card hover:bg-white/[0.07] transition-all">
                           <p className="text-sm text-slate-300 leading-relaxed max-w-3xl relative z-10 mb-4 italic">
                              "{insight.content}"
                           </p>
                           
                           {insight.inputs && (
                             <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                               <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">Grounding: {insight.inputs.join(", ")}</span>
                             </div>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
               
               {/* DECORATIVE BACKGROUND */}
               <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/5 blur-[120px] pointer-events-none group-hover:bg-emerald-600/10 transition-all duration-700" />
            </div>
 
            {/* AI CAPABILITIES OVERVIEW (Internal Marketing) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { title: "Grounded Synthesis", desc: "Cross-referencing recommendations against verified clinical informatics.", status: "Verified" },
                 { title: "Variance Modeling", desc: "Projecting adherence drift based on verified professional schedule volatility.", status: "Active" },
               ].map((cap, i) => (
                 <div key={i} className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 group hover:border-white/10 transition-all">
                    <div className="flex items-center justify-between mb-4">
                       <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold tracking-tight">{cap.title}</h4>
                       <ShieldCheck className="w-4 h-4 text-emerald-400/40 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{cap.desc}</p>
                    <span className="text-[9px] font-mono text-emerald-400 uppercase bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 font-bold uppercase tracking-widest">Status: {cap.status}</span>
                 </div>
               ))}
            </div>
         </div>
 
         {/* RIGHT COLUMN: MODEL LOGS & UNCERTAINTY LAYER */}
         <div className="lg:col-span-4 space-y-6">
            {/* UNCERTAINTY / CAUTION PANEL (Important Clinician Trust Layer) */}
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-8 relative overflow-hidden group">
               <div className="flex items-center gap-3 mb-6 relative z-10">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  <h4 className="text-sm font-bold text-amber-500 uppercase tracking-tight underline decoration-amber-500/20 tracking-widest">Confidence Variance</h4>
               </div>
               <div className="space-y-6 relative z-10">
                  <p className="text-[13px] text-slate-300 leading-relaxed italic border-l border-amber-500/20 pl-4">
                     "Lack of detailed sleep informatics from early 2024 results in moderated confidence for the inflammation baseline. Cardiovascular projections remain high-integrity."
                  </p>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                     <h5 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3 font-bold">Variance Flags</h5>
                     <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                           <span className="text-slate-500 uppercase tracking-tighter">Informatics_Gaps</span>
                           <span className="text-amber-500 font-mono font-bold">MODERATE</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                           <span className="text-slate-500 uppercase tracking-tighter">Model_Variance</span>
                           <span className="text-emerald-400 font-mono font-bold">LOW</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
 
            {/* LIVE LOGS ANALYTICS */}
            <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 relative group h-[400px] overflow-hidden">
               <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 font-bold tracking-[0.15em]">
                  <Terminal className="w-3.5 h-3.5" />
                  Evidence Chain
               </h4>
               <div className="space-y-4 font-mono text-[9px] text-slate-800 leading-tight">
                  {[
                    { t: "13:52:19", msg: "FETCHING_MEMBER_CONTEXT_ID_M101" },
                    { t: "13:52:20", msg: "MAPPING_CLINICAL_GROUNDING_LATEST" },
                    { t: "13:52:20", msg: "INIT_LONGITUDINAL_SYNTHESIS" },
                    { t: "13:52:21", msg: "PARSING_GLYCEMIC_MARKERS_V3" },
                    { t: "13:52:21", msg: "CORRELATING_VOLATILITY_WITH_CRP" },
                    { t: "13:52:22", msg: "RECONCILING_TIMELINE_GAPS" },
                    { t: "13:52:22", msg: "CALCULATING_CONFIDENCE_WEIGHTS" },
                    { t: "13:52:23", msg: "SYNTHESIS_COMPLETE_ID_8829" },
                    { t: "13:52:45", msg: "MONITORING_REALTIME_DRIFT" },
                    { t: "13:53:10", msg: "BUFFER_CLEANUP_SUCCESS" },
                    { t: "13:53:11", msg: "AWAITING_REVIEW_TRIGGER" },
                  ].map((log, i) => (
                     <div key={i} className="flex gap-3 group/log text-slate-600">
                        <span className="group-hover/log:text-emerald-400/50 transition-colors">[{log.t}]</span>
                        <span className="group-hover/log:text-slate-400 transition-colors uppercase tracking-tight">{log.msg}</span>
                     </div>
                  ))}
                  {/* CURSOR */}
                  <div className="flex items-center gap-1.5 text-emerald-400/30">
                     <span className="w-1.5 h-3 bg-emerald-400/30 animate-pulse" />
                     <span className="animate-pulse">_</span>
                  </div>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
            </div>
        </div>
      </div>
    </div>
  );
}

function getInsightIcon(type: string) {
  switch (type) {
    case "synthesis": return Brain;
    case "brief": return History;
    case "risk": return AlertCircle;
    case "rationale": return Sparkles;
    default: return Zap;
  }
}
