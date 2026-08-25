# 01 — Retail Credit Risk Foundations

> **Retail credit risk = risk that money lent to an individual customer is not fully recovered.**

A retail bank does not have one generic “loan book”.

It has different **asset classes**:

```text
Residential Mortgage
Personal Loan
Credit Card
Auto Finance
Overdraft
BNPL / Point-of-Sale Finance
```

Each is credit risk.

But each behaves differently.

```text
                    MORTGAGE        PERSONAL LOAN       CREDIT CARD
Structure           Instalment      Instalment           Revolving
Typical security    Property        Usually none         None
Balance behaviour   Amortising      Amortising           Moves up/down
Unused limit        Usually no      Usually no           Yes
Collateral          Critical        Usually none         None
EAD complexity      Lower           Lower                Higher
LGD driver          Property value  Collections          Collections
Main behaviour      Repayment       Repayment            Repayment +
                                                         utilisation
```

So the first rule of retail credit risk:

> **Same credit-risk concepts. Different product mechanics.**

---

# 1. Start With What Actually Happens

A customer wants credit.

```text
CUSTOMER
   ↓
APPLICATION
   ↓
BANK ASSESSES RISK
   ↓
APPROVE / DECLINE / REFER
   ↓
ACCOUNT OPENED
   ↓
MONEY / CREDIT PROVIDED
   ↓
EXPOSURE EXISTS
   ↓
CUSTOMER REPAYS
        │
        ├── normally → performing
        │
        └── difficulty
               ↓
            arrears
               ↓
          collections
          ↓          ↓
        cure       default
                     ↓
                  recovery
                     ↓
              residual loss
```

That entire chain is the **retail credit lifecycle**.

Credit risk exists throughout it.

---

# 2. Customer ≠ Account ≠ Product ≠ Exposure

These terms look similar but are not interchangeable.

## Customer / borrower

The person who owes the bank money.

Example:

```text
Customer: Sarah
```

Sarah might have:

```text
Mortgage
Credit Card
Personal Loan
```

with the same bank.

So:

```text
1 customer
     ↓
multiple credit accounts
```

---

## Product

The type of lending.

Examples:

```text
Mortgage
Personal Loan
Credit Card
Overdraft
Auto Loan
```

The product determines many of the mechanics.

---

## Account

The actual individual credit relationship.

Example:

```text
Sarah
├── Mortgage Account M001
├── Credit Card Account C001
└── Personal Loan Account P001
```

Risk is often monitored at **account level**, while some decisions also consider the total customer relationship.

---

## Exposure

The amount of money the bank is economically at risk on.

### Mortgage

```text
Original mortgage      £300,000
Already repaid          £60,000
Outstanding balance    £240,000

Current exposure ≈ £240,000
```

### Personal loan

```text
Original loan           £20,000
Outstanding balance     £13,000

Current exposure ≈ £13,000
```

### Credit card

```text
Credit limit            £10,000
Current balance          £6,000
Available limit          £4,000

Current drawn exposure = £6,000
```

But the customer can still spend another £4,000.

That becomes important when we reach **EAD**.

---

# 3. Retail Lending Starts at Origination

**Origination = process of deciding whether to create the credit exposure.**

The bank is effectively asking:

> If we lend to this customer, how likely are we to get the money back?

Typical information:

```text
Identity
Income
Employment
Existing debt
Monthly commitments
Credit bureau history
Previous missed payments
Current borrowing
Requested amount
Loan term
Product type
Collateral — if applicable
```

---

## Example — Personal Loan Application

Customer requests:

```text
Loan amount       £20,000
Term              5 years
Income            £45,000
Existing debt      £8,000
```

The bank evaluates:

```text
Can the customer afford the payment?
+
How has the customer managed previous credit?
+
How indebted is the customer already?
+
Does the application fit lending policy?
+
What level of credit risk does the customer represent?
```

Result:

```text
Approve
Decline
Refer for manual review
```

---

# 4. Retail Credit Decisions Are Usually High-Volume

This is one major difference from large corporate lending.

A retail bank may process thousands or millions of applications.

It therefore cannot manually analyze every customer like a corporate credit committee would.

Retail lending relies heavily on:

```text
Standardised policies
+
Automated rules
+
Credit scores
+
Bureau information
+
Affordability rules
+
Exceptions / referrals
```

---

# 5. Application Score vs Behavioural Score

Two important retail concepts.

## Application score

Used when deciding whether to lend.

Question:

> Based on what we know now, how risky is this applicant?

Example signals:

```text
Income
Age / stability variables
Existing debt
Past delinquency
Credit bureau history
Recent applications for credit
```

---

## Behavioural score

Used **after the customer already has the account**.

Question:

> Based on how this customer is behaving now, is their risk changing?

Example — Credit Card:

```text
6 months ago
Balance      £2,000
Limit       £10,000
Utilisation     20%
Payments     Full / healthy
```

Now:

```text
Balance       £9,500
Limit        £10,000
Utilisation     95%
Payments     Minimum only
Cash advance Frequent
```

Nothing has defaulted yet.

But the risk profile may have deteriorated significantly.

That is why:

> **Retail risk is not assessed only once at application.**

It is continuously monitored.

---

# 6. Utilisation

Especially important for revolving products.

```text
Utilisation =
Current Balance
───────────────
Credit Limit
```

Example:

```text
Credit Card Limit     £10,000
Balance                £8,000

Utilisation = 8,000 / 10,000
            = 80%
```

Compare:

```text
Customer A              Customer B
Limit      £10,000      Limit      £10,000
Balance     £1,000      Balance     £9,500
Utilisation    10%      Utilisation    95%
```

Same credit limit.

Very different behaviour.

High utilisation is **not automatically default**, but it may contribute to a deteriorating risk picture.

---

# 7. Performing Account

An account is **performing** when the customer is meeting contractual obligations and has not reached the bank's applicable default criteria.

Example — Personal Loan:

```text
Monthly instalment      £400
Due date                1 August
Payment received        £400

→ Performing
```

Example — Mortgage:

```text
Monthly mortgage       £1,500
Payment received       £1,500

→ Performing
```

Example — Credit Card:

```text
Required minimum       £150
Payment received       £500

→ Performing
```

But performing does **not** mean zero risk.

Every performing account still carries some probability of future default.

---

# 8. Arrears and Delinquency

**Arrears = contractual payment that should have been paid but remains unpaid.**

**Delinquency = state of being behind on payments.**

Example:

```text
Personal loan instalment     £400
Customer pays                 £0

Unpaid amount                £400
```

The account has entered arrears.

---

## Days Past Due — DPD

A common measure of delinquency.

```text
DPD = Days Past Due
```

Illustrative progression:

```text
0 DPD
Performing
   ↓

1–29 DPD
Early delinquency
   ↓

30+ DPD
More serious deterioration
   ↓

60+ DPD
Severe delinquency
   ↓

90+ DPD
Often associated with formal default frameworks
```

Important:

> **DPD bands help describe delinquency. They are not, by themselves, the entire definition of credit risk or default.**

Formal default criteria depend on the applicable regulatory and bank policy framework.

---

# 9. Collections Begins Before the Final Loss

Once customers fall behind, the bank attempts to restore payment.

```text
Missed payment
     ↓
Collections contact
     ↓
Customer assessment
     ↓
Payment arrangement / support / normal repayment
     ↓
Possible cure
```

Collections differs heavily by asset class.

---

## Mortgage

Potential path:

```text
Missed mortgage payments
      ↓
Contact / support
      ↓
Repayment arrangement
      ↓
Possible cure
      ↓
If failure persists
      ↓
Enforcement / property recovery
```

The property matters because it can ultimately support recovery.

---

## Personal Loan

```text
Missed instalments
      ↓
Collections
      ↓
Payment arrangement
      ↓
Possible recoveries
```

Usually no property directly securing the loan.

---

## Credit Card

```text
Minimum payment missed
      ↓
Account restrictions
      ↓
Collections
      ↓
Repayment arrangement
      ↓
Recoveries / write-off depending outcome
```

Different product.

Different recovery mechanics.

---

# 10. Cure

**Cure = previously delinquent/defaulted exposure returns to an acceptable performing status under the applicable policy definition.**

Simple illustration:

```text
Customer misses 2 payments
      ↓
Enters collections
      ↓
Pays arrears
      ↓
Resumes normal instalments
      ↓
Cure
```

Important:

```text
Arrears ≠ permanent loss
Default ≠ necessarily 100% loss
```

Some customers recover.

Some exposures recover partially.

That leads directly to **LGD** later.

---

# 11. Default

At a practical level:

> **Default = bank determines that the borrower has reached the defined state where repayment failure is sufficiently serious that the exposure is treated as defaulted.**

Default is not simply:

```text
customer missed one payment
```

And default is not the same as:

```text
write-off
```

Think:

```text
Credit deterioration
      ↓
Serious repayment problem
      ↓
Default criteria met
      ↓
Exposure classified as defaulted
```

The exact regulatory/default definition is a dedicated subject later.

For now remember:

> **Default is an event/status. Loss is the financial consequence.**

---

# 12. Default Does Not Mean the Bank Loses Everything

Suppose:

```text
Mortgage balance      £240,000
Borrower defaults
```

The bank does **not** automatically lose £240,000.

The property may be sold.

Example:

```text
Exposure at default       £240,000
Property sale proceeds    £220,000
Recovery/legal costs       £10,000

Net recovery              £210,000
Residual loss              £30,000
```

So:

```text
Default exposure  £240,000
Actual loss        £30,000
```

That difference is the entire reason **LGD exists**.

---

# 13. Write-Off

**Write-off = accounting recognition that an amount is no longer reasonably expected to be recovered.**

It occurs later in the loss lifecycle.

```text
Deterioration
    ↓
Arrears
    ↓
Default
    ↓
Collections / recovery attempts
    ↓
Some amount unrecoverable
    ↓
Write-off
```

Therefore:

```text
Default ≠ Write-off
```

Example:

```text
Credit Card EAD          £8,000
Customer defaults

Recoveries              £2,000
Remaining unrecovered   £6,000

Eventually some/all of £6,000 may be written off.
```

---

# 14. Now the Central Credit-Risk Question

For every exposure the bank ultimately wants to understand three things:

```text
1. WILL default happen?
2. IF it happens, how severe is the loss?
3. HOW MUCH will be exposed when it happens?
```

These become:

```text
PD  → Probability of Default
LGD → Loss Given Default
EAD → Exposure at Default
```

Or more intuitively:

```text
PD  = likelihood
LGD = severity
EAD = size
```

---

# 15. PD — Probability of Default

> **PD = probability that the borrower defaults during a specified horizon.**

Simple example:

```text
PD = 2%
```

means:

> Across a large population of borrowers with similar risk characteristics, roughly 2% are expected to default over the defined horizon.

It does **not** mean:

```text
This individual customer will lose 2% of the loan.
```

PD measures **whether default occurs**, not the size of the loss.

---

## Mortgage PD Example

Consider 10,000 similar mortgage accounts.

```text
Observed / estimated default rate ≈ 1%

10,000 accounts
× 1%
≈ 100 defaults
```

PD asks:

> Which borrowers are more likely to belong to those 100?

Potential mortgage risk information:

```text
Payment history
Affordability pressure
Previous arrears
Borrower indebtedness
Loan-to-value
Credit bureau deterioration
Employment/income change
Behavioural performance
```

---

## Personal Loan PD Example

```text
Customer A
Stable repayment
Low external debt
Clean bureau history
```

versus:

```text
Customer B
Increasing indebtedness
Recent missed payments elsewhere
Multiple new credit applications
```

All else equal:

```text
PD_B > PD_A
```

---

## Credit Card PD Example

```text
6 months ago
Utilisation          25%
Payments             Healthy
Cash advances        None
```

Now:

```text
Utilisation          97%
Payments             Minimum only
Missed payment       Yes
Cash advances        Repeated
```

Risk can rise before formal default occurs.

---

# 16. LGD — Loss Given Default

> **LGD = percentage of EAD the bank loses if default occurs.**

Simplified:

```text
LGD =
EAD - Recoveries
────────────────
EAD
```

subject in real modelling to recovery costs, timing and other adjustments.

---

## Mortgage LGD Example

```text
EAD                     £240,000
Net recoveries          £210,000
Loss                     £30,000

LGD = 30,000 / 240,000
    = 12.5%
```

Why relatively lower?

Because the property provides recovery value.

---

## Personal Loan LGD Example

```text
EAD                     £13,000
Recoveries               £3,000
Loss                     £10,000

LGD = 10,000 / 13,000
    ≈ 76.9%
```

No property securing the loan.

Recovery depends more heavily on collections.

---

## Credit Card LGD Example

```text
EAD                      £8,000
Recoveries               £1,500
Loss                      £6,500

LGD = 6,500 / 8,000
    = 81.25%
```

Again:

```text
Unsecured exposure
→ usually weaker recovery protection
→ potentially higher LGD
```

The exact level depends on portfolio, policy and modelling.

---

# 17. Collateral and LTV — Especially Important for Mortgages

A mortgage is usually secured by property.

Two values matter:

```text
Loan balance
Property value
```

Their relationship is:

```text
Loan-to-Value (LTV) =
Loan Balance
────────────
Property Value
```

Example:

```text
Mortgage balance       £240,000
Property value         £300,000

LTV = 240,000 / 300,000
    = 80%
```

---

## Why LTV Matters

Imagine house prices fall.

```text
Mortgage balance       £240,000
Property now worth     £220,000
```

Now:

```text
LTV = 240,000 / 220,000
    ≈ 109%
```

If the customer defaults, selling the property may no longer cover the loan.

So:

```text
Higher LTV
   ↓
smaller collateral cushion
   ↓
potentially higher loss severity
   ↓
higher LGD
```

This is why mortgage LGD behaves very differently from unsecured lending.

---

# 18. EAD — Exposure at Default

> **EAD = amount the bank expects to be exposed to at the moment default occurs.**

For simple amortising products:

```text
Current balance ≈ EAD
```

may be a reasonable intuition.

For revolving products:

```text
Current balance ≠ necessarily EAD
```

because the customer can draw further.

---

# 19. EAD — Personal Loan

```text
Original loan        £20,000
Current balance      £13,000
No further borrowing allowed under account

EAD intuition ≈ £13,000
```

The balance generally falls as repayments are made.

```text
£20k
 ↓
£18k
 ↓
£15k
 ↓
£13k
 ↓
...
 ↓
£0
```

This is an **amortising exposure**.

---

# 20. EAD — Mortgage

Similarly:

```text
Original mortgage        £300,000
Current balance          £240,000
Scheduled repayments continue

Exposure generally amortises
```

Ignoring specialised mortgage features:

```text
Current outstanding balance
≈ starting point for EAD
```

---

# 21. EAD — Credit Card

Here the problem changes.

```text
Credit limit       £10,000
Current balance     £6,000
Available credit    £4,000
```

The customer begins deteriorating.

Before default:

```text
Customer draws another £2,000
```

Now:

```text
Balance at default = £8,000
```

So:

```text
Current balance  = £6,000
EAD              = £8,000
```

That is why EAD is especially important for:

```text
Credit cards
Overdrafts
Other revolving facilities
```

---

# 22. Credit Conversion Factor — CCF

One simplified way of estimating future drawing is:

```text
EAD =
Current Drawn Amount
+
CCF × Undrawn Amount
```

Where:

> **CCF = Credit Conversion Factor**  
> proportion of the currently unused limit assumed to be drawn before default.

Example:

```text
Credit limit          £10,000
Current balance        £6,000
Undrawn amount         £4,000
CCF                       50%

EAD =
£6,000 + 50% × £4,000

= £8,000
```

Now the earlier credit-card example has a formal structure.

---

# 23. Put PD + LGD + EAD Together

Expected Loss:

```text
EL = PD × LGD × EAD
```

Think:

```text
Likelihood × Severity × Size
        ↓
Expected Loss
```

---

# 24. Mortgage — Full Example

Hypothetical portfolio estimate:

```text
Mortgage balance / EAD     £240,000
PD                              1%
LGD                            15%
```

Calculation:

```text
EL = 1% × 15% × £240,000

   = 0.01 × 0.15 × 240,000

   = £360
```

Interpretation:

> Across many equivalent mortgage exposures, the statistical expected credit loss represented by these simplified parameters is £360 per exposure.

It does **not** mean this borrower will definitely lose £360.

---

# 25. Personal Loan — Full Example

```text
EAD                    £13,000
PD                          4%
LGD                        70%
```

```text
EL = 4% × 70% × £13,000

   = £364
```

Notice:

```text
Mortgage EAD          £240,000
Personal Loan EAD      £13,000
```

Yet their simplified expected losses can be similar.

Why?

```text
Mortgage
Large exposure
but
lower PD / lower LGD

Personal Loan
Smaller exposure
but
higher PD / higher LGD
```

That is the power of decomposing risk into three dimensions.

---

# 26. Credit Card — Full Example

```text
Current balance        £6,000
Estimated EAD          £8,000
PD                         6%
LGD                       85%
```

```text
EL = 6% × 85% × £8,000

   = £408
```

The important part:

If we incorrectly used current balance instead:

```text
6% × 85% × £6,000
= £306
```

But using estimated EAD:

```text
= £408
```

Difference:

```text
£102
```

Because the borrower may draw further before default.

That is why:

> **EAD mechanics matter enormously for revolving retail products.**

---

# 27. The Three Asset Classes Side by Side

| | Mortgage | Personal Loan | Credit Card |
|---|---:|---:|---:|
| Structure | Instalment | Instalment | Revolving |
| Security | Property | Usually unsecured | Unsecured |
| Current balance | £240k | £13k | £6k |
| Illustrative EAD | £240k | £13k | £8k |
| Illustrative PD | 1% | 4% | 6% |
| Illustrative LGD | 15% | 70% | 85% |
| Illustrative EL | £360 | £364 | £408 |

The numbers are hypothetical.

The mechanics are the lesson.

```text
Mortgage
Large EAD
+
collateral
→ LGD heavily influenced by property

Personal Loan
Amortising
+
unsecured
→ recovery weaker

Credit Card
Revolving
+
unsecured
+
future drawings
→ EAD + utilisation especially important
```

---

# 28. Expected Loss Is a Portfolio Concept

Suppose a portfolio contains:

```text
100,000 similar personal loans
```

Each with simplified:

```text
EL = £364
```

Portfolio expected loss:

```text
100,000 × £364
≈ £36.4m
```

This is why credit risk is fundamentally a **portfolio discipline**.

The bank does not know exactly which customer will default.

But across large populations, it can estimate:

```text
How many may default
×
How severe those defaults may be
×
How much will be exposed
```

---

# 29. Retail Credit Risk Is Heavily Segmented

A bank rarely treats every mortgage as identical.

Portfolios are divided into meaningful segments.

Examples:

```text
Mortgage
├── low LTV
├── high LTV
├── first-time buyer
├── buy-to-let
├── current
└── delinquent
```

```text
Credit Card
├── low utilisation
├── high utilisation
├── transactor
├── revolver
├── current
└── delinquent
```

```text
Personal Loan
├── risk grade
├── loan term
├── balance band
├── customer segment
├── current
└── delinquent
```

Why?

Because:

> Customers with materially different risk behaviour should not be assumed to have identical PD, LGD or EAD.

---

# 30. Transactor vs Revolver — Credit Card Example

Useful real-world credit-card distinction.

## Transactor

Usually pays most/all balance.

```text
Monthly spend        £2,000
Payment              £2,000
Balance carried      Low
```

## Revolver

Carries balance month to month.

```text
Monthly balance      £8,000
Payment              Minimum
Interest accrues
Balance remains high
```

These customers create different:

```text
Behaviour
Profitability
Utilisation
Credit risk
```

Again:

> Same product does not mean same risk.

---

# 31. Credit Risk Changes Over Time

A customer can move:

```text
Low Risk
   ↓
Moderate Risk
   ↓
High Risk
   ↓
Delinquency
   ↓
Default
```

or recover:

```text
High Risk
   ↓
Customer finances improve
   ↓
Balances fall
   ↓
Payments normalize
   ↓
Risk improves
```

Therefore a retail risk system needs **time-series behaviour**, not only the original application data.

---

# 32. Origination Data vs Behavioural Data

## Origination data

Known when the account starts.

```text
Income
Requested loan
Loan term
Initial LTV
Bureau history
Original credit score
Employment
```

## Behavioural data

Created after the account starts.

```text
Payments
Missed payments
DPD
Balances
Utilisation
Cash advances
Limit usage
Collections history
Previous delinquency
```

This distinction will appear repeatedly in later retail modelling notes.

---

# 33. External Credit Bureau Data

A bank knows how the customer behaves **with that bank**.

A credit bureau helps show how the customer behaves across lenders.

Example:

The bank sees:

```text
Our credit card
Balance         £2,000
Payments        Current
```

But bureau data may show:

```text
Other card      £9,000
Personal loan   £15,000
Two recent missed payments
Three new applications
```

The customer's total risk picture is therefore different.

---

# 34. Credit Risk Is Not Only Default Prediction

A real retail credit-risk function needs to manage:

```text
Who should receive credit?
        ↓
How much?
        ↓
At what terms?
        ↓
How is the account behaving?
        ↓
Is risk deteriorating?
        ↓
Should the limit change?
        ↓
Should collections intervene?
        ↓
How much may eventually be lost?
```

PD is only one part.

---

# 35. Product Mechanics Drive Risk Mechanics

This is one of the most important foundations.

## Mortgage

```text
Large balance
+
long term
+
property collateral
+
property-price exposure
+
LTV
```

Key implication:

> Recovery value matters heavily.

---

## Personal Loan

```text
Fixed amount
+
fixed instalments
+
usually unsecured
+
balance amortises
```

Key implication:

> Customer repayment capacity and collections behaviour dominate.

---

## Credit Card

```text
Credit limit
+
revolving balance
+
customer can draw again
+
unsecured
+
utilisation changes continuously
```

Key implication:

> Behaviour and future exposure matter heavily.

---

# 36. Same Customer, Three Different Risks

Imagine one customer:

```text
Sarah
```

has:

### Mortgage

```text
Balance      £240,000
Property     £320,000
LTV               75%
Payments        Current
```

### Personal Loan

```text
Balance        £8,000
Payments      Current
```

### Credit Card

```text
Limit         £12,000
Balance       £11,500
Utilisation       96%
Minimum-payment behaviour
```

Sarah is one person.

But the bank sees:

```text
Mortgage risk
Personal-loan risk
Credit-card risk
Customer-level aggregate risk
```

The credit card may show deterioration before the mortgage misses a payment.

This is why retail banks monitor both:

```text
ACCOUNT LEVEL
+
CUSTOMER LEVEL
```

---

# 37. The Core Retail Credit-Risk Data Spine

Every real retail credit-risk system ultimately needs to connect:

```text
CUSTOMER
   ↓
ACCOUNT / PRODUCT
   ↓
LIMIT / ORIGINAL AMOUNT
   ↓
CURRENT BALANCE
   ↓
PAYMENT HISTORY
   ↓
DELINQUENCY / DPD
   ↓
CREDIT SCORE / RISK GRADE
   ↓
PD
   ↓
COLLATERAL / RECOVERY INFORMATION
   ↓
LGD
   ↓
LIMIT + BALANCE BEHAVIOUR
   ↓
EAD
   ↓
EXPECTED LOSS / PROVISIONING / CAPITAL / PORTFOLIO MANAGEMENT
```

If these data elements cannot be connected correctly, the risk calculation cannot be trusted.

---

# 38. Where PD / LGD / EAD Eventually Reappear

These concepts do not belong to only one calculation.

They reappear in different frameworks.

```text
                    CREDIT RISK PARAMETERS
                       PD / LGD / EAD
                              │
             ┌────────────────┴────────────────┐
             │                                 │
        ACCOUNTING                         CAPITAL
        / IFRS 9                         / REGULATION
             │                                 │
     Expected Credit Loss                  RWA / capital
```

But crucially:

> **The same acronym does not always mean the same calibration, horizon or methodology.**

Example:

```text
Accounting PD
≠ automatically
Regulatory capital PD
```

We will handle those differences later.

For now:

```text
PD  = likelihood
LGD = severity
EAD = exposure size at default
```

That foundation must be permanent.

---

# 39. Common Traps

### Trap 1

```text
PD × LGD = expected loss amount
```

Wrong.

```text
PD × LGD = expected loss rate
```

Need EAD for currency amount:

```text
EL = PD × LGD × EAD
```

---

### Trap 2

```text
Default = 100% loss
```

Wrong.

Recoveries can reduce the loss.

That is why LGD exists.

---

### Trap 3

```text
Current balance = EAD for every product
```

Wrong.

Especially for:

```text
Credit Card
Overdraft
```

future drawings matter.

---

### Trap 4

```text
Missed payment = immediate default
```

Wrong.

Delinquency develops before formal default criteria are necessarily met.

---

### Trap 5

```text
Default = write-off
```

Wrong.

```text
Default
↓
recovery process
↓
remaining unrecoverable amount
↓
possible write-off
```

---

### Trap 6

```text
All retail loans behave the same
```

Very wrong.

```text
Mortgage
≠ Personal Loan
≠ Credit Card
```

The concepts are shared.

The mechanics are not.

---

# 40. The Whole Note in One Flow

```text
CUSTOMER APPLIES
      ↓
ORIGINATION
      ↓
Income + bureau + affordability + policy + product mechanics
      ↓
CREDIT DECISION
      ↓
ACCOUNT CREATED
      ↓
BANK HAS EXPOSURE
      ↓
ACCOUNT PERFORMS
      ↓
Behaviour continuously monitored
      ↓
Possible deterioration
      ↓
ARREARS / DPD
      ↓
COLLECTIONS
      ↓
CURE ───────────────────────────→ PERFORMING
      │
      ↓
DEFAULT
      ↓
RECOVERIES
      ↓
ACTUAL LOSS
```

Risk before that outcome is summarized by:

```text
            CREDIT LOSS
                │
      ┌─────────┼─────────┐
      │         │         │
     PD        LGD       EAD
      │         │         │
Likelihood   Severity    Size
      └─────────┼─────────┘
                ↓
       EXPECTED LOSS

EL = PD × LGD × EAD
```

But the mechanics depend on the asset class:

```text
MORTGAGE
Property + LTV
→ recovery / LGD critical

PERSONAL LOAN
Unsecured + amortising
→ repayment + recovery behaviour critical

CREDIT CARD
Unsecured + revolving
→ utilisation + future drawing / EAD critical
```

---

# 41. One-Page Recall Sheet

## Retail credit lifecycle

```text
Application
→ Decision
→ Account
→ Performing
→ Deterioration
→ Arrears
→ Collections
→ Cure / Default
→ Recovery
→ Write-off
```

## Core terms

| Term | Meaning |
|---|---|
| **Borrower** | Customer who owes money |
| **Account** | Individual lending relationship |
| **Exposure** | Amount economically at risk |
| **Balance** | Amount currently outstanding |
| **Limit** | Maximum allowed borrowing |
| **Utilisation** | Balance ÷ limit |
| **Arrears** | Contractual payment unpaid |
| **DPD** | Days Past Due |
| **Cure** | Return from delinquency/default toward acceptable performance |
| **Default** | Defined serious repayment failure status |
| **Recovery** | Money collected after/default-related loss process |
| **Write-off** | Amount recognized as no longer reasonably recoverable |

## Core risk parameters

```text
PD  → Will default happen?
LGD → If it happens, what % do we lose?
EAD → How much will be exposed when it happens?
```

```text
Expected Loss = PD × LGD × EAD
```

## Asset-class intuition

```text
Mortgage
→ secured
→ property + LTV
→ LGD heavily recovery-driven

Personal Loan
→ unsecured
→ amortising
→ repayment / collections driven

Credit Card
→ unsecured
→ revolving
→ utilisation + future drawings
→ EAD especially important
```

## Never confuse

```text
Customer ≠ Account
Balance ≠ Limit
Arrears ≠ Default
Default ≠ Write-off
Default ≠ 100% loss
Current balance ≠ always EAD
PD × LGD ≠ EL amount
All retail products ≠ same risk mechanics
```

---

# Final Mental Model

Do not memorize:

```text
PD
LGD
EAD
```

in isolation.

See the actual retail account:

```text
A real customer
      ↓
takes a real retail product
      ↓
creates a real exposure
      ↓
behaves over time
      ↓
may deteriorate
      ↓
may default
      ↓
bank may recover some money
      ↓
remaining amount becomes loss
```

And the bank summarizes that uncertainty as:

```text
How likely?     → PD
How severe?     → LGD
How much?       → EAD
```

That is **retail credit risk at its foundation**.