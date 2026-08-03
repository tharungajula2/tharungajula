---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 7
title: "The whiteboard"
slug: "1-5-the-whiteboard"
sectionNumber: "1.5"
part: "PART I — THE MACHINE"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 507
status: "raw"
section: "§1.5"
summary: ""
enriched: false
---

## § 1.5 — The whiteboard

An LLM is a genius with a whiteboard. Everything it can consider right now — your instructions, the conversation so far, documents you pasted, its own answer as it writes — must fit on that one whiteboard. The whiteboard is the **context window**, measured in tokens, and when it's full something must be erased.

The model has no other memory. None. Everything that looks like memory in an AI product is engineering built *around* this whiteboard.

**What counts against it.** Everything: the system prompt, every user and assistant turn so far, retrieved documents, tool definitions, tool results, and the tokens of the answer being generated. Typical frontier sizes today run from ~128k tokens up past 1M. Sounds enormous. Real sessions with documents and tool results devour it shockingly fast.

**Long context is not solved memory.** Two gotchas. **Quadratic cost:** attention over a million tokens is expensive and slow, so long-context calls cost real money and real latency. **Lost in the middle:** models empirically recall the beginning and end of a huge context better than the middle. Dumping 900k tokens of documents in does not buy you 900k tokens of *attention quality*.

### The Meridian arithmetic

Here is why this section decides your architecture. Do the accounting with the § 1.4 rules of thumb.

An average Meridian commercial loan file is around 240 pages. At roughly 400 words per page that's 96,000 words. At ¾ of a word per token, that's about **128,000 tokens** — for one file, before you've added a system prompt, before the underwriter has asked a single question, and before accounting for the Spanish correspondence that tokenizes at multiples.

So: the file barely fits, or doesn't fit, in a frontier window. And even where it fits, you're paying for 128k input tokens on every single turn of a conversation because the API is stateless. Four turns and you've billed over half a million input tokens on one application.

**This single calculation is why the entire rest of this deployment looks the way it does.** You cannot put the file on the whiteboard. You must fetch the three relevant pages instead — which is retrieval, and which is Document 03. Or you must summarise and store outside and re-inject selectively — which is memory. Both of those exist *because of the arithmetic you just did*, not because they're fashionable.

**THE DEPLOYMENT LENS.** When a vendor tells Priya "our model has a one-million-token context window, so it can just read the whole file" — and one will — you now know that claim is technically true and practically hollow. It costs a fortune, it's slow, and recall degrades in the middle of exactly the long documents they're bragging about. The professional response isn't to contradict the vendor in the room. It's: *"Context size tells us what fits. It doesn't tell us what the model actually attends to, and it doesn't tell us the bill. Let's test recall on a real file at real length before we design around it."*

---
