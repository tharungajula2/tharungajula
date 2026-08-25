"use client";

import { useState } from 'react';
import { BusinessRequirement, BusinessRule } from '../types';

interface Props {
  requirements: BusinessRequirement[];
  rules: BusinessRule[];
}

export default function RequirementsRegister({ requirements, rules }: Props) {
  const [selectedReqId, setSelectedReqId] = useState<string>(requirements[0]?.id || '');

  const activeReq = requirements.find((r) => r.id === selectedReqId) || requirements[0];

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // BRD REQUIREMENTS REGISTER & BUSINESS RULES TABLE
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            BUSINESS REQUIREMENTS ({requirements.length}) & RULES ({rules.length})
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          BRD REGISTER & SPECIFICATION
        </span>
      </div>

      {/* REQUIREMENTS LIST & INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        {/* LEFT REQ LIST */}
        <div className="lg:col-span-5 space-y-2">
          {requirements.map((req) => {
            const isSelected = req.id === activeReq?.id;
            return (
              <button
                key={req.id}
                onClick={() => setSelectedReqId(req.id)}
                className={`w-full p-4 rounded-xl text-left transition-all cursor-pointer border flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500/50 text-slate-100 shadow-md font-semibold'
                    : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-cyan-400 font-bold">{req.id}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[9px] border border-white/10">
                    {req.priority}
                  </span>
                </div>
                <div className="font-bold text-slate-200 text-xs truncate">{req.title}</div>
                <div className="text-[10px] text-slate-400 font-sans truncate">{req.requirementText}</div>
              </button>
            );
          })}
        </div>

        {/* RIGHT REQ DETAIL */}
        {activeReq && (
          <div className="lg:col-span-7 cros-glass-card p-6 rounded-2xl space-y-4 font-sans text-xs">
            <div className="border-b border-white/10 pb-3 space-y-1 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold text-xs">{activeReq.id}</span>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[10px]">
                  {activeReq.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 uppercase">{activeReq.title}</h3>
              <span className="text-[11px] text-slate-400 block">Owner: <strong className="text-slate-200">{activeReq.owner}</strong></span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                <span className="text-[10px] text-cyan-400 font-bold uppercase block">REQUIREMENT SPECIFICATION:</span>
                <p className="text-slate-200 font-sans text-xs leading-relaxed">{activeReq.requirementText}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                <span className="text-[10px] text-cyan-400 font-bold uppercase block">ACCEPTANCE CRITERIA:</span>
                <p className="text-emerald-300 font-mono text-xs">{activeReq.acceptanceCriteria}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded bg-slate-900 border border-white/5">
                  <span className="text-slate-500 uppercase block text-[9px]">REGULATORY DRIVER:</span>
                  <span className="text-slate-300 font-bold">{activeReq.regulatoryDriver}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-white/5">
                  <span className="text-slate-500 uppercase block text-[9px]">LINKED RULE CODE:</span>
                  <span className="text-cyan-400 font-bold">{activeReq.linkedRuleId}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BUSINESS RULES TABLE */}
      <div className="cros-glass-card p-6 rounded-2xl space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-bold text-slate-100 uppercase tracking-wider">// EXPLICIT BUSINESS RULES TABLE</span>
          <span className="text-cyan-400 font-bold text-[10px] uppercase">SUPERVISORY PRECEDENCE ORDER</span>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase">
                <th className="p-2.5">Priority</th>
                <th className="p-2.5">Rule Code</th>
                <th className="p-2.5">Category</th>
                <th className="p-2.5">Logical Condition</th>
                <th className="p-2.5">Classification Output</th>
                <th className="p-2.5">Provision Rate</th>
                <th className="p-2.5">Reason Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-white/5">
                  <td className="p-2.5 font-bold text-cyan-400">{rule.priority}</td>
                  <td className="p-2.5 text-slate-200 font-bold">{rule.ruleCode}</td>
                  <td className="p-2.5">{rule.category}</td>
                  <td className="p-2.5 text-slate-400 font-mono">{rule.condition}</td>
                  <td className="p-2.5 text-emerald-400 font-bold">{rule.outputClassification}</td>
                  <td className="p-2.5 font-bold text-slate-100">{rule.provisionRatePercent.toFixed(2)}%</td>
                  <td className="p-2.5 text-cyan-300 text-[11px]">{rule.reasonCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
