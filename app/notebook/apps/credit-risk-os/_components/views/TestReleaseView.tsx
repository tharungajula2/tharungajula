"use client";

import { useState } from 'react';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import {
  ALL_CASES,
  getAllUatTests,
  getAllDefects,
  getAllSignoffs,
  deriveCaseReleaseStatus,
} from '../../_state/operatingSystemStore';
import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Award,
  Layers,
  ArrowRight,
  Filter,
} from 'lucide-react';

export default function TestReleaseView() {
  const { navigateToCase } = useCreditRiskOS();
  const [activeTab, setActiveTab] = useState<'uat' | 'defects' | 'readiness' | 'signoffs'>('readiness');

  const allTests = getAllUatTests();
  const allDefects = getAllDefects();
  const allSignoffs = getAllSignoffs();

  const totalTests = allTests.length;
  const passedTests = allTests.filter((t) => t.item.status === 'PASSED').length;
  const uatPassRatePercent = (passedTests / totalTests) * 100;

  const totalDefects = allDefects.length;
  const openDefects = allDefects.filter((d) => d.item.status === 'Open').length;

  return (
    <div className="w-full min-h-full p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100 select-none font-sans">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>WORKSPACE 05 • TEST & RELEASE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            RELEASE CONTROL TOWER & GOVERNANCE GATE
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Cross-case UAT testing status, defect remediation register, multi-stage balance reconciliation, and Steering Committee sign-off controls.
          </p>
        </div>
      </div>

      {/* SUMMARY KPI STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="cros-glass-card p-4 rounded-2xl border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block font-sans">TOTAL UAT TEST SUITE:</span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-black text-slate-100">{totalTests} Cases</span>
            <span className="text-emerald-400 font-bold">{uatPassRatePercent.toFixed(0)}% Pass Rate</span>
          </div>
          <span className="text-[10px] text-slate-400 block font-sans">Passed: {passedTests} | Failed: {totalTests - passedTests}</span>
        </div>

        <div className="cros-glass-card p-4 rounded-2xl border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block font-sans">DEFECT REMEDIATION REGISTER:</span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-black text-slate-100">{totalDefects} Total</span>
            <span className={`font-bold ${openDefects > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {openDefects} Open Defects
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block font-sans">Resolved: {totalDefects - openDefects}</span>
        </div>

        <div className="cros-glass-card p-4 rounded-2xl border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block font-sans">STEERING COMMITTEE SIGNOFFS:</span>
          <span className="text-xl font-black text-cyan-400">{allSignoffs.length} Approvers</span>
          <span className="text-[10px] text-slate-400 block font-sans">Cross-Department Approval Gate</span>
        </div>

        <div className="cros-glass-card p-4 rounded-2xl border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block font-sans">ACTIVE TRANSFORMATIONS:</span>
          <span className="text-xl font-black text-emerald-400">3 Programmes</span>
          <span className="text-[10px] text-slate-400 block font-sans">CASE-001, CASE-002, CASE-003</span>
        </div>
      </div>

      {/* MODE TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3 font-mono text-xs">
        <button
          onClick={() => setActiveTab('readiness')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
            activeTab === 'readiness' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          01 · Release Readiness Matrix (3 Cases)
        </button>

        <button
          onClick={() => setActiveTab('defects')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
            activeTab === 'defects' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          02 · Defect Register ({totalDefects})
        </button>

        <button
          onClick={() => setActiveTab('uat')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
            activeTab === 'uat' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          03 · UAT Control Tower ({totalTests})
        </button>

        <button
          onClick={() => setActiveTab('signoffs')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
            activeTab === 'signoffs' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          04 · Sign-off Register ({allSignoffs.length})
        </button>
      </div>

      {/* TAB CONTENT 1: RELEASE READINESS MATRIX */}
      {activeTab === 'readiness' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
          {ALL_CASES.map((c) => {
            const caseDefects = allDefects.filter((d) => d.caseId === c.caseId).map((d) => d.item);
            const caseTests = allTests.filter((t) => t.caseId === c.caseId).map((t) => t.item);
            const caseSignoffs = allSignoffs.filter((s) => s.caseId === c.caseId).map((s) => s.item);

            const isReconciled = c.definition.reconciliationSummary.afterFix.unexplainedVarianceInrCr === 0;
            const releaseEval = deriveCaseReleaseStatus(caseDefects, caseTests, caseSignoffs, isReconciled);

            return (
              <div key={c.caseId} className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-bold">{c.definition.metadata.code}</span>
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border ${releaseEval.bgClass} ${releaseEval.textClass}`}>
                      {releaseEval.label}
                    </span>
                  </div>
                  <h3 className="text-base font-bold uppercase text-slate-100 font-mono leading-snug">
                    {c.definition.metadata.title}
                  </h3>
                </div>

                <div className="space-y-2 font-mono text-[11px] pt-2 border-t border-white/5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Open Defects:</span>
                    <span className="text-slate-200 font-bold">{caseDefects.filter((d) => d.status === 'Open').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">UAT Pass Rate:</span>
                    <span className="text-emerald-400 font-bold">
                      {((caseTests.filter((t) => t.status === 'PASSED').length / caseTests.length) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reconciliation:</span>
                    <span className={`font-bold ${isReconciled ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isReconciled ? 'RECONCILED' : 'BREAK ALERT'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Approved Sign-offs:</span>
                    <span className="text-cyan-300 font-bold">
                      {caseSignoffs.filter((s) => s.status === 'APPROVED').length} / {caseSignoffs.length}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigateToCase(c.caseId)}
                  className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold uppercase text-xs cursor-pointer"
                >
                  Manage Governance Gate in Case
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB CONTENT 2: DEFECT REGISTER */}
      {activeTab === 'defects' && (
        <div className="cros-glass-card rounded-2xl overflow-hidden border border-white/10 font-mono text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-cyan-400 border-b border-white/10 uppercase text-[10px]">
                  <th className="p-3">Case</th>
                  <th className="p-3">Defect Code</th>
                  <th className="p-3">Severity</th>
                  <th className="p-3">Title / Obligor</th>
                  <th className="p-3">Remediation Fix</th>
                  <th className="p-3 text-right">Impact</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allDefects.map((def) => (
                  <tr key={def.item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 text-cyan-400 font-bold">{def.caseCode}</td>
                    <td className="p-3 font-bold text-slate-100">{def.item.code}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        def.item.severity === 'BLOCKER' || def.item.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {def.item.severity}
                      </span>
                    </td>
                    <td className="p-3 space-y-0.5">
                      <div className="font-bold text-slate-200">{def.item.title}</div>
                      <div className="text-[10px] text-slate-400">{def.item.obligorName} ({def.item.facilityNumber})</div>
                    </td>
                    <td className="p-3 text-slate-300 font-sans text-xs max-w-xs">{def.item.remediationFix}</td>
                    <td className="p-3 text-right font-bold text-slate-100">₹{def.item.financialImpactInrCr.toFixed(1)} Cr</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        def.item.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {def.item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: UAT CONTROL TOWER */}
      {activeTab === 'uat' && (
        <div className="cros-glass-card rounded-2xl overflow-hidden border border-white/10 font-mono text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-cyan-400 border-b border-white/10 uppercase text-[10px]">
                  <th className="p-3">Case</th>
                  <th className="p-3">Test Code</th>
                  <th className="p-3">Test Title</th>
                  <th className="p-3">Expected Result</th>
                  <th className="p-3">Actual Result</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allTests.map((t) => (
                  <tr key={t.item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 text-cyan-400 font-bold">{t.caseCode}</td>
                    <td className="p-3 font-bold text-slate-100">{t.item.code}</td>
                    <td className="p-3 font-bold text-slate-200 font-sans text-xs">{t.item.title}</td>
                    <td className="p-3 text-emerald-300 font-sans text-xs">{t.item.expectedResult}</td>
                    <td className="p-3 text-slate-300 font-sans text-xs">{t.item.actualResult}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.item.status === 'PASSED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {t.item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: SIGNOFF REGISTER */}
      {activeTab === 'signoffs' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {allSignoffs.map((so) => (
            <div key={so.item.id} className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-cyan-400 font-bold">{so.item.approverName}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  so.item.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {so.item.status}
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-100">{so.item.stakeholderTitle}</div>
                <div className="text-[10px] text-slate-400">{so.caseCode} • {so.item.role}</div>
              </div>
              <p className="text-xs text-slate-300 font-sans">{so.item.comments}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
