# `find` — Search Filesystem by Predicate

> **First seen in:** [bandit-level-5-to-6](../sources/ctf-beginner--bandit-level-5-to-6.md.md)
> **Also referenced by:** [bandit-overview](../sources/ctf-beginner--bandit-overview.md.md), [bandit-level-4-to-5](../sources/ctf-beginner--bandit-level-4-to-5.md.md)
> **Confidence:** high
> **Aliases:** locate file, search filesystem

## Definition

`find PATH [PREDICATES...]` recursively walks PATH and prints filesystem
entries matching the predicates. Predicates compose: `-name`, `-size`, `-type`,
`-user`, `-group`, `-executable`, etc.
— [bandit-level-5-to-6](../sources/ctf-beginner--bandit-level-5-to-6.md.md)#c-e9d946fa

## Details

Bandit Level 5 → 6 is the canonical "find by metadata" puzzle: locate the file
that is human-readable, exactly 1033 bytes, and not executable. `find inhere -size 1033c ! -executable`.
The lesson is predicate composition.

For Linux Jr Arcade, the permission filter (`! -executable`) requires a
permission model the FS doesn't have. We adapt to size + name only.

## v0 implementation scope (deferred past MVI)

- `find PATH -name GLOB` — name match (glob: `*` and `?`)
- `find PATH -size Nc` — exact byte size
- `find PATH -type f|d` — file vs directory
- Output: one matching path per line, or empty
- No `-exec`, no boolean operators beyond implicit AND, no `-mtime`

## Connections

- Related to: [grep-command](grep-command.md) — find is to *names*, grep is to *contents*
- Related to: [cat-command](cat-command.md) — find locates, cat reads

## Provenance

- [ctf-beginner--bandit-level-5-to-6.md](../sources/ctf-beginner--bandit-level-5-to-6.md.md) — c-e9d946fa
- [ctf-beginner--bandit-level-4-to-5.md](../sources/ctf-beginner--bandit-level-4-to-5.md.md) — c-39c582d9 (alternative: use `file ./*` instead of find)

## Linux Jr arcade games using this concept

- **arcade-06-find-by-size** — Bandit 5 → 6 adaptation, dropped permission filter

<!-- human notes below -->
