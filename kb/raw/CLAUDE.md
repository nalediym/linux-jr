# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
