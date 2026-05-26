# Dispatch 5 Simpler Overview

## Doc Header

### Doc History

1. 2026-05-26 07:00:33: Added the local Dispatch 5 Simpler overview for continuously working the 2d1wheel realism systems phases with Manager plus optional Worker flow.

### Purpose

This file defines the lightweight Dispatch 5 operating model for this repo.

Use it when:

- the live Codex thread should act as Manager
- one bounded Worker can help with research, packet prep, or implementation
- work should move through one active phase packet at a time
- `docs/Realism-Systems/` should remain the durable planning truth
- `docs/CHANGELOG.md` and `docs/Doc-Log.md` should stay current

Do not use it for:

- letting a Worker choose broad simulator direction
- skipping Manager review of risky phase boundaries
- skipping required tracking docs
- replacing the realism vision, index, or future phase plan

## Doc Body

### Core Idea

Dispatch 5 keeps two roles:

- `Manager`: the live user-facing Codex thread. Manager owns judgment, phase selection, product direction, risk calls, acceptance, and follow-up routing.
- `Worker`: an optional bounded helper. Worker can prepare a phase packet, implement a low-risk or approved packet, or run narrow research.

The durable truth lives in:

- `docs/vision.md`
- `docs/Realism-Systems/Realism-Systems-Vision.md`
- `docs/Realism-Systems/Realism-Systems-Index.md`
- `docs/Realism-Systems/Future/Realism-Systems-1 - Model Architecture Foundation.md`
- `docs/CHANGELOG.md`
- `docs/Doc-Log.md`

### Simple Loop

```text
Manager selects the next ready phase
  ->
Manager marks the phase `[~]`
  ->
Manager or Worker writes/tightens one phase packet
  ->
Manager decides whether Worker may implement directly
  ->
Worker or Manager implements inside the packet
  ->
Focused verification runs, with static app checks when runtime changed
  ->
Manager accepts, repairs, follows up, or pauses
  ->
Manager marks the phase `[x]` only after acceptance
```

### Phase Markers

- `[ ]`: not started.
- `[~]`: prepped, active, under review, blocked, or awaiting acceptance.
- `[x]`: Manager-accepted complete.

Marker rules:

- Move `[ ]` to `[~]` when Manager selects the phase and the packet is ready enough to guide work.
- Keep `[~]` while implementation, verification, review, repair, tracking docs, or follow-up routing is still active.
- Move `[~]` to `[x]` only after Manager accepts the result against the phase packet and owning family docs.

### Phase Packet

A phase packet is the compact work contract for one implementation-sized step.

It should include:

- phase name and owning family doc
- scope
- exclusions
- likely files or seams
- implementation direction
- focused verification
- tracking docs to update
- stop condition

### Approval Rule

Explicit Manager approval is required when the packet:

- changes product direction
- changes subsystem ownership boundaries
- touches realism family routing
- has uncertain file seams
- could widen into later phases
- affects user-facing workflow in a way the phase doc does not already settle

Worker implementation can proceed without a separate approval stop when:

- the phase doc already defines the scope clearly
- likely files are obvious
- the work is low-risk extraction, docs cleanup, focused proof, or parity-preserving implementation
- verification is straightforward

Manager always owns final acceptance.

### Non-Negotiables

- Manager owns product and architecture judgment.
- Worker stays inside the current phase packet.
- Missing coverage becomes a follow-up, defer note, or new phase.
- Runtime changes update `docs/CHANGELOG.md`.
- Docs changes update `docs/Doc-Log.md`.
- Docs map changes update `docs/Doc-Index.md`.
- Focused checks should run when runtime code changes.
- `node --check app/simulator.js` is the minimum runtime syntax gate for simulator JS changes.
- Browser/local smoke should run for user-facing UI changes when practical.

### Completion Rule

A phase is complete only when:

- the packet scope is implemented or honestly deferred
- exclusions stayed out of scope
- focused verification is recorded
- required tracking docs are updated
- owning family docs still tell the truth
- Manager accepts the result
- the phase heading is moved to `[x]`
