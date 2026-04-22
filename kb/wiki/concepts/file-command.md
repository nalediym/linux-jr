# `file` — Identify File Type

> **First seen in:** [bandit-level-4-to-5](../sources/ctf-beginner--bandit-level-4-to-5.md.md)
> **Also referenced by:** [bandit-overview](../sources/ctf-beginner--bandit-overview.md.md)
> **Confidence:** medium (1 primary source)
> **Aliases:** identify file, classify file

## Definition

`file PATH...` examines each path and prints a guess at its type — `ASCII text`,
`PNG image data`, `executable`, `data` (unknown binary), etc.
— [bandit-level-4-to-5](../sources/ctf-beginner--bandit-level-4-to-5.md.md)#c-39c582d9

## Details

Bandit Level 4 → 5 uses `file` to triage: the `inhere` directory contains many
files, only one is human-readable text. `file ./*` classifies all of them at
once, then `cat` the ASCII one.

For Linux Jr Arcade, this teaches a real-world primitive: "before opening
unknown files, ask what kind of thing they are." Maps to forensics / incident
response habits.

## v0 implementation scope (deferred past MVI)

- `file PATH` — single path
- `file PATH1 PATH2 ...` — multiple paths, one classification per line
- Heuristic: scan first N bytes; if all printable-ASCII → "ASCII text", else "data"
- Defer: PNG/JPEG/zip magic-byte detection (out of scope for the puzzles we adapt)

## Connections

- Related to: [cat-command](cat-command.md) — file → identify, cat → read
- Related to: [find-command](find-command.md) — alternative approach to "find the readable one"

## Provenance

- [ctf-beginner--bandit-level-4-to-5.md](../sources/ctf-beginner--bandit-level-4-to-5.md.md) — c-39c582d9

## Linux Jr arcade games using this concept

- **arcade-05-needle-in-haystack** — Bandit 4 → 5, file classification

<!-- human notes below -->
