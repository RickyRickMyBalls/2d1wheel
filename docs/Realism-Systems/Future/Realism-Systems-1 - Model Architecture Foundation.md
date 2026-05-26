# Realism-Systems-1 - Model Architecture Foundation

## Doc Header

### Doc History

2. 2026-05-26 07:10:17: Implemented and accepted the first runtime pass for Phases B-G with structured subsystem specs, battery/controller controls, COM display, tire/surface grip, thermal rollback signals, validation scenario placeholders, and focused syntax verification.
1. 2026-05-26 06:54:44: Created this future plan from the original `docs/realism-systems-plan.md` implementation phases.

### Purpose

This future plan turns the realism vision into Codex-sized implementation phases for the first realism generation.

### Scope

This doc covers:

- simulator subsystem ownership
- data-model cleanup
- battery/controller separation
- COM and rider modeling direction
- tire/terrain modeling direction
- thermal rollback direction
- validation preparation

This doc does not cover:

- implementing every realism feature in one pass
- replacing the playable side-scroller
- certifying the simulator as a safety predictor

## Doc Body

The current simulator already has a playable side-scroller, board/rider visualization, battery drain, motor temperature, scrape recovery, and approximate limit bars. The next realism work should preserve that live prototype while making the model easier to reason about and replace.

The main architecture problem is that many values are still prototype formulas. This plan introduces explicit subsystem ownership so later work can improve one system without quietly changing unrelated behavior.

## Vision

Realism-Systems-1 should make the simulator feel less like one bundle of guesses and more like coordinated systems. The user should eventually be able to see how the tire, terrain, battery, controller, motor, rider posture, board geometry, and COM combine to make the motor work harder or fail.

## Wishlist Organization

### High Level Goals

- [ ] `RSG1-HLG-1. Model tire size, grip, PSI, compound, tread, and terrain interaction.`
- [ ] `RSG1-HLG-2. Model motor Kv, Kt, resistance, stator size, torque production, and heat.`
- [ ] `RSG1-HLG-3. Model battery S/P layout, cell behavior, voltage sag, max current, and state of charge.`
- [ ] `RSG1-HLG-4. Model controller battery amps, phase amps, duty, voltage limits, field weakening, and cutoff behavior.`
- [ ] `RSG1-HLG-5. Model board rails, footpads, axle location, scrape geometry, and nose/tail contact.`
- [ ] `RSG1-HLG-6. Model rider height, weight, lean, knee bend, jump/crouch, and recovery input.`
- [ ] `RSG1-HLG-7. Model board COM, rider COM, and combined COM as a visible balance driver.`
- [ ] `RSG1-HLG-8. Explain failures through phase-current saturation, battery limit, duty limit, voltage sag, thermal rollback, traction loss, or geometry scrape.`
- [ ] `RSG1-HLG-9. Validate model behavior against real ride logs and reference scenarios over time.`

### Codex Level Goals

- [ ] CLG 1. Keep the current app behavior while introducing structured model ownership.
- [ ] CLG 2. Separate physical specs, electrical specs, rider inputs, terrain inputs, and derived telemetry.
- [ ] CLG 3. Make every visible failure rail traceable to a subsystem.
- [ ] CLG 4. Keep assumptions visible until validated.

### Phase Mapping

- [x] Phase A advances CLG 1 by documenting subsystem ownership and dependencies.
- [x] Phase B advances CLG 1 and CLG 2 with structured model objects.
- [x] Phase C advances HLG 3, HLG 4, and HLG 8 with electrical/controller realism.
- [x] Phase D advances HLG 5, HLG 6, HLG 7, and HLG 8 with COM-driven torque and scrape modeling.
- [x] Phase E advances HLG 1 and HLG 8 with tire, terrain, rolling loss, and traction modeling.
- [x] Phase F advances HLG 2 and HLG 8 with thermal rollback.
- [x] Phase G advances HLG 9 with validation scenarios.

## Phase A [x]: System Architecture Doc

### Phase A Summary

#### Purpose

Create the first subsystem map and dependency graph before runtime changes.

#### Owns

- subsystem ownership definitions
- dependency graph
- docs-only realism foundation

#### Does Not Own

- app runtime changes
- formula rewrites
- UI changes

### Phase A Implementation Spec

#### Checklist

- [x] Add subsystem ownership, inputs, derived values, outputs, and dependencies.
- [x] Add a dependency graph showing rider, board, motor, battery, controller, tire, terrain, thermal state, and recovery.
- [x] Keep this phase docs-only.

#### Verification Shape

- Confirm the vision, index, and future plan exist.
- Confirm phase titles include `[x]`, `[~]`, or `[ ]`.
- Confirm `/app` is untouched for this phase.

#### Done Shape

The realism systems family has a vision doc, index doc, and implementation-ready future plan.

## Phase B [x]: Data Model Cleanup

### Phase B Summary

#### Purpose

Move simulator specs toward structured ownership without changing user-visible behavior.

#### Owns

- structured objects for tire, motor, battery, controller, board, rider, and terrain
- unit conversion helper direction
- confidence labels for model outputs

#### Does Not Own

- new physics formulas beyond parity-preserving extraction
- new UI controls unless needed to preserve existing behavior

### Phase B Implementation Spec

#### Checklist

- [x] Move simulator specs into structured objects: tire, motor, battery, controller, board, rider, terrain.
- [x] Keep existing UI behavior while making formulas easier to replace.
- [x] Add clear conversion helpers between UI units and internal units.
- [x] Add confidence labels to model outputs.

#### Verification Shape

- Run the existing static app locally.
- Confirm existing sliders and telemetry still work.
- Confirm `node --check app/simulator.js` passes.

#### Done Shape

The current prototype behavior remains intact, but formulas read through named subsystem specs.

## Phase C [x]: Battery And Controller Realism

### Phase C Summary

#### Purpose

Separate battery behavior from controller behavior so torque current, pack load, watts, duty, and sag are not mixed together.

#### Owns

- `S` and `P` battery layout controls
- cell voltage curve and internal resistance
- requested phase amps versus delivered phase amps
- battery amps, watts, duty cycle, voltage sag, field weakening, and cutoff

#### Does Not Own

- thermal rollback implementation
- COM-driven balance rewrite

### Phase C Implementation Spec

#### Checklist

- [x] Add separate `S` and `P` controls for battery layout.
- [x] Add cell-level voltage curve.
- [x] Add cell internal resistance and voltage sag.
- [x] Separate requested phase amps, delivered phase amps, battery amps, watts, and duty cycle.
- [x] Add controller limits for battery amps, phase amps, duty, voltage, field weakening, and cutoff.

#### Verification Shape

- Low battery should visibly increase sag and reduce available headroom.
- High speed should approach duty limit before an artificial Kv crash.
- Phase amps should drive torque demand while battery amps represent pack load.

#### Done Shape

Electrical telemetry is labeled and calculated through distinct battery and controller concepts.

## Phase D [x]: Torque And COM Realism

### Phase D Summary

#### Purpose

Make rider and board center of mass visible and meaningful in balance, torque demand, and scrape recovery.

#### Owns

- rider COM display
- board COM display
- combined COM display
- knee bend and stance influence
- COM-driven scrape and balance risk

#### Does Not Own

- tire grip model
- battery/controller rewrite

### Phase D Implementation Spec

#### Checklist

- [x] Add rider COM and combined COM display.
- [x] Make lean, knee bend, rider height, rider weight, and stance affect torque demand.
- [x] Use combined COM to drive balance and scrape risk.
- [x] Add visible balance line from combined COM to the wheel contact patch.

#### Verification Shape

- Taller/heavier rider settings should change COM and torque demand.
- Knee bend should lower COM once implemented.
- Nose scrape and tail slide recovery should respond to COM movement, not only raw lean slider direction.

#### Done Shape

The simulator can show why the rider/board mass relationship affects balance and recovery.

## Phase E [x]: Tire And Terrain Realism

### Phase E Summary

#### Purpose

Split tire grip and terrain load from motor/controller limits.

#### Owns

- tire PSI
- compound
- tread type
- surface presets
- rolling resistance
- grip coefficient
- traction loss
- bump impulses

#### Does Not Own

- COM implementation
- controller field weakening

### Phase E Implementation Spec

#### Checklist

- [x] Add PSI, compound, tread type, and surface preset controls.
- [x] Add rolling resistance and grip coefficient calculations.
- [x] Split traction loss from motor/controller saturation.
- [x] Add bump impulse behavior separate from incline load.

#### Verification Shape

- Slick/treaded choices should change grip and rolling loss differently.
- Loose or wet surfaces should reduce grip margin.
- Incline should remain continuous load while bumps act as short disturbances.

#### Done Shape

Traction failures are visible as their own failure mode, not mislabeled as motor current failure.

## Phase F [x]: Thermal And Rollback Realism

### Phase F Summary

#### Purpose

Replace instant thermal failure with warning, rollback, and then failure across motor, controller, and battery.

#### Owns

- motor temperature refinement
- controller temperature
- battery temperature
- airflow/cooling effects
- temporary peak versus sustained thermal behavior

#### Does Not Own

- ride-log import
- tire traction formulas

### Phase F Implementation Spec

#### Checklist

- [x] Add motor, controller, and battery temperature models.
- [x] Replace instant thermal failure with warning, rollback, and then failure.
- [x] Let speed, airflow, load, and stator size affect cooling.
- [x] Add separate temporary peak and sustained thermal behavior.

#### Verification Shape

- Short peaks should be survivable if temperatures recover.
- Sustained climbs should cause warning and rollback before crash.
- Larger stator size should increase heat soak time.

#### Done Shape

Thermal behavior feels like a curve with warnings and rollback instead of a fixed instant wall.

## Phase G [x]: Validation Path

### Phase G Summary

#### Purpose

Prepare the model for comparison against real ride logs and repeatable reference scenarios.

#### Owns

- reference scenarios
- future VESC/controller log placeholders
- confidence levels for predictions
- tuning workflow direction

#### Does Not Own

- full log importer implementation unless scoped as a follow-on
- claiming safety-certified predictions

### Phase G Implementation Spec

#### Checklist

- [x] Add placeholders for VESC or similar ride log import.
- [x] Define comparison targets for voltage, current, duty cycle, speed, and temperature against future real data.
- [x] Define reference tests: flat acceleration, hill climb, low battery push, high-speed duty limit, and thermal climb.
- [x] Keep default presets marked approximate until measured behavior is available.

#### Verification Shape

- Reference scenarios should be repeatable.
- Simulator outputs should identify whether they are prototype, approximate, or validated.

#### Done Shape

The realism model has a clear path from plausible simulation toward measured calibration.
