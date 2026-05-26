# Realism Systems Vision

## Doc Header

### Doc History

1. 2026-05-26 06:54:44: Split the original `docs/realism-systems-plan.md` into this realism systems vision, a family index, and a future implementation plan.

### Purpose

This vision doc preserves the long-range direction for making the 2D OneWheel simulator as realistic as possible while keeping it readable, educational, and fun to use.

## Doc Body

The simulator should become an educationally realistic side-scroller where tire, motor, battery, controller, board geometry, rider movement, terrain, center of mass, and failure recovery all influence the same live ride.

The model should be physically plausible, units should be explicit, assumptions should be visible, and every major subsystem should be shaped so real VESC/controller logs can tune it later.

## Vision

The realism system should help a rider or builder understand why a OneWheel-style board feels stable, loses torque, overheats, slips, scrapes, or nosedives.

The app should explain cause and effect without pretending the current model is a certified safety predictor. It should show the relationship between rider input, combined center of mass, controller limits, battery sag, motor heat, tire grip, and board geometry.

## What Must Stay True

- The side-scroller world remains the primary experience.
- The right-side settings panel remains the primary tuning surface.
- The app labels approximate calculations honestly.
- The simulator separates rider feel from hardware limits.
- Realism improves in layers rather than through one giant rewrite.
- `/docs` remains planning and tracking Markdown.
- `/app` remains the playable static simulator.

## Global Model Conventions

- UI units: inches, pounds, miles per hour, volts, amps, watts, degrees, and percent.
- Internal units: SI units where useful for force, torque, mass, and energy calculations.
- Coordinate frame: 2D side view with the wheel axle/center as the board origin.
- Positive board pitch: nose up.
- Positive rider lean: rider requests forward acceleration.
- Simulation time: dynamic systems update using `dt`.
- Output confidence labels:
  - `prototype`: useful for interaction, not physically trusted yet.
  - `approximate`: plausible formula with visible assumptions.
  - `validated`: tuned against real measurements or logs.

## High Level Goals

- [ ] `RSG1-HLG-1. Model tire size, grip, PSI, compound, tread, and terrain interaction.`
- [ ] `RSG1-HLG-2. Model motor Kv, Kt, resistance, stator size, torque production, and heat.`
- [ ] `RSG1-HLG-3. Model battery S/P layout, cell behavior, voltage sag, max current, and state of charge.`
- [ ] `RSG1-HLG-4. Model controller battery amps, phase amps, duty, voltage limits, field weakening, and cutoff behavior.`
- [ ] `RSG1-HLG-5. Model board rails, footpads, axle location, scrape geometry, and nose/tail contact.`
- [ ] `RSG1-HLG-6. Model rider height, weight, lean, knee bend, jump/crouch, and recovery input.`
- [ ] `RSG1-HLG-7. Model board COM, rider COM, and combined COM as a visible balance driver.`
- [ ] `RSG1-HLG-8. Explain failures through phase-current saturation, battery limit, duty limit, voltage sag, thermal rollback, traction loss, or geometry scrape.`
- [ ] `RSG1-HLG-9. Validate model behavior against real ride logs and reference scenarios over time.`

## Open Model Questions

- What default cell type should represent the first realistic 18s2p pack?
- Which real board preset should be used as the first calibration target?
- Should controller field weakening be modeled before or after duty-cycle warnings?
- How detailed should the rider body model be before adding replay and log validation?
- What real ride logs or measurements can be used to tune defaults?
