# OverTheWire Bandit — Level 0 → Level 1

> **Source:** [kb/raw/ctf-beginner/bandit-level-0-to-1.md](../../raw/ctf-beginner/bandit-level-0-to-1.md)
> **Original URL:** https://overthewire.org/wargames/bandit/bandit1.html
> **Ingested:** 2026-04-22
> **Hash:** d819678b7a19a81bad60b117bd81b7b532afea0098b6c84de922af3aa0ec16f4
> **Status:** fresh
> **Chunks:** 5

## Chunks

### c-d8196787: Level Goal
> "The password for the next level is stored in a file called readme located in the home directory."

### c-d8196788: Commands needed
> ls, cd, cat, file, du, find

### c-d8196789: Solution
> `cat readme`

### c-d819678a: Pedagogy
> The single most fundamental Linux command — reading the contents of a named file.

### c-d819678b: Arcade fit
> Zero engine work needed; cat already exists in CommandParser.js. Maps 1:1 to existing output_contains check.

## Key Claims

- The Bandit Level 0 → 1 password is captured by `cat readme` — c-d8196789
- This is the cleanest possible CTF-to-arcade-game mapping — c-d819678b

## Related Concepts

- [cat-command](../concepts/cat-command.md)
- [flag-format](../concepts/flag-format.md)

<!-- human notes below -->

## Arcade lineage

This is the source-of-truth for arcade Game #1 ("The First Door"). The flag
string `FLAG{the_first_door}` is the kid-friendly adaptation; the real Bandit
password is `boJ9jbbUNNfktd78OOpsqOltutMc3MY1` and is preserved in raw form in
the game data file as a teaching nod (kid can google it later).
