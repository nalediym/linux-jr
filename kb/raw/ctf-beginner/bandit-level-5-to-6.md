# OverTheWire Bandit — Level 5 → Level 6

**Source:** https://overthewire.org/wargames/bandit/bandit6.html
**Fetched:** 2026-04-21

## Level Goal

Find a password file in the **inhere** directory with these characteristics:

- human-readable
- 1033 bytes in size
- not executable

## Commands You May Need

- `ls`
- `cd`
- `cat`
- `file`
- `du`
- `find`

## Canonical Solution

```bash
find inhere -size 1033c ! -executable
cat <result-path>
```

## What This Level Teaches

`find` with size and permission filters. Introduces predicate composition.

## Arcade adaptation note

Game #6 ("Find by Size") needs `find` with `-size` and `-name` predicates. The
permission filter (`! -executable`) requires a permission model the FS doesn't
have yet. Adapt to: "find a file of exact byte length N" — drops the executable
filter without losing the puzzle.
