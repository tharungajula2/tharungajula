---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "02"
volumeSlug: "the-loan-lifecycle"
volumeTitle: "THE LOAN LIFECYCLE"
order: 3
title: "STAGE 2 — APPLICATION AND IDENTITY"
slug: "3-stage-2-application-and-identity"
sectionNumber: "3"
part: null
kind: "narrative"
sourceFile: "CR_02_THE_LOAN_LIFECYCLE.md"
tags: []
hasSayThis: true
wordCount: 814
status: "raw"
section: "§3"
summary: ""
enriched: false
---

# §3 · STAGE 2 — APPLICATION AND IDENTITY

## 3.1 The decision

Is this applicant a real, identifiable, sanctions-clean person, and do we have a verified record of that? Everything downstream — the bureau pull, the fraud check, the enforceability of the contract — depends on identity being right.

## 3.2 The KYC framework 

Governed by the **RBI Master Direction on KYC**, originally dated 25 February 2016 and amended repeatedly, most materially through 2025. The statutory base is the **Prevention of Money-Laundering Act, 2002** and the PML Rules, 2005; the international anchor is the FATF recommendations.

**Three tiers of customer due diligence**, applied on a risk basis:

| Tier | Applied to | Character |
|:--|:--|:--|
| **Simplified (SDD)** | Low-risk relationships | Minimum documentation |
| **Standard (CDD)** | The general case | Full identification and verification |
| **Enhanced (EDD)** | High-risk customers, PEPs, unusual transaction patterns | Additional scrutiny, source-of-funds enquiry |

**The onboarding modes, and the distinction that matters:**

- **Face-to-face** — in person, using Aadhaar biometric e-KYC or the digital KYC process.
- **Non-face-to-face** — Aadhaar **OTP**-based e-KYC, KYC identifier from CKYCR, equivalent e-documents, DigiLocker-issued documents. Subject to conditions: strict account monitoring, and full CDD to be completed within a year.
- **V-CIP** — video-based customer identification process, a live, secure, consent-based audio-visual interaction with an authorised official.

🔴 **The distinction candidates get wrong.** **V-CIP is treated on par with face-to-face onboarding. OTP-based e-KYC is not.** OTP e-KYC carries transaction limits — commonly cited as a ₹1 lakh annual cap — and requires the relationship to be regularised. This is why a digital lender that wants to write anything beyond small-ticket must run V-CIP rather than OTP e-KYC, and it is a real constraint on product design, not a compliance footnote.

**CKYCR.** The Central KYC Records Registry, operated by CERSAI. Records must be uploaded within a short prescribed window of account opening — commonly stated as three working days — and a KYC identifier can then be reused across relationships instead of collecting documents afresh. Consent is required to fetch and upload.

## 3.3 The 2025 amendments and the deadline that just passed

The June 2025 amendment directions (RBI/2025-26/51, dated 12 June 2025) changed periodic updation materially:

- **Risk-based re-verification intervals** replacing fixed cycles: broadly every **two years for high-risk, eight for medium, ten for low-risk** customers, unless particulars change.
- **Self-declaration suffices** where KYC particulars are unchanged; updation can be done at any branch where the customer holds an account.
- **Business correspondents** may be leveraged for self-declaration on unchanged particulars and address updates — and, under the same amendment, may offer V-CIP.
- **A prescribed communication regime**: three advance intimations including at least one by letter before the due date, and three reminders including at least one by letter after it, all recorded in-system for audit trail, and all setting out the escalation mechanism and consequences.
- **Relief for low-risk individuals** whose periodic updation had already fallen due: complete within one year of the due date **or by 30 June 2026, whichever is later**, with accounts under regular monitoring in the interim.

⚠️ `[VERIFY]` That 30 June 2026 backstop fell one month before this document's as-at date. Whether it was extended again, and what the consequence now is for accounts still not updated, I have not confirmed. This is exactly the kind of live date that a candidate should either know or explicitly flag as needing checking — and flagging it is much better than guessing.

## 3.4 The credit-risk consequence of KYC that nobody teaches

KYC is usually taught as a compliance topic. It is also a **data quality** topic, and that is where it touches your work.

The identity record created here is the join key for everything else. If the PAN is wrong, the bureau pull returns the wrong file or no file. If the address is stale, collections cannot reach the borrower and your recovery assumptions are wrong. If the same person exists twice in your systems under two identifiers, your exposure-at-default is understated and your concentration limits are meaningless.

✅ **The check.** When a portfolio's bureau hit rate, address-reachability rate, or dedupe match rate is poor, the problem usually originated in onboarding — and no amount of model work downstream will repair it.

**► SAY THIS**
> "KYC gets filed under compliance, but for a risk team it's a data-quality control. The identity record is the join key to the bureau, to dedupe, and to collections reachability. If onboarding is producing weak identifiers, you get lower bureau hit rates, undetected duplicate exposure and unreachable accounts in collections — and those show up as model problems when they're actually onboarding problems. The distinction I'd hold onto operationally is that V-CIP is on par with face-to-face while OTP-based e-KYC isn't, which is a genuine constraint on what a digital lender can write."

---
