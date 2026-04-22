# OverTheWire Bandit — Level 0 → Level 1

**Source:** https://overthewire.org/wargames/bandit/bandit1.html
**Fetched:** 2026-04-21

## Level Goal

> "The password for the next level is stored in a file called **readme** located
> in the home directory."

## Commands You May Need

- `ls`
- `cd`
- `cat`
- `file`
- `du`
- `find`

## How to Obtain the Password

Access the `readme` file in the home directory using the `cat` command to display
its contents.

## Canonical Solution

```bash
cat readme
```

## What This Level Teaches

The single most fundamental Linux command — reading the contents of a named file.
No flags, no piping, no path navigation. The file is in the home directory the
user lands in.

## Why this is the perfect Arcade Game #1

- Zero engine work needed (`cat` already exists in `CommandParser.js`)
- One file in the FS, one command, one flag
- Maps 1:1 to the existing `output_contains` mission check
- Teaches the kid that "files contain things you can read" — the primitive that
  unlocks everything downstream
