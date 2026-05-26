const canvas = document.querySelector("#simCanvas");
const ctx = canvas.getContext("2d");

const speedReadout = document.querySelector("#speedReadout");
const leanReadout = document.querySelector("#leanReadout");
const modeReadout = document.querySelector("#modeReadout");
const safeSpeedReadout = document.querySelector("#safeSpeedReadout");
const freespinReadout = document.querySelector("#freespinReadout");
const safeSpeedPanel = document.querySelector("#safeSpeedPanel");
const freespinPanel = document.querySelector("#freespinPanel");
const voltagePanel = document.querySelector("#voltagePanel");
const ampsPanel = document.querySelector("#ampsPanel");
const phaseAmpsPanel = document.querySelector("#phaseAmpsPanel");
const wattsPanel = document.querySelector("#wattsPanel");
const consumptionPanel = document.querySelector("#consumptionPanel");
const reserveMeter = document.querySelector("#reserveMeter");
const reserveLabel = document.querySelector("#reserveLabel");
const requestedAmpsPanel = document.querySelector("#requestedAmpsPanel");
const requestedAmpsMeter = document.querySelector("#requestedAmpsMeter");
const requestedAmpsLabel = document.querySelector("#requestedAmpsLabel");
const powerLoadPanel = document.querySelector("#powerLoadPanel");
const powerLoadMeter = document.querySelector("#powerLoadMeter");
const powerLoadLabel = document.querySelector("#powerLoadLabel");
const motorTempPanel = document.querySelector("#motorTempPanel");
const motorTempMeter = document.querySelector("#motorTempMeter");
const motorTempLabel = document.querySelector("#motorTempLabel");
const dutyLimitPanel = document.querySelector("#dutyLimitPanel");
const dutyLimitMeter = document.querySelector("#dutyLimitMeter");
const dutyLimitLabel = document.querySelector("#dutyLimitLabel");
const leanSlider = document.querySelector("#leanSlider");
const motorSlider = document.querySelector("#motorSlider");
const terrainSlider = document.querySelector("#terrainSlider");
const tireSelect = document.querySelector("#tireSelect");
const motorSelect = document.querySelector("#motorSelect");
const batterySelect = document.querySelector("#batterySelect");
const tireDiameterSlider = document.querySelector("#tireDiameterSlider");
const tirePsiSlider = document.querySelector("#tirePsiSlider");
const tireCompoundSelect = document.querySelector("#tireCompoundSelect");
const footpadLengthSlider = document.querySelector("#footpadLengthSlider");
const boardWidthSlider = document.querySelector("#boardWidthSlider");
const boardHeightSlider = document.querySelector("#boardHeightSlider");
const motorKvSlider = document.querySelector("#motorKvSlider");
const motorPowerSlider = document.querySelector("#motorPowerSlider");
const statorSizeSlider = document.querySelector("#statorSizeSlider");
const motorStartTempSlider = document.querySelector("#motorStartTempSlider");
const motorTempLimitSlider = document.querySelector("#motorTempLimitSlider");
const batterySeriesSlider = document.querySelector("#batterySeriesSlider");
const batteryParallelSlider = document.querySelector("#batteryParallelSlider");
const packCurrentSlider = document.querySelector("#packCurrentSlider");
const phaseCurrentSlider = document.querySelector("#phaseCurrentSlider");
const controllerDutySlider = document.querySelector("#controllerDutySlider");
const fieldWeakeningSlider = document.querySelector("#fieldWeakeningSlider");
const cutoffVoltageSlider = document.querySelector("#cutoffVoltageSlider");
const batteryPercentSlider = document.querySelector("#batteryPercentSlider");
const batteryDrainToggle = document.querySelector("#batteryDrainToggle");
const drainRateSlider = document.querySelector("#drainRateSlider");
const riderWeightSlider = document.querySelector("#riderWeightSlider");
const riderHeightSlider = document.querySelector("#riderHeightSlider");
const kneeBendSlider = document.querySelector("#kneeBendSlider");
const viewportKneeBendSlider = document.querySelector("#viewportKneeBendSlider");
const stanceWidthSlider = document.querySelector("#stanceWidthSlider");
const inclineAngleSlider = document.querySelector("#inclineAngleSlider");
const surfaceSelect = document.querySelector("#surfaceSelect");
const tireDiameterValue = document.querySelector("#tireDiameterValue");
const tirePsiValue = document.querySelector("#tirePsiValue");
const footpadLengthValue = document.querySelector("#footpadLengthValue");
const boardWidthValue = document.querySelector("#boardWidthValue");
const boardHeightValue = document.querySelector("#boardHeightValue");
const motorKvValue = document.querySelector("#motorKvValue");
const motorPowerValue = document.querySelector("#motorPowerValue");
const statorSizeValue = document.querySelector("#statorSizeValue");
const motorStartTempValue = document.querySelector("#motorStartTempValue");
const motorTempLimitValue = document.querySelector("#motorTempLimitValue");
const batterySeriesValue = document.querySelector("#batterySeriesValue");
const batteryParallelValue = document.querySelector("#batteryParallelValue");
const packCurrentValue = document.querySelector("#packCurrentValue");
const phaseCurrentValue = document.querySelector("#phaseCurrentValue");
const controllerDutyValue = document.querySelector("#controllerDutyValue");
const fieldWeakeningValue = document.querySelector("#fieldWeakeningValue");
const cutoffVoltageValue = document.querySelector("#cutoffVoltageValue");
const batteryPercentValue = document.querySelector("#batteryPercentValue");
const drainRateValue = document.querySelector("#drainRateValue");
const riderWeightValue = document.querySelector("#riderWeightValue");
const riderHeightValue = document.querySelector("#riderHeightValue");
const kneeBendValue = document.querySelector("#kneeBendValue");
const viewportKneeBendValue = document.querySelector("#viewportKneeBendValue");
const stanceWidthValue = document.querySelector("#stanceWidthValue");
const inclineAngleValue = document.querySelector("#inclineAngleValue");
const restartButton = document.querySelector("#restartButton");
const pauseButton = document.querySelector("#pauseButton");
const modeInputs = [...document.querySelectorAll("input[name='rideMode']")];
const leanModeInputs = [...document.querySelectorAll("input[name='leanMode']")];

const state = {
  x: 0,
  velocity: 0,
  boardAngle: 0,
  angularVelocity: 0,
  riderLean: 0,
  targetLean: 0,
  motorResponse: 0.88,
  terrainRoughness: 0.34,
  batteryPercent: 75,
  batteryDrainEnabled: true,
  drainRate: 20,
  riderWeight: 180,
  riderHeight: 72,
  inclineAngle: 0,
  cameraZoom: 1,
  tireDiameter: 11.5,
  tirePsi: 18,
  tireCompound: "medium",
  footpadLength: 48,
  boardWidth: 188,
  boardHeight: 9,
  motorKv: 15.2,
  motorPower: 750,
  statorSize: 100,
  motorStartTemp: 30,
  motorTempLimit: 95,
  motorTemp: 30,
  controllerTemp: 30,
  batteryTemp: 28,
  batterySeries: 18,
  batteryParallel: 2,
  packCurrent: 40,
  phaseCurrentLimit: 104,
  controllerDutyLimit: 95,
  fieldWeakening: 0,
  cutoffVoltage: 3,
  tireKey: "gt-treaded",
  motorKey: "stock-750",
  batteryKey: "18s2p",
  surfaceKey: "asphalt",
  mode: "Mission",
  leanMode: "default",
  kneeBend: 15,
  stanceWidth: 46,
  balanceTicker: 0,
  balanceVelocity: 0,
  requestedAmps: 0,
  overLimitTime: 0,
  fallLimits: {
    amps: 0,
    power: 0,
    temp: 0,
    duty: 0
  },
  paused: false,
  crashed: false,
  scrapeState: "none",
  scrapeTimer: 0,
  scrapeWindow: 2,
  scrapeSlowMoWindow: 0.55,
  scrapeType: "nose",
  scrapeCause: "",
  recoveryQuality: 0,
  crashReason: "Nosedive. Press R to reset.",
  lastTime: performance.now(),
  forceHistory: [],
  forceSampleTime: 0,
  latestForces: {
    motorLoad: 0,
    gripMargin: 100,
    inclineAngle: 0,
    voltage: 0,
    amps: 0,
    phaseAmps: 0,
    deliveredPhaseAmps: 0,
    watts: 0,
    whPerMile: 0,
    voltageSag: 0,
    tractionSlip: 0,
    motorHeatWatts: 0,
    motorThermalCapacity: 0,
    ampLimit: 0,
    powerLoad: 0,
    tempLimit: 0,
    dutyLimit: 0,
    controllerTempLimit: 0,
    batteryTempLimit: 0
  },
  forceGraph: {
    x: 0,
    y: 0,
    width: 420,
    height: 124,
    customized: false,
    resizeMode: "",
    pointerOffsetX: 0,
    pointerOffsetY: 0,
    startX: 0,
    startY: 0,
    startWidth: 420,
    startHeight: 124
  },
  leanTap: {
    key: "",
    time: 0,
    count: 0
  },
  keys: new Set()
};

const modes = {
  Mission: { torque: 1.0, damping: 1.0, noseOffset: 0 },
  Delirium: { torque: 1.28, damping: 1.2, noseOffset: 0 },
  Elevated: { torque: 0.9, damping: 1.05, noseOffset: -4 }
};

const maxLeanDegrees = 45;
const riderControlRate = 86;
const kneeBendControlRate = riderControlRate * 10;
const leanTapWindow = 340;

const tires = {
  "pint-slick": { name: "10.5 in slick", diameter: 10.5, width: 6, grip: 0.95, rolling: 0.98, tread: "slick" },
  "gt-treaded": { name: "11.5 in treaded", diameter: 11.5, width: 6.5, grip: 1.08, rolling: 0.94, tread: "treaded" },
  growler: { name: "10.5 in growler", diameter: 10.5, width: 6.5, grip: 1.03, rolling: 0.96, tread: "slick" },
  trail: { name: "12.0 in trail", diameter: 12, width: 7, grip: 1.12, rolling: 0.92, tread: "treaded" }
};

const motors = {
  "stock-750": { name: "750 W hub", kv: 15.2, watts: 750, torque: 1, resistance: 0.18 },
  "torque-850": { name: "850 W torque hub", kv: 14.4, watts: 850, torque: 1.16, resistance: 0.16 },
  "highspeed-900": { name: "900 W speed hub", kv: 16.8, watts: 900, torque: 0.98, resistance: 0.17 },
  "vesc-1200": { name: "1200 W VESC hub", kv: 15.9, watts: 1200, torque: 1.34, resistance: 0.14 }
};

const batteries = {
  "15s2p": { name: "15s2p 63 V pack", cells: 15, parallel: 2, sag: 0.16, current: 34, cellAh: 5, cellResistance: 0.018 },
  "18s2p": { name: "18s2p 75.6 V pack", cells: 18, parallel: 2, sag: 0.14, current: 40, cellAh: 5, cellResistance: 0.017 },
  "20s2p": { name: "20s2p 84 V pack", cells: 20, parallel: 2, sag: 0.13, current: 45, cellAh: 5, cellResistance: 0.016 },
  "20s3p": { name: "20s3p 84 V high current", cells: 20, parallel: 3, sag: 0.09, current: 66, cellAh: 5, cellResistance: 0.014 }
};

const tireCompounds = {
  soft: { grip: 1.1, rolling: 0.94, heat: 1.05 },
  medium: { grip: 1, rolling: 1, heat: 1 },
  hard: { grip: 0.9, rolling: 1.06, heat: 0.96 }
};

const surfaces = {
  asphalt: { name: "Asphalt", grip: 1, rolling: 1, bump: 1 },
  wet: { name: "Wet pavement", grip: 0.68, rolling: 1.02, bump: 1 },
  gravel: { name: "Gravel", grip: 0.58, rolling: 0.88, bump: 1.3 },
  grass: { name: "Grass", grip: 0.52, rolling: 0.78, bump: 1.45 },
  loose: { name: "Loose dirt", grip: 0.48, rolling: 0.82, bump: 1.6 }
};

const validationScenarios = {
  flatAcceleration: { inclineAngle: 0, surfaceKey: "asphalt", target: "speed/current ramp" },
  sustainedClimb: { inclineAngle: 12, surfaceKey: "asphalt", target: "thermal rollback" },
  lowBatteryPush: { batteryPercent: 20, surfaceKey: "asphalt", target: "voltage sag and duty" },
  highSpeedDuty: { inclineAngle: 0, fieldWeakening: 0, target: "duty ceiling" },
  looseSurface: { inclineAngle: 6, surfaceKey: "loose", target: "traction slip" }
};

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function reset() {
  state.x = 0;
  state.velocity = 0;
  state.boardAngle = 0;
  state.angularVelocity = 0;
  state.riderLean = 0;
  state.targetLean = 0;
  state.balanceTicker = 0;
  state.balanceVelocity = 0;
  state.requestedAmps = 0;
  state.overLimitTime = 0;
  state.fallLimits = { amps: 0, power: 0, temp: 0, duty: 0 };
  state.motorTemp = state.motorStartTemp;
  state.controllerTemp = 30;
  state.batteryTemp = 28;
  state.paused = false;
  state.crashed = false;
  state.scrapeState = "none";
  state.scrapeTimer = 0;
  state.scrapeType = "nose";
  state.scrapeCause = "";
  state.recoveryQuality = 0;
  state.crashReason = "Nosedive. Press R to reset.";
  state.lastTime = performance.now();
  state.forceHistory = [];
  state.forceSampleTime = 0;
  leanSlider.value = "0";
  pauseButton.textContent = "Pause";
}

function terrainHeight(x) {
  const rough = state.terrainRoughness;
  return (
    Math.sin(x * 0.006) * 18 * rough +
    Math.sin(x * 0.017 + 1.8) * 9 * rough +
    Math.sin(x * 0.033) * 4 * rough
  );
}

function terrainSlope(x) {
  return (terrainHeight(x + 4) - terrainHeight(x - 4)) / 8 + Math.tan(degreesToRadians(state.inclineAngle));
}

function getSimulationDt(dt) {
  if (state.scrapeState !== "scrape") return dt;
  if (state.scrapeTimer > state.scrapeSlowMoWindow) return dt;
  return dt * 0.42;
}

function update(dt) {
  if (state.paused || state.crashed) return;

  const rawDt = dt;
  dt = getSimulationDt(dt);

  if (state.keys.has("KeyA")) state.targetLean -= riderControlRate * dt;
  if (state.keys.has("KeyD")) state.targetLean += riderControlRate * dt;
  state.targetLean = clamp(state.targetLean, -maxLeanDegrees, maxLeanDegrees);
  leanSlider.value = String(Math.round(state.targetLean));

  if (state.keys.has("KeyW")) state.kneeBend -= kneeBendControlRate * dt;
  if (state.keys.has("KeyS")) state.kneeBend += kneeBendControlRate * dt;
  state.kneeBend = clamp(state.kneeBend, Number(kneeBendSlider.min), Number(kneeBendSlider.max));
  kneeBendSlider.value = String(Math.round(state.kneeBend));
  viewportKneeBendSlider.value = String(Math.round(state.kneeBend));

  updateScrapeRecovery(rawDt);

  const mode = modes[state.mode];
  const slope = Math.atan(terrainSlope(state.x));
  const balance = updateBalanceMode(dt, slope);
  const effectiveLean = state.leanMode === "balance" ? state.targetLean + balance.assistLean : state.targetLean;
  const leanRadians = degreesToRadians(effectiveLean + mode.noseOffset);
  const estimate = calculateEstimate();
  const ampLimit = getPhaseCurrentLimit();
  const ampStress = state.leanMode === "balance" ? clamp(1 - Math.max(0, state.requestedAmps - ampLimit) / ampLimit, 0.22, 1) : 1;
  const thermalAssist = clamp(1 - Math.max(0, Math.max(state.fallLimits.temp, state.latestForces.controllerTempLimit, state.latestForces.batteryTempLimit) - 0.82) * 1.3, 0.35, 1);
  const reserveAssist = clamp(estimate.reserve / 70, 0.45, 1.18) * ampStress * thermalAssist;
  const targetAngle = slope * 0.35 + leanRadians * 0.7;
  const correction = targetAngle - state.boardAngle;
  const motorTorque = correction * state.motorResponse * mode.torque * reserveAssist * 12;
  const gravityTorque = Math.sin(state.boardAngle + slope) * 7.8;
  const wobble = Math.sin(performance.now() * 0.008 + state.x * 0.03) * state.terrainRoughness * 0.45;

  const scrapeDrag = state.scrapeState === "scrape" ? 0.42 : 1;
  state.angularVelocity += (motorTorque - gravityTorque + wobble) * dt * scrapeDrag;
  state.angularVelocity *= Math.pow(state.scrapeState === "scrape" ? 0.02 : 0.12 / mode.damping, dt);
  state.boardAngle += state.angularVelocity * dt;
  if (state.scrapeState === "scrape") {
    const recoveryLean = state.scrapeType === "nose" ? state.targetLean < -10 : state.targetLean > 10;
    const contactAngle = getScrapeContactAngle(getWheelRadius(), state.scrapeType);
    const targetScrapeAngle = recoveryLean ? contactAngle * 0.55 : contactAngle;
    state.boardAngle += (targetScrapeAngle - state.boardAngle) * Math.min(1, dt * 10);
  }
  state.riderLean += (effectiveLean - state.riderLean) * Math.min(1, dt * 9);

  const drive = Math.sin(leanRadians - state.boardAngle) * 34 * state.motorResponse * mode.torque * reserveAssist;
  const weightDrag = clamp((state.riderWeight - 170) / 110, -0.3, 1.2);
  const hillDrag = slope * (48 + weightDrag * 16);
  sampleForces(dt, motorTorque, hillDrag, drive, slope, estimate);
  updateThermalModel(dt);
  drainBattery(dt);
  state.velocity += (drive - hillDrag) * dt;
  state.velocity *= Math.pow(state.scrapeState === "scrape" ? 0.42 : 0.82, dt);
  state.velocity = clamp(state.velocity, -estimate.safeSpeed / 1.45, estimate.safeSpeed / 1.45);
  state.x += state.velocity * 32 * dt;

  const contact = getActiveScrapeContact();
  if (contact.touching) {
    startScrape(contact.type, contact.type === "nose" ? "Nose footpad touched down" : "Tail footpad touched down");
  }
}

function draw() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const groundY = height * 0.7;
  const cameraX = state.x - width * 0.34;

  ctx.clearRect(0, 0, width, height);
  drawSky(width, height);
  ctx.save();
  applyWorldZoom(width, height);
  drawTerrain(width, height, groundY, cameraX);
  drawBoard(width * 0.34, groundY + terrainHeight(state.x), state.boardAngle);
  drawScrapeSparks(width * 0.34, groundY + terrainHeight(state.x), state.boardAngle);
  ctx.restore();
  drawBalanceGauge(width, height);
  drawForceGraph(width, height);
  drawScrapeWarning(width, height);
  drawCrash(width, height);
  updateHud();
}

function applyWorldZoom(width, height) {
  const anchorX = width * 0.34;
  const anchorY = height * 0.7;
  ctx.translate(anchorX, anchorY);
  ctx.scale(state.cameraZoom, state.cameraZoom);
  ctx.translate(-anchorX, -anchorY);
}

function drawSky(width, height) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#27454d");
  gradient.addColorStop(0.62, "#15191b");
  gradient.addColorStop(1, "#101213");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(243, 240, 232, 0.08)";
  for (let i = 0; i < 26; i += 1) {
    const x = (i * 173 - state.x * 0.08) % (width + 160) - 80;
    const y = 42 + (i * 47) % Math.max(120, height * 0.34);
    ctx.fillRect(x, y, 2, 2);
  }
}

function drawTerrain(width, height, groundY, cameraX) {
  const incline = Math.tan(degreesToRadians(state.inclineAngle));
  const riderScreenX = width * 0.34;

  ctx.beginPath();
  ctx.moveTo(0, height);
  for (let sx = 0; sx <= width + 12; sx += 12) {
    const worldX = cameraX + sx;
    ctx.lineTo(sx, groundY + terrainHeight(worldX) + (sx - riderScreenX) * incline);
  }
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fillStyle = "#202628";
  ctx.fill();

  ctx.beginPath();
  for (let sx = 0; sx <= width + 12; sx += 12) {
    const worldX = cameraX + sx;
    const y = groundY + terrainHeight(worldX) + (sx - riderScreenX) * incline;
    if (sx === 0) ctx.moveTo(sx, y);
    else ctx.lineTo(sx, y);
  }
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#5fb8a5";
  ctx.stroke();

  ctx.strokeStyle = "rgba(231, 184, 79, 0.2)";
  ctx.lineWidth = 1;
  for (let x = -((cameraX % 96) + 96); x < width; x += 96) {
    ctx.beginPath();
    ctx.moveTo(x, groundY + 24);
    ctx.lineTo(x + 42, groundY + 18);
    ctx.stroke();
  }
}

function drawBoard(x, groundY, angle) {
  const wheelRadius = getWheelRadius();
  const { railHalf, padLength, railY, padY } = getBoardGeometry(wheelRadius);
  const wheelY = groundY - wheelRadius;
  const model = getSimulationModel();

  ctx.save();
  ctx.translate(x, wheelY);

  ctx.save();
  ctx.rotate(state.x * 0.045);
  ctx.beginPath();
  ctx.arc(0, 0, wheelRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#070909";
  ctx.fill();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#2f3a40";
  ctx.stroke();
  ctx.lineWidth = 7;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.beginPath();
  ctx.arc(0, 0, wheelRadius - 11, Math.PI * 1.1, Math.PI * 1.85);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, wheelRadius * 0.52, 0, Math.PI * 2);
  ctx.fillStyle = "#101315";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#1e2529";
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#e7b84f";
  ctx.beginPath();
  ctx.moveTo(-wheelRadius * 0.42, -wheelRadius * 0.1);
  ctx.lineTo(wheelRadius * 0.42, wheelRadius * 0.1);
  ctx.moveTo(wheelRadius * 0.1, -wheelRadius * 0.42);
  ctx.lineTo(-wheelRadius * 0.1, wheelRadius * 0.42);
  ctx.stroke();
  ctx.restore();

  ctx.rotate(angle);
  drawOnewheelRails(railHalf, railY);
  roundedRect(-railHalf - 10, padY - 8, padLength, 18, 9, "#f3f0e8");
  roundedRect(railHalf - padLength + 10, padY - 8, padLength, 18, 9, "#f3f0e8");
  roundedRect(-railHalf + 8, padY - 16, Math.max(24, padLength - 22), 8, 4, "#5fb8a5");
  roundedRect(railHalf - padLength + 18, padY - 16, Math.max(24, padLength - 22), 8, 4, "#e7b84f");

  const scrapeRiderLean = state.scrapeState === "scrape" ? (state.scrapeType === "nose" ? 0.28 : -0.28) : 0;
  drawRider(railHalf, padLength, padY, degreesToRadians(state.riderLean) + scrapeRiderLean);
  drawCenterOfMass(model.com);
  ctx.restore();
}

function drawCenterOfMass(com) {
  drawComMarker(com.board.x, com.board.y, "#74a7ff", "B");
  drawComMarker(com.rider.x, com.rider.y, "#e7b84f", "R");
  drawComMarker(com.combined.x, com.combined.y, "#ef6b5b", "C");
  ctx.save();
  ctx.strokeStyle = "rgba(239, 107, 91, 0.52)";
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(com.combined.x, com.combined.y);
  ctx.lineTo(0, getWheelRadius());
  ctx.stroke();
  ctx.restore();
}

function drawComMarker(x, y, color, label) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = "700 9px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, x, y - 8);
  ctx.restore();
}

function getWheelRadius() {
  return 38 + (state.tireDiameter - 10) * 7;
}

function getBoardGeometry(wheelRadius) {
  const visualCenterOffset = state.boardHeight - 2;
  const centerGap = state.boardWidth / 2;
  const railHalf = centerGap + state.footpadLength - 10;
  return {
    railHalf,
    padLength: state.footpadLength,
    boardWidth: state.boardWidth,
    railY: visualCenterOffset,
    padY: state.boardHeight
  };
}

function getScrapeContactLocalPoint(wheelRadius, type) {
  const { railHalf, padLength, padY } = getBoardGeometry(wheelRadius);
  const side = type === "nose" ? 1 : -1;
  return {
    x: side * (railHalf + 10),
    y: padY + 10,
    padLength
  };
}

function getScrapeContactAngle(wheelRadius, type) {
  const point = getScrapeContactLocalPoint(wheelRadius, type);
  const side = type === "nose" ? 1 : -1;
  let low = 0;
  let high = degreesToRadians(65);

  for (let i = 0; i < 28; i += 1) {
    const mid = (low + high) / 2;
    const angle = mid * side;
    const contactY = point.x * Math.sin(angle) + point.y * Math.cos(angle);
    if (contactY < wheelRadius) low = mid;
    else high = mid;
  }

  return high * side;
}

function getScrapeContactState(type, angle = state.boardAngle, wheelRadius = getWheelRadius()) {
  const point = getScrapeContactLocalPoint(wheelRadius, type);
  const contactY = point.x * Math.sin(angle) + point.y * Math.cos(angle);
  const clearance = wheelRadius - contactY;
  return {
    type,
    clearance,
    touching: clearance <= 0,
    contactAngle: getScrapeContactAngle(wheelRadius, type)
  };
}

function getActiveScrapeContact() {
  const nose = getScrapeContactState("nose");
  const tail = getScrapeContactState("tail");
  if (nose.touching && tail.touching) return nose.clearance <= tail.clearance ? nose : tail;
  if (nose.touching) return nose;
  if (tail.touching) return tail;
  return state.boardAngle >= 0 ? nose : tail;
}

function tryStartGeometryScrape(type, reason) {
  const contact = getScrapeContactState(type);
  if (contact.touching) {
    startScrape(type, reason);
    return true;
  }
  state.scrapeCause = `${reason}; ${Math.ceil(contact.clearance)} px clearance remains`;
  return false;
}

function drawOnewheelRails(railHalf, railY) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 16;
  ctx.strokeStyle = "#161a1c";
  ctx.beginPath();
  ctx.moveTo(-railHalf, railY + 3);
  ctx.lineTo(-wheelBendX(), railY + 1);
  ctx.lineTo(-42, railY - 16);
  ctx.lineTo(42, railY - 16);
  ctx.lineTo(wheelBendX(), railY + 1);
  ctx.lineTo(railHalf, railY + 3);
  ctx.stroke();

  ctx.lineWidth = 10;
  ctx.strokeStyle = "#2b3134";
  ctx.stroke();

  ctx.fillStyle = "#0c0f10";
  ctx.beginPath();
  ctx.arc(-10, railY - 13, 4, 0, Math.PI * 2);
  ctx.arc(10, railY - 13, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function wheelBendX() {
  return 78;
}

function drawRider(railHalf, padLength, padY, lean) {
  const scale = getRiderScale();
  const crouch = state.kneeBend / 100;
  const visualCrouch = crouch * 1.2 - 0.1;
  const stance = state.stanceWidth * scale;
  const leanAmount = clamp(lean / degreesToRadians(maxLeanDegrees), -1.15, 1.15);
  const leftFoot = {
    x: -railHalf - 10 + padLength * 0.6,
    y: padY - 17
  };
  const rightFoot = {
    x: railHalf - padLength * 0.6 + 10,
    y: padY - 17
  };
  const hip = {
    x: leanAmount * 34 * scale,
    y: padY - (72 - visualCrouch * 22) * scale
  };
  const leftKnee = {
    x: lerp(leftFoot.x, hip.x - stance * 0.16, 0.56) - 7 * scale - visualCrouch * 10,
    y: lerp(leftFoot.y, hip.y, 0.52) - (18 - visualCrouch * 8) * scale
  };
  const rightKnee = {
    x: lerp(rightFoot.x, hip.x + stance * 0.16, 0.56) + 7 * scale + visualCrouch * 10,
    y: lerp(rightFoot.y, hip.y, 0.52) - (18 - visualCrouch * 8) * scale
  };
  const shoulder = {
    x: hip.x + leanAmount * 48 * scale,
    y: hip.y - (66 - visualCrouch * 14) * scale
  };
  const head = {
    x: shoulder.x + leanAmount * 18 * scale,
    y: shoulder.y - (40 - visualCrouch * 5) * scale
  };
  const headRadius = 18 * scale;
  const shoulderSpan = 44 * scale;
  const shoulderAngle = lean * 0.34;
  const armLift = 18 * scale;
  const leftShoulder = {
    x: shoulder.x - Math.cos(shoulderAngle) * shoulderSpan,
    y: shoulder.y - Math.sin(shoulderAngle) * shoulderSpan
  };
  const rightShoulder = {
    x: shoulder.x + Math.cos(shoulderAngle) * shoulderSpan,
    y: shoulder.y + Math.sin(shoulderAngle) * shoulderSpan
  };

  ctx.save();
  ctx.strokeStyle = "#f3f0e8";
  ctx.lineWidth = Math.max(5, 7 * scale);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(leftFoot.x - 20 * scale, leftFoot.y);
  ctx.lineTo(leftFoot.x + 18 * scale, leftFoot.y);
  ctx.moveTo(rightFoot.x - 18 * scale, rightFoot.y);
  ctx.lineTo(rightFoot.x + 20 * scale, rightFoot.y);
  ctx.moveTo(leftFoot.x, leftFoot.y);
  ctx.lineTo(leftKnee.x, leftKnee.y);
  ctx.lineTo(hip.x - 8 * scale, hip.y);
  ctx.moveTo(rightFoot.x, rightFoot.y);
  ctx.lineTo(rightKnee.x, rightKnee.y);
  ctx.lineTo(hip.x + 8 * scale, hip.y);
  ctx.moveTo(hip.x, hip.y);
  ctx.lineTo(shoulder.x, shoulder.y);
  ctx.moveTo(leftShoulder.x, leftShoulder.y);
  ctx.lineTo(rightShoulder.x, rightShoulder.y);
  ctx.moveTo(leftShoulder.x, leftShoulder.y);
  ctx.lineTo(leftShoulder.x - 28 * scale, leftShoulder.y + armLift);
  ctx.moveTo(rightShoulder.x, rightShoulder.y);
  ctx.lineTo(rightShoulder.x + 28 * scale, rightShoulder.y + armLift);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(head.x, head.y, headRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#e7b84f";
  ctx.fill();
  ctx.restore();
}

function getRiderScale() {
  const tirePixelsPerInch = (getWheelRadius() * 2) / Math.max(1, state.tireDiameter);
  const targetStandingPixels = state.riderHeight * tirePixelsPerInch * 0.48;
  const baseStickHeight = 164;
  return clamp(targetStandingPixels / baseStickHeight, 0.9, 1.85);
}

function drawScrapeSparks(x, groundY, angle) {
  if (state.scrapeState !== "scrape") return;
  const side = state.scrapeType === "nose" ? 1 : -1;
  const wheelRadius = getWheelRadius();
  const wheelY = groundY - wheelRadius;
  const contact = getScrapeContactLocalPoint(wheelRadius, state.scrapeType);
  const baseX = x + contact.x * Math.cos(angle) - contact.y * Math.sin(angle);
  const baseY = wheelY + contact.x * Math.sin(angle) + contact.y * Math.cos(angle);
  const t = performance.now() * 0.02;

  ctx.save();
  ctx.lineCap = "round";
  for (let i = 0; i < 9; i += 1) {
    const length = 10 + ((i * 7 + t) % 16);
    const spread = (i - 4) * 0.06;
    ctx.strokeStyle = i % 2 === 0 ? "#e7b84f" : "#ef6b5b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.lineTo(baseX - side * length, baseY + 5 + spread * 24);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCrash(width, height) {
  if (!state.crashed) return;
  ctx.fillStyle = "rgba(16, 18, 19, 0.55)";
  ctx.fillRect(0, 0, width, height);
  drawRagdoll(width, height);
  ctx.fillStyle = "#f3f0e8";
  ctx.textAlign = "center";
  ctx.font = "700 32px system-ui, sans-serif";
  ctx.fillText(state.crashReason, width / 2, height * 0.42);
}

function drawRagdoll(width, height) {
  const x = width * 0.34 + 88;
  const y = height * 0.56;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(state.scrapeType === "nose" ? 0.9 : -0.9);
  ctx.strokeStyle = "rgba(243, 240, 232, 0.9)";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(42, -28);
  ctx.moveTo(12, -8);
  ctx.lineTo(-24, -36);
  ctx.moveTo(42, -28);
  ctx.lineTo(70, -8);
  ctx.moveTo(42, -28);
  ctx.lineTo(58, -76);
  ctx.moveTo(58, -58);
  ctx.lineTo(22, -82);
  ctx.moveTo(58, -58);
  ctx.lineTo(94, -80);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(62, -96, 15, 0, Math.PI * 2);
  ctx.fillStyle = "#e7b84f";
  ctx.fill();
  ctx.restore();
}

function drawScrapeWarning(width, height) {
  if (state.scrapeState !== "scrape") return;
  const remaining = Math.max(0, state.scrapeWindow - state.scrapeTimer);
  const progress = clamp(remaining / state.scrapeWindow, 0, 1);
  const pull = state.scrapeType === "nose" ? "Lean back" : "Lean forward";
  const centerX = width / 2;
  const y = height * 0.18;
  const barWidth = Math.min(320, width * 0.36);
  const barHeight = 10;
  const qualityWidth = Math.min(260, width * 0.3);
  const qualityLabel = state.recoveryQuality > 0.62 ? "Recovering" : "Still overloaded";

  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = "#ef6b5b";
  ctx.font = "700 24px system-ui, sans-serif";
  ctx.fillText(`${state.scrapeType === "nose" ? "Nose scrape" : "Tail slide"}: ${pull}`, centerX, y);
  ctx.fillStyle = "#a9b0af";
  ctx.font = "700 13px system-ui, sans-serif";
  ctx.fillText(state.scrapeCause, centerX, y + 24);
  ctx.fillStyle = "#f3f0e8";
  ctx.font = "700 18px system-ui, sans-serif";
  ctx.fillText(`${remaining.toFixed(1)}s`, centerX, y + 48);
  if (state.scrapeTimer < state.scrapeSlowMoWindow) {
    ctx.fillStyle = "#5fb8a5";
    ctx.font = "700 12px system-ui, sans-serif";
    ctx.fillText("slow motion", centerX, y + 72);
  }
  roundedRect(centerX - barWidth / 2, y + 60, barWidth, barHeight, 5, "rgba(243, 240, 232, 0.22)");
  roundedRect(centerX - barWidth / 2, y + 60, barWidth * progress, barHeight, 5, progress < 0.35 ? "#ef6b5b" : "#e7b84f");
  ctx.fillStyle = state.recoveryQuality > 0.62 ? "#5fb8a5" : "#ef6b5b";
  ctx.font = "700 13px system-ui, sans-serif";
  ctx.fillText(qualityLabel, centerX, y + 92);
  roundedRect(centerX - qualityWidth / 2, y + 102, qualityWidth, 8, 4, "rgba(243, 240, 232, 0.18)");
  roundedRect(centerX - qualityWidth / 2, y + 102, qualityWidth * state.recoveryQuality, 8, 4, state.recoveryQuality > 0.62 ? "#5fb8a5" : "#ef6b5b");
  ctx.restore();
}

function drawBalanceGauge(width, height) {
  if (state.leanMode !== "balance") return;

  const centerX = width * 0.34;
  const centerY = Math.max(132, height * 0.28);
  const radius = Math.min(116, Math.max(72, width * 0.1));
  const start = Math.PI * 1.12;
  const end = Math.PI * 1.88;
  const normalizedLean = clamp(state.targetLean / maxLeanDegrees, -1, 1);
  const ticker = clamp(state.balanceTicker, -1, 1);
  const tickerAngle = lerp(start, end, (ticker + 1) / 2);
  const leanAngle = lerp(start, end, (normalizedLean + 1) / 2);
  const limitRows = [
    {
      label: "A",
      value: state.fallLimits.amps,
      detail: `${Math.round(state.requestedAmps)}/${Math.round(getPhaseCurrentLimit())}A`,
      color: "#ef6b5b",
      radius: radius + 18
    },
    {
      label: "W",
      value: state.fallLimits.power,
      detail: `${Math.round(state.latestForces.watts)}/${Math.round(state.motorPower)}W`,
      color: "#b891ff",
      radius
    },
    {
      label: "T",
      value: state.fallLimits.temp,
      detail: `${Math.round(state.motorTemp)}/${Math.round(state.motorTempLimit)}C`,
      color: "#ff9d66",
      radius: radius - 18
    },
    {
      label: "D",
      value: state.fallLimits.duty,
      detail: `${Math.round(state.fallLimits.duty * 100)}% duty`,
      color: "#74a7ff",
      radius: radius - 36
    }
  ];
  const strongestLimit = Math.max(state.fallLimits.amps, state.fallLimits.power, state.fallLimits.temp, state.fallLimits.duty);

  ctx.save();
  ctx.lineCap = "round";
  limitRows.forEach((row) => {
    drawLimitArc(centerX, centerY, row.radius, start, end, row.value, row.color);
  });

  drawGaugeNeedle(centerX, centerY, radius - 52, leanAngle, "#5fb8a5", 14);
  drawGaugeNeedle(centerX, centerY, radius - 52, tickerAngle, strongestLimit > 1 ? "#ef6b5b" : "#f3f0e8", 22);

  ctx.fillStyle = "#f3f0e8";
  ctx.font = "700 12px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Balance", centerX, centerY + 12);
  ctx.font = "12px system-ui, sans-serif";
  ctx.fillStyle = strongestLimit > 1 ? "#ef6b5b" : "#a9b0af";
  ctx.fillText(`${Math.round(state.requestedAmps)} A requested`, centerX, centerY + 30);

  ctx.textAlign = "left";
  ctx.font = "700 11px system-ui, sans-serif";
  limitRows.forEach((row, index) => {
    ctx.fillStyle = row.value > 1 ? "#ef6b5b" : row.color;
    ctx.fillText(`${row.label} ${Math.round(row.value * 100)}%  ${row.detail}`, centerX - radius - 26, centerY + 52 + index * 15);
  });
  ctx.restore();
}

function drawLimitArc(centerX, centerY, radius, start, end, value, color) {
  const clamped = clamp(value, 0, 1);
  ctx.lineWidth = 8;
  ctx.strokeStyle = "rgba(243, 240, 232, 0.22)";
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, start, end);
  ctx.stroke();

  ctx.strokeStyle = value > 1 ? "#ef6b5b" : color;
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, start, lerp(start, end, clamped));
  ctx.stroke();
}

function drawGaugeNeedle(centerX, centerY, radius, angle, color, size) {
  const x = centerX + Math.cos(angle) * radius;
  const y = centerY + Math.sin(angle) * radius;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawForceGraph(width, height) {
  const graph = getForceGraphRect(width, height);
  const graphWidth = graph.width;
  const graphHeight = graph.height;
  const x = graph.x;
  const y = graph.y;
  const history = state.forceHistory;

  roundedRect(x, y, graphWidth, graphHeight, 8, "rgba(17, 20, 22, 0.74)");
  drawResizeFrame(x, y, graphWidth, graphHeight);
  ctx.strokeStyle = "rgba(243, 240, 232, 0.14)";
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i += 1) {
    const gy = y + (graphHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(x + 12, gy);
    ctx.lineTo(x + graphWidth - 12, gy);
    ctx.stroke();
  }

  drawGraphLine(history, "motorLoad", x, y, graphWidth, graphHeight, "#e7b84f", 100);
  drawGraphLine(history, "gripMargin", x, y, graphWidth, graphHeight, "#5fb8a5", 100);
  drawGraphLine(history, "inclineAngle", x, y, graphWidth, graphHeight, "#f3f0e8", 20);
  drawGraphLine(history, "voltage", x, y, graphWidth, graphHeight, "#74a7ff", getVoltageScale());
  drawGraphLine(history, "voltageSag", x, y, graphWidth, graphHeight, "#4dc7ff", 18);
  drawGraphLine(history, "amps", x, y, graphWidth, graphHeight, "#ef6b5b", Math.max(30, state.packCurrent));
  drawGraphLine(history, "watts", x, y, graphWidth, graphHeight, "#b891ff", Math.max(900, state.motorPower * 1.25));
  drawGraphLine(history, "whPerMile", x, y, graphWidth, graphHeight, "#ff9d66", 80);
  drawGraphLine(history, "tractionSlip", x, y, graphWidth, graphHeight, "#ffdf70", 1);
  drawGraphLine(history, "ampLimit", x, y, graphWidth, graphHeight, "#ef6b5b", 1);
  drawGraphLine(history, "powerLoad", x, y, graphWidth, graphHeight, "#b891ff", 1);
  drawGraphLine(history, "tempLimit", x, y, graphWidth, graphHeight, "#ff9d66", 1);
  drawGraphLine(history, "dutyLimit", x, y, graphWidth, graphHeight, "#74a7ff", 1);

  ctx.fillStyle = "#f3f0e8";
  ctx.font = "700 12px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Live force + battery graph", x + 12, y + 20);
  ctx.font = "12px system-ui, sans-serif";
  ctx.fillStyle = "#e7b84f";
  ctx.fillText(`Motor ${Math.round(state.latestForces.motorLoad)}%`, x + 12, y + graphHeight - 28);
  ctx.fillStyle = "#5fb8a5";
  ctx.fillText(`Grip ${Math.round(state.latestForces.gripMargin)}%`, x + 104, y + graphHeight - 28);
  ctx.fillStyle = "#f3f0e8";
  ctx.fillText(`Incline ${state.latestForces.inclineAngle.toFixed(1)} deg`, x + 188, y + graphHeight - 28);
  ctx.fillStyle = "#74a7ff";
  ctx.fillText(`${state.latestForces.voltage.toFixed(1)} V`, x + 12, y + graphHeight - 12);
  ctx.fillStyle = "#ef6b5b";
  ctx.fillText(`${Math.round(state.latestForces.amps)} A`, x + 86, y + graphHeight - 12);
  ctx.fillStyle = "#b891ff";
  ctx.fillText(`${Math.round(state.latestForces.watts)} W`, x + 138, y + graphHeight - 12);
  ctx.fillStyle = "#ff9d66";
  ctx.fillText(`M${Math.round(state.motorTemp)} C${Math.round(state.controllerTemp)} B${Math.round(state.batteryTemp)}`, x + 214, y + graphHeight - 12);
  ctx.fillStyle = "#ff9d66";
  ctx.fillText(`${Math.round(state.latestForces.whPerMile)} Wh/mi`, x + 324, y + graphHeight - 12);
}

function drawResizeFrame(x, y, width, height) {
  ctx.strokeStyle = "rgba(243, 240, 232, 0.28)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, width - 1, height - 1);

  ctx.fillStyle = "rgba(243, 240, 232, 0.42)";
  const handles = [
    [x, y],
    [x + width / 2, y],
    [x + width, y],
    [x, y + height / 2],
    [x + width, y + height / 2],
    [x, y + height],
    [x + width / 2, y + height],
    [x + width, y + height]
  ];
  handles.forEach(([hx, hy]) => {
    ctx.fillRect(hx - 3, hy - 3, 6, 6);
  });
}

function getForceGraphRect(canvasWidth, canvasHeight) {
  const minWidth = 260;
  const minHeight = 118;
  const maxWidth = Math.max(minWidth, canvasWidth - 36);
  const maxHeight = Math.max(minHeight, canvasHeight - 126);
  const graph = state.forceGraph;

  if (!graph.customized) {
    graph.width = Math.min(420, canvasWidth * 0.38);
    graph.height = 124;
    graph.x = canvasWidth - graph.width - 18;
    graph.y = Math.max(88, canvasHeight - graph.height - 44);
  }

  graph.width = clamp(graph.width, minWidth, maxWidth);
  graph.height = clamp(graph.height, minHeight, maxHeight);
  graph.x = clamp(graph.x, 18, canvasWidth - graph.width - 18);
  graph.y = clamp(graph.y, 88, canvasHeight - graph.height - 18);

  return graph;
}

function getResizeMode(pointerX, pointerY) {
  const graph = getForceGraphRect(canvas.clientWidth, canvas.clientHeight);
  const handleSize = 14;
  const nearLeft = Math.abs(pointerX - graph.x) <= handleSize;
  const nearRight = Math.abs(pointerX - (graph.x + graph.width)) <= handleSize;
  const nearTop = Math.abs(pointerY - graph.y) <= handleSize;
  const nearBottom = Math.abs(pointerY - (graph.y + graph.height)) <= handleSize;
  const withinX = pointerX >= graph.x - handleSize && pointerX <= graph.x + graph.width + handleSize;
  const withinY = pointerY >= graph.y - handleSize && pointerY <= graph.y + graph.height + handleSize;

  if (!withinX || !withinY) return "";
  if (nearTop && nearLeft) return "nw";
  if (nearTop && nearRight) return "ne";
  if (nearBottom && nearLeft) return "sw";
  if (nearBottom && nearRight) return "se";
  if (nearTop) return "n";
  if (nearRight) return "e";
  if (nearBottom) return "s";
  if (nearLeft) return "w";
  return "";
}

function resizeCursor(mode) {
  const cursors = {
    n: "ns-resize",
    s: "ns-resize",
    e: "ew-resize",
    w: "ew-resize",
    ne: "nesw-resize",
    sw: "nesw-resize",
    nw: "nwse-resize",
    se: "nwse-resize"
  };
  return cursors[mode] || "default";
}

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function resizeForceGraph(pointerX, pointerY) {
  const graph = state.forceGraph;
  const minWidth = 260;
  const minHeight = 118;
  const maxRight = canvas.clientWidth - 18;
  const maxBottom = canvas.clientHeight - 18;
  let nextX = graph.startX;
  let nextY = graph.startY;
  let nextWidth = graph.startWidth;
  let nextHeight = graph.startHeight;
  const dx = pointerX - graph.pointerOffsetX;
  const dy = pointerY - graph.pointerOffsetY;

  if (graph.resizeMode.includes("e")) {
    nextWidth = graph.startWidth + dx;
  }
  if (graph.resizeMode.includes("s")) {
    nextHeight = graph.startHeight + dy;
  }
  if (graph.resizeMode.includes("w")) {
    nextX = graph.startX + dx;
    nextWidth = graph.startWidth - dx;
  }
  if (graph.resizeMode.includes("n")) {
    nextY = graph.startY + dy;
    nextHeight = graph.startHeight - dy;
  }

  if (nextWidth < minWidth) {
    if (graph.resizeMode.includes("w")) nextX -= minWidth - nextWidth;
    nextWidth = minWidth;
  }
  if (nextHeight < minHeight) {
    if (graph.resizeMode.includes("n")) nextY -= minHeight - nextHeight;
    nextHeight = minHeight;
  }
  if (nextX < 18) {
    nextWidth -= 18 - nextX;
    nextX = 18;
  }
  if (nextY < 88) {
    nextHeight -= 88 - nextY;
    nextY = 88;
  }
  if (nextX + nextWidth > maxRight) nextWidth = maxRight - nextX;
  if (nextY + nextHeight > maxBottom) nextHeight = maxBottom - nextY;

  graph.x = nextX;
  graph.y = nextY;
  graph.width = Math.max(minWidth, nextWidth);
  graph.height = Math.max(minHeight, nextHeight);
}

function drawGraphLine(history, key, x, y, width, height, color, maxValue) {
  if (history.length < 2) return;
  ctx.beginPath();
  history.forEach((sample, index) => {
    const px = x + 12 + (index / (history.length - 1)) * (width - 24);
    const normalized = clamp(sample[key] / maxValue, 0, 1);
    const py = y + height - 30 - normalized * (height - 46);
    if (index === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function getVoltageScale() {
  return Math.max(54, state.batterySeries * 4.25);
}

function roundedRect(x, y, width, height, radius, fill) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fillStyle = fill;
  ctx.fill();
}

function updateHud() {
  const estimate = calculateEstimate();
  speedReadout.textContent = `${Math.abs(state.velocity * 1.45).toFixed(1)} mph`;
  leanReadout.textContent = `${Math.round(state.targetLean)} deg`;
  modeReadout.textContent = state.mode;
  safeSpeedReadout.textContent = `${estimate.safeSpeed.toFixed(1)} mph`;
  freespinReadout.textContent = `${estimate.freespin.toFixed(1)} mph`;
  safeSpeedPanel.textContent = `${estimate.safeSpeed.toFixed(1)} mph`;
  freespinPanel.textContent = `${estimate.freespin.toFixed(1)} mph`;
  voltagePanel.textContent = `${state.latestForces.voltage.toFixed(1)} V`;
  ampsPanel.textContent = `${Math.round(state.latestForces.amps)} A`;
  phaseAmpsPanel.textContent = `${Math.round(state.latestForces.phaseAmps)} A`;
  wattsPanel.textContent = `${Math.round(state.latestForces.watts)} W`;
  consumptionPanel.textContent = `${Math.round(state.latestForces.whPerMile)} Wh/mi`;
  reserveMeter.value = estimate.reserve;
  reserveLabel.textContent = `Torque reserve ${Math.round(estimate.reserve)}% at ${estimate.packVoltage.toFixed(1)} V`;
  requestedAmpsPanel.textContent = `${Math.round(state.requestedAmps)} A`;
  requestedAmpsMeter.value = Math.min(100, state.fallLimits.amps * 100);
  requestedAmpsLabel.textContent = `${Math.round(state.fallLimits.amps * 100)}% of phase current`;
  powerLoadPanel.textContent = `${Math.round(state.latestForces.watts)} / ${Math.round(state.motorPower)} W`;
  powerLoadMeter.value = Math.min(100, state.fallLimits.power * 100);
  powerLoadLabel.textContent = `${Math.round(state.fallLimits.power * 100)}% of sustained rating`;
  motorTempPanel.textContent = `${Math.round(state.motorTemp)} C`;
  motorTempMeter.value = Math.min(100, state.fallLimits.temp * 100);
  motorTempLabel.textContent = `${Math.round(state.fallLimits.temp * 100)}% of temp limit | ${Math.round(state.latestForces.motorHeatWatts)} W heat`;
  dutyLimitPanel.textContent = `${Math.round(state.fallLimits.duty * 100)}%`;
  dutyLimitMeter.value = Math.min(100, state.fallLimits.duty * 100);
  dutyLimitLabel.textContent = `${Math.round(state.fallLimits.duty * 100)}% duty cycle`;
  tireDiameterValue.textContent = `${state.tireDiameter.toFixed(1)} in`;
  tirePsiValue.textContent = `${Math.round(state.tirePsi)} psi`;
  footpadLengthValue.textContent = `${Math.round(state.footpadLength)} px`;
  boardWidthValue.textContent = `${Math.round(state.boardWidth)} px`;
  boardHeightValue.textContent = `${Math.round(state.boardHeight)} px drop`;
  motorKvValue.textContent = `${state.motorKv.toFixed(1)} rpm/V`;
  motorPowerValue.textContent = `${Math.round(state.motorPower)} W`;
  statorSizeValue.textContent = `${Math.round(state.statorSize)}%`;
  motorStartTempValue.textContent = `${Math.round(state.motorStartTemp)} C`;
  motorTempLimitValue.textContent = `${Math.round(state.motorTempLimit)} C`;
  batterySeriesValue.textContent = `${state.batterySeries}s`;
  batteryParallelValue.textContent = `${state.batteryParallel}p`;
  packCurrentValue.textContent = `${state.packCurrent} A`;
  phaseCurrentValue.textContent = `${state.phaseCurrentLimit} A`;
  controllerDutyValue.textContent = `${state.controllerDutyLimit}%`;
  fieldWeakeningValue.textContent = `${state.fieldWeakening}%`;
  cutoffVoltageValue.textContent = `${state.cutoffVoltage.toFixed(2)} V/cell`;
  batteryPercentValue.textContent = `${state.batteryPercent.toFixed(1)}%`;
  drainRateValue.textContent = `${state.drainRate}x`;
  riderWeightValue.textContent = `${state.riderWeight} lb`;
  riderHeightValue.textContent = `${state.riderHeight} in`;
  kneeBendValue.textContent = `${Math.round(state.kneeBend)}%`;
  viewportKneeBendValue.textContent = `${Math.round(state.kneeBend)}%`;
  stanceWidthValue.textContent = `${state.stanceWidth} px`;
  inclineAngleValue.textContent = `${state.inclineAngle.toFixed(1)} deg`;
}

function calculateEstimate() {
  const model = getSimulationModel();
  const { tire, motor, battery, controller, terrain, rider } = model;
  const soc = battery.stateOfCharge;
  const load = calculateLoadFactor();
  const loadAmps = Math.max(0, state.latestForces.amps || battery.current * 0.22);
  const voltageState = calculateBatteryVoltage(battery, loadAmps, load);
  const fieldWeakeningRatio = controller.fieldWeakening / 100;
  const packVoltage = voltageState.loadedVoltage;
  const rpm = motor.kv * packVoltage * (1 + fieldWeakeningRatio * 0.12);
  const circumference = Math.PI * tire.diameter;
  const freespin = rpm * circumference / 1056;
  const weightPenalty = clamp((rider.weight - 170) / 170, -0.18, 0.65);
  const climbPenalty = clamp(Math.tan(degreesToRadians(terrain.inclineAngle)) / 0.32, -0.16, 1.1);
  const batteryPenalty = clamp((45 - battery.percent) / 80, 0, 0.42);
  const sagPenalty = clamp(voltageState.sagVoltage / Math.max(1, voltageState.openVoltage) * 2, 0, 0.36);
  const roughPenalty = terrain.roughness * 0.08 + (1 - terrain.rolling) * 0.06;
  const motorReserve = (motor.watts * motor.torque + battery.current * packVoltage * 0.34) / 1350;
  const reserve = clamp((motorReserve * tire.grip * terrain.grip - weightPenalty * 0.55 - climbPenalty * 0.72 - batteryPenalty - sagPenalty) * 58, 8, 100);
  const safeRatio = clamp(0.7 - weightPenalty * 0.08 - climbPenalty * 0.16 - batteryPenalty * 0.18 + motorReserve * 0.03, 0.42, 0.78);
  const safeSpeed = clamp(freespin * safeRatio * tire.rolling * terrain.rolling - roughPenalty * 8, 4, freespin * 0.82);

  return {
    freespin,
    safeSpeed,
    reserve,
    packVoltage,
    load,
    voltageSag: voltageState.sagVoltage,
    cutoff: voltageState.cutoff
  };
}

function calculateLoadFactor() {
  const model = getSimulationModel();
  const rider = model.rider.weight / 180;
  const hill = 1 + Math.max(0, Math.tan(degreesToRadians(model.terrain.inclineAngle))) / 0.18;
  const rough = 1 + model.terrain.roughness * 0.18 * model.terrain.bump;
  return rider * hill * rough;
}

function getSimulationModel() {
  const tire = getTireSpec();
  const motor = getMotorSpec();
  const battery = getBatterySpec();
  const controller = getControllerSpec(battery);
  const board = getBoardSpec(tire);
  const rider = getRiderSpec();
  const terrain = getTerrainSpec();
  const com = calculateCenterOfMass(board, rider);
  return {
    tire,
    motor,
    battery,
    controller,
    board,
    rider,
    terrain,
    com,
    confidence: "approximate"
  };
}

function getTireSpec() {
  const preset = tires[state.tireKey];
  const compound = tireCompounds[state.tireCompound];
  const pressureGrip = clamp(1.08 - (state.tirePsi - 16) * 0.012, 0.76, 1.18);
  const pressureRolling = clamp(0.86 + state.tirePsi * 0.009, 0.88, 1.12);
  return {
    ...preset,
    diameter: state.tireDiameter,
    psi: state.tirePsi,
    compound: state.tireCompound,
    grip: preset.grip * compound.grip * pressureGrip,
    rolling: preset.rolling * compound.rolling * pressureRolling
  };
}

function getMotorSpec() {
  const preset = motors[state.motorKey];
  const kv = state.motorKv;
  const kt = 9.549 / Math.max(1, kv);
  const statorScale = state.statorSize / 100;
  return {
    ...preset,
    kv,
    kt,
    watts: state.motorPower,
    resistance: preset.resistance / Math.max(0.65, statorScale),
    statorScale,
    temp: state.motorTemp,
    tempLimit: state.motorTempLimit
  };
}

function getBatterySpec() {
  const preset = batteries[state.batteryKey];
  const series = state.batterySeries;
  const parallel = state.batteryParallel;
  const stateOfCharge = clamp(state.batteryPercent / 100, 0, 1);
  return {
    ...preset,
    cells: series,
    series,
    parallel,
    current: state.packCurrent,
    percent: state.batteryPercent,
    stateOfCharge,
    cellVoltage: calculateCellVoltage(stateOfCharge),
    nominalVoltage: series * 3.6,
    maxVoltage: series * 4.2,
    internalResistance: preset.cellResistance * series / Math.max(1, parallel),
    capacityWh: series * parallel * 3.6 * preset.cellAh,
    temp: state.batteryTemp
  };
}

function getControllerSpec(battery = getBatterySpec()) {
  return {
    batteryCurrentLimit: state.packCurrent,
    phaseCurrentLimit: state.phaseCurrentLimit,
    dutyLimit: state.controllerDutyLimit / 100,
    fieldWeakening: state.fieldWeakening,
    cutoffVoltage: state.cutoffVoltage,
    packCutoffVoltage: battery.series * state.cutoffVoltage,
    temp: state.controllerTemp,
    tempLimit: 90
  };
}

function getBoardSpec(tire = getTireSpec()) {
  const wheelRadius = 38 + (tire.diameter - 10) * 7;
  const geometry = getBoardGeometry(wheelRadius);
  return {
    wheelRadius,
    footpadLength: state.footpadLength,
    boardWidth: state.boardWidth,
    boardHeight: state.boardHeight,
    railHalf: geometry.railHalf,
    railY: geometry.railY,
    padY: geometry.padY,
    mass: 31
  };
}

function getRiderSpec() {
  return {
    weight: state.riderWeight,
    height: state.riderHeight,
    kneeBend: state.kneeBend,
    stanceWidth: state.stanceWidth,
    lean: state.riderLean,
    mass: state.riderWeight / 2.205
  };
}

function getTerrainSpec() {
  const surface = surfaces[state.surfaceKey];
  return {
    ...surface,
    key: state.surfaceKey,
    roughness: state.terrainRoughness,
    inclineAngle: state.inclineAngle
  };
}

function calculateCellVoltage(soc) {
  return 3.1 + Math.pow(clamp(soc, 0, 1), 0.72) * 1.1;
}

function calculateBatteryVoltage(battery, loadAmps, loadFactor = 1) {
  const openVoltage = battery.series * battery.cellVoltage;
  const resistanceSag = Math.max(0, loadAmps) * battery.internalResistance;
  const prototypeSag = battery.series * battery.sag * loadFactor * (1.15 - battery.stateOfCharge * 0.35);
  const sagVoltage = resistanceSag * 0.35 + prototypeSag * 0.65;
  const loadedVoltage = Math.max(battery.series * state.cutoffVoltage, openVoltage - sagVoltage);
  return {
    openVoltage,
    loadedVoltage,
    sagVoltage,
    cutoff: loadedVoltage <= battery.series * state.cutoffVoltage + 0.2
  };
}

function calculateCenterOfMass(board = getBoardSpec(), rider = getRiderSpec()) {
  const leanRadians = degreesToRadians(rider.lean);
  const crouchDrop = rider.kneeBend * 0.36;
  const riderHeightPx = rider.height * ((board.wheelRadius * 2) / Math.max(1, state.tireDiameter)) * 0.48;
  const riderCom = {
    x: Math.sin(leanRadians) * (riderHeightPx * 0.36),
    y: -board.wheelRadius - riderHeightPx * 0.52 + crouchDrop
  };
  const boardCom = {
    x: -8,
    y: board.railY - board.wheelRadius * 0.22
  };
  const boardMass = board.mass;
  const riderMass = rider.mass;
  const totalMass = boardMass + riderMass;
  return {
    board: boardCom,
    rider: riderCom,
    combined: {
      x: (boardCom.x * boardMass + riderCom.x * riderMass) / totalMass,
      y: (boardCom.y * boardMass + riderCom.y * riderMass) / totalMass
    },
    totalMass
  };
}

function startScrape(type, reason) {
  if (state.scrapeState === "scrape" || state.crashed) return;
  state.scrapeState = "scrape";
  state.scrapeType = type;
  state.scrapeTimer = 0;
  state.scrapeCause = reason;
  state.recoveryQuality = 0;
  state.overLimitTime = 0;
  state.crashReason = `${reason}. ${type === "nose" ? "Lean back" : "Lean forward"} to recover.`;
  pauseButton.textContent = type === "nose" ? "Nose scrape" : "Tail slide";
}

function updateScrapeRecovery(dt) {
  if (state.scrapeState !== "scrape") return;

  state.scrapeTimer += dt;
  const recoveryLean = state.scrapeType === "nose" ? state.targetLean < -10 : state.targetLean > 10;
  const boardRecovering = state.scrapeType === "nose"
    ? state.boardAngle < getScrapeContactAngle(getWheelRadius(), "nose") * 0.68
    : state.boardAngle > getScrapeContactAngle(getWheelRadius(), "tail") * 0.68;
  const leanHelp = state.scrapeType === "nose" ? clamp((-state.targetLean - 8) / 24, 0, 1) : clamp((state.targetLean - 8) / 24, 0, 1);
  const com = calculateCenterOfMass();
  const comHelp = state.scrapeType === "nose" ? clamp((-com.combined.x + 10) / 44, 0, 1) : clamp((com.combined.x + 10) / 44, 0, 1);
  const angleHelp = boardRecovering ? 1 : 0.2;
  state.recoveryQuality = clamp(leanHelp * 0.48 + comHelp * 0.32 + angleHelp * 0.2, 0, 1);

  if (recoveryLean && boardRecovering && state.scrapeTimer > 0.18) {
    state.scrapeState = "none";
    state.scrapeTimer = 0;
    state.overLimitTime = 0;
    state.angularVelocity *= 0.25;
    state.boardAngle *= 0.45;
    pauseButton.textContent = "Pause";
    return;
  }

  if (state.scrapeTimer > state.scrapeWindow) {
    finishRagdollCrash(state.scrapeType === "nose" ? "Nose scrape became a nosedive." : "Tail slide washed out.");
  }
}

function finishRagdollCrash(reason) {
  state.crashed = true;
  state.scrapeState = "ragdoll";
  state.crashReason = `${reason} Press R to reset.`;
  pauseButton.textContent = "Crashed";
}

function updateBalanceMode(dt, slope) {
  if (state.leanMode !== "balance") {
    state.balanceTicker += (0 - state.balanceTicker) * Math.min(1, dt * 5);
    state.balanceVelocity *= Math.pow(0.08, dt);
    state.requestedAmps += (0 - state.requestedAmps) * Math.min(1, dt * 5);
    state.overLimitTime = 0;
    state.fallLimits = calculateFallLimits();
    return { assistLean: 0 };
  }

  const leanDemand = state.targetLean / maxLeanDegrees;
  const terrainDemand = Math.sin(slope) * 1.9;
  const speedDemand = clamp(Math.abs(state.velocity) / 18, 0, 1) * 0.22;
  const correctionDemand = leanDemand - state.balanceTicker + terrainDemand;
  state.balanceVelocity += correctionDemand * dt * 3.2;
  state.balanceVelocity += Math.sin(performance.now() * 0.004) * dt * 0.16;
  state.balanceVelocity *= Math.pow(0.3, dt);
  state.balanceTicker = clamp(state.balanceTicker + state.balanceVelocity * dt, -1.25, 1.25);

  const battery = getBatterySpec();
  const requested = (
    Math.abs(leanDemand) * getPhaseCurrentLimit() * 0.48 +
    Math.abs(correctionDemand) * getPhaseCurrentLimit() * 0.28 +
    Math.max(0, terrainDemand) * getPhaseCurrentLimit() * 0.32 +
    speedDemand * getPhaseCurrentLimit() * 0.12
  );
  state.requestedAmps = requested;

  const limits = calculateFallLimits();
  state.fallLimits = limits;
  const strongestLimit = Math.max(limits.amps, limits.power, limits.temp, limits.duty);
  if (strongestLimit > 1) {
    state.overLimitTime += dt * strongestLimit;
  } else {
    state.overLimitTime = Math.max(0, state.overLimitTime - dt * 1.8);
  }

  if (state.overLimitTime > 0.75 || Math.abs(state.balanceTicker) > 1.18) {
    const type = state.targetLean >= 0 ? "nose" : "tail";
    const direction = type === "nose" ? 1 : -1;
    state.angularVelocity += direction * dt * clamp(strongestLimit, 0.4, 1.8) * 0.85;
    tryStartGeometryScrape(type, getLimitScrapeReason(limits, type));
  }

  if (Math.max(state.latestForces.controllerTempLimit, state.latestForces.batteryTempLimit) > 1.08) {
    const type = state.targetLean >= 0 ? "nose" : "tail";
    tryStartGeometryScrape(type, "Thermal rollback could not hold balance");
  }

  return {
    assistLean: clamp(-state.balanceTicker * 10, -12, 12)
  };
}

function getPhaseCurrentLimit() {
  return getControllerSpec().phaseCurrentLimit;
}

function getPhaseAmpRatio() {
  return state.requestedAmps / Math.max(1, getPhaseCurrentLimit());
}

function calculateDutyCycle(estimate = calculateEstimate()) {
  const controller = getControllerSpec();
  const speedMph = Math.abs(state.velocity * 1.45);
  const loadedTopSpeed = Math.max(1, estimate.freespin * controller.dutyLimit);
  const torqueDuty = clamp(state.latestForces.phaseAmps / Math.max(1, getPhaseCurrentLimit()), 0, 1) * 0.08;
  return clamp(speedMph / loadedTopSpeed + torqueDuty, 0, 1.4);
}

function calculateFallLimits() {
  const estimate = calculateEstimate();
  const sustainedPower = Math.max(1, state.motorPower);
  const watts = Math.max(state.latestForces.watts, state.requestedAmps * estimate.packVoltage);
  const tempLimit = Math.max(calculateThermalRatio(), calculateControllerThermalRatio(), calculateBatteryThermalRatio());
  return {
    amps: getPhaseAmpRatio(),
    power: watts / sustainedPower,
    temp: tempLimit,
    duty: calculateDutyCycle(estimate)
  };
}

function getLimitCrashReason(limits) {
  if (Math.abs(state.balanceTicker) > 1.18) return "Balance lost. Press R to reset.";
  if (limits.amps >= limits.power && limits.amps >= limits.temp && limits.amps >= limits.duty) return "Over-phase-current nosedive. Press R to reset.";
  if (limits.temp >= limits.power && limits.temp >= limits.duty) return "Motor overheated. Press R to reset.";
  if (limits.power >= limits.duty) return "Power overload. Press R to reset.";
  return "Duty ceiling nosedive. Press R to reset.";
}

function getLimitScrapeReason(limits, type) {
  const scrape = type === "nose" ? "nose scrape" : "tail slide";
  if (Math.abs(state.balanceTicker) > 1.18) return `Balance loss caused a ${scrape}`;
  if (limits.amps >= limits.power && limits.amps >= limits.temp && limits.amps >= limits.duty) return `Phase current limit caused a ${scrape}`;
  if (limits.temp >= limits.power && limits.temp >= limits.duty) return `Motor heat caused a ${scrape}`;
  if (limits.power >= limits.duty) return `Power overload caused a ${scrape}`;
  return `Duty ceiling caused a ${scrape}`;
}

function sampleForces(dt, motorTorque, hillDrag, drive, slope, estimate) {
  state.forceSampleTime += dt;
  const model = getSimulationModel();
  const { battery, controller, terrain, tire } = model;
  const loadFromBalance = Math.abs(motorTorque) * 8;
  const loadFromClimb = Math.max(0, hillDrag) * 1.25;
  const loadFromAcceleration = Math.abs(drive) * 0.9;
  const motorLoad = clamp(loadFromBalance + loadFromClimb + loadFromAcceleration, 0, 100);
  const gripDemand = Math.max(0, motorLoad * 0.55 + Math.abs(slope) * 130);
  const availableGrip = estimate.reserve * tire.grip * terrain.grip;
  const gripMargin = clamp(availableGrip - gripDemand * 0.35, 0, 100);
  const tractionSlip = clamp((gripDemand - availableGrip) / 80, 0, 1.4);
  const speedMph = Math.abs(state.velocity * 1.45);
  const idleAmps = 1.5 + state.motorResponse * 0.8;
  const loadAmps = (motorLoad / 100) * battery.current * 0.92;
  const inclineAmps = Math.max(0, Math.sin(slope)) * state.riderWeight * 0.1;
  const regenAmps = Math.min(0, slope) * Math.min(speedMph, 18) * 0.35;
  const requestedOverlay = state.leanMode === "balance" ? state.requestedAmps : 0;
  const phaseLimit = controller.phaseCurrentLimit;
  const requestedPhaseAmps = Math.max(loadAmps * 2.2 + inclineAmps * 1.4, requestedOverlay);
  const phaseAmps = clamp(requestedPhaseAmps, 0, phaseLimit * 1.22);
  const deliveredPhaseAmps = Math.min(phaseAmps, phaseLimit);
  const batteryEquivalent = deliveredPhaseAmps * clamp(speedMph / 18, 0.18, 0.9);
  const amps = clamp(Math.max(idleAmps + loadAmps + inclineAmps + regenAmps, batteryEquivalent), -battery.current * 0.35, battery.current * 1.18);
  const voltageState = calculateBatteryVoltage(battery, Math.max(0, amps), calculateLoadFactor());
  const watts = voltageState.loadedVoltage * Math.max(0, amps);
  const whPerMile = speedMph > 0.8 ? watts / speedMph : watts * 0.45;
  const ampLimit = phaseAmps / Math.max(1, phaseLimit);
  const powerLoad = watts / Math.max(1, state.motorPower);
  const tempLimit = calculateThermalRatio();
  const dutyLimit = calculateDutyCycle(estimate);
  const controllerTempLimit = calculateControllerThermalRatio();
  const batteryTempLimit = calculateBatteryThermalRatio();
  state.latestForces = {
    motorLoad,
    gripMargin,
    inclineAngle: radiansToDegrees(slope),
    voltage: voltageState.loadedVoltage,
    amps,
    phaseAmps,
    deliveredPhaseAmps,
    watts,
    whPerMile,
    voltageSag: voltageState.sagVoltage,
    tractionSlip,
    ampLimit,
    powerLoad,
    tempLimit,
    dutyLimit,
    controllerTempLimit,
    batteryTempLimit
  };
  state.fallLimits = { amps: ampLimit, power: powerLoad, temp: tempLimit, duty: dutyLimit };

  if (tractionSlip > 1 && state.scrapeState === "none") {
    const type = state.targetLean >= 0 ? "nose" : "tail";
    tryStartGeometryScrape(type, "Traction loss broke balance");
  }

  if (state.forceSampleTime < 0.08) return;
  state.forceSampleTime = 0;
  state.forceHistory.push(state.latestForces);
  if (state.forceHistory.length > 150) state.forceHistory.shift();
}

function updateThermalModel(dt) {
  const model = getSimulationModel();
  const motor = model.motor;
  const controller = model.controller;
  const watts = Math.max(0, state.latestForces.watts);
  const speedMph = Math.abs(state.velocity * 1.45);
  const statorScale = clamp(state.statorSize / 100, 0.6, 1.8);
  const phaseAmps = Math.max(0, state.latestForces.deliveredPhaseAmps || state.latestForces.phaseAmps);
  const overPhaseAmps = Math.max(0, state.latestForces.phaseAmps - controller.phaseCurrentLimit);
  const overPowerWatts = Math.max(0, watts - motor.watts);
  const copperLossWatts = Math.pow(phaseAmps, 2) * motor.resistance * 0.055;
  const ironLossWatts = watts * (0.022 + clamp(speedMph / 32, 0, 1) * 0.018);
  const overloadLossWatts = overPowerWatts * 0.08 + overPhaseAmps * controller.packCutoffVoltage * 0.018;
  const heatWatts = copperLossWatts + ironLossWatts + overloadLossWatts;
  const thermalCapacityJPerC = 2600 * Math.pow(statorScale, 1.18);
  const coolingWattsPerC = (1.4 + Math.min(5.2, speedMph * 0.12)) * Math.pow(statorScale, 0.72);
  const coolingWatts = Math.max(0, state.motorTemp - state.motorStartTemp) * coolingWattsPerC;
  const tempDelta = (heatWatts - coolingWatts) * dt / thermalCapacityJPerC;
  state.motorTemp += tempDelta;
  state.motorTemp = clamp(state.motorTemp, state.motorStartTemp - 3, state.motorTempLimit + 30);
  state.latestForces.motorHeatWatts = heatWatts;
  state.latestForces.motorThermalCapacity = thermalCapacityJPerC;
  const controllerHeat = Math.max(0, state.latestForces.phaseAmps / Math.max(1, state.phaseCurrentLimit)) * 0.42 + Math.max(0, state.latestForces.watts - state.motorPower) * 0.00055;
  const batteryHeat = Math.max(0, state.latestForces.amps / Math.max(1, state.packCurrent)) * 0.32 + Math.max(0, state.latestForces.voltageSag) * 0.018;
  const controllerCooling = Math.max(0, state.controllerTemp - 30) * (0.018 + Math.min(0.09, Math.abs(state.velocity) * 0.004));
  const batteryCooling = Math.max(0, state.batteryTemp - 28) * 0.012;
  state.controllerTemp = clamp(state.controllerTemp + (controllerHeat - controllerCooling) * dt, 25, 115);
  state.batteryTemp = clamp(state.batteryTemp + (batteryHeat - batteryCooling) * dt, 20, 90);
  state.fallLimits.temp = calculateThermalRatio();
}

function calculateThermalRatio() {
  const range = Math.max(1, state.motorTempLimit - state.motorStartTemp);
  return clamp((state.motorTemp - state.motorStartTemp) / range, 0, 1.4);
}

function calculateControllerThermalRatio() {
  return clamp((state.controllerTemp - 30) / 60, 0, 1.4);
}

function calculateBatteryThermalRatio() {
  return clamp((state.batteryTemp - 28) / 42, 0, 1.4);
}

function drainBattery(dt) {
  if (!state.batteryDrainEnabled) return;
  if (state.batteryPercent <= Number(batteryPercentSlider.min)) return;

  const battery = getBatterySpec();
  const capacityWh = battery.capacityWh;
  const activeWatts = Math.max(0, state.latestForces.watts);
  const idleWatts = Math.abs(state.velocity) > 0.05 ? 18 : 5;
  const consumedWh = (activeWatts + idleWatts) * dt / 3600 * state.drainRate;
  const percentDrop = consumedWh / capacityWh * 100;
  state.batteryPercent = clamp(
    state.batteryPercent - percentDrop,
    Number(batteryPercentSlider.min),
    Number(batteryPercentSlider.max)
  );
  batteryPercentSlider.value = String(state.batteryPercent);
}

function loop(now) {
  const dt = Math.min(0.033, (now - state.lastTime) / 1000);
  state.lastTime = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

leanSlider.addEventListener("input", () => {
  state.targetLean = Number(leanSlider.value);
});

motorSlider.addEventListener("input", () => {
  state.motorResponse = Number(motorSlider.value) / 100;
});

terrainSlider.addEventListener("input", () => {
  state.terrainRoughness = Number(terrainSlider.value) / 100;
});

tireSelect.addEventListener("change", () => {
  state.tireKey = tireSelect.value;
  state.tireDiameter = tires[state.tireKey].diameter;
  tireDiameterSlider.value = String(state.tireDiameter);
});

tirePsiSlider.addEventListener("input", () => {
  state.tirePsi = Number(tirePsiSlider.value);
});

tireCompoundSelect.addEventListener("change", () => {
  state.tireCompound = tireCompoundSelect.value;
});

motorSelect.addEventListener("change", () => {
  state.motorKey = motorSelect.value;
  state.motorKv = motors[state.motorKey].kv;
  state.motorPower = motors[state.motorKey].watts;
  motorKvSlider.value = String(state.motorKv);
  motorPowerSlider.value = String(state.motorPower);
});

batterySelect.addEventListener("change", () => {
  state.batteryKey = batterySelect.value;
  state.batterySeries = batteries[state.batteryKey].cells;
  state.batteryParallel = batteries[state.batteryKey].parallel;
  state.packCurrent = batteries[state.batteryKey].current;
  state.phaseCurrentLimit = Math.round(state.packCurrent * 2.6);
  batterySeriesSlider.value = String(state.batterySeries);
  batteryParallelSlider.value = String(state.batteryParallel);
  packCurrentSlider.value = String(state.packCurrent);
  phaseCurrentSlider.value = String(state.phaseCurrentLimit);
});

tireDiameterSlider.addEventListener("input", () => {
  state.tireDiameter = Number(tireDiameterSlider.value);
});

footpadLengthSlider.addEventListener("input", () => {
  state.footpadLength = Number(footpadLengthSlider.value);
});

boardWidthSlider.addEventListener("input", () => {
  state.boardWidth = Number(boardWidthSlider.value);
});

boardHeightSlider.addEventListener("input", () => {
  state.boardHeight = Number(boardHeightSlider.value);
});

motorKvSlider.addEventListener("input", () => {
  state.motorKv = Number(motorKvSlider.value);
});

motorPowerSlider.addEventListener("input", () => {
  state.motorPower = Number(motorPowerSlider.value);
});

statorSizeSlider.addEventListener("input", () => {
  state.statorSize = Number(statorSizeSlider.value);
});

motorStartTempSlider.addEventListener("input", () => {
  const previousStart = state.motorStartTemp;
  state.motorStartTemp = Number(motorStartTempSlider.value);
  state.motorTemp += state.motorStartTemp - previousStart;
  state.motorTemp = Math.min(state.motorTemp, state.motorTempLimit + 30);
});

motorTempLimitSlider.addEventListener("input", () => {
  state.motorTempLimit = Number(motorTempLimitSlider.value);
});

batterySeriesSlider.addEventListener("input", () => {
  state.batterySeries = Number(batterySeriesSlider.value);
});

batteryParallelSlider.addEventListener("input", () => {
  state.batteryParallel = Number(batteryParallelSlider.value);
});

packCurrentSlider.addEventListener("input", () => {
  state.packCurrent = Number(packCurrentSlider.value);
});

phaseCurrentSlider.addEventListener("input", () => {
  state.phaseCurrentLimit = Number(phaseCurrentSlider.value);
});

controllerDutySlider.addEventListener("input", () => {
  state.controllerDutyLimit = Number(controllerDutySlider.value);
});

fieldWeakeningSlider.addEventListener("input", () => {
  state.fieldWeakening = Number(fieldWeakeningSlider.value);
});

cutoffVoltageSlider.addEventListener("input", () => {
  state.cutoffVoltage = Number(cutoffVoltageSlider.value);
});

batteryPercentSlider.addEventListener("input", () => {
  state.batteryPercent = Number(batteryPercentSlider.value);
});

batteryDrainToggle.addEventListener("change", () => {
  state.batteryDrainEnabled = batteryDrainToggle.checked;
});

drainRateSlider.addEventListener("input", () => {
  state.drainRate = Number(drainRateSlider.value);
});

riderWeightSlider.addEventListener("input", () => {
  state.riderWeight = Number(riderWeightSlider.value);
});

riderHeightSlider.addEventListener("input", () => {
  state.riderHeight = Number(riderHeightSlider.value);
});

kneeBendSlider.addEventListener("input", () => {
  state.kneeBend = Number(kneeBendSlider.value);
  viewportKneeBendSlider.value = kneeBendSlider.value;
});

viewportKneeBendSlider.addEventListener("input", () => {
  state.kneeBend = Number(viewportKneeBendSlider.value);
  kneeBendSlider.value = viewportKneeBendSlider.value;
});

stanceWidthSlider.addEventListener("input", () => {
  state.stanceWidth = Number(stanceWidthSlider.value);
});

inclineAngleSlider.addEventListener("input", () => {
  state.inclineAngle = Number(inclineAngleSlider.value);
});

surfaceSelect.addEventListener("change", () => {
  state.surfaceKey = surfaceSelect.value;
});

modeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) state.mode = input.value;
  });
});

leanModeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      state.leanMode = input.value;
      state.overLimitTime = 0;
      state.fallLimits = { amps: 0, power: 0, temp: calculateThermalRatio(), duty: 0 };
      state.balanceTicker = 0;
      state.balanceVelocity = 0;
    }
  });
});

restartButton.addEventListener("click", reset);

pauseButton.addEventListener("click", () => {
  if (state.crashed) {
    reset();
    return;
  }
  state.paused = !state.paused;
  pauseButton.textContent = state.paused ? "Resume" : "Pause";
});

function applyLeanTapBoost(code) {
  if (!["KeyA", "KeyD"].includes(code)) return;

  const now = performance.now();
  const sameTapCombo = state.leanTap.key === code && now - state.leanTap.time <= leanTapWindow;
  state.leanTap = {
    key: code,
    time: now,
    count: sameTapCombo ? state.leanTap.count + 1 : 1
  };

  if (state.leanTap.count < 2) return;

  const direction = code === "KeyA" ? -1 : 1;
  const impulse = clamp(6 + state.leanTap.count * 4, 0, 26);
  state.targetLean = clamp(state.targetLean + direction * impulse, -maxLeanDegrees, maxLeanDegrees);
  leanSlider.value = String(Math.round(state.targetLean));
}

window.addEventListener("keydown", (event) => {
  if (["KeyA", "KeyD", "KeyW", "KeyS", "Space"].includes(event.code)) event.preventDefault();
  if (event.code === "Space") {
    state.paused = !state.paused;
    pauseButton.textContent = state.paused ? "Resume" : "Pause";
  } else if (event.code === "KeyR") {
    reset();
  } else if (event.code === "Digit0") {
    state.cameraZoom = 1;
  } else {
    if (!event.repeat) applyLeanTapBoost(event.code);
    state.keys.add(event.code);
  }
});

window.addEventListener("keyup", (event) => {
  state.keys.delete(event.code);
});

canvas.addEventListener("pointermove", (event) => {
  const point = canvasPoint(event);
  const graph = state.forceGraph;
  if (graph.resizeMode) {
    resizeForceGraph(point.x, point.y);
    return;
  }
  canvas.style.cursor = resizeCursor(getResizeMode(point.x, point.y));
});

canvas.addEventListener("pointerdown", (event) => {
  const point = canvasPoint(event);
  const mode = getResizeMode(point.x, point.y);
  if (!mode) return;
  const graph = getForceGraphRect(canvas.clientWidth, canvas.clientHeight);
  state.forceGraph.resizeMode = mode;
  state.forceGraph.customized = true;
  state.forceGraph.pointerOffsetX = point.x;
  state.forceGraph.pointerOffsetY = point.y;
  state.forceGraph.startX = graph.x;
  state.forceGraph.startY = graph.y;
  state.forceGraph.startWidth = graph.width;
  state.forceGraph.startHeight = graph.height;
  canvas.setPointerCapture(event.pointerId);
  event.preventDefault();
});

canvas.addEventListener("pointerup", (event) => {
  state.forceGraph.resizeMode = "";
  canvas.releasePointerCapture(event.pointerId);
});

canvas.addEventListener("pointercancel", () => {
  state.forceGraph.resizeMode = "";
});

canvas.addEventListener("pointerleave", () => {
  if (!state.forceGraph.resizeMode) canvas.style.cursor = "default";
});

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  const zoomDelta = Math.exp(-event.deltaY * 0.0012);
  state.cameraZoom = clamp(state.cameraZoom * zoomDelta, 0.55, 2.8);
}, { passive: false });

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
requestAnimationFrame(loop);
