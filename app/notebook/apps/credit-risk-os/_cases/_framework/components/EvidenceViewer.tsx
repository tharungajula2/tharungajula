"use client";

import { useState } from 'react';
import { CaseEvidence } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  evidencePack: CaseEvidence[];
  onMarkReviewed?: (id: string) => void;
}

export default function EvidenceViewer({ evidencePack, onMarkReviewed }: Props) {
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>(evidencePack[0]?.id || '');

  const activeEvidence = evidencePack.find((e) => e.id === selectedEvidenceId) || evidencePack[0];

  const handleSelect = (id: string) => {
    setSelectedEvidenceId(id);
    if (onMarkReviewed) onMarkReviewed(id);
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // CASE EVIDENCE PACK & ARTEFACT REPOSITORY
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            CASE ARTEFACTS & EVIDENCE ({evidencePack.length})
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          EVIDENCE PACK REPOSITORY
        </span>
      </div>

      {/* BODY: LIST + DETAIL INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        {/* LEFT LIST */}
        <div className="lg:col-span-5 space-y-2">
          {evidencePack.map((ev) => {
            const isSelected = ev.id === activeEvidence?.id;
            return (
              <button
                key={ev.id}
                onClick={() => handleSelect(ev.id)}
                className={`w-full p-4 rounded-xl text-left transition-all cursor-pointer border flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500/50 text-slate-100 shadow-md font-semibold'
                    : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-cyan-400 font-bold">{ev.code}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[9px] border border-white/10">
                    {ev.type}
                  </span>
                </div>
                <div className="font-bold text-slate-200 text-xs truncate">{ev.title}</div>
                <div className="text-[10px] text-slate-400 font-sans truncate">{ev.summary}</div>
              </button>
            );
          })}
        </div>

        {/* RIGHT DETAIL INSPECTOR */}
        {activeEvidence && (
          <div className="lg:col-span-7 cros-glass-card p-6 rounded-2xl space-y-4 font-sans text-xs">
            <div className="border-b border-white/10 pb-3 space-y-1 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold text-xs">{activeEvidence.code}</span>
                <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold text-[10px]">
                  {activeEvidence.type}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 uppercase">{activeEvidence.title}</h3>
              <span className="text-[11px] text-slate-400 block">Provided by: <strong className="text-slate-200">{activeEvidence.providedBy}</strong></span>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
                {activeEvidence.fullText}
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <span className="text-[10px] text-cyan-400 font-bold uppercase block">// KEY EVIDENCE TAKEAWAYS:</span>
                <div className="space-y-1">
                  {activeEvidence.keyInsights.map((insight, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-900 border border-white/5 flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
