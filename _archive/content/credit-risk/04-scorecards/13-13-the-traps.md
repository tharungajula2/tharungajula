---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "04"
volumeSlug: "scorecards"
volumeTitle: "SCORECARDS"
order: 13
title: "THE TRAPS"
slug: "13-the-traps"
sectionNumber: "13"
part: null
kind: "narrative"
sourceFile: "CR_04_SCORECARDS.md"
tags: []
hasSayThis: false
wordCount: 224
status: "raw"
section: "§13"
summary: ""
enriched: false
---

# §13 · THE TRAPS

1. **Treating the scorecard as the decision.** It ranks; the cut-off decides. §1.1.
2. **Not stating the WoE sign convention.** §4.1.
3. **Reading a high IV as unambiguously good.** Above 0.50 on a raw variable, suspect leakage; on a bureau score it is expected but creates single-variable dominance. §4.4.
4. **Imputing a bureau score for new-to-credit applicants** instead of building them a separate model. §4.4.
5. **Leaving fraud and first-payment defaults in the development sample.** §2.4.
6. **Setting the performance window by convention rather than off the vintage maturity point.** §2.2.
7. **Reporting only a random holdout.** Out-of-time is the split that answers the production question. §3.2.
8. **Forcing monotonicity before investigating why the data refused.** §5.2.
9. **Selecting variables on IV alone**, ignoring availability at decision point and stability. §6.1.
10. **Believing scaling changes model quality.** It is arithmetic. §7.2.
11. **Presenting reject inference as a solution** rather than a stated-direction correction. §8.3.
12. **Comparing Gini across models** built on different bad definitions or populations. §9.2.
13. **Reading a low Hosmer–Lemeshow p-value as a pass.** High p means pass. §10.2.
14. **Treating "the PD" as one number** across ECL and Basel. PIT and TTC. §10.3.
15. **Justifying a new model with Gini instead of a swap set.** §11.2.
16. **Recalibrating a model whose ranking has broken.** §12.2.

---
