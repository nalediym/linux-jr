# linuxjr

**A Linux terminal for kids 7+, right in your terminal.**

```
npx linuxjr
```

That's it. No install, no signup. You'll land in a mission where a 7-year-old can learn real Linux commands — `pwd`, `ls`, `cd`, `cat`, `mkdir` — through a story, not a lesson.

---

## Why

Every kids' coding app I tried taught a made-up language. Scratch blocks. Toy syntax. Sandbox worlds. None of it transferred when my kid grew up and opened a real terminal.

`linuxjr` teaches the **actual commands**. The same ones that run every Mac terminal, Linux server, and Raspberry Pi on Earth. When the kid grows up and opens Terminal.app, the muscle memory transfers. Nothing to unlearn.

## What ships

- **3 missions** out of the box — *The Missing Blueprint*, *The Secret Code*, *The Maze*
- **6 real commands** — `pwd`, `ls`, `cd`, `cat`, `mkdir`, plus `help` and `man` for when kids get stuck
- **Friendly errors** — "Hmm, I don't know that one yet", never "command not found"
- **Tab completion** — because it's a real shell feature and we respect real shell features
- **In-memory virtual filesystem** — nothing on disk gets touched, `mkdir` is safe

## How it looks

```
╭──────────────────────────────────╮
│         L I N U X   J R          │
│    learn linux, one mission      │
│         at a time 🚀             │
╰──────────────────────────────────╯

Mission 1/3: The Missing Blueprint
Pip hid a secret blueprint somewhere in the workshop...

▸ Task 1/5: Figure out where you are (try: pwd)

/ >
```

## Design principles (from [SOUL.md](https://github.com/nalediym/linux-jr/blob/main/SOUL.md))

- **Real Linux, not pretend Linux** — muscle memory that transfers
- **Nothing ever fails scary** — no red errors, no shame
- **Typing is mandatory** — no click-to-execute; the muscle memory is the point
- **Ethical hacker ethos** — curiosity as a superpower, used kindly
- **Nick Jr register** — warm, curious, silly; no villains, no failure states

## Requirements

- Node.js **20+**
- A real terminal (macOS Terminal, iTerm, any Linux/WSL terminal). Won't run in a piped-output context.

## Commands inside the game

```
pwd     Where am I?
ls      What's in here?
cd      Go to a room        (cd workshop)
cat     Read a file         (cat readme.txt)
mkdir   Build a new room    (mkdir my-stuff)
man     Learn a command     (man ls)
help    Show commands
clear   Clear the screen
next    Advance to the next mission
quit    Exit the game
Tab     Auto-complete a command or filename
```

## Also on the web

Same missions, iPad-first, with text-to-speech narration for pre-readers:

**https://linux-jr.vercel.app**

## Contributing

Missions are plain JS config objects in `src/data/missions/`. Each defines a filesystem tree, a task sequence, and story text. See [CLAUDE.md](https://github.com/nalediym/linux-jr/blob/main/CLAUDE.md#adding-a-mission) for the full shape.

## License

MIT — Naledi Mkekana
