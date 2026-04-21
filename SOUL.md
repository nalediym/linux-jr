# SOUL.md — The Non-Negotiables of Linux Jr

This file exists so **nobody — human or AI — forgets what this project IS.**
If a proposed change conflicts with anything here, the change is wrong.
Reread this any time a decision feels "off."

---

## The 7 soul principles

### 1. The terminal IS the whole product

Every interaction lives **inside the terminal**. No modal cards. No overlay
screens. No "pre-mission" splashes or "post-mission" dialogs that cover
the shell. Every narrative beat — hook, briefing, concept intro, play,
real-world callback, ethos reflection, badge — is **colored terminal output**.
The kid never leaves the shell.

### 2. Real Linux, not pretend Linux

The commands this game teaches are the **same commands that run every
server, Mac terminal, and Raspberry Pi on Earth.** `pwd`, `ls`, `cd`,
`cat`, `mkdir`, `touch`, `echo` — all real. When the kid grows up and
opens Terminal.app, the muscle memory transfers. **Nothing to unlearn.**

### 3. Typing is mandatory

No click-to-execute. No drag-and-drop command blocks. No autocomplete
that bypasses muscle memory. The kid **types**. Tab completion is
allowed (and implemented) because it's a real shell feature.

### 4. Nothing ever fails scary

Errors are gentle. Kid-friendly. **"Hmm, I don't know that one yet."**
Never "wrong", "error", "failed", "bad". No red alerts. No shame. Kids
learn by trying; this game never punishes trying.

### 5. Ethical hacker ethos

The kid isn't just learning commands — they're learning to use them
**kindly**. Ask first. Help, never harm. Look before you act. Say what
you did. Curiosity is a superpower when you use it with manners.

### 6. Nick Jr. register

Warm. Curious. Silly. Always resolving in connection. **No villains.**
**No scary.** **No failure states.** No meanness between characters.
Tonal anchors: Bluey, Octonauts, Daniel Tiger. Emotions that are OK:
excited, proud, briefly disappointed (always resolves in the same
mission). Emotions that are NOT OK: angry at another character, afraid
for one's life, grief, humiliation.

### 7. The hierarchy tiebreaker

When any two principles conflict, use this strict order:

1. **HEART** — real Linux commands, typed by real kids
2. **HOW WE USE** — ethical-hacker ethos
3. **HOW WE TEACH** — Cyberchase-inspired pedagogy
4. **WHERE** — Workshop narrative + characters (Pip, Captain Rex, Sprocket)

If polishing a mission story ever comes at the cost of command muscle
memory, **commands win**. If adding a pedagogy screen means covering the
terminal, **pedagogy bends**. Always.

---

## The "never do" list

These are automatic no's. If a PR does any of these, reject or rework:

- ❌ **Modal cards that cover the terminal** (the #1 soul-violation)
- ❌ Click-to-execute buttons that bypass typing
- ❌ The words "wrong", "error", "failed", "bad", "stupid"
- ❌ Any form of villain, even a "friendly" one
- ❌ Jargon: `shell`, `kernel`, `stdin`, `stdout`, `syscall`, `exit code`,
  `process`, `pipe` (until Season 2+), `permission` (until Season 2+)
- ❌ Bluey / Octonauts / any copyrighted characters
- ❌ Network assumptions (no internet in the game world)
- ❌ Time pressure, countdown timers on puzzles
- ❌ Leaderboards, competitive scoring, "vs" mechanics
- ❌ Any ad, any purchase, any external link
- ❌ "Real errors" that leak system-level messages (`ENOENT`, stack traces)

---

## The pre-ship checklist

Before any PR merges to `main`, gut-check:

- [ ] Does the terminal still feel like the whole product?
- [ ] Are the commands taught **real** commands that work in bash/zsh?
- [ ] Can the kid complete every task by **typing** (no mouse shortcuts)?
- [ ] Do error messages read kind?
- [ ] Does the writing land at a 7-year-old register (no villains, no jargon)?
- [ ] Did anything in the hierarchy get inverted?

If any answer is no, the change is not ready.

---

## Where the bible lives

The full world bible (characters, arcs, educational framework, ethos)
lives **outside this repo** at `~/Projects/linux-jr-story/`. It's a
scratchpad for writing. **This repo ships code.** The bible informs the
code but doesn't ship with it.

The in-repo knowledge base at `kb/` (once compiled) is the queryable
form of the bible, scoped to what the code needs to know.

---

## Related products that ARE NOT bound by this soul

Sibling surfaces in the same app (see `plans/arcade-ctf-minigames.md`)
may relax some of these principles intentionally — e.g. the Arcade
feature can use older-kid jargon, skip narrative, and target ages 8+.
That's fine. **This soul governs the Season 1 Campaign product specifically.**
Any sibling product that deviates must state which principles it relaxes
and why, in its own plan doc.

---

*Last updated: bible v3 (commands-first hierarchy, Cyberchase pedagogy
layer, Workshop setting, Pip/Rex/Sprocket cast).*
