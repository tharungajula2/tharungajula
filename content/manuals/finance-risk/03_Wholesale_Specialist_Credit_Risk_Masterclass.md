# 03 — Wholesale & Specialist Credit Risk — End-to-End Masterclass

> **UK banking lens:** Counterparty Credit Risk + derivatives + repo/SFT + netting/collateral + CVA + large exposures + concentration/country risk + limits + workout/governance.
>
> **Master mental model**
>
> ```text
> COUNTERPARTY
> → TRADE / FACILITY
> → CURRENT VALUE
> → NETTING
> → COLLATERAL
> → FUTURE EXPOSURE
> → CCR / CVA
> → LIMITS / CONCENTRATION
> → DEFAULT / CLOSE-OUT / RECOVERY
> ```
>
> **Permanent rule:**  
> **In wholesale markets, the contractual notional can be enormous while the actual credit exposure is driven by replacement value, netting, collateral and how the trade may move before default.**

---

# 1. Wholesale Credit — What Changes

| Traditional Lending | Wholesale / Counterparty Credit |
|---|---|
| Bank advances cash | Exposure may arise from market value |
| Loan balance usually positive | Derivative value can move + / − |
| Exposure often account/facility based | Exposure often netting-set based |
| Collateral usually static / periodic | Collateral can move daily |
| EAD linked to balance + undrawn | EAD linked to current + future market exposure |
| Borrower repayment | Counterparty contractual performance |
| Default → workout | Default → close-out + netting + collateral + recovery |

### Core distinction

```text
Loan credit risk
→ borrower may not repay money already lent

Counterparty credit risk
→ counterparty may default while a market contract has positive replacement value
```

---

# 2. Instrument Map

| Instrument | Economic purpose | Main specialist credit issue |
|---|---|---|
| Bond | Lend to issuer | Issuer credit risk |
| Interest-rate swap | Exchange fixed / floating cash flows | Counterparty exposure changes with rates |
| FX forward / swap | Exchange currencies | Counterparty + settlement exposure |
| Option | Contingent market payoff | PFE can be asymmetric |
| Credit derivative | Transfer credit risk | Counterparty + reference-name risk |
| Repo | Secured cash borrowing / lending | Collateral + haircut + counterparty risk |
| Securities lending | Borrow / lend securities | Collateral + return obligation |
| RCF / guarantee | Funding / contingent support | Drawdown / EAD + single-name risk |

---

# 3. Issuer Credit Risk vs Counterparty Credit Risk

| Issuer Credit Risk | Counterparty Credit Risk — CCR |
|---|---|
| Issuer may fail to pay bond / loan | Trading counterparty may fail on contract |
| Exposure usually debt claim | Exposure depends on market value |
| Balance more stable | Exposure can change daily |
| PD / LGD / EAD | PD / LGD + dynamic exposure |

### Permanent memory

```text
Bond issuer fails
→ Issuer Credit Risk

Swap counterparty fails
while swap is valuable to bank
→ Counterparty Credit Risk
```

---

# 4. Market Risk vs Counterparty Credit Risk

A derivative creates two different risk questions:

```text
MARKET RISK
How does the trade value move
when rates / FX / prices move?
```

```text
COUNTERPARTY CREDIT RISK
If value is positive to us,
will the counterparty still perform?
```

```text
Same trade
→ Market risk + CCR
```

Do not combine them.

---

# 5. Notional ≠ Exposure

Derivative notional:

```text
reference amount used to calculate cash flows
```

It is **not automatically the amount the bank loses**.

Core chain:

```text
Notional
→ Market value
→ Netting
→ Collateral
→ Exposure
```

### Permanent trap

```text
£1bn swap notional
≠
£1bn counterparty exposure
```

---

# 6. Current Exposure / Replacement Cost

If a derivative is worth money to the bank:

```text
positive fair value
→ bank would lose that value if counterparty defaulted and contract could not be replaced
```

This is the intuition behind:

```text
Replacement Cost — RC
```

If trade value is negative to the bank:

```text
counterparty currently owes bank nothing on that trade
```

but future exposure can still arise.

---

# 7. Potential Future Exposure — PFE

> **PFE = allowance for how much exposure could increase before the counterparty defaults / position is closed out.**

Driven by:

```text
market volatility
maturity
product type
direction
netting
collateral
```

Core idea:

```text
Today's exposure
+
possible future movement
=
future counterparty risk
```

---

# 8. SA-CCR — Core Prudential Intuition

For derivatives under the Standardised Approach for Counterparty Credit Risk:

```text
Exposure Value
=
α × (RC + PFE)
```

where:

```text
RC
→ Replacement Cost

PFE
→ Potential Future Exposure

α
→ regulatory multiplier
```

### Mental model

```text
What is owed today?
+
What could become owed before default?
→ regulatory counterparty exposure
```

---

# 9. Netting — Why Trade-by-Trade Exposure Is Wrong

Counterparty has two trades:

```text
Trade A
positive to bank

Trade B
negative to bank
```

If legally enforceable close-out netting applies:

```text
offset values
→ one net claim
```

Without netting:

```text
gross exposure
```

With netting:

```text
net exposure
```

### Permanent rule

```text
Gross positive MTM
≠
net counterparty exposure
```

---

# 10. Netting Set

> **Netting set = group of transactions with one counterparty that can legally be closed out and netted together under the relevant agreement.**

Key fields:

```text
counterparty
legal entity
master agreement
netting-set ID
currency / product attributes
collateral agreement
```

Exposure aggregation must respect the legal netting perimeter.

---

# 11. Close-Out Netting

If counterparty defaults:

```text
Terminate covered trades
        ↓
Value each trade
        ↓
Offset receivables and payables
        ↓
One net amount owed
```

This can materially reduce loss.

But only if enforceable.

---

# 12. Legal Enforceability

Netting / collateral benefit depends on legal certainty.

Need:

```text
valid master agreement
eligible jurisdiction
legal opinion
correct entity
correct product scope
enforceable close-out
```

### Permanent rule

```text
Economic offset
≠
prudentially / legally recognized netting
```

---

# 13. ISDA / CSA / GMRA — What to Remember

| Agreement | Main use |
|---|---|
| **ISDA Master Agreement** | Governs OTC derivative relationship / close-out netting |
| **CSA — Credit Support Annex** | Collateral / margin terms for derivatives |
| **GMRA** | Governs repo transactions |

Names matter because legal agreement determines:

```text
netting
collateral
close-out
margin
recovery
```

---

# 14. Collateral — What It Does in CCR

Collateral reduces unsecured replacement exposure.

Core flow:

```text
Positive exposure
− Eligible collateral
=
Residual exposure
```

But treatment depends on:

```text
value
currency
haircut
timing
eligibility
legal enforceability
```

---

# 15. Variation Margin vs Initial Margin

| Variation Margin — VM | Initial Margin — IM |
|---|---|
| Covers current mark-to-market movement | Protects against movement during close-out period |
| Moves as market value changes | Buffer against future exposure |
| Reduces current unsecured exposure | Reduces gap / liquidation risk |

Memory:

```text
VM
→ today's value

IM
→ close-out uncertainty
```

---

# 16. Margin Period of Risk

After counterparty failure:

```text
default
→ stop normal trading
→ value / close positions
→ replace / hedge trades
```

Market can move during this period.

That interval creates:

```text
margin-period-of-risk exposure
```

Collateral cannot eliminate all market movement instantly.

---

# 17. Collateral Haircut

Collateral market value:

```text
not always fully recognized
```

Haircut protects against:

```text
price volatility
liquidation risk
currency mismatch
```

Core:

```text
Market value
− Haircut
=
Recognized collateral value
```

---

# 18. Wrong-Way Risk — WWR

> **Wrong-way risk = exposure increases when counterparty credit quality worsens.**

That is dangerous because:

```text
PD ↑
at same time
EAD ↑
```

---

# 19. General vs Specific Wrong-Way Risk

| General WWR | Specific WWR |
|---|---|
| Driven by broad macro relationship | Direct counterparty-specific relationship |
| Market factor hurts sector + exposure | Exposure directly tied to counterparty / affiliate weakness |

Memory:

```text
Bad environment
→ counterparty weaker + exposure larger
= General WWR
```

```text
Trade itself becomes more valuable to bank
because this specific counterparty deteriorates
= Specific WWR
```

---

# 20. CCR Exposure Stack

```text
TRADE NOTIONAL
        ↓
Current Market Value
        ↓
Gross Positive Exposure
        ↓
Netting
        ↓
Collateral / Margin
        ↓
Replacement Cost
        ↓
Potential Future Exposure
        ↓
Counterparty EAD / Exposure Value
```

This is the wholesale exposure spine.

---

# 21. CVA — Credit Valuation Adjustment

> **CVA = market-value adjustment reflecting counterparty credit risk in a derivative portfolio.**

Intuition:

```text
Risk-free / credit-free derivative value
        ↓
adjust for counterparty default risk
        ↓
credit-adjusted value
```

CVA is a **valuation concept**.

CCR EAD is an **exposure / capital concept**.

---

# 22. CCR Default Risk vs CVA Risk

| CCR Default Risk | CVA Risk |
|---|---|
| Counterparty actually defaults | Credit spread / credit quality moves before default |
| Loss on exposure at default | Market value of CVA changes |
| PD / LGD / EAD logic | Spread + exposure profile + recovery + market factors |
| Counterparty capital treatment | Separate CVA-risk capital treatment |

### Never confuse

```text
CCR
≠
CVA

Default loss
≠
mark-to-market loss from credit-spread deterioration
```

---

# 23. CVA Drivers — Minimum Memory

```text
Counterparty PD / credit spread
+
LGD / recovery
+
future exposure profile
+
maturity
+
market factors
+
netting / collateral
```

If counterparty becomes riskier:

```text
CVA charge generally worsens
```

even before default.

---

# 24. Central Clearing / CCP

Some derivatives are cleared through:

```text
Central Counterparty — CCP
```

The CCP sits between original parties.

```text
Bank A
→ CCP
→ Bank B
```

Benefits:

```text
standardised margining
multilateral netting
centralised default management
```

But risk is transformed, not deleted.

---

# 25. Bilateral vs Cleared Derivatives

| Bilateral OTC | Centrally Cleared |
|---|---|
| Direct counterparty relationship | CCP interposes itself |
| ISDA / CSA central | CCP rulebook + margin |
| Bilateral netting | CCP netting |
| Counterparty-specific exposure | CCP / clearing-member exposure |

---

# 26. Repo / Securities Financing Transactions — SFTs

Repo economic flow:

```text
Cash lender
→ provides cash

Cash borrower
→ provides securities collateral

Later:
cash + repo interest returned
securities returned
```

Main risks:

```text
counterparty
collateral value
haircut
margin
liquidity
settlement
encumbrance
```

---

# 27. Repo Haircut

```text
Collateral value
>
cash lent
```

The difference is haircut protection.

Higher haircut:

```text
more collateral cushion
```

Haircuts may rise in stress:

```text
funding capacity ↓
liquidity pressure ↑
```

---

# 28. Repo vs Derivative Collateral

| Repo | Derivative |
|---|---|
| Collateral is central to secured funding structure | Collateral covers MTM / future exposure |
| Security exchanged for cash | Margin posted against changing value |
| GMRA common | ISDA + CSA common |
| Haircut key | VM / IM + haircut key |

---

# 29. Encumbrance

Once asset is pledged:

```text
encumbered
→ not freely available elsewhere
```

This creates a direct connection to liquidity:

```text
Repo / margin
→ collateral encumbered
→ usable liquidity buffer ↓
```

One asset can connect:

```text
CCR
+
liquidity
+
collateral management
```

---

# 30. Settlement Risk

> **Settlement risk = one party delivers cash / asset but does not receive the other leg because counterparty fails during settlement.**

Typical in:

```text
FX
securities settlement
```

Distinct from longer-term CCR.

Memory:

```text
CCR
→ contract exposure over life

Settlement risk
→ failure during exchange of settlement legs
```

---

# 31. Herstatt / Principal Risk

Classic FX risk:

```text
Currency A paid
        ↓
Counterparty fails
        ↓
Currency B never received
```

The full principal can be at risk.

This is why payment-versus-payment mechanisms matter.

---

# 32. Pre-Settlement vs Settlement Exposure

| Pre-Settlement | Settlement |
|---|---|
| Replacement / market exposure before settlement | Principal / delivery exposure during settlement |
| PFE relevant | Timing of payment legs critical |
| Derivative CCR | FX / securities settlement |

---

# 33. Counterparty Hierarchy

Wholesale risk must aggregate correctly:

```text
Trade
        ↓
Netting Set
        ↓
Legal Counterparty
        ↓
Group of Connected Clients
        ↓
Sector / Country
        ↓
Bank Portfolio
```

Different controls operate at different levels.

---

# 34. Limits Framework

Possible limits:

```text
Trade limit
Product limit
Settlement limit
Counterparty limit
Group limit
Country limit
Sector limit
Tenor limit
Wrong-way-risk restriction
```

Core flow:

```text
Risk appetite
→ Limit
→ Usage
→ Headroom
→ Breach / escalation
```

---

# 35. Limit Usage

```text
Approved limit
− Current utilized exposure
=
Headroom
```

But usage may include:

```text
loans
derivatives
SFTs
guarantees
settlement exposure
```

The bank needs **total counterparty view**.

---

# 36. Limit Breach

```text
Usage > Limit
```

Possible actions:

```text
stop new trades
reduce exposure
seek collateral
hedge
temporary excess approval
escalate
```

A breach is not merely a reporting issue.

It is a risk decision.

---

# 37. Large Exposures

> **Large-exposure framework controls excessive loss from one client / group of connected clients.**

Core UK prudential memory:

```text
Exposure after applicable CRM
vs
Tier 1 Capital
```

General limit:

```text
25% of Tier 1 Capital
```

subject to the applicable rules / exemptions / special treatments.

### Permanent idea

```text
Capital can be strong
but
one giant counterparty can still threaten the bank
```

---

# 38. Group of Connected Clients — GCC

Separate legal entities may need to be treated as one concentration where they are:

```text
controlled together
or
economically interdependent
```

Core question:

> If one fails, are the others likely to fail too?

So:

```text
Legal entity separation
≠
risk independence
```

---

# 39. Concentration Risk

Main dimensions:

```text
Single name
Group
Sector
Country
Region
Product
Collateral
Currency
Maturity
Rating
```

Portfolio diversification must be economic, not cosmetic.

---

# 40. Country Risk

> **Country risk = risk that conditions in a country impair repayment / recovery across exposures.**

Drivers:

```text
political instability
recession
currency crisis
capital controls
sanctions
sovereign stress
legal / transfer restrictions
```

---

# 41. Sovereign Risk vs Country Risk vs Transfer Risk

| Risk | Meaning |
|---|---|
| Sovereign Risk | Government / sovereign itself may not perform |
| Country Risk | Broad country conditions hurt exposures |
| Transfer Risk | Borrower has local currency but cannot convert / transfer foreign currency |

### Permanent memory

```text
Good borrower
can still fail to pay foreign creditor
if country blocks currency transfer
```

---

# 42. Portfolio / Wrong-Way Concentration

Risk can multiply when exposures share the same driver.

Example structure:

```text
many counterparties
+
same commodity
+
same country
+
same collateral type
```

Apparent diversification:

```text
many names
```

Economic reality:

```text
one common shock
```

---

# 43. Credit Support and Risk Mitigation Hierarchy

```text
Strong borrower quality
        ↓
Appropriate structure
        ↓
Netting
        ↓
Collateral / margin
        ↓
Guarantee / credit protection
        ↓
Limits
        ↓
Monitoring
```

Do not use collateral / netting as excuses for weak counterparty selection.

---

# 44. Early Warning — Wholesale

Monitor:

```text
rating downgrade
credit spread widening
CDS widening
share-price collapse
margin calls
collateral disputes
limit usage spike
RCF drawdown
liquidity stress
negative news
covenant breach
settlement failure
```

Wholesale signals can move faster than annual financials.

---

# 45. Credit Valuation / Market Signals

For market-active counterparties:

```text
Bond spread
CDS spread
Equity price
Funding spread
External rating
```

can indicate deterioration before default.

But:

```text
market signal
≠
automatic credit decision
```

It feeds governed assessment.

---

# 46. Default — Wholesale Workflow

```text
Counterparty default / failure
        ↓
Stop / restrict trading
        ↓
Determine legal default event
        ↓
Close-out covered transactions
        ↓
Net positions
        ↓
Apply collateral
        ↓
Value residual claim
        ↓
Recovery / insolvency process
```

This differs from retail collections.

---

# 47. Close-Out Amount

Conceptually:

```text
Net replacement value
− usable collateral
± contractual adjustments
=
Residual close-out claim
```

Legal documentation and valuation determine the amount.

---

# 48. Workout / Restructuring

For loans / large wholesale exposures:

```text
amend tenor
waive / reset covenant
reduce debt
asset sale
equity injection
debt-for-equity
new collateral
refinance
```

Objective:

```text
maximize economic recovery
```

not:

```text
delay recognition of failure
```

---

# 49. Recovery Waterfall

```text
Secured / priority claims
        ↓
Senior unsecured
        ↓
Subordinated
        ↓
Equity
```

Same obligor can produce:

```text
same PD
+
different LGD
```

because ranking differs.

---

# 50. Governance — Who Owns What

| Team | Main role |
|---|---|
| Front Office / Markets | Originate / trade within limits |
| Counterparty Credit Risk | Assess counterparties + set / monitor limits |
| Market Risk | Price / market-movement risk |
| Collateral / Margin Operations | Margin calls + collateral movement |
| Legal | Netting / collateral enforceability |
| Treasury | Funding / liquidity / repo |
| Model Risk / Validation | Challenge CCR / CVA models |
| Finance | Valuation / accounting |
| Regulatory Reporting | CCR / CVA / large-exposure returns |
| Technology / Data | Trade + agreement + exposure data |
| Credit Committee | Material credit decisions |
| Workout | Distressed / defaulted counterparties |

---

# 51. Wholesale Data Spine

```text
COUNTERPARTY
        ↓
Legal agreement
        ↓
Trade / SFT / Facility
        ↓
Notional / MTM / maturity
        ↓
Netting set
        ↓
Collateral / margin
        ↓
RC + PFE
        ↓
CCR exposure / EAD
        ↓
CVA
        ↓
Limit usage
        ↓
Group / country / concentration
        ↓
RWA / reporting
```

Critical fields:

```text
counterparty_id
group_id
trade_id
product
notional
market_value
maturity
netting_set_id
agreement_id
collateral_value
VM
IM
haircut
RC
PFE
EAD
limit
country
rating
```

---

# 52. Data / BA Traps

```text
Trade ≠ Netting Set
Counterparty ≠ Group
Notional ≠ Exposure
Gross MTM ≠ Net Exposure
Collateral Market Value ≠ Recognized Collateral
Legal Agreement ≠ Collateral Agreement
Current Exposure ≠ PFE
CCR ≠ CVA
Issuer Risk ≠ Counterparty Risk
Market Risk ≠ Counterparty Risk
Settlement Risk ≠ Pre-settlement CCR
```

These distinctions drive mapping and reporting.

---

# 53. SA-CCR Data Logic

```text
Trade attributes
        ↓
Product / asset class
        ↓
Maturity / supervisory factors
        ↓
Netting set
        ↓
Collateral / margin
        ↓
Replacement Cost
        +
PFE
        ↓
Exposure value
```

One missing:

```text
netting-set ID
collateral agreement
maturity
trade direction
```

can materially change exposure.

---

# 54. Large-Exposure Data Logic

```text
Legal counterparty
        ↓
Group of Connected Clients
        ↓
All exposure sources
Loans + Derivatives + SFTs + Guarantees
        ↓
Credit Risk Mitigation
        ↓
Large-Exposure Measure
        ↓
Compare with Tier 1 Capital limit
```

This requires cross-system aggregation.

---

# 55. Specialist Risk — One Table

| Topic | Main question | Core metric / concept |
|---|---|---|
| CCR | What if trading counterparty defaults? | RC + PFE / EAD |
| Netting | What legally offsets? | Netting set |
| Collateral | What reduces unsecured exposure? | VM / IM / haircut |
| WWR | Does exposure rise as credit weakens? | PD–EAD dependency |
| CVA | What is market value of counterparty credit risk? | CVA adjustment / capital |
| Repo / SFT | What if secured funding counterparty fails? | Collateral + haircut + exposure |
| Settlement | What if one leg is delivered but other fails? | Principal / settlement exposure |
| Large Exposure | Is one name/group too big? | Exposure / Tier 1 Capital |
| Country Risk | Can country conditions block repayment? | Country / transfer assessment |
| Workout | What value can be recovered? | Close-out / recovery waterfall |

---

# 56. UK Prudential Position — 25 August 2026

Current UK framework points to retain:

```text
Basel 3.1 general implementation
→ 1 January 2027
```

For derivatives under SA-CCR, PRA disclosure instructions use:

```text
Exposure Value
=
α × (RC + PFE)
```

from the Counterparty Credit Risk part of the PRA Rulebook.

The PRA also maintains:

```text
IMM permission
→ for approved internal counterparty-credit-risk modelling
```

and:

```text
SA-CVA permission
→ for firms seeking the Standardised Approach
for CVA capital under the Basel 3.1 framework
```

UK large-exposure framework:

```text
General single client / connected-group limit
→ 25% of Tier 1 Capital
```

subject to applicable exemptions and special rules.

> **Regulatory mechanics are durable; precise permissions, exemptions and reporting rules must always be checked against the operative PRA Rulebook for the reporting date.**

---

# 57. Final “Never Confuse” Board

| Never confuse | Correct distinction |
|---|---|
| Notional vs Exposure | Reference amount ≠ amount at risk |
| MTM vs EAD | Current value ≠ current + future exposure |
| RC vs PFE | Current replacement value ≠ potential future increase |
| Gross vs Net Exposure | Trade-level positives ≠ legal netting-set exposure |
| Netting vs Collateral | Offset claims ≠ pledged protection |
| VM vs IM | Current MTM collateral ≠ close-out buffer |
| Issuer Risk vs CCR | Debt issuer failure ≠ trading counterparty failure |
| Market Risk vs CCR | Price movement ≠ counterparty non-performance |
| CCR vs CVA | Default exposure ≠ valuation impact of credit spread |
| Pre-settlement vs Settlement | Replacement risk ≠ principal delivery risk |
| Counterparty vs GCC | Legal name ≠ connected economic concentration |
| Repo vs outright sale | Secured funding economics ≠ permanent asset disposal |
| Owned collateral vs available collateral | Asset can be encumbered |
| Limit vs Usage | Approved appetite ≠ current exposure |
| Country vs Sovereign Risk | Broad jurisdiction risk ≠ government-only default |
| Diversification by name vs economic diversification | Many names can share one risk driver |

---

# 58. Full Credit-Risk Library — Final Integration

```text
NOTE 01
CORE CREDIT RISK
Retail / SME / Corporate
→ PD / LGD / EAD
→ IFRS 9
→ RWA / Capital
→ ICAAP / Liquidity
→ Model Risk
        ↓

NOTE 02
DATA / REPORTING / CHANGE
BCBS 239
→ Source / Grain / Date
→ Lineage / Mapping
→ DQ / Reconciliation
→ COREP / FINREP
→ BA / UAT / BAU
        ↓

NOTE 03
WHOLESALE / SPECIALIST
Counterparty
→ Derivatives / Repo
→ Netting / Collateral
→ PFE / SA-CCR
→ CVA / WWR
→ Large Exposures / Country
→ Limits
→ Default / Close-out / Workout
```

Together:

```text
WHO / WHAT ARE WE EXPOSED TO?
        ↓
HOW LIKELY IS FAILURE?
        ↓
HOW MUCH CAN WE LOSE?
        ↓
HOW MUCH IS EXPOSED NOW / LATER?
        ↓
HOW DOES ACCOUNTING RECOGNISE IT?
        ↓
HOW DOES REGULATION CAPITALISE IT?
        ↓
HOW DOES THE BANK AGGREGATE / REPORT IT?
        ↓
HOW IS THE MODEL / DATA CONTROLLED?
        ↓
WHAT IF THE COUNTERPARTY / MARKET STRUCTURE IS COMPLEX?
        ↓
WHAT HAPPENS AT DEFAULT?
```

> **One sentence to retain:**  
> **Wholesale and specialist credit risk extends ordinary borrower-default thinking into market contracts where exposure moves with valuation: the bank must aggregate trades into legally enforceable netting sets, recognize collateral and future exposure, control CCR/CVA/wrong-way/settlement risks, enforce counterparty and concentration limits, and be able to close out and recover value if the counterparty fails.**
