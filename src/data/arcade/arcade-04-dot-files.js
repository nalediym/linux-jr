/**
 * Arcade Game #4 — Dot Files
 *
 * Lineage: OverTheWire Bandit Level 3 → Level 4
 *   https://overthewire.org/wargames/bandit/bandit4.html
 *   KB concept: kb/wiki/concepts/cat-command.md
 *
 * Mechanic: file starts with a dot, so plain `ls` hides it. The kid must
 * use `ls -a`. The arcade FS opts into real Linux semantics with
 * hidesDotfiles: true (the campaign FS keeps showing dotfiles by default
 * for the 7-year-old audience).
 */
export const ARCADE_DOT_FILES = {
  id: 'dot-files',
  title: 'Dot Files',
  summary: "Plain `ls` won't show everything. Use `ls -a` to find the hidden file.",
  command: 'ls',
  tags: ['files', 'flags'],
  difficulty: 'easy',
  estimated_minutes: 3,
  hidesDotfiles: true,
  filesystem: {
    'readme': 'In real Linux, files starting with a dot are hidden.\nUse `ls -a` to see them all.\n',
    'notes': 'There are more files here than ls is telling you.\n',
    '.secret': 'You used the -a flag. Real Linux move.\nFLAG{dotfiles_revealed}\n',
  },
  flag_check: {
    type: 'output_contains',
    text: 'FLAG{dotfiles_revealed}',
  },
  prize: 'Hidden Files badge',
  lineage: {
    source: 'OverTheWire Bandit',
    level: 'Level 3 → Level 4',
    url: 'https://overthewire.org/wargames/bandit/bandit4.html',
    kb_concept: 'kb/wiki/concepts/cat-command.md',
  },
}
