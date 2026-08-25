# CREDIT RISK OS 2.0 — MASTER MASTERY MANUAL
## The Definitive Guide to Banking Operations, Credit Risk Analytics, Regulatory Change, Data Lineage, and Business Analysis Controls

---

## PART 0 — HOW TO USE THIS MANUAL

### What is Credit Risk OS 2.0?
Credit Risk OS 2.0 is an interactive, deterministic, simulated commercial banking environment and transformation workbench built specifically around the Indian banking system truth model (**Indus Apex Bank India**). It provides an operating environment where learners observe, investigate, and deliver complex banking transformations across Credit Risk Analytics, Income Recognition, Asset Classification and Provisioning (**IRACP**), Treasury Funds Transfer Pricing (**FTP**), RBI Basel III Capital Regulations, BCBS 239 Data Lineage, and Business Acceptance Testing (**UAT**).

### What Credit Risk OS 2.0 Is Not
- Credit Risk OS 2.0 is **not** a production banking software platform or live transactional core system.
- It does **not** provide official regulatory certifications, supervisory accreditations, or live bank employment validation.
- It is a **deterministic synthetic simulation platform** designed exclusively for work-based learning, domain mastery, and business analysis training.

### How to Read This Manual
This manual is designed as a progressive, continuous narrative. You do not need any prior banking, credit risk, regulatory, software engineering, or data analysis background. 

The manual starts from absolute zero—explaining what a bank is, why risk exists, and how regulators govern financial institutions—and systematically builds up to advanced regulatory capital calculations, multi-stage ETL data reconciliation, and release governance.

While reading, keep the **Credit Risk OS 2.0 application open** side-by-side. As each concept, metric, facility, or case is introduced, observe it live within the application's six interconnected workspaces.

### The 10-Step Learning Journey
Every transformation case in Credit Risk OS 2.0 follows a rigorous 10-step work lifecycle:

```
01. UNDERSTAND   → Grasp the business problem, regulatory driver, and financial impact.
02. OBSERVE      → Inspect executive indicators and whole-bank balance sheet metrics.
03. INVESTIGATE  → Query raw data extracts, identify data defects, and isolate root causes.
04. DECIDE       → Evaluate options with stakeholders and document regulatory decisions.
05. DEFINE       → Formulate business requirements (BRDs) and precise business rules.
06. MAP          → Construct Source-to-Target Data Mappings (STTM) with transformation logic.
07. TEST         → Execute boundary-value UAT test suites and document test passes/failures.
08. RECONCILE    → Verify population integrity, monetary balances, and zero net/gross breaks.
09. GOVERN       → Enforce sign-off gates with Steering Committee policy owners.
10. EXPLAIN      → Synthesize end-to-end lineage and defend changes to auditors and management.
```

---

## PART 1 — ENTERING THE BANKING WORLD FROM ZERO

### What is a Commercial Bank?
At its fundamental core, a commercial bank is a financial intermediary that takes money from people and institutions who have excess funds (**depositors**) and lends that money to people and businesses who need capital (**borrowers**).

```
   [ DEPOSITORS ]                           [ COMMERCIAL BANK ]                           [ BORROWERS ]
(Individuals & Companies)  ── Deposits @ 5.0% ──►  [ Indus Apex Bank ]  ── Loans @ 9.5% ──►  (Corporates & SMEs)
  Earns Interest Income                        Pays Deposit Interest                       Pays Loan Interest
                                                 Net Interest Margin (NIM) = 4.5%
```

### Assets vs Liabilities in Banking
In ordinary non-financial companies, cash is an asset, and debt is a liability. In banking, the accounting terminology often surprises beginners:

- **Bank Liabilities**: Deposits placed by customers are **liabilities** to the bank. The bank owes this money back to depositors on demand or at maturity.
- **Bank Assets**: Loans and credit facilities extended by the bank to borrowers are **assets** to the bank. The bank expects to receive interest income and principal repayments from borrowers.

| Balance Sheet Component | Description | Example at Indus Apex Bank |
| :--- | :--- | :--- |
| **Assets (Lending & Investments)** | Money owed to the bank by corporate and retail borrowers. | Corporate Loans, CRE Mortgages, SME Working Capital (₹38,500 Cr Total Assets) |
| **Liabilities (Deposits & Borrowings)** | Money the bank owes to depositors and wholesale funding markets. | Savings Accounts, Fixed Term Deposits, Interbank Borrowings (₹33,880 Cr) |
| **Capital (Equity & Reserves)** | Net worth belonging to shareholders; absorbs financial losses. | Common Equity Tier 1 (CET1) Capital (₹4,200 Cr) |

### Why a Bank Cannot Lend Unlimited Money
If a bank earns interest by making loans, why doesn't it lend out 100% of its deposits? 

1. **Liquidity Risk**: Depositors may demand their cash back at any time. If all funds are locked in 5-year loans, the bank will suffer a **liquidity crisis** or "bank run."
2. **Credit Risk**: Borrowers may fail to repay their loans (**default**). If borrowers default and the bank has no cushion, customer deposits will be wiped out.
3. **Regulatory Capital Requirements**: Banking regulators force banks to hold a minimum percentage of unencumbered capital (**equity**) against their risky assets to absorb unexpected losses.

### Institutional Ecosystem: Why Different Teams View the Bank Differently
Inside a commercial bank, six primary functional disciplines collaborate. A Business Analyst (BA) acts as the central bridge connecting them:

```
                                  ┌──────────────────────────┐
                                  │   BUSINESS & REGULATION  │
                                  │ (Strategy, RBI Mandates) │
                                  └────────────┬─────────────┘
                                               │
               ┌───────────────────────────────┼───────────────────────────────┐
               │                               │                               │
┌──────────────▼──────────────┐ ┌──────────────▼──────────────┐ ┌──────────────▼──────────────┐
│        RISK ANALYTICS       │ │      FINANCE & CONTROL      │ │     TREASURY & ALM / FTP    │
│  Asset Quality, ECL, PD/LGD │ │  General Ledger, Provisions │ │  Liquidity, Interest Rates  │
└──────────────┬──────────────┘ └──────────────┬──────────────┘ └──────────────┬──────────────┘
               │                               │                               │
               └───────────────────────────────┼───────────────────────────────┐
                                               │
                                  ┌────────────▼─────────────┐
                                  │   DATA, TECH & TESTING   │
                                  │ ETL, Data Marts, UAT, QA │
                                  └──────────────────────────┘
```

- **Credit Risk**: Focuses on borrower creditworthiness, default probability, asset quality classification, and expected losses.
- **Finance & Control**: Focuses on the General Ledger (GL), financial statements, statutory balance sheet reporting, and provision reserves.
- **Treasury & ALM**: Focuses on liquidity ratios (LCR/NSFR), interest rate risk in the banking book (IRRBB), and internal pricing (FTP).
- **Technology & Data**: Focuses on core banking systems (CBS), ETL data pipelines, enterprise data warehouses, and software deployment.
- **Testing & QA**: Focuses on Business Acceptance Testing (UAT), verifying expected outputs, and identifying system defects.
- **Regulatory Compliance**: Focuses on supervisory circulars, RBI guidelines, Basel III rules, and auditability.

### Introducing the Simulated Bank: Indus Apex Bank India
Throughout Credit Risk OS 2.0, all data, engines, and cases reflect **Indus Apex Bank India**, a canonical simulated Indian Scheduled Commercial Bank operating under the RBI framework as of **31 July 2026**.

#### Canonical Balance Sheet & Capital Truth Model

| Institutional Metric | Canonical Value | Meaning / Interpretation |
| :--- | :--- | :--- |
| **Bank Name** | Indus Apex Bank India | Fictional Scheduled Commercial Bank (Synthetic Model) |
| **Headline Total Assets** | ₹38,500.0 Cr | Total balance sheet size of the institution |
| **Whole-Bank Total RWA** | ₹28,000.0 Cr | Risk-Weighted Assets calculated under RBI Basel III SA |
| **Common Equity Tier 1 (CET1) Capital** | ₹4,200.0 Cr | Core high-quality capital (paid-up equity + statutory reserves) |
| **Total Regulatory Capital** | ₹4,620.0 Cr | Tier 1 Capital (₹4,200 Cr) + Tier 2 Capital (₹420 Cr) |
| **CET1 Capital Ratio** | **15.00%** | `(₹4,200 Cr / ₹28,000 Cr) × 100` (Regulatory Min: 5.50% + 2.50% CCB = 8.00%) |
| **Capital to Risk-Weighted Assets (CRAR)** | **16.50%** | `(₹4,620 Cr / ₹28,000 Cr) × 100` (Regulatory Min: 9.00% + 2.50% CCB = 11.50%) |
| **CET1 Surplus vs Reference Level** | **+7.00 pp** | Surplus above the 8.00% CET1 + CCB reference level (15.00% - 8.00%) |
| **Simulation Date** | 31 July 2026 | Active supervisory reporting cutoff date |

---

## PART 2 — THE CREDIT LIFECYCLE

### The Journey of a Commercial Loan Facility
To understand credit risk, follow a corporate loan from origination to maturity:

```
[Borrower Application] ──► [Sanction & Limit Setup] ──► [Drawdown / Outstanding] ──► [EOD Servicing & Repayment]
                                                                                               │
                                                                                    ┌──────────┴──────────┐
                                                                                    ▼                     ▼
                                                                           [On-Time Repayment]    [Delinquency / DPD]
                                                                           (Standard Performing)    (SMA-0/1/2 → NPA)
```

### Core Credit Risk Concepts Defined

- **Obligor / Borrower**: The legal corporate or individual entity receiving the credit facility (e.g., *Western Precision Auto Components Ltd*).
- **Credit Facility**: The specific financial contract approved by the bank (e.g., Term Loan, Revolving Cash Credit, Bank Guarantee).
- **Sanctioned Limit**: The maximum credit amount authorized by the bank's Credit Committee (e.g., ₹350.0 Cr).
- **Gross Outstanding (Drawn Exposure)**: The exact principal amount currently drawn and owed by the borrower (e.g., ₹300.0 Cr).
- **Undrawn Commitment**: The remaining approved limit available for drawdown `Sanctioned Limit - Gross Outstanding` (e.g., `₹350 Cr - ₹300 Cr = ₹50 Cr`).
- **Days Past Due (DPD)**: The exact number of consecutive calendar days an overdue principal or interest payment remains unpaid past its contractual due date.
- **Collateral / Security**: Physical or financial assets pledged by the borrower to secure the loan (e.g., commercial real estate, industrial machinery, inventory).
- **Realisable Security Value**: The net valuation of pledged collateral that the bank can realistically recover upon liquidation after haircuts.

### Risk Modeling Parameters: PD, LGD, EAD, and Expected Loss
In quantitative credit risk management (such as Basel IRB or IFRS 9 / ECL frameworks), credit risk is parameterized using three fundamental variables:

1. **Probability of Default (PD)**: The estimated probability (expressed as a percentage) that a borrower will default over a specific time horizon (typically 12 months). Range: `0.00% to 100.00%`.
2. **Loss Given Default (LGD)**: The percentage of exposure that the bank expects to lose if the borrower defaults, taking into account collateral recovery. `LGD = 1.0 - Recovery Rate`. Range: `0.00% to 100.00%`.
3. **Exposure at Default (EAD)**: The total monetary amount owed by the borrower at the exact moment of default, including drawn outstanding plus a credit conversion factor on undrawn commitments.

#### Expected Loss (EL) Formula
$$\text{Expected Loss (EL)} = \text{PD} \times \text{LGD} \times \text{EAD}$$

*Worked Example*: A borrower has an EAD of ₹100 Cr, a 12-month PD of 2.00%, and an LGD of 40.00% (due to 60% collateral recovery).
$$\text{Expected Loss} = ₹100\text{ Cr} \times 0.02 \times 0.40 = ₹0.80\text{ Cr (₹80 Lakhs)}$$

> [!IMPORTANT]
> **CRITICAL DISTINCTION: EXPECTED LOSS vs. RBI IRACP PROVISIONING**
> 
> A common beginner mistake is assuming that Expected Loss (EL) is the same as regulatory provision reserves. 
> - **Expected Loss (EL)** is an economic/statistical risk calculation used in internal risk modeling (Basel IRB / IFRS 9).
> - **RBI IRACP Provisioning** is a mandatory, rule-based supervisory framework set by the Reserve Bank of India for Indian Scheduled Commercial Banks. It dictates fixed, non-negotiable provisioning percentages based strictly on **Days Past Due (DPD) buckets** and **secured vs. unsecured balance decomposition**.

---

## PART 3 — INDIA ASSET QUALITY & IRACP

### Overview of RBI IRACP Prudential Norms
The Reserve Bank of India's **Income Recognition, Asset Classification and Provisioning (IRACP)** Prudential Norms govern how Indian banks must classify loans and build balance sheet provision reserves.

### Asset Quality Classification Hierarchy
Loans are classified into two broad categories: **Standard (Performing)** and **Non-Performing Assets (NPA)**.

```
                                      ┌─────────────────────────────────────────┐
                                      │       ALL CREDIT FACILITIES (DPD)       │
                                      └────────────────────┬────────────────────┘
                                                           │
                      ┌────────────────────────────────────┴────────────────────────────────────┐
                      ▼                                                                         ▼
           [ STANDARD PERFORMING ]                                                   [ NON-PERFORMING ASSET (NPA) ]
      (Facilities DPD 0 to 90 Days)                                                   (Facilities DPD > 90 Days)
                      │                                                                         │
       ┌──────────────┼──────────────┐                                           ┌──────────────┼──────────────┐
       ▼              ▼              ▼                                           ▼              ▼              ▼
  [Standard]      [SMA-0]        [SMA-1]        [SMA-2]                        [Substandard]    [Doubtful]       [Loss]
   (DPD 0)       (DPD 1-30)     (DPD 31-60)    (DPD 61-90)                      (DPD >90 initial) (Ageing >12m) (Uncollectible)
```

#### Detailed IRACP Boundary Rules (Term Loan Workflow)

| Category | DPD Boundary | Regulatory Asset Status | Standard/NPA Status | Mandatory RBI Provisioning Rule |
| :--- | :--- | :--- | :--- | :--- |
| **Standard (General)** | DPD = 0 | Standard | Performing | **0.40%** of gross outstanding |
| **Standard (CRE)** | DPD = 0 | Standard | Performing | **1.00%** of gross outstanding (Commercial Real Estate) |
| **Standard (CRE-Resi)** | DPD = 0 | Standard | Performing | **0.75%** of gross outstanding (Residential CRE) |
| **Standard (Farm/MSE)** | DPD = 0 | Standard | Performing | **0.25%** of gross outstanding (Agricultural & Micro/Small) |
| **SMA-0** | DPD 1 – 30 | Special Mention Account 0 | Performing | Standard Provisioning Rate (Early Warning) |
| **SMA-1** | DPD 31 – 60 | Special Mention Account 1 | Performing | Standard Provisioning Rate (Mandatory CRILC Reporting) |
| **SMA-2** | DPD 61 – 90 | Special Mention Account 2 | Performing | Standard Provisioning Rate (Pre-NPA Alert) |
| **Substandard NPA** | **DPD > 90** | Substandard | **NPA** | **15.00%** on Secured portion<br>**25.00%** on Unsecured portion |
| **Doubtful-1 (D1)** | Substandard > 12m | Doubtful 1st Year | **NPA** | **25.00%** on Secured portion<br>**100.00%** on Unsecured portion |
| **Doubtful-2 (D2)** | Doubtful 1 – 3 Years | Doubtful 1 to 3 Yrs | **NPA** | **40.00%** on Secured portion<br>**100.00%** on Unsecured portion |
| **Doubtful-3 (D3)** | Doubtful > 3 Years | Doubtful > 3 Yrs | **NPA** | **100.00%** on Secured portion<br>**100.00%** on Unsecured portion |
| **Loss Asset** | Identified Loss | Loss Asset | **NPA** | **100.00%** total provision (Write-off candidate) |

> [!NOTE]
> **KEY DOMAIN TRUTH: DPD DOES NOT DERIVE DOUBTFUL OR LOSS CATEGORIES**
> 
> DPD backstops directly derive: `0 DPD → Standard`, `1-30 DPD → SMA-0`, `31-60 DPD → SMA-1`, `61-90 DPD → SMA-2`, and `> 90 DPD → Substandard NPA`. 
> Transition to **Doubtful-1/2/3** requires **duration ageing in Substandard status** (>12 months), while **Loss** classification requires internal audit, RBI inspection, or uncollectibility determination—not DPD alone.

### Secured vs. Unsecured Balance Decomposition
Under RBI IRACP Section 5.3, when a facility becomes Substandard NPA or Doubtful, the bank must decompose the outstanding balance into secured and unsecured portions:

$$\text{Secured Balance} = \min(\text{Gross Outstanding}, \text{Realisable Security Value})$$

$$\text{Unsecured Balance} = \max(0.0, \text{Gross Outstanding} - \text{Secured Balance})$$

$$\text{Required Provision} = (\text{Secured Balance} \times \text{Secured Rate}) + (\text{Unsecured Balance} \times \text{Unsecured Rate})$$

#### Worked Example: Facility DEL-MED-7706
- Obligor: Aethel Healthcare & Hospitals Ltd
- Gross Outstanding: ₹80.0 Cr | DPD: 112 Days (Substandard NPA) | Realisable Security: ₹0.0 Cr (100% Unsecured)
- *Incorrect Application (Bug)*: Treated as secured asset, applying 15% rate $\rightarrow$ `₹80.0 Cr × 15% = ₹12.0 Cr` provision.
- *Correct RBI IRACP Rule*: Realisable Security is ₹0.0 Cr, so entire ₹80.0 Cr is Unsecured. Mandatory rate is 25%.
$$\text{Correct Provision} = ₹80.0\text{ Cr} \times 25.00\% = ₹20.0\text{ Cr} \quad (\text{₹8.0 Cr Under-provisioning Deficit!})$$

---

## PART 4 — WHAT A BUSINESS ANALYST IS DOING HERE

### The Central Role of the Banking Business Analyst
A Business Analyst (BA) in a commercial bank is **not** a developer, a quantitative risk modeler, or a general administrator. The BA is the **functional architect and translator** who ensures that regulatory guidelines and business strategies are accurately converted into operating technology, data pipelines, and control systems.

```
  [ REGULATION & BUSINESS ]                [ BUSINESS ANALYST ]                 [ TECHNOLOGY & DATA ]
  "RBI Mandates DPD > 90          ──►  Converts to BRD, Rules,       ──►  Builds SQL Pipelines,
   for Substandard NPA"                STTM, UAT Cases & Controls           IRACP Engines & Marts
```

### The 10 Core Artefacts of Banking Transformation

1. **Problem Statement**: Clear definition of the business problem, operational risk, regulatory non-compliance, or financial impact.
2. **Stakeholder Registry**: Identification of business owners, policy leads, tech leads, QA leads, and operational consumers.
3. **Business Requirement (BRD)**: Formal specification of *what* the system must accomplish from a business/regulatory perspective.
4. **Business Rule**: Explicit mathematical, logical, or conditional rule implementing a requirement (e.g., `DPD > 90 → Substandard`).
5. **Acceptance Criteria**: Testable conditions that prove whether a business requirement has been satisfied.
6. **Current-State (As-Is) Model**: Diagram and analysis of existing operational processes, system flows, and control failures.
7. **Target-State (To-Be) Model**: Redesigned target process architecture with automated control gates and clean data flows.
8. **Source-to-Target Mapping (STTM)**: Column-level mapping specification connecting source banking fields to downstream target data structures.
9. **Requirements Traceability Matrix (RTM)**: End-to-end matrix linking Driver $\rightarrow$ Requirement $\rightarrow$ Rule $\rightarrow$ Mapping $\rightarrow$ Test $\rightarrow$ Defect $\rightarrow$ Sign-off.
10. **Reconciliation & Sign-off Register**: Verification of zero population/balance breaks and formal Steering Committee sign-offs.

---

## PART 5 — CREDIT RISK OS AS ONE OPERATING ENVIRONMENT

### The Six Interconnected Workspaces
Credit Risk OS 2.0 presents the simulated bank through six specialized workspaces. Each workspace represents a different functional lens on the **exact same underlying synthetic bank**:

```
┌───────────────────────────┐      ┌───────────────────────────┐      ┌───────────────────────────┐
│     01 COMMAND CENTRE     │      │       02 CASE ROOM        │      │      03 RISK ENGINE       │
│ Executive Dashboard &     │ ───► │ Assigned Workstations &   │ ───► │ Dynamic Calculation       │
│ Whole-Bank Balance Sheet  │      │ 10-Step Transformation    │      │ Engines (IRACP, Capital)  │
└─────────────┬─────────────┘      └─────────────┬─────────────┘      └─────────────┬─────────────┘
              │                                  │                                  │
              ▼                                  ▼                                  ▼
┌───────────────────────────┐      ┌───────────────────────────┐      ┌───────────────────────────┐
│        04 DATA LAB        │      │    05 DELIVERY STUDIO     │      │    06 TEST & RELEASE      │
│ Schema Inspector, STTM,   │ ───► │ BRD Registers, Rules,     │ ───► │ UAT Test Suites, Defects, │
│ Lineage, DQ Workbench     │      │ RTM & Evidence Packs      │      │ Reconciliation, Governance│
└───────────────────────────┘      └───────────────────────────┘      └───────────────────────────┘
```

### The Six Workspace Mental Models

- **01 Command Centre**: *"What requires operational attention across the institution right now?"*
- **02 Case Room**: *"What specific transformation assignment am I assigned to deliver?"*
- **03 Risk Engine**: *"How do the underlying financial, regulatory, and risk calculation engines behave?"*
- **04 Data Lab**: *"Where does the data originate, how does it transform, and where are the lineage breaks?"*
- **05 Delivery Studio**: *"What has the business requested, and how are requirements traced to design?"*
- **06 Test & Release**: *"Have system changes been proven through UAT, and is it safe to sign off for public release?"*

---

## PART 6 — COMMAND CENTRE MASTERCLASS

### Executive Indicators & Whole-Bank Metrics
The **Command Centre** (`01 Command Centre`) provides executive oversight of Indus Apex Bank India.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ INSTITUTIONAL OPERATING STATUS • INDUS APEX BANK INDIA                        SIMULATION: 31 JULY 2026 │
├────────────────────────────┬────────────────────────────┬────────────────────────────┬─────────────────┤
│ GROSS PORTFOLIO ADVANCES   │ GROSS NPA RATIO            │ IRACP REQUIRED PROVISION   │ CET1 / CRAR     │
│ ₹2,645.0 Cr (8 Facilities) │ 3.02% (₹80.0 Cr Substandard│ ₹74.8 Cr                   │ 15.00% / 16.50% │
│ Limit: ₹3,445.0 Cr         │ 1 Facility DEL-MED-7706)   │ Balance Sheet Reserve      │ RWA: ₹28,000 Cr │
└────────────────────────────┴────────────────────────────┴────────────────────────────┴─────────────────┘
```

### Release Status Evaluation Logic
In Credit Risk OS 2.0, release readiness is derived dynamically from four governance criteria using `deriveCaseReleaseStatus`:

```ts
// Release Status Derivation Logic
if (approvedSignoffs === totalSignoffs && openDefects === 0 && uatPassPercent === 100 && isReconciled) {
  return 'COMPLETE'; // RELEASE COMPLETE (Emerald)
}
if (openBlockers > 0 || !isReconciled) {
  return 'BLOCKED'; // RELEASE BLOCKED (Rose - Red)
}
if (openDefects > 0 || uatPassPercent < 100) {
  return 'AT_RISK'; // AT RISK (Amber - Yellow)
}
if (approvedSignoffs < totalSignoffs) {
  return 'READY_FOR_SIGNOFF'; // READY FOR SIGNOFF (Cyan)
}
return 'READY_FOR_RELEASE'; // READY FOR RELEASE (Emerald)
```

| Release Status | Visual Badge | Trigger Conditions |
| :--- | :--- | :--- |
| **RELEASE BLOCKED** | Rose / Red | Open Blocker/Critical defects exist, OR reconciliation breaks exist (`isReconciled = false`). |
| **AT RISK** | Amber / Yellow | Open Major/Minor defects exist, OR UAT pass rate is below 100%. |
| **READY FOR SIGNOFF** | Cyan / Blue | Zero open defects, 100% UAT pass rate, 100% reconciled, but Steering Committee sign-offs pending. |
| **READY FOR RELEASE** | Emerald / Green | All defects resolved, 100% UAT pass rate, 100% reconciled, all sign-offs approved. |
| **RELEASE COMPLETE** | Emerald / Green | Final release deployment executed and locked in production. |

---

## PART 7 — CASE ROOM & THE CASE LIFECYCLE

### Case Workstations & Stepper Navigation
The **Case Room** (`02 Case Room`) is the primary workspace where learners execute transformation cases.

#### Progressive Stepper Lifecycle
1. **Assigned**: Initial assignment review and objective briefing.
2. **Discovery**: Reviewing evidence packs, policy notes, and interviewing stakeholders.
3. **Requirements**: Drafting business requirements (BRD), business rules, and acceptance criteria.
4. **Build Validation**: Executing data investigation tasks and analyzing current-state code/pipelines.
5. **UAT**: Executing boundary test cases, identifying software defects, and applying remediation fixes.
6. **Sign-off**: Running multi-stage reconciliation benches and securing Steering Committee sign-offs.
7. **Completed**: Achieving release approval and locking the transformation capability.

### Work-Based Mastery Layer: Dynamic Capability Score
As learners progress through discovery, requirements verification, data investigation, UAT test execution, defect remediation, and reconciliation sign-off, Credit Risk OS 2.0 calculates a **Dynamic Capability Score (0 to 100%)**.

> [!CAUTION]
> **SIMULATION MASTERY DISCLAIMER**
> 
> The Dynamic Capability Score measures simulation engagement, evidence review thoroughness, and task completion within Credit Risk OS 2.0. It is a learning measurement tool and does **not** constitute an accredited academic degree or formal professional regulatory certification.

---

## PART 8 — CASE 01 COMPLETE WALKTHROUGH
### Asset Quality & Provisioning Transformation

```
========================================================================================================
CASE 01 METADATA SUMMARY
========================================================================================================
Case Code:               CASE-2026-01 (CASE-001)
Title:                   Asset Quality & Provisioning Transformation
Domain:                  RBI IRACP Prudential Norms & Asset Classification
Target Deadline:         15 August 2026
Sponsors:                Vikram Malhotra (Credit Risk SME) & Ananya Sharma (Finance Controller)
Scope:                   8 Corporate & SME Facilities (₹2,645.0 Cr Gross Outstanding)
Key Discrepancy:         Risk Engine Target Reserve (₹74.8 Cr) vs Finance GL Reserve (₹56.0 Cr)
Seeded Defects:          4 Seeded Defects (DEF-AQ-001 to DEF-AQ-004)
UAT Test Suite:          16 Boundary & Provisioning Test Cases
Reconciliation Deficit:  ₹18.8 Cr GL Provision Reserve Deficit + 1 Duplicate Facility Row
========================================================================================================
```

### The Business Problem: Why Risk and Finance Disagree
As of 31 July 2026, Indus Apex Bank India's Risk Analytics team reported a mandatory IRACP provision requirement of **₹74.8 Cr**. However, the Finance Department's General Ledger (GL Account 2401) reflected booked provision reserves of only **₹56.0 Cr**, creating an unexplained **₹18.8 Cr reserve deficit**. 

Furthermore, Risk reports showed **9 ingested records** for ₹3,095.0 Cr outstanding, whereas core banking servicing logs confirmed only **8 active credit facilities** for ₹2,645.0 Cr.

### Evidence Pack Review
- **`EV-01` (`EVID-REC-01`)**: Reconciliation Variance Note from Finance Controller Ananya Sharma documenting the ₹18.8 Cr GL deficit.
- **`EV-02` (`EVID-POL-02`)**: Credit Policy Rule Memo defining RBI IRACP DPD backstops and secured vs unsecured provisioning rates.
- **`EV-03` (`EVID-DAT-03`)**: CBS Servicing Daily DPD Extract revealing batch snapshot timing lags.
- **`EV-04` (`EVID-MAP-04`)**: Legacy STTM Lineage Specification exposing the `>= 90` boundary operator error and missing composite join keys.
- **`EV-05` (`EVID-BUG-05`)**: Software Bug Incident Note detailing an uninitialized boolean flag in the provision calculation engine.

### Key Requirements & Rules

#### Requirement REQ-AQ-001
- **Title**: Automated IRACP DPD Classification Engine
- **Text**: The system shall automatically derive performing and initial NPA asset-quality status based on RBI IRACP DPD backstops (0 DPD Standard, 1-30 SMA-0, 31-60 SMA-1, 61-90 SMA-2, >90 Substandard NPA), while applying duration ageing for Doubtful-1/2/3 categories and policy determination for Loss assets.

#### Requirement REQ-AQ-002
- **Title**: Exact DPD Boundary Operator Specification
- **Text**: The asset classification engine shall enforce exact DPD operators: `DPD > 30` for SMA-1, `DPD > 60` for SMA-2, and `DPD > 90` for NPA Substandard classification. `DPD = 90` must remain SMA-2 Standard.

### Data Investigations & Seeded Defects

#### 1. Defect DEF-AQ-001 (`DEF-2026-01`) — Boundary Operator Error
- **Facility**: `CHN-RES-5507` (Coromandel Residential Developers Ltd)
- **Context**: UAT 90-DPD Boundary Test Fixture (Canonical baseline facility DPD is 38 SMA-1).
- **Issue**: Legacy SQL script `sp_calc_asset_quality.sql` contained `IF DPD >= 90 THEN SET STATUS = 'NPA'`. Because it used `>= 90` instead of `> 90`, account `CHN-RES-5507` on exactly 90 DPD was prematurely classified as Substandard NPA (+₹200 Cr false NPA).
- **Fix**: Update boundary operator to `> 90` in `_engine/iracp.ts`.

#### 2. Defect DEF-AQ-002 (`DEF-2026-02`) — Duplicate Composite Key Join
- **Facility**: `MUM-CRE-8801` (Sahyadri Commercial Logistics Group Ltd)
- **Issue**: SQL join between `cbs_facility_master` and `risk_customer_master` was performed on `obligor_id` alone without `facility_id`. Because obligor `MUM-CRE-8801` had two collateral records, the join generated a duplicate facility row (+₹450 Cr outstanding overstatement).
- **Fix**: Enforce composite join key `ON obligor_id AND facility_id`.

#### 3. Defect DEF-AQ-003 (`DEF-2026-03`) — EOD Payment Clearing Timing Lag
- **Facility**: `PUN-MFG-4403` (Western Precision Auto Components Ltd)
- **Issue**: Risk Warehouse batch script ingested servicing tables at 18:00:00 prior to evening payment clearing runs. It captured DPD = 28 days (SMA-0) instead of actual post-clearing DPD = 42 days (SMA-1), creating a 14-day DPD lag.
- **Fix**: Reschedule ETL ingestion trigger to 23:59:59 post EOD payment clearing.

#### 4. Defect DEF-AQ-004 (`DEF-2026-04`) — Unsecured Collateral Rate Error
- **Facility**: `DEL-MED-7706` (Aethel Healthcare & Hospitals Ltd)
- **Issue**: Facility outstanding is ₹80.0 Cr with ₹0.0 Cr realisable security (100% unsecured Substandard NPA). Engine evaluated `if (isSecured == true || realisableSecurity > 0)` without checking `realisableSecurity < outstanding`. An uninitialized boolean flag applied the 15% secured rate (₹12.0 Cr) instead of 25% unsecured rate (₹20.0 Cr), creating an ₹8.0 Cr provision deficit.
- **Fix**: Compute `securedPortion = Math.min(outstanding, realisableSecurity)` and `unsecuredPortion = Math.max(0, outstanding - securedPortion)`.

### Case 01 Reconciliation Bench

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ ASSET QUALITY & FINANCE GL PROVISION RECONCILIATION BENCH                                              │
├───────────────────────────┬────────────────────────────────────────────────────────────┤
│ CONTROL STATUS: DEFICIT ALERT (VARIANCE>0)│ PROVISION VARIANCE: ₹18.8 Cr Deficit (GL Booked: ₹56.0 Cr) │
├───────────────────────────┴────────────────────────────────────────────────────────────┤
│ STAGE TRANSITION BREAKS:                                                                               │
│ 1. ETL Mart Ingestion & Deduplication:   8 -> 9 Records (+1 Duplicate Row MUM-CRE-8801, +₹450 Cr)     │
│ 2. IRACP DPD Boundary Classification:    8 -> 8 Records (+1 False NPA CHN-RES-5507, +₹200 Cr False NPA)│
│ 3. CBS EOD Payment Clearing Sync:        PUN-MFG-4403 18:00 cutoff (DPD 28 SMA-0 vs actual DPD 42 SMA-1)│
│ 4. Provision Calculation vs Finance GL:  DEL-MED-7706 15% rate (₹12 Cr) vs 25% (₹20 Cr) -> ₹18.8 Cr Def.│
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

When all 4 remediation fixes are applied:
- Ingested Records: `8 Facilities` (₹2,645.0 Cr)
- Substandard NPA: `1 Facility` (`DEL-MED-7706`, ₹80.0 Cr)
- Risk Engine Target Reserve: **₹74.8 Cr**
- Finance GL Booked Reserve: **₹74.8 Cr**
- Provision Variance: **₹0.0 Cr (RECONCILED)**

---

## PART 9 — CASE 02 COMPLETE WALKTHROUGH
### Treasury FTP Data Transformation

```
========================================================================================================
CASE 02 METADATA SUMMARY
========================================================================================================
Case Code:               CASE-2026-02 (CASE-002)
Title:                   Treasury FTP Data Transformation
Domain:                  Treasury & ALM Funds Transfer Pricing (BANK_POLICY_SIMULATION)
Target Deadline:         31 August 2026
Sponsors:                Rajesh Iyer (Head of Treasury & ALM) & Priya Sundaram (Risk Tech Lead)
Scope:                   8 Corporate & SME Facilities (₹2,645.0 Cr Lending Portfolio)
Key Discrepancy:         Gross Absolute Break ₹1,745.0 Cr (Net Difference +₹355.0 Cr Masked)
Seeded Defects:          5 Seeded Defects (DEF-FTP-001 to DEF-FTP-005)
UAT Test Suite:          18 Multi-Stage Pipeline & Rate Calculation Tests
Reconciliation Deficit:  Stale Run Downstream + Omitted Facility + Duplicate Reference Join
========================================================================================================
```

### Business Context: What is Treasury Funds Transfer Pricing (FTP)?
Funds Transfer Pricing (FTP) is an internal bank management accounting framework used to measure the profitability of individual business units, products, and loan facilities. 

- **Treasury Desk**: Acts as the central internal bank. It "buys" deposits from retail branches and "sells" funds to commercial lending units.
- **FTP Base Rate**: The internal cost of funds assigned to a loan based on market yield curves and tenor.
- **Liquidity Premium**: An internal charge added to long-term loans to compensate Treasury for holding liquidity reserves.
- **Commercial Margin**: The net profit margin earned by the lending desk `Customer Interest Rate - Total Internal FTP Rate`.

> [!NOTE]
> **SIMULATION ASSUMPTION DISCLAIMER**
> 
> FTP methodology within Credit Risk OS 2.0 is a **`BANK_POLICY_SIMULATION`**. Internal transfer pricing rules are established by individual bank ALCO policies rather than rigid statutory regulation.

### Multi-Stage Pipeline Architecture

```
[Core Banking CBS] ──► [ETL Stage Mart] ──► [FTP Calculation Engine] ──► [Finance Extract Mart]
   (8 Facilities)       (7 Facilities)          (8 Records / Duplicates)       (Stale Run Consumed)
   (₹2,645.0 Cr)        (₹2,300.0 Cr)           (₹3,000.0 Cr)                 (₹2,300.0 Cr)
```

### The 5 Seeded Defects in Case 02

1. **`DEF-FTP-001` — Repricing Tenor vs. Contractual Maturity Discrepancy**: Floating rate loan `PUN-MFG-4403` (3-Month MIBOR repricing tenor) was priced off the 36-Month fixed yield curve, overcharging FTP cost by 1.25%.
2. **`DEF-FTP-002` — Reference Data Duplicate Join**: Product mapping table join lacked effective-date filtering, generating duplicate FTP output rows (+₹700 Cr overstatement).
3. **`DEF-FTP-003` — Unmapped Liquidity Category**: Renewable energy facility `GUJ-REN-3305` lacked a liquidity category mapping, defaulting to a 0.00% liquidity premium instead of 0.45%.
4. **`DEF-FTP-004` — Late-Cleared Facility Omission**: Facility `BLR-SME-1104` (₹345 Cr) was omitted from the FTP staging extract due to an incomplete EOD flag.
5. **`DEF-FTP-005` — Stale Downstream Run Version Consumption**: Downstream ALM reporting mart consumed stale run version `RUN-20260730-01` instead of approved run `RUN-20260731-01`.

### The Compensating Error Masterclass: Net vs. Gross Reconciliation

```
========================================================================================================
CASE 02 RECONCILIATION BREAK DOWN (UN-REMEDIATED INITIAL STATE)
========================================================================================================
Stage 1 Break (Omitted Facility BLR-SME-1104):             -₹345.0 Cr
Stage 2 Break (Duplicate Reference Join):                  +₹700.0 Cr
Stage 3 Break (Stale Downstream Run Version):              -₹700.0 Cr
--------------------------------------------------------------------------------------------------------
NET SOURCE-TO-OUTPUT DIFFERENCE:                           +₹355.0 Cr
GROSS ABSOLUTE RECONCILIATION BREAK:                      ₹1,745.0 Cr (| -345 | + | +700 | + | -700 |)
========================================================================================================
```

> [!WARNING]
> **NETTING DOES NOT EQUAL RECONCILIATION!**
> 
> A net difference of +₹355.0 Cr looks relatively small on a ₹2,645 Cr portfolio. However, inspecting individual stage transitions reveals **₹1,745.0 Cr in Gross Absolute Reconciliation Breaks**. Netting positive and negative errors masks severe operational risk! A true reconciliation control requires **100% population lock, zero net variance, and zero gross absolute breaks**.

---

## PART 10 — CASE 03 COMPLETE WALKTHROUGH
### Capital & Regulatory Change Transformation

```
========================================================================================================
CASE 03 METADATA SUMMARY
========================================================================================================
Case Code:               CASE-2026-03 (CASE-003)
Title:                   Capital & Regulatory Change Transformation
Domain:                  RBI Basel III Capital Regulations & Credit RWA
Target Deadline:         30 September 2026
Sponsors:                Dr. Meera Nambiar (Regulatory Compliance) & Siddharth Varma (Data Lead)
Scope:                   ₹3,445.0 Cr Commitments (₹2,645 Cr Drawn + ₹800 Cr Undrawn)
Target Credit RWA:       ₹2,436.0 Cr (Credit Equivalent Exposure: ₹3,045.0 Cr)
Capital Requirement:     ₹219.24 Cr @ 9.00% Minimum CRAR
Seeded Defects:          6 Seeded Defects (DEF-CAP-001 to DEF-CAP-006)
UAT Test Suite:          20 Risk-Weight & Credit Conversion Factor (CCF) Tests
========================================================================================================
```

### Business Context: Bank Capital & Risk-Weighted Assets (RWA)
Regulators force commercial banks to hold capital based on the **riskiness** of their assets. Under the **RBI Basel III Standardised Approach for Credit Risk**:

1. **Credit Conversion Factor (CCF)**: Converts off-balance-sheet undrawn commitments into Credit Equivalent Exposure (CEE).
   $$\text{Credit Equivalent Exposure (CEE)} = \text{Drawn Outstanding} + (\text{Undrawn Commitment} \times \text{CCF})$$
   *Simulation Assumption*: Credit Risk OS 2.0 applies a standardized **50% simulation CCF** to undrawn corporate commitments.
2. **Risk Weight (RW %)**: Percentage multiplier reflecting asset risk based on borrower rating or asset class (e.g., 20% for AAA, 50% for A, 100% for Unrated Corporate, 150% for Substandard NPA).
3. **Credit Risk-Weighted Assets (Credit RWA)**:
   $$\text{Credit RWA} = \text{Credit Equivalent Exposure (CEE)} \times \text{Risk Weight \%}$$
4. **Attributable Capital Requirement**: Minimum capital required to support the exposure at the 9.00% minimum CRAR baseline.
   $$\text{Capital Requirement} = \text{Credit RWA} \times 9.00\%$$

#### Case 03 Canonical Portfolio Numbers

| Portfolio Component | Value (INR Cr) | Derivation / Notes |
| :--- | :--- | :--- |
| **Gross Outstanding (Drawn)** | ₹2,645.0 Cr | Sum of 8 corporate/SME facilities |
| **Undrawn Commitments** | ₹800.0 Cr | Total unutilized sanctioned limits |
| **Off-Balance-Sheet CEE (50% CCF)** | ₹400.0 Cr | `₹800.0 Cr Undrawn × 50% Simulation CCF` |
| **Total Credit Equivalent Exposure (CEE)** | **₹3,045.0 Cr** | `₹2,645.0 Cr Drawn + ₹400.0 Cr Off-Balance CEE` |
| **Target Credit RWA** | **₹2,436.0 Cr** | Portfolio average Risk Weight = 80.00% (`₹3,045 Cr × 80%`) |
| **Attributable Capital Req @ 9%** | **₹219.24 Cr** | `₹2,436.0 Cr Target Credit RWA × 9.00% Minimum CRAR` |

> [!IMPORTANT]
> **PORTFOLIO RWA vs. WHOLE-BANK RWA**
> 
> Case 03's Credit RWA of **₹2,436.0 Cr** represents the credit risk of the **8 synthetic case facilities**. This is distinct from Indus Apex Bank India's **Whole-Bank Total RWA of ₹28,000.0 Cr** (which includes the bank's entire balance sheet, market risk, and operational risk). The whole-bank CET1 ratio is `(₹4,200 Cr / ₹28,000 Cr) = 15.00%`.

### The 6 Seeded Defects in Case 03

1. **`DEF-CAP-001` — Corporate Exposure Class Misclassification**: Infrastructure facility `HYD-INF-9902` misclassified as unrated corporate (100% RW) instead of eligible infrastructure entity (50% RW).
2. **`DEF-CAP-002` — Stale External Rating Ingestion**: Facility `PUN-MFG-4403` consumed un-refreshed CRISIL BBB rating (100% RW) instead of upgraded CRISIL A rating (50% RW).
3. **`DEF-CAP-003` — Missing CCF Conversion on Undrawn Commitments**: Undrawn commitment engine applied 0% CCF to `BLR-SME-1104` undrawn limits, omitting ₹15 Cr CEE.
4. **`DEF-CAP-004` — Ineligible Collateral CRM Haircut Application**: Unapproved commercial real estate collateral applied as Credit Risk Mitigation (CRM) for `GUJ-REN-3305` without meeting RBI legal enforceability criteria.
5. **`DEF-CAP-005` — Substandard NPA Risk-Weight Haircut Error**: Substandard facility `DEL-MED-7706` assigned 100% RW instead of mandatory 150% NPA Risk Weight.
6. **`DEF-CAP-006` — Reporting Mart Run Version Discrepancy**: Regulatory reporting mart published RWA totals from un-reconciled preliminary run `RUN-CAP-20260730-01`.

---

## PART 11 — RISK ENGINE MASTERCLASS

### The Five Dynamic Sub-Tools
The **Risk Engine** (`03 Risk Engine`) contains five interactive sub-tools:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 03 RISK ENGINE & SIMULATION LAB WORKSTATION                                                          │
├───────────────┬───────────────────┬───────────────────┬───────────────────┬────────────────────────────┤
│ Bank Overview │ Credit Risk (ECL) │ IRACP Engine      │ Basel III Capital │ Treasury & ALM (FTP)       │
│ Whole-Bank    │ Portfolio PD/LGD  │ DPD Classification│ RWA & Capital Req │ Yield Curves & Repricing   │
│ RWA & Capital │ Expected Losses   │ & Provisioning    │ Calculations      │ Profitability Matrix       │
└───────────────┴───────────────────┴───────────────────┴───────────────────┴────────────────────────────┘
```

---

## PART 12 — DATA LAB MASTERCLASS

### Schemas, STTM Mapping Explorer, Lineage, and Data Quality
The **Data Lab** (`04 Data Lab`) allows analysts to inspect data structures, lineage paths, and quality controls.

#### Core Data Concepts for Banking BAs

- **Data Grain**: The exact level of detail represented by a single row in a table (e.g., *One row per facility per business date*).
- **Business Key**: Natural identifier from core banking systems (e.g., `facility_number` = `MUM-CRE-8801`).
- **Composite Key**: Combination of multiple columns required to uniquely identify a record (e.g., `obligor_id` + `facility_id` + `as_of_date`). Missing composite keys cause duplicate join errors!
- **Source-to-Target Mapping (STTM)**: Specification document defining source table/column, transformation rules, target table/column, data types, null rules, and effective dating.

---

## PART 13 — DELIVERY STUDIO MASTERCLASS

### Requirements, Business Rules, and Requirements Traceability Matrix (RTM)
The **Delivery Studio** (`05 Delivery Studio`) houses the formal transformation artefacts.

#### RTM Traceability Model
The Requirements Traceability Matrix (RTM) links every business driver down to release sign-offs:

$$\text{Driver} \longrightarrow \text{Requirement} \longrightarrow \text{Business Rule} \longrightarrow \text{STTM Mapping} \longrightarrow \text{System Module} \longrightarrow \text{UAT Test} \longrightarrow \text{Defect} \longrightarrow \text{Sign-off}$$

---

## PART 14 — TEST & RELEASE MASTERCLASS

### Business Acceptance Testing (UAT) & Defect Severity Levels
The **Test & Release** workspace (`06 Test & Release`) manages test suites, defects, and governance gates.

#### Defect Severity Hierarchy

| Severity Level | Definition | Governance Impact |
| :--- | :--- | :--- |
| **BLOCKER** | System crash, data corruption, severe regulatory non-compliance, or balance sheet misstatement. | **Strictly blocks release** (`deriveCaseReleaseStatus` returns `BLOCKED`). |
| **CRITICAL** | Major functional calculation failure without manual workaround. | **Strictly blocks release** (`deriveCaseReleaseStatus` returns `BLOCKED`). |
| **MAJOR** | Significant feature defect with temporary manual operational workaround. | Places release **`AT RISK`**; requires Steering Committee waiver. |
| **MINOR** | Cosmetic UI defect, formatting error, or non-critical report label issue. | Does not block release if waiver approved. |

---

## PART 15 — RECONCILIATION: A COMPLETE MASTERCLASS

### Three Types of Reconciliation in Banking Transformations

```
1. POPULATION RECONCILIATION  ──► Source Record Count = Target Record Count + Accounted Exceptions
2. MONETARY RECONCILIATION    ──► Source Balance = Target Balance (Zero Net & Zero Gross Absolute Breaks)
3. RUN-VERSION RECONCILIATION ──► Downstream Consumed Run ID = Approved Target Output Run ID
```

---

## PART 16 — TRACEABILITY: FROM REGULATION TO RELEASE

### End-to-End Lineage Example (BCBS 239 Alignment)
To satisfy BCBS 239 principles for effective risk data aggregation, every reported number must be traceable back to its origin:

$$\text{Reported Provision ₹74.8 Cr} \xleftarrow{\text{GL 2401}} \text{IRACP Engine} \xleftarrow{\text{RULE-AQ-01}} \text{STTM MAP-AQ-01} \xleftarrow{\text{REQ-AQ-001}} \text{CBS Servicing Extract}$$

---

## PART 17 — STAKEHOLDER & ORGANISATIONAL ECOSYSTEM

### Role Responsibilities in Banking Change

| Stakeholder Role | Representative Name | Primary Focus / Ownership |
| :--- | :--- | :--- |
| **Credit Risk Policy Lead** | Vikram Malhotra | IRACP prudential rules, DPD backstops, provision rates. |
| **Finance Controller** | Ananya Sharma | General Ledger reserves, balance sheet integrity, GL 2401. |
| **Treasury & ALM Head** | Rajesh Iyer | FTP pricing curves, liquidity premiums, repricing tenors. |
| **Regulatory Compliance Lead**| Dr. Meera Nambiar | RBI circular compliance, Basel III capital rules, RWA accuracy. |
| **Data Engineering Lead** | Siddharth Varma | ETL pipelines, batch schedules, composite key joins, schemas. |
| **Risk Technology Lead** | Priya Sundaram | Calculation engine architecture, C++ / SQL execution logic. |
| **QA & UAT Lead** | Rohan Mehta | Business acceptance test packs, regression testing, defects. |
| **Business Analyst (BA)** | *Learner / User* | Requirement formulation, STTM specifications, RTM, reconciliation. |

---

## PART 18 — THE SYNTHETIC BANK DATA MODEL

### The 8 Canonical Facilities of Indus Apex Bank India

```
========================================================================================================
INDUS APEX BANK INDIA — CANONICAL SYNTHETIC FACILITY POPULATION
========================================================================================================
1. MUM-CRE-8801  │ Sahyadri Commercial Logistics Group Ltd │ CRE            │ Limit ₹500 Cr │ Out ₹450 Cr │ DPD 0   │ Standard
2. HYD-INF-9902  │ Deccan Power & Infrastructure Ltd       │ Other-Comm     │ Limit ₹600 Cr │ Out ₹500 Cr │ DPD 0   │ Standard
3. PUN-MFG-4403  │ Western Precision Auto Components Ltd   │ Other-Comm     │ Limit ₹350 Cr │ Out ₹300 Cr │ DPD 42  │ SMA-1
4. BLR-SME-1104  │ Kaveri Precision Engineering Pvt Ltd    │ Farm-MSE-House │ Limit ₹150 Cr │ Out ₹120 Cr │ DPD 0   │ Standard
5. GUJ-REN-3305  │ Sabarmati Clean Energy & Solar Ltd      │ Other-Comm     │ Limit ₹400 Cr │ Out ₹350 Cr │ DPD 0   │ Standard
6. DEL-MED-7706  │ Aethel Healthcare & Hospitals Ltd       │ Other-Comm     │ Limit ₹100 Cr │ Out ₹80 Cr  │ DPD 112 │ Substandard NPA
7. CHN-RES-5507  │ Coromandel Residential Developers Ltd   │ CRE-Resi       │ Limit ₹300 Cr │ Out ₹245 Cr │ DPD 38  │ SMA-1
8. AMD-TECH-2208 │ Indus Digital Systems & Tech Ltd        │ Other-Comm     │ Limit ₹600 Cr │ Out ₹600 Cr │ DPD 68  │ SMA-2
========================================================================================================
TOTALS: 8 Facilities │ Gross Outstanding: ₹2,645.0 Cr │ Sanctioned Limit: ₹3,445.0 Cr │ Undrawn: ₹800.0 Cr
========================================================================================================
```

---

## PART 19 — CONSOLIDATED FORMULA CHEAT SHEET

### Key Equations Used in Credit Risk OS 2.0

```
01. Expected Loss (EL)              = PD × LGD × EAD
02. Common Equity Tier 1 (CET1) %   = (CET1 Capital / Total RWA) × 100
03. Capital Adequacy Ratio (CRAR) %  = (Total Capital / Total RWA) × 100
04. Net Interest Margin (NIM)       = (Interest Income - Interest Expense) / Total Earning Assets
05. Undrawn Commitment              = Sanctioned Limit - Gross Outstanding
06. Credit Equivalent Exposure (CEE)= Gross Outstanding + (Undrawn Commitment × CCF %)
07. Credit Risk-Weighted Asset (RWA)= Credit Equivalent Exposure (CEE) × Risk Weight %
08. Capital Requirement @ 9% CRAR   = Credit RWA × 0.09
09. Secured Balance (IRACP)         = Min(Gross Outstanding, Realisable Security Value)
10. Unsecured Balance (IRACP)       = Max(0, Gross Outstanding - Secured Balance)
11. Total Required IRACP Provision  = (Secured Balance × Secured Rate) + (Unsecured Balance × Unsecured Rate)
12. Commercial Margin (FTP)         = Customer Rate - Total Internal FTP Rate
```

---

## PART 20 — COMPREHENSIVE BANKING & REGULATORY GLOSSARY

- **ALCO**: Asset Liability Committee; senior executive committee managing balance sheet risk and FTP.
- **BA**: Business Analyst; functional architect bridging business, regulation, data, and technology.
- **BCBS 239**: Basel Committee on Banking Supervision Standard 239; principles for effective risk data aggregation and reporting.
- **BRD**: Business Requirements Document; formal specification of business/regulatory change.
- **CCB**: Capital Conservation Buffer; mandatory 2.50% equity buffer above minimum CET1 ratio.
- **CCF**: Credit Conversion Factor; percentage used to convert off-balance-sheet commitments into on-balance-sheet exposure.
- **CEE**: Credit Equivalent Exposure; total exposure after applying CCF to undrawn limits.
- **CET1**: Common Equity Tier 1 Capital; highest quality capital consisting of common stock and retained earnings.
- **CRAR**: Capital to Risk-Weighted Assets Ratio; whole-bank total capital divided by total RWA.
- **DPD**: Days Past Due; consecutive calendar days an overdue payment remains unpaid.
- **DQ**: Data Quality; measurement of data accuracy, completeness, timeliness, and uniqueness.
- **EAD**: Exposure at Default; monetary exposure expected when default occurs.
- **ETL**: Extract, Transform, Load; data integration process moving data between systems.
- **FTP**: Funds Transfer Pricing; internal pricing mechanism assigning cost of funds to loans and deposits.
- **IRACP**: Income Recognition, Asset Classification and Provisioning; RBI prudential norms for Indian banks.
- **LGD**: Loss Given Default; percentage of exposure lost if default occurs.
- **NPA**: Non-Performing Asset; loan facility overdue past 90 days.
- **PD**: Probability of Default; likelihood that a borrower defaults within 12 months.
- **RBI**: Reserve Bank of India; central bank and financial regulatory authority of India.
- **RTM**: Requirements Traceability Matrix; end-to-end matrix mapping requirements to release.
- **RWA**: Risk-Weighted Assets; total assets weighted by regulatory risk factors.
- **SMA**: Special Mention Account; early warning classification for overdue accounts (SMA-0, SMA-1, SMA-2).
- **STTM**: Source-to-Target Mapping; technical specification mapping source fields to target fields.
- **UAT**: User Acceptance Testing / Business Acceptance Testing; testing proving software meets business requirements.

---

## PART 21 — RECOMMENDED APP MASTERY ROUTE

To achieve complete mastery of Credit Risk OS 2.0, follow this recommended 5-pass learning path:

```
[ PASS 1: ORIENTATION ]   ──► Read Part 1-7, explore Command Centre, inspect synthetic bank facilities.
[ PASS 2: CASE 01 DEEP ]  ──► Complete Case 01 in Guided Mode (IRACP asset quality, DPD, provision deficit).
[ PASS 3: CASE 02 DEEP ]  ──► Complete Case 02 in Assisted Mode (Treasury FTP, net vs gross reconciliation).
[ PASS 4: CASE 03 DEEP ]  ──► Complete Case 03 in Independent Mode (Basel III Capital, CEE, RWA, CRAR).
[ PASS 5: MASTER REVIEW]  ──► Audit Data Lab lineage, Delivery Studio RTM, and achieve 100% Capability Score.
```

---

## PART 22 — POST-MASTERY CAPABILITY CHECKLIST

After completing this manual and working through Credit Risk OS 2.0, you should be able to confidently explain:

- [x] How commercial banks generate net interest margin while managing credit, liquidity, and capital risks.
- [x] The operational and balance sheet difference between customer deposits, bank assets, and equity capital.
- [x] The exact mathematical difference between Expected Loss (`PD × LGD × EAD`) and RBI IRACP Provisioning.
- [x] The boundary DPD rules for Standard, SMA-0 (1-30), SMA-1 (31-60), SMA-2 (61-90), and Substandard NPA (>90).
- [x] How secured vs. unsecured balances are decomposed under RBI IRACP Section 5.3.
- [x] How Treasury Funds Transfer Pricing (FTP) calculates internal cost of funds and commercial margins.
- [x] Why Net Reconciliation Variance can mask massive Gross Absolute Reconciliation Breaks (compensating errors).
- [x] How Basel III Credit Conversion Factors (CCF) convert off-balance commitments into Credit Equivalent Exposure.
- [x] How Risk-Weighted Assets (RWA) and the 9.00% minimum CRAR derive attributable capital requirements.
- [x] How a Business Analyst structures BRDs, business rules, acceptance criteria, STTM mappings, and RTM matrices.
- [x] How UAT test suites, boundary testing, defect severities, reconciliation benches, and Steering Committee sign-offs govern software releases.

---

## PART 23 — THE COMPLETE END-TO-END BANKING MENTAL MODEL

Every transaction, calculation, and regulatory control in a commercial bank connects into a single continuous operational fabric:

```
A regulatory driver or market event emerges.
                              │
                              ▼
        An operational discrepancy or risk gap is detected.
                              │
                              ▼
  Evidence pack artefacts establish baseline facts and stakeholders align.
                              │
                              ▼
   The Business Analyst formulates BRD requirements and business rules.
                              │
                              ▼
        STTM mappings specify column-level data transformations.
                              │
                              ▼
   Data investigations inspect raw schemas and isolate ETL defect causes.
                              │
                              ▼
   Technology builds calculation engines and updates pipeline scripts.
                              │
                              ▼
   UAT test packs verify boundary conditions and provision algorithms.
                              │
                              ▼
 Multi-stage reconciliation benches prove population and monetary lock.
                              │
                              ▼
    RTM lineage matrices connect regulations down to software code.
                              │
                              ▼
Steering Committee approvers sign off governance gates for public release.
```

Credit Risk OS 2.0 demonstrates that banking transformation is not about disconnected spreadsheets or isolated software code. It is about understanding how **numbers, data, rules, people, software, and supervisory controls connect** into one reliable, auditable, and resilient financial operating system.

---

## APPENDIX — SOURCE MAP OF CREDIT RISK OS 2.0

| Domain / Functional Topic | Primary Source Code Implementation Path |
| :--- | :--- |
| **India Regulatory Truth Model** | `_domain/india/truthModel.ts` |
| **Canonical Synthetic Bank Facilities** | `_data/indiaSyntheticBank.ts` |
| **RBI IRACP Calculation Engine** | `_engine/iracp.ts` |
| **RBI Basel III Capital Engine** | `_engine/rbiCapital.ts` |
| **Treasury & ALM FTP Engine** | `_engine/treasury.ts` |
| **Shared State & Selectors** | `_state/operatingSystemStore.ts` |
| **Global React Context Provider** | `_state/creditRiskOSContext.tsx` |
| **Case Framework Components** | `_cases/_framework/` (`CaseShell`, `ReconciliationBench`, `UatDefectWorkbench`, `SignOffGateway`, `useCaseState`) |
| **Case 01 Definition & Data** | `_cases/case01/case01Data.ts` & `Case01Workspace.tsx` |
| **Case 02 Definition & Data** | `_cases/case02/case02Data.ts` & `Case02Workspace.tsx` |
| **Case 03 Definition & Data** | `_cases/case03/case03Data.ts` & `Case03Workspace.tsx` |
| **Static Integrity Validator** | `_cases/_framework/caseIntegrityValidator.ts` |
| **Workspace Views** | `_components/views/` (`CommandCenterView`, `CaseRoomView`, `RiskEngineWorkspace`, `DataLabView`, `DeliveryStudioView`, `TestReleaseView`) |
