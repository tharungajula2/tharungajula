"use client";

import React, { useEffect, useState } from "react";
import { MemberProfile } from "@/types/simulation";
import { 
  User, 
  MapPin, 
  Clock, 
  Calendar,
  Activity,
  HeartPulse
} from "lucide-react";

interface SimulationHeaderProps {
  member: MemberProfile;
  lastUpdated: string;
}

export function SimulationHeader({ member, lastUpdated }: SimulationHeaderProps) {
  // Format the lastUpdated string
  const formattedDate = new Date(lastUpdated).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col w-full">
      {/* WHY THIS EXISTS STRIP */}
      <div className="h-7 w-full bg-cyan-950/20 border-b border-cyan-900/10 flex items-center justify-center px-8 shrink-0 relative overflow-hidden backdrop-blur-3xl">
        <div className="flex items-center gap-2 relative z-10">
          <Activity className="w-3 h-3 text-cyan-400/40" />
          <p className="text-[9px] font-mono text-cyan-400/40 uppercase tracking-[0.2em]">
            Case Simulation environment built to evaluate longitudinal care workflows and internal AI-assistance models.
          </p>
        </div>
      </div>
      
      <header className="h-20 w-full bg-slate-900/40 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-8 z-10 shrink-0">
      {/* MEMBER SNAPSHOT */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-cyan-600/10 border border-cyan-400/20 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <User className="w-5 h-5 text-cyan-400 shadow-[0_0:10px_rgba(34,211,238,0.5)]" />
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-white tracking-tight uppercase">{member.name}</h3>
            <p className="text-[10px] text-slate-500 font-mono tracking-tight uppercase">{member.role}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[11px] font-mono text-slate-500 border-l border-white/10 pl-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-cyan-400/40" />
            <span>Age: {member.age}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-cyan-400/40" />
            <span>{member.location}</span>
          </div>
        </div>
      </div>

      {/* SYSTEM STATUS & ADHERENCE PULSE */}
      <div className="flex items-center gap-8">
        {/* ADHERENCE PULSE */}
        <div className="hidden lg:flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Member Adherence</span>
            <span className="text-sm font-bold font-mono text-emerald-400">{member.adherencePercentage}%</span>
          </div>
          <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-emerald-500 shadow-[0_0_8px_#10b981] transition-all duration-1000" 
              style={{ width: `${member.adherencePercentage}%` }}
            />
          </div>
        </div>

        {/* STATUS RAILS */}
        <div className="flex flex-col items-end border-l border-white/10 pl-8">
           <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400/40" />
              <span className="text-[11px] font-mono tracking-wide">Last Review: {formattedDate}</span>
           </div>
           <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
              <span className="text-[9px] font-mono text-emerald-400/80 tracking-widest uppercase whitespace-nowrap">Case Review: Active</span>
           </div>
        </div>
      </div>

      {/* AMBIENT GLOW */}
      <div className="absolute top-0 right-0 w-[30%] h-full bg-cyan-600/5 blur-[80px] pointer-events-none" />
    </header>
    </div>
  );
}
