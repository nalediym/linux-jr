import { MISSION_FIND_THE_FLAG } from './mission-01-find-the-flag'
import { MISSION_SECRET_CODE } from './mission-02-the-secret-code'
import { MISSION_THE_MAZE } from './mission-03-the-maze'

export const ALL_MISSIONS = [
  MISSION_FIND_THE_FLAG,
  MISSION_SECRET_CODE,
  MISSION_THE_MAZE,
]

export function getMission(id) {
  return ALL_MISSIONS.find(m => m.id === id) || null
}

export function getCompletedMissionIds() {
  try {
    const saved = JSON.parse(localStorage.getItem('linuxjr-progress') || '{}')
    return saved.missionsCompleted || []
  } catch {
    return []
  }
}
