# 01 — Retail Credit Risk — Project Masterclass

## 0. Project in One Screen

**System:** End-to-end retail credit risk modelling framework  
**Portfolio:** LendingClub unsecured consumer term loans  
**Period:** 2007–2014  
**Loans:** **466,285**  
**Raw variables:** **75**

`Raw loans`
→ `Default target`
→ `Dev / Test / OOT`
→ `WoE + IV`
→ `Logistic PD`
→ `600-point scorecard`
→ `Validation + Calibration`
→ `PSI / CSI`
→ `LGD hurdle model`
→ `EAD`
→ `Lifetime PD`
→ `IFRS 9 staging`
→ `ECL + CECL`
→ `Basel IRB RWA`
→ `Portfolio monitoring`
→ `Dashboard + RAG`

| Headline | Project result |
|---|---:|
| 12-month default rate | **3.44%** |
| Model B OOT Gini | **0.3845** |
| Model B OOT KS | **0.2843** |
| Mean LGD | **93.01%** |
| OOT portfolio EAD | **$1.827B** |
| IFRS 9 ECL | **$278.48M** |
| US CECL | **$327.47M** |
| Basel IRB RWA | **$2.295B** |

---

# 1. Data → Modelling Population

## Raw portfolio

| Item | Value |
|---|---:|
| Loans | **466,285** |
| Columns | **75** |
| Origination vintages | **2007–2014** |
| Asset class | **Unsecured consumer term loans** |
| Ever defaults | **50,968 / 10.93%** |
| 12m defaults | **16,018 / 3.44%** |

### Why two default measures?

| Target | Role |
|---|---|
| `ever_default` | LGD / recovery / lifetime analysis |
| `default_12m` | PD model target |

**PD model question:**  
> Does the borrower default within **12 months** of origination?

---

## Default timing problem

Dataset had **no explicit default date**.

### Implemented hierarchy

`Defaulted status`
→ use `last_pymnt_d`
→ if missing, use `last_credit_pull_d`
→ calculate months from `issue_d`
→ floor negative values at 0
→ derive `default_12m`

### Why this mattered

Without default timing:

- cannot construct fixed 12-month performance window
- cannot distinguish early vs later defaults
- cannot build a defensible 12m PD target

### Limitation

**Default date is inferred — not directly observed.**

---

# 2. Development Strategy

## Temporal structure

| Population | Vintage | Rows | Defaults | Default rate |
|---|---|---:|---:|---:|
| Train | 2007–2013 | **184,525** | 6,329 | 3.43% |
| Test | 2007–2013 | **46,132** | 1,582 | 3.43% |
| OOT | **2014** | **235,628** | 8,107 | 3.44% |

Development sample:

**230,657**
→ stratified **80 / 20**
→ Train + Test

Latest vintage:

**2014**
→ held out completely
→ **Out-of-Time validation**

### Why OOT?

Random test answers:

> Does the model generalise to unseen observations from the same development period?

OOT answers:

> Does it still work on a later population?

That second question is closer to real model deployment.

### Critical project truth

**OOT = 2014.**

Never say **2015**.

---

# 3. PD Model — From Characteristics to Score

## Architecture

`48 candidate variables`
→ `WoE binning`
→ `IV review`
→ `Logistic Regression`
→ `PD`
→ `Scorecard points`
→ `Rating grades`

---

## Why WoE?

**Weight of Evidence**

$$
\Large \displaystyle WoE_i = \ln \left( \frac{\%Good_i}{\%Bad_i} \right)
$$

### Project role

- converts raw characteristics into risk-ordered bins
- handles non-linear relationships
- makes effects interpretable
- fits naturally with logistic scorecards

## Why IV?

**Information Value**

$$
\Large \displaystyle IV = \sum (\%Good_i-\%Bad_i)\times WoE_i
$$

Used to assess **predictive separation** of candidate characteristics.

**IV ≠ model performance.**

It evaluates an individual characteristic, not the complete scorecard.

---

# 4. Logistic PD Model

Two specifications were trained:

| Model | Features | Train Gini | Test Gini | OOT Gini |
|---|---:|---:|---:|---:|
| Model A | 7 | 0.3013 | 0.2969 | 0.2715 |
| **Model B** | **10** | **0.3678** | **0.3634** | **0.3845** |

Model B:

| Metric | Train | Test | OOT |
|---|---:|---:|---:|
| AUROC | 0.6839 | 0.6817 | **0.6923** |
| Gini | 0.3678 | 0.3634 | **0.3845** |
| KS | 0.2736 | 0.2728 | **0.2843** |

### Relationship

$$
\Large \displaystyle Gini = 2 \times AUC - 1
$$

### What the metrics answer

| Metric | Question |
|---|---|
| AUC | Can model rank risky above safe borrowers? |
| Gini | Same discrimination expressed on credit-risk scale |
| KS | Maximum separation between good/bad distributions |

### Project interpretation

Model B shows **stable discrimination across Train → Test → OOT**.

OOT discrimination is slightly stronger than development.

**Do not describe this as proof that OOT is “better data.”**

It is an observed sample result.

---

# 5. Scorecard Scaling

Logistic output was converted into a traditional retail scorecard.

### Scaling

- **Base score:** 600
- **Base odds:** 50:1
- **PDO:** 20

**PDO = Points to Double the Odds**

Every **+20 points**
→ odds of good:bads double.

Conceptually:

`Borrower characteristics`
→ `WoE`
→ `Logit`
→ `Odds`
→ `Score`

### Why convert PD into score?

Same risk information, but easier for:

- underwriting
- policy cut-offs
- rating bands
- portfolio segmentation
- business communication

---

# 6. Validation ≠ One Metric

A model can rank well but predict the **wrong probability level**.

Therefore:

## Discrimination

`AUC / Gini / KS`

vs

## Calibration

`Brier / Hosmer-Lemeshow / observed vs predicted`

---

## Hosmer-Lemeshow result

Model B:

| Sample | HL p-value |
|---|---:|
| Train | 0.00040 |
| Test | **0.49418** |
| OOT | **0.00117** |

OOT therefore shows **calibration weakness despite good discrimination**.

### Important distinction

> Good Gini does not guarantee good PD calibration.

This is exactly why both dimensions were tested.

---

# 7. Recalibration

Implemented:

- **Intercept recalibration**
- **Platt scaling**

### Objective

Keep ranking largely intact while adjusting probability estimates.

`Raw score`
→ `recalibration`
→ better alignment of predicted PD with observed default rate

### Project lesson

Model development is not complete at:

> “AUC looks good.”

A usable PD model needs:

**Discrimination + Calibration + Stability**

---

# 8. Population Stability

## Score PSI

| Model | Train → OOT PSI |
|---|---:|
| Model A | 0.0046 |
| **Model B** | **0.0071** |

Very small population shift at total score level.

## Characteristic CSI

Largest observed:

| Variable | CSI |
|---|---:|
| `dti` | **0.0416** |
| `purpose` | 0.0362 |
| `term` | 0.0258 |
| `annual_inc` | 0.0057 |

### Difference

| Measure | Monitors |
|---|---|
| PSI | Overall score / population shift |
| CSI | Drift in individual characteristics |

### Mental model

`Stable Gini`
does not imply
`Stable population`

Therefore both:

**Performance monitoring + population monitoring**

---

# 9. LGD — The Recovery Problem

LGD base:

**50,968 defaulted loans**

Portfolio recovery behaviour:

| Metric | Result |
|---|---:|
| Mean recovery | **6.99%** |
| Mean LGD | **93.01%** |
| Median LGD | **100%** |
| No post-default recovery / LGD = 100% | **52.18%** |
| Has recovery | **47.82%** |

### Core modelling problem

Recovery distribution had a large point mass at **zero recovery**.

One ordinary regression would have to model two different questions simultaneously:

1. **Will anything be recovered?**
2. **If yes, how much?**

---

# 10. Two-Stage LGD Hurdle Model

## Stage 1 — Recovery incidence

**Logistic Regression**

$$
\Large \displaystyle P(\text{recovery}>0)
$$

Answers:

> Will the account recover anything?

---

## Stage 2 — Recovery magnitude

**Gradient Boosting Regressor**

trained only on loans with positive recovery.

Answers:

> Conditional on recovering something, how much?

---

## Combined recovery

$$
\Large \displaystyle Expected\ Recovery = P(Recovery) \times RR_{positive}
$$

$$
\Large \displaystyle LGD = 1 - Expected\ Recovery
$$

### Why this architecture?

Because:

**0 recovery**  
and  
**positive recovery magnitude**

are structurally different behaviours.

### Result

Mean LGD:

**93.01%**

High — but consistent with the observed unsecured defaulted-loan recovery profile.

---

# 11. EAD

For actual LendingClub term loans:

$$
\Large \displaystyle EAD = \max(Funded\ Amount - Principal\ Repaid,\ 0)
$$

### Defaulted portfolio

| Metric | Value |
|---|---:|
| Mean EAD | **$10,781.56** |
| Median EAD | **$9,141.37** |
| Mean EAD / funded amount | **71.93%** |

### Why no empirical CCF?

These are **fixed-term loans**.

There is no undrawn revolving commitment to convert.

---

## CCF — Separate Synthetic Demonstration

A **5,000-account synthetic revolving portfolio** was built to demonstrate CCF methodology.

$$
\Large \displaystyle EAD = Drawn + CCF \times Undrawn
$$

Synthetic mean realised CCF:

**42.88%**

### Interview-safe distinction

**Actual project data**
→ term-loan EAD from outstanding principal

**Synthetic demo**
→ revolving-credit CCF regression

Never merge the two claims.

---

# 12. Lifetime PD

A **60-month discrete-time hazard structure** was built.

| Horizon | Cumulative PD |
|---|---:|
| 1 month | 0.0806% |
| 12 months | **3.4352%** |
| 24 months | 6.3462% |
| 36 months | 9.3156% |
| 60 months | **10.9306%** |

### Core logic

Monthly hazard:

$$
\Large \displaystyle h_t=P(Default_t \mid survived\ to\ t)
$$

Survival:

$$
\Large \displaystyle S_t=\prod_{j=1}^{t}(1-h_j)
$$

Cumulative PD:

$$
\Large \displaystyle PD_{0,t}=1-S_t
$$

### Project consistency

12m cumulative PD:

**3.4352%**

≈ portfolio 12m default rate:

**3.4352%**

60m cumulative PD:

**10.9306%**

≈ portfolio ever-default rate:

**10.9307%**

---

# 13. IFRS 9 Staging

OOT portfolio:

**235,628 accounts**

Target staging logic used:

### Stage 3

`Default status`
or
`90+ DPD`

### Stage 2

SICR when any trigger met:

- PD ratio ≥ **2.0**
- current 12m PD > **6%**
- 30+ DPD backstop

### Stage 1

Everything else.

---

## Resulting portfolio

| Stage | Accounts | % | EAD |
|---|---:|---:|---:|
| Stage 1 | **189,633** | 80.48% | **$1.417B** |
| Stage 2 | **26,554** | 11.27% | **$169.37M** |
| Stage 3 | **19,441** | 8.25% | **$240.00M** |
| **Total** | **235,628** | 100% | **$1.827B** |

---

# 14. IFRS 9 ECL

Core structure:

$$
\Large \displaystyle ECL = PD \times LGD \times EAD
$$

extended for:

- staging
- lifetime horizon
- discounting / term structure
- scenario treatment

## Portfolio result

| Stage | ECL | Coverage |
|---|---:|---:|
| Stage 1 | **$30.27M** | 2.14% |
| Stage 2 | **$24.40M** | 14.41% |
| Stage 3 | **$223.80M** | 93.25% |
| **Total** | **$278.48M** | **15.25%** |

### What drives the shape?

Stage 3:

only **8.25% of accounts**

but contributes roughly **$224M** of the **$278M** provision.

Reason:

`Default`
→ PD effectively 100%
→ very high LGD
→ very high coverage

---

# 15. IFRS 9 vs US CECL

| Framework | Provision |
|---|---:|
| IFRS 9 | **$278.48M** |
| US CECL | **$327.47M** |
| Difference | **+$48.99M CECL** |

### Project implementation difference

**IFRS 9**

Stage 1
→ 12-month ECL

Stage 2/3
→ lifetime ECL

**CECL**

→ lifetime expected loss from initial recognition

### Result

CECL produced the larger allowance in the implemented comparison.

---

# 16. Macro Scenario ECL

Implemented scenarios:

- Baseline
- Upside
- Downside

Probability-weighted structure:

$$
\Large \displaystyle ECL = \sum_s w_s ECL_s
$$

### Critical limitation

This scenario framework was executed on a **3-loan micro-sample fixture**, not across the complete OOT portfolio.

Therefore claim:

> Implemented multi-scenario probability-weighted ECL methodology.

Do **not** claim:

> Full 235k-account macroeconomic scenario forecasting engine.

---

# 17. Basel Capital

OOT portfolio:

**$1.827B EAD**

## Advanced IRB implementation

Inputs:

`PD`
+
`LGD`
+
`EAD`
+
Basel risk-weight function

→ `RWA`

Result:

| Metric | Value |
|---|---:|
| IRB RWA | **$2.295B** |
| IRB portfolio RW | **125.63%** |
| Standardised RWA | **$1.370B** |
| Standardised RW | **75%** |

### Why IRB exceeded Standardised here

Portfolio LGD:

**~93%**

That extremely severe LGD feeds the IRB capital function and drives high RWA.

Therefore:

**IRB is not automatically lower than Standardised.**

---

# 18. Minimum Capital

Using project Basel minima:

| Capital layer | Rate | Requirement |
|---|---:|---:|
| CET1 | 4.5% | **$103.26M** |
| Tier 1 | 6.0% | **$137.68M** |
| Total Capital | 8.0% | **$183.57M** |

$$
\Large \displaystyle Capital = RWA \times Capital\ Ratio
$$

---

# 19. Downturn LGD Stress

Stress:

**LGD +8 percentage points**

| Metric | Base | Downturn |
|---|---:|---:|
| RWA | $2.295B | **$2.454B** |
| Risk weight | 125.63% | **134.35%** |

Additional minimum total capital:

**+$12.74M**

### Chain

`LGD ↑`
→ `capital requirement per exposure ↑`
→ `RWA ↑`
→ `required capital ↑`

This connects model risk directly to balance-sheet capital.

---

# 20. Portfolio Monitoring

Implemented monitoring:

### Vintage / MOB curves

`Origination cohort`
→ months on book
→ cumulative default behaviour

Useful for:

- seasoning
- vintage comparison
- identifying weaker origination periods

---

### Delinquency roll-rate proxy

Implemented from the available snapshot structure.

**Not a true monthly account-level roll matrix.**

---

### Transition matrix

Built:

**Origination rating grade**
→ **eventual outcome**

Not:

**Month t grade**
→ **Month t+1 grade**

---

# 21. Dashboard + AI Layer

Pipeline outputs also feed:

### HTML risk dashboard

Automated reporting of project risk metrics.

### Offline vector index / RAG

Project artefacts:

→ embeddings  
→ semantic retrieval  
→ risk analyst interface

Live LLM inference requires:

`GEMINI_API_KEY`

### Position correctly

These are the **consumption/reporting layer** of the risk system.

They do not replace the underlying models.

---

# 22. The Project as a Risk System

| Layer | Project component |
|---|---|
| Data | Cleaning + target engineering |
| Development | Train / Test / OOT |
| PD | WoE + Logistic Regression |
| Decisioning | 600-point scorecard |
| Validation | AUC / Gini / KS / Brier / HL |
| Monitoring | PSI / CSI |
| LGD | Two-stage hurdle model |
| EAD | Outstanding principal |
| Lifetime risk | Hazard term structure |
| Accounting | IFRS 9 staging + ECL |
| Comparison | US CECL |
| Capital | Basel IRB RWA |
| Stress | Downturn LGD |
| Portfolio | Vintage + transition analytics |
| Reporting | HTML dashboard |
| AI | RAG analyst |

---

# 23. Numbers I Own

| Metric | Memorise |
|---|---:|
| Total loans | **466,285** |
| Raw variables | **75** |
| Ever-default rate | **10.93%** |
| 12m default rate | **3.44%** |
| Train | **184,525** |
| Test | **46,132** |
| OOT | **235,628 — 2014** |
| Model B OOT AUC | **0.6923** |
| Model B OOT Gini | **0.3845** |
| Model B OOT KS | **0.2843** |
| Model B PSI | **0.0071** |
| LGD modelling defaults | **50,968** |
| Mean LGD | **93.01%** |
| OOT EAD | **$1.827B** |
| IFRS 9 ECL | **$278.48M** |
| CECL | **$327.47M** |
| CECL − IFRS 9 | **$48.99M** |
| Basel IRB RWA | **$2.295B** |
| Base minimum total capital | **$183.57M** |
| Downturn capital increase | **$12.74M** |

---

# 24. What Was Real vs Illustrative

| Component | Status |
|---|---|
| PD scorecard | **Full dataset / executed** |
| WoE / IV | **Executed** |
| Train/Test/OOT validation | **Executed** |
| Calibration | **Executed** |
| PSI / CSI | **Executed** |
| LGD hurdle model | **Executed on 50,968 defaults** |
| Term-loan EAD | **Executed on real loans** |
| CCF regression | **Synthetic 5,000-account demo** |
| Lifetime PD | **Executed** |
| IFRS 9 staging | **Executed on OOT** |
| IFRS 9 staged ECL | **Executed on OOT** |
| IFRS 9 vs CECL | **Executed** |
| Multi-scenario macro ECL | **3-loan fixture** |
| Basel IRB capital | **Executed on OOT** |
| Vintage analytics | **Executed** |
| Roll rates | **Cross-sectional proxy** |
| Transition matrix | **Origination-grade → outcome proxy** |
| Dashboard | **Executed** |
| RAG | **Index executed; live LLM requires API key** |

---

# 25. Limitations I Should Volunteer

## 1 — No longitudinal monthly panel

LendingClub data is predominantly snapshot-style.

Therefore:

- no genuine month-to-month DPD transitions
- no true cure / roll-forward matrix
- roll-rate work = proxy

---

## 2 — CCF is synthetic

Fixed-term loans:

→ no undrawn line

Therefore empirical CCF could not be estimated from this portfolio.

---

## 3 — Origination PD proxy

Historical point-in-time origination scorecards were unavailable.

Implemented approximation:

`Origination grade`
→ average predicted PD for that grade.

Used in SICR comparisons.

---

## 4 — OOT seasoning

2014 vintage still contained many active/current loans during observation.

Therefore longer-tenor defaults may be under-observed.

---

## 5 — Historical US portfolio

Data:

**US / 2007–2014 / LendingClub**

Therefore results should not be presented as current production estimates for another geography or lending book.

---

## 6 — Macro scenarios not full portfolio

Scenario-weighted framework:

**implemented**

Full portfolio scenario run:

**not implemented**

---

# 26. Never Claim

| Never say | Correct version |
|---|---|
| “OOT was 2015.” | **OOT = 2014 vintage.** |
| “I built monthly roll-rate matrices.” | Built **cross-sectional delinquency proxies**. |
| “I modelled LendingClub CCF.” | Actual EAD + **synthetic revolving CCF demo**. |
| “I had historical origination PIT PD.” | Used **grade-level origination PD proxy**. |
| “Macro scenarios ran across all 235k loans.” | Scenario engine demonstrated on **micro-sample fixture**. |
| “IRB always reduces capital.” | Here IRB RW was **125.63% vs 75% standardised**. |

---

# 27. Interview Reconstruction

## 30 seconds

> End-to-end retail credit risk system on **466,285 LendingClub loans**. Built a WoE/logistic PD scorecard with **2014 OOT validation**, a two-stage LGD hurdle model, EAD and lifetime PD frameworks, then connected the risk parameters into **IFRS 9 ECL, CECL comparison and Basel IRB capital analytics**, with portfolio monitoring and automated reporting.

---

## 2-minute spine

**1. Data**

466k unsecured consumer loans  
→ 2007–2014  
→ 3.44% 12m default

**2. PD**

WoE / IV  
→ logistic regression  
→ 600-point scorecard  
→ Model B OOT Gini 0.3845

**3. Validation**

AUC/Gini/KS  
+ calibration  
+ PSI/CSI

**4. LGD/EAD**

50,968 defaults  
→ recovery hurdle architecture  
→ mean LGD 93%

Term-loan EAD  
→ outstanding principal

**5. Lifetime / Accounting**

60-month hazard curve  
→ IFRS 9 staging  
→ $278.48M ECL

CECL  
→ $327.47M

**6. Capital**

PD/LGD/EAD  
→ IRB RWA  
→ $2.295B

**7. Monitoring**

Vintage curves  
+ stability  
+ transition proxies  
+ dashboard

---

# 28. Six Questions I Must Defend

## Why logistic regression instead of a black-box model?

Because the project is a **credit scorecard framework**:

- interpretability
- WoE compatibility
- direct PD estimation
- coefficient transparency
- score scaling
- easier governance

The objective was not maximum predictive power at any cost.

---

## Why did OOT perform better than Train?

Observed Model B:

- Train Gini = **0.3678**
- OOT Gini = **0.3845**

Possible sample/vintage composition effect.

Key point:

> OOT did not deteriorate materially; temporal rank-ordering remained stable.

Do not imply this proves future performance will always improve.

---

## Doesn't low OOT HL p-value mean the model failed?

It signals **calibration mismatch**, not necessarily poor discrimination.

OOT:

- AUC = **0.6923**
- Gini = **0.3845**
- HL p = **0.00117**

Therefore:

> good ranking + imperfect probability calibration

which is why recalibration was separately implemented.

---

## Why is LGD 93%?

Because:

- unsecured consumer portfolio
- average recovery only **6.99%**
- median recovery = **0**
- **52.18%** of defaults had 100% loss

The model reflects the observed recovery distribution.

---

## Why hurdle LGD?

Because two behaviours coexist:

`Will anything be recovered?`

and

`How much if recovery occurs?`

Separating them fits the zero-heavy recovery distribution better than forcing one regression across both regimes.

---

## Why is IRB RWA above Standardised?

Because IRB incorporates the portfolio's very high LGD.

Mean LGD ≈ **93%**

→ IRB risk weight **125.63%**

vs standardised assumption:

**75%**

Internal models can produce **higher**, not automatically lower, regulatory capital.

---

# 29. The Entire Project in One Line

> **Borrower data → 12m default → WoE scorecard → PD → validation → LGD + EAD → lifetime PD → IFRS 9 ECL / CECL → Basel RWA → portfolio monitoring → reporting.**