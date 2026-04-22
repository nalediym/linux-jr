# Hack The Box — Starting Point

**Source:** https://www.hackthebox.com/starting-point (page returned HTTP 500 at
fetch; canonical content reconstructed from public HTB documentation)
**Fetched:** 2026-04-21

## What it is

HTB Starting Point is the free entry tier of Hack The Box. It contains beginner
"machines" (boxes) gated by tier:

- **Tier 0:** Meow, Fawn, Dancing, Redeemer (free)
- **Tier 1:** Explosion, Preignition, Mongod, Synced (free)
- **Tier 2:** Appointment, Sequel, Crocodile (paid)

## Tier 0 — what each box teaches

- **Meow:** `telnet` to a no-password root login. Lesson: default credentials
  exist in the wild.
- **Fawn:** `ftp` anonymous login. Lesson: legacy services are still everywhere.
- **Dancing:** SMB share enumeration with `smbclient`.
- **Redeemer:** Redis enumeration with `redis-cli`.

## Flag format

`HTB{some_flag_value}` — preserved as the visual convention for Linux Jr Arcade
(adapted to `FLAG{}` for kid-friendliness, but the structure is HTB lineage).

## Arcade adaptation note

Tier 0 boxes are mostly about **network protocol enumeration**, which is out of
scope for the browser-based arcade. We're not going to simulate telnet/ftp/smb
clients. What we DO inherit from HTB:

- **Visual convention:** terminal aesthetic, FLAG{} format
- **"Capture the flag" framing:** the goal is the flag, not "complete the
  mission"
- **Difficulty progression:** "very easy" → "easy" → "medium" tiers

The actual mechanics for each arcade game come from Bandit (Linux command-line),
not HTB (network).
