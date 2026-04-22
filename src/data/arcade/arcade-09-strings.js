/**
 * Arcade Game #9 — Strings
 *
 * Lineage: OverTheWire Bandit Level 9 → Level 10 (`strings`)
 *   picoCTF General Skills "strings" challenges
 *   KB concept: kb/wiki/concepts/file-command.md (file is the prerequisite)
 *
 * Mechanic: a file that looks like binary noise but has readable text
 * scattered inside. `strings` extracts the printable runs.
 */
function buildBinaryWithFlag() {
  const noise = (n, seed) => {
    let s = ''
    for (let i = 0; i < n; i++) s += String.fromCharCode((i * seed + 7) % 31 + 1)
    return s
  }
  return [
    noise(40, 17),
    'GIF89a',
    noise(60, 23),
    'NOT_THE_FLAG_KEEP_LOOKING',
    noise(50, 31),
    'FLAG{found_in_the_noise}',
    noise(80, 41),
  ].join('')
}

export const ARCADE_STRINGS = {
  id: 'strings',
  title: 'Strings',
  summary: "This file is mostly garbage but has readable bits. Try: `strings mystery`",
  command: 'strings',
  tags: ['binary', 'extraction'],
  difficulty: 'medium',
  estimated_minutes: 3,
  filesystem: {
    'mystery': buildBinaryWithFlag(),
    'readme': '`strings` pulls out runs of printable ASCII from any file.\n',
  },
  flag_check: {
    type: 'output_contains',
    text: 'FLAG{found_in_the_noise}',
  },
  prize: 'Forensics badge',
  lineage: {
    source: 'OverTheWire Bandit',
    level: 'Level 9 → Level 10',
    url: 'https://overthewire.org/wargames/bandit/bandit10.html',
    kb_concept: 'kb/wiki/concepts/file-command.md',
  },
}
