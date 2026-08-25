# 02 — Credit Risk Data, Reporting & Change — End-to-End Masterclass

> **UK banking lens:** BCBS 239 + PRA regulatory reporting + credit-risk data lineage + controlled change delivery.
>
> **Master mental model**
>
> ```text
> RULE
> → BUSINESS MEANING
> → SOURCE DATA
> → TRANSFORMATION
> → CALCULATION
> → CONTROL
> → REPORT
> → TEST EVIDENCE
> → SIGN-OFF
> → BAU
> ```
>
> **Permanent rule:**  
> **A correct number that cannot be traced, reconciled, explained, controlled and reproduced is not a defensible bank number.**

---

# 1. The Credit-Risk Data Machine — One Screen

```text
CUSTOMER / OBLIGOR / GROUP
        ↓
ACCOUNT / FACILITY / PRODUCT
        ↓
TRANSACTION / BALANCE / LIMIT / COLLATERAL
        ↓
RATING / SCORE / DEFAULT / WATCHLIST
        ↓
PD / LGD / EAD
        ↓
IFRS 9 ECL / RWA / STRESS / MI
        ↓
REGULATORY + FINANCE + RISK REPORTING
```

Underneath every arrow:

```text
Source
→ Definition
→ Grain
→ Date
→ Transformation
→ Control
→ Owner
```

That is the real data job.

---

# 2. Why Data Governance Matters

The bank must be able to answer:

| Question | What must exist |
|---|---|
| Where did this number come from? | Lineage |
| What exactly does this field mean? | Business definition / metadata |
| Which system is authoritative? | Golden / authoritative source |
| At what level does the row exist? | Grain |
| Which value was valid on reporting date? | Effective dating |
| What happened between source and output? | Transformation rules |
| How do we know nothing was lost? | Controls + reconciliation |
| Who owns the meaning / quality? | Data ownership |
| Can we reproduce last quarter? | Version + historical traceability |

> **Bank data is not just values. It is values + meaning + time + ownership + evidence.**

---

# 3. BCBS 239 — The Compressed Framework

> **BCBS 239 = Principles for effective risk data aggregation and risk reporting.**

## 11 bank principles

| Block | Principles | Permanent memory |
|---|---|---|
| **Governance + Infrastructure** | Governance; Data architecture & IT infrastructure | Management owns the data capability |
| **Risk Data Aggregation** | Accuracy & integrity; Completeness; Timeliness; Adaptability | Bank must aggregate risk correctly, fully, quickly and flexibly |
| **Risk Reporting** | Accuracy; Comprehensiveness; Clarity & usefulness; Frequency; Distribution | Reports must be decision-useful, not merely produced |

## 3 supervisory principles

```text
Review
→ Remedial action
→ Home / host supervisory cooperation
```

### BCBS 239 in one line

```text
Right data
+
complete data
+
fast enough
+
traceable
+
usable under normal and stress conditions
```

---

# 4. Critical Data Elements — CDEs

> **CDE = field whose failure can materially affect risk calculation, reporting, decisioning or regulatory compliance.**

Typical credit-risk CDEs:

```text
customer_id
obligor_id
facility_id
product_type
reporting_date
drawn_balance
undrawn_amount
limit
DPD
default_flag
rating_grade
PD
LGD
EAD
collateral_value
stage
ECL
exposure_class
RWA
```

CDE governance should define:

```text
Definition
Owner
Source
Quality rule
Lineage
Control
Issue process
```

---

# 5. The Five Data Questions

For every important field ask:

```text
SOURCE
Where is it authoritative?

GRAIN
One row per what?

DATE
Which value is valid when?

RULE
What transformation / logic applies?

CONTROL
How do we prove it is correct?
```

If these five are unclear:

> **the field is not production-ready.**

---

# 6. Grain — The Hidden Source of Errors

> **Grain = what one row represents.**

Examples:

```text
1 row per customer
1 row per obligor
1 row per facility
1 row per account per month
1 row per collateral item
1 row per facility per reporting date
```

Wrong joins across grains create:

```text
duplicates
double counting
missing exposure
false totals
```

### Permanent trap

```text
Correct-looking total
≠
correct grain
```

Offsetting errors can hide underneath the total.

---

# 7. Effective Dating — Which Value Was True Then?

Credit-risk values change:

```text
Rating
Watchlist
Collateral valuation
Stage
PD
Limit
Guarantee
```

Need:

```text
valid_from
valid_to
reporting_date
```

Core rule:

```text
Select the record
effective at the reporting snapshot
```

### Never confuse

```text
Latest value
≠
value valid at reporting date
```

---

# 8. Golden / Authoritative Source

> **Authoritative source = system formally designated as the trusted origin for a governed field.**

Examples:

```text
Customer identity
→ Customer Master

Facility limit
→ Lending / facility system

Internal rating
→ Rating platform

Collateral valuation
→ Collateral system

General ledger balance
→ Finance ledger
```

One field may physically exist in many places.

Only one should be authoritative for a defined use.

---

# 9. Metadata — Meaning Before Mapping

A field name is not a definition.

Bad:

```text
PD
```

Good metadata:

```text
Field              current_pd
Definition         governed probability of default
Level              obligor
Horizon            12 months
Model              Corporate PD v4
As-of date         reporting snapshot
Datatype           decimal
Null rule          not permitted for IRB population
Owner              Credit Risk
```

### Permanent rule

```text
Field name ≠ business meaning
```

---

# 10. Architecture vs Lineage vs Mapping

| Concept | Answers |
|---|---|
| **Architecture** | Which systems / components exist and how they connect |
| **Data Lineage** | Where a data element came from and every transformation to consumer |
| **Source-to-Target Mapping** | Exact field-level source → rule → target specification |
| **Requirements Traceability** | Why the requirement exists and where it was built / tested |
| **Process Flow** | Who / what performs each business step |

### One-line distinction

```text
Architecture
→ where systems are

Lineage
→ where the data travelled

Mapping
→ exactly how one field became another

Traceability
→ why the change exists and how it was proven
```

---

# 11. Data Lineage — The Proof Chain

```text
SOURCE SYSTEM
table.column
        ↓
INGESTION
file / API / ETL
        ↓
TRANSFORMATION
mapping / lookup / derivation
        ↓
RISK DATA STORE
governed field
        ↓
CALCULATION
PD / LGD / EAD / ECL / RWA
        ↓
AGGREGATION
portfolio / entity / template
        ↓
CONSUMER
report / dashboard / regulatory return
```

For every hop retain:

```text
system
field
definition
rule
date
owner
control
```

---

# 12. Source-to-Target Mapping — STTM

A good mapping is buildable **and** testable.

| Element | What it captures |
|---|---|
| Source system | Origin |
| Source table / field | Exact field |
| Source definition | Meaning |
| Grain | Row level |
| Datatype | Technical type |
| Transformation | Calculation / lookup / condition |
| Reference data | Mapping table / hierarchy |
| Null rule | Missing-data treatment |
| Target field | Destination |
| Target definition | Intended meaning |
| Control | How result is validated |
| Owner | Accountability |

### Minimum mapping logic

```text
SOURCE
→ CONDITION
→ TRANSFORMATION
→ TARGET
→ EXCEPTION
→ CONTROL
```

---

# 13. ETL / ELT — What the BA Needs to Know

```text
Extract
→ get data

Transform
→ clean / standardise / enrich / calculate

Load
→ place into target
```

Modern platforms may transform after loading:

```text
ELT
```

The BA does not need to be the data engineer.

The BA must understand:

```text
what entered
what rule changed it
what came out
what happens when it fails
```

---

# 14. Core Transformation Types

| Type | Meaning |
|---|---|
| Direct map | Source copied unchanged |
| Derivation | New value calculated |
| Lookup | Reference table determines result |
| Filter | Population inclusion / exclusion |
| Aggregation | Many rows → summary |
| Split | One source → multiple targets |
| Merge | Multiple sources → one result |
| Defaulting | Fallback applied if missing |
| Override | Governed replacement of standard result |
| Effective-date selection | Correct historical record selected |

---

# 15. Reference Data

Examples:

```text
Product hierarchy
Country code
Currency
Industry / sector
Legal entity
Exposure class
Risk grade
Collateral type
Reporting taxonomy
```

Reference data looks small.

But wrong mappings can change:

```text
classification
aggregation
RWA
reporting
```

So reference data requires governance too.

---

# 16. Data Quality — Six Core Dimensions

| Dimension | Question |
|---|---|
| **Accuracy** | Does value reflect reality / authoritative source? |
| **Completeness** | Is required data present? |
| **Timeliness** | Is it available in time and current enough? |
| **Consistency** | Does it agree across systems / reports? |
| **Uniqueness** | Are duplicate records absent? |
| **Validity** | Is format / range / domain allowed? |

### Turn quality into rules

Bad:

```text
PD should be good quality
```

Good:

```text
PD must be non-null
for all performing IRB obligors
at reporting snapshot
```

---

# 17. Data Quality Rule Structure

```text
CDE
+
Population
+
Condition
+
Threshold
+
Severity
+
Owner
+
Action
```

Example form:

```text
Field          default_flag
Population     active facilities
Rule           value ∈ {Y,N}
Threshold      100%
Severity       Critical
Owner          Credit Risk Data
Action         reject / investigate
```

No narrative needed.

The rule itself is the control.

---

# 18. Data Issue Lifecycle

```text
Detection
→ Triage
→ Root Cause
→ Impact
→ Owner
→ Remediation
→ Retest
→ Closure
```

Root-cause families:

```text
Source data
Mapping
Transformation
Reference data
Timing
Duplicate
Missing population
System defect
Manual process
Business-rule ambiguity
```

---

# 19. Controls — Prevent, Detect, Correct

| Control | Purpose |
|---|---|
| Preventive | Stop error entering process |
| Detective | Identify error after occurrence |
| Corrective | Repair / contain error |

Examples of control forms:

```text
mandatory field
valid-value rule
record-count check
control total
duplicate check
reconciliation
exception report
maker-checker
approval
```

---

# 20. Reconciliation — Four Permanent Types

| Reconciliation | Proves |
|---|---|
| **Source → Report** | Population / values survived pipeline |
| **Report → Ledger** | Regulatory / finance output ties to accounting source where required |
| **Report → Report** | Related outputs are internally consistent |
| **Period → Period** | Movement since previous cycle is explainable |

### Reconciliation equation

```text
Opening
+ New
− Closed / Repaid
± Movement / Revaluation / Reclassification
=
Closing
```

Unexplained residual:

```text
→ investigate
```

---

# 21. Control Total vs Record Count

```text
Record Count
→ Did all rows arrive?
```

```text
Control Total
→ Did total value arrive?
```

Need both.

Why?

```text
Missing + duplicate row
can leave count or total deceptively correct
```

Multiple controls create confidence.

---

# 22. Regulatory Reporting — The Output Layer

## COREP vs FINREP vs Pillar 3

| Output | Core purpose |
|---|---|
| **COREP** | Prudential regulatory reporting — capital / RWA / related prudential information |
| **FINREP** | Financial / accounting regulatory information for firms in scope |
| **Pillar 3** | Public prudential disclosures / market discipline |
| **PRA returns** | UK supervisory returns beyond the simple COREP / FINREP distinction |

### Permanent rule

```text
COREP ≠ FINREP
```

They may share source data.

They do not have the same purpose or definitions.

---

# 23. Regulatory Reporting Cycle

```text
Regulatory rule / template
        ↓
Interpretation
        ↓
Data requirements
        ↓
Source extraction
        ↓
Transformation / calculation
        ↓
Aggregation
        ↓
Reconciliation
        ↓
Exception investigation
        ↓
Review
        ↓
Sign-off
        ↓
Submission
        ↓
Archive / evidence
```

A reporting process must be:

```text
repeatable
controlled
traceable
reproducible
```

---

# 24. Reporting Grain

Regulatory outputs often aggregate.

But the bank must be able to move both directions:

```text
Facility / account
        ↓
Portfolio / template aggregation
```

and:

```text
Report cell
        ↓
Underlying population
        ↓
Source records
```

This is **drill-down + trace-back**.

---

# 25. Regulatory Taxonomy / Template Mapping

The bank must map internal meaning to external reporting meaning.

```text
Internal Product
        ↓
Regulatory Exposure Class
        ↓
Template Row / Column
```

Risk:

```text
correct balance
+
wrong classification
=
wrong regulatory return
```

Classification rules matter as much as arithmetic.

---

# 26. Reporting Adjustments

Manual / controlled adjustments may exist.

Every adjustment should retain:

```text
amount
reason
owner
approver
date
reporting period
supporting evidence
reversal / permanence
```

### Trap

```text
Manual adjustment
≠ uncontrolled spreadsheet correction
```

---

# 27. Reporting Evidence Pack

A defensible cycle should preserve:

```text
source extracts
control results
reconciliations
exceptions
adjustments
approvals
final output
submission evidence
```

Think:

```text
Can another person prove
what happened this cycle
without asking the project team?
```

---

# 28. Credit-Risk Systems — Logical Architecture

```text
CUSTOMER / KYC
        ↓
ORIGINATION / LENDING
        ↓
SERVICING / TRANSACTIONS
        ↓
COLLATERAL / LIMITS
        ↓
RATING / MODEL PLATFORM
        ↓
RISK DATA WAREHOUSE / LAKE
        ↓
CALCULATION ENGINES
PD / LGD / EAD / ECL / RWA
        ↓
FINANCE / RISK MART
        ↓
MI / REGULATORY REPORTING
```

Not every bank uses the same technology.

The logical responsibilities remain similar.

---

# 29. Current State vs Target State

| Current State | Target State |
|---|---|
| How process truly works today | Agreed future design |
| Includes workarounds | Removes / controls weaknesses |
| Real systems + manual steps | Intended strategic architecture |
| Existing ownership | Future ownership |

```text
Current state
+
Gap
=
Change scope
→ Target state
```

---

# 30. The BA's Core Role

> **The Credit Risk BA preserves approved meaning from decision to production.**

```text
REGULATION / POLICY / METHODOLOGY
              ↓
             BA
              ↓
REQUIREMENTS / DATA / RULES / TEST EVIDENCE
              ↓
TECHNOLOGY / VENDOR / REPORTING / BAU
```

The BA is the:

```text
semantic integrator
+
traceability owner
+
delivery evidence coordinator
```

---

# 31. What the BA Owns vs Does Not Own

| BA owns / drives | BA does not independently own |
|---|---|
| Requirement clarity | Regulatory policy decision |
| Current / target-state understanding | Credit approval judgement |
| Data requirement | Model validation conclusion |
| Mapping specification | Accounting-policy sign-off |
| Traceability | Technology coding |
| Test coverage / coordination | Independent audit opinion |
| Defect clarity | Final risk ownership |
| Stakeholder sign-off process | Every stakeholder decision |

### Permanent rule

```text
BA owns translation
≠
BA owns the underlying risk judgement
```

---

# 32. Rule → Requirement → Build → Proof

```text
1. REGULATION / POLICY
What must happen?
        ↓
2. INTERPRETATION
What does it mean for this bank?
        ↓
3. METHODOLOGY
Which approved rule will be used?
        ↓
4. BUSINESS REQUIREMENT
What must system/process do?
        ↓
5. FUNCTIONAL / DATA SPEC
How must behaviour/data work?
        ↓
6. BUILD
Technology implements
        ↓
7. TEST
Prove requirement
        ↓
8. SIGN-OFF
Accountable owner accepts
```

This is the core BA delivery chain.

---

# 33. Requirement Quality — Five Tests

A good requirement is:

```text
Unambiguous
Buildable
Testable
Traceable
Approved
```

Bad:

```text
System should calculate RWA correctly.
```

Good requirement structure:

```text
Population
+
Input
+
Rule
+
Precedence
+
Output
+
Exception
+
Control
+
Acceptance result
```

---

# 34. Business Rule Precedence

Rules can conflict.

Example structure:

```text
1. Default?
   → Stage 3

2. Else SICR?
   → Stage 2

3. Else
   → Stage 1
```

Without precedence:

```text
two valid rules
→ two different answers
```

So every ruleset needs:

```text
priority
```

---

# 35. Null / Missing-Data Rules

Never leave:

```text
null
```

as an accidental technical outcome.

Define:

```text
reject?
default value?
fallback source?
manual review?
conservative treatment?
exception queue?
```

Missing-data treatment is a **business rule**.

---

# 36. Core BA Artefacts — One Table

| Artefact | Purpose |
|---|---|
| BRD | Business problem, scope, rules, outcomes |
| FRD / Stories | Functional behaviour |
| Data Requirements | Required fields + meaning |
| STTM | Source → transformation → target |
| Process Flow | Business / system sequence |
| Data Lineage | End-to-end field path |
| Rule Table | Conditions + precedence + outputs |
| RTM | Requirement → build → test trace |
| Test Pack | Inputs + expected outputs |
| Defect Log | Gap + root cause + status |
| Decision Log | Governed decisions / assumptions |
| Sign-off Pack | Evidence of acceptance |
| Runbook | BAU operating procedure |

Names vary by bank.

The information cannot be missing.

---

# 37. Requirements Traceability Matrix — RTM

```text
Regulation / Driver
      ↓
Requirement
      ↓
Design / Story
      ↓
Code / Component
      ↓
Test Case
      ↓
Result
      ↓
Sign-off
```

RTM answers:

> **Did every approved requirement get built and proven?**

---

# 38. Testing — SIT vs UAT vs Regression

| Test | Core question |
|---|---|
| Unit | Does component work locally? |
| SIT | Do systems / interfaces work together? |
| UAT | Does solution meet business requirement? |
| Regression | Did change break something that used to work? |
| Reconciliation Testing | Do outputs tie to expected sources / totals? |
| Parallel Run | Does new solution behave correctly beside old? |

### Permanent rule

```text
Successful file load
≠
successful business outcome
```

---

# 39. UAT — What Good Looks Like

A UAT case needs:

```text
Requirement
Population
Input
Precondition
Expected result
Actual result
Pass / Fail
Evidence
Tester
```

Strong UAT tests:

```text
happy path
boundary
exception
missing data
rule precedence
historical date
duplicate
reconciliation
```

---

# 40. Predefined Expected Results

Do not test by asking:

```text
Does this output look reasonable?
```

Test against:

```text
known input
+
approved rule
=
predefined expected result
```

Then compare:

```text
Expected vs Actual
```

Difference:

```text
→ defect or requirement issue
```

---

# 41. Defect vs Requirement Gap vs Data Issue

| Type | Meaning |
|---|---|
| Defect | Built behaviour differs from approved requirement |
| Requirement Gap | Requirement itself was incomplete / wrong |
| Data Issue | Input is missing / inaccurate / late |
| Environment Issue | Test platform / feed failure |
| Expected Behaviour | Result is correct but misunderstood |

Correct classification saves time.

---

# 42. Defect Lifecycle

```text
Log
→ Triage
→ Severity
→ Owner
→ Fix
→ Retest
→ Regression
→ Close
```

Defect record:

```text
expected
actual
evidence
impact
root cause
```

not:

```text
“number wrong”
```

---

# 43. SQL — The BA's Investigation Tool

The BA uses SQL to answer:

```text
Is population complete?
Which rows duplicated?
Where did value change?
Which rule fired?
Why do source and report differ?
```

Core SQL thinking:

```text
SELECT
FROM
JOIN
WHERE
GROUP BY
CASE
COUNT
SUM
DISTINCT
```

The goal is not developer-level SQL.

The goal is:

> **independent evidence-based investigation.**

---

# 44. SQL Diagnostic Pattern

```text
1. Count rows
2. Count distinct business keys
3. Sum exposure
4. Check null CDEs
5. Compare source vs target
6. Segment exceptions
7. Trace one record end to end
```

This pattern solves a large share of BA data investigations.

---

# 45. Change Delivery — Real Bank Hybrid

Real regulatory / risk change often behaves like:

```text
WATERFALL-LIKE GOVERNANCE
Interpretation
Scope
Methodology
Sign-off
Deadline
        ↓
AGILE BUILD
Stories
Sprints
Build
SIT
        ↓
CONTROLLED RELEASE
UAT
Approval
Go-live
Hypercare
BAU
```

Think:

```text
Water-Scrum-Fall
```

as a practical description.

Not a regulatory methodology.

---

# 46. Change vs BAU

| Change | BAU / Run |
|---|---|
| Builds new solution | Operates live process |
| Temporary programme | Permanent operation |
| Project funding | Operational ownership |
| Creates controls | Executes controls |
| Delivers runbook | Uses runbook |
| Hypercare | Normal cycle |

### Key test

```text
Can BAU run the process
without the project team?
```

If no:

```text
delivery is not finished
```

---

# 47. Release Readiness

Before go-live confirm:

```text
Requirements signed
Build complete
SIT passed
UAT passed
Critical defects closed / accepted
Reconciliations passed
Controls ready
User access ready
Runbook ready
BAU trained
Rollback / contingency understood
Approvals complete
```

```text
Built ≠ Delivered
```

---

# 48. Hypercare

Immediately after go-live:

```text
Higher monitoring
Faster defect triage
Daily / frequent reconciliation
Business support
Stabilisation
```

Exit when:

```text
process stable
+
BAU controls work
+
ownership transferred
```

---

# 49. Stakeholder Map

```text
Credit Risk
→ methodology / risk meaning

Finance / Accounting
→ ECL / ledger / financial reporting

Regulatory Reporting
→ return interpretation / submission

Treasury
→ liquidity / funding / FTP where relevant

Model Development
→ model methodology

Model Validation
→ independent challenge

Technology / Data
→ systems / pipelines / calculation

Architecture
→ target-state fit

QA / UAT
→ test execution

BAU
→ operational ownership

BA
→ translation + traceability across all
```

---

# 50. Decision Rights

Every ambiguous point needs an accountable owner.

Examples:

```text
What counts as default?
→ Credit Risk / approved policy owner

How is ECL accounted?
→ Finance / Accounting Policy

Is model valid?
→ Independent Validation

How is system built?
→ Technology

What does requirement mean?
→ BA coordinates + accountable business owner signs
```

### Permanent rule

```text
Stakeholder consulted
≠
stakeholder accountable
```

---

# 51. The End-to-End Proof Chain

```text
RULE
PRA / Basel / IFRS / Bank Policy
        ↓
INTERPRETATION
approved meaning
        ↓
REQUIREMENT
testable behaviour
        ↓
DATA
source + grain + date
        ↓
MAPPING
transformation + exception
        ↓
BUILD
system behaviour
        ↓
TEST
expected = actual
        ↓
CONTROL
DQ + reconciliation
        ↓
OUTPUT
ECL / RWA / MI / return
        ↓
SIGN-OFF
accountable approval
        ↓
BAU
repeatable operation
```

> **This chain is the profession.**

---

# 52. Full Credit-Risk Data Spine

```text
CUSTOMER / OBLIGOR
        ↓
ACCOUNT / FACILITY
        ↓
BALANCE / LIMIT / COLLATERAL
        ↓
BEHAVIOUR / FINANCIALS
        ↓
RATING / DEFAULT / WATCHLIST
        ↓
PD / LGD / EAD
        ↓
STAGE / ECL
        ↓
EXPOSURE CLASS / RWA
        ↓
ICAAP / STRESS / MI
        ↓
COREP / FINREP / PRA / PILLAR 3
```

For every layer:

```text
Source
Grain
Date
Rule
Control
Owner
```

---

# 53. Final “Never Confuse” Board

| Never confuse | Correct distinction |
|---|---|
| Field name vs definition | Label ≠ governed meaning |
| Latest vs effective value | Current record ≠ reporting-date record |
| Architecture vs lineage | Components ≠ data journey |
| Lineage vs mapping | End-to-end path ≠ field-level specification |
| Mapping vs requirement | How data moves ≠ why behaviour is required |
| CDE vs any field | Material governed element ≠ ordinary attribute |
| DQ check vs reconciliation | Field quality test ≠ agreement between views |
| Record count vs control total | Row completeness ≠ value completeness |
| COREP vs FINREP | Prudential ≠ financial reporting |
| Correct total vs correct data | Aggregate can hide duplication / omissions |
| BRD vs solution | Requirement ≠ implemented system |
| SIT vs UAT | Technical integration ≠ business acceptance |
| Defect vs data issue | Wrong build ≠ wrong input |
| BA vs policy owner | Translation ≠ accountable judgement |
| BA vs data engineer | Specification / analysis ≠ pipeline coding |
| Agile vs no governance | Iterative build ≠ absence of controls |
| Go-live vs completion | Release ≠ stable BAU |
| Vendor system vs bank accountability | Outsourcing technology ≠ outsourcing responsibility |

---

# 54. Final Recall — 60 Seconds

```text
WHY?
BCBS 239
→ risk data must be accurate, complete,
timely, adaptable and well governed
        ↓
WHAT DATA?
Customer → Facility → Exposure
→ Rating → PD/LGD/EAD
→ ECL/RWA
        ↓
HOW TO TRUST IT?
Source
Grain
Date
Rule
Control
        ↓
HOW DOES IT MOVE?
Architecture
→ Lineage
→ Mapping
→ Calculation
        ↓
HOW IS QUALITY PROVEN?
DQ Rules
+
Reconciliations
        ↓
WHERE DOES IT END?
MI / COREP / FINREP / PRA / Pillar 3
        ↓
HOW DOES CHANGE HAPPEN?
Rule
→ Interpretation
→ BRD
→ Data Spec
→ Build
→ SIT
→ UAT
→ Sign-off
→ Release
→ BAU
        ↓
WHAT DOES THE BA DO?
Preserve approved meaning
from rule to production evidence
```

> **One sentence to retain:**  
> **Credit-risk data and change management is the discipline of turning an approved risk, accounting or regulatory meaning into traceable source data, controlled transformations, reproducible calculations, reconciled reporting, testable requirements and signed production evidence — so every important number can be explained from source to regulator and operated reliably by BAU.**
