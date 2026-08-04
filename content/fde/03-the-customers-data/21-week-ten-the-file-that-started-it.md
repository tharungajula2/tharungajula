---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "03"
volumeSlug: "the-customers-data"
volumeTitle: "THE CUSTOMER'S DATA"
order: 21
title: "Week ten — the file that started it"
slug: "week-ten-the-file-that-started-it"
sectionNumber: null
part: "PART II — MAKING IT ACTUALLY WORK"
kind: "scene"
sourceFile: "FDE_03_THE_CUSTOMERS_DATA.md"
tags: []
hasSayThis: false
wordCount: 349
status: "raw"
section: ""
summary: ""
enriched: false
---

## Week ten — the file that started it

You re-run A-3902 through the pipeline as it now stands.

Hybrid retrieval fires both paths. The structural guarantee sweeps in every third-party income-bearing chunk for this applicant regardless of query phrasing. The reranker promotes the tax transcript from rank 5 into the prompt. Multi-hop runs the discrepancy comparison explicitly rather than hoping. The validation layer rejects one uncited claim and the repair loop fixes it.

The memo comes out with `income_discrepancy` flagged, 37%, cited to page 1 of the tax transcript and page 3 of the application.

You take it to Tom. He reads it for about eight seconds, clicks the DTI figure, watches it jump to the highlighted line on the credit report, and says: *"Yeah. That's the one I'd have caught. That took you what, six weeks?"*

Nine, actually. Four of them on PDF table extraction.

He's quiet for a second and then asks the question you've been waiting for someone to ask:

*"What happens on the ones you don't catch?"*

And that is the correct question, and you don't have a complete answer yet. You have a taxonomy, an inspection window, and four metrics on a fifty-row golden set. What you don't have is a system that watches *itself* — that knows when retrieval was thin, flags low confidence for human review, catches a regression the day it ships rather than the month someone notices, and produces evidence for a validation committee without you personally assembling it.

Marcus has scheduled the model risk review for three weeks out.

---

**Wikilinks:** [[why-rag]] · [[embeddings-hands-on]] · [[chunking]] · [[vector-databases]] · [[build-first-rag]] · [[keyword-fulltext-search]] · [[build-hybrid-search]] · [[build-vector-db-benchmark]] · [[reranking]] · [[citations-grounding]] · [[rag-failure-modes]] · [[metadata-filters]] · [[query-rewriting-hyde]] · [[multi-hop-retrieval]] · [[ingestion-pipelines]] · [[rag-evals-intro]] · [[semantic-caching]] · [[graphrag-preview]] · [[hallucination]] · [[classical-ml-fundamentals]] · [[structured-output]]

*Next — Document 05 territory arrives early, because Marcus does: THE LOOP first. Document 04 takes the retrieve-read-retrieve pattern you just ran by hand and industrialises it — agents, tools, state, human-in-the-loop gates, and the question of how much autonomy a regulated lender will actually tolerate.*
