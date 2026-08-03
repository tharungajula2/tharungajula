---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 9
title: "Who are you, and what may you do"
slug: "7-6-who-are-you-and-what-may-you-do"
sectionNumber: "7.6"
part: "PART II — GETTING IN AND STAYING OUT"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 375
status: "raw"
section: "§7.6"
summary: ""
enriched: false
---

## § 7.6 — Who are you, and what may you do

Two words people constantly confuse, and confusing them causes breaches.

**Authentication** establishes *identity*: who is this request from? **Authorization** establishes *permissions*: is this identity allowed to do this?

**Authenticate first, then authorize. Both, in order, always.**

The dangerous failure is **authenticated but not authorized** — a valid, logged-in user accessing *another user's* data, because you checked *who* they were and never checked *what they're allowed to see*. That's the most common serious API vulnerability in existence, and it produces breaches that look like normal traffic in the logs.

**JWT — stateless authentication.** On login the server issues a signed token containing identity and claims. The client sends it with each request. The server **validates the signature**, proving the token is genuine and unmodified, and reads the identity — with no database lookup.

```python
async def current_user(authorization: str = Header(...)) -> User:
    token = authorization.removeprefix("Bearer ").strip()
    try:
        claims = jwt.decode(
            token,
            key=jwks_client.get_signing_key_from_jwt(token).key,
            algorithms=["RS256"],                      # ← pinned, never from the token
            audience=settings.expected_audience,
            issuer=settings.expected_issuer,
        )
    except jwt.PyJWTError as e:
        raise HTTPException(401, "invalid token") from e
    return User(id=claims["sub"], tenant_id=claims["tenant"], roles=claims["roles"])
```

**MENTAL TRACE — and three lines here are security-critical.**

`algorithms=["RS256"]` is **pinned in your code**, not read from the token's header. If you trust the token's declared algorithm, an attacker sets it to `none`, sends an unsigned token, and your validator accepts it. **This is the classic JWT auth bypass** and it has taken down real systems.

`audience` and `issuer` are checked. Without them, a valid token issued by the same identity provider for a *different* application is accepted by yours. Signature validity alone is not sufficient; the token must have been intended for you.

And `claims["sub"]`, `claims["tenant"]`, `claims["roles"]` come from the *signed* payload — which means they can't be tampered with, which means § 7.9 can trust `tenant_id` as the basis for data isolation.

**Never put secrets in a JWT.** It's signed, not encrypted — anyone holding it can read the contents.

**API keys — machine authentication.** For programmatic access, maintain a key table: each key maps to an identity, a set of permissions, a rate limit, and metadata. Issuing, scoping, rotating, and revoking is how you give programmatic clients authenticated, authorized, bounded access.

---
