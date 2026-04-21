# CLAUDE.md — Project rules

> **Source:** [kb/raw/CLAUDE.md](../../raw/CLAUDE.md)
> **Ingested:** 2026-04-21T20:10:52Z
> **Hash:** 30234e04102df09674f555aac775fe3b94143dc1689e303df630b4f5a597c259
> **Status:** fresh
> **Chunks:** 6

## Chunks

### c-211a622a: What this is
> Linux Jr is a browser-based Linux terminal for kids (age 7+). Teaches real Linux commands through missions, not lessons. Standalone web app — no parent monorepo.

### c-bdfd6107: Commands
> `bun install`, `bun run dev` (dev server on http://localhost:5200), `bun run build` (production build), `bun run lint` (ESLint).

### c-fb445fc4: Stack
> React 19 + Vite 8, no component library. Fredoka (UI) + Courier New (terminal). Web Audio API for procedural sounds. Browser speechSynthesis for TTS (must be triggered by user tap). localStorage for progress/autosave/session log. iPad-first portrait-mode PWA.

### c-ac29fd74: Architecture
> No routing — single-page app; the terminal IS the product. `Terminal.jsx` (custom input bar, autocorrect/autocapitalize/spellcheck OFF). `FileSystem.js` (in-memory virtual filesystem; dotfiles shown by default). `CommandParser.js` (switch on command name, 6 commands: pwd/ls/cd/cat/mkdir/help). `MissionEngine.js` (typed task checks, autosave after each task, no eval, no DSL).

### c-96289c50: Kid UX rules
> Tap targets 64px buttons, 48px min interactive. Terminal 16px minimum, input 18px, UI 20px+. Never "wrong" or "error" — use encouraging language. TTS narrates story and objectives. Sound is 50% of experience.

### c-0eb8d978: Adding a mission
> Create file in `src/data/missions/`, export an object with id/title/story/filesystem/tasks. Check types: `pwd_equals`, `command_used`, `output_contains`, `file_read`.

## Key Claims
- Only 6 commands are wired today (pwd, ls, cd, cat, mkdir, help) — `touch`, `echo`, and `man` from the bible's ladder are NOT yet implemented. — c-ac29fd74
- Dotfiles are shown by default — the bible calls this out as a simplification. — c-ac29fd74
- Kid UX rules map 1:1 to style.md's voice rules. — c-96289c50
- Dev server port is 5200. — c-bdfd6107
- Only 4 task check types exist. — c-0eb8d978

## Related Concepts
- [stack-architecture](../concepts/stack-architecture.md)
- [command-ladder](../concepts/command-ladder.md)
- [kid-friendly-errors](../concepts/kid-friendly-errors.md)
- [mission-shape](../concepts/mission-shape.md)

<!-- human notes below -->
