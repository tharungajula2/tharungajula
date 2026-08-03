---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 10
title: "Least privilege"
slug: "6-7-least-privilege"
sectionNumber: "6.7"
part: "PART II — THE DEFENCES"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 434
status: "raw"
section: "§6.7"
summary: ""
enriched: false
---

## § 6.7 — Least privilege

Give every component the *minimum* access it needs and **nothing more**. The oldest law in security, and the concrete engineering of the trifecta.

**The key distinction.** The capability isn't restricted-by-prompt — *"please don't write to the origination system"* — it's **absent**. The tool isn't in the toolbox. The credential was never provisioned.

That's the difference between "the system is instructed not to," which injection defeats, and "the system cannot," which it doesn't.

### The granularities

*Fewer tools* — the obvious layer.

*Scoped tools* — a tool that reads only *this* applicant's documents, not all applicants'. The confused-deputy defence.

*Scoped credentials* — the key has read-only permission, or access to one resource, not god-mode. Even if it leaks, the blast radius is bounded.

*Time-bounded access* — granted for the duration needed, revoked after.

*Per-component, not per-system* — each part gets its own minimal privileges.

```
PRIVILEGE AUDIT — memo pipeline
────────────────────────────────────────────────────────────────
capability          has    needs   scope
search_file          ✓       ✓     WHERE applicant_id = :current  ← enforced in SQL,
                                                                    not in the prompt
search_policy        ✓       ✓     read-only, policy corpus only
compute_ratio        ✓       ✓     no I/O
list_documents       ✓       ✓     scoped to current applicant
save_draft           ✓       ✓     review queue only, gated
read_all_applicants  ✗       ✗     never provisioned
origination_write    ✗       ✗     never provisioned
network_egress       ✗       ✗     blocked at the container
────────────────────────────────────────────────────────────────
DB credential: SELECT only, on 3 tables, no DELETE, no DDL
```

**MENTAL TRACE.** The most important line is the scope on `search_file`.

**The applicant scoping is enforced in the SQL query, not in the prompt.** The system prompt could say "only look at the current applicant" and an injection could argue its way past that. A `WHERE applicant_id = :current` clause bound in the query has no argument available to it.

The bottom three rows are capabilities that were never provisioned. They're in the audit *because being able to point at what's absent is the assurance*. "We didn't give it that" is a stronger statement than "we told it not to."

And the credential line matters: `SELECT` only, three tables, no `DELETE`. Even total compromise of the application yields a read-only connection to a fraction of the schema.

**The tension, honestly.** Least privilege *constrains*, and there's a real pull toward over-provisioning — "just give it access to everything so it can handle anything." Resist it. **Start with nothing, add each capability deliberately when the task provably needs it, scope it as tightly as function allows, and re-audit as tasks change**, because capabilities accrete.

**The most secure system is the least-capable one that still does its job**, and finding that minimum is the craft.

---
