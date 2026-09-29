import type { Lesson } from './types';

export const mintLesson: Lesson = {
  district: 'mint',
  minutes: 5,
  verified: false,
  idea: 'A bank borrows cheaply, lends at a higher rate, and lives on the thin gap — so a small share of loans going bad can eat a large share of its own money.',
  surface: `
<svg viewBox="0 0 480 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bank balance sheet: assets on the left are mostly loans; funding on the right is mostly deposits with a thin layer of equity on top" style="width:100%;max-width:480px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="14" fill="#1f2937">
<text x="240" y="24" text-anchor="middle" font-size="16" font-weight="700">A bank's balance sheet (₹100)</text>
<text x="135" y="52" text-anchor="middle" font-weight="700">What it owns</text>
<text x="325" y="52" text-anchor="middle" font-weight="700">Where the money came from</text>
<rect x="70" y="64" width="130" height="44" rx="4" fill="#cbd5e1"/><text x="135" y="91" text-anchor="middle" font-size="13">Cash &amp; bonds · 25</text>
<rect x="70" y="108" width="130" height="176" rx="4" fill="#bbf7d0"/><text x="135" y="192" text-anchor="middle" font-weight="700">Loans · 75</text><text x="135" y="212" text-anchor="middle" font-size="12">credit risk lives here</text>
<rect x="260" y="64" width="130" height="18" rx="4" fill="#fde68a"/><text x="398" y="78" font-size="12" font-weight="700">← Equity · 8</text>
<rect x="260" y="82" width="130" height="28" rx="4" fill="#fecdd3"/><text x="325" y="101" text-anchor="middle" font-size="13">Borrowings · 12</text>
<rect x="260" y="110" width="130" height="174" rx="4" fill="#bfdbfe"/><text x="325" y="192" text-anchor="middle" font-weight="700">Deposits · 80</text><text x="325" y="212" text-anchor="middle" font-size="12">owed back to savers</text>
<text x="240" y="306" text-anchor="middle" font-size="12" fill="#4b5563">Assets = liabilities + equity.</text>
<text x="240" y="322" text-anchor="middle" font-size="12" fill="#4b5563">A ₹4 loss on loans wipes out half of the ₹8 equity.</text>
</g>
</svg>

## 1 — The balance sheet

**Loans are the bank's assets. Deposits are its debts. Equity — the owners' money — is a thin layer that takes every loss first.**

| Line | What it is | Why it matters for credit risk |
|---|---|---|
| Loans (asset) | Money lent to borrowers | Where losses happen |
| Deposits (liability) | Money owed back to savers | Must be repaid in full, whatever loans do |
| Equity (capital) | Owners' money | Absorbs losses; when it runs out, the bank fails |

**Read it as:** if 5% of loans go bad and equity is 8% of assets, most of the owners' money is gone. That is why regulators set minimum capital.

## 2 — How a bank earns: the spread

$$
\\text{NII} = \\text{interest earned} - \\text{interest paid}
$$

$$
\\text{NIM} = \\dfrac{\\text{NII}}{\\text{average interest-earning assets}}
$$

| Per ₹100 of loans, a year | ₹ |
|---|---|
| Interest earned at 10% | 10.0 |
| Interest paid on funding at 6.5% | −6.5 |
| **NII (the margin)** | **3.5** |
| Operating costs | −1.5 |
| Credit losses | −1.0 |
| **Profit before tax** | **1.0** |

**Read it as:** credit losses are paid out of a margin of about 3%. Indian banks' NIMs are typically around 3–3.5%, so a 1% loss rate takes a third of it.

## 3 — Money has a time value

**A rupee today is worth more than a rupee later, because today's rupee can earn interest.**

$$
\\text{PV} = \\dfrac{\\text{future cash}}{(1 + r)^{\\text{years}}}
$$

| ₹100 received in… | Worth today at 10% |
|---|---|
| 1 year | ₹90.91 |
| 2 years | ₹82.64 |
| 5 years | ₹62.09 |

**Read it as:** a recovery that arrives three years after default is worth much less than the same cash next month. Slow recoveries are real losses.

## 4 — The effective interest rate (EIR)

**The EIR is the one rate that makes a loan's future cash flows equal to the cash actually lent — fees and costs included.**

| Example | Numbers |
|---|---|
| Loan | ₹100 at a 10% coupon, 5 years |
| Upfront processing fee | ₹2, so the bank really lends ₹98 |
| EIR | about 10.5%: the fee is spread over the loan's life as income |

Under IFRS 9 (and India's Ind AS 109), interest income is recognised at the EIR, and expected credit losses are discounted at the EIR.
`,
  deeper: `
## Where interest rates come from in India

| Benchmark | Used for | How it works |
|---|---|---|
| External benchmark (EBLR), usually the RBI repo rate | Floating-rate retail and MSME loans since October 2019 | Loan rate = repo + a spread; moves when the repo rate moves |
| MCLR (marginal cost of funds based lending rate) | Older floating loans and many corporate loans | Set by each bank from its own cost of funds |
| Fixed rate | Some retail and corporate loans | Set at sanction |

**Read it as:** the rate a borrower pays = benchmark + spread. The spread carries the bank's costs, a charge for credit risk and its profit. The branch district shows how that spread is built.

## Funds transfer pricing (FTP)

**Inside a bank, the treasury "lends" money to the lending business at an internal price — the FTP rate — so each business is judged on the margin it really earns.**

| Piece | Who owns it |
|---|---|
| FTP rate (cost of funds for that tenor) | Treasury — takes interest-rate and liquidity risk |
| Loan rate − FTP rate | The lending business — takes the credit risk |

This is why credit-risk pricing starts from the FTP rate, not the deposit rate.

## How a credit loss reaches equity

| Step | Where it shows |
|---|---|
| 1. Bank expects a loss on a loan | Sets aside a provision (loss allowance) |
| 2. The provision charge | Reduces profit in the P&L |
| 3. Lower profit | Less retained earnings, so less equity |
| 4. Loan finally written off | Uses the provision already made — no second hit to profit |

**Read it as:** provisions are not a cash pile in a vault. They reduce the value of loans on the balance sheet and reduce equity through profit.

## The EIR, more precisely

$$
\\sum_{t} \\dfrac{\\text{cash flow}_t}{(1 + \\text{EIR})^{t}} = \\text{amount lent, net of fees and costs}
$$

- Fees that are part of the lending (processing, commitment for a drawn loan) go into the EIR; service fees for other work do not.
- The EIR is fixed at the start (for a fixed-rate loan) and used for the loan's whole life — including to discount expected losses under IFRS 9.
- Once a loan is credit-impaired (Stage 3), interest income is earned on the net amount after the allowance.

## Liquidity versus solvency

| Risk | Question | Failure looks like |
|---|---|---|
| Solvency | Are assets worth more than debts? | Losses exceed equity |
| Liquidity | Can the bank pay what falls due today? | Deposits leave faster than loans repay |

Credit risk is mainly a solvency risk — but a bank with bad loans also loses depositors' trust, so the two often arrive together.
`,
};
