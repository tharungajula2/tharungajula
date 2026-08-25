"use client";

import { ArrowRight, AlertTriangle, Layers, Database, ShieldAlert, FileSpreadsheet } from 'lucide-react';

export default function CaseCurrentStateSection() {
  const currentNodes = [
    {
      step: '01',
      title: 'Loan Servicing System (CBS)',
      owner: 'Collections & Credit Operations (Rajesh Kulkarni)',
      desc: 'Captures daily repayment transactions and DPD counters. Ingestion snapshot triggers at 18:00 before evening clearing.',
      breakPoint: 'Timing gap: EOD clearing payments cleared at 23:59 are omitted, causing a 14-day DPD lag.',
    },
    {
      step: '02',
      title: 'Daily DPD Batch Extract',
      owner: 'Data Engineering Lead (Siddharth Varma)',
      desc: 'Ingests `cbs_dpd` into raw staging tables. Joins servicing accounts to customer master on single `obligor_id` key.',
      breakPoint: 'Missing composite join key (`obligor_id` + `facility_id`) generates 2 duplicate facility rows.',
    },
    {
      step: '03',
      title: 'Legacy Risk Warehouse',
      owner: 'Risk Technology Lead (Priya Sundaram)',
      desc: 'Executes legacy SQL script `sp_calc_asset_quality.sql` applying DPD classification rules.',
      breakPoint: 'Boundary operator defect: Used `>= 90` instead of `> 90`, prematurely declaring 90 DPD assets as NPA.',
    },
    {
      step: '04',
      title: 'Manual Classification Adjustment',
      owner: 'Credit Risk SME (Vikram Malhotra)',
      desc: 'Credit Risk analysts manually apply Excel overrides to correct timing lags and qualitative watchlist flags.',
      breakPoint: 'Un-governed override: Manual overrides lack structured approval metadata or audit log retention.',
    },
    {
      step: '05',
      title: 'Provisioning Spreadsheet',
      owner: 'Finance & Impairment Controller (Ananya Sharma)',
      desc: 'Finance extracts risk warehouse tables into Excel workbooks to compute required balance sheet reserves.',
      breakPoint: 'Unsecured Substandard rate defect: Unsecured NPA facility received 15% rate instead of mandatory 25%.',
    },
    {
      step: '06',
      title: 'Finance GL Reporting',
      owner: 'Financial Controller',
      desc: 'General Ledger provision totals posted to regulatory returns and executive dashboards.',
      breakPoint: 'Net ₹18.8 Cr reserve deficit between Risk Warehouse extracts and Finance GL filings.',
    },
  ];

  return (
    <div className="space-y-6 font-sans text-slate-100 select-none">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block">
            // AS-IS PROCESS MODEL & CONTROL BREAK ANALYSIS
          </span>
          <h2 className="text-xl font-black uppercase text-slate-100 font-mono tracking-tight">
            CURRENT-STATE ASSET QUALITY PROCESS FLOW
          </h2>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase">
          AS-IS WORKFLOW • 6 CONTROL BREAKS
        </span>
      </div>

      {/* PROCESS STEPS FLOW */}
      <div className="space-y-4 font-mono text-xs">
        {currentNodes.map((node, idx) => (
          <div
            key={node.step}
            className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-3 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold text-[10px]">
                  STEP {node.step}
                </span>
                <h3 className="text-base font-bold text-slate-100 uppercase">{node.title}</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-sans">Owner: <strong className="text-slate-200">{node.owner}</strong></span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">{node.desc}</p>

            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold uppercase text-[10px] text-rose-400 block">// IDENTIFIED CONTROL BREAK:</span>
                <p className="text-[11px] font-sans leading-tight">{node.breakPoint}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
