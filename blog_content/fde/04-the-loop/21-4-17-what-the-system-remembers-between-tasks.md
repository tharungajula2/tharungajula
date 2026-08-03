---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 21
title: "What the system remembers between tasks"
slug: "4-17-what-the-system-remembers-between-tasks"
sectionNumber: "4.17"
part: "PART III — MEMORY"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 653
status: "raw"
section: "§4.17"
summary: ""
enriched: false
---

## § 4.17 — What the system remembers between tasks

Not all memory is one thing, and treating it as one thing is why so many "memory" features are just a growing junk drawer.

### The three types

**Semantic** — *facts, timeless-ish, context-free.* "This applicant is self-employed." "Meridian's DTI ceiling for unsecured personal loans is 43%." The *what-is* memories.

**Episodic** — *events with time and context.* "On 12 July, the underwriter rejected the income flag on file A-3902 because the tradeline had been resolved." The *what-happened* memories.

**Procedural** — *how to do things; preferences in action.* "When a self-employed applicant's deposits conflict with their Schedule C, cite both and flag rather than picking one." The *how-to* memories — **often the highest-value and most overlooked**, because they make a system get *better at working with you* over time, not just *know more about you*.

**The insight that makes this a build and not a lecture: different types want different storage, retrieval, and lifecycle.** Semantic facts get updated in place. Episodic events accumulate append-only and decay with age. Procedural memories are rare, precious, and rarely deleted.

One junk-drawer table can't serve three lifecycles. Three typed tables can.

```python
from pydantic import BaseModel
from typing import Literal

class Memory(BaseModel):
    type: Literal["semantic", "episodic", "procedural"]
    content: str            # the distilled fact/event/skill, self-contained
    subject: str            # who or what it's about
    confidence: float       # extraction certainty
    source_id: str          # provenance — memory needs receipts too
```

**MENTAL TRACE.** `content` must be **self-contained**. A memory reading "he prefers that" without a resolvable subject is useless, and testing for danglers is a real test you should write.

`source_id` is provenance, and it is the field that makes § 4.19 possible — you cannot honour a deletion request against derived memories unless every memory knows where it came from.

**The extraction prompt must teach the null case.** Show it a fact, an event, a skill, and one snippet that yields *nothing worth remembering*. Most conversation is not memory-worthy, and **an extractor that hoards everything is a junk drawer with extra steps.**

This is a classification task, so precision and recall apply: precision asks *did it store junk*, recall asks *did it miss real facts*.

**THE DEPLOYMENT LENS — and this is the answer to Tom's question.**

Recall § 4.7: Tom will rarely reject and constantly **edit**. Every edit is a labelled correction from a domain expert, produced for free as a side effect of him doing his job.

Here's what each type of edit becomes:

**A corrected figure → a golden-set row.** The file, the field, the wrong value, the right value. That's a regression test, forever.

**A removed flag with a reason → procedural memory.** *"Do not flag a disputed tradeline as adverse when the file contains a resolution letter."* That's a rule the system applies going forward.

**A pattern across many edits → a prompt change or a chunking change**, made deliberately and measured against the golden set.

So the honest answer to *"what happens on the ones you don't catch?"* is:

*"You catch them, and then the system can't make that same mistake again. Every correction you make becomes a test case. In three months the things it misses will be different from the things it misses today, because you'll have taught it — and I'll be able to show you the list of what you taught it."*

**That is a better answer than any accuracy number, and it happens to be verifiable.**

One warning, though, and it's the § 4.8 caveat in a different costume: **do not let the system learn automatically from edits.** A pipeline that silently updates its own behaviour from human corrections is unvalidatable — Marcus cannot approve a system whose rules change without review. Edits accumulate as *proposals*. A human reviews them. The change ships through the normal process.

**The agent proposes; the human disposes.** Same principle as the gate, one level up.

---
