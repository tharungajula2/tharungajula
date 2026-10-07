---
title: "Credit Risk — The Cheatsheet"
description: "Credit risk end to end, taught from zero: retail, SME and corporate lending, IFRS 9, Basel and Basel 3.1, derivatives, CCR and CVA, market risk, treasury, FTP, IRRBB and liquidity."
subject: finance
format: masterclass
order: 1
status: live
updated: 2026-09-29
verified: false
tags:
  - credit risk
  - retail lending
  - corporate lending
  - ifrs 9
  - basel 3.1
  - capital
  - counterparty credit risk
  - cva
  - market risk
  - ftp
  - irrbb
  - liquidity
  - model validation
  - regulatory reporting
  - business analysis
---

**Credit risk on one page**

<svg viewBox="0 0 400 540" width="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Credit risk on one page: rules, measuring risk, lending, then provisions under IFRS 9 beside capital under Basel, derivatives and counterparty risk, markets and the balance sheet, and watching, proving and reporting" style="width:100%;max-width:400px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#1f2937">
<text x="200" y="24" text-anchor="middle" font-size="16" font-weight="700">Credit risk on one page</text>
<rect x="12" y="40" width="376" height="52" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
<text x="26" y="62" font-weight="700" fill="#334155">The rules</text>
<text x="26" y="83" fill="#374151" font-size="14">BCBS, IASB → RBI, PRA, EU, US · 2</text>
<line x1="200" y1="92" x2="200" y2="100" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="200,108 204,100 196,100" fill="#6b7280"/>
<rect x="12" y="108" width="376" height="52" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
<text x="26" y="130" font-weight="700" fill="#1d4ed8">Measure the risk</text>
<text x="26" y="151" fill="#374151" font-size="14">Default · PD × LGD × EAD · 3–4</text>
<line x1="200" y1="160" x2="200" y2="168" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="200,176 204,168 196,168" fill="#6b7280"/>
<rect x="12" y="176" width="376" height="52" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
<text x="26" y="198" font-weight="700" fill="#047857">Lend and protect</text>
<text x="26" y="219" fill="#374151" font-size="14">Retail, SME, corporate, loan life · 5–10</text>
<line x1="103" y1="228" x2="103" y2="236" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="103,244 107,236 99,236" fill="#6b7280"/>
<line x1="297" y1="228" x2="297" y2="236" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="297,244 301,236 293,236" fill="#6b7280"/>
<rect x="12" y="244" width="182" height="52" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
<text x="26" y="266" font-weight="700" fill="#b45309">Provisions</text>
<text x="26" y="287" fill="#374151" font-size="14">IFRS 9 · 11–15</text>
<rect x="206" y="244" width="182" height="52" rx="8" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="1.5"/>
<text x="220" y="266" font-weight="700" fill="#6d28d9">Capital</text>
<text x="220" y="287" fill="#374151" font-size="14">Basel · 16–19</text>
<line x1="103" y1="296" x2="103" y2="304" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="103,312 107,304 99,304" fill="#6b7280"/>
<line x1="297" y1="296" x2="297" y2="304" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="297,312 301,304 293,304" fill="#6b7280"/>
<rect x="12" y="312" width="376" height="52" rx="8" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.5"/>
<text x="26" y="334" font-weight="700" fill="#0e7490">Derivatives and CCR</text>
<text x="26" y="355" fill="#374151" font-size="14">Exposure, netting, CVA, capital · 20–25</text>
<line x1="200" y1="364" x2="200" y2="372" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="200,380 204,372 196,372" fill="#6b7280"/>
<rect x="12" y="380" width="376" height="52" rx="8" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.5"/>
<text x="26" y="402" font-weight="700" fill="#0f766e">Markets and the balance sheet</text>
<text x="26" y="423" fill="#374151" font-size="14">Market risk, FTP, curve, IRRBB, liquidity · 26–32</text>
<line x1="200" y1="432" x2="200" y2="440" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="200,448 204,440 196,440" fill="#6b7280"/>
<rect x="12" y="448" width="376" height="52" rx="8" fill="#fff1f2" stroke="#f43f5e" stroke-width="1.5"/>
<text x="26" y="470" font-weight="700" fill="#be123c">Watch, prove and report</text>
<text x="26" y="491" fill="#374151" font-size="14">Models, portfolio, data, returns · 33–36</text>
<text x="200" y="526" text-anchor="middle" fill="#4b5563">Numbers = sections of this note</text>
</g>
</svg>

**How this note is laid out**

| Part | Sections | Covers |
|---|---|---|
| 1. Foundations | 1–4 | The one idea, who sets the rules, default, PD × LGD × EAD |
| 2. Lending risk | 5–10 | Retail, SME and corporate lending, reducing risk, the life of a loan |
| 3. IFRS 9: the accounting view | 11–15 | Classification (AC, FVOCI, FVTPL), ECL and every way to measure it, the bridge to derivatives |
| 4. Basel: the capital view | 16–19 | Capital, Basel 3.1's six changes, the two books, where provisions meet capital |
| 5. Counterparty credit risk | 20–25 | Derivatives, CCR, exposure, netting and collateral, CVA, capital for CCR |
| 6. Markets, treasury and the balance sheet | 26–32 | Market risk and FRTB, where market meets credit, treasury and FTP, the yield curve, IRRBB, LCR and NSFR, ALM |
| 7. Running the machine | 33–36 | Model checks, portfolio metrics, the data flow, reports |
| 8. Holding it together | 37–41 | Distinctions, edge topics, key numbers, glossary, the whole thing on one screen |

**How to read it**

| Layer | What you get |
|---|---|
| The bold line under each heading | The whole section in one sentence. Read only these for a fast revision |
| Tables and formulas | The cheatsheet layer: everything worth remembering |
| Worked examples | Real numbers, step by step, only where the idea is hard |
| "Read it as" lines | Every formula said in plain words |

## The story — one bank, four clients

**The whole note follows one bank and four clients, so every idea lands on something you have already met.**

| Who | What they are | Where they appear |
|---|---|---|
| **Our Bank** | An Indian bank in Mumbai | Everywhere |
| **The Salaried Borrower** | Earns ₹80,000 a month; wants a home loan and a personal loan | Retail lending, ECL, capital |
| **The SME** | A Pune trading firm with ₹20 crore yearly sales; needs a cash credit line | SME lending, drawing power |
| **The Corporate** | A listed steel maker with ₹4,000 crore yearly sales; needs a term loan | Corporate lending, Basel 3.1 |
| **The Exporter** | A Pune auto-parts maker selling to the US, paid in dollars, paying bills in rupees | Derivatives, CCR, CVA, market risk |

The first three borrow money. The fourth does not borrow at all: it signs a contract with Our Bank to fix a currency rate. That difference is where counterparty credit risk comes from (Part 5).

---

**Part 1 — Foundations**

## 1 — The one idea behind everything

**A bank expects some loans to go bad. The average loss is a cost, paid by provisions. A bad year's extra loss is a risk, paid by capital.**

<svg viewBox="0 0 400 338" width="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chart: the loss distribution of a loan book. Expected loss is the average year, covered by provisions; unexpected loss up to the 99.9% point is covered by capital; the tail beyond is for stress tests" style="width:100%;max-width:400px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#1f2937">
<text x="200.0" y="24.0" text-anchor="middle" font-size="16" font-weight="700">Next year's loss on a loan book</text>
<path d="M 24.3 222.0 L 24.3 218.8 L 26.6 205.7 L 28.8 186.2 L 31.1 164.8 L 33.4 144.1 L 35.6 125.6 L 37.9 109.8 L 40.2 97.0 L 42.5 86.9 L 44.8 79.5 L 47.0 74.4 L 49.3 71.4 L 51.6 70.0 L 53.9 70.1 L 56.1 71.3 L 58.4 73.6 L 60.7 76.6 L 62.9 80.2 L 65.2 84.4 L 67.5 88.8 L 69.8 93.5 L 72.1 98.4 L 74.3 103.4 L 76.6 108.4 L 78.9 113.3 L 78.9 222.0 Z" fill="#fde68a"/>
<path d="M 81.2 222.0 L 81.2 118.3 L 83.4 123.1 L 85.7 127.9 L 88.0 132.5 L 90.3 137.0 L 92.5 141.3 L 94.8 145.5 L 97.1 149.5 L 99.3 153.4 L 101.6 157.0 L 103.9 160.6 L 106.2 163.9 L 108.5 167.1 L 110.7 170.2 L 113.0 173.1 L 115.3 175.8 L 117.5 178.4 L 119.8 180.9 L 122.1 183.2 L 124.4 185.5 L 126.6 187.6 L 128.9 189.5 L 131.2 191.4 L 133.5 193.2 L 135.8 194.9 L 138.0 196.4 L 140.3 197.9 L 142.6 199.3 L 144.8 200.7 L 147.1 201.9 L 149.4 203.1 L 151.7 204.2 L 153.9 205.2 L 156.2 206.2 L 158.5 207.2 L 160.8 208.0 L 163.0 208.9 L 165.3 209.6 L 167.6 210.4 L 169.9 211.0 L 172.2 211.7 L 174.4 212.3 L 176.7 212.9 L 179.0 213.4 L 181.3 213.9 L 183.5 214.4 L 185.8 214.8 L 188.1 215.3 L 190.3 215.7 L 192.6 216.0 L 194.9 216.4 L 197.2 216.7 L 199.4 217.0 L 201.7 217.3 L 204.0 217.6 L 206.3 217.9 L 208.6 218.1 L 210.8 218.3 L 213.1 218.6 L 215.4 218.8 L 217.6 219.0 L 219.9 219.1 L 222.2 219.3 L 224.5 219.5 L 226.8 219.6 L 229.0 219.7 L 231.3 219.9 L 233.6 220.0 L 235.8 220.1 L 238.1 220.2 L 240.4 220.3 L 242.7 220.4 L 245.0 220.5 L 247.2 220.6 L 249.5 220.7 L 251.8 220.8 L 254.0 220.8 L 256.3 220.9 L 258.6 221.0 L 260.9 221.0 L 263.2 221.1 L 265.4 221.1 L 267.7 221.2 L 270.0 221.2 L 272.2 221.3 L 274.5 221.3 L 276.8 221.4 L 279.1 221.4 L 281.4 221.4 L 283.6 221.5 L 285.9 221.5 L 288.2 221.5 L 290.4 221.6 L 292.7 221.6 L 295.0 221.6 L 297.3 221.6 L 299.6 221.7 L 301.8 221.7 L 304.1 221.7 L 306.4 221.7 L 306.4 222.0 Z" fill="#fecdd3"/>
<path d="M 306.4 222.0 L 306.4 221.7 L 308.7 221.7 L 310.9 221.7 L 313.2 221.8 L 315.5 221.8 L 317.7 221.8 L 320.0 221.8 L 322.3 221.8 L 324.6 221.8 L 326.9 221.8 L 329.1 221.8 L 331.4 221.9 L 333.7 221.9 L 335.9 221.9 L 338.2 221.9 L 340.5 221.9 L 342.8 221.9 L 345.1 221.9 L 347.3 221.9 L 349.6 221.9 L 351.9 221.9 L 354.2 221.9 L 356.4 221.9 L 358.7 221.9 L 361.0 221.9 L 363.2 221.9 L 365.5 221.9 L 367.8 221.9 L 370.1 221.9 L 372.3 222.0 L 374.6 222.0 L 376.9 222.0 L 379.2 222.0 L 381.4 222.0 L 383.7 222.0 L 383.7 222.0 Z" fill="#cbd5e1"/>
<path d="M 24.3 218.8 L 26.6 205.7 L 28.8 186.2 L 31.1 164.8 L 33.4 144.1 L 35.6 125.6 L 37.9 109.8 L 40.2 97.0 L 42.5 86.9 L 44.8 79.5 L 47.0 74.4 L 49.3 71.4 L 51.6 70.0 L 53.9 70.1 L 56.1 71.3 L 58.4 73.6 L 60.7 76.6 L 62.9 80.2 L 65.2 84.4 L 67.5 88.8 L 69.8 93.5 L 72.1 98.4 L 74.3 103.4 L 76.6 108.4 L 78.9 113.3 L 81.2 118.3 L 83.4 123.1 L 85.7 127.9 L 88.0 132.5 L 90.3 137.0 L 92.5 141.3 L 94.8 145.5 L 97.1 149.5 L 99.3 153.4 L 101.6 157.0 L 103.9 160.6 L 106.2 163.9 L 108.5 167.1 L 110.7 170.2 L 113.0 173.1 L 115.3 175.8 L 117.5 178.4 L 119.8 180.9 L 122.1 183.2 L 124.4 185.5 L 126.6 187.6 L 128.9 189.5 L 131.2 191.4 L 133.5 193.2 L 135.8 194.9 L 138.0 196.4 L 140.3 197.9 L 142.6 199.3 L 144.8 200.7 L 147.1 201.9 L 149.4 203.1 L 151.7 204.2 L 153.9 205.2 L 156.2 206.2 L 158.5 207.2 L 160.8 208.0 L 163.0 208.9 L 165.3 209.6 L 167.6 210.4 L 169.9 211.0 L 172.2 211.7 L 174.4 212.3 L 176.7 212.9 L 179.0 213.4 L 181.3 213.9 L 183.5 214.4 L 185.8 214.8 L 188.1 215.3 L 190.3 215.7 L 192.6 216.0 L 194.9 216.4 L 197.2 216.7 L 199.4 217.0 L 201.7 217.3 L 204.0 217.6 L 206.3 217.9 L 208.6 218.1 L 210.8 218.3 L 213.1 218.6 L 215.4 218.8 L 217.6 219.0 L 219.9 219.1 L 222.2 219.3 L 224.5 219.5 L 226.8 219.6 L 229.0 219.7 L 231.3 219.9 L 233.6 220.0 L 235.8 220.1 L 238.1 220.2 L 240.4 220.3 L 242.7 220.4 L 245.0 220.5 L 247.2 220.6 L 249.5 220.7 L 251.8 220.8 L 254.0 220.8 L 256.3 220.9 L 258.6 221.0 L 260.9 221.0 L 263.2 221.1 L 265.4 221.1 L 267.7 221.2 L 270.0 221.2 L 272.2 221.3 L 274.5 221.3 L 276.8 221.4 L 279.1 221.4 L 281.4 221.4 L 283.6 221.5 L 285.9 221.5 L 288.2 221.5 L 290.4 221.6 L 292.7 221.6 L 295.0 221.6 L 297.3 221.6 L 299.6 221.7 L 301.8 221.7 L 304.1 221.7 L 306.4 221.7 L 308.7 221.7 L 310.9 221.7 L 313.2 221.8 L 315.5 221.8 L 317.7 221.8 L 320.0 221.8 L 322.3 221.8 L 324.6 221.8 L 326.9 221.8 L 329.1 221.8 L 331.4 221.9 L 333.7 221.9 L 335.9 221.9 L 338.2 221.9 L 340.5 221.9 L 342.8 221.9 L 345.1 221.9 L 347.3 221.9 L 349.6 221.9 L 351.9 221.9 L 354.2 221.9 L 356.4 221.9 L 358.7 221.9 L 361.0 221.9 L 363.2 221.9 L 365.5 221.9 L 367.8 221.9 L 370.1 221.9 L 372.3 222.0 L 374.6 222.0 L 376.9 222.0 L 379.2 222.0 L 381.4 222.0 L 383.7 222.0" fill="none" stroke="#1f2937" stroke-width="2.2" stroke-linejoin="round"/>
<line x1="22.0" y1="222.0" x2="386.0" y2="222.0" stroke="#9ca3af" stroke-width="1.2"/>
<line x1="80.6" y1="54.0" x2="80.6" y2="222.0" stroke="#b45309" stroke-width="1.6" stroke-dasharray="5 4"/>
<line x1="306.4" y1="54.0" x2="306.4" y2="222.0" stroke="#be123c" stroke-width="1.6" stroke-dasharray="5 4"/>
<text x="80.6" y="48.0" text-anchor="middle" font-weight="700" fill="#b45309">EL</text>
<text x="306.4" y="48.0" text-anchor="middle" font-weight="700" fill="#be123c">99.9%</text>
<text x="312.4" y="214.0" fill="#4b5563">tail →</text>
<text x="386.0" y="242.0" text-anchor="end" fill="#4b5563">loss →</text>
<text x="22.0" y="242.0" fill="#4b5563">height = how likely</text>
<rect x="14.0" y="252.0" width="22.0" height="18.0" rx="3" fill="#fde68a"/>
<text x="46.0" y="266.0" font-weight="700">EL: the average year</text>
<text x="236.0" y="266.0">→ provisions, IFRS 9</text>
<rect x="14.0" y="278.0" width="22.0" height="18.0" rx="3" fill="#fecdd3"/>
<text x="46.0" y="292.0" font-weight="700">UL = 99.9% loss − EL</text>
<text x="236.0" y="292.0">→ capital, Basel</text>
<rect x="14.0" y="304.0" width="22.0" height="18.0" rx="3" fill="#cbd5e1"/>
<text x="46.0" y="318.0" font-weight="700">Tail: beyond 99.9%</text>
<text x="236.0" y="318.0">→ stress tests</text>
</g>
</svg>

| Layer | Meaning | Paid for by | Rulebook |
|---|---|---|---|
| EL, expected loss | The average year's loss | Provisions: set aside from profit in advance | IFRS 9 (India: ECL from 1 April 2027) |
| UL, unexpected loss | How much worse a 1-in-1,000 year is | Capital: the owners' money | Basel |
| Tail | Worse than 1-in-1,000 | Stress tests | Stress testing |

**Why the split exists.** Think of a shop that sells 1,000 glasses a year and knows about 10 break. Those 10 are not a surprise; they are priced in. That is expected loss, and a bank handles it the same way: it charges it in the interest rate and sets it aside as a **provision** (money taken out of profit and parked against future losses). But some years 40 glasses break. The extra 30 cannot be priced in, because nobody knows which year it will be. That is unexpected loss, and it is paid from **capital**: the owners' own money, which sits there to absorb shocks so depositors never lose.

| Word | Plain meaning |
|---|---|
| Provision | Money set aside from profit today for losses expected later |
| Capital | The owners' money in the bank; the shock absorber |
| 99.9% | Capital is sized so that only 1 year in 1,000 is worse than it can absorb |

## 2 — Who sets the rules

**Two global bodies write the standards; each country's regulator turns them into local law.**

| Level | Who | Loan-loss rules | Capital rules |
|---|---|---|---|
| Global | BCBS (Basel Committee), IASB (accounting standards) | IFRS 9 | Basel III, and its 2017 finish, Basel 3.1 |
| India | RBI | IRAC today (NPA, fixed provision percentages); ECL from 1 April 2027 | Standardised approach only; revised SA from 1 April 2027 |
| UK | PRA | IFRS 9 | Basel 3.1 from 1 January 2027 |
| EU | EBA, ECB | IFRS 9 | CRR3 from 1 January 2025 |
| US | Fed, OCC, FDIC | CECL: lifetime loss from day one | Basel III endgame, still pending |

| Name | What it is |
|---|---|
| BCBS | The Basel Committee on Banking Supervision: central banks agreeing common capital rules. Its rules are not law until each country adopts them |
| IASB | The body that writes IFRS, the accounting standards most of the world uses |
| IRAC | India's current loan-loss rulebook: income recognition, asset classification and provisioning. It uses fixed percentages by how overdue a loan is |
| Ind AS 109 | India's copy of IFRS 9. NBFCs (non-bank lenders) already use it; banks do not, so RBI is bringing ECL to banks directly from 1 April 2027 |
| CRR3 | The EU's law that brings in Basel 3.1 |
| CECL | The US version of loan-loss accounting: lifetime loss on every loan from the first day |

## 3 — What counts as default

**Default = over 90 days past due (DPD) on a material amount, or unlikely to pay (UTP) in full.**

| DPD | India label | Meaning |
|---|---|---|
| 1–30 | SMA-0 (special mention account) | Early slip |
| 31–60 | SMA-1 | Worrying |
| 61–90 | SMA-2 | One step from default |
| Over 90 | NPA, non-performing asset | Default |

UTP signals: interest no longer booked, a specific provision, a distressed restructuring, bankruptcy, fraud.

**Read it as:** days past due counts from the day a payment was due and not paid. The SMA labels are India's early-warning ladder: every bank reports them, so the whole system sees a borrower slipping before it defaults. "Unlikely to pay" catches borrowers who are clearly failing even while they still pay, so a bank does not have to wait 90 days to call it.

| NPA sub-class (India) | When | Why it matters |
|---|---|---|
| Substandard | NPA for up to 12 months | Provision rises from here |
| Doubtful | NPA for over 12 months | Provision rises further with age |
| Loss | Identified as uncollectible | Fully provided or written off |

## 4 — The three numbers

**Every credit loss is three questions multiplied: will they default, how much is owed then, and how much of it is lost.**

$$
\text{EL} = \text{PD} \times \text{LGD} \times \text{EAD}
$$

| Term | Meaning | Driven by |
|---|---|---|
| PD, probability of default | Chance of default within 12 months | The borrower |
| LGD, loss given default | Share lost after recoveries | Collateral, seniority, legal system |
| EAD, exposure at default | Amount owed at default | The product and its undrawn limit |

$$
\text{EAD} = \text{drawn} + \text{CCF} \times \text{undrawn}
$$

**Read it as:** the credit conversion factor (CCF) is the share of an unused limit likely to be drawn before default, because failing borrowers draw their lines to the limit.

### Worked example — the SME's expected loss

The SME has a ₹2 crore cash credit limit and is using ₹1.4 crore. Its PD is 3%. The loan is backed by stock, so the bank expects to recover 60%: LGD is 40%. Take CCF as 50%.

| Step | Working | Result |
|---|---|---|
| Undrawn | ₹2 crore − ₹1.4 crore | ₹60 lakh |
| EAD | ₹1.4 crore + 50% × ₹60 lakh | ₹1.7 crore |
| EL | 3% × 40% × ₹1.7 crore | ₹2.04 lakh |

So Our Bank expects to lose about ₹2 lakh a year on this line on average. It will charge that in the rate (section 10) and provide for it (section 13).

| PD type | Meaning | Used for |
|---|---|---|
| Point-in-time (PIT) | Moves with today's economy | IFRS 9 |
| Through-the-cycle (TTC) | Average over a whole cycle; stable | Basel capital |
| 12-month vs lifetime | Default in the next year, or before the loan ends | IFRS 9 Stage 1 vs Stages 2 and 3 |

**The same three numbers do four jobs**

| Job | How PD, LGD and EAD are used | Section |
|---|---|---|
| Decide | PD cut-offs approve, decline or refer an application; limits scale with risk | 6–8, 10 |
| Price | EL is charged in the interest rate, alongside the cost of capital | 10 |
| Provide | IFRS 9 turns them into ECL: 12-month or lifetime | 13–14 |
| Hold capital | Basel turns them into RWA and capital for UL | 16 |

---

**Part 2 — Lending risk**

## 5 — Three kinds of borrower

**Retail, SME and corporate are three different businesses: the bank judges retail by the numbers, corporates by deep analysis, and SMEs by a mix of both.**

| | Retail | SME | Corporate |
|---|---|---|---|
| Who | Individuals | Small and medium firms | Large companies |
| Typical products | Home loan, personal loan, credit card, auto loan, gold loan | Cash credit, term loan, invoice finance | Term loan, working capital, guarantees, letters of credit, bonds, derivatives |
| How many, how big | Millions of small loans | Thousands of mid-size loans | Hundreds of large loans |
| How the decision is made | Scorecard and bureau, mostly automated | Financials, bank statements, GST data, collateral, a credit officer | Full credit appraisal, internal rating, a credit committee |
| How PD is set | By pool: similar borrowers share a PD | Scorecard or rating model | Internal rating grade mapped to a PD |
| What protects the bank | Property (home loans), the car, gold; many loans are unsecured | Stock, receivables, property, a government guarantee | Covenants, security, seniority |
| Early warning | Bounced EMIs, bureau score drops | Line stuck at its limit, GST filings missed | Rating downgrade, covenant breach, late accounts |
| Basel asset class | Retail, residential mortgage | SME corporate or SME retail | Corporate |
| IFRS 9 in default | Collective ECL by pool | Collective or individual | Individual: a cash-flow forecast per borrower |
| Our story | The Salaried Borrower | The SME | The Corporate |

**Why the split matters:** the same PD × LGD × EAD sits under all three, but the data, the model, the risk weight and the early warnings are different. A bank's credit policy, systems and teams are organised along exactly these lines.

## 6 — Retail lending

**Retail is a numbers game: a bank lends to millions of people it will never meet, so it decides with scorecards, bureau data and simple affordability rules, and manages risk by pool rather than by person.**

| Product | Secured by | Typical tenor | Risk note |
|---|---|---|---|
| Home loan | The house | 15–30 years | Low PD, low LGD; biggest retail book |
| LAP, loan against property | Property | 5–15 years | Used for business needs; higher PD than home loans |
| Auto loan | The vehicle | 3–7 years | The car loses value, so LGD rises over time |
| Gold loan | Gold | Up to 1 year | Very low LGD; the risk is gold price falling |
| Personal loan | Nothing | 1–5 years | Unsecured: high LGD, priced high |
| Credit card | Nothing | Revolving | Unsecured and revolving: CCF matters, since limits get drawn |

### How the decision is made

| Tool | What it does |
|---|---|
| Credit bureau | Four bureaus in India (TransUnion CIBIL, Experian, Equifax, CRIF High Mark) hold every borrower's repayment history. A score runs from 300 to 900; higher is safer |
| Application scorecard | Scores a new applicant from income, age, job, existing loans and bureau data; the score maps to a PD |
| FOIR, fixed obligations to income ratio | All EMIs, including the new one, as a share of monthly income. Banks cap it, commonly at 40–60% |
| LTV, loan-to-value | Loan ÷ property value. RBI caps home loans at 90% up to ₹30 lakh, 80% from ₹30–75 lakh, 75% above |
| Policy rules | Hard stops: minimum age and income, no recent default, no fraud flags |

### Worked example — the Salaried Borrower

He earns ₹80,000 a month, already pays a ₹15,000 car EMI, and wants a home worth ₹60 lakh. Our Bank caps FOIR at 50%.

| Step | Working | Result |
|---|---|---|
| Maximum total EMI | 50% × ₹80,000 | ₹40,000 |
| Room for the new EMI | ₹40,000 − ₹15,000 | ₹25,000 |
| Loan that EMI supports | ₹25,000 EMI at 8.5% for 20 years | About ₹29 lakh |
| LTV cap | 80% × ₹60 lakh (property in the ₹30–75 lakh band) | ₹48 lakh |
| Loan offered | The lower of affordability and LTV | About ₹29 lakh |

**Read it as:** income decided the loan, not the house. He must bring the rest (₹31 lakh) himself, and that large down-payment is exactly why home loans have a low LGD.

### After the loan: managing by pool

| Tool | What it does |
|---|---|
| Behavioural scorecard | Rescores every live account monthly from how it is actually behaving; feeds PD for IFRS 9 and limit changes |
| Collection scorecard | Ranks overdue accounts by how likely they are to pay, so collectors call the right people first |
| Roll rate | Share of accounts moving to a worse DPD bucket each month; warns of trouble months early |
| Vintage curve | Loans grouped by the month they were given, tracked as they age; shows whether new lending is worse than old |
| Pooling | Borrowers with similar score, product and DPD share one PD and LGD; this is how retail ECL and IRB work |

## 7 — SME lending: limit and drawing power

**The limit is the yearly ceiling; drawing power (DP) is what this month's stock and bills support. The borrower can draw the lower of the two.**

An SME's working capital need comes from its trading cycle: it buys stock, sells on credit, waits to be paid. A **cash credit** line is a running account that funds that cycle. The bank lends against the stock and receivables, so the amount it will lend moves every month with them.

$$
\text{MPBF} = 75\% \times \text{CA} - \text{OCL}
$$

**Read it as:** maximum permissible bank finance = 75% of current assets (CA: stock, receivables, cash) minus other current liabilities (OCL: current debts except bank loans). The borrower funds the other 25% from its own money. Smaller borrowers use the turnover method: limit = 20% of projected annual turnover.

$$
\text{DP} = (\text{stock} - \text{unpaid creditors}) \times (1 - m_s) + \text{receivables}_{<90\ \text{days}} \times (1 - m_r)
$$

$$
\text{Available} = \min(\text{limit},\ \text{DP})
$$

**Read it as:** m<sub>s</sub> and m<sub>r</sub> are safety margins, commonly 25%. The bank computes DP monthly from the borrower's stock statement. The account becomes an NPA when it stays out of order (over limit or DP, or with no credits coming in) for 90 days.

### Worked example — the SME, a good month and a bad month

At sanction: current assets ₹4 crore, other current liabilities ₹1 crore. MPBF = 75% × ₹4 crore − ₹1 crore = **₹2 crore**. That is the limit.

| | Good month | Bad month |
|---|---|---|
| Stock | ₹1.8 crore | ₹1.0 crore |
| Unpaid suppliers | ₹20 lakh | ₹20 lakh |
| Stock counted | (₹1.8 crore − ₹20 lakh) × 75% = ₹1.2 crore | (₹1.0 crore − ₹20 lakh) × 75% = ₹60 lakh |
| Receivables under 90 days | ₹80 lakh × 75% = ₹60 lakh | ₹40 lakh × 75% = ₹30 lakh |
| DP | ₹1.8 crore | ₹90 lakh |
| Available = min(limit, DP) | ₹1.8 crore | ₹90 lakh |
| Drawn | ₹1.4 crore | ₹1.4 crore |
| Status | In order | Over DP by ₹50 lakh: irregular |

**Read it as:** nothing changed in the limit, but sales slowed and stock fell, so the security behind the loan shrank. If the ₹50 lakh excess is not cleared within 90 days, the account becomes an NPA. This is why DP is the heart of SME monitoring.

| SME term | Meaning |
|---|---|
| MSME | Micro, small and medium enterprise, defined in India by investment and turnover (medium: up to ₹125 crore investment and ₹500 crore turnover) [verify] |
| Udyam registration | The government registration that makes a firm an MSME |
| Priority sector lending | RBI requires banks to lend a set share to sectors such as MSMEs and agriculture; MSME loans count towards it |
| CGTMSE | A government trust that guarantees collateral-free MSME loans; the guaranteed part carries a 0% risk weight |
| GST data | Filed sales that the bank can check against what the borrower claims |
| Stock audit | An independent check that the stock in the statement really exists |

## 8 — Corporate lending

**A large company is judged one at a time: the bank reads its accounts, tests whether its cash can carry the debt, gives it an internal rating, and protects itself with covenants and security.**

| Product | Meaning | Exposure type |
|---|---|---|
| Term loan | A loan for a fixed period, often for a plant or expansion, repaid in instalments | Fund-based: money leaves the bank |
| Working capital | Cash credit or short loans for the trading cycle, as in section 7 | Fund-based |
| Bank guarantee | The bank promises to pay a third party if the company does not perform or pay | Non-fund-based: no money leaves unless it is called |
| Letter of credit | The bank promises to pay a supplier once shipping documents arrive | Non-fund-based |
| Bonds | The bank buys the company's debt instead of lending | Investment book |
| Derivatives | Hedges for currency or rates | Counterparty risk (Part 5) |

**Non-fund-based still counts.** A guarantee or letter of credit is a promise that can turn into a loan. Its EAD uses a CCF: 20% for a trade letter of credit, 50% for a performance guarantee, 100% for a guarantee of someone else's debt.

### The credit appraisal

| Risk area | Question | Looked at through |
|---|---|---|
| Financial risk | Can the cash carry the debt? | Ratios below, three years of accounts, projections |
| Business risk | Is the business strong? | Market share, costs, customers, suppliers |
| Industry risk | Is the sector healthy? | Demand, cycle, regulation, commodity prices |
| Management risk | Can we trust the people? | Track record, governance, group links |
| Security | What do we get if it fails? | Charge on assets, guarantees, seniority |

| Ratio | Formula | What comfort looks like |
|---|---|---|
| DSCR, debt service coverage | (Profit after tax + depreciation + interest) ÷ (principal due + interest) | Above about 1.25–1.5 |
| Debt ÷ EBITDA | Total debt ÷ earnings before interest, tax, depreciation and amortisation | Below about 3–4 |
| Interest coverage | EBITDA ÷ interest | Above about 2.5–3 |
| TOL ÷ TNW | Total outside liabilities ÷ tangible net worth | Below about 3 |
| Current ratio | Current assets ÷ current liabilities | About 1.33 or more |

### Worked example — the Corporate asks for ₹200 crore

| Line | ₹ crore |
|---|---|
| EBITDA | 600 |
| Depreciation | 150 |
| Interest | 120 |
| Profit before tax | 600 − 150 − 120 = 330 |
| Tax at 25% | 82.5 |
| Profit after tax | 247.5 |
| Principal due this year | 200 |
| Total debt | 1,800 |

| Ratio | Working | Result | Verdict |
|---|---|---|---|
| DSCR | (247.5 + 150 + 120) ÷ (200 + 120) | 1.62 | Comfortable |
| Debt ÷ EBITDA | 1,800 ÷ 600 | 3.0 | Acceptable |
| Interest coverage | 600 ÷ 120 | 5.0 | Strong |

**Read it as:** each year the company earns ₹1.62 of cash for every ₹1 it must pay its lenders. The internal rating model combines these ratios with the business, industry and management scores into a grade, say BBB. The master scale maps BBB to a PD, say 0.5%. The loan is sanctioned with covenants: for example, Debt ÷ EBITDA must stay below 3.5, tested every year.

| Corporate term | Meaning |
|---|---|
| Internal rating | The bank's own grade for the borrower, mapped to a PD on the master scale |
| External rating | A grade from an agency such as CRISIL, ICRA or CARE; used for standardised risk weights |
| Covenant | A promise in the loan contract, such as keeping a ratio; a breach lets the bank act early |
| Consortium | Several banks lending together under one lead bank and shared documents |
| Project finance | Lending to a new project repaid only from its own future cash; the key date is DCCO, the date commercial operations start |
| Annual review | Every corporate limit is re-appraised at least once a year |
| CRILC | RBI's database of every borrower with ₹5 crore or more of exposure, with SMA status, so all banks see stress at once |
| Large exposure limit | Exposure to one group is capped as a share of Tier 1 capital, so one failure cannot sink the bank |

## 9 — Reducing the risk

**Collateral, guarantees and netting each attack a different number: EAD, LGD or the risk weight.**

| Tool | What it cuts | How |
|---|---|---|
| Financial collateral: cash, bonds, shares | EAD | Count its value only after a haircut for how far its price could fall |
| Property, stock, receivables | LGD | More is recovered after default |
| Guarantee | Risk weight | The covered part takes the guarantor's risk weight (substitution) |
| Netting | EAD | Only the net amount owed counts |

**Collateral counts only if it is legally enforceable, registered and recently valued.**

### Worked example — two kinds of protection

| Case | Working | Effect |
|---|---|---|
| The Corporate pledges ₹1 crore of listed shares against a ₹3 crore loan; haircut 25% | Collateral counted = ₹1 crore × 75% = ₹75 lakh. EAD = ₹3 crore − ₹75 lakh | EAD falls to ₹2.25 crore |
| The SME's ₹2 crore line is 75% guaranteed by CGTMSE | ₹1.5 crore takes a 0% risk weight; ₹50 lakh keeps the SME's weight | Capital needed falls by three-quarters |

**Read it as:** the haircut exists because shares can fall exactly when the borrower is in trouble. A guarantee does not change the chance the SME defaults; it changes who carries the loss.

| India recovery route | Meaning |
|---|---|
| SARFAESI Act | Lets a bank take and sell secured assets without going to court |
| IBC, Insolvency and Bankruptcy Code | A time-bound process to resolve or liquidate a failing company |
| DRT | Debt recovery tribunals for bank claims |
| Lok Adalat | Settlement forum for small retail dues |

## 10 — The life of a loan, end to end

**One loan from start to finish, and where each part of this note fits.**

<svg viewBox="0 0 400 520" width="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Life of a loan: application, sanction, disbursement in Stage 1, monitoring, deterioration to Stage 2, default to Stage 3, recovery, write-off; a loan can cure back after probation" style="width:100%;max-width:400px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#1f2937">
<text x="200" y="24" text-anchor="middle" font-size="16" font-weight="700">The life of a loan</text>
<rect x="12" y="40" width="330" height="46" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
<text x="26" y="59" font-weight="700" fill="#047857">Application</text>
<text x="26" y="78" font-size="13.5" fill="#374151">scored: PD from scorecard and bureau</text>
<line x1="40" y1="86" x2="40" y2="92" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="40,100 44,92 36,92" fill="#6b7280"/>
<rect x="12" y="100" width="330" height="46" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
<text x="26" y="119" font-weight="700" fill="#047857">Sanction</text>
<text x="26" y="138" font-size="13.5" fill="#374151">limit, collateral, price</text>
<line x1="40" y1="146" x2="40" y2="152" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="40,160 44,152 36,152" fill="#6b7280"/>
<rect x="12" y="160" width="330" height="46" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
<text x="26" y="179" font-weight="700" fill="#047857">Disbursement</text>
<text x="26" y="198" font-size="13.5" fill="#374151">Stage 1 · 12-month ECL · capital</text>
<line x1="40" y1="206" x2="40" y2="212" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="40,220 44,212 36,212" fill="#6b7280"/>
<rect x="12" y="220" width="330" height="46" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
<text x="26" y="239" font-weight="700" fill="#047857">Monitoring</text>
<text x="26" y="258" font-size="13.5" fill="#374151">DPD, SMA, early warnings, DP</text>
<line x1="40" y1="266" x2="40" y2="272" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="40,280 44,272 36,272" fill="#6b7280"/>
<rect x="12" y="280" width="330" height="46" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
<text x="26" y="299" font-weight="700" fill="#b45309">Deterioration</text>
<text x="26" y="318" font-size="13.5" fill="#374151">SICR · Stage 2 · lifetime ECL</text>
<line x1="40" y1="326" x2="40" y2="332" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="40,340 44,332 36,332" fill="#6b7280"/>
<rect x="12" y="340" width="330" height="46" rx="8" fill="#fff1f2" stroke="#f43f5e" stroke-width="1.5"/>
<text x="26" y="359" font-weight="700" fill="#be123c">Default</text>
<text x="26" y="378" font-size="13.5" fill="#374151">over 90 DPD or UTP · NPA · Stage 3</text>
<line x1="40" y1="386" x2="40" y2="392" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="40,400 44,392 36,392" fill="#6b7280"/>
<rect x="12" y="400" width="330" height="46" rx="8" fill="#f3f4f6" stroke="#9ca3af" stroke-width="1.5"/>
<text x="26" y="419" font-weight="700" fill="#374151">Recovery</text>
<text x="26" y="438" font-size="13.5" fill="#374151">collateral, guarantees, restructuring</text>
<line x1="40" y1="446" x2="40" y2="452" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="40,460 44,452 36,452" fill="#6b7280"/>
<rect x="12" y="460" width="330" height="46" rx="8" fill="#f3f4f6" stroke="#9ca3af" stroke-width="1.5"/>
<text x="26" y="479" font-weight="700" fill="#374151">Write-off</text>
<text x="26" y="498" font-size="13.5" fill="#374151">no recovery expected · provision used</text>
<path d="M 342 423.0 L 372 423.0 L 372 243.0 L 350 243.0" fill="none" stroke="#6b7280" stroke-width="1.6" stroke-dasharray="5 4"/>
<polygon points="342,243.0 350,239.0 350,247.0" fill="#6b7280"/>
<text x="386" y="333.0" text-anchor="middle" fill="#4b5563" transform="rotate(-90 386 333.0)">cure, after probation</text>
</g>
</svg>

| Step | What happens | Sections |
|---|---|---|
| Application | The borrower is scored; the scorecard and the bureau give a PD | 4, 6, 33 |
| Sanction | Limit set, collateral taken, loan priced | 7–9 |
| Disbursement | EAD starts. A 12-month ECL provision (Stage 1) is booked on day one. Capital is held against its RWA | 13, 16 |
| Monitoring | DPD tracked, SMA labels, early warning signals; for cash credit, DP recomputed monthly | 3, 7, 34 |
| Deterioration | Risk rises significantly since origination: Stage 2, lifetime ECL | 13 |
| Default | Over 90 DPD or unlikely to pay: NPA, Stage 3, a higher risk weight (up to 150%) | 3, 13, 16 |
| Recovery | Collateral sold, guarantees called, restructuring; or the loan cures after probation | 9, 13 |
| Write-off | Once no reasonable recovery is expected, the loan leaves the books and the provision absorbs it | 34 |
| Every month-end | The data machine recomputes ECL and RWA, and the reports go out | 35, 36 |

$$
\text{Loan rate} \approx \text{funding cost} + \text{EL} + \text{cost of capital for UL} + \text{operating cost} + \text{margin}
$$

**Read it as:** price is where section 1 comes alive. The expected loss is charged to the borrower as a cost, and the capital held for the bad year has a cost too. A riskier borrower pays more on both.

### Worked example — pricing the Salaried Borrower's ₹5 lakh personal loan

| Piece | Working | % a year |
|---|---|---|
| Funding cost | The FTP rate treasury charges for 3-year money (section 28) | 7.5 |
| Expected loss | PD 3% × LGD 50% | 1.5 |
| Cost of capital | Capital 11.5% of the loan (100% risk weight) × owners' required return 15% | 1.7 |
| Operating cost | Staff, systems, collections | 1.5 |
| Margin | Profit | 1.0 |
| **Rate quoted** | | **About 13.2** |

**Read it as:** a home loan to the same person would be far cheaper, because the house cuts LGD, and lower LGD cuts both the EL line and the capital line.

---

**Part 3 — IFRS 9: the accounting view**

## 11 — IFRS 9 in plain words

**IFRS 9 answers three accounting questions about every financial asset: which bucket is it in, how much loss should we expect on it, and how do we account for its hedges.**

**Why it exists.** Before 2018 the rule was IAS 39, which let a bank book a loss only once it had already happened: the "incurred loss" model. In 2008 banks could see the losses coming but were not allowed to provide for them, so provisions arrived too little, too late. IFRS 9 flips this: provide for losses you **expect**, from the day the loan is made.

| Part of IFRS 9 | Question it answers | Section |
|---|---|---|
| Classification and measurement | Which bucket is this asset in, and what number goes on the balance sheet? | 12 |
| Impairment | How much credit loss do we expect, and set aside? | 13–14 |
| Hedge accounting | How do we match a hedge's gains and losses with what it hedges? | 15 |

**Three words you need first**

| Word | Plain meaning |
|---|---|
| Balance sheet | A snapshot of what the bank owns (assets) and owes (liabilities) on one day |
| P&L, profit and loss | The year's income minus costs: the profit everyone watches |
| OCI, other comprehensive income | A holding area inside equity for gains and losses that are real but not yet counted in profit |

| Where IFRS 9 applies | Status |
|---|---|
| UK, EU and most of the world | Since 2018 |
| India, NBFCs | Ind AS 109, India's copy of IFRS 9, since 2018 |
| India, banks | Not on Ind AS yet; RBI brings ECL to banks from 1 April 2027 |
| US | CECL instead |

## 12 — Classification: AC, FVOCI, FVTPL

**Every financial asset goes into one of three buckets. The bucket decides two things: what value the balance sheet shows, and whether price moves hit profit, hit OCI, or are ignored.**

| Bucket | Balance sheet shows | Price moves go to | ECL? | Typical bank holding |
|---|---|---|---|---|
| AC, amortised cost | What is owed: principal outstanding, adjusted for fees, less ECL | Ignored | Yes | Loans held to maturity |
| FVOCI, fair value through OCI | Today's market price | OCI; moved into P&L only when sold | Yes, charged to P&L | Bonds in the liquidity buffer |
| FVTPL, fair value through profit or loss | Today's market price | P&L, immediately | No | Trading bonds, all derivatives |

| Word | Plain meaning |
|---|---|
| Fair value | The price the asset would sell for today between willing parties |
| Amortised cost | The amount still owed, with any fees spread over the loan's life |
| EIR, effective interest rate | The single rate that spreads the loan's interest and fees evenly over its life |
| Recycling | Moving a gain or loss parked in OCI into P&L when the asset is sold |

**Two tests decide the bucket.** The business model: hold to collect, hold to collect and sell, or other. And SPPI: are the cash flows solely payments of principal and interest?

<svg viewBox="0 0 400 318" width="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IFRS 9 classification: an asset failing the SPPI test goes to FVTPL; one that passes goes to amortised cost if held to collect, FVOCI if held to collect and sell, and FVTPL otherwise" style="width:100%;max-width:400px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#1f2937">
<text x="200" y="24" text-anchor="middle" font-size="16" font-weight="700">Which bucket? Two tests</text>
<rect x="12" y="40" width="376" height="52" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
<text x="26" y="62" font-weight="700" fill="#334155">Test 1: SPPI</text>
<text x="26" y="83" fill="#374151" font-size="14">Only principal and interest?</text>
<text x="360" y="112" text-anchor="end" fill="#be123c" font-weight="700">No → FVTPL</text>
<line x1="60" y1="92" x2="60" y2="114" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="60,122 64,114 56,114" fill="#6b7280"/>
<text x="70" y="112" fill="#047857" font-weight="700">Yes</text>
<rect x="12" y="122" width="376" height="52" rx="8" fill="#f8fafc" stroke="#64748b" stroke-width="1.5"/>
<text x="26" y="144" font-weight="700" fill="#334155">Test 2: business model</text>
<text x="26" y="165" fill="#374151" font-size="14">Why does the bank hold it?</text>
<line x1="70" y1="174" x2="70" y2="192" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="70,200 74,192 66,192" fill="#6b7280"/>
<line x1="200" y1="174" x2="200" y2="192" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="200,200 204,192 196,192" fill="#6b7280"/>
<line x1="330" y1="174" x2="330" y2="192" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="330,200 334,192 326,192" fill="#6b7280"/>
<rect x="12" y="200" width="120" height="76" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
<text x="26" y="222" font-weight="700" fill="#047857">Collect</text>
<text x="26" y="243" fill="#374151" font-size="14"></text>
<text x="26" y="243" fill="#374151" font-size="14">only</text>
<text x="26" y="264" fill="#374151" font-size="14">→ AC</text>
<rect x="140" y="200" width="120" height="76" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
<text x="154" y="222" font-weight="700" fill="#b45309">Collect</text>
<text x="154" y="243" fill="#374151" font-size="14"></text>
<text x="154" y="243" fill="#374151" font-size="14">and sell</text>
<text x="154" y="264" fill="#374151" font-size="14">→ FVOCI</text>
<rect x="268" y="200" width="120" height="76" rx="8" fill="#fff1f2" stroke="#f43f5e" stroke-width="1.5"/>
<text x="282" y="222" font-weight="700" fill="#be123c">Trade</text>
<text x="282" y="243" fill="#374151" font-size="14"></text>
<text x="282" y="243" fill="#374151" font-size="14">or other</text>
<text x="282" y="264" fill="#374151" font-size="14">→ FVTPL</text>
<text x="200" y="304" text-anchor="middle" fill="#4b5563">Derivatives and trading assets: always FVTPL</text>
</g>
</svg>

| Business model | SPPI met? | Measurement |
|---|---|---|
| Hold to collect | Yes | Amortised cost |
| Hold to collect and sell | Yes | FVOCI, fair value through other comprehensive income |
| Anything else, including all derivatives not in hedges | — | FVTPL, fair value through profit or loss |

**Test 1 — the business model.** It is not about one asset but about how the bank manages a whole portfolio and pays its managers.

| Business model | What the bank does | Example |
|---|---|---|
| Hold to collect | Keeps the asset and collects the payments; sales are rare | The home loan book |
| Hold to collect and sell | Collects payments but also sells regularly to manage liquidity | The bond portfolio treasury keeps for the LCR |
| Other | Buys and sells to profit from price moves; judged on fair value | The trading desk |

**Test 2 — SPPI.** A simple loan pays back what was lent plus interest for time and credit risk. That passes. Anything that pays more or less because of something else fails.

| Passes SPPI | Fails SPPI |
|---|---|
| Fixed or floating rate loan | A bond that converts into shares |
| Plain government or corporate bond | A loan whose interest rises with the borrower's profits or a share index |
| Loan with a prepayment option at a fair price | A leveraged note that pays 3 × the change in a rate |
| | Shares in a company: no principal at all |

| Special rule | Meaning |
|---|---|
| Equity shares | FVTPL by default. The bank may choose FVOCI for a share it holds long-term; then gains never move to P&L, even on sale, and there is no ECL |
| Fair value option | An asset that would be AC or FVOCI can be put at FVTPL if that avoids an accounting mismatch with a related liability or hedge |
| Reclassification | Only when the whole business model changes; very rare |

### Worked example — one bond, three buckets

Our Bank buys a ₹100 crore, 5-year government bond paying 7% a year. During the year market rates rise, so the bond's price falls to ₹96 crore. (A bond paying 7% is worth less when new bonds pay more.)

| | AC | FVOCI | FVTPL |
|---|---|---|---|
| Balance sheet at year-end | ₹100 crore | ₹96 crore | ₹96 crore |
| Interest in P&L | ₹7 crore | ₹7 crore | ₹7 crore |
| Price fall of ₹4 crore goes to | Nowhere | OCI: equity falls ₹4 crore | P&L |
| Profit for the year | ₹7 crore | ₹7 crore | ₹3 crore |
| If sold next day at ₹96 crore | ₹4 crore loss hits P&L at sale | The ₹4 crore in OCI is recycled into P&L | Nothing more; already in P&L |

**Read it as:** the loss is real in all three. The buckets only decide **when** profit sees it. AC ignores price because the bank intends to hold to the end, when it will get ₹100 crore back anyway. FVTPL shows it at once because a trader could sell today. FVOCI sits between: the balance sheet is honest about the price, but profit is not shaken until the bank actually sells.

**India's version today.** Since 1 April 2024 RBI has banks classify investments as HTM (held to maturity), AFS (available for sale) and FVTPL, with HFT (held for trading) inside FVTPL. These map closely to AC, FVOCI and FVTPL: AFS gains and losses go to an AFS reserve in equity, just as FVOCI's go to OCI.

### How amortised cost works

A ₹10 lakh loan at 10% with a ₹20,000 processing fee. The fee is not all income on day one. The loan is booked at ₹9.8 lakh (₹10 lakh lent minus the fee received), and the EIR comes out a little above 10%. Each year interest income is EIR × the carrying amount, so the fee is earned slowly over the loan's life, which is when the service is actually given.

## 13 — ECL: the three stages

**Every AC and FVOCI loan sits in one of three stages. Stage 1 provides for one year of expected loss; the moment risk rises significantly, Stage 2 provides for the whole remaining life.**

**Scope:** ECL applies to amortised cost and FVOCI debt, loan commitments, financial guarantees, lease receivables and trade receivables. It does not apply to FVTPL items.

<svg viewBox="0 0 400 492" width="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IFRS 9 stages: Stage 1 performing with 12-month expected credit loss; a significant increase in credit risk moves a loan to Stage 2 with lifetime loss; default moves it to Stage 3, credit-impaired; loans cure back after probation" style="width:100%;max-width:400px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#1f2937">
<text x="200.0" y="24.0" text-anchor="middle" font-size="16" font-weight="700">IFRS 9: three stages, two triggers</text>
<rect x="12.0" y="44.0" width="318.0" height="84.0" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
<text x="28.0" y="70.0" font-weight="700" fill="#047857">Stage 1: performing</text>
<text x="28.0" y="92.0">12-month ECL</text>
<text x="28.0" y="113.0" fill="#4b5563">interest on the gross amount</text>
<rect x="12.0" y="206.0" width="318.0" height="84.0" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
<text x="28.0" y="232.0" font-weight="700" fill="#b45309">Stage 2: risk up since origination</text>
<text x="28.0" y="254.0">lifetime ECL</text>
<text x="28.0" y="275.0" fill="#4b5563">interest on the gross amount</text>
<rect x="12.0" y="352.0" width="318.0" height="84.0" rx="8" fill="#fff1f2" stroke="#f43f5e" stroke-width="1.5"/>
<text x="28.0" y="378.0" font-weight="700" fill="#be123c">Stage 3: credit-impaired</text>
<text x="28.0" y="400.0">lifetime ECL</text>
<text x="28.0" y="421.0" fill="#4b5563">interest on the net amount</text>
<line x1="40.0" y1="130.0" x2="40.0" y2="196.0" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="40.0,204.0 44.0,196.0 36.0,196.0" fill="#6b7280"/>
<text x="56.0" y="152.0" font-weight="700" fill="#b45309">SICR vs origination:</text>
<text x="56.0" y="172.0">lifetime PD ×2–3, or 30 DPD,</text>
<text x="56.0" y="192.0">or watchlist, forbearance</text>
<line x1="40.0" y1="292.0" x2="40.0" y2="342.0" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="40.0,350.0 44.0,342.0 36.0,342.0" fill="#6b7280"/>
<text x="56.0" y="314.0" font-weight="700" fill="#be123c">Default:</text>
<text x="56.0" y="334.0">over 90 DPD, or unlikely to pay</text>
<line x1="300.0" y1="204.0" x2="300.0" y2="138.0" stroke="#6b7280" stroke-width="1.6" stroke-dasharray="5 4"/>
<polygon points="300.0,130.0 304.0,138.0 296.0,138.0" fill="#6b7280"/>
<text x="308.0" y="172.0" fill="#4b5563">cure</text>
<line x1="300.0" y1="350.0" x2="300.0" y2="300.0" stroke="#6b7280" stroke-width="1.6" stroke-dasharray="5 4"/>
<polygon points="300.0,292.0 304.0,300.0 296.0,300.0" fill="#6b7280"/>
<text x="308.0" y="326.0" fill="#4b5563">cure</text>
<text x="12.0" y="462.0" fill="#4b5563">Cure = back a stage, after a probation period</text>
<text x="12.0" y="484.0" fill="#4b5563">POCI (bought or made impaired): lifetime ECL</text>
</g>
</svg>

| Stage | When | Provision |
|---|---|---|
| 1 | Performing, no big change since the loan was made | 12-month ECL |
| 2 | Significant increase in credit risk (SICR); 30 DPD is the backstop | Lifetime ECL |
| 3 | In default; 90 DPD | Lifetime ECL |

$$
\text{ECL} = \sum_{t} \text{PD}_t \times \text{LGD}_t \times \text{EAD}_t \times \text{DF}_t
$$

**Read it as:** for each future year, chance of default that year × share lost × amount owed × a discount factor back to today (DF), then add up the years. Stage 1 counts one year; Stages 2 and 3 count the whole life. So a move to Stage 2 makes the provision jump with no default yet: the **cliff effect**.

| Word | Plain meaning |
|---|---|
| Marginal PD | The chance of defaulting in one particular future year, seen from today |
| Lifetime PD | The chance of defaulting at any point before the loan ends: the marginal PDs added up |
| DF, discount factor | Turns a future rupee into today's value: 1 ÷ (1 + EIR)<sup>t</sup> |
| Gross carrying amount | What is owed before the provision |
| Net carrying amount | What is owed minus the provision |

### Worked example — the cliff effect

A ₹10 lakh loan with 3 years left. Keep EAD at ₹10 lakh each year for simplicity. LGD is 40%. EIR is 10%.

| Year | Marginal PD | PD × LGD × EAD | DF | ECL for the year |
|---|---|---|---|---|
| 1 | 2% | ₹8,000 | 1 ÷ 1.10 = 0.909 | ₹7,273 |
| 2 | 3% | ₹12,000 | 1 ÷ 1.21 = 0.826 | ₹9,917 |
| 3 | 3% | ₹12,000 | 1 ÷ 1.331 = 0.751 | ₹9,016 |

| Stage | Which years count | Provision |
|---|---|---|
| Stage 1 | Year 1 only | ₹7,273 |
| Stage 2 | All three years | ₹26,206 |
| Stage 3 | Default has happened: PD = 100%, so ECL = LGD × EAD | ₹4,00,000 |

**Read it as:** the borrower has not missed a single payment, but a rise in risk moves the loan to Stage 2 and the provision multiplies by 3.6. That jump hits profit the same month. This is why SICR rules are argued over so hard, and why a bank watches the Stage 2 book closely.

**What counts as SICR**

| Signal | Type |
|---|---|
| Lifetime PD now is 2–3 times the lifetime PD at origination | Quantitative: the main test |
| 30 DPD | Backstop: presumed SICR unless the bank can prove otherwise |
| Watchlist, SMA-1 or SMA-2, forbearance, a covenant breach | Qualitative |
| Low credit risk (investment grade) | Exemption: may stay in Stage 1 |

| Key rule | Meaning |
|---|---|
| SICR | Risk now compared with risk at origination; a typical trigger is lifetime PD doubled or tripled |
| Relative, not absolute | A loan made at a high PD that stays high is still Stage 1; a very safe loan whose PD triples is Stage 2 |
| Cure | A loan moves back to a better stage only after the trigger has cleared and a probation period has passed |
| Interest in Stage 3 | Earned on the net carrying amount, not the gross, so a defaulted loan stops inflating income |

## 14 — ECL: every way to measure it

**IFRS 9 has one idea, expected loss, but several routes to the number, chosen by the kind of asset and the data a bank has.**

### The approaches: which rulebook applies

| Approach | Applies to | How it works |
|---|---|---|
| General approach | Loans, bonds at AC or FVOCI, most bank assets | The three stages of section 13 |
| Simplified approach | Trade receivables, contract assets; optional for lease receivables | Always lifetime ECL; no stage tracking. Usually a provision matrix |
| POCI, purchased or originated credit-impaired | Loans bought or made already in default, such as a bad loan bought at a discount | No Stage 1 or 2. Expected losses are built into the price; only later changes in lifetime ECL hit P&L. Interest at a credit-adjusted EIR |
| Low credit risk exemption | Investment-grade bonds and similar | May stay in Stage 1 without an SICR test |
| Loan commitments and financial guarantees | Undrawn limits, guarantees given | ECL on the amount expected to be drawn or called; booked as a provision liability |
| Revolving products | Credit cards, overdrafts | Lifetime = how long the bank is really exposed in practice, not the contractual notice period, which is often one day |

### The methods: how the number is calculated

| Method | How | Best for |
|---|---|---|
| PD × LGD × EAD | Year by year, discounted, as in section 13 | Banks with rating or scorecard models |
| Loss rate | A historical loss percentage, adjusted for today and the forecast | Small portfolios, little data |
| Provision matrix | A loss percentage by how overdue each amount is | Trade receivables |
| Roll rate or transition matrix | The chance of moving from each DPD bucket to the next, chained forward | Retail pools |
| Vintage | Loss curves by origination month, projected forward | Retail with a long history |
| Discounted cash flow | Forecast what will actually be recovered from one borrower, discount it, compare with what is owed | Large Stage 3 loans, one by one |

### Worked example — a provision matrix

| Receivables overdue | Amount | Loss rate | ECL |
|---|---|---|---|
| Not yet due | ₹50 lakh | 0.5% | ₹25,000 |
| 1–30 days | ₹20 lakh | 2% | ₹40,000 |
| 31–60 days | ₹10 lakh | 5% | ₹50,000 |
| 61–90 days | ₹5 lakh | 15% | ₹75,000 |
| Over 90 days | ₹2 lakh | 50% | ₹1,00,000 |
| **Total** | **₹87 lakh** | | **₹2,90,000** |

**Read it as:** the older a bill, the less likely it is paid. The rates come from past experience, adjusted for the outlook.

### Worked example — a Stage 3 corporate, cash flow by cash flow

Suppose the Corporate defaults owing ₹200 crore. The workout team expects ₹90 crore from selling a plant in 2 years and ₹20 crore from a guarantee in 3 years. EIR is 10%.

| Recovery | When | Working | Worth today |
|---|---|---|---|
| Plant sale | Year 2 | ₹90 crore ÷ 1.21 | ₹74.4 crore |
| Guarantee | Year 3 | ₹20 crore ÷ 1.331 | ₹15.0 crore |
| **Total recoverable** | | | **₹89.4 crore** |
| **ECL** | | ₹200 crore − ₹89.4 crore | **₹110.6 crore** |

**Read it as:** a big defaulted loan is not modelled from a PD; it is valued from a real recovery plan. Each year, interest income is 10% × ₹89.4 crore = ₹8.9 crore: the discount unwinding as recovery gets closer.

### Looking forward: scenarios

ECL must use forecasts of the economy, not just the past. Banks link PD and LGD to variables such as GDP growth, unemployment, interest rates and house prices through **satellite models**, then run several scenarios.

| Scenario | Weight | ECL on the book |
|---|---|---|
| Upside | 10% | ₹18 crore |
| Base | 60% | ₹26 crore |
| Downside | 30% | ₹45 crore |
| **Probability-weighted** | | **10% × 18 + 60% × 26 + 30% × 45 = ₹30.9 crore** |

**Read it as:** the answer (₹30.9 crore) is above the base case (₹26 crore), because a bad economy hurts more than a good one helps. This is called **non-linearity**, and it is why IFRS 9 demands several scenarios, not one.

| Key rule | Meaning |
|---|---|
| Scenarios | Base, upside and downside, weighted by probability; the downside hurts more than the upside helps |
| Overlay | A management adjustment for what the models miss; approved, documented and reversed later |
| Individual vs collective | Large Stage 3 loans are assessed one by one; everything else in pools of similar loans |
| India from April 2027 | RBI's ECL framework adds minimum provision floors by stage [verify] |

## 15 — IFRS 9 and derivatives: the bridge to counterparty risk

**Derivatives sit at FVTPL, so they have no ECL and no stages.** Their counterparty risk is captured through CVA inside fair value. IFRS 13 fair value includes CVA and DVA (section 24). In India the matching standard is Ind AS 113.

| Piece of a derivative relationship | How IFRS 9 treats it |
|---|---|
| The derivative itself | FVTPL: carried at fair value, which already includes CVA |
| The counterparty's credit risk | CVA, inside the fair value; every change hits P&L at once |
| ECL and stages | Do not apply to derivatives at all |
| Cash collateral the bank has posted | A receivable at amortised cost; ECL applies, but is usually tiny |
| Loan commitments and guarantees to the same client | ECL applies, as in section 14 |
| Hedges | Hedge accounting, below |

### Worked example — same client, two accounting routes

Our Bank has both a ₹5 crore loan to the Exporter and a currency forward with it worth +₹20 lakh to the bank. The Exporter's credit worsens: its credit spread doubles, but it keeps paying.

| | The loan | The forward |
|---|---|---|
| Bucket | Amortised cost | FVTPL |
| Before | Stage 1, 12-month ECL | Fair value ₹20 lakh − CVA ₹1 lakh = ₹19 lakh |
| After the spread doubles | If lifetime PD has doubled or tripled since origination: Stage 2, lifetime ECL | CVA doubles to ₹2 lakh; fair value ₹18 lakh |
| What hits profit | The jump in provision, once SICR is triggered | ₹1 lakh loss the same day, no trigger needed |

**Read it as:** one worsening client, two machines. The loan waits for the SICR test; the derivative reprices instantly through CVA. This is the whole link between IFRS 9 and counterparty risk, and Part 5 builds CVA from scratch.

**Hedge accounting** aligns the timing of P&L between a hedge and what it hedges.

**The problem it solves.** Our Bank holds a fixed-rate bond at amortised cost and hedges its interest rate risk with a swap. The swap is FVTPL, so its value swings through profit every day, while the bond it protects sits still at cost. Profit looks volatile even though the bank is fully hedged. Hedge accounting lets the bank line the two up.

| Hedge type | Hedges | Where gains and losses go |
|---|---|---|
| Fair value hedge | Changes in the fair value of an asset or liability | P&L, alongside the hedged item |
| Cash flow hedge | Variable future cash flows | Wait in OCI until the hedged cash flow hits P&L |
| Net investment hedge | FX on foreign operations | OCI |

**Read it as:** in a fair value hedge, the bond is also revalued for rate moves, so its gain offsets the swap's loss in the same P&L line. In a cash flow hedge, the swap's gains wait in OCI until the hedged payment actually arrives. A hedge must be documented on day one and shown to be effective.

Banks may keep IAS 39 hedge accounting, and portfolio or macro hedging is still largely under IAS 39.

---

**Part 4 — Basel: the capital view**

## 16 — Basel: capital for unexpected loss

**A bank must hold owners' money of at least a set share of its risk-weighted assets, so that a 1-in-1,000 bad year cannot wipe it out.**

$$
\text{Capital ratio} = \frac{\text{capital}}{\text{RWA}}, \qquad \text{RWA} = \text{EAD} \times \text{risk weight}
$$

**Read it as:** risk-weighted assets (RWA) scale each exposure by how risky it is. Credit, market and operational risk all add to the RWA. Counterparty risk and CVA get their own charges (section 25).

$$
\text{Total RWA} = \text{credit RWA} + 12.5 \times (\text{market risk capital} + \text{operational risk capital} + \text{CVA capital})
$$

**Read it as:** market, operational and CVA rules give a capital amount directly. Multiplying by 12.5 (which is 1 ÷ 8%) turns that capital into an RWA figure, so everything can sit under one ratio.

| Approach | Who picks the risk weight | Where used |
|---|---|---|
| Standardised (SA) | The regulator's table | All Indian banks; smaller banks everywhere |
| Internal ratings-based (IRB) | The bank's own PD (and LGD), fed into Basel's formula | Large UK, EU and US banks |

| Standardised risk weights (Basel 3.1) | Weight |
|---|---|
| Unrated corporate | 100% |
| Unrated SME corporate | 85% |
| Regulatory retail | 75% |
| Home loan | 20–70%, rising with LTV (loan-to-value) |
| Defaulted | 150% |

### Worked example — Our Bank's four clients, turned into RWA

| Client | EAD | Risk weight (Basel 3.1 SA) | RWA |
|---|---|---|---|
| Salaried Borrower: home loan, LTV 48% | ₹29 lakh | 20% (LTV up to 50%) | ₹5.8 lakh |
| Salaried Borrower: personal loan | ₹5 lakh | 75% (regulatory retail) | ₹3.75 lakh |
| The SME: cash credit | ₹1.7 crore | 85% (unrated SME) | ₹1.45 crore |
| The Corporate: term loan, rated BBB | ₹200 crore | 75% (BBB corporate) | ₹150 crore |

At an 11.5% total requirement (India, with the buffer), the capital needed for the Corporate alone is 11.5% × ₹150 crore = **₹17.25 crore**, against **₹67,000** for the home loan.

**Read it as:** the risk weight is where the loan's risk becomes a capital cost. The same rupee lent against a house needs a fraction of the capital of a rupee lent unsecured.

**IRB in one line:** stress the PD to a 1-in-1,000 year, take away the average loss, adjust for maturity and scale to RWA. The result is capital = UL per rupee lent.

$$
K = \left[\text{LGD} \times N\!\left(\frac{G(\text{PD}) + \sqrt{R}\, G(0.999)}{\sqrt{1-R}}\right) - \text{PD} \times \text{LGD}\right] \times \text{MA}, \qquad \text{RWA} = 12.5 \times K \times \text{EAD}
$$

**Read it as:** G turns a probability into a point on the normal curve and N turns it back. The big fraction is "the PD in a 1-in-1,000 year": the normal PD pushed up by R, the correlation, which says how much all borrowers suffer together in a downturn. Multiply by LGD for the bad-year loss, subtract the average loss PD × LGD (already provided for), and MA, the maturity adjustment, adds more for longer loans. For a corporate with PD 1%, LGD 45% and 2.5 years' maturity, this gives a risk weight of about 92%.

**What counts as capital**

| Tier | What it is | Why it counts |
|---|---|---|
| CET1, common equity tier 1 | Shares and retained profit | Absorbs losses at once, never has to be repaid |
| AT1, additional tier 1 | Perpetual bonds that can be written off or turned into shares | Absorbs losses while the bank is still running |
| Tier 2 | Long subordinated bonds, some provisions | Absorbs losses once the bank has failed, before depositors |

<svg viewBox="0 0 400 452" width="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stacked bars of capital as a share of risk-weighted assets: Basel minimum CET1 4.5, AT1 1.5, Tier 2 2.0 plus a 2.5 conservation buffer, 10.5 in all; India CET1 5.5, AT1 1.5, Tier 2 2.0 plus 2.5, 11.5 in all" style="width:100%;max-width:400px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#1f2937">
<text x="200.0" y="24.0" text-anchor="middle" font-size="16" font-weight="700">The capital stack, % of RWA</text>
<rect x="40.0" y="240.0" width="130.0" height="90.0" rx="2" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
<text x="105.0" y="290.0" text-anchor="middle" font-weight="700" fill="#1d4ed8">CET1 4.5%</text>
<rect x="40.0" y="210.0" width="130.0" height="30.0" rx="2" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="1.5"/>
<text x="105.0" y="230.0" text-anchor="middle" font-weight="700" fill="#6d28d9">AT1 1.5%</text>
<rect x="40.0" y="170.0" width="130.0" height="40.0" rx="2" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.5"/>
<text x="105.0" y="195.0" text-anchor="middle" font-weight="700" fill="#0f766e">Tier 2 2%</text>
<rect x="40.0" y="120.0" width="130.0" height="50.0" rx="2" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
<text x="105.0" y="150.0" text-anchor="middle" font-weight="700" fill="#b45309">Buffer 2.5%</text>
<text x="105.0" y="110.0" text-anchor="middle" font-size="16" font-weight="700">10.5%</text>
<text x="105.0" y="86.0" text-anchor="middle" fill="#4b5563">+ CCyB 0–2.5%</text>
<text x="105.0" y="66.0" text-anchor="middle" fill="#4b5563">+ G-SIB 1–3.5%</text>
<text x="105.0" y="352.0" text-anchor="middle" font-weight="700">Basel</text>
<rect x="230.0" y="220.0" width="130.0" height="110.0" rx="2" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
<text x="295.0" y="280.0" text-anchor="middle" font-weight="700" fill="#1d4ed8">CET1 5.5%</text>
<rect x="230.0" y="190.0" width="130.0" height="30.0" rx="2" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="1.5"/>
<text x="295.0" y="210.0" text-anchor="middle" font-weight="700" fill="#6d28d9">AT1 1.5%</text>
<rect x="230.0" y="150.0" width="130.0" height="40.0" rx="2" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.5"/>
<text x="295.0" y="175.0" text-anchor="middle" font-weight="700" fill="#0f766e">Tier 2 2%</text>
<rect x="230.0" y="100.0" width="130.0" height="50.0" rx="2" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
<text x="295.0" y="130.0" text-anchor="middle" font-weight="700" fill="#b45309">Buffer 2.5%</text>
<text x="295.0" y="90.0" text-anchor="middle" font-size="16" font-weight="700">11.5%</text>
<text x="295.0" y="66.0" text-anchor="middle" fill="#4b5563">+ D-SIB 0.2–0.8%</text>
<text x="295.0" y="352.0" text-anchor="middle" font-weight="700">India</text>
<line x1="20.0" y1="330.0" x2="380.0" y2="330.0" stroke="#9ca3af" stroke-width="1.2"/>
<rect x="14.0" y="365.0" width="18.0" height="16.0" rx="3" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
<text x="42.0" y="378.0">CET1: the owners’ money, absorbs first</text>
<rect x="14.0" y="387.0" width="18.0" height="16.0" rx="3" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="1.5"/>
<text x="42.0" y="400.0">AT1: a bond that behaves like a share</text>
<rect x="14.0" y="409.0" width="18.0" height="16.0" rx="3" fill="#f0fdfa" stroke="#14b8a6" stroke-width="1.5"/>
<text x="42.0" y="422.0">Tier 2: a bond that pays out last</text>
<rect x="14.0" y="431.0" width="18.0" height="16.0" rx="3" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
<text x="42.0" y="444.0">Buffer: dip in, and payouts are capped</text>
</g>
</svg>

| Minimum, % of RWA | Basel | India |
|---|---|---|
| CET1 (shares and retained profit) | 4.5% | 5.5% |
| Tier 1 (CET1 + AT1 bonds) | 6% | 7% |
| Total capital (+ Tier 2) | 8% | 9% |
| Conservation buffer (CET1) | 2.5% | 2.5% |

| Buffer | Meaning |
|---|---|
| Conservation buffer | Extra CET1 on top of the minimum; dip into it and dividends and bonuses are restricted |
| CCyB, countercyclical buffer | Up to 2.5% extra, switched on in boom years and released in a downturn |
| D-SIB or G-SIB surcharge | Extra CET1 for banks too big to fail |

| Backstop | Rule |
|---|---|
| Leverage ratio | Tier 1 ÷ total exposure, with no risk weights: Basel 3%; India 3.5% (4% for systemically important banks) |
| LCR | Liquid assets must cover 30 days of stressed outflows |
| NSFR | Stable funding must cover one year's needs |
| Large exposure | One group at most 25% of Tier 1 |

LCR and NSFR in detail: section 31.

## 17 — Basel 3.1 in six changes

**Basel III fixed the quality of capital; Basel 3.1 fixes RWA, which banks' own models had pushed too low.**

**Why it was needed.** After 2008 the Basel Committee gave the same imaginary portfolio to many banks and asked each for its RWA. The answers differed hugely, mostly because of the banks' own models. Same risk, very different capital. Basel 3.1 (finalised in 2017, also called the Basel III finalisation or "Basel IV") narrows that gap in six ways.

| Change | Effect |
|---|---|
| Output floor | IRB RWA at least 72.5% of standardised RWA, bank-wide |
| Finer SA | Weights by rating and LTV; unrated SMEs 85% |
| Limits on IRB | No advanced IRB for large corporates or banks; PD floor 0.05% |
| CCF | Cancellable limits move from 0% to 10% |
| Operational risk | One standardised approach, based on income |
| Market risk and CVA | FRTB for market risk; no internal models for CVA |

### Change 1 — The output floor

| Before | After | Why |
|---|---|---|
| A bank's models could cut RWA as low as they went | Total RWA can never fall below 72.5% of what the standardised approach would give | Puts a limit on how far models can reduce capital |

$$
\text{RWA}_{\text{final}} = \max\left(\text{RWA}_{\text{models}},\ 72.5\% \times \text{RWA}_{\text{SA}}\right)
$$

**Worked example.** A large UK bank's models give RWA of £60 billion. The standardised approach would give £100 billion. Floor = 72.5% × £100 billion = £72.5 billion. The bank must use £72.5 billion: RWA up 21% overnight, and it needs 21% more capital for the same book. The floor is phased in over about five years, so the jump is spread out.

### Change 2 — A finer standardised approach

| Before | After | Why |
|---|---|---|
| Few categories; most corporates 100%, most mortgages one weight | Weights depend on rating, LTV and borrower type | SA must track risk better, since the floor now leans on it |

| Corporate, by external rating | Risk weight |
|---|---|
| AAA to AA− | 20% |
| A+ to A− | 50% |
| BBB+ to BBB− | 75% (was 100%) |
| BB+ to BB− | 100% |
| Below BB− | 150% |
| Unrated | 100% (unrated SME 85%) |

| Home loan LTV | Up to 50% | 50–60% | 60–80% | 80–90% | 90–100% | Over 100% |
|---|---|---|---|---|---|---|
| Risk weight | 20% | 25% | 30% | 40% | 50% | 70% |

| Retail | Risk weight |
|---|---|
| Regulatory retail | 75% |
| Transactor: a card holder who repays in full every month | 45% |
| Other retail | 100% |

**Worked example.** The Corporate, rated BBB, borrows ₹200 crore. Before: 100% risk weight, RWA ₹200 crore. After: 75%, RWA ₹150 crore. Capital at 11.5% falls from ₹23 crore to ₹17.25 crore. A finer table rewards lending to better-rated borrowers.

### Change 3 — Limits on internal models

| Before | After | Why |
|---|---|---|
| Banks could model PD, LGD and EAD for almost everything | Large corporates (revenue over €500 million) and banks: foundation IRB only, meaning own PD but the regulator's LGD. Equities: SA only | Defaults among big companies and banks are too rare to model LGD reliably |
| PD floor 0.03% | PD floor 0.05%; floors also on LGD (for example 25% for unsecured corporate) and on EAD | Stops models claiming near-zero risk |

**Worked example.** A AAA company's model PD is 0.02%. Under Basel 3.1 the bank must use at least 0.05%: two and a half times higher, and its capital rises with it.

### Change 4 — Credit conversion factors

| Before | After | Why |
|---|---|---|
| Limits the bank can cancel at any time: 0% CCF | 10% CCF | Banks rarely cancel limits in practice, and borrowers draw them when they are in trouble |

**Worked example.** The Salaried Borrower has a ₹1 lakh credit card limit and uses ₹20,000. Before: EAD = ₹20,000. After: EAD = ₹20,000 + 10% × ₹80,000 = **₹28,000**. Across millions of cards, that is a large new EAD.

### Change 5 — Operational risk

**Operational risk** is loss from failed processes, people, systems or outside events: fraud, a system outage, a fine.

| Before | After | Why |
|---|---|---|
| Three options, including AMA, where banks modelled their own operational losses | One standardised measurement approach | AMA models were complex and gave wildly different results |

$$
\text{Operational risk capital} = \text{BIC} \times \text{ILM}
$$

**Read it as:** BIC, the business indicator component, is a share of a bank's income-based size measure (the business indicator, BI): 12% for the first €1 billion, rising to 15% and 18% for bigger banks. ILM, the internal loss multiplier, raises or lowers it by the bank's own loss history; many regulators set it to 1.

**Worked example.** A bank's BI is ₹2,000 crore, all in the first band. Capital = 12% × ₹2,000 crore = ₹240 crore. RWA = 12.5 × ₹240 crore = ₹3,000 crore.

### Change 6 — Market risk and CVA

| Before | After | Why |
|---|---|---|
| Market risk capital from VaR (value at risk) at 99% | FRTB: expected shortfall at 97.5%, a stricter boundary between the books, desk-by-desk model approval | VaR missed the size of losses in the tail in 2008 (section 26) |
| CVA capital could use internal models | Only BA-CVA or SA-CVA | CVA models were not trusted after 2008 (section 25) |

| Where | Start [verify] |
|---|---|
| EU | 1 January 2025 |
| UK | 1 January 2027 |
| India | Revised SA from 1 April 2027; no output floor, since India has no IRB banks |
| US | Re-proposed March 2026; still pending |

**What it means for an Indian bank:** changes 2 and 4 bite directly through the revised standardised approach; change 5 through operational risk; changes 1 and 3 matter only in countries with IRB banks.

## 18 — Banking book and trading book

**Every position sits in one of two books, and the book decides the capital rules.**

| | Banking book | Trading book |
|---|---|---|
| Holds | Held to maturity or long term: loans, investment securities, deposits | Held with trading intent: short-term resale, profiting from price moves, market-making, and hedges of these |
| Capital | Credit risk (SA or IRB); plus IRRBB, interest rate risk in the banking book, under Pillar 2 | Market risk, under FRTB |
| Accounting | Mostly amortised cost or FVOCI | FVTPL |

**Why the boundary is guarded.** The same bond can need very different capital in each book. If banks could move positions to whichever book was cheaper that month, capital would be a game. FRTB makes the boundary hard.

| FRTB boundary rule | Meaning |
|---|---|
| Presumptive lists | Decide default placement |
| Transfers between books | Strictly limited; any capital benefit from a switch is disallowed |
| Internal risk transfers | Must be documented and controlled |

| Credit risk in each book | Form |
|---|---|
| Banking book | Default of borrowers |
| Trading book | Credit spread risk and default risk charge on bonds and CDS |
| Both books | CCR and CVA on derivatives |

**India:** from 1 April 2024, investments are classified as HTM, AFS and FVTPL, with HFT (held for trading) inside FVTPL as the trading book.

## 19 — How IFRS 9 and Basel connect

**Both use PD, LGD and EAD, but for different jobs: IFRS 9 wants today's best guess of the average loss; Basel wants a prudent, stable measure of the bad year.**

| Point | IFRS 9 | Basel |
|---|---|---|
| PD | Point-in-time, forward-looking | Through-the-cycle |
| LGD | Best estimate | Downturn LGD |
| Horizon | 12-month or lifetime | 12-month only |
| Discounting | At the effective interest rate | None in the formula |
| Floors | None | Regulatory floors |
| Economic views | Probability-weighted scenarios | A single calibrated view |

**Read it as:** one set of data feeds both engines, then each adjusts it. A bank typically builds one PD model and converts it: to PIT with the forecast for IFRS 9, to TTC with a long-run average for Basel.

| Provisions meet capital | Rule |
|---|---|
| Under SA | General provisions count in Tier 2, up to 1.25% of credit RWA |
| Under IRB: shortfall | Provisions below regulatory EL: the gap is deducted from CET1 |
| Under IRB: excess | Provisions above regulatory EL: counts in Tier 2, up to 0.6% of credit RWA |
| Transition | Regulators allow the day-one ECL hit to capital to be phased in over a few years; India's approach for April 2027 is [verify] |

### Worked example — why provisions and capital must not double-count

An IRB bank's regulatory EL (PD × LGD × EAD on Basel's numbers) is ₹100 crore.

| Case | Provisions | Effect on capital |
|---|---|---|
| Shortfall | ₹80 crore | ₹20 crore deducted from CET1: the gap is a loss not yet covered |
| Excess | ₹120 crore | ₹20 crore may count as Tier 2, within the 0.6% cap |

**Read it as:** the IRB formula already takes away EL, on the assumption that provisions cover it. If provisions fall short, capital must cover the gap; if they are generous, some of the extra counts as a cushion.

---

**Part 5 — Counterparty credit risk**

**Parts 1–4 were about money lent. This part is about contracts: the Exporter borrows nothing, yet Our Bank can still lose money if it fails. Five ideas, each needing the one before it.**

<svg viewBox="0 0 400 380" width="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Counterparty risk in five ideas: a derivative is a promise about a price; its value moves; the client might fail when it owes you; estimate and shrink the exposure; price it with CVA and hold capital" style="width:100%;max-width:400px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#1f2937">
<text x="200" y="24" text-anchor="middle" font-size="16" font-weight="700">Counterparty risk in five ideas</text>
<rect x="12" y="40" width="376" height="52" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5"/>
<text x="26" y="62" font-weight="700" fill="#1d4ed8">1 · A promise about a price</text>
<text x="26" y="83" fill="#374151" font-size="14">Derivatives · 20</text>
<line x1="200" y1="92" x2="200" y2="100" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="200,108 204,100 196,100" fill="#6b7280"/>
<rect x="12" y="108" width="376" height="52" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5"/>
<text x="26" y="130" font-weight="700" fill="#047857">2 · Its value keeps moving</text>
<text x="26" y="151" fill="#374151" font-size="14">Who owes whom flips · 20</text>
<line x1="200" y1="160" x2="200" y2="168" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="200,176 204,168 196,168" fill="#6b7280"/>
<rect x="12" y="176" width="376" height="52" rx="8" fill="#fff1f2" stroke="#f43f5e" stroke-width="1.5"/>
<text x="26" y="198" font-weight="700" fill="#be123c">3 · The client might fail then</text>
<text x="26" y="219" fill="#374151" font-size="14">Counterparty credit risk · 21</text>
<line x1="200" y1="228" x2="200" y2="236" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="200,244 204,236 196,236" fill="#6b7280"/>
<rect x="12" y="244" width="376" height="52" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
<text x="26" y="266" font-weight="700" fill="#b45309">4 · Estimate it, then shrink it</text>
<text x="26" y="287" fill="#374151" font-size="14">Exposure, netting, collateral · 22–23</text>
<line x1="200" y1="296" x2="200" y2="304" stroke="#6b7280" stroke-width="1.6"/>
<polygon points="200,312 204,304 196,304" fill="#6b7280"/>
<rect x="12" y="312" width="376" height="52" rx="8" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.5"/>
<text x="26" y="334" font-weight="700" fill="#0e7490">5 · Put a price tag on it</text>
<text x="26" y="355" fill="#374151" font-size="14">CVA, then capital · 24–25</text>
</g>
</svg>

## 20 — Derivatives: a promise about a price

**A derivative is a contract whose value comes from something else, called the underlying: a rate, a currency, a price or a credit. Its value moves every day, so who owes whom keeps flipping.**

**The Exporter's worry.** Today 1 dollar = ₹84. The Exporter will receive **$1 million in 3 months**. If the dollar falls to ₹80 by then, it gets ₹40 lakh less. It wants certainty.

It makes a promise with Our Bank: *"In 3 months, I'll sell you $1 million at ₹84, whatever the market rate is then."*

This promise is a **forward**. Why do it? To **hedge**: cancel a risk you already have. The Exporter now knows it will get exactly ₹8.4 crore.

| Building block | Meaning | In our story |
|---|---|---|
| Forward | Buy or sell later at a price fixed today; a private deal | Sell $1 million at ₹84 in 3 months |
| Future | A forward that is standardised and traded on an exchange (such as NSE), settled daily | Very little credit risk: the exchange stands in the middle |
| Swap | Exchange one stream of payments for another, such as fixed for floating interest, over years | The Exporter pays a fixed 7% on ₹100 crore; the bank pays a floating rate |
| Option | The right, but not the obligation, to buy or sell. The buyer pays upfront for it: the **premium** | The right to sell dollars at ₹84; walk away if the market is better |

You only need to recognise these four. Every other derivative is a mix of them.

| Word | Meaning |
|---|---|
| OTC, over the counter | A private deal between two parties, with no exchange in the middle. Forwards, swaps and most options with companies are OTC. **That is where counterparty risk lives** |
| Hedger | Uses a derivative to cancel a risk it already has: the Exporter |
| Market-maker | A bank that quotes prices and takes the other side, then manages the combined risk |

| Number | Meaning |
|---|---|
| Notional | The reference amount payments are calculated on (the $1 million, or ₹100 crore in a swap); **not** what is at risk |
| MtM, mark-to-market | Today's value: what it would cost to replace the contract now. Positive means the counterparty owes you; negative means you owe them |

### The value keeps moving

On the settlement day, three things can happen:

| Dollar in 3 months | What the bank does | Who is better off |
|---|---|---|
| ₹80 | Pays ₹84 for dollars worth ₹80 | **The Exporter**, by ₹40 lakh |
| ₹84 | Pays ₹84 for dollars worth ₹84 | Nobody |
| ₹88 | Pays ₹84 for dollars worth ₹88 | **Our Bank**, by ₹40 lakh |

The Exporter always gets ₹8.4 crore. But between the two of them, **someone ends up ahead**, and nobody knows who until the day.

It does not wait until the last day either. One month in, the rate for that settlement date has moved to ₹86. The bank's right to buy at ₹84 is worth (86 − 84) × $1 million = **+₹20 lakh** to the bank. That ₹20 lakh is the MtM. Tomorrow it will be different.

| Word | Meaning |
|---|---|
| In the money | MtM is positive for you: the other side owes you value |
| Out of the money | MtM is negative for you: you owe them |

**Key picture:** in a loan, the borrower always owes the bank. In a derivative, **who owes whom flips** as prices move.

## 21 — Counterparty credit risk: when the other side fails

**Counterparty credit risk (CCR) is the risk that the other side defaults before the contract's final cash flows are settled, while the contract is worth money to you.**

**The bad day.** The dollar has jumped. MtM to Our Bank is **+₹40 lakh**. Then the Exporter goes bankrupt.

| Step | What happens |
|---|---|
| 1 | Our Bank had already promised those dollars onwards, expecting to buy them at ₹84 |
| 2 | Now it must buy them in the market at ₹88 |
| 3 | ₹4 × $1 million = **₹40 lakh lost** |

**Replacement cost** = what it costs to replace the lost deal at today's price. It equals the positive MtM.

**The lucky twist.** Suppose the dollar had **fallen** instead. The bank owes the Exporter ₹40 lakh, and the Exporter goes bankrupt. Does the bank lose? **No.** The bankrupt company's administrators still collect the ₹40 lakh from the bank; the bank just pays what it owed anyway.

So a bank can only lose when the value is **positive**:

$$
\text{Exposure} = \max(\text{MtM},\ 0)
$$

**Read it as:** if the MtM is positive, that is the exposure; if not, the exposure is zero.

**Normal lending and counterparty risk, side by side**

| | Normal lending | Counterparty risk (derivatives) |
|---|---|---|
| What creates exposure | Money lent | The contract's value moving with markets |
| Direction | One-way: the bank is always the one exposed | Two-way: either side can be exposed |
| Size of exposure | Known: drawn + CCF × undrawn | Unknown: today's MtM plus a buffer for how it could grow |
| Loss happens when | The borrower defaults | The counterparty defaults while the contract is worth money to you |
| Main protection | Collateral, guarantees | Netting, margin, central clearing |
| Regulatory EAD | Drawn + CCF × undrawn | SA-CCR: 1.4 × (RC + PFE) |
| Accounting | Amortised cost; IFRS 9 ECL with stages | Fair value (FVTPL); CVA inside the value; no ECL |
| Capital | Credit RWA | Default charge + CVA charge |
| Loss before any default? | Only through provisions as stages move | Yes: CVA loss when the counterparty's spread widens |
| Liquidity effect | Funding the loan | Collateral calls when markets move |

| Two risks, one contract | Meaning |
|---|---|
| Pre-settlement risk | The other side defaults before settlement: this is CCR |
| Settlement risk | On the settlement day you pay your leg and do not receive theirs. Separate from CCR, and solved by paying both legs at once (for currencies, CLS) |

**The whole problem in one line:** how do you manage a credit risk when you do not know how big it will be? Section 22 estimates it; section 23 shrinks it.

## 22 — Measuring exposure: EE, EPE, PFE, EAD

**Nobody knows future prices, so banks simulate thousands of possible futures, value the deal in each, and summarise the results into an average (EE) and a bad case (PFE).**

A tiny version you can do in your head: 5 scenarios for the dollar, one year from now.

| Scenario | MtM to bank | Exposure = max(MtM, 0) |
|---|---|---|
| 1 | −₹30 lakh | 0 |
| 2 | −₹10 lakh | 0 |
| 3 | +₹5 lakh | ₹5 lakh |
| 4 | +₹20 lakh | ₹20 lakh |
| 5 | +₹50 lakh | ₹50 lakh |

| Measure | Working | Result |
|---|---|---|
| EE, expected exposure | (0 + 0 + 5 + 20 + 50) ÷ 5 | **₹15 lakh**: the typical amount they might owe us |
| PFE, potential future exposure | The bad case; with thousands of scenarios, the 95th or 99th worst percent | **₹50 lakh**: how bad could it get? |

Notice the negative scenarios count as zero, not as negatives. That is why EE is higher than the average MtM, which here is only ₹7 lakh.

| Measure | Question it answers | Used for |
|---|---|---|
| EE | What might they typically owe us at a future date? | Pricing, CVA |
| EPE, expected positive exposure | The same, averaged over the whole life of the deal | Pricing, CVA |
| EEPE, effective EPE | EPE that is never allowed to fall over the first year | Capital under internal models |
| PFE | How bad could it get? | **Limits**: "never more than ₹5 crore at risk with this client" |
| EAD | One final number for the regulator | Capital (section 25) |

**Exposure has a shape over time.** Repeat the scenarios at every future date and plot EE and PFE: that is the **exposure profile**.

<svg viewBox="0 0 400 322" width="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line chart: expected exposure of a forward grows steadily to maturity; expected exposure of a swap rises to a peak about a third of the way through and falls to zero at maturity" style="width:100%;max-width:400px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#1f2937">
<text x="200" y="24" text-anchor="middle" font-size="16" font-weight="700">Expected exposure over a deal's life</text>
<line x1="40" y1="240" x2="380" y2="240" stroke="#9ca3af" stroke-width="1.2"/>
<line x1="40" y1="240" x2="40" y2="60" stroke="#9ca3af" stroke-width="1.2"/>
<path d="M 40.0 240.0 L 46.8 218.8 L 53.6 210.0 L 60.4 203.3 L 67.2 197.6 L 74.0 192.6 L 80.8 188.0 L 87.6 183.9 L 94.4 180.0 L 101.2 176.4 L 108.0 172.9 L 114.8 169.6 L 121.6 166.5 L 128.4 163.5 L 135.2 160.6 L 142.0 157.8 L 148.8 155.1 L 155.6 152.5 L 162.4 150.0 L 169.2 147.5 L 176.0 145.1 L 182.8 142.8 L 189.6 140.5 L 196.4 138.3 L 203.2 136.1 L 210.0 133.9 L 216.8 131.8 L 223.6 129.8 L 230.4 127.8 L 237.2 125.8 L 244.0 123.8 L 250.8 121.9 L 257.6 120.0 L 264.4 118.1 L 271.2 116.3 L 278.0 114.5 L 284.8 112.7 L 291.6 111.0 L 298.4 109.2 L 305.2 107.5 L 312.0 105.8 L 318.8 104.2 L 325.6 102.5 L 332.4 100.9 L 339.2 99.3 L 346.0 97.7 L 352.8 96.1 L 359.6 94.6 L 366.4 93.0 L 373.2 91.5 L 380.0 90.0" fill="none" stroke="#2563eb" stroke-width="2.4"/>
<path d="M 40.0 240.0 L 46.8 194.3 L 53.6 176.6 L 60.4 164.0 L 67.2 154.1 L 74.0 146.1 L 80.8 139.4 L 87.6 133.8 L 94.4 129.1 L 101.2 125.2 L 108.0 121.9 L 114.8 119.3 L 121.6 117.1 L 128.4 115.5 L 135.2 114.3 L 142.0 113.5 L 148.8 113.1 L 155.6 113.0 L 162.4 113.3 L 169.2 113.9 L 176.0 114.8 L 182.8 116.0 L 189.6 117.4 L 196.4 119.1 L 203.2 121.1 L 210.0 123.3 L 216.8 125.8 L 223.6 128.5 L 230.4 131.3 L 237.2 134.4 L 244.0 137.8 L 250.8 141.3 L 257.6 145.0 L 264.4 148.8 L 271.2 152.9 L 278.0 157.2 L 284.8 161.6 L 291.6 166.2 L 298.4 171.0 L 305.2 175.9 L 312.0 181.0 L 318.8 186.2 L 325.6 191.6 L 332.4 197.2 L 339.2 202.9 L 346.0 208.7 L 352.8 214.7 L 359.6 220.8 L 366.4 227.1 L 373.2 233.5 L 380.0 240.0" fill="none" stroke="#d97706" stroke-width="2.4"/>
<rect x="40" y="276" width="22" height="6" fill="#2563eb"/><text x="70" y="284" font-weight="700" fill="#1d4ed8">Forward: keeps growing</text>
<rect x="40" y="300" width="22" height="6" fill="#d97706"/><text x="70" y="308" font-weight="700" fill="#b45309">Swap: rises, then falls to zero</text>
<text x="380" y="260" text-anchor="end" fill="#4b5563">time → maturity</text>
<text x="40" y="260" fill="#4b5563">today</text>
<text x="46" y="52" fill="#4b5563">exposure ↑</text>
</g>
</svg>

**Read it as:** a forward's exposure keeps growing, because the rate has longer to wander. A swap's exposure rises and then falls: rates have longer to wander, but fewer payments remain to be affected. The peak comes about a third of the way through.

## 23 — Shrinking it: netting, collateral, clearing

**Three tools cut CCR: add all deals into one number, take a deposit against it, or put a clearing house in the middle. One warning: wrong-way risk.**

### Tool 1 — Netting

Our Bank has three deals with the Exporter:

| Deal | MtM to bank |
|---|---|
| A: forward | +₹10 crore |
| B: swap | −₹6 crore |
| C: option | +₹3 crore |

| | Working | Exposure |
|---|---|---|
| Without netting | The bankrupt company refuses to pay A and C but still demands B | 10 + 3 = **₹13 crore** |
| With netting | All deals collapse into one number | 10 − 6 + 3 = **₹7 crore** |

What makes this legally possible is the **ISDA Master Agreement**: one umbrella contract signed once, covering every deal between the two sides. All trades under one agreement form a **netting set**. Netting is only recognised if the bank has a legal opinion that it holds up in the counterparty's country.

### Tool 2 — Collateral

**Collateral** = cash or safe bonds the client hands over to cover what it owes. If it defaults, the bank keeps it. The Exporter posts **₹5 crore**. Exposure = 7 − 5 = **₹2 crore**.

<svg viewBox="0 0 400 226" width="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart: exposure to the Exporter is 13 crore without netting, 7 crore after netting and 2 crore after collateral" style="width:100%;max-width:400px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#1f2937">
<text x="200" y="24" text-anchor="middle" font-size="16" font-weight="700">Our Bank's exposure to the Exporter</text>
<text x="12" y="65" fill="#334155">No netting</text>
<rect x="140" y="48" width="236" height="26" rx="4" fill="#dc2626"/>
<text x="368" y="66" text-anchor="end" font-weight="700" fill="#ffffff">₹13 cr</text>
<text x="12" y="115" fill="#334155">After netting</text>
<rect x="140" y="98" width="127" height="26" rx="4" fill="#d97706"/>
<text x="275" y="116" font-weight="700" fill="#d97706">₹7 cr</text>
<text x="12" y="165" fill="#334155">After collateral</text>
<rect x="140" y="148" width="36" height="26" rx="4" fill="#16a34a"/>
<text x="184" y="166" font-weight="700" fill="#16a34a">₹2 cr</text>
<text x="200" y="212" text-anchor="middle" fill="#4b5563">Same three deals: paperwork cut the risk by 85%</text>
</g>
</svg>

| Collateral term | Meaning |
|---|---|
| CSA, credit support annex | The part of the ISDA that sets the collateral rules |
| VM, variation margin | Collateral that follows today's MtM, exchanged daily |
| IM, initial margin | Extra collateral covering how far the value could move while a default is being closed out |
| Threshold | Exposure allowed before any collateral is asked for |
| MTA, minimum transfer amount | Smallest call worth making, to avoid moving tiny sums daily |
| MPOR, margin period of risk | The days between the client's last payment and the bank closing everything out; prices keep moving, so collateral is never perfect |

### Tool 3 — A clearing house in the middle

A **CCP, central counterparty**, steps into the middle of deals, so each bank faces the CCP instead of each other. The CCP collects collateral from everyone, every day, and keeps a default fund. In India that is **CCIL**. Standardised OTC derivatives between banks must be cleared, but deals with ordinary companies such as the Exporter usually are not. **That is where CCR still bites.**

### The warning — wrong-way risk

**Wrong-way risk** = the client owes you **more** exactly when it becomes **weaker**. Two bad things at once.

| Type | Meaning | Example |
|---|---|---|
| General wrong-way | A broad market move both raises exposure and weakens the counterparty | Our Bank receives a fixed rate on a swap with a property developer. In a recession rates are cut, so the swap is worth more to the bank, just as the developer's sales collapse |
| Specific wrong-way | A legal or structural link between exposure and the counterparty | A company gives its own shares as collateral; if it fails, the shares crash too |
| Right-way | Exposure rises when the counterparty gets stronger | The Exporter: when the dollar rises it owes the bank more, but it earns more rupees from US sales |

**The pieces of CCR, one line each**

| Piece | In one line |
|---|---|
| Exposure measures | EE, expected exposure: the average future exposure. PFE, potential future exposure: a high-percentile exposure, used for limits |
| Wrong-way risk | Exposure rises exactly when the counterparty's credit worsens |
| Netting | Under an ISDA Master Agreement, all trades with one counterparty collapse into one net amount on default |
| Collateral | Under a CSA, credit support annex: VM, variation margin, covers today's value; IM, initial margin, covers the move while a default is closed out |
| Central clearing | A CCP, central counterparty, stands between buyer and seller; standardised OTC derivatives must be cleared |
| Settlement risk | You pay your leg and do not receive theirs on the day; separate from CCR, which is default before settlement |
| SA-CCR | The regulator's formula for derivative EAD: 1.4 × (replacement cost + potential future exposure) |
| CVA | Credit valuation adjustment: the market price of the counterparty's default risk, taken off the derivative's value |
| DVA | Debit valuation adjustment: the mirror image, your own default risk; its gains are removed from CET1 |
| XVA | The wider family of pricing adjustments: FVA for funding, MVA for margin, KVA for capital |

## 24 — CVA: the price tag on counterparty risk

**CVA is the market price of the chance that the counterparty defaults while owing you. It is taken off the derivative's value, and it moves every day with the counterparty's credit spread, so a loss can come before any default.**

**The idea.** A friend owes you ₹100 next year, and there is a 10% chance he disappears. Is that IOU worth ₹100 today? **No: about ₹90.** The missing ₹10 is the **price of his default risk**. CVA is the same idea for derivatives.

$$
\text{True value} = \text{value if nobody could default} - \text{CVA}
$$

$$
\text{CVA} \approx \text{EPE} \times \text{PD} \times \text{LGD} \times \text{years}
$$

**Read it as:** how much they might owe you × chance they go bust each year × share you would lose × how long the deal runs.

| Term | Meaning |
|---|---|
| EPE | How much they typically owe you (section 22) |
| PD | Probability of default per year, from the market |
| LGD | Share lost if they fail; usually around 60%, because about 40% is recovered |
| years | How long the deal runs |

### Worked example — CVA on a 5-year swap

A 5-year swap with the Exporter. EPE = ₹10 crore, PD = 2% a year, LGD = 60%.

CVA ≈ ₹10 crore × 2% × 60% × 5 = **₹60 lakh**.

Real banks do it year by year and discount to today. The full formula:

$$
\text{CVA} = \text{LGD} \times \sum_{t} \text{EE}_t \times \text{PD}_t \times \text{DF}_t
$$

| Year | EE | EE × 2% × 60% | DF at 7% | Worth today |
|---|---|---|---|---|
| 1 | ₹8 crore | ₹9.6 lakh | 0.935 | ₹9.0 lakh |
| 2 | ₹12 crore | ₹14.4 lakh | 0.873 | ₹12.6 lakh |
| 3 | ₹12 crore | ₹14.4 lakh | 0.816 | ₹11.8 lakh |
| 4 | ₹10 crore | ₹12.0 lakh | 0.763 | ₹9.2 lakh |
| 5 | ₹8 crore | ₹9.6 lakh | 0.713 | ₹6.8 lakh |
| **Total** | Average ₹10 crore | **₹60 lakh** | | **About ₹49 lakh** |

**Read it as:** the exposure profile from section 22 (rising, then falling) is what goes into the EE column. Discounting brings the ₹60 lakh down to about ₹49 lakh.

### Where the 2% comes from

For CVA, the chance of default comes from the **market**, not the bank's internal rating. **Credit spread** = the extra yearly interest the market demands to lend to a company: the market's price for its default risk.

$$
\text{PD} \approx \frac{\text{credit spread}}{\text{LGD}}
$$

**Read it as:** the Exporter's spread is 1.2%. 1.2% ÷ 60% = **2% a year**. Where a company has no traded bonds or CDS, banks use a proxy spread from similar companies by sector, rating and region.

### What the bank does with it

| Action | Meaning |
|---|---|
| Charges it | The CVA is built into the price quoted to the Exporter |
| Books it | Accounting rules (IFRS 13; Ind AS 113 in India) require fair values to include it; every change hits P&L (section 15) |
| Manages it | A **CVA desk** looks after it and hedges it, for example by buying CDS (credit default swaps: insurance against a company's default) on the counterparty or a credit index |

### Why CVA matters so much

The Exporter does **not** default, but its credit spread **doubles** from 1.2% to 2.4%. CVA doubles too: ₹60 lakh → ₹1.2 crore. The bank books a **₹60 lakh loss**, and **nobody defaulted**.

This happened on a huge scale in 2008. About two-thirds of counterparty losses in that crisis came from CVA moves like this, not from actual defaults. That is why Basel III added a separate CVA capital charge.

**CVA is a daily risk, not just a default risk.**

### The CVA family

| Name | One line |
|---|---|
| CVA | Cost of **their** default risk |
| DVA | The mirror: the bank's **own** default risk. When the bank's own credit worsens, DVA produces a gain, which is why DVA gains are removed from CET1 |
| FVA | Cost of funding deals where the client posts no collateral |
| MVA | Cost of funding the initial margin the bank must post |
| KVA | Cost of the capital a deal uses up |

Together these are called **XVA**. Know CVA well; know the rest by name.

## 25 — Capital for counterparty risk

**SA-CCR gives the EAD. That EAD then carries two separate capital charges: one for the counterparty defaulting, one for its credit worsening.**

$$
\text{EAD}_{\text{derivatives}} = 1.4 \times (\text{RC} + \text{PFE})
$$

**Read it as:** RC, replacement cost, is what it would cost to replace the contracts today, after collateral. PFE, potential future exposure, is a buffer for how that could grow. The 1.4 is a safety multiplier, called alpha.

### How each piece is built

| Piece | Formula in words |
|---|---|
| RC, unmargined | max(MtM of the netting set − collateral held, 0) |
| RC, margined | The larger of that and the most the exposure could reach before a collateral call is triggered (threshold + MTA − independent collateral) |
| PFE | Multiplier × aggregate add-on |
| Add-on | For each trade: supervisory factor × adjusted notional × maturity factor, grouped by asset class; offsetting trades in the same hedging set reduce each other |
| Maturity factor, unmargined | √(remaining maturity in years, capped at 1) |
| Maturity factor, margined | 1.5 × √(MPOR in years): about 0.3 for 10 business days |
| Multiplier | 1 normally; falls below 1 when the bank holds more collateral than the MtM, down to 0.05 |

| Asset class | Supervisory factor |
|---|---|
| Interest rate | 0.5% (times supervisory duration) |
| FX | 4% |
| Credit, single name | 0.38% to 6%, by rating |
| Equity, single name | 32% |
| Commodity | 18% (electricity 40%) |

**Read it as:** the supervisory factor is the regulator's view of how far each kind of price can move in a year. Equity and commodities jump more than currencies; interest rates move least.

### Worked example — SA-CCR on the Exporter's forward

One month in: MtM +₹20 lakh to the bank, 2 months left, no collateral, no margin agreement.

| Step | Working | Result |
|---|---|---|
| RC | max(₹20 lakh − 0, 0) | ₹20 lakh |
| Adjusted notional | $1 million at today's ₹86 | ₹8.6 crore |
| Maturity factor | √(2 ÷ 12) | 0.41 |
| Add-on | 4% × ₹8.6 crore × 0.41 | ₹14.0 lakh |
| Multiplier | MtM is positive and uncollateralised | 1 |
| PFE | 1 × ₹14.0 lakh | ₹14.0 lakh |
| EAD | 1.4 × (₹20 lakh + ₹14.0 lakh) | **₹47.6 lakh** |
| Default RWA | ₹47.6 lakh × 100% (unrated corporate) | ₹47.6 lakh |
| Capital at 11.5% | | **About ₹5.5 lakh** |

**The same forward with daily variation margin.** The Exporter posts ₹20 lakh of collateral matching the MtM. RC falls to about zero. Maturity factor becomes 1.5 × √(10 ÷ 250) = 0.3, so the add-on is 4% × ₹8.6 crore × 0.3 = ₹10.3 lakh. EAD = 1.4 × ₹10.3 lakh = **₹14.4 lakh**: less than a third. Collateral and netting shrink both parts of the formula, one more reason banks chase them.

### The two charges

| Charge | Covers | How |
|---|---|---|
| 1. Default risk | The counterparty actually defaulting | RWA = SA-CCR or IMM EAD × the counterparty's risk weight, under SA or IRB |
| 2. CVA risk | Losses as the counterparty's credit spread widens, before any default | CVA capital, below. Added in Basel III because in 2008 about two-thirds of counterparty losses came from CVA moves, not defaults |

| CVA capital under Basel 3.1 | In short |
|---|---|
| BA-CVA, basic approach | Formula-based: counterparty EAD, maturity and a supervisory risk weight by sector and rating |
| SA-CVA, standardised approach | Sensitivity-based, needs supervisory approval, recognises more hedges |
| Materiality option | A small derivatives user (€100 billion notional or less, non-cleared) may set CVA capital = 100% of its CCR default capital |
| Internal models | Removed |

### Worked example — BA-CVA on the 5-year swap

For a single counterparty with no hedges, BA-CVA reduces to:

$$
\text{CVA capital} = 0.65 \times \frac{\text{RW} \times M \times \text{EAD} \times \text{DF}}{1.4}
$$

**Read it as:** RW is the supervisory risk weight for the counterparty's sector and rating; M is the effective maturity in years; DF is a small discount factor; 0.65 is a fixed scaling factor; dividing by 1.4 takes back out the alpha already inside the EAD.

| Input | Value |
|---|---|
| EAD from SA-CCR | ₹6 crore |
| RW: manufacturing, unrated | 7% |
| Effective maturity M | 3 years |
| DF: (1 − e<sup>−0.05 × 3</sup>) ÷ (0.05 × 3) | 0.93 |
| CVA capital: 0.65 × 7% × 3 × ₹6 crore × 0.93 ÷ 1.4 | **About ₹54 lakh** |
| As RWA: 12.5 × ₹54 lakh | About ₹6.8 crore |

Compare the default charge on the same swap: ₹6 crore EAD × 100% × 11.5% = ₹69 lakh. **The CVA charge is almost as large as the default charge.** For a long-dated uncollateralised derivative with a corporate, the bank pays twice: once for default, once for spread risk.

| Special case | Rule |
|---|---|
| Qualifying CCP (QCCP) trade exposures | 2% risk weight |
| Default fund contributions to a CCP | Their own separate charge |
| Cleared trades | No CVA charge |
| IRB for CCR | Effective maturity uses the netting set's cash flows, with a 1-year floor for most derivatives |
| IMM, internal model method | Big banks may simulate exposure themselves; EAD = 1.4 × EEPE, with regulatory approval and subject to the output floor |
| Specific wrong-way risk | The trade is carved out of its netting set and given a harsher EAD |

---

**Part 6 — Markets, treasury and the balance sheet**

## 26 — Market risk in brief

**Market risk is loss from prices moving: interest rates, currencies, shares, commodities and credit spreads. It lives mainly in the trading book and is capitalised under FRTB.**

| Risk factor | What moves | Example position |
|---|---|---|
| Interest rate | Yields at each tenor | Government bonds, swaps |
| FX | Currency rates | The Exporter's forward, before it is hedged |
| Equity | Share prices | A share trading book |
| Commodity | Gold, oil, metals | Gold loans hedged with futures |
| Credit spread | The extra yield on a company's bonds | Corporate bonds, CDS |

### Measuring it: VaR and expected shortfall

| Measure | Question | Example |
|---|---|---|
| VaR, value at risk | What loss will we exceed only 1 day in 100 (at 99%)? | 1-day 99% VaR of ₹10 crore: on 99 days in 100, the loss is smaller |
| ES, expected shortfall | When we are in that bad tail, how bad is it on average? | The average of the worst 2.5% of days: say ₹16 crore |

**Worked example.** Over 200 trading days, the five worst losses (the worst 2.5%) were ₹30, ₹25, ₹20, ₹18 and ₹17 crore. VaR at 97.5% sits at the edge of that tail: about ₹17 crore. ES is their average: (30 + 25 + 20 + 18 + 17) ÷ 5 = **₹22 crore**.

**Read it as:** VaR says where the tail starts; ES says how deep it goes. Two books can have the same VaR while one hides a far worse tail. That blind spot is why FRTB switched to ES.

| Sensitivity (the "Greeks") | Meaning |
|---|---|
| Delta | Change in value for a small move in the price |
| Vega | Change in value when expected volatility changes; matters for options |
| Curvature | The extra loss from a large move that delta alone misses; again mostly options |

| FRTB market risk capital | Content |
|---|---|
| Standardised approach | Sensitivities-based method (delta, vega, curvature), default risk charge (jump-to-default in trading positions), residual risk add-on |
| Internal models approach | Expected shortfall at 97.5% replacing VaR at 99% and stressed VaR; liquidity horizons of 10 to 120 days; desk-by-desk approval with backtesting and P&L attribution tests; a separate charge for non-modellable risk factors |

| FRTB term | Meaning |
|---|---|
| Liquidity horizon | How long it would take to sell a position in stress: 10 days for major currencies, up to 120 days for hard-to-sell credit |
| Backtesting | Comparing the model's predicted losses with real daily P&L |
| P&L attribution test | Checking the risk model and the front-office pricing model tell the same story |
| NMRF, non-modellable risk factor | A price with too few real observations to model; gets a stricter charge |
| Default risk charge | Capital for a bond issuer defaulting while its bond sits in the trading book |

## 27 — Where market risk meets credit risk: CCR

**In a loan, credit risk alone decides the loss. In a derivative, the market decides how much is owed and credit decides whether it is paid. CCR and CVA are where the two risks meet.**

$$
\text{CVA} \approx \underbrace{\text{EPE}}_{\text{market risk}} \times \underbrace{\text{PD} \times \text{LGD}}_{\text{credit risk}} \times \text{years}
$$

**Read it as:** exposure comes from market moves (the dollar, rates). Default risk comes from the counterparty's credit (its spread). CVA multiplies them, so it moves when either one moves.

### Worked example — the two drivers of CVA

Start from the 5-year swap: CVA ₹60 lakh (section 24).

| What happens | Market driver: EPE | Credit driver: PD | CVA |
|---|---|---|---|
| Nothing | ₹10 crore | 2% | ₹60 lakh |
| Rates move; the swap is now worth more to the bank | ₹20 crore | 2% | ₹1.2 crore |
| The Exporter's spread doubles | ₹10 crore | 4% | ₹1.2 crore |
| **Both at once**: wrong-way risk | ₹20 crore | 4% | **₹2.4 crore** |

**Read it as:** a pure market move with no change in the client's health doubled the CVA. A pure credit move with no market change doubled it too. Together they multiply: this is exactly why wrong-way risk is feared.

### One market move, many effects

Say the dollar jumps from ₹84 to ₹88 overnight.

| Effect | Where | Section |
|---|---|---|
| The forward's MtM to Our Bank rises by ₹40 lakh | Market value | 20 |
| Exposure and EE rise | CCR measurement | 22 |
| CVA rises, a P&L loss | Accounting | 15, 24 |
| SA-CCR EAD rises, so default capital and CVA capital rise | Capital | 25 |
| PFE limit use rises; may breach the client's limit | Credit limits | 22 |
| If there is a CSA, the Exporter must post more collateral | Liquidity for the client | 23 |
| On the bank's own hedge with another bank, Our Bank may have to post collateral | Liquidity for the bank | 31 |

### Who does what

| Team | Role in CCR |
|---|---|
| Front office, trading | Prices the deal, including CVA |
| Market risk | Runs the exposure simulation; measures market risk of the CVA desk's hedges |
| Credit risk | Rates the counterparty, sets PFE limits, approves the line |
| CVA desk | Owns and hedges CVA, often with CDS |
| Treasury | Funds and posts collateral; charges funding costs (FVA) |
| Finance | Books CVA in fair value; reports it |

| Boundary rule | Meaning |
|---|---|
| CVA risk is not market risk capital | CVA gets its own charge (section 25), even though it moves with markets |
| CVA hedges | Eligible hedges sit under the CVA framework, not FRTB |
| Credit in the trading book | Corporate bonds and CDS carry credit spread risk and a default risk charge under FRTB, not banking-book credit rules |

## 28 — Treasury and FTP

**Treasury is the bank's central money desk: it funds the bank, holds the liquidity buffer, manages rate and currency risk, and, through FTP, sets the internal price of money for every business.**

| Treasury runs | Meaning |
|---|---|
| Funding and liquidity | Liquidity buffers and reserve requirements |
| Investment book | The bank's securities |
| FX and derivatives | Hedging and client flows |
| FTP, funds transfer pricing | Charges each business for funds used and credits it for funds brought, moving rate and liquidity risk to the centre |
| Front, middle, back office | Front trades; middle measures risk and P&L; back settles |
| India | CRR and SLR are RBI-set shares of NDTL, net demand and time liabilities [verify current rates] |

| India term | Meaning |
|---|---|
| CRR, cash reserve ratio | Share of deposits kept as cash with the RBI, earning nothing |
| SLR, statutory liquidity ratio | Share of deposits held in government bonds and other approved assets |
| NDTL | The deposit base these shares are measured on |

**The problem FTP solves.** A branch raises deposits; another branch lends. Who earned the profit? Without an internal price, the lending branch looks brilliant and the deposit branch looks useless, even though neither could work without the other. Worse, each branch would be taking interest rate risk without knowing it.

**How FTP works.** Treasury acts as an internal bank. It buys every deposit and sells money for every loan, each at the rate on the yield curve (section 29) for that exact term. Each business then keeps only the margin it truly controls, and treasury carries the mismatch.

### Worked example — splitting one loan's profit three ways

A branch takes a 1-year deposit paying 6.5%. Another lends the Salaried Borrower's personal loan at 13.2% for 3 years. The yield curve says 1-year money costs 7.0% and 3-year money 7.6%. Treasury adds a 0.3% liquidity premium for tying money up for 3 years.

| Business | Earns | Pays | Margin |
|---|---|---|---|
| Deposit branch | FTP credit 7.0% | 6.5% to the depositor | **0.5%** for gathering cheap funds |
| Lending branch | 13.2% from the borrower | FTP charge 7.6% + 0.3% = 7.9% | **5.3%**, which must cover EL, capital and costs (section 10) |
| Treasury | 7.9% from the lending branch | 7.0% to the deposit branch | **0.9%**, for carrying the rate and liquidity mismatch |

**Read it as:** the loan is 3-year money funded by 1-year money. If rates rise next year, the deposit reprices and the loan does not. FTP makes treasury own that risk, where it can be measured (IRRBB, section 30) and hedged with swaps, instead of hiding it inside branch profits.

| FTP component | Meaning |
|---|---|
| Base rate | The yield-curve rate for the product's repricing term |
| Liquidity premium | Extra charge for long funding needs, or credit for stable deposits |
| Contingent liquidity cost | Charge for undrawn commitments that may need funding in stress |
| Behavioural term | Deposits that are contractually overnight but stay for years are credited at a longer term |

## 29 — The yield curve

**The yield curve shows the interest rate for every length of borrowing, from overnight to 30 years. It is the ruler every rate, price and discount in the bank is measured against.**

<svg viewBox="0 0 400 272" width="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line chart of three yield curve shapes: normal rising with tenor, flat, and inverted falling with tenor" style="width:100%;max-width:400px;height:auto;display:block;margin:1rem auto">
<g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="15" fill="#1f2937">
<text x="200" y="24" text-anchor="middle" font-size="16" font-weight="700">Three shapes of the yield curve</text>
<line x1="40" y1="240" x2="380" y2="240" stroke="#9ca3af" stroke-width="1.2"/>
<line x1="40" y1="240" x2="40" y2="60" stroke="#9ca3af" stroke-width="1.2"/>
<path d="M 40.0 190.0 L 46.8 181.5 L 53.6 173.7 L 60.4 166.5 L 67.2 159.9 L 74.0 153.7 L 80.8 148.1 L 87.6 142.8 L 94.4 138.0 L 101.2 133.5 L 108.0 129.4 L 114.8 125.6 L 121.6 122.1 L 128.4 118.9 L 135.2 115.9 L 142.0 113.1 L 148.8 110.6 L 155.6 108.2 L 162.4 106.1 L 169.2 104.1 L 176.0 102.2 L 182.8 100.5 L 189.6 98.9 L 196.4 97.5 L 203.2 96.1 L 210.0 94.9 L 216.8 93.7 L 223.6 92.7 L 230.4 91.7 L 237.2 90.8 L 244.0 90.0 L 250.8 89.2 L 257.6 88.5 L 264.4 87.8 L 271.2 87.2 L 278.0 86.7 L 284.8 86.2 L 291.6 85.7 L 298.4 85.3 L 305.2 84.9 L 312.0 84.5 L 318.8 84.1 L 325.6 83.8 L 332.4 83.5 L 339.2 83.3 L 346.0 83.0 L 352.8 82.8 L 359.6 82.6 L 366.4 82.4 L 373.2 82.2 L 380.0 82.0" fill="none" stroke="#16a34a" stroke-width="2.4"/>
<path d="M 40.0 150.0 L 46.8 149.9 L 53.6 149.8 L 60.4 149.7 L 67.2 149.6 L 74.0 149.5 L 80.8 149.4 L 87.6 149.3 L 94.4 149.2 L 101.2 149.1 L 108.0 149.0 L 114.8 148.9 L 121.6 148.8 L 128.4 148.7 L 135.2 148.6 L 142.0 148.5 L 148.8 148.4 L 155.6 148.3 L 162.4 148.2 L 169.2 148.1 L 176.0 148.0 L 182.8 147.9 L 189.6 147.8 L 196.4 147.7 L 203.2 147.6 L 210.0 147.5 L 216.8 147.4 L 223.6 147.3 L 230.4 147.2 L 237.2 147.1 L 244.0 147.0 L 250.8 146.9 L 257.6 146.8 L 264.4 146.7 L 271.2 146.6 L 278.0 146.5 L 284.8 146.4 L 291.6 146.3 L 298.4 146.2 L 305.2 146.1 L 312.0 146.0 L 318.8 145.9 L 325.6 145.8 L 332.4 145.7 L 339.2 145.6 L 346.0 145.5 L 352.8 145.4 L 359.6 145.3 L 366.4 145.2 L 373.2 145.1 L 380.0 145.0" fill="none" stroke="#6b7280" stroke-width="2.4"/>
<path d="M 40.0 100.0 L 46.8 105.4 L 53.6 110.3 L 60.4 114.9 L 67.2 119.2 L 74.0 123.1 L 80.8 126.7 L 87.6 130.0 L 94.4 133.1 L 101.2 135.9 L 108.0 138.5 L 114.8 141.0 L 121.6 143.2 L 128.4 145.3 L 135.2 147.2 L 142.0 148.9 L 148.8 150.5 L 155.6 152.0 L 162.4 153.4 L 169.2 154.7 L 176.0 155.9 L 182.8 157.0 L 189.6 158.0 L 196.4 158.9 L 203.2 159.7 L 210.0 160.5 L 216.8 161.3 L 223.6 161.9 L 230.4 162.5 L 237.2 163.1 L 244.0 163.6 L 250.8 164.1 L 257.6 164.6 L 264.4 165.0 L 271.2 165.4 L 278.0 165.7 L 284.8 166.1 L 291.6 166.4 L 298.4 166.7 L 305.2 166.9 L 312.0 167.1 L 318.8 167.4 L 325.6 167.6 L 332.4 167.8 L 339.2 167.9 L 346.0 168.1 L 352.8 168.2 L 359.6 168.4 L 366.4 168.5 L 373.2 168.6 L 380.0 168.7" fill="none" stroke="#dc2626" stroke-width="2.4"/>
<text x="380" y="74" text-anchor="end" font-weight="700" fill="#15803d">Normal</text>
<text x="380" y="137" text-anchor="end" font-weight="700" fill="#4b5563">Flat</text>
<text x="380" y="189" text-anchor="end" font-weight="700" fill="#b91c1c">Inverted</text>
<text x="380" y="260" text-anchor="end" fill="#4b5563">30 years</text>
<text x="40" y="260" fill="#4b5563">overnight</text>
<text x="46" y="52" fill="#4b5563">rate ↑</text>
</g>
</svg>

| Shape | Looks like | Usually means |
|---|---|---|
| Normal | Rising: long rates above short | Lenders want more for tying money up longer |
| Flat | Short and long rates about equal | A turning point |
| Inverted | Falling: short rates above long | Markets expect rate cuts, often ahead of a slowdown |

| Word | Meaning |
|---|---|
| Tenor | The length of the borrowing: 3 months, 5 years |
| Basis point, bp | 0.01%: 100 bp = 1% |
| Benchmark | The reference rate at the short end: India's policy repo rate and MIBOR; SOFR in the US and SONIA in the UK since LIBOR ended |
| Government curve | Yields on government bonds (G-secs in India): the risk-free curve |
| Credit curve | A company's yields above the government curve; the gap is its credit spread (section 24) |

**Why a bank cares**

| Use | How |
|---|---|
| Pricing loans and deposits | FTP takes each product's rate off the curve (section 28) |
| Discounting | ECL and CVA discount future losses with factors from the curve |
| Valuing bonds and swaps | Every future cash flow is discounted at its point on the curve |
| IRRBB | Shocks to the curve measure the bank's rate risk (section 30) |

### Worked example — why a bond falls when yields rise

The bond from section 12 pays ₹7 a year for 5 years, then ₹100. When the 5-year yield is 7%, it is worth ₹100. If the yield rises to 8%, each cash flow is discounted harder:

$$
\text{Price} = \sum_{t=1}^{5} \frac{7}{1.08^t} + \frac{100}{1.08^5} = 27.95 + 68.06 = 96.01
$$

**Read it as:** the same promised cash, discounted at a higher rate, is worth less today: about ₹96, which is exactly the fall section 12 used. Longer bonds fall further for the same rise; that sensitivity is called **duration**.

## 30 — IRRBB: gaps, buckets, NII and EVE

**IRRBB is interest rate risk in the banking book: the bank's assets and liabilities reprice at different times, so a rate move changes both its yearly earnings (NII) and the value of the whole balance sheet (EVE).**

| Source of IRRBB | Meaning |
|---|---|
| Gap risk | Assets and liabilities reprice at different dates; the main source |
| Basis risk | Two rates that should move together do not, such as a loan linked to the repo rate funded by deposits priced separately |
| Option risk | Customers act on rates: borrowers prepay when rates fall; depositors withdraw when rates rise |

| View | Question | Horizon |
|---|---|---|
| Earnings, NII | How much does next year's net interest income change? | 12 months |
| Economic value, EVE | How much does the present value of assets minus liabilities change? | The whole life of the balance sheet |

### Buckets: the repricing gap

Every asset and liability is placed in a **time bucket** by when it next reprices: when its rate can change, or when it matures. RSA are rate-sensitive assets; RSL rate-sensitive liabilities.

| Bucket (India's statements use about this ladder) | Examples of what lands there |
|---|---|
| 1 day; 2–7 days; 8–14 days; 15–30 days | Call money, overnight funds, repo-linked loans |
| 31 days–2 months; 2–3 months | Short deposits, T-bills |
| 3–6 months; 6 months–1 year | Floating-rate loans at reset, 1-year deposits |
| 1–3 years; 3–5 years; over 5 years | Fixed-rate loans, long bonds, core savings deposits |

$$
\text{Gap} = \text{RSA} - \text{RSL}, \qquad \Delta \text{NII} \approx \text{Gap} \times \Delta r \times \text{time remaining in the year}
$$

### Worked example — the earnings view

| Bucket | RSA | RSL | Gap | Months left in the year (from the middle of the bucket) | ΔNII for rates +1% |
|---|---|---|---|---|---|
| 0–3 months | ₹400 crore | ₹600 crore | −₹200 crore | 10.5 | −200 × 1% × 10.5 ÷ 12 = −₹1.75 crore |
| 3–6 months | ₹300 crore | ₹200 crore | +₹100 crore | 7.5 | +100 × 1% × 7.5 ÷ 12 = +₹0.63 crore |
| 6–12 months | ₹200 crore | ₹150 crore | +₹50 crore | 3 | +50 × 1% × 3 ÷ 12 = +₹0.13 crore |
| **Total** | | | | | **−₹1.0 crore** |

**Read it as:** more liabilities than assets reprice soon, so when rates rise the bank's funding costs rise faster than its loan income. A negative short gap is "liability-sensitive": it hurts when rates rise and helps when they fall.

### Worked example — the value view

$$
\Delta \text{EVE} \approx -\left(D_A \times A - D_L \times L\right) \times \Delta r
$$

**Read it as:** D is duration, roughly how many years' worth of sensitivity each side has. Long-dated assets lose more value than short-dated liabilities when rates rise.

| Input | Value |
|---|---|
| Assets A, duration D<sub>A</sub> | ₹1,000 crore, 3 years |
| Liabilities L, duration D<sub>L</sub> | ₹900 crore, 1 year |
| Rate shock Δr | +2% |
| ΔEVE | −(3 × 1,000 − 1 × 900) × 2% = **−₹42 crore** |
| Tier 1 capital | ₹200 crore |
| ΔEVE as a share of Tier 1 | 21%: **above the 15% outlier test**, so the supervisor steps in |

| Basel IRRBB rule | Meaning |
|---|---|
| Six standard shocks | Parallel up, parallel down, steepener, flattener, short rates up, short rates down |
| Shock sizes | Set by currency; bigger for currencies whose rates have moved more. For the rupee: parallel 400 bp, short 500 bp, long 300 bp [verify] |
| Outlier test | ΔEVE worse than 15% of Tier 1 under any shock |
| Where it sits | Pillar 2: no automatic capital charge, but supervisors can demand capital or action |
| Behavioural assumptions | Savings and current account deposits are split into a stable core (placed in long buckets) and a volatile part (short); loan prepayments are modelled |

## 31 — LCR and NSFR

**Liquidity is the ability to pay when due. It is separate from solvency: a bank can be worth more than it owes and still fail if it cannot find cash this week.**

$$
\text{LCR} = \frac{\text{HQLA}}{\text{net cash outflows over 30 stressed days}} \geq 100\%
$$

| HQLA, high-quality liquid assets | Content | Haircut | Cap |
|---|---|---|---|
| Level 1 | Cash, central bank reserves, top sovereigns | None | None |
| Level 2A | Higher-quality non-Level-1 assets | 15% | Level 2 in total at most 40% of HQLA |
| Level 2B | Lower-quality eligible assets | 25–50% | At most 15% of HQLA |

| Outflow rate | Value |
|---|---|
| Stable retail deposits | 5% |
| Less stable retail | 10% |
| Operational wholesale | 25% |
| Non-operational corporate | 40% |
| Financial institutions | 100% |
| Undrawn committed facilities | 10% corporate credit; 30% liquidity lines |

Inflows are capped at 75% of outflows. **India:** LCR 100%; part of the SLR holdings counts as Level 1 through FALLCR.

### Worked example — Our Bank's LCR

| HQLA | Amount | After haircut |
|---|---|---|
| Level 1: government bonds, reserves | ₹800 crore | ₹800 crore |
| Level 2A: high-grade corporate bonds | ₹200 crore | ₹170 crore |
| **HQLA** | | **₹970 crore** |

| Outflow | Balance | Rate | 30-day outflow |
|---|---|---|---|
| Stable retail deposits | ₹5,000 crore | 5% | ₹250 crore |
| Less stable retail | ₹3,000 crore | 10% | ₹300 crore |
| Operational wholesale | ₹1,000 crore | 25% | ₹250 crore |
| Non-operational corporate | ₹500 crore | 40% | ₹200 crore |
| Undrawn corporate lines | ₹1,000 crore | 10% | ₹100 crore |
| Derivative collateral calls | | | ₹50 crore |
| **Total outflows** | | | **₹1,150 crore** |
| Inflows (below the 75% cap) | | | ₹400 crore |
| **Net outflows** | | | **₹750 crore** |

LCR = ₹970 crore ÷ ₹750 crore = **129%**. Above 100%, so Our Bank passes. Level 2 is 170 ÷ 970 = 18% of HQLA, inside the 40% cap.

**Read it as:** the regulator imagines a month-long run and asks whether the bank's easy-to-sell assets cover it. Stable retail deposits are assumed to leave slowly; money from other banks, fast.

$$
\text{NSFR} = \frac{\text{available stable funding (ASF)}}{\text{required stable funding (RSF)}} \geq 100\%, \text{ over one year}
$$

| ASF factor | Value | RSF factor | Value |
|---|---|---|---|
| Capital | 100% | Cash | 0% |
| Stable retail | 95% | Level 1 | 5% |
| Less stable retail | 90% | Retail and SME loans under 1 year | 50% |
| Corporate funding under 1 year | 50% | Low-risk mortgages | 65% |
| Short-term funding from financial institutions | 0% | Other loans over 1 year | 85% |
| | | Non-performing | 100% |

**Read it as:** each funding source is weighted by how likely it is to stay a year; each asset by how much of it needs funding that stays a year. Long loans must not rest on hot money.

**India:** NSFR has applied since October 2021.

| Derivatives and liquidity | Effect |
|---|---|
| Collateral calls on downgrades or market moves | LCR outflows |
| Net derivative liabilities | Add to required stable funding in the NSFR |

## 32 — ALM and the risk map

**ALM, asset-liability management, manages the mismatches between what a bank owns and what it owes. It is owned by ALCO, the asset-liability committee.**

| Mismatch | Meaning |
|---|---|
| Liquidity | Long loans funded by short deposits |
| Interest rate | Assets and liabilities reprice at different times |

| ALCO decides | Using |
|---|---|
| Deposit and loan pricing | FTP, the yield curve |
| How much rate risk to run, and hedges | IRRBB gaps, EVE, swaps |
| Size and make-up of the liquidity buffer | LCR, NSFR, structural liquidity statement |
| Funding plan | Maturity gaps, stress tests, contingency funding plan |

| Risk | Meaning | Tools |
|---|---|---|
| Funding liquidity | Can't raise cash | LCR, NSFR, maturity gap buckets, stress tests, contingency funding plan; India: structural liquidity statement |
| Market liquidity | Can't sell assets without large losses | As above |
| IRRBB | Rate risk in the banking book, measured on earnings (change in NII, net interest income, over 12 months) and economic value (change in EVE, present value of assets minus liabilities) | Six standard shocks: parallel up, parallel down, steepener, flattener, short up, short down. Outlier test: EVE falling more than 15% of Tier 1. India: interest rate sensitivity statement |
| FX risk | Open currency positions | Position limits |
| Market risk | The trading book | FRTB |
| Credit risk | Issuers in the investment book | Credit limits |
| CCR | On hedges and trades | Netting, collateral, limits |

**How it connects:** treasury hedges rate risk with swaps → swaps create CCR and CVA → collateral on those swaps drains liquidity → liquidity is tested by LCR and NSFR.

---

**Part 7 — Running the machine**

## 33 — Proving a model works

**A model is trusted only if it ranks borrowers well, predicts the right level of defaults, still fits today's population, and is used as intended.**

| Question | Measure | Rule of thumb |
|---|---|---|
| Does it rank good from bad? | Gini = 2 × AUC − 1 | Retail application 40–60%; behavioural 60–80% |
| Where does it separate best? | KS: widest gap between the bad and good score curves | 30–60 |
| Are PD levels right? | Binomial test: observed against expected defaults per grade | z beyond about 2 means the PD is wrong |
| Has the population changed? | PSI | Below 0.10 stable; 0.10–0.25 watch; above 0.25 act |
| Do underwriters trust it? | Override rate | Below about 5–10% |

$$
z = \frac{D - N \times \text{PD}}{\sqrt{N \times \text{PD} \times (1 - \text{PD})}}
$$

**Read it as:** D defaults seen in a grade of N borrowers, compared with the N × PD expected, measured in units of normal random wobble.

### Worked example — is the PD right for this grade?

Grade B has N = 1,000 borrowers with a PD of 2%. The model expects 1,000 × 2% = 20 defaults. The year shows D = 30.

$$
z = \frac{30 - 20}{\sqrt{1{,}000 \times 0.02 \times 0.98}} = \frac{10}{4.43} = 2.26
$$

**Read it as:** 30 defaults is 2.26 "wobbles" above what the model promised; beyond about 2, it is unlikely to be bad luck. The PD for grade B looks too low and needs recalibration.

| Word | Meaning |
|---|---|
| Discrimination | Ranking: do bad borrowers get worse scores than good ones? Measured by Gini, AUC and KS |
| Calibration | Level: does a 2% PD grade really default about 2% of the time? Measured by the binomial test |
| Stability | Does today's population look like the one the model was built on? Measured by PSI |
| Validation | An independent team's check of all three before and after the model goes live |

## 34 — Watching the portfolio

**A handful of ratios tell management how much of the book is bad, how much of that is already provided for, and where trouble is building next.**

| Metric | Formula | Tells you |
|---|---|---|
| GNPA ratio | Gross NPAs ÷ gross advances | How much of the book is bad |
| NNPA ratio | (Gross NPAs − NPA provisions) ÷ (gross advances − NPA provisions) | Bad book not yet covered by provisions |
| PCR | NPA provisions ÷ gross NPAs | Share of the bad book already provided |
| Credit cost | Year's provision charge ÷ average loans | The year's loss cost |
| Roll rate | Accounts moving to a worse DPD bucket ÷ accounts in the bucket | Retail trouble, months early |

| Early warning | Retail | SME | Corporate |
|---|---|---|---|
| Top signals | Bureau score drops, bounced payments | Line stuck at its limit, GST filings missed | Downgrade, covenant breach, late accounts |

### Worked example — reading the ratios

Gross advances ₹10,000 crore; gross NPAs ₹400 crore; NPA provisions ₹300 crore.

| Ratio | Working | Result |
|---|---|---|
| GNPA | 400 ÷ 10,000 | 4.0% |
| NNPA | (400 − 300) ÷ (10,000 − 300) | 1.0% |
| PCR | 300 ÷ 400 | 75% |

**Read it as:** 4% of the book is bad, but three-quarters of that is already paid for, so only about 1% is an uncovered risk to future profit.

## 35 — The data machine and the analyst's job

**Every number in this note is produced by a month-end pipeline; the analyst's job is to make sure the right data flows through the right rules, and to prove it.**

**Month-end:** source systems → staging → data-quality checks → warehouse → ECL and RWA engines → reconcile to the general ledger → reports → sign-off.

| Must know | Meaning |
|---|---|
| Six data-quality dimensions | Complete, accurate, valid, consistent, timely, unique |
| BCBS 239 | Basel's principles for risk data: accurate, complete, timely, traceable back to source |
| Reference data | Risk weights, CCFs, master scale, scenarios: one controlled source, dated, checked by a second person (maker-checker) |
| Grain | What one row means; the first question in any data requirement |

| Step of a change | Document or test |
|---|---|
| What the business needs | BRD, business requirements document |
| Exactly how the system behaves | FSD, functional specification, with rules as decision tables |
| Systems working together | SIT, system integration testing |
| Business sign-off | UAT, user acceptance testing |
| Old and new give the same answer | Parallel run |
| First live run is right | PPV, post-production validation |

**Boundary rule:** test both sides of every threshold. Under "more than 90 DPD", 90 days is performing and 91 is default.

## 36 — Reports: what gets produced

**The same numbers go three ways: to the public (Pillar 3), to the regulator (returns), and to management (MIS).**

| Pillar | Meaning |
|---|---|
| Pillar 1 | Minimum capital for credit, market, operational and CVA risk |
| Pillar 2 | Supervisory review: the bank's own ICAAP (internal capital adequacy assessment process) and ILAAP (for liquidity); the supervisor's SREP review |
| Pillar 3 | Public disclosure in standard templates: KM1 key metrics, OV1 RWA overview, and credit risk, CCR, CVA, market risk, leverage and liquidity tables |

| India: returns to the RBI, filed through CIMS | Content |
|---|---|
| Capital adequacy return | Basel III, RWA by risk type |
| Asset quality returns | NPA, provisions, restructuring |
| CRILC | Borrowers with ₹5 crore or more aggregate exposure, with SMA and default status |
| Credit information to the four credit bureaus | Fortnightly [verify] |
| LCR and NSFR returns | Liquidity ratios |
| Structural liquidity statement, interest rate sensitivity statement | ALM gaps |
| Large exposures return | Concentration |
| Form A; Form VIII | Fortnightly CRR under Section 42 of the RBI Act; SLR under the Banking Regulation Act |
| BSR, basic statistical returns | Loan-level statistics |
| Fraud reporting | Frauds |
| Pillar 3 disclosures and ICAAP | Public and supervisory |

| Region | Main reports |
|---|---|
| EU | COREP, common reporting on capital: own funds, credit SA and IRB, CCR, CVA, market risk, operational risk, large exposures, leverage, LCR, NSFR. FINREP, financial reporting on an IFRS basis, including IFRS 9 stages and non-performing and forborne exposures. AnaCredit, loan-level credit data to the ECB. EBA stress test templates |
| UK | PRA returns on COREP-style templates; Bank of England stress tests |
| US | Call reports (FFIEC forms); FR Y-9C for holding companies; FR Y-14 for stress test data (CCAR and DFAST); FR 2052a for liquidity |

| Internal MIS, run monthly | Content |
|---|---|
| Portfolio dashboard | Exposure, DPD buckets, NPA, PCR, credit cost |
| ECL movement | Opening, new loans, stage transfers, repayments, write-offs, model and scenario changes, closing |
| Stage migration matrix | Loans moving between stages |
| RWA walk | What drove RWA up or down |
| Capital and leverage | Ratios against risk appetite limits |
| CCR limits | Use against PFE limits, plus collateral and dispute reports |
| CVA P&L attribution | Split into spread moves, exposure moves and hedges |
| ALCO pack | Liquidity gaps, LCR, NSFR, IRRBB, FTP |
| Early warning | Early warning list and watchlist |
| Model monitoring | Gini, PSI, backtesting, overrides |

---

**Part 8 — Holding it together**

## 37 — Distinctions worth holding

**Most confusion in credit risk comes from pairs of ideas that sound alike. Hold these apart and the rest falls into place.**

| Losses and capital | Difference |
|---|---|
| EL vs UL | Average loss vs bad-year excess; provisions vs capital |
| Provisions vs capital | A cost set aside from profit vs the owners' money at risk |
| PIT vs TTC PD | Moves with the economy vs stable over the cycle |
| IFRS 9 ECL vs Basel EL | Lifetime, point-in-time, scenarios vs 12-month, through-the-cycle, downturn |
| IFRS 9 vs CECL | Stage-based vs lifetime from day one |
| NPA vs Stage 3 | A regulatory label vs an accounting stage; close, but not identical |
| AC vs FVOCI vs FVTPL | Price moves ignored vs parked in OCI vs straight to profit |
| General vs simplified approach | Three stages vs always lifetime, for trade receivables |
| 12-month vs lifetime ECL | Stage 1 vs Stages 2 and 3; the gap is the cliff effect |
| Individual vs collective ECL | One cash-flow forecast per large defaulted loan vs pools of similar loans |

| Derivative risk | Difference |
|---|---|
| Loan credit risk vs CCR | One-way and known vs two-way and market-driven |
| Exposure vs MtM | max(MtM, 0) vs MtM; a negative value is no exposure |
| EE vs EPE vs EEPE | Average at one date vs averaged over the life vs a non-falling version for capital |
| Right-way vs wrong-way risk | Exposure rises as the counterparty gets stronger vs weaker |
| CCR default charge vs CVA charge | Loss on default vs loss on spread widening |
| CVA vs DVA | Their default risk vs your own |
| Notional vs MtM vs EAD | Reference amount vs today's value vs regulatory exposure |
| EE vs PFE | Average exposure vs high-percentile exposure |
| VM vs IM | Covers today's value vs covers the close-out move |
| Bilateral vs cleared | Exposure to each counterparty vs exposure to the CCP |
| Pre-settlement vs settlement risk | Default before settlement vs one leg failing on the day |
| General vs specific wrong-way risk | Macro correlation vs legal link |

| Books, liquidity and reporting | Difference |
|---|---|
| Retail vs SME vs corporate | Scored by pool vs a mix vs appraised one by one |
| Limit vs drawing power | The yearly ceiling vs what this month's stock and bills support |
| Fund-based vs non-fund-based | Money lent vs a promise (guarantee, letter of credit) converted by a CCF |
| Banking book vs trading book | Credit risk capital vs market risk capital; hold vs trade |
| VaR vs ES | Where the tail starts vs how deep it goes |
| Market risk vs CCR | Loss from prices moving vs loss from a counterparty failing while prices have moved in your favour |
| FTP charge vs FTP credit | What a lending business pays treasury vs what a deposit business earns from it |
| Gap vs duration | Earnings view by bucket vs value view of the whole balance sheet |
| Liquidity vs solvency | Can pay today vs worth more than it owes |
| LCR vs NSFR | 30-day stress vs one-year structure |
| Funding vs market liquidity | Raising cash vs selling assets |
| NII vs EVE | Earnings view vs value view of rate risk |
| SA vs IRB vs IMM | Regulator's numbers vs own risk parameters vs own exposure model |
| Output floor vs input floors | A floor on total RWA vs floors on PD, LGD and EAD inside models |
| Pillar 1 vs 2 vs 3 | Minimum rules vs bank and supervisor judgement vs public disclosure |
| ICAAP vs ILAAP | Capital adequacy vs liquidity adequacy |
| COREP vs FINREP | Capital view vs accounting view |

## 38 — Also worth knowing

**Topics that sit at the edge of credit risk but come up around it.**

| Topic | In short |
|---|---|
| Stress testing | Sensitivity: one factor moved. Scenario: a full macro story. Reverse stress test: start from failure and ask what causes it |
| Risk appetite framework | The board sets how much risk the bank will take; limits cascade down to desks and portfolios |
| Concentration risk | Too much to one name, sector or region; covered by large exposure limits and Pillar 2 |
| Country risk | Loss from a country's events: transfer restrictions, sovereign default |
| Securitisation | Pooling loans and selling tranches; a separate capital framework where senior tranches get low risk weights and junior tranches high ones |
| Model risk management | Model inventory, independent validation, tiering by materiality, ongoing monitoring; main guidance US SR 11-7 and UK PRA SS1/23 |
| TLAC and MREL | The largest banks hold debt that can be written down in resolution, so failure does not need a bailout |
| Recovery and resolution | Recovery plan: the bank's own playbook to survive stress. Resolution plan: the authority's playbook to wind it down safely |
| Climate risk | Physical and transition risks feeding into PD, LGD and collateral values; mostly Pillar 2 and disclosure for now |
| Ratings and the master scale | Scorecards or rating models give a score or grade; the master scale maps each grade to a PD band, so every model speaks the same PD language |
| Forbearance and restructuring | Easing terms for a borrower in difficulty; flags higher risk, often moves the loan to Stage 2 or 3, and needs probation before a cure |
| Provision vs write-off | A provision sets money aside while the loan is still on the books; a write-off removes the loan once no reasonable recovery is expected, using that provision |
| Collections | The team and process that chase overdue accounts, from reminders at early DPD to legal recovery after default |

## 39 — Key numbers to remember

**Every number in this note worth carrying in your head, with where it lives.**

| Number | What it is | Section |
|---|---|---|
| 99.9% | The 1-in-1,000 year that capital is sized for | 1 |
| 2–3× | Rise in lifetime PD that typically triggers SICR | 13 |
| 90 DPD | Default, NPA, Stage 3 | 3 |
| 30 DPD | IFRS 9 backstop for Stage 2 | 13 |
| 1–30 / 31–60 / 61–90 | SMA-0, SMA-1, SMA-2 | 3 |
| 75% | MPBF share of current assets | 7 |
| 20% | Turnover method limit | 7 |
| 25% | Common stock and receivables margin | 7 |
| 90 days | Maximum age of receivables in DP | 7 |
| 1 April 2027 | India: ECL and revised SA start | 2 |
| 4.5% / 6% / 8% | Basel minimum CET1 / Tier 1 / total | 16 |
| 5.5% / 7% / 9% | India minimum CET1 / Tier 1 / total | 16 |
| 2.5% | Conservation buffer; also the CCyB ceiling | 16 |
| 10.5% / 11.5% | Full stack: Basel / India | 16 |
| 3% / 3.5% / 4% | Leverage ratio: Basel / India / India systemically important | 16 |
| 25% of Tier 1 | Large exposure limit for one group | 16 |
| 100% / 85% / 75% / 150% | Risk weights: unrated corporate / unrated SME / regulatory retail / defaulted | 16 |
| 72.5% | Output floor | 17 |
| 0.05% | Minimum PD under Basel 3.1 | 17 |
| 10% | CCF on cancellable limits under Basel 3.1 | 17 |
| 90% / 80% / 75% | RBI home loan LTV caps: up to ₹30 lakh / ₹30–75 lakh / above | 6 |
| 40–60% | Common FOIR cap | 6 |
| 300–900 | Credit bureau score range | 6 |
| 1.25–1.5 | Comfortable DSCR | 8 |
| 20% / 50% / 100% | CCF: trade letter of credit / performance guarantee / guarantee of debt | 8 |
| 12.5 | 1 ÷ 8%: turns a capital amount into RWA | 16 |
| About 92% | IRB risk weight for PD 1%, LGD 45%, 2.5 years | 16 |
| 20% / 50% / 75% / 100% / 150% | Basel 3.1 corporate weights: AA or better / A / BBB / BB / below BB | 17 |
| 20–70% | Basel 3.1 home loan weights by LTV | 17 |
| 45% | Transactor credit card weight | 17 |
| €500 million | Revenue above which a corporate is foundation IRB only | 17 |
| 12% | Operational risk BIC for the first €1 billion of BI | 17 |
| 1.4 | SA-CCR alpha | 25 |
| 4% / 0.5% / 32% / 18% | SA-CCR supervisory factors: FX / interest rate / single equity / commodity | 25 |
| 0.65 | BA-CVA scaling factor | 25 |
| 2% | Risk weight on trade exposures to a qualifying CCP | 25 |
| €100 billion | CVA materiality threshold for non-cleared notional | 25 |
| About 60% | Typical LGD used in CVA | 24 |
| About two-thirds | Share of 2008 counterparty losses from CVA, not defaults | 24 |
| 97.5% | FRTB expected shortfall confidence | 26 |
| 10–120 days | FRTB liquidity horizons | 26 |
| 100 bp | 1% | 29 |
| 400 / 500 / 300 bp | IRRBB rupee shocks: parallel / short / long [verify] | 30 |
| 100% | LCR and NSFR minimum | 31 |
| 15% of Tier 1 | IRRBB outlier test on EVE | 30 |
| 40–60% / 60–80% | Gini: application / behavioural scorecards | 33 |
| 0.10 / 0.25 | PSI: watch / act | 33 |
| About 2 | Binomial z beyond which the PD is wrong | 33 |

## 40 — Glossary: every short form in this note

| Short form | Stands for |
|---|---|
| AC | Amortised cost |
| AFS | Available for sale (India investment category) |
| ALCO | Asset-liability committee |
| ALM | Asset-liability management |
| AMA | Advanced measurement approach (old operational risk models) |
| AT1 | Additional tier 1 capital |
| AUC | Area under the curve |
| BA-CVA | Basic approach for CVA capital |
| BCBS | Basel Committee on Banking Supervision |
| BI | Business indicator |
| BIC | Business indicator component |
| bp | Basis point, 0.01% |
| BRD | Business requirements document |
| CA | Current assets |
| CCF | Credit conversion factor |
| CCIL | Clearing Corporation of India Ltd |
| CCP | Central counterparty |
| CCR | Counterparty credit risk |
| CCyB | Countercyclical capital buffer |
| CDS | Credit default swap |
| CECL | Current expected credit loss (US) |
| CET1 | Common equity tier 1 |
| CGTMSE | Credit Guarantee Fund Trust for Micro and Small Enterprises |
| CIMS | RBI's Centralised Information Management System |
| CLS | Continuous Linked Settlement, for currency trades |
| COREP | Common reporting (EU capital returns) |
| CRILC | Central Repository of Information on Large Credits |
| CRR | Cash reserve ratio (India); Capital Requirements Regulation (EU) |
| CSA | Credit support annex |
| CVA | Credit valuation adjustment |
| D-SIB | Domestic systemically important bank |
| DCCO | Date of commencement of commercial operations |
| DF | Discount factor |
| DP | Drawing power |
| DPD | Days past due |
| DRT | Debt recovery tribunal |
| DSCR | Debt service coverage ratio |
| DVA | Debit valuation adjustment |
| EAD | Exposure at default |
| EBA | European Banking Authority |
| EBITDA | Earnings before interest, tax, depreciation and amortisation |
| ECB | European Central Bank |
| ECL | Expected credit loss |
| EE | Expected exposure |
| EEPE | Effective expected positive exposure |
| EIR | Effective interest rate |
| EL | Expected loss |
| EMI | Equated monthly instalment |
| EPE | Expected positive exposure |
| ES | Expected shortfall |
| EVE | Economic value of equity |
| FALLCR | Facility to avail liquidity for LCR |
| FINREP | Financial reporting (EU accounting returns) |
| FOIR | Fixed obligations to income ratio |
| FRTB | Fundamental Review of the Trading Book |
| FSD | Functional specification document |
| FTP | Funds transfer pricing |
| FVA | Funding valuation adjustment |
| FVOCI | Fair value through other comprehensive income |
| FVTPL | Fair value through profit or loss |
| G-sec | Government security |
| G-SIB | Global systemically important bank |
| GNPA | Gross non-performing assets |
| HFT | Held for trading |
| HQLA | High-quality liquid assets |
| HTM | Held to maturity |
| IAS | International Accounting Standards (the older IFRS series) |
| IASB | International Accounting Standards Board |
| IBC | Insolvency and Bankruptcy Code |
| ICAAP | Internal capital adequacy assessment process |
| IFRS | International Financial Reporting Standards |
| ILAAP | Internal liquidity adequacy assessment process |
| ILM | Internal loss multiplier |
| IM | Initial margin |
| IMM | Internal model method |
| Ind AS | Indian Accounting Standards, India's version of IFRS |
| IRAC | Income recognition, asset classification and provisioning |
| IRB | Internal ratings-based approach |
| IRRBB | Interest rate risk in the banking book |
| ISDA | International Swaps and Derivatives Association |
| KM1 | Pillar 3 key metrics template |
| KS | Kolmogorov–Smirnov statistic |
| KVA | Capital valuation adjustment |
| LAP | Loan against property |
| LCR | Liquidity coverage ratio |
| LGD | Loss given default |
| LTV | Loan-to-value |
| MA | Maturity adjustment |
| MIBOR | Mumbai interbank offered rate |
| MIS | Management information system |
| MPBF | Maximum permissible bank finance |
| MPOR | Margin period of risk |
| MSME | Micro, small and medium enterprise |
| MTA | Minimum transfer amount |
| MtM | Mark-to-market |
| MVA | Margin valuation adjustment |
| NBFC | Non-banking financial company |
| NDTL | Net demand and time liabilities |
| NII | Net interest income |
| NMRF | Non-modellable risk factor |
| NNPA | Net non-performing assets |
| NPA | Non-performing asset |
| NSE | National Stock Exchange |
| NSFR | Net stable funding ratio |
| OCI | Other comprehensive income |
| OCL | Other current liabilities |
| OTC | Over the counter |
| OV1 | Pillar 3 RWA overview template |
| PCR | Provision coverage ratio |
| PD | Probability of default |
| PFE | Potential future exposure |
| PIT | Point-in-time |
| P&L | Profit and loss |
| POCI | Purchased or originated credit-impaired |
| PPV | Post-production validation |
| PRA | Prudential Regulation Authority (UK) |
| PSI | Population stability index |
| QCCP | Qualifying central counterparty |
| RBI | Reserve Bank of India |
| RC | Replacement cost |
| RSA | Rate-sensitive assets |
| RSL | Rate-sensitive liabilities |
| RWA | Risk-weighted assets |
| SA | Standardised approach |
| SA-CCR | Standardised approach for counterparty credit risk |
| SA-CVA | Standardised approach for CVA capital |
| SARFAESI | Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act |
| SICR | Significant increase in credit risk |
| SIT | System integration testing |
| SLR | Statutory liquidity ratio |
| SMA | Special mention account |
| SOFR | Secured overnight financing rate (US) |
| SONIA | Sterling overnight index average (UK) |
| SPPI | Solely payments of principal and interest |
| SREP | Supervisory review and evaluation process |
| TNW | Tangible net worth |
| TOL | Total outside liabilities |
| TTC | Through-the-cycle |
| UAT | User acceptance testing |
| UL | Unexpected loss |
| UTP | Unlikely to pay |
| VaR | Value at risk |
| VM | Variation margin |
| XVA | The family of valuation adjustments: CVA, DVA, FVA, MVA, KVA |

## 41 — The whole thing on one screen

| Idea | In one line |
|---|---|
| The split | Provisions pay for the average year; capital pays for the bad year |
| Loan risk | PD × LGD × EAD; default at 90 DPD, or earlier if unlikely to pay |
| Three borrowers | Retail by scorecard and pool; SME by drawing power and cash flow; corporate by appraisal, rating and covenants |
| IFRS 9 buckets | AC ignores price moves; FVOCI parks them in OCI; FVTPL puts them in profit |
| IFRS 9 | Stages provisions; Stage 2 brings the cliff effect |
| Basel | Sizes capital on RWA; Basel 3.1 floors banks' own models |
| Basel 3.1 | Output floor, finer SA, limits on IRB, 10% CCF, one operational risk approach, FRTB and no CVA models |
| Derivatives | Create exposure that moves with markets |
| CCR | The other side defaults while that exposure is positive; SA-CCR EAD = 1.4 × (RC + PFE) |
| CVA | Exposure × PD × LGD over time; market drives the exposure, credit drives the PD |
| CCR capital | Two charges: default, and CVA, the loss when spreads widen before any default |
| Accounting for derivatives | Fair value, so their credit risk lives in CVA, not ECL |
| The books | Banking book for credit capital; trading book for FRTB |
| Market meets credit | In derivatives the market sets how much is owed and credit sets whether it is paid |
| Treasury and FTP | Treasury is the internal bank; FTP prices money off the yield curve and moves rate risk to the centre |
| IRRBB | Repricing gaps by bucket move NII; duration mismatch moves EVE; outlier at 15% of Tier 1 |
| Liquidity chain | Treasury hedges → hedges create CCR → collateral drains liquidity → LCR and NSFR test it |
| Running it | Models are proven, portfolios watched, and data decides whether every number is right |
| Reporting | Pillar 3 publicly, returns to the regulator, MIS internally |
