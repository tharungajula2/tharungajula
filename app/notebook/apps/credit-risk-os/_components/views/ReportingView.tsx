"use client";

import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { RENFORGE_BANK_ENTITY, getPortfolioTotals } from '../../_data/syntheticBank';

export default function ReportingView() {
  const { facilities } = useCreditRiskOS();
  const totals = getPortfolioTotals(facilities);

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);

  const reports = [
    {
      code: 'COREP C 07.00',
      title: 'Credit Risk SA Exposure & RWA',
      schedule: 'Quarterly',
      status: 'VALIDATED',
      valueGBP: totals.totalEadGBP,
      notes: 'Standardised approach credit risk returns compiled.',
    },
    {
      code: 'COREP C 09.01',
      title: 'Credit Risk IRB Breakdown',
      schedule: 'Quarterly',
      status: 'VALIDATED',
      valueGBP: totals.totalRwaGBP,
      notes: 'Advanced IRB model risk weights & output floor applied.',
    },
    {
      code: 'FINREP F 01.01',
      title: 'Financial Balance Sheet Statement',
      schedule: 'Quarterly',
      status: 'READY FOR SIGN-OFF',
      valueGBP: RENFORGE_BANK_ENTITY.totalAssetsGBP,
      notes: 'Balance sheet assets reconciled against general ledger.',
    },
    {
      code: 'FINREP F 18.00',
      title: 'Impaired & Forborne Exposures',
      schedule: 'Quarterly',
      status: 'PENDING REVIEW',
      valueGBP: totals.totalProvisionGBP,
      notes: 'Stage 2 & Stage 3 provisions and default exposures.',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="border-b border-hairline pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-accent font-semibold uppercase">// SECTION REP-07</span>
          <h1 className="text-2xl font-bold uppercase text-ink tracking-tight">Regulatory Reporting Control Room</h1>
          <p className="text-xs text-ink-muted font-mono mt-1">
            COREP, FINREP, PRA filing cycles, automated validation rules, and reconciliation sign-offs.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded bg-signal/10 text-signal border border-signal/30 font-bold uppercase">
            CYCLE: Q3 2026 PRA FILING (AS AT 31 JULY 2026)
          </span>
        </div>
      </div>

      {/* REPORTING SCHEDULE & STATUS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {reports.map((report) => (
          <div key={report.code} className="p-5 rounded-2xl bg-surface-raised border border-hairline space-y-3">
            <div className="flex items-center justify-between border-b border-hairline-faint pb-2">
              <span className="font-bold text-accent">{report.code}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                report.status === 'VALIDATED' ? 'bg-signal/20 text-signal' : 'bg-accent/20 text-accent'
              }`}>
                {report.status}
              </span>
            </div>

            <div className="text-base font-bold text-ink">{report.title}</div>
            <p className="text-ink-muted font-sans text-xs">{report.notes}</p>

            <div className="pt-2 border-t border-hairline-faint flex justify-between items-center text-xs">
              <span className="text-ink-faint">Reported Total:</span>
              <span className="font-bold text-ink">{formatGBP(report.valueGBP)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
