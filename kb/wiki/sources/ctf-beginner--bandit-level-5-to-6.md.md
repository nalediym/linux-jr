# OverTheWire Bandit — Level 5 → Level 6

> **Source:** [kb/raw/ctf-beginner/bandit-level-5-to-6.md](../../raw/ctf-beginner/bandit-level-5-to-6.md)
> **Original URL:** https://overthewire.org/wargames/bandit/bandit6.html
> **Ingested:** 2026-04-22
> **Hash:** e9d946fad86b779ec60c146e08ce1f2c4b0b8b92f4679e1f7d1139bb44f5ec08
> **Status:** fresh
> **Chunks:** 4

## Chunks

### c-e9d946fa: Level Goal
> Find a file in inhere that is human-readable, 1033 bytes in size, and not executable.

### c-e9d946fb: Solution
> `find inhere -size 1033c ! -executable && cat <result>`

### c-e9d946fc: Lesson
> find with size and permission filters; predicate composition.

### c-e9d946fd: Arcade adaptation
> Permission filter requires a permission model the FS doesn't have. Adapt to size + name only.

## Related Concepts

- [find-command](../concepts/find-command.md)
- [cat-command](../concepts/cat-command.md)

<!-- human notes below -->
