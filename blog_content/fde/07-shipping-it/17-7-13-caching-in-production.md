---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 17
title: "Caching, in production"
slug: "7-13-caching-in-production"
sectionNumber: "7.13"
part: "PART III — DOING THE WORK"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 165
status: "raw"
section: "§7.13"
summary: ""
enriched: false
---

## § 7.13 — Caching, in production

The § 2.10 ladder, now as infrastructure.

**Exact-match** on identical inputs. **Prompt-prefix caching** at the provider, which requires stable-prefix-first assembly. **Semantic caching** by embedding similarity — and § 3.17 established that at Meridian this applies to the *policy* corpus only, never to applicant-scoped questions.

Add the layers production brings: **a shared cache** — Redis rather than a per-process dict, so all your workers share hits — **HTTP caching** for static responses, and **database query caching** for the hot reads.

**And the invalidation discipline from § 3.17 becomes operational**: cached entries carry the chunk ids they were built from, and the ingestion pipeline purges entries citing updated chunks. A cache that heals itself on sync.

**The one production trap worth naming: a shared cache is a shared blast radius.** A cache key that omits `tenant_id` serves one business line's answer to another. **Tenant id goes in every cache key, always**, and it's worth a test that asserts it.

---
