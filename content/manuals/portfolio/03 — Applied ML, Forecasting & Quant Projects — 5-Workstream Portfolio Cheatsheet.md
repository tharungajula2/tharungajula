# 03 — Applied ML, Forecasting & Quant Projects — 5-Workstream Portfolio Cheatsheet

> **Purpose:** Remember exactly what I did, why each method was used, the numbers worth owning, and the claim boundaries.  
> **Theory lives elsewhere. This note = portfolio recall + interview defence.**

---

# 0. All 5 in One Screen

| # | Workstream | Problem | Core method | Number to remember |
|---|---|---|---|---:|
| **1** | Bank Churn | Binary classification | ANN + SMOTE | Recall **0.48 → 0.75** |
| **2** | Prescription Forecasting | Time series | SARIMA | MAPE **7.90%** |
| **3** | NIFTY100 Optimisation | Asset allocation | MPT + Monte Carlo | **82 stocks**, 10k portfolios |
| **4** | Cross-Sectional Equities | Systematic investing | Factor ranking + portfolio controls | **~10Y / 500-stock framing** |
| **5** | LOC-IQ | Risk/fraud product concept | Weighted graph | **6 → 46 → 42** |

## Mental progression

```text
Customer
   ↓
Classification
   ↓
Time
   ↓
Forecasting
   ↓
Multiple Assets
   ↓
Portfolio Optimisation
   ↓
Repeated Investment Process
   ↓
Systematic Strategy Framework
   ↓
Multiple Data Sources + Product Workflow
   ↓
LOC-IQ
```

---

# 1. Bank Churn — Neural-Network Classification

## The problem

**10,000 bank customers**

Target:

```text
Exited = 1
→ customer churned

Exited = 0
→ customer stayed
```

Churn rate:

**20.37%**

So:

```text
Binary classification
+
moderate class imbalance
```



---

## Data → Model

```text
10,000 × 14 raw data
        ↓
Drop IDs / surname
        ↓
EDA
        ↓
Encode categoricals
        ↓
Scale features
        ↓
Stratified Train / Test
        ↓
ANN
        ↓
SGD
        ↓
Adam
        ↓
Dropout
        ↓
Hyperparameter tuning
        ↓
SMOTE
        ↓
Business-metric comparison
```

### Model architecture

```text
11 inputs
   ↓
64 ReLU
   ↓
32 ReLU
   ↓
1 Sigmoid
   ↓
P(Churn)
```

Binary cross-entropy:

\[
L=-[y\log(p)+(1-y)\log(1-p)]
\]

---

# 2. Why Accuracy Was the Wrong Main Metric

Class distribution:

```text
Stay     79.63%
Churn    20.37%
```

A model predicting everyone stays:

→ already gets **79.63% accuracy**

Therefore focus shifted to:

- Recall
- Precision
- ROC-AUC
- Confusion matrix

## Business priority

> **Missing an actual churner = lost retention opportunity.**

Therefore:

\[
Recall=\frac{TP}{TP+FN}
\]

became especially important.

---

# 3. Churn Model Iteration

| Model | Precision | Recall | ROC-AUC |
|---|---:|---:|---:|
| SGD ANN | 0.79 | **0.48** | 0.8533 |
| Adam ANN | 0.66 | 0.54 | 0.8503 |
| Dropout ANN | 0.80 | 0.43 | 0.8544 |
| Tuned ANN | 0.71 | 0.54 | **0.8547** |
| **SMOTE ANN** | 0.51 | **0.75** | 0.8515 |

### What actually happened

```text
Baseline
high precision
low recall
        ↓
minority class under-detected
        ↓
SMOTE training distribution
        ↓
model becomes more aggressive
        ↓
FN ↓
TP ↑
        ↓
Recall 0.48 → 0.75
```

Trade-off:

```text
Recall ↑
but
False Positives ↑
→ Precision ↓
```

---

# 4. Churn — What to Retain

### Why ANN?

Demonstrate:

- nonlinear modelling
- feed-forward networks
- activation functions
- gradient optimisation
- regularisation
- tuning

### Why SMOTE?

Not:

> “SMOTE improves the model.”

Correct:

> **SMOTE changed the minority-class learning problem and materially increased churn capture.**

### Strongest project lesson

> **Model selection depends on the cost of errors, not on highest accuracy.**

### Production improvement

Before automatically choosing SMOTE:

```text
Class weights
+
Threshold optimisation
+
Cost-sensitive objective
```

should also be compared.

### Claim

> Built a churn neural network on **10,000 customers**, with SMOTE increasing churn recall from **0.48 to 0.75**.



---

# 5. Antidiabetic Prescription Forecasting — SARIMA

## The problem

Monthly prescription demand:

**July 1991 → June 2008**

```text
204 monthly observations
```

Goal:

> Forecast future monthly antidiabetic prescription demand.

Unlike classification:

```text
Rows are NOT independent.
Time order itself contains information.
```



---

# 6. Forecasting Pipeline

```text
Monthly series
    ↓
Plot
    ↓
Trend + seasonality
    ↓
STL decomposition
    ↓
Stationarity testing
    ↓
Differencing
    ↓
Chronological Train/Test
    ↓
625 SARIMA candidates
    ↓
AIC selection
    ↓
Residual diagnostics
    ↓
Ljung-Box
    ↓
Rolling 12m forecasts
    ↓
Seasonal-naive benchmark
    ↓
MAPE
```

---

# 7. Stationarity — The Key Statistical Decision

Raw series:

```text
ADF p = 1.00
→ non-stationary
```

First difference:

```text
ADF p = 0.1167
→ still non-stationary
```

Regular + seasonal difference:

```text
ADF p ≈ 0
→ stationary
```

Therefore:

```text
d = 1
D = 1
m = 12
```

Model family:

\[
SARIMA(p,1,q)(P,1,Q)_{12}
\]

---

# 8. SARIMA Search

Search:

```text
p = 0..4
q = 0..4
P = 0..4
Q = 0..4
```

Total:

\[
5^4=625
\]

candidate structures.

Selected:

\[
\boxed{SARIMA(2,1,3)(1,1,3)_{12}}
\]

using **AIC**.

### But AIC alone was not enough

After fit:

→ inspect residuals

Goal:

```text
Residuals ≈ white noise
```

Validated with:

- residual plots
- residual ACF
- Q-Q behaviour
- Ljung-Box



---

# 9. Forecast Validation

Chronological split:

| Population | Observations |
|---|---:|
| Train | **168** |
| Test | **36** |

Rolling forecasts:

```text
12 months
→ update history
→ next 12
→ update
→ next 12
```

Baseline:

> **Same month last year**

Seasonal naive MAPE:

**12.69%**

SARIMA MAPE:

**7.90%**

### Improvement

\[
\frac{12.69-7.90}{12.69}
\approx 37.7\%
\]

relative MAPE reduction.

---

# 10. Forecasting — What to Retain

### Why SARIMA?

Data showed:

```text
Trend
+
Annual seasonality
+
Serial dependence
+
No external regressors
```

### Most important principle

> **Time-series evaluation must preserve chronology.**

Never:

```text
Random shuffle
→ Train/Test
```

### Why baseline matters

Fancy forecast only earns its place if:

```text
Advanced model
>
simple seasonal rule
```

### Claim

> Forecast monthly demand by evaluating **625 SARIMA structures** and selected `SARIMA(2,1,3)(1,1,3)12`, reducing MAPE from **12.69% seasonal-naive to 7.90%**.



---

# 11. NIFTY100 — Portfolio Optimisation

## Different problem entirely

Not:

> Predict stock price.

Instead:

> **Given many assets, how should capital be allocated?**

Core objects:

```text
Expected returns
+
Volatilities
+
Covariances
+
Weights
```



---

# 12. Portfolio Pipeline

```text
NIFTY100 list
    ↓
Yahoo .NS mapping
    ↓
Adjusted Close prices
    ↓
Clean / align dates
    ↓
82 usable stocks
    ↓
Daily log returns
    ↓
609 × 82 return matrix
    ↓
Annual expected returns
    ↓
Annual covariance matrix
    ↓
Equal-weight baseline
    ↓
10,000 random portfolios
    ↓
Return + Volatility
    ↓
Sharpe-style score
    ↓
Best simulated portfolio
```

---

# 13. Returns + Portfolio Risk

Log return:

\[
r_t=\ln\left(\frac{P_t}{P_{t-1}}\right)
\]

Portfolio expected return:

\[
E(R_p)=w^\top \mu
\]

Portfolio variance:

\[
\sigma_p^2=w^\top \Sigma w
\]

Portfolio volatility:

\[
\sigma_p=\sqrt{w^\top \Sigma w}
\]

### Key insight

Portfolio risk does **not** equal:

```text
weighted average of individual risks
```

because:

> **Covariance determines diversification benefit.**

---

# 14. Baseline → Optimisation

## Equal weight

82 stocks:

\[
w_i=\frac{1}{82}
\]

Result:

- Return ≈ **9.6%**
- Reported variance ≈ **4.77%**

## Monte Carlo

**10,000 random portfolios**

Each:

```text
random positive weights
→ normalise to sum 1
→ long-only
→ fully invested
```

Score used:

\[
\frac{Portfolio\ Return}{Portfolio\ Volatility}
\]

### Important

This is **Sharpe-ratio-style**, because the notebook does not explicitly subtract a risk-free rate.

---

# 15. Best Simulated NIFTY Portfolio

| Metric | Result |
|---|---:|
| Usable stocks | **82** |
| Simulations | **10,000** |
| Score | **0.7707** |
| Return | **15.27%** |
| Volatility | **19.81%** |

### What was optimised?

Not:

- highest return
- lowest volatility

Instead:

> **best return-per-unit-risk among simulated portfolios.**

### Efficient frontier intuition

Every simulated portfolio:

```text
one point
(volatility, return)
```

Upper-left boundary:

→ increasingly efficient risk-return combinations.



---

# 16. NIFTY100 — What to Retain

### Biggest idea

> **Portfolio construction is mainly a covariance problem.**

### Why equal weight?

Simple benchmark.

### Why Monte Carlo?

Easy way to:

- explore weight space
- visualise possible portfolios
- understand efficient-frontier intuition

### Limitation

This is an educational MPT implementation.

No:

- transaction costs
- turnover constraints
- sector limits
- robust covariance estimation
- exact constrained optimiser
- benchmark-relative optimisation

### Claim

> Built NIFTY100 portfolio optimisation across **82 usable stocks**, evaluating **10,000 long-only weight combinations** to identify the strongest simulated risk-adjusted portfolio.



---

# 17. Cross-Sectional Equity Strategies — Client / Work Framework

> **Keep this mentally separate from the personal portfolio projects.**

This is the most institutional investment process among the five.

Resume framing:

```text
Cross-sectional equity strategies
~500-stock universe
~10-year backtest
```

Supporting work documentation explicitly describes:

- **2012–2022** performance-analysis period
- CRSP universe
- survivorship handling
- fundamental / factor ranking
- portfolio construction
- turnover control
- tracking-error control
- robustness analytics



---

# 18. Cross-Sectional Strategy Machine

```text
Historical investable universe
        ↓
Survivorship handling
        ↓
Prices + Fundamentals + Sector data
        ↓
Optional AI signals
        ↓
Filters
        ↓
Value / Quality / Momentum / etc.
        ↓
Cross-sectional ranking
        ↓
Sector-neutral adjustments
        ↓
Stock selection
        ↓
Portfolio weights
        ↓
Rank / weight buffers
        ↓
Turnover control
        ↓
Tracking-error control
        ↓
Rebalance
        ↓
Daily portfolio returns
        ↓
Performance + robustness
        ↓
Attribution / regressions / reporting
```

This is much closer to an actual **systematic investment research framework** than the NIFTY MPT exercise.

---

# 19. Cross-Sectional Ranking

At each rebalance date:

```text
Current investable stocks
        ↓
Apply filters
        ↓
Calculate factor scores
        ↓
Rank stocks against peers
        ↓
Combine factors
        ↓
Select desired names
```

Possible inputs described:

- valuation
- quality
- momentum
- leverage / debt
- earnings quality
- market capitalisation
- AI prediction filters

### Core distinction

Time-series strategy asks:

> What happens to this asset over time?

Cross-sectional strategy asks:

> **Which stocks look best relative to the other stocks right now?**

---

# 20. Survivorship Bias

The framework explicitly loads historical survivorship information.

Why?

Wrong:

```text
Today's surviving stocks
→ backtest into history
```

This gives the past knowledge of who survived.

Correct:

```text
At date t
→ only securities actually investable at t
```

### Remember

> **A backtest must recreate the information set available at the time.**



---

# 21. Sector Neutrality

Suppose value ranks heavily favour banks.

Without control:

```text
"Value strategy"
may actually become
"Bank sector bet"
```

Sector-neutral ranking:

```text
Rank stocks within sector
```

or otherwise control sector exposure.

Purpose:

> Separate intended factor signal from unintended sector concentration.

---

# 22. Rebalancing Reality

The framework handles:

- rebalance dates
- holding periods
- implementation lag
- weight drift
- full vs partial rebalancing
- rank buffers
- weight buffers

### Why buffers?

Without buffer:

```text
Rank 49 → selected
Rank 51 → sold
Next month rank 49 → bought again
```

Tiny ranking movements:

→ unnecessary trading

Buffer:

→ retain existing holding unless movement is sufficiently large.

Goal:

**signal persistence + turnover reduction**

---

# 23. Turnover

Standard one-way portfolio turnover:

\[
Turnover_t=
\frac{1}{2}
\sum_i
|w_{i,t}^{target}-w_{i,t}^{drifted}|
\]

High turnover:

```text
more trading
→ more transaction cost
→ potential alpha erosion
```

The supporting framework separately implements turnover optimisation using **L1 and L2 norms** with hard turnover limits.



---

# 24. L1 / L2 Portfolio Control

Problem:

```text
Desired target weights
vs
Existing drifted weights
```

Need:

> Move toward target without excessive trading.

## L1

\[
\min ||w-w^*||_1
\]

Focus:

→ absolute weight changes.

## L2

\[
\min ||w-w^*||_2^2
\]

Focus:

→ squared deviations.

Subject to constraints such as:

\[
\sum_i w_i=1
\]

and:

\[
Turnover \le Limit
\]

---

# 25. Tracking Error Control

Tracking Error:

\[
TE=\sigma(R_{strategy}-R_{benchmark})
\]

Framework:

```text
Relative returns
        ↓
EWMA volatility
        ↓
Forecast TE
        ↓
Compare with TE target
        ↓
Reduce/increase strategy tilt
```

Purpose:

> Keep active risk within intended limits.

### Difference

```text
Turnover control
→ trading cost / implementation

Tracking-error control
→ benchmark-relative risk
```

---

# 26. Strategy Validation Was Multi-Dimensional

Absolute metrics:

- annualised return
- volatility
- Sharpe
- Sortino
- maximum drawdown
- time under water

Relative:

- excess return
- tracking error
- information ratio
- relative drawdown
- benchmark outperformance probability

Factor analysis:

- CAPM alpha / beta
- multifactor coefficients
- t-statistics
- \(R^2\)

Robustness:

- rolling 1Y / 3Y metrics
- calendar-year results
- monthly results
- rolling alpha / beta
- drawdown periods

Portfolio construction:

- turnover
- sector exposures
- Effective Number of Stocks

 
---

# 27. Effective Number of Stocks

Diversification measure:

\[
ENS=
\frac{1}
{\sum_i w_i^2}
\]

Examples:

Equal 100-stock portfolio:

\[
ENS=100
\]

Highly concentrated portfolio:

\[
ENS \ll Number\ of\ holdings
\]

Therefore:

> Stock count alone does not measure diversification.

---

# 28. Cross-Sectional Work — What to Retain

### This project proves

Not just:

> I know factor investing.

It demonstrates:

```text
Signal construction
+
historical universe handling
+
portfolio construction
+
implementation controls
+
risk controls
+
backtesting
+
robustness analysis
+
attribution
```

### Most important distinction from NIFTY MPT

**NIFTY MPT**

```text
Given expected returns + covariance
→ find allocation
```

**Cross-sectional strategy**

```text
Generate signal repeatedly through time
→ select stocks
→ construct portfolio
→ trade
→ control costs/risk
→ validate strategy
```

### Claim boundary

Do not invent a strategy return or Sharpe unless separately documented.

The source material strongly supports the **framework and methodology**, but the provided summary does not give one single headline strategy-performance number.

---

# 29. LOC-IQ — Location Intelligence for Credit / Fraud

## The problem

Applicant states:

> “I live at location X.”

Traditional credit/fraud data may contain many indirect geographic traces.

Question:

> **Do the available digital footprints support the declared physical location?**

LOC-IQ structures those traces into a graph.



---

# 30. LOC-IQ in One Line

```text
6 Primary Identifiers
        ↓
46 External Source Catalogue
        ↓
42 Fetched Data Fields
        ↓
Derived Signals
        ↓
Weighted Graph
        ↓
Candidate Locations
        ↓
GREEN / AMBER / RED
```

## Numbers to own

| Component | Count |
|---|---:|
| Primary identifiers | **6** |
| External source catalogue | **46** |
| Fetched fields | **42** |
| Graph layers | **6** |
| Demo scenarios | **3** |

---

# 31. Six-Layer Graph

```text
1. Primary Identifiers
       ↓
2. External APIs / Sources
       ↓
3. Data Fields
       ↓
4. Derived Signals
       ↓
5. Candidate Locations
       ↓
6. Output / Truth Flag
```

Built with:

- Next.js
- React
- TypeScript
- ReactFlow

Main challenge:

> Display a large directed intelligence network without visual collapse.

---

# 32. Signal Weighting

Implemented edge-weight logic:

\[
EffectiveWeight=
BaseWeight
\times
RecencyFactor
\times
IPTrustFactor
\]

Interpretation:

```text
Signal quality
+
how recent?
+
is the network location trustworthy?
```

Example:

VPN / proxy IP:

```text
IP trust factor ↓
→ location evidence down-weighted
```

### Important

This is **rule-based weighting**, not a statistically trained ML model.



---

# 33. Candidate Ranking Concept

Multiple sources may suggest:

```text
Bengaluru
Delhi
Mumbai
Frankfurt proxy
...
```

Signals converge onto candidate locations.

Conceptually:

\[
Score(Location_j)
=
\sum_i EvidenceWeight_{ij}
\]

Then candidates:

```text
ranked by confidence
```

and compared with the declared location.

Output:

```text
GREEN
AMBER
RED
```

---

# 34. LOC-IQ — Critical Truth Boundary

The UI and graph are real.

The following are **not live production functionality**:

- live calls to 46 APIs
- backend location-scoring engine
- ML-trained confidence model
- production consent gating
- custom-input scoring

Demo traces are loaded from **static synthetic JSON**.

The displayed location confidence values are **pre-computed demo values**.

Therefore:

### Never say

> “The model achieved 95% location accuracy.”

### Say

> “I built an interactive concept console demonstrating how weighted location evidence could be assembled and investigated across a 46-source architecture.”



---

# 35. Why LOC-IQ Is Still Valuable

It demonstrates a different skill from modelling notebooks:

```text
Ambiguous business problem
        ↓
Data architecture
        ↓
Identifier mapping
        ↓
External source catalogue
        ↓
Signal engineering
        ↓
Graph representation
        ↓
Risk interpretation
        ↓
Interactive product
```

This is:

> **analytics + product thinking + systems design**

rather than:

> pure predictive modelling.

---

# 36. All 5 — What Each One Proves

| Workstream | Core capability |
|---|---|
| Churn ANN | Supervised ML + imbalance + business metrics |
| SARIMA | Statistical forecasting + time-aware validation |
| NIFTY MPT | Quant finance + covariance + optimisation |
| Cross-sectional equities | Institutional systematic research + portfolio controls |
| LOC-IQ | Risk-product architecture + data/signal graph design |

---

# 37. The Modelling Spectrum

```text
BANK CHURN
X → Y
supervised prediction
```

```text
SARIMA
Past Y → Future Y
time dependence
```

```text
MPT
Returns + Covariance → Weights
optimisation
```

```text
CROSS-SECTIONAL
Characteristics → Ranks → Weights → Rebalance → Performance
systematic investment process
```

```text
LOC-IQ
Identifiers → Sources → Evidence → Graph → Investigation
decision-support architecture
```

---

# 38. Numbers I Actually Need to Memorise

| Workstream | Numbers |
|---|---|
| **Churn** | **10,000** customers · **20.37%** churn · Recall **0.48 → 0.75** |
| **Forecasting** | **204** months · **625** candidates · SARIMA `2,1,3 × 1,1,3,12` · MAPE **7.90%** |
| **NIFTY** | **82** stocks · **609** return days · **10,000** portfolios · Return **15.27%** · Vol **19.81%** |
| **Cross-sectional** | resume framing **~500 stocks / ~10Y** · supporting analysis **2012–2022** |
| **LOC-IQ** | **6 identifiers · 46 sources · 42 fields · 6 layers · 3 demos** |

Everything else:

> understand — do not memorise.

---

# 39. Five 20-Second Interview Spines

## 1 — Churn

```text
10k customers
→ imbalanced binary classification
→ ANN baseline
→ tested SGD / Adam / dropout / tuning
→ minority recall remained weak
→ SMOTE on Train
→ recall 0.48 → 0.75
→ accepted precision trade-off because retention objective prioritised churn capture
```

---

## 2 — SARIMA

```text
Monthly demand series
→ trend + annual seasonality
→ ADF showed non-stationarity
→ regular + seasonal differencing
→ searched 625 SARIMA structures
→ chose (2,1,3)(1,1,3)12
→ residual / Ljung-Box validation
→ rolling holdout
→ MAPE 7.90% vs 12.69% seasonal naive
```

---

## 3 — NIFTY100

```text
NIFTY universe
→ 82 usable securities
→ adjusted prices → log returns
→ annual return + covariance
→ equal-weight baseline
→ simulate 10k long-only portfolios
→ maximise return / volatility
→ best simulated portfolio: 15.27% return, 19.81% vol
```

---

## 4 — Cross-Sectional Equities

```text
Historical universe
→ survivorship-aware data
→ factor filters + ranking
→ sector-neutral selection
→ weights
→ rank/weight buffers
→ turnover optimisation
→ tracking-error control
→ rebalance
→ robustness / factor / attribution analysis
```

---

## 5 — LOC-IQ

```text
Applicant identifiers
→ map 46 possible external sources
→ 42 evidence fields
→ derived location signals
→ 6-layer graph
→ recency + IP trust weighting
→ candidate location ranking
→ fraud/address truth investigation UI
```

---

# 40. Hostile Questions — One-Line Answers

| Question | Answer |
|---|---|
| Why SMOTE? | Minority recall was weak; SMOTE increased churn capture from **0.48 to 0.75**, at the cost of precision. |
| Why not accuracy for churn? | Majority-class accuracy hides missed churners; business cost was concentrated in false negatives. |
| Why SARIMA? | Univariate monthly data showed trend + annual seasonality and no external regressors. |
| Why 625 SARIMA models? | Systematic grid across \(p,q,P,Q=0..4\); AIC shortlisted structure before residual/out-of-sample validation. |
| Why chronological split? | Future observations cannot inform past model training. |
| Why covariance in MPT? | Portfolio risk depends on how assets co-move, not only individual volatility. |
| Is 0.7707 a true Sharpe? | It is a **Sharpe-style return/volatility score**; no explicit risk-free rate was subtracted. |
| Why cross-sectional ranking? | Objective is to choose securities relative to contemporaneous peers at each rebalance date. |
| Why survivorship handling? | Today's survivors cannot be allowed to leak into historical investment universes. |
| Why turnover controls? | Gross backtest alpha may disappear after unnecessary trading and transaction costs. |
| Is LOC-IQ ML? | No. It is a graph-based concept console using rule-based signal weighting and static demo traces. |
| Are 46 APIs live? | No. They are an architectural source catalogue; the current prototype uses synthetic static data. |

---

# 41. What Never to Overclaim

## Churn

Never:

> “SMOTE made the model universally better.”

Correct:

> Recall improved materially, but precision fell.

---

## Forecasting

Never:

> “SARIMA predicts demand with 92.1% accuracy.”

Correct:

> Out-of-sample MAPE was **7.90%**.

---

## NIFTY

Never:

> “I found the mathematically optimal NIFTY portfolio.”

Correct:

> Identified the **best of 10,000 simulated long-only portfolios** under the notebook objective.

---

## Cross-sectional equities

Never:

> Invent performance numbers not documented.

Correct:

> Discuss the **research/backtesting framework, controls, robustness and methodology**.

---

## LOC-IQ

Never:

> “Built live integrations across 46 APIs.”

Correct:

> Architected and visualised a **46-source data universe** in an interactive prototype.

Never:

> “95% model accuracy.”

Correct:

> Demo confidence scores are static scenario outputs.

---

# 42. The Five Core Lessons

## Churn

> **Optimise the metric that reflects the business mistake that matters.**

## Forecasting

> **Respect time and beat a simple temporal baseline.**

## MPT

> **Diversification comes from covariance, not just number of holdings.**

## Systematic Equity

> **A strategy is signal + portfolio construction + implementation + risk control + validation.**

## LOC-IQ

> **A useful analytics product often begins by organising evidence before trying to train a model.**

---

# 43. Final Master Recall

```text
CLASSIFICATION
Churn
ANN
SMOTE
Recall

        ↓

FORECASTING
Trend
Seasonality
Stationarity
SARIMA
Rolling validation

        ↓

PORTFOLIO OPTIMISATION
Returns
Covariance
Weights
Sharpe-style objective

        ↓

SYSTEMATIC INVESTING
Factors
Ranks
Rebalancing
Turnover
Tracking Error
Robustness

        ↓

RISK PRODUCT
Identifiers
Data sources
Signals
Graph
Decision support
```

## If I remember only one sentence

> **I have applied quantitative thinking across customer prediction, temporal forecasting, portfolio optimisation, systematic equity research and credit/fraud decision-support product design — and in each case the method follows the structure of the problem rather than forcing one modelling technique everywhere.**