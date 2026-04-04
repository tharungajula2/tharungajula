"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  History, 
  Activity, 
  ClipboardList, 
  CheckCircle2, 
  Zap, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";

const navItems = [
  { id: "command", label: "Command Center", icon: LayoutDashboard },
  { id: "timeline", label: "Timeline Intake", icon: History },
  { id: "biomarkers", label: "Biomarker Analysis", icon: Activity },
  { id: "intervention", label: "Care Mapping", icon: ClipboardList },
  { id: "execution", label: "Care Execution", icon: CheckCircle2 },
  { id: "copilot", label: "Clinical Assistant", icon: Zap },
];

export function SimulationSidebar() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "command";

  return (
    <aside className="w-[280px] h-full bg-slate-900/30 backdrop-blur-3xl border-r border-white/10 flex flex-col z-20 relative overflow-hidden">
      {/* BRANDING RAILS */}
      <div className="p-8 pb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-sm font-heading font-bold tracking-widest text-white uppercase">Informatics</h2>
            <p className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-tighter">Case Simulation v1.2</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-1">
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">Operations</p>
        
        {navItems.map((item) => {
          const isActive = currentTab === (item.id === "biomarkers" ? "biomarker" : item.id);
          const Icon = item.icon;
          const tabId = item.id === "biomarkers" ? "biomarker" : item.id;

          return (
            <Link
              key={item.id}
              href={`/simulation?tab=${tabId}`}
              className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-white/5 border border-white/10 text-white shadow-[0_0_20px_rgba(34,211,238,0.1)]" 
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-cyan-400" : "group-hover:text-cyan-300"
                )} />
                <span className="text-[11px] font-bold tracking-wider uppercase">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-cyan-400" />}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER RAILS */}
      <div className="p-6 mt-auto border-t border-white/5">
         <div className="bg-slate-900/40 rounded-xl p-5 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
               <span className="text-[9px] font-mono text-slate-500 uppercase font-black tracking-widest">Mock Case</span>
               <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <div className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span className="text-[8px] font-mono text-emerald-400 uppercase font-bold">Active</span>
               </div>
            </div>
            <div className="space-y-1.5">
               <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500 font-mono uppercase">ID:</span>
                  <span className="text-slate-300 font-mono font-bold tracking-tight">MEHTA_A101</span>
               </div>
               <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500 font-mono uppercase">Review:</span>
                  <span className="text-slate-300 font-mono font-bold tracking-tight">APR 04 2026</span>
               </div>
            </div>
         </div>
      </div>

      {/* AMBIENT GLOW */}
      <div className="absolute bottom-[-20%] left-[-20%] w-full h-[40%] bg-cyan-600/5 blur-[100px] pointer-events-none" />
    </aside>
  );
}
