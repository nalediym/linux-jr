---
title: "SOUL.md + Sloppy Guard — encoding taste into a CI check"
subtitle: A direct response to "taste cannot be reduced to a checklist"
status: draft
targeted_venues:
  - dev.to
  - hacker news (Show HN)
  - personal blog
word_target: 1500
---

## The claim I'm pushing back on

In *"What Do Engineers Mean When We Say 'Taste'?"*, software architect Dave Griffith writes:

> "Checklists are one-dimensional; taste is the thing that operates across all the dimensions at once."

He decomposes taste into product thinking, system thinking, and quality-as-calibration. He concludes that taste is apprenticeship knowledge — no formal curriculum, no codification.

He's half right. **A** checklist is one-dimensional. But I've been running a different experiment for the last few weeks, and I think Griffith's framing misses a third option: **a doctrine document paired with a growing composable battery of automated checks**. That's not one-dimensional. That's taste operationalized at the scale of a project, versioned in git, enforced on every PR.

Let me show you what I mean.

## The two files

Two files in my repo. They pair.

**`SOUL.md`** — the doctrine. Five hundred lines. Seven principles. A "never do" list of concrete bans. A hierarchy tiebreaker for when two principles conflict. A pre-ship checklist. The doctrine is about *what cannot bend* in this project:

> 1. The terminal IS the whole product
> 2. Real Linux, not pretend Linux
> 3. Typing is mandatory
> 4. Nothing ever fails scary
> 5. Ethical hacker ethos
> 6. Nick Jr. register
> 7. The hierarchy tiebreaker: commands > ethos > pedagogy > narrative

**`scripts/sloppy-guard.sh`** — the enforcement. A bash script with three tiers:
- **HARD:** blocks merge (lint, build, missing LICENSE, debug statements, secrets, required README sections)
- **SOFT:** warns on PR but doesn't block (orphan TODOs, banned words in user-facing strings, dead code flagged by Knip, test.only left in)
- **INSIGHT:** posts stats (bundle size, files changed, late-night warning)

The guard runs locally via `bun run guard` and in CI on every PR. Same script, same output. The soul says *"never say 'wrong' to a kid"*; the guard grep-searches for `"wrong"` inside quoted strings in the mission files.

## Why this isn't "just a checklist"

Three things make it different from the checklists Griffith is rejecting:

### 1. It grows from incidents

When a sloppy pattern escapes to production, the fix is three commits:
1. The actual fix
2. A new check in `sloppy-guard.sh` that would have caught it
3. A commit message that documents the incident

Over time, `git log scripts/sloppy-guard.sh` becomes a canonical "things I learned not to ship" journal. Every line in the guard has an archaeological reason. That's not static rulebook energy — that's accumulated scar tissue, versioned.

A checklist you pull from a book is one-dimensional because it's someone else's taste, copy-pasted. A guard you built from your own near-misses is the record of your calibration over time.

### 2. It composes tools across layers

The guard isn't one category of linter. It composes:
- ESLint (code quality)
- Knip (dead code)
- gitleaks (secrets)
- custom grep for debug statements
- custom grep for SOUL-banned words in quoted strings
- a time-of-day warn (ADHD-safe)
- required-file assertions
- required-README-section assertions

Each of those lives elsewhere in isolation. The guard is the conductor. When someone says "we already have gitleaks" — yes, but they don't have gitleaks *plus* ESLint *plus* a domain-specific banned-words check *plus* a living doctrine document, all composing into one `bun run guard` command with identical local and CI output.

### 3. The doctrine is separate from the enforcement

The doctrine file (SOUL.md) is a human-readable philosophy statement. The enforcement file (sloppy-guard.sh) is an executable translation.

When the doctrine evolves, you update SOUL.md first, and the guard follows. When a new sloppy pattern appears, you update the guard first, and if the pattern generalizes, you update SOUL.md. The two files are in dialogue.

Griffith argues taste can't be codified because he's imagining static rules. The doctrine-enforcement pattern is neither static (rules come and go as the project evolves) nor singular (it's two files in dialogue).

## What the guard actually catches

In my project (a Linux tutorial game for kids), the guard has caught:
- A `console.log` I left in after a debugging session
- A `TODO` in the README that never got a ticket
- An attempt to use the word `"wrong"` in a mission error message (violates SOUL.md)
- A PR that would have missed the `LICENSE` file before public-flip
- A commit that referenced an old character name (Bingo) that had been renamed to Pip, across all the mission files

Each of those, on its own, a human reviewer would have caught... eventually. The guard catches them in seven seconds, on every push, every time. Gergely Orosz's [framing](https://blog.pragmaticengineer.com/good-code-reviews-better-code-reviews/) fits here: *"too many nitpicks often signal a lack of tooling or standards. Many common nitpick comments are solvable through automated linting."*

If a human has to flag `"console.log"` in review twice, that's a tooling gap. Add a check. The guard grew 40% over the last few phases of the project because I kept noticing "oh, I should check for THAT too."

## What it does not catch

Griffith's point lands here. The guard cannot catch:
- "This mission's tone drifted from the Nick Jr. register"
- "This copy implies a villain even though it never says the word"
- "The character's voice doesn't match their profile in the bible"
- "This feature violates rule #7 of the hierarchy in a way that sounds reasonable but isn't"

Those are judgment calls. They need a human, or — in the 2026 AI-assisted era — they need an AI review step that treats SOUL.md as context and scans the diff.

Which is why my pipeline has *both* layers:

```
1. Sloppy Guard (mechanical)  — catches regex-findable violations
2. CodeRabbit (generic AI)    — catches cross-file logic issues
3. /soul-violation (domain AI) — Claude with SOUL.md as context,
                                 catches semantic soul drift
4. Human review               — catches everything else
```

The guard is not the whole review layer. It's the floor. It stops the obvious from escaping so human attention can focus on the judgment calls Griffith is pointing at.

## The actual concrete counter-claim

**Taste cannot be reduced to a checklist, but it CAN be reduced to:**
1. A doctrine document expressing what cannot bend
2. A growing battery of automated checks derived from real incidents
3. An AI judgment layer that reads the doctrine as context
4. A human review that focuses on what the other three can't see

Each layer by itself is insufficient. The stack together is... not exactly taste, but it's something better than apprenticeship: **taste that doesn't depend on the tastemaker being awake, on the 37th reviewer being as careful as the 1st, on the 2am-commit being as sober as the 10am one.**

For a solo builder — maybe especially a solo builder with ADHD, working at weird hours, pair-programming with LLMs that are themselves prone to shipping plausible-looking bad ideas — that stack is the difference between shipping with dread and shipping with peace.

## Try it

You don't need this exact pattern. You need *your own version*. Here's the minimal seed:

1. **Write a SOUL.md** in your project. Five bullet points. The non-negotiables. What would shame you if it shipped? What do you know you'll forget at 2am?
2. **Write a `scripts/guard.sh`** that runs `your-linter && your-build && grep-for-the-thing-that-embarrassed-you-last-week`. Make it one bash script so the barrier to adding checks is "open a text file."
3. **Make it run locally and in CI.** Same script, same output.
4. **Every time something sloppy escapes, add one line.** Document why in the commit message.
5. **Keep writing.**

Three weeks from now, you'll have a guard that is *yours* — not Airbnb's ESLint config, not Google's style guide. Your own accumulated record of the last N things that went wrong, with the regex that prevents #N+1.

That's taste, operationalized. Griffith would say it's still one-dimensional. I'd say: watch how the list grows for six months and tell me if the shape of what it catches — tone, accessibility, user copy, aesthetic drift, ADHD-specific patterns — isn't multidimensional in the way that matters.

---

## References

- Dave Griffith, [*What Do Engineers Mean When We Say "Taste"?*](https://davegriffith.substack.com/p/what-do-engineers-mean-when-we-say)
- Gergely Orosz, [*Good Code Reviews, Better Code Reviews*](https://blog.pragmaticengineer.com/good-code-reviews-better-code-reviews/)
- Addy Osmani, [*My LLM coding workflow going into 2026*](https://addyo.substack.com/p/my-llm-coding-workflow-going-into)
- Tyler Hawkins, [*A Checklist Manifesto*](https://medium.com/better-programming/a-checklist-manifesto-3f686ed135f8)
- [The project this essay came from](https://github.com/nalediym/linux-jr) — `SOUL.md` and `scripts/sloppy-guard.sh` are at the root
