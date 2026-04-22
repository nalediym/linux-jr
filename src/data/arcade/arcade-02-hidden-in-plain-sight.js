/**
 * Arcade Game #2 — Hidden in Plain Sight
 *
 * Lineage: OverTheWire Bandit Level 1 → Level 2 (`cat ./-`)
 *   https://overthewire.org/wargames/bandit/bandit2.html
 *   KB concept: kb/wiki/concepts/cat-command.md
 *
 * Mechanic: a file literally named `-`. Naive `cat -` reads stdin; you have
 * to qualify with `./-`. Our parser doesn't grab single-dash as a flag
 * (only `-x` letter flags), so `cat -` would actually try to read a file
 * called `-` directly. Either way `cat ./-` works the same way real Unix
 * does, and we tell the kid to use that form.
 */
export const ARCADE_HIDDEN_IN_PLAIN_SIGHT = {
  id: 'hidden-in-plain-sight',
  title: 'Hidden in Plain Sight',
  summary: "There's a file with a sneaky name: just a dash. Try `cat ./-` to read it.",
  command: 'cat',
  tags: ['files', 'special-chars'],
  difficulty: 'easy',
  estimated_minutes: 3,
  filesystem: {
    '-': 'A real Unix trick: a file named with one character — a dash.\nFLAG{hidden_in_plain_sight}\n',
    'readme': 'Some filenames clash with shell syntax. Use ./ to disambiguate.\n',
  },
  flag_check: {
    type: 'output_contains',
    text: 'FLAG{hidden_in_plain_sight}',
  },
  prize: 'Dash badge',
  lineage: {
    source: 'OverTheWire Bandit',
    level: 'Level 1 → Level 2',
    url: 'https://overthewire.org/wargames/bandit/bandit2.html',
    kb_concept: 'kb/wiki/concepts/cat-command.md',
  },
}
