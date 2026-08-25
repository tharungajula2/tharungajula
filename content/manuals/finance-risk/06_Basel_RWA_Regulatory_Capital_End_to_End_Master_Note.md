# 06 — Basel, RWA & Regulatory Capital — End-to-End Master Note

> **Mental model:** IFRS 9 asks, **“What credit loss should the bank recognize?”**
>
> Basel / prudential capital asks a different question:
>
> ```text
> If losses become much worse than expected,
> does the bank still have enough loss-absorbing capital to survive?
> ```
>
> The core chain:
>
> ```text
> Exposure
>   ↓
> Risk Weight / IRB Risk Function
>   ↓
> Risk-Weighted Assets — RWA
>   ↓
> Capital Ratio
> =
> Capital
> ───────
> RWA
> ```
>
> **Permanent distinction:**  
> **Provisioning absorbs expected credit loss. Capital protects against unexpected loss and broader solvency stress.**

---

# 1. Why Banks Need Capital

A normal lender can lose its own money.

A bank can lose:

```text
shareholder money
+
depositors' money
+
wholesale funding
```

Banks are also highly leveraged.

Simplified balance sheet:

```text
Assets
£100bn

Funded by:

Deposits / debt       £94bn
Shareholder capital    £6bn
```

If assets lose:

```text
£2bn
```

capital absorbs it.

If assets lose:

```text
£8bn
```

the loss exceeds the £6bn equity cushion.

The bank may become insolvent.

So regulators require banks to maintain **loss-absorbing capital**.

---

# 2. Capital ≠ Cash

A common mistake:

```text
Capital
=
cash sitting in a vault
```

Wrong.

Capital is a **funding / loss-absorbing layer** on the balance sheet.

Example:

```text
Assets                   £100
Liabilities               £92
Equity / capital           £8
```

Capital represents the residual buffer protecting creditors from asset losses.

Liquidity asks:

> Do we have cash when payments fall due?

Capital asks:

> Are assets still worth more than liabilities after losses?

Different problems.

---

# 3. Expected Loss vs Unexpected Loss

From earlier notes:

```text
Expected Loss
=
PD × LGD × EAD
```

Expected loss is:

> average loss the bank anticipates over time.

But actual loss is volatile.

Example:

```text
Expected annual credit loss   £100m
```

Possible actual years:

```text
Good year       £40m
Normal year    £100m
Bad year       £350m
Crisis year    £900m
```

The bank must survive losses far above the average.

That excess is the intuition behind:

```text
Unexpected Loss
```

---

# 4. Provision vs Capital

Keep this distinction permanent.

| | Provision / ECL | Regulatory Capital |
|---|---|---|
| Main purpose | Recognize expected credit loss | Absorb unexpected / severe loss |
| Main framework | IFRS 9 | Basel / PRA prudential rules |
| Main location | Accounting | Prudential solvency |
| Driven by | ECL methodology | RWA + capital requirements |
| Main question | What loss do we expect? | Can the bank survive worse outcomes? |

They interact.

But they are not the same calculation.

---

# 5. Basel — What It Actually Is

The **Basel Committee on Banking Supervision — BCBS** develops global prudential banking standards.

Basel standards themselves are not automatically UK law.

The flow is:

```text
Basel Committee
Global standard
        ↓
UK Prudential Regulation Authority — PRA
Domestic prudential rules
        ↓
UK bank
Calculates + reports + holds capital
```

So:

> **Basel gives the international framework; the PRA makes the operative UK rules for PRA-regulated firms.**

---

# 6. Basel I → II → III → Basel 3.1

## Basel I

Main idea:

```text
Assets
×
simple risk weights
→
capital requirement
```

Crude but simple.

---

## Basel II

Introduced:

```text
more risk-sensitive capital
+
internal ratings-based approaches
+
three pillars
```

---

## Basel III

After the global financial crisis:

```text
more capital
+
better-quality capital
+
capital buffers
+
leverage ratio
+
liquidity standards
```

---

## Basel 3.1 — UK terminology

UK name for the remaining final Basel III reforms.

Major themes:

```text
revised credit-risk Standardised Approach
+
tighter IRB rules
+
new / revised risk approaches
+
output floor
+
better comparability across banks
```

---

# 7. The Three Pillars

## Pillar 1 — Minimum Capital

Formula-based minimum capital for major risk types.

```text
Credit risk
Market risk
Operational risk
```

---

## Pillar 2 — Supervisory Review

Captures risks that Pillar 1 may miss or understate.

Examples:

```text
concentration risk
interest-rate risk in banking book
pension risk
some model / firm-specific risks
```

Bank performs its own capital assessment.

Supervisor reviews it.

---

## Pillar 3 — Market Discipline

Public disclosure.

Purpose:

```text
investors
counterparties
analysts
```

can see and compare:

- capital
- RWA
- risk exposures
- model usage
- key prudential metrics

---

# 8. The Capital Ratio

Core formula:

```text
Capital Ratio
=
Eligible Capital
──────────────
Risk-Weighted Assets
```

Example:

```text
CET1 capital    £50bn
RWA             £300bn
```

```text
CET1 ratio
=
50 / 300
=
16.7%
```

The numerator:

```text
capital quality
```

The denominator:

```text
risk-weighted exposure
```

Both matter.

---

# 9. Why RWA Exists

Suppose two banks each have:

```text
£100bn assets
```

Bank A:

```text
mainly government / very low-risk assets
```

Bank B:

```text
mainly risky unsecured credit
```

If capital were based only on total assets:

```text
both appear equally risky
```

That makes no sense.

So Basel scales exposures by risk.

```text
Exposure
×
Risk Weight
=
RWA
```

---

# 10. RWA — Risk-Weighted Assets

Simplified Standardised Approach intuition:

```text
RWA
=
Exposure × Risk Weight
```

Example:

```text
Exposure      £10m
Risk Weight    50%
```

```text
RWA
=
£5m
```

The bank does not hold capital equal to the full £10m.

It holds capital against the **£5m risk-weighted amount**.

---

# 11. Risk Weight Is Not PD

Important distinction:

```text
PD
→ probability of default
```

```text
Risk Weight
→ regulatory scaling factor used to convert exposure into RWA
```

A risk weight may be influenced by:

- exposure class
- rating
- LTV
- collateral
- regulatory rules
- internal parameters under IRB

But:

```text
PD ≠ Risk Weight
```

---

# 12. RWA Is Not Expected Loss

Example:

```text
Exposure   £1m
PD         2%
LGD        40%
```

Simplified EL:

```text
£8,000
```

But regulatory RWA could be:

```text
£500k
£750k
£1m
```

depending on the prudential approach and exposure treatment.

So:

```text
Expected Loss
≠
RWA
```

Different outputs.

Different purposes.

---

# 13. Total Bank RWA

Bank RWA combines multiple risk families.

Simplified:

```text
Total RWA
=
Credit Risk RWA
+
Market Risk RWA
+
Operational Risk RWA
+
Other required prudential components
```

For many traditional lending banks:

```text
Credit Risk RWA
```

is the largest piece.

---

# 14. Credit Risk — Two Main Approaches

For ordinary banking-book credit exposure, the two foundational approaches are:

```text
Standardised Approach — SA
```

and:

```text
Internal Ratings Based — IRB
```

---

# 15. Standardised Approach — SA

Under SA:

> The prudential framework determines how the exposure is classified and which risk weight applies.

Simplified:

```text
Exposure
   ↓
Exposure class
   ↓
Regulatory attributes
   ↓
Risk weight
   ↓
RWA
```

The bank does not freely invent the risk weight.

---

# 16. SA Exposure Classification Matters

Examples of broad exposure families include:

```text
Sovereigns
Institutions / banks
Corporates
Retail
Real-estate-secured exposures
Defaulted exposures
Specialised / other categories
```

The same £1m exposure can generate different RWA depending on classification.

So:

> **Exposure class is a load-bearing regulatory data field.**

---

# 17. SA — Simple Worked Example

Assume an illustrative regulatory risk weight:

```text
Corporate exposure   £20m
Risk weight           100%
```

Then:

```text
RWA
=
£20m × 100%
=
£20m
```

If total capital minimum were applied at 8%:

```text
Pillar 1 total capital
=
8% × £20m
=
£1.6m
```

This is the mechanism.

The binding bank requirement can be higher after buffers and Pillar 2.

---

# 18. Lower Risk Weight → Lower RWA

Illustrative:

```text
Exposure A
£10m × 20%
=
£2m RWA
```

```text
Exposure B
£10m × 100%
=
£10m RWA
```

Same face exposure.

Five times the RWA.

That affects:

```text
capital consumption
+
pricing
+
portfolio economics
```

---

# 19. Off-Balance-Sheet Exposure Enters RWA Too

A bank commitment may not be fully drawn.

Example:

```text
Limit        £10m
Drawn         £4m
Undrawn       £6m
```

The undrawn portion can still become exposure.

A simplified flow:

```text
Undrawn commitment
×
CCF
=
credit-equivalent amount
```

then:

```text
Drawn + converted undrawn
=
Exposure / EAD measure
```

then:

```text
× risk weight
=
RWA
```

---

# 20. CCF Connects Note 04 to RWA

Example:

```text
Drawn          £4m
Undrawn        £6m
CCF             50%
```

```text
EAD
=
4 + 50% × 6
=
£7m
```

If illustrative risk weight:

```text
75%
```

then:

```text
RWA
=
£7m × 75%
=
£5.25m
```

So:

```text
Limit
→ Drawn / Undrawn
→ CCF
→ EAD
→ Risk Weight
→ RWA
```

---

# 21. Credit Risk Mitigation — CRM

The bank can reduce credit risk through eligible:

- collateral
- guarantees
- credit protection
- netting

Collectively:

```text
Credit Risk Mitigation — CRM
```

But prudential recognition is not automatic.

The protection must meet applicable rules.

---

# 22. Collateral Does Not Simply Delete Exposure

Incorrect:

```text
Loan £10m
Collateral £10m
→ RWA = 0
```

Not necessarily.

The prudential treatment may depend on:

- collateral eligibility
- value
- legal enforceability
- maturity mismatch
- currency mismatch
- haircut
- approach used

So:

> **Economic protection and regulatory recognition are related, but not identical.**

---

# 23. Haircut

A haircut deliberately reduces recognized collateral value.

Example:

```text
Market value       £10m
Haircut             20%
Recognized value    £8m
```

Why?

Because under stress:

```text
collateral value may fall
+
sale may be difficult
```

Prudential rules do not assume full headline value is always recoverable.

---

# 24. Guarantee Logic

Suppose:

```text
Borrower
weak credit quality
```

but:

```text
strong eligible guarantor
```

Under applicable rules, credit protection may alter the prudential treatment.

But only if:

```text
guarantee is valid
+
eligible
+
legally enforceable
+
properly documented
```

A missing legal guarantee flag can therefore affect RWA materially.

---

# 25. Why Data Quality Moves Capital

Imagine:

```text
Property collateral exists
but
valuation date missing
```

or:

```text
Guarantee exists
but
eligibility flag missing
```

or:

```text
Retail exposure incorrectly classified as corporate
```

The calculation may produce a more conservative treatment.

Result:

```text
RWA ↑
→ capital consumption ↑
```

This is why regulatory capital is also a **data lineage problem**.

---

# 26. Internal Ratings Based — IRB

Under IRB:

> The bank uses approved internal credit-risk parameters inside prescribed regulatory risk functions.

Think:

```text
Bank estimates approved inputs
        ↓
Regulatory formula
        ↓
Capital requirement
        ↓
RWA
```

The bank does **not** invent the whole capital formula.

---

# 27. IRB Uses the Parameters We Already Know

Core inputs include concepts such as:

```text
PD
LGD
EAD
Maturity — M
```

Depending on IRB approach and portfolio.

This is why Notes 04 and 06 connect directly.

---

# 28. Foundation IRB — FIRB

Simplified intuition:

```text
Bank estimates:
PD

Regulatory framework supplies / constrains more of:
LGD
EAD / conversion treatment
other parameters
```

Exact treatment depends on exposure type and applicable rules.

---

# 29. Advanced IRB — AIRB

Historically / where permitted:

```text
Bank estimates more risk parameters internally
```

including:

```text
PD
LGD
EAD
```

subject to:

- supervisory permission
- model standards
- validation
- input floors
- portfolio restrictions
- governance

Basel 3.1 tightens where advanced modelling can be used.

---

# 30. Internal Rating ≠ IRB Permission

Very important.

A bank can have:

```text
internal borrower rating
```

for commercial underwriting.

That does **not** automatically mean:

```text
IRB regulatory capital approach
```

IRB requires specific supervisory permission and regulatory compliance.

So:

```text
Internal credit model
≠ automatically IRB model
```

---

# 31. IRB Risk Function — Intuition

Conceptually:

```text
PD
+
LGD
+
maturity
+
correlation assumptions
+
regulatory formula
=
capital requirement K
```

Then:

```text
RWA
≈
12.5 × K × EAD
```

Why 12.5?

Because:

```text
1 / 8%
=
12.5
```

It converts the capital requirement into an RWA-equivalent amount.

---

# 32. Simple IRB Mechanics Example

Suppose prescribed IRB calculation produces:

```text
Capital requirement K = 6%
```

and:

```text
EAD = £100m
```

Then:

```text
RWA
=
12.5 × 6% × £100m
=
£75m
```

Then 8% total Pillar 1 capital against that RWA:

```text
8% × £75m
=
£6m
```

which is exactly:

```text
6% × £100m
```

That is why the conversion works.

---

# 33. Lower PD Can Lower IRB RWA

All else equal:

```text
PD ↓
→ regulatory capital function ↓
→ RWA ↓
```

Likewise:

```text
LGD ↓
→ RWA may ↓
```

This makes IRB more risk-sensitive than a crude flat risk-weight table.

But it also creates model risk.

---

# 34. Why Regulators Became Concerned About IRB Variability

Imagine two banks hold similar corporate portfolios.

Bank A models:

```text
RWA = £60bn
```

Bank B models:

```text
RWA = £95bn
```

If differences reflect true risk:

```text
fine
```

If they mainly reflect model choices:

```text
capital ratios become hard to compare
```

Basel 3.1 specifically tries to reduce unjustified RWA variability.

---

# 35. Input Floors

Basel 3.1 places floors / restrictions on certain internal model inputs.

Conceptually:

```text
Model says PD = extremely tiny
```

but regulation may say:

```text
for capital purposes
PD cannot fall below prescribed minimum
```

Likewise for some LGD / model parameters.

Purpose:

> stop capital falling unrealistically low because a model produces extreme optimistic estimates.

---

# 36. IRB Scope Restrictions

Basel 3.1 restricts use of internal models for some portfolios where loss data are too sparse or difficult to model robustly.

This matters especially for certain:

- large corporate exposures
- financial institutions
- specialised exposure types

So some exposures may move from:

```text
IRB
→ Standardised Approach
```

for regulatory capital.

---

# 37. The Output Floor

This is one of Basel 3.1’s headline mechanisms.

For firms in scope:

```text
RWA_final
=
max(
Model / permitted-approach RWA,
Floor % × Standardised RWA
)
```

At full end-state:

```text
Floor %
=
72.5%
```

---

# 38. Output Floor — Worked Example

Bank's modelled / permitted RWA:

```text
£70bn
```

Standardised-only RWA:

```text
£120bn
```

Full floor:

```text
72.5% × £120bn
=
£87bn
```

Compare:

```text
Modelled RWA       £70bn
Floor RWA          £87bn
```

Final:

```text
£87bn
```

The floor binds.

---

# 39. Output Floor — When It Does Not Bind

Modelled RWA:

```text
£100bn
```

Standardised RWA:

```text
£120bn
```

Full floor:

```text
£87bn
```

Then:

```text
max(100, 87)
=
£100bn
```

No floor uplift.

---

# 40. Why the Output Floor Exists

Purpose:

```text
reduce excessive RWA variability
+
improve comparability
+
constrain model-driven capital benefit
```

It does **not** eliminate IRB.

It limits how far total model-based RWA can fall below standardised RWA.

---

# 41. Output Floor Creates a Parallel Calculation

An IRB bank now needs to understand:

```text
Model / permitted-approach RWA
```

and:

```text
Standardised-only RWA
```

because both are needed for the floor comparison.

That creates major work in:

- data
- calculation engines
- reporting
- reconciliations
- lineage

---

# 42. UK Basel 3.1 — Live Position

**Position checked: 25 August 2026**

For the UK:

```text
Basel 3.1 general implementation
→ 1 January 2027
```

The PRA finalized the relevant rules in:

```text
PS1/26
```

The market-risk internal model approach is separately scheduled for:

```text
1 January 2028
```

This note is mainly about credit risk.

---

# 43. UK Output Floor — End State

The UK output-floor transition reaches full:

```text
72.5%
```

on:

```text
1 January 2030
```

So do not confuse:

```text
Basel 3.1 go-live
1 Jan 2027
```

with:

```text
full output-floor end-state
1 Jan 2030
```

---

# 44. Capital Quality — The Stack

Not every form of funding counts equally as regulatory capital.

Simplified hierarchy:

```text
CET1
Highest-quality going-concern capital

Additional Tier 1 — AT1
Additional loss-absorbing Tier 1 instruments

Tier 2
Lower-quality regulatory capital
```

---

# 45. CET1 — Common Equity Tier 1

Highest-quality capital.

Broad intuition:

```text
ordinary shares
+
retained earnings
−
regulatory deductions
```

CET1 absorbs losses while the bank remains a going concern.

This is the most closely watched capital layer.

---

# 46. AT1 — Additional Tier 1

Typically perpetual capital instruments designed to absorb losses under specified conditions.

Together:

```text
CET1
+
AT1
=
Tier 1 capital
```

---

# 47. Tier 2

Lower-quality regulatory capital than Tier 1.

Examples can include eligible subordinated debt.

Then:

```text
Tier 1
+
Tier 2
=
Total regulatory capital
```

subject to prudential eligibility rules.

---

# 48. Basel / UK Pillar 1 Minimum Ratios

Core minimums:

```text
CET1
≥ 4.5% of RWA
```

```text
Tier 1
≥ 6.0% of RWA
```

```text
Total Capital
≥ 8.0% of RWA
```

These are **minimum Pillar 1 ratios**.

They are not the full amount a large bank normally needs to maintain.

---

# 49. Capital Conservation Buffer

Additional CET1 buffer:

```text
2.5% of RWA
```

Purpose:

> allow banks to absorb losses during stress without immediately breaching minimum requirements.

It sits above the minimum.

---

# 50. Countercyclical Capital Buffer — CCyB

A macroprudential buffer.

Concept:

```text
credit boom / systemic risk building
→ regulator can increase buffer
```

Later:

```text
stress
→ buffer can be reduced / released
```

Purpose:

> build resilience when system-wide credit risk is rising.

---

# 51. Systemic Buffers

Very large / systemically important banks may face additional requirements.

Reason:

> their failure would have unusually large consequences for the financial system.

So actual required capital can include:

```text
Pillar 1
+
Pillar 2
+
capital conservation buffer
+
countercyclical buffer
+
systemic buffers
```

---

# 52. Why “8% Capital” Is an Incomplete Statement

A beginner may say:

```text
Banks need 8% capital
```

Too simplistic.

8% is the **minimum total Pillar 1 capital ratio**.

A real bank can face:

```text
Pillar 2A
+
buffers
+
management headroom
```

above that.

Therefore internal target ratios are normally well above bare minima.

---

# 53. Pillar 2A

Pillar 2A addresses firm-specific risks that Pillar 1 does not capture adequately.

Possible themes:

```text
concentration
under-captured risk
interest-rate risk
pension risk
other firm-specific exposures
```

The PRA can set additional capital requirements.

---

# 54. ICAAP

**Internal Capital Adequacy Assessment Process**

The bank asks:

```text
What are all our material risks?
How much capital do we need?
What happens under stress?
```

The ICAAP is broader than:

```text
Pillar 1 RWA calculation
```

It is the bank's own capital adequacy assessment.

---

# 55. Stress Testing and Capital

Suppose:

```text
Current CET1 ratio
15%
```

Stress causes:

```text
credit losses ↑
provisions ↑
CET1 capital ↓
RWA ↑
```

Then:

```text
CET1 ratio
=
smaller numerator
───────────────
larger denominator
```

can fall sharply.

Credit stress can therefore hit both sides of the ratio.

---

# 56. How Credit Deterioration Moves Capital Ratio

Example:

Before stress:

```text
CET1      £45bn
RWA       £300bn

Ratio
=
15%
```

After stress:

```text
Losses reduce CET1      → £40bn
Risk migration raises RWA → £330bn
```

New:

```text
40 / 330
=
12.1%
```

One deterioration event:

```text
capital ↓
+
RWA ↑
```

double pressure.

---

# 57. Rating Migration Can Raise RWA Before Default

Corporate borrower:

```text
Grade 3
→ Grade 6
```

Under a risk-sensitive approach:

```text
PD ↑
→ risk weight / IRB capital requirement ↑
→ RWA ↑
```

The borrower may still be performing.

So prudential capital can increase before default occurs.

---

# 58. Defaulted Exposures Can Change Regulatory Treatment

Once default occurs:

- risk parameters change
- recovery assumptions matter
- regulatory classification changes
- provisions interact with prudential treatment
- RWA may change

Default is therefore not only an accounting / collections event.

It also affects regulatory capital.

---

# 59. Provisioning Can Affect Capital

IFRS 9 provisions reduce accounting profit / equity.

Since retained earnings are a major component of CET1:

```text
ECL provision ↑
→ profit / retained earnings ↓
→ CET1 may ↓
```

So even though:

```text
IFRS 9
≠
Basel RWA
```

they interact through the balance sheet.

---

# 60. Accounting ECL vs Regulatory Expected Loss

Under some IRB frameworks, regulatory capital includes its own concept of expected loss and treatment of provisions.

Do not assume:

```text
IFRS 9 ECL
=
regulatory expected loss
```

They can use different definitions and calibrations.

This is a later advanced topic.

For now:

> keep accounting and prudential expected-loss concepts separate unless the calculation explicitly links them.

---

# 61. RWA Density

Useful management metric:

```text
RWA Density
=
RWA
───────
Exposure
```

Example:

```text
Exposure   £100bn
RWA         £45bn
```

```text
RWA density
=
45%
```

Higher density:

```text
more capital-intensive portfolio
```

Lower density:

```text
less capital-intensive portfolio
```

---

# 62. Why RWA Matters to Pricing

Suppose two loans have identical:

```text
revenue
funding cost
operating cost
```

but Loan B consumes much more capital.

Then the bank may need a higher price / return on Loan B.

Credit pricing therefore can consider:

```text
Expected loss
+
funding cost
+
operating cost
+
capital consumption
+
target return
```

RWA is not only a regulatory-reporting number.

It affects commercial economics.

---

# 63. Return on RWA

Simple management intuition:

```text
Return
──────
RWA
```

A business generating:

```text
£100m profit
```

on:

```text
£1bn RWA
```

is economically different from the same profit on:

```text
£5bn RWA
```

Banks manage scarce capital.

So:

> **RWA is a resource allocation measure as well as a prudential measure.**

---

# 64. Retail RWA Intuition

Retail products differ:

```text
Mortgage
→ property / LTV important
```

```text
Credit card
→ undrawn commitment + CCF important
```

```text
Personal loan
→ unsecured borrower risk important
```

Same asset class family:

```text
different product mechanics
→ different capital mechanics
```

---

# 65. SME RWA Intuition

SME RWA can depend on:

- regulatory exposure classification
- collateral
- guarantees
- rating / IRB parameters
- drawn / undrawn amounts
- facility type

Commercial segment:

```text
SME
```

does not automatically equal one prudential risk weight.

---

# 66. Corporate RWA Intuition

Corporate capital treatment can depend on:

- exposure class
- external assessment where applicable
- internal IRB grade / PD where permitted
- LGD
- EAD
- maturity
- collateral / guarantees
- specialised-lending treatment

So corporate RWA is highly data dependent.

---

# 67. The Regulatory Data Spine

A simplified credit RWA data chain:

```text
Customer / Obligor
        ↓
Group / Counterparty
        ↓
Facility
        ↓
Exposure class
        ↓
Drawn / Undrawn
        ↓
CCF / EAD
        ↓
Rating / PD
        ↓
Collateral / Guarantee
        ↓
LGD / CRM treatment
        ↓
Risk Weight / IRB Formula
        ↓
RWA
        ↓
Capital Ratio
        ↓
Regulatory Reporting
```

Every arrow needs traceability.

---

# 68. Key RWA Data Fields

Typical:

```text
counterparty_id
facility_id
product_type
exposure_class
approach
SA / FIRB / AIRB
drawn_amount
undrawn_amount
CCF
EAD
rating_grade
PD
LGD
maturity
collateral_type
collateral_value
guarantee
risk_weight
RWA
reporting_date
```

Missing definitions can materially change capital.

---

# 69. Approach Flag Is Critical

A field such as:

```text
approach = IRB
```

is not decorative.

It controls which calculation path applies.

Wrong mapping:

```text
SA exposure processed as IRB
```

or:

```text
IRB exposure processed as SA
```

can produce major RWA errors.

---

# 70. Exposure Class Is Critical

Suppose one facility is misclassified.

Correct:

```text
Retail exposure
```

Incorrect:

```text
Corporate exposure
```

Different prudential treatment may apply.

Result:

```text
RWA wrong
```

Therefore:

> **regulatory classification is a business-rule problem, not merely a technical field.**

---

# 71. Collateral Lineage Is Critical

Need to know:

```text
Which collateral?
Secures which facility?
What value?
What date?
What currency?
What haircut?
What legal status?
What priority?
```

A generic:

```text
collateral_value
```

without linkage is not enough.

---

# 72. Rating Lineage Is Critical

For IRB / rating-driven capital:

```text
Obligor
→ rating model
→ model version
→ rating grade
→ PD
→ RWA
```

Need:

- observation date
- model version
- override
- approval
- final grade

Otherwise RWA cannot be reproduced reliably.

---

# 73. Reconciliation

A good capital process reconciles:

```text
source exposure
↓
risk engine
↓
RWA result
↓
regulatory return
```

Questions:

```text
Did every source exposure arrive?
Any duplicates?
Any unmatched counterparties?
Any missing collateral?
Does total exposure reconcile?
Does RWA reconcile?
```

---

# 74. One Corporate RWA Example — SA

Illustrative mechanics only.

Facility:

```text
Drawn          £80m
Undrawn        £40m
CCF             50%
```

EAD:

```text
80 + 50% × 40
=
£100m
```

Assume applicable SA risk weight:

```text
100%
```

Then:

```text
RWA
=
£100m
```

Pillar 1 total capital minimum:

```text
8% × £100m
=
£8m
```

---

# 75. Same Facility — IRB Intuition

Suppose approved regulatory model produces:

```text
K = 5%
```

EAD:

```text
£100m
```

Then:

```text
RWA
=
12.5 × 5% × £100m
=
£62.5m
```

Model-based capital:

```text
8% × 62.5m
=
£5m
```

This is more risk-sensitive.

But the output floor may later constrain the benefit.

---

# 76. Add the Output Floor

Standardised RWA:

```text
£100m
```

Full 72.5% floor:

```text
£72.5m
```

Model RWA:

```text
£62.5m
```

Then:

```text
Final floored RWA
=
£72.5m
```

The model is still used.

But capital benefit is capped.

---

# 77. Same Exposure — Four Different Numbers

A single corporate facility may have:

```text
Current drawn balance      £80m
EAD                       £100m
Expected loss             £0.8m
RWA                       £72.5m
```

These are not contradictions.

They answer different questions.

```text
Drawn
→ money currently advanced

EAD
→ amount expected at default

EL
→ average expected loss

RWA
→ prudential risk measure
```

---

# 78. RWA vs Leverage Ratio

Risk-weighted capital says:

```text
low-risk asset
→ lower RWA
```

But if models / weights are too optimistic, the bank could become highly leveraged.

So Basel also uses a **leverage ratio**.

Simplified:

```text
Tier 1 Capital
──────────────
Leverage Exposure
```

The denominator is largely **not risk-weighted**.

It acts as a backstop.

---

# 79. Why the Leverage Ratio Exists

Risk-weighted framework:

```text
£100 asset
× 10% RW
=
£10 RWA
```

Could require relatively little capital.

Leverage ratio says:

> Regardless of how safe the model says the asset is, total balance-sheet leverage cannot grow without limit.

Think:

```text
RWA framework
→ risk-sensitive

Leverage ratio
→ simple backstop
```

---

# 80. RWA Can Rise Without New Lending

Suppose exposure remains:

```text
£100m
```

But borrower deteriorates.

Then:

```text
rating ↓
PD ↑
LGD ↑
risk weight ↑
```

RWA may rise to:

```text
£130m
```

without the bank lending one extra pound.

This is **RWA inflation from risk deterioration**.

---

# 81. RWA Can Fall Without Repayment

Likewise:

```text
same exposure
```

but:

```text
rating improves
collateral recognized
guarantee becomes eligible
```

can reduce RWA.

So movements must be decomposed.

---

# 82. RWA Movement Analysis

If RWA moves:

```text
£300bn
→
£330bn
```

possible drivers:

```text
new lending
repayments
FX movements
rating migration
PD / LGD changes
model changes
regulatory changes
collateral changes
exposure-class reclassification
output floor
```

A good capital analyst explains the bridge.

---

# 83. Common Trap — Capital = Provision

Wrong.

```text
Provision
→ expected accounting loss
```

```text
Capital
→ prudential loss-absorbing buffer
```

---

# 84. Common Trap — RWA = Exposure

Wrong.

```text
Exposure
×
regulatory risk treatment
=
RWA
```

They may be equal under a 100% risk weight.

But that is only one possible case.

---

# 85. Common Trap — Risk Weight = PD

Wrong.

PD is a probability.

Risk weight is a prudential scaling factor / output of a regulatory treatment.

---

# 86. Common Trap — SA Means No Risk Analysis

Wrong.

SA is rule-based for capital.

The bank still performs:

- underwriting
- internal rating
- monitoring
- stress analysis

Commercial risk management continues even when capital is Standardised.

---

# 87. Common Trap — Internal Rating = IRB

Wrong.

A bank may use internal ratings while calculating regulatory capital under SA.

IRB requires specific regulatory permission.

---

# 88. Common Trap — IRB Means Bank Chooses Capital

Wrong.

The bank estimates approved inputs.

The prudential framework prescribes:

- eligibility
- formulae
- constraints
- floors
- governance

---

# 89. Common Trap — Output Floor Replaces IRB

Wrong.

It creates:

```text
model / permitted RWA
vs
standardised-derived floor
```

and uses the higher amount.

IRB is not automatically discarded.

---

# 90. Common Trap — 72.5% Applies to Every Individual Loan

The Basel output floor is an aggregate capital framework constraint, not simply:

```text
Every IRB loan RWA
=
72.5% of its SA RWA
```

The real application is at the applicable aggregate level under prudential rules.

---

# 91. Common Trap — 8% Is the Bank's Target Capital Ratio

Wrong.

8% is a minimum total Pillar 1 capital ratio.

Actual requirements / targets can include:

```text
Pillar 2
+
buffers
+
management headroom
```

---

# 92. Common Trap — Higher RWA Means More Expected Loss

Not necessarily one-for-one.

RWA reflects prudential capital treatment.

ECL reflects expected credit loss.

They can move differently.

---

# 93. Common Trap — Collateral Always Reduces PD

Collateral primarily protects recovery.

It may affect behaviour / structure indirectly.

But the direct credit-risk parameter most associated with collateral is:

```text
LGD
```

and regulatory CRM treatment.

---

# 94. Common Trap — No Drawn Balance Means No Capital

Wrong for commitments.

Example:

```text
Committed RCF
Limit       £100m
Drawn         £0
Undrawn     £100m
```

The bank still has contingent exposure.

CCF / EAD treatment may produce RWA.

---

# 95. The Full Prudential Flow

```text
REAL BORROWER / FACILITY
        ↓
Current exposure
        ↓
Drawn + undrawn commitment
        ↓
CCF / EAD
        ↓
Exposure class
        ↓
SA
or
IRB
        ↓
Collateral / guarantee treatment
        ↓
Risk weight / IRB risk function
        ↓
Credit RWA
        ↓
Add market + operational + other RWA
        ↓
TOTAL RWA
        ↓
CET1 / Tier 1 / Total Capital
        ↓
CAPITAL RATIOS
        ↓
Pillar 2 + buffers
        ↓
Management target
        ↓
Regulatory reporting / disclosure
```

---

# 96. Retail → Capital Flow

```text
Credit card
Limit
   ↓
Drawn / undrawn
   ↓
CCF
   ↓
EAD
   ↓
Retail prudential treatment
   ↓
RWA
   ↓
Capital
```

Mortgage:

```text
Balance
+
property / LTV
+
applicable prudential treatment
→ RWA
```

---

# 97. SME → Capital Flow

```text
Borrower / facility
   ↓
Exposure class
   ↓
Drawn + undrawn
   ↓
Collateral / guarantee
   ↓
SA or permitted IRB treatment
   ↓
RWA
```

SME commercial classification does not by itself tell you final prudential treatment.

---

# 98. Corporate → Capital Flow

```text
Obligor
   ↓
Rating / PD
   ↓
Facility
   ↓
EAD
   ↓
LGD / seniority / CRM
   ↓
SA or IRB
   ↓
RWA
   ↓
Output-floor interaction where relevant
```

This is where the earlier corporate note connects directly into regulatory capital.

---

# 99. Fast Diagnostic — When You See an RWA Number

Ask:

1. **What exposure is this?**
2. **What reporting date?**
3. **What exposure class?**
4. **Which regulatory approach — SA / FIRB / AIRB?**
5. **What drawn amount?**
6. **What undrawn amount?**
7. **What CCF / EAD?**
8. **What rating / PD?**
9. **What LGD?**
10. **What maturity?**
11. **What collateral / guarantee?**
12. **Was CRM recognized?**
13. **What risk weight / IRB capital function?**
14. **What RWA before floor?**
15. **Does output floor bind?**
16. **What capital ratio consumes this RWA?**
17. **Does it reconcile to the regulatory return?**

If these are clear:

> the capital number becomes explainable.

---

# 100. One-Page Recall Sheet

## Core

```text
Exposure
×
Risk Treatment
=
RWA
```

```text
Capital Ratio
=
Capital
───────
RWA
```

## Approaches

```text
SA
→ regulator-prescribed risk-weight framework
```

```text
IRB
→ approved internal risk parameters
+
regulatory risk function
```

## Capital

```text
CET1
→ highest-quality capital

Tier 1
→ CET1 + AT1

Total Capital
→ Tier 1 + Tier 2
```

## Pillar 1 minima

```text
CET1        4.5%
Tier 1      6.0%
Total       8.0%
```

plus:

```text
Pillar 2
+
buffers
```

## Basel 3.1 UK

```text
General go-live
1 January 2027

Output-floor end-state
72.5%
1 January 2030
```

## Never Confuse

```text
Provision ≠ Capital

Exposure ≠ RWA

PD ≠ Risk Weight

EL ≠ RWA

Internal Rating ≠ IRB permission

SA ≠ no internal risk model

IRB ≠ bank chooses its own capital formula

Output Floor ≠ replacement of IRB

8% ≠ complete real-world bank capital target

Capital ≠ Liquidity
```

---

# 101. Official UK / Basel References — Live Section

**Position checked: 25 August 2026**

For current rule interpretation, use the operative official sources:

```text
Bank of England / PRA
PS1/26 — Implementation of Basel 3.1: Final rules
Published 20 January 2026
General implementation: 1 January 2027
```

```text
Bank of England / PRA
Basel 3.1 permissions
Output-floor transition end-point: 1 January 2030
```

```text
Basel Committee on Banking Supervision
Consolidated Basel Framework
RBC20 — minimum risk-based capital requirements
```

Rules can change.

The **mechanism** in this note is durable.

The dated UK implementation position should always be read as a dated regulatory fact.

---

# 102. The One Sentence to Retain

> **Regulatory capital protects the bank against losses beyond the ordinary expected-loss allowance: credit exposures are converted into risk-weighted assets under Standardised or approved IRB rules, RWA becomes the denominator of CET1/Tier 1/total capital ratios, and Basel 3.1 constrains model-driven capital reductions through tighter approaches and the output floor.**
