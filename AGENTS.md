# AGENTS.md

Project-specific instructions for Codex and other coding agents working in this repository.

## Purpose

This file defines the repository maintenance rules Codex should follow when making implementation changes and documentation changes.

Implementation changes include:

- source code
- configuration
- app behavior
- UI behavior
- GitHub Pages workflow behavior

Documentation changes include:

- planning docs
- architecture docs
- README/docs structure
- repository process/rules docs

## Core Rule

For every implementation change or documentation change, update the matching project-tracking docs in the same change set unless the user explicitly says otherwise.

Canonical tracking files:

- `docs/CHANGELOG.md` for shipped app, config, workflow, and runtime behavior changes.
- `docs/Doc-Log.md` for documentation, planning, and repository-process changes.
- `docs/Doc-Index.md` for the current docs map.

Canonical direction files:

- `docs/vision.md` for the product roadmap and user-facing simulator direction.
- `docs/Realism-Systems/Realism-Systems-Vision.md` for the realism north star.
- `docs/Realism-Systems/Realism-Systems-Index.md` for realism family phase routing.
- `docs/Realism-Systems/Future/` for implementation-ready realism phase plans.

## User Communication Rule

The primary user may describe product intent with informal language, partial mental models, imperfect spelling, or casual phrasing.

Codex should:

- interpret user intent generously
- avoid over-correcting terminology unless clarity truly depends on it
- explain technical decisions in plain English
- translate broad ideas into planning docs before large implementation passes
- ask clarifying questions only when a choice has meaningful product, architecture, or workflow consequences
- preserve user wishlist items in docs before compressing them into smaller engineering phases

## Vision Alignment Rule

Before making product, UX, physics, architecture, naming, ownership, or workflow-structure decisions:

- read `docs/vision.md` first
- read `docs/Realism-Systems/Realism-Systems-Vision.md` and `docs/Realism-Systems/Realism-Systems-Index.md` when the decision touches simulation realism, physics, electrical modeling, rider behavior, or validation
- prefer the documented simulator direction over local convenience unless the user explicitly directs otherwise
- keep assumptions visible when a formula or behavior is not validated against real ride data

## Documentation Structure

- Keep `/docs` for planning and tracking Markdown files only.
- Keep the playable simulator app in `/app`.
- Treat `docs/vision.md` as the product roadmap.
- Treat `docs/Realism-Systems/` as the engineering model family for physics, electrical systems, rider behavior, and validation.
- Use `docs/Doc-Index.md` to keep the docs surface discoverable as it grows.

## Phase Docs Rule

- Always include a checkbox in every phase title so completion status is visible at a glance.
- Use `[ ]` for incomplete phases.
- Use `[~]` for active or prepped phases when a middle state is useful.
- Use `[x]` for complete phases.
- Example: `## Phase B [ ]: Data Model Cleanup`
- Example: `## Phase A [x]: System Architecture Doc`
- Prefer small honest phases over one large phase with hidden internal ladders.
- If a phase becomes too large, split it into another top-level phase or a follow-on doc.

Recommended phase shape:

- `### Phase N Summary`
- `#### Purpose`
- `#### Owns`
- `#### Does Not Own`
- `### Phase N Implementation Spec`
- `#### Checklist`
- `#### Verification Shape`
- `#### Done Shape`

## Wishlist And Planning Rule

For broad user ideas, preserve the human-level wishlist before turning it into Codex-sized work.

Recommended planning shape:

- `## Doc Header`
- `## Doc Body`
- `## Vision`
- `## Wishlist Organization`
- `## Phase N [ ]: Implementation Phase Title`

`Wishlist Organization` should separate:

- high-level user goals, kept close to the user's wording
- Codex-level goals, written as implementation-ready planning language
- phase mapping, showing which phase advances which goals

## Implementation Behavior Rule

- Keep changes small and phase-based.
- Preserve existing UI behavior unless a task explicitly asks to change it.
- Prefer one clear responsibility per file.
- Split by ownership boundary, not by line count.
- Delete dead code instead of commenting it out.
- Move possibly-needed ideas into future phase docs instead of keeping dead paths alive in code.
- Keep cleanup scoped to the requested change.
- Tests and verification should cover behavior, not helper names or incidental structure.

## Simulator Modeling Rule

- Separate battery amps, phase amps, requested phase amps, delivered phase amps, requested watts, delivered watts, duty cycle, voltage sag, and thermal limits in labels and calculations.
- Treat phase amps as torque-producing current.
- Treat battery amps as pack load.
- Treat watts as energy rate.
- Treat duty cycle as voltage headroom at speed.
- Prefer updating docs before implementing large new simulator systems.

## Dispatch 5 Rule

- Use `docs/Agents/Dispatch-5-Simpler/` for long-running or multi-pass realism work.
- Use only one active realism phase marked `[~]` at a time unless the user explicitly approves overlap.
- Keep `docs/Agents/Dispatch-5-Simpler/Dispatch-5-Simpler-Run-State.md` as the compact active dashboard.
- Keep the owning realism future plan as the durable phase truth.
- Do not mark a phase `[x]` until verification, required tracking docs, and Manager acceptance are complete.
- For this static app, `npm run build` is required only if a package/build system exists. Otherwise use `node --check app/simulator.js`, local app smoke checks, and the active phase's named verification.

## CHANGELOG Rule

Primary file:

- `docs/CHANGELOG.md`

Use it for:

- source-code changes
- configuration changes
- GitHub Pages workflow changes
- runtime behavior changes
- shipped simulator features or fixes

Requirements:

- Add new entries at the top of the live entry list.
- Preserve previous entries unless the user explicitly asks for cleanup.
- Use the current system time.
- Keep wording deterministic so diffs stay readable.

## Doc-Log Rule

Primary file:

- `docs/Doc-Log.md`

Use it for:

- docs under `docs/`
- `README.md`
- `AGENTS.md`
- planning and rules documentation
- docs structure changes

Requirements:

- Add new entries at the top of the live entry list.
- Preserve previous entries unless the user explicitly asks for cleanup.
- Use the current system time.
- Keep wording deterministic so diffs stay readable.

## Required Sequence

When Codex performs implementation work:

1. Read the relevant direction docs.
2. Implement the requested change.
3. Run verification when requested or reasonably needed.
4. If code, config, workflow, or runtime behavior changed, update `docs/CHANGELOG.md`.
5. If docs changed, update `docs/Doc-Log.md`.
6. If docs were added, removed, or renamed, update `docs/Doc-Index.md`.

Do not skip required maintenance updates silently.
