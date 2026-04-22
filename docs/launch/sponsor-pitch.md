# Sponsor pitch — Linux Jr

> One-pager. Tighten before any specific outreach. Targets:
> Mozilla, EFF, Code.org, Raspberry Pi Foundation, Hour of Code, Khan Academy
> CS team, individual angels who fund kid-coding, dev parents at Stripe / GitHub
> / Anthropic etc. who already write checks for educational software.

## What

Linux Jr is a browser-based Linux terminal for kids 7+. It teaches real shell
commands through story missions and CTF-style puzzles, not pretend languages.
A kid who spends a season here graduates to a real terminal with no muscle
memory to unlearn.

Live: https://linuxjr.dev
Source: https://github.com/nalediym/linux-jr (MIT)
Status: shipped. Three campaign missions, nine arcade puzzles, web + CLI
(`npx linuxjr`). 138 unit tests, 7 e2e tests, full SOUL.md doctrine doc.

## Who

The kid is the user. The parent (or teacher, or coding-club mentor) is the
discoverer. We optimize the kid UX for ages 7–12 with kid-friendly errors,
tap-friendly buttons, TTS narration, and a strict no-scary-failure policy.

## Why this matters

Kid-coding tools have lived in the Scratch / Code.org / Tynker pocket for a
decade. Those tools teach algorithmic thinking — that's good. But they ship
with their own UI, their own affordances, their own pretend metaphors. Kids
graduate from them and the next environment they touch (a real shell, a real
editor, a real OS) is alien.

Linux Jr collapses that gap. The tool *is* the destination. The first command
the kid types in mission 1 is the same command they'll type at age 30 when
they ssh into a server.

## What we want to fund

The product is shipped and free. Costs are minimal — Vercel hobby tier hosts
the static site, ElevenLabs covers TTS audio. What we'd use sponsor support
for, in priority order:

1. **More content.** Missions 4–10 of the campaign are designed in the world
   bible but not yet built. ~3 weeks of focused work each. The arcade has 9
   puzzles; the bible has 30+ candidates.
2. **A real domain + brand.** Currently on a `vercel.app` subdomain.
   `linuxjr.app` would matter for parent/teacher trust and shareability.
3. **Translation.** Spanish first (largest non-English kid-coding audience),
   then Portuguese, French, Mandarin. Strings are already extracted.
4. **A classroom mode.** Multi-kid progress tracking, lesson plans, optional
   teacher dashboard. Sticky for coding clubs and homeschool co-ops.
5. **iPad app store presence.** PWA works today; a Capacitor wrapper would
   unlock App Store discovery without a rewrite.

## What we won't do for sponsor money

- **No data collection.** This is a kids' product. No accounts, no tracking,
  no PII, no analytics. The privacy stance is the second non-negotiable after
  "real commands." See [PRIVACY.md](../../PRIVACY.md).
- **No ads.** Period.
- **No subscription paywall on Season 1 or the arcade.** The free tier is the
  product. Future paid tier (if it happens at all) would be additive content
  for older kids.

## Ask

Three sponsor shapes that would actually work:

| Tier | What we deliver | What it costs |
|---|---|---|
| **Logo support** | Sponsor logo + 1-line attribution in README, footer, and any conference-talk slide. | $500 / year |
| **Content sponsorship** | Sponsor a mission or arcade game (your name in the credits, a 1-line dedication in the data file). | $2,000 per mission |
| **Cohort grant** | Fund 3 months of dedicated content build (missions 4–6 or arcade games 10–15). Quarterly written report. | $15,000 / quarter |

These are starting points. Open to other shapes that fit how you fund things.

## Why I'm a credible builder for this

- Shipped this product solo, including the world bible, the SOUL.md doctrine,
  the arcade engine extensions, the CLI version, and the Vercel deploy.
- Pair-programmed publicly with Claude Code — every PR has its real reviews
  in the git history.
- Background: [Naledi @nalediym](https://github.com/nalediym).

## Contact

naniikekana@gmail.com or open an issue on the GitHub repo.

---

*Last updated: 2026-04-22.*
