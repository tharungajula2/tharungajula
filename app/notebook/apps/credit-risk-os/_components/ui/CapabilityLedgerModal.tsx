"use client";

import { useEffect } from 'react';
import { Award, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import {
  ALL_CASES,
  getAllRequirements,
  getAllBusinessRules,
  getAllMappings,
  getAllInvestigations,
  getAllDefects,
  getAllUatTests,
  getAllRtmChains,
} from '../../_state/operatingSystemStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CapabilityLedgerModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const reqsCount = getAllRequirements().length;
  const rulesCount = getAllBusinessRules().length;
  const mappingsCount = getAllMappings().length;
  const invsCount = getAllInvestigations().length;
  const defectsCount = getAllDefects().length;
  const uatCount = getAllUatTests().length;
  const rtmCount = getAllRtmChains().length;

  const capabilities = [
    { title: 'Credit Risk & Asset Quality', cases: ['CASE-001'], practiceSummary: 'IRACP DPD asset classification, provision rate evaluation, secured vs unsecured collateral haircut models.' },
    { title: 'Treasury ALM & FTP Sourcing', cases: ['CASE-002'], practiceSummary: 'Funds Transfer Pricing (FTP) yield curve decomposition, repricing tenor alignment, composite key deduplication.' },
    { title: 'Prudential Capital & RWA', cases: ['CASE-003'], practiceSummary: 'RBI Basel III Standardised Credit RWA, off-balance sheet CCF conversion, external rating freshness gates, whole-bank CRAR.' },
    { title: 'Requirements & Business Rules', cases: ['CASE-001', 'CASE-002', 'CASE-003'], practiceSummary: `Validated ${reqsCount} BRD Requirements and ${rulesCount} operational Business Rules across 3 bank transformations.` },
    { title: 'Source-to-Target Data Mapping (STTM)', cases: ['CASE-001', 'CASE-002', 'CASE-003'], practiceSummary: `Mapped and verified ${mappingsCount} field-level ETL transformations across 11 synthetic bank systems.` },
    { title: 'RWA & Data Investigations', cases: ['CASE-001', 'CASE-002', 'CASE-003'], practiceSummary: `Executed ${invsCount} SQL analytical investigation tasks to isolate data pipeline defects.` },
    { title: 'End-to-End RTM Traceability', cases: ['CASE-001', 'CASE-002', 'CASE-003'], practiceSummary: `Verified ${rtmCount} complete traceability chains from Regulatory Driver to Release Sign-off.` },
    { title: 'Quality Assurance & UAT', cases: ['CASE-001', 'CASE-002', 'CASE-003'], practiceSummary: `Executed ${uatCount} UAT boundary test cases across exposure classification, rating freshness, and CCF conversion.` },
    { title: 'Defect Remediation & Controls', cases: ['CASE-001', 'CASE-002', 'CASE-003'], practiceSummary: `Remediated ${defectsCount} seeded software and data defects, verifying zero-variance multi-stage balance reconciliation.` },
  ];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none font-sans text-slate-100 animate-in fade-in duration-200"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="capability-ledger-title"
        className="cros-glass-card border border-cyan-500/40 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden font-mono text-xs space-y-5 p-6 max-h-[85vh] overflow-y-auto"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-400" />
            <div>
              <span className="text-[10px] text-cyan-400 font-bold uppercase block">// SIMULATION EVIDENCE LEDGER</span>
              <h2 id="capability-ledger-title" className="text-base font-black text-slate-100 uppercase">PRACTITIONER CAPABILITY PRACTICE RECORD</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close capability ledger modal"
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CAPABILITIES LIST */}
        <div className="space-y-3 font-sans text-xs">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold text-slate-100 text-xs uppercase">{cap.title}</span>
                <div className="flex items-center gap-1">
                  {cap.cases.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] font-bold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">{cap.practiceSummary}</p>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-white/5 flex justify-end font-mono">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase text-xs cursor-pointer"
          >
            Close Capability Ledger
          </button>
        </div>
      </div>
    </div>
  );
}
