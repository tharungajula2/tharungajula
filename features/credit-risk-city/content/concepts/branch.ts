import type { Concept } from '../types';

// District 3 · The Branch — borrower analysis, origination and decisions.
export const branch: Concept[] = [
  {
    id: 'five-cs', district: 'branch', layer: 'F', verified: false, anchor: 'branch-hand', prerequisites: [], links: ['repayment-capacity'],
    name: 'The five Cs of credit',
    oneLiner: 'Character, capacity, capital, collateral and conditions.',
    explanation:
      'Character: will they pay? (track record, conduct)\nCapacity: can they pay from cash flow?\nCapital: how much of their own money is at stake?\nCollateral: what can the bank fall back on?\nConditions: what is happening in the economy and their industry?',
    whyItMatters: 'Every credit memo and scorecard is organised around these five questions — and so are the data you will map.',
    misconception: '“Good collateral makes a good loan.” Collateral is the fallback; capacity repays the loan.',
  },
  {
    id: 'repayment-capacity', district: 'branch', layer: 'F', verified: false, anchor: 'branch-gauge', prerequisites: ['five-cs'], links: ['financial-ratios'],
    name: 'Repayment capacity (DSCR)',
    oneLiner: 'Loans are repaid from cash, so compare cash available with the debt service due.',
    explanation:
      'DSCR = cash available for debt service ÷ (scheduled interest + principal).\n\nAbove 1.0, operations cover the debt service; below 1.0, they do not. Lenders usually require a cushion (for example 1.2× or more), set in policy.',
    whyItMatters: 'It is the first test in almost every commercial credit policy and a common covenant.',
    misconception: '“Profitable means able to repay.” Profit is not cash — working capital, capex and timing matter.',
  },
  {
    id: 'financial-ratios', district: 'branch', layer: 'F', verified: false, anchor: 'branch-abacus', prerequisites: ['repayment-capacity'], links: ['covenants'],
    name: 'Leverage, coverage and liquidity ratios',
    oneLiner: 'Three questions: how much debt, how easily is interest covered, can short-term bills be paid?',
    explanation:
      'Leverage: total debt ÷ EBITDA (years of earnings to repay debt).\nInterest cover: EBITDA ÷ interest expense.\nLiquidity: current ratio = current assets ÷ current liabilities.\n\nDefinitions (what counts as debt or EBITDA) must be stated exactly — they vary by policy.',
    whyItMatters: 'Spreading financials into ratios is automated in origination systems; the BA writes the definitions.',
  },
  {
    id: 'credit-decision', district: 'branch', layer: 'F', verified: false, anchor: 'branch-stamp', prerequisites: ['five-cs'], links: ['segments'],
    name: 'Credit decisioning and authority',
    oneLiner: 'Policy rules first, then score or rating, then approval at the right authority level.',
    explanation:
      'Hard policy rules knock out ineligible applications. A scorecard (retail) or rating (corporate) measures risk. The decision is approve, decline or refer.\n\nWho may approve depends on amount and risk (delegated authority). Overrides of the model are allowed but must be recorded and monitored.',
    whyItMatters: 'Decision engines encode exactly this order; precedence bugs approve loans that policy forbids.',
  },
  {
    id: 'covenants', district: 'branch', layer: 'F', verified: false, anchor: 'branch-scroll', prerequisites: ['financial-ratios'], links: ['early-warning'],
    name: 'Covenants',
    oneLiner: 'Promises in the loan agreement that give the bank an early say when things start to slip.',
    explanation:
      'Financial covenants set limits (maximum debt ÷ EBITDA, minimum DSCR). Information covenants require timely financials. Negative covenants restrict actions such as pledging assets elsewhere.\n\nA breach gives the bank rights — waive, reprice, tighten terms or demand repayment — and is an early-warning signal. It is not automatically a regulatory default.',
    whyItMatters: 'Covenant monitoring needs test dates, definitions and data feeds that a BA specifies.',
  },
  {
    id: 'risk-based-pricing', district: 'branch', layer: 'W', verified: false, anchor: 'branch-scale', prerequisites: ['repayment-capacity'], links: ['net-interest-margin'],
    name: 'Risk-based pricing',
    oneLiner: 'Rate = funding cost + expected loss + capital charge + costs + margin.',
    explanation:
      'Each component is an annual rate on the exposure. A riskier borrower needs more to cover expected loss (PD × LGD) and ties up more capital, which must earn the bank’s hurdle return.',
    whyItMatters: 'Pricing engines and their data feeds are frequent BA projects.',
  },
];
