# Stack & Architecture

> **First seen in:** [CLAUDE.md](../sources/CLAUDE.md.md)
> **Also referenced by:** [index.js](../sources/src--data--missions--index.js.md)
> **Confidence:** medium (2 sources — only CLAUDE.md is comprehensive)

## Definition
The implementation substrate of Linux Jr: React 19 + Vite 8, no component library, Fredoka + Courier New fonts, Web Audio API, browser speechSynthesis TTS, localStorage for state, iPad-first portrait PWA, no routing.
— [CLAUDE.md](../sources/CLAUDE.md.md)#c-fb445fc4, c-ac29fd74

## Details
**Core modules:**
- `Terminal.jsx` — main UI; custom input bar (NOT a raw xterm.js textarea) for iPad compatibility; autocorrect/autocapitalize/spellcheck OFF.
- `FileSystem.js` — in-memory virtual filesystem; directories are objects, files are strings; dotfiles shown by default.
- `CommandParser.js` — switch on command name; 6 commands wired today (pwd, ls, cd, cat, mkdir, help); kid-friendly errors.
- `MissionEngine.js` — typed task checks (`pwd_equals`, `command_used`, `output_contains`, `file_read`); autosave after each task; no eval, no DSL.
- `src/data/missions/` — one JS module per mission, aggregated in `index.js`.
— [CLAUDE.md](../sources/CLAUDE.md.md)#c-ac29fd74, [index.js](../sources/src--data--missions--index.js.md)#c-a93f0b7f

**Dev commands:** `bun install`, `bun run dev` (port 5200), `bun run build`, `bun run lint`.
— [CLAUDE.md](../sources/CLAUDE.md.md)#c-bdfd6107

**Kid UX rules:** 64px buttons / 48px min interactive; 16px terminal, 18px input, 20px+ UI. Sound is 50% of experience.
— [CLAUDE.md](../sources/CLAUDE.md.md)#c-96289c50

**Progress state:** localStorage key `linuxjr-progress`, field `missionsCompleted` array of mission ids.
— [index.js](../sources/src--data--missions--index.js.md)#c-a93f0b7f

## Connections
- Related to: [command-ladder](command-ladder.md) — implementation currently ships only Act 1's worth of commands
- Related to: [heart-real-commands](heart-real-commands.md) — invariants (real semantics, autocorrect off, tab completion) live in this stack
- Related to: [kid-friendly-errors](kid-friendly-errors.md) — where error copy is wired
- Related to: [mission-shape](mission-shape.md) — only `story`+`tasks` are modeled today; the other 5 beats need new fields

## Provenance
- [CLAUDE.md](../sources/CLAUDE.md.md) — c-211a622a, c-bdfd6107, c-fb445fc4, c-ac29fd74, c-96289c50, c-0eb8d978
- [index.js](../sources/src--data--missions--index.js.md) — c-a93f0b7f

<!-- human notes below -->
