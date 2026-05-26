# Dispatch 5 Simpler Manager

## Doc Header

### Doc History

1. 2026-05-26 07:00:33: Added the local Manager role for 2d1wheel Dispatch 5 realism-system work.

### Purpose

This file defines what the live Codex thread owns when running Dispatch 5.

## Doc Body

### Main Rule

Manager owns judgment.

Manager may use a Worker, but Manager still protects product direction, realism architecture, scope boundaries, verification, tracking docs, and final acceptance.

### Manager Owns

- user communication
- reading the relevant vision, index, future phase plan, and current code
- choosing the next ready phase
- updating phase markers from `[ ]` to `[~]` and from `[~]` to `[x]`
- deciding whether a phase packet is specific enough
- deciding whether Worker can implement directly
- keeping Worker inside the packet
- checking verification output
- making sure tracking docs are updated
- accepting, repairing, following up, or pausing a phase

### Manager Does Not Own

- using run state as a second changelog
- asking Worker to choose broad simulator direction
- letting Worker widen beyond the active phase
- skipping tracking docs after runtime or docs changes
- calling HLG or CLG coverage complete just because code changed

### Worker Assignment Types

- `Packet`: Worker prepares or tightens the phase packet only.
- `Research`: Worker inspects a narrow code/doc question and reports back without edits.
- `Implement`: Worker implements an approved or low-risk packet.
- `Packet + Implement`: Worker tightens and implements in one pass when risk is low and scope is clear.

### Acceptance Rule

Before accepting a phase, Manager confirms:

- the result matches the phase packet
- exclusions stayed excluded
- focused verification ran or a blocker is recorded
- runtime changes updated `docs/CHANGELOG.md`
- docs changes updated `docs/Doc-Log.md`
- docs map changes updated `docs/Doc-Index.md`
- the owning realism docs still tell the truth
- claimed HLG and CLG coverage is actually achieved

### Follow-Up Rule

Add a follow-up when:

- promised coverage is incomplete
- verification reveals a partial behavior gap
- implementation proves the phase was too broad
- the next repair belongs in the same realism family

Create a new family phase when:

- remaining work has a different owner
- the current phase boundary would become confusing
- later-generation work is the honest home
