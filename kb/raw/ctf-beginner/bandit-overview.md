# OverTheWire: Bandit — Overview

**Source:** https://overthewire.org/wargames/bandit/
**Fetched:** 2026-04-21

## Premise

Bandit is a beginner-focused cybersecurity wargame designed to teach foundational
command-line skills. The platform describes itself as teaching "the basics needed
to be able to play other wargames."

## Audience

Targets absolute beginners with no prior command-line experience. The creators
acknowledge participants will face unfamiliar concepts and encourage persistence.

## How Levels Work

1. Levels are sequential, starting at Level 0.
2. Each level grants SSH access to the next level using credentials captured in
   the previous level.
3. Each level's objective is to **capture a password** (the "flag") that becomes
   the credential for the next level.
4. Learners are encouraged to use manual pages (`man`), search engines, and
   community chat support.

## Why Bandit is the cleanest CTF lineage for Linux Jr Arcade

- One command per level (or a small combination)
- Pure command-line, no exploitation, no networking knowledge required
- Sequential pedagogy already maps to a difficulty ladder
- Each level's "flag" is a string in a file — same primitive as our `output_contains`
  flag check
