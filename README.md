# Linux Jr

Linux for kids. A browser-based terminal that teaches real Linux commands through missions, not lessons.

**Live:** https://linux-jr.vercel.app

## What is this?

A web app where kids open a URL and get a terminal. Green text on dark background. Blinking cursor. Missions that feel like hacking. The kid types real commands (`ls`, `cd`, `cat`) to solve puzzles, find hidden files, and decode messages.

No real Linux underneath — it's a virtual filesystem in JavaScript with kid-friendly error messages and TTS narration. Works on iPad Safari in full-screen PWA mode (add to home screen). Age 7+.

## Missions

- **The Missing Blueprint** — find a hidden file in a workshop (intro to `pwd`, `ls`, `cd`, dotfiles)
- **The Secret Code** — collect 4 digits across rooms to unlock a locked computer (`cat`, nested directories)
- **The Maze** — follow breadcrumb notes through a nested maze to find Pip (deep navigation, `cd ..`)

## Why

Kids learn Linux the same way they learn to read — by doing it, not by being taught it. Every command they type is a real Linux command. When they graduate to a real shell, the muscle memory is already there.

## Quick start

```bash
bun install
bun run dev         # http://localhost:5200
```

## Architecture

```
src/
  components/
    Terminal.jsx       — Main terminal UI (custom input bar, not raw xterm.js)
    FileSystem.js      — In-memory virtual filesystem (JSON tree)
    CommandParser.js   — Parse + execute: pwd, ls, cd, cat, mkdir, help
    MissionEngine.js   — Task gating, flag checking, progress tracking
  data/
    missions/          — Mission configs (filesystem layout + tasks)
```

## Commands

| Command | What it does | Kid framing |
|---------|-------------|-------------|
| `pwd` | Print working directory | "Where am I?" |
| `ls` | List files | "What's in here?" |
| `cd` | Change directory | "Go to..." |
| `cat` | Read file | "Read this..." |
| `mkdir` | Make directory | "Build a room" |
| `help` | Show available commands | "What can I do?" |

## Stack

- React 19 + Vite 8
- Fredoka font (UI) + Courier New (terminal)
- Web Audio API for sounds
- Browser speechSynthesis for TTS
- localStorage for progress/autosave
- iPad-first, portrait mode
