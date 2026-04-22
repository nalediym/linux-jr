# OverTheWire Bandit — Level 9 → Level 10

> **Source:** [kb/raw/ctf-beginner/bandit-level-9-to-10.md](../../raw/ctf-beginner/bandit-level-9-to-10.md)
> **Original URL:** https://overthewire.org/wargames/bandit/bandit10.html
> **Ingested:** 2026-04-22
> **Status:** unverified (Bandit page intermittently 404 during ingest)
> **Chunks:** 4

## Chunks

### c-bandit910-goal: Level Goal
> Password is in data.txt in one of the few human-readable strings, preceded by several = characters.

### c-bandit910-solution: Solution
> `strings data.txt | grep "===="` — or scan strings output visually.

### c-bandit910-lesson: Lesson
> strings extracts runs of printable ASCII from a binary. Foundational forensics primitive.

### c-bandit910-adaptation: Arcade adaptation
> Game #9 drops the pipe (deferred past v1). Embeds FLAG inside non-printable noise; `strings mystery` surfaces it.

## Related Concepts

- [strings-command](../concepts/strings-command.md)
- [file-command](../concepts/file-command.md)

<!-- human notes below -->
