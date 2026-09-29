import type { Lesson } from './types';

export const stormLesson: Lesson = {
  district: 'storm',
  minutes: 6,
  verified: false,
  idea: "Losses do not arrive one borrower at a time — they arrive together, through shared exposure to one name, one sector or one economy, so a bank must measure concentration and test how it holds up in a storm.",
  surface: `
<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Concentration and correlation: a diversified book loses a little in many places; a concentrated book can lose a lot at once" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="220" y="24" text-anchor="middle" font-size="16" font-weight="700">Same book size, different risk</text>
<text x="110" y="52" text-anchor="middle" font-weight="700">Diversified</text>
<text x="330" y="52" text-anchor="middle" font-weight="700">Concentrated</text>
<rect x="40" y="64" width="26" height="26" rx="3" fill="#bbf7d0"/><rect x="70" y="64" width="26" height="26" rx="3" fill="#bbf7d0"/><rect x="100" y="64" width="26" height="26" rx="3" fill="#fecdd3"/><rect x="130" y="64" width="26" height="26" rx="3" fill="#bbf7d0"/><rect x="160" y="64" width="26" height="26" rx="3" fill="#bbf7d0"/>
<rect x="40" y="94" width="26" height="26" rx="3" fill="#bbf7d0"/><rect x="70" y="94" width="26" height="26" rx="3" fill="#bbf7d0"/><rect x="100" y="94" width="26" height="26" rx="3" fill="#bbf7d0"/><rect x="130" y="94" width="26" height="26" rx="3" fill="#bbf7d0"/><rect x="160" y="94" width="26" height="26" rx="3" fill="#fecdd3"/>
<rect x="270" y="64" width="60" height="56" rx="4" fill="#fecdd3"/><rect x="334" y="64" width="26" height="26" rx="3" fill="#bbf7d0"/><rect x="364" y="64" width="26" height="26" rx="3" fill="#bbf7d0"/><rect x="334" y="94" width="26" height="26" rx="3" fill="#bbf7d0"/><rect x="364" y="94" width="26" height="26" rx="3" fill="#bbf7d0"/>
<text x="110" y="146" text-anchor="middle" font-size="12" fill="#4b5563">two small defaults</text>
<text x="330" y="146" text-anchor="middle" font-size="12" fill="#4b5563">one default, a third of the book</text>
<text x="220" y="182" text-anchor="middle" font-size="12" fill="#4b5563">Correlation: in a downturn, many borrowers fail together.</text>
</g>
</svg>

## 1 — Three kinds of concentration

| Kind | Example | Guard |
|---|---|---|
| Single name | One large borrower | Large exposure limits |
| Group | Companies under one owner | Group limits |
| Sector or region | Real estate, one state | Sector limits in the risk appetite |

## 2 — India's large exposure limits (banks)

| Exposure to | Limit, share of Tier 1 capital |
|---|---|
| A single counterparty | 20% (up to 25% with board approval) |
| A group of connected counterparties | 25% |

## 3 — Measuring concentration

$$
\\text{HHI} = \\sum_{i} s_i^{2} \\qquad s_i = \\text{each exposure's share of the book}
$$

**Read it as:** 100 equal loans give an HHI of 0.01; one loan that is half the book pushes it above 0.25. Higher means more concentrated.

## 4 — Portfolio health numbers (India)

| Metric | Formula | What it tells you |
|---|---|---|
| Gross NPA ratio | Gross NPAs ÷ gross advances | How much of the book has defaulted |
| Net NPA ratio | (Gross NPAs − provisions) ÷ net advances | What is left unprovided |
| Provision coverage ratio (PCR) | Provisions ÷ gross NPAs | How well bad loans are covered |
| Slippage ratio | New NPAs in the period ÷ standard advances at start | How fast good loans are going bad |
| Credit cost | Provision charge ÷ average advances | The P&L cost of credit risk |

## 5 — Stress testing

**Ask: if the economy turned sharply, how much would we lose, and would capital still be above the minimum?**

| Step | Example |
|---|---|
| Scenario | GDP falls 3%, unemployment up, property prices −20% |
| Translate | Scenario → higher PDs, lower collateral values, more drawing on limits |
| Result | Extra losses, lower profit, higher RWA |
| Judge | Does CET1 stay above minimum plus buffer? If not, act now |
`,
  deeper: `
## Why correlation matters

- If defaults were independent, a large book would lose close to its average every year.
- Borrowers share the economy: when it turns, defaults rise together. That makes bad years much worse than average — the reason capital models use a correlation parameter.
- Correlation is higher within a sector or region, which is why sector concentration is dangerous even when single names are small.

## Types of stress test

| Type | Question |
|---|---|
| Sensitivity | What if one thing moves — PDs up 50%? |
| Scenario | What if a coherent story unfolds — recession, rate shock? |
| Reverse stress test | What would it take to break the bank? Is that plausible? |

RBI runs system-wide stress tests in its Financial Stability Report; banks run their own under ICAAP.

## Hidden concentrations

| Hidden link | Example |
|---|---|
| Common guarantor | Many loans guaranteed by the same promoter |
| Common collateral | Several loans secured on property in one micro-market |
| Supply chain | A supplier and its main buyer both borrow |
| Same counterparty through derivatives and loans | Exposures in different systems not added up |

## Limits framework

- Board-approved limits: single name, group, sector, product, rating grade, region.
- Early-warning triggers below each limit (for example at 80% of the limit) prompt review before the breach.
- Breaches are reported with the reason and the plan to return inside the limit.

## Reading a portfolio dashboard

| If you see | Ask |
|---|---|
| GNPA stable but slippage rising | Are write-offs and upgrades hiding new bad loans? |
| PCR falling | Are new NPAs under-provided, or are old ones being written off? |
| SMA-2 growing | Next quarter's NPAs are building |
| Credit cost jump | New defaults, a model or overlay change, or a scenario update? |

## The analyst's view

Portfolio reports aggregate the same exposures by different keys — borrower, group, sector, region, grade. Getting one key wrong (for example the wrong industry code) silently moves exposure between limits. Reference data quality is the foundation.
`,
};
