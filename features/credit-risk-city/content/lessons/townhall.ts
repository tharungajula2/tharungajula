import type { Lesson } from './types';

export const townhallLesson: Lesson = {
  district: 'townhall',
  minutes: 5,
  verified: false,
  idea: "Credit risk is governed, not just calculated: the board sets how much risk the bank will take, independent functions check the business, and every decision has an owner and a limit.",
  surface: `
<svg viewBox="0 0 440 176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three lines of defence: the business owns the risk, risk management challenges it, internal audit checks both" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="220" y="24" text-anchor="middle" font-size="16" font-weight="700">Three lines of defence</text>
<rect x="10" y="44" width="135" height="64" rx="8" fill="#bbf7d0"/><text x="77" y="70" text-anchor="middle" font-weight="700" font-size="12">1st line</text><text x="77" y="90" text-anchor="middle" font-size="11">business</text>
<rect x="153" y="44" width="135" height="64" rx="8" fill="#bfdbfe"/><text x="220" y="70" text-anchor="middle" font-weight="700" font-size="12">2nd line</text><text x="220" y="90" text-anchor="middle" font-size="11">risk, compliance</text>
<rect x="295" y="44" width="135" height="64" rx="8" fill="#e9d5ff"/><text x="363" y="70" text-anchor="middle" font-weight="700" font-size="12">3rd line</text><text x="363" y="90" text-anchor="middle" font-size="11">internal audit</text>
<text x="220" y="140" text-anchor="middle" font-size="12" fill="#4b5563">The board sets appetite; each line checks the one before.</text>
</g>
</svg>

## 1 — Three lines of defence

| Line | Who | Job |
|---|---|---|
| First | Business: branches, relationship managers, credit underwriting | Own the risk; follow policy |
| Second | Risk management, compliance | Set frameworks, independently challenge, monitor limits |
| Third | Internal audit | Check that the first two work |

## 2 — Risk appetite

**How much risk the bank is willing to take to meet its goals, set by the board.**

| Layer | Example |
|---|---|
| Statement | "We keep CET1 at least 2% above the regulatory minimum" |
| Metrics and limits | GNPA under 3%; single-name limit 15% of Tier 1 |
| Early-warning triggers | Amber at 80% of a limit |
| Escalation | Who is told, and by when, when a trigger is hit |

## 3 — Who decides

| Body | Credit role |
|---|---|
| Board and its risk management committee | Approves appetite, policy, large limits |
| Chief risk officer (CRO) | Independent head of risk, reports to the board committee |
| Credit committees | Sanction loans above individual powers |
| Delegation of financial powers | Who may approve what, by amount and risk |

## 4 — Policies that bind it together

| Policy | Covers |
|---|---|
| Credit policy | Target segments, criteria, pricing principles, security, exceptions |
| Model risk policy | How models are built, validated, approved, monitored |
| Recovery policy | Collections, settlements, write-offs |

## 5 — Fair treatment

RBI's Fair Practices Code and digital lending guidelines require clear terms (a key fact statement), fair collection conduct, and grievance redress. Conduct failures are a risk as real as defaults.
`,
  deeper: `
## How appetite cascades

| Level | Example |
|---|---|
| Board | Total credit-cost tolerance; capital floor |
| Portfolio | Sector limits: real estate under 15% of the book |
| Product | Personal loans: minimum bureau score, maximum ticket |
| Transaction | Each sanction within delegated powers |

## Independence

- The CRO should not report to the business; in India, RBI expects the CRO to report to the MD & CEO and the board's risk committee, with a fixed tenure and board approval to remove.
- Risk functions must have enough people and data to challenge — not only to rubber-stamp.

## Committees you will meet

| Committee | Focus |
|---|---|
| Risk management committee of the board | Overall risk, appetite, capital |
| Credit approval committee | Large sanctions |
| Asset-liability committee (ALCO) | Funding, liquidity, interest rate risk |
| Model risk / validation committee | Model approvals and findings |
| Special monitoring committees | Stressed large accounts |

## Exceptions and deviations

- Policy exceptions are allowed only by a higher authority, with reasons recorded.
- Exception reports go to the risk committee: frequent exceptions mean the policy or the business is out of line.

## Conduct in lending

| Requirement | Why |
|---|---|
| Key fact statement (KFS) with the all-in annual rate | The borrower understands the true cost |
| No hidden charges; fair collection practices | Recovery agents follow a code of conduct |
| Grievance redress officer; RBI ombudsman | A route when things go wrong |
| Explainable decisions | Customers can be told why they were declined |

## The analyst's view

- Every limit needs a data source, a calculation, a reporting frequency and an owner.
- Governance requirements often become system requirements: approval workflows, audit trails, maker-checker, and evidence that the right authority approved.
`,
};
