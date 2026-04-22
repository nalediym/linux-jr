# OverTheWire Bandit — Level 4 → Level 5

> **Source:** [kb/raw/ctf-beginner/bandit-level-4-to-5.md](../../raw/ctf-beginner/bandit-level-4-to-5.md)
> **Original URL:** https://overthewire.org/wargames/bandit/bandit5.html
> **Ingested:** 2026-04-22
> **Hash:** 39c582d92a437e83d2b779ec2f38eb84f19784e339f29db533279f67872da13c
> **Status:** fresh
> **Chunks:** 4

## Chunks

### c-39c582d9: Level Goal
> Password is in the only human-readable file in inhere directory.

### c-39c582da: Solution
> `cd inhere && file ./* && cat <ascii-text-file>`

### c-39c582db: Lesson
> The file command — inspect type before reading.

### c-39c582dc: Arcade adaptation
> Game #5 needs CommandParser to support file. Heuristic: scan first N bytes, classify printable-ASCII vs data.

## Related Concepts

- [file-command](../concepts/file-command.md)
- [cat-command](../concepts/cat-command.md)
- [find-command](../concepts/find-command.md)

<!-- human notes below -->
