"use client";

import { SourceToTargetMapping } from '../types';

interface Props {
  mappings: SourceToTargetMapping[];
}

export default function DataMappingWorkbench({ mappings }: Props) {
  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // SOURCE-TO-TARGET MAPPING (STTM) WORKBENCH
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            SOURCE-TO-TARGET DATA MAPPINGS ({mappings.length})
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          STTM WORKBOOK • BCBS 239 LINEAGE
        </span>
      </div>

      {/* STTM TABLE */}
      <div className="cros-glass-card p-6 rounded-2xl space-y-4 font-mono text-xs">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase">
                <th className="p-2.5">Mapping ID</th>
                <th className="p-2.5">Source Table.Column</th>
                <th className="p-2.5">Grain</th>
                <th className="p-2.5">Transformation Logic</th>
                <th className="p-2.5">Target Field</th>
                <th className="p-2.5">Null / Effective Rule</th>
                <th className="p-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {mappings.map((map) => (
                <tr key={map.id} className="hover:bg-white/5">
                  <td className="p-2.5 font-bold text-cyan-400">{map.id}</td>
                  <td className="p-2.5">
                    <span className="font-bold text-slate-100 block">{map.sourceTable}</span>
                    <span className="text-[10px] text-slate-400">{map.sourceColumn} ({map.dataType})</span>
                  </td>
                  <td className="p-2.5 text-slate-400">{map.grain}</td>
                  <td className="p-2.5 text-slate-300 font-mono text-[11px] max-w-xs truncate">{map.transformationLogic}</td>
                  <td className="p-2.5 text-emerald-400 font-bold">{map.targetField}</td>
                  <td className="p-2.5 text-slate-400 text-[10px]">
                    <div>Null: {map.nullRule}</div>
                    <div>Eff: {map.effectiveDateRule}</div>
                  </td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold uppercase">
                      {map.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
