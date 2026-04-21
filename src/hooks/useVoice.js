/**
 * Voice system — plays pre-generated audio files with speechSynthesis fallback.
 *
 * Audio files live in public/audio/{key}.mp3
 * Keys are defined in mission configs and shared voice lines.
 *
 * To generate audio:
 *   1. Run: node scripts/generate-voice.js (uses ElevenLabs API)
 *   2. Or manually upload text at elevenlabs.io and save MP3s to public/audio/
 *
 * The system tries the MP3 first. If it doesn't exist (404) or fails,
 * falls back to browser speechSynthesis. This means you can develop
 * without ElevenLabs and add audio files incrementally.
 */

const audioCache = new Map()
let audioUnlocked = false
let currentAudio = null // track currently playing audio to prevent overlap

// iOS Safari requires a user gesture to unlock audio playback.
// Call unlockAudio() inside the first tap/click handler.
export function unlockAudio() {
  if (audioUnlocked) return
  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const silent = ctx.createBuffer(1, 1, 22050)
  const source = ctx.createBufferSource()
  source.buffer = silent
  source.connect(ctx.destination)
  source.start(0)
  audioUnlocked = true
}

function speakFallback(text) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 0.9
  utterance.pitch = 1.1
  window.speechSynthesis.speak(utterance)
}

/**
 * Play a voice line.
 *
 * @param {string} key    — audio file key (e.g. 'mission-01-intro')
 * @param {string} text   — fallback text for speechSynthesis if audio missing
 * @returns {Promise<void>}
 */
export async function playVoice(key, text) {
  if (!key && !text) return

  // Try pre-generated audio first
  if (key) {
    try {
      let audio = audioCache.get(key)
      if (!audio) {
        // Probe the file — HEAD request avoids downloading if 404
        const url = `/audio/${key}.mp3`
        const res = await fetch(url, { method: 'HEAD' })
        if (res.ok) {
          audio = new Audio(url)
          audioCache.set(key, audio)
        }
      }

      if (audio) {
        // Stop any currently playing audio first
        if (currentAudio) {
          currentAudio.pause()
          currentAudio.currentTime = 0
        }
        const clone = audio.cloneNode()
        currentAudio = clone
        await clone.play()
        return
      }
    } catch {
      // Audio file missing or playback failed — fall through to TTS
    }
  }

  // Stop any playing audio before TTS fallback
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
    currentAudio = null
  }

  // Fallback to browser TTS
  if (text) {
    speakFallback(text)
  }
}

/**
 * Stop any playing voice.
 */
export function stopVoice() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

/**
 * Shared voice lines used across all missions.
 * Keys map to public/audio/{key}.mp3
 */
export const VOICE_LINES = {
  welcome: { key: 'shared-welcome', text: 'Welcome, hacker.' },
  niceWork: { key: 'shared-nice-work', text: 'Nice work, hacker!' },
  missionComplete: { key: 'shared-mission-complete', text: 'Mission complete! You are a hacker!' },
  tryHelp: { key: 'shared-try-help', text: 'Try typing help to see what you can do.' },
  hmmDontKnow: { key: 'shared-hmm', text: "Hmm, I don't know that one yet." },
}
