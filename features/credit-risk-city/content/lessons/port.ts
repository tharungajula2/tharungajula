import type { Lesson } from './types';

export const portLesson: Lesson = {
  district: 'port',
  minutes: 5,
  verified: false,
  idea: "A bank can pass credit risk on — by selling loans, packaging them into securities, or buying protection — but only what truly leaves counts, and tranching decides who takes the first loss.",
  surface: `
<svg viewBox="0 0 440 176" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Securitisation tranches: losses hit equity first, then mezzanine, then senior" style="width:100%;max-width:440px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="#1f2937">
<text x="220" y="24" text-anchor="middle" font-size="16" font-weight="700">Who takes the loss first</text>
<rect x="10" y="44" width="135" height="64" rx="8" fill="#fecdd3"/><text x="77" y="70" text-anchor="middle" font-weight="700" font-size="12">Equity</text><text x="77" y="90" text-anchor="middle" font-size="11">first loss</text>
<rect x="153" y="44" width="135" height="64" rx="8" fill="#fde68a"/><text x="220" y="70" text-anchor="middle" font-weight="700" font-size="12">Mezzanine</text><text x="220" y="90" text-anchor="middle" font-size="11">next</text>
<rect x="295" y="44" width="135" height="64" rx="8" fill="#bbf7d0"/><text x="363" y="70" text-anchor="middle" font-weight="700" font-size="12">Senior</text><text x="363" y="90" text-anchor="middle" font-size="11">last, safest</text>
<text x="220" y="140" text-anchor="middle" font-size="12" fill="#4b5563">Losses on the loan pool eat the tranches bottom-up;</text>
<text x="220" y="158" text-anchor="middle" font-size="12" fill="#4b5563">cash is paid top-down (the waterfall).</text>
</g>
</svg>

## 1 — Ways to move credit risk

| Tool | What happens | Risk that leaves |
|---|---|---|
| Direct assignment | Loans sold outright to another lender | All of it, if truly sold |
| Securitisation | Loans pooled into a vehicle that issues securities in tranches | The tranches sold |
| Co-lending (India) | Bank and NBFC lend together, sharing each loan | The partner's share |
| Credit default swap (CDS) | Protection bought on a borrower | Default risk, now on the protection seller |
| Credit insurance, guarantees | A third party pays if the borrower doesn't | Covered part |

## 2 — Tranching

$$
\\text{Tranche loss} = \\min\\big(\\max(\\text{pool loss} - \\text{attachment point},\\ 0),\\ \\text{thickness}\\big)
$$

| Tranche | Attaches at | Pool loss 8% → tranche loses |
|---|---|---|
| Equity 0–5% | 0% | All of it |
| Mezzanine 5–15% | 5% | 3 of 10 points: 30% |
| Senior 15–100% | 15% | Nothing |

## 3 — Skin in the game

RBI's securitisation rules require the originator to keep a share of the risk — the minimum retention requirement (MRR), typically 5–10% depending on the loans — and to hold loans for a minimum period before selling them, so lenders do not originate carelessly to sell.

## 4 — Only real transfer counts

| Test | Question |
|---|---|
| Accounting derecognition | Have substantially all risks and rewards passed to the buyer? |
| Significant risk transfer (SRT) for capital | Has enough risk left that capital can be released? |

**Read it as:** a bank that keeps the first-loss piece keeps most of the risk, whatever the paperwork says.
`,
  deeper: `
## Securitisation step by step

| Step | What happens |
|---|---|
| Pool | Similar loans selected — vehicle loans, microfinance, home loans |
| Vehicle | A special purpose vehicle (SPV), usually a trust, buys the pool |
| Tranches | SPV issues pass-through certificates in tranches with different ratings |
| Credit enhancement | Over-collateralisation, cash collateral, first-loss by the originator |
| Servicing | Originator usually keeps collecting from borrowers, for a fee |
| Waterfall | Collections pay costs, then senior, then mezzanine, then equity |

## Why banks and NBFCs do it

- Funding: NBFCs raise money against their loan books.
- Capital: selling risk releases capital (if the transfer is significant).
- Priority sector: banks buy pools of priority-sector loans to meet targets.

## Credit default swaps in one table

| | Protection buyer | Protection seller |
|---|---|---|
| Pays | A regular premium (the CDS spread) | Nothing unless a credit event |
| Receives | Loss payment on a credit event | The premium |
| Credit risk to | The seller (counterparty risk) | The reference borrower |

## Risks that stay behind

| Risk | Why |
|---|---|
| Retained tranches | Usually the riskiest piece |
| Implicit support | Pressure to help a failing deal to protect reputation |
| Counterparty risk | If the protection seller fails, protection vanishes |
| Servicing and operational | The originator still collects and reports |

## Data and reporting

- Every loan in a pool must be flagged so it is not counted twice — once in the bank's book and once through the securities it holds.
- Pool performance (collections, delinquencies, prepayments) is reported monthly to investors and rating agencies.
- ECL and capital treatment differ for loans kept, loans sold and tranches held — the reporting systems must know which is which.
`,
};
