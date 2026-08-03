---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 3
title: "The threat model"
slug: "6-1-the-threat-model"
sectionNumber: "6.1"
part: "PART I — THE MAP AND THE ATTACKS"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 627
status: "raw"
section: "§6.1"
summary: ""
enriched: false
---

## § 6.1 — The threat model

Before you build a single defence, map the battlefield — because defending randomly is how you armour the wrong wall while the door stands open.

**Why agents are a uniquely large attack surface.** A traditional program does exactly what its code says. An agent does what a *probabilistic model* decides, based on *natural-language instructions* it reads from *many sources*.

That means the attack surface includes not just the code but **every piece of text the model reads** — user messages, retrieved documents, tool results, web pages, server descriptions, memories. And agents have *capabilities*, so a compromised agent doesn't just leak data, it **does things**.

Model-driven decisions plus broad text inputs plus real-world capabilities equals an attack surface where the classic defences don't fully apply, because the "input" is natural language interpreted by a probabilistic system.

### The four dimensions

**Who** — external attackers planting payloads in content your system reads; malicious users attacking through their own messages; compromised dependencies; and honestly, **your own bugs**.

**What they want** — data exfiltration, unauthorised actions, privilege escalation, denial and cost, reputation and safety harm.

**Where they get in** — and this is the map's most important row, so be exhaustive. **Every input channel is an entry point.**

**What they can do once in** — bounded by the system's *capabilities* and its *data access*. **Impact is the intersection of what the attacker achieved and what the system was allowed to do.**

### The Meridian threat model

```
ENTRY POINT                    ACTOR              WORST REALISTIC OUTCOME
────────────────────────────────────────────────────────────────────────
applicant-submitted documents  applicant          suppress a discrepancy flag
                                                  → loan approved on false basis
scanned document (text in img) applicant          same, harder to spot
correspondence from 3rd party  broker/accountant  inflate stated income credibility
bureau file (compromised feed) external           poison many files at once
policy corpus (internal edit)  insider            change a threshold silently
underwriter question (chat)    internal user      extract system prompt / probe rules
tool result (bureau API)       external           inject via API response text
────────────────────────────────────────────────────────────────────────

CAPABILITIES                   DATA ACCESS
  search_file       read       one applicant's documents, scoped by id
  search_policy     read       lending policy corpus
  compute_ratio     none       pure arithmetic
  list_documents    read       document index for one applicant
  flag_for_review   write      the draft memo only  (gated)
  save_draft        write      the review queue     (gated)

BLAST RADIUS: draft memos in a queue a licensed human reads before use.
              No origination write. No external network. No cross-applicant read.
```

**MENTAL TRACE — read the entry-point column first, because it's the one people get wrong.**

Six of the seven entry points are **documents, not users.** The intuitive threat model — "a bad actor types something malicious into the chat" — is the *least* important row here. The dangerous channel is the one where content arrives as data, is never read by a human before the model sees it, and comes from someone with a direct financial interest in the output.

And note the second-to-last row: an *insider* editing the policy corpus. That's not an AI attack at all — it's a change-control problem — but the AI system makes it more consequential, because a silent threshold change now propagates into 40,000 memos before anyone notices. **The system didn't create the vulnerability; it amplified an existing one**, and part of your job is noticing that and telling someone.

The blast-radius line is the whole security posture in one sentence, and it's the sentence you lead with in Rina's meeting.

**The threat model drives the defences.** Each entry point gets an input defence. Each capability gets access control and gating. Each high-impact action gets idempotency and audit. The highest-risk *combinations* get architectural elimination.

**And the rule: defend proportional to blast radius.** A read-only system needs less armour than one with write access to an origination system. The map makes that calibration explicit rather than guessed.

---
