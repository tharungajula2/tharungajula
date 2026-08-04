---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "02"
volumeSlug: "the-loan-lifecycle"
volumeTitle: "THE LOAN LIFECYCLE"
order: 4
title: "STAGE 3 — FRAUD SCREENING"
slug: "4-stage-3-fraud-screening"
sectionNumber: "4"
part: null
kind: "narrative"
sourceFile: "CR_02_THE_LOAN_LIFECYCLE.md"
tags: []
hasSayThis: true
wordCount: 807
status: "raw"
section: "§4"
summary: ""
enriched: false
---

# §4 · STAGE 3 — FRAUD SCREENING

## 4.1 The decision

Is this application honest? Distinct from Stage 4, which asks whether an honest applicant can repay.

📘 **The distinction that must be clean in your head.**
- **Credit risk** — the borrower intended to repay and could not.
- **First-party fraud** — the borrower never intended to repay. Application fraud, identity manipulation, "never-pay" accounts that default on the first or second EMI.
- **Third-party fraud** — someone else used this borrower's identity.

These require different models, different treatments and different accounting. And they contaminate each other: **first-party fraud sitting inside a credit portfolio inflates your PD estimates and corrupts your scorecard**, because the model is being trained to predict repayment behaviour on accounts where repayment was never contemplated. First-payment default and early-payment default are the standard proxies used to strip fraud out of a credit development sample, and doing so is a routine step in scorecard building.

## 4.2 The framework 

The **Master Directions on Fraud Risk Management**, three near-identical sets issued **15 July 2024** — for commercial banks and AIFIs, for cooperative banks, and for NBFCs including HFCs. They superseded the 2016 monitoring-of-frauds direction and consolidated a large number of earlier circulars.

Applicability for NBFCs: upper layer, middle layer, and base layer with asset size of **₹500 crore and above**.

The architecture:

**1. Board-level ownership.** A special committee of the board, a defined fraud risk management function, and internal audit engagement — fraud governance is not delegable to an operations team.

**2. Early Warning Signals and Red Flagging of Accounts.** EWS must be integrated with core systems so transactions are monitored rather than reviewed. An account — standard or NPA — may be red-flagged at the individual institution's level, with the status reported on **CRILC within seven days**. Once red-flagged, the decision to classify as fraud or not must be taken **within 180 days**.

**3. Principles of natural justice, and this is the part to know.** Following the Supreme Court's judgment of 27 March 2023 in *State Bank of India & Ors. v. Rajesh Agarwal & Ors.*, the directions expressly require compliance with natural justice in a time-bound manner before any person or entity is classified as fraud. In practice: a **reasoned show-cause notice** and a **fair opportunity to be heard**.

🔴 **Why this is asked.** The consequences of a fraud classification for a borrower are severe — reporting to law enforcement, exclusion from credit, reputational destruction. The Supreme Court held that a decision with those consequences cannot be taken *ex parte*. A candidate who can name the case and state the principle demonstrates that they read circulars rather than summaries. A candidate who describes fraud classification as a purely internal determination has just revealed the opposite.

**4. Scope of who can be investigated.** Not only borrowers and their promoters and whole-time directors, but third-party service providers and professionals — valuers, chartered accountants, advocates, architects. Non-whole-time directors, being ordinarily not responsible for the conduct of business, are treated differently.

**5. Technology and ecosystem coordination.** The directions explicitly require a data-analytics and market-intelligence driven approach, and engagement with the RBI's digital fraud infrastructure, including the Central Payments Fraud Information Registry and the national cyber-fraud reporting ecosystem.

## 4.3 What fraud screening actually consists of in a retail shop

- **Deduplication** against the lender's own historical applications and known-fraud negative list.
- **Bureau-based checks** — enquiry velocity, mismatched demographics across trades, thin files with sudden activity.
- **Device and behavioural signals** in digital channels — device fingerprint reuse, form-fill telemetry, geolocation inconsistency, application velocity from a single device or IP.
- **Document authenticity** — increasingly a machine-vision problem, and increasingly hard as generative tools improve.
- **Cross-referencing** verified sources: PAN validation, Aadhaar demographic authentication, CKYC, GST filings, bank statement data via Account Aggregator.

⚠️ The RBI's June 2026 Financial Stability Report flags **AI-driven cyber threats, deepfakes and voice cloning** as a live systemic concern. This is the fastest-moving control problem in the lifecycle, and the one where your technical background is most directly relevant. Document verification and liveness detection were solved problems for about a decade; they no longer are.

**► SAY THIS**
> "Fraud and credit risk look similar in the data and need to be separated before any modelling. First-party fraud — where repayment was never intended — sits inside the default population and corrupts a PD model, because you're training on accounts where the behavioural relationship you're trying to learn doesn't exist. The standard handle is first-payment and early-payment default as a proxy to strip them out. On the regulatory side, the July 2024 Fraud Risk Management Directions are the current instrument, and the thing to know is that after *SBI v. Rajesh Agarwal* a fraud classification requires a reasoned show-cause notice and a hearing — it can't be an internal determination."

---
