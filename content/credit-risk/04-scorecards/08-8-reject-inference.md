---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 8
title: "REJECT INFERENCE"
slug: "8-reject-inference"
sectionNumber: "8"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: true
wordCount: 631
status: "raw"
section: "§8"
summary: ""
enriched: false
---

# §8 · REJECT INFERENCE

The problem Document 02 §12 named, and the place where honest practitioners and confident ones separate.

## 8.1 The problem

You observe repayment only for applicants you **approved**. The rejected population has no outcome — you never lent to them, so you never found out.

But the model will be applied to the **whole through-the-door population**, including applicants who resemble those you previously rejected. A model built only on approvals is fitted to a **censored sample**, and the censoring is not random: it was produced by your own prior decision rule.

🔴 **The specific distortion, and it is worth being able to state precisely.** Because approval was itself risk-based, the approved population has a compressed risk range. The relationships you fit are estimated over that compressed range and then extrapolated beyond it. The model therefore tends to **understate risk at the bottom end** — exactly where the cut-off sits, and exactly where the marginal decisions are made.

## 8.2 The methods

**1. Known good/bad only.** Ignore rejects entirely. Legitimate when the reject rate is low, and the honest baseline — but the assumption must be stated, not left implicit.

**2. Parcelling.** Score the rejects with the known-good/bad model, assign them good/bad outcomes probabilistically according to their score band's observed bad rate, usually inflated by a factor to reflect that rejects are worse than approvals at the same score. Then rebuild on the combined sample. The most common method in practice, and the inflation factor is a judgement call that should be documented and sensitivity-tested.

**3. Augmentation / reweighting.** Do not infer outcomes; instead re-weight the approved accounts so their score distribution matches the through-the-door population. Weaker assumptions, weaker correction.

**4. Fuzzy augmentation.** Enter each reject into the sample twice — once as a good and once as a bad — weighted by its estimated probabilities.

**5. Bureau performance on rejects.** The Indian-specific and genuinely strongest option: many rejected applicants borrowed **elsewhere**, and that performance is visible on the bureau. It is real observed outcome data rather than inference.

⚠️ The caveat on the last one: applicants who were rejected by you and then obtained credit elsewhere are not a random sample of your rejects — they are the ones somebody else was willing to serve. Useful, but selected. And Document 03 §8.4's point applies: post-July-2026 bureau refresh makes this data materially fresher than it was.

## 8.3 The honest position

✅ **No reject inference method creates information that does not exist.** Every one of them extrapolates a fitted relationship into a region where you have no observations, using assumptions that cannot be validated from the data. Reject inference makes a model *less wrong in a stated direction*; it does not make it correct.

**The intellectually honest framing, which is also the one that lands best:** the only true solution to reject inference is a **randomised holdout** — approving a small, controlled, budgeted sample of applicants below cut-off to observe what actually happens. It costs money by design. A few institutions do it. Almost none in this market do it consistently.

**► SAY THIS**
> "Reject inference exists because you only observe outcomes for accounts you approved, and that censoring was produced by your own prior rule — so the fitted relationship is estimated over a compressed risk range and then extrapolated below the cut-off, which is exactly where the marginal decisions are. In India I'd lean on bureau performance for rejects who borrowed elsewhere, because that's observed outcome rather than inference, while being clear it's a selected subset. But I'd say plainly that no method creates information that isn't there. The only real solution is a small randomised approval below cut-off, and it costs money by design — which is why almost nobody does it."

---
