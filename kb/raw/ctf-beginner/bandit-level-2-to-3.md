# OverTheWire Bandit — Level 2 → Level 3

**Source:** https://overthewire.org/wargames/bandit/bandit3.html
**Fetched:** 2026-04-21

## Level Goal

> "The password for the next level is stored in a file called
> **--spaces in this filename--** located in the home directory."

## Commands You May Need

- `ls`
- `cd`
- `cat`
- `file`
- `du`
- `find`

## Canonical Solutions

```bash
cat "--spaces in this filename--"
# or
cat --\ spaces\ in\ this\ filename--
# or with tab-completion (preferred in real shells)
cat --<Tab>
```

## What This Level Teaches

Quoting and escaping. Spaces in arguments need protection or the shell treats
each whitespace-separated token as a separate argument.

## Arcade adaptation note

Game #3 ("Spaces Between") needs CommandParser to support quoted arguments.
Today's parser splits on whitespace; we'd extend it to recognize `"..."` as a
single token. Small lift, defer past MVI.
