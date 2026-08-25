# 02 — SME Credit Risk — End-to-End Master Note

> **Mental model:** SME credit risk is not just “will the business repay?” It is **business cash flow + owner behaviour + facility structure + collateral + banking conduct + industry risk**, all tied together.
>
> **Core question:** *Can this business generate enough sustainable cash, through good and bad periods, to meet every obligation to the bank — and if it cannot, how much will the bank lose?*

---

## 1. Where SME Credit Risk Sits

SME = **Small and Medium Enterprise**.

But there is **no single universal SME definition** used by every bank.

Banks may segment using combinations of:

- annual turnover / revenue
- total assets
- total borrowing / exposure
- number of employees
- legal structure
- product complexity
- whether credit is assessed mainly by a **scorecard** or by an **analyst / internal rating**

### The practical spectrum

| Segment | Typical credit style | What dominates |
|---|---|---|
| Micro business / very small SME | Retail-like | bureau, bank transactions, owner profile, automated score |
| Small SME | Hybrid | score + financials + owner + bank conduct |
| Mid-sized SME | Corporate-like | financial analysis, internal rating, covenants, relationship assessment |
| Large corporate | Corporate credit | full obligor/facility rating, sector analysis, group exposure, structured approval |

**Key idea:** SME is a **continuum**, not one homogeneous portfolio.

A £100k working-capital line to a local wholesaler and a £5m multi-facility package to a manufacturing company can both be called “SME” internally, while being underwritten very differently.

> **Do not confuse:**
> - **business segmentation** — how the bank commercially classifies a customer
> - **regulatory exposure class** — how the exposure is treated for capital rules
>
> These are related but not automatically identical.

---

## 2. Why SME Credit Is Different

Retail lending usually has:

- many borrowers
- smaller balances
- standardized products
- rich behavioural data
- automated decisioning

Corporate lending usually has:

- fewer borrowers
- larger exposures
- audited financials
- formal management structures
- bespoke facilities
- detailed credit committees

SME sits **between the two**.

### SME difficulty = information asymmetry

The bank often knows less than it would like to know.

Typical problems:

- unaudited or delayed financial statements
- personal and business money mixed together
- owner withdrawals not reflected cleanly in expenses
- related-party transactions
- informal loans from directors / family
- seasonal revenue
- concentrated customers or suppliers
- weak management information
- collateral values that change faster than accounts
- tax accounts optimized for tax rather than credit analysis

So the bank cannot simply ask:

> “What did last year’s profit say?”

It has to ask:

> “What is the **true sustainable cash-generating capacity** of this business?”

---

# 3. The SME Credit Unit: More Than One Borrower

SME credit rarely consists of one clean legal entity.

The bank may need to assess:

```text
Owner / promoter
      ↓
Operating company
      ↓
Subsidiaries / sister companies
      ↓
Facility or facilities
      ↓
Guarantors
      ↓
Collateral / security
```

### Key entities

**Obligor / borrower**  
The legal entity that owes the bank money.

**Facility**  
The specific credit agreement: term loan, overdraft, revolving line, trade line, etc.

**Guarantor**  
A person or company that promises to repay if the borrower does not.

**Connected parties / group**  
Other businesses or owners whose financial health is economically linked to the borrower.

**Beneficial owner**  
The natural person who ultimately owns or controls the business.

### Why group thinking matters

Example:

```text
ABC Manufacturing Ltd     → borrower
ABC Properties Ltd        → owns the factory
Owner: Ravi               → personal guarantor
ABC Trading Ltd           → largest customer, same owner
```

If the bank assesses only **ABC Manufacturing Ltd**, it may miss that:

- the factory is owned by another group company
- rent payments may be related-party cash leakage
- the customer concentration is partly artificial
- the whole group depends on the same owner

**Real credit risk = economic group, not just legal borrower.**

---

# 4. SME Products — Match the Facility to the Business Need

A good credit decision is not only **approve / decline**.

It is also:

> **What type of facility should the bank provide, for how much, for how long, and with what controls?**

## 4.1 Term Loan

Purpose:

- machinery
- expansion
- property
- acquisition
- long-lived investment

Repayment:

- scheduled instalments
- principal reduces over time

Credit logic:

> Long-term asset → long-term funding → repayment from future operating cash flow.

---

## 4.2 Overdraft / Working-Capital Line

Purpose:

- temporary cash gaps
- inventory build-up
- receivables funding

Usually revolving.

The borrower can draw, repay, and draw again up to a limit.

Main risk:

> A “temporary” working-capital need becomes permanently borrowed money.

Red flag:

```text
Approved OD limit = £500k
Balance stays near £490k for 12 months
```

This is not behaving like short-term working capital anymore.

---

## 4.3 Revolving Credit Facility — RCF

Committed facility that can be repeatedly drawn and repaid.

Important credit concept:

```text
Current drawn balance ≠ maximum potential exposure
```

The undrawn amount matters because the borrower may draw more when financial stress begins.

This becomes important for **EAD — Exposure at Default**.

---

## 4.4 Asset Finance / Equipment Finance

Loan or lease linked to a specific asset.

Examples:

- trucks
- plant
- machinery
- equipment

Credit decision depends on both:

```text
borrower cash flow
+
asset resale / recovery value
```

---

## 4.5 Invoice / Receivables Finance

Funding provided against customer invoices.

Example:

```text
Eligible receivables = £1,000,000
Advance rate = 80%
Potential funding = £800,000
```

Main risks:

- fake invoices
- customer disputes
- aged receivables
- customer concentration
- dilution / credit notes
- borrower collecting cash outside controlled account

---

## 4.6 Trade Finance

Examples:

- letters of credit
- bank guarantees
- import finance
- export finance

These may start as **contingent / off-balance-sheet exposures**.

The bank may not have paid cash yet, but it has made a promise that can become a real exposure.

---

# 5. The End-to-End SME Credit Lifecycle

```text
1. Prospect / application
        ↓
2. KYC + business verification
        ↓
3. Data collection
        ↓
4. Financial spreading
        ↓
5. Business + industry assessment
        ↓
6. Risk score / internal rating
        ↓
7. Cash-flow and repayment analysis
        ↓
8. Facility structuring
        ↓
9. Collateral / guarantee assessment
        ↓
10. Credit proposal
        ↓
11. Approval / credit committee
        ↓
12. Documentation + security perfection
        ↓
13. Drawdown
        ↓
14. Ongoing monitoring
        ↓
15. Annual / periodic review
        ↓
16. Early warning / watchlist
        ↓
17. Restructure / collections / workout if stressed
        ↓
18. Default / recovery / closure
```

Everything downstream depends on the quality of what entered upstream.

---

# 6. What the Bank Collects Before Underwriting

## 6.1 Business Information

- legal name
- registration details
- ownership
- beneficial owners
- business activity
- years in operation
- operating locations
- products / services
- customers
- suppliers
- employees
- management team
- related companies

---

## 6.2 Facility Information

- requested amount
- purpose
- tenor
- repayment profile
- existing facilities
- security offered
- guarantees
- projected utilization

---

## 6.3 Financial Information

Typical inputs:

- income statement / P&L
- balance sheet
- cash-flow statement if available
- management accounts
- tax filings
- bank statements
- aged receivables
- aged payables
- inventory records
- debt schedule
- financial projections

---

## 6.4 Behavioural / External Information

Depending on country and portfolio:

- commercial credit bureau
- owner / director bureau
- payment history
- bank-account conduct
- returned payments
- overdraft excesses
- legal filings
- tax arrears
- court judgments
- adverse news
- sector indicators

---

# 7. The Core SME Credit Question: Source of Repayment

Before ratios, ratings or collateral, ask:

> **Where exactly will the repayment money come from?**

Possible sources:

1. normal operating cash flow
2. sale of inventory / collection of receivables
3. sale of an asset
4. refinancing
5. owner capital injection
6. guarantor support
7. collateral realization after failure

### Primary vs secondary source

**Primary source of repayment**  
Normal business cash flow.

**Secondary source of repayment**  
Collateral, guarantee, asset sale, recovery.

A strong credit should normally work because of **primary repayment capacity**.

Collateral is protection if the plan fails.

> **Bad underwriting:** “The property covers the loan, so repayment capacity does not matter.”
>
> **Good underwriting:** “Operating cash flow services the debt; the property reduces loss if default occurs.”

---

# 8. SME Credit Assessment — The 5 Cs in Real Bank Form

The traditional 5 Cs are useful only when translated into actual analysis.

| C | What it really means |
|---|---|
| Character | owner / management quality, integrity, payment behaviour |
| Capacity | ability to generate cash and service debt |
| Capital | owner’s financial stake and balance-sheet strength |
| Collateral | recovery value available if default occurs |
| Conditions | industry, economy, competition, purpose, cycle |

## The order matters

```text
Character
   ↓
Business quality
   ↓
Cash-flow capacity
   ↓
Capital structure
   ↓
Facility structure
   ↓
Collateral / recovery
```

Collateral should not rescue a fundamentally unserviceable loan.

---

# 9. Financial Statements — What Each One Tells the Credit Analyst

## 9.1 Income Statement / P&L

Shows performance **over a period**.

```text
Revenue
− Cost of goods sold
= Gross profit
− Operating expenses
= EBITDA / operating profit
− Interest
− Depreciation / tax etc.
= Net profit
```

Credit question:

> Is the business economically profitable enough to support debt?

---

## 9.2 Balance Sheet

Shows financial position **at one point in time**.

```text
Assets = Liabilities + Equity
```

Credit questions:

- how much debt exists?
- how liquid are the assets?
- how much capital has the owner invested?
- is working capital healthy?
- is the business over-leveraged?

---

## 9.3 Cash Flow

Profit does not repay loans.

**Cash repays loans.**

A company can report profit and still fail because cash is trapped in:

- receivables
- inventory
- capital expenditure
- owner withdrawals

Example:

```text
Reported profit       £300k
Increase in debtors  -£500k
Increase in stock    -£150k
Cash result           negative
```

Profitable on paper, cash-stressed in reality.

---

# 10. Financial Spreading — Turning Accounts into Credit Data

**Financial spreading** = taking financial statements and converting them into standardized bank-defined fields.

Example source accounts:

```text
Turnover                    £4.2m
Cost of sales              £2.8m
Administrative expenses    £0.9m
Interest expense           £0.1m
```

Bank spread:

```text
Revenue                     £4.2m
COGS                        £2.8m
Gross Profit                £1.4m
Operating Expenses          £0.9m
EBITDA                      ~£0.5m
Interest                    £0.1m
```

Why banks spread accounts:

- consistent definitions
- ratio calculation
- historical comparison
- peer comparison
- model input
- rating input
- covenant testing

### Normalization matters

Owner-managed businesses often contain non-recurring or discretionary items.

Example:

```text
Reported EBITDA                       £400k
+ one-off legal cost                  £100k
+ excessive owner salary adjustment   £50k
-------------------------------------------
Normalized EBITDA                     £550k
```

But every adjustment must be justified.

> **Trap:** aggressive “add-backs” can manufacture repayment capacity that does not really exist.

---

# 11. Core SME Ratios — Learn the Question Behind the Formula

## 11.1 Revenue Growth

```text
Revenue Growth % = (Current Revenue − Prior Revenue) / Prior Revenue
```

Example:

```text
Prior year revenue = £4.0m
Current revenue    = £4.8m
Growth             = 20%
```

Question:

> Is growth healthy, sustainable, and funded properly?

Fast growth can increase risk because more cash gets trapped in stock and receivables.

---

## 11.2 Gross Margin

```text
Gross Margin = Gross Profit / Revenue
```

Example:

```text
Revenue       £5.0m
Gross Profit  £1.5m
Gross Margin  30%
```

Watch the **trend**, not only the level.

```text
Year 1  35%
Year 2  33%
Year 3  29%
```

Possible meaning:

- rising input costs
- pricing pressure
- weak product mix
- poor cost control

---

## 11.3 EBITDA Margin

```text
EBITDA Margin = EBITDA / Revenue
```

Useful because it approximates operating earnings before financing and non-cash depreciation effects.

But:

> EBITDA is **not cash flow**.

It ignores:

- working-capital movements
- tax
- capital expenditure
- debt principal repayment

---

# 12. Leverage — How Much Debt Is the Business Carrying?

## 12.1 Debt / EBITDA

```text
Debt / EBITDA = Total Debt / EBITDA
```

Example:

```text
Debt     £1.5m
EBITDA   £0.5m
Debt / EBITDA = 3.0x
```

Interpretation:

> Roughly how many years of current EBITDA equal the debt balance?

Higher leverage = less room for earnings deterioration.

But acceptable leverage depends on:

- sector
- business stability
- collateral
- growth
- cyclicality
- debt structure

There is no universal “3x is always good / 5x always bad” rule.

---

# 13. Debt Service — Can It Actually Pay the Bank?

## 13.1 Interest Coverage Ratio — ICR

```text
Interest Coverage = EBITDA / Interest Expense
```

Example:

```text
EBITDA     £500k
Interest   £100k
ICR        5.0x
```

Meaning:

> Operating earnings cover interest five times.

Limitation:

It ignores principal repayment.

---

## 13.2 Debt Service Coverage Ratio — DSCR

A common simplified form:

```text
DSCR = Cash Available for Debt Service / Total Debt Service
```

where debt service includes:

```text
interest + scheduled principal repayment
```

Example:

```text
Cash available for debt service   £360k
Interest                          £80k
Principal repayment               £160k
Total debt service                £240k

DSCR = £360k / £240k = 1.50x
```

Interpretation:

```text
DSCR > 1.0x  → enough cash under the assumptions
DSCR = 1.0x  → no cushion
DSCR < 1.0x  → shortfall
```

A bank normally wants **headroom**, not mathematical break-even.

---

# 14. Liquidity Ratios — Can the Business Survive the Next Few Months?

## 14.1 Current Ratio

```text
Current Ratio = Current Assets / Current Liabilities
```

Example:

```text
Current assets       £1.2m
Current liabilities  £0.8m
Current ratio         1.5x
```

But not all current assets are equally liquid.

Inventory may be slow or obsolete.

---

## 14.2 Quick Ratio

```text
Quick Ratio = (Cash + Receivables + other liquid current assets) / Current Liabilities
```

Inventory is excluded.

Useful for businesses where inventory cannot be converted to cash quickly.

---

# 15. Working Capital — The SME Credit Heartbeat

Many SMEs fail because **working capital consumes cash**.

Core cycle:

```text
Cash
 ↓
Inventory
 ↓
Sale
 ↓
Receivable
 ↓
Cash collected
```

The longer this cycle takes, the more financing the business needs.

---

## 15.1 Receivable Days

```text
Receivable Days ≈ Trade Receivables / Revenue × 365
```

Example:

```text
Receivables   £900k
Revenue       £5.0m
Days          ≈ 66 days
```

If contractual customer terms are 30 days but actual days are 66:

- customers may be paying late
- disputes may exist
- collection controls may be weak

---

## 15.2 Inventory Days

```text
Inventory Days ≈ Inventory / Cost of Sales × 365
```

Rising inventory days may mean:

- slowing demand
- over-purchasing
- obsolete stock
- deliberate build-up before peak season

Context decides which.

---

## 15.3 Payable Days

```text
Payable Days ≈ Trade Payables / Cost of Sales × 365
```

Increasing payable days can temporarily support cash.

But it may also mean:

> The business is financing itself by paying suppliers late.

---

## 15.4 Cash Conversion Cycle — CCC

```text
CCC = Receivable Days + Inventory Days − Payable Days
```

Example:

```text
Receivable days  60
Inventory days   50
Payable days     40
CCC              70 days
```

Meaning:

> Cash is tied up for roughly 70 days between paying suppliers and collecting customers.

### Why growth can create a borrowing need

Suppose annual revenue grows:

```text
£5m → £7m
```

If the same 70-day cycle remains, the company now needs more cash tied up in working capital.

So:

> **Growth can increase credit risk even when profits are rising.**

---

# 16. Bank Statement Analysis — Reality Check Against the Accounts

For smaller SMEs, transaction data may be more current than annual financial statements.

Useful bank-account signals:

- monthly credits / turnover
- seasonality
- average balance
- overdraft utilization
- days over limit
- returned payments
- direct-debit failures
- tax payments
- payroll consistency
- large transfers to owners
- unusual cash withdrawals
- payments to other lenders

### Example

Accounts say:

```text
Annual revenue = £2.4m
Expected monthly credits ≈ £200k
```

Observed bank inflows:

```text
Jan £205k
Feb £198k
Mar £210k
Apr £125k
May £118k
Jun £110k
```

The annual accounts may still look healthy, but the bank can see current deterioration.

This is why behavioural monitoring is powerful in SME lending.

---

# 17. Owner / Promoter Risk

In many SMEs:

```text
Business risk ≈ owner risk
```

The owner may control:

- sales relationships
- suppliers
- finances
- hiring
- pricing
- strategic decisions

### Questions

- How long has management run the business?
- Is the business dependent on one individual?
- Is there succession planning?
- Are owner withdrawals excessive?
- Has the owner injected capital during stress?
- Is personal credit behaviour poor?
- Are there related-party transactions?

### Key-man risk

If one person leaves and the business collapses, the business has **key-man dependency**.

That can materially affect credit quality even if current numbers look good.

---

# 18. Industry / Sector Risk

A strong company can still be hurt by a weak industry.

Examples of sector-specific risks:

### Construction

- project delays
- cost overruns
- retention receivables
- contract concentration

### Hospitality

- high fixed costs
- seasonality
- discretionary consumer demand

### Manufacturing

- inventory
- energy costs
- plant utilization
- capital expenditure

### Wholesale / distribution

- thin margins
- working-capital intensity
- customer concentration

### Technology / services

- lower hard collateral
- key-person risk
- contract / customer concentration

Credit analysis therefore combines:

```text
borrower risk
+
sector risk
+
facility structure
```

---

# 19. Customer and Supplier Concentration

Example:

```text
Largest customer = 45% of sales
```

The company may look profitable, but losing one customer could destroy repayment capacity.

Important concentrations:

- top customer
- top 5 customers
- single supplier
- single geographic market
- one product line
- one key contract

### Credit question

> What happens to cash flow if the biggest dependency fails?

This is often more useful than looking at historical profit alone.

---

# 20. Risk Score vs Internal Rating

SME banks may use several risk measures simultaneously.

## Scorecard

Typically more automated.

Inputs may include:

- bureau data
- financial ratios
- owner data
- transaction behaviour
- sector
- account conduct

Output:

```text
Score = 713
or
Risk band = B
```

---

## Internal Rating

More common as exposure size and complexity increase.

Example:

```text
Grade 1   strongest
...
Grade 7   weaker
...
Grade 10  default / near default
```

The grade may map to a PD.

Example:

```text
Internal grade 6
→ one-year PD = 2.1%
```

**Important:** rating grade is the governed credit classification; PD is the probability attached to the grade or model output.

---

# 21. PD in SME Credit

**PD — Probability of Default**

```text
PD = probability that borrower defaults over a defined horizon
```

SME PD drivers may include:

- financial ratios
- payment behaviour
- age of business
- owner characteristics
- sector
- delinquency
- utilization
- account conduct
- external bureau

### SME-specific reality

A micro-SME PD may be produced largely by a statistical scorecard.

A larger SME PD may come from:

```text
quantitative financial score
+
qualitative business assessment
+
analyst judgement / override
```

---

# 22. LGD in SME Credit

**LGD — Loss Given Default**

```text
LGD = proportion of EAD that the bank ultimately loses after recovery
```

Simplified intuition:

```text
LGD ≈ 1 − net recovery rate
```

Main SME LGD drivers:

- secured vs unsecured
- collateral type
- collateral value
- seniority
- guarantee quality
- legal enforceability
- recovery costs
- time to recovery
- economic conditions

### Example

```text
EAD at default            £500k
Net cash recovered        £300k
Loss                      £200k
LGD                       40%
```

---

# 23. EAD in SME Credit

**EAD — Exposure at Default**

For a fully drawn term loan:

```text
EAD ≈ outstanding balance at default
```

For revolving facilities:

```text
EAD = drawn amount + expected additional draw before default
```

A simplified representation:

```text
EAD = Drawn + CCF × Undrawn
```

where:

**CCF — Credit Conversion Factor**  
Percentage of undrawn commitment assumed to become exposure before default.

### Example

```text
Facility limit       £1.0m
Currently drawn      £600k
Undrawn              £400k
CCF                   50%

EAD = £600k + 50% × £400k
    = £800k
```

Why this matters:

> Troubled SMEs often draw available liquidity before default.

---

# 24. Expected Loss

Core credit equation:

```text
Expected Loss = PD × LGD × EAD
```

Example:

```text
PD    = 3%
LGD   = 40%
EAD   = £800k

EL = 0.03 × 0.40 × £800,000
   = £9,600
```

Interpretation:

> Across many similar exposures, this is the average expected credit loss over the stated horizon under the stated parameter definitions.

Do not confuse this simple one-horizon EL equation with the full accounting methodology used for IFRS 9 lifetime expected credit loss.

---

# 25. Facility Structuring — Risk Can Be Changed Without Declining the Borrower

Suppose the business asks for:

```text
£1m unsecured 7-year loan
```

The bank may decide the borrower is acceptable, but the requested structure is too risky.

Possible restructuring:

```text
Amount               £750k
Tenor                 5 years
Security              machinery + property charge
Amortization          monthly
Covenant              DSCR ≥ agreed level
Review                annual
Personal guarantee    partial
```

Credit underwriting is therefore:

```text
borrower risk
+
facility risk
+
recovery risk
```

---

# 26. Collateral and Security

Collateral does two things:

1. improves recovery if default occurs
2. may influence borrower behaviour because the owner has something at risk

Typical SME collateral:

- commercial property
- residential property
- machinery
- vehicles
- inventory
- receivables
- cash deposits

## Loan-to-Value — LTV

Simplified:

```text
LTV = Loan / Collateral Value
```

Example:

```text
Loan               £600k
Property value     £1.0m
LTV                 60%
```

But credit analysis should use **recoverable value**, not blindly the headline market valuation.

Potential deductions:

- forced-sale discount
- legal costs
- prior-ranking debt
- valuation uncertainty
- time to sell

---

# 27. Security Perfection — “We Have Collateral” Is Not Enough

A credit may be approved based on collateral, but the bank must legally create and register its rights correctly.

This is commonly called **security perfection**.

Examples:

- charge registered
- mortgage completed
- guarantee signed
- lien recorded
- original documentation held
- insurance noted where required

If security is not perfected:

> The bank may discover during default that the collateral protection it assumed does not legally exist or ranks behind another lender.

This is why **conditions precedent** matter before drawdown.

---

# 28. Guarantees

A guarantee transfers some repayment responsibility to another party.

Types:

- owner / personal guarantee
- parent-company guarantee
- cross-company guarantee
- government-backed guarantee scheme

Credit questions:

1. Is the guarantee legally enforceable?
2. Does the guarantor actually have financial capacity?
3. Is the guarantor already supporting many other obligations?

A guarantee from someone with no assets may have little recovery value.

---

# 29. Credit Proposal / Credit Memo

The credit proposal should answer the decision question quickly.

Typical structure:

```text
1. Borrower / group
2. Facility request
3. Purpose
4. Business model
5. Management / owners
6. Industry
7. Historical financials
8. Forecast financials
9. Cash-flow / debt-service capacity
10. Existing debt
11. Account conduct
12. Rating / PD
13. Collateral / guarantees
14. Key risks
15. Mitigants
16. Covenants
17. Recommendation
```

### Strong credit writing

Not:

> Revenue increased 12% and EBITDA was £600k.

But:

> Revenue grew 12%, driven mainly by one new customer now representing 32% of sales; EBITDA improved to £600k, but cash conversion weakened because receivable days rose from 48 to 71.

Numbers become useful only when connected to **credit meaning**.

---

# 30. Approval Authority

Not every loan is approved by the same person.

Typical hierarchy:

```text
small exposure
→ automated / junior authority

larger exposure
→ senior credit officer

large / complex / exception
→ credit committee
```

Approval limits may depend on:

- exposure amount
- risk grade
- collateral
- policy exception
- sector
- concentration

A proposal can be:

- approved
- approved with conditions
- declined
- deferred for more information

---

# 31. Covenants — Early Control Before Default

A covenant is a contractual condition the borrower must maintain.

Examples:

```text
Debt / EBITDA ≤ 3.5x
DSCR ≥ 1.25x
Minimum tangible net worth ≥ £1m
No additional debt without consent
```

### Why covenants matter

The bank does not want to discover deterioration only when payments stop.

A covenant breach creates an earlier intervention point.

Possible actions:

- waiver
- tighter monitoring
- reduced limit
- additional security
- repricing
- restructure

A covenant breach is **not automatically default**, unless the contract / policy says it is and required conditions are met.

---

# 32. Ongoing Monitoring

Credit approval is the start of the risk, not the end.

Monitoring normally looks at:

### Behaviour

- missed payments
- excesses
- overdraft utilization
- returned payments
- falling account turnover

### Financials

- revenue decline
- margin compression
- leverage increase
- negative cash flow
- working-capital deterioration

### External

- legal action
- tax arrears
- adverse bureau
- industry downturn
- ownership change

### Relationship

- delayed financial statements
- management avoiding contact
- unexpected funding requests
- broken promises

---

# 33. Early Warning Indicators — EWI / EWS

Examples:

```text
Account turnover down 30%
Overdraft > 95% utilized for 60 days
Customer concentration rises above policy threshold
Receivable days jump from 50 to 85
Covenant breached
Tax arrears identified
Owner injects emergency cash
Rating downgraded two grades
```

The important thing is not one signal.

It is the **pattern**.

Example:

```text
Revenue ↓
Receivable days ↑
Overdraft utilization ↑
Supplier payments delayed
```

Together these tell a stronger story:

> The company is losing operating cash and increasingly depending on bank liquidity.

---

# 34. Watchlist

A watchlist is a controlled population of borrowers requiring elevated monitoring.

Reasons may include:

- financial deterioration
- covenant breach
- management issue
- sector stress
- restructuring discussion
- significant arrears

Watchlist does not necessarily mean default.

Think:

```text
Normal monitoring
      ↓
Early warning
      ↓
Watchlist / heightened monitoring
      ↓
Restructure / workout
      ↓
Default / recovery
```

---

# 35. Annual / Periodic Credit Review

The bank periodically reassesses whether the original credit decision still holds.

Review typically includes:

- updated financials
- new rating
- account behaviour
- covenant compliance
- collateral revaluation
- industry outlook
- limits
- facility need
- repayment performance

Possible outcomes:

```text
renew unchanged
increase
reduce
restructure
reprice
add security
exit relationship
```

---

# 36. Stress Testing at Borrower Level

A good underwriting decision should survive plausible downside scenarios.

Base case:

```text
Revenue      £6.0m
EBITDA       £900k
DSCR         1.60x
```

Stress:

```text
Revenue      -15%
Margin       -2 percentage points
Interest     +200 bps
```

Recalculate:

```text
EBITDA       £520k
Debt service £450k
DSCR         1.16x
```

Credit question:

> Is 1.16x enough, given business volatility and collateral?

Stress testing exposes how much **headroom** really exists.

---

# 37. Restructuring

When the original repayment schedule becomes unrealistic, the bank may restructure rather than immediately enforce.

Possible actions:

- extend maturity
- temporarily reduce payments
- interest-only period
- consolidate facilities
- inject owner equity
- sell assets
- add collateral
- tighten covenants

Important distinction:

> Restructuring can protect value, but it can also postpone recognition of a fundamentally weak exposure.

The bank therefore needs clear governance around forbearance and credit deterioration.

---

# 38. Default and Recovery

Default is the point where the exposure meets the bank’s governed default criteria.

After default, focus changes from:

```text
Can normal cash flow repay us?
```

to:

```text
How much can we recover, through which route, and how quickly?
```

Recovery sources:

- business cash collections
- negotiated settlement
- guarantor payment
- collateral sale
- insolvency proceeds
- legal enforcement

Recovery analysis directly informs **LGD**.

---

# 39. Portfolio Risk — One Good Loan Is Not Enough

A bank can underwrite every loan reasonably and still build a dangerous portfolio.

Example:

```text
25% construction
20% hospitality
18% commercial property
```

If one macro shock hits all three, losses become correlated.

Portfolio monitoring therefore looks at:

- sector concentration
- geography
- product
- rating distribution
- arrears
- vintage
- collateral type
- customer size
- top exposures
- connected counterparties

---

# 40. SME vs Retail vs Corporate — The Clean Comparison

| Dimension | Retail | SME | Corporate |
|---|---|---|---|
| Borrower | individual / household | business + often owner | company / group |
| Data | bureau + behaviour | financials + behaviour + owner | detailed financial / market / management data |
| Decisioning | highly automated | hybrid | analyst-led |
| Product | standardized | semi-structured | bespoke |
| Exposure | smaller | medium | large |
| Owner relevance | n/a | often critical | less direct except concentrated ownership |
| Financial statements | limited relevance | important | central |
| Bank statements | very useful | very useful | useful but not usually primary underwriting input |
| Collateral | product-specific | often important | transaction-specific |
| Covenants | rare | common for larger SMEs | common |
| Approval | score / policy | score + analyst + credit authority | formal credit authority / committee |
| Monitoring | behavioural | behavioural + financial | financial + market + covenant + relationship |

### The most important distinction

```text
Retail risk:
Can this person / household pay?

SME risk:
Can this owner-managed business generate cash consistently enough to pay?

Corporate risk:
Can this company / group generate and protect cash flow through its capital structure and business cycle?
```

---

# 41. One Full SME Example — End to End

## Borrower

**Northstar Packaging Ltd**

```text
Revenue                  £6.0m
EBITDA                   £720k
Existing debt            £900k
Requested new term loan  £600k
Purpose                   automated production line
Tenor                     5 years
```

Owner owns 80% and manages the business.

---

## Step 1 — Business

Positives:

- operating 12 years
- repeat customers
- profitable
- experienced owner

Risks:

- top customer = 35% of sales
- raw-material prices volatile

---

## Step 2 — Financial Trend

```text
                Year 1     Year 2     Year 3
Revenue         £5.0m      £5.5m      £6.0m
EBITDA          £650k      £690k      £720k
Receivable days   48         56         68
Inventory days    42         45         51
```

Headline:

> Revenue and EBITDA are improving.

Credit interpretation:

> Working-capital efficiency is deteriorating and consuming more cash.

---

## Step 3 — Leverage

After new loan:

```text
Total debt = £1.5m
EBITDA     = £720k

Debt / EBITDA = 2.08x
```

Reasonable only if earnings remain stable.

---

## Step 4 — Debt Service

Assume:

```text
Cash available for debt service   £500k
Annual principal + interest        £330k

DSCR = 1.52x
```

Base case has headroom.

---

## Step 5 — Stress

Assume:

```text
Revenue falls 15%
Margin compresses
EBITDA falls to £480k
Cash available for debt service = £350k
Debt service = £330k

Stress DSCR = 1.06x
```

The credit becomes tight under stress.

---

## Step 6 — Security

Machine financed:

```text
Purchase price        £800k
Conservative recovery £400k
```

Owner also provides partial guarantee.

Collateral helps LGD but does not fix the narrow stressed cash-flow cushion.

---

## Step 7 — Credit Structure

Instead of blindly approving the request, bank may approve:

```text
Loan                         £600k
Tenor                        5 years
Security                     financed machinery
Covenant                     DSCR minimum
Customer concentration      monitored
Quarterly management data   required
Receivables reporting       required
```

---

## Step 8 — Risk Parameters

Illustrative:

```text
PD   2.5%
LGD  35%
EAD  £600k

Expected Loss
= 0.025 × 0.35 × £600,000
= £5,250
```

---

## Step 9 — Monitoring Six Months Later

Observed:

```text
Top customer cancels contract
Revenue run-rate falls 20%
Receivable days rise to 82
OD utilization reaches 97%
```

Individually concerning.

Together:

> strong early-warning pattern → reassessment → possible downgrade → watchlist → revised cash-flow forecast → covenant review → potential restructuring.

That is SME credit risk as a living lifecycle, not a one-time loan decision.

---

# 42. SME Credit Risk — The Whole Flow on One Screen

```text
BUSINESS
Who are they?
What do they sell?
Who owns them?
Who do they depend on?
        ↓
FINANCIALS
Revenue → margin → EBITDA
Balance sheet → debt → equity
Working capital → cash conversion
        ↓
CAPACITY
Cash available for debt service
DSCR
stress case
        ↓
RISK RATING
Score / internal grade
PD
        ↓
FACILITY
Amount
purpose
tenor
repayment
undrawn exposure
        ↓
RECOVERY
Collateral
guarantees
LGD
        ↓
EXPOSURE
Drawn + potential future drawings
EAD
        ↓
EXPECTED LOSS
PD × LGD × EAD
        ↓
APPROVAL
conditions
covenants
security
        ↓
MONITORING
account behaviour
financials
covenants
EWS
        ↓
DETERIORATION
watchlist
restructure
        ↓
DEFAULT
recovery
actual loss
```

---

# 43. Fast Diagnostic — When You Open an SME Credit File

Ask these in order:

1. **What exactly does the business do?**
2. **Who owns and controls it?**
3. **What facility is requested and why?**
4. **What is the primary source of repayment?**
5. **Are profits converting into cash?**
6. **What is happening to working capital?**
7. **How leveraged is the business?**
8. **Can it service debt under stress?**
9. **What are the biggest concentrations?**
10. **What behavioural warning signs exist?**
11. **What collateral / guarantees exist if repayment fails?**
12. **What conditions make the risk acceptable?**

If these twelve are clear, most of the credit story is clear.

---

# 44. Final SME Cheatsheet

## Business

```text
Business model
→ how money is made

Owner / management
→ who controls outcomes

Industry
→ external risk

Customer / supplier concentration
→ dependency risk
```

## Financials

```text
Revenue growth
→ direction of business

Margins
→ economic quality

EBITDA
→ operating earnings

Working capital
→ cash trapped in operations

Debt / EBITDA
→ leverage

DSCR
→ repayment capacity

Current / quick ratio
→ short-term liquidity
```

## Credit Parameters

```text
PD
→ chance of default

LGD
→ loss severity if default occurs

EAD
→ exposure when default occurs

EL
→ PD × LGD × EAD
```

## Facility

```text
Amount
Purpose
Tenor
Repayment
Drawn / undrawn
Security
Guarantees
Covenants
```

## Monitoring

```text
Payment behaviour
Account turnover
Utilization
Financial trends
Covenants
External events
Early warning
Watchlist
```

## Credit logic

```text
Good business
    +
sustainable cash flow
    +
manageable leverage
    +
right facility structure
    +
adequate downside protection
    =
acceptable SME credit
```

---

# 45. The One Sentence to Retain

> **SME credit risk is the discipline of deciding whether a business — usually inseparable from its owner, working-capital cycle and banking behaviour — can generate enough sustainable cash to repay the facility as structured, while controlling how much the bank loses if that assessment proves wrong.**

