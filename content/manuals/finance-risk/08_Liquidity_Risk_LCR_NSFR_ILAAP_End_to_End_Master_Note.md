# 08 — Liquidity Risk, LCR, NSFR & ILAAP — End-to-End Master Note

> **Mental model:** Capital asks:
>
> ```text
> Can the bank absorb losses?
> ```
>
> Liquidity asks:
>
> ```text
> Can the bank pay cash when obligations fall due?
> ```
>
> A bank can be **solvent but still fail from lack of liquidity**.
>
> The core chain:
>
> ```text
> Funding sources
>      ↓
> Cash inflows / outflows
>      ↓
> Liquidity buffer
>      ↓
> LCR — survive short-term stress
>      +
> NSFR — maintain stable funding structure
>      ↓
> Internal liquidity stress testing
>      ↓
> ILAAP
>      ↓
> Liquidity risk appetite + contingency actions
> ```

---

# 1. Capital Risk vs Liquidity Risk

Never combine these.

## Capital / solvency

Question:

```text
Are assets worth more than liabilities
after losses?
```

Core metric:

```text
CET1
────
RWA
```

## Liquidity

Question:

```text
Can cash obligations be met
when they fall due?
```

Core tools:

```text
Cash
HQLA
LCR
NSFR
Funding profile
Liquidity stress
```

---

# 2. Solvent but Illiquid

Bank balance sheet:

```text
Assets
£100bn

Liabilities
£94bn

Capital
£6bn
```

Economically solvent.

But suppose tomorrow:

```text
£10bn deposits leave
```

while only:

```text
£3bn immediately usable cash
```

The bank may have enough long-term asset value.

But not enough cash **today**.

That is liquidity risk.

---

# 3. Liquid but Insolvent

Opposite case.

Bank holds:

```text
£10bn cash
```

but hidden loan losses mean:

```text
Assets       £90bn
Liabilities  £95bn
```

Plenty of immediate cash.

But economically:

```text
assets < liabilities
```

Bank is insolvent.

So:

```text
Liquidity ≠ Solvency
```

---

# 4. Why Banks Are Naturally Exposed to Liquidity Risk

Traditional banking:

```text
Deposits
often withdrawable quickly
        ↓
fund
        ↓
Mortgages / corporate loans
repaid over years
```

This is called:

```text
maturity transformation
```

Banks borrow short and lend long.

Useful economically.

But creates liquidity risk.

---

# 5. Funding Liquidity Risk

> **Funding liquidity risk = risk that the bank cannot meet cash obligations when due without unacceptable loss.**

Examples:

```text
deposit withdrawals
wholesale debt maturity
margin calls
collateral calls
loan commitments drawn
```

---

# 6. Market Liquidity Risk

Different concept.

> **Market liquidity risk = risk that an asset cannot be sold quickly at a reasonable price.**

Example:

```text
Bank owns £1bn asset
```

Normal market value:

```text
£1bn
```

During crisis:

```text
few buyers
forced sale
£750m
```

Asset exists.

But cannot be monetised cleanly.

---

# 7. Funding Liquidity + Market Liquidity Can Reinforce Each Other

Funding stress:

```text
cash needed urgently
```

Bank sells assets.

But market stress means:

```text
sale price ↓
```

Then:

```text
losses ↑
capital ↓
confidence ↓
funding stress ↑
```

A liquidity problem can become a solvency problem.

---

# 8. Main Bank Funding Sources

Typical:

```text
Retail deposits
SME deposits
Corporate deposits
Wholesale deposits
Interbank funding
Secured funding / repo
Bonds
Covered bonds
Central-bank funding
Equity / capital
```

Not all funding is equally stable.

---

# 9. Retail Deposits

Examples:

```text
Current accounts
Savings accounts
Term deposits
```

Why valuable:

```text
granular
diversified
often behaviourally sticky
```

But:

```text
deposit ≠ guaranteed stable
```

Digital banking can accelerate withdrawals.

---

# 10. Wholesale Funding

Examples:

```text
interbank borrowing
money-market funding
institutional deposits
commercial paper
bonds
```

Potential problem:

```text
large amount
+
few counterparties
+
short maturity
```

Funding can disappear quickly in stress.

---

# 11. Secured Funding — Repo

Simplified:

```text
Bank gives securities as collateral
        ↓
receives cash
```

Later:

```text
cash repaid
+
securities returned
```

This is **repurchase agreement — repo** funding.

Key liquidity issue:

```text
collateral availability
+
haircuts
+
market value
```

---

# 12. Unsecured Funding

No specific collateral pledged.

Lender relies on:

```text
bank creditworthiness
```

During stress:

```text
confidence ↓
→ unsecured funding becomes expensive / unavailable
```

---

# 13. Funding Concentration

Suppose:

```text
Deposits = £50bn
```

Looks large.

But:

```text
one corporate client = £8bn
```

That is concentration.

If one depositor leaves:

```text
16% of total deposits disappear
```

Funding quality depends on:

```text
amount
+
stability
+
concentration
```

---

# 14. Deposit Run

A bank run:

```text
customers lose confidence
        ↓
withdraw deposits
        ↓
bank uses cash / HQLA
        ↓
liquidity buffer falls
        ↓
more concern
        ↓
more withdrawals
```

Liquidity risk is heavily driven by **confidence**.

---

# 15. Digital Bank-Run Risk

Modern banking can move deposits extremely fast.

Old world:

```text
branch queue
```

Modern world:

```text
mobile app
→ instant transfer
```

That changes the speed of liquidity stress.

The bank must think about:

```text
how fast cash can leave
```

not only:

```text
how much eventually leaves
```

---

# 16. Cash-Flow Mismatch

Liquidity analysis maps:

```text
cash inflows
vs
cash outflows
```

by time bucket.

Example:

```text
Tomorrow
1 week
1 month
3 months
1 year
```

If:

```text
outflows > inflows
```

the bank needs:

```text
cash
+
liquid assets
+
funding
```

to bridge the gap.

---

# 17. Contractual vs Behavioural Maturity

A deposit may be contractually:

```text
withdrawable tomorrow
```

but behaviourally:

```text
customers leave money for years
```

A mortgage may contractually mature in:

```text
25 years
```

but may prepay earlier.

So liquidity management uses:

```text
contractual terms
+
behavioural assumptions
```

---

# 18. Behavioural Assumptions Matter

Examples:

```text
What % of deposits run?
How fast?
How much unused credit is drawn?
How much mortgage prepayment occurs?
Which funding can be rolled?
```

Small assumption changes can materially alter stress liquidity.

---

# 19. Liquidity Buffer

A bank holds assets that can be converted into cash quickly.

Think:

```text
Cash
+
central-bank reserves
+
high-quality liquid securities
```

Purpose:

> survive funding stress without immediately selling illiquid assets.

---

# 20. HQLA — High-Quality Liquid Assets

**HQLA = High-Quality Liquid Assets**

Characteristics:

```text
high credit quality
liquid market
easy to value
low price volatility
readily monetisable
```

Examples can include:

```text
central-bank reserves
high-quality sovereign securities
eligible high-quality bonds
```

subject to regulatory criteria.

---

# 21. HQLA Is Not “Any Asset That Can Be Sold”

A corporate loan:

```text
valuable
```

but may not be:

```text
immediately liquid
```

Therefore:

```text
loan book value
≠
liquidity buffer
```

---

# 22. HQLA Levels

LCR frameworks distinguish categories such as:

```text
Level 1
Level 2A
Level 2B
```

with different:

- eligibility
- haircuts
- composition limits

Core intuition:

```text
Level 1
→ highest liquidity quality
```

Lower categories:

```text
more restrictions / haircuts
```

---

# 23. Haircut in Liquidity

Suppose:

```text
Security market value   £100m
Regulatory haircut        15%
```

Recognized liquidity value:

```text
£85m
```

Reason:

> sale / monetisation value can fall in stress.

---

# 24. LCR — Liquidity Coverage Ratio

**LCR = Liquidity Coverage Ratio**

Question:

> Does the bank hold enough HQLA to survive a severe 30-calendar-day liquidity stress?

Formula:

```text
LCR
=
Stock of HQLA
──────────────────────────────
Total Net Cash Outflows
over 30-day stress
```

---

# 25. LCR Minimum

Normal requirement:

```text
LCR ≥ 100%
```

Example:

```text
HQLA                  £120bn
30-day net outflows   £100bn
```

```text
LCR
=
120%
```

Meaning:

> HQLA covers modeled 30-day stressed net cash outflows.

---

# 26. LCR Below 100% in Stress

Important nuance:

The buffer exists to be used.

During genuine stress:

```text
HQLA can be monetised
→ LCR may fall below 100%
```

The ratio is not intended to make banks afraid to use their liquidity buffer when stress actually arrives.

---

# 27. LCR Numerator

Numerator:

```text
eligible HQLA
after
haircuts
+
composition rules
```

Not:

```text
all securities
```

Eligibility matters.

---

# 28. LCR Denominator

Denominator:

```text
stressed cash outflows
−
eligible stressed inflows
```

over:

```text
30 calendar days
```

subject to regulatory rules.

---

# 29. Deposit Run-Off Rates

Not every deposit is assumed to leave.

Different deposits receive different stressed run-off assumptions depending on characteristics such as:

- retail vs wholesale
- stability
- operational relationship
- deposit insurance / characteristics
- counterparty type

Core logic:

```text
more stable funding
→ lower assumed runoff
```

```text
less stable funding
→ higher assumed runoff
```

---

# 30. Deposit Outflow Example

Illustrative mechanics:

```text
Deposit balance     £10bn
Stress runoff        10%
```

Stressed outflow:

```text
£1bn
```

Another funding source:

```text
£10bn
× 40%
=
£4bn outflow
```

Same balance.

Different liquidity risk.

---

# 31. Undrawn Credit Commitments Create Liquidity Risk

Corporate client has:

```text
£1bn RCF
Drawn      £300m
Undrawn    £700m
```

During stress:

```text
client draws £400m more
```

Bank must provide cash.

So:

```text
undrawn commitment
=
potential liquidity outflow
```

This links directly to EAD.

---

# 32. Credit Risk and Liquidity Risk Meet at RCFs

Borrower stress:

```text
borrower cash flow weakens
        ↓
draws RCF
        ↓
bank EAD ↑
        +
bank cash outflow ↑
```

One event increases:

```text
credit risk
+
liquidity risk
```

---

# 33. Margin Calls

Derivative position moves against bank.

Counterparty demands:

```text
cash / collateral now
```

This can create sudden outflow.

Example:

```text
£500m margin call
```

The accounting loss may be manageable.

But the immediate liquidity requirement can be severe.

---

# 34. Collateral Calls

Secured funding / derivatives may require additional collateral when:

```text
asset values fall
rating deteriorates
haircuts increase
```

Need:

```text
unencumbered collateral
```

ready to post.

---

# 35. Encumbered vs Unencumbered Assets

## Encumbered

Already pledged.

Cannot freely reuse.

## Unencumbered

Available for:

- sale
- repo
- central-bank funding
- collateral posting

Liquidity management cares about **usable** assets.

Not only total assets.

---

# 36. Asset Encumbrance

Suppose:

```text
Government bonds   £20bn
```

but:

```text
£15bn already pledged
```

Only:

```text
£5bn
```

may be freely available.

So:

```text
asset ownership
≠
liquidity availability
```

---

# 37. Monetisation

A liquidity asset is useful only if the bank can actually convert it to cash.

Operational questions:

```text
Can we sell it?
Can we repo it?
Can we pledge it to central bank?
Is documentation ready?
Is collateral already pledged?
Can settlement happen fast enough?
```

Liquidity is operational.

Not just theoretical.

---

# 38. Net Cash Outflow

Simplified:

```text
Net Outflow
=
Stressed Outflows
−
Recognized Inflows
```

But inflows are subject to prudential limits.

Reason:

> bank should not assume all incoming cash arrives perfectly during stress.

---

# 39. LCR Worked Example

Assume:

```text
Eligible HQLA             £60bn
Stressed outflows         £80bn
Recognized inflows        £25bn
```

Net outflows:

```text
£55bn
```

LCR:

```text
60 / 55
=
109%
```

Passes 100%.

Headroom:

```text
9 percentage points
```

---

# 40. LCR Headroom

Bank does not normally want to operate exactly at:

```text
100.0%
```

because:

```text
daily flows change
markets move
deposits move
haircuts change
```

Internal risk appetite typically maintains headroom above the regulatory minimum.

---

# 41. LCR Is Short-Term

Time horizon:

```text
30 days
```

LCR answers:

> Can the bank survive an acute short-term stress?

But a bank could pass LCR while funding itself badly over one year.

That is why NSFR exists.

---

# 42. NSFR — Net Stable Funding Ratio

**NSFR = Net Stable Funding Ratio**

Question:

> Is the bank funding long-term / less-liquid assets with sufficiently stable funding over a one-year horizon?

Formula:

```text
NSFR
=
Available Stable Funding — ASF
──────────────────────────────
Required Stable Funding — RSF
```

---

# 43. NSFR Minimum

Core requirement:

```text
NSFR ≥ 100%
```

Example:

```text
ASF    £110bn
RSF    £100bn
```

```text
NSFR
=
110%
```

---

# 44. ASF — Available Stable Funding

ASF asks:

> How stable is the bank's funding source over roughly one year?

More stable sources receive higher ASF factors.

Examples of relatively stable funding:

```text
capital
long-term debt
stable retail deposits
```

Short-term volatile wholesale funding receives less stable treatment.

---

# 45. RSF — Required Stable Funding

RSF asks:

> How much stable funding does each asset / exposure require?

Less-liquid / longer-dated assets generally require more stable funding.

Examples:

```text
long-term loans
illiquid assets
encumbered assets
```

require more stable funding than highly liquid short-term assets.

---

# 46. NSFR Logic

Bad structure:

```text
30-year mortgages
funded heavily by
overnight wholesale borrowing
```

Even if today's LCR looks acceptable:

```text
structural funding mismatch
```

NSFR pushes banks toward:

```text
longer / stickier funding
for
longer / less-liquid assets
```

---

# 47. LCR vs NSFR

| | LCR | NSFR |
|---|---|---|
| Horizon | 30 days | ~1 year |
| Main question | Can we survive acute outflows? | Is funding structure stable? |
| Numerator | HQLA | ASF |
| Denominator | Net stressed cash outflows | RSF |
| Main risk | Short-term liquidity shock | Structural funding mismatch |

Think:

```text
LCR
→ emergency survival
```

```text
NSFR
→ funding architecture
```

---

# 48. Passing LCR Does Not Guarantee Passing NSFR

Example:

Bank holds:

```text
large HQLA buffer
```

so:

```text
LCR = 130%
```

But funds long-term loans with unstable short-term wholesale money.

Then:

```text
NSFR may be weak
```

Short-term liquid.

Structurally unstable.

---

# 49. Passing NSFR Does Not Guarantee Passing LCR

Bank has strong long-term funding.

But sudden:

```text
deposit run
+
margin calls
```

may still create 30-day stress.

So both metrics are needed.

---

# 50. Funding Maturity Ladder

Bank maps funding by maturity:

```text
Overnight
< 1 week
1 week–1 month
1–3 months
3–6 months
6–12 months
> 1 year
```

Purpose:

> identify maturity cliffs.

---

# 51. Funding Cliff

Example:

```text
Wholesale debt maturity

Jan    £1bn
Feb    £1bn
Mar    £8bn
Apr    £1bn
```

March is a funding cliff.

If markets close:

```text
£8bn refinance need
```

becomes dangerous.

---

# 52. Survival Horizon

Internal stress metric:

> How long can the bank meet obligations before liquidity resources are exhausted?

Example:

```text
Survival horizon
=
75 days
```

This complements LCR.

---

# 53. Liquidity Stress Testing

Internal liquidity stress can be more severe / tailored than regulatory LCR.

Possible scenarios:

```text
Idiosyncratic stress
Market-wide stress
Combined stress
```

---

# 54. Idiosyncratic Stress

Problem specific to one bank.

Examples:

```text
credit-rating downgrade
fraud scandal
large loss
cyber incident
confidence crisis
```

Possible effects:

```text
deposit run
wholesale funding closes
collateral requirements rise
```

---

# 55. Market-Wide Stress

Entire system affected.

Examples:

```text
market crash
sovereign shock
pandemic
financial crisis
```

Problem:

```text
asset liquidity worsens
funding markets close
many banks need cash simultaneously
```

---

# 56. Combined Stress

Most dangerous:

```text
bank-specific problem
+
market-wide stress
```

Example:

```text
bank downgrade
during
system-wide funding crisis
```

Funding disappears while asset markets are also weak.

---

# 57. Liquidity Stress Transmission

Example:

```text
Rumour / downgrade
      ↓
Corporate deposits leave
      ↓
Wholesale funding not rolled
      ↓
RCF customers draw
      ↓
Margin calls rise
      ↓
HQLA consumed
      ↓
LCR falls
      ↓
Contingency actions triggered
```

---

# 58. ILAAP

**ILAAP = Internal Liquidity Adequacy Assessment Process**

The bank asks:

```text
What liquidity risks do we face?
How much liquidity do we need?
Can we survive severe stress?
Are our funding sources stable?
Can we actually monetise assets?
What contingency actions are available?
```

---

# 59. ICAAP vs ILAAP

Permanent distinction:

```text
ICAAP
→ capital adequacy
```

```text
ILAAP
→ liquidity adequacy
```

ICAAP:

```text
Can losses be absorbed?
```

ILAAP:

```text
Can cash obligations be met?
```

---

# 60. ILAAP Is Broader Than LCR + NSFR

Wrong:

```text
LCR > 100%
NSFR > 100%
→ liquidity risk solved
```

ILAAP also considers:

- funding concentration
- intraday liquidity
- asset monetisation
- collateral
- stress testing
- survival horizon
- risk appetite
- contingency funding
- governance
- transfer restrictions
- currency risk

---

# 61. Liquidity Risk Identification

Typical risks:

```text
Retail deposit runoff
Wholesale funding concentration
Maturity concentration
Collateral calls
Undrawn commitments
Intraday liquidity
Currency mismatch
Asset encumbrance
Market liquidity
Cross-entity transfer restrictions
```

---

# 62. Intraday Liquidity

Banks must settle payments throughout the day.

Example:

```text
Large payment due at 10:00
Incoming payment arrives at 16:00
```

End-of-day cash may be fine.

But at 10:00:

```text
liquidity shortfall
```

Intraday liquidity matters.

---

# 63. Currency Liquidity

Bank may have:

```text
plenty of GBP
```

but urgent obligation in:

```text
USD
```

FX markets may be stressed.

So liquidity must sometimes be assessed by:

```text
significant currency
```

not only consolidated total.

---

# 64. Entity-Level Liquidity

Group:

```text
Parent bank
Subsidiary A
Subsidiary B
```

Group may have excess cash overall.

But legal / regulatory restrictions may prevent cash moving freely.

So:

```text
group liquidity
≠
cash available to every legal entity
```

---

# 65. Trapped Liquidity

Example:

```text
£5bn cash
in overseas subsidiary
```

but local rules restrict dividend / transfer.

Then parent cannot assume full access.

This resembles structural subordination in credit risk:

```text
location of cash matters
```

---

# 66. Liquidity Risk Appetite

Board-approved limits may include:

```text
Minimum LCR
Minimum NSFR
Minimum survival horizon
Maximum wholesale funding concentration
Maximum maturity gap
Minimum unencumbered collateral
```

Regulatory minimum is only one boundary.

---

# 67. Early Warning Indicators — Liquidity

Examples:

```text
Large deposit withdrawals
Deposit concentration rising
LCR falling rapidly
Wholesale spreads widening
Bond issuance fails
Collateral calls increase
Asset encumbrance rises
Rating outlook worsens
RCF drawings spike
```

Pattern matters more than one isolated signal.

---

# 68. Funding Spread

Bank normally borrows at:

```text
reference rate + 50 bps
```

Now market demands:

```text
reference rate + 250 bps
```

Even if funding still exists:

```text
market is signalling stress
```

Funding cost is an early-warning indicator.

---

# 69. Credit Rating Downgrade and Liquidity

Downgrade can trigger:

```text
higher funding cost
reduced market access
deposit outflow
collateral calls
derivative margin requirements
```

So credit standing of the **bank itself** directly affects liquidity.

---

# 70. Contingency Funding Plan — CFP

When normal liquidity management is not enough:

```text
Contingency Funding Plan
```

sets out:

- escalation
- actions
- decision rights
- communication
- funding options

Think:

```text
liquidity emergency playbook
```

---

# 71. Contingency Actions

Possible:

```text
use cash buffer
sell HQLA
repo securities
draw central-bank facilities
raise secured funding
reduce new lending
increase deposit pricing
sell assets
restrict discretionary outflows
```

Need to know:

```text
how much cash?
how fast?
at what cost?
```

---

# 72. Central Bank Facilities

Central bank can provide liquidity against eligible collateral.

But bank needs:

```text
eligible assets
documentation
operational readiness
systems
settlement capability
```

A theoretical facility is useless if the bank cannot access it quickly.

---

# 73. Operational Readiness

Liquidity stress can happen in hours.

Need pre-positioned capability:

```text
collateral identified
legal docs complete
accounts ready
systems tested
people know process
```

This is why ILAAP includes **operational monetisation capability**.

---

# 74. Liquidity Contingency Levels

A bank may use escalation levels:

```text
Normal
  ↓
Heightened monitoring
  ↓
Liquidity stress
  ↓
Crisis
```

Each level triggers:

```text
more frequent reporting
higher governance
specific actions
```

---

# 75. ALCO — Asset and Liability Committee

**ALCO = Asset and Liability Committee**

Typically oversees:

- liquidity
- funding
- interest-rate risk
- balance-sheet structure
- capital / treasury topics

ALCO is a key governance forum connecting:

```text
Treasury
Finance
Risk
Business
```

---

# 76. Treasury Role

Treasury manages:

```text
cash
funding
HQLA
wholesale issuance
collateral
central-bank access
```

Treasury operates liquidity day to day.

---

# 77. Risk Role

Risk sets / monitors:

```text
liquidity risk appetite
limits
stress methodology
challenge
ILAAP framework
```

Risk should independently challenge Treasury assumptions.

---

# 78. Finance Role

Finance supports:

```text
balance-sheet data
funding balances
forecast
accounting values
regulatory reporting
```

Liquidity reporting depends on accurate balance-sheet data.

---

# 79. Business Role

Business activity changes liquidity.

Examples:

```text
new mortgage originations
→ cash outflow
```

```text
corporate deposit campaign
→ funding inflow
```

```text
new RCF commitments
→ contingent future outflow
```

Business plans must be reflected in liquidity planning.

---

# 80. Credit Risk Can Create Liquidity Risk

Corporate borrowers deteriorate.

They draw:

```text
committed RCFs
```

Bank:

```text
EAD ↑
+
cash outflow ↑
```

Retail stress:

```text
credit-card utilisation ↑
```

Again:

```text
EAD ↑
+
liquidity usage ↑
```

---

# 81. Liquidity Risk Can Create Credit Risk

Bank tightens lending because liquidity is scarce.

Borrower:

```text
cannot refinance
```

Then:

```text
borrower default risk ↑
```

System-wide funding stress can therefore worsen customer credit risk.

---

# 82. Liquidity Risk Can Create Market Risk

Bank urgently sells securities:

```text
market price weak
→ realized loss
```

Liquidity stress becomes market loss.

---

# 83. Liquidity Risk Can Create Capital Risk

Forced-sale loss:

```text
P&L ↓
→ CET1 ↓
```

or bank franchise weakens.

So:

```text
Liquidity
→ Market / Credit loss
→ Capital
```

Risk families connect.

---

# 84. LCR Data Spine

Simplified:

```text
Balance sheet
      ↓
Asset eligibility
      ↓
HQLA level / haircut
      ↓
Deposit classification
      ↓
Runoff rates
      ↓
Commitments / contingent outflows
      ↓
Inflows
      ↓
30-day net outflow
      ↓
LCR
```

---

# 85. NSFR Data Spine

```text
Liabilities / capital
      ↓
Funding type
      ↓
Residual maturity
      ↓
ASF factor
      ↓
Available Stable Funding
```

and:

```text
Assets / off-balance items
      ↓
Asset type
      ↓
Liquidity / maturity
      ↓
RSF factor
      ↓
Required Stable Funding
```

Then:

```text
ASF / RSF
=
NSFR
```

---

# 86. Key Liquidity Data Fields

Typical:

```text
customer_type
deposit_type
deposit_balance
deposit_stability_flag
maturity_date
currency
funding_source
secured_flag
collateral_id
asset_type
HQLA_level
haircut
encumbrance_flag
drawn_amount
undrawn_commitment
cash_inflow
cash_outflow
runoff_rate
ASF_factor
RSF_factor
reporting_date
```

Classification errors can materially alter ratios.

---

# 87. Deposit Classification Is Critical

Example:

```text
Deposit £1bn
```

Treatment depends on:

```text
retail?
corporate?
operational?
stable?
less stable?
```

Wrong classification:

```text
wrong runoff
→ wrong denominator
→ wrong LCR
```

---

# 88. HQLA Classification Is Critical

Security worth:

```text
£500m
```

Wrongly tagged as eligible HQLA:

```text
LCR overstated
```

Wrongly tagged ineligible:

```text
LCR understated
```

Need:

```text
security
→ eligibility
→ level
→ haircut
→ final HQLA value
```

---

# 89. Encumbrance Data Is Critical

Asset:

```text
£1bn sovereign bond
```

If already pledged:

```text
may not be freely available
```

Wrong encumbrance status can overstate usable liquidity.

---

# 90. Maturity Data Is Critical

NSFR depends heavily on:

```text
residual maturity
```

Wrong maturity date:

```text
wrong ASF / RSF treatment
→ wrong NSFR
```

---

# 91. Reconciliation

Good liquidity reporting reconciles:

```text
general ledger / source systems
        ↓
liquidity data mart
        ↓
LCR / NSFR engine
        ↓
regulatory return
```

Need to explain:

```text
missing balances
duplicates
classification adjustments
manual overrides
```

---

# 92. LCR Movement Analysis

Suppose:

```text
LCR
140%
→
118%
```

Possible drivers:

```text
deposit outflows
HQLA decline
margin calls
RCF drawings
new wholesale maturities
asset encumbrance
classification change
```

Need a bridge.

---

# 93. NSFR Movement Analysis

Suppose:

```text
NSFR
115%
→
103%
```

Possible:

```text
long-term loan growth
short-term wholesale funding ↑
stable deposits ↓
long-term debt matures
asset mix becomes less liquid
```

Again:

```text
ratio movement
must map to real balance-sheet movement
```

---

# 94. Common Trap — Capital = Liquidity

Wrong.

```text
Capital
→ loss absorption
```

```text
Liquidity
→ cash availability
```

---

# 95. Common Trap — HQLA = Cash

Wrong.

Cash / reserves can be HQLA.

But HQLA also includes eligible securities.

---

# 96. Common Trap — All Deposits Are Stable

Wrong.

Stability depends on depositor and product behaviour.

Large uninsured / concentrated deposits can move quickly.

---

# 97. Common Trap — LCR > 100% Means No Liquidity Risk

Wrong.

LCR is one standardized 30-day metric.

Need:

```text
funding structure
concentration
intraday risk
currency
asset monetisation
stress testing
```

---

# 98. Common Trap — NSFR > 100% Means No Liquidity Risk

Wrong.

NSFR addresses structural one-year funding.

Short-term runs can still happen.

---

# 99. Common Trap — LCR Must Never Fall Below 100%

Wrong.

During actual stress, the liquidity buffer is intended to be used.

The ratio can fall below 100% while the bank manages the stress and engages supervisors as applicable.

---

# 100. Common Trap — Undrawn RCF = No Current Risk

Wrong.

It can create:

```text
future credit exposure
+
future liquidity outflow
```

---

# 101. Common Trap — Owned Asset = Available Liquidity

Wrong.

Asset may be:

```text
encumbered
illiquid
ineligible
operationally inaccessible
```

---

# 102. Common Trap — Group Cash = Entity Cash

Wrong.

Legal / regulatory barriers can trap liquidity.

---

# 103. Common Trap — ILAAP = LCR + NSFR Report

Wrong.

ILAAP is a complete internal liquidity adequacy assessment.

Ratios are only components.

---

# 104. Common Trap — Central-Bank Facility = Automatic Cash

Wrong.

Need:

```text
eligible collateral
documentation
operations
settlement readiness
```

---

# 105. Full Liquidity Flow

```text
BANK BUSINESS MODEL
       ↓
Assets
Loans / securities
       ↓
Funding
Deposits / wholesale / secured
       ↓
Maturity + currency mismatch
       ↓
Cash-flow profile
       ↓
Liquidity buffer / HQLA
       ↓
LCR
30-day survival
       ↓
NSFR
1-year structural funding
       ↓
Internal liquidity stress
       ↓
Survival horizon
       ↓
ILAAP
       ↓
Risk appetite
       ↓
Contingency Funding Plan
       ↓
ALCO / Board / Supervisor
```

---

# 106. Retail → Liquidity Connection

Retail deposits:

```text
major funding source
```

Retail loans:

```text
mortgages / personal loans
→ long-dated assets
```

Stress can create:

```text
deposit runoff
+
credit-card drawings
```

Retail is therefore both:

```text
funding source
+
liquidity demand
```

---

# 107. SME → Liquidity Connection

SMEs can provide:

```text
business deposits
```

and consume:

```text
overdraft / working-capital lines
```

During stress:

```text
deposit balances ↓
+
facility drawings ↑
```

double liquidity effect.

---

# 108. Corporate → Liquidity Connection

Corporate customers can hold:

```text
large concentrated deposits
```

and simultaneously have:

```text
large committed RCFs
```

Worst case:

```text
corporate deposits leave
while
corporate borrowers draw RCFs
```

This is a major bank liquidity stress channel.

---

# 109. ICAAP → ILAAP Connection

07 asked:

```text
Can we absorb losses?
```

08 asks:

```text
Can we survive cash outflows?
```

But in stress:

```text
liquidity stress
→ funding cost / forced sale
→ loss
→ capital stress
```

and:

```text
capital stress
→ confidence / rating weakness
→ liquidity stress
```

So ICAAP and ILAAP must be internally coherent.

---

# 110. Fast Diagnostic — When You See a Liquidity Number

Ask:

1. **What reporting date?**
2. **Which legal entity / group?**
3. **Which currency?**
4. **What is the funding mix?**
5. **How concentrated are deposits?**
6. **What funding matures soon?**
7. **What HQLA is available?**
8. **What is encumbered?**
9. **What runoff assumptions apply?**
10. **What undrawn commitments can be called?**
11. **What margin / collateral calls exist?**
12. **What is LCR?**
13. **What drives the LCR movement?**
14. **What is NSFR?**
15. **What drives the NSFR movement?**
16. **What is survival horizon?**
17. **Which stress scenario is used?**
18. **Which contingency actions are credible?**
19. **Can assets actually be monetised operationally?**
20. **Does the result reconcile to source systems?**

If these are clear:

> the bank's liquidity position becomes explainable.

---

# 111. One-Page Recall Sheet

## Capital vs Liquidity

```text
Capital
→ absorb losses

Liquidity
→ meet cash obligations
```

## LCR

```text
HQLA
────────────────
30-day stressed
net cash outflow

≥ 100%
in normal conditions
```

## NSFR

```text
Available Stable Funding
────────────────────────
Required Stable Funding

≥ 100%
```

## Horizons

```text
LCR
→ 30-day acute stress

NSFR
→ 1-year structural funding
```

## ILAAP

```text
Risk identification
→ Funding profile
→ HQLA
→ Stress
→ Survival horizon
→ Contingency actions
→ Governance
```

## Never Confuse

```text
Capital ≠ Liquidity

HQLA ≠ Cash only

Owned asset ≠ usable liquidity

Group cash ≠ entity cash

LCR ≠ NSFR

LCR > 100% ≠ zero liquidity risk

NSFR > 100% ≠ zero short-term run risk

ILAAP ≠ LCR + NSFR report

Undrawn commitment ≠ no liquidity risk
```

---

# 112. Current UK Regulatory Note — 25 August 2026

Core position:

```text
LCR
→ minimum 100% in normal conditions
→ HQLA may be used in stress
```

```text
NSFR
→ minimum 100% on an ongoing basis
```

Recent UK evidence:

```text
Major UK banks
May 2026 aggregate 3-month moving-average LCR
≈ 142%
```

The PRA is also modernising parts of its liquidity policy framework during 2026, including supervisory expectations around:

```text
ILAAP governance
asset monetisation
liquidity risk appetite
contingency planning
```

and has consulted on further low-impact liquidity-rule amendments intended for 2027.

So:

> **The mechanisms in this note are durable; current UK supervisory wording should always be checked against the operative PRA Rulebook and supervisory statements.**

---

# 113. The One Sentence to Retain

> **Liquidity risk is the risk that a bank cannot meet cash obligations when due: LCR tests whether HQLA can cover severe 30-day net outflows, NSFR tests whether longer-term assets are supported by stable one-year funding, and ILAAP brings those ratios together with concentration, collateral, monetisation, stress testing, survival horizon, governance, and contingency actions to determine whether the bank can actually survive a funding crisis.**
