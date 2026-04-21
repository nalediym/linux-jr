#!/usr/bin/env node
/**
 * Generate voice audio files from mission scripts using ElevenLabs API.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=sk_... node scripts/generate-voice.js
 *
 * This reads all mission files, extracts text lines with audio keys,
 * and generates MP3 files in public/audio/.
 *
 * You only need to run this when mission text changes.
 * The generated MP3s are committed to the repo (they're small, ~20-50KB each).
 *
 * Voice setup:
 *   1. Go to elevenlabs.io → Voices → Add Voice → Voice Cloning
 *   2. Upload ~30 seconds of the voice you want (or use a preset)
 *   3. Copy the voice ID and set ELEVENLABS_VOICE_ID below
 */

import { writeFile, mkdir, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const AUDIO_DIR = join(__dirname, '..', 'public', 'audio')
const ENV_FILE = join(__dirname, '..', '.env')

// Load .env file if it exists
if (existsSync(ENV_FILE)) {
  const envContent = await readFile(ENV_FILE, 'utf-8')
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim()
    }
  }
}

const API_KEY = process.env.ELEVENLABS_API_KEY
// Default to "Rachel" preset voice. Replace with your cloned voice ID.
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'
const API_URL = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`

// Voice settings tuned for a warm, encouraging character voice
const VOICE_SETTINGS = {
  stability: 0.6,
  similarity_boost: 0.75,
  style: 0.4,
  use_speaker_boost: true,
}

/**
 * All voice lines to generate.
 * Add new lines here when you add missions.
 * Format: { key: 'audio-file-name', text: 'What to say' }
 */
const VOICE_MANIFEST = [
  // Shared lines (used across all missions)
  { key: 'shared-welcome', text: 'Welcome, hacker.' },
  { key: 'shared-nice-work', text: 'Nice work, hacker!' },
  { key: 'shared-mission-complete', text: 'Mission complete! You are a hacker!' },
  { key: 'shared-try-help', text: 'Try typing help to see what you can do.' },
  { key: 'shared-hmm', text: "Hmm, I don't know that one yet." },

  // Mission 01: The Missing Blueprint
  {
    key: 'mission-01-intro',
    text: "Pip hid a secret blueprint somewhere in the workshop. They said it's in a room you can't see at first. Can you find it?",
  },
  { key: 'mission-01-task-01', text: 'Figure out where you are. Try typing pwd.' },
  { key: 'mission-01-task-02', text: 'Now look around the workshop. Try typing ls.' },
  { key: 'mission-01-task-03', text: 'Explore the secret room. Try typing cd secret-room.' },
  {
    key: 'mission-01-task-04',
    text: 'Find the hidden blueprint. Look for files starting with a dot.',
  },
  {
    key: 'mission-01-complete',
    text: "Mission complete! You found the flag. You are a hacker! Pip's blueprint was hidden in a secret file.",
  },
]

async function generateLine({ key, text }) {
  const outPath = join(AUDIO_DIR, `${key}.mp3`)

  if (existsSync(outPath)) {
    console.log(`  skip: ${key} (already exists)`)
    return
  }

  console.log(`  generating: ${key}`)

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_turbo_v2_5',
      voice_settings: VOICE_SETTINGS,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error(`  ERROR: ${key} — ${res.status} ${body}`)
    return
  }

  const buffer = Buffer.from(await res.arrayBuffer())
  await writeFile(outPath, buffer)
  console.log(`  saved: ${key} (${(buffer.length / 1024).toFixed(1)}KB)`)
}

async function main() {
  if (!API_KEY) {
    console.error('Set ELEVENLABS_API_KEY environment variable.')
    console.error('Get one at: https://elevenlabs.io/app/settings/api-keys')
    process.exit(1)
  }

  await mkdir(AUDIO_DIR, { recursive: true })

  console.log(`Generating ${VOICE_MANIFEST.length} voice lines...`)
  console.log(`Voice ID: ${VOICE_ID}`)
  console.log(`Output: ${AUDIO_DIR}\n`)

  for (const line of VOICE_MANIFEST) {
    await generateLine(line)
    // Rate limit: ElevenLabs free tier allows ~2-3 requests/second
    await new Promise(r => setTimeout(r, 500))
  }

  console.log('\nDone! Run `bun run dev` and the audio will play automatically.')
}

main()
