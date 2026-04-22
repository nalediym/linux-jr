# Linux Jr

> **A browser-based Linux terminal for kids.** Teaches real commands through missions, not lessons — so when they grow up and open Terminal.app, the muscle memory is already there.

**Live demo:** https://linuxjr.dev &nbsp;·&nbsp; **CLI:** `npx linuxjr` &nbsp;·&nbsp; [SOUL.md](./SOUL.md)

![Linux Jr Arcade — capturing the first flag](./docs/screenshots/hero.gif)

> Reproducible: `bun run scripts/record-hero-gif.mjs` (needs `playwright install chromium` + `ffmpeg`).

---

## What this is

A web app where a kid opens a URL and gets a terminal. Green text on dark background. Blinking cursor. Missions that feel like hacking. The kid types **real Linux commands** (`pwd`, `ls`, `cd`, `cat`, `mkdir`) to find hidden files, decode messages, and help a cast of friends in a cozy tinker-workshop.

No Linux under the hood — it's a virtual filesystem in JavaScript with kid-friendly error messages and TTS narration. Works on iPad Safari in standalone PWA mode. Age 7+.

Also shippable as a real shell app: **`npx linuxjr`** runs the same game in your actual terminal.

## Why I built it

Most kid-coding tools use pretend languages — Scratch blocks, drag-and-drop widgets, fake robot DSLs. They teach logic. They don't build muscle memory for the tools a professional uses. A kid who spends three years on Scratch still opens a real terminal at age 12 and sees gibberish.

Linux Jr flips that. Every command the kid types is **the same command** running on every server, Raspberry Pi, and Mac shell on Earth. By the end of Season 1 they've typed `ls` hundreds of times. They graduate to a real shell and there's nothing to unlearn.

## Try it

### Web
```bash
# just go to the live site
open https://linuxjr.dev
```

### Terminal (real shell)
```bash
npx linuxjr
```

### Local dev
```bash
bun install
bun run dev      # http://localhost:5200
bun run build    # production build
bun run lint     # clean (0 errors, 0 warnings)
```

## Two things this project is actually about

Besides being a playable game, Linux Jr is two design experiments I care about:

### 1. A soul doc that actually gets enforced ([`SOUL.md`](./SOUL.md))

Most projects have a `README` and a `CLAUDE.md` — "how to work." Very few have a "what cannot bend" doc that every PR is checked against. `SOUL.md` captures the non-negotiables: *the terminal IS the whole product*, *real Linux not pretend Linux*, *typing is mandatory*, *nothing fails scary*, plus a strict hierarchy (commands > ethos > pedagogy > narrative) for settling trade-offs when decisions conflict.

The reason this exists: one of my own iterations tried to build a "6-beat mission shape" with modal cards for mission briefings and post-mission callbacks. It violated `SOUL.md #1` (the terminal IS the whole product). I caught it, walked it back, and [committed the rejection as a tombstone](https://github.com/nalediym/linux-jr/tree/engine/terminal-extension) so future sessions don't re-propose the same mistake.

### 2. An LLM-compiled world bible (local `kb/`, gitignored)

The world — Pip the kid inventor, Captain Rex the mentor, Sprocket the half-built robot cat, the Workshop setting, the 10-mission arc — lives in a scratchpad outside this repo. A compile step (via the `/knowledge-base` skill) ingests the bible + the mission files + `CLAUDE.md` and produces a queryable markdown wiki at `kb/wiki/`: characters, locations, commands, arcs, style rules — content-addressed citations, zero lint errors. The Arcade adds a parallel CTF lineage layer (Bandit + picoCTF source pages, command concept pages).

When I draft a new mission I can ask *"has Pip met Captain Rex on-page yet?"* or *"what props are already in the toolbox?"* and get cited answers. It's an experiment in keeping world canon consistent across dozens of missions without holding it all in my head. The wiki is **deliberately gitignored** — it's a working tool for me, not a deliverable for anyone else.

## Architecture

```
src/
  components/
    Terminal.jsx       Main UI — custom input bar (not raw xterm.js), iPad-friendly
    FileSystem.js      In-memory virtual filesystem — dirs are objects, files are strings
                       (per-mission `hidesDotfiles` opt-in for the arcade)
    CommandParser.js   Tokenizer (quoted args, escapes) + switch on command name
    MissionEngine.js   Typed task checks (pwd_equals, command_used, output_contains, file_read)
  data/
    missions/          Campaign — story missions, in order, ages 7+
    arcade/            Arcade — CTF mini-games, any order, ages 8+
  hooks/
    useVoice.js        ElevenLabs MP3 with speechSynthesis fallback
    useTerminalSounds  Procedural Web Audio beeps + barks
    useTelemetry.js    localStorage play log (for later adaptive hints)

cli/                   Ink-based CLI workspace — npx linuxjr
SOUL.md                The non-negotiables
CLAUDE.md              How to work in this repo
kb/                    Local knowledge base (gitignored — see "two things this is about")
```

No router. Single-page app. The terminal *is* the whole product.

## Two products in one app

After the disclaimer, the kid lands on a home screen with two doors.

### Campaign — story missions, in order, ages 7+

| # | Title | Teaches | Concept |
|---|---|---|---|
| 1 | The Missing Blueprint | `pwd`, `ls`, `cd`, `cat`, dotfiles | location — "everything lives somewhere" |
| 2 | The Secret Code | nested `cd`, `cat` across deeper trees | decomposition — break a 4-digit problem into four 1-digit ones |
| 3 | The Maze | `cd ..`, deep navigation, dotfiles | sequencing — step-by-step instructions |

Missions 4–10 are drafted in the bible and waiting on a prerequisite: `touch` / `echo` / `man` need to be added to `CommandParser.js` before Act 2. Each mission has a rated Cyberchase-inspired shape — hook, brief, concept intro, play, real-world callback, ethos reflection — but all of it lives as terminal output. No modal cards. See `SOUL.md` for why.

### Arcade — CTF mini-games, any order, ages 8+

Sibling product surface for older kids. Each game is a single command-line puzzle adapted from a real beginner CTF challenge ([OverTheWire Bandit](https://overthewire.org/wargames/bandit/), [picoCTF](https://picoctf.org) General Skills). No narrative, no unlock gating, just capture the flag.

| # | Title | Adapted from | Command |
|---|---|---|---|
| 1 | The First Door | Bandit Level 0 → 1 | `cat readme` |
| 2 | Hidden in Plain Sight | Bandit Level 1 → 2 | `cat ./-` (file named dash) |
| 3 | Spaces Between | Bandit Level 2 → 3 | quoted `cat` |
| 4 | Dot Files | Bandit Level 3 → 4 | `ls -a` |
| 5 | Needle in a Haystack | Bandit Level 4 → 5 | `file *` |
| 6 | Find by Size | Bandit Level 5 → 6 | `find -size` |
| 7 | grep the Flag | Bandit Level 6 → 7 | `grep` |
| 8 | Decode Me | picoCTF "Bases" | `base64 -d` |
| 9 | Strings | Bandit Level 9 → 10 | `strings` |

Pipes (`grep | sort`), `chmod`, and simulated `ssh` are deferred — each is a meaningful engine investment on its own. After capture, the kid sees a 😐 / 😊 / 🤩 rating prompt with an optional textarea so playtest feedback lands in `localStorage.linuxjr-feedback` for review.

## Commands currently wired up

| Command | What it does | Kid framing |
|---|---|---|
| `pwd` | print working directory | "Where am I?" |
| `ls`, `ls -a` | list files (`-a` reveals dotfiles) | "What's in here?" |
| `cd` | change directory | "Go to..." |
| `cd ..` | parent directory | "Go back" |
| `cat` | read file | "Read this..." |
| `file` | identify file type | "What kind of thing is it?" |
| `find` | search filesystem (`-name`, `-size`, `-type`) | "Where is it?" |
| `grep` | search inside a file | "Find this in here" |
| `base64 -d` | decode base64 | "Unscramble this" |
| `strings` | extract printable text | "Pull readable bits out" |
| `mkdir` | make directory | "Build a room" |
| `man` | command help | "How does this work?" |
| `help` | list available commands | "What can I do?" |

Also: tab completion, `clear`, command history, quoted arguments (`cat "filename with spaces"`).

## Stack

- **React 19 + Vite 8** — no component library, tiny bundle (68 kB gzipped)
- **Fredoka** font (UI) + system monospace (terminal)
- **Web Audio API** for procedural sounds
- **Browser speechSynthesis** for TTS, with ElevenLabs MP3 override
- **localStorage** for progress, autosave, telemetry
- **Bun** workspace for the web app + the CLI
- **Ink** for the `npx linuxjr` terminal experience
- **Vercel** deploy on push to `main`

## What's deliberately not here

Documented in `SOUL.md`. Quick highlights:
- No analytics or tracking
- No test framework — small enough that typed task checks + playthroughs + manual iPad QA are the verification story
- No click-to-execute buttons — the kid **types**, no shortcuts
- No red error styling, no scary failure states, no "you got it incorrect" messaging
- No villains, no scary, no time pressure
- No jargon a 7-year-old wouldn't know (`shell`, `kernel`, `stdin`, `permission` — all deferred)

## Contributing

Every PR to `main` runs:
- `bun run lint` — ESLint 9 flat config, zero-tolerance
- `bun run build` — Vite production build
- `bun run guard` — **the Sloppy Guard** (`scripts/sloppy-guard.sh`), a battery of checks that enforce SOUL.md rules: no debug statements left in, required files present, README integrity, banned words in user copy, orphan TODOs, and more
- `gitleaks` secrets scan across the diff

Run `bun run guard` locally before `git push` — same checks CI runs, same output format. The guard grows over time: every new class of sloppiness gets a check.

## Credits

- **Game design + writing + code:** Naledi ([@nalediym](https://github.com/nalediym))
- **Pair-programmed with Claude Code** — session logs are in the git history as real PRs with real reviews, not squash-commits
- **Inspiration:** *Bluey* for tone (previously used directly as placeholder characters, swapped out for original cast; see PR #2 for the reframe). *Cyberchase* (PBS) for the pedagogical shape. *Daniel Tiger* for the Nick Jr. register. Kali Linux for aesthetic direction on the rejected engine-extension exploration.

## License

[MIT](./LICENSE). Fork it, remix it, build your own. If you ship a variant, please don't reuse the M2 "Captain Rex forgot his own password" framing without crediting — the ethical-hacker reframe was the whole point of that mission.

---

*Built as a love letter to every kid who sees a terminal and thinks "I want to do that." The faster you graduate to a real shell, the faster the world opens up.*
