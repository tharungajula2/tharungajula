"use client";

import { ProcessNode } from '../types';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  title: string;
  subtitle: string;
  mode: 'CurrentState' | 'TargetState';
  nodes: ProcessNode[];
}

export default function ProcessFlowViewer({ title, subtitle, mode, nodes }: Props) {
  const isTarget = mode === 'TargetState';

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // {isTarget ? 'TARGET OPERATING MODEL & GOVERNANCE CONTROL POINTS' : 'AS-IS PROCESS MODEL & CONTROL BREAK ANALYSIS'}
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            {title}
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          {subtitle}
        </span>
      </div>

      {/* PROCESS NODES FLOW */}
      <div className="space-y-4 font-mono text-xs">
        {nodes.map((node) => (
          <div
            key={node.step}
            className={`cros-glass-card p-5 rounded-2xl border space-y-3 relative overflow-hidden ${
              isTarget ? 'border-cyan-500/30' : 'border-white/10'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold text-[10px]">
                  STEP {node.step}
                </span>
                <h3 className="text-base font-bold text-slate-100 uppercase">{node.title}</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-sans">Owner: <strong className="text-slate-200">{node.owner}</strong></span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">{node.desc}</p>

            {node.breakPoint && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold uppercase text-[10px] text-rose-400 block">// IDENTIFIED CONTROL BREAK:</span>
                  <p className="text-[11px] font-sans leading-tight">{node.breakPoint}</p>
                </div>
              </div>
            )}

            {node.controlPoint && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold uppercase text-[10px] text-emerald-400 block">// AUTOMATED CONTROL GATE:</span>
                  <p className="text-[11px] font-sans leading-tight">{node.controlPoint}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
