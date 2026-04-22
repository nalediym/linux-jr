/**
 * Arcade Game #5 — Needle in a Haystack
 *
 * Lineage: OverTheWire Bandit Level 4 → Level 5
 *   https://overthewire.org/wargames/bandit/bandit5.html
 *   KB concept: kb/wiki/concepts/file-command.md
 *
 * Mechanic: many files in a directory; only one is human-readable. Use
 * `file *` to classify each, then `cat` the ASCII text one. Other files
 * are short binary noise (control characters) so classifyContent reports
 * them as "data".
 */
const noise = (n) => {
  let s = ''
  for (let i = 0; i < n; i++) s += String.fromCharCode((i * 17 + 3) % 31 + 1)
  return s
}

export const ARCADE_NEEDLE_IN_HAYSTACK = {
  id: 'needle-in-haystack',
  title: 'Needle in a Haystack',
  summary: 'Only one of these files is readable. Use `file` on each, then `cat` the ASCII one.',
  command: 'file',
  tags: ['files', 'identification'],
  difficulty: 'medium',
  estimated_minutes: 4,
  filesystem: {
    'file-01': noise(120),
    'file-02': noise(80),
    'file-03': 'You used `file` to spot the readable one.\nFLAG{the_only_reader}\n',
    'file-04': noise(95),
    'file-05': noise(60),
  },
  flag_check: {
    type: 'output_contains',
    text: 'FLAG{the_only_reader}',
  },
  prize: 'Identifier badge',
  lineage: {
    source: 'OverTheWire Bandit',
    level: 'Level 4 → Level 5',
    url: 'https://overthewire.org/wargames/bandit/bandit5.html',
    kb_concept: 'kb/wiki/concepts/file-command.md',
  },
}
