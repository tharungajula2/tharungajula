import type { Lesson } from './types';

export const reportingLesson: Lesson = {
  district: 'reporting',
  minutes: 5,
  verified: false,
  idea: "The same loans are reported three ways — to the regulator, in the published accounts, and to management — and every number must reconcile back to the ledger.",
  surface: `
<svg viewBox="0 0 440 176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three reporting audiences: regulatory, financial and management reporting, all reconciling to the general ledger" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="220" y="24" text-anchor="middle" font-size="16" font-weight="700">One book, three views</text>
<rect x="10" y="44" width="135" height="64" rx="8" fill="#bfdbfe"/><text x="77" y="70" text-anchor="middle" font-weight="700" font-size="12">Regulatory</text><text x="77" y="90" text-anchor="middle" font-size="11">RBI returns</text>
<rect x="153" y="44" width="135" height="64" rx="8" fill="#bbf7d0"/><text x="220" y="70" text-anchor="middle" font-weight="700" font-size="12">Financial</text><text x="220" y="90" text-anchor="middle" font-size="11">annual report</text>
<rect x="295" y="44" width="135" height="64" rx="8" fill="#fde68a"/><text x="363" y="70" text-anchor="middle" font-weight="700" font-size="12">Management</text><text x="363" y="90" text-anchor="middle" font-size="11">MIS, dashboards</text>
<text x="220" y="140" text-anchor="middle" font-size="12" fill="#4b5563">All three must reconcile to the general ledger (GL)</text>
<text x="220" y="158" text-anchor="middle" font-size="12" fill="#4b5563">and to each other.</text>
</g>
</svg>

## 1 — Three audiences

| Report | For | Rules | Examples |
|---|---|---|---|
| Regulatory | RBI and other supervisors | Regulatory definitions | Capital adequacy, asset quality, large exposures (CRILC), returns filed on RBI's CIMS |
| Financial | Shareholders, auditors, the public | Accounting standards (Ind AS / IFRS) | Annual report, stage tables, allowance walks |
| Management | Board, CRO, business heads | Internal | Portfolio dashboards, limit usage, early warnings |

## 2 — Why the numbers differ

| Item | Regulatory | Accounting |
|---|---|---|
| Default / NPA | 90 DPD and IRAC rules | Stage 3: credit-impaired |
| Loss allowance | IRAC percentages today; ECL from 1 April 2027 | ECL (Ind AS 109 for NBFCs) |
| Exposure | Includes off-balance-sheet with CCFs | Balance sheet amounts |

**Read it as:** differences are expected — unexplained differences are not. Every difference needs a known reason.

## 3 — Reconciliation

$$
\\text{Risk system total} - \\text{GL total} = \\text{known adjustments} + \\text{unexplained break}
$$

**Read it as:** the unexplained break must be within a small tolerance, or the report does not go out.

## 4 — Validation rules before submission

| Check | Example |
|---|---|
| Completeness | Every branch and product included |
| Internal consistency | Stage totals add up to the book |
| Cross-report | Gross NPA in the return matches the financial statements |
| Trend | Unusual jumps explained before submission |

## 5 — The public window

Banks publish credit-risk disclosures (Pillar 3 and annual report notes): exposures by stage and grade, allowance movements, NPAs by sector — so outsiders can judge the book.
`,
  deeper: `
## A reporting calendar

| Frequency | Examples |
|---|---|
| Daily / weekly | Limit usage, large exposures, liquidity |
| Monthly | Asset quality, SMA and CRILC reporting, MIS dashboards |
| Quarterly | Financial results, capital adequacy, stage tables, allowance walk |
| Annually | Annual report, Pillar 3, ICAAP |

## The pipeline of a regulatory return

| Step | Owner | Control |
|---|---|---|
| Extract | Data team | Record counts and totals match source |
| Transform | Reporting team | Mapping to the return's definitions, documented |
| Validate | Reporting team | Validation rules, trend checks |
| Reconcile | Finance | Tie-out to GL |
| Review and sign-off | Business and senior management | Maker-checker |
| Submit | Compliance | Timely filing, acknowledgement kept |

## Common causes of breaks

| Cause | Example |
|---|---|
| Timing | Transactions posted after the risk system's cut-off |
| Scope | Written-off loans in one system, not the other |
| Mapping | A product mapped to the wrong line of the return |
| Data | Missing collateral or rating for some accounts |

## Stage tables (disclosure example)

| | Stage 1 | Stage 2 | Stage 3 | Total |
|---|---|---|---|---|
| Gross carrying amount | 900 | 70 | 30 | 1,000 |
| Loss allowance | 5 | 7 | 15 | 27 |
| Coverage | 0.6% | 10% | 50% | 2.7% |

**Read it as:** coverage should rise sharply from Stage 1 to Stage 3; if Stage 2 coverage is close to Stage 1, the lifetime ECL may be understated.

## The analyst's view

- Every line of a return needs a written definition, a source field, the transformation and the validation checks.
- Changes in regulatory definitions are projects: impact analysis, mapping updates, parallel runs, sign-off.
`,
};
