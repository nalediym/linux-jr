/**
 * Arcade Game #7 — grep the Flag
 *
 * Lineage: OverTheWire Bandit Level 6 → Level 7
 *   https://overthewire.org/wargames/bandit/bandit7.html (canonical: grep PATTERN FILE)
 *   picoCTF General Skills (haystack search)
 *   KB concept: kb/wiki/concepts/grep-command.md
 *
 * Mechanic: a long file, one line contains the flag. `grep FLAG data.txt`
 * filters to just that line.
 */
function buildHaystack() {
  const lines = []
  for (let i = 0; i < 200; i++) {
    lines.push(`line ${i}: nothing here, keep looking`)
  }
  // Hide the flag somewhere in the middle.
  lines[137] = 'line 137: FLAG{found_in_the_haystack}'
  return lines.join('\n') + '\n'
}

export const ARCADE_GREP_THE_FLAG = {
  id: 'grep-the-flag',
  title: 'grep the Flag',
  summary: 'A huge file. The flag is in there somewhere. Try: `grep FLAG data.txt`',
  command: 'grep',
  tags: ['text', 'search'],
  difficulty: 'medium',
  estimated_minutes: 3,
  filesystem: {
    'data.txt': buildHaystack(),
    'readme': '`grep PATTERN FILE` prints only the lines that contain PATTERN.\n',
  },
  flag_check: {
    type: 'output_contains',
    text: 'FLAG{found_in_the_haystack}',
  },
  prize: 'grep badge',
  lineage: {
    source: 'OverTheWire Bandit',
    level: 'Level 6 → Level 7',
    url: 'https://overthewire.org/wargames/bandit/bandit7.html',
    kb_concept: 'kb/wiki/concepts/grep-command.md',
  },
}
