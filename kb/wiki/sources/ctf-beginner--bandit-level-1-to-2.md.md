# OverTheWire Bandit — Level 1 → Level 2

> **Source:** [kb/raw/ctf-beginner/bandit-level-1-to-2.md](../../raw/ctf-beginner/bandit-level-1-to-2.md)
> **Original URL:** https://overthewire.org/wargames/bandit/bandit2.html
> **Ingested:** 2026-04-22
> **Hash:** 7e813f1f3582613bcb5ff7d55081bc0590e1b47f5cb417d4071633b8ce66bd77
> **Status:** fresh
> **Chunks:** 5

## Chunks

### c-7e813f1f: Level Goal
> "The password for the next level is stored in a file called - located in the home directory."

### c-7e813f20: Special character challenge
> The dash character is normally interpreted as a flag prefix or as stdin/stdout, not a literal filename.

### c-7e813f21: Solution
> `cat ./-` (path-qualify so the shell sees it as a relative path, not a flag).

### c-7e813f22: Lesson
> Sometimes a filename collides with shell syntax — qualify the path.

### c-7e813f23: Arcade adaptation
> Game #2 "Hidden in Plain Sight" preserves the mechanic; CommandParser must accept this without treating - as a flag.

## Related Concepts

- [cat-command](../concepts/cat-command.md)

<!-- human notes below -->
