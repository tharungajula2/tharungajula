import { NavSection } from '../_state/creditRiskOSContext';

export interface LearnCard {
  id: string;
  title: string;
  section: NavSection;
  category: 'Foundations' | 'Credit Lifecycle' | 'PD Modelling' | 'LGD Modelling' | 'EAD Modelling' | 'IFRS 9' | 'Capital' | 'Treasury' | 'Reporting/Data' | 'BA Delivery';
  whatItIs: string;
  whyItExists: string;
  formulaMechanism?: string;
  variables?: { symbol: string; meaning: string }[];
  workedExample?: string;
  whoOwnsIt: string;
  baAngle: string;
  commonTraps: string;
  relatedConcepts: { label: string; section: NavSection }[];
  sourceBasis?: string;
}

export const LEARN_CARDS: LearnCard[] = [
  {
    id: 'lrn-pd',
    title: 'Probability of Default (PD)',
    section: 'credit-risk',
    category: 'PD Modelling',
    whatItIs: 'The statistical probability that an obligor will experience a default event within a 12-month horizon.',
    whyItExists: 'Answers the fundamental credit question: What is the likelihood this borrower fails to meet contractual repayments?',
    formulaMechanism: 'PD = 1 / (1 + e^(-(β0 + β1*Leverage + β2*ICR + β3*Macro)))',
    variables: [
      { symbol: 'PD', meaning: 'Probability of Default (0.00% to 100.00%)' },
      { symbol: 'Leverage', meaning: 'Debt / EBITDA ratio' },
      { symbol: 'ICR', meaning: 'Interest Coverage Ratio (EBIT / Interest Expense)' },
    ],
    workedExample: 'Midland Retail Properties plc has internal rating BB, yielding a 1-year PIT PD of 6.50%.',
    whoOwnsIt: 'Model Development & Quantitative Risk Analytics.',
    baAngle: 'BAs map financial statement fields to rating scorecard inputs and test rating migration rules.',
    commonTraps: 'Confusing Point-in-Time (PIT) PD used for IFRS 9 with Through-the-Cycle (TTC) PD used for Basel capital.',
    relatedConcepts: [
      { label: 'IFRS 9 Staging', section: 'ifrs9' },
      { label: 'Basel IRB RWA', section: 'capital' },
    ],
    sourceBasis: 'PRA SS4/24 Credit Risk IRB & IFRS 9 B5.5.17',
  },
  {
    id: 'lrn-lgd',
    title: 'Loss Given Default (LGD)',
    section: 'credit-risk',
    category: 'LGD Modelling',
    whatItIs: 'The economic loss percentage incurred if the borrower defaults, after collateral liquidation and recovery costs.',
    whyItExists: 'Answers the loss severity question: If the obligor defaults, what percentage of the loan will we lose?',
    formulaMechanism: 'LGD = 1 - (Net Realised Collateral Recoveries / EAD)',
    variables: [
      { symbol: 'LGD', meaning: 'Loss Given Default (0.0% to 100.0%)' },
      { symbol: 'Net Recoveries', meaning: 'Collateral liquidation proceeds minus legal and administrative recovery costs' },
    ],
    workedExample: 'Midland Retail Properties plc commercial property collateral (£38M) with 25% haircut results in LGD = 40.0%.',
    whoOwnsIt: 'Collateral Management Desk & Credit Policy.',
    baAngle: 'BAs specify collateral haircut rules, valuation update frequency, and seniority ordering in database schemas.',
    commonTraps: 'Failing to apply legal recovery cost haircuts or using un-discounted future recovery cash flows.',
    relatedConcepts: [
      { label: 'EAD & CCF', section: 'credit-risk' },
      { label: 'Capital & RWA', section: 'capital' },
    ],
    sourceBasis: 'PRA SS4/24 Chapter 5 (LGD Estimation)',
  },
  {
    id: 'lrn-ead',
    title: 'Exposure at Default (EAD) & CCF',
    section: 'credit-risk',
    category: 'EAD Modelling',
    whatItIs: 'The total expected gross balance sheet exposure at the moment default occurs.',
    whyItExists: 'Answers the total exposure question: How much money will the borrower owe us when default happens?',
    formulaMechanism: 'EAD = Drawn + (CCF × Undrawn)',
    variables: [
      { symbol: 'Drawn', meaning: 'Current outstanding loan balance in GBP' },
      { symbol: 'CCF', meaning: 'Credit Conversion Factor (e.g. 0.50, 0.75, 1.00)' },
      { symbol: 'Undrawn', meaning: 'Sanctioned limit minus drawn balance' },
    ],
    workedExample: 'Midland Retail Properties: Drawn £30M + (75% CCF × £5M Undrawn) = £33.75M EAD.',
    whoOwnsIt: 'EAD Analytics & Exposure Control.',
    baAngle: 'BAs write logic to select CCFs based on product type (e.g. 100% for overdrafts, 50% for term loan undrawn).',
    commonTraps: 'Assuming undrawn commitments are zero risk; borrowers in distress draw down commitments rapidly.',
    relatedConcepts: [
      { label: 'Customers 360', section: 'customers' },
      { label: 'Capital & RWA', section: 'capital' },
    ],
    sourceBasis: 'PRA Rulebook (Credit Risk Standardised & IRB Articles)',
  },
  {
    id: 'lrn-sicr',
    title: 'Significant Increase in Credit Risk (SICR)',
    section: 'ifrs9',
    category: 'IFRS 9',
    whatItIs: 'The IFRS 9 criteria determining when a financial asset moves from Stage 1 (12M ECL) to Stage 2 (Lifetime ECL).',
    whyItExists: 'Answers the accounting trigger question: Has credit risk deteriorated significantly since initial origination?',
    formulaMechanism: 'SICR = (Current_PD / Origination_PD >= 3.0x) OR (DPD >= 30) OR (Rating Downgrade >= 2 Notches) OR Watchlist',
    variables: [
      { symbol: 'Current_PD', meaning: 'Latest Point-in-Time 1-year PD' },
      { symbol: 'Origination_PD', meaning: 'PD established when loan was originally booked' },
    ],
    workedExample: 'Midland Retail Properties PD increased from 1.8% to 6.5% (3.6x ratio > 3.0x threshold), triggering Stage 2.',
    whoOwnsIt: 'IFRS 9 Impairment Governance Committee & Finance.',
    baAngle: 'CRITICAL: 30 DPD is a rebuttable backstop/presumption, NOT the entire definition of Stage 2.',
    commonTraps: 'Believing 30 DPD is the only Stage 2 trigger; relative PD ratio breaches occur long before 30 DPD.',
    relatedConcepts: [
      { label: 'IFRS 9 Staging', section: 'ifrs9' },
      { label: 'BA Delivery & Change', section: 'change' },
    ],
    sourceBasis: 'IFRS 9 Standard Paragraphs 5.5.3 - 5.5.11',
  },
  {
    id: 'lrn-output-floor',
    title: 'Basel 3.1 Output Floor (72.5%)',
    section: 'capital',
    category: 'Capital',
    whatItIs: 'A regulatory cap restricting the capital reduction achievable through internal IRB models relative to Standardised RWA.',
    whyItExists: 'Answers the regulatory solvency question: Are internal IRB models producing dangerously low capital requirements?',
    formulaMechanism: 'Final_RWA = max(IRB_RWA, 72.5% × Standardised_RWA)',
    variables: [
      { symbol: 'IRB_RWA', meaning: 'Risk-weighted assets computed via internal rating models' },
      { symbol: 'Standardised_RWA', meaning: 'Risk-weighted assets computed via standard regulatory lookup tables' },
    ],
    workedExample: 'If Standardised RWA = £32.06M, Output Floor = 72.5% × £32.06M = £23.24M. If IRB RWA = £28.45M, Final RWA = £28.45M.',
    whoOwnsIt: 'Prudential Capital Policy & PRA Regulatory Reporting.',
    baAngle: 'BAs build dual-calculation pipelines calculating both SA and IRB RWAs for every facility.',
    commonTraps: 'Assuming the 72.5% floor is fully operative today; UK implementation starts Jan 2027 with a phased transition to Jan 2030.',
    relatedConcepts: [
      { label: 'Capital & RWA', section: 'capital' },
      { label: 'UK Regulation', section: 'regulation' },
    ],
    sourceBasis: 'PRA Policy Statement PS1/26 (Basel 3.1 Implementation)',
  },
  {
    id: 'lrn-lcr',
    title: 'Liquidity Coverage Ratio (LCR)',
    section: 'treasury',
    category: 'Treasury',
    whatItIs: 'The ratio of High-Quality Liquid Assets (HQLA) to total net cash outflows over a 30-day severe stress period.',
    whyItExists: 'Answers the 30-day liquidity question: Can the bank survive a severe 30-day bank run without central bank emergency aid?',
    formulaMechanism: 'LCR = (HQLA Buffer / Total Net 30-Day Outflows) × 100%',
    variables: [
      { symbol: 'HQLA', meaning: 'Cash, central bank reserves, and unencumbered sovereign bonds' },
      { symbol: 'Net Outflows', meaning: 'Stressed 30-day deposit run-offs minus contracted inflows' },
    ],
    workedExample: 'Renforge Bank plc holds £450M HQLA against £320M net outflows, achieving LCR = 140.6% (Regulatory minimum: 100%).',
    whoOwnsIt: 'Treasury Desk & Asset Liability Committee (ALCO).',
    baAngle: 'BAs distinguish statutory regulatory minimum (100%) from internal management risk appetite targets (e.g. 120%).',
    commonTraps: 'Confusing liquidity (cash availability) with solvency (capital adequacy). A bank can be solvent but suffer liquidity collapse.',
    relatedConcepts: [
      { label: 'Treasury & LCR', section: 'treasury' },
      { label: 'Bank Command', section: 'bank' },
    ],
    sourceBasis: 'PRA Rulebook Liquidity Coverage Ratio Regulations',
  },
];
