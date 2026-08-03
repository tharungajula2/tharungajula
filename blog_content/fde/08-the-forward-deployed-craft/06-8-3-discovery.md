---
track: "fde"
trackLabel: "Forward Deployed Engineering"
volume: "08"
volumeSlug: "the-forward-deployed-craft"
volumeTitle: "THE FORWARD-DEPLOYED CRAFT"
order: 6
title: "Discovery"
slug: "8-3-discovery"
sectionNumber: "8.3"
part: "PART II — THE FRONT END"
kind: "narrative"
sourceFile: "FDE_08_THE_FORWARD_DEPLOYED_CRAFT.md"
tags: []
hasSayThis: false
wordCount: 590
status: "raw"
section: "§8.3"
summary: ""
enriched: false
---

## § 8.3 — Discovery

Not "gather requirements." <cite index="32-1">The FDE sits with the people who do the work, maps how things actually happen versus how the org chart says they happen, and finds the friction nobody documented. This is where the real thing to build gets defined, and it routinely surfaces problems the client did not know they had.</cite>

You did this in Document 01 and it produced the entire deployment: the bottleneck wasn't the decision, it was assembling the file. **Nobody at Meridian had articulated that, including the people doing it.**

### The technique

**Watch, don't ask.** *"What's slow about your job?"* gets you a rationalised answer — usually the thing they complain about, which is often not the thing that costs the most time. **Sitting next to someone for two hours and timing what they actually do** gets you the truth. Tom would not have said "I spend 40 minutes finding four bank statements." He'd have said "the system is clunky."

**Ask what they do when it goes wrong.** The happy path is documented. The exception path is where the real work is, and it's where the institutional knowledge lives. *"What do you do when a file looks weird?"* is the highest-yield question in discovery, because the answer names a person — and that person knows things no document contains.

**Follow the workarounds.** Every spreadsheet somebody maintains on the side, every shared folder with a naming convention, every "we just know that field means something different for commercial" — each one is a place the official system failed and a human patched it. **Workarounds are a map of unmet needs**, drawn by the people who have them.

**Ask about the last three failures.** Not hypotheticals. What actually went wrong recently, what it cost, and what changed afterwards. This tells you what the organisation *reacts* to, which tells you what will get funded.

**Count things.** How many files a month, how many minutes each, how many people, what's the loaded cost. Discovery without numbers produces a nice story and no business case.

### The exit condition

There is a clean test for whether discovery is done, and it's worth memorising verbatim: <cite index="30-1">if you can't write down a sentence like "this system succeeds if it reduces X by Y amount, measured how," discovery isn't done yet — no matter how many calls have already happened.</cite>

For Meridian that sentence was: **"This system succeeds if it reduces underwriter time per file from an average of 61 minutes to under 30, measured on a sample of 200 files, without reducing the discrepancy catch rate below what underwriters achieve unaided."**

Every clause is load-bearing. A number, a baseline, a measurement method, and a guardrail that stops the obvious cheat of going faster by being worse.

**Write that sentence in week two and get someone senior to agree to it in writing.** It is the single most valuable artifact of the entire engagement, because eight months later when someone asks whether the project succeeded, there is an answer that was agreed before anyone knew what the answer would be.

**THE FAILURE MODE.** The most common discovery failure isn't asking bad questions. It's **stopping when the customer sounds confident.**

Priya said "automate underwriting." She believed it. She was wrong, and she was wrong in a way that would have cost the project six months and probably killed it — because automating the decision is a regulatory problem you cannot engineer around.

**Confidence is not evidence.** Keep going until you've watched the work.

---
