import type { Lesson } from './types';

export const modellabLesson: Lesson = {
  district: 'modellab',
  minutes: 6,
  verified: false,
  idea: 'A credit model must do two different jobs — rank good borrowers above bad ones, and put the right number on each — and it must be checked independently, and again every year.',
  surface: `
<svg viewBox="0 0 440 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two checks for a model: discrimination, whether bads score lower than goods, and calibration, whether predicted default rates match actual ones" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="220" y="24" text-anchor="middle" font-size="16" font-weight="700">Two separate questions</text>
<rect x="20" y="44" width="190" height="120" rx="10" fill="#bfdbfe"/>
<text x="115" y="70" text-anchor="middle" font-weight="700">Discrimination</text>
<text x="115" y="94" text-anchor="middle" font-size="12">Does it rank bads</text>
<text x="115" y="110" text-anchor="middle" font-size="12">below goods?</text>
<text x="115" y="140" text-anchor="middle" font-size="12" font-weight="700">AUC, Gini, KS</text>
<rect x="230" y="44" width="190" height="120" rx="10" fill="#fde68a"/>
<text x="325" y="70" text-anchor="middle" font-weight="700">Calibration</text>
<text x="325" y="94" text-anchor="middle" font-size="12">Is the predicted rate</text>
<text x="325" y="110" text-anchor="middle" font-size="12">close to the actual?</text>
<text x="325" y="140" text-anchor="middle" font-size="12" font-weight="700">Predicted vs actual</text>
<text x="220" y="192" text-anchor="middle" font-size="12" fill="#4b5563">A model can rank well and still put the wrong number on everyone.</text>
</g>
</svg>

## 1 — What a scorecard is

**A scorecard adds up points for each characteristic of a borrower; a higher score means lower risk.**

| Characteristic | Band | Points |
|---|---|---|
| Months with the bank | Over 36 | +30 |
| Income | Over ₹1 lakh a month | +45 |
| Past delinquency | Any 30+ DPD in 12 months | −20 |

The total is compared with a cut-off, and each score band maps to a PD.

## 2 — Discrimination: does it rank?

\`\`\`formula
Gini = 2 × AUC − 1
\`\`\`

| AUC | Gini | Meaning |
|---|---|---|
| 0.5 | 0 | No better than a coin toss |
| 0.7 | 0.4 | Useful |
| 0.8 | 0.6 | Strong for application scorecards |

**Read it as:** AUC is the chance that a randomly picked bad borrower scores lower than a randomly picked good one.

## 3 — Calibration: is the number right?

| Grade | Predicted PD | Actual default rate | Verdict |
|---|---|---|---|
| A | 0.5% | 0.6% | Fine |
| B | 2% | 2.1% | Fine |
| C | 5% | 9% | Under-predicting — provisions and capital too low |

## 4 — Is today's population still like the one the model learned from?

\`\`\`formula
PSI = Σ (actual % − expected %) × ln(actual % ÷ expected %)
\`\`\`

| PSI | Reading |
|---|---|
| Under 0.10 | Stable |
| 0.10 to 0.25 | Watch — some shift |
| Over 0.25 | Significant shift — investigate |

## 5 — Validation

**A model is checked by people independent of those who built it: conceptual soundness, data, performance, and whether it is used correctly — at approval and at least yearly.**
`,
  deeper: `
## The model life cycle

| Stage | What happens | Evidence |
|---|---|---|
| Develop | Data, segmentation, variable selection, calibration | Development document |
| Validate | Independent review before use | Validation report with findings |
| Approve | Model risk or credit committee | Minutes, conditions |
| Implement | Coded into systems exactly as approved | Test results, reconciliation |
| Monitor | Performance tracked quarterly or monthly | Monitoring pack: Gini, calibration, PSI |
| Review | Full revalidation periodically, or after a trigger | Updated report |

## What validators look at

| Area | Questions |
|---|---|
| Conceptual soundness | Does the approach fit the product and data? Are drivers sensible (higher debt → higher PD)? |
| Data | Is the development sample representative, complete, and free of leakage (information from after the decision)? |
| Discrimination | Gini on development, out-of-time and recent samples |
| Calibration | Predicted vs actual by grade; binomial or similar tests |
| Stability | PSI of the score and of each characteristic |
| Use | Overrides, cut-offs and how outputs feed ECL and capital |

## Overrides

- Credit officers can override a score or rating when they know something the model doesn't.
- Every override needs a reason and is tracked: a high override rate means the model is not trusted — or not fit.
- Overrides that go one way (almost always upgrades) are a red flag.

## Characteristic analysis

When PSI moves, check each input: which characteristic has shifted? A new marketing channel, a policy change or an economic shift usually explains it. The fix may be recalibration (moving the PD scale) rather than rebuilding the model.

## Models in the wider bank

| Model | Feeds |
|---|---|
| Application scorecard | Approve / decline, pricing |
| Behaviour score | Limit changes, collections priority, early warning |
| Rating model (PD) | Pricing, ECL, capital, limits |
| LGD, CCF models | ECL, capital |
| Macro overlays and scenarios | IFRS 9 forward-looking ECL |

## The analyst's role

- Specify how model outputs are stored with version, date and inputs, so any number can be reproduced.
- Build the monitoring reports: the same metrics, the same way, every period.
- Test that the implemented model matches the approved one on a sample of real cases.
`,
};
