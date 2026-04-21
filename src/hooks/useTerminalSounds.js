/**
 * Terminal sound effects — all synthesized via Web Audio API, no files.
 */

let ctx = null

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

/** Cute puppy bark — short, high-pitched, playful */
function playBark() {
  const c = getCtx()
  const t = c.currentTime
  // Two quick yips
  ;[0, 0.12].forEach((offset) => {
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = 'sawtooth'
    const start = t + offset
    osc.frequency.setValueAtTime(600, start)
    osc.frequency.exponentialRampToValueAtTime(900, start + 0.03)
    osc.frequency.exponentialRampToValueAtTime(500, start + 0.08)
    gain.gain.setValueAtTime(0.15, start)
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.1)
    osc.connect(gain).connect(c.destination)
    osc.start(start)
    osc.stop(start + 0.1)
  })
}

/** Happy bark — longer, excited, for mission complete */
function playHappyBark() {
  const c = getCtx()
  const t = c.currentTime
  // Three ascending yips
  ;[0, 0.15, 0.3].forEach((offset, i) => {
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = 'sawtooth'
    const baseFreq = 500 + i * 100
    const start = t + offset
    osc.frequency.setValueAtTime(baseFreq, start)
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, start + 0.04)
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, start + 0.1)
    gain.gain.setValueAtTime(0.15, start)
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.12)
    osc.connect(gain).connect(c.destination)
    osc.start(start)
    osc.stop(start + 0.12)
  })
}

/** Small whimper — for wrong commands, gentle */
function playWhimper() {
  const c = getCtx()
  const t = c.currentTime
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(800, t)
  osc.frequency.exponentialRampToValueAtTime(400, t + 0.3)
  gain.gain.setValueAtTime(0.08, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
  osc.connect(gain).connect(c.destination)
  osc.start(t)
  osc.stop(t + 0.3)
}

/** Typing click — tiny tick for each command run */
function playClick() {
  const c = getCtx()
  const t = c.currentTime
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(1200, t)
  gain.gain.setValueAtTime(0.06, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03)
  osc.connect(gain).connect(c.destination)
  osc.start(t)
  osc.stop(t + 0.03)
}

/** Tab completion sound — quick ascending blip */
function playTab() {
  const c = getCtx()
  const t = c.currentTime
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(600, t)
  osc.frequency.exponentialRampToValueAtTime(1000, t + 0.05)
  gain.gain.setValueAtTime(0.1, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
  osc.connect(gain).connect(c.destination)
  osc.start(t)
  osc.stop(t + 0.06)
}

/** Mission start — dramatic low hum then rising tone */
function playMissionStart() {
  const c = getCtx()
  const t = c.currentTime
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(100, t)
  osc.frequency.exponentialRampToValueAtTime(400, t + 0.4)
  gain.gain.setValueAtTime(0.12, t)
  gain.gain.setValueAtTime(0.12, t + 0.3)
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5)
  osc.connect(gain).connect(c.destination)
  osc.start(t)
  osc.stop(t + 0.5)
}

const SOUNDS = {
  bark: playBark,
  happyBark: playHappyBark,
  whimper: playWhimper,
  click: playClick,
  tab: playTab,
  missionStart: playMissionStart,
}

let muted = false

export function playSound(name) {
  if (muted) return
  const fn = SOUNDS[name]
  if (fn) {
    try { fn() } catch {}
  }
}

export function setMuted(val) {
  muted = val
}
