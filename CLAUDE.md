# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **⚠ READ `SOUL.md` FIRST.** It's the north star for this project — the
> non-negotiables. Any decision you make should pass its pre-ship checklist.
> CLAUDE.md is "how to work." SOUL.md is "what cannot bend."

## What This Is

Linux Jr is a browser-based Linux terminal for kids (age 7+). Teaches real Linux commands through missions, not lessons. Standalone web app — no parent monorepo.

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Dev server on http://localhost:5200
bun run build        # Production build
bun run lint         # ESLint
```

## Stack

- React 19 + Vite 8, no component library
- Fredoka font (UI text) + Courier New (terminal output)
- Web Audio API for procedural sounds
- Browser speechSynthesis for TTS (must be triggered by user tap, not auto-play)
- localStorage for progress, autosave, and session log
- iPad-first, portrait mode PWA

## Mission intro shape (locked)

Keep the mission intro to a **single short summary**, not multi-speaker
dialogue. The shape is:

```
=== Mission Title ===

[one-paragraph story — the premise, narrated by TTS]

Mission: <current task description>

Type help if you get stuck.
```

**Do not** reintroduce any of: per-speaker lines (`<rex>`, `<pip>`), IRC
channel framing (`#workshop`, `*** joined`, `*** topic:`), nickname login,
message stagger/typing indicators, sprocket inline captions, real-world
callbacks, ethos-reflection beats, or badge banners. These were explored
on the `engine/terminal-extension` branch and rejected as "too advanced" —
the user prefers a small readable summary that gets out of the way so the
kid can start typing.

The mission data schema stays minimal: `id`, `title`, `story`, `audio`,
`filesystem`, `tasks` with `check` types. If a world-bible pedagogy beat
needs to ship, fold it into the `story` paragraph — don't branch the
engine to render more shapes.

## Architecture

No routing. Single-page app. The terminal IS the whole product.

- `Terminal.jsx` — Main UI. Custom input bar (not raw xterm.js textarea) for iPad compatibility. Input has autocorrect/autocapitalize/spellcheck disabled.
- `FileSystem.js` — In-memory virtual filesystem. Directories are objects, files are strings. Shows dotfiles by default (no `ls -a` needed).
- `CommandParser.js` — Switch statement on command name. 6 commands: pwd, ls, cd, cat, mkdir, help. Kid-friendly errors ("Hmm, I don't know that one" not "command not found").
- `MissionEngine.js` — Typed task checks (pwd_equals, command_used, output_contains, file_read). Autosave after each task completion. No eval, no DSL.
- `src/data/missions/` — Mission configs. Each mission defines a filesystem tree, task sequence, and story text.

## Kid UX Rules

- Tap targets: 64px buttons, 48px minimum interactive elements
- Font: 16px minimum for terminal, 18px for input, 20px+ for UI text
- Never say "wrong" or "error" — use encouraging language ("Hmm, I don't know that one yet")
- TTS narrates story and mission objectives
- Sound is 50% of the experience

## Adding a Mission

Create a new file in `src/data/missions/`. Export an object matching this shape:

```js
export const MISSION_NAME = {
  id: 'unique-id',
  title: 'Display Title',
  story: 'Narrative text read aloud by TTS...',
  filesystem: { /* directory tree */ },
  tasks: [
    { description: 'Human-readable hint', check: { type: 'pwd_equals', path: '/target' } },
    { description: 'Next step', check: { type: 'output_contains', text: 'FLAG{' } },
  ],
}
```

Check types: `pwd_equals`, `command_used`, `output_contains`, `file_read`.
