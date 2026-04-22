/**
 * Arcade Game #3 — Spaces Between
 *
 * Lineage: OverTheWire Bandit Level 2 → Level 3
 *   https://overthewire.org/wargames/bandit/bandit3.html
 *   KB concept: kb/wiki/concepts/cat-command.md
 *
 * Mechanic: filename has spaces. Without quoting the shell tokenizes each
 * word. `cat "spaces in filename"` works because our tokenizer respects
 * double-quoted strings.
 */
export const ARCADE_SPACES_BETWEEN = {
  id: 'spaces-between',
  title: 'Spaces Between',
  summary: 'A filename with spaces. Wrap it in quotes: `cat "spaces in filename"`.',
  command: 'cat',
  tags: ['files', 'quoting'],
  difficulty: 'easy',
  estimated_minutes: 3,
  filesystem: {
    'spaces in filename': 'Quotes hold a filename together when it has whitespace.\nFLAG{quotes_save_the_day}\n',
    'readme': 'Without quotes, "cat spaces in filename" is THREE arguments.\n',
  },
  flag_check: {
    type: 'output_contains',
    text: 'FLAG{quotes_save_the_day}',
  },
  prize: 'Quotation badge',
  lineage: {
    source: 'OverTheWire Bandit',
    level: 'Level 2 → Level 3',
    url: 'https://overthewire.org/wargames/bandit/bandit3.html',
    kb_concept: 'kb/wiki/concepts/cat-command.md',
  },
}
