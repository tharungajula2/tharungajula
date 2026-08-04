---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 15
title: "WHAT TO CARRY OUT OF THIS DOCUMENT"
slug: "15-what-to-carry-out-of-this-document"
sectionNumber: "15"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: false
wordCount: 335
status: "raw"
section: "§15"
summary: ""
enriched: false
---

# §15 · WHAT TO CARRY OUT OF THIS DOCUMENT

1. **The scorecard ranks; the cut-off decides.** Everything follows from holding those apart.
2. **Four design decisions before any data** — bad definition, performance window, sample window, exclusions — and the bad definition should come from the roll-rate matrix, not from convention.
3. **WoE = ln(%Good / %Bad); IV = Σ(%Good − %Bad) × WoE.** Reproduce the table on paper.
4. **Factor = PDO / ln 2; Offset = Base Score − Factor × ln(Base Odds).** Reproduce that too.
5. **Out-of-time is the split that matters**, and a large in-time-to-OOT gap is a population instability signal, not just overfitting.
6. **Reject inference corrects a known direction; it does not create information.** Only a randomised below-cut-off approval does.
7. **High Hosmer–Lemeshow p-value means pass.** Say it out loud until it is automatic.
8. **Prove a new model with a swap set, not with Gini** — the swap set converts into rupees.
9. **Level error, recalibrate. Shape error, redevelop.** Recalibrating a shape error is concealment.
10. **Interpretability is now a priced regulatory choice**, not a stylistic one — pending finalisation of the June 2026 draft.

---

*Next — **Document 05: BEHAVIOURAL MODELS AND THE RISK PARAMETERS**. The scorecards that live on the book rather than at the door — behavioural and collection scoring — and then the three parameters everything downstream needs: PD calibration from score to probability, LGD from completed workouts, and EAD with credit conversion factors. Document 04 built the model that decides who gets in; Document 05 builds the models that tell you what the book is worth.*

---

*Regulatory statements are individually tagged and dated. Where a tag reads `[DRAFT]` or `[VERIFY]` I could not confirm current status against a primary source, and the June 2026 model risk guidance is explicitly a draft whose finalisation I have not verified. The WoE table, scaling example and all numeric illustrations in this document are constructed for teaching and are not observed data from any institution.*
