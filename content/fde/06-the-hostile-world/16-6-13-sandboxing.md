---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "06"
volumeSlug: "the-hostile-world"
volumeTitle: "THE HOSTILE WORLD"
order: 16
title: "Sandboxing"
slug: "6-13-sandboxing"
sectionNumber: "6.13"
part: "PART II — THE DEFENCES"
kind: "narrative"
sourceFile: "FDE_06_THE_HOSTILE_WORLD.md"
tags: []
hasSayThis: false
wordCount: 387
status: "raw"
section: "§6.13"
summary: ""
enriched: false
---

## § 6.13 — Sandboxing

Every other defence tries to *prevent* the bad thing. Sandboxing accepts that prevention sometimes fails and asks: **when it fails, what's the damage?**

**Assume breach. Contain the blast.**

**What needs sandboxing.** Code execution — the sharpest, because it's a remote-code-execution surface by design. Untrusted content processing — the quarantine component. Tool execution generally. Third-party servers.

**The rule: the higher the operation's risk and the lower your trust in what it processes, the tighter the sandbox.**

**The techniques.** *Process isolation.* *Container isolation* — the standard for code execution; a container the code can trash is thrown away. *VM and microVM isolation* for higher risk. **Network isolation** — the sandbox has no network, or only an allowlist, which **removes the exfil path at the infrastructure level.** *Resource limits* — budgets as security controls; an operation that can't consume unbounded resources can't be a denial of service. *Filesystem confinement* — scoped, ephemeral, nothing sensitive, nothing persistent.

**The unifying principle: sandboxing makes the trifecta and least privilege *physical*.**

A network-isolated sandbox doesn't say "the system shouldn't send data out." **There is no network to send it through.** A filesystem-confined sandbox doesn't say "it shouldn't read secrets." **The secrets aren't in this filesystem.**

That's the strongest form of security-as-architecture, because the architecture is now the actual runtime environment rather than the code.

**And it's the foundation of defence in depth: even if every other layer fails and the attacker fully controls the system, the sandbox bounds what "fully controlling the system" can achieve.**

```
MEMO PIPELINE CONTAINER
  network egress ........ DENY ALL except: model API, internal Postgres
  filesystem ............ read-only root; /tmp ephemeral, wiped per run
  secrets ............... injected as env vars, scoped, never on disk
  cpu / memory / wall ... capped per run
  user .................. non-root
```

**MENTAL TRACE.** Two allowlisted egress destinations. Not "outbound traffic is monitored" — **outbound traffic to anywhere else does not resolve.**

If an injection succeeded completely, obtained the full context, and constructed a perfect exfiltration request, **there is no route for it to travel.** The trifecta's third ingredient is removed by the network configuration, which is a stronger guarantee than any prompt or scanner.

The ephemeral `/tmp` matters too: extracted document text doesn't persist between runs, so a compromise of the container yields one file's data at most.

---
