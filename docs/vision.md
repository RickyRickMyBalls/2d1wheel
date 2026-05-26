# 2D Board Simulator Vision

Build a 2D Onewheel-style simulator that helps riders and builders explore how board setup changes the feel and expected speed envelope. The long-term goal is to make this as realistic as possible while keeping the side-scroller readable and fun to use.

The simulator should combine two views:

- A live 2D balance toy where the rider leans, the hub motor responds, and terrain changes load.
- A board-spec estimator where tire, motor, battery, battery percentage, rider weight, and incline angle affect freespin speed, expected safe riding speed, and torque reserve.
- A live force and battery graph that shows motor load, grip margin, terrain angle, voltage, amps, watts, and consumption rate while the side-scroller runs.
- A lean-function model with Default mode for simple riding and Balance mode for current-demand practice, balance ticker feedback, and fall limits for torque current, temporary power overload, motor temperature, and voltage duty ceiling.
- A scrape and recovery model where nose scrapes and tail slides provide a short recovery window before a ragdoll crash.

## Current Model

The first estimator is intentionally conservative and educational, not a safety guarantee. It is a prototype scaffold for a more realistic physics and electrical model. It estimates:

- Pack voltage from battery series count and state of charge.
- Loaded voltage sag from battery current capability, rider weight, hill grade, and terrain roughness.
- Freespin speed from motor Kv, pack voltage, and tire circumference.
- Expected safe riding speed from freespin speed with load penalties and torque reserve.
- Motor load and grip margin from balance torque, acceleration demand, incline angle, rider weight, and terrain roughness.
- Battery percentage drain from estimated watt draw, pack capacity, and a tunable simulation rate.
- Motor temperature from sustained watt draw, temporary overload, stator thermal mass, start temperature, thermal limit, and cooling back toward ambient/start temperature.
- Nose scrape and tail slide recovery from board angle, footpad contact, recovery lean, and a countdown window.

## Phase 0 [x]: Prototype Foundation

- [x] Keep the side-scroller world as the primary experience.
- [x] Maintain the right-side collapsible control panel for fast access to settings.
- [x] Preserve estimate panels, live graph, Balance mode, scrape recovery, and board/rider visualization.
- [x] Keep all current calculations labeled as approximate until validated.

## Phase 1 [x]: Clear Approximation And UX

- [x] Rename limit concepts to realistic terms: torque current limit, temporary power overload, motor thermal limit, and voltage duty limit.
- [x] Keep the existing simple model visible and label every estimate as approximate.
- [x] Show assumptions beside the graph so users know what is simulated and what is guessed.
- [x] Show the exact scrape/fall cause during recovery: torque current, power load, duty ceiling, thermal limit, or traction loss.
- [x] Add a recovery quality meter that tells the rider whether their lean is helping or making the scrape worse.
- [x] Add slow motion during the first moment of a scrape so users can react and learn.

## Phase 2 [~]: Electrical Model

- [x] Split battery current and phase current instead of using one amp value.
- [ ] Split motor current from phase current if needed for deeper motor modeling.
- [ ] Model pack voltage from series count, cell voltage curve, internal resistance, sag, and state of charge.
- [ ] Add controller settings for battery current limit, phase current limit, duty limit, field weakening, and cutoff voltage.
- [x] Calculate approximate duty cycle from motor Kv, speed, tire diameter, and pack voltage.
- [x] Replace the current approximate "Kv ceiling" rail with a duty-cycle rail.
- [x] Keep freespin speed as a derived reference, not the main failure metric.
- [ ] Add separate graph traces for voltage sag and field weakening.

## Phase 3 [~]: Motor And Thermal Model

- [ ] Add motor resistance, Kv/Kt relationship, copper losses, and efficiency.
- [x] Model stator size as thermal mass and cooling surface area.
- [x] Track motor temperature over time.
- [ ] Track controller and battery temperature over time.
- [x] Turn the watts limit into a thermal headroom curve instead of a fixed instant-crash number.
- [ ] Add temporary peak limits and sustained limits.
- [ ] Add thermal rollback before crash: gradually reduce available torque/power as temperatures climb.
- [x] Let airflow/cooling change with speed.

## Phase 4 [~]: Tire, Terrain, And Rider Physics

- [x] Model tire radius from tire diameter.
- [ ] Model tire pressure, contact patch, rolling resistance, and grip coefficient.
- [ ] Add traction loss separately from torque saturation.
- [x] Convert terrain and incline into slope angle used by the simulator.
- [ ] Add surface friction, bumps, and rolling losses.
- [x] Model rider weight and rider height.
- [ ] Model rider stance, center of mass, lean rate, and board pitch dynamics more realistically.
- [ ] Add a visible rider center-of-mass marker and balance line.
- [x] Model footpad contact during nose scrapes and tail slides as actual geometry.
- [ ] Add surface presets such as asphalt, gravel, wet pavement, grass, and loose dirt.

## Phase 5 [~]: Board Behavior

- [ ] Add pushback behavior, tiltback, haptic buzz, alerts, and controller response modes.
- [x] Simulate nosedive causes separately enough to distinguish current, duty, power, thermal, and balance failures.
- [ ] Add explicit low-voltage sag and traction slip failure modes.
- [ ] Let users compare presets and custom builds.
- [ ] Add board presets such as Pint, XR, GT, trail VESC, and high-speed VESC.
- [ ] Add custom preset saving and comparison.
- [ ] Add ride modes that change response curves, not only labels.

## Phase 6 [ ]: Training And Playback

- [ ] Let users replay a hill climb, acceleration run, braking run, or rough-terrain section.
- [ ] Add ghost traces so a user can compare two setups on the same scenario.
- [ ] Add "why did I fall?" summaries after crashes.
- [ ] Add timeline scrubbing for voltage, current, duty, temperature, speed, lean, and scrape state.

## Phase 7 [ ]: Validation

- [ ] Import or enter real ride logs from VESC or similar controllers.
- [ ] Compare simulated voltage, current, duty cycle, speed, and temperature against real data.
- [ ] Tune default presets from measured behavior instead of guesses.
- [ ] Keep a visible confidence level for each prediction.
- [ ] Build a small corpus of reference runs: flat acceleration, sustained climb, low battery push, high-speed duty limit, and thermal climb.

## Next Steps

- Add custom spec entry for tire diameter, motor Kv, battery cell count, pack current, and controller current.
- Show the assumptions used in the current calculation.
- Add duty cycle, voltage sag, phase current, battery current, and thermal graphs over speed.
- Let the simulator play back a hill climb or acceleration run from the selected setup.
- Save and compare board presets.
- Add recovery feedback for nose scrape and tail slide.
- Add board presets and scenario presets.
