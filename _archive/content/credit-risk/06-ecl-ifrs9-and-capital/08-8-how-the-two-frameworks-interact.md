---
track: "credit-risk"
trackLabel: "Credit Risk"
volume: "06"
volumeSlug: "ecl-ifrs9-and-capital"
volumeTitle: "ECL, IFRS 9 AND CAPITAL"
order: 8
title: "HOW THE TWO FRAMEWORKS INTERACT"
slug: "8-how-the-two-frameworks-interact"
sectionNumber: "8"
part: null
kind: "narrative"
sourceFile: "CR_06_ECL_IFRS9_AND_CAPITAL.md"
tags: []
hasSayThis: false
wordCount: 543
status: "raw"
section: "§8"
summary: ""
enriched: false
---

# §8 · HOW THE TWO FRAMEWORKS INTERACT

Both land on 1 April 2027. That is deliberate, and the interaction is where understanding shows.

## 8.1 The mechanical link

**Provisions reduce the carrying amount of the asset.** A higher ECL means a lower net exposure, which means **lower RWA** for the same loan. So an increase in provisions simultaneously:

- **Reduces CET1**, through the P&L charge — the numerator of the capital ratio falls.
- **Reduces RWA**, through the smaller net exposure — the denominator falls too.

📘 **The numerator effect dominates**, substantially, because the provision comes off capital rupee-for-rupee while it comes off RWA only after the risk weight is applied. A ₹100 crore additional provision costs ₹100 crore of CET1 and saves the risk weight applied to ₹100 crore of exposure — say ₹75 crore of RWA at 75%, which at a 9% requirement releases only about ₹6.75 crore of capital. **Net cost roughly ₹93 crore.** So provisioning is expensive in capital terms, and the partial offset is real but small.

## 8.2 Procyclicality — the structural concern

Put the two frameworks together and trace a downturn.

Macro forecasts worsen → **PIT PDs rise** → scenario weights shift toward the downside → **Stage 2 migration accelerates**, and each migrating account's allowance multiplies by the 2.7× or more of §2.4 → **ECL rises sharply** → CET1 falls → capital ratios tighten → the bank restricts lending → the downturn deepens.

⚠️ **This is the well-known procyclicality of expected-loss provisioning**, and India has now adopted it. Three things partially damp it, and being able to name them is a good answer to "what are the risks of the new framework":

1. **The four-year transition** — but only for the day-one adjustment, not for ongoing volatility (§6.3).
2. **The prudential floors** — which, by holding provisions above the model in benign conditions, mean there is less distance to travel when conditions turn. **A floor is counter-cyclical by construction**, and this is an under-appreciated part of why the RBI held firm on them.
3. **Standardised-approach capital** — because risk weights are prescribed rather than model-driven, RWA does not itself inflate as PDs rise. In an IRB jurisdiction both the numerator and the denominator move against you at once; **India's SA-only choice removes one of the two procyclical channels.** That is a genuinely favourable structural feature and it is rarely mentioned.

## 8.3 The reconciliation you should be able to explain

At any reporting date, asked why the ECL and the Basel expected loss differ on the same book, the answer decomposes into six items — and having six ready rather than a vague gesture is the difference:

1. **Horizon** — 12-month versus lifetime, by stage.
2. **PD flavour** — point-in-time versus through-the-cycle.
3. **LGD flavour** — expected and unbiased versus downturn.
4. **Discounting** — ECL is discounted at EIR; regulatory EL is not.
5. **Scenario weighting** — probability-weighted across scenarios versus a single figure.
6. **Floors** — where the prudential floor binds, ECL is not the model's answer at all.

And under Indian SA there is a seventh point that trumps the lot: **regulatory capital does not use PD and LGD.** The comparison is conceptual rather than computational, because RWA comes from a table.

---
