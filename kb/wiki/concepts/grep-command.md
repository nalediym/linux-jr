# `grep` — Search File for Pattern

> **First seen in:** [bandit-level-6-to-7](../sources/ctf-beginner--bandit-level-6-to-7.md.md)
> **Also referenced by:** [picoctf-overview](../sources/ctf-beginner--picoctf-overview.md.md), [bandit-level-5-to-6](../sources/ctf-beginner--bandit-level-5-to-6.md.md)
> **Confidence:** high
> **Aliases:** search, find pattern in file

## Definition

`grep PATTERN FILE` prints lines from FILE that contain PATTERN. The most
valuable text-processing primitive after `cat` — it lets you reduce a large
file to "just the lines I care about."
— [bandit-level-6-to-7](../sources/ctf-beginner--bandit-level-6-to-7.md.md)#c-0e308805

## Details

OverTheWire Bandit Level 6 → 7 makes the use case crisp: a large `data.txt`
contains thousands of lines, and the password is on the line containing the
word "millionth." `grep millionth data.txt` solves it directly. picoCTF General
Skills challenges follow the same pattern — flag is in a haystack, grep is the
needle finder.
— [bandit-level-6-to-7](../sources/ctf-beginner--bandit-level-6-to-7.md.md)#c-0e308805
— [picoctf-overview](../sources/ctf-beginner--picoctf-overview.md.md)#c-dd8bd87b

## v0 implementation scope (for Linux Jr CommandParser)

- Literal substring match only (no regex)
- Required args: PATTERN, FILE
- No flags (`-i`, `-r`, `-v`, `-n` all deferred)
- Output: matching lines joined with `\n`, or `(no match)` if zero matches
- Errors: missing args → `"Usage: grep PATTERN FILE"`; missing file → reuse `cat`'s error message

## Connections

- Related to: [cat-command](cat-command.md) — grep is cat-with-filter
- Related to: [find-command](find-command.md) — grep searches *contents*, find searches *names/metadata*
- Prerequisite for: pipes (`grep | sort`, `grep | wc -l`) — deferred to post-v1

## Provenance

- [ctf-beginner--bandit-level-6-to-7.md](../sources/ctf-beginner--bandit-level-6-to-7.md.md) — c-0e308805
- [ctf-beginner--picoctf-overview.md](../sources/ctf-beginner--picoctf-overview.md.md) — c-dd8bd87b

## Linux Jr arcade games using this concept

- **arcade-07-grep-the-flag** — picoCTF-style haystack search (deferred past MVI; needs CommandParser extension)

<!-- human notes below -->
