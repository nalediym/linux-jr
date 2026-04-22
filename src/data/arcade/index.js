import { ARCADE_THE_FIRST_DOOR } from './arcade-01-the-first-door'
import { ARCADE_HIDDEN_IN_PLAIN_SIGHT } from './arcade-02-hidden-in-plain-sight'
import { ARCADE_SPACES_BETWEEN } from './arcade-03-spaces-between'
import { ARCADE_DOT_FILES } from './arcade-04-dot-files'
import { ARCADE_NEEDLE_IN_HAYSTACK } from './arcade-05-needle-in-haystack'
import { ARCADE_FIND_BY_SIZE } from './arcade-06-find-by-size'
import { ARCADE_GREP_THE_FLAG } from './arcade-07-grep-the-flag'
import { ARCADE_DECODE_ME } from './arcade-08-decode-me'
import { ARCADE_STRINGS } from './arcade-09-strings'

export const ALL_ARCADE_GAMES = [
  ARCADE_THE_FIRST_DOOR,
  ARCADE_HIDDEN_IN_PLAIN_SIGHT,
  ARCADE_SPACES_BETWEEN,
  ARCADE_DOT_FILES,
  ARCADE_NEEDLE_IN_HAYSTACK,
  ARCADE_FIND_BY_SIZE,
  ARCADE_GREP_THE_FLAG,
  ARCADE_DECODE_ME,
  ARCADE_STRINGS,
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
 *
 * Game-level options that affect the in-game FS (e.g. hidesDotfiles for
 * arcade #4) are forwarded so Terminal.startMission can pick them up.
 */
export function arcadeToMission(game) {
  return {
    id: game.id,
    title: game.title,
    story: game.summary,
    audio: game.audio,
    filesystem: game.filesystem,
    hidesDotfiles: !!game.hidesDotfiles,
    tasks: [
      { description: 'Capture the flag.', check: game.flag_check },
    ],
  }
}
