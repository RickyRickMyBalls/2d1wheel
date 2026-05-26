# Doc Index

This file maps the planning and tracking docs in this repository.

## Core Direction

- `docs/vision.md` - Product roadmap and user-facing simulator vision.
- `docs/Realism-Systems/Realism-Systems-Vision.md` - North-star realism direction for simulator physics, electrical systems, rider behavior, and validation.
- `docs/Realism-Systems/Realism-Systems-Index.md` - Realism systems family index and phase routing.
- `docs/Realism-Systems/Future/Realism-Systems-1 - Model Architecture Foundation.md` - Implementation-ready future plan for the first realism systems phase.

## Repo Process

- `AGENTS.md` - Project-specific instructions for Codex and other coding agents.
- `docs/Agents/Dispatch-5-Simpler/Dispatch-5-Simpler-Overview.md` - Lightweight Manager plus Worker operating model for continuous phase work.
- `docs/Agents/Dispatch-5-Simpler/Dispatch-5-Simpler-Manager.md` - Manager role and acceptance rules.
- `docs/Agents/Dispatch-5-Simpler/Dispatch-5-Simpler-Worker.md` - Worker assignment and return rules.
- `docs/Agents/Dispatch-5-Simpler/Dispatch-5-Simpler-Run-State.md` - Active Dispatch 5 dashboard for current realism work.
- `docs/Doc-Index.md` - Current docs map.
- `docs/Doc-Log.md` - Documentation, planning, and repository-process change log.
- `docs/CHANGELOG.md` - Shipped app, config, workflow, and runtime behavior change log.
- `docs/Phase-Template.md` - Template for implementation-ready planning docs.

## Local Docs

- `docs/README.md` - Short explanation of the docs folder.

## App Location

- `app/index.html` - Static simulator entry point.
- `app/styles.css` - Static simulator styles.
- `app/simulator.js` - Static simulator runtime.

## Structure Rules

- `/docs` is for Markdown planning and tracking docs.
- `/app` is for the playable static simulator.
- New broad simulator ideas should start in `docs/vision.md` or `docs/Realism-Systems/Realism-Systems-Vision.md`.
- New realism implementation plans should land under `docs/Realism-Systems/Future/`.
- New implementation phases should use `[ ]`, `[~]`, or `[x]` in the phase title.
