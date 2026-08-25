"use client";

import { useState } from 'react';
import { useCreditRiskOS, NavSection } from '../../_state/creditRiskOSContext';
import { X, ChevronLeft, ChevronRight, CheckCircle2, Compass } from 'lucide-react';

export interface DemoStep {
  stepNumber: number;
  title: string;
  section: NavSection;
  facilityId?: string;
  whatIsHappening: string;
  whyItMatters: string;
  whoOwnsThis: string;
  whatToLookAt: string;
  baAngle: string;
  remember: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: 'What is a Bank Balance Sheet?',
    section: 'bank',
    whatIsHappening: 'You are inspecting Vanguard Commercial Bank India, a simulated commercial bank with ₹38,500 Cr in balance sheet assets.',
    whyItMatters: 'Unlike commercial companies, loans issued to borrowers are bank ASSETS (money owed to the bank), while customer deposits are LIABILITIES.',
    whoOwnsThis: 'Chief Financial Officer (CFO) & Chief Risk Officer (CRO).',
    whatToLookAt: 'The Bank Command KPIs: Total Portfolio EAD (₹2,887.5 Cr), Carrying Provision (₹114.5 Cr), and Whole-Bank CET1 Capital Ratio (15.00%).',
    baAngle: 'BAs must understand how facility-level data rolls up into whole-bank financial statements.',
    remember: 'A bank loan is a financial asset to the bank generating interest income.',
  },
  {
    stepNumber: 2,
    title: 'Meet the Borrower — Facility 360',
    section: 'customers',
    facilityId: 'FAC-2025-003',
    whatIsHappening: 'We are inspecting facility MID-CRE-4403 issued to Midland Retail Properties plc.',
    whyItMatters: 'Credit risk begins with obligors (borrowers) and their specific facility contracts (term loans, revolving credit, overdrafts).',
    whoOwnsThis: 'Relationship Manager (RM) & Corporate Underwriting.',
    whatToLookAt: 'The Customer 360 Inspector: Limit (₹350 Cr), Drawn (₹300 Cr), Undrawn (₹50 Cr), and Internal Rating (BB).',
    baAngle: 'BAs define the data dictionary attributes: Legal Entity Identifier (LEI), Obligor Group ID, Facility Limit, and Drawn Balance.',
    remember: 'Obligor = the legal borrower; Facility = the specific loan contract.',
  },
  {
    stepNumber: 3,
    title: 'Origination & Underwriting',
    section: 'customers',
    facilityId: 'FAC-2025-003',
    whatIsHappening: 'Before a loan is booked, underwriting evaluates financial statements, cash flow, debt service coverage, and property collateral valuation.',
    whyItMatters: 'Origination sets baseline risk parameters (origination rating, initial PD, sanctioned credit limits).',
    whoOwnsThis: 'First Line Credit Risk Underwriting & Sanctioning Committee.',
    whatToLookAt: 'Origination Date (2021-06-20) vs Maturity Date (2026-06-20) and Collateral Haircut (25%).',
    baAngle: 'BAs design source-to-target mappings between origination loan systems and central risk databases.',
    remember: 'Underwriting determines initial risk parameters that become the benchmark for future staging comparisons.',
  },
  {
    stepNumber: 4,
    title: 'Probability of Default (PD) & Internal Rating',
    section: 'credit-risk',
    whatIsHappening: 'Vanguard Commercial Bank India assigns internal rating BB to Midland Retail Properties plc, corresponding to a 1-year PD of 6.50%.',
    whyItMatters: 'PD measures the statistical likelihood that a borrower defaults over a 12-month horizon.',
    whoOwnsThis: 'Model Development & Credit Scorecard Quantitative Team.',
    whatToLookAt: 'The Rating Distribution chart: BB carries higher risk than investment-grade (AAA-BBB) exposures.',
    baAngle: 'BAs must distinguish between Point-in-Time (PIT) PDs (used for Ind AS 109 accounting) and Through-the-Cycle (TTC) PDs (used for capital).',
    remember: 'Rating and PD are tightly linked; rating downgrades trigger PD increases.',
  },
  {
    stepNumber: 5,
    title: 'Loss Given Default (LGD) & Collateral',
    section: 'credit-risk',
    whatIsHappening: 'Midland Retail Properties plc holds commercial property collateral valued at ₹380 Cr. LGD is set to 40.0%.',
    whyItMatters: 'LGD reflects the net economic loss proportion if default occurs, accounting for collateral haircut recoveries.',
    whoOwnsThis: 'Credit Risk Policy & Collateral Management Desk.',
    whatToLookAt: 'Weighted Average LGD (31.4%) across the portfolio and property haircut adjustments.',
    baAngle: 'BAs ensure collateral revaluation feeds update LGD values in automated batch runs.',
    remember: 'LGD measures severity of loss after collateral liquidation and recovery costs.',
  },
  {
    stepNumber: 6,
    title: 'Exposure at Default (EAD) & CCF',
    section: 'credit-risk',
    facilityId: 'FAC-2025-003',
    whatIsHappening: 'EAD is calculated deterministically: EAD = Drawn + (CCF × Undrawn).',
    whyItMatters: 'For revolving credit, borrowers draw down undrawn commitments as financial distress rises.',
    whoOwnsThis: 'Credit Risk Analytics & EAD Modelling.',
    whatToLookAt: 'Drawn ₹300 Cr + (75% CCF × ₹50 Cr Undrawn) = ₹337.5 Cr EAD.',
    baAngle: 'BAs write functional specs for Credit Conversion Factor (CCF) application by product type.',
    remember: 'EAD accounts for potential drawdown of off-balance sheet undrawn limits.',
  },
  {
    stepNumber: 7,
    title: '1-Year Expected Loss (EL)',
    section: 'credit-risk',
    facilityId: 'FAC-2025-003',
    whatIsHappening: 'Expected Loss calculation: EL = PD × LGD × EAD = 6.5% × 40% × ₹337.5 Cr = ₹8.77 Cr.',
    whyItMatters: 'EL provides the baseline expected credit loss cost over a 12-month horizon.',
    whoOwnsThis: 'Portfolio Risk Analytics & Credit Oversight.',
    whatToLookAt: 'The baseline expected loss figure for the facility before multi-year staging.',
    baAngle: 'BAs implement deterministic mathematical calculation engines with audit trails.',
    remember: '1-Year EL = PD × LGD × EAD.',
  },
  {
    stepNumber: 8,
    title: 'Ind AS 109 Staging & SICR Triggers',
    section: 'ifrs9',
    facilityId: 'FAC-2025-003',
    whatIsHappening: 'Midland Retail Properties plc triggers Stage 2 SICR due to 42 DPD (>30 DPD backstop) and a 3.6x relative PD ratio increase.',
    whyItMatters: 'Stage 2 forces the bank to recognize Lifetime ECL instead of 12-month ECL, creating an immediate P&L provision jump.',
    whoOwnsThis: 'Financial Accounting & Credit Risk Policy.',
    whatToLookAt: 'The SICR trigger badges and provision comparison (12m ECL: ₹8.77 Cr → Lifetime ECL: ₹26.32 Cr).',
    baAngle: 'BAs configure automated SICR rules combining DPD backstops, relative PD thresholds, and Watchlist flags.',
    remember: 'SICR forces a loan from 12-month ECL to Lifetime ECL provisioning.',
  },
  {
    stepNumber: 9,
    title: 'RBI Basel III/3.1 Regulatory Capital & Output Floor',
    section: 'capital',
    facilityId: 'FAC-2025-003',
    whatIsHappening: 'We evaluate Standardised RWA vs AIRB RWA and check the binding 72.5% Basel 3.1 aggregate Output Floor.',
    whyItMatters: 'Regulatory capital buffers absorb Unexpected Loss (UL) under a 99.9% confidence interval severe shock.',
    whoOwnsThis: 'Regulatory Capital Management & Financial Controller.',
    whatToLookAt: 'The 72.5% Output Floor constraint and Pillar 1 8% capital charge.',
    baAngle: 'BAs specify regulatory calculation engines implementing supervisory risk weight curves and output floors.',
    remember: 'Capital covers Unexpected Loss (UL); provisions cover Expected Loss (EL).',
  },
  {
    stepNumber: 10,
    title: 'Treasury FTP & Regulatory Reporting Filings',
    section: 'reporting',
    whatIsHappening: 'Risk parameters flow through BCBS 239 data lineage into mandatory COREP / FINREP supervisory filings.',
    whyItMatters: 'Data governance ensures supervisory filings reconcile to source loan contracts without audit gaps.',
    whoOwnsThis: 'Head of Regulatory Reporting & Data Governance Officer.',
    whatToLookAt: 'The COREP C 07.00 credit risk return and FINREP F 04.04 impairment schedules.',
    baAngle: 'BAs write end-to-end traceability specifications connecting source data to supervisory reporting lines.',
    remember: 'BCBS 239 guarantees complete data lineage from loan contract to regulatory return.',
  },
];

export default function GuidedMasterclassModal() {
  const {
    isGuidedDemoOpen,
    setIsGuidedDemoOpen,
    currentDemoStepIndex,
    setCurrentDemoStepIndex,
    setActiveSection,
    setSelectedFacilityId,
  } = useCreditRiskOS();

  if (!isGuidedDemoOpen) return null;

  const currentStep = DEMO_STEPS[currentDemoStepIndex] || DEMO_STEPS[0];
  const totalSteps = DEMO_STEPS.length;

  const handleNext = () => {
    if (currentDemoStepIndex < totalSteps - 1) {
      const nextIdx = currentDemoStepIndex + 1;
      const nextStep = DEMO_STEPS[nextIdx];
      setCurrentDemoStepIndex(nextIdx);
      setActiveSection(nextStep.section);
      if (nextStep.facilityId) {
        setSelectedFacilityId(nextStep.facilityId);
      }
    }
  };

  const handlePrev = () => {
    if (currentDemoStepIndex > 0) {
      const prevIdx = currentDemoStepIndex - 1;
      const prevStep = DEMO_STEPS[prevIdx];
      setCurrentDemoStepIndex(prevIdx);
      setActiveSection(prevStep.section);
      if (prevStep.facilityId) {
        setSelectedFacilityId(prevStep.facilityId);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none animate-in fade-in duration-200 text-slate-100">
      <div className="bg-[#0f172a] border border-cyan-500/40 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden font-sans p-6 space-y-4">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 animate-pulse" />
            <span>GUIDED TOUR • STEP {currentStep.stepNumber} OF {totalSteps}</span>
          </div>

          <button
            onClick={() => setIsGuidedDemoOpen(false)}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-400 transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            style={{ width: `${((currentDemoStepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* CONTENT */}
        <div className="space-y-3 font-sans text-xs">
          <h2 className="text-xl font-bold uppercase tracking-tight text-slate-100 font-mono">
            {currentStep.title}
          </h2>

          <div className="space-y-2 text-slate-300 leading-relaxed text-sm">
            <p><strong className="text-cyan-400">What is Happening:</strong> {currentStep.whatIsHappening}</p>
            <p><strong className="text-cyan-400">Why it Matters:</strong> {currentStep.whyItMatters}</p>
            <p><strong className="text-cyan-400">What to Look At:</strong> {currentStep.whatToLookAt}</p>
            <p><strong className="text-cyan-400">BA & Systems Angle:</strong> {currentStep.baAngle}</p>
          </div>

          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-300 space-y-0.5">
            <span className="font-bold uppercase text-[10px] block">★ KEY TAKEAWAY:</span>
            <span>{currentStep.remember}</span>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 font-mono text-xs">
          <button
            onClick={handlePrev}
            disabled={currentDemoStepIndex === 0}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 font-bold uppercase transition-colors cursor-pointer text-[11px]"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </button>

          <button
            onClick={() => setIsGuidedDemoOpen(false)}
            className="text-[10px] text-slate-500 hover:text-slate-300 underline uppercase cursor-pointer"
          >
            EXIT DEMO
          </button>

          {currentDemoStepIndex < totalSteps - 1 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold uppercase hover:bg-cyan-400 transition-all cursor-pointer text-[11px] shadow-md shadow-cyan-500/20"
            >
              <span>NEXT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setIsGuidedDemoOpen(false)}
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold uppercase hover:bg-emerald-400 transition-all cursor-pointer text-[11px]"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>FINISH</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
