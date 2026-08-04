---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 4
title: "DOCUMENT 03 — THE MEASUREMENT LAYER"
slug: "4-document-03-the-measurement-layer"
sectionNumber: "4"
part: null
kind: "interrogation"
sourceFile: "CR_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 818
status: "raw"
section: "§4"
summary: ""
enriched: false
---

# §4 · DOCUMENT 03 — THE MEASUREMENT LAYER

**Name the three views and what each can do.**
Cohort — vintage curves, answers whether the business we're writing is getting better. Flow — roll rates and transition matrices, answers what's happening now. Stock — snapshot delinquency, reports and cannot diagnose.

**Why can a snapshot never diagnose?**
It confounds underwriting quality, seasoning and growth dilution, and cannot separate them.

**Do the growth-dilution arithmetic.**
₹1,000 crore seasoned at 4.0% is ₹40 crore. Add ₹600 crore of new business at 0.5%, ₹3 crore. Total ₹43 crore on ₹1,600 crore — **2.7%**. The ratio improved from 4.0% with nothing changed.

**What does vintage analysis do that nothing else does?**
It groups by origination month and plots against months on book rather than calendar time, which removes seasoning and growth dilution simultaneously.

**Three things you read off a vintage chart.**
Level at a common MOB — the clean quality signal. Shape — where the deterioration starts. The maturity point where it flattens, which sets the minimum performance window for a scorecard.

**A cohort is worse from MOB 2. What kind of problem is it?**
Fraud or channel compromise. First-payment and early-payment default.

**A cohort is worse only from MOB 6. What kind?**
Genuine credit deterioration.

**Which single vintage cut is worth most?**
MOB 6 cumulative 90+ by sourcing partner, ranked, with volume alongside — because the portfolio average always conceals a bad tail of partners.

**Compute the terminal roll from 35% / 75% / 85%.**
0.35 × 0.75 × 0.85 = **22.3%**. Roughly 22 rupees in every 100 entering early delinquency ends as an NPA.

**Chain it to the book at 2.5% monthly inflow.**
2.5% × 22.3% = **0.56% of the performing book per month**, about **6.7% annualised** NPA formation.

**Now move the first roll from 35% to 45%.**
0.45 × 0.75 × 0.85 = 28.7%. Times 2.5% = 0.72% per month, about **8.6% annualised** — roughly 1.9 points more, on a ₹10,000 crore book about ₹190 crore a year.

**So how would you know the book is turning before delinquency shows it?**
The 1–30 to 31–60 roll rate, monthly, with the terminal-roll calculation attached so any movement converts straight into rupees.

**Name the four assumptions in a transition matrix.**
Markov — next state depends only on current state, which is false for repeat visitors. Stationarity — it's a nowcast, not a forecast. Homogeneity. And no large absorbing-state leakage.

**State the bucket identity.**
Closing = opening + inflow − cure − forward roll − write-off − recovery.

**Why is it worth more than any ratio?**
Because a flat bucket balance can mean nothing is happening, or that large inflow is being offset by large cure and write-off. A snapshot cannot distinguish them; the identity forces it open.

**Personal loan PAR 180+ is flat at 5.3% while every early bucket improves. Explain.**
Put it through the identity. Inflow is falling, so for the balance to be flat, cure, write-off and recovery must all be near zero. Cure is near zero because of the entire-arrears upgrade rule; recovery is near zero because it's unsecured; write-off is near zero because the lender hasn't taken the charge. **It's a statement about write-off policy, not about borrowers.**

**Same PD, four LGDs. Explain.**
Realisation route. Pledge — already holding the asset, lowest. Hypothecation — repossess, moderate and observable. Mortgage — enforce through process, low in principle, slow in practice. Unsecured — no realisation route, settlement only, highest.

**Why is EAD not just the balance on a revolving line?**
Because a distressed borrower draws down. You need a credit conversion factor on the undrawn limit.

**Four criteria for a good segmentation.**
Homogeneity within, heterogeneity between, stability over time, and enough defaults for the estimate to hold.

**Which two fight the other two?**
Stability and size fight homogeneity and heterogeneity. Finer segmentation buys homogeneity and costs sample.

**What's the test for whether something deserves its own segment?**
A materially different vintage curve **shape**, not just a different level. A different level can usually be a variable inside a model; a different shape is a different risk process.

**Write the PSI formula and its thresholds.**
PSI = Σ (Aᵢ − Eᵢ) × ln(Aᵢ / Eᵢ). Below 0.10 stable, 0.10 to 0.25 moderate, above 0.25 significant.

**PSI versus CSI — and the trap.**
PSI tells you the population moved; CSI tells you which variable moved it. The trap is that PSI can be stable while CSI is not, because two variables can shift in opposite directions and cancel in the score distribution. Never run PSI alone.

**What will happen to CSI in the second half of 2026, and what should a team not do about it?**
Velocity-based bureau attributes will breach, because the reporting cadence changed on 1 July 2026 and the same behaviour now produces a different value. The wrong response is tightening cut-offs against a data artefact. Re-baseline and re-validate.

---
