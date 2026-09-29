import type { Lesson } from './types';

export const studioLesson: Lesson = {
  district: 'studio',
  minutes: 6,
  verified: false,
  idea: "The business analyst turns rules, models and needs into precise requirements — every number defined, every rule testable, every requirement traceable from regulation to report.",
  surface: `
<svg viewBox="0 0 440 176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The golden thread: regulation to business requirement to functional requirement to test to report" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="220" y="24" text-anchor="middle" font-size="16" font-weight="700">The golden thread</text>
<rect x="10" y="44" width="78" height="64" rx="8" fill="#bfdbfe"/><text x="49" y="70" text-anchor="middle" font-weight="700" font-size="12">Rule</text><text x="49" y="90" text-anchor="middle" font-size="11">regulation</text>
<rect x="96" y="44" width="78" height="64" rx="8" fill="#bbf7d0"/><text x="134" y="70" text-anchor="middle" font-weight="700" font-size="12">Business req</text><text x="134" y="90" text-anchor="middle" font-size="11">what & why</text>
<rect x="181" y="44" width="78" height="64" rx="8" fill="#fde68a"/><text x="220" y="70" text-anchor="middle" font-weight="700" font-size="12">Functional req</text><text x="220" y="90" text-anchor="middle" font-size="11">how</text>
<rect x="267" y="44" width="78" height="64" rx="8" fill="#fecdd3"/><text x="306" y="70" text-anchor="middle" font-weight="700" font-size="12">Test</text><text x="306" y="90" text-anchor="middle" font-size="11">proof</text>
<rect x="352" y="44" width="78" height="64" rx="8" fill="#e9d5ff"/><text x="391" y="70" text-anchor="middle" font-weight="700" font-size="12">Report</text><text x="391" y="90" text-anchor="middle" font-size="11">output</text>
<text x="220" y="140" text-anchor="middle" font-size="12" fill="#4b5563">Traceability: every output ties back to a rule,</text>
<text x="220" y="158" text-anchor="middle" font-size="12" fill="#4b5563">and every rule forward to a test.</text>
</g>
</svg>

## 1 — Requirements that work

| Level | Answers | Example |
|---|---|---|
| Business requirement (BRD) | What and why | "Stage loans under IFRS 9 each month-end" |
| Functional requirement (FRD) | How the system behaves | "If DPD > 30, assign Stage 2 unless Stage 3 applies" |
| Acceptance criteria | How we know it works | "Given DPD = 30, stage stays 1; given DPD = 31, stage is 2" |

## 2 — What makes a requirement testable

| Test | Bad | Good |
|---|---|---|
| Specific | "Flag risky loans" | "Flag loans with DPD over 30" |
| Measurable | "Fast" | "Within 2 hours of month-end" |
| Boundaries stated | "Over 30 days" (is 30 in?) | "DPD ≥ 31" |
| Data named | "Use the rating" | "Use the latest approved internal grade, field RTG_GRADE" |

## 3 — Source-to-target mapping

| Target field | Source | Rule |
|---|---|---|
| DPD | Core banking, oldest unpaid due date | Reporting date − oldest due date, in days |
| Stage | Derived | Stage rules in precedence order |
| Collateral value | Collateral system | Latest value within 12 months, after haircut |

## 4 — Testing

| Level | Who |
|---|---|
| Unit / system testing | IT |
| User acceptance testing (UAT) | Business, led by the BA, with real scenarios |
| Parallel run | Old and new side by side for one or more cycles |

**Boundary testing** catches the classic bug: "over 90 days" coded as ≥ 90 puts one more day's worth of loans into default.
`,
  deeper: `
## The BA across credit-risk projects

| Project | BA work |
|---|---|
| New loan origination system | Policy rules, scorecard integration, approval workflows |
| IFRS 9 / ECL implementation | Staging rules, data requirements, scenario inputs, disclosures |
| Basel reporting | Asset-class mapping, risk weights, CRM eligibility, returns |
| Early-warning system | Signals, triggers, workflows, evidence |
| Data and BCBS 239 | Data dictionary, lineage, DQ rules |

## Traceability matrix

| Requirement | Source rule | Design | Test cases | Status |
|---|---|---|---|---|
| BR-12 Stage 2 on 30+ DPD | IFRS 9 5.5.11 backstop | FS-4.2 | UAT-31 to 34 | Passed |

**Read it as:** if a regulator asks why a loan is in Stage 2, the matrix shows the rule, the design and the proof.

## User stories, when the team is agile

\`\`\`formula
As a <role>, I want <capability>, so that <benefit>.
Given <context>, when <action>, then <outcome>.
\`\`\`

## Working with stakeholders

| Stakeholder | What they need from the BA |
|---|---|
| Credit and risk | Rules implemented exactly as policy says |
| Finance | Numbers that reconcile to the GL |
| IT | Unambiguous, complete specifications |
| Model team | Correct data in, outputs stored and reproducible |
| Audit and regulators | Evidence: approvals, tests, traceability |

## A good requirement, checked

- One requirement, one behaviour.
- Every term defined in the glossary.
- Every number has a source field and a cut-off date.
- Every rule has a precedence (what wins when two apply).
- Every rule has test cases at, just below and just above each boundary.

## Closing the loop

After go-live: monitor the outputs, log issues, and feed changes back through the same thread — rule, requirement, design, test, report.
`,
};
