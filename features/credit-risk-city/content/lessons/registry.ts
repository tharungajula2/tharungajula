import type { Lesson } from './types';

export const registryLesson: Lesson = {
  district: 'registry',
  minutes: 5,
  verified: false,
  idea: 'Collateral does not make a borrower pay — it decides how much comes back when they don\u2019t. What counts is its value on a bad day, after haircuts, costs and time.',
  surface: `
<svg viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Collateral waterfall: a property valued at 100 falls to 70 in a forced sale, then to 64 after legal and sale costs, then to about 53 in today's money after two years of recovery" style="width:100%;max-width:420px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="210" y="22" text-anchor="middle" font-size="16" font-weight="700">What ₹100 of property is really worth</text>
<line x1="30" y1="210" x2="400" y2="210" stroke="#9ca3af" stroke-width="1.2"/>
<rect x="40" y="60" width="64" height="150" rx="4" fill="#bbf7d0"/><text x="72" y="54" text-anchor="middle" font-weight="700">100</text><text x="72" y="228" text-anchor="middle" font-size="12">Valuation</text>
<rect x="130" y="105" width="64" height="105" rx="4" fill="#fde68a"/><text x="162" y="99" text-anchor="middle" font-weight="700">70</text><text x="162" y="228" text-anchor="middle" font-size="12">Forced sale</text>
<rect x="220" y="114" width="64" height="96" rx="4" fill="#fecdd3"/><text x="252" y="108" text-anchor="middle" font-weight="700">64</text><text x="252" y="228" text-anchor="middle" font-size="12">After costs</text>
<rect x="310" y="130" width="64" height="80" rx="4" fill="#cbd5e1"/><text x="342" y="124" text-anchor="middle" font-weight="700">53</text><text x="342" y="228" text-anchor="middle" font-size="12">In today's ₹</text>
<text x="210" y="246" text-anchor="middle" font-size="11" fill="#4b5563">30% sale discount · ₹6 costs · 2 years at 10%</text>
</g>
</svg>

## 1 — Types of security

| Type (India) | What it is | Typical use |
|---|---|---|
| Hypothecation | Charge on movable assets that stay with the borrower | Stock, receivables, vehicles, machinery |
| Pledge | Movable asset handed to the bank | Gold, shares, fixed deposits |
| Mortgage | Charge on immovable property | Home loans, loan against property |
| Lien / set-off | Bank's right over the borrower's deposits with it | Loans against fixed deposits |
| Assignment | Rights to receive money transferred to the bank | Receivables, insurance policies |

**Primary security** is the asset the loan pays for (the stock for a cash credit). **Collateral security** is extra, such as the owner's house.

## 2 — The haircut

$$
\\text{Value counted} = \\text{market value} \\times (1 - \\text{haircut})
$$

**Read it as:** the haircut is how far the value could fall before the bank can sell. Cash: none. Government bonds: small. Shares and stock-in-trade: large.

## 3 — Loan-to-value (LTV)

$$
\\text{LTV} = \\dfrac{\\text{loan}}{\\text{value of the security}}
$$

| RBI cap on home loans | Maximum LTV |
|---|---|
| Up to ₹30 lakh | 90% |
| Over ₹30 lakh to ₹75 lakh | 80% |
| Over ₹75 lakh | 75% |

**Read it as:** a lower LTV leaves a cushion. If prices fall 20%, a loan at 90% LTV is now above the property's value.

## 4 — Guarantees

**A guarantee adds a second payer; it does not change the first.**

| Guarantor | Effect |
|---|---|
| Promoter (personal guarantee) | Keeps the owner committed; common in Indian MSME lending |
| Another bank or a strong company | The covered part can take the guarantor's lower risk weight (substitution) |
| CGTMSE (credit guarantee scheme for micro and small enterprises) | Covers part of the loss on eligible collateral-free MSME loans |

## 5 — Registration makes it real

| Register | What | Deadline |
|---|---|---|
| ROC (Registrar of Companies), form CHG-1 | Charges created by a company | 30 days from creation |
| CERSAI (central registry) | Security interests, especially property | 30 days |

**Read it as:** an unregistered charge may not hold against other creditors or a liquidator. Security the bank cannot enforce is worth nothing.
`,
  deeper: `
## Why collateral lowers LGD, not PD

| Parameter | Driven by | Collateral effect |
|---|---|---|
| PD | The borrower's ability and will to pay | Little — a secured borrower can fail just as easily |
| LGD | How much is recovered after default | Large — more comes back |

(A borrower with their home at stake may try harder to pay, so some models allow a small PD effect. The main effect is on LGD.)

## Recovery value in steps

$$
\\text{Recovery (today's money)} = \\dfrac{\\text{value} \\times (1 - \\text{haircut}) - \\text{costs}}{(1 + r)^{\\text{years to sell}}}
$$

$$
\\text{Secured LGD} \\approx 1 - \\dfrac{\\text{recovery}}{\\text{EAD}}
$$

| Driver | Example of a bad outcome |
|---|---|
| Value falls | Property market drops 20% in a downturn |
| Forced-sale discount | Buyers pay less for repossessed assets |
| Costs | Legal fees, sale commissions, maintenance while unsold |
| Time | Two to five years in court |

## Valuation and monitoring

- Property: revalued periodically by empanelled valuers — more often for large or impaired loans.
- Stock and receivables: monthly stock statements; periodic stock audits for larger limits.
- Shares and other market collateral: marked to market often, with top-ups (margin calls) if value falls.

## Ranking: who gets paid first

| Charge | Paid |
|---|---|
| First charge (exclusive or pari passu — shared equally with other first-charge lenders) | First, from the sale of that asset |
| Second charge | Only after first-charge holders are fully paid |
| Unsecured | From what is left, alongside other unsecured creditors |

## Collateral in capital rules (Basel credit risk mitigation)

| Approach | How it works |
|---|---|
| Financial collateral (comprehensive approach) | Exposure reduced by collateral value after supervisory haircuts |
| Guarantees and credit derivatives | Covered part moves to the protection provider's risk weight |
| Property | Separate risk-weight tables by LTV for residential and commercial real estate |

## The BA's checklist for a collateral system

- Every item of security linked to the facilities it secures, with the share allocated to each.
- Valuation date, valuer and next due date stored — a stale value is a data-quality flag.
- Charge registration numbers and dates captured, with alerts before deadlines.
- Haircuts held as parameters, not hard-coded, so policy changes don't need code changes.
`,
};
