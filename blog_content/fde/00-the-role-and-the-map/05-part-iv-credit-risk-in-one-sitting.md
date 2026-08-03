---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "00"
volumeSlug: "the-role-and-the-map"
volumeTitle: "THE ROLE AND THE MAP"
order: 5
title: "PART IV — CREDIT RISK, IN ONE SITTING"
slug: "part-iv-credit-risk-in-one-sitting"
sectionNumber: null
part: "PART IV — CREDIT RISK, IN ONE SITTING"
kind: "scene"
sourceFile: "FDE_00_THE_ROLE_AND_THE_MAP.md"
tags: []
hasSayThis: false
wordCount: 1140
status: "raw"
section: ""
summary: ""
enriched: false
---

## PART IV — CREDIT RISK, IN ONE SITTING

You cannot deploy into a lender while nodding blankly at their vocabulary. This is the minimum. It is enough to hold a real conversation; the depth arrives in context as the deployment proceeds.

### What a lender is actually doing

A lender has one core question about every application: *if we give this person money, what do we expect to lose?* The industry decomposes it into three numbers.

- **PD — Probability of Default.** How likely is this borrower to stop paying? A number between 0 and 1.
- **LGD — Loss Given Default.** If they do default, what fraction of the money do we fail to recover? Secured lending has low LGD (you can seize the collateral). Unsecured personal loans have high LGD.
- **EAD — Exposure at Default.** How much will actually be outstanding at the moment things go wrong? For a term loan that's predictable. For a credit line it isn't, because distressed borrowers draw down their remaining credit right before defaulting.

And the equation that ties them:

**Expected Loss = PD × LGD × EAD**

That is the whole engine. Everything a credit risk team does is estimating, monitoring, or defending one of those three numbers. If you remember one formula from this entire set, remember that one — you can hold a serious conversation with Dan Whitfield on the strength of it.

### The scorecard, and why it still rules

Traditional credit models are **scorecards**: a small set of variables, each binned into ranges, each range carrying points. Total the points, get a score, map the score to a PD. They are unglamorous and often outperformed on raw accuracy by modern methods.

They persist anyway, and you must understand why, because it explains every objection you will face. A scorecard is:

- **Explainable by construction.** You can say exactly which variables cost this applicant points.
- **Stable and monitorable.** You can watch each variable's distribution drift over time.
- **Defensible to an examiner.** Every element has a documented rationale.

When you arrive with an LLM, you are arriving with something that has none of those three properties by default. Dan's scepticism is not technophobia. It is a correct assessment that you have proposed replacing an auditable thing with an unauditable thing. **Your job across this entire set is to give the unauditable thing auditable properties** — citations, evals, traces, gates, logs. That is the actual work.

### Adverse action — the tripwire

If you deny credit, or offer worse terms than requested, US law requires you to tell the applicant the **specific principal reasons** why. This comes from ECOA and Regulation B. Not "you did not meet our criteria." Specific, accurate reasons.

Regulators have been explicit that model complexity is not an excuse. <cite index="10-1">The CFPB issued Circular 2026-03 in May 2026 advising that lenders using complex algorithms such as machine-learning underwriting models remain fully responsible under ECOA and Regulation B for providing specific, accurate reasons for adverse action.</cite> <cite index="15-1">Creditors cannot rely on the complexity of the model as justification, and vendor explainability output must map to actionable reasons.</cite> [VERIFY — circular numbers and dates move; confirm before citing to a customer.]

**This single rule determines your architecture.** If an LLM output can influence a denial, you have inherited an obligation you probably cannot discharge. Which is why the system you build at Meridian summarises the file and *never* renders the decision. Architecture as compliance strategy — Document 06.

### Model risk management — the gate

Marcus Oyelaran's function exists because of supervisory guidance on model risk. <cite index="11-1">The original framework, SR 11-7, was introduced in 2011 by the Federal Reserve and the OCC to give banks guidance on mitigating adverse consequences from decisions based on models that are incorrect or improperly used.</cite>

**This is where your training data would have failed you.** SR 11-7 is no longer the operative document. <cite index="16-1">In 2026 the Federal Reserve Board, OCC, and FDIC jointly issued Revised Guidance on Model Risk Management, superseding SR 11-7 (2011) and SR 21-8 (2021), emphasising a risk-based approach tailored to the institution's model risk profile — while carrying forward the three-pillar architecture of robust development, effective challenge through independent review, and ongoing monitoring with documented thresholds.</cite> <cite index="9-1">Reporting on the revision references SR 26-2 and OCC Bulletin 2026-13 as the superseding letters.</cite>

[VERIFY — sources disagree on whether issuance was April or May 2026, and letter numbering varies between accounts. Confirm the exact citation from the Federal Reserve and OCC directly before repeating it in a customer meeting. The substance is stable; the reference is not.]

What matters practically, and what you can say with confidence:

- **Vendor and third-party models are in scope.** <cite index="17-1">The guidance does not stop at in-house models — vendor-supplied tools, off-the-shelf scoring engines, and third-party risk systems are all covered.</cite> You are the vendor. You will be validated.
- **Scope depends on use, not technology.** <cite index="14-1">An internal chatbot helping employees find HR policy documents is not a model; an LLM that generates credit risk narratives for underwriter review is a different question entirely.</cite> Which is exactly the line your Meridian system walks, and why you will spend real time on it.
- **Independent validation happens before deployment, not after.** Plan for it from week one or you will rebuild in month five.

### Fair lending — the quiet killer

You may not discriminate on protected characteristics. The trap is that you do not need to *use* a protected variable to be liable — using something that **proxies** for one is enough. <cite index="15-1">Examiner findings have flagged disparate-impact exposure in models that proxy protected-class variables, such as ZIP-code-based features correlated with race.</cite>

An LLM reading free-text loan files is a proxy machine. It ingests names, neighbourhoods, employers, language of correspondence, and writing style. Nobody instructed it to; it simply reads what is there. **This is the single most dangerous property of the system you are about to build**, and it gets a full treatment in Document 06.

### Two more acronyms you will hear

- **IFRS 9 / CECL** — accounting rules requiring lenders to reserve for *expected* future losses rather than incurred ones. This is why PD estimates feed the balance sheet and not just the approve/decline decision, and why credit models get attention from the CFO, not only from risk.
- **Reconstructability** — the emerging regulatory theme. <cite index="13-1">Regimes including the EU AI Act and Colorado's AI Act require that decisions can be reconstructed and justified after the fact, and most systems weren't designed to produce those artifacts on demand.</cite> [VERIFY — effective dates and scope shift frequently.] For you this translates directly into one engineering requirement: **log everything, immutably, with the model version and the exact inputs.** Document 05 and Document 07.

---
