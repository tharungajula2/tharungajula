---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 24
title: "Go-live"
slug: "go-live"
sectionNumber: null
part: "PART IV — KEEPING IT ALIVE"
kind: "scene"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 564
status: "raw"
section: ""
summary: ""
enriched: false
---

## Go-live

It goes live on a Tuesday, in a two-hour window, at 20% of the personal loan book.

The change record was generated automatically from the commit range and the eval report. The rollback command is in the runbook with a rehearsed time of four minutes. Two people from Meridian's platform team are on the call, and one of them has the rollback command open in a terminal, which is correct.

Nothing dramatic happens. Files flow. The queue drains. p95 sits at 11 seconds. The first memo lands in Tom's review queue eleven minutes in and he edits one figure, which becomes golden case 95.

At 20% for two weeks, then 50%, then full.

Six weeks later you get a message at 7 a.m.: memo generation is failing, roughly 30% of files, since about 2 a.m.

You open the dashboard from your kitchen. Error rate up. Latency normal. Cost per file down — which is the strange one, because a *drop* in cost means the model is being called less, not more.

The trace shows retrieval returning empty for the failing files. The failing files are all from one branch. The ingestion report shows that branch's document count fell to zero at 01:47.

They changed a file-share path during an overnight maintenance window. Nobody told anybody, because from their side they moved a folder.

You post the diagnosis in the channel at 07:20 and go back to your coffee, because **it isn't your fix.** Meridian's platform team updates the path, the backlog drains by 09:15, and the postmortem adds a monitor on per-branch ingestion volume so the next one alerts at 02:00 instead of being noticed by a human at 07:00.

That incident is the best thing that happened to this deployment.

Not because it went well — though it did. Because **you weren't the only person who could fix it.** They saw it, they had the dashboard, they had the runbook, they made the change, and they wrote the follow-up monitor themselves.

Which is the actual measure of whether a deployment succeeded, and it is not the accuracy number.

---

You now have a system that works, that is measured, that is defended, that is deployed, and that survived its first real incident without you being the single point of failure.

There is one thing left, and it's the half of the job the entire technical curriculum never mentions: **the deployment was never the product.** The product was a change in how forty underwriters do their work, and that change is only partly built.

Adoption isn't the same as deployment. Handover isn't the same as documentation. And the reason you were sent here — the thing your company actually needs from this engagement — is not a working system at one bank. It's what you learned that makes the next twelve deployments faster.

---

**Wikilinks:** [[build-fastapi-backend]] · [[sse-streaming]] · [[build-migration-runner]] · [[docker-for-ai]] · [[deploying-backends]] · [[google-oauth-flow]] · [[authn-vs-authz]] · [[secrets-cost-engineering]] · [[multi-tenancy-design]] · [[supabase-deep-dive]] · [[build-async-workers]] · [[rate-limiting-logs]] · [[build-demo-mode]] · [[caching-layer-depth]] · [[monitoring-alerting]] · [[observability-slos]] · [[build-load-testing]] · [[cloud-fundamentals]] · [[cicd-fundamentals]] · [[build-github-actions]] · [[failure-drills-rollbacks]] · [[compliance-responsible-ai]] · [[privacy-in-memory]] · [[build-idempotency-audit]] · [[least-privilege-tools]]

*Next — Document 08: THE FORWARD-DEPLOYED CRAFT. The half nobody teaches: discovery technique, scoping and saying no, demo craft, pilot-to-production conversion, adoption, handover, stakeholder management, pattern-back-to-product — and the receipts index that turns all of this into evidence.*
