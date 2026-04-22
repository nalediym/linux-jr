# Flag Format Convention — `FLAG{...}`

> **First seen in:** [htb-starting-point](../sources/ctf-beginner--htb-starting-point.md.md)
> **Also referenced by:** [picoctf-overview](../sources/ctf-beginner--picoctf-overview.md.md), [bandit-overview](../sources/ctf-beginner--bandit-overview.md.md)
> **Confidence:** high (cross-platform CTF convention)
> **Aliases:** flag, capture string, HTB{}, picoCTF{}, FLAG{}

## Definition

CTF challenges award completion via a special string the player must capture
and submit. The string is wrapped in a recognizable container so it can't be
confused with arbitrary file content. Common conventions:

- HTB: `HTB{some_value}` — [htb-starting-point](../sources/ctf-beginner--htb-starting-point.md.md)#c-cd3cbe02
- picoCTF: `picoCTF{some_value}` — [picoctf-overview](../sources/ctf-beginner--picoctf-overview.md.md)#c-dd8bd87b
- Bandit: raw alphanumeric password (no wrapper) — [bandit-overview](../sources/ctf-beginner--bandit-overview.md.md)#c-3864ff7c

## Linux Jr Arcade convention: `FLAG{snake_case_words}`

We standardize on `FLAG{...}` with snake_case content for kid-readability and
because `output_contains` already handles substring matching. Examples:

- `FLAG{the_first_door}`
- `FLAG{hidden_in_plain_sight}`
- `FLAG{needle_in_haystack}`

This deviates slightly from real CTF (HTB uses `HTB{}`, picoCTF uses
`picoCTF{}`) but preserves the *shape* a kid would encounter when graduating
to actual CTF platforms.

## Connections

- Used by: every arcade game's `flag_check.text` field
- Implementation: `MissionEngine.js` `output_contains` check at line 22

## Provenance

- [ctf-beginner--htb-starting-point.md](../sources/ctf-beginner--htb-starting-point.md.md) — c-cd3cbe02
- [ctf-beginner--picoctf-overview.md](../sources/ctf-beginner--picoctf-overview.md.md) — c-dd8bd87b
- [ctf-beginner--bandit-overview.md](../sources/ctf-beginner--bandit-overview.md.md) — c-3864ff7c

<!-- human notes below -->
