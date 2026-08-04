---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 22
title: "Practising failure"
slug: "7-17-practising-failure"
sectionNumber: "7.17"
part: "PART IV — KEEPING IT ALIVE"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 458
status: "raw"
section: "§7.17"
summary: ""
enriched: false
---

## § 7.17 — Practising failure

**Everything fails eventually. The question is whether you've practised for it.**

**Chaos engineering.** Deliberately inject failures — kill a worker, drop a database connection, make a dependency slow — *on purpose*, in a controlled way, to verify the system handles it.

Why deliberately break things: because failures *will* happen, and the only way to *know* your system recovers is to test that it does — **while you're watching and calm**, not at 3 a.m., unrehearsed.

```
DRILL 1  kill 2 of 3 workers mid-batch
  → queue depth rose, throughput fell to 1/3, no tasks lost
  → autoscaler replaced them in 90s
  ✓ PASS

DRILL 2  model API returns 503 for 5 minutes
  → gateway retried with backoff, then fell to secondary provider
  → 14 files completed on secondary, cost +40%, quality unchanged
  ✓ PASS

DRILL 3  database failover (primary → replica, 30s)
  → in-flight requests failed with 500, not a graceful message
  → workers crashed rather than reconnecting; needed manual restart
  ✗ FAIL — no reconnect logic, no graceful degradation
```

**MENTAL TRACE.** Two passes and a genuine failure, which is the correct outcome of a drill — **a drill where nothing fails taught you nothing.**

Drill three found two distinct bugs. The API returned a raw 500 instead of a useful message, which is a UX problem. And the workers *crashed* instead of reconnecting, which is an availability problem requiring manual intervention — meaning a 30-second database failover became a 20-minute outage plus a page.

**That's a real incident you didn't have**, discovered on a Tuesday afternoon with everyone awake.

**Rollback protocols.** In an incident, **mean-time-to-recovery is everything**, and a fast rollback is usually faster and safer than a forward-fix under pressure.

**Make rollback trivial and rehearsed**, so the incident response is "roll back, breathe, then diagnose calmly" rather than "debug live while users suffer."

**Database migration backups — protecting the irreplaceable.** Code rolls back easily. **Data doesn't.** A migration that corrupts or drops data is often irreversible.

Backup before migrating. Write reversible migrations where possible. Test migrations on a production-data copy. **And drill the restore** — an untested backup is a hope, not a protection, and "we had backups but the restore didn't work" is a real and common disaster.

**THE DEPLOYMENT LENS.** Time your rollback and put the number in the runbook.

*"Rollback to the previous version takes four minutes: one command, verified by the health endpoint."* That sentence, with a rehearsed number behind it, does more for a change-approval conversation than any amount of testing evidence — because the question a change board is actually asking is **"how bad is it if you're wrong?"**

A four-minute answer changes the risk calculus of every subsequent deploy you propose.

---
