# OverTheWire Bandit — Level 6 → Level 7

> **Source:** [kb/raw/ctf-beginner/bandit-level-6-to-7.md](../../raw/ctf-beginner/bandit-level-6-to-7.md)
> **Original URL:** https://overthewire.org/wargames/bandit/bandit7.html (404 at fetch; canonical content reconstructed)
> **Ingested:** 2026-04-22
> **Hash:** 0e308805b11528ac0f47f1544fa1952b3ccada6a0b69167d9d4d1899e9329bc6
> **Status:** unverified (URL was 404; content reconstructed from level-summary signals)
> **Chunks:** 4

## Chunks

### c-0e308805: Level Goal
> Password is in data.txt next to the word "millionth".

### c-0e308806: Solution
> `grep millionth data.txt`

### c-0e308807: Lesson
> grep — searching files for a pattern. Most valuable text-processing primitive after cat/ls/cd.

### c-0e308808: Arcade adaptation
> Game #7 needs CommandParser to support `grep PATTERN FILE` — literal substring match (no regex, no flags) for v0.

## Related Concepts

- [grep-command](../concepts/grep-command.md)

<!-- human notes below -->

## Verification debt

The bandit7.html fetch returned 404 at the time of ingest. The content above is
reconstructed from how Bandit Level 7 has historically been described in
walkthrough material and from the commands-needed list (man, grep, sort, uniq,
strings, base64, tr, tar, gzip, bzip2, xxd) on the linked level page. Re-fetch
when the page returns and update if the actual goal text differs.
