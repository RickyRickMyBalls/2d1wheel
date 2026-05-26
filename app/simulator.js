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
const footpadLengthSlider = document.querySelector("#footpadLengthSlider");
const motorKvSlider = document.querySelector("#motorKvSlider");
const motorPowerSlider = document.querySelector("#motorPowerSlider");
const statorSizeSlider = document.querySelector("#statorSizeSlider");
const motorStartTempSlider = document.querySelector("#motorStartTempSlider");
const motorTempLimitSlider = document.querySelector("#motorTempLimitSlider");
const batterySeriesSlider = document.querySelector("#batterySeriesSlider");
const packCurrentSlider = document.querySelector("#packCurrentSlider");
const batteryPercentSlider = document.querySelector("#batteryPercentSlider");
const batteryDrainToggle = document.querySelector("#batteryDrainToggle");
const drainRateSlider = document.querySelector("#drainRateSlider");
const riderWeightSlider = document.querySelector("#riderWeightSlider");
const riderHeightSlider = document.querySelector("#riderHeightSlider");
const inclineAngleSlider = document.querySelector("#inclineAngleSlider");
const tireDiameterValue = document.querySelector("#tireDiameterValue");
const footpadLengthValue = document.querySelector("#footpadLengthValue");
const motorKvValue = document.querySelector("#motorKvValue");
const motorPowerValue = document.querySelector("#motorPowerValue");
const statorSizeValue = document.querySelector("#statorSizeValue");
const motorStartTempValue = document.querySelector("#motorStartTempValue");
const motorTempLimitValue = document.querySelector("#motorTempLimitValue");
const batterySeriesValue = document.querySelector("#batterySeriesValue");
const packCurrentValue = document.querySelector("#packCurrentValue");
const batteryPercentValue = document.querySelector("#batteryPercentValue");
const drainRateValue = document.querySelector("#drainRateValue");
const riderWeightValue = document.querySelector("#riderWeightValue");
const riderHeightValue = document.querySelector("#riderHeightValue");
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
  footpadLength: 48,
  motorKv: 15.2,
  motorPower: 750,
  statorSize: 100,
  motorStartTemp: 30,
  motorTempLimit: 95,
  motorTemp: 30,
  batterySeries: 18,
  packCurrent: 40,
  tireKey: "gt-treaded",
  motorKey: "stock-750",
  batteryKey: "18s2p",
  mode: "Mission",
  leanMode: "default",
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
    watts: 0,
    whPerMile: 0,
    ampLimit: 0,
    powerLoad: 0,
    tempLimit: 0,
    dutyLimit: 0
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
  keys: new Set()
};

const modes = {
  Mission: { torque: 1.0, damping: 1.0, noseOffset: 0 },
  Delirium: { torque: 1.28, damping: 1.2, noseOffset: 0 },
  Elevated: { torque: 0.9, damping: 1.05, noseOffset: -4 }
};

const maxLeanDegrees = 45;

const tires = {
  "pint-slick": { name: "10.5 in slick", diameter: 10.5, grip: 0.95, rolling: 0.98 },
  "gt-treaded": { name: "11.5 in treaded", diameter: 11.5, grip: 1.08, rolling: 0.94 },
  growler: { name: "10.5 in growler", diameter: 10.5, grip: 1.03, rolling: 0.96 },
  trail: { name: "12.0 in trail", diameter: 12, grip: 1.12, rolling: 0.92 }
};

const motors = {
  "stock-750": { name: "750 W hub", kv: 15.2, watts: 750, torque: 1 },
  "torque-850": { name: "850 W torque hub", kv: 14.4, watts: 850, torque: 1.16 },
  "highspeed-900": { name: "900 W speed hub", kv: 16.8, watts: 900, torque: 0.98 },
  "vesc-1200": { name: "1200 W VESC hub", kv: 15.9, watts: 1200, torque: 1.34 }
};

const batteries = {
  "15s2p": { name: "15s2p 63 V pack", cells: 15, parallel: 2, sag: 0.16, current: 34 },
  "18s2p": { name: "18s2p 75.6 V pack", cells: 18, parallel: 2, sag: 0.14, current: 40 },
  "20s2p": { name: "20s2p 84 V pack", cells: 20, parallel: 2, sag: 0.13, current: 45 },
  "20s3p": { name: "20s3p 84 V high current", cells: 20, parallel: 3, sag: 0.09, current: 66 }
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

  if (state.keys.has("KeyA")) state.targetLean -= 86 * dt;
  if (state.keys.has("KeyD")) state.targetLean += 86 * dt;
  state.targetLean = clamp(state.targetLean, -maxLeanDegrees, maxLeanDegrees);
  leanSlider.value = String(Math.round(state.targetLean));
  updateScrapeRecovery(rawDt);

  const mode = modes[state.mode];
  const slope = Math.atan(terrainSlope(state.x));
  const balance = updateBalanceMode(dt, slope);
  const effectiveLean = state.leanMode === "balance" ? state.targetLean + balance.assistLean : state.targetLean;
  const leanRadians = degreesToRadians(effectiveLean + mode.noseOffset);
  const estimate = calculateEstimate();
  const ampLimit = getPhaseCurrentLimit();
  const ampStress = state.leanMode === "balance" ? clamp(1 - Math.max(0, state.requestedAmps - ampLimit) / ampLimit, 0.22, 1) : 1;
  const reserveAssist = clamp(estimate.reserve / 70, 0.45, 1.18) * ampStress;
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
  updateMotorTemperature(dt);
  drainBattery(dt);
  state.velocity += (drive - hillDrag) * dt;
  state.velocity *= Math.pow(state.scrapeState === "scrape" ? 0.42 : 0.82, dt);
  state.velocity = clamp(state.velocity, -estimate.safeSpeed / 1.45, estimate.safeSpeed / 1.45);
  state.x += state.velocity * 32 * dt;

  if (Math.abs(radiansToDegrees(state.boardAngle)) > 46) {
    startScrape(state.boardAngle > 0 ? "nose" : "tail", state.boardAngle > 0 ? "Nose scrape" : "Tail slide");
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
  drawRider(0, padY - 12, degreesToRadians(state.riderLean) + scrapeRiderLean, 76);
  ctx.restore();
}

function getWheelRadius() {
  return 38 + (state.tireDiameter - 10) * 7;
}

function getBoardGeometry(wheelRadius) {
  const visualCenterOffset = 7;
  return {
    railHalf: 132,
    padLength: state.footpadLength,
    railY: visualCenterOffset,
    padY: visualCenterOffset + 2
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

function drawRider(x, y, lean, stance = 46) {
  const scale = clamp(state.riderHeight / 64, 0.75, 1.38);
  const hipY = -72 * scale;
  const torsoTopY = -132 * scale;
  const shoulderY = -106 * scale;
  const headY = -154 * scale;
  const headRadius = 18 * scale;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(lean * 0.8);
  ctx.strokeStyle = "#f3f0e8";
  ctx.lineWidth = Math.max(5, 7 * scale);
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(-stance - 22, 0);
  ctx.lineTo(-stance + 20, -4);
  ctx.moveTo(stance + 22, 0);
  ctx.lineTo(stance - 20, -4);
  ctx.moveTo(-stance + 20, -4);
  ctx.lineTo(-8 * scale, hipY);
  ctx.moveTo(stance - 20, -4);
  ctx.lineTo(8 * scale, hipY);
  ctx.moveTo(0, hipY);
  ctx.lineTo(0, torsoTopY);
  ctx.moveTo(0, shoulderY);
  ctx.lineTo(-42 * scale, -88 * scale);
  ctx.moveTo(0, shoulderY);
  ctx.lineTo(42 * scale, -90 * scale);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, headY, headRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#e7b84f";
  ctx.fill();
  ctx.restore();
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
  drawGraphLine(history, "amps", x, y, graphWidth, graphHeight, "#ef6b5b", Math.max(30, state.packCurrent));
  drawGraphLine(history, "watts", x, y, graphWidth, graphHeight, "#b891ff", Math.max(900, state.motorPower * 1.25));
  drawGraphLine(history, "whPerMile", x, y, graphWidth, graphHeight, "#ff9d66", 80);
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
  ctx.fillText(`${Math.round(state.motorTemp)} C`, x + 214, y + graphHeight - 12);
  ctx.fillStyle = "#ff9d66";
  ctx.fillText(`${Math.round(state.latestForces.whPerMile)} Wh/mi`, x + 268, y + graphHeight - 12);
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
  motorTempLabel.textContent = `${Math.round(state.fallLimits.temp * 100)}% of temp limit`;
  dutyLimitPanel.textContent = `${Math.round(state.fallLimits.duty * 100)}%`;
  dutyLimitMeter.value = Math.min(100, state.fallLimits.duty * 100);
  dutyLimitLabel.textContent = `${Math.round(state.fallLimits.duty * 100)}% duty cycle`;
  tireDiameterValue.textContent = `${state.tireDiameter.toFixed(1)} in`;
  footpadLengthValue.textContent = `${Math.round(state.footpadLength)} px`;
  motorKvValue.textContent = `${state.motorKv.toFixed(1)} rpm/V`;
  motorPowerValue.textContent = `${Math.round(state.motorPower)} W`;
  statorSizeValue.textContent = `${Math.round(state.statorSize)}%`;
  motorStartTempValue.textContent = `${Math.round(state.motorStartTemp)} C`;
  motorTempLimitValue.textContent = `${Math.round(state.motorTempLimit)} C`;
  batterySeriesValue.textContent = `${state.batterySeries}s`;
  packCurrentValue.textContent = `${state.packCurrent} A`;
  batteryPercentValue.textContent = `${state.batteryPercent.toFixed(1)}%`;
  drainRateValue.textContent = `${state.drainRate}x`;
  riderWeightValue.textContent = `${state.riderWeight} lb`;
  riderHeightValue.textContent = `${state.riderHeight} in`;
  inclineAngleValue.textContent = `${state.inclineAngle.toFixed(1)} deg`;
}

function calculateEstimate() {
  const tire = getTireSpec();
  const motor = getMotorSpec();
  const battery = getBatterySpec();
  const soc = state.batteryPercent / 100;
  const cellVoltage = 3.1 + Math.pow(soc, 0.72) * 1.1;
  const load = calculateLoadFactor();
  const sagVoltage = battery.cells * battery.sag * load * (1.15 - soc * 0.35);
  const packVoltage = Math.max(battery.cells * 3.05, battery.cells * cellVoltage - sagVoltage);
  const rpm = motor.kv * packVoltage;
  const circumference = Math.PI * tire.diameter;
  const freespin = rpm * circumference / 1056;
  const weightPenalty = clamp((state.riderWeight - 170) / 170, -0.18, 0.65);
  const climbPenalty = clamp(Math.tan(degreesToRadians(state.inclineAngle)) / 0.32, -0.16, 1.1);
  const batteryPenalty = clamp((45 - state.batteryPercent) / 80, 0, 0.42);
  const roughPenalty = state.terrainRoughness * 0.08;
  const motorReserve = (motor.watts * motor.torque + battery.current * packVoltage * 0.34) / 1350;
  const reserve = clamp((motorReserve * tire.grip - weightPenalty * 0.55 - climbPenalty * 0.72 - batteryPenalty) * 58, 8, 100);
  const safeRatio = clamp(0.7 - weightPenalty * 0.08 - climbPenalty * 0.16 - batteryPenalty * 0.18 + motorReserve * 0.03, 0.42, 0.78);
  const safeSpeed = clamp(freespin * safeRatio * tire.rolling - roughPenalty * 8, 4, freespin * 0.82);

  return {
    freespin,
    safeSpeed,
    reserve,
    packVoltage,
    load
  };
}

function calculateLoadFactor() {
  const rider = state.riderWeight / 180;
  const hill = 1 + Math.max(0, Math.tan(degreesToRadians(state.inclineAngle))) / 0.18;
  const rough = 1 + state.terrainRoughness * 0.18;
  return rider * hill * rough;
}

function getTireSpec() {
  const preset = tires[state.tireKey];
  return {
    ...preset,
    diameter: state.tireDiameter
  };
}

function getMotorSpec() {
  const preset = motors[state.motorKey];
  return {
    ...preset,
    kv: state.motorKv,
    watts: state.motorPower
  };
}

function getBatterySpec() {
  const preset = batteries[state.batteryKey];
  return {
    ...preset,
    cells: state.batterySeries,
    current: state.packCurrent
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
  const angleHelp = boardRecovering ? 1 : 0.2;
  state.recoveryQuality = clamp(leanHelp * 0.72 + angleHelp * 0.28, 0, 1);

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
    startScrape(type, getLimitScrapeReason(limits, type));
  }

  return {
    assistLean: clamp(-state.balanceTicker * 10, -12, 12)
  };
}

function getPhaseCurrentLimit() {
  return getBatterySpec().current * 2.6;
}

function getPhaseAmpRatio() {
  return state.requestedAmps / Math.max(1, getPhaseCurrentLimit());
}

function calculateDutyCycle(estimate = calculateEstimate()) {
  const speedMph = Math.abs(state.velocity * 1.45);
  const loadedTopSpeed = Math.max(1, estimate.freespin * 0.92);
  const torqueDuty = clamp(state.latestForces.phaseAmps / Math.max(1, getPhaseCurrentLimit()), 0, 1) * 0.08;
  return clamp(speedMph / loadedTopSpeed + torqueDuty, 0, 1.4);
}

function calculateFallLimits() {
  const estimate = calculateEstimate();
  const sustainedPower = Math.max(1, state.motorPower);
  const watts = Math.max(state.latestForces.watts, state.requestedAmps * estimate.packVoltage);
  const tempLimit = calculateThermalRatio();
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
  const loadFromBalance = Math.abs(motorTorque) * 8;
  const loadFromClimb = Math.max(0, hillDrag) * 1.25;
  const loadFromAcceleration = Math.abs(drive) * 0.9;
  const motorLoad = clamp(loadFromBalance + loadFromClimb + loadFromAcceleration, 0, 100);
  const gripDemand = Math.max(0, motorLoad * 0.55 + Math.abs(slope) * 130);
  const gripMargin = clamp(estimate.reserve - gripDemand * 0.35, 0, 100);
  const battery = getBatterySpec();
  const speedMph = Math.abs(state.velocity * 1.45);
  const idleAmps = 1.5 + state.motorResponse * 0.8;
  const loadAmps = (motorLoad / 100) * battery.current * 0.92;
  const inclineAmps = Math.max(0, Math.sin(slope)) * state.riderWeight * 0.1;
  const regenAmps = Math.min(0, slope) * Math.min(speedMph, 18) * 0.35;
  const requestedOverlay = state.leanMode === "balance" ? state.requestedAmps : 0;
  const phaseLimit = getPhaseCurrentLimit();
  const phaseAmps = clamp(Math.max(loadAmps * 2.2 + inclineAmps * 1.4, requestedOverlay), 0, phaseLimit * 1.22);
  const batteryEquivalent = phaseAmps * clamp(speedMph / 18, 0.18, 0.9);
  const amps = clamp(Math.max(idleAmps + loadAmps + inclineAmps + regenAmps, batteryEquivalent), -battery.current * 0.35, battery.current * 1.18);
  const watts = estimate.packVoltage * Math.max(0, amps);
  const whPerMile = speedMph > 0.8 ? watts / speedMph : watts * 0.45;
  const ampLimit = phaseAmps / Math.max(1, phaseLimit);
  const powerLoad = watts / Math.max(1, state.motorPower);
  const tempLimit = calculateThermalRatio();
  const dutyLimit = calculateDutyCycle(estimate);
  state.latestForces = {
    motorLoad,
    gripMargin,
    inclineAngle: radiansToDegrees(slope),
    voltage: estimate.packVoltage,
    amps,
    phaseAmps,
    watts,
    whPerMile,
    ampLimit,
    powerLoad,
    tempLimit,
    dutyLimit
  };
  state.fallLimits = { amps: ampLimit, power: powerLoad, temp: tempLimit, duty: dutyLimit };

  if (state.forceSampleTime < 0.08) return;
  state.forceSampleTime = 0;
  state.forceHistory.push(state.latestForces);
  if (state.forceHistory.length > 150) state.forceHistory.shift();
}

function updateMotorTemperature(dt) {
  const watts = Math.max(0, state.latestForces.watts);
  const excessWatts = Math.max(0, watts - state.motorPower);
  const thermalMass = state.statorSize / 100;
  const coolingArea = Math.pow(thermalMass, 0.65);
  const copperHeat = watts * 0.0007 / thermalMass;
  const overloadHeat = excessWatts * 0.0032 / thermalMass;
  const speedCooling = (0.018 + Math.min(0.12, Math.abs(state.velocity) * 0.006)) * coolingArea;
  const cooling = Math.max(0, state.motorTemp - state.motorStartTemp) * speedCooling;
  state.motorTemp += (copperHeat + overloadHeat - cooling) * dt;
  state.motorTemp = clamp(state.motorTemp, state.motorStartTemp - 3, state.motorTempLimit + 30);
  state.fallLimits.temp = calculateThermalRatio();
}

function calculateThermalRatio() {
  const range = Math.max(1, state.motorTempLimit - state.motorStartTemp);
  return clamp((state.motorTemp - state.motorStartTemp) / range, 0, 1.4);
}

function drainBattery(dt) {
  if (!state.batteryDrainEnabled) return;
  if (state.batteryPercent <= Number(batteryPercentSlider.min)) return;

  const battery = getBatterySpec();
  const capacityWh = battery.cells * battery.parallel * 3.6 * 5;
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
  state.packCurrent = batteries[state.batteryKey].current;
  batterySeriesSlider.value = String(state.batterySeries);
  packCurrentSlider.value = String(state.packCurrent);
});

tireDiameterSlider.addEventListener("input", () => {
  state.tireDiameter = Number(tireDiameterSlider.value);
});

footpadLengthSlider.addEventListener("input", () => {
  state.footpadLength = Number(footpadLengthSlider.value);
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

packCurrentSlider.addEventListener("input", () => {
  state.packCurrent = Number(packCurrentSlider.value);
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

inclineAngleSlider.addEventListener("input", () => {
  state.inclineAngle = Number(inclineAngleSlider.value);
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

window.addEventListener("keydown", (event) => {
  if (["KeyA", "KeyD", "Space"].includes(event.code)) event.preventDefault();
  if (event.code === "Space") {
    state.paused = !state.paused;
    pauseButton.textContent = state.paused ? "Resume" : "Pause";
  } else if (event.code === "KeyR") {
    reset();
  } else if (event.code === "Digit0") {
    state.cameraZoom = 1;
  } else {
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
