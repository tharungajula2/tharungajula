---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "02"
volumeSlug: "the-loan-lifecycle"
volumeTitle: "THE LOAN LIFECYCLE"
order: 11
title: "STAGE 10 — CLASSIFICATION, PROVISIONING, RECOVERY, WRITE-OFF"
slug: "11-stage-10-classification-provisioning-recovery-write-off"
sectionNumber: "11"
part: null
kind: "narrative"
sourceFile: "CR_02_THE_LOAN_LIFECYCLE.md"
tags: []
hasSayThis: true
wordCount: 921
status: "raw"
section: "§11"
summary: ""
enriched: false
---

# §11 · STAGE 10 — CLASSIFICATION, PROVISIONING, RECOVERY, WRITE-OFF

## 11.1 The IRAC ladder 

Once an account crosses 90 days it becomes an NPA and enters the **Income Recognition, Asset Classification and Provisioning** framework.

| Classification | Condition |
|:--|:--|
| **Standard** | Performing |
| **Sub-standard** | NPA for up to 12 months |
| **Doubtful** | Remained sub-standard for 12 months |
| **Loss** | Identified as uncollectible, whether or not written off |

Provisioning percentages rise across that ladder and, in the doubtful category, with the age of the doubtful classification and the availability of security. Document 06 handles the schedules; the structure is what matters here.

**Income recognition.** Once an account is an NPA, interest **ceases to be recognised in income** on an accrual basis. This is the reason a rise in NPAs hits the profit and loss account twice — once through the provision, once through reversed and forgone interest.

## 11.2 The upgrade rule — the highest-frequency exam question in Indian credit risk

`[IN FORCE]` From the RBI's clarification of **12 November 2021**:

> **An account classified as NPA may be upgraded to "standard" only if the *entire* arrears of interest and principal are paid by the borrower.**

🔴 **Why this is asked constantly.** Before the clarification, lenders were upgrading accounts on receipt of partial payment, or on the DPD count falling back below 90. Both routes are now closed. Partial payment — one instalment, or interest only — does **not** upgrade the account. Combined with borrower-level classification, this means a borrower must clear **overdues across all facilities** to be upgraded.

The exception, which you should also state: accounts classified as NPA on account of **restructuring** or non-achievement of date of commencement of commercial operations remain governed by the specific instructions applicable to those cases.

📘 **The consequence for the portfolio, and it links directly back to Document 01 §2.3.** A strict upgrade rule means NPAs leave the book by being *paid in full*, *recovered*, *sold*, or *written off* — and rarely by curing. This is precisely why the deep buckets in Document 01 are sticky: personal loan PAR 180+ flat at 5.3%, credit card PAR 180+ at 6.9%. Those pools are not curing because the rule makes curing hard, and they are not leaving because the lender has not yet written them off.

## 11.3 Recovery routes

| Route | Applies to | Character |
|:--|:--|:--|
| **Repossession and sale** | Hypothecated assets — vehicles, durables | Operational, fast, well-priced; the reason auto LGD is observable |
| **Auction of pledged security** | Gold | Fastest and most certain; governed by the auction and transparency norms in the 2025 gold directions |
| **SARFAESI enforcement** | Secured immovable property | Notice under section 13(2) giving the borrower **60 days**, then possession; available to banks and to notified NBFCs and HFCs above prescribed thresholds |
| **Lok Adalat** | Small-value cases | Cheap, fast, consensual, and produces a decree |
| **Debt Recovery Tribunal** | Above prescribed value thresholds | Slower, adversarial |
| **Insolvency and Bankruptcy Code** | Corporate; personal guarantors, with the individual insolvency provisions phasing in | Collective process |
| **Sale to an ARC** | Any | Converts an uncertain future recovery into certain present cash at a discount |

`[VERIFY]` The current SARFAESI applicability thresholds for NBFCs and HFCs — by asset size and by loan size — have been revised more than once. Check the current notification before quoting a number.

## 11.4 Write-off, and the distinction that Document 01 turned on

Two kinds, and confusing them is a serious error:

**Technical or prudential write-off.** The asset is removed from the balance sheet for reporting purposes. **The borrower's liability continues.** Recovery action continues. The debt is not waived. This is what most Indian write-off headline numbers refer to.

**Waiver.** The claim is actually extinguished. Rare.

⚠️ **Why this matters enormously to everything in Document 01.** GNPA is measured *after* write-off. A written-off account leaves the GNPA numerator and the denominator of the advances book, while remaining a live claim against the borrower and frequently remaining visible on the bureau record. This is the largest single driver of the gap between the 1.8% system GNPA and the 5.3% personal-loan PAR 180+ that Document 01 §5.2 reconciled. And it is the mechanism behind Document 01 §3.3's second microfinance lesson: about 14.1% of MFIs' opening FY25 book was written off during the year, which is most of what "improving asset quality" meant in that sector.

✅ **The check, and it is worth making a habit.** Whenever you are shown an improving GNPA series, ask for the **write-off number and the recovery number** alongside it. A ratio that improves through removal is telling you about the lender's provisioning capacity, not about its borrowers.

**► SAY THIS**
> "The upgrade rule is the one I'd make sure I had exactly right: since the November 2021 clarification, an NPA upgrades to standard only on payment of the entire arrears of interest and principal — partial payment doesn't do it, and the DPD count falling below 90 doesn't do it — with a carve-out for accounts that became NPAs through restructuring or DCCO. That rule is why deep buckets in unsecured retail are sticky, because those pools can't cure their way out. And it's why I'd never read an improving GNPA series without the write-off number next to it, since a technical write-off removes the asset from the ratio while the borrower's liability continues."

---
