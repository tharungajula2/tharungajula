---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "09"
volumeSlug: "the-interrogation"
volumeTitle: "THE INTERROGATION"
order: 14
title: "HOSTILE QUESTIONING"
slug: "hostile-questioning"
sectionNumber: null
part: "PART VI — HOSTILE QUESTIONING"
kind: "interrogation"
sourceFile: "FDE_09_THE_INTERROGATION.md"
tags: []
hasSayThis: false
wordCount: 729
status: "raw"
section: ""
summary: ""
enriched: false
---

# PART VI — HOSTILE QUESTIONING

*The hardest ones, asked the way a skeptic asks them.*

**"You keep saying 'measured.' Measured against what — a test set you wrote yourself?"**

Fair. That's exactly the weakness of a vendor-authored golden set, which is why the expectations were authored by your underwriter, not by me. I built the schema and the tooling; he decided what a correct memo contains. And the set grows from his rejections — every memo he corrected became a case. So it's your standard, versioned in your repo, and you can run it without me.

---

**"Your citation validation checks the chunk was retrieved. It doesn't check the claim is actually supported by it. So what does it really prove?"**

Correct, and I should be precise about what each layer buys. Referential integrity catches hallucinated citations — a fabricated id — which is the crudest failure and instantly catchable. Existence catches uncited assertions. **Neither proves support.** Support is measured by faithfulness scoring on the golden set, which is judged and therefore has an error rate I report. Beyond that, the underwriter's click-through is the real check, which is why every number is one click from its source. I'd describe the guarantee as: no number appears without a traceable origin, and whether that origin supports it is verified by a human in seconds rather than asserted by me.

---

**"You said zero exfiltrations. You also said your injection scanner catches 80%. Which is it?"**

Both, and they're different kinds of claim. The scanner is detective — it reduces the chance an injection lands, it's probabilistic, and 80% will move as attackers get cleverer. Zero exfiltration is architectural: the container has no network egress except the model API and your Postgres. An injection can succeed completely and still have nowhere to send anything. **I'd only ask you to rely on the second.** The first is a bar-raiser I report honestly rather than a control I'd stake the deployment on.

---

**"If a model update changes behaviour, how would you even know?"**

Two ways, and one of them is a gap I'd want to close with you. The model version is pinned, so it doesn't change without a deliberate act — and when we change it, we re-run the full golden set and show you both curves before it's used for anything. That covers intentional changes. For unannounced provider-side changes behind a pinned name, the online monitoring is what catches it: discrepancy catch rate weekly, edit rate weekly, and both moving together is the signal. It's detection after the fact, not prevention, and I'd rather say that plainly than imply we have a guarantee we don't.

---

**"Your fairness test found a problem. Why should I believe there isn't another one you didn't test for?"**

You shouldn't, and I wouldn't claim otherwise. Counterfactual testing covers the attributes we thought to vary, and that's a bounded list. The reason I'd still argue this is better than the alternative: the test is cheap, it runs quarterly, it's run by your team rather than mine, and the outputs are sliced so a disparity shows up in monitoring even on an attribute we didn't specifically probe. What I've bought is a detection mechanism, not a clean bill of health, and treating it as the second would be the actual risk.

---

**"This all sounds very careful. Is it possible you've over-engineered a summarisation tool?"**

It's a fair challenge and I'd answer it two ways. Most of the machinery isn't there for quality, it's there because this is a regulated lending decision touching consumer financial data — the citations, the audit chain, the gate, the fairness testing are what makes it deployable at all, not what makes it accurate. Strip those and you have something that works and can't ship.

The genuinely optional parts — reranking, the multi-hop investigation, the eval harness — I'd defend individually on measured evidence, and if one of them doesn't earn its latency or cost on your numbers, I'd remove it. **Ask me which one you're most suspicious of and I'll show you the before-and-after.**

---

*This is the last document in the set. The first eight teach, this one checks, and none of them substitute for building something and watching it fail in front of a real person.*

**Wikilinks:** every node in the brain — this is the hub.
