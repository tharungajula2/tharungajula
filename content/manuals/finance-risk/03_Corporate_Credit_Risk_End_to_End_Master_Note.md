# 03 — Corporate Credit Risk — End-to-End Master Note

> **Mental model:** Corporate credit risk is the risk that a company or economic group cannot generate, preserve, or access enough cash to meet its obligations — and the bank therefore suffers loss on the facilities it has provided.
>
> **Core question:** *Can this enterprise generate enough sustainable cash through the business cycle to service its full capital structure, and if that fails, where does the bank sit in the recovery waterfall?*

---

# 1. Where Corporate Credit Risk Sits

Corporate lending is not simply “SME with bigger numbers”.

A large corporate credit can involve:

```text
Parent company
├── Operating subsidiaries
├── Holding companies
├── Foreign subsidiaries
├── Joint ventures
└── Special-purpose entities

+
Multiple banks
+
Multiple facilities
+
Bonds / capital markets debt
+
Derivatives
+
Guarantees
+
Collateral
+
Covenants
```

The bank therefore asks more than:

> “Can this company repay one loan?”

It asks:

> **How does cash move through the whole group, who legally owes what, which creditors get paid first, and what happens under stress?**

---

# 2. Retail vs SME vs Corporate — The Progression

```text
RETAIL
Person / household
→ income + bureau + behaviour
→ standardized products
→ high-volume decisioning
```

```text
SME
Business + owner
→ financials + bank conduct + working capital
→ hybrid score / analyst decisioning
```

```text
CORPORATE
Enterprise + group + capital structure
→ business risk + industry + full financial analysis
→ analyst-led rating + structured credit approval
```

### What becomes more important in corporate credit

- group structure
- legal obligor
- business model
- industry position
- management strategy
- consolidated and entity financials
- free cash flow
- leverage
- debt maturity profile
- refinancing risk
- capital structure
- seniority
- covenant package
- concentration risk
- rating migration
- scenario / stress analysis

---

# 3. The Corporate Credit Unit: Obligor, Group, Facility

These must never be blurred.

## Obligor

The legal entity that owes money.

```text
ABC Manufacturing plc
→ borrower / obligor
```

## Group

The wider economic family.

```text
ABC Holdings plc
├── ABC Manufacturing plc
├── ABC Distribution Ltd
├── ABC Europe GmbH
└── ABC Property Ltd
```

## Facility

The specific credit agreement.

Examples:

```text
£100m RCF
£250m term loan
£50m overdraft
£75m guarantee line
```

### Key mental model

```text
Credit assessment
=
legal obligor
+
economic group
+
facility structure
+
security / guarantees
+
capital structure
```

The **group** tells you where economic strength sits.

The **obligor** tells you who legally owes the bank.

The **facility** tells you what the bank has actually committed.

---

# 4. Why Legal Structure Matters

Suppose:

```text
Parent HoldCo
   ↓ owns
Operating Company
   ↓ generates cash
Property Company
   ↓ owns factories
```

The bank lends to the **holding company**.

But cash is generated lower in the group.

Repayment may therefore depend on:

```text
Dividends
Intercompany payments
Upstream guarantees
Asset transfers
```

If those are restricted:

> A profitable group can still leave the borrowing entity unable to pay.

This is called **structural subordination**.

### Structural subordination intuition

```text
Operating company creditors
get paid from operating assets first

then excess cash may move upward

HoldCo creditors depend on what remains
```

So:

> **Same group. Different legal entity. Different recovery position.**

---

# 5. The End-to-End Corporate Credit Lifecycle

```text
1. Client / transaction opportunity
        ↓
2. Group and legal-entity identification
        ↓
3. Facility request / purpose
        ↓
4. KYC + documentation
        ↓
5. Business / industry analysis
        ↓
6. Financial spreading + normalization
        ↓
7. Cash-flow / leverage analysis
        ↓
8. Forecast + stress case
        ↓
9. Internal rating / PD
        ↓
10. Facility structure + EAD
        ↓
11. Security / seniority + LGD
        ↓
12. Credit proposal
        ↓
13. Credit approval / committee
        ↓
14. Documentation + conditions precedent
        ↓
15. Drawdown / utilization
        ↓
16. Ongoing monitoring
        ↓
17. Annual / periodic review
        ↓
18. Early warning / watchlist
        ↓
19. Restructure / workout
        ↓
20. Default / enforcement / recovery
```

Corporate credit is therefore:

> **a continuing judgement about enterprise cash flow, not a one-time approval event.**

---

# 6. Start With the Facility Purpose

A corporate credit request should always answer:

> **Why does the company need the money?**

Typical purposes:

- working capital
- capital expenditure
- acquisition
- refinancing existing debt
- seasonal funding
- liquidity backstop
- bridge financing
- project funding
- trade finance
- general corporate purposes

The purpose matters because it tells you:

```text
what creates the borrowing need
+
how long the need should exist
+
what source will repay it
```

### Example

Bad structure:

```text
10-year asset
funded by
1-year debt
```

This creates refinancing risk.

Better principle:

> **Funding tenor should broadly match the economic life of the need being financed.**

---

# 7. Common Corporate Facilities

## 7.1 Revolving Credit Facility — RCF

Committed line that can be:

```text
drawn
repaid
redrawn
```

Typical use:

- liquidity buffer
- working capital
- general corporate purposes

Example:

```text
RCF limit      £300m
Drawn          £120m
Undrawn        £180m
```

Current exposure is not the whole risk.

The company may draw more in stress.

That is why **EAD** matters.

---

## 7.2 Term Loan

Fixed borrowing repaid:

- through amortisation
- in a bullet payment at maturity
- or a combination

Example:

```text
£200m
5-year term
£20m annual amortisation
remaining balance due at maturity
```

---

## 7.3 Bridge Loan

Short-term financing intended to be replaced by another source.

Example:

```text
Acquisition closes today
      ↓
Bank provides bridge loan
      ↓
Company later issues bond / sells assets / raises equity
      ↓
Bridge repaid
```

Main risk:

> **What if the expected refinancing never happens?**

---

## 7.4 Acquisition Finance

Used to finance purchase of another company.

Risk typically increases because:

```text
Debt rises immediately
+
integration risk rises
+
synergies may not arrive
+
cash flow may weaken
```

The bank therefore focuses heavily on **pro forma leverage**.

---

## 7.5 Overdraft / Working-Capital Line

Used for short-term liquidity.

Permanent heavy use can indicate:

> the business is funding a structural cash deficit with short-term bank debt.

---

## 7.6 Trade / Guarantee Facilities

Examples:

- letters of credit
- performance guarantees
- standby letters
- bid bonds

The bank may not have paid cash yet.

But the commitment can become a funded exposure.

---

# 8. Source of Repayment Comes Before Collateral

Corporate credit still starts with:

> **What cash will repay us?**

Typical repayment sources:

1. operating cash flow
2. working-capital release
3. asset disposal
4. refinancing
5. equity injection
6. parent support
7. collateral realization after default

### Primary source

Normal sustainable cash flow.

### Secondary source

Collateral / guarantees / asset sale.

Good corporate credit:

```text
Primary repayment
works on its own

+
Secondary repayment
protects the downside
```

Bad credit logic:

> “The company is weak, but the assets are valuable.”

That may be a recovery argument.

It is not automatically a lending argument.

---

# 9. Business Risk Comes Before the Ratios

Financial ratios are outputs of a business model.

Before reading them, understand:

```text
What does the company sell?
Who buys it?
Why do customers choose it?
How cyclical is demand?
What are fixed vs variable costs?
What pricing power exists?
What can disrupt the business?
```

### Example

Two companies both report:

```text
EBITDA margin = 15%
```

Company A:

- subscription revenue
- diversified customers
- low capex
- high recurring revenue

Company B:

- commodity producer
- volatile selling prices
- high fixed costs
- high capex

Same margin.

Very different credit risk.

---

# 10. Industry Risk

Corporate credit always sits inside an industry cycle.

Questions:

- Is the sector cyclical?
- Is demand defensive or discretionary?
- Are margins structurally stable?
- Is the industry regulated?
- Are barriers to entry high?
- Is technology disrupting it?
- Is the sector capital intensive?
- Are input prices volatile?
- Is there geopolitical exposure?

### Examples

```text
Utilities
→ more stable demand
→ heavy regulation
→ high capex
```

```text
Airlines
→ cyclical demand
→ fuel-price exposure
→ high fixed costs
→ asset-heavy
```

```text
Technology software
→ lower hard assets
→ potentially high recurring revenue
→ fast competitive disruption
```

A good analyst never reads ratios without the sector context.

---

# 11. Competitive Position

Ask:

> **Why should this company still be producing cash five years from now?**

Useful indicators:

- market share
- brand
- cost advantage
- patents / IP
- switching costs
- customer stickiness
- distribution network
- regulatory license
- scale
- product diversification

Weak competitive position often appears later as:

```text
price cuts
↓
margin compression
↓
cash flow decline
↓
leverage rises
```

---

# 12. Customer and Supplier Concentration

Example:

```text
Top customer = 28% of revenue
Top 5 customers = 62%
```

Question:

> What happens if the largest one disappears?

Likewise:

```text
Single supplier
provides 70% of critical raw material
```

This may be operational concentration risk even if customer concentration is low.

Corporate credit therefore asks:

```text
Who can hurt the company
without the company controlling it?
```

---

# 13. Management and Governance

Corporate credit is not only numbers.

Management determines:

- leverage strategy
- acquisitions
- dividends
- capex
- hedging
- asset sales
- refinancing
- risk appetite

Questions:

- Is management credible?
- Has guidance historically been reliable?
- Is leverage treated conservatively?
- Are acquisitions disciplined?
- Is there strong board oversight?
- Are related-party transactions material?
- Is ownership stable?

### Key idea

> A strong business can become a weak credit through aggressive financial policy.

---

# 14. Financial Statements — The Three Views

## Income Statement

Shows profitability over a period.

```text
Revenue
− operating costs
= EBITDA
− depreciation
= EBIT
− interest
= pre-tax profit
− tax
= net income
```

Question:

> Is the business earning enough?

---

## Balance Sheet

Shows financial position at a point in time.

```text
Assets
=
Liabilities + Equity
```

Questions:

- how much debt exists?
- what assets support the business?
- what liquidity exists?
- what liabilities rank ahead of us?
- how much equity cushion exists?

---

## Cash Flow Statement

Shows actual cash movement.

Questions:

- is EBITDA converting to cash?
- how much capex is required?
- what happens to working capital?
- are dividends draining liquidity?
- is debt being funded from operations or refinancing?

---

# 15. Corporate Credit Lives in Cash Flow

Accounting earnings do not repay debt.

Cash does.

A simplified bridge:

```text
EBITDA
− cash tax
− cash interest
− working-capital investment
− capital expenditure
= Free Cash Flow before debt movements
```

Then:

```text
Free cash flow
− debt amortisation
− dividends
− acquisitions
= residual liquidity
```

### Example

```text
EBITDA                         £500m
Cash interest                  £100m
Cash tax                        £60m
Working-capital outflow        £120m
Capex                          £180m
-----------------------------------
Free cash flow                  £40m
```

A £500m EBITDA business may only generate £40m of real discretionary cash.

That distinction matters enormously.

---

# 16. Financial Spreading

Corporate accounts are converted into standardized credit-analysis fields.

Why?

```text
reported financial statements
↓
bank-defined categories
↓
consistent ratio calculation
↓
historical trend
↓
peer comparison
↓
rating inputs
```

Typical adjustments:

- lease treatment
- pension obligations
- one-off restructuring costs
- asset-sale gains
- exceptional litigation expense
- acquisition-related items
- non-recurring income

The objective is:

> **economic comparability, not cosmetic improvement.**

---

# 17. Normalized EBITDA

Reported EBITDA may contain one-offs.

Example:

```text
Reported EBITDA                     £420m
+ one-off restructuring cost         £40m
− one-off gain on asset sale         £25m
-----------------------------------------
Normalized EBITDA                   £435m
```

But be careful.

If “one-off restructuring costs” appear every year:

> they are no longer economically one-off.

### Trap

Aggressive add-backs:

```text
reported EBITDA
+
future synergies
+
cost savings not yet delivered
+
restructuring add-backs
```

can create fictional debt capacity.

---

# 18. Revenue and Margin Trend

Growth alone is not enough.

Example:

```text
Revenue
Year 1  £2.0bn
Year 2  £2.3bn
Year 3  £2.6bn
```

But:

```text
EBITDA margin
Year 1  18%
Year 2  15%
Year 3  11%
```

Possible interpretation:

> Company is growing, but growth is becoming less profitable.

Corporate analysts look at:

```text
growth
+
margin
+
cash conversion
+
capital intensity
```

together.

---

# 19. Leverage — Debt Relative to Earnings

## Debt / EBITDA

```text
Debt / EBITDA = Total Debt / EBITDA
```

Example:

```text
Debt      £2.4bn
EBITDA    £800m

Debt / EBITDA = 3.0x
```

Interpretation:

> The company carries debt equal to roughly three times one year of current EBITDA.

But leverage cannot be judged in isolation.

A stable infrastructure company may support more leverage than a cyclical manufacturer.

---

# 20. Net Debt / EBITDA

If the company holds cash:

```text
Net Debt = Gross Debt − Available Cash
```

Then:

```text
Net Debt / EBITDA
```

Example:

```text
Gross debt     £2.4bn
Cash           £0.5bn
Net debt       £1.9bn
EBITDA         £0.8bn

Net leverage   2.38x
```

### Important trap

Not all cash is truly available.

Cash may be:

- trapped in subsidiaries
- needed for operations
- restricted
- pledged

So analysts may use **adjusted available cash**, not blindly total balance-sheet cash.

---

# 21. Interest Coverage

Common forms include:

```text
EBITDA / Interest
```

or

```text
EBIT / Interest
```

Example:

```text
EBITDA        £800m
Interest      £160m

Coverage      5.0x
```

Question:

> How much earnings cushion exists before interest becomes difficult to pay?

---

# 22. Fixed-Charge / Debt-Service Coverage

For businesses with material:

- leases
- mandatory amortisation
- preferred payments
- other fixed obligations

a broader coverage measure may be more useful than simple interest coverage.

Core idea:

```text
cash available
──────────────
fixed financial obligations
```

The exact bank formula must be defined.

Do not assume every “coverage ratio” means the same thing.

---

# 23. Free Cash Flow — FCF

A simplified corporate-credit form:

```text
FCF
=
EBITDA
− cash interest
− cash tax
− capex
− working-capital investment
```

Positive FCF gives the company options:

- reduce debt
- hold liquidity
- fund acquisitions
- pay dividends

Negative FCF means it must use:

- cash reserves
- new debt
- equity
- asset sales

Repeated negative FCF is a major credit signal.

---

# 24. Capital Expenditure — Maintenance vs Growth

Not all capex is equally optional.

## Maintenance capex

Needed to keep the business running.

## Growth capex

Used to expand capacity.

Credit analysts care because:

> A company cannot simply stop maintenance capex forever to make free cash flow look better.

Example:

```text
Reported capex         £300m
Maintenance estimate   £220m
Growth capex             £80m
```

Under stress, perhaps growth capex can be delayed.

Maintenance capex often cannot.

---

# 25. Working Capital

Corporate businesses can consume or release huge amounts of cash through:

- receivables
- inventory
- payables

Example:

```text
Revenue rises
but
receivable days rise faster
```

Then growth may be cash-negative.

Useful metrics:

```text
Receivable Days
Inventory Days
Payable Days
Cash Conversion Cycle
```

Same mechanics as SME.

But the absolute cash impact can be hundreds of millions.

---

# 26. Liquidity — Can It Survive Before Maturity?

A company can be solvent but still fail because it cannot meet near-term obligations.

Corporate liquidity analysis typically includes:

```text
Cash
+
Undrawn committed bank facilities
+
Expected operating cash flow
+
Asset-sale capacity
```

against:

```text
Debt maturities
+
Capex
+
Interest
+
Working-capital needs
+
Dividends
```

---

# 27. Debt Maturity Profile

Example:

```text
2027   £150m
2028   £200m
2029   £900m
2030   £250m
```

The 2029 concentration is a **maturity wall**.

Question:

> Can the company refinance £900m when that date arrives?

This creates **refinancing risk**.

A company can be profitable today but still become distressed if capital markets close.

---

# 28. Refinancing Risk

Debt is often repaid with new debt.

That is normal.

But it creates dependence on:

- bank appetite
- bond markets
- interest rates
- credit rating
- investor confidence

Example:

```text
Bond matures in 12 months      £500m
Cash                            £80m
FCF next year                  £100m
Undrawn RCF                    £150m
```

Total internal liquidity:

```text
£330m
```

Maturity:

```text
£500m
```

Gap:

```text
£170m
```

The company must refinance, sell assets, raise equity, or restructure.

---

# 29. Capital Structure — Who Gets Paid First?

A corporate borrower may have:

```text
Secured bank debt
Senior unsecured bonds
Subordinated debt
Shareholder loans
Preferred equity
Common equity
```

A simplified recovery waterfall:

```text
Secured creditors
      ↓
Senior unsecured creditors
      ↓
Subordinated creditors
      ↓
Preferred equity
      ↓
Common equity
```

Higher position:

```text
better recovery protection
→ potentially lower LGD
```

Lower position:

```text
worse recovery protection
→ potentially higher LGD
```

---

# 30. Seniority

Two loans to the same company can have different risk.

Example:

```text
Facility A
Senior secured
first-ranking charge

Facility B
Subordinated unsecured
```

Same obligor PD.

Different recovery position.

Therefore:

```text
PD
often primarily obligor-driven

LGD
often heavily facility / seniority / collateral-driven
```

This is one of the cleanest corporate-credit distinctions.

---

# 31. Collateral

Typical corporate collateral:

- property
- plant
- machinery
- receivables
- inventory
- shares in subsidiaries
- cash
- intellectual property

Credit questions:

1. Is the security legally enforceable?
2. What is the realistic recovery value?
3. Who ranks ahead?
4. How volatile is the value?
5. How quickly can it be sold?
6. Is it essential to keeping the business alive?

### Important

Book value is not recovery value.

```text
Book value
≠
market value
≠
forced-sale value
≠
net recovery value
```

---

# 32. Guarantees

Possible forms:

- parent guarantee
- subsidiary guarantee
- cross guarantee
- shareholder guarantee
- government guarantee

A guarantee is only useful if:

```text
legal enforceability
+
guarantor capacity
+
access to guarantor assets
```

all hold.

A guarantee from an equally weak group company does not materially improve risk.

---

# 33. Structural Subordination

Suppose a HoldCo borrows.

Operating assets and cash sit in subsidiaries.

Subsidiary creditors may have first claim on subsidiary assets.

So:

```text
OpCo generates cash
      ↓
OpCo creditors paid
      ↓
remaining cash may move upward
      ↓
HoldCo creditors paid
```

Thus:

> HoldCo debt can be economically weaker even if the consolidated group looks strong.

This is a classic corporate-credit issue.

---

# 34. Internal Rating

Corporate borrowers commonly receive an internal rating.

Example:

```text
Grade 1
Grade 2
...
Grade 10
```

The exact scale differs by bank.

The rating typically combines:

```text
Business risk
+
Financial risk
+
Management / qualitative factors
+
Country / industry factors
+
Possible overrides
```

The rating then maps to a PD.

Example:

```text
Internal grade 5
→ 1-year PD = 1.2%
```

---

# 35. Obligor Rating vs Facility Rating

Do not confuse them.

## Obligor rating

Question:

> How likely is the borrower to default?

Primarily linked to **PD**.

## Facility rating

Question:

> If default happens, how much is this specific facility likely to recover?

More influenced by:

- seniority
- collateral
- guarantees
- structure

So:

```text
Same company
+
different facilities
=
same / similar PD
but potentially different LGD
```

---

# 36. PD in Corporate Credit

**PD — Probability of Default**

```text
PD = probability borrower defaults over a defined horizon
```

Corporate PD inputs may include:

- leverage
- coverage
- profitability
- size
- volatility
- industry
- business position
- liquidity
- management
- external rating / market signals where relevant

### Key intuition

PD asks:

> **Will the obligor fail?**

It does not ask:

> “How much will the bank lose?”

That is LGD.

---

# 37. LGD in Corporate Credit

**LGD — Loss Given Default**

```text
LGD
=
economic loss
─────────────
EAD at default
```

Main drivers:

- secured vs unsecured
- seniority
- collateral
- guarantees
- industry
- recovery costs
- time to recovery
- restructuring value
- enterprise value

### Example

```text
EAD                    £100m
Net recovery            £65m
Loss                    £35m

LGD = 35%
```

---

# 38. Enterprise Value and Recovery

Corporate recoveries often depend on the business as a going concern.

Example:

```text
Enterprise value in distress   £700m
Senior secured debt            £400m
Senior unsecured debt          £250m
Subordinated debt              £200m
```

Total debt:

```text
£850m
```

There is not enough enterprise value to repay everyone fully.

Simplified waterfall:

```text
£700m enterprise value
− £400m secured
= £300m remaining

Senior unsecured claims = £250m
→ potentially full recovery before costs

Remaining £50m
for £200m subordinated debt
→ much weaker recovery
```

Same company.

Very different LGD by creditor class.

---

# 39. EAD in Corporate Credit

**EAD — Exposure at Default**

For a fully drawn term loan:

```text
EAD ≈ expected outstanding amount at default
```

For committed revolving facilities:

```text
EAD
=
Drawn
+
CCF × Undrawn
```

Example:

```text
RCF limit            £300m
Drawn                £120m
Undrawn              £180m
CCF                    50%

EAD
= 120 + 50% × 180
= £210m
```

Why?

> Companies often draw committed liquidity when stress begins.

---

# 40. Expected Loss

Simplified one-horizon equation:

```text
Expected Loss
=
PD × LGD × EAD
```

Example:

```text
PD      1.5%
LGD      40%
EAD     £210m
```

```text
EL
=
0.015 × 0.40 × £210m
=
£1.26m
```

Interpretation:

> Statistical expected credit loss over the stated horizon under those parameter definitions.

Do not confuse this simplified EL equation with full accounting ECL methodology.

---

# 41. Credit Structuring Changes Risk

The bank does not only choose:

```text
approve
or
decline
```

It can change the structure.

Borrower asks:

```text
£500m
7-year
unsecured
bullet maturity
```

Bank may instead approve:

```text
£400m
5-year
part-amortising
senior secured
financial covenants
mandatory prepayment from asset sales
```

Risk changes because:

```text
lower amount
+
shorter tenor
+
amortisation
+
security
+
covenants
```

all reduce downside exposure.

---

# 42. Covenants

Corporate covenants are early-warning and control tools.

## Financial covenants

Examples:

```text
Net Debt / EBITDA ≤ 3.5x
Interest Coverage ≥ 3.0x
Minimum liquidity ≥ £100m
```

## Negative covenants

Examples:

```text
No additional secured debt
No major asset disposal
No acquisition above threshold
No dividend above agreed limit
```

## Information covenants

Examples:

```text
Quarterly financials
Annual audited accounts
Compliance certificate
Budget / forecast
```

A covenant breach does not automatically mean insolvency.

It means:

> the contractual risk boundary has been crossed and the bank gains an intervention point.

---

# 43. Headroom

Suppose covenant:

```text
Net Debt / EBITDA ≤ 4.0x
```

Current leverage:

```text
3.2x
```

Headroom:

```text
0.8x
```

But under stress:

```text
EBITDA falls
→ leverage rises to 4.3x
```

Now covenant breach becomes plausible.

Corporate analysts therefore care about:

> **current ratio + stressed headroom**

not only current compliance.

---

# 44. Forecasting

Historical financials explain the past.

Credit approval depends on the future.

Typical forecast:

```text
Revenue
EBITDA
Working capital
Capex
Interest
Free cash flow
Debt
Liquidity
Leverage
Coverage
```

### Good forecast analysis asks

- What assumptions drive growth?
- What happens if pricing weakens?
- What if volume falls?
- What capex is unavoidable?
- What debt matures?
- Is refinancing assumed?
- Are acquisition synergies already included?

Forecast quality matters more than forecast precision.

---

# 45. Base Case vs Stress Case

## Base case

Management / bank-adjusted expected path.

## Stress case

Plausible downside.

Example:

```text
BASE
Revenue       £4.0bn
EBITDA         £700m
Net leverage    2.8x
Coverage        5.0x
```

Stress:

```text
Revenue       -15%
Margin        -300 bps
Rates         +200 bps
Working capital outflow
```

Result:

```text
EBITDA         £430m
Net leverage    4.6x
Coverage        2.1x
```

Credit question:

> Can the company still pay, refinance, and remain inside acceptable risk limits?

---

# 46. Reverse Thinking — What Breaks the Credit?

A strong analyst asks:

> **What would have to happen for this borrower to default?**

Possible paths:

```text
Revenue collapse
+
fixed costs remain high
+
EBITDA falls
+
cash burns
+
ratings downgrade
+
refinancing closes
+
liquidity exhausted
```

This produces a much better understanding than simply saying:

> “The company is investment grade today.”

---

# 47. Credit Proposal / Credit Memo

Typical corporate memo:

```text
1. Executive recommendation
2. Borrower / group structure
3. Facility request
4. Purpose
5. Business model
6. Industry / competitive position
7. Management / ownership
8. Historical financials
9. Forecast financials
10. Leverage / coverage / liquidity
11. Debt maturity profile
12. Rating / PD
13. Facility structure / EAD
14. Security / seniority / LGD
15. Key risks
16. Mitigants
17. Covenants
18. Stress case
19. Policy exceptions
20. Recommendation
```

Good credit writing converts data into decision logic.

Not:

> EBITDA fell 12%.

But:

> EBITDA fell 12% because lower volume and weak pricing compressed margins; leverage rose from 2.8x to 3.5x, reducing covenant headroom and increasing refinancing dependence ahead of the 2028 maturity.

That is credit analysis.

---

# 48. Approval Authority

Approval typically depends on:

- exposure
- risk grade
- tenor
- collateral
- policy exceptions
- country
- sector
- concentration
- transaction complexity

Typical path:

```text
Relationship / originator
      ↓
Credit analyst
      ↓
Senior credit officer
      ↓
Credit committee
```

Large or unusual transactions may require:

- higher-level committee
- regional approval
- group-level approval
- specialist risk approval

---

# 49. Conditions Precedent

A facility may be approved but not yet drawable.

Conditions precedent can include:

- signed legal documents
- guarantees executed
- security perfected
- minimum equity injection
- repayment of existing debt
- insurance evidence
- legal opinions
- covenant certificates

So:

```text
Approved
≠
ready to draw
```

This distinction matters operationally and legally.

---

# 50. Ongoing Monitoring

After drawdown, the bank monitors:

## Financial

- revenue
- EBITDA
- leverage
- coverage
- cash flow
- liquidity
- working capital

## Structural

- debt maturity
- acquisitions
- asset sales
- dividends
- new borrowing

## Behavioural

- excesses
- payment delays
- covenant breach
- repeated waiver requests

## External

- rating downgrade
- share-price collapse
- bond spread widening
- litigation
- adverse news
- sector shock

---

# 51. Market Signals

For listed / market-funded corporates, deterioration may appear in markets before accounts.

Examples:

```text
Bond yield ↑
Credit spread ↑
Share price ↓
CDS spread ↑
External rating outlook worsens
```

These do not automatically mean default.

But they can be powerful early-warning indicators.

---

# 52. Early Warning Indicators

Examples:

```text
EBITDA down 20%
Leverage rises sharply
FCF turns negative
Liquidity buffer shrinks
Covenant headroom < 10%
Bond spread doubles
External rating downgraded
Major customer lost
Large acquisition announced
Auditor resigns
```

The pattern matters.

Example:

```text
FCF negative
+
maturity wall approaching
+
rating downgrade
+
RCF rapidly drawn
```

Together:

> serious refinancing / liquidity stress.

---

# 53. Watchlist

Watchlist means heightened risk attention.

Typical reasons:

- financial deterioration
- covenant breach
- refinancing difficulty
- management issue
- external downgrade
- sector shock
- restructuring discussion
- liquidity stress

Think:

```text
Normal
  ↓
Early warning
  ↓
Watchlist
  ↓
Restructure / workout
  ↓
Default
```

Watchlist is not automatically default.

---

# 54. Annual / Periodic Review

Typical review:

```text
Updated financials
Updated forecast
New internal rating
Debt maturity profile
Covenant compliance
Liquidity
Industry outlook
Limit utilization
Security review
Stress case
```

Possible outcomes:

```text
renew
increase
reduce
reprice
tighten covenants
add security
shorten tenor
exit
```

---

# 55. Refinancing Stress

Example:

```text
Debt maturity next year      £800m
Cash                         £150m
Undrawn RCF                  £250m
Expected FCF                 £100m
```

Available liquidity:

```text
£500m
```

Gap:

```text
£300m
```

If capital markets are open:

```text
manageable
```

If markets close:

```text
serious credit problem
```

This is why:

> **liquidity and refinancing access can matter as much as profitability.**

---

# 56. Restructuring

When original terms are no longer realistic:

Possible actions:

- extend maturity
- reduce interest temporarily
- amend covenants
- require asset sales
- convert debt
- inject equity
- add security
- restrict dividends
- refinance facilities

The objective:

> maximize recovery value, not simply delay recognition of deterioration.

---

# 57. Default and Workout

After default, focus shifts from:

```text
Can ordinary operations repay us?
```

to:

```text
What recovery path creates the highest value?
```

Possible routes:

- consensual restructuring
- debt-for-equity swap
- asset sale
- refinancing
- enforcement
- insolvency
- liquidation

Corporate recovery may depend on preserving the company as a going concern.

Destroying the business can reduce recovery.

---

# 58. Recovery Waterfall

Simplified example:

```text
Distressed enterprise value     £900m

Secured debt                    £500m
Senior unsecured                £300m
Subordinated                    £250m
```

After secured debt:

```text
£400m remains
```

Senior unsecured can potentially recover fully:

```text
£300m
```

Remaining:

```text
£100m
```

Subordinated recovery:

```text
£100m / £250m
= 40%
```

Therefore:

```text
LGD ≈ 60%
```

before costs / timing adjustments.

This is why capital structure matters directly to loss severity.

---

# 59. Portfolio Concentration

One excellent corporate loan can still contribute to a dangerous portfolio.

Concentrations:

- sector
- geography
- country
- single name
- corporate group
- product
- collateral type
- rating
- maturity
- sponsor / ownership

Example:

```text
12% of portfolio = commercial property
10% = airlines
9% = one large conglomerate
```

The bank must ask:

> What happens if one common shock hits several large exposures at once?

---

# 60. Large Exposure Risk

Corporate books are often concentrated.

Retail:

```text
millions of small exposures
```

Corporate:

```text
few thousand / few hundred material names
```

One default can materially move:

- provisions
- capital
- portfolio loss
- management attention

So single-name risk matters much more.

---

# 61. Corporate Credit vs Market Risk

Suppose the bank holds:

```text
Company bond
```

Two things can happen:

```text
Issuer credit quality worsens
→ credit risk

Market interest rates move
→ market value changes
```

If the position sits in a trading portfolio, market-risk treatment may also matter.

But from a credit perspective, the core question remains:

> Will the issuer pay contractual obligations?

---

# 62. One Full Corporate Example — End to End

## Borrower

**Northstar Industrial plc**

Business:

```text
European packaging manufacturer
Revenue                  £4.0bn
EBITDA                   £600m
Gross debt               £1.8bn
Cash                     £300m
Net debt                 £1.5bn
```

Requested:

```text
£400m 5-year RCF
Purpose: refinance existing facility + liquidity backstop
```

---

## Step 1 — Business Risk

Positives:

- top-3 market position
- diversified geography
- recurring customer base
- established plants

Risks:

- cyclical end markets
- energy-price exposure
- top customer = 18%
- high maintenance capex

---

## Step 2 — Historical Trend

```text
                  Y1        Y2        Y3
Revenue          £3.6bn    £3.8bn    £4.0bn
EBITDA            £650m     £630m     £600m
EBITDA margin      18.1%     16.6%     15.0%
FCF                £280m     £190m      £90m
```

Headline:

> Revenue is growing.

Credit interpretation:

> Margin and free cash flow are deteriorating.

---

## Step 3 — Leverage

```text
Net debt     £1.5bn
EBITDA       £0.6bn

Net Debt / EBITDA
= 2.5x
```

Base-case leverage still manageable.

---

## Step 4 — Liquidity

```text
Cash                         £300m
Existing undrawn facilities  £150m
Expected next-year FCF        £80m
```

Total:

```text
£530m
```

But debt due in 18 months:

```text
£700m
```

Refinancing matters.

---

## Step 5 — Stress

Assume:

```text
Revenue      -12%
Margin       -250 bps
Energy cost  +20%
Interest     +150 bps
```

Stressed:

```text
EBITDA       £390m
Net debt     £1.7bn
Leverage     4.36x
FCF          negative
```

Now the credit looks materially weaker.

---

## Step 6 — Structure

Instead of simply approving £400m unsecured:

Bank may require:

```text
Facility             £400m
Tenor                5 years
Seniority            senior unsecured
Covenant             Net Debt / EBITDA ≤ 3.75x
Minimum liquidity    £150m
Dividend restriction if leverage > threshold
Quarterly reporting
```

---

## Step 7 — Rating

Illustrative:

```text
Internal grade 5
PD = 1.5%
```

---

## Step 8 — EAD

```text
RCF limit        £400m
Expected drawn   £220m
Undrawn          £180m
CCF               50%

EAD
= 220 + 0.50 × 180
= £310m
```

---

## Step 9 — LGD

Assume senior unsecured recovery expectation:

```text
LGD = 45%
```

---

## Step 10 — Expected Loss

```text
EL
=
1.5% × 45% × £310m
=
£2.0925m
```

Simplified one-horizon expected loss.

---

## Step 11 — Six Months Later

Observed:

```text
Major customer cuts volumes
EBITDA forecast reduced 20%
Bond spread widens sharply
External rating downgraded
RCF drawings rise to £320m
```

The real story:

```text
earnings ↓
+
market confidence ↓
+
liquidity usage ↑
+
refinancing dependence ↑
```

Result:

```text
re-rate borrower
→ reassess PD
→ review covenant headroom
→ watchlist
→ increase monitoring
→ consider restructuring / tighter controls
```

That is corporate credit risk as a living process.

---

# 63. Corporate Credit — Whole Flow on One Screen

```text
ENTERPRISE
What does it do?
Where does cash come from?
What can disrupt it?
        ↓
GROUP
Which entity owes us?
Where are assets and cash?
Who guarantees whom?
        ↓
FINANCIALS
Revenue
Margins
EBITDA
Cash flow
Working capital
Capex
        ↓
CAPITAL STRUCTURE
Debt
Seniority
Maturities
Liquidity
Refinancing
        ↓
RATING
Business risk
+
Financial risk
→ Obligor grade
→ PD
        ↓
FACILITY
Amount
Tenor
Drawn / undrawn
Covenants
        ↓
RECOVERY
Security
Guarantees
Seniority
Enterprise value
→ LGD
        ↓
EXPOSURE
Drawn
+
Potential future draw
→ EAD
        ↓
EXPECTED LOSS
PD × LGD × EAD
        ↓
APPROVAL
Credit memo
Committee
Conditions precedent
        ↓
MONITORING
Financials
Covenants
Markets
Liquidity
        ↓
DETERIORATION
Watchlist
Restructure
        ↓
DEFAULT
Workout
Recovery waterfall
Actual loss
```

---

# 64. Fast Diagnostic — When You Open a Corporate Credit File

Ask these in order:

1. **What exactly does the company do?**
2. **Which legal entity owes us money?**
3. **What does the wider group look like?**
4. **Why is the facility needed?**
5. **What is the primary repayment source?**
6. **How strong is the business position?**
7. **How cyclical is the industry?**
8. **Are earnings converting into free cash flow?**
9. **How leveraged is the company?**
10. **What debt matures, and when?**
11. **How much liquidity exists?**
12. **Does repayment depend on refinancing?**
13. **What happens in the downside case?**
14. **Where does our facility rank?**
15. **What collateral / guarantees exist?**
16. **What are the covenant headrooms?**
17. **What could make the rating deteriorate?**
18. **What would recovery look like if default occurred?**

If these are clear, the credit is largely clear.

---

# 65. Corporate vs SME — The Clean Distinction

| Dimension | SME | Corporate |
|---|---|---|
| Borrower | owner-managed business | company / economic group |
| Owner relevance | often critical | usually less direct |
| Decision style | hybrid | analyst-led |
| Financial analysis | important | central and deeper |
| Group structure | sometimes | often critical |
| Capital structure | simpler | often complex |
| Debt instruments | mainly bank facilities | bank debt + bonds + other instruments |
| Market signals | limited | often useful |
| Refinancing risk | important | often central |
| Covenants | common in larger cases | central |
| Seniority / structural subordination | simpler | major issue |
| Enterprise-value recovery | less common | often important |
| Credit committee | larger SMEs | standard for material names |
| Portfolio risk | sector / owner concentration | sector + country + group + single-name concentration |

---

# 66. Final Corporate Cheatsheet

## Business

```text
Business model
→ how cash is created

Industry
→ cycle + external pressure

Competitive position
→ ability to preserve margins

Management
→ financial policy + execution
```

## Financials

```text
Revenue
→ scale / direction

EBITDA
→ operating earnings

Margins
→ business quality

Free Cash Flow
→ actual debt-paying capacity

Net Debt / EBITDA
→ leverage

Interest / fixed-charge coverage
→ payment cushion

Liquidity
→ survival capacity

Debt maturity profile
→ refinancing risk
```

## Credit Structure

```text
Obligor
→ who legally owes us

Group
→ where economic strength sits

Facility
→ what the bank has committed

Seniority
→ where we rank

Collateral / guarantees
→ downside protection

Covenants
→ early intervention rights
```

## Credit Parameters

```text
PD
→ likelihood borrower defaults

LGD
→ severity of loss after default

EAD
→ exposure when default occurs

EL
→ PD × LGD × EAD
```

## Monitoring

```text
Financial trend
Covenant headroom
Liquidity
Debt maturities
Market signals
Rating migration
Sector risk
Management actions
```

---

# 67. Never Confuse

```text
Group ≠ Legal obligor

Profit ≠ Cash flow

EBITDA ≠ Free cash flow

Gross debt ≠ Net debt

Cash on balance sheet ≠ always available cash

Current exposure ≠ always EAD

Obligor risk ≠ Facility recovery risk

PD ≠ LGD

Strong collateral ≠ strong repayment capacity

Covenant breach ≠ automatically default

Watchlist ≠ default

Refinancing need ≠ default
but
refinancing failure can cause default
```

---

# 68. The One Sentence to Retain

> **Corporate credit risk is the discipline of deciding whether an enterprise and its legal borrowing entities can generate and preserve enough cash to service a complex capital structure through the business cycle, while controlling the bank’s exposure, ranking, and recovery if that judgement proves wrong.**
