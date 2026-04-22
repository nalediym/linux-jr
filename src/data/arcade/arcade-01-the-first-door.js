/**
 * Arcade Game #1 — The First Door
 *
 * Lineage: OverTheWire Bandit Level 0 → Level 1
 *   https://overthewire.org/wargames/bandit/bandit1.html
 *
 * Real-CTF mechanic preserved: password sits in a file named `readme` in the
 * starting directory; `cat readme` captures it. Adapted for kid register —
 * the FLAG{} wrapper replaces the raw alphanumeric password Bandit uses.
 */
export const ARCADE_THE_FIRST_DOOR = {
  id: 'the-first-door',
  title: 'The First Door',
  summary: "There's a file in here. Read it. The flag is inside.",
  command: 'cat',
  tags: ['files', 'beginner'],
  difficulty: 'easy',
  estimated_minutes: 2,
  filesystem: {
    readme: 'Welcome, hacker. Your first flag: FLAG{the_first_door}\n',
    notes: 'Tip: type "ls" to see what files are here.\nThen "cat <name>" to read one.\n',
  },
  flag_check: {
    type: 'output_contains',
    text: 'FLAG{the_first_door}',
  },
  prize: 'First Door badge',
  lineage: {
    source: 'OverTheWire Bandit',
    level: 'Level 0 → Level 1',
    url: 'https://overthewire.org/wargames/bandit/bandit1.html',
  },
}
