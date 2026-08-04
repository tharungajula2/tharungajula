---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "03"
volumeSlug: "the-measurement-layer"
volumeTitle: "THE MEASUREMENT LAYER"
order: 6
title: "FROM DELINQUENCY TO LOSS"
slug: "6-from-delinquency-to-loss"
sectionNumber: "6"
part: null
kind: "narrative"
sourceFile: "CR_03_THE_MEASUREMENT_LAYER.md"
tags: []
hasSayThis: true
wordCount: 723
status: "raw"
section: "§6"
summary: ""
enriched: false
---

# §6 · FROM DELINQUENCY TO LOSS

Delinquency is not loss. Everything so far measures accounts moving between states; none of it yet says what any of that costs.

## 6.1 The decomposition

> **Expected Loss = PD × LGD × EAD**

- **PD** — probability of default. What §3 and §4 measure.
- **LGD** — loss given default. The share of exposure not recovered.
- **EAD** — exposure at default. The balance outstanding when default occurs.

📘 **Why the same PD produces wildly different losses in Indian retail**, and this is where Document 02 §7.2 pays off. Under a **pledge** the lender already holds the asset — gold — so realisation is fast and LGD is low. Under **hypothecation** the lender must repossess — vehicles — so LGD is moderate and, importantly, *observable*, which is why Document 01 §2.4 showed auto PAR 180+ halving to 1.9% as the recovery machinery worked. Under a **mortgage** the lender must enforce through a legal process, so LGD is low in principle and slow in practice. **Unsecured has no realisation route at all** — only settlement, which is why unsecured LGD is high and why Document 01's unsecured deep buckets are sticky.

Same delinquency. Four completely different losses.

## 6.2 The two things that make LGD hard

**1. Timing.** Recovery arrives over years, and money arriving in year three is worth less than money arriving in month three. LGD must be computed on **discounted** recoveries, and the discount convention matters. A shop computing undiscounted recovery rates is understating LGD, sometimes badly.

**2. Cost.** Collections effort, legal fees, repossession, storage, auction costs and the internal cost of the workout team all reduce net recovery. LGD net of costs is the only version that means anything.

⚠️ **And the observation problem that dominates in India right now.** LGD requires *completed* workouts — accounts that defaulted and whose recovery process has finished. In a book that has grown as fast as Document 01 describes, the population of completed workouts is small, old, and drawn from a portfolio written under different policy. **LGD is the weakest-evidenced component of every Indian retail ECL model, and a candidate who volunteers that is showing real familiarity rather than recited theory.**

## 6.3 EAD, and why it is not just "the balance"

For an amortising term loan, EAD is close to the outstanding balance and is nearly a solved problem.

For a **revolving** facility — credit cards, overdrafts — it is not, because a borrower heading toward default **draws down**. Exposure at default is systematically higher than the balance today, and the gap is captured by the **credit conversion factor** applied to the undrawn limit.

🧮 A card with a ₹2,00,000 limit and ₹60,000 drawn has ₹1,40,000 undrawn. At a 40% CCF, EAD is ₹60,000 + (0.40 × ₹1,40,000) = **₹1,16,000** — nearly double the current balance. **This is a large part of why credit cards carry the highest capital charge and the highest realised loss severity in retail**, and it is the quantitative content behind Document 01 §2.5.

## 6.4 The loss curve

Combine vintage analysis with loss rather than delinquency and you get the **static pool loss curve**: cumulative net loss on an origination cohort as a function of months on book, expressed as a percentage of the original disbursed amount.

This is the most useful single chart for pricing, because it answers the question pricing actually asks: **over the life of ₹100 lent in this segment through this channel, how much do we lose, and when?** Set against the yield and the cost of funds, it gives risk-adjusted return by segment — which is what a cut-off is supposed to be calibrated to.

**► SAY THIS**
> "Delinquency isn't loss, and the gap is where the Indian products actually differ. Same PD, four different LGDs depending on the realisation route — pledge, hypothecation, mortgage, unsecured — which is the quantitative version of why gold behaves as it does and why unsecured deep buckets don't clear. On EAD, for revolving facilities today's balance understates exposure at default because distressed borrowers draw down, so you need a credit conversion factor on the undrawn limit. And I'd be honest that LGD is the weakest-evidenced component in most Indian books right now, because it needs completed workouts and a fast-growing portfolio doesn't have many."

---
