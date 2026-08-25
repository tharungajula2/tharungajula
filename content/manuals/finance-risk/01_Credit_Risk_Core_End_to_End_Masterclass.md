# 01 — Credit Risk — Core End-to-End Masterclass

> **UK banking lens:** PRA prudential framework + IFRS 9 accounting + Basel capital + ICAAP/ILAAP + governed model risk.
>
> **Master mental model**
>
> ```text
> LEND
> → MEASURE RISK
> → MONITOR DETERIORATION
> → RECOGNISE EXPECTED LOSS
> → HOLD CAPITAL
> → STRESS THE BANK
> → CONTROL MODELS
> → MANAGE DEFAULT / RECOVERY
> ```

---

# 1. Credit Risk in One Screen

> **Credit risk = risk that a borrower / counterparty does not meet contractual obligations and the bank does not recover the full economic amount owed.**

```text
Borrower / Obligor
        ↓
Product / Facility / Account
        ↓
Exposure
        ↓
Origination / Underwriting
        ↓
Performing
        ↓
Monitoring
        ↓
Deterioration
        ↓
Arrears / Watchlist / SICR
        ↓
Default
        ↓
Recovery / Restructuring
        ↓
Residual Loss / Write-off
```

The bank continuously asks:

```text
Will default happen?      → PD
How severe if it does?    → LGD
How much is exposed then? → EAD

Expected Loss = PD × LGD × EAD
```

---

# 2. Retail vs SME vs Corporate

| Dimension | Retail | SME | Corporate |
|---|---|---|---|
| Risk unit | Customer + account | Business + owner + facility | Obligor + group + facility |
| Typical scale | High-volume / low-value | Mid-volume / mid-value | Low-volume / high-value |
| Decisioning | Scorecard / policy | Hybrid score + analyst | Analyst / internal rating / committee |
| Main repayment source | Household income | Business cash flow | Enterprise cash flow |
| Core data | Bureau + behaviour + affordability | Financials + bank conduct + owner | Financials + industry + capital structure + market |
| Products | Mortgage, PL, card, OD | Term loan, OD, RCF, asset / invoice / trade finance | RCF, term loan, acquisition / bridge / trade facilities |
| Collateral | Product-specific | Often important | Facility / transaction-specific |
| Monitoring | Behavioural | Behaviour + financials | Financials + covenant + liquidity + market |
| Main structural risk | Product mechanics | Working capital + owner dependency | Group structure + refinancing + seniority |
| Default management | Collections | Collections / workout | Restructuring / workout / recovery waterfall |

### Asset-class memory

```text
Retail
→ account behaviour

SME
→ business cash generation

Corporate
→ enterprise cash flow + capital structure
```

---

# 3. Credit Objects — Never Mix the Levels

| Object | Meaning | Why it matters |
|---|---|---|
| Customer / Borrower | Person or business relationship | Who the bank is dealing with |
| Obligor | Legal entity owing the money | Default / legal liability / PD |
| Group | Connected economic entities | Concentration + support + structural risk |
| Product | Lending type | Mechanics of repayment / exposure |
| Account / Facility | Individual contractual credit | Terms, limits, covenants, security |
| Exposure | Amount economically at risk | EAD / loss / capital |
| Guarantor | Party promising support | Recovery / LGD |
| Collateral | Asset securing exposure | Recovery / LGD / prudential treatment |

```text
Customer ≠ Account
Group ≠ Obligor
Facility ≠ Exposure
Balance ≠ Limit
Limit ≠ EAD
```

---

# 4. Underwriting — What Changes by Asset Class

| Area | Retail | SME | Corporate |
|---|---|---|---|
| Identity / KYC | Customer | Business + owner | Group + legal entities |
| Credit quality | Bureau / score | Score + financials | Internal rating |
| Repayment capacity | Affordability | DSCR / cash flow | FCF / leverage / liquidity |
| Behaviour | Payments / utilisation / DPD | Account turnover / OD use | Facility usage / covenant / market |
| Business risk | Limited | Owner + sector + concentration | Industry + competitive position + management |
| Structure | Standard product | Amount / tenor / security | Facility package / seniority / covenants |
| Approval | Automated / refer | Delegated + analyst | Credit authority / committee |

### Core underwriting rule

```text
Primary repayment source first
Collateral second
```

Collateral protects downside.

It does **not** replace sustainable repayment capacity.

---

# 5. Product Mechanics — What Actually Drives Risk

| Product | Structure | Main risk mechanic | EAD / LGD focus |
|---|---|---|---|
| Mortgage | Amortising / secured | Affordability + LTV | EAD amortises; LGD property-driven |
| Personal Loan | Amortising / unsecured | Repayment behaviour | EAD simpler; LGD collections-driven |
| Credit Card | Revolving / unsecured | Utilisation + behaviour | Undrawn limit → CCF → EAD |
| Overdraft | Revolving | Persistent usage / cash stress | Drawdown before default |
| SME / Corporate Term Loan | Amortising or bullet | Cash flow + maturity | Repayment schedule + recovery |
| RCF | Revolving committed | Liquidity drawing in stress | Drawn + CCF × undrawn |
| Trade / Guarantee | Contingent | Obligation may become funded | Off-BS → EAD conversion |
| Asset / Property-backed | Secured | Cash flow + asset value | Collateral / recovery critical |

### Permanent rule

```text
Same credit-risk concepts
≠
same product mechanics
```

---

# 6. Financial Analysis — The Minimum Permanent Toolkit

## Income / Profitability

| Metric | Formula / Meaning | Credit question |
|---|---|---|
| Revenue Growth | `(Current − Prior) / Prior` | Is the business growing sustainably? |
| Gross Margin | `Gross Profit / Revenue` | Is pricing / cost control weakening? |
| EBITDA Margin | `EBITDA / Revenue` | How strong are operating earnings? |

## Leverage / Debt Service

| Metric | Formula / Meaning | Credit question |
|---|---|---|
| Debt / EBITDA | `Debt / EBITDA` | How leveraged is the business? |
| Net Debt / EBITDA | `(Debt − usable cash) / EBITDA` | What leverage remains after available liquidity? |
| Interest Coverage | `EBITDA or EBIT / Interest` | Can earnings cover interest? |
| DSCR | `Cash Available for Debt Service / Debt Service` | Can cash cover principal + interest? |

## Liquidity / Working Capital

| Metric | Formula / Meaning | Credit question |
|---|---|---|
| Current Ratio | `Current Assets / Current Liabilities` | Near-term liquidity cushion? |
| Receivable Days | `Receivables / Revenue × 365` | Are customers paying slower? |
| Inventory Days | `Inventory / COGS × 365` | Is cash trapped in stock? |
| Payable Days | `Payables / COGS × 365` | Is the firm stretching suppliers? |
| CCC | `Receivable + Inventory − Payable Days` | How long is cash tied up? |

## Corporate Cash Flow

```text
EBITDA
− Cash Interest
− Cash Tax
− Working-Capital Investment
− Capex
=
Free Cash Flow
```

> **Profit ≠ cash. EBITDA ≠ free cash flow. Cash services debt.**

---

# 7. Deterioration, Arrears, Default, Cure, Write-off

```text
PERFORMING
    ↓
Risk deterioration
    ↓
Arrears / DPD / covenant / watchlist / weak behaviour
    ↓
Collections / heightened monitoring
    ↓
┌───────────────┴───────────────┐
│                               │
Cure                         Default
│                               ↓
Return to acceptable       Workout / recovery
performance                     ↓
                            Residual loss
                                ↓
                            Write-off
```

| Term | Meaning |
|---|---|
| Arrears | Contractual payment unpaid |
| DPD | Days Past Due |
| Watchlist | Heightened risk monitoring |
| SICR | Significant Increase in Credit Risk |
| Default | Governed serious repayment-failure status |
| Cure | Return to acceptable credit status under policy |
| Recovery | Cash / value recovered after deterioration or default |
| Write-off | Amount no longer reasonably expected to be recovered |

### Never confuse

```text
Arrears ≠ Default
Watchlist ≠ Default
Stage 2 ≠ Default
Default ≠ Write-off
Default ≠ 100% loss
Cure ≠ Recovery
```

---

# 8. PD, LGD, EAD & Expected Loss

| Parameter | Question | Main level | Main drivers |
|---|---|---|---|
| **PD** | Will default happen? | Borrower / obligor | Behaviour, financials, rating, industry |
| **LGD** | How much is lost if default occurs? | Facility | Collateral, seniority, guarantees, recovery |
| **EAD** | How much is exposed at default? | Facility | Balance, undrawn amount, CCF, amortisation |
| **EL** | What average loss is expected? | Exposure | `PD × LGD × EAD` |

```text
Expected Loss Rate = PD × LGD

Expected Loss Amount = PD × LGD × EAD
```

## PD

```text
Needs:
Borrower
+ Horizon
+ Default definition
+ Model / rating
+ Observation date
```

```text
Score
→ Risk grade
→ PD
```

```text
TTC PD
→ smoother across cycle

PIT PD
→ more current-condition sensitive
```

## LGD

```text
LGD
≈
1 − Net Recovery Rate
```

Main logic:

```text
Secured / senior
→ stronger recovery
→ lower LGD tendency

Unsecured / subordinated
→ weaker recovery
→ higher LGD tendency
```

```text
Book value ≠ Market value ≠ Forced-sale value ≠ Net recovery value
```

## EAD

```text
Amortising
→ expected outstanding balance at default

Revolving
→ Drawn + CCF × Undrawn
```

### Parameter traps

```text
PD ≠ loss %
LGD ≠ default probability
LTV ≠ LGD
Limit ≠ EAD
Current balance ≠ always EAD
Collateral strength ≠ low PD
Same acronym ≠ same calibration / use
```

---

# 9. IFRS 9 — Staging & Expected Credit Loss

## Three-stage framework

| Stage | Credit state | Loss horizon |
|---|---|---|
| **Stage 1** | Performing; no SICR | 12-month ECL |
| **Stage 2** | Significant increase in credit risk | Lifetime ECL |
| **Stage 3** | Credit-impaired / default | Lifetime ECL |

### Staging decision

```text
Default / credit-impaired?
        │
        ├─ Yes → Stage 3
        │
        └─ No
             ↓
SICR since origination?
        │
        ├─ Yes → Stage 2
        │
        └─ No  → Stage 1
```

## SICR — what matters

```text
Current risk
vs
Origination risk
```

Possible evidence:

```text
PD / rating deterioration
DPD
Watchlist
Forbearance
Covenant / financial stress
Qualitative deterioration
```

### ECL structure

```text
ECL
=
Σ [
Marginal PD_t
× LGD_t
× EAD_t
× Discount Factor_t
]
```

then:

```text
Scenario-weighted across
Base / Upside / Downside
```

### IFRS 9 traps

```text
Stage 1 ≠ zero provision
Stage 2 ≠ default
30 DPD ≠ entire SICR definition
90 DPD ≠ entire default definition
12-month ECL ≠ only 12 months of cash loss
Lifetime ECL ≠ only defaulted loans
Provision ≠ Write-off
Accounting PD ≠ automatically Capital PD
```

---

# 10. Basel, RWA & Regulatory Capital

## Purpose

```text
IFRS 9
→ expected credit loss

Regulatory Capital
→ resilience against unexpected / severe loss
```

## Core flow

```text
Exposure
   ↓
Exposure Class
   ↓
SA or IRB
   ↓
Credit Risk Mitigation
   ↓
Risk Weight / IRB Risk Function
   ↓
RWA
   ↓
Capital Ratio
```

```text
Capital Ratio
=
Eligible Capital / RWA
```

## Main approaches

| Standardised Approach — SA | Internal Ratings Based — IRB |
|---|---|
| Regulatory risk-weight framework | Approved internal risk parameters inside regulatory formula |
| Exposure class critical | PD / LGD / EAD / maturity critical |
| Rules determine treatment | Supervisory permission + validation required |
| Simpler / more comparable | More risk-sensitive / model-dependent |

### Core IRB intuition

```text
PD + LGD + EAD + Maturity
        ↓
Regulatory risk function
        ↓
Capital requirement
        ↓
RWA
```

### Capital stack

```text
CET1
+
AT1
=
Tier 1

Tier 1
+
Tier 2
=
Total Regulatory Capital
```

### Pillar 1 minimum ratios

```text
CET1        4.5%
Tier 1      6.0%
Total       8.0%
```

plus:

```text
Pillar 2
+
capital buffers
+
management headroom
```

### Basel 3.1 / UK lens

Key themes:

```text
Revised Standardised Approach
Tighter IRB scope / floors
Greater comparability
Output Floor
```

```text
Output Floor
→ limits how far model-based RWA can fall below standardised-derived RWA
```

### Capital traps

```text
Exposure ≠ RWA
PD ≠ Risk Weight
EL ≠ RWA
Provision ≠ Capital
Internal rating ≠ IRB permission
8% ≠ complete real-world capital target
Capital ≠ Cash
```

---

# 11. Pillar 2, ICAAP & Stress Testing

## Pillar 1 vs Pillar 2

| Pillar 1 | Pillar 2 |
|---|---|
| Formula-based minimum | Firm-specific risk assessment |
| Credit / market / operational risk | Concentration, IRRBB, pension, model, strategic / other risks |
| Common baseline | Bank-specific overlay |

## ICAAP

```text
Identify material risks
        ↓
Quantify
        ↓
Stress
        ↓
Project capital
        ↓
Management actions
        ↓
Board assessment
        ↓
Supervisory review
```

## Stress transmission

```text
Macro / sector shock
        ↓
PD ↑
LGD ↑
EAD ↑
        ↓
Credit losses ↑
        ↓
Provisions ↑
        ↓
CET1 ↓
```

simultaneously:

```text
Rating migration
→ RWA ↑
```

therefore:

```text
CET1 Ratio
=
smaller numerator
───────────────
larger denominator
```

### Stress concepts

| Concept | Meaning |
|---|---|
| Base Case | Expected path |
| Stress Case | Severe but plausible downside |
| Sensitivity | One assumption shocked |
| Scenario | Multiple coherent shocks |
| Reverse Stress | Start with failure; work backward |
| Capital Trough | Lowest stressed capital ratio |
| Management Action | Credible action reducing stress impact |

### ICAAP traps

```text
ICAAP ≠ RWA calculation
ICAAP ≠ Stress Test
Stress ≠ Forecast
Pillar 2 ≠ only credit risk
Buffer ≠ minimum requirement
```

---

# 12. Liquidity — The Credit-Risk Interaction

> Liquidity is not credit risk, but severe credit stress and liquidity stress can trigger each other.

| Capital / Solvency | Liquidity |
|---|---|
| Can losses be absorbed? | Can cash obligations be met? |
| CET1 / RWA | Cash / HQLA / funding |
| ICAAP | ILAAP |
| Stress loss | Stress outflow |

## Core liquidity metrics

```text
LCR
=
HQLA / 30-day stressed net cash outflows
```

```text
NSFR
=
Available Stable Funding / Required Stable Funding
```

Core memory:

```text
LCR
→ short-term survival

NSFR
→ structural funding stability

ILAAP
→ full internal liquidity adequacy assessment
```

## Credit ↔ liquidity link

```text
Borrower stress
→ RCF / card / OD drawdown
→ EAD ↑
+
Bank cash outflow ↑
```

```text
Bank funding stress
→ lending / refinancing tightens
→ borrower PD ↑
```

### Never confuse

```text
Capital ≠ Liquidity
ICAAP ≠ ILAAP
HQLA ≠ all assets
Owned asset ≠ usable liquidity
Undrawn commitment ≠ no risk
```

---

# 13. Model Risk — Can the Bank Trust the Numbers?

```text
Data
+
Assumptions
+
Methodology
+
Code
        ↓
Model Output
        ↓
Credit / ECL / RWA / Stress Decision
```

> **Model risk = wrong model + wrong implementation + wrong use.**

## Model lifecycle

```text
Identify
→ Classify
→ Develop
→ Validate
→ Approve
→ Implement
→ Use
→ Monitor
→ Remediate
→ Retire
```

## Three lines

| Line | Role |
|---|---|
| 1st | Own / develop / use / monitor |
| 2nd | Independent challenge / validation |
| 3rd | Audit framework / controls |

## Validation lens

```text
Conceptual soundness
Data quality / representativeness
Performance
Implementation
Use
Limitations
```

## PD performance

```text
Discrimination
→ who is riskier?

Calibration
→ how risky are they?

Stability
→ does model remain reliable over time?
```

## Mitigants

```text
Overlay
Conservatism
Use restriction
Manual review
Extra monitoring
Recalibration
Redevelopment
```

### UK PRA SS1/23 memory

```text
1. Model identification / classification
2. Governance
3. Development / implementation / use
4. Independent validation
5. Model-risk mitigants
```

### Model-risk traps

```text
Monitoring ≠ Validation
Validation ≠ Audit
High AUC ≠ correct PD
Vendor model ≠ no bank accountability
Overlay ≠ permanent repair
Internal model ≠ automatically IRB model
No code change ≠ no model drift
```

---

# 14. The Whole UK Credit-Risk Machine

```text
CUSTOMER / OBLIGOR / GROUP
           ↓
PRODUCT / FACILITY
           ↓
ORIGINATION / UNDERWRITING
           ↓
ACCOUNT / EXPOSURE
           ↓
BEHAVIOUR + FINANCIAL + MARKET MONITORING
           ↓
RATING / SCORE
           ↓
PD
           ↓
COLLATERAL / SENIORITY / RECOVERY
           ↓
LGD
           ↓
DRAWN + UNDRAWN + CCF
           ↓
EAD
           ↓
┌─────────────────────────────────────┐
│         PD × LGD × EAD              │
└─────────────────────────────────────┘
           ↓
     EXPECTED LOSS
           ↓
┌───────────────────┬────────────────────┐
│ IFRS 9            │ BASEL / PRA         │
│ Stage 1 / 2 / 3   │ SA / IRB            │
│ ECL               │ RWA / Capital       │
└───────────────────┴────────────────────┘
           ↓
PILLAR 2 / ICAAP / STRESS
           ↓
BANK CAPITAL RESILIENCE
           ↕
LIQUIDITY / ILAAP
           ↓
MODEL RISK GOVERNANCE
           ↓
DEFAULT / WORKOUT / RECOVERY
           ↓
ACTUAL LOSS
```

---

# 15. Framework Map — One Table

| Framework | Main question | Key output |
|---|---|---|
| Underwriting | Should we lend / on what terms? | Approval / structure |
| Credit Monitoring | Is risk changing? | Rating / EWS / watchlist |
| PD / LGD / EAD | What are the loss dimensions? | Risk parameters |
| IFRS 9 | What expected loss should be recognized? | ECL / Stage |
| Basel Pillar 1 | How much formula-based prudential capital? | RWA / capital minimum |
| Pillar 2 / ICAAP | What risks / stress does Pillar 1 miss? | Additional capital assessment |
| Liquidity / ILAAP | Can the bank meet cash obligations? | Liquidity adequacy |
| Model Risk | Can the models be trusted? | Validation / controls / remediation |
| Workout / Recovery | What can be recovered after deterioration? | Recovery / actual loss |

---

# 16. Final “Never Confuse” Board

| Never confuse | Correct distinction |
|---|---|
| Customer vs Account | One customer can hold many accounts |
| Group vs Obligor | Economic group ≠ legal borrower |
| Balance vs Limit | Drawn amount ≠ maximum borrowing |
| Balance vs EAD | EAD may include future drawing |
| Score vs Rating vs PD | Model score → grade → probability |
| PD vs LGD | Likelihood ≠ severity |
| LGD vs LTV | Recovery loss ≠ collateral ratio |
| Arrears vs Default | Late payment ≠ governed default |
| Default vs Write-off | Credit event ≠ accounting removal |
| Stage 2 vs Default | SICR ≠ credit-impaired |
| EL vs ECL | Simple loss engine ≠ full IFRS 9 measurement |
| Accounting PD vs Capital PD | Same acronym ≠ same calibration |
| Provision vs Capital | Expected loss recognition ≠ solvency buffer |
| Exposure vs RWA | Face amount ≠ prudential risk-weighted amount |
| Internal Rating vs IRB | Commercial rating ≠ regulatory permission |
| Pillar 1 vs Pillar 2 | Formula baseline ≠ firm-specific overlay |
| Stress vs Forecast | Severe downside ≠ expected path |
| Capital vs Liquidity | Loss absorption ≠ cash availability |
| ICAAP vs ILAAP | Capital adequacy ≠ liquidity adequacy |
| Monitoring vs Validation | Ongoing performance check ≠ independent model challenge |

---

# 17. Final Recall — 60 Seconds

```text
WHO?
Retail / SME / Corporate
        ↓
WHAT?
Customer / Obligor / Group / Facility / Exposure
        ↓
CAN THEY PAY?
Affordability / Cash Flow / FCF / Leverage / Liquidity
        ↓
HOW RISKY?
Score / Rating / PD
        ↓
IF DEFAULT?
Collateral / Seniority / Recovery / LGD
        ↓
HOW MUCH THEN?
Balance / Undrawn / CCF / EAD
        ↓
EXPECTED LOSS?
PD × LGD × EAD
        ↓
ACCOUNTING?
IFRS 9 → Stage 1 / 2 / 3 → ECL
        ↓
CAPITAL?
Basel / PRA → SA / IRB → RWA → CET1
        ↓
WHAT IF STRESS?
Pillar 2 / ICAAP
        ↓
CAN THE BANK PAY CASH?
LCR / NSFR / ILAAP
        ↓
CAN WE TRUST THE NUMBERS?
Model Risk / Validation / Governance
        ↓
IF IT FAILS?
Default → Workout → Recovery → Write-off
```

> **One sentence to retain:**  
> **Credit risk is the end-to-end discipline of deciding who to lend to and on what structure, measuring how likely default is, how much exposure and loss would exist if it occurs, recognizing expected loss, holding sufficient capital for worse outcomes, monitoring deterioration continuously, and governing the models and recovery processes that make those decisions reliable.**
