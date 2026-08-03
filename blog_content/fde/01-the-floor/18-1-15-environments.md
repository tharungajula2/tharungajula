---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 18
title: "Environments"
slug: "1-15-environments"
sectionNumber: "1.15"
part: "PART II — THE ENGINEER'S FLOOR"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 369
status: "raw"
section: "§1.15"
summary: ""
enriched: false
---

## § 1.15 — Environments

Project A needs library version 1.0; project B needs 2.0. Install both into one shared Python and they fight — the "works on my machine" disease. A **virtual environment** gives every project its own private toolbox: its own Python, its own packages, zero crosstalk.

Professionals never install project packages globally. Ever.

```bash
python3 -m venv .venv              # create the private toolbox (a folder named .venv)
source .venv/bin/activate          # step inside (Windows: .venv\Scripts\activate)
which python                       # verify: path now points INSIDE .venv
pip install requests               # installs land in the toolbox only
pip freeze > requirements.txt      # snapshot exact versions — the reproducibility contract
deactivate                         # step outside
```

**OUTPUT** (of the `which python` line, after activating)
```
/home/you/meridian-floor/.venv/bin/python
```

**MENTAL TRACE.** `python3 -m venv .venv` creates a folder containing a copy of Python and an empty package directory. `source ... activate` edits your shell's PATH so that `python` and `pip` now resolve to the copies *inside* `.venv` — that's the entire mechanism, nothing mystical. `which python` proves it by printing the resolved path; before activation it would have printed something like `/usr/bin/python3`. `pip install` therefore writes into the toolbox. `pip freeze > requirements.txt` writes every installed package and its exact version into a text file. `deactivate` restores the original PATH.

`requirements.txt` is how a teammate, a server, or a Docker image rebuilds your exact toolbox with `pip install -r requirements.txt`. Two habits that mark professionals: **`.venv/` goes in `.gitignore`** — you commit the *recipe*, never the toolbox — and **one project, one venv, created the minute the folder is born.**

The real test of understanding: deactivate, delete `.venv` entirely, recreate it from `requirements.txt` alone, and run your script again. If it runs, you have proven reproducibility, which is the entire point.

**THE DEPLOYMENT LENS.** "Works on my machine" is a joke among engineers and a fireable offence on a deployment. When your pilot runs on your laptop and fails on Meridian's server, the first two things to check are: is the venv activated, and does the server's `requirements.txt` match yours. `ModuleNotFoundError` on a server that worked locally is almost always one of those two. Knowing that saves an afternoon and a phone call.

---
