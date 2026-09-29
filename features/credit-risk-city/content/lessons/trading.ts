import type { Lesson } from './types';

export const tradingLesson: Lesson = {
  district: 'trading',
  minutes: 5,
  verified: false,
  idea: "With a derivative, the bank is exposed only if the contract is worth something to it when the other side fails — and that value can grow, so the exposure is today's value plus a buffer for tomorrow.",
  surface: `
<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Counterparty exposure: replacement cost today plus potential future exposure, reduced by netting and collateral" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="220" y="24" text-anchor="middle" font-size="16" font-weight="700">Derivative exposure</text>
<rect x="30" y="50" width="110" height="60" rx="8" fill="#bfdbfe"/><text x="85" y="76" text-anchor="middle" font-weight="700">Today</text><text x="85" y="96" text-anchor="middle" font-size="12">replacement cost</text>
<text x="160" y="86" text-anchor="middle" font-size="18">+</text>
<rect x="180" y="50" width="110" height="60" rx="8" fill="#fde68a"/><text x="235" y="76" text-anchor="middle" font-weight="700">Tomorrow</text><text x="235" y="96" text-anchor="middle" font-size="12">potential future</text>
<text x="310" y="86" text-anchor="middle" font-size="18">−</text>
<rect x="330" y="50" width="90" height="60" rx="8" fill="#bbf7d0"/><text x="375" y="76" text-anchor="middle" font-weight="700">Less</text><text x="375" y="96" text-anchor="middle" font-size="12">netting, margin</text>
<text x="220" y="146" text-anchor="middle" font-size="12" fill="#4b5563">The notional is not the exposure:</text>
<text x="220" y="164" text-anchor="middle" font-size="12" fill="#4b5563">a ₹100 crore swap may put only ₹2 crore at risk.</text>
</g>
</svg>

## 1 — Counterparty credit risk in four lines

| Idea | Meaning |
|---|---|
| Exposure exists only if the contract has positive value to the bank | If the other side fails, the bank loses what it would cost to replace the deal |
| Replacement cost (RC) | Today's positive market value, after collateral held |
| Potential future exposure (PFE) | How much that value could grow before the deal ends |
| Netting and collateral | Reduce both |

$$
\\text{EAD}_{\\text{SA-CCR}} = 1.4 \\times (\\text{RC} + \\text{PFE})
$$

**Read it as:** SA-CCR is Basel's standard method for derivative exposure. The 1.4 multiplier is a prudence buffer.

## 2 — Netting

**A netting agreement (under an ISDA master agreement) lets the bank offset deals with the same counterparty: it owes or is owed only the net amount.**

| | Without netting | With netting |
|---|---|---|
| Deal A worth to bank | +₹10 crore | +₹10 crore |
| Deal B worth to bank | −₹7 crore | −₹7 crore |
| Exposure | ₹10 crore (the bank still owes the ₹7) | ₹3 crore |

## 3 — Collateral (margin)

| Type | Purpose |
|---|---|
| Variation margin (VM) | Paid daily to cover today's change in value |
| Initial margin (IM) | Posted upfront to cover moves before a default is closed out |

The terms sit in a credit support annex (CSA) to the ISDA.

## 4 — CVA and wrong-way risk

| Term | Meaning |
|---|---|
| CVA, credit valuation adjustment | The market price of the counterparty's default risk, deducted from the derivative's value |
| Wrong-way risk | Exposure rises exactly when the counterparty weakens — the most dangerous combination |
`,
  deeper: `
## Why notional misleads

| Product | Notional | Typical exposure |
|---|---|---|
| Interest rate swap | ₹100 crore | A few percent of notional; only the difference in interest flows is at risk |
| FX forward | $10 million | Moves with the exchange rate |
| Option bought | Premium paid | Up to its full market value |
| Option sold | Premium received | None to the bank from the buyer (the bank owes, not the other way) |

## SA-CCR in a little more detail

$$
\\text{RC} = \\max(\\text{market value} - \\text{collateral held},\\ 0)
$$

$$
\\text{PFE} = \\text{multiplier} \\times \\text{add-on}
$$

| Piece | Meaning |
|---|---|
| Add-on | Set by asset class (interest rates, FX, credit, equity, commodity), maturity and notional |
| Multiplier | Reduces PFE when the bank holds excess collateral or the net value is negative |
| Hedging sets | Offsetting trades in the same asset class partly cancel |

## Clearing

Many standard derivatives are cleared through a central counterparty (CCP), such as the Clearing Corporation of India for rupee interest-rate swaps and forex. The CCP stands between both sides, collects margin daily, and has a default fund. Exposure to a qualifying CCP gets a low risk weight — but not zero.

## CVA in practice

$$
\\text{CVA} \\approx \\text{LGD} \\times \\sum_{t} \\text{EE}_t \\times \\text{PD}^{\\text{cpty}}_t \\times \\text{DF}_t
$$

- CVA changes daily with market prices and the counterparty's credit spread.
- Basel requires capital for CVA risk: the risk that CVA itself moves against the bank.

## Wrong-way risk, examples

| Case | Why it is wrong-way |
|---|---|
| Buying credit protection from a bank on another bank in the same country | Both likely fail together |
| An exporter's FX forward that pays the bank when the rupee collapses | If the collapse hurts the exporter, it may not be able to pay |
| A repo backed by the borrower's own shares | Collateral value and borrower fall together |

## The analyst's view

- Exposure systems must pull trade data, market values, netting agreements and collateral from different places — and match them by counterparty and agreement.
- A trade booked under the wrong netting set overstates or understates exposure.
- Limits for derivatives are usually on PFE, not notional.
`,
};
