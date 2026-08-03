---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 9
title: "The lethal trifecta"
slug: "6-6-the-lethal-trifecta"
sectionNumber: "6.6"
part: "PART II — THE DEFENCES"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 628
status: "raw"
section: "§6.6"
summary: ""
enriched: false
---

## § 6.6 — The lethal trifecta

*The single most important idea in agent security, and it is beautifully simple.*

A catastrophic exfiltration breach requires **three** things together:

**Access to private data** — the system can read something sensitive.

**Exposure to untrusted input** — it processes content an attacker can control.

**A way to exfiltrate** — it can send data *out*.

**Any one alone is safe-ish.** Private data with no untrusted input and no exfil is a secure vault. Untrusted input with no private data and no exfil is a harmless text processor. Exfil ability with neither of the others is a normal tool doing its job.

**It's the combination that's lethal**: untrusted input injects instructions → those instructions read private data → and send it out. **Break the chain anywhere and the attack collapses.**

### The defensive superpower

Because all three are *required*, you defend by **architecturally removing one.**

*Remove untrusted input* — the system only processes vetted content. Limiting, but right for high-privilege systems.

*Remove private-data access* — it processes untrusted content but can't read anything sensitive. Nothing to steal.

*Remove exfil paths* — it has private data and untrusted input but no way to send data out. It can be injected and can read secrets but **can't get them to the attacker.** Often the easiest to remove.

**The Rule of Two.** A system should have at most two of {untrusted input, private data, consequential external action} — never all three in one context. **If a task seems to need all three, split it.** A quarantined component handles the untrusted input and produces sanitised output; a separate trusted component handles the private data and actions.

**The split *is* the defence.** The Rule of Two turns "how do I secure this?" into "how do I decompose this so no single component holds the trifecta?" — a far more tractable question.

### Meridian, assessed

```
COMPONENT              UNTRUSTED IN   PRIVATE DATA   EXFIL PATH   VERDICT
─────────────────────────────────────────────────────────────────────────
ingestion pipeline          YES            YES           no        SAFE (2)
memo pipeline               YES            YES           no        SAFE (2)
underwriter chat            no             YES           no        SAFE (1)
policy Q&A                  no             no            no        SAFE (0)
─────────────────────────────────────────────────────────────────────────
PROPOSED PHASE 2
bureau-writeback agent      YES            YES          YES        ⚠ TRIFECTA
```

**MENTAL TRACE.** The current system holds two ingredients everywhere and never three. It reads applicant-submitted documents (untrusted) containing consumer financial data (private) — and has **no path to send anything anywhere.** No network tool, no email, no external write. Injection can succeed completely and still achieve nothing but a bad draft that a human reads.

Now look at the proposed phase two. Someone will suggest that the system write its findings back into the bureau or origination system, because it's obviously useful and it saves the underwriter a copy-paste.

**That single feature adds the third ingredient and creates a genuine exfiltration path.** An injected instruction in an applicant-submitted document could cause the system to write attacker-chosen content into a system of record.

The Rule of Two answer: split it. The memo pipeline produces a draft with no write capability. A **separate, narrow** component takes a *human-approved* memo — no untrusted content, only validated structured fields — and writes it. The untrusted content never meets the write capability.

**"Where would you decompose this?" is a better security question than "how would you secure this?", and the trifecta is what tells you where.**

### Why this is the keystone

Every other defence *reduces the probability* of an attack succeeding. The trifecta discipline **removes the possibility of catastrophe by construction.**

Probabilistic defences fail sometimes. Architectural ones don't fail, because there's nothing to fail — **you cannot exfiltrate private data through a system that has no exfiltration path.**

This is why security is architecture and not vigilance. Vigilance is probabilistic and tiring. Architecture is structural and permanent.

---
