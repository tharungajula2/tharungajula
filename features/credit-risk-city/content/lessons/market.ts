import type { Lesson } from './types';

export const marketLesson: Lesson = {
  district: 'market',
  minutes: 5,
  verified: false,
  idea: 'Every exposure has a shape: who owes it, under which agreement, drawn or not yet drawn — and default is judged on the borrower, not the loan.',
  surface: `
<svg viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Exposure hierarchy: a borrower group contains obligors; an obligor holds facilities; each facility has accounts" style="width:100%;max-width:420px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="210" y="22" text-anchor="middle" font-size="16" font-weight="700">From group to account</text>
<rect x="150" y="36" width="120" height="30" rx="6" fill="#e9d5ff"/><text x="210" y="56" text-anchor="middle" font-weight="700">Group</text>
<line x1="210" y1="66" x2="120" y2="92" stroke="#9ca3af" stroke-width="1.5"/><line x1="210" y1="66" x2="300" y2="92" stroke="#9ca3af" stroke-width="1.5"/>
<rect x="60" y="92" width="120" height="30" rx="6" fill="#bfdbfe"/><text x="120" y="112" text-anchor="middle" font-weight="700">Obligor A</text>
<rect x="240" y="92" width="120" height="30" rx="6" fill="#bfdbfe"/><text x="300" y="112" text-anchor="middle">Obligor B</text>
<line x1="120" y1="122" x2="70" y2="150" stroke="#9ca3af" stroke-width="1.5"/><line x1="120" y1="122" x2="170" y2="150" stroke="#9ca3af" stroke-width="1.5"/>
<rect x="20" y="150" width="100" height="30" rx="6" fill="#bbf7d0"/><text x="70" y="170" text-anchor="middle">Term loan</text>
<rect x="125" y="150" width="100" height="30" rx="6" fill="#bbf7d0"/><text x="175" y="170" text-anchor="middle">Cash credit</text>
<line x1="70" y1="180" x2="70" y2="204" stroke="#9ca3af" stroke-width="1.5"/>
<rect x="20" y="204" width="100" height="26" rx="6" fill="#fde68a"/><text x="70" y="222" text-anchor="middle" font-size="12">Account(s)</text>
<text x="300" y="165" text-anchor="middle" font-size="12" fill="#4b5563">Default is judged</text>
<text x="300" y="181" text-anchor="middle" font-size="12" fill="#4b5563">at obligor level:</text>
<text x="300" y="197" text-anchor="middle" font-size="12" fill="#4b5563">one bad facility pulls</text>
<text x="300" y="213" text-anchor="middle" font-size="12" fill="#4b5563">in all of A's facilities</text>
</g>
</svg>

## 1 — Who owes, under what

| Level | What it is | Example |
|---|---|---|
| Group | Borrowers linked by ownership or dependence | A company and its subsidiaries |
| Obligor | The legal borrower | Shakti Auto Components Pvt Ltd |
| Facility | One agreement: a limit, tenor, rate and security | ₹20 crore term loan; ₹10 crore cash credit |
| Account | Where the facility is booked | The loan account in core banking |

**Read it as:** limits and concentration are checked at group level; default is judged at obligor level; ECL is calculated at facility or account level. Getting the level wrong double-counts or hides exposure.

## 2 — Three segments, three machines

| Segment | Typical size | How it is decided | How risk is managed |
|---|---|---|---|
| Retail | Up to a few lakh | Policy rules + scorecard, automated | As pools of similar loans |
| SME / MSME | Lakhs to tens of crores | Credit officer analyses and rates | Loan by loan, with scorecards for small tickets |
| Corporate | Tens of crores and up | Full appraisal, rating, credit committee | Loan by loan, with group limits |

## 3 — Funded and non-fund-based

**Funded means money has left the bank. Non-fund-based means the bank has promised to pay if something happens — still a credit risk.**

| Funded | Non-fund-based |
|---|---|
| Term loan (TL) | Bank guarantee (BG) |
| Cash credit (CC) / overdraft (OD) | Letter of credit (LC) |
| Bill discounting | Undrawn part of a sanctioned limit |

## 4 — Term loans and revolving lines

| | Term loan | Revolving line (CC, OD, card) |
|---|---|---|
| How it is repaid | On a schedule (EMIs) or at the end (bullet) | Drawn and repaid again and again, up to a limit |
| What the exposure does | Shrinks over time | Moves with usage — and rises as a borrower weakens |

\`\`\`formula
Exposure at default (EAD) = drawn + CCF × undrawn
\`\`\`

**Read it as:** a ₹10 crore line with ₹6 crore drawn and a 60% credit conversion factor (CCF) has an EAD of ₹8.4 crore. Borrowers in trouble draw their lines to the limit, so the unused part cannot be ignored.
`,
  deeper: `
## The product map

| Segment | Common products |
|---|---|
| Retail | Home loan, loan against property (LAP), auto loan, personal loan, credit card, gold loan, education loan |
| MSME | Cash credit against stock and receivables, overdraft, term loan for machinery, bill/invoice discounting, BG, LC |
| Corporate | Term loans, working-capital consortium or multiple-banking limits, trade finance, external commercial borrowings (ECB) |

## Utilisation tells a story

\`\`\`formula
Utilisation = drawn ÷ limit
\`\`\`

- Stable around 50–70% is normal for a working-capital line.
- Creeping towards 100% and staying there is an early-warning signal: the borrower is running short of cash.
- For a cash credit, the usable amount is the lower of the limit and drawing power (see the Branch).

## Connected parties and group exposure

**Borrowers are "connected" if one controls the other, or if one would fail when the other fails (economic dependence).**

| Link | Example |
|---|---|
| Control | Common majority owner; a parent and its subsidiary |
| Economic dependence | A supplier that sells 80% of its output to one buyer |

Limits on large exposures apply to the whole connected group, not to each company alone (Storm Centre covers the limits).

## Exposure classes (how capital rules sort borrowers)

| Class | Who | Why it is separate |
|---|---|---|
| Sovereign | Governments, central banks | Own risk weights, often low for the home government |
| Banks | Other banks | Interbank lending and trade finance |
| Corporate | Companies | Rated or unrated; risk weights by grade |
| SME corporate | Smaller companies | Can get a lower risk weight than large corporates |
| Retail | Individuals and small businesses in pools | Many small, similar loans — diversified |
| Residential mortgage | Home loans | Risk weight depends on LTV |
| Commercial real estate | Loans against income-producing property | Higher risk, own rules |

**Read it as:** the same ₹1 crore needs very different capital depending on the class it falls into — so classifying a borrower wrongly misstates capital.

## India's MSME size bands (from 1 April 2025)

| Size | Investment in plant and machinery up to | Turnover up to |
|---|---|---|
| Micro | ₹2.5 crore | ₹10 crore |
| Small | ₹25 crore | ₹100 crore |
| Medium | ₹125 crore | ₹500 crore |

MSME status decides priority-sector treatment, eligibility for schemes such as CGTMSE, and some pricing and resolution rules.

## Where exposure data lives

| Data | Source system |
|---|---|
| Customer and group | CRM or customer master (CIF) |
| Limit, tenor, rate, security | Loan origination and limit systems |
| Drawn balance, dues, payments | Core banking or loan management system |
| Guarantees and LCs issued | Trade finance system |

**Read it as:** one borrower's full exposure is stitched together from several systems — the most common source of reporting errors.
`,
};
