# `base64` — Encode and Decode Base64

> **First seen in:** [picoctf-overview](../sources/ctf-beginner--picoctf-overview.md.md)
> **Also referenced by:** [bandit-level-6-to-7](../sources/ctf-beginner--bandit-level-6-to-7.md.md) (commands-needed list mentions base64)
> **Confidence:** high (universal CTF primitive)
> **Aliases:** decode base64, b64

## Definition

Base64 is an encoding that turns arbitrary bytes into a string of 64 ASCII
characters (`A–Z a–z 0–9 + /`, with `=` padding). The Unix `base64` command
encodes by default; `base64 -d` (or `--decode`) reverses the operation.
— [picoctf-overview](../sources/ctf-beginner--picoctf-overview.md.md)#c-dd8bd87d

## Details

CTF "Bases" challenges (a picoCTF General Skills staple) hand the player a
base64 blob and ask them to decode it to recover the flag. Bandit also uses
it (Level 10→11 hides the password as base64). It's the simplest "decode
this" puzzle because the format is recognizable on sight: trailing `=` and
only base64 alphabet characters.

## v0 implementation in Linux Jr Arcade

- `base64 -d FILE` (or `base64 --decode FILE`) reads FILE and decodes it
- Uses browser `atob()` under the hood — same algorithm as Linux's coreutils
- Without `-d`/`--decode` returns an error: arcade does not support encoding
- Trim whitespace before decoding so trailing newlines don't break valid input
- Invalid base64 surfaces a friendly error rather than crashing

## Connections

- Related to: [flag-format](flag-format.md) — the decoded payload is always `FLAG{...}` in the arcade
- Related to: [strings-command](strings-command.md) — both reveal hidden text from "noise"

## Provenance

- [ctf-beginner--picoctf-overview.md](../sources/ctf-beginner--picoctf-overview.md.md) — c-dd8bd87d
- [ctf-beginner--bandit-level-6-to-7.md](../sources/ctf-beginner--bandit-level-6-to-7.md.md) — `base64` listed in commands-needed for the level family

## Linux Jr arcade games using this concept

- **arcade-08-decode-me** — picoCTF/Bandit base64 adaptation; encoded file decodes to `FLAG{base64_no_secret}`

<!-- human notes below -->
