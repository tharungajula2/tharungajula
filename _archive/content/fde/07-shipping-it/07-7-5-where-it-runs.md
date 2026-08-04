---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 7
title: "Where it runs"
slug: "7-5-where-it-runs"
sectionNumber: "7.5"
part: "PART I — THE BACKEND"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 381
status: "raw"
section: "§7.5"
summary: ""
enriched: false
---

## § 7.5 — Where it runs

You've got a container. Something has to run it, continuously, with a network address.

**The spectrum.** *Serverless containers* — you hand over an image, the platform runs it, scales it, and you pay per request. Least operational burden, cold-start latency, and constraints on long-running work. *Managed VMs* — you own the machine and what's on it. Most control, most operational burden. *Kubernetes* — a cluster orchestrating containers, with declarative desired state, self-healing, and horizontal scaling. Powerful, and a genuine operational discipline of its own.

**The honest guidance for an FDE: this decision is almost never yours.**

**THE DEPLOYMENT LENS.** Meridian runs Kubernetes because their platform team standardised on it four years ago. That is the answer, and arguing for something simpler is a fight you will lose while spending credibility you need elsewhere.

What matters is what you actually need to learn, and it's less than you'd fear. You need to be able to write a **Deployment** (how many copies of my container, with what image, what environment, what resource limits), a **Service** (how traffic reaches them), a **ConfigMap** and **Secret** reference, **liveness and readiness probes**, and understand **rolling updates and rollback**. That's a week of learning and it covers the overwhelming majority of what an application team touches.

Two probes are worth understanding precisely, because getting them wrong causes outages that look mysterious.

**Liveness** answers *should this container be killed and restarted?* **Readiness** answers *should this container receive traffic right now?*

Conflating them is a classic and expensive mistake. If your readiness probe checks the database and the database has a brief hiccup, readiness correctly removes the pod from traffic and puts it back when the database recovers. If your **liveness** probe checks the database, the same hiccup kills and restarts every pod simultaneously — turning a five-second database blip into a full outage with a thundering-herd reconnect.

**Liveness checks whether the process is wedged. Readiness checks whether it can serve.** Never make liveness depend on a downstream dependency.

And the thing to ask their platform team, which saves weeks: **"can I get a sample manifest from a service you already run?"** Copy it. Their conventions around labels, resource requests, node selectors, and annotations are load-bearing in ways that aren't documented anywhere.

---
