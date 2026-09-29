import type { Lesson } from './types';

export const observatoryLesson: Lesson = {
  district: 'observatory',
  minutes: 6,
  verified: false,
  idea: 'Every credit loss number is built from three measurements — how likely default is (PD), how much is lost if it happens (LGD), and how much is owed at that moment (EAD).',
  surface: `
<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Expected loss equals PD times LGD times EAD: 2 percent times 45 percent times 100 crore equals 0.9 crore" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="220" y="24" text-anchor="middle" font-size="16" font-weight="700">Expected loss in one line</text>
<rect x="20" y="50" width="90" height="60" rx="8" fill="#bfdbfe"/><text x="65" y="76" text-anchor="middle" font-weight="700">PD</text><text x="65" y="96" text-anchor="middle">2%</text>
<text x="122" y="86" text-anchor="middle" font-size="18">×</text>
<rect x="134" y="50" width="90" height="60" rx="8" fill="#fde68a"/><text x="179" y="76" text-anchor="middle" font-weight="700">LGD</text><text x="179" y="96" text-anchor="middle">45%</text>
<text x="236" y="86" text-anchor="middle" font-size="18">×</text>
<rect x="248" y="50" width="90" height="60" rx="8" fill="#bbf7d0"/><text x="293" y="76" text-anchor="middle" font-weight="700">EAD</text><text x="293" y="96" text-anchor="middle">₹100 cr</text>
<text x="350" y="86" text-anchor="middle" font-size="18">=</text>
<rect x="362" y="50" width="66" height="60" rx="8" fill="#fecdd3"/><text x="395" y="76" text-anchor="middle" font-weight="700">EL</text><text x="395" y="96" text-anchor="middle">₹0.9 cr</text>
<text x="220" y="146" text-anchor="middle" font-size="12" fill="#4b5563">PD: the borrower. LGD: the security and the law.</text>
<text x="220" y="164" text-anchor="middle" font-size="12" fill="#4b5563">EAD: the product and its unused limit.</text>
</g>
</svg>

## 1 — The three numbers

| Term | Meaning | Driven by |
|---|---|---|
| PD, probability of default | Chance the borrower defaults within 12 months | The borrower's strength |
| LGD, loss given default | Share of the exposure lost after recoveries | Collateral, seniority, the legal system, time |
| EAD, exposure at default | Amount owed when default happens | The product and its undrawn limit |

$$
\\text{EL} = \\text{PD} \\times \\text{LGD} \\times \\text{EAD}
$$

$$
\\text{EAD} = \\text{drawn} + \\text{CCF} \\times \\text{undrawn}
$$

**Read it as:** a ₹100 crore loan with a 2% PD and 45% LGD is expected to lose ₹0.9 crore a year on average. The credit conversion factor (CCF) is the share of an unused limit likely to be drawn before default.

## 2 — Expected and unexpected loss

| Layer | Meaning | Paid for by |
|---|---|---|
| EL, expected loss | The average year's loss | Provisions (IFRS 9) and pricing |
| UL, unexpected loss | How much worse a 1-in-1,000 year is than average | Capital (Basel) |
| Tail | Worse than 1-in-1,000 | Stress tests and management action |

**Read it as:** losses are not the same every year. Defaults cluster when the economy turns, so the bad years are far worse than the average — that gap is what capital is for.

## 3 — Point-in-time and through-the-cycle

| PD type | Meaning | Used for |
|---|---|---|
| Point-in-time (PIT) | Moves with today's economy | IFRS 9 provisions |
| Through-the-cycle (TTC) | Average over a whole economic cycle; stable | Basel capital |

## 4 — 12-month and lifetime

| Horizon | Meaning | Used for |
|---|---|---|
| 12-month PD | Default within the next year | IFRS 9 Stage 1, Basel capital |
| Lifetime PD | Default at any time before the loan ends | IFRS 9 Stages 2 and 3 |

$$
\\text{Lifetime PD} = 1 - (1 - p)^{n} \\qquad p = \\text{yearly PD},\\ n = \\text{years}
$$

**Read it as:** a 2% yearly PD over a 5-year loan gives a lifetime PD of about 9.6% — not 10%, because a borrower can only default once.
`,
  deeper: `
## Where each number comes from

| Parameter | Typical model | Data it needs |
|---|---|---|
| PD | Scorecard or rating model, calibrated to default rates by grade | Borrower data, financials, conduct, defaults over years |
| LGD | Workout LGD: recoveries and costs after past defaults, discounted | Every recovery cash flow and cost, by date |
| EAD / CCF | How much of unused limits was drawn before past defaults | Limit and balance history before default |

**Read it as:** each model is only as good as its history. Missing recovery cash flows weaken LGD; missing limit histories weaken CCF.

## Grades and master scales

Banks map every borrower to a grade on a **master scale**: each grade has a PD band, so a corporate rating and an SME score can be compared.

| Grade | PD band (illustrative) |
|---|---|
| 1–3 | Under 0.2% |
| 4–6 | 0.2% to 1% |
| 7–9 | 1% to 5% |
| 10–12 | 5% to 20% |
| Default | 100% |

## Downturn LGD and correlation

- **Downturn LGD:** Basel requires LGD that reflects bad times, when collateral values fall and recoveries shrink — not the average.
- **Correlation:** borrowers share the same economy. When it turns, many default together; that is why losses have a long bad tail and why concentration is dangerous.

## How PD changes with the economy

| Economy | PIT PD | TTC PD |
|---|---|---|
| Boom | Falls | About the same |
| Recession | Rises sharply | About the same |

**Read it as:** IFRS 9 provisions (PIT) jump in a downturn; Basel capital built on TTC PDs moves less — the two are designed to answer different questions.

## Marginal PD for lifetime ECL

Lifetime ECL is built year by year: the chance of surviving to each year, times the chance of defaulting in that year, times the loss if it does.

$$
\\text{Marginal PD}_t = \\text{survival to year } (t-1) \\times \\text{PD}_t
$$

$$
\\text{Lifetime ECL} = \\sum_{t} \\text{marginal PD}_t \\times \\text{LGD}_t \\times \\text{EAD}_t \\times \\text{DF}_t
$$

## The analyst's checklist

- Is PD 12-month or lifetime, PIT or TTC? Using the wrong one is the most common error.
- Is LGD downturn (capital) or best-estimate with scenarios (IFRS 9)?
- Is EAD including the undrawn limit through a CCF?
- Are all three at the same level — facility or borrower?
`,
};
