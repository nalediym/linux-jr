# Show HN draft

> Pre-launch draft. Tweak the hook, swap the GIF when ready, schedule for a
> Tuesday morning (best HN traction window).

## Title (cap 80 chars)

**Show HN: Linux Jr — a real Linux terminal for kids 7+**

## Body

I built Linux Jr because most kid-coding tools teach pretend languages. Scratch
blocks, drag-and-drop widgets, fake robot DSLs. They teach logic. They don't
build muscle memory for the tools a professional uses. A kid who spends three
years on Scratch still opens a real terminal at age 12 and sees gibberish.

Linux Jr flips that. Every command the kid types is the same command running on
every server, Raspberry Pi, and Mac shell on Earth. By the end of Season 1
they've typed `ls` hundreds of times. They graduate to a real shell and there's
nothing to unlearn.

Two surfaces:

- **Campaign** — 10 story missions for ages 7+, narrative-shaped, Cyberchase-
  inspired pedagogy. Pip the inventor, Captain Rex the mentor, Sprocket the
  half-built robot cat.
- **Arcade** — 9 CTF mini-puzzles for ages 8+, adapted from real beginner CTFs
  (OverTheWire Bandit, picoCTF). `cat`, `ls -a`, `file`, `find`, `grep`,
  `base64 -d`, `strings`. Each puzzle ends with a `FLAG{...}` capture.

No Linux under the hood — it's a virtual filesystem in JavaScript with kid-
friendly error messages and TTS narration. Works on iPad Safari in standalone
PWA mode. Also shippable as a real shell app: `npx linuxjr` runs the same game
in your actual terminal.

A few design experiments I care about more than the game itself:

1. **A SOUL.md that gets enforced.** Most projects have a README and a
   CLAUDE.md — "how to work." Very few have a "what cannot bend" doc that every
   PR is checked against. SOUL.md captures the non-negotiables (the terminal IS
   the whole product, real Linux not pretend Linux, nothing fails scary, etc.)
   plus a strict hierarchy for settling trade-offs when decisions conflict.

2. **An LLM-compiled world bible.** The 10-mission arc + characters + setting
   live in a scratchpad. A compile step ingests the bible + mission files +
   CLAUDE.md and produces a queryable wiki. When I draft a new mission I can
   ask "has Pip met Captain Rex on-page yet?" and get cited answers.

3. **Real CTF lineage for the arcade.** Each puzzle cites the OverTheWire
   Bandit level or picoCTF challenge it adapts. Kid graduates with the muscle
   memory to actually play those platforms.

Try it: https://linux-jr.vercel.app

Source: https://github.com/nalediym/linux-jr (MIT)

What I'd love feedback on: the kid UX, the SOUL.md doctrine, whether real
commands feel sticky after a play session. If you sit a kid down in front of
this, please send me the feedback panel JSON afterward (it's all stored
locally, no analytics).

---

## Notes for posting

- **Best windows:** Tuesday or Wednesday morning, 8–10am Pacific.
- **Hero asset:** `docs/screenshots/hero.gif` (when recorded). HN doesn't unfurl
  but Twitter etc. will use the og:image.
- **First comment after posting:** drop the technical write-up of the SOUL.md
  pattern + LLM-compiled bible, since those are the actual hooks for the HN
  audience. The kid product is the lede; the meta-design is the substance.
- **Reply discipline:** answer in the first hour. Most-upvoted comments tend to
  be the ones with thoughtful early author replies.
