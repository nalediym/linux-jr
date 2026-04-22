/**
 * Arcade Game #6 — Find by Size
 *
 * Lineage: OverTheWire Bandit Level 5 → Level 6
 *   https://overthewire.org/wargames/bandit/bandit6.html
 *
 * Mechanic: many files, only one matches an exact byte size. `find` with
 * `-size 1033c`. The Bandit version also requires `! -executable`, but the
 * arcade FS has no permission model; we drop that filter and ensure exactly
 * one file matches the target size.
 */
const fillTo = (text, totalBytes) => {
  const enc = new TextEncoder()
  const baseLen = enc.encode(text).length
  if (baseLen >= totalBytes) return text
  return text + 'x'.repeat(totalBytes - baseLen)
}

export const ARCADE_FIND_BY_SIZE = {
  id: 'find-by-size',
  title: 'Find by Size',
  summary: 'One file is exactly 1033 bytes. Try: `find . -size 1033c`',
  command: 'find',
  tags: ['files', 'predicates'],
  difficulty: 'medium',
  estimated_minutes: 4,
  filesystem: {
    inhere: {
      'mostlywrong-01': fillTo('not it\n', 500),
      'mostlywrong-02': fillTo('also no\n', 800),
      'rightsize': fillTo('Found me with -size 1033c\nFLAG{measured_to_the_byte}\n', 1033),
      'mostlywrong-03': fillTo('close but no\n', 1500),
    },
    'readme': 'Real Linux: `find . -size 1033c ! -executable`. Here we drop the perm check.\n',
  },
  flag_check: {
    type: 'output_contains',
    text: 'FLAG{measured_to_the_byte}',
  },
  prize: 'Predicate badge',
  lineage: {
    source: 'OverTheWire Bandit',
    level: 'Level 5 → Level 6',
    url: 'https://overthewire.org/wargames/bandit/bandit6.html',
  },
}
