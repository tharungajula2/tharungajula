"use client";

import { useState, useEffect } from 'react';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { Compass, Play, Briefcase, Activity, Layers, Database, FileText, ShieldCheck, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrientationModal({ isOpen, onClose }: Props) {
  const { navigateToCase } = useCreditRiskOS();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleStartCase01 = () => {
    navigateToCase('CASE-2026-01');
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none font-sans text-slate-100 animate-in fade-in duration-200"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="orientation-title"
        className="cros-glass-card border border-cyan-500/40 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden font-mono text-xs space-y-6 p-6 max-h-[85vh] overflow-y-auto"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block">
                WELCOME TO CREDIT RISK OS
              </span>
              <h2 id="orientation-title" className="text-xl font-black text-slate-100 uppercase font-mono">
                SIMULATED BANKING RISK & TRANSFORMATION WORKBENCH
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close orientation modal"
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ROLE & ENVIRONMENT BRIEF */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1">
            <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">// SIMULATED ENVIRONMENT</span>
            <span className="font-bold text-slate-100 block">Indus Apex Bank India</span>
            <p className="text-slate-400 text-[11px]">Private Sector Scheduled Commercial Bank (Non-D-SIB) under Reserve Bank of India (RBI) regulation.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1">
            <span className="font-mono text-[10px] text-amber-400 font-bold uppercase block">// YOUR PRACTITIONER ROLE</span>
            <span className="font-bold text-slate-100 block">Lead Business Analyst</span>
            <p className="text-slate-400 text-[11px]">Investigate evidence, specify requirements, design STTM mappings, remediate defects, and govern release readiness.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1">
            <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase block">// WORKFLOW MODEL</span>
            <span className="font-bold text-slate-100 block">Work-Based Learning</span>
            <p className="text-slate-400 text-[11px]">Understand $\rightarrow$ Observe $\rightarrow$ Investigate $\rightarrow$ Decide $\rightarrow$ Implement $\rightarrow$ Test $\rightarrow$ Defend $\rightarrow$ Reflect.</p>
          </div>
        </div>

        {/* SIX WORKSPACES QUICK MAP */}
        <div className="space-y-2 font-mono">
          <span className="text-[10px] text-cyan-400 font-bold uppercase block">// SIX CONNECTED WORKSPACES AT A GLANCE:</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-sans text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-0.5">
              <span className="font-mono text-[10px] text-cyan-400 font-bold">01 · Command Centre</span>
              <p className="text-[11px] text-slate-400">See bank status & active attention queue.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-0.5">
              <span className="font-mono text-[10px] text-cyan-400 font-bold">02 · Case Room</span>
              <p className="text-[11px] text-slate-400">Perform transformation assignments.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-0.5">
              <span className="font-mono text-[10px] text-cyan-400 font-bold">03 · Data Lab</span>
              <p className="text-[11px] text-slate-400">Inspect STTM mappings & BCBS 239 lineage.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-0.5">
              <span className="font-mono text-[10px] text-cyan-400 font-bold">04 · Delivery Studio</span>
              <p className="text-[11px] text-slate-400">Manage REQs, rules & RTM traceability.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-0.5">
              <span className="font-mono text-[10px] text-cyan-400 font-bold">05 · Test & Release</span>
              <p className="text-[11px] text-slate-400">Validate UAT, defects & sign-off gates.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-0.5">
              <span className="font-mono text-[10px] text-cyan-400 font-bold">06 · Risk Engine</span>
              <p className="text-[11px] text-slate-400">Inspect IRACP, FTP & RWA calculations.</p>
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-200 font-mono cursor-pointer"
          >
            Explore Operating Environment First
          </button>

          <button
            onClick={handleStartCase01}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>START WITH CASE-001 (ASSET QUALITY)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
