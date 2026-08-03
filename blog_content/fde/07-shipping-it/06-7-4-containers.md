---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "07"
volumeSlug: "shipping-it"
volumeTitle: "SHIPPING IT"
order: 6
title: "Containers"
slug: "7-4-containers"
sectionNumber: "7.4"
part: "PART I — THE BACKEND"
kind: "narrative"
sourceFile: "FDE_07_SHIPPING_IT.md"
tags: []
hasSayThis: false
wordCount: 335
status: "raw"
section: "§7.4"
summary: ""
enriched: false
---

## § 7.4 — Containers

"It works on my machine" is the oldest lie in software. Docker packages your application **with its entire environment** into an image that runs identically everywhere.

A venv isolates Python packages. **Docker isolates everything** — OS libraries, runtime, packages, config. The image *is* the pinned environment, byte-for-byte identical across machines.

```dockerfile
FROM python:3.12-slim
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt   # ← deps layer, cached

COPY . .                                              # ← code layer, changes often

RUN useradd -m appuser && chown -R appuser /app
USER appuser

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

**MENTAL TRACE.** Each instruction is a **layer**, and layers are cached. The ordering here is the fast-iteration trick: `requirements.txt` is copied and installed **before** the code is copied.

Change one line of Python and only the final `COPY . .` layer rebuilds — the dependency install, which takes minutes, is reused from cache. Reverse the order and every code change reinstalls every dependency.

`USER appuser` drops root. A container running as root that gets compromised is a much worse day than one running as an unprivileged user, and most enterprise image-scanning policies reject root containers outright.

**AI-specific concerns.** *Image size* — AI dependencies are huge; use slim bases, multi-stage builds, and `.dockerignore`. *Secrets* — **never bake keys into the image**, which is a distributable artifact. Inject at runtime. *Model weights* — usually better loaded from storage than bundled.

**THE DEPLOYMENT LENS.** You will almost certainly not use `python:3.12-slim`.

Enterprises maintain **approved base images** — hardened, scanned, patched on a schedule, with an internal registry mirror. Using a public base image will fail their container scanning at deployment review.

So: ask for the approved Python base image in week one. Ask what scanner runs and what severity threshold blocks a deploy. And then run that scanner in *your* CI from day one, because discovering forty CVEs in your dependency tree the week before go-live is a genuinely bad week that is entirely avoidable.

---
