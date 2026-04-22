/**
 * commitlint config — enforces Conventional Commits.
 *
 * Conventional Commits enable auto-generated changelogs via Changesets.
 * Reference: https://www.conventionalcommits.org/
 *
 * Format: <type>(<scope>): <subject>
 *   type:    feat | fix | docs | style | refactor | perf | test | chore | ci | build | revert
 *   scope:   optional, e.g. (cli), (kb), (m2)
 *   subject: imperative, no period, max 100 chars
 */

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Loosen some defaults for solo-dev ergonomics
    'body-max-line-length': [1, 'always', 100], // warn, don't error
    'footer-max-line-length': [1, 'always', 100],
    'header-max-length': [2, 'always', 100],
    // Allow these types in addition to the conventional set
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'build',
        'revert',
        // project-specific types
        'mission', // mission content changes
        'bible',   // bible scratchpad → repo kb/ sync
        'soul',    // SOUL.md doctrine changes
      ],
    ],
  },
}
