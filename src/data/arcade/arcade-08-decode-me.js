/**
 * Arcade Game #8 — Decode Me
 *
 * Lineage: picoCTF "Bases" / OverTheWire Bandit Level 10 → 11 (base64)
 *   https://picoctf.org (General Skills category)
 *
 * Mechanic: file contents are base64-encoded; `base64 -d` reveals the flag.
 * The encoded string below decodes to:
 *   "FLAG{base64_no_secret}\n"
 *
 * To regenerate:
 *   $ printf 'FLAG{base64_no_secret}\n' | base64
 */
export const ARCADE_DECODE_ME = {
  id: 'decode-me',
  title: 'Decode Me',
  summary: 'This file looks like nonsense. It is base64. Try: `base64 -d encoded`',
  command: 'base64',
  tags: ['encoding', 'decoding'],
  difficulty: 'medium',
  estimated_minutes: 3,
  filesystem: {
    'encoded': 'RkxBR3tiYXNlNjRfbm9fc2VjcmV0fQo=\n',
    'readme': 'Base64 turns any data into letters and digits. -d flips it back.\n',
  },
  flag_check: {
    type: 'output_contains',
    text: 'FLAG{base64_no_secret}',
  },
  prize: 'Decoder badge',
  lineage: {
    source: 'picoCTF General Skills',
    level: 'Bases (base64 family)',
    url: 'https://picoctf.org',
  },
}
