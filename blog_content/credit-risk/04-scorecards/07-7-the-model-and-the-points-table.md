---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 7
title: "THE MODEL AND THE POINTS TABLE"
slug: "7-the-model-and-the-points-table"
sectionNumber: "7"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: false
wordCount: 442
status: "raw"
section: "§7"
summary: ""
enriched: false
---

# §7 · THE MODEL AND THE POINTS TABLE

## 7.1 Logistic regression, briefly

Fit on the WoE-transformed variables:

> **ln( p / (1 − p) ) = β₀ + β₁·WoE₁ + β₂·WoE₂ + … + βₖ·WoEₖ**

where *p* is the probability of bad. The left side is the **log-odds**, and the reason logistic regression suits this problem is that it models a bounded probability as an unbounded linear combination — so the additive structure that makes a points table possible is a property of the model, not a simplification of it.

Because the inputs are WoE-transformed, the coefficients are directly comparable, and **βᵢ × WoEᵢ** is the contribution of characteristic *i* to the log-odds for a given applicant.

## 7.2 Scaling to points

Nobody hands a credit officer a log-odds. The model is rescaled to a familiar range using two chosen anchors and one chosen sensitivity.

📘 **The three parameters:**
- **Base score** — the score at which you want the anchor odds to sit.
- **Base odds** — the good:bad odds at that score.
- **PDO** — Points to Double the Odds. How many points correspond to a doubling of the odds of being good.

> **Factor = PDO / ln(2)**
> **Offset = Base Score − ( Factor × ln(Base Odds) )**
> **Score = Offset + Factor × ln(odds)**

🧮 **Worked.** Choose a base score of **600** at odds of **30:1**, with a **PDO of 20**.

> Factor = 20 / 0.6931 = **28.85**
> Offset = 600 − (28.85 × ln 30) = 600 − (28.85 × 3.4012) = 600 − 98.13 = **501.87**

Check it. At odds of 60:1 — double 30:1 — the score is 501.87 + 28.85 × ln(60) = 501.87 + (28.85 × 4.0943) = 501.87 + 118.12 = **620.0**. Exactly 20 points higher, as designed.

Distributing the offset across characteristics and combining with each βᵢ × WoEᵢ gives the additive points table: every band of every characteristic carries a whole number of points, and an applicant's score is the sum.

⚠️ **Two things about scaling that people get wrong.**

**Scaling is arithmetic, not modelling.** It changes nothing about discrimination or ranking. A model with a Gini of 0.42 has a Gini of 0.42 on any scale. Choosing a 300–900 range because bureau scores use it is a communication decision.

**PDO is a design choice with a real consequence.** A small PDO spreads the population across a wide score range and makes the cut-off sensitive; a large PDO compresses it. It should be chosen so the operating range of the portfolio spans a sensible number of points, not copied from another institution.

---
