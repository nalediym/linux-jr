# picoCTF — Overview

**Source:** https://picoctf.org
**Fetched:** 2026-04-21

## Audience & Mission

picoCTF is a CTF platform created by Carnegie Mellon University. Eligibility
starts at age 13+. The platform "gamifies learning hacking with capture-the-flag
puzzles created by trusted computer security and privacy experts."

The program states it is "for everyone" — students, cybersecurity professionals,
competitive hackers, complete beginners.

## Categories

picoCTF challenges are organized into categories. The relevant one for Linux Jr
Arcade is **General Skills** — basic command-line and encoding puzzles.

## Common General Skills Beginner Themes

(Inferred from picoCTF event archive structure; specific challenge text behind
auth wall at picoctf.org/competitions.)

- **Bases:** decoding base64, base16/hex, binary representations of flag strings
- **strings:** running `strings` on a binary to extract printable text
- **grep:** searching large text files for a flag string
- **wc / sort / uniq:** processing files to extract a unique line
- **netcat:** connecting to a remote port (out of scope for browser-based arcade)
- **tar / zip:** extracting nested archives

## Arcade adaptation note

Games #7 (grep), #8 (base64 decode), and #9 (string ops) are picoCTF-style. They
preserve the "decode a thing to find FLAG{}" mechanic but in a single-command
sandbox rather than the multi-stage CTF infrastructure.

The age-13+ rating is fine for Arcade's 8+ target — picoCTF is conservative
because it includes networking and exploitation categories. General Skills
specifically is age-appropriate for younger.
