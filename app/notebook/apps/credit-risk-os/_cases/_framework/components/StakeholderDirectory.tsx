"use client";

import { CaseStakeholder } from '../types';

interface Props {
  stakeholders: CaseStakeholder[];
  institutionName: string;
}

export default function StakeholderDirectory({ stakeholders, institutionName }: Props) {
  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // PROGRAMME GOVERNANCE & STAKEHOLDER DIRECTORY
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            TRANSFORMATION PROGRAMME STAKEHOLDERS ({stakeholders.length})
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          {institutionName} • PROGRAMME STEERING BOARD
        </span>
      </div>

      {/* STAKEHOLDER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {stakeholders.map((stk) => (
          <div
            key={stk.id}
            className="cros-glass-card p-5 rounded-2xl space-y-3 border border-white/10 hover:border-cyan-500/40 transition-all"
          >
            <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-2">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase block">{stk.department}</span>
                <h3 className="text-base font-bold text-slate-100 uppercase">{stk.name}</h3>
                <div className="text-xs text-slate-300 font-sans">{stk.title}</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] border border-white/10 font-bold">
                {stk.id}
              </span>
            </div>

            <div className="space-y-2 text-slate-300 font-sans text-xs">
              <p><strong className="text-cyan-400 font-mono text-[11px] uppercase">Role:</strong> {stk.roleDescription}</p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10 font-mono text-[11px] space-y-0.5">
                <span className="text-[10px] text-amber-400 font-bold uppercase block">KEY CONCERN:</span>
                <p className="text-slate-300">{stk.keyConcern}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 space-y-1 font-mono text-[11px]">
              <span className="text-[10px] text-slate-400 uppercase block">DECISIONS OWNED:</span>
              <div className="flex flex-wrap gap-1.5">
                {stk.decisionsOwned.map((d) => (
                  <span key={d} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px]">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
