---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "07"
volumeSlug: "stress-testing-and-capital-planning"
volumeTitle: "STRESS TESTING AND CAPITAL PLANNING"
order: 7
title: "CAPITAL PLANNING"
slug: "7-capital-planning"
sectionNumber: "7"
part: null
kind: "narrative"
sourceFile: "CR_07_STRESS_TESTING_AND_CAPITAL_PLANNING.md"
tags: []
hasSayThis: false
wordCount: 700
status: "raw"
section: "§7"
summary: ""
enriched: false
---

# §7 · CAPITAL PLANNING

## 7.1 The cycle

> **Business plan → RWA projection → capital demand → capital supply → gap → reallocate or raise**

**Business plan.** Growth by product, segment and geography.

**RWA projection.** Apply the risk-weight framework of Document 06 §7 to the planned book. **From 1 April 2027 this becomes materially harder**, because risk weight now depends on LTV bands, borrower-level system-wide housing loan counts, and twelve-month transactor status — so projecting RWA requires projecting the **composition** of the book at a granularity most planning processes have never needed.

**Capital demand.** Required ratio × projected RWA, plus buffers, plus the ICAAP add-on for Pillar 2 risks, plus management's own operating headroom above requirement.

**Capital supply.** Opening capital, plus retained earnings, less dividends, plus any planned issuance — and AT1 and Tier 2 instruments count toward total CRAR but not CET1.

**The gap.** If demand exceeds supply, three levers: raise capital, reduce growth, or **change the mix**.

✅ **The third lever is where a credit risk analyst earns their keep**, and it is worth saying so. Growing a 30%-risk-weight mortgage book consumes roughly a quarter of the capital of growing a 125%-risk-weight personal loan book of the same size. Mix is a capital decision before it is a commercial one, and the person who can quantify that trade sits in a different conversation from the person who reports delinquency.

## 7.2 RAROC — and a result that surprises people

📘 **Risk-Adjusted Return on Capital.** Net risk-adjusted margin divided by the capital the exposure consumes. The standard tool for comparing products that carry different risk *and* different capital intensity.

🧮 **Worked, using Document 06's new risk weights. All rates illustrative.**

**Product A — prime home loan.** Risk weight 30%.

| | |
|:--|--:|
| Yield | 8.50% |
| Less cost of funds | (6.50%) |
| Less operating cost | (0.50%) |
| Less expected loss — **at the prudential floor** | (0.40%) |
| **Net margin** | **1.10%** |
| Capital consumed = 11.9% × 30% | **3.57%** |
| **RAROC** | **30.8%** |

**Product B — unsecured personal loan.** Risk weight 125%.

| | |
|:--|--:|
| Yield | 16.00% |
| Less cost of funds | (6.50%) |
| Less operating cost | (2.50%) |
| Less expected loss — modelled | (3.40%) |
| **Net margin** | **3.60%** |
| Capital consumed = 11.9% × 125% | **14.88%** |
| **RAROC** | **24.2%** |

🔴 **The home loan wins, despite a net margin one-third the size of the personal loan's** — because it consumes less than a quarter of the capital.

**This is the single most useful thing in this document for understanding why banks behave as they do**, and it explains Document 01's entire growth pattern more precisely than any commentary about risk appetite. Capital-intensive lending must clear a much higher margin hurdle to be worth writing, and after the November 2023 risk-weight action it frequently did not. **The book grew where capital was cheap because RAROC said so.**

⚠️ **And a second-order effect straight out of Document 06 §5.2.** Notice that Product A's expected loss was taken at the **prudential floor of 0.40%**, not at its modelled 0.07%. Use the modelled figure and the net margin becomes 1.43% and RAROC rises to **40.1%**.

**So where the floor binds, RAROC computed off reported provisions understates the true economic return by roughly a third.** A bank that allocates capital off floored provisions will systematically under-invest in its best-quality segments. **Use modelled expected loss for pricing and allocation; use the floor for reporting.** Confusing the two has a direct, quantifiable cost.

## 7.3 The buffer above requirement

No bank runs at its regulatory minimum. Management sets an internal target well above it, for three reasons: **rating agencies** price off headroom; **market confidence** punishes thin buffers regardless of compliance; and **optionality** — headroom is what lets you grow, or acquire, without a capital raise.

Which is why the system's 17.7% CRAR against an ~11.9% maximum requirement is not inefficiency. **It is the price of strategic freedom**, and it is also the reason the FSR's stress results come out as comfortably as they do.

---
