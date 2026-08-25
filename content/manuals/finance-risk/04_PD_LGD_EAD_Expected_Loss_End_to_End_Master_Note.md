# 04 — PD, LGD, EAD & Expected Loss — End-to-End Master Note

> **Mental model:** Every credit loss can be decomposed into three separate questions:
>
> ```text
> Will default happen?        → PD
> If it happens, how bad?     → LGD
> How much is at risk then?   → EAD
> ```
>
> Put them together:
>
> ```text
> Expected Loss = PD × LGD × EAD
> ```

---

# 1. Start With the Loss Event

A bank lends money.

Three uncertain things exist:

```text
1. Default may or may not happen
2. If default happens, recoveries may be high or low
3. Exposure at that moment may differ from today's balance
```

That is why one generic “risk score” is not enough.

Credit risk is decomposed into:

```text
PD  → likelihood
LGD → severity
EAD → size
```

---

# 2. The Core Equation

```text
Expected Loss
=
PD × LGD × EAD
```

Example:

```text
PD   = 2%
LGD  = 40%
EAD  = £500,000
```

```text
EL
=
0.02 × 0.40 × £500,000
=
£4,000
```

Interpretation:

> Across a large population of equivalent exposures, the simplified expected credit loss over the stated horizon is £4,000 per exposure.

It does **not** mean the bank will lose exactly £4,000 on this borrower.

---

# 3. Expected Loss Rate vs Expected Loss Amount

Do not confuse:

```text
PD × LGD
```

with:

```text
PD × LGD × EAD
```

Example:

```text
PD   2%
LGD  40%
```

Then:

```text
Expected Loss Rate
=
2% × 40%
=
0.8%
```

If:

```text
EAD = £500,000
```

then:

```text
Expected Loss Amount
=
0.8% × £500,000
=
£4,000
```

### Permanent distinction

```text
PD × LGD
→ rate

PD × LGD × EAD
→ currency amount
```

---

# 4. Why the Three Parameters Must Stay Separate

Suppose two borrowers have the same EL.

### Borrower A

```text
PD   1%
LGD  80%
EAD  £1m

EL = £8,000
```

### Borrower B

```text
PD   4%
LGD  20%
EAD  £1m

EL = £8,000
```

Same EL.

Very different risk.

```text
A
→ low default likelihood
→ severe loss if default happens

B
→ higher default likelihood
→ stronger recovery if default happens
```

The decomposition tells the bank **why** risk exists.

---

# 5. PD — Probability of Default

> **PD = probability that the borrower defaults during a defined horizon under a defined default definition.**

Three words are load-bearing:

```text
Probability
Horizon
Default definition
```

A PD without those is incomplete.

---

# 6. PD Is Not “Chance of Missing One Payment”

A borrower can:

```text
miss one instalment
```

without necessarily being in formal default.

PD therefore estimates:

> probability of entering the bank's governed default state.

Default is broader than:

```text
one late payment
```

and narrower than:

```text
any deterioration
```

---

# 7. PD Needs a Horizon

Example:

```text
1-year PD = 2%
```

means:

> Probability of default over the next one year is 2%, under the stated methodology.

A lifetime PD is a different object.

```text
1-year PD
≠
lifetime PD
```

Do not write a data field simply as:

```text
PD
```

without asking:

```text
What horizon?
What model?
What date?
What use?
```

---

# 8. PD Is a Population Estimate

Suppose:

```text
10,000 similar borrowers
1-year PD = 2%
```

Then roughly:

```text
200 defaults
```

may be expected over the horizon.

PD does not predict with certainty which 200.

For one borrower:

```text
default
or
no default
```

For a portfolio:

```text
probability becomes measurable
```

That is why credit risk is fundamentally a portfolio discipline.

---

# 9. PD Can Come From Different Models

Depending on asset class:

## Retail

```text
application score
behavioural score
bureau
delinquency
utilisation
```

## SME

```text
financial ratios
owner / director information
bank conduct
sector
qualitative assessment
```

## Corporate

```text
business risk
financial risk
leverage
coverage
liquidity
industry
management
market signals
```

Same concept:

```text
PD
```

Different machinery.

---

# 10. Score ≠ Rating ≠ PD

These can be connected but are not interchangeable.

Example:

```text
Score = 742
```

may map to:

```text
Risk Band B
```

which may map to:

```text
PD = 1.8%
```

So:

```text
Score
→ ranking / model output

Rating / grade
→ governed risk classification

PD
→ probability attached to the risk level
```

---

# 11. Rating Grade and PD

Corporate example:

```text
Grade 1   strongest
Grade 2
Grade 3
...
Grade 8   weak
Grade 9   near default
Grade 10  default
```

Each performing grade may map to a PD.

Example:

```text
Grade 4
→ PD = 0.8%

Grade 6
→ PD = 2.5%
```

If the borrower migrates:

```text
Grade 4
→ Grade 6
```

then:

```text
credit quality worsened
→ PD rises
```

---

# 12. PD Drivers — Retail

Possible retail PD signals:

```text
missed payments
DPD
credit bureau deterioration
utilisation
recent borrowing
income stress
account behaviour
previous delinquency
```

### Credit-card example

```text
6 months ago
Utilisation      25%
Payments         full
DPD              0
```

Now:

```text
Utilisation      98%
Payments         minimum
Cash advances    frequent
DPD              10
```

Formal default may not yet exist.

But PD may rise sharply.

---

# 13. PD Drivers — SME

Typical:

```text
Debt / EBITDA
DSCR
revenue trend
working-capital deterioration
owner / management quality
bank-account conduct
customer concentration
sector risk
tax arrears
```

Example:

```text
DSCR       1.6x → 1.2x
Receivable days 50 → 85
OD utilisation  70% → 98%
```

Together:

```text
risk ↑
→ rating may weaken
→ PD ↑
```

---

# 14. PD Drivers — Corporate

Typical:

```text
business position
industry cycle
leverage
coverage
free cash flow
liquidity
debt maturity
refinancing risk
management policy
external rating
market spreads
```

Example:

```text
Net leverage      2.5x → 4.2x
FCF               positive → negative
Bond spread       doubles
Rating outlook    negative
```

Strong deterioration pattern.

---

# 15. PD — Through-the-Cycle vs Point-in-Time

Two important concepts.

## Through-the-Cycle — TTC

Designed to be more stable across economic cycles.

```text
good year
bad year
recession
recovery
```

Risk estimate moves less sharply.

## Point-in-Time — PIT

More sensitive to current conditions.

```text
economy weakens
→ PIT PD rises faster
```

### Core intuition

```text
TTC
→ smoother

PIT
→ more current-condition sensitive
```

Do not assume every PD is calibrated the same way.

---

# 16. PD — Observed Default Rate vs Modelled PD

Suppose:

```text
Model PD = 2%
```

and over one year:

```text
Observed default rate = 2.3%
```

These are different objects.

```text
PD
→ ex-ante estimate

Default rate
→ ex-post observed outcome
```

A model can be assessed by comparing them across enough observations.

---

# 17. LGD — Loss Given Default

> **LGD = proportion of EAD that the bank ultimately loses after default, after recoveries and relevant costs.**

Simplified:

```text
LGD
=
Loss
────
EAD
```

or:

```text
LGD
≈
1 − Recovery Rate
```

---

# 18. Recovery Rate

If:

```text
EAD at default = £1,000,000
Net recovery   = £650,000
```

then:

```text
Recovery Rate
=
65%
```

and:

```text
LGD
=
35%
```

---

# 19. LGD Is Conditional on Default

PD asks:

```text
Will default happen?
```

LGD asks:

```text
Assuming default already happened,
how much is lost?
```

That means LGD should never be interpreted as:

> probability of losing money.

It is **severity**, not likelihood.

---

# 20. LGD Is Heavily Driven by Structure

Two facilities to the same borrower:

```text
Facility A
Senior secured

Facility B
Subordinated unsecured
```

Same obligor.

Potentially:

```text
Same PD
Different LGD
```

because recovery ranking differs.

---

# 21. LGD — Secured vs Unsecured

## Secured

Recovery may come from:

```text
collateral sale
+
cash collections
+
guarantees
```

Potentially lower LGD.

## Unsecured

Recovery relies more on:

```text
collections
settlement
general estate recovery
```

Potentially higher LGD.

But secured does **not** automatically mean low LGD.

Collateral can lose value.

---

# 22. Mortgage LGD

Mortgage:

```text
EAD
− property net recovery
=
loss
```

Example:

```text
EAD                    £250,000
Property sale          £230,000
Legal / selling costs   £15,000
Net recovery           £215,000
Loss                    £35,000
```

```text
LGD
=
35,000 / 250,000
=
14%
```

Main drivers:

```text
LTV
property value
sale discount
legal costs
time to recovery
```

---

# 23. Personal Loan / Credit Card LGD

Unsecured exposure.

Example:

```text
EAD            £10,000
Collections     £2,500
Loss            £7,500
```

```text
LGD = 75%
```

Main drivers:

- collection effectiveness
- borrower ability to cure
- insolvency outcome
- debt sale
- recovery cost
- time to recovery

---

# 24. SME LGD

SME may have:

- property
- machinery
- receivables
- inventory
- guarantees

Example:

```text
EAD                     £800k
Property net recovery   £350k
Machine recovery        £100k
Guarantor recovery       £50k
Total net recovery      £500k
Loss                    £300k
```

```text
LGD
=
£300k / £800k
=
37.5%
```

---

# 25. Corporate LGD

Corporate LGD can depend on enterprise-value recovery.

Example:

```text
Distressed enterprise value     £700m

Secured debt                     £400m
Senior unsecured                 £250m
Subordinated                     £200m
```

After secured creditors:

```text
£300m remains
```

Senior unsecured:

```text
claim £250m
→ potentially strong recovery
```

Remaining:

```text
£50m
```

Subordinated:

```text
£50m / £200m
= 25% recovery

LGD ≈ 75%
```

Same borrower.

Different LGD by facility class.

---

# 26. Book Value ≠ Recovery Value

Collateral has several possible values:

```text
Book value
Market value
Forced-sale value
Net recovery value
```

They are not equal.

Credit analysis focuses on:

> **what the bank can realistically recover after default**

not what the asset is carried at in accounts.

---

# 27. Recovery Costs Matter

Suppose:

```text
Gross collateral sale     £500k
Legal costs                £40k
Selling costs              £20k
Other recovery costs       £10k
```

Net recovery:

```text
£430k
```

LGD should be based on **net economic recovery**, not gross sale proceeds.

---

# 28. Recovery Timing Matters

£100 today is not economically identical to £100 recovered years later.

Example:

```text
Recovery A
£500k in 3 months

Recovery B
£500k in 5 years
```

Same nominal amount.

Different economic value.

So real LGD frameworks may reflect:

```text
recovery timing
+
discounting
+
costs
```

---

# 29. Cure vs Recovery

These are different.

## Cure

Borrower returns to acceptable payment status.

## Recovery

Cash collected after a default / distressed state.

Example:

```text
Borrower misses payments
→ default
→ restructuring
→ starts paying normally
→ cure
```

versus:

```text
Borrower defaults
→ collateral sold
→ cash received
→ recovery
```

---

# 30. EAD — Exposure at Default

> **EAD = amount the bank expects to be economically exposed to at the moment default occurs.**

This may equal today's balance.

Or it may not.

Depends on product mechanics.

---

# 31. EAD — Simple Amortising Loan

Personal loan:

```text
Current balance = £15,000
No redraw feature
```

Simple intuition:

```text
EAD
≈ expected outstanding balance at default
```

If default is near-term:

```text
EAD ≈ current balance
```

---

# 32. EAD — Mortgage

Standard amortising mortgage:

```text
Current balance     £240k
Future scheduled repayments
No undrawn commitment
```

EAD is mainly driven by:

```text
remaining balance path
+
timing of default
```

Less complex than revolving credit.

---

# 33. EAD — Revolving Exposure

Credit card:

```text
Limit       £10,000
Drawn        £6,000
Undrawn      £4,000
```

Borrower deteriorates.

Before default:

```text
draws another £2,000
```

Then:

```text
EAD = £8,000
```

So:

```text
Current balance ≠ EAD
```

---

# 34. CCF — Credit Conversion Factor

Simplified:

```text
EAD
=
Drawn
+
CCF × Undrawn
```

where:

> **CCF = proportion of undrawn commitment expected to be drawn before default.**

Example:

```text
Limit          £10,000
Drawn           £6,000
Undrawn         £4,000
CCF                50%
```

Then:

```text
EAD
=
6,000 + 0.50 × 4,000
=
£8,000
```

---

# 35. Why Borrowers Draw More Before Default

Stress often creates liquidity demand.

```text
Income / cash flow weakens
      ↓
borrower needs cash
      ↓
available credit is drawn
      ↓
exposure rises
      ↓
default occurs later
```

This applies to:

- credit cards
- overdrafts
- SME revolving lines
- corporate RCFs

That is why undrawn commitments cannot be ignored.

---

# 36. Corporate RCF EAD Example

```text
RCF limit      £500m
Drawn          £200m
Undrawn        £300m
CCF             60%
```

```text
EAD
=
200 + 0.60 × 300
=
£380m
```

Current drawn exposure:

```text
£200m
```

Potential risk at default:

```text
£380m
```

Large difference.

---

# 37. Trade / Guarantee EAD

A guarantee may be:

```text
off-balance-sheet today
```

but can become funded if called.

Example:

```text
Bank guarantee      £50m
Current cash paid    £0
```

If obligation is triggered:

```text
bank pays beneficiary
→ funded exposure appears
```

So EAD captures potential conversion into actual exposure.

---

# 38. Limit ≠ Balance ≠ EAD

Permanent distinction:

```text
Limit
→ maximum contractual borrowing

Balance / drawn
→ current funded exposure

EAD
→ expected exposure at default
```

Example:

```text
Limit       £100m
Drawn        £40m
EAD          £70m
```

All three are valid.

All three mean different things.

---

# 39. EAD Can Also Fall Over Time

Amortising exposure:

```text
Original balance   £1m
Year 1             £800k
Year 2             £600k
Year 3             £400k
```

If default occurs later:

```text
EAD may be lower
```

So EAD depends on:

```text
product
+
cash-flow schedule
+
drawdown behaviour
+
default timing
```

---

# 40. Put PD + LGD + EAD Together

Think:

```text
PD
How often?
```

```text
LGD
How severe?
```

```text
EAD
How large?
```

Then:

```text
Expected Loss
=
frequency × severity × exposure
```

This is the cleanest mental model in credit risk.

---

# 41. Same EAD, Different Risk

Two £1m exposures.

### Mortgage-backed loan

```text
PD   1%
LGD  15%
EAD  £1m

EL = £1,500
```

### Unsecured SME loan

```text
PD   3%
LGD  50%
EAD  £1m

EL = £15,000
```

Same exposure.

10x expected loss.

---

# 42. Same PD, Different Facility Risk

Same corporate borrower:

```text
PD = 2%
```

Facility A:

```text
Senior secured
LGD 20%
EAD £100m

EL = £0.4m
```

Facility B:

```text
Subordinated unsecured
LGD 70%
EAD £100m

EL = £1.4m
```

Same borrower risk.

Different recovery risk.

---

# 43. Same Borrower, Different EAD

Same company:

```text
Term loan
Outstanding £100m
No redraw
```

versus:

```text
RCF
Drawn £100m
Undrawn £200m
```

Same PD.

Potentially similar LGD.

But RCF can have much higher EAD.

---

# 44. Expected Loss Is Not Actual Loss

Expected:

```text
£4,000
```

Actual outcome for one borrower may be:

```text
£0
```

if no default.

Or:

```text
£200,000
```

if default + poor recovery.

Expected loss is the portfolio-average expectation.

Actual loss is realized experience.

---

# 45. Expected Loss vs Unexpected Loss

Expected loss:

> average credit loss the bank expects over time.

Unexpected loss:

> loss above that expectation in bad outcomes.

Simple intuition:

```text
Normal year
→ expected losses

Severe stress
→ losses far above average
```

This distinction eventually connects into:

```text
provisioning
vs
capital
```

but those are dedicated later notes.

---

# 46. PD / LGD / EAD Across Asset Classes

| Dimension | Retail | SME | Corporate |
|---|---|---|---|
| PD main drivers | bureau + behaviour | financials + owner + conduct | business + financial + industry + market |
| LGD main drivers | collateral / collections | collateral + guarantees + recovery | seniority + collateral + enterprise value |
| EAD complexity | high for cards / OD | high for revolvers | high for RCF / contingent lines |
| Rating style | scorecard-heavy | hybrid | analyst / rating-system heavy |
| Data granularity | account/customer | borrower/facility | obligor/group/facility |

---

# 47. Data You Need for PD

Typical:

```text
borrower_id
observation_date
model_id
model_version
rating_grade
score
PD
PD_horizon
default_definition
override_flag
```

Without these, a PD field is ambiguous.

---

# 48. Data You Need for LGD

Typical:

```text
facility_id
collateral_id
seniority
security_type
collateral_value
valuation_date
guarantee
recovery_cash_flow
recovery_cost
time_to_recovery
LGD
model_version
```

LGD is often the most data-intensive parameter.

---

# 49. Data You Need for EAD

Typical:

```text
facility_id
limit
drawn_amount
undrawn_amount
product_type
CCF
maturity
amortisation_schedule
utilisation
EAD
```

EAD cannot be understood without product mechanics.

---

# 50. Snapshot Date Matters

Suppose:

```text
PD = 2%
```

Question:

> As of what date?

Credit risk changes over time.

Example:

```text
31 Dec
PD 1.2%

31 Mar
PD 2.0%

30 Jun
PD 4.5%
```

So every risk parameter needs an **observation / reporting date**.

---

# 51. Model Version Matters

Suppose:

```text
PD Model v3
→ PD 1.8%
```

and after model change:

```text
PD Model v4
→ PD 2.4%
```

Without model version:

> you cannot explain why the number moved.

This becomes critical in:

- reconciliation
- backtesting
- audit
- regulatory reporting
- model monitoring

---

# 52. Override Matters

A model may produce:

```text
Grade 5
```

Analyst / authorized process may override to:

```text
Grade 6
```

Then:

```text
Final PD
```

should reflect the governed final rating.

Data needs:

```text
model_grade
final_grade
override_flag
override_reason
approver
date
```

---

# 53. Default Flag Matters

Once an obligor is in default:

```text
PD concept changes in practical use
```

because default has already happened.

Do not treat:

```text
performing PD
```

and:

```text
defaulted exposure status
```

as the same state.

---

# 54. Correlation Between Parameters

PD, LGD, and EAD are conceptually separate.

But in stress they can move together.

Example recession:

```text
PD ↑
because more borrowers fail
```

```text
LGD ↑
because collateral values fall
```

```text
EAD ↑
because revolving borrowers draw liquidity
```

So:

> bad environments can worsen all three simultaneously.

That is why portfolio losses can rise non-linearly.

---

# 55. Example — Mortgage Downturn

Before stress:

```text
PD   1%
LGD  10%
EAD  £250k
EL   £250
```

After unemployment rises and house prices fall:

```text
PD   3%
LGD  25%
EAD  £245k
```

```text
EL
=
0.03 × 0.25 × 245,000
=
£1,837.50
```

Expected loss rises by more than 7x.

Not because exposure changed much.

Because **likelihood + severity** both worsened.

---

# 56. Example — Credit Card Stress

Before stress:

```text
Limit         £10k
Drawn          £4k
CCF            40%
EAD            £6.4k
PD              4%
LGD            80%
```

```text
EL
=
4% × 80% × 6.4k
=
£204.80
```

After stress:

```text
Drawn          £7k
Undrawn        £3k
CCF            70%
EAD            £9.1k
PD              8%
LGD            85%
```

```text
EL
=
8% × 85% × 9.1k
=
£618.80
```

Risk worsened through **all three dimensions**.

---

# 57. Example — SME Deterioration

Initial:

```text
PD       2%
LGD     35%
EAD     £800k
```

```text
EL = £5,600
```

Later:

```text
DSCR falls
OD heavily drawn
property value falls
```

New:

```text
PD       5%
LGD     45%
EAD     £950k
```

```text
EL
=
5% × 45% × £950k
=
£21,375
```

Expected loss almost quadruples.

---

# 58. Example — Corporate Refinancing Stress

Initial:

```text
PD       1%
LGD     40%
EAD     £300m
```

```text
EL = £1.2m
```

After downgrade + RCF draw:

```text
PD       3%
LGD     45%
EAD     £450m
```

```text
EL
=
3% × 45% × £450m
=
£6.075m
```

A 5x increase.

---

# 59. Common Trap — PD Is Not a Loss Percentage

Wrong:

```text
PD = 3%
→ bank loses 3% of exposure
```

No.

PD only measures likelihood of default.

Loss severity is LGD.

---

# 60. Common Trap — LGD Is Not 1 − LTV

Wrong:

```text
LTV 70%
→ LGD 30%
```

No.

LGD depends on:

```text
default timing
collateral value
forced-sale haircut
costs
seniority
other claims
recovery timing
```

LTV may influence LGD.

It does not define it.

---

# 61. Common Trap — EAD Is Not Always the Limit

Wrong:

```text
Limit £100k
→ EAD £100k
```

Maybe.

But often:

```text
EAD
=
drawn + expected future drawing
```

which may be below the full limit.

---

# 62. Common Trap — EAD Is Not Always Current Balance

Wrong for revolving facilities.

Example:

```text
Current balance £40k
Expected EAD    £70k
```

because undrawn commitment may be used before default.

---

# 63. Common Trap — Same Acronym ≠ Same Calibration

A bank may have several PDs.

Example:

```text
Origination PD
Behavioural PD
Accounting PD
Capital PD
Stress PD
Vendor PD
```

All can legitimately differ.

Question is always:

> **PD for what use?**

Same principle for LGD and EAD.

---

# 64. Common Trap — Model Output ≠ Final Credit Decision

Model:

```text
PD 1.5%
```

Credit decision may still be:

```text
decline
```

because of:

- policy
- concentration
- affordability
- covenant
- collateral
- country risk
- fraud concern
- legal issue

Credit risk models inform decisions.

They do not automatically own them.

---

# 65. Common Trap — Better Collateral Does Not Reduce PD

Collateral mainly affects:

```text
LGD
```

not usually:

```text
borrower's underlying likelihood of default
```

A borrower can be highly likely to default while the bank still expects strong recovery.

Example:

```text
PD high
LGD low
```

possible.

---

# 66. Common Trap — Large Exposure Does Not Mean High PD

EAD measures size.

PD measures likelihood.

Example:

```text
Sovereign exposure
EAD huge
PD low
```

versus:

```text
small unsecured borrower
EAD small
PD high
```

Different risk dimensions.

---

# 67. Common Trap — Low EL Does Not Mean Low Tail Risk

A portfolio can have low average expected loss but still suffer severe stress losses.

Expected loss:

```text
average
```

does not capture all extreme outcomes.

That is why banks also care about:

- stress testing
- concentration
- unexpected loss
- capital

Later notes handle those separately.

---

# 68. The Parameter Flow

```text
BORROWER / OBLIGOR
      ↓
Credit assessment
      ↓
Score / rating
      ↓
PD
      ↓
Will default happen?
```

```text
FACILITY
      ↓
Security / seniority / collateral
      ↓
Recovery assumptions
      ↓
LGD
      ↓
If default happens, how severe?
```

```text
FACILITY MECHANICS
      ↓
Drawn
Undrawn
Limit
CCF
Amortisation
      ↓
EAD
      ↓
How much is exposed at default?
```

Then:

```text
PD × LGD × EAD
      ↓
EXPECTED LOSS
```

---

# 69. One Full Cross-Asset Example

Assume four exposures.

## Mortgage

```text
PD    1%
LGD  15%
EAD  £250k

EL = £375
```

## Personal Loan

```text
PD    4%
LGD  70%
EAD  £15k

EL = £420
```

## SME RCF

```text
PD    3%
LGD  40%
EAD  £800k

EL = £9,600
```

## Corporate RCF

```text
PD   1.5%
LGD  45%
EAD  £300m

EL = £2.025m
```

The equation is identical.

The mechanisms are different.

That is the key.

---

# 70. What Changes by Asset Class

## Retail

PD:

```text
behaviour + bureau
```

LGD:

```text
property / collections
```

EAD:

```text
balance / utilisation / CCF
```

## SME

PD:

```text
business + owner + cash flow
```

LGD:

```text
collateral + guarantees
```

EAD:

```text
term debt + working-capital lines
```

## Corporate

PD:

```text
enterprise + industry + capital structure
```

LGD:

```text
seniority + enterprise recovery
```

EAD:

```text
large commitments + RCF + contingents
```

---

# 71. What Does Not Change

Across all asset classes:

```text
PD
= likelihood of default
```

```text
LGD
= severity if default occurs
```

```text
EAD
= exposure when default occurs
```

```text
EL
= PD × LGD × EAD
```

That conceptual spine is universal.

---

# 72. Fast Diagnostic — When You See a Credit Parameter

Ask:

### PD

1. What borrower / obligor?
2. What horizon?
3. What default definition?
4. What model?
5. What version?
6. What observation date?
7. What rating / score produced it?
8. Was it overridden?
9. What use case?

### LGD

1. Which facility?
2. Secured or unsecured?
3. What seniority?
4. What collateral?
5. What valuation date?
6. What recovery costs?
7. What time to recovery?
8. What model / assumption set?

### EAD

1. Current drawn?
2. Undrawn?
3. Limit?
4. Revolving or amortising?
5. CCF?
6. Maturity?
7. Product type?
8. What observation date?

If those are not clear:

> the parameter is not fully understood.

---

# 73. One-Page Recall Sheet

## Core

```text
PD
→ likelihood

LGD
→ severity

EAD
→ size
```

```text
EL
=
PD × LGD × EAD
```

## PD

```text
Needs:
borrower
horizon
default definition
model
date
```

## LGD

```text
Driven by:
collateral
seniority
guarantees
recovery costs
recovery timing
```

## EAD

```text
Driven by:
drawn balance
undrawn commitment
CCF
amortisation
product mechanics
```

## Never confuse

```text
Score ≠ PD
Rating ≠ PD
PD ≠ loss severity
LGD ≠ probability
Limit ≠ balance
Balance ≠ EAD
PD × LGD ≠ EL amount
Collateral strength ≠ low PD
Same acronym ≠ same calibration
```

---

# 74. The One Sentence to Retain

> **PD tells us how likely default is, LGD tells us how much we lose if default occurs, EAD tells us how much will be exposed when it occurs, and expected loss combines all three — but the meaning of each parameter is only complete when its horizon, model, date, facility, and use case are known.**
