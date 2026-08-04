---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "02"
volumeSlug: "the-loan-lifecycle"
volumeTitle: "THE LOAN LIFECYCLE"
order: 1
title: "THE TEN STAGES"
slug: "1-the-ten-stages"
sectionNumber: "1"
part: null
kind: "narrative"
sourceFile: "CR_02_THE_LOAN_LIFECYCLE.md"
tags: []
hasSayThis: false
wordCount: 380
status: "raw"
section: "§1"
summary: ""
enriched: false
---

# §1 · THE TEN STAGES

| # | Stage | The decision | The control point |
|:--|:--|:--|:--|
| 1 | **Sourcing** | Who do we approach, and through whom? | Channel selection and conduct |
| 2 | **Application & identity** | Is this person who they claim to be? | KYC / CDD |
| 3 | **Fraud screening** | Is this application honest? | Deduplication, EWS, red-flagging |
| 4 | **Credit assessment** | Can and will they repay? | Policy rules, bureau, income assessment, scorecard |
| 5 | **Decision & pricing** | Yes/no, how much, at what rate, on what terms? | Approval matrix and deviation control |
| 6 | **Sanction & documentation** | Is the claim legally enforceable? | Security creation and perfection |
| 7 | **Disbursal** | Does the money reach the right place? | Disbursement controls, end-use |
| 8 | **Servicing & monitoring** | Is it performing, and is it about to stop? | Repayment mandate, DPD tracking, EWS |
| 9 | **Collections** | How do we cure this before it hardens? | Bucket strategy and agent conduct |
| 10 | **Classification, recovery, write-off** | What is it worth, and what do we book? | IRAC classification and provisioning |

📘 **The upstream principle, and it is the most useful heuristic in this document.** The cost of fixing a problem rises by roughly an order of magnitude at every stage you move downstream. A policy rule that rejects a bad application costs nothing. Catching the same borrower at Stage 3 costs a fraud investigation. At Stage 9 it costs a collections team. At Stage 10 it costs the principal. **Almost every "collections problem" is an underwriting problem that arrived late, and almost every "underwriting problem" is a sourcing problem that arrived late.**

⚠️ Which is why the first analytical question about any deteriorating portfolio is never "what are collections doing?" It is: **cut the delinquency by origination month, and by channel within origination month.** If the deterioration is concentrated in recent vintages, it is underwriting. If it is spread evenly across vintages, it is collections or the environment. Document 03 builds this properly; you should already know that this is the shape of the answer.

---
