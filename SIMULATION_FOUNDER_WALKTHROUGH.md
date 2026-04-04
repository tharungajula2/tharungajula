# Simulation Guide: Founder Walkthrough

This simulation is a high-fidelity demonstration of a **High-Touch Preventive Health Operating System**. It is designed to prove that complex, longitudinal health data can be synthesized into actionable clinical-ops workflows for elite member care.

---

## ⚡ The 30-Second Walkthrough (The "Elevator Pitch")

1.  **Command Center**: Start here. Point to the **Next Decision** (e.g., Low-dose statin initiation). This demonstrates that the system isn't just a dashboard—it's a decision engine.
2.  **Informatics Timeline**: Show how data from disparate sources (Apollo Hospitals, Oura) is synthesized into a single, verified truth.
3.  **Clinical Assistant**: Jump to the Assistant. Highlight the **"Evidence Chain"** for each insight. This proves the system is "deterministic" and clinician-trusted, not a hallucinating chatbot.

---

## 🔍 The 2-Minute Walkthrough (The "Deep Dive")

1.  **Persona Trust (15s)**: Introduce **Arjun Mehta**. Mention he's a high-stress Mumbai professional. This grounds the demo in a real use case.
2.  **The Problem (20s)**: Go to **Biomarker Analysis**. Show the **"Priority Decisions"** (Clusters). Explain how we group markers (ApoB + Omega-3) to treat the *root cause* (Vascular Foundation), not just individual numbers.
3.  **The Plan (20s)**: Move to **Care Mapping**. Show the "Why" (Clinical Rationale Synthesis). If a founder asks "Why Zone 2?", the answer is right there in the data.
4.  **The Execution (30s)**: Go to **Daily Adherence**. Point out the **"Operational Blockers"**. Note how the system captures *why* a member missed a session (e.g., "Mumbai market volatility"). This is the "closed loop" of care.
5.  **The Intelligence (35s)**: Finish on the **Clinical Assistant**. Show the **"Evidence Chain"**. Explain that the system is honest about its data gaps—this is how you build clinical credibility.

---

## 🛡️ What This Simulation Proves

-   **Workflow Reality**: Care isn't just a list of tasks; it's a series of decisions.
-   **Evidence Grounding**: Every insight is linked to a verified source (Evidence Chain).
-   **Clinician-Ops Alignment**: The terminology and hierarchy match how a high-end medical team actually thinks.
-   **Scalable Personalization**: AI is used as an assistant to the clinician, not a replacement for judgment.

---

## 🏗️ Intentionally Mocked Parts

-   **Backend**: All data is current-state static JSON (`mockMember.ts`).
-   **Integrations**: Lab APIs and Wearables are simulated via informatics traces.
-   **Interactive Inputs**: Buttons like "Book Lab Collection" are UI stubs to demonstrate the intended user flow.

---

## 🚀 Next Logical Build Steps

1.  **Interactive "What-If" Modeling**: Allow a clinician to adjust a biomarker (e.g., lower ApoB) and see how the "Care Mapping" dynamically updates.
2.  **Biomarker Drift Projections**: Use historical data to animate the "velocity" of a member's health decline if no action is taken.
3.  **Clinician Review Loop**: Add a "Sign Off" button that generates a PDF summary for the member, closing the informatics-to-member loop.
