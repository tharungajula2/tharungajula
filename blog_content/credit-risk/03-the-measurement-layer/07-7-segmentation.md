---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "03"
volumeSlug: "the-measurement-layer"
volumeTitle: "THE MEASUREMENT LAYER"
order: 7
title: "SEGMENTATION"
slug: "7-segmentation"
sectionNumber: "7"
part: null
kind: "narrative"
sourceFile: "CR_03_THE_MEASUREMENT_LAYER.md"
tags: []
hasSayThis: true
wordCount: 755
status: "raw"
section: "§7"
summary: ""
enriched: false
---

# §7 · SEGMENTATION

Now a regulatory requirement, not merely good practice — the ECL Directions name segmentation as a component of ECL alongside PD, LGD and EAD.

## 7.1 The principle

📘 **Segmentation.** Partitioning a portfolio into groups whose members behave similarly, so that a single estimate applied to the group is meaningful.

The justification is one sentence: **an average is only informative when it is an average of similar things.** A portfolio-level PD of 3% built from a segment at 0.8% and a segment at 9% describes neither segment, and predicts nothing about a portfolio whose mix is shifting.

And Indian retail mix shifts constantly. Document 01 §1 showed gold going from a fifth to nearly a third of the non-housing book in a single year. **An unsegmented model built on FY24 data is describing a portfolio that no longer exists.**

## 7.2 Four criteria for a good segmentation

1. **Homogeneity within.** Members behave alike.
2. **Heterogeneity between.** Segments actually differ — if two have the same bad rate and the same curve shape, they are one segment.
3. **Stability.** The definition holds over time and membership does not churn arbitrarily.
4. **Size.** Enough accounts, and enough defaults, for the estimate to be reliable.

⚠️ **Three and four fight one and two, always.** Finer segmentation buys homogeneity and costs stability and sample size. This trade-off never resolves; it is managed. The binding constraint is the number of **defaults**, not accounts — a segment of 50,000 accounts with 40 defaults cannot support a reliable PD, and practitioners generally want at least a few hundred defaults per segment for a stable estimate.

## 7.3 The dimensions that earn their place in Indian retail

In rough order of discriminatory power, each grounded in something from Document 01:

1. **Product.** Non-negotiable — seven products with nothing in common.
2. **Secured versus unsecured, and realisation route within secured.** §6.1.
3. **Ticket band.** Document 01 §1.2's monotone gradient, present in every product.
4. **Lender type or, internally, sourcing channel.** Document 02 §2.2.
5. **New-to-credit versus bureau-scored.** Roughly 15% of retail originations are NTC and have no history to model. They need their own treatment, not an imputed score.
6. **Geography.** State at minimum; Document 01 flagged Kerala and Andhra in housing, Bihar and West Bengal in personal loans.
7. **Policy era.** Cohorts written under materially different regimes should not be pooled — and the November 2023 risk-weight action is a genuine regime boundary in this market.

## 7.4 The two failure modes

🔴 **Under-segmentation** produces a model that fits the mix rather than the risk. It appears to work until the mix moves, then fails silently — and the failure looks like model drift when it is a specification error.

🔴 **Over-segmentation** produces estimates built on too few defaults. Every cell is bespoke, none is reliable, and the model is unmaintainable and unvalidatable. It usually comes from segmenting on everything available rather than on what discriminates.

✅ **The test that settles it:** does the candidate segment have a materially different bad rate **and** a materially different vintage curve *shape* from its neighbour? A different level alone can usually be handled by a variable inside a model. **A different shape means a different risk process, and that genuinely needs its own segment.**

## 7.5 The regulatory dimension 

Two consequences of the April 2026 Directions land directly here.

**Prudential floors apply at product level**, so product tagging must be exact and defensible — the floor bites per product, not in aggregate.

**The transactor/revolver split is a segmentation defined by behaviour** over a rolling twelve months at customer level, resetting on a single day of DPD. As this document's opening section argued: a bank that cannot maintain that measurement will carry 125% on customers who genuinely qualify for 75%.

**► SAY THIS**
> "Segmentation is now a regulatory requirement rather than a modelling preference — the ECL Directions name it alongside PD, LGD and EAD, and the prudential floors apply at product level. The principle is that an average only means something when it's an average of similar things, and Indian retail mix moves fast enough that an unsegmented model is really fitting the mix. My test for whether something deserves its own segment is whether it has a different vintage curve *shape*, not just a different level — a different level can usually be a variable inside a model, but a different shape is a different risk process. And the binding constraint in practice is defaults per segment, not accounts."

---
