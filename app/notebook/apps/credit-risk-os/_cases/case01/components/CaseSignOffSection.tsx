"use client";

import { useState } from 'react';
import { SIGN_OFF_APPROVERS, SignOffApprover, SeededDefect, UATTestCase } from '../case01Data';
import { CheckCircle2, ShieldCheck, Lock, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';

interface Props {
  defects: SeededDefect[];
  testPack: UATTestCase[];
  onCompleteCase: () => void;
}

export default function CaseSignOffSection({ defects, testPack, onCompleteCase }: Props) {
  const [approvers, setApprovers] = useState<SignOffApprover[]>(SIGN_OFF_APPROVERS);

  const openDefects = defects.filter((d) => d.status === 'Open');
  const failedTests = testPack.filter((t) => t.status === 'FAILED');
  const isGovernanceCleared = openDefects.length === 0 && failedTests.length === 0;

  const toggleSignOff = (id: string) => {
    if (!isGovernanceCleared) return;

    setApprovers((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const nextStatus = app.status === 'APPROVED' ? 'PENDING' : 'APPROVED';
          return {
            ...app,
            status: nextStatus,
            signoffDate: nextStatus === 'APPROVED' ? '31 July 2026 17:45:00' : undefined,
            comments: nextStatus === 'APPROVED' ? 'Verified evidence & zero-variance reconciliation. Approved for production release.' : app.comments,
          };
        }
        return app;
      })
    );
  };

  const allApproved = isGovernanceCleared && approvers.every((a) => a.status === 'APPROVED');
  const approvedCount = approvers.filter((a) => a.status === 'APPROVED').length;

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between font-mono">
        <div>
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // STEERING COMMITTEE SIGN-OFF & GOVERNANCE GATE
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 tracking-tight">
            PRODUCTION RELEASE SIGN-OFF ({approvedCount}/{approvers.length} APPROVED)
          </h2>
        </div>

        <span
          className={`px-3 py-1 rounded-lg border text-xs font-bold uppercase ${
            allApproved
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
          }`}
        >
          {allApproved ? 'READY FOR PRODUCTION RELEASE' : 'SIGN-OFF GOVERNANCE BLOCKED'}
        </span>
      </div>

      {/* GOVERNANCE BLOCKING ALERT BANNER */}
      {!isGovernanceCleared && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-rose-400 text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>GOVERNANCE GATEWAY BLOCKED — SIGN-OFF REQUIREMENTS UNMET</span>
          </div>
          <p className="font-sans text-xs text-slate-300">
            The Steering Committee sign-off cannot proceed due to unresolved technical or testing blockers:
          </p>
          <ul className="list-disc list-inside space-y-1 text-rose-300 font-mono text-[11px]">
            {openDefects.length > 0 && (
              <li><strong>{openDefects.length} Unresolved Defects:</strong> {openDefects.map((d) => d.code).join(', ')}</li>
            )}
            {failedTests.length > 0 && (
              <li><strong>{failedTests.length} Failed UAT Boundary Tests:</strong> {failedTests.map((t) => t.code).join(', ')}</li>
            )}
            <li><strong>Risk-to-Finance Reconciliation:</strong> Non-zero variance (₹18.8 Cr GL reserve deficit)</li>
          </ul>
          <span className="text-[10px] text-slate-400 italic block pt-1">
            Tip: Go to the "09 · UAT, Defects & RTM" section and click "APPLY REMEDIATION FIX" on open defects to clear the gate!
          </span>
        </div>
      )}

      {/* APPROVER CHECKLIST */}
      <div className="space-y-4 font-mono text-xs">
        {approvers.map((app) => (
          <div
            key={app.id}
            className={`cros-glass-card p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              app.status === 'APPROVED' ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/10 bg-slate-900/60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-cyan-400 font-bold uppercase">{app.stakeholderTitle}</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-200 font-bold">{app.approverName}</span>
              </div>
              <p className="text-xs text-slate-400 font-sans">{app.role}</p>
              <div className="text-[11px] text-slate-300 font-mono italic">"{app.comments}"</div>
              {app.signoffDate && (
                <span className="text-[9px] text-emerald-400 font-mono block">Timestamp: {app.signoffDate}</span>
              )}
            </div>

            <button
              onClick={() => toggleSignOff(app.id)}
              disabled={!isGovernanceCleared}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
                !isGovernanceCleared
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5 opacity-50'
                  : app.status === 'APPROVED'
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-white/10'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{app.status === 'APPROVED' ? 'APPROVED' : 'EXECUTE SIGN-OFF'}</span>
            </button>
          </div>
        ))}
      </div>

      {/* FINAL RELEASE GATE BUTTON */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono">
        <div className="text-xs text-slate-400">
          Status: {allApproved ? <strong className="text-emerald-400">100% Approvals Complete</strong> : <strong className="text-amber-400">Pending Approvals / Governance Blocked</strong>}
        </div>

        <button
          onClick={onCompleteCase}
          disabled={!allApproved}
          className={`px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            allApproved
              ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 cursor-pointer'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>SIGN-OFF & COMPLETE CASE 01</span>
        </button>
      </div>
    </div>
  );
}
