"use client";

import { useState } from 'react';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { calculateEAD, calculateExpectedLoss } from '../../_engine/creditRisk';
import { assessIFRS9Staging } from '../../_engine/ifrs9';
import { calculateCapitalWithFloor, calculateCET1Ratio } from '../../_engine/capital';
import { RENFORGE_BANK_ENTITY, getPortfolioTotals } from '../../_data/syntheticBank';

export interface PrebuiltEvent {
  id: string;
  title: string;
  category: 'Watchlist' | 'Rating' | 'Default' | 'Collateral' | 'Data Quality';
  facilityId: string;
  facilityNumber: string;
  obligorName: string;
  description: string;
  actionPayload: {
    newDPD?: number;
    newPD?: number;
    newLGD?: number;
    isDefaulted?: boolean;
    watchlistStatus?: boolean;
    sicrReason?: string;
  };
  downstreamImpacts: {
    reporting: string;
    lineage: string;
    baRequirement: string;
    uatCase: string;
  };
}

export const PREBUILT_EVENTS: PrebuiltEvent[] = [
  {
    id: 'EVT-01',
    title: 'Watchlist Escalation — Property Valuation Breach',
    category: 'Watchlist',
    facilityId: 'FAC-2025-003',
    facilityNumber: 'MID-CRE-4403',
    obligorName: 'Midland Retail Properties plc',
    description: 'Commercial property valuation dropped by 15%, causing LTV to breach 70% covenant threshold.',
    actionPayload: {
      newDPD: 45,
      newPD: 0.085,
      watchlistStatus: true,
      sicrReason: 'Watchlist escalation & LTV covenant breach (>70%). 30+ DPD triggered.',
    },
    downstreamImpacts: {
      reporting: 'FINREP F 18.00 (Forborne & Stage 2 Exposure)',
      lineage: 'RWH-DM-02 → ENG-SICR-03 → ENG-ECL-04 → FIN-GL-05',
      baRequirement: 'REQ-ECL-04 (Automated Watchlist Ingestion)',
      uatCase: 'UAT-ECL-001 (Verify 30+ DPD Stage 2 Lifetime ECL)',
    },
  },
  {
    id: 'EVT-02',
    title: 'Default Event Declaration — Highland Overdraft',
    category: 'Default',
    facilityId: 'FAC-2025-006',
    facilityNumber: 'HIG-DEF-7706',
    obligorName: 'Highland Hospitality & Leisure Ltd',
    description: 'Obligor exceeds 90 days past due (112 DPD). Liquidation notice served.',
    actionPayload: {
      newDPD: 112,
      newPD: 1.00,
      newLGD: 0.70,
      isDefaulted: true,
      watchlistStatus: true,
      sicrReason: 'Default precedence triggered: >90 DPD and insolvency filing.',
    },
    downstreamImpacts: {
      reporting: 'COREP C 07.00 & FINREP F 18.00 (Defaulted Specific Provision)',
      lineage: 'SRC-CBS-01 → ENG-SICR-03 → FIN-GL-05 → REP-PRA-06',
      baRequirement: 'REQ-DEF-02 (Automatic Default Precedence Classification)',
      uatCase: 'UAT-DEF-003 (Verify Stage 3 100% PD specific provision)',
    },
  },
  {
    id: 'EVT-03',
    title: 'Rating Downgrade — Manchester Residential',
    category: 'Rating',
    facilityId: 'FAC-2025-007',
    facilityNumber: 'MAN-RES-5507',
    obligorName: 'Manchester Residential Developments Ltd',
    description: 'Internal rating downgraded by 2 notches (BBB -> B) due to construction cost inflation.',
    actionPayload: {
      newPD: 0.085,
      watchlistStatus: true,
      sicrReason: '2-notch rating downgrade and relative PD ratio > 3.0x.',
    },
    downstreamImpacts: {
      reporting: 'COREP C 09.01 (IRB Rating Migration Return)',
      lineage: 'RWH-DM-02 → ENG-SICR-03 → ENG-ECL-04',
      baRequirement: 'REQ-ECL-05 (Multi-notch rating downgrade SICR rule)',
      uatCase: 'UAT-ECL-002 (Verify relative PD ratio staging migration)',
    },
  },
];

export default function EventSimulatorDrawer() {
  const { facilities, updateFacility, resetPortfolio } = useCreditRiskOS();
  const [selectedEvent, setSelectedEvent] = useState<PrebuiltEvent | null>(null);
  const [activeImpact, setActiveImpact] = useState<any | null>(null);

  const handleExecuteEvent = (evt: PrebuiltEvent) => {
    const targetFacility = facilities.find((f) => f.id === evt.facilityId);
    if (!targetFacility) return;

    // Before stats
    const beforeTotals = getPortfolioTotals(facilities);

    const newPD = evt.actionPayload.newPD ?? targetFacility.pd;
    const newLGD = evt.actionPayload.newLGD ?? targetFacility.lgd;
    const newDPD = evt.actionPayload.newDPD ?? targetFacility.dpd;
    const isDefaulted = evt.actionPayload.isDefaulted ?? targetFacility.isDefaulted;
    const watchlistStatus = evt.actionPayload.watchlistStatus ?? targetFacility.sicrTriggered;

    const stagingResult = assessIFRS9Staging({
      dpd: newDPD,
      isDefaulted,
      currentPD: newPD,
      originationPD: targetFacility.pd / 1.2,
      ratingDowngradeNotches: newPD > targetFacility.pd * 2 ? 2 : 0,
      watchlistStatus,
    });

    const newEAD = calculateEAD({
      drawnGBP: targetFacility.drawnGBP,
      undrawnGBP: targetFacility.undrawnGBP,
      ccf: targetFacility.ccf,
    });

    const newECL12m = calculateExpectedLoss({ pd: newPD, lgd: newLGD, ead: newEAD });
    const newECLLifetime = stagingResult.stage >= 2 ? newECL12m * 3.2 : newECL12m;
    const newProvision = stagingResult.stage >= 2 ? newECLLifetime : newECL12m;

    const capitalResult = calculateCapitalWithFloor({
      eadGBP: newEAD,
      riskWeight: targetFacility.riskWeight,
      pd: newPD,
      lgd: newLGD,
      isDefaulted,
      provisionGBP: newProvision,
    });

    const updatedFacility = {
      ...targetFacility,
      pd: newPD,
      lgd: newLGD,
      dpd: newDPD,
      isDefaulted,
      ifrs9Stage: stagingResult.stage,
      sicrTriggered: stagingResult.sicrTriggered,
      sicrReason: evt.actionPayload.sicrReason || targetFacility.sicrReason,
      ecl12mGBP: newECL12m,
      eclLifetimeGBP: newECLLifetime,
      provisionGBP: newProvision,
      rwaGBP: capitalResult.finalRwaGBP,
    };

    updateFacility(updatedFacility);

    // Compute updated portfolio after impact
    const updatedFacilitiesList = facilities.map((f) => (f.id === updatedFacility.id ? updatedFacility : f));
    const afterTotals = getPortfolioTotals(updatedFacilitiesList);

    setSelectedEvent(evt);
    setActiveImpact({
      facilityBefore: targetFacility,
      facilityAfter: updatedFacility,
      portfolioBefore: beforeTotals,
      portfolioAfter: afterTotals,
      downstream: evt.downstreamImpacts,
    });
  };

  const formatGBP = (val: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="p-5 bg-surface-raised border border-hairline rounded-2xl space-y-4 font-mono text-xs select-none">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-bold text-ink uppercase">// REAL-TIME EVENT INBOX & OPERATIONAL FEED</span>
        </div>

        <button
          onClick={resetPortfolio}
          className="px-2.5 py-1 rounded bg-surface-sunken hover:bg-hairline border border-hairline-faint text-ink-muted text-[10px] font-bold uppercase transition-all cursor-pointer"
        >
          Reset Simulation
        </button>
      </div>

      {/* EVENT SELECTION BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PREBUILT_EVENTS.map((evt) => (
          <button
            key={evt.id}
            onClick={() => handleExecuteEvent(evt)}
            className="p-3 rounded-xl bg-surface-sunken hover:bg-accent/15 border border-hairline-faint hover:border-accent/40 text-left transition-all cursor-pointer space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-bold uppercase">{evt.category}</span>
              <span className="text-[9px] text-ink-faint">{evt.facilityNumber}</span>
            </div>
            <div className="font-bold text-ink text-xs group-hover:text-accent transition-colors truncate">{evt.title}</div>
            <p className="text-ink-muted font-sans text-[11px] line-clamp-2">{evt.description}</p>
          </button>
        ))}
      </div>

      {/* BEFORE / AFTER IMPACT PANEL */}
      {activeImpact && selectedEvent && (
        <div className="p-4 rounded-xl bg-surface-sunken border border-accent/30 space-y-3 mt-4">
          <div className="flex items-center justify-between border-b border-hairline-faint pb-2">
            <span className="font-bold text-accent uppercase">// SIMULATION IMPACT ANALYSIS: {selectedEvent.facilityNumber}</span>
            <span className="text-[10px] text-signal font-bold uppercase">DETERMINISTIC TS ENGINE EXECUTED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
            {/* FACILITY STAGE CHANGE */}
            <div className="p-2.5 rounded bg-surface-raised border border-hairline-faint space-y-1">
              <span className="text-ink-faint uppercase text-[9px]">IFRS 9 STAGING</span>
              <div className="flex items-center gap-2 font-bold text-sm">
                <span className="text-ink-muted">Stage {activeImpact.facilityBefore.ifrs9Stage}</span>
                <span className="text-accent">→</span>
                <span className="text-accent font-extrabold">Stage {activeImpact.facilityAfter.ifrs9Stage}</span>
              </div>
            </div>

            {/* FACILITY ECL IMPACT */}
            <div className="p-2.5 rounded bg-surface-raised border border-hairline-faint space-y-1">
              <span className="text-ink-faint uppercase text-[9px]">CARRYING PROVISION</span>
              <div className="flex items-center gap-2 font-bold text-sm">
                <span className="text-ink-muted">{formatGBP(activeImpact.facilityBefore.provisionGBP)}</span>
                <span className="text-accent">→</span>
                <span className="text-accent font-extrabold">{formatGBP(activeImpact.facilityAfter.provisionGBP)}</span>
              </div>
            </div>

            {/* ATTRIBUTABLE PILLAR 1 CAPITAL IMPACT */}
            <div className="p-2.5 rounded bg-surface-raised border border-hairline-faint space-y-1">
              <span className="text-ink-faint uppercase text-[9px]">PILLAR 1 CAPITAL REQ (8%)</span>
              <div className="flex items-center gap-2 font-bold text-sm">
                <span className="text-ink-muted">{formatGBP(activeImpact.portfolioBefore.attributablePillar1CapitalGBP)}</span>
                <span className="text-accent">→</span>
                <span className="text-signal font-extrabold">{formatGBP(activeImpact.portfolioAfter.attributablePillar1CapitalGBP)}</span>
              </div>
            </div>
          </div>

          {/* DOWNSTREAM CONSEQUENCES */}
          <div className="pt-2 border-t border-hairline-faint space-y-1 text-[11px]">
            <div className="text-[10px] text-ink-faint font-bold uppercase">// DOWNSTREAM TRACEABILITY CONSEQUENCES:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-ink-muted font-sans text-[11px]">
              <div><strong className="text-ink">Reporting Return:</strong> {activeImpact.downstream.reporting}</div>
              <div><strong className="text-ink">Data Lineage:</strong> {activeImpact.downstream.lineage}</div>
              <div><strong className="text-ink">BA Requirement:</strong> {activeImpact.downstream.baRequirement}</div>
              <div><strong className="text-ink">UAT Case:</strong> {activeImpact.downstream.uatCase}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
