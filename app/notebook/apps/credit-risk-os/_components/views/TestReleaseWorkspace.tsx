"use client";

import { CheckCircle2, ShieldAlert, Rocket, Check, ArrowRight } from 'lucide-react';

export default function TestReleaseWorkspace() {
  const testSuites = [
    {
      name: 'Ind AS 109 / IFRS 9 Staging & ECL UAT Suite',
      cases: 24,
      passed: 22,
      failed: 2,
      status: 'IN PROGRESS',
      owner: 'Risk BA & UAT Lead',
    },
    {
      name: 'RBI Basel III 72.5% Output Floor Regression',
      cases: 18,
      passed: 18,
      failed: 0,
      status: 'PASSED',
      owner: 'Regulatory Capital Testing Team',
    },
    {
      name: 'Treasury FTP Base Rate Shock Regression',
      cases: 12,
      passed: 12,
      failed: 0,
      status: 'PASSED',
      owner: 'ALM & Treasury Tech Lead',
    },
    {
      name: 'BCBS 239 Data Lineage Audit Suite',
      cases: 15,
      passed: 13,
      failed: 2,
      status: 'DEFECT RE-TEST',
      owner: 'Data Governance QA',
    },
  ];

  return (
    <div className="w-full min-h-full p-4 sm:p-6 lg:p-8 space-y-6 text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>WORKSPACE 06 • TEST & RELEASE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            SIT, UAT & REGULATORY RELEASE GATE
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            User Acceptance Testing, defect tracking, regulatory sign-offs and hypercare release governance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <Rocket className="w-4 h-4" />
            <span>RELEASE CANDIDATE V2.0-RC1</span>
          </div>
        </div>
      </div>

      {/* OVERVIEW STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">TOTAL UAT TEST CASES</span>
          <div className="text-3xl font-black text-slate-100 cros-num">69 Cases</div>
          <p className="text-[10px] text-slate-400 font-sans">Across 4 Regulatory Modules</p>
        </div>

        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">OVERALL PASS RATE</span>
          <div className="text-3xl font-black text-emerald-400 cros-num">94.2%</div>
          <p className="text-[10px] text-emerald-400 font-sans">65 Passed / 4 Defective</p>
        </div>

        <div className="cros-glass-card p-5 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">SIGN-OFF GATE STATUS</span>
          <div className="text-3xl font-black text-amber-400 cros-num">PENDING UAT</div>
          <p className="text-[10px] text-slate-400 font-sans">CRO & Regulatory Approval Needed</p>
        </div>
      </div>

      {/* TEST SUITES TABLE */}
      <div className="cros-glass-card p-6 rounded-2xl space-y-4">
        <h2 className="text-base font-mono font-bold uppercase tracking-wider text-cyan-400">
          UAT SUITE EXECUTION RESULTS
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">TEST SUITE NAME</th>
                <th className="py-3 px-3">CASES</th>
                <th className="py-3 px-3">PASSED</th>
                <th className="py-3 px-3">FAILED</th>
                <th className="py-3 px-3">STATUS</th>
                <th className="py-3 px-3">OWNER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {testSuites.map((ts) => (
                <tr key={ts.name} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-3 font-bold">{ts.name}</td>
                  <td className="py-3.5 px-3 cros-num text-slate-400">{ts.cases}</td>
                  <td className="py-3.5 px-3 cros-num text-emerald-400 font-bold">{ts.passed}</td>
                  <td className="py-3.5 px-3 cros-num text-rose-400 font-bold">{ts.failed}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ts.status === 'PASSED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {ts.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-400 text-[11px] font-sans">{ts.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
