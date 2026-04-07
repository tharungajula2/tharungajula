# ATLAS Universe Architecture: Internal Reference

This document defines the 6-universe structure of ATLAS OS. It serves as the master blueprint for universe intent, status, and content mapping.

## The Health Spine (Sequential Core)

1. **Foundations of Human Health (U1)**
   - **Role**: Primary flagship. First-principles physiological understanding.
   - **Content**: 12 Scientific Masterclasses (Live).
   - **Expansion**: Maintenance mode. Content complete.

2. **Applied Preventive Health (U2)**
   - **Role**: Bridging theory to practice. Risk management and protocol interpretation.
   - **Content**: Lab modules.
   - **Status**: Locked (Synthesis layer).

3. **Longitudinal Health Architecture (U3)**
   - **Role**: High-horizon systems thinking. Multi-decade vitality orchestration.
   - **Content**: Masterclass.
   - **Status**: Locked (Deep layer ahead).

## The Auxiliary Wings (Parallel Auxiliary Universes)

4. **Cognition Lab (U4)**
   - **Role**: Enhancing the mental engine (Reasoning, Learning, Evaluation).
   - **Content**: Lab modules.
   - **Status**: Live (Growing archive).

5. **Puzzle Gym (U5)**
   - **Role**: Active structural practice for pattern recognition and logic.
   - **Content**: Daily drills / puzzles.
   - **Status**: Live (First entries pending).

6. **Sandbox (U6)**
   - **Role**: Rapid prototyping of health concepts and exploratory topics.
   - **Content**: Exploratory archive.
   - **Status**: Live (Exploratory archive).

## Implementation Guidelines

- **Sequential Transition**: U2 and U3 unlock only after the preceding universe exceeds 80% synthesis validation.
- **Parallel Wings**: U4-U6 are always open and act as flexible expansion zones.
- **Content State Language**: Use "Growing Archive" for U4, "First Entries Pending" for U5, and "Exploratory Archive" for U6.
- **Filesystem**: Modules are stored in `content/atlas/modules/[universe-slug]/`. Metadata in `content/atlas/universes/[slug]/metadata.md`.
