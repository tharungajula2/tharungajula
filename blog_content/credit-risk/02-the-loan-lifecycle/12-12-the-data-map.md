---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "02"
volumeSlug: "the-loan-lifecycle"
volumeTitle: "THE LOAN LIFECYCLE"
order: 12
title: "THE DATA MAP"
slug: "12-the-data-map"
sectionNumber: "12"
part: null
kind: "narrative"
sourceFile: "CR_02_THE_LOAN_LIFECYCLE.md"
tags: []
hasSayThis: false
wordCount: 457
status: "raw"
section: "§12"
summary: ""
enriched: false
---

# §12 · THE DATA MAP

This is the section that connects everything you already know technically to everything in this document. Each stage leaves a data artefact; each artefact supports a model.

| Stage | Data generated | Model that sits on it |
|:--|:--|:--|
| 1 Sourcing | Channel, partner ID, campaign, offer terms | Response and propensity models; channel vintage analytics |
| 2 Identity | KYC record, CKYC identifier, demographics | Dedupe and entity resolution |
| 3 Fraud | Device, telemetry, dedupe hits, bureau enquiry velocity | Application fraud models; EWS |
| 4 Assessment | **Bureau pull, income, FOIR, LTV, policy flags** | **Application scorecard — PD at origination** |
| 5 Decision | Score band, decision, deviation flag, approver, price | Cut-off optimisation; deviation performance analytics |
| 6 Documentation | Security type, valuation, registration, mandate | LGD inputs — collateral and enforceability |
| 7 Disbursal | Amount, date, tranche, beneficiary | EAD baseline; FPD/EPD fraud detection |
| 8 Servicing | **Payment history, bounce, DPD string, utilisation, refreshed bureau** | **Behavioural scorecard; EWS; Ind AS staging / SICR** |
| 9 Collections | Contact attempts, promises to pay, treatment applied, outcome | Collection scorecard; roll-rate and cure models |
| 10 Classification | IRAC status, provision, recovery, write-off, settlement | **LGD; ECL; Basel PD/LGD/EAD; vintage and loss curves** |

📘 **The observation that reorganises how you think about all of it.** Notice that the *target variable* for every model at Stages 1 to 7 is generated at Stages 8 to 10. An application scorecard built today cannot be validated until the accounts it approved have had twelve to eighteen months to perform.

**This is the defining constraint of credit risk modelling, and it has three consequences you should be able to state:**

1. **You are always modelling the past.** The relationship you fit was true for a cohort originated at least a year ago, under different policy, different pricing, and a different economy.
2. **Rejected applicants are never observed.** You only see the performance of loans you approved, which is a censored sample — and correcting for it is the reject-inference problem.
3. **Model degradation is invisible until it is expensive.** By the time the performance data proves a scorecard has drifted, you have written a year of business on it. Which is why stability monitoring — PSI, CSI, and score distribution tracking — is not a compliance exercise; it is the only early warning you have.

⚠️ And it is why Document 01 §7.2's warning is operational rather than theoretical. **A change in bureau reporting cadence on 1 July 2026 changes the meaning of velocity attributes in models whose performance window closed long before that date.**

---
