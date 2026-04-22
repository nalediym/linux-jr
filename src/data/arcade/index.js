import { ARCADE_THE_FIRST_DOOR } from './arcade-01-the-first-door'

export const ALL_ARCADE_GAMES = [
  ARCADE_THE_FIRST_DOOR,
]

export function getArcadeGame(id) {
  return ALL_ARCADE_GAMES.find(g => g.id === id) || null
}

export function getCompletedArcadeIds() {
  try {
    const saved = JSON.parse(localStorage.getItem('linuxjr-progress') || '{}')
    return saved.arcadeCompleted || []
  } catch {
    return []
  }
}

/**
 * Adapt an arcade game to the campaign mission shape so the existing
 * MissionEngine + Terminal play loop can run it without a parallel branch.
 * Synthesizes a single-task mission whose check is the game's flag_check.
 */
export function arcadeToMission(game) {
  return {
    id: game.id,
    title: game.title,
    story: game.summary,
    audio: game.audio,
    filesystem: game.filesystem,
    tasks: [
      { description: 'Capture the flag.', check: game.flag_check },
    ],
  }
}
