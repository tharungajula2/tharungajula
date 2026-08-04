---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 18
title: "Attack it, fix it, lock it"
slug: "6-14-attack-it-fix-it-lock-it"
sectionNumber: "6.14"
part: "PART III — PROVE IT AND SHIP IT"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 379
status: "raw"
section: "§6.14"
summary: ""
enriched: false
---

## § 6.14 — Attack it, fix it, lock it

Red-teaming produces findings. Findings become fixes. **Fixes become permanent tests, CI-gated**, or they rot.

```
RED-TEAM BATTERY — 60 attacks, run by Meridian security + you
─────────────────────────────────────────────────────────────────
category                    n    succeeded   after fixes
override keyword           10        0            0
role-play / persona         6        0            0
professional-courtesy       8        6 ⚠          1 ⚠
suppression phrasing
hidden in scan (6pt grey)   6        4 ⚠          0
encoded (base64 in doc)     4        1            0
context overflow            5        2            0
crescendo across docs       5        3 ⚠          2 ⚠
prompt extraction           6        1            0
cross-applicant read       10        0            0   ← SQL-scoped, not promptable
─────────────────────────────────────────────────────────────────
attack success rate      27% → 5%
EXFILTRATION SUCCESSES:   0 → 0     ← no network path exists
─────────────────────────────────────────────────────────────────
```

**MENTAL TRACE — read the last two lines as different kinds of claim.**

The success rate fell from 27% to 5%. That's real improvement and it is **probabilistic** — it will move as attackers get cleverer, and 5% is not zero.

Exfiltration successes are zero and **were zero before any of the fixes**, because there is no network path. That's **architectural**, and it doesn't move.

**Two rows, two epistemologies.** One is "we got better at catching things." The other is "this cannot happen." **Never present them as the same kind of assurance**, and when a customer asks what you can guarantee, guarantee only the second kind.

Now look at what still succeeds. The professional-courtesy suppression attacks — the § 6.2 genre — remain the hardest, and the crescendo attacks that split a payload across multiple documents in one file are worse, because no single document is suspicious.

**Say that out loud in the room.** *"Two attack classes still work about 20% of the time and I don't have a detection fix for them. What I have is that neither can do anything except degrade a draft a human reads. That's the honest position."*

**Then lock it.** The battery becomes an injection test suite, versioned, run in CI, with the exfiltration row as a **hard zero-tolerance gate**. Any change that opens a network path fails the build.

`[RECEIPT]` **The red-team battery with before-and-after success rates, and the CI-gated injection suite with the zero-exfil assertion.** The honest reporting of what still works is what makes it credible.

---
