# `cat` — Read File Contents

> **First seen in:** [bandit-level-0-to-1](../sources/ctf-beginner--bandit-level-0-to-1.md.md)
> **Also referenced by:** [bandit-overview](../sources/ctf-beginner--bandit-overview.md.md), [bandit-level-1-to-2](../sources/ctf-beginner--bandit-level-1-to-2.md.md), [bandit-level-2-to-3](../sources/ctf-beginner--bandit-level-2-to-3.md.md), [bandit-level-3-to-4](../sources/ctf-beginner--bandit-level-3-to-4.md.md), [bandit-level-4-to-5](../sources/ctf-beginner--bandit-level-4-to-5.md.md)
> **Confidence:** high (5+ sources agree)
> **Aliases:** read file, display file

## Definition

`cat FILE` prints the contents of FILE to standard output. The single most
fundamental Linux command for reading data — no flags, no transformation, just
"show me what's in this thing."
— [bandit-level-0-to-1](../sources/ctf-beginner--bandit-level-0-to-1.md.md)#c-d8196787

## Details

In CTF pedagogy, `cat` is almost always the *last* step of a challenge — once
you've located the file containing the flag, you `cat` it to read the flag.
OverTheWire Bandit Level 0 → 1 is the canonical example: the password lives in
a file named `readme` in the home directory, and `cat readme` prints it.
— [bandit-level-0-to-1](../sources/ctf-beginner--bandit-level-0-to-1.md.md)#c-d8196787

## Connections

- Related to: [grep-command](grep-command.md) — `grep PATTERN FILE` is `cat` plus a filter
- Related to: [file-command](file-command.md) — `file` tells you what kind of thing it is, `cat` shows you the contents
- Prerequisite for: every other arcade game — kid must read files before they can solve anything

## Provenance

- [ctf-beginner--bandit-level-0-to-1.md](../sources/ctf-beginner--bandit-level-0-to-1.md.md) — c-d8196787
- [ctf-beginner--bandit-level-1-to-2.md](../sources/ctf-beginner--bandit-level-1-to-2.md.md) — c-7e813f1f (special: `cat ./-` to read a file named `-`)
- [ctf-beginner--bandit-level-2-to-3.md](../sources/ctf-beginner--bandit-level-2-to-3.md.md) — c-6a5f1fe4 (quoted: `cat "filename with spaces"`)
- [ctf-beginner--bandit-level-3-to-4.md](../sources/ctf-beginner--bandit-level-3-to-4.md.md) — c-49efac17 (hidden: `cat .hidden`)
- [ctf-beginner--bandit-level-4-to-5.md](../sources/ctf-beginner--bandit-level-4-to-5.md.md) — c-39c582d9

## Linux Jr arcade games using this concept

- **arcade-01-the-first-door** — pure `cat readme` (Bandit 0 → 1)
- **arcade-02-hidden-in-plain-sight** — `cat ./-` (Bandit 1 → 2)
- **arcade-03-spaces-between** — quoted `cat` (Bandit 2 → 3)

<!-- human notes below -->
