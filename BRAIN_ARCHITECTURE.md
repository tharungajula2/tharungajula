# BRAIN ARCHITECTURE — The Complete Beginner's Guide

**Last Updated:** May 6, 2026  
**Purpose:** Understand every folder, file, and connection inside this portfolio's intelligence layer.

---

## 1. THE BIG PICTURE — What Is The Brain?

The `brain/` folder is the **centralized intelligence layer** of this portfolio website. Think of it like a personal Wikipedia — it stores everything about Tharun Gajula's career, projects, skills, and experience in structured markdown files.

But it's not just a dump of files. It's a **compilation pipeline** and **operating system**:

```
RAW SOURCE DOCUMENTS (V5 Master, Experience, Education)
        ↓ [compiled via SCHEMA.md rules]
WIKI PAGES (structured, interlinked knowledge graph)
        ↓ [consumed by]
CRM STRATEGY (Pipeline tracker, outreach log, runbook)
```

The brain exists to solve one problem: **how do you take a messy pile of career documents and turn them into a structured, automated engine for job outreach?**

---

## 2. FOLDER TREE — Every Folder & File

```
brain/
├── SCHEMA.md                          ← The rulebook for compiling wiki pages
├── Templates/                         ← [NEW] THE FACTORY LAYER
│   └── Application_Factory/           ← Duplicate this for every new job target
│       ├── 00_jd.md                   ← Role context & raw text
│       ├── 10_research.md             ← Founder intel & Proof-of-Work ideas
│       ├── 20_resume.md               ← Tailored resume placeholder
│       ├── 30_cover_letter.md         ← Narrative placeholder
│       ├── 40_outreach.md             ← Cold email & follow-up sequence
│       ├── 50_proof_of_work/          ← Sub-folder for build artifacts
│       ├── 60_prep.md                 ← Interview questions & rebuttals
│       └── 99_retro.md                ← Application feedback loop
│
├── scripts/                           ← [NEW] THE ENGINE LAYER
│   └── CHIRON_RUNBOOK.md              ← Master instructions for the AI agent
│
├── raw/                               ← THE INPUT LAYER (Sanitized sources)
│   ├── analytics/                     ← 8 detailed analytics project writeups
│   ├── education/                     ← [POPULATED] GRIET, IISc, NIBM details
│   ├── experience/                    ← [POPULATED] Jana Bank, Lentra, etc.
│   ├── products/                      ← Omni-Dive reports for OS systems
│   ├── profile/                       ← Master identity (V5 Master Source)
│   └── strategy/                      ← [NEW] THE CRM LAYER
│       ├── founder-target-list.md     ← Active pipeline table (The "Database")
│       └── outreach-notes.md          ← Field intel & Outreach rules log
│
└── wiki/                              ← THE OUTPUT LAYER (Compiled knowledge)
    ├── entities/                      ← People & organizations
    ├── projects/                      ← One page per project (13 total)
    ├── concepts/                      ← Reusable ideas/skills
    └── syntheses/                     ← Cross-cutting narratives
```

---

## 3. THE CRM LAYER — How Outreach Works

### 3.1 The Target Pipeline (`founder-target-list.md`)
This is the "Source of Truth" for the active outreach strategy. It uses a markdown table with specific status emojis (🟢 preparing, 🟡 sent, 🔵 interviewing, ⚫ ghosted). 
- **The Pipeline**: Stores all active opportunities and their current state.

### 3.2 The Outreach Log (`outreach-notes.md`)
A qualitative dump for field intel.
- **Rules Section**: A 4-point checklist to ensure every outreach is concept-driven (Research, PoW-led, Day 4 Follow-up).
- **Intel Stream**: Quick thoughts and field intelligence from calls/research.

---

## 4. THE APPLICATION FACTORY — Scaling Concept Prototypes

The `Templates/Application_Factory` is designed to be **duplicated** for every founder Tharun targets.

1. **Research First**: 10_research.md forces you to map Tharun's 4 Pillars directly to the founder's specific problem.
2. **Proof of Work**: Every application must suggest a "48-hour build" to prove competence before the first interview.
3. **The Narrative**: 30_cover_letter.md uses a "Credibility → Motivation → Bridge" framework rather than standard corporate fluff.

---

## 5. THE CHIRON RUNBOOK — AI Orchestration

`brain/scripts/CHIRON_RUNBOOK.md` is the master instruction set for the AI Agent.

**The Command**: "@workspace Execute the CHIRON Runbook for [Folder Name]"
**What the AI does**:
1. Reads the JD in `00_jd.md`.
2. Cross-references the **Master Source V5** in `raw/profile/`.
3. Populates the entire application folder (Resume, Cover Letter, Outreach emails) based on the specific JD context.
4. Ensures zero "hallucinations" by strictly following the Master Source.

---

## 6. THE DATA PIPELINE — End-to-End

```
1. Master Source V5 (The DNA)
2. Application Factory (The Skeleton)
3. CHIRON Runbook (The Muscle/AI)
4. Founder Target List (The Nervous System/CRM)
```

---

*End of Brain Architecture Documentation.*
