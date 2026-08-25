# 09 — Model Risk Management, Validation & Governance — End-to-End Master Note

> **Mental model:** A model turns imperfect data + assumptions into a number used to make a real decision.
>
> ```text
> Data
> +
> Assumptions
> +
> Methodology
> +
> Code
>        ↓
> Model Output
>        ↓
> Business / Risk / Finance Decision
> ```
>
> **Model risk = risk that the model is wrong, misused, poorly implemented, or relied on beyond its limits — causing a bad decision.**
>
> The core lifecycle:
>
> ```text
> Identify
> → Classify
> → Develop
> → Validate
> → Approve
> → Implement
> → Use
> → Monitor
> → Change / Remediate
> → Retire
> ```

---

# 1. Why Model Risk Exists

Models simplify reality.

Reality contains:

```text
human behaviour
economic cycles
rare defaults
changing products
bad data
structural breaks
```

A model cannot capture everything.

So even a mathematically correct model can be wrong for the decision being made.

---

# 2. Where Models Appear in Credit Risk

Across the notes so far:

```text
Retail application score
Behavioural score
PD
LGD
EAD / CCF
IFRS 9 staging
Lifetime ECL
Collateral valuation
Corporate rating
RWA / IRB
Stress testing
ICAAP
Liquidity stress
```

A bank therefore depends on models across:

```text
origination
monitoring
accounting
capital
stress
portfolio management
```

---

# 3. Model Risk — The Two Core Failure Modes

A useful split:

## Model error

The model itself is flawed.

Examples:

```text
wrong methodology
bad assumptions
poor data
coding error
weak calibration
```

## Model misuse

Model may be technically sound but used incorrectly.

Examples:

```text
wrong portfolio
wrong horizon
wrong decision
outside approved range
blind reliance on output
```

Both create model risk.

---

# 4. Model ≠ Data ≠ Rule ≠ Tool

Keep these separate.

## Data

```text
Income
Balance
DPD
Revenue
Collateral value
```

## Rule

```text
If DPD ≥ threshold
→ refer
```

## Model

Uses relationships between inputs to estimate an output.

Example:

```text
borrower attributes
→ PD
```

## Tool

Software / spreadsheet / engine implementing calculations.

A tool can contain models and rules.

But:

```text
Model ≠ software application
```

---

# 5. Is It a Model?

Banks need a governed definition.

A model normally has:

```text
inputs
+
quantitative / statistical / mathematical method
+
assumptions
+
output used in decisions
```

Examples:

```text
PD scorecard
→ model

LGD recovery model
→ model

Stress-loss model
→ model
```

A simple deterministic calculation may instead be:

```text
rule / calculator
```

depending on bank policy.

Classification matters because governance depends on it.

---

# 6. Model Inventory

The bank needs to know:

```text
What models exist?
Who owns them?
Where are they used?
How material are they?
What version is live?
When were they validated?
```

That becomes the:

```text
Model Inventory
```

Without an inventory:

> the bank cannot manage model risk consistently.

---

# 7. Typical Model Inventory Fields

```text
model_id
model_name
model_type
business_area
risk_type
portfolio
purpose
model_owner
developer
validator
user
materiality
tier
status
version
implementation_date
last_validation_date
next_validation_date
limitations
issues
```

Think:

```text
one governed record
for every material model
```

---

# 8. Model Identification

First question:

> Does this process meet the bank's definition of a model?

Examples:

```text
Application PD scorecard
→ Yes
```

```text
Corporate rating methodology
→ likely model / rating system
```

```text
Simple fee calculator
→ may not be model
```

Need a repeatable classification rule.

---

# 9. Model Risk Classification / Tiering

Not every model creates the same risk.

Possible hierarchy:

```text
Tier 1
High materiality

Tier 2
Medium

Tier 3
Lower
```

Tiering may consider:

- financial impact
- regulatory use
- exposure volume
- decision importance
- complexity
- uncertainty
- customer impact

Higher risk:

```text
more validation
more monitoring
more senior governance
```

---

# 10. Example — Tiering

### Model A

```text
IRB corporate PD
drives billions of RWA
```

Likely:

```text
high materiality
```

### Model B

```text
small internal sales forecast
no prudential use
```

Lower materiality.

Same word:

```text
model
```

Very different governance intensity.

---

# 11. The Three Lines

A common governance structure:

```text
1st Line
Develop / own / use

2nd Line
Independent risk oversight + validation

3rd Line
Internal Audit
```

Independence is essential.

---

# 12. First Line — Model Owner / Developer / User

Responsibilities can include:

```text
develop methodology
source data
document assumptions
implement model
use model correctly
monitor performance
remediate issues
```

First line owns the model's use.

It does not independently validate itself.

---

# 13. Second Line — Independent Validation

Question:

> Does the model work well enough for its intended use?

Independent validation challenges:

```text
methodology
data
assumptions
performance
implementation
limitations
use
```

Validator must be sufficiently independent from development.

---

# 14. Third Line — Internal Audit

Audit asks:

```text
Does the MRM framework itself operate effectively?
```

Examples:

- governance followed?
- validations completed?
- approvals evidenced?
- issues closed properly?
- inventory complete?
- roles independent?

Audit does not replace model validation.

---

# 15. Board and Senior Management

Model risk is not only a technical issue.

Senior management needs to know:

```text
Where are our biggest model risks?
Which models are weak?
What limitations are accepted?
What remediation is overdue?
```

Material model risk should be visible to senior governance.

---

# 16. Senior Accountability

A robust framework assigns overall model-risk accountability to appropriate senior management.

That accountability covers:

```text
framework
standards
risk appetite
governance
remediation
reporting
```

Model risk should be managed as a risk discipline in its own right.

---

# 17. Model Development Lifecycle

```text
Business need
     ↓
Model purpose
     ↓
Data
     ↓
Methodology
     ↓
Development
     ↓
Testing
     ↓
Documentation
     ↓
Independent validation
     ↓
Approval
     ↓
Implementation
```

Do not start with:

```text
Which algorithm shall we use?
```

Start with:

> **What decision is this model meant to support?**

---

# 18. Model Purpose

Example:

```text
Estimate 12-month default probability
for UK unsecured personal-loan applicants
at origination
```

That is specific.

Bad purpose:

```text
credit risk model
```

Too vague.

Purpose determines:

- population
- horizon
- target
- data
- methodology
- validation test

---

# 19. Intended Use

A model can be approved for:

```text
underwriting
```

but not automatically:

```text
IFRS 9
capital
stress testing
pricing
```

Same output may require different calibration.

So:

```text
model approved
≠
approved for every use
```

---

# 20. Development Population

Need to define:

```text
Who was the model built on?
```

Example:

```text
UK personal loans
originated 2019–2024
excluding fraud
excluding default at application
```

Apply that model to:

```text
SME overdrafts
```

and it becomes misuse.

---

# 21. Target Definition

For PD:

```text
What exactly counts as default?
```

For LGD:

```text
What counts as recovery?
What costs?
What discounting?
```

For EAD:

```text
What is exposure at default?
Which CCF horizon?
```

Target definition drives model meaning.

---

# 22. Data Lineage

A model input must be traceable.

Example:

```text
DPD
Source servicing system
        ↓
Risk data mart
        ↓
Model feature
        ↓
PD model
```

Need to understand:

```text
source
transformation
business rule
date
quality
```

Bad input lineage = model risk.

---

# 23. Data Quality

Model performance can fail because of:

```text
missing data
wrong units
stale values
mapping errors
duplicates
outliers
changed definitions
```

Example:

```text
Income historically annual
new source sends monthly
```

No model methodology changed.

But output becomes catastrophically wrong.

---

# 24. Representativeness

Development data should resemble the population where model is used.

Example:

```text
Model built on
prime mortgage customers
```

used on:

```text
high-LTV specialist mortgage portfolio
```

Risk:

```text
development population
≠
application population
```

---

# 25. Sample Bias

Suppose origination model is built only on:

```text
approved applicants
```

But declined applicants' future performance is unknown.

Then:

```text
development sample
```

is selected by the old credit policy.

That can create bias.

Retail credit models frequently face this issue.

---

# 26. Data History

Credit models need enough history to capture:

```text
good periods
bad periods
defaults
recoveries
```

If model data covers only boom years:

```text
risk can be understated
```

Economic representativeness matters.

---

# 27. Model Methodology

Possible techniques:

```text
Scorecard / logistic regression
Decision tree
Gradient boosting
Survival model
Regression
Monte Carlo
Expert judgement framework
Machine learning
```

Technique is not the goal.

The goal is:

> **reliable decision support for the intended use.**

---

# 28. Complexity Should Be Justified

A complex model is not automatically better.

Compare:

```text
Simple model
stable
transparent
good performance
```

versus:

```text
Complex model
slightly better accuracy
hard to explain
unstable
difficult to validate
```

Best choice depends on use.

---

# 29. Assumptions

Every model contains assumptions.

Examples:

```text
future resembles historical relationships
collateral recovery process remains similar
borrower behaviour remains stable
macroeconomic linkage remains valid
```

Assumptions should be:

```text
identified
documented
challenged
monitored
```

---

# 30. Limitations

No model is perfect.

Good documentation states:

```text
where model works
where it is weak
where it must not be used
```

Example:

```text
Corporate PD model
weak performance for start-ups
due to limited default history
```

That limitation must be managed.

---

# 31. Model Documentation

Should answer:

```text
What does it do?
Why?
For whom?
Using what data?
Using what method?
What assumptions?
What limitations?
How is performance measured?
How is it implemented?
How should output be used?
```

A model no one can explain is poorly governed.

---

# 32. Independent Validation

Validation should be more than:

```text
rerun model
→ same number
```

It asks whether the model is:

```text
conceptually sound
empirically supported
implemented correctly
performing acceptably
used appropriately
```

---

# 33. Validation — Conceptual Soundness

Questions:

```text
Does methodology make sense?
Are variables economically sensible?
Are assumptions justified?
Is target defined correctly?
Is segmentation appropriate?
```

Example:

```text
Mortgage PD model
ignores any payment-history variable
```

Validator should challenge why.

---

# 34. Validation — Data

Check:

```text
source completeness
population definition
data quality
sampling
transformations
outliers
missing treatment
```

Model can be mathematically excellent on corrupted data.

Still unusable.

---

# 35. Validation — Implementation

Development code:

```text
PD = 2.1%
```

Production engine:

```text
PD = 3.7%
```

Why?

Possible:

```text
different variable mapping
wrong transformation
wrong coefficient
wrong model version
```

Implementation validation ensures production equals approved design.

---

# 36. Validation — Performance

For PD models:

```text
Can it rank risk?
Is probability calibrated?
Is performance stable?
```

For LGD:

```text
Do estimated losses match observed recovery severity?
```

For EAD:

```text
Do predicted drawings resemble actual exposure at default?
```

---

# 37. Discrimination

For PD:

> Can the model rank high-risk borrowers above low-risk borrowers?

If:

```text
Borrower A
defaults frequently

Borrower B
rarely defaults
```

good model should generally assign:

```text
PD_A > PD_B
```

---

# 38. AUC / ROC

A common discrimination metric:

```text
AUC
=
Area Under ROC Curve
```

Intuition:

```text
0.5
→ random ranking

1.0
→ perfect ranking
```

Higher is generally better.

But:

```text
good AUC
≠
good calibration
```

---

# 39. Gini

Often related to AUC:

```text
Gini
=
2 × AUC − 1
```

Example:

```text
AUC = 0.75
```

```text
Gini
=
0.50
```

Again:

```text
ranking metric
```

not a calibration metric.

---

# 40. KS Statistic

Another ranking / separation metric:

```text
KS
```

measures maximum separation between distributions of:

```text
defaults
vs
non-defaults
```

Useful in retail scorecards.

But no single metric proves model quality.

---

# 41. Calibration

Question:

> Are predicted probabilities close to actual default rates?

Example:

```text
Predicted PD     5%
Observed DR      5.2%
```

looks reasonably aligned.

But:

```text
Predicted PD     2%
Observed DR      7%
```

suggests underprediction.

---

# 42. Discrimination vs Calibration

Permanent distinction:

```text
Discrimination
→ who is riskier?
```

```text
Calibration
→ how risky are they?
```

A model can rank borrowers perfectly but assign all PDs too low.

Then:

```text
good discrimination
+
bad calibration
```

---

# 43. Backtesting

Backtesting compares:

```text
model prediction
vs
realized outcome
```

Examples:

```text
PD
vs
observed default rate
```

```text
LGD
vs
actual realized loss
```

```text
EAD
vs
actual exposure at default
```

This is central to monitoring and validation.

---

# 44. Benchmarking

Compare model against:

```text
alternative model
external benchmark
simple challenger
peer / vendor measure
```

If bank model says:

```text
PD 0.3%
```

while credible alternatives cluster around:

```text
2–3%
```

that deserves investigation.

---

# 45. Challenger Model

A challenger is not necessarily intended for production.

Purpose:

```text
independent comparison
```

Example:

```text
Production PD
logistic scorecard

Challenger
gradient boosting model
```

If challenger consistently outperforms:

```text
review production model
```

---

# 46. Stability

A model's behaviour should not change unpredictably.

Monitor:

```text
input distribution
score distribution
rating distribution
performance
```

If population shifts materially:

```text
model may no longer be representative
```

---

# 47. PSI — Population Stability Index

Often used to detect changes in input / score distribution.

Core intuition:

```text
development population
vs
current population
```

Large shift:

```text
model population changed
```

PSI is a signal.

Not automatic proof of failure.

---

# 48. Rating Migration

Corporate model monitoring may examine:

```text
Grade 3 → Grade 4
Grade 4 → Grade 6
Default
Upgrade
```

Migration patterns can reveal:

- instability
- delayed downgrade
- excessive volatility

---

# 49. Override Monitoring

Analysts may override model output.

Example:

```text
Model grade   4
Final grade   6
```

Need:

```text
override reason
approver
frequency
direction
outcome
```

If 40% of outputs are overridden:

> either model or usage process may be wrong.

---

# 50. Model Use Test

A model should be used meaningfully in real decision-making if it is designed for that purpose.

Warning signs:

```text
model exists only for reporting
users ignore output
routine overrides
parallel spreadsheet used instead
```

A model can be technically strong but operationally irrelevant.

---

# 51. Human Judgement

Models should inform judgement.

Not replace it blindly.

Good pattern:

```text
Model output
+
documented expert judgement
+
governed override
=
final decision
```

Bad pattern:

```text
analyst dislikes result
→ changes rating
→ no evidence
```

---

# 52. Model Approval

Before production use:

```text
development complete
validation complete
issues assessed
limitations accepted
governance approval
```

Decision may be:

```text
Approved
Approved with conditions
Rejected
Deferred
```

---

# 53. Approval Conditions

Example:

```text
Approved
but
monitor high-LTV segment monthly
+
rebuild within 12 months
```

Conditional approval is a model-risk mitigant.

---

# 54. Implementation

Approved model must be translated into production.

Possible implementation errors:

```text
wrong coefficients
wrong cut-offs
wrong data field
wrong rounding
wrong version
wrong segmentation
```

Implementation risk is model risk.

---

# 55. UAT — User Acceptance Testing

Before go-live, test:

```text
input
→ transformation
→ model
→ output
→ downstream decision
```

Example:

```text
Income = £60k
DPD = 0
Utilisation = 50%
```

Expected score:

```text
712
```

Production gives:

```text
655
```

Must investigate before launch.

---

# 56. Parallel Run

Old and new model run together.

Example:

```text
Old model PD
New model PD
```

Compare:

- portfolio distribution
- approvals
- ratings
- capital
- ECL
- customer impact

Parallel run catches unintended consequences.

---

# 57. Change Management

A model can change through:

```text
recalibration
redevelopment
new variable
new data source
new segmentation
new code
new cut-off
new use
```

Not every change is equally material.

---

# 58. Material vs Non-Material Change

Bank policy defines thresholds.

Material change may require:

```text
full validation
senior approval
regulatory engagement where relevant
```

Minor technical fix may follow lighter governance.

But:

```text
“small code change”
```

can still have large output impact.

Impact matters.

---

# 59. Model Version Control

Need:

```text
v1.0
v1.1
v2.0
```

and:

```text
effective date
approval
change description
```

Without version control:

> historical numbers cannot be reproduced.

---

# 60. Monitoring Frequency

Higher-risk models:

```text
more frequent monitoring
```

Possible:

```text
monthly
quarterly
semiannual
annual
```

based on model tier and use.

---

# 61. Monitoring Dashboard

Typical indicators:

```text
AUC / Gini
calibration
observed default rate
PSI
override rate
rating migration
missing data
model usage
limit breaches
```

For LGD / EAD:

```text
recovery error
CCF error
bias
segment performance
```

---

# 62. Thresholds

Example:

```text
Green
within tolerance

Amber
investigate

Red
remediation / escalation
```

Thresholds should be defined before results arrive.

Not invented afterward.

---

# 63. Model Breach

Example:

```text
Calibration error
above red threshold
```

Possible actions:

```text
investigate
apply overlay
tighten use
increase monitoring
recalibrate
redevelop
```

A breach does not always mean immediate shutdown.

But it must be governed.

---

# 64. Model Limitation

Known weakness:

```text
Limited data for recent economic downturn
```

Could be accepted with:

```text
conservative adjustment
usage restriction
extra monitoring
```

A known limitation is manageable.

An unknown limitation is more dangerous.

---

# 65. Model Risk Mitigants

Possible:

```text
conservatism
overlay
buffer
manual review
use restriction
approval condition
additional monitoring
fallback model
recalibration
redevelopment
```

Mitigant should address the actual weakness.

---

# 66. Overlay

An overlay adjusts model output outside the core model.

Example:

```text
Model ECL     £100m
Overlay       +£20m
Final ECL     £120m
```

Reason:

```text
model does not capture emerging sector risk
```

Overlays must be:

```text
justified
quantified
approved
reviewed
temporary where possible
```

---

# 67. Overlay Trap

Bad:

```text
Model looks wrong
→ add arbitrary 10%
```

Good:

```text
specific limitation
→ quantified adjustment
→ evidence
→ governance
→ exit criteria
```

Overlay is not a substitute for repairing a broken model forever.

---

# 68. Compensating Control

Example:

```text
Model weak for start-up SMEs
```

Control:

```text
mandatory senior manual review
for start-ups
```

This limits risk while model remediation proceeds.

---

# 69. Model Issue

Issue should record:

```text
what is wrong
impact
severity
owner
action
due date
status
```

Example:

```text
LGD model
underestimates legal recovery costs
```

Need quantified impact.

---

# 70. Issue Severity

Possible:

```text
High
Medium
Low
```

based on:

- financial impact
- regulatory impact
- customer impact
- decision impact
- breadth
- urgency

High-severity issue should escalate quickly.

---

# 71. Remediation

Possible actions:

```text
fix data
recalibrate
redevelop
change methodology
restrict use
apply overlay
replace vendor
retire model
```

Need clear end-state.

---

# 72. Closure

Issue is not closed because:

```text
code changed
```

Need evidence:

```text
fix implemented
tested
validated where required
approved
residual risk acceptable
```

---

# 73. Model Validation Frequency

Validation may be:

```text
initial
periodic
event-driven
```

Event triggers:

```text
material change
performance deterioration
new use
new portfolio
regulatory change
```

---

# 74. Ongoing Monitoring vs Validation

## Monitoring

Continuous / periodic performance checks.

## Validation

Independent deeper review.

So:

```text
Monitoring ≠ Validation
```

Both required.

---

# 75. Development vs Validation

Developer asks:

```text
How can we build the best model?
```

Validator asks:

```text
Should the bank trust this model?
```

Different roles.

---

# 76. Validation vs Audit

Validator tests model quality.

Audit tests whether governance framework and controls operate effectively.

```text
Validation ≠ Audit
```

---

# 77. Vendor Models

A third party may provide:

```text
credit score
PD
economic scenario model
valuation model
```

Vendor ownership does **not** remove bank accountability.

Bank still needs to understand:

```text
purpose
data
methodology
limitations
performance
use
```

---

# 78. Vendor Black Box

Problem:

```text
Vendor says:
“proprietary algorithm”
```

Bank still needs enough information to manage risk.

If model cannot be challenged appropriately:

```text
model risk remains with the bank
```

---

# 79. Vendor Change

Vendor silently changes:

```text
methodology
data source
score scale
```

Then:

```text
output movement
```

may occur without portfolio change.

Vendor models need version / change governance too.

---

# 80. AI / Machine Learning Models

AI / ML can improve:

```text
non-linear pattern capture
prediction
automation
```

But can increase:

```text
complexity
opacity
data sensitivity
bias risk
monitoring difficulty
```

MRM principles still apply.

---

# 81. Explainability

Question:

> Can users and validators understand what materially drives the output?

Especially important where model affects:

- lending decisions
- customer outcomes
- regulatory capital
- financial reporting

Explainability need is proportional to use and risk.

---

# 82. Bias and Fairness

A model may predict well overall but treat groups unfairly.

Need to distinguish:

```text
credit-risk performance
```

from:

```text
fairness / conduct
```

Both can matter.

A statistically predictive variable is not automatically appropriate to use.

---

# 83. Data Drift

Input population changes.

Example:

```text
Pre-2020 spending behaviour
vs
post-digital customer behaviour
```

Model relationships may weaken.

This is:

```text
data / population drift
```

---

# 84. Concept Drift

The relationship between input and outcome changes.

Example:

```text
High card utilisation
historically strong default signal
```

but new product design changes behaviour.

Same input distribution.

Different predictive meaning.

That is concept drift.

---

# 85. Structural Break

Major event changes historical relationships.

Examples:

```text
pandemic
energy crisis
regulatory payment holiday
major underwriting policy change
```

Historical model may become temporarily unreliable.

---

# 86. Retail Model Example — PD Scorecard

Purpose:

```text
12-month PD
for new personal-loan applicants
```

Inputs:

```text
bureau history
income
debt
recent applications
past delinquency
```

Validation asks:

```text
Can it rank defaults?
Is PD calibrated?
Has applicant population shifted?
Are policy changes affecting outcomes?
```

---

# 87. Retail Model Deterioration Example

Development:

```text
AUC 0.78
Observed DR broadly aligned
```

Two years later:

```text
AUC 0.65
Observed DR 6%
Predicted PD 3%
PSI elevated
```

Interpretation:

```text
ranking worse
+
calibration materially low
+
population changed
```

Action:

```text
investigate
→ recalibrate / redevelop
→ apply mitigant meanwhile
```

---

# 88. SME Rating Model Example

Model uses:

```text
Debt / EBITDA
DSCR
Revenue trend
Bank conduct
Industry
Owner quality
```

Risk:

```text
financial data stale
+
qualitative override excessive
```

Monitoring should include:

```text
rating migration
override rate
default by grade
data age
```

---

# 89. Corporate Rating Model Example

Corporate rating:

```text
Business risk score
+
Financial risk score
+
Qualitative adjustment
→ Final grade
→ PD
```

Validation asks:

```text
Do grades rank default risk?
Are overrides justified?
Is rating too slow to react?
Does sector treatment make sense?
```

---

# 90. Corporate Rating — Override Risk

Model grade:

```text
6
```

Relationship team requests:

```text
4
```

because:

```text
“client is strategically important”
```

That is not a valid credit-risk reason.

Commercial importance should not artificially improve risk grade.

---

# 91. LGD Model Example

Inputs:

```text
collateral
seniority
recovery history
time to recovery
costs
```

Validation:

```text
predicted LGD
vs
realized LGD
```

Need enough default / recovery history.

Sparse data is a major challenge.

---

# 92. EAD / CCF Model Example

Credit card:

```text
current utilisation
unused limit
behaviour
```

Model predicts:

```text
future drawing before default
```

Validation:

```text
Predicted EAD
vs
Actual exposure at default
```

Stress periods are especially important.

---

# 93. IFRS 9 Model Risk

IFRS 9 contains multiple model layers:

```text
SICR
PD term structure
LGD
EAD
Macroeconomic scenarios
Scenario weights
Post-model adjustments
```

Model risk can arise in any layer.

Final ECL can be wrong even if one PD model is excellent.

---

# 94. RWA / IRB Model Risk

IRB models can directly affect:

```text
regulatory RWA
capital ratios
pricing
portfolio allocation
```

Therefore governance is particularly stringent.

Small parameter bias can create large capital impact.

---

# 95. Stress-Test Model Risk

Stress models translate:

```text
macro scenario
→ credit losses
→ P&L
→ capital
```

Potential issue:

```text
relationship calibrated only on mild recessions
```

then used for severe stress.

Extrapolation risk can be large.

---

# 96. Liquidity Model Risk

Liquidity frameworks also use behavioural assumptions:

```text
deposit runoff
drawdown
asset monetisation
prepayment
```

Wrong assumptions can overstate survival.

Not every liquidity number is purely deterministic.

---

# 97. Model Interdependency

Models often feed other models.

Example:

```text
Macro model
→ PD model
→ ECL model
→ Capital forecast
```

If upstream model fails:

```text
downstream outputs all affected
```

Need dependency mapping.

---

# 98. Model Chain

Example:

```text
Customer data
→ Behavioural score
→ PD
→ Stage
→ ECL
→ Provision
→ CET1 forecast
```

One input mapping error can propagate through the whole bank.

Model risk is therefore also **system risk + data lineage risk**.

---

# 99. End-User Computing — EUC

Important bank reality:

```text
Excel
Access
Python script
local tool
```

may sit around formal models.

Even if not classified as a model:

```text
critical EUC
```

can create calculation / operational risk.

Needs controls.

---

# 100. Spreadsheet Model Risk

Example:

```text
LGD overlay calculated in Excel
```

Potential:

```text
hard-coded value
broken formula
wrong range
manual copy error
```

The sophisticated model may be correct.

Final number still wrong.

---

# 101. Change Control

Production model changes should have:

```text
request
impact assessment
development
testing
validation if needed
approval
deployment
post-implementation check
```

No uncontrolled edits.

---

# 102. Access Control

Who can:

```text
change model?
change parameter?
change override?
deploy version?
```

Need separation of duties.

Especially for prudential / financial-reporting models.

---

# 103. Model Risk Appetite

Bank may define limits such as:

```text
Maximum overdue high-severity issues
Maximum unvalidated material models
Maximum temporary overlays
Validation completion rate
High-risk model performance breaches
```

This makes model risk measurable at portfolio level.

---

# 104. Model Risk Reporting

Senior dashboard:

```text
Number of models
High-risk models
Overdue validations
Open high issues
Models outside appetite
Material overlays
Major performance breaches
```

Management needs portfolio view, not 500 individual reports.

---

# 105. Model Inventory Completeness

Major hidden risk:

```text
unregistered models
```

If a business uses:

```text
local Python score
```

for credit decisions but it is not in inventory:

```text
no validation
no monitoring
no governance
```

Inventory completeness is itself a control.

---

# 106. Model Retirement

Models should not live forever.

Retirement triggers:

```text
replacement
product closed
methodology obsolete
poor performance
system decommissioned
```

Need:

```text
retirement approval
downstream impact
archive
historical reproducibility
```

---

# 107. Historical Reproducibility

Question:

> Can we reproduce the model output used for a decision two years ago?

Need:

```text
model version
input snapshot
code
parameters
override
date
```

Critical for:

- audit
- complaints
- regulatory review
- backtesting

---

# 108. Validation Finding

Example:

```text
Finding:
PD model materially underpredicts
defaults in high-LTV segment
```

Need:

```text
severity
impact
owner
deadline
mitigant
```

Not just a paragraph in a PDF.

---

# 109. Model Risk Acceptance

Sometimes issue cannot be fixed immediately.

Governance may accept residual risk temporarily.

Need:

```text
who accepted?
why?
until when?
what mitigant?
what exit condition?
```

Risk acceptance should expire.

---

# 110. Validation Outcome

Possible:

```text
Pass
Pass with findings
Conditional approval
Fail
```

Exact terminology differs by bank.

Core idea:

> Validation produces an independent conclusion, not merely test results.

---

# 111. Model Monitoring Example

Quarterly PD dashboard:

```text
AUC                     0.74
Calibration ratio       acceptable
PSI                     amber
Override rate           6%
Data missing rate       0.3%
Observed DR             within tolerance
```

Conclusion:

```text
model generally stable
but population shift needs monitoring
```

---

# 112. Red-Flag Monitoring Example

```text
AUC                     0.59
Observed DR             7.0%
Average PD              2.8%
PSI                     high
Override rate           24%
```

Pattern:

```text
weak discrimination
+
underprediction
+
population shift
+
users distrust output
```

Strong case for remediation.

---

# 113. Model Risk and Business Decisions

Bad PD model can cause:

```text
too many approvals
→ credit losses
```

or:

```text
too many declines
→ lost revenue / customer harm
```

Model risk can create both:

```text
risk underestimation
and
risk overestimation
```

---

# 114. Model Risk and Capital

If IRB PD is understated:

```text
RWA too low
→ capital ratio overstated
```

If overstated:

```text
RWA too high
→ capital consumed unnecessarily
```

Accuracy matters in both directions.

---

# 115. Model Risk and IFRS 9

If lifetime PD is understated:

```text
ECL too low
→ provision too low
→ profit / CET1 too high
```

Bad model can therefore misstate financial position.

---

# 116. Model Risk and Stress Testing

If stress model is too mild:

```text
stress losses understated
→ capital plan falsely comfortable
```

If too harsh:

```text
capital may be trapped unnecessarily
```

Independent challenge matters.

---

# 117. Common Trap — Good Accuracy = Good Model

Wrong.

Need:

```text
methodology
calibration
stability
data quality
implementation
use
governance
```

Accuracy is one dimension.

---

# 118. Common Trap — Validation = Backtesting

Wrong.

Backtesting is one validation tool.

Validation is broader.

---

# 119. Common Trap — Vendor Model = Vendor Risk Only

Wrong.

It remains model risk for the bank using the output.

---

# 120. Common Trap — Simple Model = Low Risk

Wrong.

A simple model driving:

```text
£100bn RWA
```

can be highly material.

Risk depends on use and impact, not algorithm complexity.

---

# 121. Common Trap — Complex Model = Better Model

Wrong.

Complexity needs justification.

---

# 122. Common Trap — High AUC = Correct PD

Wrong.

High AUC means good ranking.

PD can still be badly calibrated.

---

# 123. Common Trap — No Model Change = No Model Risk Change

Wrong.

Population, economy, product, and data can change while code stays identical.

---

# 124. Common Trap — Override Fixes Model Weakness

Not permanently.

High override rate can itself be evidence of model weakness.

---

# 125. Common Trap — Overlay = Model Repair

Wrong.

Overlay is a temporary / targeted mitigant.

Underlying model issue still needs resolution.

---

# 126. Common Trap — Monitoring = Validation

Wrong.

Monitoring:

```text
ongoing first-line / control process
```

Validation:

```text
independent deep challenge
```

---

# 127. Common Trap — Model Owner = Validator

Independence would be compromised.

Developer should not independently approve its own work.

---

# 128. Common Trap — Model Inventory = List of Regulatory Models Only

Wrong.

A robust framework identifies models used across material business decisions, according to bank policy and regulatory scope.

---

# 129. Full Model-Risk Lifecycle

```text
BUSINESS NEED
      ↓
Model purpose
      ↓
MODEL IDENTIFICATION
      ↓
Inventory + tier
      ↓
DEVELOPMENT
Data
Methodology
Assumptions
Documentation
      ↓
INDEPENDENT VALIDATION
Concept
Data
Performance
Implementation
Use
      ↓
APPROVAL
      ↓
IMPLEMENTATION
UAT / parallel run
      ↓
PRODUCTION USE
      ↓
MONITORING
Performance
Stability
Overrides
      ↓
ISSUE?
   ┌───────┴────────┐
   │                │
   No              Yes
   │                ↓
Continue       Mitigant / remediation
   │                ↓
   └────────── Revalidation
                    ↓
                  APPROVAL
                    ↓
                 RETIREMENT
```

---

# 130. Retail → Model Risk

```text
Application score
Behavioural score
PD
LGD
EAD
IFRS 9
```

Main risks:

```text
population drift
bureau changes
policy selection
bias
high-volume customer impact
```

---

# 131. SME → Model Risk

```text
financial score
owner variables
behaviour
qualitative judgement
```

Main risks:

```text
stale financials
small samples
heterogeneous businesses
overrides
data quality
```

---

# 132. Corporate → Model Risk

```text
internal rating
PD
LGD
stress model
```

Main risks:

```text
few defaults
expert judgement
rating inertia
sector concentration
override governance
```

---

# 133. IFRS 9 → Model Risk

```text
SICR
PD term structure
LGD
EAD
economic scenarios
weights
overlays
```

Need to govern the **whole chain**, not only individual models.

---

# 134. Basel / IRB → Model Risk

```text
Rating
→ PD
→ LGD
→ EAD
→ risk function
→ RWA
→ capital ratio
```

Small model error can propagate into large regulatory capital impact.

---

# 135. ICAAP / Stress → Model Risk

```text
Macro scenario
→ stressed parameters
→ loss
→ RWA
→ CET1
```

Stress model limitations can misstate resilience.

---

# 136. Fast Diagnostic — When You Open a Model File

Ask:

1. **What decision does this model support?**
2. **Who is the model for?**
3. **What is the prediction / output?**
4. **What horizon?**
5. **Which data population?**
6. **Which target definition?**
7. **What methodology?**
8. **What assumptions?**
9. **What limitations?**
10. **Who owns it?**
11. **Who independently validated it?**
12. **What version is live?**
13. **What validation findings exist?**
14. **How is performance monitored?**
15. **How is calibration performing?**
16. **Has the population shifted?**
17. **How often is it overridden?**
18. **Any overlays / mitigants?**
19. **Any overdue issues?**
20. **Can the historical output be reproduced?**

If these are clear:

> the model is understandable as a governed risk object.

---

# 137. One-Page Recall Sheet

## Model risk

```text
Wrong model
+
Wrong implementation
+
Wrong use
=
Bad decision
```

## Lifecycle

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

```text
1st Line
Own / develop / use

2nd Line
Independent challenge / validation

3rd Line
Audit framework + controls
```

## Validation

```text
Conceptual soundness
Data
Performance
Implementation
Use
```

## PD performance

```text
Discrimination
→ rank risk

Calibration
→ estimate level of risk

Stability
→ remain reliable over time
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

## Never Confuse

```text
Model ≠ Tool

Score ≠ PD

Discrimination ≠ Calibration

Monitoring ≠ Validation

Validation ≠ Audit

Vendor model ≠ no bank accountability

Overlay ≠ permanent model repair

High complexity ≠ high quality

No code change ≠ no model drift

Internal model ≠ automatically IRB model
```

---

# 138. UK PRA Model-Risk Framework — Current Position

**Position checked: 25 August 2026**

The PRA's current **SS1/23 — Model risk management principles for banks** sets five overarching principles:

```text
1. Model identification and model risk classification

2. Governance

3. Model development, implementation and use

4. Independent model validation

5. Model risk mitigants
```

Current version:

```text
Published / effective
23 April 2026
```

The underlying policy first became effective:

```text
17 May 2024
```

The current SS1/23 scope is focused on UK-incorporated banks, building societies and PRA-designated investment firms with internal-model permission for regulatory capital.

Within in-scope firms, the principles are designed as an overarching model-risk framework across model types and include internally developed and vendor models used to inform business decisions.

The PRA also updated **SS3/18 — Model risk management principles for stress testing** in April 2026 so that internal-model firms assess stress-test model-risk practices against the broader SS1/23 framework.

---

# 139. The One Sentence to Retain

> **Model risk management is the discipline of knowing every material model, understanding exactly what it is designed to do, independently challenging whether it works, controlling how it is implemented and used, continuously monitoring whether reality has moved away from its assumptions, and applying transparent mitigants or remediation before model weakness becomes a bad credit, accounting, capital, or strategic decision.**
