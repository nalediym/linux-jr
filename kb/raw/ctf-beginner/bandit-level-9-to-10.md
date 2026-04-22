# OverTheWire Bandit — Level 9 → Level 10

**Source:** https://overthewire.org/wargames/bandit/bandit10.html
**Fetched:** 2026-04-22 (canonical content; Bandit pages have been intermittently 404 during this session)

## Level Goal

> "The password for the next level is stored in the file `data.txt` in one of
> the few human-readable strings, preceded by several `=` characters."

## Commands You May Need

- `grep`
- `sort`
- `uniq`
- `strings`
- `base64`
- `tr`
- `tar`

## Canonical Solution

```bash
strings data.txt | grep "===="
```

(or scan the output of `strings data.txt` visually for the `=`-prefixed line.)

## What This Level Teaches

`strings` extracts runs of printable ASCII from a file. Real binaries (and CTF
puzzle files) often hide readable text inside non-printable noise. `strings`
is the canonical way to surface it.

## Arcade adaptation note

Game #9 ("Strings") preserves the mechanic but drops the pipe to `grep` (pipes
are deferred past v1). The arcade version embeds `FLAG{found_in_the_noise}`
inside binary noise. Solving with `strings mystery` shows it directly.
