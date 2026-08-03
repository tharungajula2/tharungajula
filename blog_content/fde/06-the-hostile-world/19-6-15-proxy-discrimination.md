---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 19
title: "Proxy discrimination"
slug: "6-15-proxy-discrimination"
sectionNumber: "6.15"
part: "PART III — PROVE IT AND SHIP IT"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 1217
status: "raw"
section: "§6.15"
summary: ""
enriched: false
---

## § 6.15 — Proxy discrimination

*Nothing in any AI curriculum covers this. It is the section that determines whether a lending deployment exists.*

Adaeze's question was: can you prove this doesn't discriminate?

### The two theories

**Disparate treatment** — treating someone differently *because of* a protected characteristic. Intentional. Easy to avoid: don't use the variable.

**Disparate impact** — a facially neutral practice that produces a **significantly different outcome across groups**, without a sufficient business justification, where a **less discriminatory alternative** exists.

**Disparate impact requires no intent, and no protected variable.** Which is why "we don't use race" is not an answer, and why an engineer who offers it as one immediately signals they don't understand the problem.

Document 00 established the pattern: examiner findings have flagged disparate-impact exposure in models that **proxy** protected-class variables — ZIP-code features correlated with race being the canonical example.

### Why an LLM is a proxy machine

A traditional scorecard uses a small, deliberately chosen set of variables, each individually reviewed for proxy risk.

**A language model reading free text ingests everything on the page.**

Names carry ethnic and gender signal. Addresses and neighbourhoods carry race and income signal. Employer names carry industry, immigration, and class signal. School names carry the same. **The language a document is written in carries national origin directly.** Writing style, formality, and grammar correlate with education and first-language status.

Nobody instructed it to use any of this. **It reads what is there**, and the correlations exist in the world it was trained on.

**And the danger concentrates in the narrative field**, not the numbers. `verified_income: 96400` carries no proxy. But a free-text summary — *"applicant's employment history shows some instability and the documentation provided is less organised than typical"* — is a judgement that can absorb proxy signal invisibly, arrive in front of an underwriter with the authority of a system, and influence a decision.

### The controls

**One — restrict what the model sees.** § 6.11's redaction removed names, addresses, and government ids for *privacy* reasons. It also removes the three strongest proxies. **That's the same control paying two dividends**, and it's the cheapest fairness intervention available.

Redact aggressively at the input boundary: names, street addresses, ZIP, neighbourhood references, school names, and — where the task permits — employer names.

**Two — constrain the output.** Flags are a closed enum. The narrative is bounded, factual, and every claim carries a citation. **A narrative that can only restate cited facts has far less room to encode a proxy than one that can characterise an applicant.**

**Three — the decision stays human**, and the memo never contains decision language. § 6.12's guardrail.

**Four — adverse-action reasons come from the citation chain, never from the narrative.** Document 00's requirement is *specific, accurate principal reasons*, and model complexity is not an excuse. The defensible answer is a traceable fact — *"verified income of $96,400 versus stated $120,000, per IRS transcript page 1"* — not a paragraph of model prose.

**Five — counterfactual testing.** And this is the one that produces evidence.

```
COUNTERFACTUAL PROBE — 200 files, each run twice
identical financials; only name, address, and correspondence language varied

                          flag rate    narrative sentiment (judged)
baseline identity            18.5%              0.00  (reference)
name variant A               18.5%             -0.01
name variant B               19.0%             -0.02
address: high-income ZIP     18.5%             +0.01
address: low-income ZIP      21.5%  ⚠          -0.14  ⚠
correspondence in Spanish    23.0%  ⚠          -0.19  ⚠
────────────────────────────────────────────────────────────────
FINDING: flag rate and narrative tone both shift materially on
         address and language, with financials held identical.
```

**MENTAL TRACE — and this is the most important table in the entire document set.**

Two hundred files, each run twice, with **every financial fact identical.** The only differences are identity attributes that should be irrelevant.

Names barely move the numbers. Good — the pseudonymisation is working.

**Address and correspondence language move both metrics materially.** A low-income ZIP raises the flag rate by three points and shifts the narrative measurably negative. Spanish correspondence raises it by 4.5 points and shifts the narrative further.

**No financial fact changed.** The system is responding to identity signal, and both of these attributes are strong proxies for protected characteristics.

Now trace *why*, because the two causes are different and need different fixes.

The address leak is a **redaction failure** — § 6.11 replaced the address with `[ADDRESS_1]`, but neighbourhood references survived in the free text of correspondence letters, and the model picked them up. The fix is better detection.

The language leak is **structural and harder.** Spanish documents genuinely produce worse extraction — the § 1.4 tokenisation penalty, plus fewer training examples of Spanish financial documents, plus OCR trained mostly on English. Sparser extraction means more `insufficient_docs` flags. **The disparity is real, it's caused by model capability rather than model bias, and it produces a discriminatory outcome anyway.**

**That distinction is legally irrelevant and practically crucial.** Disparate impact doesn't care why. But the *fix* depends entirely on the cause: the address problem is a redaction bug, and the language problem requires improving Spanish extraction quality or excluding Spanish files from automated processing until it's fixed.

**The honest read: this system was not shippable on the day this test ran.**

### What you do with that

You bring it to Adaeze **before** she asks. Not the fixed version — the finding.

*"We ran counterfactual testing. Two attributes move the output with financials held constant: neighbourhood references surviving redaction, and Spanish-language correspondence. The first is a bug I can fix this week. The second is a capability gap — our extraction is genuinely worse on Spanish documents, which produces more insufficient-documentation flags, which is a disparate outcome regardless of cause. I don't think we should process Spanish files through this pipeline until that gap closes, and I'd rather route them to manual review than ship a known disparity."*

Three things happened in that paragraph.

**You found it before an examiner did.** That is worth more than any accuracy metric.

**You proposed removing scope from your own project.** Which is the single most credibility-generating move available to a vendor, and almost nobody makes it.

**You separated the bug from the structural gap**, which lets counsel make an informed decision rather than a fearful one.

### The standing controls

**Counterfactual testing runs quarterly, permanently, as part of the monitoring plan** from § 5.13 — not as a one-time clearance.

**Slice every metric by proxy-correlated attributes** and monitor the disparity, not just the aggregate.

**Document the less-discriminatory-alternative search.** When you choose a configuration, record what alternatives you evaluated and why the chosen one was necessary. That record is what a disparate-impact analysis requires and what nobody has when asked.

**And Meridian runs the fairness analysis, not you.** § 5.13's principle, and it holds harder here. A vendor certifying its own fair-lending exposure is not a control. Your job is to make the testing possible, reproducible, and cheap — and then to have no say in the result.

`[RECEIPT]` **A counterfactual fairness test harness with a published finding you acted on.** This is the rarest artifact in this entire document set. Almost nobody self-taught has touched fair-lending methodology, it is directly what regulated-industry FDE hiring screens for, and the fact that you *found a problem and scoped down because of it* is the part that makes it real rather than performative.

---
