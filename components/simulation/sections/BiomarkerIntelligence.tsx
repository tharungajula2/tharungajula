"use client";

import React from "react";
import { SimulationState, BiomarkerResult, Severity, Trend } from "@/types/simulation";
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Info, 
  AlertCircle, 
  Zap,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  state: SimulationState;
}

export function BiomarkerIntelligence({ state }: SectionProps) {
  const { biomarkers, clusters, member, insights } = state;
  
  // Get AI insight relevant to biomarkers
  const bioInsight = insights.find(i => i.type === "synthesis");

  return (
    <div className="space-y-8 max-w-6xl">
       {/* HEADER RAILS */}
       <div className="flex items-end justify-between border-b border-white/5 pb-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-white tracking-tight uppercase">Biomarker Analysis</h2>
          <p className="text-sm text-slate-500 font-mono tracking-tight uppercase mt-1">Biological Informatics | Member {member.id}</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest text-[9px]">Source: Unified Lab Review</span>
           </div>
           <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-400/20 rounded-full">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Review Status: Current</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* MAIN COLUMN: CLUSTERS & BIOMARKERS */}
        <div className="lg:col-span-8 space-y-12">
           
           {/* PROBLEM CLUSTERS */}
           <div className="space-y-6">
              <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-4">Priority Decisions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {clusters.map((cluster) => (
                    <div key={cluster.id} className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 group hover:bg-slate-900/60 transition-all duration-300 relative overflow-hidden">
                       <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                             <h4 className="text-sm font-bold text-white uppercase tracking-tight">{cluster.title}</h4>
                             {getSeverityBadge(cluster.severity)}
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed mb-6">
                             {cluster.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                             {cluster.biomarkers.map(bId => {
                               const b = biomarkers.find(x => x.id === bId);
                               return (
                                 <div key={bId} className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-lg px-3 py-1.5 group-hover:bg-cyan-500/5 group-hover:border-cyan-500/20 transition-all">
                                    <span className="text-[10px] font-bold text-white tracking-tight">{b?.label}</span>
                                    <span className="text-[10px] font-mono text-slate-500">{b?.value}</span>
                                 </div>
                               );
                             })}
                          </div>
                       </div>
                       {/* AMBIENT GLOW */}
                       <div className={cn(
                          "absolute top-0 right-0 w-[40%] h-full blur-[60px] pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-40",
                          cluster.severity === "action" ? "bg-rose-500" : "bg-amber-500"
                       )} />
                    </div>
                 ))}
              </div>
           </div>
 
           {/* ALL BIOMARKERS (Interpretation Cards) */}
           <div className="space-y-6">
              <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-4">Biomarker Synthesis</h3>
              <div className="grid grid-cols-1 gap-4">
                 {biomarkers.map((b) => (
                    <div key={b.id} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 group hover:border-white/20 hover:bg-slate-900/50 transition-all duration-300">
                       {/* PRIMARY MARKER */}
                       <div className="w-full md:w-[240px] flex items-center justify-between md:border-r md:border-white/10 md:pr-8">
                          <div>
                             <h4 className="text-lg font-bold text-white tracking-tight">{b.label}</h4>
                             <p className="text-[10px] font-mono text-slate-500 uppercase">{b.category} Matrix</p>
                          </div>
                          <div className="text-right">
                             <p className="text-xl font-bold font-mono text-white tracking-tighter">{b.value} <span className="text-[10px] text-slate-500">{b.unit}</span></p>
                             <div className="flex items-center justify-end gap-1.5 mt-1 font-mono uppercase text-[9px]">
                                {getTrendIcon(b.trend)}
                                <span className={cn(
                                   b.trend === "improving" ? "text-emerald-400" : b.trend === "declining" ? "text-rose-400" : "text-amber-400"
                                )}>{b.trend}</span>
                             </div>
                          </div>
                       </div>

                       {/* INTERPRETATION & ACTION */}
                       <div className="flex-1 flex flex-col md:flex-row items-center gap-8 w-full">
                          <div className="flex-1">
                             <div className="flex items-center gap-2 mb-1.5">
                                <Info className="w-3.5 h-3.5 text-cyan-400/60" />
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Clinical Interpretation</span>
                             </div>
                             <p className="text-[13px] text-slate-400 leading-relaxed italic group-hover:text-slate-200 transition-colors">
                                "{b.interpretation}"
                             </p>
                          </div>

                          {/* SEVERITY METER */}
                          <div className="w-full md:w-[140px] flex flex-col items-end gap-2 shrink-0">
                             <div className="flex items-center gap-2">
                                <span className="text-[9px] font-mono text-slate-500 uppercase">Target Range</span>
                                <span className="text-[10px] font-mono text-white">{b.range}</span>
                             </div>
                             {getSeverityBadge(b.severity, true)}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: AI SIDEBAR & FILTERS */}
        <div className="lg:col-span-4 space-y-6">
            {/* AI INSIGHT PANEL */}
            <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-cyan-400/20 transition-all">
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-cyan-400" />
                     </div>
                     <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Clinical Insight</h3>
                        <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">Grounding: Integrated Data Pipeline</p>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Interpreted Synthesis</h4>
                        <p className="text-[13px] text-slate-400 leading-relaxed border-l border-white/10 pl-4 py-1 italic">
                           {bioInsight?.content}
                        </p>
                     </div>
 
                     <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-3">
                        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Active Probabilities</h4>
                        <div className="space-y-2">
                           <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-500 uppercase font-mono">Sleep & hS-CRP Correlation</span>
                              <span className="text-emerald-400 font-mono font-bold">0.88 Confidence</span>
                           </div>
                           <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-500 uppercase font-mono">ApoB Velocity Projection</span>
                              <span className="text-rose-400 font-mono font-bold">+12% / Year</span>
                           </div>
                        </div>
                     </div>
 
                     <button className="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                        Explore Methodology <ArrowRight className="w-3 h-3 text-cyan-400" />
                     </button>
                  </div>
               </div>
               
               {/* DECORATIVE RAIL */}
               <div className="absolute top-4 right-4 text-[8px] font-mono text-slate-600 uppercase rotate-90 origin-right tracking-widest">
                  HUMAN REVIEW REQUIRED
               </div>
            </div>

           {/* FILTER BOX */}
           <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6">
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">View Management</h4>
              <div className="space-y-2">
                 {["Metabolic", "Cardiovascular", "Hormonal", "Longevity"].map(cat => (
                   <div key={cat} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                      <span className="text-xs text-slate-400 group-hover:text-white transition-colors uppercase tracking-tight">{cat}</span>
                      <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function getSeverityBadge(severity: Severity, fullSize = false) {
  const styles = {
    optimal: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
    monitor: "text-amber-400 border-amber-400/20 bg-amber-400/5",
    action: "text-rose-400 border-rose-400/20 bg-rose-400/5",
    critical: "text-rose-600 border-rose-600/30 bg-rose-600/10 ring-1 ring-rose-600/20"
  };

  return (
    <div className={cn(
       "font-mono uppercase px-3 py-1 rounded-full border text-center transition-all",
       fullSize ? "text-[11px] font-bold w-full" : "text-[9px] font-medium",
       styles[severity]
    )}>
       {severity}
    </div>
  );
}

function getTrendIcon(trend: Trend) {
  switch (trend) {
    case "improving": return <TrendingUp className="w-3 h-3 text-emerald-400" />;
    case "declining": return <TrendingDown className="w-3 h-3 text-rose-400" />;
    default: return <Minus className="w-3 h-3 text-amber-400" />;
  }
}
