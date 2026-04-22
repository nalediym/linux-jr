# Knowledge Base Index

> Auto-maintained by `/knowledge-base compile`. Do not edit manually.
> Last compiled: 2026-04-22T00:00:00Z
> Sources: 27 | Concepts: 32 | Words: ~14,800

## Sources

### World bible — `../linux-jr-story/`
- [story.yaml](sources/linux-jr-story--story.yaml.md) — top-level bible: heart, ethos, cast, scope, mechanic
- [world/commands.md](sources/linux-jr-story--world--commands.md.md) — THE HEART: real Linux commands, ladder, never-compromise commitments
- [world/ethos.md](sources/linux-jr-story--world--ethos.md.md) — ethical-hacker ethos, five principles, badge rename
- [world/educational.md](sources/linux-jr-story--world--educational.md.md) — Cyberchase-inspired pedagogy, two tracks, mission shape, vocab ladder
- [world/setting.md](sources/linux-jr-story--world--setting.md.md) — The Workshop: rooms, props, no-tech rules
- [world/style.md](sources/linux-jr-story--world--style.md.md) — voice, banned/always-say words, signature phrases, story-field shape
- [characters/pip.yaml](sources/linux-jr-story--characters--pip.yaml.md) — Pip's identity and canon
- [characters/captain-rex.yaml](sources/linux-jr-story--characters--captain-rex.yaml.md) — Captain Rex's identity and canon
- [characters/sprocket.yaml](sources/linux-jr-story--characters--sprocket.yaml.md) — Sprocket's identity, fact-beeper role
- [arcs/act-1.md](sources/linux-jr-story--arcs--act-1.md.md) — M1–M3 design docs, Scout badge, M2 ethos reframe
- [arcs/act-2.md](sources/linux-jr-story--arcs--act-2.md.md) — M4–M6 design docs, Helper badge, Sprocket tail arc
- [arcs/act-3.md](sources/linux-jr-story--arcs--act-3.md.md) — M7–M10 design docs, White Hat, Juno payoff, deferred commands

### Code — `src/data/missions/`
- [mission-01-find-the-flag.js](sources/src--data--missions--mission-01-find-the-flag.js.md) — M1 implementation
- [mission-02-the-secret-code.js](sources/src--data--missions--mission-02-the-secret-code.js.md) — M2 implementation
- [mission-03-the-maze.js](sources/src--data--missions--mission-03-the-maze.js.md) — M3 implementation
- [index.js](sources/src--data--missions--index.js.md) — mission registry + localStorage progress

### Project rules
- [CLAUDE.md](sources/CLAUDE.md.md) — stack, architecture, kid UX, adding a mission

### CTF beginner sources — `kb/raw/ctf-beginner/` (Arcade lineage)
- [bandit-overview](sources/ctf-beginner--bandit-overview.md.md) — OverTheWire Bandit premise, audience, level structure
- [bandit-level-0-to-1](sources/ctf-beginner--bandit-level-0-to-1.md.md) — `cat readme` (canonical Arcade Game #1 source)
- [bandit-level-1-to-2](sources/ctf-beginner--bandit-level-1-to-2.md.md) — `cat ./-` (file named dash)
- [bandit-level-2-to-3](sources/ctf-beginner--bandit-level-2-to-3.md.md) — quoted `cat` (filename with spaces)
- [bandit-level-3-to-4](sources/ctf-beginner--bandit-level-3-to-4.md.md) — `ls -a` (hidden dotfiles)
- [bandit-level-4-to-5](sources/ctf-beginner--bandit-level-4-to-5.md.md) — `file ./*` (identify readable file)
- [bandit-level-5-to-6](sources/ctf-beginner--bandit-level-5-to-6.md.md) — `find -size` (predicate composition)
- [bandit-level-6-to-7](sources/ctf-beginner--bandit-level-6-to-7.md.md) — `grep PATTERN FILE` *(unverified — bandit7.html 404)*
- [picoctf-overview](sources/ctf-beginner--picoctf-overview.md.md) — General Skills category, common encoding/text puzzles
- [htb-starting-point](sources/ctf-beginner--htb-starting-point.md.md) — Tier 0/1 structure, `HTB{}` flag-format origin *(unverified — page 500)*

## Concepts

### Foundational
- [heart-real-commands](concepts/heart-real-commands.md) — the non-negotiable core
- [ethos-ethical-hacker](concepts/ethos-ethical-hacker.md) — five principles, responsible power
- [cyberchase-pedagogy](concepts/cyberchase-pedagogy.md) — two tracks, six-beat shape
- [computational-thinking](concepts/computational-thinking.md) — Track B: decomposition, pattern matching, abstraction, sequencing
- [graduation-moment](concepts/graduation-moment.md) — kid opens Terminal.app at M10

### Structure
- [command-ladder](concepts/command-ladder.md) — mission-by-mission command progression
- [mission-shape](concepts/mission-shape.md) — the six beats
- [vocabulary-ladder](concepts/vocabulary-ladder.md) — 2–5 new words per mission, banned-word list
- [badges](concepts/badges.md) — Scout / Helper / White Hat
- [deferred-commands](concepts/deferred-commands.md) — rm, pipes, permissions, network

### Voice & copy
- [style-voice](concepts/style-voice.md) — voice rules, banned/always-say lists
- [kid-friendly-errors](concepts/kid-friendly-errors.md) — "Hmm, I don't know that one yet"
- [signature-phrases](concepts/signature-phrases.md) — per-character catchphrases

### Characters
- [pip](concepts/pip.md)
- [captain-rex](concepts/captain-rex.md)
- [sprocket](concepts/sprocket.md)
- [juno](concepts/juno.md) — Season 1 payoff visitor (no character YAML yet)

### Setting
- [workshop](concepts/workshop.md) — the cozy tinker-workshop home
- [workshop-rooms](concepts/workshop-rooms.md) — canonical room catalog
- [basement-maze](concepts/basement-maze.md) — M3 space
- [props](concepts/props.md) — recurring objects including the Act 3 red button
- [no-tech-world](concepts/no-tech-world.md) — no phones, TV, internet, adults besides Rex

### Missions (implemented)
- [mission-01-blueprint](concepts/mission-01-blueprint.md)
- [mission-02-secret-code](concepts/mission-02-secret-code.md)
- [mission-03-maze](concepts/mission-03-maze.md)
- [flag-convention](concepts/flag-convention.md) — FLAG{…} CTF payoff format

### Implementation
- [stack-architecture](concepts/stack-architecture.md) — React/Vite/bun stack and module boundaries

### Arcade — CTF lineage
- [cat-command](concepts/cat-command.md) — read file contents (Game #1 primitive)
- [grep-command](concepts/grep-command.md) — search file for pattern (Game #7)
- [find-command](concepts/find-command.md) — search filesystem by predicate (Game #6)
- [file-command](concepts/file-command.md) — identify file type (Game #5)
- [flag-format](concepts/flag-format.md) — `FLAG{snake_case}` convention (cross-game)

## Uncategorized Claims (singletons)

Single-source facts that didn't reach the 2-source concept threshold but remain in the KB via their source pages:

- **Dev server port 5200.** — [CLAUDE.md](sources/CLAUDE.md.md)#c-bdfd6107
- **Autosave fires after each task completion.** — [CLAUDE.md](sources/CLAUDE.md.md)#c-ac29fd74
- **Rex's "WORLD'S OKAY-EST INVENTOR" mug.** — [captain-rex.yaml](sources/linux-jr-story--characters--captain-rex.yaml.md)#c-49366ca0
- **Sprocket's soft fear of the number 0 (unexplained).** — [sprocket.yaml](sources/linux-jr-story--characters--sprocket.yaml.md)#c-d1dbe8de
- **"For Real" bonus mode deferred to Season 2.** — [educational.md](sources/linux-jr-story--world--educational.md.md)#c-51271b5c
- **Rex's hat-from-his-kid — which kid is unspecified.** — [captain-rex.yaml](sources/linux-jr-story--characters--captain-rex.yaml.md)#c-49366ca0
- **Sprocket's collar label "SPROCKET (v3)".** — [sprocket.yaml](sources/linux-jr-story--characters--sprocket.yaml.md)#c-c92a975b
- **M2 answer is 2-2-4-2.** — [act-1.md](sources/linux-jr-story--arcs--act-1.md.md)#c-512c914e, [mission-02](sources/src--data--missions--mission-02-the-secret-code.js.md)#c-102a9614 (but only the bible says "canon preserved")
- **Rex's bookshelf canon: rockets, dogs, Binary for Beginners.** — [captain-rex.yaml](sources/linux-jr-story--characters--captain-rex.yaml.md)#c-49366ca0, [mission-02](sources/src--data--missions--mission-02-the-secret-code.js.md)#c-102a9614

## Recent Queries
<!-- auto-populated by query mode, max 20 entries -->
