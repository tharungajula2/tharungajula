---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 5
title: "Migrations and pooling"
slug: "7-3-migrations-and-pooling"
sectionNumber: "7.3"
part: "PART I — THE BACKEND"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 566
status: "raw"
section: "§7.3"
summary: ""
enriched: false
---

## § 7.3 — Migrations and pooling

Your schema will change. How do you change a *live* database's structure without losing data or breaking the running app?

**A migration is a versioned, sequential change to the schema.** The runner applies migrations in order, tracks which have been applied, and applies only the new ones.

This is Git for your schema: your schema's history is a sequence of migrations, reproducible on any database — a fresh dev DB, staging, production — all reaching the same state by running the same migrations in order.

**Transaction safety is the critical correctness property.** A migration that half-applies leaves the database in a broken, inconsistent state. So run each migration **in a transaction**: either the whole thing commits, or *any* failure rolls back the entire migration, leaving the schema untouched.

**All-or-nothing.** A failed migration becomes a no-op you fix and retry, never a half-broken schema you untangle at 3 a.m.

```
$ python -m migrate up

  003_memo_queue.sql          applied   (0.04s)
  004_audit_chain.sql         applied   (0.11s)
  005_add_supersede_flag.sql  FAILED
      ERROR: column "superseded" of relation "documents" already exists
      → transaction rolled back; schema unchanged
      → 2 of 3 migrations applied; 005 not recorded

$ python -m migrate up          # after fixing 005
  005_add_supersede_flag.sql  applied   (0.02s)
```

**MENTAL TRACE.** Migrations 003 and 004 committed and were recorded in the tracking table. 005 failed partway, so its transaction rolled back — the table is exactly as it was before 005 started, and 005 is **not** recorded as applied.

Re-running after the fix skips 003 and 004 (already recorded, idempotent) and applies only 005. **Idempotent re-runs are what make this safe to run automatically on every deploy.**

**Connection pooling.** Opening a database connection is expensive — a handshake, auth, tens of milliseconds. A server handling many requests can't open one per request; it would be slow and would exhaust the database's connection limit.

A **pool** maintains reusable open connections. A request *borrows* one, uses it, *returns* it. The pool bounds total connections, protecting the database, and eliminates per-request overhead.

**Connection exhaustion is the classic production database outage**, and pooling is what prevents it.

**THE DEPLOYMENT LENS.** At Meridian you will not own the database, and this changes several things.

**You get a connection budget, not a database.** Their DBA allocates you a maximum — often much lower than you'd choose, because four other teams share the instance. Size your pool to that number, not to your throughput ambitions, and find out what it is before you build.

**Migrations may not be yours to run.** Many banks require schema changes to go through a DBA review and a scheduled window. **Write your migrations to be reviewable by someone who doesn't know your system**: plain SQL, one logical change per file, a comment explaining why, and an explicit `down` where reversal is possible.

**And the constraint that will actually bite: you may not be allowed to run migrations automatically on deploy.** If schema changes are gated on a two-week change window, your application must tolerate running against *both* the old and new schema — which means every migration is additive first (add the column, deploy code that writes both, backfill, then deploy code that reads the new one, then drop the old one in a later window). That's four deploys for one column, and planning for it is the difference between shipping on schedule and discovering the constraint in month five.

---
