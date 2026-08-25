"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { INSTITUTION_TRUTH_MODEL } from '../../_domain/india/truthModel';
import { getIndiaPortfolioTotals } from '../../_data/indiaSyntheticBank';

export default function ReportingView() {
  const { facilities } = useCreditRiskOS();
  const totals = getIndiaPortfolioTotals(facilities);

  const formatInrCr = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 1 }).format(val) + ' Cr';

  const reports = [
    {
      code: 'RBI-IRACP-01',
      title: 'IRACP Asset Quality & Provisioning Return',
      schedule: 'Quarterly',
      status: 'VALIDATED',
      valueInrCr: totals.totalIracpProvisionInrCr,
      notes: 'Supervisory asset quality classification and mandatory IRACP provisioning schedule compiled.',
    },
    {
      code: 'RBI-CRAR-01',
      title: 'Basel III Capital Adequacy (CRAR) Return',
      schedule: 'Quarterly',
      status: 'VALIDATED',
      valueInrCr: INSTITUTION_TRUTH_MODEL.headlineTotalRwaInrCr,
      notes: 'Credit RWA, CET1 ratio (15.00%), and CRAR capital buffers calculated.',
    },
    {
      code: 'RBI-ALM-01',
      title: 'Structural Liquidity & FTP Return (LCR / NSFR)',
      schedule: 'Monthly',
      status: 'READY FOR SIGNOFF',
      valueInrCr: totals.totalOutstandingInrCr,
      notes: 'Treasury FTP balance sheet repricing tenor and LCR (118.4%) / NSFR (108.8%) liquidity returns.',
    },
    {
      code: 'RBI-LARGE-01',
      title: 'Large Exposure Framework (LEF) Statement',
      schedule: 'Quarterly',
      status: 'PENDING REVIEW',
      valueInrCr: totals.totalLimitInrCr,
      notes: 'Single and group obligor concentration limits evaluated against Tier 1 capital base.',
    },
  ];

  return (
    <div className="p-6 space-y-6 font-sans select-none text-slate-100">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-cyan-400 font-bold uppercase">// WORKSPACE 05 • REGULATORY REPORTING CONTROL ROOM</span>
          <h1 className="text-2xl font-black uppercase text-slate-100 tracking-tight">Reserve Bank of India (RBI) Supervisory Reporting</h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            RBI IRACP asset quality returns, Basel III capital adequacy (CRAR), structural liquidity (ALM), and large exposure filings.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold uppercase text-[11px]">
            CYCLE: Q2 2026 RBI FILING (AS AT 31 JULY 2026)
          </span>
        </div>
      </div>

      {/* REPORTING SCHEDULE & STATUS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {reports.map((report) => (
          <div key={report.code} className="cros-glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-cyan-400">{report.code}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                report.status === 'VALIDATED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'
              }`}>
                {report.status}
              </span>
            </div>

            <div className="text-base font-bold text-slate-100">{report.title}</div>
            <p className="text-slate-300 font-sans text-xs">{report.notes}</p>

            <div className="pt-2 border-t border-white/5 flex justify-between items-center text-xs">
              <span className="text-slate-400">Reported Amount:</span>
              <span className="font-bold text-slate-100">{formatInrCr(report.valueInrCr)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
