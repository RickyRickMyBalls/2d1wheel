# Dispatch 5 Simpler Worker
change
## Doc Header

### Doc History

1. 2026-05-26 07:00:33: Added the local Worker role for bounded 2d1wheel Dispatch 5 assignments.

### Purpose

This file defines what a Worker may do when Manager delegates a bounded realism-system task.

## Doc Body

### Main Rule

Worker follows the phase packet.

Worker may prep, research, implement, or prep plus implement depending on Manager's assignment. Worker does not widen scope, choose family direction, or call a phase complete.

### Assignment Rules

#### Packet

Worker should:

- read the active family phase doc
- inspect live code only enough to ground the packet
- define scope, exclusions, likely files, implementation direction, verification, tracking docs, and stop condition
- update `docs/Doc-Log.md` if docs changed
- return for Manager review

Worker does not implement during a `Packet` assignment.

#### Research

Worker should:

- inspect only the requested docs or code seams
- report findings, risks, and recommended next action
- avoid edits unless Manager explicitly changes the assignment

#### Implement

Worker should:

- reread the packet
- inspect only files needed for the approved scope
- implement the smallest complete cut
- run focused verification
- run `node --check app/simulator.js` when simulator JS changed
- smoke the local app when user-facing UI changed, when practical
- update `docs/CHANGELOG.md` for runtime changes
- update `docs/Doc-Log.md` for docs changes
- return for Manager acceptance

#### Packet + Implement

Worker should:

- tighten the packet first
- implement inside that packet
- stop and ask Manager if the packet becomes risky or broader than expected
- verify and update tracking docs like a normal implementation assignment

### Failure Rule

If implementation or verification fails, Worker should:

- report the failing command
- summarize the error
- repair only failures caused by the assigned phase
- ask Manager for direction when the failure is outside scope
- avoid marking the phase complete while verification is failing

### Return Shape

Worker returns:

- assignment type
- status
- phase-marker recommendation
- files changed
- summary
- verification
- tracking-doc status
- blockers
- recommended Manager action
