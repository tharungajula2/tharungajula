---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 3
title: "The server"
slug: "7-1-the-server"
sectionNumber: "7.1"
part: "PART I — THE BACKEND"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 526
status: "raw"
section: "§7.1"
summary: ""
enriched: false
---

## § 7.1 — The server

Everything you've built has been scripts — run-it-yourself code. Production needs a **server**: something that runs continuously, accepts requests over the network, and responds.

**Why FastAPI is the natural fit.** It's Pydantic-native, so your validation skills transfer verbatim. It's async-first, so the async you learned for LLM calls is exactly the async a web server needs. It's type-driven, so type hints generate validation *and* interactive docs automatically.

You already know its foundations.

```python
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings
from contextlib import asynccontextmanager

class Settings(BaseSettings):
    database_url: str
    model_name: str = "claude-sonnet-4-5"
    max_cost_per_file_usd: float = Field(default=0.06, gt=0)
    demo_mode: bool = False

settings = Settings()                      # validated at import — fails loudly at boot

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.pool = await create_pool(settings.database_url)
    yield
    await app.state.pool.close()

app = FastAPI(lifespan=lifespan)

class MemoRequest(BaseModel):
    applicant_id: str = Field(pattern=r"^A-\d{4}$")

class MemoResponse(BaseModel):
    task_id: str
    status: str

@app.post("/memos", response_model=MemoResponse, status_code=202)
async def create_memo(req: MemoRequest, user=Depends(current_user)) -> MemoResponse:
    if not user.can("memo:create"):
        raise HTTPException(403, "not permitted")
    task_id = await enqueue_memo(req.applicant_id, tenant=user.tenant_id)
    return MemoResponse(task_id=task_id, status="queued")
```

**MENTAL TRACE.** Read the four things this does, because each is a production concern in one line.

**Settings validated at import.** `Settings()` runs when the module loads. A missing `database_url` or a `max_cost_per_file_usd` of zero **fails at boot**, not mysteriously at 3 a.m. on the first request. This is fail-loud, applied to configuration, and it converts a whole class of production mysteries into a startup crash.

**Lifespan.** The database pool opens once at startup and closes at shutdown. Everything before `yield` is startup; everything after is teardown.

**Pydantic at the boundary.** `MemoRequest` has a regex on the applicant id. A malformed id is rejected by FastAPI with a 422 before your code runs. The boundary law from Document 01, now the web architecture.

**`status_code=202`, not 200.** 202 means *accepted, not completed* — which is the truth, because § 7.10 puts the actual work on a queue. Returning 200 would be a lie the client acts on.

And `Depends(current_user)` is dependency injection: FastAPI resolves the current user before the handler runs, which makes it swappable in tests and makes § 7.6's auth a single point rather than a line in every endpoint.

**THE DEPLOYMENT LENS.** Two things to settle in week one, with their platform team, before you write an endpoint.

**What API framework do they already run?** If Meridian's platform is Java and every service is Spring Boot, a Python FastAPI service is a new operational species: new base images, new scanning, new runbooks, new on-call knowledge. That may still be right — but it's a *conversation*, not your unilateral decision, and having it early is much cheaper than having it at deployment review.

**What does their API standard require?** Health endpoints at a specific path. Correlation-id headers propagated. A specific structured log shape. Error response schemas. Every enterprise has these written down somewhere, and complying costs you an afternoon at the start and a rewrite at the end.

**Ask "show me a service you've deployed recently that you're happy with" and copy its skeleton.** That single question saves more time than any framework choice.

---
