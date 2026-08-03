---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "08"
volumeSlug: "the-forward-deployed-craft"
volumeTitle: "THE FORWARD-DEPLOYED CRAFT"
order: 20
title: "The receipts index"
slug: "8-14-the-receipts-index"
sectionNumber: "8.14"
part: "PART V — THE CAREER"
kind: "narrative"
sourceFile: "FDE_08_THE_FORWARD_DEPLOYED_CRAFT.md"
tags: []
hasSayThis: false
wordCount: 511
status: "raw"
section: "§8.14"
summary: ""
enriched: false
---

## § 8.14 — The receipts index

Every `[RECEIPT]` across this set, gathered. **These are the artifacts, not the reading.**

**Foundations**
1. Token and cost calculator, run against a genuinely multilingual corpus, publishing the English-vs-other cost delta.
2. `tokentools` — a small package, typed, tested, installable, with a README.

**The instrument**
3. Structured extractor with the full defensive ladder — fence stripping, validate-and-repair, capped retries, explicit failure — plus a test suite covering the failure path.
4. Provider-agnostic gateway with a **fake-provider test suite**: auth failure skips, rate-limit recovers in place, full chain exhaustion, cache hit, ledger arithmetic.
5. Injection test suite: ten hostile documents against hardened and unhardened prompts, scored, with an honest conclusion.

**The data**
6. `DATA_QUIRKS.md` — fifteen real entries from a genuinely messy corpus.
7. `rrf_fuse` as a pure function with hand-computed tests, plus the twelve-query three-mode comparison with success criteria written *before* running.
8. Claims-with-citations pipeline plus validation layer, plus the click-through session grading every citation.
9. Idempotent ingestion pipeline with a verify stage that fails loudly and a sync report showing skipped chunks.

**The loop**
10. Tool confusion audit — descriptions tested on someone with no context, before and after.
11. Hand-built ReAct agent with five mock tasks green, including termination honesty.
12. The gate with the **kill-and-resume durability test**.

**The proof**
13. A 60-case golden set authored *with a domain expert*, with a coverage table and an honest current-failure list.
14. A 20-failure error analysis with the root-cause distribution, the dominant-cause fix, and before-and-after measurement.
15. The eval harness — one command, full report, and a real problem it found.

**The hostile world**
16. Red-team battery with before-and-after success rates, and the CI-gated injection suite with a zero-exfil assertion.
17. Idempotency guard with the concurrent-race test, plus the hash-chained audit log with a working tamper-detection demo.
18. **Counterfactual fairness harness with a published finding you acted on.**

**Shipping**
19. OIDC integration against a real enterprise identity provider with group-to-role mapping and a documented claims contract.
20. The RLS forgotten-filter proof.
21. Credential-free demo mode running the full stack in CI.
22. Data-flow audit with a discovered obligation and its remediation.

### How to actually use this list

**Do not build twenty-two things.** Build **one system that contains eight of them**, and make it real.

The strongest portfolio shape is a single deployment-flavoured project over a genuinely messy domain — public regulatory filings, insurance policy documents, clinical trial protocols, procurement records, anything with real structure and real mess. Then: retrieval with citations, an eval harness with a golden set, a failure taxonomy, a security posture with a zero-exfil guarantee, deployed with auth and monitoring, plus a `DATA_QUIRKS.md` and a decision log and an honest limitations page.

**The rarest and most convincing four**, if you only build four: **the counterfactual fairness test, the error analysis with a fix, the fake-provider gateway test suite, and the honest limitations document.** Every one of them demonstrates the same thing — that you improve systems by evidence and report your own failures — and that is the scarce trait.

---
