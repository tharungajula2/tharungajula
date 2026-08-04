---
title: "Business and Finance from Zero"
subtitle: "Nine chapters on where money comes in, where it goes out, and what the difference is worth"
spine: "Every business is the same three questions — where money comes in, where it goes out, and what the difference is worth — and the interesting differences are in when the money moves, not whether it does."
date: 2026-08-04
slug: business-and-finance-from-zero
archetype: business
tags: [finance, accounting, unit-economics, valuation, deals, venture, lending, credit, infrastructure, asset-finance, writing]
readingTime: 240
passes: [120, 90, 30]
prerequisites: [arithmetic, percentages]
series: "From Zero"
seriesOrder: 1
status: published
---

# Business and Finance from Zero

### Nine chapters on where money comes in, where it goes out, and what the difference is worth

> Every business is the same three questions — where money comes in, where it goes out, and what the difference is worth — and the interesting differences are in when the money moves, not whether it does.

All figures use pounds (£). The arithmetic is currency-neutral: replace £ with any currency and every calculation holds.

---

## How to read this

| Pass | What you do | Time |
|---|---|---|
| 1 · Understand | Prose only. Skip every table, callout and worked example. You are after the argument, not the arithmetic. | 120 min |
| 2 · Verify | Reproduce every 🧮 WORKED calculation by hand or in a spreadsheet. If your number differs, the fault is usually a definition, not the arithmetic. | 90 min |
| 3 · Recall | §10 to §15 only — the numbers, traps, self-test, formulas, glossary. | 30 min |

Nine chapters, then six reference sections. Each chapter carries its own spine sentence and its own closing capabilities, so any chapter can be lifted out and read alone. A reader who wants benchmarks before theory can start at §10 · THE NUMBERS and work backwards.

---

## The map of the whole subject

Everything in this volume sits somewhere on this diagram. Chapters 1 to 3 build the top half. Chapters 4 to 8 rebuild the bottom half — the timing layer — for two industries where timing dominates. Chapter 9 is how to say any of it in one page.

```
                    ┌──────────────────────────────┐
                    │   Q1  WHERE MONEY COMES IN   │
                    │   price × volume, repeated   │
                    └──────────────┬───────────────┘
                                   │ revenue
                                   ▼
   ┌──────────────┐        ┌───────────────┐        ┌──────────────┐
   │ Q2 WHERE IT  │───────▶│    MARGIN     │───────▶│ Q3 WHAT THE  │
   │   GOES OUT   │ costs  │  what is left │        │  DIFFERENCE  │
   │ variable +   │        │  per unit and │        │   IS WORTH   │
   │ fixed        │        │  in total     │        │ multiple/DCF │
   └──────────────┘        └───────┬───────┘        └──────┬───────┘
                                   │                       │
                                   ▼                       ▼
                        ┌────────────────────┐   ┌───────────────────┐
                        │   TIMING LAYER     │   │  CLAIMS ON VALUE  │
                        │ when cash moves vs │   │  debt paid first, │
                        │ when profit is     │   │  equity paid last │
                        │ recorded           │   │  (the waterfall)  │
                        └─────────┬──────────┘   └───────────────────┘
                                  │ working capital, funding need
                                  ▼
                        ┌────────────────────┐
                        │    CAPITAL IN      │◀── equity, debt, retained cash
                        └────────────────────┘
```

Two structural facts follow from the diagram and are worth holding before anything else.

**Profit and cash are different quantities and can point in opposite directions for years.** Profit is a claim about a period; cash is a fact about a moment. A business can be profitable and die, and can burn cash and be extremely valuable.

**Value is a claim on future cash, and claims are ranked.** Lenders are paid before owners in every jurisdiction and every structure. Almost every financing argument in this volume is an argument about position in that queue.

---

# §1 · READING A BUSINESS

> A business is a machine that turns cash into more cash, and the three financial statements are three photographs of that machine — one of the flow, one of the stock, one of the truth.

**A business is legible once you can trace a single pound from the customer's hand to the owner's, naming every deduction it passes through and every delay it suffers.**

## 1.1 Revenue is price times volume, and nothing else

Revenue is the money customers owe you for goods or services you have actually delivered in a period. It is always price multiplied by volume, however elaborate the presentation. The skill is knowing what the unit is: a kilogram, a seat-month, a kilowatt-hour, a completed ride.

$$ \text{Revenue} = P \times Q $$

where $P$ is the price of one unit and $Q$ is the number of units delivered in the period.

Three words get used loosely and mean different things. **Bookings** is the value of contracts signed. **Revenue** is the value of what has been delivered. **Cash collected** is money actually received. A twelve-month contract worth £12,000 signed and paid up front on 1 January is £12,000 of bookings, £12,000 of cash, and £1,000 of revenue in January.

The £11,000 not yet earned sits on the balance sheet as **deferred revenue** — a liability, because you owe the customer eleven months of service. This is the first place where the difference between when money moves and when it counts becomes visible.

📘 **DEFINE — recurring revenue**

Revenue is *recurring* when it repeats without a new purchase decision by the customer: a subscription, a rental, a maintenance contract. **MRR** (monthly recurring revenue) is the sum of all subscription revenue normalised to one month. **ARR** (annual recurring revenue) is MRR × 12. These are not accounting terms and appear on no statement; they are run-rate measures, meaning they describe the current speed of the business rather than what it earned last year. Their value is that they separate the stock of committed revenue from one-off spikes. Their danger is that a business with a 40% annual cancellation rate can quote an ARR figure that will never be collected. Always ask what fraction of ARR survives twelve months.

## 1.2 Costs split two ways, and the two splits are not the same

The first split is **variable versus fixed**. A variable cost moves with volume: coffee beans, electricity sold, payment processing fees. A fixed cost does not move within the relevant range: rent, the salary of a person you employ whether you sell one unit or ten thousand.

The second split is **cost of goods sold versus operating expenses**. **COGS** is the cost of producing and delivering what you sold. **Opex** is the cost of running the business around that: sales and marketing, research and development, general and administrative.

These splits overlap but do not coincide. A cloud hosting bill that scales with usage is variable and sits in COGS. A support engineer's salary is fixed but many companies also put it in COGS. Whether a cost is above or below the gross profit line is a presentational choice within accounting rules, which is precisely why gross margins are only comparable within an industry.

⚖️ **TRADE-OFF — putting a cost in COGS or opex**

Putting delivery-side salaries in COGS lowers reported gross margin but makes the margin honest: it shows what is truly left after serving a customer. Putting them in opex raises headline gross margin and flatters comparison against software peers, at the cost of hiding a real per-customer expense. The cost of the flattering choice is paid later, when the business scales and the "fixed" delivery team turns out to grow linearly with customers. The check is mechanical: if the cost rises when you add one more customer, it belongs in COGS regardless of where it is reported.

## 1.3 The income statement, line by line

The income statement — also called the **P&L**, for profit and loss — is the flow photograph. It answers: over this period, what did we earn and what did it cost. Read it top to bottom as a series of subtractions.

| Line | What it is |
|---|---|
| Revenue | Value delivered in the period |
| − COGS | Cost of delivering it |
| **= Gross profit** | What is left to run the business with |
| − Opex (S&M, R&D, G&A) | Selling, product building, administration |
| **= EBITDA** | Operating profit before non-cash and financing items |
| − D&A | Depreciation and amortisation |
| **= EBIT** | Operating profit, also called operating income |
| − Interest | Cost of borrowed money |
| **= PBT** | Profit before tax |
| − Tax | Corporate income tax |
| **= Net income** | What the owners earned |

**S&M** is sales and marketing, **R&D** is research and development, **G&A** is general and administrative. **D&A** is depreciation and amortisation: depreciation spreads the cost of a physical asset over its useful life, amortisation does the same for an intangible one such as purchased software. **EBITDA** is earnings before interest, tax, depreciation and amortisation.

**EBITDA exists to compare the operating engine of two businesses that are financed and taxed differently.** Interest depends on how much debt the owners chose. Tax depends on jurisdiction and history. Depreciation depends on accounting policy for assets bought years ago. Strip all four out and you have something closer to a like-for-like comparison of operations.

🔴 **TRAP — EBITDA is not cash flow**

The belief: EBITDA adds back the non-cash charges, so it is what the business generates in cash. What is true: EBITDA ignores three real cash outflows. It ignores capital expenditure, so a business that must replace £200,000 of machinery every five years shows the same EBITDA as one that needs none. It ignores working capital, so a business whose receivables balloon shows unchanged EBITDA while its bank balance empties. It ignores interest and tax, which are cash payments a real owner must make. Depreciation is a non-cash charge, but it is the accounting shadow of a cash payment that already happened or will happen again. Treat EBITDA as a comparison tool, never as a cash measure.

## 1.4 The balance sheet, and the identity that governs it

The balance sheet is the stock photograph: what the business owns and owes at one instant. It obeys one identity that is true by construction.

$$ \text{Assets} = \text{Liabilities} + \text{Equity} $$

where assets are resources controlled by the business, liabilities are obligations to outsiders, and equity is the residual claim of the owners.

Read it as a sentence: everything the business has, someone has a claim on. Lenders and suppliers have the first claims — those are liabilities. Whatever is left over belongs to the owners. Equity is therefore not money in a vault; it is arithmetic left-over.

Assets divide by how fast they become cash. **Current assets** convert within twelve months: cash, inventory, and **accounts receivable**, which is money customers owe you for goods already delivered. **Non-current assets** take longer: buildings, machinery, purchased software, goodwill.

Liabilities divide the same way. **Accounts payable** is money you owe suppliers for goods already received — a free short-term loan from your supply chain. Long-term debt is borrowing repayable beyond twelve months.

## 1.5 Working capital is the money trapped inside operations

**Working capital** is current assets minus current liabilities, but for operating purposes the useful version is narrower: receivables plus inventory minus payables. It is the cash you have handed to customers and suppliers in order to trade at all.

Growth consumes working capital. Sell twice as much and you carry roughly twice the inventory and are owed roughly twice as much. That money leaves the bank before the profit arrives, which is why fast-growing profitable businesses run out of cash.

The **cash conversion cycle** measures how long a pound is trapped.

$$ \text{CCC} = \text{DSO} + \text{DIO} - \text{DPO} $$

where **DSO** (days sales outstanding) is how long customers take to pay, **DIO** (days inventory outstanding) is how long stock sits before sale, and **DPO** (days payable outstanding) is how long you take to pay suppliers. Each is a balance divided by the relevant annual flow, times 365.

$$ \text{DSO} = \frac{\text{Receivables}}{\text{Revenue}} \times 365 \qquad \text{DIO} = \frac{\text{Inventory}}{\text{COGS}} \times 365 \qquad \text{DPO} = \frac{\text{Payables}}{\text{COGS}} \times 365 $$

A positive cycle means you fund the gap. A negative cycle means customers fund you: supermarkets sell stock in three weeks and pay suppliers in eight, so growth *releases* cash rather than consuming it. That single structural fact explains more about retail expansion than any strategy document.

## 1.6 The cash flow statement reconciles the other two

The cash flow statement starts at net income and adjusts until it reaches the actual change in the bank balance. It has three blocks.

**Operating** takes net income, adds back non-cash charges such as depreciation, and subtracts the increase in working capital. **Investing** is money spent on or received from long-lived assets — **capex**, or capital expenditure, sits here. **Financing** is money raised from or returned to funders: new borrowing, loan repayments, share issues, dividends.

The three statements interlock. Net income flows into equity on the balance sheet through retained earnings. The bottom line of the cash flow statement equals the change in the cash line on the balance sheet. If they do not tie, one of the three is wrong.

🧮 **WORKED — a coffee roaster: profitable, and £42,200 poorer**

A roastery sells 40,000 kg at £18/kg. Green coffee costs £7/kg, packaging £1.20/kg, roasting labour and energy £1.80/kg. Salaries are £150,000, rent £36,000, marketing £40,000, other admin £24,000. The roaster cost £180,000 and is depreciated over ten years. There is a £120,000 loan at 8%. Tax is 25%.

| Step | Calculation | Result |
|---|---|---|
| Revenue | 40,000 × £18 | £720,000 |
| COGS | 40,000 × (7 + 1.20 + 1.80) | £400,000 |
| Gross profit | 720,000 − 400,000 | £320,000 |
| Gross margin | 320,000 ÷ 720,000 | 44.4% |
| Opex | 150 + 36 + 40 + 24 (thousands) | £250,000 |
| EBITDA | 320,000 − 250,000 | £70,000 |
| D&A | 180,000 ÷ 10 | £18,000 |
| EBIT | 70,000 − 18,000 | £52,000 |
| Interest | 120,000 × 8% | £9,600 |
| PBT | 52,000 − 9,600 | £42,400 |
| Tax | 42,400 × 25% | £10,600 |
| **Net income** | 42,400 − 10,600 | **£31,800** |

Now the cash. Over the year receivables rose from £60,000 to £90,000, inventory from £40,000 to £65,000, payables from £30,000 to £38,000. A packing machine cost £25,000 and £20,000 of loan principal was repaid.

| Step | Calculation | Result |
|---|---|---|
| Net income | from above | £31,800 |
| + D&A | non-cash add-back | £18,000 |
| − Receivables increase | 90,000 − 60,000 | −£30,000 |
| − Inventory increase | 65,000 − 40,000 | −£25,000 |
| + Payables increase | 38,000 − 30,000 | +£8,000 |
| **Operating cash flow** | 31,800 + 18,000 − 47,000 | **£2,800** |
| − Capex | packing machine | −£25,000 |
| − Debt repayment | principal | −£20,000 |
| **Change in cash** | 2,800 − 25,000 − 20,000 | **−£42,200** |

Cash conversion cycle: DSO = 90,000 ÷ 720,000 × 365 = 45.6 days. DIO = 65,000 ÷ 400,000 × 365 = 59.3 days. DPO = 38,000 ÷ 400,000 × 365 = 34.7 days. **CCC = 70.2 days.** Seventy days of trading is permanently parked in the operation, and it grows with the business.

## 1.7 Operating leverage and why margins move faster than revenue

**Operating leverage** is the ratio of fixed to variable costs. High fixed costs mean each extra unit of revenue drops mostly to profit, so margins expand violently with growth and collapse violently with decline.

Take the roastery. Contribution per kilogram is £18 − £10 = £8. Fixed costs are £250,000 of opex plus £18,000 depreciation. Sell 10% more — 44,000 kg — and gross profit rises to £352,000 while fixed costs do not move, so EBITDA rises from £70,000 to £102,000. Revenue up 10%, EBITDA up 46%.

The same arithmetic runs backwards. Sell 10% less and EBITDA falls to £38,000, down 46%. **Operating leverage is not a virtue; it is an amplifier, and it amplifies in both directions.** Chapters 6 and 7 are about businesses where this amplifier is the entire story.

✅ **CHECK — did you actually read the business?**

Answer these four in numbers, not adjectives. What is one unit, and what is the contribution margin on it? What fraction of total cost is fixed? How many days of cash are trapped in working capital? Does operating cash flow over the last twelve months exceed net income, and if not, where did the gap go? Pass condition: four numbers, each traceable to a line on a statement. If any answer is a sentence rather than a number, you have not read the business.

**You can now:**
- Walk any income statement from revenue to net income and name what each subtraction represents.
- Reconcile profit to cash, and explain a business that earns money while losing it.
- Compute a cash conversion cycle and predict whether growth will consume or release cash.

---

# §2 · DEALS

> A deal is an argument about who receives which cash flows, in which order, under which conditions — price is only the headline.

**Price is what gets announced; structure is what determines who actually got paid, and structure is negotiated after price is agreed.**

## 2.1 What is being sold

A business changes hands in one of two shapes. In a **share purchase** the buyer acquires the company itself, inheriting every asset, contract, employee, and liability including ones nobody has found yet. In an **asset purchase** the buyer takes named assets and named liabilities, leaving the rest in a shell the seller keeps.

Buyers prefer asset purchases because unknown liabilities stay behind. Sellers prefer share purchases because they exit cleanly and often pay less tax. Which shape is used is frequently the first real negotiation, and it moves value by more than a few percentage points of price.

## 2.2 Enterprise value and equity value are different numbers

This is the single most-confused pair in finance, and the confusion is expensive.

📘 **DEFINE — enterprise value and equity value**

**Enterprise value (EV)** is the value of the business as an operating entity, independent of how it is financed. It is what you would pay for the whole machine if it carried no debt and no surplus cash. **Equity value** is what the owners of the shares actually receive. They differ because debt holders have a prior claim on the business, and because cash sitting in the company belongs to the seller and can be extracted before completion. A business worth £12m as a machine, carrying £3.5m of debt and £0.4m of cash, is worth £8.9m to its shareholders. Multiples based on EBITDA or revenue produce enterprise value, because EBITDA and revenue are pre-interest and therefore belong to all funders. Multiples based on net income — such as **P/E**, price to earnings — produce equity value, because net income is after interest.

$$ \text{Equity value} = \text{EV} - \text{Debt} + \text{Cash} $$

The quantity $\text{Debt} - \text{Cash}$ is called **net debt**. Moving from enterprise to equity value is called walking the **bridge**.

## 2.3 Valuation: two methods, one idea

Everything is worth the present value of the cash it will produce. All valuation methods are approximations to that sentence, differing in how much they hide the assumptions.

**Discounted cash flow (DCF)** does it explicitly. Forecast the free cash flow for each future year, discount each back to today, and add a terminal value for everything beyond the forecast.

$$ \text{PV} = \sum_{t=1}^{n} \frac{CF_t}{(1+r)^t} + \frac{TV}{(1+r)^n} $$

where $CF_t$ is free cash flow in year $t$, $r$ is the discount rate, $n$ is the forecast horizon, and $TV$ is terminal value. The discount rate is usually the **WACC** — weighted average cost of capital, the blended annual return demanded by the company's lenders and shareholders in proportion to how much each has provided.

Terminal value is normally computed with the **perpetuity growth** formula:

$$ TV = \frac{CF_{n+1}}{r - g} $$

where $g$ is the assumed permanent growth rate, which must be below $r$ or the expression is meaningless.

**Multiples** do the same job by comparison. If similar businesses sell for six times EBITDA, this one is worth six times its EBITDA. A multiple is a compressed DCF: it silently encodes a growth rate, a risk level, and a reinvestment need.

🔍 **WHY THIS IS TRUE — a multiple is just a DCF with the arguments hidden**

Take a business whose free cash flow equals its EBITDA and grows forever at $g$, discounted at $r$. Its value is $\text{EBITDA} \div (r-g)$, so the multiple is $1/(r-g)$. At $r = 12\%$ and $g = 2\%$, that is 10.0×. At $r = 12\%$ and $g = 0\%$, it is 8.3×. At $r = 18\%$ and $g = 0\%$ — a small, risky, owner-dependent business — it is 5.6×. The observed spread between a 4× small-business multiple and a 12× mid-market multiple is not sentiment; it is arithmetic on risk and growth. This is why arguing about "the right multiple" is usually a disguised argument about durability of cash flow, and why the productive move is to convert every multiple claim back into an implied $r$ and $g$ and ask whether those are believable.

## 2.4 Structure: cash, stock, earnout, escrow

Headline price is the sum of what is promised. What matters is the timing and conditionality of each component.

**Cash at close** is certain and immediate. **Stock** transfers risk to the seller, who now owns a piece of the buyer's future. **Escrow** is cash held by a third party for a defined period, released only if no claims arise — typically 10–20% of price for 12–24 months, as a rule of thumb with wide variance. An **earnout** pays additional consideration only if the business hits agreed targets after completion.

⚖️ **TRADE-OFF — the earnout**

An earnout bridges disagreement about the future: the seller believes profits will grow, the buyer does not, so the seller is paid if right. The cost is that the seller no longer controls the business whose performance determines their payment. Buyers can, entirely legally, make decisions — investing in a new product line, absorbing central overhead, changing sales incentives — that reduce measured profit in the earnout period. Every earnout therefore requires a definition of the measured metric precise enough to survive a hostile reading, and the negotiation of that definition is often harder than the negotiation of the number.

## 2.5 The working capital adjustment

A business sold with empty shelves and unpaid customers is worth less than the same business with full shelves and collected receivables, yet both have the same EBITDA. The **working capital peg** solves this. The parties agree a normal level of working capital, and the price adjusts pound-for-pound for the difference at completion.

This mechanism is where the last few percent of a deal are usually won or lost, because setting the peg means arguing about what "normal" was over a period both sides can characterise selectively. Seasonality matters: a peg set from a December balance sheet for a business with Christmas trading will be wrong by a large multiple of the negotiating margin.

🧮 **WORKED — from EBITDA to money in the bank**

A target earns £2.0m EBITDA. Comparable transactions cleared at 6.0× EBITDA. It carries £3.5m debt and £0.4m cash. The agreed working capital peg is £1.2m; actual working capital at completion is £1.05m. Structure: £7.0m cash at close (of which £0.7m held in escrow for 18 months), £0.9m in buyer stock, £1.0m earnout if year-one EBITDA reaches £2.4m.

| Step | Calculation | Result |
|---|---|---|
| Enterprise value | 2.0 × 6.0 | £12.00m |
| Net debt | 3.5 − 0.4 | £3.10m |
| Equity value (headline) | 12.00 − 3.10 | £8.90m |
| Working capital adjustment | 1.05 − 1.20 | −£0.15m |
| **Adjusted equity value** | 8.90 − 0.15 | **£8.75m** |
| Cash at close, released immediately | 7.00 − 0.70 escrow | £6.30m |
| Held in escrow | released at month 18 | £0.70m |
| Buyer stock | value at risk | £0.90m |
| Contingent earnout | paid only if target met | £0.85m |

The final row is a plug: £8.75m less the £7.90m of cash and stock leaves £0.85m of the £1.0m earnout, the £0.15m adjustment having been taken from it. **Only £6.30m — 72% of the headline — is money the seller controls on day one.**

Run it from the buyer's side. If the earnout is never paid, total consideration is £7.90m, implying an enterprise value of £11.0m and a real multiple of 5.5× rather than 6.0×.

## 2.6 Diligence tests quality, not quantity

**Due diligence** is the buyer's verification process between agreed terms and completion. Its purpose is not to recount the profits but to test whether they will persist.

A **quality of earnings** review — usually shortened to QoE — restates reported EBITDA into a sustainable figure by removing one-off gains, adding back genuinely non-recurring costs, and correcting for owner expenses that will not continue. The output is **adjusted EBITDA**, and since price is a multiple of it, every £100,000 of disputed adjustment is worth £600,000 at a 6× multiple.

The recurring findings are predictable. **Customer concentration**: if one customer is 40% of revenue, the buyer is really buying one contract. **Churn**: revenue that must be replaced every year is worth a fraction of revenue that renews. **Owner dependence**: if the founder holds the relationships, the asset walks out at completion. **Deferred maintenance**: capex postponed to inflate EBITDA is a bill transferred to the buyer.

## 2.7 The process, and why deals die

A typical private transaction runs: initial contact, **NDA** (non-disclosure agreement), information exchange, indicative offer, **LOI** (letter of intent) or term sheet, exclusivity, diligence, contract negotiation, signing, completion.

The LOI is mostly non-binding on price but binding on two clauses: exclusivity, which stops the seller talking to others for a defined window, and confidentiality. Granting exclusivity is the moment the seller's negotiating leverage peaks and begins falling, because from then the buyer is the only bidder and every diligence finding becomes a reason to reprice.

Deals die from four causes, in rough order of frequency: diligence surprises that change the price, financing that fails to arrive, working capital or tax structuring disputes discovered late, and simple exhaustion when a process runs past nine months. **BATNA** — best alternative to a negotiated agreement — is the concept that governs all of it: your leverage is entirely a function of what happens to you if no deal occurs.

**You can now:**
- Convert an EBITDA multiple into an equity value using the net debt bridge, in both directions.
- Explain what a multiple implies about growth and risk rather than treating it as a market fact.
- Read a deal structure and say what fraction of headline price is certain, deferred, or contingent.

---

# §3 · STARTUP FINANCE

> A startup is financed by people who expect it to be worth nothing or enormous, so every mechanism in its finance is built around option value rather than average value.

**Startup finance is ordinary finance run at extreme variance, and every unusual instrument in it exists because ordinary instruments price variance badly.**

## 3.1 Why equity, and why not debt

A young company has negative cash flow, no assets worth repossessing, and a distribution of outcomes with most of its mass at zero. A lender cannot price that. Lenders earn a fixed spread, so they can survive small loss rates on many loans but cannot survive a 70% failure rate at any interest rate a borrower would accept.

Equity investors solve it differently. They accept that most investments return nothing and price the portfolio so that a small number of extreme outcomes cover everything. This is the **power law**, and it explains behaviour that otherwise looks irrational.

🔍 **WHY THIS IS TRUE — the power law makes investors indifferent to your downside**

Consider a fund making 30 investments of £1m each, targeting a 3× return on £30m. If typical outcomes were normally distributed the fund could get there with every company returning 3×. They are not. Empirically, roughly half return less than the capital invested, and the fund's entire return usually comes from one or two positions. To return £90m with one winner, that winner must return £60m to £70m on a £1m stake — a 60× to 70× outcome. An investment that can plausibly return 3× but cannot plausibly return 50× therefore contributes almost nothing to the fund, no matter how safe it is. This is why a company with reliable modest growth is often un-fundable by venture capital while a company with a wide, uncertain range of outcomes is fundable. It is not a judgement about quality. It is arithmetic about which distribution shape can carry a portfolio.

## 3.2 Pre-money, post-money, and the ownership identity

The **cap table** is the register of who owns what. Ownership is computed from two numbers.

$$ \text{Post-money} = \text{Pre-money} + \text{Investment} $$

$$ \text{Investor ownership} = \frac{\text{Investment}}{\text{Post-money}} $$

where **pre-money** is the agreed value of the company before the new cash arrives and **post-money** is its value immediately after. Raise £1.5m at a £6m pre-money and the investor owns £1.5m ÷ £7.5m = 20%.

**Dilution** is the reduction in an existing holder's percentage when new shares are issued. It is not a loss unless the price is wrong: owning 80% of £7.5m beats owning 100% of £6m. What matters is whether the capital raised increases value by more than the fraction sold.

## 3.3 The option pool shuffle

Employees are paid partly in options — the right to buy shares at a fixed price later. The reserved shares for this are the **option pool**. Investors require a pool sufficient for the next 18–24 months of hiring, typically 10–15% of the post-money company.

The pool is almost always created *before* the investment closes, out of the pre-money. This means the founders alone pay for it, and the headline pre-money valuation is not what founders actually receive per share.

🧮 **WORKED — what a £6m pre-money is really worth to founders**

Founders hold 8,000,000 shares. A seed investor puts in £1.5m at a £6m pre-money, requiring a 10% post-money option pool created from the pre-money.

| Step | Calculation | Result |
|---|---|---|
| Post-money valuation | 6.0 + 1.5 | £7.5m |
| Investor ownership | 1.5 ÷ 7.5 | 20% |
| Pool ownership | agreed | 10% |
| Founder ownership | 100 − 20 − 10 | 70% |
| Total shares after round | 8,000,000 ÷ 0.70 | 11,428,571 |
| Investor shares | 20% of total | 2,285,714 |
| Pool shares | 10% of total | 1,142,857 |
| Price per share | 1,500,000 ÷ 2,285,714 | £0.65625 |
| Value of founder shares | 8,000,000 × 0.65625 | £5.25m |
| **Effective pre-money to founders** | 5.25 vs headline 6.00 | **£5.25m** |

**The pool cost the founders £750,000 of headline valuation, or 12.5% of the stated pre-money.** A £5.5m pre-money with the pool created post-money is a better deal than a £6m pre-money with it created pre-money.

## 3.4 SAFEs and convertible notes

Early rounds often avoid setting a valuation at all. A **convertible note** is a loan that converts into shares at the next priced round instead of being repaid. A **SAFE** — simple agreement for future equity — does the same without being debt, so it carries no interest and no maturity date.

Both use two terms. The **discount** gives the early investor shares at, say, 20% below the price paid by the next round. The **valuation cap** sets a maximum valuation at which their money converts, regardless of the later round's price. The investor receives whichever term gives more shares.

🔴 **TRAP — uncapped SAFEs are not founder-friendly, they are undefined**

The belief: raising on a SAFE without a cap avoids giving away a fixed percentage, so it preserves founder ownership. What is true: it defers the calculation without removing it, and creates a stack of obligations whose size nobody has computed. Four £250,000 SAFEs at different caps and discounts, converting at a round priced eighteen months later, can consume 25–35% of the company before the new investor's money is counted. Post-money SAFEs compound the effect because each one's percentage is protected against dilution from the others, so the founders absorb all of it. The discipline is mechanical: maintain a converted cap table at all times, recomputed at every plausible next-round price. A SAFE stack you have not modelled is an unknown quantity of your company already sold.

## 3.5 Preferences and the liquidation waterfall

Investors buy **preferred shares**, which rank ahead of the **common shares** held by founders and employees when the company is sold. A **liquidation preference** guarantees the investor a minimum return before common holders receive anything.

**1× non-participating** is the standard: the investor takes the greater of their money back or their percentage of proceeds, not both. **Participating** preferred takes their money back *and* their percentage of the remainder — sometimes called double-dipping, and normal only when a company is raising from weakness.

🧮 **WORKED — the same 20% stake, three exits**

Using the cap table above: investor holds 20% (2,285,714 shares) with a 1× preference on £1.5m. Founders hold 8,000,000 shares, the pool 1,142,857 — together 9,142,857 common shares, of which founders are 87.5%.

| Exit | Investor receives | Founders receive |
|---|---|---|
| £20m, non-participating | Converts: 20% × 20 = **£4.00m** | 87.5% × 16.0 = **£14.00m** |
| £6m, non-participating | Preference: **£1.50m** | 87.5% × 4.5 = **£3.94m** |
| £6m, participating | 1.5 + 20% × 4.5 = **£2.40m** | 87.5% × 3.6 = **£3.15m** |

At the £20m exit the investor converts because 20% beats £1.5m, and preference is irrelevant. At the £6m exit the investor takes the preference, and the founders receive 65.6% of proceeds despite owning 70% of the company. Switching one word from non-participating to participating moves £790,000 — 13% of the exit — from founders to investor.

**Preferences are invisible in good outcomes and decisive in mediocre ones, which is where most outcomes land.**

## 3.6 Burn and runway

**Gross burn** is total monthly cash spending. **Net burn** is gross burn minus cash revenue. **Runway** is how long the current cash lasts.

$$ \text{Runway (months)} = \frac{\text{Cash on hand}}{\text{Net monthly burn}} $$

A company with £1.5m of cash, £120,000 monthly spend and £30,000 monthly cash revenue has a net burn of £90,000 and 16.7 months of runway.

A company is **default alive** if its existing growth trajectory reaches profitability before the cash runs out, and **default dead** otherwise. The distinction matters because it determines whether the next fundraise is a choice or a requirement, and a required fundraise is negotiated from a much weaker position.

Runway is not a smooth quantity. Hiring commitments, annual contracts, and notice periods mean the last three months of runway are largely unavailable for course correction. Fundraising itself takes three to six months, so a company with nine months of runway is already raising.

## 3.7 Unit economics: CAC, LTV, and the number that actually binds

**CAC** — customer acquisition cost — is total sales and marketing spend in a period divided by new customers acquired in that period. **LTV** — lifetime value — is the total gross profit a customer produces before leaving.

$$ \text{LTV} = \frac{\text{ARPU} \times \text{Gross margin}}{\text{Monthly churn rate}} $$

where **ARPU** is average revenue per user per month and **churn rate** is the fraction of customers lost each month. The division by churn works because the expected lifetime of a customer with constant monthly churn $c$ is $1/c$ months.

The widely quoted target is LTV ÷ CAC above 3. Treat it as a rule of thumb with a wide range, because it is sensitive to a churn estimate that early companies cannot measure. The more robust measure is **CAC payback period**: how many months of gross profit are needed to repay acquisition cost.

$$ \text{Payback (months)} = \frac{\text{CAC}}{\text{ARPU} \times \text{Gross margin}} $$

🧮 **WORKED — a subscription business that looks fine and is not**

CAC is £600. ARPU is £50/month. Gross margin is 70%. Monthly churn is 3%.

| Step | Calculation | Result |
|---|---|---|
| Monthly gross profit per customer | 50 × 0.70 | £35.00 |
| Expected lifetime | 1 ÷ 0.03 | 33.3 months |
| LTV | 35.00 × 33.3 | £1,167 |
| LTV ÷ CAC | 1,167 ÷ 600 | 1.94× |
| **CAC payback** | 600 ÷ 35 | **17.1 months** |

Both figures fail: the ratio is below 3 and payback exceeds twelve months. The consequence is a funding requirement, not merely a weak ratio. Growing by 1,000 customers a month costs £600,000 in acquisition and returns £35,000 in the first month, so faster growth means faster cash consumption, and every acceleration must be financed externally for seventeen months before it pays for itself.

Now change one input. Cut churn from 3% to 1.5% and lifetime doubles to 66.7 months, LTV becomes £2,333, and LTV ÷ CAC becomes 3.9×. Payback does not move at all — still 17.1 months. **Retention fixes the ratio; only margin or acquisition cost fixes the cash requirement.** This is why the two measures must both be quoted, and why the payback number is the one that determines how much capital the company needs.

## 3.8 Cohorts, and why blended numbers lie

A **cohort** is the group of customers acquired in one period, tracked over their whole life. Cohort analysis is the only reliable way to see whether a business is improving, because blended averages mix a large old cohort with a small new one and can hide deterioration for a year.

**Net revenue retention (NRR)** measures what happens to a cohort's revenue after a year, counting cancellations, downgrades, and upgrades. Above 100% means surviving customers expand faster than departing ones shrink, so the revenue base grows with zero new customers. This is the property that makes some subscription businesses far more valuable than others at identical growth rates, because it means growth compounds off a base that does not leak.

**You can now:**
- Compute post-money ownership, the true cost of an option pool, and the outcome of a liquidation waterfall.
- Distinguish LTV/CAC from payback period and say which one determines a funding requirement.
- Explain why venture investors behave as if downside protection is irrelevant.

---
