import { useState, useRef, useEffect } from 'react'
import { createFileSystem } from './FileSystem'
import { executeCommand } from './CommandParser'
import { createMissionEngine } from './MissionEngine'
import { playVoice, unlockAudio, VOICE_LINES } from '../hooks/useVoice'
import { ALL_MISSIONS, getCompletedMissionIds } from '../data/missions/index'
import { ALL_ARCADE_GAMES, arcadeToMission, getCompletedArcadeIds } from '../data/arcade/index'
import { playSound } from '../hooks/useTerminalSounds'
import { createTelemetry } from '../hooks/useTelemetry'

const PROMPT_CHAR = '>'

// One-time migration from the old `nawazi-*` key prefix to `linuxjr-*`.
// Runs at import before any component code reads localStorage. Safe to delete
// once the live deployment has rolled over (no one has old keys anymore).
;(function migrateLegacyKeys() {
  try {
    for (const k of ['progress', 'disclaimer-accepted', 'telemetry']) {
      const oldKey = `nawazi-${k}`
      const newKey = `linuxjr-${k}`
      const v = localStorage.getItem(oldKey)
      if (v !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, v)
      }
      if (v !== null) localStorage.removeItem(oldKey)
    }
  } catch {}
})()

export default function Terminal() {
  const [lines, setLines] = useState([])
  const [input, setInput] = useState('')
  const [screen, setScreen] = useState(() => {
    // Auto-skip disclaimer if already accepted (read once at mount).
    try {
      return localStorage.getItem('linuxjr-disclaimer-accepted') === 'true' ? 'home' : 'disclaimer'
    } catch {
      return 'disclaimer'
    }
  }) // disclaimer | home | campaign-select | arcade-grid | playing
  const outputRef = useRef(null)
  const inputRef = useRef(null)
  const fsRef = useRef(null)
  const missionRef = useRef(null)
  const activeMissionRef = useRef(null)
  const telemetryRef = useRef(null)
  // Tracks which screen the player came from so mission-complete returns there.
  const originScreenRef = useRef('campaign-select')

  function addLine(text, type = 'output') {
    setLines(prev => [...prev, { text, type, ts: Date.now() }])
  }

  function startMission(mission, origin = 'campaign-select') {
    activeMissionRef.current = mission
    originScreenRef.current = origin
    fsRef.current = createFileSystem(structuredClone(mission.filesystem))
    missionRef.current = createMissionEngine(mission)
    telemetryRef.current = createTelemetry(mission.id)

    // Check for autosave
    try {
      const saved = JSON.parse(localStorage.getItem('linuxjr-progress') || '{}')
      if (saved.currentMission?.id === mission.id && saved.currentMission?.tasksCompleted > 0) {
        missionRef.current.restoreProgress(saved.currentMission.tasksCompleted)
      }
    } catch {}

    setScreen('playing')
    setLines([])
    playSound('missionStart')

    const introLines = [
      { text: `=== ${mission.title} ===`, type: 'mission' },
      { text: '', type: 'output' },
      { text: mission.story, type: 'story' },
      { text: '', type: 'output' },
    ]

    const task = missionRef.current.getCurrentTask()
    if (task) {
      introLines.push({ text: `Mission: ${task.description}`, type: 'hint' })
    }
    introLines.push({ text: '', type: 'output' })
    introLines.push({ text: 'Type help if you get stuck.', type: 'dim' })

    setLines(introLines.map(l => ({ ...l, ts: Date.now() })))
    // Plays pre-generated audio if it exists, falls back to browser TTS
    playVoice(mission.audio?.intro, mission.story)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim()) return

    const fs = fsRef.current
    const mission = missionRef.current
    const trimmed = input.trim()

    // Echo the command
    addLine(`${PROMPT_CHAR} ${trimmed}`, 'command')
    playSound('click')

    const result = executeCommand(trimmed, fs)
    if (!result) {
      setInput('')
      return
    }

    if (result.output === '__CLEAR__') {
      setLines([])
      setInput('')
      return
    }

    // Telemetry
    if (telemetryRef.current) {
      telemetryRef.current.logCommand(result.command, result.args, result.isError)
    }

    // Show output
    if (result.isError) playSound('whimper')
    const outputType = result.isError ? 'error' : 'output'
    result.output.split('\n').forEach(line => addLine(line, outputType))

    // Check mission progress
    if (mission) {
      const context = {
        pwd: fs.pwd(),
        lastCommand: result.command,
        lastArgs: result.args,
        lastOutput: result.output,
      }

      const evaluation = mission.evaluate(context)

      if (evaluation.advanced) {
        addLine('', 'output')
        addLine('Nice work, hacker!', 'success')
        playSound('bark')
        playVoice(VOICE_LINES.niceWork.key, VOICE_LINES.niceWork.text)

        // Telemetry — log task completion
        const progress = mission.getProgress()
        if (telemetryRef.current) {
          telemetryRef.current.logTaskComplete(progress.current - 1)
        }

        // Autosave
        try {
          const saved = JSON.parse(localStorage.getItem('linuxjr-progress') || '{}')
          saved.currentMission = { id: progress.missionId, tasksCompleted: progress.current }
          saved.totalCommandsRun = (saved.totalCommandsRun || 0) + 1
          localStorage.setItem('linuxjr-progress', JSON.stringify(saved))
        } catch {}

        if (evaluation.complete) {
          addLine('', 'output')
          addLine('========================================', 'success')
          addLine('  MISSION COMPLETE!', 'success')
          addLine('  You are a hacker.', 'success')
          addLine('========================================', 'success')
          addLine('', 'output')
          addLine('Returning to mission select in 5 seconds...', 'dim')
          playSound('happyBark')
          if (telemetryRef.current) {
            telemetryRef.current.logMissionComplete()
          }
          const am = activeMissionRef.current
          playVoice(am?.audio?.complete || VOICE_LINES.missionComplete.key, VOICE_LINES.missionComplete.text)
          const returnTo = originScreenRef.current || 'campaign-select'
          setTimeout(() => setScreen(returnTo), 5000)

          // Save completion — arcade games go in their own array
          try {
            const saved = JSON.parse(localStorage.getItem('linuxjr-progress') || '{}')
            const completionKey = returnTo === 'arcade-grid' ? 'arcadeCompleted' : 'missionsCompleted'
            saved[completionKey] = [...(saved[completionKey] || []), progress.missionId]
            saved.currentMission = null
            localStorage.setItem('linuxjr-progress', JSON.stringify(saved))
          } catch {}
        } else {
          const nextTask = mission.getCurrentTask()
          if (nextTask) {
            addLine(`Next: ${nextTask.description}`, 'hint')
            playVoice(nextTask.audio, nextTask.description)
          }
        }
      }
    }

    setInput('')
  }

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [lines])

  // Focus input on tap anywhere
  useEffect(() => {
    const handleTap = () => inputRef.current?.focus()
    document.addEventListener('click', handleTap)
    return () => document.removeEventListener('click', handleTap)
  }, [])

  // Tab completion
  const COMMANDS = ['pwd', 'ls', 'cd', 'cat', 'mkdir', 'man', 'help', 'clear']

  function handleKeyDown(e) {
    if (e.key !== 'Tab') return
    e.preventDefault()

    const fs = fsRef.current
    if (!fs) return

    const val = input
    const parts = val.split(/\s+/)

    if (parts.length <= 1) {
      // Complete command name
      const prefix = parts[0].toLowerCase()
      const matches = COMMANDS.filter(c => c.startsWith(prefix))
      if (matches.length === 1) {
        playSound('tab')
        setInput(matches[0] + ' ')
      } else if (matches.length > 1) {
        addLine(`${PROMPT_CHAR} ${val}`, 'command')
        addLine(matches.join('  '), 'dim')
      }
    } else {
      // Complete filename/directory
      const prefix = parts[parts.length - 1]
      const matches = fs.complete(prefix)
      if (matches.length === 1) {
        playSound('tab')
        parts[parts.length - 1] = matches[0]
        setInput(parts.join(' '))
      } else if (matches.length > 1) {
        addLine(`${PROMPT_CHAR} ${val}`, 'command')
        addLine(matches.join('  '), 'dim')
      }
    }
  }

  function handleAccept() {
    try { localStorage.setItem('linuxjr-disclaimer-accepted', 'true') } catch {}
    unlockAudio()
    setScreen('home')
  }

  if (screen === 'disclaimer') {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '2rem',
        fontFamily: 'var(--font-ui)',
      }}>
        <h1 style={{
          fontSize: '2.4rem',
          color: 'var(--terminal-green)',
          fontFamily: 'var(--font-mono)',
          textAlign: 'center',
          margin: 0,
        }}>
          Linux Jr
        </h1>
        <p style={{
          color: 'var(--text)',
          fontSize: '1.1rem',
          textAlign: 'center',
          maxWidth: '420px',
          lineHeight: 1.6,
          margin: 0,
        }}>
          Real Linux commands. Real missions. Type <code style={{ color: 'var(--terminal-green)' }}>help</code> if you get stuck.
        </p>
        <button
          onClick={handleAccept}
          style={{
            padding: '1rem 2.5rem',
            fontSize: '1.2rem',
            fontFamily: 'var(--font-ui)',
            background: 'var(--terminal-green)',
            color: 'var(--bg)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            minHeight: '64px',
            minWidth: '200px',
            fontWeight: 600,
          }}
        >
          Let&apos;s hack
        </button>
      </div>
    )
  }

  if (screen === 'home') {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        padding: '2rem',
        fontFamily: 'var(--font-ui)',
      }}>
        <h1 style={{
          fontSize: '2.4rem',
          color: 'var(--terminal-green)',
          fontFamily: 'var(--font-mono)',
          textAlign: 'center',
          margin: 0,
        }}>
          Linux Jr
        </h1>
        <p style={{
          color: 'var(--terminal-dim)',
          fontSize: '1rem',
          textAlign: 'center',
          margin: 0,
        }}>
          Pick how you want to hack.
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          maxWidth: '320px',
        }}>
          <button
            onClick={() => setScreen('campaign-select')}
            style={{
              padding: '1.5rem 1.25rem',
              fontSize: '1.3rem',
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              background: '#1a1a1a',
              color: 'var(--terminal-green)',
              border: '2px solid var(--terminal-green)',
              borderRadius: '12px',
              cursor: 'pointer',
              minHeight: '64px',
              textAlign: 'left',
            }}
          >
            CAMPAIGN
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--terminal-dim)',
              fontWeight: 400,
              marginTop: '0.25rem',
            }}>
              Story missions, in order.
            </div>
          </button>
          <button
            onClick={() => setScreen('arcade-grid')}
            style={{
              padding: '1.5rem 1.25rem',
              fontSize: '1.3rem',
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              background: '#1a1a1a',
              color: 'var(--terminal-yellow)',
              border: '2px solid var(--terminal-yellow)',
              borderRadius: '12px',
              cursor: 'pointer',
              minHeight: '64px',
              textAlign: 'left',
            }}
          >
            ARCADE
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--terminal-dim)',
              fontWeight: 400,
              marginTop: '0.25rem',
            }}>
              CTF puzzles. Play in any order.
            </div>
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'arcade-grid') {
    const completedIds = getCompletedArcadeIds()
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        fontFamily: 'var(--font-ui)',
        overflowY: 'auto',
      }}>
        <h1 style={{
          fontSize: '2rem',
          color: 'var(--terminal-yellow)',
          fontFamily: 'var(--font-mono)',
          textAlign: 'center',
          marginBottom: '0.5rem',
        }}>
          Arcade
        </h1>
        <p style={{
          color: 'var(--terminal-dim)',
          fontSize: '1rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          {completedIds.length === 0
            ? 'Capture the flag.'
            : `${completedIds.length} of ${ALL_ARCADE_GAMES.length} flags captured`}
        </p>
        <button
          onClick={() => setScreen('home')}
          style={{
            background: 'transparent',
            color: 'var(--terminal-dim)',
            border: '1px solid var(--terminal-dim)',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-ui)',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            minHeight: '40px',
          }}
        >
          ← Back
        </button>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          maxWidth: '400px',
        }}>
          {ALL_ARCADE_GAMES.map(game => {
            const done = completedIds.includes(game.id)
            return (
              <button
                key={game.id}
                onClick={() => startMission(arcadeToMission(game), 'arcade-grid')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: '#1a1a1a',
                  border: done
                    ? '2px solid var(--terminal-green)'
                    : '2px solid var(--terminal-yellow)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  width: '100%',
                  minHeight: '64px',
                }}
                aria-label={`Play ${game.title}`}
              >
                <span style={{
                  fontSize: '1.5rem',
                  width: '2.5rem',
                  textAlign: 'center',
                  flexShrink: 0,
                  fontFamily: 'var(--font-mono)',
                  color: done ? 'var(--terminal-green)' : 'var(--terminal-yellow)',
                }}>
                  {done ? '✓' : '⚑'}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: done ? 'var(--terminal-green)' : 'var(--text)',
                    fontFamily: 'var(--font-ui)',
                  }}>
                    {game.title}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--terminal-dim)',
                    marginTop: '0.25rem',
                    lineHeight: 1.4,
                  }}>
                    {game.summary}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (screen === 'campaign-select') {
    const completedIds = getCompletedMissionIds()
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        fontFamily: 'var(--font-ui)',
        overflowY: 'auto',
      }}>
        <h1 style={{
          fontSize: '2rem',
          color: 'var(--terminal-green)',
          fontFamily: 'var(--font-mono)',
          textAlign: 'center',
          marginBottom: '0.5rem',
        }}>
          Linux Jr
        </h1>
        <p style={{
          color: 'var(--terminal-dim)',
          fontSize: '1rem',
          textAlign: 'center',
          marginBottom: '1rem',
        }}>
          {completedIds.length === 0
            ? 'Choose your first mission, hacker.'
            : `${completedIds.length} of ${ALL_MISSIONS.length} missions complete`}
        </p>
        <button
          onClick={() => setScreen('home')}
          style={{
            background: 'transparent',
            color: 'var(--terminal-dim)',
            border: '1px solid var(--terminal-dim)',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-ui)',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            minHeight: '40px',
          }}
        >
          ← Back
        </button>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          maxWidth: '400px',
        }}>
          {ALL_MISSIONS.map((mission, i) => {
            const done = completedIds.includes(mission.id)
            // Unlock: first mission always, rest require previous complete
            const prevDone = i === 0 || completedIds.includes(ALL_MISSIONS[i - 1].id)
            const locked = !prevDone
            return (
              <button
                key={mission.id}
                onClick={() => !locked && startMission(mission, 'campaign-select')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: locked ? '#1a1a1a' : '#1a1a1a',
                  border: done
                    ? '2px solid var(--terminal-green)'
                    : locked
                      ? '2px solid #333'
                      : '2px solid var(--terminal-yellow)',
                  borderRadius: '12px',
                  cursor: locked ? 'default' : 'pointer',
                  opacity: locked ? 0.4 : 1,
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  width: '100%',
                }}
                aria-label={locked ? `${mission.title} (locked)` : `Play ${mission.title}`}
              >
                <span style={{
                  fontSize: '1.5rem',
                  width: '2.5rem',
                  textAlign: 'center',
                  flexShrink: 0,
                  fontFamily: 'var(--font-mono)',
                  color: done
                    ? 'var(--terminal-green)'
                    : locked
                      ? '#555'
                      : 'var(--terminal-yellow)',
                }}>
                  {done ? '✓' : locked ? '🔒' : `${i + 1}`}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: done ? 'var(--terminal-green)' : locked ? '#555' : 'var(--text)',
                    fontFamily: 'var(--font-ui)',
                  }}>
                    {mission.title}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--terminal-dim)',
                    marginTop: '0.25rem',
                    lineHeight: 1.4,
                  }}>
                    {done ? 'Complete!' : locked ? 'Complete previous mission first' : mission.story.slice(0, 60) + '...'}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '0.5rem',
    }}>
      {/* Terminal output */}
      <div
        ref={outputRef}
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '0.5rem',
          fontSize: '16px',
          lineHeight: 1.6,
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{
            color: {
              command: 'var(--terminal-blue)',
              error: 'var(--terminal-yellow)',
              success: 'var(--terminal-green)',
              mission: 'var(--terminal-green)',
              story: 'var(--text)',
              hint: 'var(--terminal-yellow)',
              dim: 'var(--terminal-dim)',
              output: 'var(--text)',
            }[line.type],
            fontWeight: line.type === 'mission' ? 700 : 400,
            fontFamily: line.type === 'story' ? 'var(--font-ui)' : 'var(--font-mono)',
            fontSize: line.type === 'story' ? '1.1rem' : undefined,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            minHeight: line.text === '' ? '0.8rem' : undefined,
          }}>
            {line.text}
          </div>
        ))}
      </div>

      {/* Custom input bar — iPad-friendly, not raw xterm.js textarea */}
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem',
        borderTop: '1px solid #333',
        background: '#111',
        flexShrink: 0,
      }}>
        <span style={{ color: 'var(--terminal-green)', fontSize: '18px', fontWeight: 700 }}>
          {PROMPT_CHAR}
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder="type a command..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--terminal-green)',
            fontSize: '18px',
            fontFamily: 'var(--font-mono)',
            minHeight: '48px',
            caretColor: 'var(--terminal-green)',
          }}
        />
        <button
          type="submit"
          style={{
            background: 'var(--terminal-green)',
            color: 'var(--bg)',
            border: 'none',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            fontSize: '16px',
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            minHeight: '48px',
            minWidth: '64px',
            cursor: 'pointer',
          }}
        >
          Run
        </button>
      </form>
    </div>
  )
}
