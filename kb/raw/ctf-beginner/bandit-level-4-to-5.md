# OverTheWire Bandit — Level 4 → Level 5

**Source:** https://overthewire.org/wargames/bandit/bandit5.html
**Fetched:** 2026-04-21

## Level Goal

> "The password for the next level is stored in the only human-readable file in
> the **inhere** directory."

## Commands You May Need

- `ls`
- `cd`
- `cat`
- `file`
- `du`
- `find`

## Canonical Solution

```bash
cd inhere
file ./*
# identify the one ASCII text file among binary noise
cat ./-fileN
```

## What This Level Teaches

The `file` command — inspecting type before reading. Real-world incident
response and forensics workflow primitive: "what is this thing before I open
it?"

## Arcade adaptation note

Game #5 ("Needle in a Haystack") needs CommandParser to support `file`. Output
should classify each path as `ASCII text`, `data`, or `executable` based on a
simple heuristic (printable-ASCII ratio). Defer past MVI.
