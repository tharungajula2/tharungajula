import type { Lesson } from './types';

export const watchtowerLesson: Lesson = {
  district: 'watchtower',
  minutes: 5,
  verified: false,
  idea: 'Trouble shows up in the account long before default — days past due, maxed-out limits, late statements — and the earlier the bank acts, the more it saves.',
  surface: `
<svg viewBox="0 0 440 214" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Days past due timeline: 1 to 30 is SMA-0, 31 to 60 SMA-1, 61 to 90 SMA-2, over 90 is a non-performing asset" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="220" y="22" text-anchor="middle" font-size="16" font-weight="700">Days past due (DPD) and India's labels</text>
<rect x="10" y="50" width="80" height="54" rx="6" fill="#bbf7d0"/><text x="50" y="74" text-anchor="middle" font-weight="700">0</text><text x="50" y="92" text-anchor="middle" font-size="12">Standard</text>
<rect x="95" y="50" width="80" height="54" rx="6" fill="#fef9c3"/><text x="135" y="74" text-anchor="middle" font-weight="700">1–30</text><text x="135" y="92" text-anchor="middle" font-size="12">SMA-0</text>
<rect x="180" y="50" width="80" height="54" rx="6" fill="#fde68a"/><text x="220" y="74" text-anchor="middle" font-weight="700">31–60</text><text x="220" y="92" text-anchor="middle" font-size="12">SMA-1</text>
<rect x="265" y="50" width="80" height="54" rx="6" fill="#fdba74"/><text x="305" y="74" text-anchor="middle" font-weight="700">61–90</text><text x="305" y="92" text-anchor="middle" font-size="12">SMA-2</text>
<rect x="350" y="50" width="80" height="54" rx="6" fill="#fecdd3"/><text x="390" y="74" text-anchor="middle" font-weight="700">90+</text><text x="390" y="92" text-anchor="middle" font-size="12">NPA</text>
<text x="220" y="128" text-anchor="middle" font-size="12" fill="#4b5563">SMA = special mention account.</text>
<text x="220" y="146" text-anchor="middle" font-size="12" fill="#4b5563">IFRS 9: over 30 DPD signals Stage 2;</text>
<text x="220" y="162" text-anchor="middle" font-size="12" fill="#4b5563">over 90 DPD is default (Stage 3).</text>
<text x="220" y="186" text-anchor="middle" font-size="12" fill="#4b5563">DPD counts from the oldest unpaid instalment:</text>
<text x="220" y="202" text-anchor="middle" font-size="12" fill="#4b5563">paying only this month's doesn't reset it.</text>
</g>
</svg>

## 1 — Days past due

**DPD is how many days the oldest unpaid amount has been overdue.**

| Month | Borrower pays | DPD after |
|---|---|---|
| 1 | Misses the instalment | 30 |
| 2 | Pays one instalment (this month's) | still about 30 — the oldest is still unpaid |
| 3 | Pays nothing | about 60 |
| 4 | Pays all arrears | 0 |

## 2 — Cash credit and overdraft: "out of order"

A running account has no instalments, so RBI uses a different test. It is **out of order** if:

- the balance stays above the limit or drawing power for 90 days in a row, or
- no credits come in for 90 days, or the credits don't cover the interest charged.

An account out of order for over 90 days is an NPA.

## 3 — Early-warning signals (EWS)

| Signal | What it hints at |
|---|---|
| Cheque or mandate bounces | Cash shortage now |
| Limit used at 95–100% for months | Running out of liquidity |
| Stock statements or accounts late | Something to hide, or weak control |
| Sales through the account falling | Business shrinking, or sales routed to another bank |
| Promoter pledging more shares | Owner under financial pressure |
| Rating downgrade, adverse news, GST or tax defaults | External confirmation of stress |

**Read it as:** one signal is noise; several together is a pattern. Banks score them and put the account on a **watchlist** for closer review.

## 4 — Roll rates

\`\`\`formula
Roll rate (bucket A → B) = balance that moved from A to B this month ÷ balance in A last month
\`\`\`

**Read it as:** if 30% of the 31–60 DPD bucket rolls to 61–90 each month, and 50% of that rolls to 90+, you can forecast next quarter's NPAs from today's arrears.

## 5 — Reporting large borrowers

Banks report every borrower with total exposure of **₹5 crore or more** to RBI's CRILC (Central Repository of Information on Large Credits), including their SMA status — so all lenders see the stress at the same time.
`,
  deeper: `
## The resolution clock for large borrowers (RBI Prudential Framework, 2019)

| Step | Timing |
|---|---|
| Default with any lender | Lenders must review the borrower within 30 days (the review period) |
| Inter-creditor agreement | Signed by lenders during the review period, if a resolution plan is pursued |
| Resolution plan implemented | Within 180 days from the end of the review period |
| If not implemented in time | Additional provision of 20%, rising to 35% after 365 days |

**Read it as:** the framework pushes lenders to act together and early, instead of waiting for the 90-day mark and then for each other.

## Designing an early-warning framework

| Piece | Choice |
|---|---|
| Signals | Account conduct, financials, bureau, market and news data |
| Weights | Set by expert judgement, then tested against past defaults |
| Triggers | Score thresholds that move an account to watchlist, review or action |
| Actions | Call the borrower, stock audit, tighten limits, ask for more security |
| Evidence | Store every trigger and every decision — for audit and to test the EWS itself |

## Measuring an EWS

| Measure | Question |
|---|---|
| Hit rate | Of accounts flagged, how many later defaulted? |
| Capture rate | Of accounts that defaulted, how many were flagged in advance? |
| Lead time | How many months before default did the flag appear? |

A useful EWS catches most defaults with enough lead time to act, without flagging so many accounts that nobody looks.

## Vintage analysis

**Group loans by the month they were made, and track what share has gone bad at each age.**

| Use | What it shows |
|---|---|
| Compare vintages | Whether recent lending is worse than older lending |
| Shape of the curve | When defaults peak after origination |
| Early read | New vintages with bad early arrears warn of a policy or fraud problem |

## Reviews

- Every limit is reviewed at least once a year: fresh financials, rating and terms.
- Large or stressed borrowers are reviewed more often.
- An overdue review is itself a warning — ratings and collateral values go stale.
`,
};
