---
title: "How I flipped a personal project public without shame"
subtitle: The anti-sloppiness audit, the nervous week, and what I learned about shipping in public with ADHD
status: draft
targeted_venues:
  - substack (new: likely naledi.substack.com)
  - linkedin longform
  - indie hackers
word_target: 1800
tone: diary-style, personal
---

## What I was afraid of

The repo had been private for a month. Started as a terminal game for my kid — originally called *Nawazi Terminal* because Nawazi was the kid's name. Bluey characters in the missions. Personal references in the copy. Code that worked but wasn't loved. A README that was one paragraph.

I wanted to flip it public as a portfolio piece. That meant:
- Recruiters would see the commit history
- Friends-of-friends on Twitter would click the link
- The fifteen people who might actually play it with their kids would judge it
- Every typo I'd ever pushed would be discoverable forever

I have ADHD. "Every typo forever" is a nervous-system trigger. I shipped the repo private for a reason.

But it was also some of my best work. Built a world bible. Compiled a knowledge base. Invented a pattern I hadn't seen elsewhere (SOUL.md + a matching sloppy guard). Shipped it to Vercel. Shipped an `npx linuxjr` CLI. Had real PRs with real reviews.

So: flip public, but don't be sloppy about it. This is the diary of the week I actually did that.

## Day 1 — the audit

Before flipping a repo public, ask: **what do I not want a stranger to see?**

My list, gathered in an afternoon:
- My kid's name in the original project title
- A throwaway Bluey character the missions borrowed without permission
- "This is a personal, non-commercial project made for family use" disclaimer — fine for private, deliberately underwhelming
- A CLAUDE.md session that had the phrase "naniikekana@gmail.com" in it because Claude echoed my email back once
- No LICENSE file
- Lint was broken (`bun run lint` errored with "no eslint config")
- No CI — nothing verified what I was shipping

I made a PR called `rename/nawazi-terminal-to-linux-jr`. Renamed the thing. Swapped every Bluey reference across three mission files, invented an original cast (Pip, Captain Rex, Sprocket). Added a migration shim in `Terminal.jsx` so anyone who'd already played with the old localStorage keys kept their progress.

That PR merged first. No CI yet to verify it. I just pushed, crossed fingers, watched Vercel auto-deploy. It worked. That was still the private-repo way of working.

## Day 2 — the secrets sweep

Before any public flip: scan every commit ever for accidentally committed secrets.

```bash
git log --all -p | grep -iE 'api[_-]?key|secret|password|token|sk-[a-zA-Z0-9]{20}|AKIA[A-Z0-9]{16}'
```

My history had hits — all false positives. `NPM_TOKEN` in a CI doc. The `js-tokens` npm package. Mission content literally about "secret-room" and "secret code." Nothing leaked.

This sweep is five minutes. Do it before you flip. If it finds something real, stop and use `git filter-repo` to purge before going public. **Even a "git reset --hard" doesn't fully purge — GitHub caches refs for hours, sometimes days. Once a secret is pushed, assume it's leaked.**

## Day 3 — the README that carries its weight

The old README was quick-start + stack list. For a portfolio piece it needed:
- A one-sentence pitch above the fold
- A hero image or GIF
- A "why I built this" narrative
- Explicit callouts of the things I was proud of (the soul doc, the knowledge base, the CLI)
- Credits + license

I rewrote it as a narrative, not a reference. Four new sections:
- *"What this is"* — kids open a URL, get a terminal, type real Linux commands
- *"Why I built it"* — the Scratch-blocks-vs-real-Linux argument
- *"Two things this project is actually about"* — SOUL.md (a soul doc that gets enforced) + `kb/` (LLM-compiled world bible)
- *"What's deliberately not here"* — linking to SOUL.md for the non-negotiables

The third section is where the portfolio signal actually lives. Anyone can ship a terminal game. Fewer people have written a SOUL.md. Even fewer have an LLM-compiled world bible. Those are the things that make someone browsing my repo on a Tuesday linger past the README scroll.

## Day 4 — the sloppy guard

This is where the week got interesting. Writing the README surfaced a problem: **how do I keep the README this good?** What if next week I add a new mission and the README drifts? What if I ship a `console.log` on a 2am push? What if I commit with `naniikekana@gmail.com` visible?

I wanted automation that would catch this. Not a checklist — an executable one.

So I wrote `scripts/sloppy-guard.sh`. Three tiers (HARD blocks, SOFT warns, INSIGHT informs). Checks include:
- Lint passes
- Build passes  
- LICENSE exists
- README has sections `Live demo`, `Why I built it`, `Stack`, `License`
- No `console.log` / `debugger` in src/
- No hardcoded API-key-shaped strings
- Orphan TODOs without ticket refs (SOFT)
- SOUL.md banned words (`wrong`, `stupid`, `failed`) in quoted strings (SOFT)

Seven seconds to run. Same script local and in CI. Pair it with a `.github/workflows/sloppy-guard.yml` and it runs on every PR.

I named it deliberately. "Sloppy guard" is what I wanted to feel: something guarding against my sloppy tendencies. Not a linter. A guard.

## Day 5 — the anti-sloppiness catcher

The user I built this for is future-me at 2am, sleep-deprived, in a hyperfocus flare, about to ship something I'll regret by morning. That person needs more than a CI check — that person needs visible, loud reminders that this is a public repo.

So I wrote `PROTOCOLS.md`: a session-start / commit / push / merge checklist. Plus scripts:
- `bun run session:start` prints the repo context, current branch, working tree, last 3 commits, open PRs, time-of-day warning, a checklist to scan
- `bun run session:end` shows what shipped, what's uncommitted, any WIP PRs
- `.envrc` (direnv) prints a 🌍 PUBLIC REPO banner every time I `cd` into the repo
- Lefthook `pre-push` hook prints a big box ⛔ blocking pushes to main, shows the outgoing commits, pauses 2 seconds business-hours or 5 seconds between 10pm-7am

The time-of-day guard is the ADHD-specific one. I know my 2am self is not the same person as my 10am self. The 5-second pause between 10pm and 7am is long enough to notice.

## Day 6 — enabling the checks

By this point I had four layers:
1. SOUL.md doctrine
2. Sloppy Guard mechanical checks
3. Lefthook pre-commit + pre-push
4. CI running the guard + lint + build + gitleaks on every PR

I added:
- CodeRabbit (free for public repos) for generic AI review
- A `/codex review` stub for dual-AI-review (Addy Osmani's pattern)
- A `/soul-violation` workflow — Claude reads SOUL.md as context and reviews the diff for semantic soul drift
- Post-deploy canary — Playwright smoke test runs against the live URL after every deploy; opens an issue if it fails

Plus Phase-7 DX polish: CONTRIBUTING.md with Conventional Comments, issue templates, PR template with the SOUL.md pre-ship checklist, a FUNDING.yml for the sponsor button.

## Day 7 — the flip

One command:

```bash
gh repo edit nalediym/linux-jr --visibility public --accept-visibility-change-consequences
```

I didn't run it immediately. I ran `bun run guard` first. Clean. Opened the repo in an incognito browser tab, imagining I was a stranger. Scrolled. Read the README. Clicked SOUL.md. Clicked `kb/`. Did one pass for anything that made me wince.

Then I ran the command. It was a one-second operation. The nervous system spike was out of proportion to the ceremony.

Here's what happened after:
- The first hour: nothing. The repo was public. Nobody knew.
- The first day: Google indexed it. A few visits. No stars yet.
- The first week: I wrote a thread with the live demo + a GIF. That got 40 likes. A senior engineer at a company I'd applied to DM'd me a compliment about the SOUL.md pattern.
- The first month: a few hundred stars. One real PR from a stranger. Three job interviews where the interviewer mentioned "that terminal game."

## What I learned

1. **The audit is the hard part.** The flip is a one-second command. The six days of prep is where the actual work lives.

2. **Tooling is an emotional infrastructure.** I wrote Sloppy Guard because I didn't trust future-me. The guard made me calm enough to push public. That's a legitimate reason to build tooling.

3. **ADHD safeguards work when they're visible.** The 🌍 PUBLIC REPO banner on `cd` into the repo isn't useful the 900th time I see it. It's useful the one time I'm about to commit something at 2am and the color registers.

4. **The README is more portfolio than the code.** Most visitors read the README, glance at the live demo, and leave. If your README makes them linger, they'll look deeper. If it's generic, they're gone. The README is the apartment-showing; the code is the closet.

5. **Shame is a tell.** Every thing I was ashamed of pre-flip was a thing I should have addressed pre-flip. Shame is the brain's signal that the sloppy layer is exposed. Follow the shame to the actual fix.

6. **The doctrine-before-enforcement order matters.** I tried to write the guard first. Couldn't, because I didn't know what it was guarding against. SOUL.md unlocked the guard — once I knew what could not bend, I could write the regex that bent-checking.

7. **Public is quieter than I feared.** The nightmare scenario — hordes of strangers picking apart my code — didn't happen. A few people quietly looked. Most didn't. The stakes in my head were way higher than the actual stakes.

## What I'd tell someone about to flip

1. **Do the audit.** Commit history, secrets scan, LICENSE, README, broken CI. A week of evenings.
2. **Write a SOUL.md.** The 500-line version. What cannot bend.
3. **Write a sloppy guard.** One bash script. Five checks. The things that would shame you most. Make it run in CI.
4. **Write a PROTOCOLS.md** if you have ADHD or just-shipped-late tendencies. The checklist you read at session start.
5. **Add the public-repo banner to your git hooks.** The 🌍 banner on pre-push. Two-second pause. It works.
6. **Flip.** The actual flip is anticlimactic. Which is the point.

The sloppy floor is where your published self lives. Raise it. Everything else can still be messy. But the floor has to be solid before you let strangers in.

---

*The repo in this post: [github.com/nalediym/linux-jr](https://github.com/nalediym/linux-jr). SOUL.md, sloppy-guard.sh, and PROTOCOLS.md are all at the root. Fork away.*
