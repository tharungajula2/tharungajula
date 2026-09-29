import type { Lesson } from './types';

export const fortressLesson: Lesson = {
  district: 'fortress',
  minutes: 7,
  verified: false,
  idea: "Capital is the owners' money that absorbs unexpected losses; the rules set how much is needed for each rupee of risk (RWA), and how that capital must be stacked.",
  surface: `
<svg viewBox="0 0 440 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The capital stack as a percentage of risk-weighted assets: CET1 4.5 percent, additional Tier 1 1.5 percent, Tier 2 2 percent, and a 2.5 percent conservation buffer of CET1 on top" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="220" y="24" text-anchor="middle" font-size="16" font-weight="700">The capital stack (% of RWA)</text>
<rect x="150" y="160" width="140" height="54" fill="#bfdbfe"/><text x="220" y="192" text-anchor="middle" font-weight="700">CET1 · 4.5%</text>
<rect x="150" y="142" width="140" height="18" fill="#c7d2fe"/><text x="300" y="156" font-size="12">AT1 · 1.5% → Tier 1 = 6%</text>
<rect x="150" y="118" width="140" height="24" fill="#e9d5ff"/><text x="300" y="134" font-size="12">Tier 2 · 2% → total 8%</text>
<rect x="150" y="88" width="140" height="30" fill="#fde68a"/><text x="300" y="108" font-size="12">Buffer · 2.5% CET1</text>
<rect x="150" y="60" width="140" height="28" fill="#fecdd3"/><text x="300" y="79" font-size="12">Other buffers, Pillar 2</text>
<text x="140" y="192" text-anchor="end" font-size="12" fill="#4b5563">best quality</text>
<text x="220" y="226" text-anchor="middle" font-size="12" fill="#4b5563">Basel minimums; India asks more (see below).</text>
</g>
</svg>

## 1 — Provisions versus capital

| | Provisions | Capital |
|---|---|---|
| Covers | Expected loss | Unexpected loss |
| Rulebook | IFRS 9 / IRAC | Basel |
| Where it sits | Reduces the loan's value | The owners' equity and similar instruments |

## 2 — Risk-weighted assets (RWA)

\`\`\`formula
RWA = exposure × risk weight
Capital ratio = capital ÷ RWA
\`\`\`

| Exposure (standardised approach, illustrative) | Risk weight |
|---|---|
| Home loan, low LTV | 20–35% |
| Regulatory retail | 75% |
| Unrated corporate | 100% |
| Defaulted, poorly provisioned | 150% |

## 3 — The stack

| Layer | Basel minimum | India (RBI) |
|---|---|---|
| CET1 (common equity) | 4.5% | 5.5% |
| Tier 1 | 6% | 7% |
| Total capital | 8% | 9% |
| Capital conservation buffer (CET1) | 2.5% | 2.5% |
| **CET1 including buffer** | **7%** | **8%** |

**Read it as:** below the buffer, a bank can still operate but must cut dividends and bonuses until it rebuilds.

## 4 — Two ways to set risk weights

| | Standardised (SA) | Internal ratings-based (IRB) |
|---|---|---|
| Risk weights from | Tables in the rules | The bank's own PD, LGD, EAD in a Basel formula |
| Who uses it | All Indian banks today | Large banks in the UK, EU and elsewhere |
| Floor | — | Output floor: IRB RWA at least 72.5% of SA RWA (Basel 3.1) |

## 5 — The leverage ratio

\`\`\`formula
Leverage ratio = Tier 1 capital ÷ total exposure (not risk-weighted)
\`\`\`

A backstop against models that make risk look too small: Basel minimum 3%; RBI 4% for domestic systemically important banks and 3.5% for other banks.

## 6 — Three pillars

| Pillar | What |
|---|---|
| 1 | Minimum capital for credit, market and operational risk |
| 2 | Supervisory review: the bank's own assessment (ICAAP) and extra capital for other risks |
| 3 | Public disclosure, so the market can judge |
`,
  deeper: `
## The IRB formula, in words

1. Take the borrower's PD, LGD, EAD and maturity.
2. Ask: in a 1-in-1,000 year for the whole economy, what would this borrower's default rate be? (The formula uses a correlation that says how much borrowers move together.)
3. Capital = LGD × (that stressed default rate − PD), adjusted for maturity; the average loss (PD × LGD) is left to provisions.
4. RWA = capital × 12.5 × EAD.

| Example | Value |
|---|---|
| PD 1%, LGD 45%, maturity 2.5 years (corporate) | Risk weight about 92% |

## Buffers on top of the minimum

| Buffer | Size | Purpose |
|---|---|---|
| Capital conservation | 2.5% | Absorb losses in stress without breaching minimums |
| Countercyclical (CCyB) | 0–2.5% | Built in credit booms; RBI has kept it at zero so far |
| D-SIB / G-SIB surcharge | 0.2%–0.8% (India D-SIBs) | Bigger banks, bigger buffer |

## What counts as capital

| Tier | Includes | Main deductions |
|---|---|---|
| CET1 | Paid-up equity, reserves, retained earnings | Goodwill, intangibles, deferred tax assets, shortfalls in provisions |
| Additional Tier 1 | Perpetual bonds that can be written down or converted | |
| Tier 2 | Subordinated debt, some general provisions (capped) | |

## Defaulted exposures and provisions

Under the standardised approach, a defaulted exposure is risk-weighted after deducting its specific provisions — so as provisions rise, the exposure falls even though the risk weight goes up to 100–150%.

## Capital planning

- ICAAP (internal capital adequacy assessment process): the bank's own view of all its risks and the capital it needs, over a three-year horizon, including stress.
- Capital headroom: the gap between the actual ratio and minimums plus buffers plus management's own target.

## The analyst's view

- RWA engines take exposure, collateral, ratings and product data — each classification rule (asset class, risk weight bucket) must be traceable to a paragraph of the rules.
- Most RWA errors come from wrong exposure classes, stale ratings or collateral that was not eligible.
`,
};
