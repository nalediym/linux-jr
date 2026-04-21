/**
 * Mission engine — checks task completion and tracks progress.
 *
 * Task check types:
 *   pwd_equals    — current directory matches path
 *   command_used  — last command name matches
 *   output_contains — last output contains text
 *   file_read     — specific file was cat'd (checks path)
 */

export function createMissionEngine(mission) {
  let currentTask = 0

  function checkTask(task, context) {
    const { type } = task.check
    switch (type) {
      case 'pwd_equals':
        return context.pwd === task.check.path
      case 'command_used':
        return context.lastCommand === task.check.command
      case 'output_contains':
        return context.lastOutput?.includes(task.check.text)
      case 'file_read':
        return context.lastCommand === 'cat' && context.lastArgs?.[0] === task.check.path
      default:
        return false
    }
  }

  return {
    getCurrentTask() {
      if (currentTask >= mission.tasks.length) return null
      return mission.tasks[currentTask]
    },

    getProgress() {
      return {
        current: currentTask,
        total: mission.tasks.length,
        complete: currentTask >= mission.tasks.length,
        missionId: mission.id,
      }
    },

    /** Call after every command. Returns { advanced, complete, task } */
    evaluate(context) {
      if (currentTask >= mission.tasks.length) {
        return { advanced: false, complete: true, task: null }
      }

      const task = mission.tasks[currentTask]
      if (checkTask(task, context)) {
        currentTask++
        const complete = currentTask >= mission.tasks.length
        return { advanced: true, complete, task }
      }

      return { advanced: false, complete: false, task }
    },

    /** Restore from autosave */
    restoreProgress(tasksCompleted) {
      currentTask = Math.min(tasksCompleted, mission.tasks.length)
    },
  }
}
