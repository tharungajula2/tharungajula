---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "01"
volumeSlug: "the-indian-retail-book"
volumeTitle: "THE INDIAN RETAIL BOOK"
order: 7
title: "THE DATA INFRASTRUCTURE UNDERNEATH"
slug: "7-the-data-infrastructure-underneath"
sectionNumber: "7"
part: null
kind: "narrative"
sourceFile: "CR_01_THE_INDIAN_RETAIL_BOOK.md"
tags: []
hasSayThis: true
wordCount: 1160
status: "raw"
section: "§7"
summary: ""
enriched: false
---

# §7 · THE DATA INFRASTRUCTURE UNDERNEATH

Everything above is measurable only because of the reporting layer. This section is the plumbing, and it is where a candidate with technical background can be visibly stronger than a candidate without one.

## 7.1 The credit information companies

Four CICs operate in India, licensed by the RBI under the **Credit Information Companies (Regulation) Act, 2005**: **TransUnion CIBIL, Experian, Equifax and CRIF High Mark.** Their databases are built from submissions by member credit institutions — CRIF alone cites contributions from over 5,000 member institutions.

Reporting is a **statutory obligation**, not a commercial choice, which is what makes Indian bureau coverage unusually complete for a market at this income level.

## 7.2 The move to weekly reporting 

This is the most consequential recent change to the data layer, and it went live four weeks before this document's as-at date.

The **Credit Information Reporting (Amendment) Directions, 2025**, issued **4 December 2025** as a set of parallel amendments covering commercial banks, NBFCs, local area banks and the CICs themselves. Originally slated for 1 April 2026, **deferred after industry feedback to 1 July 2026.**

What it requires:

- Credit institutions submit credit information as at **four reference dates each month: the 9th, 16th, 23rd, and the last day.**
- The **full file** — all active accounts plus accounts closed since the last reporting date — as at month-end, submitted **by the 5th of the following month**.
- For the other three dates, **incremental accounts only**: new accounts, closures, borrower-driven changes such as repayment or foreclosure, changes in asset classification, and **any change in days past due**, submitted within four calendar days of the reference date.
- **CKYC number reporting** becomes mandatory where available.
- Rejected data must be corrected and resubmitted promptly.
- Non-compliant institutions are reported on the RBI's **DAKSH** supervisory portal.

After industry feedback the RBI dropped a proposed 28th-of-the-month incremental submission and extended several timelines.

📘 **Why this matters far more than it sounds.** Under fortnightly reporting, a lender pulling a bureau report could be looking at data up to two weeks stale. In a market where a small-ticket personal loan is decisioned in minutes, that stale window is precisely where **loan stacking** happens: a borrower takes loans from four lenders inside the reporting gap, and none of the four sees the other three. Halving the window halves that blind spot. Deputy Governor M. Rajeshwar Rao has publicly argued for going further to near-real-time reporting.

⚠️ **The practical consequences a risk team must plan for, and the thing to say if asked what you would do about it:**

1. **Your bureau attributes change meaning at the changeover.** A "trades opened in last 30 days" variable computed on fortnightly data and the same variable on weekly data are different variables. Scorecards built on the old cadence will drift.
2. **PSI and CSI will fire on this**, and it will look like population shift when it is actually a data-frequency artefact. Anyone monitoring stability across 1 July 2026 needs to know this before they diagnose a model problem that does not exist.
3. **Delinquency appears to worsen slightly and cure appears to accelerate**, purely because both are now observed sooner.
4. Operationally, reporting moves from a monthly batch task to a near-continuous discipline, and lenders with legacy reporting stacks are the ones that will show data-quality failures first.

🔴 That second point is the kind of observation that makes an interviewer sit up. It is a genuine, dateable, near-term model-monitoring risk in the Indian market, and almost nobody volunteers it.

## 7.3 Account Aggregator

An RBI-regulated, consent-based framework for sharing financial information. Account Aggregators are licensed as **NBFC-AAs**. The consent artefact is **specific, time-limited, purpose-bound and revocable** — the borrower can withdraw it during the sharing period.

Its significance for credit risk is that it makes **bank statement data** available as a structured, verified feed rather than a PDF upload. That is the raw material for cash-flow-based underwriting, and it is what allows an HFC or NBFC to lend against inferred income at scale rather than one file at a time.

## 7.4 Unified Lending Interface

Piloted from 2023, announced publicly in August 2024, positioned by the RBI as the third element of a "new trinity" alongside JAM and UPI.

ULI is a **consent-based data exchange with standardised plug-and-play APIs**, pulling from Aadhaar e-KYC, PAN validation, state land records, GST filings, Account Aggregator feeds and the credit bureaus — so a lender integrates once rather than building a separate connection to each source. It is explicitly **not a permanent data repository**; it is a controlled channel. The design target is agri and MSME credit, and the case most often cited is the tenant farmer whose identity for lending purposes is established through intended fund use rather than land title.

`[VERIFY]` I could not establish current national rollout scale — participating lender count or disbursement volume — from a primary source. Treat ULI as directionally important and operationally uncertain. Do not quote a volume figure you have not verified against an RBI release.

## 7.5 The DPDP tension 

India's **Digital Personal Data Protection Act** sits over all of the above, and being RBI-compliant does not make a lender DPDP-compliant. Three tensions matter for a credit risk function:

1. **Retention conflict.** KYC Master Directions and PMLA require retaining identity and transaction records for defined periods, commonly five to ten years. DPDP gives a data principal erasure rights after the relationship ends. These pull in opposite directions and the resolution is not fully settled.
2. **Purpose limitation over bureau reporting.** Reporting to the CICs is governed by CICRA 2005; DPDP adds consent and purpose-limitation obligations on top of the same data flow.
3. **Triple breach notification.** One incident can require notification to the **Data Protection Board of India** under DPDP, to the **RBI** under its cybersecurity framework, and to **CERT-In** under its directions — three regimes, three timelines, three content requirements.

And the operational one that bites digital lenders: a lending app may request a device permission only where a specific, necessary purpose ties it to the loan workflow. Blanket contacts or gallery access for underwriting convenience or recovery leverage is restricted under the digital lending framework and is now a statutory consent violation on top.

**► SAY THIS**
> "The data layer is the part of this market that's actually world-class and it's about to get better. Four statutory bureaus, mandatory reporting under CICRA, and from 1 July 2026 the reporting cadence moved from fortnightly to four reference dates a month — the 9th, 16th, 23rd and month-end. That halves the stacking window, which is where a lot of small-ticket unsecured stress originates. The thing I'd flag to a model risk team is that bureau attributes computed on velocity change meaning at that changeover, so stability indices will fire in the second half of 2026 and it will look like population shift when it's a data-frequency artefact."

---
