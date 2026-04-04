"use client";

import React from "react";
import { SimulationState, InterventionTask } from "@/types/simulation";
import { 
  ClipboardList, 
  Target, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  FlaskConical, 
  Flame, 
  Moon,
  ChevronDown,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  state: SimulationState;
}

export function InterventionPlan({ state }: SectionProps) {
  const { plan, member, clusters } = state;

  return (
    <div className="space-y-8 max-w-6xl">
       {/* HEADER RAILS */}
       <div className="flex items-end justify-between border-b border-white/5 pb-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-white tracking-tight uppercase">Care Mapping</h2>
          <p className="text-sm text-slate-500 font-mono tracking-tight uppercase mt-1">Strategic Workflow | Member {member.id}</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-black tracking-widest text-[9px]">Source: Verified Guidelines</span>
           </div>
           <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-400/20 rounded-full">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest">Plan: Current</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* MAIN COLUMN: THE PROTOCOL STACK */}
        <div className="lg:col-span-8 space-y-10">
           
           {/* PROBLEM -> PLAN MAPPING (Logic visualization) */}
           <div className="space-y-6">
              <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-4">Clinical Rationale Synthesis</h3>
              {clusters.map((cluster) => (
                 <div key={cluster.id} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8 relative group overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
                       {/* LEFT: THE PROBLEM */}
                       <div className="w-full md:w-1/3">
                          <div className="flex items-center gap-2 mb-2">
                             <Target className={cn(
                                "w-4 h-4",
                                cluster.severity === "action" ? "text-rose-400" : "text-amber-400"
                             )} />
                             <h4 className="text-sm font-bold text-white uppercase tracking-tight">{cluster.title}</h4>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-mono uppercase">
                             Priority Severity: {cluster.severity}
                          </p>
                       </div>

                       {/* CENTER: THE CONNECTION */}
                       <div className="hidden md:flex items-center justify-center">
                          <ArrowRight className="w-6 h-6 text-slate-700 animate-pulse" />
                       </div>

                       {/* RIGHT: THE INTERVENTION */}
                       <div className="flex-1 space-y-4">
                          {plan.filter(p => {
                            if (cluster.id === "C1") return p.id === "P1" || p.id === "P3";
                            if (cluster.id === "C2") return p.id === "P2" || p.id === "P4";
                            return false;
                          }).map(task => (
                             <div key={task.id} className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between group-hover:bg-cyan-500/5 transition-all">
                                <div>
                                   <p className="text-xs font-bold text-white uppercase tracking-tight">{task.title}</p>
                                   <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase">{task.category} Intervention</p>
                                </div>
                                <div className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest">Evidence Grounding</div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              ))}
           </div>

           {/* MASTER PLAN LIST */}
           <div className="space-y-6">
              <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-4 font-bold text-center">Informatics-Driven Intervention Stack</h3>
              <div className="space-y-4">
                 {plan.map((task) => (
                    <div key={task.id} className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 group hover:border-white/20 transition-all duration-500 overflow-hidden relative">
                       <div className="flex items-start justify-between relative z-10">
                          <div className="flex items-start gap-6 flex-1">
                             <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border",
                                task.category === "clinical" ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" :
                                task.category === "movement" ? "bg-rose-500/10 border-rose-500/20 text-rose-400" :
                                task.category === "supplementation" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                                "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                             )}>
                                {React.createElement(getCategoryIcon(task.category), { className: "w-6 h-6" })}
                             </div>
                             
                             <div className="space-y-1">
                                <h4 className="text-lg font-bold text-white tracking-tight uppercase">{task.title}</h4>
                                <div className="flex items-center gap-4">
                                   <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-bold">{task.frequency}</span>
                                   <span className={cn(
                                      "text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold",
                                      task.priority === "high" ? "text-rose-400 border-rose-400/20" : "text-amber-400 border-amber-400/20"
                                   )}>Priority: {task.priority}</span>
                                </div>
                             </div>
                          </div>
                          
                          <ChevronDown className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
                       </div>

                       {/* EXPANDED CONTENT (Rationale) */}
                       <div className="mt-6 pt-6 border-t border-white/5 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div>
                                <div className="flex items-center gap-2 mb-3">
                                   <Zap className="w-3.5 h-3.5 text-cyan-400/60" />
                                   <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Diagnostic Rationale</span>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-white/5 pl-4">
                                   "{task.rationale}"
                                </p>
                             </div>
                             <div className="space-y-4">
                                <div>
                                   <div className="flex items-center gap-2 mb-2">
                                      <Activity className="w-3.5 h-3.5 text-emerald-400/60" />
                                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Metric Tracking</span>
                                   </div>
                                   <p className="text-[11px] font-mono text-white uppercase tracking-tight font-bold pl-5">
                                      Target: {task.metric}
                                   </p>
                                </div>
                                <div className="flex items-center gap-6 text-[10px] uppercase font-mono tracking-widest">
                                   <div className="flex items-center gap-2 text-cyan-400/60">
                                      <ShieldCheck className="w-3.5 h-3.5" />
                                      <span>Grounding: Clinical Guidelines</span>
                                   </div>
                                   <div className="flex items-center gap-2 text-slate-400">
                                      <Clock className="w-3.5 h-3.5" />
                                      <span>Next Review: {task.reviewDate}</span>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                       
                       {/* AMBIENT BACKGROUND GLOW */}
                       <div className={cn(
                          "absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none",
                          task.category === "clinical" ? "bg-cyan-500" : "bg-emerald-500"
                       )} />
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: PROTOCOL HEALTH & NEXT STEPS */}
        <div className="lg:col-span-4 space-y-6">
           {/* PROTOCOL SCOREBOARD */}
           <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">Care Strategy Performance</h4>
              
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-xs font-mono uppercase text-slate-400 mb-2">
                       <span>Logical Consistency</span>
                       <span className="text-white">96%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-cyan-400 w-[96%]" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-xs font-mono uppercase text-slate-400 mb-2">
                       <span>Evidence Saturation</span>
                       <span className="text-white">82%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-cyan-400 w-[82%]" />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-xs font-mono uppercase text-slate-400 mb-2">
                       <span>Member Feasibility</span>
                       <span className="text-white">74%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-amber-400 w-[74%]" />
                    </div>
                 </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/5 text-[10px] text-slate-600 font-mono uppercase leading-tight italic">
                 "Intervention plan is optimized to balance vascular protection with professional schedule feasibility."
              </div>
           </div>

           {/* NEXT REVIEW BOX */}
           <div className="bg-cyan-500/5 border border-cyan-400/20 rounded-2xl p-8 group">
              <div className="flex items-center gap-3 mb-4">
                 <Clock className="w-5 h-5 text-cyan-400" />
                 <h4 className="text-sm font-bold text-white uppercase tracking-tight">Review Protocol</h4>
              </div>
              <p className="text-[13px] text-slate-400 leading-relaxed mb-6">
                 The current plan scales in 14 days following the ApoB check. Prepare for potential dosage modulation based on HS-CRP trend.
              </p>
              <button className="w-full py-2.5 rounded-xl border border-white/10 text-[11px] font-bold text-white uppercase tracking-widest hover:bg-white/5 transition-all">
                 Refine Strategy
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "clinical": return FlaskConical;
    case "movement": return Flame;
    case "supplementation": return ShieldCheck;
    case "lifestyle": return Moon;
    default: return ClipboardList;
  }
}
