# ATLAS Universe Architecture: Canonical 5-Universe Model

This document defines the 5-universe structure of ATLAS OS. It serves as the master blueprint for universe intent, status, and content mapping.

## The Canonical Universes

1. **Wellness (U1)**
   - **Role**: Longitudinal health understanding, preventive thinking, clinical interpretation, and the architecture of systemic vitality.
   - **Physical Mapping**: `wellness`.
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

## Technical Strategy: Canonical Normalization

Following the completion of the Wellness consolidation (Apr 2026), the Atlas OS architecture has been fully normalized:
- **Zero-Lock Compliant**: Moves were performed manually via User actions and verified by the AI Auditor.
- **Physical Unified**: Each universe now resolves directly to its namesake folder in `/content/atlas/universes` and `/content/atlas/modules`.
- **Logic Alignment**: `lib/atlas/content.ts` and `lib/atlas/data.ts` are synchronized with the 5-universe physical structure.
- **Metadata Synchronization**: Module frontmatter is normalized to `universe: <canonical_id>` with global indexing.

---
*Last Revised: 2026-04-07 (Stabilization Complete)*
