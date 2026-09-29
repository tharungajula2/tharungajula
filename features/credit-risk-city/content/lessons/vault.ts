import type { Lesson } from './types';

export const vaultLesson: Lesson = {
  district: 'vault',
  minutes: 7,
  verified: false,
  idea: "Under IFRS 9 a bank provides for losses it expects, not only losses that have happened — twelve months' worth for healthy loans, the whole lifetime's for loans that have got significantly riskier.",
  surface: `
<svg viewBox="0 0 440 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IFRS 9 three stages: Stage 1 performing with 12-month ECL; Stage 2 significant increase in credit risk with lifetime ECL; Stage 3 credit-impaired with lifetime ECL and interest on the net amount" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="220" y="24" text-anchor="middle" font-size="16" font-weight="700">IFRS 9: three stages</text>
<rect x="14" y="44" width="130" height="110" rx="10" fill="#bbf7d0"/><text x="79" y="68" text-anchor="middle" font-weight="700">Stage 1</text><text x="79" y="90" text-anchor="middle" font-size="12">Performing</text><text x="79" y="114" text-anchor="middle" font-size="12" font-weight="700">12-month ECL</text><text x="79" y="136" text-anchor="middle" font-size="11">interest on gross</text>
<rect x="155" y="44" width="130" height="110" rx="10" fill="#fde68a"/><text x="220" y="68" text-anchor="middle" font-weight="700">Stage 2</text><text x="220" y="90" text-anchor="middle" font-size="12">Risk up a lot</text><text x="220" y="114" text-anchor="middle" font-size="12" font-weight="700">Lifetime ECL</text><text x="220" y="136" text-anchor="middle" font-size="11">interest on gross</text>
<rect x="296" y="44" width="130" height="110" rx="10" fill="#fecdd3"/><text x="361" y="68" text-anchor="middle" font-weight="700">Stage 3</text><text x="361" y="90" text-anchor="middle" font-size="12">Credit-impaired</text><text x="361" y="114" text-anchor="middle" font-size="12" font-weight="700">Lifetime ECL</text><text x="361" y="136" text-anchor="middle" font-size="11">interest on net</text>
<text x="220" y="182" text-anchor="middle" font-size="12" fill="#4b5563">Loans move both ways: back to Stage 1</text>
<text x="220" y="198" text-anchor="middle" font-size="12" fill="#4b5563">once the increase in risk has gone.</text>
</g>
</svg>

## 1 — Expected, not incurred

| Old approach (incurred loss) | IFRS 9 (expected credit loss, ECL) |
|---|---|
| Provide only after a loss event | Provide from day one for expected loss |
| Too little, too late in 2008 | Earlier, forward-looking, uses economic forecasts |

India moves from IRAC's fixed percentages to an ECL framework for banks from **1 April 2027**; NBFCs already follow Ind AS 109.

## 2 — Moving to Stage 2: significant increase in credit risk (SICR)

| Trigger | Example |
|---|---|
| Relative PD increase | Lifetime PD now more than double what it was at origination |
| 30 days past due | The backstop: presumed SICR |
| Watchlist, forbearance | Qualitative signals |

## 3 — Measuring ECL

\`\`\`formula
ECL = Σ over years (marginal PD × LGD × EAD × discount factor at the EIR)
\`\`\`

| Stage | Horizon |
|---|---|
| 1 | Default in the next 12 months only |
| 2 and 3 | Default at any time over the remaining life |

## 4 — Forward-looking scenarios

| Scenario | Weight | ECL (₹ crore, illustrative) |
|---|---|---|
| Upside | 20% | 8 |
| Base | 50% | 10 |
| Downside | 30% | 18 |
| **Probability-weighted** | | **12.0** |

**Read it as:** the weighted ECL (12.0) is above the base case (10), because losses rise faster in bad scenarios than they fall in good ones.

## 5 — IFRS 9 and CECL

| | IFRS 9 | CECL (US) |
|---|---|---|
| Healthy loans | 12-month ECL | Lifetime ECL from day one |
| Stages | Three | None |
`,
  deeper: `
## The allowance walk (reconciling the provision)

| Movement | ₹ crore |
|---|---|
| Opening allowance | 100 |
| + New loans (day-one 12-month ECL) | 8 |
| + Transfers to Stage 2 (12-month → lifetime) | 15 |
| + Changes in risk parameters and scenarios | 6 |
| − Loans repaid or sold | −9 |
| − Write-offs (use of allowance) | −12 |
| **Closing allowance** | **108** |

Auditors and regulators expect this walk every quarter — it shows why provisions moved.

## Stage 3 details

- Credit-impaired usually means in default (over 90 DPD or unlikely to pay).
- Interest income is recognised on the net carrying amount (gross minus allowance).
- ECL often reflects expected recoveries directly (workout cash flows), not only PD × LGD.

## Moving back

| Move | Condition |
|---|---|
| Stage 2 → 1 | The significant increase in risk no longer exists; many banks add a probation period |
| Stage 3 → 2 or 1 | No longer credit-impaired, after a cure or probation period — especially after forbearance |

## Management overlays

**Adjustments added on top of model output when models miss something — a new risk, a data gap, an unusual event.**

- Must be documented, quantified, approved and reviewed each quarter.
- Large or long-lived overlays signal that models need updating.

## Cliff effect and procyclicality

A loan moving from Stage 1 to Stage 2 jumps from 12-month to lifetime ECL. In a downturn many loans move at once, so provisions rise sharply just as profits fall — the "cliff effect".

## Data needed for ECL

| Data | Why |
|---|---|
| Origination PD or grade | To measure the increase in risk (SICR) |
| Current PD, DPD, watchlist, forbearance flags | To stage |
| Cash-flow schedules, EIR | For EAD over time and discounting |
| Collateral values | For LGD |
| Macroeconomic forecasts | For scenarios |

## The analyst's view

Staging rules are the most tested part of an ECL system: every rule needs a data field, a threshold, a precedence order (which rule wins) and test cases at the boundary — for example exactly 30 days past due.
`,
};
