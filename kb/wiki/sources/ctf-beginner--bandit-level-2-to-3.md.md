# OverTheWire Bandit — Level 2 → Level 3

> **Source:** [kb/raw/ctf-beginner/bandit-level-2-to-3.md](../../raw/ctf-beginner/bandit-level-2-to-3.md)
> **Original URL:** https://overthewire.org/wargames/bandit/bandit3.html
> **Ingested:** 2026-04-22
> **Hash:** 6a5f1fe42633fc0c10ea82591f692867aea1c94f7059d1e47d8b81d03083c72d
> **Status:** fresh
> **Chunks:** 4

## Chunks

### c-6a5f1fe4: Level Goal
> Password is in a file called `--spaces in this filename--` in home directory.

### c-6a5f1fe5: Solution
> `cat "--spaces in this filename--"` or backslash-escape spaces.

### c-6a5f1fe6: Lesson
> Quoting and escaping. Spaces in arguments need protection or the shell tokenizes them.

### c-6a5f1fe7: Arcade adaptation
> Game #3 needs CommandParser to support quoted arguments. Small lift, defer past MVI.

## Related Concepts

- [cat-command](../concepts/cat-command.md)

<!-- human notes below -->
