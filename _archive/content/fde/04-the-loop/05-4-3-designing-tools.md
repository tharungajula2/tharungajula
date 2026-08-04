---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "04"
volumeSlug: "the-loop"
volumeTitle: "THE LOOP"
order: 5
title: "Designing tools"
slug: "4-3-designing-tools"
sectionNumber: "4.3"
part: "PART I — THE LOOP"
kind: "narrative"
sourceFile: "FDE_04_THE_LOOP.md"
tags: []
hasSayThis: false
wordCount: 1119
status: "raw"
section: "§4.3"
summary: ""
enriched: false
---

## § 4.3 — Designing tools

Hand a new intern a drawer of unlabelled instruments and vague gestures and they'll grab wrong tools for wrong jobs. Label the drawer well and the same intern performs.

The agent is that intern forever: **it chooses tools by reading their descriptions and nothing else.** Tool design is prompt engineering aimed at a decision-maker, and it's where most real-world agent failures are actually born.

### The four organs, and who reads each

The **name** — read at decision time, the first and sometimes only signal.

The **description** — read at decision time, the full advertisement.

The **parameter schema** with per-field descriptions — read at call-construction time, how the model fills arguments.

The **return shape** — read at observation time, what the model must make sense of afterward.

Design all four *for the reader*. Three of the four readers are the model itself.

### Naming — the cheapest quality lever

Names carry verb-object semantics the model pattern-matches hard. `search_file` versus `query_execution_engine` for the same function changes selection behaviour measurably.

Rules: **verb_noun**. **Specific over general** — a general name invites general misuse. **Consistent verb vocabulary across the toolbox** — all reads are `get_*` or `search_*`, all writes are `create_*` or `update_*`, so the model can infer safety class from the name alone. And **never two names a reasonable reader could confuse** — `search_notes` plus `find_notes` in one toolbox is a coin-flip generator.

### Descriptions — the advertisement with boundaries

The template that works: *what it does*, plus *when to use it*, plus **when NOT to use it**, plus *what it needs*, plus *what it returns*.

The negative space is the part amateurs skip and the part that prevents both classic misuse modes: wrong tool chosen, and tool called when none was needed.

```python
{
  "name": "search_file",
  "description": (
    "Searches the documents belonging to ONE loan file and returns matching excerpts "
    "with document name and page number. "
    "Use for any question about what a specific applicant's file contains. "
    "Do NOT use for questions about lending policy, thresholds, or general credit "
    "concepts — those are answered from the policy corpus by search_policy. "
    "Do NOT use to compute ratios; retrieve the figures and compute them yourself. "
    "Requires an applicant_id and a specific topic, not a vague theme. "
    "Returns up to 8 excerpts, each with doc, page, and text."
  ),
  "input_schema": {
    "type": "object",
    "properties": {
      "applicant_id": {"type": "string", "description": "Exact file id, e.g. 'A-4417'. Never a name."},
      "query": {"type": "string", "description": "Specific topic, e.g. 'adjusted gross income'. Not 'income stuff'."},
      "doc_type": {"type": "string", "enum": ["tax_transcript", "bank_statement", "credit_report",
                                             "application", "correspondence"],
                   "description": "Optional. Restricts the search to one document type."}
    },
    "required": ["applicant_id", "query"]
  },
  "safety": "read"
}
```

**MENTAL TRACE — read every clause as steering, because that's what it is.**

Sentence one says what it does. Sentence two says when to use it. Sentences three and four are the negative space: they route policy questions elsewhere, and they forbid the model from asking the tool to compute — which is § 1.4's counting rule, encoded as a boundary.

The parameter descriptions steer argument construction. `"Exact file id, e.g. 'A-4417'. Never a name."` is the difference between clean calls and the model passing `"the applicant"`. The `enum` on `doc_type` means the model cannot invent a document type; the schema constrains it at generation time.

And `"safety": "read"` does nothing yet. § 4.7 builds the gate that consults it.

### Granularity — the architectural decision

Too fine — one tool per micro-operation — and the model orchestrates plumbing it shouldn't see, burning iterations and inviting error.

Too coarse — a tool that is itself an agent — and the model can't steer or recover mid-operation, and observations become opaque blobs.

The heuristic: **a tool should be one meaningful decision's worth of action.** Sized so that choosing it is a sensible reasoning step and its observation is a sensible reasoning input.

When you find the model making the same three-call sequence repeatedly, fuse it into one tool. When one tool's failures are opaque, split it.

### Returns and errors — designing the observation

The tool's output becomes model context, and context is token-priced. Return the five fields the agent needs, not the 300-field raw dump.

And **errors are observations too.** This is the single most load-bearing rule here: **a failing tool must return a legible, actionable error string, never raise into the void.**

```python
# BAD — kills the run
raise ValueError("no such applicant")

# GOOD — the loop can recover
return {"error": "applicant_id 'A4417' not found. Ids use a hyphen, e.g. 'A-4417'. "
                 "Verify the id and retry."}
```

**MENTAL TRACE.** The first version raises an exception. The exception propagates up through dispatch, nothing catches it, and the run dies — with the model never learning what went wrong.

The second returns a dict that becomes the next observation. The model reads it, sees the format hint, and its next Thought is *"I malformed the id; retry with A-4417."* The run continues and succeeds.

**The agent's resilience is the sum of its tools' error messages.** Design every tool's failure modes as carefully as its success mode.

### Safety class — the seed of the gate

Tag every tool at design time. **read** — safe to call freely. **write** — changes the world; the idempotency question applies. **dangerous** — irreversible or external.

Designing safety class in from day one is the difference between *adding* a gate and *retrofitting* one.

**THE DEPLOYMENT LENS.** The Meridian toolbox for the pilot, with its safety tags, and notice what's absent:

```
search_file        read       excerpts from one applicant's documents
search_policy      read       excerpts from the lending policy corpus
compute_ratio      read       pure arithmetic on supplied figures — no I/O
list_documents     read       what documents exist in this file
flag_for_review    write      adds a flag to the draft memo (gated)
save_draft         write      writes the draft memo to the review queue (gated)
```

**Every tool that touches the origination system is missing, deliberately.** No `update_application`, no `set_decision`, no `send_notice`. Not because you'd misuse them — because § 4.16 and § 2.12 established that the model can be talked into using them by a document an applicant submitted.

**An agent that cannot do a thing cannot be tricked into doing it.** That sentence is the whole security posture, and it is a design decision made at tool-definition time, not a control added later.

`[RECEIPT]` **The confusion audit.** Show only the names and descriptions to someone with no context and ask which tool they'd use for eight tasks, two deliberately ambiguous. Every hesitation is a description bug. Fix and re-test. Publish the before-and-after. This is a testing methodology almost nobody applies to tools, and it's cheap.

---
