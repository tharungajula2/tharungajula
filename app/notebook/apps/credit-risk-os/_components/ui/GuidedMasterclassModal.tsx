"use client";

import { useState } from 'react';
import { useCreditRiskOS, NavSection } from '../../_state/creditRiskOSContext';
import { X, ChevronLeft, ChevronRight, CheckCircle2, GraduationCap } from 'lucide-react';

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
    whatIsHappening: 'You are looking at Renforge Bank plc, a regulated UK commercial bank with £3.85B in balance sheet assets.',
    whyItMatters: 'Unlike commercial companies, loans issued to borrowers are bank ASSETS (money owed to the bank), while customer deposits are LIABILITIES.',
    whoOwnsThis: 'Chief Financial Officer (CFO) & Chief Risk Officer (CRO).',
    whatToLookAt: 'The Bank Command KPIs: Total Portfolio EAD (£290.75M), Carrying Provision (£10.74M), and Whole-Bank CET1 Capital Ratio (15.00%).',
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
    whatToLookAt: 'The Customer 360 Inspector: Limit (£35.00M), Drawn (£30.00M), Undrawn (£5.00M), and Internal Rating (BB).',
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
    whatIsHappening: 'Renforge Bank plc assigns internal rating BB to Midland Retail Properties plc, corresponding to a 1-year PD of 6.50%.',
    whyItMatters: 'PD measures the statistical likelihood that a borrower defaults over a 12-month horizon.',
    whoOwnsThis: 'Model Development & Credit Scorecard Quantitative Team.',
    whatToLookAt: 'The Rating Distribution chart: BB carries higher risk than investment-grade (AAA-BBB) exposures.',
    baAngle: 'BAs must distinguish between Point-in-Time (PIT) PDs (used for IFRS 9 accounting) and Through-the-Cycle (TTC) PDs (used for capital).',
    remember: 'Rating and PD are tightly linked; rating downgrades trigger PD increases.',
  },
  {
    stepNumber: 5,
    title: 'Loss Given Default (LGD) & Collateral',
    section: 'credit-risk',
    whatIsHappening: 'Midland Retail Properties plc holds commercial property collateral valued at £38M. LGD is set to 40.0%.',
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
    whatToLookAt: 'Drawn £30M + (75% CCF × £5M Undrawn) = £33.75M EAD.',
    baAngle: 'BAs write functional specs for Credit Conversion Factor (CCF) application by product type.',
    remember: 'EAD accounts for potential drawdown of off-balance sheet undrawn limits.',
  },
  {
    stepNumber: 7,
    title: '1-Year Expected Loss (EL)',
    section: 'credit-risk',
    facilityId: 'FAC-2025-003',
    whatIsHappening: 'Expected Loss calculation: EL = PD × LGD × EAD = 6.5% × 40% × £33.75M = £877,500.',
    whyItMatters: 'EL provides the baseline expected credit loss cost over a 12-month horizon.',
    whoOwnsThis: 'Portfolio Risk Analytics & Credit Oversight.',
    whatToLookAt: 'The baseline expected loss figure for the facility before multi-year IFRS 9 staging.',
    baAngle: 'BAs implement deterministic mathematical calculation engines with audit trails.',
    remember: '1-Year EL = PD × LGD × EAD.',
  },
  {
    stepNumber: 8,
    title: 'Credit Risk Monitoring & Early Warning',
    section: 'customers',
    facilityId: 'FAC-2025-003',
    whatIsHappening: 'Midland Retail Properties plc has reached 42 Days Past Due (DPD) and breached LTV covenants.',
    whyItMatters: 'Early warning indicators allow credit officers to intervene before default occurs.',
    whoOwnsThis: 'Specialist Debt Recovery & Watchlist Management Committee.',
    whatToLookAt: 'The 42 DPD delinquency counter and active Watchlist status flag.',
    baAngle: 'BAs write automated rules for watchlist ingestion and daily delinquency tracking.',
    remember: 'Delinquency and covenant breaches trigger early warning governance.',
  },
  {
    stepNumber: 9,
    title: 'Significant Increase in Credit Risk (SICR)',
    section: 'ifrs9',
    facilityId: 'FAC-2025-003',
    whatIsHappening: 'Evaluating SICR: Relative PD increased >3.0x vs origination and DPD exceeded 30 days.',
    whyItMatters: 'SICR dictates whether a loan transitions from Stage 1 (12M ECL) to Stage 2 (Lifetime ECL).',
    whoOwnsThis: 'IFRS 9 Impairment Governance & Accounting Policy.',
    whatToLookAt: 'SICR Trigger Assessment Reason in the IFRS 9 Inspector.',
    baAngle: 'CRITICAL BA ANGLE: 30 DPD is a rebuttable backstop/presumption, NOT the entire Stage 2 definition!',
    remember: 'SICR compares current credit risk against origination baseline.',
  },
  {
    stepNumber: 10,
    title: 'IFRS 9 Three-Stage Classification',
    section: 'ifrs9',
    whatIsHappening: 'Loans are classified into Stage 1 (Performing), Stage 2 (SICR), or Stage 3 (Credit-impaired/default).',
    whyItMatters: 'Stage classification determines whether provisions are based on 12-month or lifetime loss expectations.',
    whoOwnsThis: 'Finance Impairment Desk & External Audit.',
    whatToLookAt: 'Stage 1 (£373.7K provision), Stage 2 (£5.04M provision), Stage 3 (£5.20M provision).',
    baAngle: 'BAs build automated decision tables for staging precedence logic.',
    remember: 'Stage 1 = 12M ECL; Stage 2 = Lifetime ECL; Stage 3 = Lifetime ECL + Credit-impaired.',
  },
  {
    stepNumber: 11,
    title: 'Multi-Year Lifetime ECL Term Structure',
    section: 'ifrs9',
    facilityId: 'FAC-2025-003',
    whatIsHappening: 'Computing 5-year lifetime ECL by summing discounted yearly marginal losses: £2,632,500.',
    whyItMatters: 'Stage 2 requires lifetime loss forecasting using marginal PDs, survival S(t), and discount factors.',
    whoOwnsThis: 'IFRS 9 Quantitative Modelling & Finance.',
    whatToLookAt: 'The 5-Year Term Structure table: Marginal PD growth, survival probability S(t), and discount factors.',
    baAngle: 'BAs verify discount factor calculations using Effective Interest Rates (EIR).',
    remember: 'Lifetime ECL sums discounted marginal losses across remaining contract life.',
  },
  {
    stepNumber: 12,
    title: 'Accounting (ECL) vs Prudential Capital (RWA)',
    section: 'capital',
    whatIsHappening: 'Comparing IFRS 9 ECL against Basel III Regulatory Capital (RWA).',
    whyItMatters: 'CRITICAL CONCEPT: ECL ≠ RWA. Accounting asks expected loss for financial provisions; Capital asks solvency under unexpected loss.',
    whoOwnsThis: 'Finance (ECL) vs Regulatory Capital / Prudential Policy (RWA).',
    whatToLookAt: 'Carrying Provision (£2.63M) vs Attributable Pillar 1 Capital (£2.56M).',
    baAngle: 'BAs must prevent confusing accounting provision requirements with regulatory capital rules.',
    remember: 'ECL = Carrying Provision (Finance); RWA = Solvency Capital Cushion (Prudential Regulatory).',
  },
  {
    stepNumber: 13,
    title: 'Standardised Approach (SA) Risk Weighting',
    section: 'capital',
    facilityId: 'FAC-2025-003',
    whatIsHappening: 'Under Standardised Approach, RWA = EAD × Risk Weight = £33.75M × 95% = £32,062,500.',
    whyItMatters: 'Standardised approach uses regulator-prescribed static risk weights based on asset class and rating.',
    whoOwnsThis: 'Regulatory Capital Reporting & PRA Compliance.',
    whatToLookAt: 'Standardised RWA column (£32.06M) and 95% risk weight.',
    baAngle: 'BAs map regulatory risk weight tables based on counterparty classification.',
    remember: 'Standardised RWA relies on fixed regulatory risk weight percentages.',
  },
  {
    stepNumber: 14,
    title: 'Internal Ratings-Based (IRB) Approach',
    section: 'capital',
    facilityId: 'FAC-2025-003',
    whatIsHappening: 'Advanced IRB calculates RWA using internal PD, LGD, EAD, and regulatory correlation formulas.',
    whyItMatters: 'IRB models allow sophisticated banks to hold capital matching their internal risk estimates.',
    whoOwnsThis: 'IRB Model Validation & PRA Authorization Team.',
    whatToLookAt: 'IRB RWA (£28.45M) vs Standardised RWA (£32.06M).',
    baAngle: 'BAs document IRB model governance requirements and PRA supervisory statements (SS4/24).',
    remember: 'Internal rating permissions do not automatically mean IRB capital approval.',
  },
  {
    stepNumber: 15,
    title: 'Basel 3.1 Future-State Output Floor',
    section: 'capital',
    whatIsHappening: 'Basel 3.1 Output Floor caps IRB benefits at 72.5% of Standardised RWA: max(IRB RWA, 72.5% × SA RWA).',
    whyItMatters: 'Prevents IRB model risk from undercapitalizing banks relative to standardized benchmarks.',
    whoOwnsThis: 'Prudential Policy & Basel 3.1 Implementation Team.',
    whatToLookAt: 'Output Floor Banner: UK Go-Live 1 Jan 2027; 72.5% End-State Floor 1 Jan 2030.',
    baAngle: 'BAs build side-by-side calculation logic for floor transition periods.',
    remember: 'Basel 3.1 Output Floor = 72.5% of Standardised RWA floor for IRB models.',
  },
  {
    stepNumber: 16,
    title: 'Treasury & Liquidity (LCR, NSFR, FTP)',
    section: 'treasury',
    whatIsHappening: 'Inspecting Liquidity Coverage Ratio (LCR 140.6%) and Net Stable Funding Ratio (NSFR 116.7%).',
    whyItMatters: 'CRITICAL CONCEPT: Liquidity ≠ Solvency. A bank can be capital solvent but fail due to liquidity cash run.',
    whoOwnsThis: 'Treasury Desk & Asset Liability Management (ALM).',
    whatToLookAt: 'Regulatory Minimum 100% vs Renforge Internal Targets (LCR 120%, NSFR 110%) and FTP rate (6.50%).',
    baAngle: 'BAs build FTP decomposition logic to attribute funding costs to lending units.',
    remember: 'LCR protects 30-day cash outflow; NSFR matches 1-year stable funding.',
  },
  {
    stepNumber: 17,
    title: 'Regulatory Reporting Control Room',
    section: 'reporting',
    whatIsHappening: 'Aggregating COREP (Capital Adequacy) and FINREP (Financial Reporting) returns for PRA filing.',
    whyItMatters: 'Regulated banks must submit verified, reconciled returns to the PRA under strict statutory deadlines.',
    whoOwnsThis: 'Regulatory Reporting Desk & Financial Controller.',
    whatToLookAt: 'Cycle Status: Q3 2026 PRA Filing (As at 31 July 2026) and COREP C 07.00/09.01.',
    baAngle: 'BAs define automated validation rules and report-to-ledger reconciliation controls.',
    remember: 'COREP = Prudential Capital Returns; FINREP = Financial Reporting Returns.',
  },
  {
    stepNumber: 18,
    title: 'BCBS 239 Risk Data Lineage',
    section: 'data',
    whatIsHappening: 'Tracing data lineage from Core Banking (CBS) through Risk Warehouse, SICR, ECL, GL, to FINREP/COREP.',
    whyItMatters: 'BCBS 239 mandates complete auditability and lineage for all Critical Data Elements (CDEs).',
    whoOwnsThis: 'Chief Data Officer (CDO) & Data Governance Office.',
    whatToLookAt: 'The 6-stage end-to-end data lineage pipeline card.',
    baAngle: 'BAs produce data dictionaries and source-to-target lineage specifications.',
    remember: 'BCBS 239 requires end-to-end data lineage and CDE auditability.',
  },
  {
    stepNumber: 19,
    title: 'Become the Business Analyst — Delivery Layer',
    section: 'change',
    whatIsHappening: 'Switching perspective: Understanding how a Credit Risk BA translates regulatory rules into delivered software.',
    whyItMatters: 'The BA acts as the critical translation and governance bridge between Business, Risk, Finance, and Tech.',
    whoOwnsThis: 'Lead Credit Risk Business Analyst.',
    whatToLookAt: 'The Change Management Traceability Matrix header and 8 connected artefacts.',
    baAngle: 'The BA coordinates meaning and evidence across all 3 lines of defence.',
    remember: 'BAs ensure regulatory rules are implemented correctly without loss of business intent.',
  },
  {
    stepNumber: 20,
    title: 'Operate One Change Traceability Chain',
    section: 'change',
    whatIsHappening: 'Tracing the SICR Watchlist Automation Change: Driver → REQ → Business Rules → User Story → UAT → Release.',
    whyItMatters: 'Demonstrates 100% traceability from regulatory mandate to tested production code.',
    whoOwnsThis: 'BA, Product Owner, and UAT Lead.',
    whatToLookAt: 'The 8 sequential traceability steps (DRV-2025-01 down to REL-2025.4).',
    baAngle: 'BAs maintain Requirements Traceability Matrices (RTM) throughout project delivery.',
    remember: 'Change delivery requires end-to-end traceability from driver to signed-off evidence.',
  },
  {
    stepNumber: 21,
    title: 'Investigate with SQL',
    section: 'data',
    whatIsHappening: 'Using SQL queries to audit data quality, verify staging rules, and reconcile exceptions.',
    whyItMatters: 'SQL enables BAs to answer complex business questions with empirical database evidence.',
    whoOwnsThis: 'Credit Risk BA & Data Analytics Lead.',
    whatToLookAt: 'Data Quality & Lineage pipeline rules.',
    baAngle: 'BAs use SQL JOINs, CASE statements, and CTEs to investigate reconciliation breaks.',
    remember: 'SQL provides empirical evidence to validate business requirements and data quality.',
  },
  {
    stepNumber: 22,
    title: 'Stress Test the Bank',
    section: 'simulation-lab',
    whatIsHappening: 'Executing a severe economic downturn scenario shock in the Simulation Lab.',
    whyItMatters: 'Stress testing proves balance sheet resilience under severe recession scenarios (GDP -4.0%, property -25%).',
    whoOwnsThis: 'Macroeconomic Stress Testing & ICAAP Risk Team.',
    whatToLookAt: 'The Real-Time Portfolio Impact Summary & Operational Event Simulator Feed.',
    baAngle: 'BAs build scenario stress engines with deterministic calculation rules.',
    remember: 'Stress testing measures balance sheet impact under adverse macroeconomic shocks.',
  },
  {
    stepNumber: 23,
    title: 'Masterclass Complete — 10-Point Cheat Sheet',
    section: 'bank',
    whatIsHappening: 'Congratulations! You have completed the Guided End-to-End Masterclass for Renforge Credit Risk OS.',
    whyItMatters: 'You now possess a complete architectural understanding of UK bank credit risk operations.',
    whoOwnsThis: 'You — Certified Credit Risk OS Practitioner.',
    whatToLookAt: 'The Bank Command Centre overview.',
    baAngle: 'Review the 10-Point Practitioner Cheat Sheet below.',
    remember: '1. Underwriting ≠ Accounting | 2. ECL ≠ RWA | 3. Stage 2 ≠ Default | 4. 30 DPD ≠ Complete SICR | 5. Rating ≠ Automatic IRB | 6. Liquidity ≠ Capital | 7. Correct Number + No Lineage = Weak Control | 8. BA ≠ Model Owner | 9. Build ≠ Delivery until Signed-Off | 10. Simulation Date = 31 July 2026.',
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
      const nextIndex = currentDemoStepIndex + 1;
      const nextStep = DEMO_STEPS[nextIndex];
      setCurrentDemoStepIndex(nextIndex);
      setActiveSection(nextStep.section);
      if (nextStep.facilityId) {
        setSelectedFacilityId(nextStep.facilityId);
      }
    }
  };

  const handlePrev = () => {
    if (currentDemoStepIndex > 0) {
      const prevIndex = currentDemoStepIndex - 1;
      const prevStep = DEMO_STEPS[prevIndex];
      setCurrentDemoStepIndex(prevIndex);
      setActiveSection(prevStep.section);
      if (prevStep.facilityId) {
        setSelectedFacilityId(prevStep.facilityId);
      }
    }
  };

  return (
    <div className="fixed inset-x-4 bottom-12 md:bottom-14 md:right-8 md:left-auto md:w-[480px] z-50 select-none animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-surface-raised/95 backdrop-blur-2xl border-2 border-accent/60 rounded-2xl shadow-2xl p-5 text-ink font-mono text-xs space-y-4 overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-signal to-accent" />

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-hairline-faint pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-accent" />
            <span className="font-bold text-accent uppercase tracking-wider">
              GUIDED MASTERCLASS ({currentStep.stepNumber}/{totalSteps})
            </span>
          </div>

          <button
            onClick={() => setIsGuidedDemoOpen(false)}
            className="p-1 rounded-lg hover:bg-surface-sunken text-ink-muted hover:text-ink transition-colors cursor-pointer"
            title="Exit Demo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP TITLE & PROGRESS */}
        <div>
          <h2 className="text-base font-bold text-ink uppercase mb-1">{currentStep.title}</h2>
          <div className="w-full bg-surface-sunken h-1.5 rounded-full overflow-hidden border border-hairline-faint">
            <div
              className="bg-accent h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentStep.stepNumber / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        <div className="space-y-2.5 max-h-[280px] overflow-y-auto no-scrollbar pr-1 font-sans text-xs">
          <div className="p-2.5 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1">
            <span className="font-mono text-[10px] text-accent font-bold uppercase block">// WHAT IS HAPPENING?</span>
            <p className="text-ink text-xs leading-relaxed">{currentStep.whatIsHappening}</p>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-sunken border border-hairline-faint space-y-1">
            <span className="font-mono text-[10px] text-signal font-bold uppercase block">// WHY IT MATTERS</span>
            <p className="text-ink-muted text-xs leading-relaxed">{currentStep.whyItMatters}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-surface-sunken border border-hairline-faint">
              <span className="text-[9px] text-ink-faint uppercase block font-bold">OWNER:</span>
              <span className="text-ink font-semibold">{currentStep.whoOwnsThis}</span>
            </div>
            <div className="p-2 rounded-lg bg-surface-sunken border border-hairline-faint">
              <span className="text-[9px] text-accent uppercase block font-bold">BA ANGLE:</span>
              <span className="text-ink font-semibold">{currentStep.baAngle}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/30 font-mono text-[11px] text-accent space-y-0.5">
            <span className="font-bold uppercase text-[9px] block">★ KEY TAKEAWAY:</span>
            <span>{currentStep.remember}</span>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex items-center justify-between pt-3 border-t border-hairline-faint font-mono text-xs">
          <button
            onClick={handlePrev}
            disabled={currentDemoStepIndex === 0}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-sunken hover:bg-surface-raised disabled:opacity-30 text-ink-muted hover:text-ink border border-hairline-faint font-bold uppercase transition-colors cursor-pointer disabled:cursor-not-allowed text-[11px]"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </button>

          <button
            onClick={() => setIsGuidedDemoOpen(false)}
            className="text-[10px] text-ink-faint hover:text-ink underline uppercase cursor-pointer"
          >
            EXIT DEMO
          </button>

          {currentDemoStepIndex < totalSteps - 1 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-accent text-surface font-bold uppercase hover:opacity-90 transition-all cursor-pointer text-[11px]"
            >
              <span>NEXT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setIsGuidedDemoOpen(false)}
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-signal text-surface font-bold uppercase hover:opacity-90 transition-all cursor-pointer text-[11px]"
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
