---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "07"
volumeSlug: "stress-testing-and-capital-planning"
volumeTitle: "STRESS TESTING AND CAPITAL PLANNING"
order: 2
title: "THE CAPITAL STACK"
slug: "2-the-capital-stack"
sectionNumber: "2"
part: null
kind: "narrative"
sourceFile: "CR_07_STRESS_TESTING_AND_CAPITAL_PLANNING.md"
tags: []
hasSayThis: false
wordCount: 547
status: "raw"
section: "§2"
summary: ""
enriched: false
---

# §2 · THE CAPITAL STACK

Reproduce this from memory. India's numbers differ from Basel's, and knowing that difference is a cheap and reliable signal of familiarity.

## 2.1 The requirements 

| Component | India | Basel III global minimum |
|:--|--:|--:|
| Minimum CET1 | **5.5%** | 4.5% |
| Minimum Tier 1 | **7.0%** | 6.0% |
| **Minimum total CRAR** | **9.0%** | **8.0%** |
| Capital conservation buffer (CET1) | **2.5%** | 2.5% |
| Countercyclical buffer (CET1) | **0% – 2.5%, currently 0** | 0 – 2.5% |
| D-SIB surcharge (CET1) | **0.20% – 1.00% by bucket** | — |

📘 **India runs a full percentage point above Basel on total CRAR** — 9% against 8% — and correspondingly higher on CET1 and Tier 1. This is a long-standing conservatism, and it is the direct reason the system's reported CRAR of 17.7% (Document 01 §5.1) sits so far above requirement.

🧮 **The effective requirement, worked.**

For a **non-D-SIB** bank: CET1 of 5.5% + 2.5% CCB = **8.0%**. Total CRAR of 9.0% + 2.5% = **11.5%**.

For the three D-SIBs, adding the surcharge:

| Bank | Effective CET1 | Effective total CRAR |
|:--|--:|--:|
| SBI | **8.30%** | **11.90%** |
| HDFC Bank | **8.10%** | **11.70%** |
| ICICI Bank | **7.95%** | **11.55%** |

Now set that against the system position at March 2026 from Document 01 §5.1 — **CRAR 17.7%, CET1 15.3%.** Even the most demanding institution carries roughly **5.8 percentage points** of CRAR headroom over its requirement.

✅ **Which is the answer to "is the Indian banking system well capitalised?"** Not "yes." Rather: *the system holds roughly six percentage points of CRAR above the highest applicable requirement, and the RBI's own severe stress scenario — GNPA rising to 8.1% — puts only four banks representing 12% of assets below the minimum.* That is a specific, sourced, quantified answer.

## 2.2 What a buffer actually is

🔴 **The most commonly misunderstood thing about the CCB, and it is worth being precise.** A buffer is **not** a minimum. It is capital you are **expected to use** in bad times — that is its entire purpose.

Breaching a buffer is not a breach of the minimum requirement and does not, by itself, make a bank non-compliant. What it triggers is **restrictions on discretionary distributions**: dividends, share buybacks and staff bonuses are constrained on a sliding scale as the buffer depletes. The deeper into the buffer, the higher the proportion of earnings that must be conserved.

📘 **So the design intent is that in a downturn a bank draws down its buffer, stops paying dividends, keeps lending, and rebuilds from retained earnings.** The failure mode the design is guarding against is banks deleveraging to protect their ratios — cutting credit precisely when the economy needs it — which is what happened in 2008.

⚠️ **And the well-documented problem with it in practice:** banks are reluctant to use buffers, because a visible drawdown invites market and analyst punishment even where it is exactly what the regulator intended. So buffers behave more like minimums than they are supposed to. This is a genuine, live debate in international regulation, and being aware of it distinguishes a candidate who has read around the subject.

---
