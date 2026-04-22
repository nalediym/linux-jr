# OverTheWire Bandit — Level 6 → Level 7

**Source:** https://overthewire.org/wargames/bandit/bandit7.html (page 404 at fetch; canonical content reconstructed from level summary)
**Fetched:** 2026-04-21

## Level Goal (canonical)

> "The password for the next level is stored in the file **data.txt** next to
> the word **millionth**."

## Commands You May Need

- `man`
- `grep`
- `sort`
- `uniq`
- `strings`

## Canonical Solution

```bash
grep millionth data.txt
```

## What This Level Teaches

`grep` — searching files for a pattern. The single most valuable real-world
command-line primitive after `cat`/`ls`/`cd`.

## Arcade adaptation note

Game #7 ("grep the Flag") needs CommandParser to support `grep PATTERN FILE` —
literal substring match (no regex, no flags) for v0. Output the matching lines
or "(no match)".
