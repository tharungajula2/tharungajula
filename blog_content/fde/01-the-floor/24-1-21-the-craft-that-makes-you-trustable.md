---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 24
title: "The craft that makes you trustable"
slug: "1-21-the-craft-that-makes-you-trustable"
sectionNumber: "1.21"
part: "PART II — THE ENGINEER'S FLOOR"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 670
status: "raw"
section: "§1.21"
summary: ""
enriched: false
---

## § 1.21 — The craft that makes you trustable

Everything so far taught you to write code that *runs*. This is the jump to code a *team* can trust: organised as a package, typed, **tested**, measured, and installable. It is the loudest difference between "I did a course" and "I've worked on real software."

**The standard skeleton** — recognise it in every serious repo:

```
tokentools/
├── pyproject.toml          # the project's ID card + dependencies + metadata
├── README.md
├── src/tokentools/
│   ├── __init__.py         # marks the package; exports the public API
│   ├── counter.py
│   └── pricing.py
└── tests/
    └── test_counter.py
```

`pyproject.toml` — name, version, dependencies, `requires-python` — is modern Python's single config file. With it, `pip install -e .` installs your package *editable* into your venv, so imports work from anywhere and edits apply instantly. That one command is how professionals work on their own libraries.

**Testing with pytest — the heart of it.** A test is a tiny function that *asserts* the truth:

```python
# tests/test_counter.py
from tokentools.counter import estimate_tokens
import pytest

def test_english_rule_of_thumb():
    assert estimate_tokens("hello world, how are you") == 6   # ~4 chars/token

def test_empty_string():
    assert estimate_tokens("") == 0

def test_rejects_non_string():
    with pytest.raises(TypeError):
        estimate_tokens(1234)
```

**OUTPUT** (running `pytest`)
```
===================== test session starts ======================
collected 3 items

tests/test_counter.py ...                                 [100%]

====================== 3 passed in 0.02s =======================
```

**MENTAL TRACE.** `pytest` scans for files named `test_*.py` and functions named `test_*`, then runs each one. Test one calls `estimate_tokens` on a 24-character string; `24 // 4` is 6; `assert 6 == 6` passes silently. Test two: `len("")` is 0, `0 // 4` is 0, passes. Test three is the interesting one — `pytest.raises(TypeError)` means *I expect this block to crash with a TypeError*, so the test passes **because** the crash happened. Had `estimate_tokens(1234)` returned a number instead, the test would have failed.

Each dot in the output is one passing test. A failure prints an `F` and then shows you the exact line and the actual-versus-expected values.

**Internalise the trio every suite needs:** the happy path, the *edge cases* (empty, huge, unicode), and the *expected failures*.

**Then the habit that changes how you build — the regression ritual.** Every bug you ever fix gets a test that reproduces it *first*, so it can never sneak back. Tests aren't bureaucracy; they're the safety net that makes you **brave**. You'll refactor fearlessly in ten minutes because pytest will catch anything you break.

This mindset scales all the way up: **model evals are pytest for AI behaviour**, and that is Document 05 in one sentence.

**Profiling — measure, never guess.** When code is slow, humans guess wrong about why. `python -m cProfile -s cumtime main.py` prints where the time actually went, sorted by cumulative time. `time.perf_counter()` around a suspect block is the quick manual version. The law: optimise *only* what profiling proves is hot.

**The craft checklist** that turns any script into a professional artifact: package layout ✓ · type hints on every public function ✓ · docstrings saying *what and why* ✓ · tests covering happy, edge, and failure ✓ · `pip install -e .` works in a fresh venv ✓ · README with a five-line usage example ✓.

**THE DEPLOYMENT LENS.** A customer engineering team decides very early whether you are a real engineer or a demo person, and they decide it by reading your code, not by watching your demo.

`[RECEIPT]` **Ship the `tokentools` package with a green test suite and a README.** Small, complete, professional. It is a better portfolio artifact than a large impressive-looking project with no tests, because it demonstrates the thing that's actually scarce.

And one FDE-specific note that is genuinely load-bearing: on a deployment you will hand this code over and leave. The test suite is not for you. It's for the Meridian engineer who inherits it in month nine and needs to change something without breaking a regulated process. **Tests are the handover.** That framing appears again in Document 08 and it is how you get invited back.

---
