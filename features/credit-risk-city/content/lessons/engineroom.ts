import type { Lesson } from './types';

export const engineroomLesson: Lesson = {
  district: 'engineroom',
  minutes: 5,
  verified: false,
  idea: "Every credit-risk number is only as good as the data under it — so banks trace each figure back to its source (lineage) and check the data at every step (quality), as BCBS 239 requires.",
  surface: `
<svg viewBox="0 0 440 176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The risk data flow: source systems, data platform, quality checks, risk engines, reports" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="220" y="24" text-anchor="middle" font-size="16" font-weight="700">How data becomes a number</text>
<rect x="10" y="44" width="78" height="64" rx="8" fill="#bfdbfe"/><text x="49" y="70" text-anchor="middle" font-weight="700" font-size="12">Sources</text><text x="49" y="90" text-anchor="middle" font-size="11">LOS, core</text>
<rect x="96" y="44" width="78" height="64" rx="8" fill="#bbf7d0"/><text x="134" y="70" text-anchor="middle" font-weight="700" font-size="12">Platform</text><text x="134" y="90" text-anchor="middle" font-size="11">staging, mart</text>
<rect x="181" y="44" width="78" height="64" rx="8" fill="#fde68a"/><text x="220" y="70" text-anchor="middle" font-weight="700" font-size="12">Checks</text><text x="220" y="90" text-anchor="middle" font-size="11">data quality</text>
<rect x="267" y="44" width="78" height="64" rx="8" fill="#fecdd3"/><text x="306" y="70" text-anchor="middle" font-weight="700" font-size="12">Engines</text><text x="306" y="90" text-anchor="middle" font-size="11">ECL, RWA</text>
<rect x="352" y="44" width="78" height="64" rx="8" fill="#e9d5ff"/><text x="391" y="70" text-anchor="middle" font-weight="700" font-size="12">Reports</text><text x="391" y="90" text-anchor="middle" font-size="11">RBI, board</text>
<text x="220" y="140" text-anchor="middle" font-size="12" fill="#4b5563">Lineage: any number can be traced back to its source.</text>
<text x="220" y="158" text-anchor="middle" font-size="12" fill="#4b5563">A break upstream corrupts everything downstream.</text>
</g>
</svg>

## 1 — BCBS 239 in one table

**The Basel principles for risk data aggregation and reporting.**

| Principle | Question |
|---|---|
| Governance and architecture | Is data owned, documented and built to aggregate reliably? |
| Accuracy and integrity | Are numbers right and reconciled? |
| Completeness | Is every exposure, entity and risk captured? |
| Timeliness | Can reports be produced fast — including in a crisis? |
| Adaptability | Can new, ad-hoc questions be answered quickly? |

## 2 — Data-quality dimensions

| Dimension | Test example |
|---|---|
| Completeness | Every loan has a rating and a collateral value where required |
| Validity | Dates are real dates; DPD is not negative |
| Accuracy | Balance matches core banking |
| Consistency | The same customer has the same ID everywhere |
| Timeliness | Data is from the right cut-off date |
| Uniqueness | No duplicate accounts |

## 3 — Lineage

**Lineage is the documented path of a number: which source fields, through which transformations, into which report.**

**Read it as:** when a regulator asks "why did Stage 2 rise?", lineage lets you answer in hours, not weeks.

## 4 — Controls

| Control | Where |
|---|---|
| Record counts and totals | Every hand-off between systems |
| Validation rules | Before loading into the risk mart |
| Reconciliation | Risk data against the GL |
| Exception queues | Failed records routed to owners to fix at source |
`,
  deeper: `
## A typical credit-risk data architecture

| Layer | What lives there |
|---|---|
| Source systems | Loan origination (LOS), core banking, collateral, collections, treasury, CRM |
| Staging | Raw copies of source data, by cut-off date |
| Risk data mart | Cleaned, joined, conformed data: one row per facility per date |
| Engines | Rating, ECL, RWA, stress testing |
| Reporting layer | Regulatory returns, disclosures, MIS |

## Keys that hold it together

| Key | Joins |
|---|---|
| Customer ID (CIF) | Borrower across all systems |
| Group ID | Borrowers into connected groups |
| Facility / account number | Limits, balances, collateral, ECL |
| Collateral ID | Security to the facilities it covers |
| Date | Everything to the same cut-off |

**Read it as:** most aggregation errors are broken joins — a customer with two IDs, collateral linked to a closed account.

## Data ownership

| Role | Responsibility |
|---|---|
| Data owner (business) | Defines the data and its quality standard |
| Data steward | Monitors quality, manages issues |
| Data custodian (IT) | Runs the systems and pipelines |

## Measuring data quality

- Define rules, run them every cycle, and publish scores by dimension and by source.
- Track issues to resolution with owners and deadlines.
- Report data quality to senior management alongside the risk numbers it affects.

## Fix at source, not in the report

Correcting a number manually in a report hides the problem and will recur. The fix belongs in the source system or the transformation — with the manual adjustment, if unavoidable, logged and approved.

## The analyst's view

The analyst writes the data requirement for every new metric: field definitions, source, transformation logic, validation rules, and the owner — and maintains the data dictionary that makes lineage possible.
`,
};
