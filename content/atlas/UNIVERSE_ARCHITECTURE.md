# ATLAS Universe Architecture: Canonical 5-Universe Model

This document defines the 5-universe structure of ATLAS OS. It serves as the master blueprint for universe intent, status, and content mapping.

> [!NOTE]
> **Refactor v5.0.0 (Phase C)**:
> The Atlas OS has successfully transitioned to its canonical 5-universe structure. Auxiliar tracks (Cognition, Reasoning, Sandbox) have been physically consolidated.
> 
> **Remaining Technical Debt**:
> The "Wellness" universe currently operates via a code-level compatibility layer aggregating three legacy directories (`foundations-of-human-health`, `applied-preventive-health`, `longitudinal-health-architecture`). Physical consolidation of these directories is the final step in the long-term refactor plan.

## The Canonical Universes

1. **Wellness (U1)**
   - **Role**: Longitudinal health understanding, preventive thinking, and systemic vitality.
   - **Physical Mapping**: Federated (3 legacy sources).
   - **Status**: Live (Consolidated knowledge core).

2. **Cognition (U2)**
   - **Role**: Enhancing the mental engine (Mental Models, Decision Quality, Reasoning).
   - **Physical Mapping**: `cognition`.
   - **Status**: Live (Growing archive).

3. **Reasoning (U3)**
   - **Role**: Active structural practice for pattern recognition and logic via drills.
   - **Physical Mapping**: `reasoning`.
   - **Status**: Live (First entries pending).

4. **Human Ecosystem (U4)**
   - **Role**: Systems of modern life (Institutions, Coordination, Incentives, Society).
   - **Physical Mapping**: `human-ecosystem`.
   - **Status**: Preview (Architecture in progress).

5. **Sandbox (U5)**
   - **Role**: Rapid prototyping and exploratory territory for life-relevant experiments.
   - **Physical Mapping**: `sandbox`.
   - **Status**: Live (Exploratory archive).

---

## Technical Implementation (Zero-Lock Compliance)

To ensure stability on Windows environments and avoid filesystem mutations during active development, we use a **Code-First Mapping Strategy**:

- **Registry**: `lib/atlas/data.ts` defines the canonical 5 universes.
- **Transitional Logic**: Wellness continues to use the `legacyIds` array to aggregate content until the final physical merge phase.

## Future Phase: Final Wellness Merge

Physical directory renaming and folder merges (merging the three health folders into one `/content/atlas/modules/wellness`) will be performed manually in a separate session.

---
*Last Revised: 2026-04-07 (Refactor Phase C Complete)*
