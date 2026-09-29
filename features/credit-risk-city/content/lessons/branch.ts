import type { Lesson } from './types';

export const branchLesson: Lesson = {
  district: 'branch',
  minutes: 6,
  verified: false,
  idea: 'A loan is repaid from cash, not from collateral — so the branch first asks "can they pay from their business?", then sizes, prices and protects the loan around that answer.',
  surface: `
<svg viewBox="0 0 440 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The credit process: application, appraisal, rating, structure and price, sanction, documentation and disbursement" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#1f2937">
<text x="220" y="20" text-anchor="middle" font-size="16" font-weight="700">From application to money out</text>
<rect x="6" y="40" width="64" height="50" rx="6" fill="#e9d5ff"/><text x="38" y="62" text-anchor="middle">Apply</text><text x="38" y="78" text-anchor="middle" font-size="10">KYC, docs</text>
<rect x="78" y="40" width="64" height="50" rx="6" fill="#bfdbfe"/><text x="110" y="62" text-anchor="middle">Appraise</text><text x="110" y="78" text-anchor="middle" font-size="10">5 Cs, ratios</text>
<rect x="150" y="40" width="64" height="50" rx="6" fill="#bfdbfe"/><text x="182" y="62" text-anchor="middle">Rate</text><text x="182" y="78" text-anchor="middle" font-size="10">score, grade</text>
<rect x="222" y="40" width="64" height="50" rx="6" fill="#fde68a"/><text x="254" y="62" text-anchor="middle">Structure</text><text x="254" y="78" text-anchor="middle" font-size="10">limit, price</text>
<rect x="294" y="40" width="64" height="50" rx="6" fill="#fecdd3"/><text x="326" y="62" text-anchor="middle">Sanction</text><text x="326" y="78" text-anchor="middle" font-size="10">authority</text>
<rect x="366" y="40" width="68" height="50" rx="6" fill="#bbf7d0"/><text x="400" y="62" text-anchor="middle">Disburse</text><text x="400" y="78" text-anchor="middle" font-size="10">docs, security</text>
<text x="220" y="116" text-anchor="middle" font-size="12" fill="#4b5563">Hard policy rules come first: fail one and the</text>
<text x="220" y="132" text-anchor="middle" font-size="12" fill="#4b5563">application stops, whatever the score.</text>
<text x="220" y="156" text-anchor="middle" font-size="12" fill="#4b5563">Every step leaves data for rating models,</text>
<text x="220" y="172" text-anchor="middle" font-size="12" fill="#4b5563">ECL and reporting.</text>
</g>
</svg>

## 1 — The five Cs

| C | Question | Evidence |
|---|---|---|
| Character | Will they pay? | Credit bureau report, track record, conduct |
| **Capacity** | **Can they pay from cash flow?** | **DSCR, cash flow statements** |
| Capital | How much of their own money is at stake? | Net worth, promoter contribution |
| Collateral | What does the bank fall back on? | Property, stock, receivables, guarantees |
| Conditions | What is happening around them? | Industry, economy, the loan's purpose |

## 2 — The ratios that decide it

| Ratio | Formula | Comfort zone (illustrative) |
|---|---|---|
| DSCR, debt service coverage | cash available ÷ (interest + principal due) | 1.25× or more |
| Leverage | total debt ÷ EBITDA | under about 3–4× |
| Interest cover | EBITDA ÷ interest | over about 2× |
| Current ratio | current assets ÷ current liabilities | 1.33 or more |
| TOL/TNW | total outside liabilities ÷ tangible net worth | under about 3–4 |

**Read it as:** DSCR below 1.0 means the business cannot meet this year's instalments from its own cash. Profit is not cash — working capital and capex can absorb it.

## 3 — Working-capital limits and drawing power

\`\`\`formula
MPBF = 75% × current assets − other current liabilities
Turnover method (smaller borrowers): limit = 20% of projected annual turnover
\`\`\`

\`\`\`formula
Drawing power (DP) = (stock − unpaid creditors) × (1 − margin) + receivables under 90 days × (1 − margin)
Available to draw = lower of (limit, DP)
\`\`\`

**Read it as:** the limit is the yearly ceiling; drawing power is what this month's stock and bills support. Margins of about 25% are common. The bank recomputes DP every month from the borrower's stock statement.

## 4 — The decision

| Step | Rule |
|---|---|
| Policy rules | Hard knock-outs first: age, sector, minimum bureau score |
| Score or rating | Retail: application scorecard. Corporate/SME: internal rating grade |
| Authority | Who may sanction depends on amount and risk (delegation of financial powers) |
| Deviations | Allowed only by a higher authority, and recorded |

## 5 — The price

\`\`\`formula
Loan rate = benchmark (repo / MCLR) + spread
Spread ≈ expected loss + capital charge + operating cost + margin
\`\`\`

**Read it as:** a riskier borrower pays more twice — for the higher expected loss, and for the extra capital the bank must hold against the loan.
`,
  deeper: `
## Credit bureaus

India has four credit information companies: TransUnion CIBIL, Experian, Equifax and CRIF High Mark. Banks report every borrower monthly and pull a report at application. Consumer scores run from 300 to 900; companies get a separate commercial rank.

## Scorecards versus rating models

| | Application scorecard (retail) | Rating model (SME, corporate) |
|---|---|---|
| Inputs | Bureau data, income, age, product | Financial ratios, industry, management, conduct |
| Output | A score, cut-off decides | A grade, each grade has a PD |
| Human role | Minimal; overrides are logged | Analyst prepares, committee approves |

The rating grade feeds everything after: pricing, the approval authority, ECL (through PD) and capital.

## Structuring the loan

| Lever | Why |
|---|---|
| Tenor matched to the asset's life | A machine that lasts 7 years is not funded over 12 |
| Moratorium | No repayments until the project earns |
| Repayment shape | EMI, stepped, bullet, or linked to cash flow |
| Margin (borrower's contribution) | The borrower has something to lose |
| Security and guarantees | Reduce loss if default happens (Registry) |

## Covenants

**Promises in the loan agreement that give the bank an early say when things start to slip.**

| Type | Example |
|---|---|
| Financial | Minimum DSCR 1.25×; maximum debt ÷ EBITDA 4× |
| Information | Audited accounts within 6 months; monthly stock statements |
| Negative | No new borrowing or asset sale without consent |

A breach is not automatically a default. It gives the bank rights — to reprice, tighten terms, ask for more security or recall the loan — and it is an early-warning signal.

## The turnover method in full (Nayak Committee)

| Share of projected turnover | Who funds it |
|---|---|
| 25% — working-capital requirement | |
| of which 20% | Bank finance (the limit) |
| of which 5% | Borrower's margin, from long-term funds |

## The BA's view of origination

- The loan origination system (LOS) captures the application, runs policy rules and scorecards, and routes approvals.
- Every rule needs: the data field, the threshold, what happens on a miss, and who can override.
- Decisions and overrides must be stored — they are the evidence later used to validate models and audit the process.
`,
};
