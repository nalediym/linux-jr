# `strings` — Extract Printable Text from Binary

> **First seen in:** [bandit-level-9-to-10](../sources/ctf-beginner--bandit-level-9-to-10.md.md)
> **Also referenced by:** [picoctf-overview](../sources/ctf-beginner--picoctf-overview.md.md)
> **Confidence:** high
> **Aliases:** extract strings, ascii dump

## Definition

`strings PATH` walks a file byte-by-byte and prints every run of printable
ASCII characters at least N bytes long (default 4). It's the standard way to
peek inside binaries, images, or other non-text files for embedded readable
content.
— [bandit-level-9-to-10](../sources/ctf-beginner--bandit-level-9-to-10.md.md)#c-bandit910-lesson

## Details

CTF puzzles love `strings` because the trick is "this looks unreadable but
contains a flag." Real-world incident response uses it the same way:
suspicious binary → `strings binary` → look for URLs, error messages, or
configuration that hints at what it does.

## v0 implementation in Linux Jr Arcade

- Single positional arg: filename
- Run threshold: 4+ printable ASCII chars (matches GNU `strings` default)
- "Printable" = ASCII 0x20–0x7e plus tab
- No `-n` flag, no `-a`/`-d` modes — just the default behavior
- Empty result returns `(no printable strings found)` for kid-friendliness

## Connections

- Related to: [file-command](file-command.md) — `file` identifies; `strings` extracts
- Related to: [grep-command](grep-command.md) — strings output is often piped into grep (deferred until pipes ship)

## Provenance

- [ctf-beginner--bandit-level-9-to-10.md](../sources/ctf-beginner--bandit-level-9-to-10.md.md) — c-bandit910-lesson
- [ctf-beginner--picoctf-overview.md](../sources/ctf-beginner--picoctf-overview.md.md) — c-dd8bd87d (strings is a common General Skills theme)

## Linux Jr arcade games using this concept

- **arcade-09-strings** — Bandit 9→10 adaptation (no pipe; flag embedded in noise)

<!-- human notes below -->
