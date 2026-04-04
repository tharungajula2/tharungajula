"use client";

import React from "react";
import { SimulationState, AdherenceLog } from "@/types/simulation";
import { 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  Calendar, 
  MessageSquare, 
  ArrowUpRight, 
  Clock,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  state: SimulationState;
}

export function CareExecution({ state }: SectionProps) {
  const { adherence, plan, member } = state;
  const today = adherence[0];

  return (
    <div className="space-y-8 max-w-5xl">
       {/* HEADER RAILS */}
       <div className="flex items-end justify-between border-b border-white/5 pb-4">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-white tracking-tight uppercase">Daily Adherence</h2>
          <p className="text-sm text-slate-500 font-mono tracking-tight uppercase mt-1">Operational Workflow Tracking | Member {member.id}</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Archive: Active Session</span>
           </div>
           <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-400/20 rounded-full">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-black tracking-widest">Compliance: 82%</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: DAILY PROTOCOL PULSE */}
        <div className="lg:col-span-8 space-y-10">
           
           {/* TODAY'S TASK STACK */}
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">Adherence Snapshot: Today</h3>
                 <span className="text-[10px] font-mono text-slate-500 uppercase">{today.date}</span>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                 {plan.map((task) => {
                   const isCompleted = today.completedTasks.includes(task.id);
                   return (
                     <div key={task.id} className={cn(
                        "group bg-slate-900/50 backdrop-blur-2xl border transition-all duration-300 rounded-2xl p-6 flex items-center justify-between",
                        isCompleted ? "border-emerald-500/10" : "border-white/10 hover:border-white/20"
                     )}>
                        <div className="flex items-center gap-6">
                           <div className={cn(
                             "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500",
                             isCompleted ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/10 text-slate-600 group-hover:border-cyan-400/30 group-hover:text-cyan-400"
                           )}>
                              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                           </div>
                           <div>
                              <h4 className={cn(
                                "text-sm font-bold uppercase tracking-tight",
                                isCompleted ? "text-slate-300 line-through decoration-slate-600" : "text-white"
                              )}>{task.title}</h4>
                              <p className="text-[10px] font-mono text-slate-500 uppercase mt-1 tracking-tighter text-[9px]">Cycle: {task.frequency}</p>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-8">
                           <div className="hidden md:flex flex-col items-end">
                              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Focus Area</span>
                              <span className="text-[10px] font-mono text-slate-400 uppercase">{task.category}</span>
                           </div>
                           <button className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all text-slate-500 hover:text-white">
                              <ChevronRight className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                   );
                 })}
              </div>
           </div>

            {/* BLOCKER LOG & NOTES */}
            <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-8 relative overflow-hidden">
               <div className="flex items-center gap-3 mb-6 relative z-10">
                  <AlertCircle className="w-5 h-5 text-rose-400" />
                  <h4 className="text-[13px] font-bold text-rose-400 uppercase tracking-widest underline decoration-rose-400/20">Operational Blockers</h4>
               </div>
               <div className="space-y-6 relative z-10">
                  <div className="flex items-start gap-4">
                     <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0 shadow-[0_0_8px_#f43f5e]" />
                     <div>
                        <p className="text-sm text-slate-300 leading-relaxed font-medium italic">"Late NSE/BSE market volatility in Mumbai resulted in skipped Zone 2 session."</p>
                        <p className="text-[10px] font-mono text-slate-500 uppercase mt-1 tracking-tighter">Verified Conflict: 2026-04-03</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="w-1.5 h-20 bg-rose-500/20 rounded-full shrink-0 relative">
                        <div className="absolute top-0 w-full h-1/2 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]" />
                     </div>
                     <div className="flex-1 bg-white/5 p-4 rounded-xl border border-white/5">
                        <p className="text-xs text-slate-400 italic leading-relaxed">"Member reporting high fatigue during high professional variance weeks. Recommend adjusting the bedtime wind-down window to prioritize Deep Sleep restoration."</p>
                        <div className="mt-2 text-[9px] font-mono text-rose-400 uppercase font-black uppercase tracking-widest">Clinical recommendation: Pending Review</div>
                     </div>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-[40%] h-full bg-rose-500/5 blur-[100px] pointer-events-none" />
            </div>
        </div>

        {/* RIGHT COLUMN: LONGITUDINAL MONITORING */}
        <div className="lg:col-span-4 space-y-6">
           {/* ADHERENCE GRID VIEW */}
           <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6">
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">Historical Compliance</h4>
              <div className="grid grid-cols-7 gap-1.5">
                 {Array.from({ length: 28 }).map((_, i) => {
                   const opacity = Math.random() > 0.3 ? "bg-emerald-500/40 shadow-[0_0_8px_#10b981]" : "bg-emerald-900/20";
                   return (
                     <div key={i} className={cn("aspect-square rounded-sm border border-white/5", opacity)} />
                   );
                 })}
              </div>
              <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-slate-600 uppercase">
                 <span>Mar 07</span>
                 <span>Today</span>
              </div>
           </div>

           {/* RECENT CHECK-INS */}
           <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 space-y-5">
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Recent Interactions</h4>
              {[
                { date: "2026-03-28", type: "Full Consult", status: "completed" },
                { date: "2026-03-22", type: "Lab Follow-up", status: "completed" },
                { date: "2026-03-15", type: "Wearable Sync", status: "verified" },
              ].map((log, index) => (
                <div key={index} className="flex items-center justify-between group cursor-pointer">
                   <div className="flex items-center gap-3">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                      <div>
                         <p className="text-xs text-white uppercase tracking-tight font-medium group-hover:text-cyan-100 transition-colors">{log.type}</p>
                         <p className="text-[9px] font-mono text-slate-500 uppercase">{log.date}</p>
                      </div>
                   </div>
                   <div className="text-[8px] font-mono text-emerald-400 border border-emerald-400/20 px-1.5 py-0.5 rounded uppercase">
                      {log.status}
                   </div>
                </div>
              ))}
           </div>

           {/* UPCOMING EVENTS */}
           <div className="bg-cyan-500/5 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                 <Calendar className="w-5 h-5 text-cyan-400" />
                 <h4 className="text-sm font-bold text-white uppercase tracking-tight underline decoration-cyan-400/30">Upcoming Milestones</h4>
              </div>
              <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center font-mono">
                       <span className="text-[9px] text-slate-500 uppercase">Apr</span>
                       <span className="text-sm font-bold text-white leading-tight">18</span>
                    </div>
                    <div>
                       <p className="text-xs font-bold text-slate-200 uppercase tracking-tight">Q2 Precision Labs</p>
                       <p className="text-[10px] text-slate-600 font-mono mt-1 uppercase">Metric: Glycemic Drift Audit</p>
                    </div>
                 </div>
                 <button className="w-full py-2 bg-cyan-500/10 border border-cyan-400/20 rounded-xl text-[10px] font-bold text-cyan-400 uppercase tracking-widest hover:bg-cyan-500/20 transition-all flex items-center justify-center gap-2">
                    Open Planner <ArrowUpRight className="w-3 h-3" />
                 </button>
              </div>
              
              {/* DECORATIVE ELEMENT */}
              <div className="absolute top-2 right-2 flex gap-1">
                 <ShieldCheck className="w-3 h-3 text-cyan-400/20" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
