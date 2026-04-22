# OverTheWire Bandit — Level 3 → Level 4

**Source:** https://overthewire.org/wargames/bandit/bandit4.html
**Fetched:** 2026-04-21

## Level Goal

> "The password for the next level is stored in a hidden file in the **inhere**
> directory."

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
ls -a
cat .hidden
```

## What This Level Teaches

Hidden files (dotfiles) and the `-a` flag for `ls`. Real Unix hides files
beginning with a dot from default `ls` output.

## Arcade adaptation note

**Important deviation:** Linux Jr's `FileSystem.js` already shows dotfiles by
default (per CLAUDE.md: "Shows dotfiles by default — no `ls -a` needed"). The
Arcade game for this level either:
(a) keeps the kid-friendly default and rephrases the lesson as "files starting
with a dot are 'hidden' in real Linux — here you can see them directly," or
(b) special-cases the arcade FS to hide dotfiles and exposes `-a`.

Recommend (b) for arcade only — the arcade is for older kids who can handle
real-Linux semantics.
