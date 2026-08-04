---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 21
title: "Classes and modules"
slug: "1-18-classes-and-modules"
sectionNumber: "1.18"
part: "PART II — THE ENGINEER'S FLOOR"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 668
status: "raw"
section: "§1.18"
summary: ""
enriched: false
---

## § 1.18 — Classes and modules

You don't need to *write* clever object-oriented code to be an AI engineer — but every codebase you open is built from classes and modules, so you must *read* them like plain English. A class is a blueprint bundling data with the functions that operate on it. A module is just a file you can import. That's 90% of the mystery.

Here is the canonical example, exactly as it appears in the source material:

```python
class Agent:
    def __init__(self, name: str, model: str):   # runs at creation
        self.name = name                          # self = THIS instance
        self.history: list[dict] = []
    def ask(self, prompt: str) -> str:
        self.history.append({"role": "user", "content": prompt})
        return f"[{self.name}] would call {self.model} here"

bot = Agent("vizier", "claude-sonnet-4-6")        # instantiate → __init__ fires
bot.ask("hello")                                   # method call; self is bot
```

**OUTPUT**
```
AttributeError: 'Agent' object has no attribute 'model'
```

**MENTAL TRACE — and read this one carefully, because it teaches two things at once.**

`class Agent:` defines a blueprint. Nothing runs yet. `Agent("vizier", "claude-sonnet-4-6")` creates an instance and immediately fires `__init__`, which receives `name = "vizier"` and `model = "claude-sonnet-4-6"`. It stores `self.name = name` and creates an empty `self.history`.

Then notice what it does **not** do: it never stores `model`. The parameter arrives, is never assigned to `self`, and vanishes when `__init__` finishes.

So when `bot.ask("hello")` runs, the append works fine, and then the f-string reaches for `self.model` — which was never created. Python raises `AttributeError`.

I have left this exactly as written rather than quietly fixing it, because **this is the single most common class bug in existence and you will meet it in customer codebases constantly.** The fix is one line:

```python
class Agent:
    def __init__(self, name: str, model: str):
        self.name = name
        self.model = model                        # ← the missing line
        self.history: list[dict] = []
    def ask(self, prompt: str) -> str:
        self.history.append({"role": "user", "content": prompt})
        return f"[{self.name}] would call {self.model} here"

bot = Agent("vizier", "claude-sonnet-4-6")
print(bot.ask("hello"))
print(bot.history)
```

**OUTPUT**
```
[vizier] would call claude-sonnet-4-6 here
[{'role': 'user', 'content': 'hello'}]
```

**MENTAL TRACE.** Now `self.model` exists, so the f-string resolves both `{self.name}` and `{self.model}` and returns the sentence. The second print shows that `bot.history` genuinely changed — `ask` reached into the instance's own data and appended to it. That is the whole point of a class: data and the functions that touch it, travelling together.

**Decoder ring for reading real code.** `__init__` is the constructor. `self` means "this particular object." `bot.ask(...)` is a function living on the object that can touch its data. `class ChatAgent(Agent):` is **inheritance** — ChatAgent *is an* Agent plus overrides, and this is how frameworks give a hundred variants one shared interface. Recognising "subclass overriding a base method" unlocks that entire codebase style. You'll also constantly see `@dataclass` (auto-writes `__init__` for data-holding classes) and `@property`. Recognise, don't memorise.

**Modules and imports.** Every `.py` file is a module; a folder with `__init__.py` is a package. `from agent import Agent` runs `agent.py` and pulls the name in. Two things that bite beginners: imports resolve relative to where you *run* from, which is why you'll see `python -m package.module` executed from the project root. And `if __name__ == "__main__":` means "run this only when executed directly, not when imported" — it's how one file is both a library and a script.

```python
def summarise(path: str) -> str:
    return f"summary of {path}"

if __name__ == "__main__":
    print(summarise("A-4417.pdf"))
```

**OUTPUT** (when run directly as `python summariser.py`)
```
summary of A-4417.pdf
```

**OUTPUT** (when imported elsewhere with `from summariser import summarise`)
```
(nothing — the print never fires)
```

**MENTAL TRACE.** Python sets a hidden variable `__name__` in every file. When you run a file directly, its `__name__` is the string `"__main__"`, so the condition is true and the block runs. When the same file is *imported*, `__name__` becomes the module's name instead — `"summariser"` — the condition is false, and the block is skipped. Which is why importing a well-written module doesn't spray output at you.

---
