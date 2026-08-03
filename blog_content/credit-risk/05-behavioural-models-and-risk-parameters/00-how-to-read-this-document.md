---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "05"
volumeSlug: "behavioural-models-and-risk-parameters"
volumeTitle: "BEHAVIOURAL MODELS AND RISK PARAMETERS"
order: 0
title: "HOW TO READ THIS DOCUMENT"
slug: "how-to-read-this-document"
sectionNumber: null
part: null
kind: "front"
sourceFile: "CR_05_BEHAVIOURAL_MODELS_AND_RISK_PARAMETERS.md"
tags: []
hasSayThis: false
wordCount: 839
status: "raw"
section: ""
summary: ""
enriched: false
---

*The models that live on the book rather than at the door — and the three parameters everything downstream is built from. Behavioural and collection scoring, PD calibration and term structure, LGD from completed workouts, EAD and credit conversion factors.*

**As-at date: 29 July 2026.** Tags per Document 00.

---

## HOW TO READ THIS DOCUMENT

Document 04 built the model that decides who gets in. This document builds the models that tell you **what the book is worth** — and it is the hinge of the whole set. Everything in Document 06 (ECL, IFRS 9, capital) is arithmetic performed on the three numbers produced here.

The shape of it: §1 to §3 are models, §4 to §6 are parameters, §7 assembles them. The parameters are where the money is and where the weak evidence is, and a candidate who can say **which** of the three is least reliable in an Indian book, and why, is demonstrating something a textbook cannot teach.

> **The one sentence that organises this document**
>
> An application scorecard asks *who is this person?* A behavioural model asks *what have they done since?* — and the second question is answerable with far more information, which is why the strongest predictor of an account's future is almost always its own recent past, not the file it was opened with.

---

## UPDATES SINCE DOCUMENT 04

Three items, one of which is directly a Document 05 topic.

### ⚠️ Partially closed — the prudential floors 

Document 03 opened a `[VERIFY]` on the product-wise prudential floors under the 2026 ACPIR Directions. What I can now report, from secondary sources rather than the Directions themselves:

- **Stage 1** minimum floor for standard corporate and retail exposures reported at **0.40%**.
- **Stage 2** floor reported at a minimum of **1%** of Stage 2 exposure.
- **Stage 3** floors vary by **asset class and duration of default**, and are set so that ECL cannot produce a provision lower than the existing IRAC schedule.
- Floors are **product-wise** and apply across retail, corporate, MSME, agriculture and real estate. Banks lobbied for lower floors; the RBI held.

`[VERIFY]` These figures come from commentary, not from paragraph-level reading of the Directions. **Do not quote them as precise in a room without checking.** The structural point — that floors exist, are product-wise, and bind regardless of what your model says — is solid.

📘 **Why the floors matter for this document specifically.** A prudential floor is a statement that **the regulator does not fully trust your parameters.** If your PD × LGD × EAD produces less than the floor, the floor wins. That caps the downside of model error but it also caps the benefit of good modelling — and it means the practical question in a low-risk product is often not "what does our model say" but "does our model produce anything above the floor at all."

### ✅ New — DLG can now enter ECL for NBFCs 

The **RBI (Non-Banking Financial Companies – Income Recognition, Asset Classification and Provisioning) Amendment Directions, 2026** inserted new paragraphs 36A to 36C into the 2025 Directions, permitting an NBFC to **consider a Default Loss Guarantee when determining ECL provisions across all stages** — subject to Ind AS requirements, which among other things require the DLG to be **integral to the contractual terms of the loan** and **not recognised separately**. Disclosure follows Ind AS 1. And because DLG cover reduces on every invocation, **ECL must be recomputed as the cover depletes.**

🔴 **Read this against Document 02 §4.1's DLG trap, because the two are easily confused and the distinction is exactly the sort of thing a good interviewer probes.**

- **For asset classification**, DLG changes nothing. The RE remains the lender of record, classifies and provisions the asset on its own books, and cannot use the guarantee to justify weaker underwriting.
- **For ECL measurement**, DLG may now be recognised — but only where it is integral to the loan contract, and it depletes as it is invoked.

**The guarantee affects what you expect to lose. It does not affect whose loan it is.** That is the whole distinction, and it lands in this document because DLG is fundamentally an **LGD** question — §5.6.

### ✅ New — the NBFC 90-day glide path is complete 

The phased migration of NBFCs to 90-day NPA recognition **completed on 31 March 2026**. No extension, no transition relief remaining. Alongside it, the **NBFC IRACP Directions, 2025**, effective 28 November 2025, consolidated all NBFC prudential norms into a single standalone instrument for the first time.

⚠️ **The measurement consequence, which belongs here rather than in Document 02.** Any NBFC PD model built on data spanning that glide path is built on a **moving default definition.** Cohorts from before completion were classified under a longer threshold. Pooling them with post-March-2026 cohorts without adjustment mixes two definitions of the target variable — a Document 03 §7.3 policy-era boundary, and a particularly consequential one because it changes the *label*, not just the population.

---
