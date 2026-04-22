# OverTheWire Bandit — Level 1 → Level 2

**Source:** https://overthewire.org/wargames/bandit/bandit2.html
**Fetched:** 2026-04-21

## Level Goal

> "The password for the next level is stored in a file called **-** located in
> the home directory."

## Special Character Challenge

This level requires reading a file with a single dash (`-`) as its filename. The
dash is normally interpreted by commands as a flag prefix or as stdin/stdout, not
a literal filename.

## Commands You May Need

- `ls`
- `cd`
- `cat`
- `file`
- `du`
- `find`

## Canonical Solutions

```bash
cat ./-
# or
cat <-
```

`cat -` would interpret the dash as stdin. The fix is to use a path-qualified
reference (`./-`) so the shell sees it as a relative path, not a flag.

## What This Level Teaches

Special characters in filenames and how shells parse arguments. The lesson is
"sometimes a filename collides with shell syntax — qualify the path."

## Arcade adaptation note

Game #2 ("Hidden in Plain Sight") preserves the mechanic: the FS contains a file
literally named `-`. Solving it requires `cat ./-`. The CommandParser must accept
this without treating `-` as a flag.
