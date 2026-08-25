# 10 — Credit Risk Business Analyst — End-to-End Change Lifecycle Master Note

> **Mental model:** The Credit Risk BA does not own every specialist decision.
>
> The BA keeps the **approved meaning intact** as it moves through the bank:
>
> ```text
> Regulation / Policy / Risk Decision
>             ↓
>       Business Requirement
>             ↓
>          Data Meaning
>             ↓
>       System Behaviour
>             ↓
>           Testing
>             ↓
>          Evidence
>             ↓
>          Sign-off
>             ↓
>         Production
>             ↓
>        BAU Operation
> ```
>
> **Permanent idea:**
>
> ```text
> BA output ≠ document
>
> BA output =
> traceable + buildable + testable + approved change
> ```

---

# 1. Why This Note Comes After the Credit-Risk Domain Notes

The earlier notes built the risk machine itself:

```text
Retail / SME / Corporate credit
        ↓
PD / LGD / EAD
        ↓
IFRS 9 / ECL
        ↓
Basel / RWA / Capital
        ↓
Stress / Liquidity
        ↓
Model Risk / Validation / Governance
```

Now the question changes.

Not:

> **What does the credit-risk concept mean?**

But:

> **How does a bank safely change a real system that calculates, stores, uses or reports that concept?**

That is the Credit Risk BA world.

---

# 2. The BA's Core Job

A credit-risk change usually crosses multiple specialist teams.

Example:

```text
Credit Risk
says watchlist deterioration must be considered in SICR

Finance
needs the accounting outcome to be correct

Data Engineering
must source the right field

Technology
must implement the rule

Model / Methodology Governance
must classify and govern the change

QA / UAT
must prove the result

Reporting
must receive the correct downstream population
```

The BA connects those meanings.

Think:

```text
Specialists decide
        ↓
BA clarifies + structures + traces
        ↓
Technology builds
        ↓
Business proves
```

---

# 3. What the BA Owns

The BA commonly owns or drives:

- business analysis
- requirements elicitation
- current-state understanding
- target-state definition
- business-rule clarification
- data requirements
- source-to-target mapping
- stakeholder decisions
- dependency coordination
- acceptance criteria
- test planning support
- UAT coordination
- result validation
- defect clarification
- traceability
- sign-off coordination
- BAU handover evidence

The Luxoft role behind this learning path explicitly expects the BA to own the target-state business solution, document detailed BRDs, analyse new data sourcing for ETL, document mapping specifications, resolve data-quality issues, validate downstream extracts, challenge architecture for business fitness, coordinate dependencies/releases, plan testing, review UAT coverage and drive defects to resolution.

---

# 4. What the BA Does **Not** Own

The BA does not replace the specialist control owner.

Do not collapse these roles:

```text
Credit Risk
→ owns / approves risk treatment and risk policy

Finance / Accounting Policy
→ owns accounting interpretation and financial outcome

Model Development
→ owns model development methodology

Model Validation
→ independently challenges the model

Technology
→ owns technical engineering design / implementation

Regulatory Reporting
→ owns controlled regulatory submission processes

Internal Audit
→ provides independent assurance

BA
→ preserves meaning and evidence across all of them
```

A BA should not invent a policy threshold because a workshop is running late.

A BA should identify:

```text
Who is the accountable decision owner?
```

and get the decision recorded.

---

# 5. The Best One-Line Definition

> **A Credit Risk BA is the semantic integrator and evidence coordinator between Risk, Finance, Models, Data, Technology, Reporting and business users.**

Semantic integrator means:

> making sure the same term means the same thing everywhere it is used.

Evidence coordinator means:

> making sure the final production behaviour can be traced back to the approved decision.

---

# 6. Why Credit-Risk BA Work Is Harder Than Generic BA Work

In an ordinary system:

```text
wrong field label
→ inconvenient
```

In credit risk:

```text
wrong field meaning
→ wrong PD
→ wrong ECL
→ wrong RWA
→ wrong capital / reporting
```

or:

```text
wrong staging rule
→ wrong Stage 1 / 2 / 3 population
→ wrong lifetime-vs-12-month ECL horizon
→ wrong provision
```

So small semantic errors can become material financial or regulatory errors.

---

# 7. The BA Sits Between People, Not Only Systems

Typical interaction map:

```text
                   Credit Risk
                       ↕
Model Development ↔  BA  ↔ Finance
                       ↕
Model Validation  ↔  BA  ↔ Regulatory Reporting
                       ↕
Data Engineering ↔  BA  ↔ Technology / Architecture
                       ↕
Vendor Platform  ↔  BA  ↔ QA / UAT / BAU
```

The BA therefore needs enough domain knowledge to understand the specialists without pretending to replace them.

---

# 8. Stakeholder 1 — Credit Risk

Credit Risk may own:

- credit policy
- risk appetite framework
- rating methodology
- portfolio monitoring
- watchlist treatment
- default interpretation
- risk-limit rules
- model-use decisions

BA questions:

```text
What exactly is the approved rule?
Which portfolios does it apply to?
What takes precedence?
What are the exceptions?
Who signs the interpretation?
```

---

# 9. Stakeholder 2 — Finance / Accounting

Finance may own:

- accounting policy
- IFRS 9 financial outcome
- ledger reconciliation
- period-end controls
- financial reporting

BA questions:

```text
What accounting output must change?
What must reconcile?
What is the reporting-date cut-off?
Who signs the financial impact?
```

Example:

```text
Stage 2 population ↑
        ↓
lifetime ECL population ↑
        ↓
provision may ↑
```

Finance therefore cares about both rule correctness and financial movement.

---

# 10. Stakeholder 3 — Model Development

Model Development may own:

```text
PD model
LGD model
EAD / CCF model
IFRS 9 term structures
stress models
```

BA questions:

```text
Which model?
Which version?
Which population?
Which observation date?
Which intended use?
Which fallback rule?
```

Remember from Note 09:

```text
Model approved
≠
approved for every use
```

---

# 11. Stakeholder 4 — Model Validation / Model Risk

Independent challenge may ask:

- is the methodology conceptually sound?
- is the data suitable?
- is implementation faithful to approved design?
- is performance acceptable?
- is the model used within its approved scope?

BA role:

```text
provide traceable requirements
+
implementation evidence
+
impact analysis
+
test results
+
closure evidence
```

The BA does not mark the model “validated.”

---

# 12. Stakeholder 5 — Data Engineering

Data Engineering owns pipelines and transformations.

BA questions:

```text
Source?
Grain?
Business definition?
Effective date?
Transformation?
Null behaviour?
Reference data?
Late-arriving behaviour?
Duplicate behaviour?
```

This is where domain meaning becomes implementable data logic.

---

# 13. Stakeholder 6 — Architecture / Technology

Technology may propose a technically elegant design.

The BA still asks:

```text
Does this design achieve the signed business target state?
```

Important checks:

- correct business grain
- timing before reporting cut-off
- traceability
- reproducibility
- versioning
- failure handling
- recovery / retry
- interface dependencies
- downstream completeness

Technology owns engineering.

The BA challenges **business fitness**.

---

# 14. Stakeholder 7 — Regulatory Reporting

Reporting asks:

> What regulated output consumes this number?

Possible destinations include:

```text
COREP / prudential reporting
FINREP / financial reporting
internal risk reports
management information
Pillar 3 disclosures
```

BA questions:

```text
Which downstream population?
Which target field / template / calculation?
What aggregation grain?
What reconciliation?
What submission cut-off?
```

A correct upstream calculation can still become a wrong return if the downstream extract is incomplete or incorrectly mapped.

---

# 15. Stakeholder 8 — Vendor Team

A bank may use external platforms or models.

Examples in the wider credit-risk ecosystem include solutions for:

- origination
- credit scoring
- early warning
- impairment / IFRS 9
- portfolio analytics
- economic scenarios

BA questions:

```text
What is native functionality?
What is configurable?
What must happen upstream?
What version is deployed?
What input schema is required?
What limitations exist?
```

Permanent rule:

```text
Vendor solution
≠
outsourced bank accountability
```

---

# 16. Stakeholder 9 — QA / UAT / BAU Users

QA asks:

> Does the system behave as specified?

UAT asks:

> Does the solution produce the approved business outcome?

BAU asks:

> Can we operate this every day / month-end after the project leaves?

The BA must connect all three.

---

# 17. Current State vs Target State

Every change begins with two pictures.

## Current state — AS-IS

```text
How does the process actually work today?
```

Includes:

- systems
- files
- manual workarounds
- spreadsheets
- interfaces
- business rules
- actual users
- exception handling
- current controls

## Target state — TO-BE

```text
How should the process work after the change?
```

Includes:

- agreed rule
- data source
- target system behaviour
- control framework
- ownership
- evidence

The programme is the gap between the two.

---

# 18. The BA Must Discover the **Real** Current State

A documented current state may say:

```text
Watchlist status feeds the staging engine daily
```

Reality may be:

```text
watchlist exists
but
one portfolio sends a monthly spreadsheet
and
another portfolio is not mapped at all
```

Therefore:

```text
Documented AS-IS
≠
Observed AS-IS
```

Discovery needs evidence.

---

# 19. Gap Analysis

Gap analysis is not a list of target requirements.

It is:

```text
Current capability
vs
Required capability
        ↓
Specific gap
        ↓
Remediation
```

Example:

```text
Required
Active material watchlist must reach IFRS 9 staging

Current
Watchlist stored in Credit Monitoring but absent from staging input

Gap
No governed watchlist feed / field / effective-date logic

Remediation
Add source-to-target mapping + pipeline + rule + reason code + controls
```

---

# 20. One Anchor Change for the Whole Note

Use one realistic change so every BA activity connects.

## Problem

A UK bank's approved IFRS 9 staging approach considers qualitative deterioration.

An exposure can be on an approved watchlist even when:

```text
DPD = 0
```

But the current staging implementation does not receive the governed watchlist status correctly.

Result:

```text
Credit deterioration exists
        ↓
Qualitative signal missing downstream
        ↓
SICR rule cannot be evaluated correctly
        ↓
Potential wrong Stage 1 / Stage 2 result
```

---

# 21. Why This Is a Good BA Example

It crosses almost everything a Credit Risk BA does:

```text
policy interpretation
+
current-state discovery
+
data sourcing
+
mapping
+
business rules
+
architecture
+
model / methodology governance
+
testing
+
reconciliation
+
sign-off
+
release
+
BAU handover
```

So we will keep returning to it.

---

# 22. The End-to-End Change Lifecycle

Remember this chain:

```text
1. Interpret
2. Discover
3. Specify
4. Design / Build Liaison
5. SIT
6. UAT
7. Govern / Sign-off
8. Release
9. Hypercare / BAU Handover
```

This is not a pure waterfall sequence.

Several steps loop.

But the evidence chain still needs to close.

---

# 23. Phase 1 — Interpret

Question:

> **What does the bank actually intend the rule to mean?**

For the anchor example:

```text
Default / credit impairment
        → Stage 3 precedence

otherwise

Approved quantitative SICR
        → Stage 2

Approved qualitative SICR / watchlist
        → Stage 2

30-DPD rebuttable backstop
        → Stage 2 unless valid rebuttal

otherwise
        → Stage 1
```

The BA does not invent these rules.

The BA makes them explicit.

---

# 24. Methodology / Concept Note

Before detailed system requirements, the bank may have an approved methodology or concept paper.

It can state:

- business / regulatory principle
- chosen bank interpretation
- assumptions
- scope
- thresholds
- qualitative indicators
- rule precedence
- governance
- intended outputs

BA job:

```text
Methodology meaning
        ↓
Buildable requirements
```

---

# 25. Phase 2 — Discover

Question:

> **What exists today?**

The BA investigates:

- process
- systems
- data
- files
- rules
- interfaces
- manual steps
- controls
- known defects
- downstream consumers

For the anchor change:

```text
Where is watchlist_status created?
Who owns it?
At what grain?
Is it effective-dated?
How often is it sent?
Does staging receive it?
Does history exist?
```

---

# 26. Discovery Without Data Is Weak

Stakeholder says:

> “The watchlist feed is fine.”

BA evidence may show:

```text
Current Stage 1 facilities
with
active material watchlist
=
1,240
```

That creates a testable current-state population.

Good BA analysis combines:

```text
Stakeholder explanation
+
process evidence
+
data evidence
```

---

# 27. Phase 3 — Specify

Now convert the approved target into precise requirements.

Core questions:

```text
WHAT must happen?
WHEN?
TO WHICH population?
USING WHICH data?
AT WHICH grain?
WITH WHICH precedence?
WHAT happens when data is missing?
WHAT output is retained?
HOW is success proved?
```

---

# 28. Business Requirement vs Functional Behaviour

## Business requirement

```text
The staging process shall incorporate approved qualitative SICR indicators.
```

Necessary.

But not enough to build.

## Functional behaviour

```text
For each in-scope facility at reporting date:
use the active approved watchlist status;
apply qualitative SICR after Stage-3 precedence;
retain reason code QUAL_SICR;
route missing authoritative status according to approved DQ treatment.
```

Now Technology and QA can work with it.

---

# 29. Requirement Quality Test

A requirement is weak if two reasonable developers can implement it differently.

Bad:

> “System should handle watchlist correctly.”

Good:

```text
IF credit_impaired_flag = Y
    → Stage 3
ELSE IF quantitative_sicr_flag = Y
    → Stage 2 / PD_SICR
ELSE IF approved_active_watchlist_flag = Y
    → Stage 2 / QUAL_SICR
ELSE IF dpd >= 30 AND valid_rebuttal_flag = N
    → Stage 2 / 30DPD_BACKSTOP
ELSE
    → Stage 1 / NO_SICR
```

Exact bank rules may differ.

The learning principle is **explicit precedence**.

---

# 30. Business Rules Need Precedence

Suppose:

```text
default_flag = Y
watchlist_flag = Y
DPD = 45
```

Possible naïve outputs:

```text
Stage 2 because watchlist
Stage 2 because 30 DPD
Stage 3 because default
```

Only one can be the governed final result.

Therefore rule tables must show:

```text
priority
condition
outcome
reason code
exception
owner
```

---

# 31. Data Requirement — Source

A field is not fully defined by its name.

Example:

```text
watchlist_flag
```

BA must define:

```text
Authoritative source
Credit Monitoring System

Source field
watchlist_status

Owner
Credit Risk / Portfolio Monitoring
```

A downstream warehouse copy is not automatically the golden source.

---

# 32. Data Requirement — Grain

**Grain = what one row represents.**

Possible grains:

```text
one row per customer
one row per obligor
one row per facility
one row per account
one row per exposure
one row per facility per reporting date
```

Wrong grain creates subtle errors.

Example:

Customer Northstar has:

```text
Facility A → Stage 1
Facility B → Stage 2
```

If data is aggregated too early to customer level:

```text
£1.5m total exposure
```

may look correct while staging treatment is wrong.

---

# 33. Data Requirement — Effective Date

Risk data changes through time.

Example:

```text
Watchlist active       01 Jul
Watchlist removed      18 Aug
Reporting date         31 Jul
```

For July reporting:

```text
active at 31 Jul
→ Y
```

For August reporting:

```text
active at 31 Aug
→ N
```

Using the latest-loaded record instead of the record valid at the reporting date can rewrite history incorrectly.

---

# 34. Data Requirement — Null ≠ Zero / False

Suppose:

```text
watchlist_flag = NULL
```

This may mean:

```text
feed missing
customer not matched
field not supplied
```

It does **not automatically mean**:

```text
not on watchlist
```

Same principle:

```text
PD NULL ≠ PD 0%
LGD NULL ≠ LGD 0%
EAD NULL ≠ EAD £0
```

Null treatment is a business requirement.

---

# 35. Source-to-Target Mapping — Preview

A mapping should answer more than:

```text
source column → target column
```

A useful row contains:

| Item | Anchor Example |
|---|---|
| Target | `sicr_qualitative_flag` |
| Source | `credit_monitor.watchlist_status` |
| Grain | facility / reporting date |
| Rule | active approved material status → `Y` |
| Effective date | valid at reporting date |
| Null treatment | DQ exception / approved fallback |
| Owner | Credit Risk Data Owner |

Later Series 2 notes will go much deeper into mappings and lineage.

---

# 36. Data Lineage — Preview

For the anchor signal:

```text
SOURCE
Credit Monitoring
watchlist_status
        ↓
TRANSFORM
Risk Warehouse
active-at-reporting-date logic
        ↓
RULE
Staging Service
QUAL_SICR precedence
        ↓
CALCULATION
Impairment Engine
Stage determines ECL horizon
        ↓
CONSUMER
Finance / Reporting
Stage + ECL + reason code
```

Lineage answers:

> **Where did the value come from, what happened to it, and where did it go?**

---

# 37. BCBS 239 Connection

BCBS 239 is not a staging rule.

It is relevant because the bank must be able to aggregate and report risk data accurately, completely, timely and with strong governance.

For a BA, practical BCBS 239 thinking means:

```text
authoritative source
+
controlled transformation
+
clear ownership
+
reconciliation
+
traceability
+
reproducible reporting
```

So lineage is not decorative documentation.

It is part of risk-data control.

---

# 38. Phase 4 — Design / Build Liaison

Once requirements are approved, implementation begins.

The BA does not disappear.

Typical developer questions:

```text
What if watchlist and default are both true?
What if feed arrives after cut-off?
Can one facility have two active statuses?
Which timestamp controls effective status?
Should missing status fail the load?
What reason code should be stored?
```

Every answer must preserve the approved requirement.

---

# 39. Decision Log

Some questions are genuinely not defined yet.

Do not bury the answer in meeting memory.

Record:

- question
- options
- accountable owner
- decision
- rationale
- date
- impacted requirements

Example:

```text
Question
Which watchlist snapshot is authoritative for month-end?

Decision
Status effective at 23:59 UK time on reporting date

Owner
Credit Risk Methodology
```

Now build and testing have one reference.

---

# 40. Scope Change vs Clarification

Developer asks:

> “Can we also add covenant breach as a new SICR indicator?”

Two possibilities:

## Clarification

Covenant breach was already part of approved qualitative SICR methodology but omitted from detailed requirement.

## Scope change

Covenant breach was not approved as part of this release.

The BA must identify which one it is.

Otherwise scope silently expands.

---

# 41. Interface Dependency

A risk change rarely lives in one application.

Example:

```text
Credit Monitoring
        ↓
Risk Warehouse
        ↓
Staging Service
        ↓
Impairment Platform
        ↓
Finance Extract
        ↓
Reporting
```

If the staging service goes live before the new watchlist feed:

```text
code exists
but
required data does not
```

So dependency order matters.

---

# 42. ETL — What the BA Needs to Understand

ETL:

```text
Extract
→ Transform
→ Load
```

The BA does not need to be the data engineer.

But must understand the business transformation.

Example:

```text
EXTRACT
all watchlist records

TRANSFORM
select approved status valid at reporting date
map status codes
resolve duplicates
apply DQ rules

LOAD
one governed record per facility / reporting date
```

---

# 43. Architecture Fitness

A design can “work” technically but fail business purpose.

BA challenge questions:

```text
Can we reproduce July's result in October?
Which model / rule version was used?
Can duplicate files double-count exposures?
Can a late feed overwrite the reporting snapshot?
Can downstream systems trace reason code?
What happens on retry?
What happens if half the file loads?
```

This is what “fit for business purpose” means in practice.

---

# 44. Phase 5 — SIT

**SIT — System Integration Testing**

Question:

> Do the connected technical components work together correctly?

Typical checks:

- file arrives
- schema correct
- interface loads
- key joins work
- transformations work
- duplicates controlled
- effective dates correct
- rule engine executes
- target output produced

SIT is necessary.

But it does not replace UAT.

---

# 45. Phase 6 — UAT

**UAT — User Acceptance Testing**

Question:

> Does the solution produce the approved business outcome?

For the anchor change:

```text
Input
Active material watchlist
0 DPD
not defaulted
no stronger rule

Expected
Stage 2
Reason = QUAL_SICR
ECL horizon = lifetime
```

UAT proves business meaning.

---

# 46. Expected Results Must Exist **Before** Test Execution

Bad testing:

```text
Run system
        ↓
See output
        ↓
Decide whether it looks reasonable
```

Good testing:

```text
Approved rule
        ↓
Define expected result
        ↓
Run system
        ↓
Compare actual vs expected
```

Otherwise the team can rationalise whatever the system produced.

---

# 47. Minimum Anchor UAT Pack

| Case | Input | Expected |
|---|---|---|
| Clean | 0 DPD, no SICR, no default | Stage 1 |
| Quantitative SICR | PD deterioration trigger | Stage 2 / `PD_SICR` |
| Qualitative SICR | active material watchlist | Stage 2 / `QUAL_SICR` |
| 30-DPD backstop | 31 DPD, no valid rebuttal | Stage 2 / `30DPD_BACKSTOP` |
| Rebuttal | 31 DPD + approved rebuttal + no other SICR | outcome per remaining rules |
| Default | default / credit-impaired | Stage 3 |
| Missing feed | required status unavailable | approved DQ / exception treatment |

The exact bank policy determines the real implementation.

---

# 48. Boundary Testing

Many defects live at boundaries.

Test:

```text
29 DPD
30 DPD
31 DPD
```

Test effective dates:

```text
status starts tomorrow
status ends today
status starts exactly at cut-off
```

Test values:

```text
NULL
invalid code
duplicate active rows
future-dated record
```

Happy-path-only UAT is weak.

---

# 49. Reconciliation

Testing a rule is not enough.

You also need to prove the population and amounts survived the pipeline.

Example:

```text
Source watchlist population
1,240 facilities

Staging input
1,240 facilities

Stage-2 QUAL_SICR output
1,240 facilities
subject to documented exclusions / precedence
```

If:

```text
source = 1,240
target = 1,217
```

then 23 facilities require explanation.

---

# 50. Reconciliation Needs a Grain and Tolerance

Weak:

> “Totals should match.”

Strong:

```text
Source EAD vs staging-engine input
by
legal entity + portfolio + currency + reporting date

Tolerance
£0 except approved rounding

Population
all in-scope facilities after documented exclusions
```

Now a break is diagnosable.

---

# 51. Defect Triage

A failed test can be caused by different things.

```text
Requirement defect
→ target behaviour unclear / wrong

Data defect
→ input wrong / missing / stale

Mapping defect
→ wrong transformation

Code defect
→ implementation does not follow design

Environment defect
→ test setup / version issue

Test defect
→ expected result itself wrong
```

The BA helps classify the problem before the team “fixes” the wrong layer.

---

# 52. Defect Example

Expected:

```text
Active watchlist
→ Stage 2
```

Actual:

```text
Stage 1
```

Possible investigation:

```text
1. source status actually active?
2. correct facility matched?
3. effective date valid?
4. mapping produced Y?
5. rule input received Y?
6. precedence rule executed?
7. correct rule version deployed?
```

This is end-to-end diagnosis.

---

# 53. Requirements Traceability

The proof chain should look like:

```text
Policy / Decision
      ↓
Requirement
      ↓
Business Rule
      ↓
Data Mapping
      ↓
Build Story
      ↓
Test Case
      ↓
Evidence
      ↓
Result
      ↓
Sign-off
```

Example:

```text
SICR-017
→ STORY-421
→ staging_rule_service
→ UAT-09
→ evidence_09A
→ PASS
```

That is an RTM mindset.

---

# 54. Phase 7 — Governance / Sign-off

Different owners approve different things.

Example:

```text
Credit Risk
→ approved risk treatment

Finance
→ accounting impact / reconciliation

Model Risk / Validation
→ relevant model / methodology finding closure

Technology
→ technical readiness

Business / BAU
→ operational readiness
```

The BA coordinates evidence.

The BA is not the accountable signer for everything.

---

# 55. Open Risk at Go-Live

Sometimes not everything is perfect.

Example:

```text
One low-volume legacy portfolio
will remain on manual watchlist feed
for two reporting cycles
```

Then governance needs:

- known limitation
- quantified impact
- compensating control
- owner
- remediation date
- approval

Silent limitation = bad governance.

Explicitly accepted residual risk = controlled governance.

---

# 56. Phase 8 — Release

A production release needs more than “code ready.”

Need:

```text
approved version
cutover sequence
interface dependencies
data refresh timing
user readiness
support contacts
rollback / backout
monitoring
```

For the anchor change:

```text
watchlist feed
must be live
before
staging month-end cut-off
```

---

# 57. Rollback

Ask:

> If the release corrupts staging output, how do we recover?

Possible controls:

```text
revert rule version
reload previous feed
rerun calculation
restore previous configuration
switch to approved contingency process
```

A regulated change needs a known failure path.

---

# 58. Phase 9 — Hypercare

After go-live, monitor whether reality matches expectations.

Anchor metrics:

- Stage-2 migration count
- `QUAL_SICR` reason-code count
- missing watchlist rate
- unmatched facility count
- duplicate statuses
- feed timeliness
- ECL movement
- reconciliation breaks
- production incidents

A successful deployment can still fail in the first live cycle.

---

# 59. BAU Handover

A change is not finished when the project team understands it.

It is finished when BAU can operate it.

BAU needs:

- runbook
- ownership
- control checklist
- alert process
- incident route
- reconciliation procedure
- support contacts
- known limitations
- version / change history

Permanent test:

> **Can the process work when the people who built it are no longer in the room?**

---

# 60. Change vs BAU

## Change

```text
Build / modify capability
→ finite project
```

## BAU — Business as Usual

```text
Operate capability repeatedly
→ ongoing ownership
```

A weak project creates:

```text
working solution
+
no operating model
```

A strong project creates:

```text
working solution
+
controls
+
ownership
+
operating evidence
```

---

# 61. Waterfall vs Agile — The Real Bank Pattern

The Luxoft role expects experience with both waterfall and agile.

That makes sense because regulated-bank delivery is often hybrid.

Think:

```text
WATER
Regulatory interpretation
Scope / methodology
Target state
Formal approvals

SCRUM
Stories
Sprints
Build
Component testing
Demos
Iterative defect fixes

FALL
Formal UAT
Reconciliation
Governance
Release approval
Go-live
BAU handover
```

Often called informally:

```text
water-scrum-fall
```

---

# 62. Why Banks Cannot Be “Just Agile” About Everything

Some things need controlled baselines:

- regulatory interpretation
- model methodology
- financial accounting policy
- data definitions
- risk appetite decisions
- formal sign-offs
- regulatory deadlines

Engineering can iterate.

Accountability cannot be vague.

---

# 63. User Story Example

```text
As an impairment analyst,
I need the staging result to retain the qualitative SICR reason code,
so that Stage-2 movement can be explained and reconciled.
```

Acceptance criteria:

```text
Given
an in-scope facility with active approved material watchlist status
and no Stage-3 condition

When
month-end staging is executed

Then
Stage = 2
and
stage_reason = QUAL_SICR
and
the result is traceable to the source watchlist record
```

That is testable.

---

# 64. Prioritisation

A BA often coordinates competing changes.

Prioritisation may consider:

```text
regulatory deadline
financial / risk impact
business value
dependency
production risk
system performance
resource capacity
```

Not:

```text
who shouted loudest
```

---

# 65. A Simple Prioritisation Example

Three defects:

### A

```text
Stage reason label misspelled on internal dashboard
```

### B

```text
2% of active watchlist facilities missing from IFRS 9 staging feed
```

### C

```text
UAT screen loads slowly
```

All matter.

But B can alter accounting treatment.

Therefore:

```text
risk / financial impact
→ likely highest urgency
```

---

# 66. SQL in the BA Lifecycle

SQL is not separate from BA work.

It supports:

```text
current-state discovery
population analysis
data profiling
reconciliation
defect diagnosis
UAT evidence
movement analysis
```

Example questions:

```text
Which Stage-1 facilities have active watchlist?
Which ratings are stale?
Where did £50k EAD disappear?
Which customers duplicated after collateral join?
Which rows have no source match?
```

A later Series 2 note will go deep into the SQL patterns.

---

# 67. The BA's SQL Mindset

Do not start with:

> Which SQL function should I use?

Start with:

> What business question am I trying to prove?

Then:

```text
Business symptom
→ expected population / grain
→ query
→ evidence
→ diagnosis
→ owner
→ fix
→ retest
→ reconcile
→ closure
```

---

# 68. Data Visualisation in BA Work

Suppose Stage 2 increased by:

```text
+1,420 facilities
```

A single total is not enough.

Break by reason:

```text
PD deterioration       +720
Watchlist              +410
30-DPD backstop         +180
Covenant deterioration  +110
```

Now the business conclusion is:

> **Most of the movement is rating / model deterioration, with watchlist the second-largest contributor.**

Data analysis should end with a business conclusion.

---

# 69. Three Lines of Defence — Where the BA Fits

Simplified:

```text
1st Line
Business creates / manages risk

2nd Line
Independent Risk / Compliance challenge and oversight

3rd Line
Internal Audit assurance
```

The BA may work in a change programme supporting several lines.

But the BA does not collapse their independence.

Example:

```text
Model Development
cannot simply validate itself
because the project deadline is close
```

---

# 70. Front / Middle / Back Office ≠ Three Lines

Do not confuse the two taxonomies.

## Front / Middle / Back

Describes operating roles.

```text
Front
customer / revenue / origination

Middle
risk / control / analytics in many organisations

Back
operations / processing / settlement / accounting operations
```

## Three lines

Describes risk accountability / assurance.

They overlap.

They are not synonyms.

---

# 71. RACI Thinking

For each material activity, identify:

```text
R — Responsible
A — Accountable
C — Consulted
I — Informed
```

Example:

| Activity | Likely Pattern |
|---|---|
| Define qualitative SICR treatment | Risk / Accounting Policy accountable |
| Document requirement | BA responsible |
| Build feed | Data Engineering responsible |
| Independent model challenge | Validation accountable / responsible |
| Accounting result sign-off | Finance accountable |
| UAT coordination | BA responsible; business users execute / approve |

Exact structures vary by bank.

The principle is clear ownership.

---

# 72. Good Stakeholder Management

Stakeholder management is not:

```text
book meetings
send minutes
chase people
```

It is:

```text
surface ambiguity
identify decision owner
frame options
show impact
get decision
record rationale
trace implementation
```

Example:

```text
Finance wants strict month-end snapshot
Risk wants intraday update
Technology says both are possible but costly
```

BA job:

> turn the disagreement into an explicit decision with impact, not average the three opinions.

---

# 73. The Questions That Prevent Expensive Defects

Before a critical risk field is accepted, ask:

1. **What exactly does it mean?**
2. **Who owns that meaning?**
3. **What is the authoritative source?**
4. **What is the grain?**
5. **What date / version applies?**
6. **How is it transformed?**
7. **What if it is missing?**
8. **Which rule consumes it?**
9. **Which output does it move?**
10. **How will we prove it?**

Those ten questions catch a huge amount of risk-data ambiguity.

---

# 74. One Full Anchor Scenario — Start to Finish

## Business Problem

```text
Approved watchlist deterioration
is not consistently reaching IFRS 9 staging
```

## Risk

```text
affected facilities may remain Stage 1
when qualitative SICR should be evaluated
```

## Target

```text
governed watchlist feed
+
reporting-date logic
+
explicit rule precedence
+
reason code
+
reconciliation
+
UAT
+
sign-off
```

---

# 75. Anchor — Step 1: Interpretation

Credit Risk / Accounting Policy agree:

```text
Stage 3 condition first
        ↓
quantitative SICR
        ↓
qualitative SICR
        ↓
30-DPD backstop
        ↓
Stage 1 if no trigger
```

BA captures decision and scope.

---

# 76. Anchor — Step 2: Discovery

BA finds:

```text
Credit Monitoring
contains valid watchlist history
```

but:

```text
staging input schema
has no governed qualitative-SICR field
```

SQL identifies:

```text
Stage 1
+
active material watchlist
```

population.

Gap is now evidenced.

---

# 77. Anchor — Step 3: Specification

Required fields:

```text
facility_id
reporting_date
watchlist_status
watchlist_effective_from
watchlist_effective_to
quantitative_sicr_flag
days_past_due
default_flag
rebuttal_flag
```

Output:

```text
ifrs9_stage
stage_reason
```

---

# 78. Anchor — Step 4: Mapping

```text
Credit Monitoring
watchlist_status = ACTIVE
and
valid at reporting date
        ↓
sicr_qualitative_flag = Y
```

Need:

```text
grain
keys
effective dating
null rule
duplicate rule
owner
```

---

# 79. Anchor — Step 5: Build

Engineering adds:

- feed
- transformation
- target field
- rule logic
- reason code
- logging

BA answers questions and keeps decisions traceable.

---

# 80. Anchor — Step 6: SIT

Prove:

```text
source record received
→ correct facility matched
→ correct effective record selected
→ transformation correct
→ target flag correct
→ rule executed
```

---

# 81. Anchor — Step 7: UAT

Representative case:

```text
facility F1007
DPD = 0
Default = N
Quantitative SICR = N
Active approved watchlist = Y
```

Expected:

```text
Stage 2
Reason QUAL_SICR
Lifetime ECL horizon
```

Actual must equal expected.

---

# 82. Anchor — Step 8: Reconcile

Compare:

```text
source active watchlist population
vs
staging input qualitative flag population
vs
Stage-2 QUAL_SICR output
```

Explain differences caused by:

- Stage-3 precedence
- quantitative SICR precedence
- approved exclusions
- valid rebuttal / policy logic if applicable

Unexplained difference = defect.

---

# 83. Anchor — Step 9: Sign-off

Possible approval chain:

```text
Risk
→ treatment correct

Finance
→ accounting impact understood / reconciled

Validation / Model Risk
→ applicable finding / governance complete

Technology
→ production ready

BAU
→ operationally ready
```

---

# 84. Anchor — Step 10: Release + Hypercare

Release order:

```text
source / feed
→ warehouse mapping
→ staging logic
→ impairment / reporting extract
```

Hypercare checks:

```text
feed completeness
QUAL_SICR counts
Stage movement
ECL movement
unmatched facilities
reconciliation breaks
```

Then hand to BAU.

---

# 85. What a Strong BA Says About the Anchor Change

Weak:

> “I created a BRD, mapping and UAT document.”

Strong:

> **“I took the approved qualitative-SICR treatment from methodology through source analysis, field-level mapping, rule precedence, build clarification, predefined UAT, population reconciliation and accountable sign-off, so the production staging result was traceable back to the original risk decision.”**

The second answer explains value.

---

# 86. Common BA Failure — Writing Before Understanding

Bad pattern:

```text
workshop
→ immediately write BRD
```

Better:

```text
business problem
→ current-state evidence
→ decision owner
→ target interpretation
→ then requirements
```

A beautifully formatted wrong requirement is still wrong.

---

# 87. Common BA Failure — Field-Name Mapping

Bad:

```text
Source: PD
Target: PD
```

Questions missing:

```text
one-year or lifetime?
regulatory or IFRS 9?
PIT or TTC?
obligor or facility?
which model version?
which date?
pre- or post-override?
```

Same label can hide different business meanings.

---

# 88. Common BA Failure — Happy-Path Testing

Bad UAT:

```text
valid row
valid status
normal date
```

Need edge cases:

- null
- duplicate
- future date
- expired status
- conflicting rules
- missing source match
- late file
- partial load
- boundary threshold

Real production defects live there.

---

# 89. Common BA Failure — Treating UAT as QA

SIT asks:

> Did the integrated system work technically?

UAT asks:

> Did the business requirement produce the approved outcome?

They overlap.

They are not interchangeable.

---

# 90. Common BA Failure — “The File Loaded Successfully”

A file can load successfully while:

```text
50 facilities missing
EAD duplicated
currency mapping wrong
future rating selected
null PD converted to zero
```

Therefore downstream extract validation needs:

```text
counts
amounts
keys
grain
mandatory fields
reference values
effective dates
known exclusions
```

---

# 91. Common BA Failure — Silent Business Decisions by Technology

Developer asks:

> “If watchlist is missing, can I just set it to N?”

That is not merely technical.

It changes risk treatment.

Correct response:

```text
identify policy / data owner
→ get approved treatment
→ document it
→ implement it
```

---

# 92. Common BA Failure — No Reason Code

System outputs:

```text
Stage 2
```

But nobody knows why.

Better:

```text
Stage 2
Reason = QUAL_SICR
Rule Version = 2026.08
Run ID = 84291
```

Explainability improves:

- reconciliation
- UAT
- Finance analysis
- production support
- auditability

---

# 93. Common BA Failure — No Historical Reproducibility

Question six months later:

> Why was facility F1007 Stage 2 on 31 August?

Need to reconstruct:

```text
source status
reporting date
rule version
model version if relevant
input snapshot
output
reason code
```

If only today's latest data exists, historical explanation becomes difficult.

---

# 94. Common BA Failure — Project Finishes at Go-Live

Wrong:

```text
production deployment
→ project done
```

Better:

```text
production deployment
→ live monitoring
→ reconciled cycles
→ BAU ownership
→ stable handover
```

A release is an event.

An operating process is the outcome.

---

# 95. BA Artefact Chain — Overview Only

Series 2 will deepen each of these, but keep the master chain:

```text
Method / Concept Note
        ↓
Gap Analysis + SQL Evidence
        ↓
BRD / Functional Rules
        ↓
Source-to-Target Mapping
        ↓
Data Dictionary / Lineage
        ↓
Stories / Decision Log
        ↓
SIT / Reconciliation / Defects
        ↓
UAT / RTM
        ↓
Sign-off
        ↓
Release / Runbook
        ↓
BAU Handover
```

The documents are useful because they preserve the chain.

Not because documentation itself is the objective.

---

# 96. BA Skill Stack

A strong Credit Risk BA combines four layers.

## 1 — Domain

```text
Credit lifecycle
PD / LGD / EAD
IFRS 9
RWA / Capital
Model governance
Liquidity / Treasury where relevant
```

## 2 — Data

```text
SQL
grain
joins
effective dating
DQ
mapping
lineage
reconciliation
```

## 3 — Delivery

```text
requirements
stories
UAT
defects
dependencies
release
BAU handover
```

## 4 — Governance

```text
ownership
approval
traceability
controls
evidence
```

---

# 97. Fast Diagnostic — When You Join a Credit-Risk Change

Ask these in order:

1. **What problem are we changing?**
2. **What credit / accounting / regulatory concept is involved?**
3. **Who owns the interpretation?**
4. **What is the current state?**
5. **What evidence proves the gap?**
6. **What is the signed target state?**
7. **Which data elements are critical?**
8. **What is the source, grain and date for each?**
9. **What systems and interfaces are involved?**
10. **What business-rule precedence exists?**
11. **What happens on missing / bad data?**
12. **What is the predefined expected result?**
13. **What must reconcile?**
14. **Who signs each outcome?**
15. **What dependencies control go-live?**
16. **How will BAU operate it?**

If these are clear, the change is largely understandable.

---

# 98. One-Page Recall Sheet

## BA role

```text
Preserve approved meaning
from decision to production
```

## BA output

```text
Traceable
Buildable
Testable
Approved
Operational
```

## Core lifecycle

```text
Interpret
→ Discover
→ Specify
→ Build Liaison
→ SIT
→ UAT
→ Govern
→ Release
→ Hypercare
```

## Core data questions

```text
Source
Grain
Date
Rule
Control
```

## Core test questions

```text
Expected result?
Actual result?
Difference?
Root cause?
Evidence?
```

## Core governance questions

```text
Who decides?
Who approves?
What evidence?
What residual risk?
```

## Core handover question

```text
Can BAU run this without the project team?
```

---

# 99. Never Confuse

```text
BA ≠ policy owner

BA ≠ model validator

BA ≠ data engineer

BA ≠ project manager

BRD ≠ finished solution

Field name ≠ business definition

Architecture diagram ≠ data lineage

SIT ≠ UAT

Successful file load ≠ correct population

Go-live ≠ stable BAU

Vendor platform ≠ transferred bank accountability

Agile delivery ≠ absence of formal governance
```

---

# 100. The One Sentence to Retain

> **A Credit Risk Business Analyst takes an approved risk, accounting or regulatory decision and preserves its meaning all the way through requirements, data, system behaviour, testing, evidence, sign-off, release and BAU operation — so the bank can prove that what went live is exactly what the accountable owners intended.**

