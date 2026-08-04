---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 12
title: "Isolation you can't forget"
slug: "7-9-isolation-you-cant-forget"
sectionNumber: "7.9"
part: "PART II — GETTING IN AND STAYING OUT"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 537
status: "raw"
section: "§7.9"
summary: ""
enriched: false
---

## § 7.9 — Isolation you can't forget

One user is easy. **Many users sharing one system, each seeing only their own data**, is where real product architecture begins.

**The isolation strategies.** *Row-level* — all data in the same tables with a `tenant_id` column and **every query filtered by it**. Cheapest, most scalable, and isolation depends on never forgetting the filter. *Schema-level* — each tenant gets their own tables. *Database-level* — strongest isolation, most overhead.

Most systems use row-level, because it scales best — **if the enforcement is architectural rather than manual.**

**The danger of row-level is the forgotten filter.** One query missing `WHERE tenant_id = ...` leaks every tenant's data, and it's a one-line bug in a five-thousand-line codebase.

**Row-Level Security removes the danger by enforcing the filter in the database.**

```sql
ALTER TABLE memos ENABLE ROW LEVEL SECURITY;
ALTER TABLE memos FORCE ROW LEVEL SECURITY;

CREATE POLICY memo_tenant_isolation ON memos
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

```python
async with pool.acquire() as conn:
    await conn.execute("SET LOCAL app.tenant_id = $1", user.tenant_id)
    rows = await conn.fetch("SELECT * FROM memos")      # ← no WHERE clause. Deliberately.
```

**OUTPUT**
```
tenant a3f1... : 1,204 rows
tenant 7b92... :   856 rows
```

**MENTAL TRACE — and this is the most important demonstration in this document.**

The Python query has **no `WHERE tenant_id`**. It says `SELECT * FROM memos`, which in a normal database returns everything.

`SET LOCAL app.tenant_id` sets a session variable for the duration of this transaction. The RLS policy reads that variable and silently appends its condition to every query against the table.

So the same query, run under two different tenants, returns two disjoint sets. **The application forgot the filter and the database isolated anyway.**

`FORCE ROW LEVEL SECURITY` matters: without it, the table owner bypasses RLS, which usually means your application's own role bypasses it and the whole protection quietly does nothing.

**That's "security is architecture, not vigilance" as the multi-tenancy foundation.** RLS turns "every developer must remember to filter every query correctly, forever" — impossible — into "the database enforces isolation structurally" — reliable.

**Per-tenant limits — the noisy neighbour.** Isolation isn't just data, it's resources. Without limits, one tenant hammering the API slows everyone, one tenant running expensive work burns shared budget. Contain it with per-tenant rate limits, resource quotas, and cost caps.

**THE DEPLOYMENT LENS.** Meridian has one tenant — themselves — so this looks unnecessary. Build it anyway, and the reason isn't future-proofing.

**Their business lines behave like tenants.** Personal loans and small-business lending have different underwriters, different policy documents, different DTI ceilings, and — crucially — different people who should not see each other's files. Consumer and commercial data segregation is a real regulatory boundary at some institutions, not a product-tier feature.

**Model the business line as the tenant from day one.** Retrofitting isolation onto a system that assumed one pool of data is a rewrite, and it's a rewrite you'll be asked for in month eight when they want to extend to the commercial book.

`[RECEIPT]` **The RLS forgotten-filter proof.** Write a query with no tenant filter, run it under two tenant contexts, and show the database isolating anyway. It's a five-line demonstration of a principle most engineers only talk about.

---
