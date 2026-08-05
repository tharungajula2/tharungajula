---
title: "Business and Finance from Zero"
subtitle: "Nine chapters on where money comes in, where it goes out, and what the difference is worth"
spine: "Every business is the same three questions — where money comes in, where it goes out, and what the difference is worth — and the interesting differences are in when the money moves, not whether it does."
date: 2026-08-04
order: 2
slug: business-and-finance-from-zero
archetype: business
tags: [finance, accounting, unit-economics, cost-of-capital, business-models, competition, capital-structure, credit, valuation, writing]
readingTime: 260
passes: [130, 95, 35]
prerequisites: [arithmetic, percentages]
series: "From Zero"
seriesOrder: 1
status: published
---

# Business and Finance from Zero

### Nine chapters on where money comes in, where it goes out, and what the difference is worth

> Every business is the same three questions — where money comes in, where it goes out, and what the difference is worth — and the interesting differences are in when the money moves, not whether it does.

All figures use pounds (£). The arithmetic is currency-neutral: substitute any currency and every calculation holds unchanged.

---

## How to read this

| Pass | What you do | Time |
|---|---|---|
| 1 · Understand | Prose only. Skip every table, callout and worked example. You are after the argument, not the arithmetic. | 130 min |
| 2 · Verify | Reproduce every 🧮 WORKED calculation by hand or in a spreadsheet. If your number differs, the fault is almost always a definition, not the arithmetic. | 95 min |
| 3 · Recall | §10 to §15 only — the numbers, traps, self-test, formulas, glossary. | 35 min |

Nine chapters, then six reference sections. Each chapter carries its own spine sentence and its own closing capabilities, so any chapter can be lifted out and read alone. A reader who wants benchmarks before theory can start at §10 · THE NUMBERS and work backwards into the chapters.

---

## The map of the whole subject

Everything in this volume sits somewhere on this diagram. Chapters 1 and 2 build the top half. Chapter 3 builds the exchange rate between today and later. Chapters 4 to 7 are the timing layer, rebuilt for the model types where timing dominates. Chapter 8 prices the result. Chapter 9 is how to say any of it in one page.

```
                    ┌──────────────────────────────┐
                    │   Q1  WHERE MONEY COMES IN   │
                    │   price × volume, repeated   │
                    │            §1 §2 §4          │
                    └──────────────┬───────────────┘
                                   │ revenue
                                   ▼
   ┌──────────────┐        ┌───────────────┐        ┌──────────────┐
   │ Q2 WHERE IT  │───────▶│    MARGIN     │───────▶│ Q3 WHAT THE  │
   │   GOES OUT   │ costs  │  what is left │        │  DIFFERENCE  │
   │ variable +   │        │  per unit and │        │   IS WORTH   │
   │ fixed  §1 §2 │        │  in total  §2 │        │   §3 §5 §8   │
   └──────────────┘        └───────┬───────┘        └──────┬───────┘
                                   │                       │
                                   ▼                       ▼
                        ┌────────────────────┐   ┌───────────────────┐
                        │   TIMING LAYER     │   │  CLAIMS ON VALUE  │
                        │ when cash moves vs │   │  debt paid first, │
                        │ when profit is     │   │  equity paid last │
                        │ recorded  §1 §4 §7 │   │      §6 §7        │
                        └─────────┬──────────┘   └───────────────────┘
                                  │ working capital, funding need
                                  ▼
                        ┌────────────────────┐
                        │    CAPITAL IN      │◀── equity, debt, retained cash
                        │        §6          │       §3 sets its price
                        └────────────────────┘
```

Three structural facts follow from the diagram. Hold them before anything else, because the rest of the volume is elaboration on them.

**Profit and cash are different quantities and can point in opposite directions for years.** Profit is a claim about a period. Cash is a fact about a moment. A business can be profitable and die, and can burn cash and be extremely valuable.

**Value is a claim on future cash, and claims are ranked.** Lenders are paid before owners in every jurisdiction and every structure. Almost every financing argument in this volume is an argument about position in that queue.

**Nothing is worth anything until you fix a discount rate.** The same cash flows are worth twice as much at 6% as at 14%. Chapter 3 exists because that number is an opinion, not a market fact, and most disagreements about value are really disagreements about it.

---

# §1 · READING A BUSINESS

> A business is a machine that turns cash into more cash, and the three financial statements are three photographs of that machine — one of the flow, one of the stock, one of the truth.

**A business is legible once you can trace a single pound from the customer's hand to the owner's, naming every deduction it passes through and every delay it suffers.**

## 1.1 Revenue is price times volume, and nothing else

Revenue is the money customers owe you for goods or services you have actually delivered in a period. It is always price multiplied by volume, however elaborate the presentation. The skill is knowing what the unit is: a kilogram, a seat on a flight, a customer-month, a kilowatt-hour.

$$ \text{Revenue} = P \times Q $$

where $P$ is the price of one unit and $Q$ is the number of units delivered in the period.

Three words get used loosely and mean different things. **Bookings** is the value of contracts signed. **Revenue** is the value of what has been delivered. **Cash collected** is money actually received. A twelve-month contract worth £12,000 signed and paid up front on 1 January is £12,000 of bookings, £12,000 of cash, and £1,000 of revenue in January.

The £11,000 not yet earned sits on the balance sheet as **deferred revenue** — a liability, because you owe the customer eleven months of service. This is the first place where the difference between when money moves and when it counts becomes visible, and it is the whole subject of this volume in miniature.

📘 **DEFINE — recurring revenue**

Revenue is *recurring* when it repeats without a new purchase decision by the customer: a subscription, a rental, a maintenance contract. **MRR** (monthly recurring revenue) is the sum of all subscription revenue normalised to one month. **ARR** (annual recurring revenue) is MRR × 12. Neither is an accounting term and neither appears on any statement; they are run-rate measures, describing the current speed of the business rather than what it earned last year. Their value is that they separate the stock of committed revenue from one-off spikes. Their danger is that a business losing 40% of customers a year can quote an ARR figure that will never be collected. Always ask what fraction of ARR survives twelve months — Chapter 2 gives you the tool.

## 1.2 Costs split two ways, and the two splits are not the same

The first split is **variable versus fixed**. A variable cost moves with volume: raw materials, payment processing fees, electricity sold on. A fixed cost does not move within the relevant range: rent, the salary of someone you employ whether you sell one unit or ten thousand.

The second split is **cost of goods sold versus operating expenses**. **COGS** is the cost of producing and delivering what you sold. **Opex** is the cost of running the business around that: sales and marketing, research and development, general and administrative.

These splits overlap but do not coincide, and confusing them is the most common source of nonsense in business analysis. A cloud hosting bill that scales with usage is variable and sits in COGS. A support engineer's salary is fixed but most companies also put it in COGS. Whether a cost lands above or below the gross profit line is a presentational choice within accounting rules, which is exactly why gross margins are only comparable within an industry.

The test for where a cost truly belongs is mechanical rather than conventional: if the cost rises when you serve one more customer, it is a cost of serving customers, wherever it is reported. Companies that classify delivery-side salaries as opex report a flattering gross margin and discover later that their "fixed" delivery team grows in step with the customer base. The flattery is free at the time and expensive at scale.

## 1.3 The income statement, line by line

The income statement — also called the **P&L**, for profit and loss — is the flow photograph. It answers a single question: over this period, what did we earn and what did it cost. Read it top to bottom as a series of subtractions.

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

EBITDA exists to compare the operating engine of two businesses that are financed and taxed differently. Interest depends on how much debt the owners chose to take. Tax depends on jurisdiction and history. Depreciation depends on accounting policy for assets bought years ago. Strip all four out and what remains is closer to a like-for-like comparison of operations.

🔴 **TRAP — EBITDA is not cash flow**

The belief: EBITDA adds back the non-cash charges, so it is what the business generates in cash. What is true: EBITDA ignores three real cash outflows. It ignores capital expenditure, so a business that must replace £200,000 of machinery every five years reports the same EBITDA as one that needs no machinery at all. It ignores working capital, so a business whose receivables balloon shows unchanged EBITDA while its bank balance empties. It ignores interest and tax, which are cash payments a real owner must actually make. Depreciation is genuinely non-cash, but it is the accounting shadow of a cash payment that has already happened or will happen again. Treat EBITDA as a comparison tool and never as a cash measure.

## 1.4 The balance sheet, and the identity that governs it

The balance sheet is the stock photograph: what the business owns and owes at one instant. It obeys one identity, true by construction.

$$ \text{Assets} = \text{Liabilities} + \text{Equity} $$

where assets are resources controlled by the business, liabilities are obligations to outsiders, and equity is the residual claim of the owners.

Read it as a sentence: everything the business has, someone has a claim on. Lenders and suppliers hold the first claims — those are liabilities. Whatever remains belongs to the owners. Equity is therefore not money in a vault; it is arithmetic left over, and it can be negative.

Assets divide by how quickly they become cash. **Current assets** convert within twelve months: cash, inventory, and **accounts receivable**, which is money customers owe for goods already delivered. **Non-current assets** take longer: buildings, machinery, purchased software, goodwill.

Liabilities divide the same way. **Accounts payable** is money owed to suppliers for goods already received — in effect a free short-term loan from your supply chain. Long-term debt is borrowing repayable beyond twelve months.

## 1.5 Working capital is the money trapped inside operations

**Working capital** is current assets minus current liabilities, but for operating purposes the useful version is narrower: receivables plus inventory minus payables. It is the cash you have handed to customers and suppliers in order to trade at all.

Growth consumes working capital. Sell twice as much and you carry roughly twice the inventory and are owed roughly twice as much. That money leaves the bank before the profit arrives, which is the mechanism by which fast-growing profitable businesses run out of cash.

The **cash conversion cycle** measures how long a pound stays trapped.

$$ \text{CCC} = \text{DSO} + \text{DIO} - \text{DPO} $$

where **DSO** (days sales outstanding) is how long customers take to pay, **DIO** (days inventory outstanding) is how long stock sits before sale, and **DPO** (days payable outstanding) is how long you take to pay suppliers. Each is a balance divided by the relevant annual flow, times 365.

$$ \text{DSO} = \frac{\text{Receivables}}{\text{Revenue}} \times 365 \qquad \text{DIO} = \frac{\text{Inventory}}{\text{COGS}} \times 365 \qquad \text{DPO} = \frac{\text{Payables}}{\text{COGS}} \times 365 $$

A positive cycle means you fund the gap. A negative cycle means your customers and suppliers fund you.

The clearest case is a supermarket. It sells fresh stock in under three weeks, collects instantly by card, and pays suppliers on 45- to 60-day terms. Its cycle is roughly −25 to −40 days, so opening a new store *releases* cash rather than consuming it. That single structural fact explains more about grocery expansion, and about why grocers can run on 2% net margins, than any strategy document.

## 1.6 The cash flow statement reconciles the other two

The cash flow statement begins at net income and adjusts until it reaches the actual change in the bank balance. It has three blocks.

**Operating** takes net income, adds back non-cash charges such as depreciation, and subtracts the increase in working capital. **Investing** is money spent on or received from long-lived assets — **capex**, or capital expenditure, sits here. **Financing** is money raised from or returned to funders: new borrowing, loan repayments, share issues, dividends.

The three statements interlock. Net income flows into equity on the balance sheet through retained earnings. The bottom line of the cash flow statement equals the change in the cash line on the balance sheet. If they do not tie, one of the three is wrong.

🧮 **WORKED — a manufacturer: profitable, and £42,200 poorer**

A coffee roastery sells 40,000 kg at £18/kg. Green coffee costs £7/kg, packaging £1.20/kg, roasting labour and energy £1.80/kg. Salaries are £150,000, rent £36,000, marketing £40,000, other admin £24,000. The roaster cost £180,000 and is depreciated over ten years. There is a £120,000 loan at 8%. Tax is 25%.

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

Cash conversion cycle: DSO = 90,000 ÷ 720,000 × 365 = 45.6 days. DIO = 65,000 ÷ 400,000 × 365 = 59.3 days. DPO = 38,000 ÷ 400,000 × 365 = 34.7 days. **CCC = 70.2 days.**

Seventy days of trading is permanently parked inside the operation, and it grows with the business. Put the supermarket's −30 days next to this manufacturer's +70 and you have a 100-day swing in funding requirement between two businesses that could report identical margins.

## 1.7 Four ratios that do most of the work

Ratios exist to make businesses of different sizes comparable. Four carry most of the load, and each answers a distinct question.

**Gross margin** is gross profit ÷ revenue: how much is left after serving a customer. **EBITDA margin** is EBITDA ÷ revenue: how much survives the cost of running the company. **Current ratio** is current assets ÷ current liabilities: whether short-term obligations are covered, with anything below 1.0 a signal to look harder. **Interest cover** is EBIT ÷ interest: how many times over the profits pay the lenders, with below 2.0 conventionally uncomfortable and below 1.0 a solvency event in progress.

None of these is meaningful in isolation. A 2% net margin is catastrophic for software and normal for grocery. Every ratio needs a comparison — the same business last year, or a competitor with the same model — and a ratio quoted without one is decoration.

**You can now:**
- Walk any income statement from revenue to net income and name what each subtraction represents.
- Reconcile profit to cash, and explain a business that earns money while losing it.
- Compute a cash conversion cycle and predict whether growth will consume or release cash.

---

# §2 · UNIT ECONOMICS

> Every business becomes tractable the moment you identify the unit it actually sells, because everything above the unit is arithmetic and everything below it is judgement.

**Choose the unit, subtract its variable cost, count the fixed costs it must cover, and you have described the entire business in three numbers.**

## 2.1 Choosing the unit

The unit is the smallest repeated transaction the business does. It must be countable, repeatable, and the thing that costs attach to. Get it wrong and every subsequent number is wrong.

| Business | The unit |
|---|---|
| Airline | One seat on one flight |
| Subscription software | One customer-month |
| Supermarket | One basket, or one square foot per week |
| Self-storage | One square foot per month |
| Law firm | One billable hour |
| Lender | One loan, over its full life |
| Marketplace | One completed transaction |

Two tests distinguish a real unit from a convenient one. Does the number of units directly determine revenue? Does serving one more unit create an identifiable cost? A software company that counts "logins" fails both, because logins neither bill nor cost anything. The same company counting customer-months passes both.

## 2.2 Contribution margin is the only margin that decides anything

**Contribution margin** is price minus variable cost — what one unit contributes toward fixed costs and profit.

$$ \text{CM} = P - VC \qquad \text{CM ratio} = \frac{P - VC}{P} $$

where $P$ is price per unit and $VC$ is variable cost per unit.

Gross margin and contribution margin are often close but are not the same thing. Gross margin follows an accounting convention about which costs sit above the line. Contribution margin follows a causal question: what actually changes if volume changes. When the two diverge, contribution margin is the one that predicts behaviour.

Once contribution margin is known, breakeven follows immediately.

$$ Q_{BE} = \frac{FC}{P - VC} $$

where $FC$ is total fixed cost for the period and $Q_{BE}$ is the volume at which profit is zero. Everything above $Q_{BE}$ arrives at the contribution margin rate, which is why the last 10% of volume is worth several times the first 10%.

## 2.3 Operating leverage amplifies in both directions

**Operating leverage** is the ratio of fixed to variable costs. High fixed costs mean each extra unit drops mostly to profit, so margins expand violently with growth and collapse violently with decline. The formal measure is the **degree of operating leverage**.

$$ \text{DOL} = \frac{\text{Total contribution}}{\text{EBIT}} $$

A DOL of 8 means a 1% change in volume produces an 8% change in operating profit. It is not a virtue and not a flaw. It is an amplifier, and it amplifies losses with exactly the same efficiency it amplifies gains.

🧮 **WORKED — one flight, and why seven points of load factor decide everything**

A 180-seat aircraft flies a route. The cost of operating that flight regardless of how many people board — crew, fuel for the airframe, landing fees, aircraft ownership — is £12,000. The cost caused by one additional passenger — incremental fuel for their weight, catering, baggage handling, booking fee — is £12. The average fare is £95.

| Step | Calculation | Result |
|---|---|---|
| Contribution per passenger | 95 − 12 | £83 |
| Fixed cost of the flight | given | £12,000 |
| Breakeven passengers | 12,000 ÷ 83 | 144.6 → 145 |
| **Breakeven load factor** | 145 ÷ 180 | **80.6%** |
| At 85% load (153 pax) | 153 × 83 − 12,000 | **+£699** |
| At 78% load (140 pax) | 140 × 83 − 12,000 | **−£380** |

Seven percentage points of load factor swing the flight from a £380 loss to a £699 profit — a £1,079 change on unchanged costs and unchanged fares.

Now the leverage figure. At 85% load, total contribution is £12,699 and EBIT is £699, so DOL = 12,699 ÷ 699 = **18.2**. One percent more passengers produces eighteen percent more profit. This is why airline earnings are volatile in a way that has nothing to do with management quality, and why load factor is the number the industry reports before it reports anything else.

🔍 **WHY THIS IS TRUE — the marginal passenger justifies prices that look insane**

Once the flight is committed, the £12,000 is spent whether the seat is filled or empty. The only relevant cost of one more passenger is £12. A seat sold at £40 the night before departure therefore contributes £28 of pure profit, and refusing it to "protect the fare structure" destroys £28. This is the logic of every last-minute discount, standby fare and off-peak price you have ever seen, and it generalises to any business with perishable capacity: an empty hotel room, an idle machine hour, an unbooked consultant week. **Capacity that expires unsold has a salvage value of zero, so any price above marginal cost beats no sale.** The constraint is not cost but cannibalisation — the discount must not be available to someone who would otherwise have paid £95, which is why cheap fares come wrapped in restrictions that full-fare travellers will not accept. Yield management is not pricing cleverness; it is the industrial-scale defence of a contribution margin against its own discounts.

## 2.4 Capacity businesses: utilisation is the master variable

When the unit is a slot of capacity rather than a physical good, breakeven volume becomes a **breakeven utilisation rate** — the fraction of available capacity that must be sold to cover fixed costs.

$$ U_{BE} = \frac{FC}{(P - VC) \times \text{Capacity}} $$

where capacity is the total number of units available in the period.

This one formula governs self-storage, hotels, gyms, car parks, data centres, cinemas, machine shops, cloud kitchens and charging networks. In every case the operator has bought capacity in advance and sells it in slices, and in every case the difference between a good business and a bankrupt one is a utilisation rate that a casual observer cannot see.

Consider self-storage. A facility with 50,000 lettable square feet, rent of £14 per square foot per year, variable cost near £1 (a little electricity, some cleaning), and fixed costs of £420,000 breaks even at 420,000 ÷ (13 × 50,000) = 64.6% occupancy. Run it at 90% and operating profit is £165,000. Run it at 60% and it loses £30,000. Nothing about the building, the staff or the marketing has changed.

📘 **DEFINE — perishable capacity**

Capacity is *perishable* when an unsold unit cannot be stored and resold later. Last night's empty hotel room, yesterday's idle machine hour and an unfilled seat on a departed flight are permanently gone. Perishability changes pricing behaviour in three ways. It pushes prices toward marginal cost as the expiry moment approaches, since something beats nothing. It makes demand forecasting economically critical rather than merely useful, because capacity decisions are made months or years before the demand appears. And it rewards any mechanism that converts uncertain future demand into contracted demand — season tickets, annual memberships, take-or-pay contracts, long leases — because contracted demand converts a utilisation gamble into a known quantity. This is why capacity businesses that can lock in an anchor customer are financed on completely different terms from ones selling to passing trade.

## 2.5 Scale economics: which costs actually fall

"Economies of scale" is used loosely enough to be useless. Precision requires naming the mechanism, because only four exist and each has a limit.

**Fixed cost absorption** spreads unchanging costs over more units — the airline's £12,000, the software company's engineering team. It is the most powerful and the most commonly available. **Purchasing power** buys inputs cheaper in volume; it is real but typically worth single-digit percentages, and it exhausts once you are a large customer. **Learning curve** reduces unit cost as cumulative output rises, historically strong in manufacturing and negligible in most service work. **Density** reduces cost per unit within a geography — delivery routes, service engineers, retail catchments — and is the mechanism behind most logistics economics.

Against these sit **diseconomies**: coordination overhead, management layers, and the fact that any cost proportional to headcount which is itself proportional to customers never falls at all. A law firm doubling its clients must roughly double its lawyers, so it has almost no scale economics on the unit — its leverage comes from a different place, which is the ratio of junior to senior staff on each matter.

The practical question is never "does this business have economies of scale" but "which of the four, and where does it stop." A business whose only mechanism is purchasing power has a shallow advantage. One with fixed cost absorption on a large engineering base and density in delivery has a deep one.

## 2.6 The customer as a unit: CAC, retention and payback

For businesses that buy customers rather than transactions, the unit is the customer relationship and the same arithmetic applies over a longer horizon.

**CAC** — customer acquisition cost — is total sales and marketing spend in a period divided by new customers acquired in that period. **LTV** — lifetime value — is the total gross profit a customer produces before leaving.

$$ \text{LTV} = \frac{\text{ARPU} \times \text{Gross margin}}{c} \qquad \text{Payback (months)} = \frac{\text{CAC}}{\text{ARPU} \times \text{Gross margin}} $$

where **ARPU** is average revenue per user per month and $c$ is the monthly churn rate — the fraction of customers lost each month. Dividing by $c$ works because the expected lifetime of a customer facing constant monthly churn $c$ is $1/c$ months.

The widely quoted target is LTV ÷ CAC above 3. Treat it as a rule of thumb with a wide range, since it depends entirely on a churn estimate that young businesses cannot measure and mature ones measure differently by segment.

🧮 **WORKED — the ratio passes and the business still needs money**

CAC is £600. ARPU is £50 per month. Gross margin is 70%. Monthly churn is 3%.

| Step | Calculation | Result |
|---|---|---|
| Monthly gross profit per customer | 50 × 0.70 | £35.00 |
| Expected lifetime | 1 ÷ 0.03 | 33.3 months |
| LTV | 35.00 × 33.3 | £1,167 |
| LTV ÷ CAC | 1,167 ÷ 600 | 1.94× |
| **CAC payback** | 600 ÷ 35 | **17.1 months** |

Now cut churn from 3% to 1.5%. Lifetime doubles to 66.7 months, LTV rises to £2,333, and LTV ÷ CAC becomes 3.9× — comfortably past the conventional threshold. Payback does not move at all. It is still 17.1 months.

**Retention fixes the ratio; only higher margin or lower acquisition cost fixes the cash requirement.** The two numbers answer different questions. LTV ÷ CAC asks whether a customer is worth buying. Payback asks how long the money is gone. A business growing by 1,000 customers a month at these figures spends £600,000 to acquire them and recovers £35,000 in the first month, so every acceleration in growth must be externally financed for seventeen months before it funds itself. That is a balance sheet problem, not a marketing one.

## 2.7 Cohorts, and why blended averages lie

A **cohort** is the group of customers acquired in one period, tracked over their entire life. Cohort analysis is the only reliable way to see whether a business is improving, because a blended average mixes a large old cohort with a small new one and can conceal deterioration for a year or more.

**Net revenue retention (NRR)** measures what happens to one cohort's revenue after twelve months, counting cancellations, downgrades and upgrades together. Above 100% means surviving customers expand faster than departing ones shrink, so the revenue base grows even with zero new customers.

That property is worth more than an equivalent amount of growth bought through acquisition, because it compounds off a base that does not leak and it costs almost nothing to obtain. Two businesses growing 40% a year, one at 80% NRR and one at 120%, are not the same business and will not be worth the same multiple. Chapter 5 explains why, and Chapter 8 prices it.

**You can now:**
- Identify the true unit of any business and compute its contribution margin and breakeven volume.
- Calculate breakeven utilisation for a capacity business and explain why occupancy dominates its economics.
- Distinguish LTV/CAC from payback period and say which one determines a funding requirement.

---

# §3 · TIME, RISK AND THE COST OF CAPITAL

> A pound today and a pound next year are different goods, and nearly every disagreement in finance is a disagreement about the exchange rate between them.

**The discount rate converts future money into present money, and because it is chosen rather than observed, it is the assumption that carries the most weight and receives the least scrutiny.**

## 3.1 Compounding, and the shape it produces

Money invested at a rate grows on the growth. That is compounding, and it is the reason financial intuition built on straight lines fails.

$$ FV = PV \times (1+r)^n $$

where $FV$ is future value, $PV$ is present value, $r$ is the rate per period, and $n$ is the number of periods.

The **rule of 72** approximates the doubling time: divide 72 by the percentage rate. At 8%, money doubles in nine years. At 12%, six years. At 3%, twenty-four years. The approximation holds well between about 4% and 15% and degrades outside that range.

The consequence worth internalising is that small differences in rate produce enormous differences in outcome over long horizons. Over thirty years, 7% turns £100 into £761 while 10% turns it into £1,745. A three-point difference more than doubles the result, which is why fee differences of one percent matter and why the discount rate argument in a valuation is never a detail.

## 3.2 Discounting is compounding run backwards

If money grows at $r$, then money arriving later is worth less today. Rearranging the compounding formula gives the present value of a single future amount.

$$ PV = \frac{FV}{(1+r)^n} $$

At a 10% discount rate, £100 arriving in five years is worth £62.09 today. At 15%, £49.72. The same future pound has lost a fifth of its present value because the rate moved five points.

Two shortcuts collapse repeated cash flows into one calculation. A **perpetuity** pays a constant amount forever and is worth $CF/r$. A **growing perpetuity** pays an amount growing at $g$ forever and is worth $CF/(r-g)$, valid only when $g < r$. An **annuity** pays a constant amount for a fixed number of periods.

$$ PV_{\text{annuity}} = CF \times \frac{1 - (1+r)^{-n}}{r} $$

The fraction is the **annuity factor**: the present value of £1 received each period for $n$ periods. At 10% for eight years it is 5.335, meaning eight annual payments of £1 are worth £5.34 today, not £8.

## 3.3 NPV is the decision rule; everything else is a diagnostic

**Net present value** is the present value of all future cash flows minus the investment required today.

$$ NPV = \sum_{t=1}^{n} \frac{CF_t}{(1+r)^t} - I_0 $$

where $CF_t$ is the net cash flow in period $t$, $r$ is the discount rate, and $I_0$ is the initial investment.

The rule is: invest if NPV is positive. A positive NPV means the project returns more than the rate you could have earned elsewhere at comparable risk, so it creates value. This is the only investment criterion that is correct in general, and every alternative is a simplification that fails in identifiable circumstances.

**IRR** — internal rate of return — is the discount rate at which NPV equals zero. It answers "what return does this project earn," which is a natural question, and it is comparable across projects of different sizes, which is convenient. It has three failure modes: it implicitly assumes intermediate cash flows are reinvested at the IRR itself, which is usually false; it can produce multiple answers or none when cash flows change sign more than once; and it is blind to scale, ranking a £1,000 project at 40% above a £1m project at 20% when the second creates vastly more value.

**Payback period** is how long until cumulative cash flow turns positive. It ignores everything after payback and ignores the time value of money entirely, so it is theoretically indefensible. It survives because it is robust: it answers "how long is my money at risk," it requires no discount rate, and it is hard to manipulate. Use it alongside NPV, never instead of it.

🧮 **WORKED — one machine, four measures, one decision**

A machine costs £120,000 installed, lasts eight years, and produces net cash of £26,000 a year. The company's hurdle rate is 10%.

| Step | Calculation | Result |
|---|---|---|
| Annuity factor, 8 yr @ 10% | (1 − 1.10⁻⁸) ÷ 0.10 | 5.3349 |
| PV of cash flows | 26,000 × 5.3349 | £138,708 |
| **NPV** | 138,708 − 120,000 | **£18,708** |
| Payback period | 120,000 ÷ 26,000 | 4.6 years |
| Required annuity factor for IRR | 120,000 ÷ 26,000 | 4.6154 |
| Factor at 14% | (1 − 1.14⁻⁸) ÷ 0.14 | 4.6389 |
| Factor at 15% | (1 − 1.15⁻⁸) ÷ 0.15 | 4.4873 |
| **IRR** (interpolated) | 14% + (4.6389−4.6154)/(4.6389−4.4873) | **≈ 14.2%** |

The project clears the hurdle: NPV is positive, IRR of 14.2% exceeds 10%, and the money is at risk for 4.6 of the asset's 8 years.

Now change one input. Raise the hurdle rate to 15% — a plausible move if borrowing costs rise or the project is judged riskier — and the annuity factor falls to 4.4873, giving a present value of £116,670 and an **NPV of −£3,330**. The identical machine producing identical cash is now a value-destroying investment. **Nothing about the project changed; only the price of time did.**

## 3.4 Where the discount rate comes from

The discount rate is the return available elsewhere at the same risk. It is built from two pieces.

$$ r = r_f + \text{risk premium} $$

where $r_f$ is the **risk-free rate** — the return on government debt of the same currency and maturity — and the risk premium compensates for the possibility that the cash flows do not arrive.

For a company, the rate is the blended cost of its funding, called **WACC**, the weighted average cost of capital.

$$ WACC = \frac{E}{D+E} \times r_e + \frac{D}{D+E} \times r_d \times (1 - t) $$

where $E$ is the market value of equity, $D$ is the market value of debt, $r_e$ is the cost of equity, $r_d$ is the pre-tax cost of debt, and $t$ is the corporate tax rate.

The cost of debt is observable: it is the interest rate lenders charge. The cost of equity is not observable and must be estimated, most commonly with the **capital asset pricing model (CAPM)**: $r_e = r_f + \beta \times (\text{market risk premium})$, where **beta** measures how much the company's returns move relative to the overall market. Every input here is contested, and reasonable analysts produce costs of equity two or three points apart for the same business.

The $(1-t)$ term appears because interest is deductible against taxable profit while dividends are not, so borrowing carries a tax subsidy. A company borrowing at 7% with a 25% tax rate bears an effective cost of 5.25%.

🧮 **WORKED — building a hurdle rate from its parts**

A company is funded 60% by equity and 40% by debt. Its lenders charge 7%. The risk-free rate is 4%, the market risk premium is 5%, and its beta is 1.2. Tax is 25%.

| Step | Calculation | Result |
|---|---|---|
| Cost of equity (CAPM) | 4% + 1.2 × 5% | 10.0% |
| After-tax cost of debt | 7% × (1 − 0.25) | 5.25% |
| Equity component | 0.60 × 10.0% | 6.00% |
| Debt component | 0.40 × 5.25% | 2.10% |
| **WACC** | 6.00 + 2.10 | **8.10%** |

Now raise beta from 1.2 to 1.6 — the same company judged more cyclical. Cost of equity becomes 12.0%, and WACC becomes 9.30%. Applied to the machine above, that single judgement about cyclicality moves NPV from £22,700 to £22,000-ish territory; applied to a thirty-year infrastructure asset, it moves value by 15% or more. **The further out the cash flows, the more the entire answer rests on an estimate nobody can verify.**

🔴 **TRAP — a lower discount rate does not make a project better**

The belief: since the discount rate is chosen, a project that fails at 12% can be justified by using 9%. What is true: the discount rate represents the return genuinely available elsewhere at that risk level, so lowering it does not improve the project — it changes the comparison to a worse alternative. If capital really is available at 9% for risk of this kind, the project passes and always did. If it is not, the low rate merely means the analysis has stopped measuring anything. The correct response to a marginal NPV is never to revisit the rate; it is to state the rate at which the decision flips and ask whether capital at that price actually exists. That number — the IRR — is the honest output of the exercise, and it is why IRR survives despite its flaws.

## 3.5 Risk, uncertainty, and expected value

**Expected value** is the probability-weighted average of outcomes: multiply each outcome by its probability and sum. It is the correct basis for a decision repeated many times, and a poor guide for a decision made once with ruinous downside.

$$ EV = \sum_i p_i \times x_i $$

where $p_i$ is the probability of outcome $i$ and $x_i$ is its value.

The distinction that matters in practice is between **risk**, where the distribution of outcomes is known or estimable, and **uncertainty**, where it is not. A lender pricing 100,000 credit cards faces risk and can price it with some confidence. A company entering a market that does not yet exist faces uncertainty, and a probability-weighted model of it is arithmetic dressed as knowledge.

Asymmetry matters more than average. An investment with a positive expected value but a 20% chance of destroying the company is not a good investment for a company that cannot survive that outcome, because there is no second draw. This is why survival constraints override expected-value logic, and why the sequence of outcomes matters as much as their average.

## 3.6 Real and nominal, and the error of mixing them

A **nominal** rate or cash flow includes inflation; a **real** one excludes it. The two must never be mixed. Discount nominal cash flows at a nominal rate, real cash flows at a real rate.

The relationship is multiplicative, not additive:

$$ (1 + r_{\text{nominal}}) = (1 + r_{\text{real}}) \times (1 + i) $$

where $i$ is the inflation rate. At 3% real and 4% inflation, the nominal rate is 7.12%, not 7.00%.

The common error is to forecast cash flows in today's prices — which is natural, because today's prices are what you know — and then discount at a nominal rate that includes inflation. This systematically understates value, and over a twenty-year horizon at 4% inflation it understates it by more than half.

► **IN ONE LINE**

Every valuation is a statement about two things, the size of future cash flows and the rate at which future money is converted to present money, and the second is an assumption rather than a measurement.

**You can now:**
- Compute present value, NPV, IRR and payback for any stream of cash flows, and say which one to trust when they disagree.
- Build a WACC from its components and explain why each input is contestable.
- Identify when a valuation disagreement is really a disagreement about the discount rate.

---
