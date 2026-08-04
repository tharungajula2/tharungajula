---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 14
title: "The permanent laws (and the ones Dan already speaks)"
slug: "1-12-the-permanent-laws-and-the-ones-dan-already-speaks"
sectionNumber: "1.12"
part: "PART I — THE MACHINE"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 720
status: "raw"
section: "§1.12"
summary: ""
enriched: false
---

## § 1.12 — The permanent laws (and the ones Dan already speaks)

Before you're allowed to summon dragons, you learn why swords have two edges. Classical ML is where the field's permanent laws were discovered, and those laws apply unchanged to every LLM system you will ever ship.

At Meridian this section is not background. **It is the shared language between you and the credit team.** Dan uses these words correctly and daily. If you don't, he will conclude — reasonably — that you don't understand risk.

**Train/test split — the iron law.** A student who memorises past exam papers aces those papers and fails the real exam. To know whether a model *generalised* rather than memorised, you evaluate on data it never saw. Split your data, train on one part, measure on the held-out part, and *never let the test set influence any decision during development* — use a third split, validation, for tuning. The moment test data leaks into training, your accuracy number is fiction. This reappears in LLM-land as "did the benchmark leak into pretraining?" Same disease, planetary scale.

**Overfitting and regularisation.** Overfitting is the memorising student: training error keeps falling while held-out error rises, because the model started fitting the *noise* of the training set. Every cure shares one spirit — constrain the model's freedom. Penalise large weights, randomly disable neurons during training, stop when validation error turns upward, or get more data. The too-simple ↔ too-memorised seesaw is the bias–variance tradeoff.

**Precision, recall, F1 — because "accuracy" lies.** A fraud model that always predicts "not fraud" is 99.9% accurate and 100% useless. On imbalanced problems you must split the error types.

- **Precision** — of everything I flagged, how much was truly positive? This is the cost of false alarms.
- **Recall** — of all true positives out there, how many did I catch? This is the cost of misses.

They trade off against each other through your decision threshold. Cancer screening wants recall (a miss is a death, a false alarm is a follow-up test). Spam filtering wants precision (a false alarm eats a real email). **F1** is their harmonic mean — one balanced number, harsh on whichever is weaker.

**The confusion matrix — the 2×2 that generates everything.** Rows are truth, columns are prediction: True Positives, False Positives (false alarm), False Negatives (miss), True Negatives. Every metric above is arithmetic on those four cells. Precision = TP/(TP+FP). Recall = TP/(TP+FN).

Work it once concretely. 1,000 emails, 50 are spam. Your filter flags 60, of which 40 are actually spam.

- TP = 40 (flagged and spam)
- FP = 20 (flagged, not spam)
- FN = 10 (spam, not flagged)
- TN = 930 (everything else)

Accuracy = (40 + 930) / 1000 = **0.97**. Precision = 40/60 = **0.667**. Recall = 40/50 = **0.80**. F1 = 2 × (0.667 × 0.80) / (0.667 + 0.80) = **0.727**.

Notice the trap: 97% accuracy looks superb and hides that a third of your flags are wrong and a fifth of the spam got through.

**THE DEPLOYMENT LENS.** Rotate the matrix into lending and it becomes the most consequential 2×2 in the building.

Truth is *did this borrower default*. Prediction is *did we decline them*. A **false negative** — you approved someone who defaulted — costs you the loan. A **false positive** — you declined someone who would have repaid — costs you a good customer, and if that error lands unevenly across demographic groups, it costs you a fair-lending finding.

Two things follow, and they're why this section sits in Document 01 rather than an appendix:

**Credit decisions have asymmetric, quantifiable error costs, and the threshold is a business decision, not a technical one.** Where you set it *is* risk appetite. Dan owns that number. Not you, and not the model.

**Both error types have a fairness dimension.** A model can post identical overall accuracy while distributing its false positives very unevenly. Overall accuracy is silent about this by construction. Which is precisely why examiner findings keep landing here, and why Document 06 has an entire section on it.

Being able to draw that matrix on a whiteboard and derive precision and recall from memory takes ninety seconds and buys you a category of credibility that no amount of AI vocabulary will.

---
