---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "01"
volumeSlug: "the-floor"
volumeTitle: "THE FLOOR"
order: 17
title: "The terminal"
slug: "1-14-the-terminal"
sectionNumber: "1.14"
part: "PART II — THE ENGINEER'S FLOOR"
kind: "narrative"
sourceFile: "FDE_01_THE_FLOOR.md"
tags: []
hasSayThis: false
wordCount: 560
status: "raw"
section: "§1.14"
summary: ""
enriched: false
---

## § 1.14 — The terminal

The terminal is where all serious tools live — Git, pip, Docker, SSH, every deploy script. GUIs are menus at a restaurant; the terminal is the kitchen. The fear dissolves with one realisation: it's a *conversation*. You type a sentence — command, options, target — and the computer answers. About fifteen verbs cover 95% of an engineer's day.

**Moving and seeing:** `pwd` (where am I) · `ls -la` (what's here, including hidden dotfiles like `.venv` and `.git`) · `cd path` / `cd ..` / `cd ~` · `mkdir -p a/b/c` · `cp`, `mv` (also rename), `rm -r` (no trash can — respect it) · `cat f` (print a file) · `less f` (page through, `q` quits) · `head` / `tail` (`tail -f log` watches a log live — you will use this for the rest of your life).

**The two superpowers.** *Pipes:* `|` sends one command's output into the next.

```bash
cat app.log | grep ERROR | wc -l
```

**OUTPUT**
```
7
```

**MENTAL TRACE.** Read it as a sentence: print the log, keep only lines containing ERROR, count them. `cat` dumps all 50 lines into the pipe. `grep ERROR` reads that stream and passes through only matching lines — 7 of them. `wc -l` reads *those* and prints how many lines it saw. Three small tools composed into one answer. That composition is the Unix philosophy and it's why the terminal beats any GUI for real work.

*Redirection:* `>` writes output to a file, overwriting. `>>` appends.

```bash
python run.py > out.txt 2>&1
```

**OUTPUT**
```
(nothing printed to the screen — it all went into out.txt)
```

**MENTAL TRACE.** `>` captures the normal output stream into `out.txt`. Then `2>&1` says "send stream 2 — errors — to wherever stream 1 is now going," which is the file. Result: normal output *and* the crash traceback land in one file, in order. This is the exact incantation for capturing a failure to grep through or send to someone. Learn it as a unit.

**`grep` deserves its own paragraph.** `grep -r "TODO" .` searches every file underneath here. `-i` ignores case. `-n` shows line numbers. `-v` inverts, giving everything *except*. Finding where a function is defined in a strange codebase — `grep -rn "def build_index" .` — is daily bread, and on an FDE deployment you are *always* in a strange codebase.

**Quality of life that turns dread into home.** Tab completes paths — this alone changes your life. ↑ replays history. `Ctrl+R` searches history. `Ctrl+C` kills the running thing. `man cmd` or `cmd --help` when stuck.

Environment variables round it out: `export ANTHROPIC_API_KEY=...` puts a value into the shell's environment, and every SDK reads keys from there rather than from your code. You will set these forever, and in production they move into `.env` files and secret managers.

**THE DEPLOYMENT LENS.** On a customer laptop you will not have your dotfiles, your aliases, your shell theme, or your usual tools. You may not have `sudo`. You may be on a jump box through a VPN with a fifteen-minute idle timeout. **Fluency in plain, unconfigured, POSIX-ish shell is an FDE-specific skill** that engineers who only work on their own machines never develop. The person who can navigate a locked-down box calmly gets production credentials sooner than the person who needs their setup first.

---
