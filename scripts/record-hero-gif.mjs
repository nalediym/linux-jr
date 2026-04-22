#!/usr/bin/env bun
/**
 * Record the hero GIF for the README.
 *
 * Plays through arcade Game #1 (The First Door) at iPad-portrait resolution,
 * captures it as MP4 via Playwright's built-in video recorder, then converts
 * to a wide-aspect GIF via ffmpeg.
 *
 * Output: docs/screenshots/hero.gif (referenced from README.md)
 *
 * Usage:
 *   bun run scripts/record-hero-gif.mjs
 *
 * Prereqs:
 *   - bun install (Playwright already in devDependencies)
 *   - bunx playwright install webkit (one-time)
 *   - ffmpeg in PATH (brew install ffmpeg)
 *   - dev server NOT running on :5200 — script starts vite preview itself
 */
import { chromium } from '@playwright/test'
import { spawn } from 'child_process'
import { mkdirSync, existsSync, renameSync, readdirSync, unlinkSync, rmdirSync } from 'fs'
import { join } from 'path'

const ROOT = process.cwd()
const OUT_DIR = join(ROOT, 'docs/screenshots')
const VIDEO_DIR = join(ROOT, '.tmp-hero-recording')
const FINAL_GIF = join(OUT_DIR, 'hero.gif')

mkdirSync(OUT_DIR, { recursive: true })
mkdirSync(VIDEO_DIR, { recursive: true })

console.log('▶  Building production bundle...')
await new Promise((resolve, reject) => {
  const p = spawn('bun', ['run', 'build'], { stdio: 'inherit' })
  p.on('exit', code => code === 0 ? resolve() : reject(new Error(`build exit ${code}`)))
})

console.log('▶  Starting vite preview on :5200...')
const preview = spawn('bun', ['run', 'preview'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  detached: false,
})
// Wait for the server to come up.
await new Promise((resolve, reject) => {
  let buf = ''
  const timer = setTimeout(() => reject(new Error('preview timeout')), 15000)
  preview.stdout.on('data', chunk => {
    buf += chunk.toString()
    if (buf.includes('localhost:5200') || buf.includes('127.0.0.1:5200')) {
      clearTimeout(timer)
      resolve()
    }
  })
})

const cleanup = () => {
  try { preview.kill('SIGTERM') } catch {}
  try {
    for (const f of readdirSync(VIDEO_DIR)) unlinkSync(join(VIDEO_DIR, f))
    rmdirSync(VIDEO_DIR)
  } catch {}
}
process.on('exit', cleanup)
process.on('SIGINT', () => { cleanup(); process.exit(1) })

console.log('▶  Recording arcade flow with Playwright (Chromium)...')
// 1200x900 iPad-ish portrait, 2x DPR for crisp text in the GIF.
const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1200, height: 900 },
  deviceScaleFactor: 2,
  recordVideo: { dir: VIDEO_DIR, size: { width: 1200, height: 900 } },
})
const page = await context.newPage()

await page.goto('http://127.0.0.1:5200/')
// Skip the parent-hint card so we land on disclaimer fast.
await page.evaluate(() => {
  localStorage.clear()
  localStorage.setItem('linuxjr-parent-seen', 'true')
})
await page.reload()

// Disclaimer → Home
await page.waitForSelector('text=Linux Jr', { timeout: 10000 })
await page.waitForTimeout(800)
await page.getByRole('button', { name: /let.s hack/i }).click()

// Home → Arcade
await page.waitForTimeout(700)
await page.getByRole('button', { name: /^ARCADE/i }).click()

// Arcade grid → The First Door
await page.waitForTimeout(700)
await page.getByText('The First Door').click()

// Type cat readme one character at a time so it looks like real typing.
const input = page.getByRole('textbox')
await page.waitForTimeout(900)
await input.click()
for (const ch of 'cat readme') {
  await input.press(ch === ' ' ? 'Space' : ch)
  await page.waitForTimeout(100)
}
await page.waitForTimeout(500)
await input.press('Enter')

// Let the FLAG{} land + the MISSION COMPLETE banner render.
await page.waitForSelector('text=/FLAG\\{the_first_door\\}/', { timeout: 5000 })
await page.waitForTimeout(2000)

await context.close()
await browser.close()

// Find the produced webm and convert to gif via ffmpeg.
const webms = readdirSync(VIDEO_DIR).filter(f => f.endsWith('.webm'))
if (webms.length === 0) {
  console.error('✘  No .webm produced by Playwright.')
  process.exit(1)
}
const webm = join(VIDEO_DIR, webms[0])
console.log(`▶  Converting ${webm} → ${FINAL_GIF} via ffmpeg...`)
// Two-pass palette method = small, crisp GIF. Output capped at 800px wide.
const palette = join(VIDEO_DIR, 'palette.png')
await new Promise((resolve, reject) => {
  spawn('ffmpeg', [
    '-y', '-i', webm,
    '-vf', 'fps=15,scale=800:-1:flags=lanczos,palettegen',
    palette,
  ], { stdio: 'inherit' }).on('exit', c => c === 0 ? resolve() : reject(new Error('palette')))
})
await new Promise((resolve, reject) => {
  spawn('ffmpeg', [
    '-y', '-i', webm, '-i', palette,
    '-lavfi', 'fps=15,scale=800:-1:flags=lanczos [x]; [x][1:v] paletteuse',
    FINAL_GIF,
  ], { stdio: 'inherit' }).on('exit', c => c === 0 ? resolve() : reject(new Error('gif')))
})

console.log(`✓  Wrote ${FINAL_GIF}`)
cleanup()
process.exit(0)
