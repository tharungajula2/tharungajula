---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "03"
volumeSlug: "the-measurement-layer"
volumeTitle: "THE MEASUREMENT LAYER"
order: 2
title: "THE UNIT PROBLEM"
slug: "2-the-unit-problem"
sectionNumber: "2"
part: null
kind: "narrative"
sourceFile: "CR_03_THE_MEASUREMENT_LAYER.md"
tags: []
hasSayThis: false
wordCount: 404
status: "raw"
section: "§2"
summary: ""
enriched: false
---

# §2 · THE UNIT PROBLEM

Before any technique: what exactly are you counting? Getting this wrong invalidates everything downstream, and it is where careless analysis is most easily caught.

## 2.1 Three possible units, three different answers

**By value.** Delinquent balance over total balance. The default for provisioning and for anything that hits the P&L.

**By account.** Delinquent accounts over total accounts. The default for operational and collections work — a collections floor works accounts, not rupees.

**By borrower.** Distinct borrowers with any delinquent facility. The regulatory unit for SMA and NPA classification, per Document 02 §9.2.

🧮 These diverge sharply in Indian retail, and Document 01 tells you exactly why. Personal loans: 1,224 lakh accounts against ₹16.5 lakh crore, so about 89% of origination volume sits under ₹1 lakh while about 36% of value sits above ₹10 lakh. A value-weighted delinquency and an account-weighted delinquency on that book are measuring two nearly disjoint populations.

✅ **The check:** whenever value-weighted and account-weighted delinquency diverge, the divergence *is* the finding. It tells you the risk is concentrated at one end of the ticket distribution, and which end.

## 2.2 Numerator and denominator discipline

Four questions, every time — the same four from Document 01 §1.3, now applied inside a portfolio rather than across sources:

1. **Does the denominator include written-off accounts?** Document 02 §11.4. If it does not, the ratio improves every time you write something off.
2. **Does it include closed and matured accounts?** A denominator that drops paid-off loans while keeping bad ones inflates the ratio; one that keeps everything deflates it.
3. **Is it a point-in-time balance or an average?**
4. **Is the numerator the delinquent *balance* or the delinquent *instalment*?** Standard practice is the full outstanding balance of a delinquent account, not just the overdue amount — but not everyone does it that way and the two differ by an order of magnitude.

🔴 **The trap Document 01 §2.5 named, restated formally.** In a **shrinking** book the denominator falls, so a ratio can rise with zero new stress. In a **growing** book the denominator rises, so a ratio can fall with zero improvement. **A ratio is only interpretable alongside the absolute rupee value of its numerator.** Credit cards in Document 01 — balances flat, issuance down 15%, early buckets improving — is exactly this situation and is the reason I insisted on putting the rupee number next to it.

---
