---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "02"
volumeSlug: "the-instrument"
volumeTitle: "THE INSTRUMENT"
order: 17
title: "Thursday, week five — the demo"
slug: "thursday-week-five-the-demo"
sectionNumber: null
part: null
kind: "scene"
sourceFile: "FDE_02_THE_INSTRUMENT.md"
tags: []
hasSayThis: false
wordCount: 449
status: "raw"
section: ""
summary: ""
enriched: false
---

## Thursday, week five — the demo

Twelve people. Priya, Dan, Marcus, Rina, Tom, and seven others you haven't met.

You do not open with the architecture. You open by asking Tom to pick a file — *any file, one you haven't seen* — and you run it live. Ninety seconds later there's a draft memo on screen with every number underlined and clickable, and clicking one jumps to page 180 of a scanned tax transcript with the figure highlighted.

Dan asks the question he was always going to ask: *"What happens when it's wrong?"*

And here's what five weeks bought you. You don't say "it's very accurate."

You pull up row 07 of the golden set — the one that regressed — and you show him the table. Fifteen cases, three prompt versions, a column of ticks and crosses, and one visible failure you have not hidden.

*"It's wrong about one case in ten right now, and I can tell you which ten percent. These are the fifteen situations we test on every change. This row broke last week when we fixed the Spanish letters, and it's on the board to fix before pilot. When it's wrong, Tom sees it — because every number is cited and an uncited number is a red flag on the page, not a silent error. And when he corrects one, that correction becomes a new row in this table and it can never regress again."*

Marcus writes something down. That's the first time he's written anything down.

What you actually demonstrated wasn't the model. It was that **you have a measuring instrument, and you are willing to show it pointing at your own failures.** Every vendor before you demonstrated capability. You demonstrated control.

The pilot is approved on the condition you present the eval methodology to the model risk committee — which is not a delay, it's the invitation you wanted.

There's one problem you glossed over. Tom's file worked because the retrieval pulled the right five pages. On the file before it, in rehearsal, it pulled the wrong ones and produced a confident memo missing the discrepancy entirely.

The model was never the hard part.

---

**Wikilinks:** [[first-api-call]] · [[roles-and-system-prompts]] · [[prompt-skeleton]] · [[few-shot-prompting]] · [[reasoning-prompts]] · [[structured-output]] · [[tool-calling]] · [[streaming-responses]] · [[errors-retries-backoff]] · [[rate-limits-caching]] · [[build-gateway]] · [[injection-first-look]] · [[multimodal-input]] · [[long-context-strategies]] · [[prompt-quality]] · [[python-typing-pydantic]] · [[python-async]] · [[hallucination]] · [[context-windows]] · [[tokens]]

*Next — Document 03: THE CUSTOMER'S DATA. Retrieval is now the whole problem. Chunking a 240-page scanned file without severing a number from its label, embedding it, searching it two ways, reranking what comes back, and proving that every citation points where it claims to.*
