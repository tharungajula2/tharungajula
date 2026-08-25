# 07 — Pillar 2, ICAAP & Stress Testing — End-to-End Master Note

> **Mental model:** Pillar 1 says:
>
> ```text
> Here is the minimum capital required by standard formulas.
> ```
>
> Pillar 2 asks:
>
> ```text
> What risks does that formula miss?
> How much extra capital does this bank need?
> What happens if the world gets much worse?
> ```
>
> The core chain:
>
> ```text
> Pillar 1
> Formula-based minimum
>        ↓
> Pillar 2
> Bank-specific risk assessment
>        ↓
> ICAAP
> Internal capital adequacy assessment
>        ↓
> Stress Testing
> Severe but plausible scenarios
>        ↓
> Supervisory Review
>        ↓
> Additional capital / buffers / management actions
> ```

---

# 1. Why Pillar 1 Is Not Enough

Pillar 1 is intentionally standardized.

It captures major risks such as:

```text
Credit risk
Market risk
Operational risk
```

But a real bank can have risks that are:

```text
too concentrated
too firm-specific
too model-dependent
too structural
too unusual
```

for a simple universal formula to capture perfectly.

That is why Pillar 2 exists.

---

# 2. Pillar 1 vs Pillar 2

| | Pillar 1 | Pillar 2 |
|---|---|---|
| Core style | Formula-based | Firm-specific assessment |
| Main purpose | Minimum capital | Risks not fully captured in Pillar 1 |
| Main owner | Regulatory calculation framework | Bank + supervisor |
| Examples | Credit / market / operational risk | Concentration, IRRBB, pension, model, strategic risk |
| Output | Minimum capital requirement | Additional capital / supervisory assessment |

Think:

```text
Pillar 1
= common baseline
```

```text
Pillar 2
= bank-specific overlay
```

---

# 3. Concentration Risk — Classic Pillar 2 Example

Suppose two banks each have:

```text
£10bn corporate lending
```

Bank A:

```text
spread across 20 industries
```

Bank B:

```text
60% commercial property
```

If Pillar 1 calculations treat individual loans similarly, they may not fully reflect:

```text
one common shock
→ many borrowers deteriorate together
```

That is **concentration risk**.

---

# 4. Single-Name Concentration

Example:

```text
Bank CET1 capital      £20bn
Exposure to one group   £4bn
```

If that one group fails severely:

```text
loss can materially hit capital
```

Corporate books are especially exposed to single-name concentration.

Retail books are usually more granular.

---

# 5. Sector Concentration

Example:

```text
25% construction
20% commercial real estate
15% hospitality
```

A recession can affect all three simultaneously.

So:

> **Diversification matters because credit losses are correlated.**

---

# 6. Geographic Concentration

A bank may appear diversified by borrower count but still be concentrated in:

```text
one country
one region
one property market
one commodity economy
```

Macro stress can therefore hit many exposures at once.

---

# 7. Interest Rate Risk in the Banking Book — IRRBB

A bank can suffer from rate movements even without trading.

Example:

```text
Assets
long-term fixed-rate loans

Liabilities
short-term deposits that reprice quickly
```

If rates rise:

```text
funding cost ↑
while
asset yield stays fixed
```

Margin falls.

This is **interest rate risk in the banking book**.

It generally sits outside Pillar 1 credit-risk formulas.

---

# 8. IRRBB — Income View

One lens:

```text
Net Interest Income — NII
```

Question:

> How will rate movements affect earnings over the next 1–3 years?

Example:

```text
Deposit cost ↑ faster
than
loan yield
```

Result:

```text
NII ↓
```

---

# 9. IRRBB — Economic Value View

Second lens:

```text
Economic Value of Equity — EVE
```

Question:

> How does the present value of assets and liabilities change if rates move?

Long-dated fixed-rate assets can lose economic value when rates rise.

So:

```text
NII
→ near-term earnings lens

EVE
→ long-term value lens
```

---

# 10. Pension Risk

Banks with defined-benefit pension schemes can face:

```text
asset value changes
liability valuation changes
funding deficits
```

These can affect capital.

Not a normal Pillar 1 credit exposure.

But still a real solvency risk.

---

# 11. Model Risk

A bank depends on models for:

- PD
- LGD
- EAD
- valuation
- stress testing
- forecasting
- pricing
- capital

If models are wrong:

```text
risk may be understated
```

Model risk therefore becomes a capital / governance concern.

---

# 12. Strategic Risk

Example:

```text
Bank expands aggressively into new lending segment
```

Potential issues:

```text
poor underwriting
insufficient data
wrong pricing
operational weakness
```

Strategic choices can create material future losses.

Pillar 2 can consider these broader risks.

---

# 13. The ICAAP

**ICAAP = Internal Capital Adequacy Assessment Process**

The bank asks:

```text
What risks do we face?
How large are they?
How much capital do we need?
Can we survive stress?
```

This is not just a regulatory form.

It is the bank's internal capital case.

---

# 14. ICAAP — Four Core Steps

```text
1. Identify
all material risks
```

```text
2. Quantify
capital need / exposure
```

```text
3. Stress
under severe scenarios
```

```text
4. Conclude
capital adequacy and actions
```

---

# 15. ICAAP Is Broader Than RWA

Pillar 1:

```text
RWA
×
minimum capital ratios
```

ICAAP:

```text
Pillar 1
+
firm-specific risks
+
stress losses
+
capital planning
+
management actions
```

So:

```text
ICAAP ≠ RWA calculation
```

---

# 16. Risk Identification

Bank builds a risk inventory.

Possible categories:

```text
Credit risk
Concentration risk
Market risk
Operational risk
IRRBB
Pension risk
Model risk
Liquidity-linked capital effects
Strategic risk
Business risk
Climate / emerging risks
```

Not every risk receives a separate capital number.

But every material risk should be considered.

---

# 17. Materiality

Not every tiny risk needs the same treatment.

Question:

> Could this risk materially affect the bank's capital adequacy?

If yes:

```text
quantify / stress / manage
```

If no:

```text
document why not material
```

Materiality itself is a governed judgement.

---

# 18. Capital Planning

ICAAP is forward-looking.

It asks:

```text
What will capital look like over the planning horizon?
```

Inputs:

- profit
- dividends
- lending growth
- RWA growth
- model changes
- regulatory changes
- stress losses
- capital issuance
- management actions

---

# 19. Capital Planning Example

Start:

```text
CET1 capital      £40bn
RWA              £250bn
CET1 ratio        16.0%
```

Next year plan:

```text
Profit             +£5bn
Dividends          -£2bn
RWA growth         +£30bn
```

New capital:

```text
£43bn
```

New RWA:

```text
£280bn
```

Ratio:

```text
43 / 280
=
15.4%
```

Even profitable growth can reduce capital ratio if RWA grows faster than capital.

---

# 20. Stress Testing — Why It Exists

Historical averages are not enough.

Banks fail in extreme environments.

Stress testing asks:

> What happens if the economy or market moves severely against us?

Examples:

```text
GDP recession
Unemployment spike
House-price crash
Interest-rate shock
Commercial property decline
Corporate default wave
Market volatility
Funding stress
```

---

# 21. Stress Testing Is Not Forecasting

Forecast:

```text
What do we think will probably happen?
```

Stress test:

```text
What happens if something severe happens?
```

Stress scenarios are usually:

```text
unlikely
but plausible
```

not best estimates.

---

# 22. Base Case vs Stress Case

## Base case

Expected economic path.

## Stress case

Severe downside.

Example:

```text
BASE
GDP growth       +1.5%
Unemployment      5%
House prices      +2%
```

Stress:

```text
GDP growth       -5%
Unemployment     10%
House prices     -25%
```

Then re-estimate:

```text
PD
LGD
EAD
losses
RWA
capital
```

---

# 23. Stress Transmission — Credit Risk

Macro shock:

```text
GDP ↓
Unemployment ↑
House prices ↓
```

Then:

```text
Borrower cash flow weakens
        ↓
PD ↑
```

```text
Collateral value falls
        ↓
LGD ↑
```

```text
Borrowers draw liquidity
        ↓
EAD ↑
```

All three can deteriorate.

---

# 24. Retail Stress Example

Scenario:

```text
Unemployment rises sharply
House prices fall 20%
Rates stay high
```

Mortgage impact:

```text
affordability stress ↑
→ PD ↑
```

```text
property recovery value ↓
→ LGD ↑
```

Credit-card impact:

```text
income pressure
→ utilisation ↑
→ EAD ↑
→ PD ↑
```

---

# 25. SME Stress Example

Scenario:

```text
GDP falls
consumer demand weakens
interest rates remain high
```

SME:

```text
Revenue ↓
Margins ↓
Receivables slower
OD usage ↑
DSCR ↓
```

Then:

```text
PD ↑
EAD ↑
possibly LGD ↑
```

---

# 26. Corporate Stress Example

Scenario:

```text
Recession
+
bond markets tighten
+
rates remain elevated
```

Corporate:

```text
EBITDA ↓
FCF ↓
Leverage ↑
Refinancing risk ↑
Bond spreads ↑
```

Possible:

```text
Rating downgrade
→ PD ↑
→ RWA ↑
```

---

# 27. Stress Hits Both Capital Ratio Sides

Recall:

```text
CET1 Ratio
=
CET1 Capital
────────────
RWA
```

Stress can cause:

```text
Losses
→ CET1 ↓
```

and simultaneously:

```text
Risk migration
→ RWA ↑
```

Double pressure.

---

# 28. Worked Capital Stress

Before stress:

```text
CET1       £45bn
RWA        £300bn
Ratio      15.0%
```

Stress:

```text
Credit losses reduce CET1 by £6bn
RWA rises by £40bn
```

After:

```text
CET1       £39bn
RWA        £340bn
```

```text
Ratio
=
39 / 340
=
11.5%
```

A large drop from 15%.

---

# 29. Provisioning and Stress

IFRS 9 ECL can rise early in stress.

Example:

```text
Stage 1 → Stage 2 migration
+
PD scenarios worsen
+
LGD worsens
```

Provision rises.

Then:

```text
profit ↓
retained earnings ↓
CET1 ↓
```

So accounting stress feeds prudential capital.

---

# 30. RWA Migration in Stress

Borrowers move:

```text
Grade 3
→ Grade 5
→ Grade 7
```

Under risk-sensitive capital:

```text
PD ↑
→ capital requirement ↑
→ RWA ↑
```

This can happen even before actual default.

---

# 31. Credit Concentration in Stress

Portfolio:

```text
30% commercial property
```

Stress:

```text
commercial property values -35%
```

Then many exposures deteriorate together.

This is why concentration risk matters more in stress than in ordinary periods.

---

# 32. Scenario Design

A credible stress scenario should be:

```text
severe
coherent
economically plausible
internally consistent
```

Not random disconnected shocks.

Example:

```text
GDP ↓
Unemployment ↑
House prices ↓
Corporate defaults ↑
```

These relationships make economic sense together.

---

# 33. Single-Factor Stress

Example:

```text
Interest rates +300 bps
```

Useful for sensitivity.

Answers:

> What if one variable moves?

But does not capture full macro interaction.

---

# 34. Multi-Factor Scenario

Example:

```text
GDP -4%
Unemployment +4 pts
House prices -25%
Commercial property -35%
Rates +200 bps
Equities -30%
```

More realistic systemic stress.

---

# 35. Sensitivity Analysis

Sensitivity asks:

> How does the result change if one assumption changes?

Example:

```text
LGD +10 percentage points
```

or:

```text
PD × 2
```

Useful for understanding model drivers.

---

# 36. Scenario Analysis

Scenario analysis asks:

> What happens when several related variables move together?

Example recession:

```text
GDP ↓
Unemployment ↑
Property ↓
Credit spreads ↑
```

This produces a more holistic stress.

---

# 37. Reverse Stress Testing

Normal stress:

```text
Given scenario
→ what happens to bank?
```

Reverse stress:

```text
Given failure outcome
→ what scenario could cause it?
```

Start from:

```text
Capital ratio falls below critical level
```

Then work backward.

---

# 38. Reverse Stress Example

Failure condition:

```text
CET1 ratio < 7%
```

Ask:

> What combination of losses, RWA growth, funding pressure, and market shocks would produce that?

Possible path:

```text
Commercial property crash
+
large corporate defaults
+
deposit outflow
+
market loss
+
capital markets closed
```

Reverse stress exposes blind spots.

---

# 39. Stress Horizon

Different tests use different horizons.

Examples:

```text
1 year
3 years
5 years
```

The longer the horizon:

```text
more balance-sheet evolution
+
more management actions
+
more uncertainty
```

Capital planning often uses multi-year horizons.

---

# 40. Static vs Dynamic Balance Sheet

## Static balance sheet

Assume today's balance sheet remains broadly fixed.

Useful for pure sensitivity.

## Dynamic balance sheet

Allows:

- new lending
- repayments
- defaults
- RWA changes
- management actions
- business plan evolution

More realistic for multi-year planning.

---

# 41. Management Actions

Banks do not sit still in stress.

Possible actions:

```text
cut dividends
reduce new lending
sell assets
hedge risk
raise capital
reduce risk-weighted exposure
tighten underwriting
reduce costs
```

But actions should be:

```text
credible
timely
operationally possible
```

---

# 42. Management Action Trap

Bad stress testing:

```text
capital falls
→ assume bank instantly raises £10bn
```

without asking:

```text
Would markets be open?
Would investors buy?
How long would it take?
```

Stress actions must be realistic.

---

# 43. Capital Conservation in Stress

Banks may protect capital by:

```text
reducing dividends
reducing buybacks
slowing asset growth
raising prices
tightening risk appetite
```

This can improve capital ratios.

But excessive deleveraging can hurt the real economy.

---

# 44. Procyclicality

In downturn:

```text
PD ↑
LGD ↑
RWA ↑
capital ratio ↓
```

Bank may respond:

```text
reduce lending
```

which can worsen recession.

This feedback is called **procyclicality**.

Buffers partly exist to reduce this effect.

---

# 45. Pillar 2A

Pillar 2A is additional capital for risks not adequately captured in Pillar 1.

Think:

```text
Pillar 1
baseline
+
Pillar 2A
firm-specific hard add-on
```

Examples can include:

- concentration risk
- IRRBB
- pension risk
- under-captured credit risk

---

# 46. PRA Buffer / Pillar 2B Intuition

Beyond hard capital requirements, supervisors may expect buffers for:

```text
stress resilience
+
forward-looking uncertainty
```

These are designed to be usable in downturns.

Conceptually:

```text
minimum requirement
+
additional requirement
+
buffers
```

---

# 47. Requirement vs Buffer

Important:

```text
Requirement
→ hard minimum
```

```text
Buffer
→ resilience layer intended to absorb stress
```

Breaching a buffer is serious.

But not identical to breaching minimum capital.

---

# 48. Capital Stack — Practical View

A bank's effective capital requirement can include:

```text
Pillar 1
+
Pillar 2A
+
Capital Conservation Buffer
+
Countercyclical Buffer
+
Systemic Buffers
+
PRA / stress-related buffer
```

Plus internal management headroom.

So:

> **The actual operating target is much more than the 8% Pillar 1 total minimum.**

---

# 49. Supervisory Review

The supervisor reviews:

- ICAAP
- stress testing
- risk governance
- capital plan
- management actions
- model assumptions
- material risk identification

Question:

> Does the bank understand its own risk and hold enough capital?

---

# 50. SREP Intuition

**SREP = Supervisory Review and Evaluation Process**

The supervisor assesses:

```text
business model
governance
capital
liquidity
risk management
```

ICAAP feeds into that review.

Think:

```text
Bank self-assessment
→ ICAAP
```

```text
Supervisor challenge
→ SREP
```

---

# 51. ICAAP Ownership

ICAAP is not just a Risk-team spreadsheet.

It involves:

```text
Risk
Finance
Treasury
Business
Model teams
Stress testing
Capital management
Senior management
Board
```

The board ultimately needs to understand and approve the capital adequacy view.

---

# 52. Finance Role

Finance provides:

- capital base
- profit forecast
- balance-sheet plan
- accounting impacts
- capital issuance assumptions
- dividend assumptions

Risk cannot build credible capital planning without Finance.

---

# 53. Risk Role

Risk provides:

- risk identification
- credit stress
- concentration analysis
- model outputs
- risk appetite
- scenario impact
- challenge

---

# 54. Treasury Role

Treasury contributes:

- funding
- liquidity
- interest-rate risk
- capital structure
- issuance
- balance-sheet management

Capital and liquidity are different.

But stress can connect them.

---

# 55. Business Role

Business units provide:

- lending growth assumptions
- portfolio mix
- pricing
- underwriting changes
- customer behavior
- management actions

A capital plan must reflect the actual business plan.

---

# 56. Board Role

Board should understand:

```text
What risks threaten capital?
How severe are stresses?
What buffers exist?
What actions are available?
```

ICAAP is therefore a governance process, not merely a technical calculation.

---

# 57. Risk Appetite

A bank sets boundaries around risk.

Examples:

```text
Minimum CET1 ratio
Maximum sector concentration
Maximum single-name exposure
Minimum liquidity
Maximum stressed loss
```

Stress testing checks whether strategy remains within appetite.

---

# 58. Risk Appetite Example

Internal threshold:

```text
CET1 ratio
must stay above 12%
under management stress
```

Stress result:

```text
10.8%
```

Even if legal minimum is not breached:

```text
internal risk appetite breached
```

Management action required.

---

# 59. ICAAP and Business Strategy

Suppose business wants:

```text
20% corporate loan growth
```

Capital impact:

```text
RWA ↑
```

If retained earnings do not grow fast enough:

```text
capital ratio ↓
```

Then strategy may need:

- more capital
- slower growth
- different portfolio mix
- higher pricing
- lower-RWA products

Capital adequacy directly constrains strategy.

---

# 60. Portfolio Mix Matters

Two growth plans:

### Plan A

```text
£10bn low-RWA secured lending
```

### Plan B

```text
£10bn high-RWA unsecured corporate lending
```

Same nominal growth.

Very different capital consumption.

ICAAP evaluates this.

---

# 61. Earnings Matter to Capital

Profits retained in the bank increase CET1.

Example:

```text
Profit       £5bn
Dividend     £2bn
Retained     £3bn
```

Broadly:

```text
retained earnings ↑
→ CET1 ↑
```

Thus sustainable profitability is part of capital resilience.

---

# 62. Dividend Policy Matters

High dividends:

```text
less retained earnings
→ slower CET1 growth
```

In stress, dividend restriction is a major capital-preservation action.

---

# 63. RWA Growth Matters

Bank can be profitable but still see capital ratio fall.

Example:

```text
CET1 growth      +5%
RWA growth       +15%
```

Then denominator grows faster than numerator.

Capital ratio weakens.

---

# 64. Model Change Matters

New model:

```text
PD ↑
LGD ↑
```

could produce:

```text
RWA ↑
```

without any change in lending.

Capital planning must include model / methodology changes.

---

# 65. Regulatory Change Matters

New prudential rules can alter:

- risk weights
- IRB scope
- output floor
- exposure classification
- capital deductions

So ICAAP must include regulatory developments.

---

# 66. Stress Testing Data Spine

A simplified flow:

```text
Scenario variables
        ↓
Portfolio data
        ↓
PD / LGD / EAD stress models
        ↓
Credit losses
        ↓
Provision impact
        ↓
Profit / CET1 impact
        ↓
RWA impact
        ↓
Capital ratio
        ↓
Management actions
        ↓
Final stressed capital path
```

---

# 67. Scenario Variables

Typical macro variables:

```text
GDP
Unemployment
Interest rates
Inflation
House prices
Commercial property
FX
Equity prices
Credit spreads
Commodity prices
```

Each portfolio maps differently.

---

# 68. Portfolio Mapping

Mortgage model may use:

```text
unemployment
house prices
interest rates
```

SME model may use:

```text
GDP
rates
sector output
```

Corporate model may use:

```text
GDP
credit spreads
industry variables
FX
commodity prices
```

One macro scenario.

Different risk transmission.

---

# 69. Stress PD

Example:

```text
Base PD      1.5%
Stress PD    4.0%
```

Question:

> How does macro deterioration translate into borrower default likelihood?

This can be modeled statistically or through rating migration / scenario rules.

---

# 70. Stress LGD

Example:

```text
Base LGD      30%
Stress LGD    45%
```

Possible cause:

```text
property values ↓
enterprise values ↓
recovery time ↑
```

---

# 71. Stress EAD

Example revolving portfolio:

```text
Base CCF      40%
Stress CCF    70%
```

Borrowers draw more unused lines.

Then:

```text
EAD ↑
```

This matters for:

- credit cards
- SME overdrafts / RCFs
- corporate RCFs

---

# 72. Stress Expected Loss

Example:

Base:

```text
PD    2%
LGD   30%
EAD   £100m
```

```text
EL = £0.6m
```

Stress:

```text
PD    5%
LGD   45%
EAD   £120m
```

```text
EL
=
5% × 45% × £120m
=
£2.7m
```

Loss rises 4.5x.

---

# 73. Tail Loss

Expected loss is the average.

Stress loss is a severe outcome.

Example:

```text
Expected annual loss   £100m
Stress loss            £700m
```

The gap shows why capital must exist beyond provisioning.

---

# 74. Capital Depletion

Stress loss reduces profit and equity.

Example:

```text
Starting CET1     £20bn
Stress after-tax loss £3bn
```

Simplified:

```text
New CET1
≈
£17bn
```

Then recalculate ratio using stressed RWA.

---

# 75. Stress RWA

As risk worsens:

```text
ratings migrate down
PD rises
risk weights rise
```

RWA may increase.

Example:

```text
Before stress   £120bn
After stress    £145bn
```

Even if nominal exposure is unchanged.

---

# 76. Full Stress Example

Starting:

```text
CET1       £30bn
RWA        £200bn
Ratio      15.0%
```

Stress effects:

```text
Losses        -£5bn CET1
RWA increase  +£40bn
```

Result:

```text
CET1       £25bn
RWA        £240bn
```

```text
Ratio
=
25 / 240
=
10.4%
```

This is the number management cares about.

---

# 77. Management Action Example

Without action:

```text
Stressed CET1 ratio = 10.4%
```

Actions:

```text
Dividend cancellation       +£1bn CET1
Asset reduction              -£10bn RWA
```

New:

```text
CET1       £26bn
RWA        £230bn
```

```text
Ratio
=
11.3%
```

Still below internal target?

Then more action needed.

---

# 78. Stress Test Results Are Paths, Not One Number

A multi-year stress may show:

```text
Year 0   15.0%
Year 1   12.2%
Year 2   10.7%
Year 3   11.4%
```

The lowest point is the **trough**.

Question:

> Does the bank remain above required thresholds at every point?

---

# 79. Capital Trough

Example:

```text
Minimum stressed CET1
=
10.7%
```

This is more useful than only looking at final-year ratio.

A bank may breach midway and recover later.

That still matters.

---

# 80. Stress Test Governance

A robust process needs:

- approved scenario
- model ownership
- data quality
- challenge
- reconciliation
- assumptions log
- management-action governance
- board review

Stress testing is not just model execution.

---

# 81. Scenario Governance

Questions:

```text
Who designed the scenario?
Why is it severe?
Why is it plausible?
Which variables are shocked?
How are missing variables inferred?
```

Scenario design should be explainable.

---

# 82. Model Governance in Stress

Need to know:

```text
Which model?
Which version?
Which portfolio?
Which stress linkage?
Which limitations?
```

A stress model can be materially wrong even if production PD models are good.

---

# 83. Data Quality in Stress

Missing:

```text
LTV
rating
sector
maturity
collateral
```

can distort stress results.

Example:

```text
sector missing
→ exposure mapped to generic stress factor
→ wrong PD stress
```

So stress testing is also a data-governance exercise.

---

# 84. Reconciliation

Need to reconcile:

```text
Starting exposure
→ stressed exposure
→ loss
→ provision
→ P&L
→ CET1
→ RWA
→ ratio
```

If one bridge is unexplained, the result is unreliable.

---

# 85. Stress Testing vs Scenario Forecasting

Forecast may use:

```text
management assumptions
```

Stress test may override them with:

```text
prescribed severe macro path
```

Do not use optimistic business plan assumptions inside a severe stress unless governed.

---

# 86. Stress Testing vs IFRS 9 Scenarios

Both use forward-looking economics.

But purposes differ.

```text
IFRS 9 scenarios
→ probability-weighted expected loss
```

```text
Capital stress
→ severe resilience test
```

A severe stress scenario is not automatically an IFRS 9 downside scenario.

---

# 87. Stress Testing vs ICAAP

Stress testing is a tool inside ICAAP.

```text
ICAAP
=
risk identification
+
capital assessment
+
stress testing
+
capital planning
+
governance
```

So:

```text
Stress Test ≠ ICAAP
```

---

# 88. ICAAP vs ILAAP

Important distinction:

```text
ICAAP
→ capital adequacy
```

```text
ILAAP
→ liquidity adequacy
```

Capital:

```text
Can losses be absorbed?
```

Liquidity:

```text
Can cash obligations be met?
```

Different but connected.

---

# 89. Solvency vs Liquidity

A bank can be:

```text
solvent
but
illiquid
```

or:

```text
liquid today
but
economically insolvent
```

That is why ICAAP and ILAAP both exist.

---

# 90. Capital Stress Can Trigger Liquidity Stress

Suppose:

```text
Credit losses ↑
Capital ratio ↓
External rating downgraded
```

Then:

```text
funding cost ↑
deposit confidence ↓
market access ↓
```

Capital stress can become liquidity stress.

---

# 91. Liquidity Stress Can Trigger Capital Stress

Suppose funding disappears.

Bank sells assets quickly.

```text
forced-sale losses
→ capital ↓
```

So the two risk worlds can feed each other.

---

# 92. Common Trap — Pillar 2 = Extra Credit Risk Only

Wrong.

Pillar 2 can cover a broad set of firm-specific risks.

Credit concentration is one example.

Not the whole framework.

---

# 93. Common Trap — ICAAP = Stress Test

Wrong.

Stress testing is one component of ICAAP.

---

# 94. Common Trap — ICAAP = RWA Calculation

Wrong.

RWA is Pillar 1 / prudential measurement.

ICAAP is broader firm-wide capital adequacy assessment.

---

# 95. Common Trap — Stress Scenario = Forecast

Wrong.

Forecast:

```text
expected path
```

Stress:

```text
severe downside
```

---

# 96. Common Trap — Stress Test Only Changes PD

Wrong.

Stress can affect:

```text
PD
LGD
EAD
RWA
earnings
capital
liquidity
```

---

# 97. Common Trap — Capital Buffer = Minimum Requirement

Wrong.

Buffers provide resilience above hard minima.

They are designed to be usable under stress.

---

# 98. Common Trap — Diversified Borrowers = Diversified Risk

Not necessarily.

100 borrowers all in:

```text
same sector
same region
same collateral type
```

can still be highly concentrated.

---

# 99. Common Trap — Profitable Bank = Capital-Safe Bank

Wrong.

Rapid RWA growth can outpace retained earnings.

A profitable bank can still weaken its capital ratio.

---

# 100. Common Trap — Management Actions Are Free

Wrong.

Every action has constraints.

Examples:

```text
raise capital
→ markets may be closed

sell assets
→ prices may be depressed

reduce lending
→ revenue falls
```

Stress actions must be credible.

---

# 101. Full Pillar 2 / ICAAP Flow

```text
BANK STRATEGY
      ↓
Business plan
      ↓
Risk identification
      ↓
Pillar 1 baseline capital
      ↓
Pillar 2 risks
      ↓
ICAAP quantification
      ↓
Stress scenarios
      ↓
Losses + RWA movement
      ↓
Stressed CET1 / capital ratios
      ↓
Management actions
      ↓
Capital plan
      ↓
Board approval
      ↓
Supervisory review
      ↓
Additional requirements / buffers
```

---

# 102. Retail → ICAAP Connection

Retail portfolio:

```text
Mortgage
Credit card
Personal loan
```

ICAAP asks:

```text
What if unemployment rises?
What if house prices crash?
What if revolving utilization spikes?
What if defaults cluster?
```

Then:

```text
loss
+
RWA
+
capital impact
```

---

# 103. SME → ICAAP Connection

SME book:

```text
sector concentration
owner-managed businesses
working-capital stress
```

ICAAP asks:

```text
What if rates remain high?
What if demand falls?
What if SMEs draw unused lines?
```

Then:

```text
PD ↑
EAD ↑
LGD ↑
```

---

# 104. Corporate → ICAAP Connection

Corporate book:

```text
large single names
industry concentration
refinancing risk
```

ICAAP asks:

```text
What if major names downgrade?
What if bond markets close?
What if one concentrated sector fails?
```

This is where single-name and concentration stress becomes critical.

---

# 105. Fast Diagnostic — When You See an ICAAP / Stress Number

Ask:

1. **Which risk is being assessed?**
2. **Pillar 1 or Pillar 2?**
3. **What is the scenario?**
4. **What horizon?**
5. **Static or dynamic balance sheet?**
6. **Which portfolios are stressed?**
7. **How does scenario map to PD / LGD / EAD?**
8. **What losses result?**
9. **What happens to provisions?**
10. **What happens to CET1?**
11. **What happens to RWA?**
12. **What is the stressed capital trough?**
13. **Which management actions are assumed?**
14. **Are those actions credible?**
15. **What buffer / requirement is compared against?**
16. **Who approved the assumptions?**
17. **Does the result reconcile end to end?**

If these are clear:

> the stress result becomes explainable.

---

# 106. One-Page Recall Sheet

## Pillar 2

```text
Pillar 1
= common minimum

Pillar 2
= firm-specific risk overlay
```

## ICAAP

```text
Identify risk
→ Quantify
→ Stress
→ Plan capital
→ Board approves
→ Supervisor reviews
```

## Stress

```text
Severe scenario
→ PD / LGD / EAD worsen
→ Losses rise
→ CET1 falls
→ RWA rises
→ Capital ratio falls
```

## Key risks

```text
Concentration
IRRBB
Pension
Model
Strategic / business
Other firm-specific risks
```

## Never Confuse

```text
Pillar 2 ≠ only credit risk

ICAAP ≠ RWA

ICAAP ≠ Stress Test

Stress ≠ Forecast

Buffer ≠ Minimum requirement

Capital ≠ Liquidity

ICAAP ≠ ILAAP

Diversified borrower count ≠ diversified portfolio risk
```

---

# 107. The One Sentence to Retain

> **Pillar 2 exists because formula-based Pillar 1 cannot capture every bank-specific risk: the ICAAP identifies and quantifies those risks, stresses the whole balance sheet under severe scenarios, projects how losses and RWA affect capital, and shows whether the bank can remain adequately capitalized after realistic management actions.**
