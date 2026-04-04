"use client";

import React from "react";
import { SimulationState } from "@/types/simulation";
import { 
  AlertCircle, 
  Calendar, 
  ArrowUpRight, 
  Clock, 
  Target,
  CheckCircle2,
  FileText,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  state: SimulationState;
}

export function CommandCenter({ state }: SectionProps) {
  const { member, clusters, plan } = state; 
  const latestAdherence = state.adherence[0];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* HEADER RAILS */}
      <div className="flex items-end justify-between border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-white tracking-tight uppercase">Command Center</h1>
          <p className="text-sm text-slate-500 font-mono tracking-tight uppercase mt-1">Operational Overview | Member {member.id}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-400/20 rounded-full">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
           <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest">Clinician Reviewed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: IDENT & SUMMARY */}
        <div className="lg:col-span-2 space-y-6">
          {/* DECISION MATRIX */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                   <Clock className="w-3.5 h-3.5 text-cyan-400/40" />
                   <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Recent Change</h4>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">{member.recentChange}</p>
             </div>
             <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                   <FileText className="w-3.5 h-3.5 text-amber-400/40" />
                   <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Pending Review</h4>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">{member.pendingReview}</p>
             </div>
             <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                   <AlertCircle className="w-3.5 h-3.5 text-rose-400/40" />
                   <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Open Question</h4>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">{member.openQuestion}</p>
             </div>
             <div className="bg-cyan-500/5 border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400/30 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.05)]">
                <div className="flex items-center gap-2 mb-3">
                   <Target className="w-3.5 h-3.5 text-cyan-400" />
                   <h4 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-black">Next Decision</h4>
                </div>
                <p className="text-xs text-white font-bold leading-relaxed">{member.nextDecision}</p>
             </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.2em] mb-4">Informatics Snapshot</h3>
              <p className="text-[17px] text-slate-200 leading-relaxed font-medium">
                {member.summary}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-10 border-t border-white/5 pt-8">
                <div>
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-bold">Case Status</p>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    <span className="text-sm font-bold text-white uppercase tracking-tight">Active Management</span>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-bold">Last Consult</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span className="text-[13px] font-mono font-bold text-white uppercase">{member.lastConsult}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-bold">Next Action</p>
                  <div className="flex items-center gap-2">
                     <Target className="w-4 h-4 text-rose-400" />
                     <span className="text-[13px] font-mono font-bold text-white uppercase">{member.nextClinicalAction}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AMBIENT GLOW */}
            <div className="absolute top-0 right-[-10%] w-[40%] h-full bg-cyan-600/5 blur-[100px] pointer-events-none group-hover:bg-cyan-600/10 transition-colors duration-500" />
          </div>

          {/* ACTIVE ISSUES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {clusters.map((cluster) => (
                <div key={cluster.id} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                   <div className="flex items-center justify-between mb-4">
                      <h4 className="text-[13px] font-bold text-white uppercase tracking-tight">{cluster.title}</h4>
                      <div className={cn(
                        "text-[9px] font-mono px-2 py-0.5 rounded-full border uppercase font-bold",
                        cluster.severity === "action" ? "text-rose-400 border-rose-400/20 bg-rose-400/5" : "text-amber-400 border-amber-400/20 bg-amber-400/5"
                      )}>
                        {cluster.severity}
                      </div>
                   </div>
                   <p className="text-xs text-slate-400 leading-relaxed mb-4">{cluster.description}</p>
                   <div className="flex flex-wrap gap-2">
                       {cluster.biomarkers.map(bId => {
                         const biomarker = state.biomarkers.find(b => b.id === bId);
                         return (
                           <span key={bId} className="text-[10px] font-mono text-white/60 border border-white/5 px-2 py-0.5 rounded-md bg-white/5 uppercase tracking-tighter">
                              {biomarker?.label}: {biomarker?.value} {biomarker?.unit}
                           </span>
                         );
                       })}
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* RIGHT COLUMN: RECAP & ACTIONS */}
        <div className="space-y-6">
           {/* RE-TEST COUNTDOWN */}
           <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden group">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4 font-bold relative z-10">Retest Schedule</p>
              <div className="text-6xl font-heading font-extrabold text-white mb-2 relative z-10">{member.retestDays}</div>
              <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-[0.2em] relative z-10 font-bold">Days to Review</p>
              <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
                 <button className="w-full py-3 bg-cyan-500/10 border border-cyan-400/20 rounded-xl text-[11px] font-black text-cyan-400 hover:bg-cyan-500/20 transition-all uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(34,211,238,0.05)]">
                    Book Lab Collection
                 </button>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/5 blur-[50px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>

           {/* DAILY STATUS */}
           <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                 <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Daily Status</h4>
                 <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="space-y-4">
                 <div className="flex items-end justify-between">
                    <div>
                       <p className="text-2xl font-bold text-white">{latestAdherence.completedTasks.length}/{latestAdherence.totalTasks}</p>
                       <p className="text-[10px] text-slate-500 font-mono uppercase">Tasks Completed Today</p>
                    </div>
                    <div className="text-right">
                       <span className="text-lg font-bold text-emerald-400">+12%</span>
                       <p className="text-[10px] text-slate-500 font-mono uppercase">vs Last Week</p>
                    </div>
                 </div>
                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 shadow-[0_0_8px_#10b981]" 
                      style={{ width: `${(latestAdherence.completedTasks.length / latestAdherence.totalTasks) * 100}%` }}
                    />
                 </div>
              </div>
           </div>

           {/* NEXT MEMBER ACTIONS */}
           <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Next Member Actions</h4>
              <div className="space-y-3">
                 {plan.slice(1, 3).map(task => (
                   <div key={task.id} className="flex items-start gap-3 group">
                      <div className="mt-0.5 w-4 h-4 rounded border border-white/20 flex items-center justify-center group-hover:border-cyan-400/40 transition-colors">
                        <CheckCircle2 className="w-3 h-3 text-transparent group-hover:text-emerald-400/20" />
                      </div>
                      <div>
                         <p className="text-xs text-white leading-tight font-medium">{task.title}</p>
                         <p className="text-[10px] text-slate-500 font-mono mt-0.5">{task.frequency}</p>
                      </div>
                   </div>
                 ))}
                 <button className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 uppercase tracking-widest mt-4 hover:translate-x-1 transition-transform">
                    View Full Plan <ArrowUpRight className="w-3 h-3" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
