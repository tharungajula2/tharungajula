"use client";

import { useState } from 'react';
import { InvestigationTask } from '../types';
import { Terminal } from 'lucide-react';

interface Props {
  tasks: InvestigationTask[];
  onMarkCompleted?: (id: string) => void;
}

export default function DataInvestigationBench({ tasks, onMarkCompleted }: Props) {
  const [selectedInvId, setSelectedInvId] = useState<string>(tasks[0]?.id || '');

  const activeTask = tasks.find((t) => t.id === selectedInvId) || tasks[0];

  const handleSelect = (id: string) => {
    setSelectedInvId(id);
    if (onMarkCompleted) onMarkCompleted(id);
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // DATA INVESTIGATION LAB & ROOT-CAUSE DISCOVERY
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            INTERACTIVE DATA INVESTIGATION TASKS ({tasks.length})
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          INVESTIGATION BENCH • SQL QUERY SIMULATOR
        </span>
      </div>

      {/* BODY: TASK LIST + QUERY / RESULT PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        {/* LEFT TASK LIST */}
        <div className="lg:col-span-5 space-y-2">
          {tasks.map((task) => {
            const isSelected = task.id === activeTask?.id;
            return (
              <button
                key={task.id}
                onClick={() => handleSelect(task.id)}
                className={`w-full p-4 rounded-xl text-left transition-all cursor-pointer border flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500/50 text-slate-100 shadow-md font-semibold'
                    : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-cyan-400 font-bold">{task.code}</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[9px] border border-rose-500/20">
                    DEFECT: {task.discoveredDefectId}
                  </span>
                </div>
                <div className="font-bold text-slate-200 text-xs truncate">{task.title}</div>
                <div className="text-[10px] text-slate-400 font-sans truncate">{task.description}</div>
              </button>
            );
          })}
        </div>

        {/* RIGHT QUERY & RESULT BENCH */}
        {activeTask && (
          <div className="lg:col-span-7 cros-glass-card p-6 rounded-2xl space-y-4 font-sans text-xs">
            <div className="border-b border-white/10 pb-3 space-y-1 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold text-xs">{activeTask.code}</span>
                <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold text-[10px]">
                  DISCOVERED DEFECT: {activeTask.discoveredDefectId}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 uppercase">{activeTask.title}</h3>
              <p className="text-xs text-slate-300">{activeTask.description}</p>
            </div>

            {/* QUERY TERMINAL BOX */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 text-[10px] uppercase font-bold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>EXECUTED INVESTIGATION QUERY:</span>
                </div>
                <pre className="text-slate-300 text-[11px] overflow-x-auto whitespace-pre-wrap">{activeTask.sampleQuery}</pre>
              </div>

              {/* QUERY RESULT TABLE */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-2">
                <span className="text-[10px] text-cyan-400 font-bold uppercase block">// QUERY RESULT DATASET:</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-500 text-[9px] uppercase">
                        {Object.keys(activeTask.sampleResultRows[0] || {}).map((key) => (
                          <th key={key} className="p-1.5">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      {activeTask.sampleResultRows.map((row, idx) => (
                        <tr key={idx}>
                          {Object.values(row).map((val: any, vIdx) => (
                            <td key={vIdx} className="p-1.5 text-slate-200">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* EXPECTED FINDING / REASONING */}
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 space-y-1 font-sans">
                <span className="font-mono text-[10px] text-slate-100 uppercase font-bold block">ANALYSIS & FINDING:</span>
                <p className="text-xs">{activeTask.expectedFinding}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
