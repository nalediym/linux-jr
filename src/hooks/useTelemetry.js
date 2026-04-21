/**
 * Telemetry — tracks how the kid plays to adapt hints and generate parent reports.
 * All data in localStorage. No network calls.
 *
 * Tracks per session:
 *   - commands typed (with timestamps)
 *   - time per task
 *   - hints viewed (cat .hint)
 *   - wrong paths / errors
 *   - mission completion times
 */

const STORAGE_KEY = 'nawazi-telemetry'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

export function createTelemetry(missionId) {
  const sessionStart = Date.now()
  let taskStart = Date.now()
  const commands = []
  let hintsUsed = 0
  let errorsHit = 0

  return {
    /** Log a command execution */
    logCommand(command, args, isError) {
      commands.push({
        cmd: command,
        args,
        ts: Date.now(),
        err: !!isError,
      })
      if (isError) errorsHit++

      // Track .hint reads
      if (command === 'cat' && args?.[0]?.includes('.hint')) {
        hintsUsed++
      }
    },

    /** Called when a task is completed */
    logTaskComplete(taskIndex) {
      const now = Date.now()
      const data = load()
      if (!data.tasks) data.tasks = {}
      const key = `${missionId}:task-${taskIndex}`
      data.tasks[key] = {
        duration: now - taskStart,
        commands: commands.length,
        hintsUsed,
        errorsHit,
        completedAt: now,
      }
      save(data)
      taskStart = now
    },

    /** Called when the mission is completed */
    logMissionComplete() {
      const now = Date.now()
      const data = load()
      if (!data.missions) data.missions = {}
      data.missions[missionId] = {
        totalTime: now - sessionStart,
        totalCommands: commands.length,
        totalHints: hintsUsed,
        totalErrors: errorsHit,
        completedAt: now,
      }
      // Track session history
      if (!data.sessions) data.sessions = []
      data.sessions.push({
        mission: missionId,
        duration: now - sessionStart,
        commands: commands.length,
        hints: hintsUsed,
        errors: errorsHit,
        ts: now,
      })
      save(data)
    },

    /** Get adaptive hint delay based on how stuck the kid seems */
    getHintDelay() {
      // If kid has hit many errors recently, show hints sooner
      const recentErrors = commands.slice(-5).filter(c => c.err).length
      if (recentErrors >= 3) return 10000  // 10s — very stuck
      if (recentErrors >= 1) return 15000  // 15s — somewhat stuck
      return 25000                          // 25s — doing fine
    },

    /** Get summary for parent report */
    getStats() {
      return {
        sessionTime: Date.now() - sessionStart,
        commandCount: commands.length,
        hintsUsed,
        errorsHit,
        commands: [...commands],
      }
    },
  }
}

/** Get all telemetry data (for parent report) */
export function getTelemetryReport() {
  return load()
}
