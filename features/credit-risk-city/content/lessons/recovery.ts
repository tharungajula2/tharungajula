import type { Lesson } from './types';

export const recoveryLesson: Lesson = {
  district: 'recovery',
  minutes: 6,
  verified: false,
  idea: 'Default is a label with rules — over 90 days past due or unlikely to pay — and after it the game changes from "keep them paying" to "get back as much as possible, as fast as possible".',
  surface: `
<svg viewBox="0 0 440 226" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="After default: the bank chooses between cure or restructure, settlement, and enforcement through SARFAESI, IBC or courts; what is not recovered is written off" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#1f2937">
<text x="220" y="20" text-anchor="middle" font-size="16" font-weight="700">What happens after default</text>
<rect x="10" y="80" width="84" height="44" rx="6" fill="#fecdd3"/><text x="52" y="100" text-anchor="middle" font-weight="700">Default</text><text x="52" y="116" text-anchor="middle" font-size="10">90+ DPD or UTP</text>
<line x1="94" y1="102" x2="130" y2="52" stroke="#9ca3af" stroke-width="1.5"/><line x1="94" y1="102" x2="130" y2="102" stroke="#9ca3af" stroke-width="1.5"/><line x1="94" y1="102" x2="130" y2="152" stroke="#9ca3af" stroke-width="1.5"/>
<rect x="130" y="32" width="130" height="40" rx="6" fill="#bbf7d0"/><text x="195" y="50" text-anchor="middle" font-weight="700">Cure / restructure</text><text x="195" y="64" text-anchor="middle" font-size="10">borrower pays again</text>
<rect x="130" y="82" width="130" height="40" rx="6" fill="#fde68a"/><text x="195" y="100" text-anchor="middle" font-weight="700">Settle (OTS)</text><text x="195" y="114" text-anchor="middle" font-size="10">agreed lower amount</text>
<rect x="130" y="132" width="130" height="40" rx="6" fill="#fdba74"/><text x="195" y="150" text-anchor="middle" font-weight="700">Enforce</text><text x="195" y="164" text-anchor="middle" font-size="10">SARFAESI · IBC · DRT</text>
<line x1="260" y1="102" x2="300" y2="102" stroke="#9ca3af" stroke-width="1.5"/><line x1="260" y1="152" x2="300" y2="112" stroke="#9ca3af" stroke-width="1.5"/>
<rect x="300" y="80" width="130" height="44" rx="6" fill="#cbd5e1"/><text x="365" y="100" text-anchor="middle" font-weight="700">Recover, then</text><text x="365" y="116" text-anchor="middle" font-size="10">write off the rest</text>
<text x="220" y="198" text-anchor="middle" font-size="12" fill="#4b5563">LGD = what is finally lost, after recoveries</text>
<text x="220" y="214" text-anchor="middle" font-size="12" fill="#4b5563">and costs, in today's money.</text>
</g>
</svg>

## 1 — What default means

**Default = over 90 days past due on a material amount, or unlikely to pay (UTP) in full.**

| UTP signal | Example |
|---|---|
| Interest no longer booked as income | Bank stops accruing |
| Specific provision raised | Bank expects a loss |
| Distressed restructuring | Terms eased because the borrower is struggling |
| Bankruptcy or insolvency filing | IBC proceedings |
| Fraud | Declared as fraud |

Default is judged on the **borrower**: one defaulted facility makes all of that borrower's facilities defaulted.

## 2 — India's NPA classes and provisions (IRAC)

| Class | When | Minimum provision |
|---|---|---|
| Standard | Performing | 0.4% typical (general provision) |
| Substandard | NPA for up to 12 months | 15% (25% if unsecured) |
| Doubtful D1 | Doubtful up to 1 year | 25% of the secured part + 100% of the unsecured part |
| Doubtful D2 | 1–3 years | 40% of secured + 100% of unsecured |
| Doubtful D3 | Over 3 years | 100% |
| Loss | Identified as a loss | 100% |

**Read it as:** IRAC (income recognition, asset classification and provisioning) uses fixed percentages by age. IFRS 9, and India's ECL framework from 1 April 2027, instead estimates the expected loss.

## 3 — Two rules that surprise people

| Rule | Meaning |
|---|---|
| Income recognition | Once an NPA, interest is no longer counted as income until actually received |
| Upgrade | An NPA becomes standard only when **all** arrears of interest and principal are paid — a partial payment is not enough |

## 4 — The recovery routes (India)

| Route | Who can use it | What it gives |
|---|---|---|
| Restructuring | Lender and borrower agree | New terms; if due to distress, the account stays NPA until it performs for a set period |
| One-time settlement (OTS) | Negotiated | A smaller amount now instead of a long fight |
| SARFAESI Act | Secured lenders, loans over ₹1 lakh | 60-day notice, then take and sell the security without going to court |
| IBC (Insolvency and Bankruptcy Code) | Creditors, default of ₹1 crore or more | NCLT-run process; resolution plan within 330 days at most, or liquidation |
| DRT (Debt Recovery Tribunal) | Claims of ₹20 lakh or more | Tribunal order to recover |
| Lok Adalat | Smaller claims, up to ₹20 lakh | Settlement by conciliation |
| Sale to an ARC | Asset reconstruction company buys the loan | Cash or security receipts now; the ARC does the recovering |

## 5 — Loss given default and write-off

$$
\\text{LGD} = 1 - \\dfrac{\\text{PV(recoveries)} - \\text{PV(costs)}}{\\text{EAD}}
$$

**Read it as:** a ₹100 default that recovers ₹60 after three years, with ₹5 of costs, at a 10% discount rate, has an LGD of about 59% — not 45%, because time costs money.

**Write-off** removes a hopeless loan from the balance sheet, using the provision already made. Recovery efforts often continue (a "technical write-off"), and anything recovered later is a gain.
`,
  deeper: `
## Collections: the ladder before default

| DPD | Typical action |
|---|---|
| 1–30 | Reminders: SMS, calls, a nudge — most early misses are forgetfulness or timing |
| 31–60 | Structured calls, field visits for larger tickets, understand the reason |
| 61–90 | Senior collections, restructuring conversation, legal notice prepared |
| 90+ | Recovery unit takes over; enforcement options assessed |

**Cure rate** — the share of delinquent accounts that return to current — is the most important collections number. Early buckets cure often; late buckets rarely.

## Forbearance: help or hide?

| Real help | Hiding a loss |
|---|---|
| Borrower has a temporary problem and a credible path back | Terms are eased repeatedly with no improvement |
| New schedule matches expected cash flows | Arrears are capitalised into a new loan ("evergreening") |
| Loss recognised honestly in the meantime | Account kept "standard" on paper |

IFRS 9 and RBI both require a distressed restructuring to be flagged, and the loan cannot move back to performing until it has paid as agreed for a probation period.

## LGD, worked out in full

| Item | Amount | When | Present value at 10% |
|---|---|---|---|
| EAD | 100 | Default date | 100.0 |
| Recovery from security | 60 | Year 3 | 45.1 |
| Legal and sale costs | 5 | Year 2 | 4.1 |
| **Net recovered (today's money)** | | | **41.0** |
| **LGD** | | | **59%** |

## The IBC order of payment (Section 53, simplified)

| Rank | Who |
|---|---|
| 1 | Costs of the insolvency process |
| 2 | Workmen's dues (24 months) and secured creditors who gave up their security — equally |
| 3 | Employees' wages (12 months) |
| 4 | Unsecured financial creditors |
| 5 | Government dues and any unpaid secured creditors |
| 6 | Everyone else, then preference and equity shareholders |

## Where the data comes from

- The recovery system logs every cash flow after default: amount, date, source (security sale, settlement, borrower payment) and costs.
- These histories are the raw material for LGD models — incomplete recovery data is the most common reason LGD estimates are weak.
`,
};
