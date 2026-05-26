# Changelog

This file records shipped simulator, configuration, workflow, and runtime behavior changes.

## Live Entries

15. 2026-05-26 08:07:06: Added rapid `A`/`D` tap-combo boosts so double and repeated taps snap rider lean farther while held keys keep the smooth lean rate.
14. 2026-05-26 08:05:30: Added a visual-only 10% extension past both ends of the rider knee-bend pose so full stand is slightly taller and full crouch is slightly deeper without changing slider or physics ranges.
13. 2026-05-26 07:56:18: Increased `W`/`S` knee bend keyboard speed to 10x the rider lean rate for near-instant crouch and stand transitions.
12. 2026-05-26 07:54:10: Matched `W`/`S` knee bend keyboard speed to the `A`/`D` rider lean speed so both viewport rider controls feel equally responsive.
11. 2026-05-26 07:51:52: Added a viewport knee bend slider under rider lean and tucked both rider controls under the top-left HUD while keeping the sidebar knee bend control synced.
10. 2026-05-26 07:50:14: Moved the viewport rider lean slider lower on desktop so it no longer overlaps the top HUD telemetry cards.
9. 2026-05-26 07:47:22: Added continuous `W`/`S` keyboard control for rider knee bend, with `W` standing the rider up, `S` crouching down, slider sync, and updated on-screen keyboard hints.
8. 2026-05-26 07:38:32: Moved the rider lean slider out of the right settings panel into a top-center viewport overlay while preserving the existing lean control behavior.
7. 2026-05-26 07:35:04: Matched rider visual scale and rider COM height to the same wheel-based compressed height model so the stick figure grows with rider height instead of only moving the COM marker.
6. 2026-05-26 07:32:58: Recalibrated rider drawing scale from tire pixels-per-inch so rider height stays proportional to wheel diameter, and aligned rider COM height with the same wheel-based scale.
5. 2026-05-26 07:30:13: Reworked the rider drawing so both feet are planted on the footpads while rider lean moves the hips, torso, shoulders, and head forward/back from those fixed foot anchors.
4. 2026-05-26 07:24:32: Reworked nose/tail slide activation so scrapes only start when the calculated footpad contact point reaches the ground, added a board-height slider, and made footpad length affect the board half-span used by scrape geometry.
3. 2026-05-26 07:20:24: Refined motor temperature rise to use estimated copper, iron, and overload heat losses against stator-size-based thermal capacity and speed-based cooling, and updated the motor temperature label to show estimated heat watts.
2. 2026-05-26 07:10:17: Implemented and accepted `Realism-Systems-1`, adding structured simulator subsystem specs, tire PSI/compound and surface controls, battery parallel and controller controls, visible board/rider/combined COM markers, first-pass voltage sag, delivered phase amps, traction slip, controller/battery thermal signals, thermal rollback, and validation scenario placeholders.
1. 2026-05-26 06:48:27: Established `docs/CHANGELOG.md` as the canonical log for future shipped app, config, GitHub Pages workflow, and runtime behavior changes. No simulator runtime behavior changed in this entry.
