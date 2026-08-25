"use client";

import { useState } from 'react';
import { REGULATORY_CHANGE_REGISTER, RegulatoryChangeItem } from '../case03Data';
import { FileText, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export default function RegulatoryChangeRegister() {
  const [selectedChangeId, setSelectedChangeId] = useState<string>(REGULATORY_CHANGE_REGISTER[0].id);

  const activeItem = REGULATORY_CHANGE_REGISTER.find((item) => item.id === selectedChangeId) || REGULATORY_CHANGE_REGISTER[0];

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // REGULATORY CHANGE IMPACT REGISTER & BASEL READINESS
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            CURRENT RBI FRAMEWORK VS FUTURE PROPOSED BASEL READINESS ({REGULATORY_CHANGE_REGISTER.length} ITEMS)
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          PRUDENTIAL REGULATORY CHANGE MANAGEMENT
        </span>
      </div>

      {/* CLASSIFICATION SUMMARY BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 space-y-1">
          <span className="text-[10px] text-cyan-400 font-bold uppercase block">// CURRENT_RBI_FRAMEWORK</span>
          <p className="text-[11px] text-slate-300 font-sans">Active RBI Master Circulars currently enforced in production (CET1 5.5%, CCB 2.5%, CRAR 9.0%).</p>
        </div>
        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-1">
          <span className="text-[10px] text-purple-400 font-bold uppercase block">// FUTURE_PROPOSED_REGULATORY_CHANGE</span>
          <p className="text-[11px] text-slate-300 font-sans">Basel Finalisation Readiness Programme: Proposed pro-forma readiness assessments without hardcoding draft dates.</p>
        </div>
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
          <span className="text-[10px] text-amber-400 font-bold uppercase block">// BANK_POLICY_SIMULATION</span>
          <p className="text-[11px] text-slate-300 font-sans">Internal Bank Financial Control standards for multi-stage reconciliation and run version locking.</p>
        </div>
      </div>

      {/* BODY: CHANGE LIST + INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        {/* LEFT LIST */}
        <div className="lg:col-span-5 space-y-2">
          {REGULATORY_CHANGE_REGISTER.map((item) => {
            const isSelected = item.id === activeItem?.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedChangeId(item.id)}
                className={`w-full p-4 rounded-xl text-left transition-all cursor-pointer border flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500/50 text-slate-100 shadow-md font-semibold'
                    : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-cyan-400 font-bold">{item.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      item.classification === 'CURRENT_RBI_FRAMEWORK'
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : item.classification === 'FUTURE_PROPOSED_REGULATORY_CHANGE'
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {item.classification}
                  </span>
                </div>
                <div className="font-bold text-slate-200 text-xs truncate">{item.topic}</div>
                <div className="text-[10px] text-slate-400 font-sans truncate">{item.currentStateText}</div>
              </button>
            );
          })}
        </div>

        {/* RIGHT DETAIL INSPECTOR */}
        {activeItem && (
          <div className="lg:col-span-7 cros-glass-card p-6 rounded-2xl space-y-4 font-sans text-xs">
            <div className="border-b border-white/10 pb-3 space-y-1 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold text-xs">{activeItem.id}</span>
                <span
                  className={`px-2.5 py-1 rounded border font-bold text-[10px] uppercase ${
                    activeItem.classification === 'CURRENT_RBI_FRAMEWORK'
                      ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                      : activeItem.classification === 'FUTURE_PROPOSED_REGULATORY_CHANGE'
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}
                >
                  {activeItem.classification}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 uppercase">{activeItem.topic}</h3>
              <span className="text-[11px] text-slate-400 block font-mono">Source: <strong className="text-slate-200">{activeItem.sourceMetadata}</strong></span>
            </div>

            {/* CURRENT VS TARGET COMPARISON */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">// CURRENT PRODUCTION STATE:</span>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">{activeItem.currentStateText}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
                <span className="text-[10px] text-cyan-400 font-bold uppercase block">// TARGET / READINESS STATE:</span>
                <p className="text-cyan-200 font-sans text-xs leading-relaxed">{activeItem.targetStateText}</p>
              </div>
            </div>

            {/* IMPACT FIELDS MATRIX */}
            <div className="space-y-2 font-mono text-xs">
              <span className="text-[10px] text-cyan-400 font-bold uppercase block">// IMPACT ANALYSIS MATRIX:</span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded bg-slate-900 border border-white/5 space-y-0.5">
                  <span className="text-slate-500 uppercase block text-[9px]">BUSINESS IMPACT:</span>
                  <p className="text-slate-300 font-sans">{activeItem.businessImpact}</p>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-white/5 space-y-0.5">
                  <span className="text-slate-500 uppercase block text-[9px]">DATA IMPACT:</span>
                  <p className="text-slate-300 font-sans">{activeItem.dataImpact}</p>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-white/5 space-y-0.5">
                  <span className="text-slate-500 uppercase block text-[9px]">SYSTEM IMPACT:</span>
                  <p className="text-slate-300 font-sans">{activeItem.systemImpact}</p>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-white/5 space-y-0.5">
                  <span className="text-slate-500 uppercase block text-[9px]">REPORTING IMPACT:</span>
                  <p className="text-slate-300 font-sans">{activeItem.reportingImpact}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Owner: <strong className="text-slate-200">{activeItem.owner}</strong></span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                {activeItem.decisionStatus}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
