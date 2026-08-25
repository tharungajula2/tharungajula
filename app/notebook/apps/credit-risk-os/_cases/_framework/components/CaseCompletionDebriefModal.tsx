"use client";

import { useEffect } from 'react';
import { Award, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { CaseDefinition } from '../types';

interface Props {
  caseDefinition: CaseDefinition;
  isOpen: boolean;
  onClose: () => void;
}

export default function CaseCompletionDebriefModal({ caseDefinition, isOpen, onClose }: Props) {
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

  const code = caseDefinition.metadata.code;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none font-sans text-slate-100"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-debrief-title"
        className="cros-glass-card border border-cyan-500/40 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden font-mono text-xs space-y-5 p-6 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-cyan-400" />
            <div>
              <span className="text-[10px] text-cyan-400 font-bold uppercase block">// CASE RELEASE DEBRIEF</span>
              <h2 id="case-debrief-title" className="text-base font-black text-slate-100 uppercase">{code} — {caseDefinition.metadata.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close debrief modal"
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SUMMARY DEBRIEF GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
            <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">// PROBLEM IDENTIFIED & ROOT CAUSES</span>
            <p className="text-slate-300 leading-relaxed">{caseDefinition.metadata.problemStatement}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
            <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase block">// CONTROLS IMPLEMENTED & IMPACT</span>
            <div className="space-y-1 text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero-Variance Multi-Stage Reconciliation Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% UAT Test Pack Execution Pass</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Steering Committee Sign-off Approvals Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* CAPABILITIES PRACTISED */}
        <div className="space-y-2 font-mono">
          <span className="text-[10px] text-cyan-400 font-bold uppercase block">// CAPABILITIES DEMONSTRATED IN SIMULATION:</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-sans text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-0.5">
              <span className="font-mono text-[9px] text-slate-500 block uppercase">DOMAIN UNDERSTANDING</span>
              <span className="font-bold text-slate-200">{caseDefinition.metadata.primaryDomains[0]}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-0.5">
              <span className="font-mono text-[9px] text-slate-500 block uppercase">REQUIREMENTS & RULES</span>
              <span className="font-bold text-slate-200">{caseDefinition.requirements.length} REQs / {caseDefinition.rules.length} Rules</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-0.5">
              <span className="font-mono text-[9px] text-slate-500 block uppercase">DATA MAPPING & STTM</span>
              <span className="font-bold text-slate-200">{caseDefinition.mappings.length} Mappings Validated</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-0.5">
              <span className="font-mono text-[9px] text-slate-500 block uppercase">INVESTIGATIONS</span>
              <span className="font-bold text-slate-200">{caseDefinition.investigationTasks.length} Tasks Executed</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-0.5">
              <span className="font-mono text-[9px] text-slate-500 block uppercase">UAT & DEFECTS</span>
              <span className="font-bold text-slate-200">{caseDefinition.defects.length} Defects Remediated</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-0.5">
              <span className="font-mono text-[9px] text-slate-500 block uppercase">GOVERNANCE GATE</span>
              <span className="font-bold text-emerald-400">100% Release Approved</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase text-xs cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            Acknowledge Case Completion Debrief
          </button>
        </div>
      </div>
    </div>
  );
}
