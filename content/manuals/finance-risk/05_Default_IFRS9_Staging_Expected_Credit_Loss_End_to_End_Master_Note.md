# 05 — Default, IFRS 9 Staging & Expected Credit Loss — End-to-End Master Note

> **Mental model:** IFRS 9 does not wait for default before recognizing credit loss.
>
> It asks:
>
> ```text
> Has credit risk increased since origination?
>        ↓
> If yes, how much future credit loss should be recognized now?
> ```
>
> The core progression:
>
> ```text
> Stage 1
> Performing
> 12-month ECL
>        ↓
> Significant increase in credit risk
>        ↓
> Stage 2
> Still not defaulted
> Lifetime ECL
>        ↓
> Credit-impaired / default
>        ↓
> Stage 3
> Lifetime ECL
> ```
>
> **Key distinction:**  
> **Credit deterioration is recognized before default.**

---

# 1. Why IFRS 9 Exists

A bank lends today.

The borrower may default later.

If the bank waits until default to recognize loss:

```text
economic deterioration happens first
        ↓
accounting loss appears much later
```

That is too late.

IFRS 9 therefore uses **Expected Credit Loss — ECL**.

The bank recognizes expected future credit loss based on the credit risk visible **today**.

---

# 2. Expected Loss vs IFRS 9 ECL

From Note 04:

```text
Simplified Expected Loss
=
PD × LGD × EAD
```

Useful credit-risk foundation.

But IFRS 9 ECL is richer.

It can require:

```text
multiple future periods
+
forward-looking PDs
+
changing EAD
+
changing LGD
+
discounting
+
macroeconomic scenarios
+
scenario weights
```

So:

```text
PD × LGD × EAD
```

is the **credit-loss engine**.

IFRS 9 adds:

```text
time
+
forward-looking scenarios
+
staging
+
discounting
```

---

# 3. The Three Stages

| Stage | Credit state | ECL recognized |
|---|---|---|
| **Stage 1** | Performing; no significant increase in credit risk since origination | **12-month ECL** |
| **Stage 2** | Significant increase in credit risk — SICR | **Lifetime ECL** |
| **Stage 3** | Credit-impaired / defaulted | **Lifetime ECL** |

The biggest conceptual jump is:

```text
Stage 1
12-month ECL
        ↓
Stage 2
Lifetime ECL
```

The borrower can move to lifetime loss recognition **before default**.

---

# 4. Stage 1 — Performing

Typical Stage 1 account:

```text
Current on payments
No major rating deterioration
No serious behavioural warning
No material qualitative deterioration
```

The bank recognizes:

```text
12-month ECL
```

Important:

> Stage 1 does **not** mean zero risk.

Every performing loan still has some probability of future default.

---

# 5. Stage 2 — Significant Increase in Credit Risk

Stage 2 means:

> Credit risk has increased significantly since the exposure was first recognized.

This is called:

```text
SICR
=
Significant Increase in Credit Risk
```

The borrower may still be paying normally.

That is crucial.

Example:

```text
Customer is 0 DPD
but
internal PD has risen sharply
+
business placed on watchlist
```

Possible result:

```text
Stage 2
```

No default yet.

---

# 6. Stage 3 — Credit-Impaired

Stage 3 means the exposure is already seriously impaired.

Typical indicators:

```text
Default criteria met
Severe delinquency
Unlikely-to-pay assessment
Restructuring due to financial distress
Insolvency / bankruptcy
Material payment failure
```

Stage 3 carries:

```text
Lifetime ECL
```

and interest recognition is treated differently from Stage 1 / Stage 2.

---

# 7. Stage 2 ≠ Default

Permanent distinction:

```text
Stage 2
=
risk increased materially
but borrower not necessarily defaulted
```

```text
Stage 3
=
credit-impaired / default state
```

Example:

```text
Corporate borrower
still pays on time
but
rating falls several grades
+
refinancing risk rises sharply
```

Could be:

```text
Stage 2
```

not automatically Stage 3.

---

# 8. Default ≠ 90 DPD Only

Days Past Due is important.

But default is not simply:

```text
90 DPD = entire definition
```

Banks also use qualitative indicators such as:

```text
unlikeliness to pay
distressed restructuring
insolvency
serious covenant / financial distress
```

So:

> **Default is a governed credit state, not only a delinquency bucket.**

---

# 9. 30 DPD ≠ Complete Stage 2 Definition

Likewise:

```text
30 DPD
```

is not the entire SICR concept.

A borrower can move to Stage 2 before 30 DPD if other evidence shows significant deterioration.

Example:

```text
0 DPD
+
PD rises materially
+
watchlist
+
major customer loss
```

Possible:

```text
Stage 2
```

---

# 10. The Real IFRS 9 Question

At every reporting date:

```text
What was the credit risk at origination?
        ↓
What is the credit risk now?
        ↓
Has it increased significantly?
```

This makes IFRS 9 a **relative deterioration framework**.

Not simply:

```text
Is current PD high?
```

but:

```text
How much worse is the borrower than when the exposure began?
```

---

# 11. Origination Risk Matters

Suppose:

### Borrower A

```text
Origination PD   0.5%
Current PD       1.0%
```

Risk doubled.

### Borrower B

```text
Origination PD   5.0%
Current PD       5.5%
```

Current PD is much higher for B.

But deterioration relative to origination is much larger for A.

That is why SICR cannot be judged from current PD alone.

---

# 12. SICR — Quantitative Triggers

Banks may assess movements in:

```text
PD
rating grade
credit score
lifetime default risk
```

Illustrative example:

```text
Origination grade   3
Current grade       6
```

If bank policy considers that deterioration significant:

```text
Stage 2
```

The exact quantitative rule is bank-specific.

---

# 13. SICR — Qualitative Triggers

Possible indicators:

```text
Watchlist placement
Covenant deterioration
Major customer loss
Management problems
Forbearance
Sector stress
Reduced access to finance
Repeated payment arrangements
Legal action
Adverse external rating change
```

Qualitative indicators matter because models can lag reality.

---

# 14. Retail SICR Example

Credit-card account:

At origination / earlier period:

```text
Utilisation       25%
Payments          full
Bureau            clean
PD                2%
```

Now:

```text
Utilisation       98%
Minimum payment
Two missed payments elsewhere
PD                7%
```

Even before default:

```text
credit risk materially worse
→ possible Stage 2
```

---

# 15. Mortgage SICR Example

Original:

```text
LTV             70%
Stable income
No arrears
```

Later:

```text
Income falls
Repeated arrears
Household debt rises
Behavioural score worsens
```

The mortgage may move:

```text
Stage 1
→ Stage 2
```

before formal default.

---

# 16. SME SICR Example

Original:

```text
DSCR              1.6x
OD utilisation     65%
Receivable days    48
Rating grade        4
```

Later:

```text
DSCR              1.15x
OD utilisation     97%
Receivable days    82
Rating grade        7
Watchlist          Yes
```

Possible:

```text
Stage 2
```

even if contractual payments remain current.

---

# 17. Corporate SICR Example

Original:

```text
Net leverage       2.2x
Rating grade        4
FCF                 strong
Bond access         healthy
```

Later:

```text
Net leverage       4.0x
Rating grade        7
FCF                 negative
Bond spread         sharply wider
Refinancing risk   high
```

Possible:

```text
Stage 2
```

before any actual missed payment.

---

# 18. 12-Month ECL

Stage 1 recognizes:

```text
12-month ECL
```

Important:

> 12-month ECL does **not** mean losses expected only during the next 12 months.

It means:

> Lifetime losses arising from default events that are possible within the next 12 months.

That distinction matters.

---

# 19. Lifetime ECL

Stage 2 and Stage 3 recognize:

```text
Lifetime ECL
```

Meaning:

> Expected credit losses from all possible default events over the remaining expected life of the exposure.

So:

```text
Stage 2
```

can produce a much larger provision than Stage 1 even before default occurs.

---

# 20. Why Stage 1 → Stage 2 Can Be Expensive

Example:

```text
12-month ECL     £20,000
Lifetime ECL     £85,000
```

If exposure moves:

```text
Stage 1
→ Stage 2
```

provision increases by:

```text
£65,000
```

That increase hits the bank's accounting result.

So staging is economically important.

---

# 21. The ECL Formula — Simplified Multi-Period Form

A common operational representation:

```text
ECL
=
Σ
PD_t
×
LGD_t
×
EAD_t
×
Discount Factor_t
```

where:

```text
t
=
future time period
```

Meaning:

```text
For every future period:
probability of default
×
loss severity
×
exposure
×
present-value adjustment
```

Then add all periods together.

---

# 22. Marginal PD Matters

Lifetime ECL should not simply multiply the same annual PD repeatedly.

Suppose:

```text
Year 1 conditional PD   2%
Year 2 conditional PD   3%
Year 3 conditional PD   4%
```

A borrower can only default in Year 2 if it survived Year 1.

So default probability by period must reflect survival.

---

# 23. Survival Probability

Start:

```text
Survival before Year 1 = 100%
```

If Year 1 PD:

```text
2%
```

then:

```text
Survival after Year 1
=
98%
```

If Year 2 conditional PD:

```text
3%
```

marginal Year 2 default probability:

```text
98% × 3%
=
2.94%
```

---

# 24. Three-Year Marginal PD Example

Assume:

```text
Year 1 conditional PD   2%
Year 2 conditional PD   3%
Year 3 conditional PD   4%
```

Then:

```text
Year 1 marginal PD
=
100% × 2%
=
2.00%
```

After Year 1:

```text
survival = 98%
```

Year 2:

```text
98% × 3%
=
2.94%
```

Survival after Year 2:

```text
98% × 97%
=
95.06%
```

Year 3:

```text
95.06% × 4%
=
3.80%
```

These are the default probabilities used period by period.

---

# 25. Lifetime ECL — Full Worked Example

Loan:

```text
EAD          £100,000
LGD          40%
Term         3 years
Discount     5%
```

Conditional PDs:

```text
Year 1        2%
Year 2        3%
Year 3        4%
```

Loss if default occurs:

```text
40% × £100,000
=
£40,000
```

Approximate discount factors:

```text
Year 1       0.952
Year 2       0.907
Year 3       0.864
```

---

# 26. Year 1 Expected Loss

Marginal PD:

```text
2.00%
```

Calculation:

```text
2.00%
× £40,000
× 0.952
=
£761.60
```

---

# 27. Year 2 Expected Loss

Marginal PD:

```text
2.94%
```

Calculation:

```text
2.94%
× £40,000
× 0.907
≈
£1,066.63
```

---

# 28. Year 3 Expected Loss

Marginal PD:

```text
3.80%
```

Calculation:

```text
3.80%
× £40,000
× 0.864
≈
£1,313.28
```

---

# 29. Lifetime ECL Total

```text
£761.60
+
£1,066.63
+
£1,313.28
=
£3,141.51
```

So:

```text
Lifetime ECL
≈
£3,142
```

Stage 1 12-month ECL would broadly capture only losses associated with defaults possible in the next 12 months.

---

# 30. EAD Can Change Through Time

For amortising loan:

```text
Year 1 EAD   £100k
Year 2 EAD    £75k
Year 3 EAD    £45k
```

Then lifetime ECL should use:

```text
PD_t × LGD_t × EAD_t
```

period by period.

Not one static EAD.

---

# 31. LGD Can Change Through Time

Possible reasons:

- collateral value changes
- seniority changes
- guarantee expires
- economic stress changes recovery
- loan amortises
- recovery assumptions differ by period

So:

```text
LGD_t
```

can vary across the life.

---

# 32. Forward-Looking Information

IFRS 9 is not purely historical.

The bank must consider relevant future economic conditions.

Examples:

```text
GDP
Unemployment
Interest rates
House prices
Commercial property
Commodity prices
Inflation
Sector output
```

depending on portfolio.

---

# 33. Why Macroeconomics Matters

Mortgage example:

```text
Unemployment ↑
→ household income stress ↑
→ PD ↑
```

and:

```text
House prices ↓
→ recovery value ↓
→ LGD ↑
```

Same economic shock can worsen multiple parameters.

---

# 34. Multiple Economic Scenarios

Banks often use scenarios such as:

```text
Base
Upside
Downside
```

Each scenario may produce different:

```text
PD
LGD
EAD
ECL
```

Then scenario-specific ECLs are probability weighted.

---

# 35. Scenario-Weighted ECL

Example:

```text
Base ECL       £1.0m
Weight          60%

Upside ECL     £0.6m
Weight          15%

Downside ECL   £2.4m
Weight          25%
```

Weighted:

```text
Base
£1.0m × 60%
=
£0.60m
```

```text
Upside
£0.6m × 15%
=
£0.09m
```

```text
Downside
£2.4m × 25%
=
£0.60m
```

Total:

```text
ECL
=
£1.29m
```

---

# 36. Scenario Weight Matters

Same models.

Different scenario probabilities.

Example:

```text
Downside weight
20% → 35%
```

can increase ECL materially even if borrower data does not change.

So provision movement can come from:

```text
borrower deterioration
+
model change
+
scenario change
+
scenario-weight change
```

---

# 37. Stage 3 and Credit-Impaired Assets

Once credit-impaired:

```text
Stage 3
```

the bank recognizes:

```text
Lifetime ECL
```

The focus is now closer to:

```text
expected recovery cash flows
+
timing
+
collateral
+
restructuring
```

rather than only performing-loan risk estimation.

---

# 38. Stage 3 Interest — Important Distinction

For Stage 1 and Stage 2:

```text
interest is generally calculated on gross carrying amount
```

For Stage 3:

```text
interest is generally calculated on net carrying amount
```

where net carrying amount is broadly:

```text
gross carrying amount
−
loss allowance
```

This reflects that part of the exposure is no longer expected to be collected.

---

# 39. Default vs Credit-Impaired

In practice these concepts are closely linked.

But keep the logic clear:

```text
Default
→ governed credit-risk status
```

```text
Credit-impaired
→ accounting impairment state
```

Banks generally align them closely for consistency.

But do not assume every terminology field in every system is identical without checking definitions.

---

# 40. Watchlist ≠ Stage 2 Automatically

Watchlist is a risk-monitoring status.

Stage 2 is an accounting staging result.

Often:

```text
Watchlist
→ strong SICR evidence
→ Stage 2
```

But not every bank implementation treats every watchlist flag identically.

Need governed staging policy.

---

# 41. Covenant Breach ≠ Stage 3 Automatically

Example:

```text
Net Debt / EBITDA covenant breached
```

Possible consequences:

```text
waiver
amendment
heightened monitoring
Stage 2 consideration
```

A covenant breach alone does not automatically mean default or Stage 3.

Context matters.

---

# 42. Forbearance / Restructuring

If borrower cannot meet original terms, bank may grant concessions.

Examples:

```text
extend tenor
reduce payments
interest-only period
waive covenant
defer principal
```

This is a major deterioration signal.

The bank must assess:

```text
SICR?
Credit-impaired?
Default?
```

depending on severity and policy.

---

# 43. Cure — Moving Back

An exposure may improve.

Possible path:

```text
Stage 2
→ sustained improvement
→ Stage 1
```

or:

```text
Stage 3
→ cure criteria met
→ improved classification
```

But movement back should normally require evidence.

Not:

```text
one good payment
→ instantly cured
```

Banks often use sustained-performance criteria.

---

# 44. Cure ≠ Write-Off Reversal

Cure means risk status improves.

Write-off concerns accounting recovery expectation.

Different processes.

```text
Cure
→ credit state

Write-off
→ amount no longer expected to be recovered
```

---

# 45. Write-Off

Write-off occurs when:

> there is no reasonable expectation of recovering some or all of the exposure.

Simplified path:

```text
Default
↓
Collections / workout
↓
Recoveries
↓
Remaining amount judged unrecoverable
↓
Write-off
```

Write-off is not the same event as default.

---

# 46. Provision ≠ Write-Off

Provision / ECL:

```text
expected future loss
recognized before final outcome
```

Write-off:

```text
amount no longer expected to be recovered
```

So:

```text
ECL
→ estimate
```

```text
Write-off
→ accounting removal of unrecoverable amount
```

---

# 47. Provision ≠ Actual Loss

Example:

```text
Provision today      £20,000
```

Later actual recovery outcome may produce:

```text
Actual loss          £12,000
```

or:

```text
Actual loss          £35,000
```

Provision is the best current estimate.

Not a guaranteed final loss.

---

# 48. Retail Stage Movement Example

Credit card:

### Month 0

```text
PD           3%
DPD          0
Utilisation  30%
Stage        1
```

### Month 8

```text
PD           8%
DPD          15
Utilisation  95%
Bureau       deteriorated
Stage        2
```

### Month 11

```text
DPD          95
Collections  unsuccessful
Default      Yes
Stage        3
```

This is the full deterioration path.

---

# 49. Mortgage Stage Movement Example

### Origination

```text
Stable income
LTV          75%
Stage        1
```

### Deterioration

```text
Income loss
Repeated arrears
Behavioural score weakens
Stage        2
```

### Later

```text
Default criteria met
Property recovery process begins
Stage        3
```

Now LGD becomes heavily linked to:

```text
property value
+
recovery costs
+
time to sale
```

---

# 50. SME Stage Movement Example

### Stage 1

```text
DSCR            1.7x
OD utilisation   60%
Rating grade      4
```

### Stage 2

```text
DSCR            1.1x
OD utilisation   98%
Watchlist         Yes
Rating grade      7
```

Still paying.

Then:

### Stage 3

```text
Missed debt payments
Distressed restructuring
Default criteria met
```

---

# 51. Corporate Stage Movement Example

### Stage 1

```text
Leverage          2.0x
FCF               strong
Rating grade       3
Refinancing       easy
```

### Stage 2

```text
Leverage          4.0x
FCF               negative
Rating grade       6
Bond spreads       sharply wider
Maturity wall      approaching
```

Still current on payments.

Then:

### Stage 3

```text
Failed refinancing
Missed payment
Distressed exchange
Default criteria met
```

---

# 52. ECL Is a Data Chain

A reliable ECL calculation needs:

```text
Borrower / customer
        ↓
Facility / account
        ↓
Stage
        ↓
PD term structure
        ↓
LGD
        ↓
EAD / cash-flow profile
        ↓
Macroeconomic scenario
        ↓
Scenario weight
        ↓
Discount factor
        ↓
ECL
```

Break one link:

> result becomes unreliable.

---

# 53. Key Staging Data

Typical:

```text
origination_date
origination_rating
origination_PD
current_rating
current_PD
DPD
watchlist_flag
forbearance_flag
default_flag
stage
stage_reason
stage_effective_date
```

One field:

```text
stage = 2
```

is not enough.

You also need:

```text
why?
when?
based on which rule?
```

---

# 54. Stage Reason Code

Good staging systems should preserve reason.

Example:

```text
Stage 2
Reason:
PD_SICR
```

or:

```text
Stage 2
Reason:
30DPD_BACKSTOP
```

or:

```text
Stage 3
Reason:
DEFAULT_FLAG
```

This makes:

- audit
- reconciliation
- testing
- explanation

much easier.

---

# 55. Rule Priority Matters

Suppose:

```text
watchlist_flag = Yes
default_flag   = Yes
```

Which wins?

Clearly:

```text
default
→ Stage 3
```

So staging needs rule precedence.

Example:

```text
1. Default / credit-impaired?
      → Stage 3

2. SICR?
      → Stage 2

3. Else
      → Stage 1
```

---

# 56. Missing Data Needs a Rule

Suppose:

```text
current_PD = null
```

Do not silently assume:

```text
Stage 1
```

Possible governed treatments:

- fallback rule
- conservative stage
- data-quality exception
- manual review

Missing data is not the same as low risk.

---

# 57. Stage Migration Matrix

Portfolio monitoring may show:

```text
             Current
Prior      S1     S2     S3
S1         90%     8%     2%
S2         20%    65%    15%
S3          3%    12%    85%
```

This helps answer:

```text
How much is deteriorating?
How much is curing?
How sticky is default?
```

---

# 58. Provision Movement Analysis

Suppose total ECL rises:

```text
£100m
→
£145m
```

Possible drivers:

```text
Portfolio growth
Stage 1 → Stage 2 migration
Stage 2 → Stage 3 migration
PD deterioration
LGD deterioration
EAD increase
Scenario change
Model change
Write-offs
Recoveries
```

A good risk / finance process decomposes the movement.

---

# 59. Stage Migration Can Dominate ECL

Example:

```text
100 loans
Stage 1 ECL each       £1,000
Total                  £100k
```

If 20 migrate to Stage 2:

```text
Stage 2 ECL each       £5,000
```

New total:

```text
80 × £1,000
+
20 × £5,000
=
£180k
```

ECL rises 80%.

Even without default.

---

# 60. Scenario Change Can Dominate ECL

Same borrowers.

Same stages.

But:

```text
Downside scenario probability
20%
→
40%
```

ECL rises because forward-looking macro expectations worsened.

No borrower-level event required.

---

# 61. Model Change Can Move ECL

Example:

```text
Old PD model
→ average Stage 1 PD = 1.5%
```

New model:

```text
average = 2.0%
```

Provision may rise.

Therefore ECL movement must distinguish:

```text
real portfolio deterioration
vs
methodology / model change
```

---

# 62. Staging vs Measurement

Two separate questions:

## Staging

```text
Stage 1?
Stage 2?
Stage 3?
```

Determines:

```text
12-month vs lifetime horizon
```

## Measurement

Given the stage:

```text
What is actual ECL amount?
```

using:

```text
PD
LGD
EAD
scenarios
discounting
```

Do not merge these into one concept.

---

# 63. Accounting PD vs Capital PD

A bank may use different PD calibrations for different purposes.

Example:

```text
IFRS 9 PD
→ forward-looking / point-in-time sensitive

Capital PD
→ may use a different regulatory calibration
```

So:

```text
same borrower
+
same date
```

can legitimately have more than one PD.

Always ask:

> **PD for what framework?**

---

# 64. Accounting LGD vs Capital LGD

Likewise:

```text
IFRS 9 LGD
```

may reflect:

- current expected recovery conditions
- scenario effects
- discounting

whereas regulatory capital LGD may use different prudential assumptions.

Do not assume the values are interchangeable.

---

# 65. Accounting EAD vs Capital EAD

IFRS 9 exposure profiles may depend on:

- contractual cash flows
- behavioural maturity
- expected future drawings

Capital EAD may be produced under a different regulatory methodology.

Again:

```text
same acronym
≠
same calibration
```

---

# 66. Common Trap — Stage 2 = 30 DPD

Wrong.

30 DPD can be an important backstop.

But SICR is broader.

```text
0 DPD
+
major rating deterioration
+
watchlist
```

can still produce Stage 2.

---

# 67. Common Trap — Stage 3 = 90 DPD Only

Wrong.

Default / credit impairment can arise from:

```text
unlikeliness to pay
distressed restructuring
insolvency
other serious credit events
```

DPD is only one route.

---

# 68. Common Trap — Lifetime ECL = Defaulted Loan

Wrong.

Stage 2 is:

```text
not defaulted
+
lifetime ECL
```

Lifetime horizon reflects deterioration.

Not default status.

---

# 69. Common Trap — Stage 1 = No Provision

Wrong.

Stage 1 carries:

```text
12-month ECL
```

All performing credit still has expected loss.

---

# 70. Common Trap — 12-Month ECL = Next 12 Months of Cash Loss

Wrong.

It is:

> lifetime loss associated with defaults that could occur in the next 12 months.

---

# 71. Common Trap — ECL Is One Static PD × LGD × EAD

Wrong for lifetime measurement.

Real ECL may need:

```text
PD_t
LGD_t
EAD_t
discounting
scenario weighting
```

across future periods.

---

# 72. Common Trap — Watchlist = Stage 2 by Definition

Not universally.

Watchlist is a risk-monitoring status.

Staging policy decides how it feeds SICR.

---

# 73. Common Trap — Default = Write-Off

Wrong.

```text
Default
→ collections / workout
→ recoveries
→ possible write-off later
```

---

# 74. Common Trap — Provision = Actual Loss

Wrong.

Provision:

```text
expected
```

Actual loss:

```text
realized
```

They only converge after outcomes occur.

---

# 75. Common Trap — Better Collateral Prevents Stage 2

Not necessarily.

Collateral mainly affects:

```text
loss severity / LGD
```

SICR asks:

```text
has default risk increased?
```

Borrower can become much more likely to default while collateral still remains strong.

---

# 76. Common Trap — Strong Current PD Means No SICR

Suppose:

```text
Origination PD   0.2%
Current PD       0.8%
```

Current PD still looks low.

But risk quadrupled.

SICR depends on **relative deterioration**, not only absolute level.

---

# 77. Full End-to-End IFRS 9 Flow

```text
LOAN ORIGINATES
      ↓
Origination risk captured
      ↓
Stage 1
12-month ECL
      ↓
Each reporting date:
Compare current risk vs origination
      ↓
Significant deterioration?
      │
      ├── No
      │     ↓
      │   Stage 1
      │
      └── Yes
            ↓
          Stage 2
          Lifetime ECL
            ↓
       Credit-impaired / default?
            │
            ├── No
            │     ↓
            │   Remain Stage 2
            │
            └── Yes
                  ↓
                Stage 3
                Lifetime ECL
                  ↓
          Collections / workout
                  ↓
             Cure / recovery
                  ↓
              Write-off
```

---

# 78. One Full Cross-Asset Snapshot

| Exposure | Current state | Likely stage logic |
|---|---|---|
| Mortgage | Current, stable score | Stage 1 |
| Credit card | 0 DPD but PD sharply higher + 98% utilisation | Potential Stage 2 |
| SME OD | Current payments, watchlist + severe cash-flow deterioration | Potential Stage 2 |
| Corporate RCF | Rating downgrade + refinancing stress, still paying | Potential Stage 2 |
| Personal loan | Default criteria met | Stage 3 |

This shows:

> **Stage is about deterioration state, not product type.**

---

# 79. Fast Diagnostic — When You See an IFRS 9 Exposure

Ask:

1. **What stage is it in?**
2. **Why is it in that stage?**
3. **What was risk at origination?**
4. **What is current risk?**
5. **What SICR rule fired?**
6. **Any DPD backstop?**
7. **Any watchlist / forbearance / qualitative trigger?**
8. **Is default / credit impairment present?**
9. **12-month or lifetime horizon?**
10. **Which PD term structure?**
11. **Which LGD?**
12. **Which EAD profile?**
13. **Which economic scenarios?**
14. **What scenario weights?**
15. **Which discounting assumptions?**
16. **What model version?**
17. **What reporting date?**

If these are clear:

> the ECL result becomes explainable.

---

# 80. One-Page Recall Sheet

## Stages

```text
Stage 1
Performing
→ 12-month ECL
```

```text
Stage 2
Significant increase in credit risk
→ Lifetime ECL
```

```text
Stage 3
Credit-impaired / default
→ Lifetime ECL
```

## SICR

```text
Current risk
vs
Origination risk
```

Driven by:

```text
PD / rating migration
DPD
watchlist
forbearance
qualitative deterioration
```

## ECL

```text
PD
×
LGD
×
EAD
×
time
×
discounting
×
scenario weighting
```

## Never Confuse

```text
Stage 2 ≠ Default

Stage 3 ≠ 90 DPD only

30 DPD ≠ full SICR definition

12-month ECL ≠ next 12 months of cash losses

Lifetime ECL ≠ defaulted exposure

Provision ≠ Write-off

Default ≠ Write-off

Watchlist ≠ automatically Stage 2

Accounting PD ≠ automatically Capital PD
```

---

# 81. The One Sentence to Retain

> **IFRS 9 recognizes credit loss before default by comparing current credit risk with origination risk: Stage 1 carries 12-month ECL, Stage 2 carries lifetime ECL once credit risk has increased significantly, and Stage 3 carries lifetime ECL once the exposure becomes credit-impaired — with the final provision built from forward-looking PD, LGD, EAD, time, scenarios, and discounting.**
