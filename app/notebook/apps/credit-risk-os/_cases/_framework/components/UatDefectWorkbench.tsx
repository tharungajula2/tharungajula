"use client";

import { useState } from 'react';
import { CaseDefect, UATTestCase, TraceabilityChain } from '../types';
import { ArrowRight, RefreshCw } from 'lucide-react';

interface Props {
  defects: CaseDefect[];
  testPack: UATTestCase[];
  traceabilityMatrix: TraceabilityChain[];
  onToggleDefectFix: (defectId: string) => void;
}

export default function UatDefectWorkbench({ defects, testPack, traceabilityMatrix, onToggleDefectFix }: Props) {
  const [activeTab, setActiveTab] = useState<'DEFECTS' | 'UAT' | 'RTM'>('DEFECTS');

  const passedCount = testPack.filter((t) => t.status === 'PASSED').length;
  const failedCount = testPack.filter((t) => t.status === 'FAILED').length;
  const openDefectsCount = defects.filter((d) => d.status === 'Open').length;

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
        <div>
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // BUSINESS ACCEPTANCE TESTING, DEFECT REMEDIATION & RTM
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 tracking-tight">
            CONNECTED DEFECT LINEAGE & UAT PACK ({passedCount}/{testPack.length} PASS)
          </h2>
        </div>

        {/* TAB BUTTONS */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setActiveTab('DEFECTS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold uppercase ${
              activeTab === 'DEFECTS' ? 'bg-rose-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            DEFECT REGISTER ({openDefectsCount} OPEN)
          </button>
          <button
            onClick={() => setActiveTab('UAT')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold uppercase ${
              activeTab === 'UAT' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            UAT PACK ({testPack.length} TESTS)
          </button>
          <button
            onClick={() => setActiveTab('RTM')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold uppercase ${
              activeTab === 'RTM' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            RTM MATRIX ({traceabilityMatrix.length} CHAINS)
          </button>
        </div>
      </div>

      {/* DEFECTS TAB WITH CONNECTED LINEAGE CHAIN & INTERACTIVE FIX TOGGLE */}
      {activeTab === 'DEFECTS' && (
        <div className="space-y-5 font-mono text-xs">
          {defects.map((def) => (
            <div
              key={def.id}
              className={`cros-glass-card p-6 rounded-2xl border transition-all space-y-4 ${
                def.status === 'Resolved' ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-rose-500/40 bg-rose-500/5'
              }`}
            >
              {/* DEFECT TITLE BAR */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded border text-[10px] font-bold uppercase ${
                    def.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}>
                    {def.code} • {def.severity} • {def.status.toUpperCase()}
                  </span>
                  <h3 className="text-base font-bold text-slate-100 uppercase">{def.title}</h3>
                </div>

                <button
                  onClick={() => onToggleDefectFix(def.id)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    def.status === 'Resolved'
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 hover:bg-slate-700'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{def.status === 'Resolved' ? 'FIX APPLIED (RE-OPEN)' : 'APPLY REMEDIATION FIX'}</span>
                </button>
              </div>

              {/* CONNECTED LINEAGE CHAIN STRIP */}
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <span className="text-cyan-400 font-bold uppercase">// CONNECTED LINEAGE:</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-slate-300 font-bold">Evidence: {def.linkedEvidenceId}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-slate-300 font-bold">Req: {def.linkedReqId}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-slate-300 font-bold">Mapping: {def.linkedMappingId}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-cyan-300 font-bold">Test: {def.linkedTestId}</span>
              </div>

              {/* ACTUAL VS EXPECTED BEHAVIOUR */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <span className="font-mono text-[10px] text-rose-400 font-bold uppercase block">ACTUAL BEHAVIOUR (DEFECT):</span>
                  <p className="text-rose-300">{def.actualBehaviour}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                  <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase block">EXPECTED BEHAVIOUR:</span>
                  <p className="text-slate-200">{def.expectedBehaviour}</p>
                </div>
              </div>

              {/* ROOT CAUSE & REMEDIATION FIX */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                  <span className="font-mono text-[10px] text-amber-400 font-bold uppercase block">ROOT CAUSE ANALYSIS:</span>
                  <p className="text-slate-300 font-mono text-[11px]">{def.rootCause}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                  <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase block">REMEDIATION FIX:</span>
                  <p className="text-cyan-300 font-mono text-[11px]">{def.remediationFix}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-slate-400">
                <span>Facility: <strong className="text-cyan-400">{def.facilityNumber}</strong> ({def.obligorName})</span>
                <span className="text-rose-400 font-bold">Financial Impact: ₹{def.financialImpactInrCr.toFixed(1)} Cr</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UAT PACK TAB */}
      {activeTab === 'UAT' && (
        <div className="cros-glass-card p-6 rounded-2xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold text-slate-100 uppercase">// UAT TEST PACK EXECUTION RESULTS ({testPack.length} TESTS)</span>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-emerald-400 font-bold">PASSED: {passedCount}</span>
              <span className="text-rose-400 font-bold">FAILED: {failedCount}</span>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase">
                  <th className="p-2.5">Test ID</th>
                  <th className="p-2.5">Title</th>
                  <th className="p-2.5">Requirement</th>
                  <th className="p-2.5">Precondition & Input</th>
                  <th className="p-2.5">Expected Result</th>
                  <th className="p-2.5">Actual Result</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {testPack.map((tc) => (
                  <tr key={tc.id} className="hover:bg-white/5">
                    <td className="p-2.5 font-bold text-cyan-400">{tc.code}</td>
                    <td className="p-2.5 text-slate-100 font-bold">{tc.title}</td>
                    <td className="p-2.5 text-slate-400">{tc.linkedReqId}</td>
                    <td className="p-2.5 text-[11px] text-slate-400">{tc.testInput}</td>
                    <td className="p-2.5 text-emerald-300 text-[11px]">{tc.expectedResult}</td>
                    <td className="p-2.5 text-[11px]">{tc.actualResult}</td>
                    <td className="p-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          tc.status === 'PASSED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {tc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RTM TAB */}
      {activeTab === 'RTM' && (
        <div className="cros-glass-card p-6 rounded-2xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-bold text-slate-100 uppercase">// REQUIREMENTS TRACEABILITY MATRIX (RTM) ({traceabilityMatrix.length} CHAINS)</span>
            <span className="text-cyan-400 font-bold text-[10px] uppercase">100% END-TO-END TRACEABILITY</span>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase">
                  <th className="p-2.5">RTM ID</th>
                  <th className="p-2.5">Regulatory Driver</th>
                  <th className="p-2.5">REQ ID</th>
                  <th className="p-2.5">Rule ID</th>
                  <th className="p-2.5">Mapping ID</th>
                  <th className="p-2.5">System Component</th>
                  <th className="p-2.5">UAT Test</th>
                  <th className="p-2.5">Sign-off Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {traceabilityMatrix.map((rtm) => (
                  <tr key={rtm.id} className="hover:bg-white/5">
                    <td className="p-2.5 font-bold text-cyan-400">{rtm.id}</td>
                    <td className="p-2.5 text-slate-300">{rtm.regulatoryDriver}</td>
                    <td className="p-2.5 font-bold text-slate-100">{rtm.reqId}</td>
                    <td className="p-2.5 text-cyan-300">{rtm.ruleId}</td>
                    <td className="p-2.5 text-slate-400">{rtm.mappingId}</td>
                    <td className="p-2.5 text-slate-200 text-[11px] font-mono max-w-xs truncate">{rtm.component}</td>
                    <td className="p-2.5 text-emerald-400 font-bold">{rtm.testId}</td>
                    <td className="p-2.5 text-slate-400">{rtm.signoffOwner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
