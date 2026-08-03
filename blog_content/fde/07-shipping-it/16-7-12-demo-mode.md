---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 16
title: "Demo mode"
slug: "7-12-demo-mode"
sectionNumber: "7.12"
part: "PART III — DOING THE WORK"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 352
status: "raw"
section: "§7.12"
summary: ""
enriched: false
---

## § 7.12 — Demo mode

*Underrated, cheap, and disproportionately valuable for an FDE.*

**A fully-functional version of your system running on simulated data and mocked services** — no real credentials, no costs, no side effects.

**It solves four problems at once.** *Safe demos* — show the system to anyone without exposing real data. *Credential-free CI* — your whole system runs in a pipeline that has no production secrets, which is both a security win and the thing that makes comprehensive testing possible at all. *Cost-free development*. *Reliable demos* — a live demo that depends on real APIs breaks when one is down or rate-limited.

**It works because you built clean interfaces.** Every external dependency sits behind an interface, so demo mode swaps the real implementation for a mock via dependency injection. One flag flips everything.

**Demo mode is the reward for good architecture.** You cannot demo-mode a tangled system.

**THE DEPLOYMENT LENS — and this is worth more at a bank than anywhere else.**

**You will need to demonstrate this system to people who cannot be shown real applicant data.** The steering committee. Internal audit. A regulator, eventually. Procurement. A prospective second business line.

Without demo mode, every one of those demos is either a data-exposure incident or doesn't happen.

**And it unblocks your own development.** In week two you had a read-only extract and no production access. Demo mode is how you build the entire application against realistic fixtures while the access request works through the queue — which converts six weeks of waiting into six weeks of building.

Two more things it buys, both real: **load testing becomes free**, because § 7.15 can hammer the system without spending a cent on model calls. And **the fixtures double as your golden set** — the same curated files that make an impressive demo are the labelled cases from § 5.2.

`[RECEIPT]` **Credential-free demo mode with curated fixtures, running the full stack in CI.** It demonstrates interface discipline, testability, and security awareness in one artifact, and it's the thing you can actually *show* someone in an interview without a customer's data.

---
