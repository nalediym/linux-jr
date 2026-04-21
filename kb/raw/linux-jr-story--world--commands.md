# The Heart — Real Linux Commands

This is the heart of Linux Jr. Everything else — the ethos, the
pedagogy, the workshop, the characters — exists to deliver one
outcome: **a kid who can really, actually use Linux.**

Not a simulated pretend version. Not a made-up toy language. **Real
commands**, the same ones that run every server, Mac terminal, Raspberry
Pi, and Linux box in the world. When this kid opens a real terminal at
age 12, age 17, age 40 — the muscle memory is already there.

Everything else is in service of that.

## The promise

By the end of Season 1 (10 missions), the kid can confidently and
correctly use these commands in a real shell:

| Command | Knows what it does | Can type it | Can explain it |
|---|---|---|---|
| `pwd` | where am I? | ✓ | ✓ |
| `ls` | what's here? | ✓ | ✓ |
| `cd` | go there | ✓ | ✓ |
| `cd ..` | go back | ✓ | ✓ |
| `cat` | read this | ✓ | ✓ |
| `mkdir` | make a folder | ✓ | ✓ |
| `touch` | make an empty file | ✓ | ✓ |
| `echo "x" > file` | write words into a file | ✓ | ✓ |
| `echo "x" >> file` | add to a file | ✓ | partial |
| `help` / `man` | learn about a command | ✓ | ✓ |

Plus the concept of **dotfiles** (files starting with `.`) and the
shape of the **filesystem tree** (root, directory, file, path).

That's a real, usable, foundational Linux vocabulary — more than many
adults have. And it's real. Not simulated. Not dumbed down.

## The command ladder (how we build it, mission by mission)

Every mission introduces OR reinforces commands. No mission is
decorative.

| Mission | Introduces | Reinforces | New concept |
|---|---|---|---|
| M1: Missing Blueprint | `pwd` `ls` `cd` `cat` | — | dotfiles, filesystem shape |
| M2: Secret Code | (none — all 4 reused) | `ls` `cd` `cat` | deep directory trees |
| M3: The Maze | `cd ..` | `cd` `cat` | navigation, going back |
| M4: Room for Sprocket | `mkdir` | `ls` `cd` | making things |
| M5: Missing Tail | `touch` | `ls` `cat` `cd` | empty files / markers |
| M6: Welcome Sign | `echo >` | `cat` | writing data |
| M7: Big Clean-Up | (none — combo mission) | everything from Act 1–2 | breadth search |
| M8: The Recipe | `echo >>` | `cat` `cd` | appending, combining |
| M9: Sprocket's Upgrade | `help` / `man` | `mkdir` `touch` `echo` | self-directed learning |
| M10: The Visitor | (none — capstone) | everything | teaching/using |

## Why "real" matters

Lots of kid-coding tools use pretend languages: Scratch blocks,
drag-and-drop widgets, fake robot-control DSLs. They're fine — they
teach logic. But they do not build muscle memory for the actual tools
a professional uses. When the Scratch kid grows up and has to open a
terminal, it's all new.

Linux Jr solves this. A kid who completes all 10 missions has
**already** typed `ls` hundreds of times. They have **already** learned
that `cd ..` goes back. They have **already** hit Tab for completion.
When they're 12 and a parent hands them a Raspberry Pi, they don't
have to un-learn anything — they pick up where they left off.

## What "real" means for design decisions

This principle constrains the rest of the bible:

- **Mission filesystems use real filesystem semantics.** Files are
  files. Directories are directories. `..` means parent, not "parent-
  concept." No magic.
- **Errors are real errors**, just with kid-friendly wording.
  "cat: foo.txt: No such file or directory" becomes "Hmm, I can't find
  foo.txt here. Did you `ls` to see what's actually here?"
- **Task checks are behavioral, not typed-exact.** The kid can type
  `ls /workshop` or `cd workshop && ls` — the check accepts any valid
  real-Linux path to the same outcome.
- **Tab completion works.** (Already implemented in `Terminal.jsx` —
  preserve this invariant.)
- **Autocorrect/autocapitalize are OFF on iPad.** (Already implemented.
  Preserve.)
- **Commands that don't exist in the sandbox still fail honestly.** If
  a kid types `rm`, the response is "We don't use that one yet — it's
  a powerful one. Maybe next season."

## Never-compromise commitments

1. **Commands are real.** No pretend Linux. If it doesn't run on a real
   shell, it doesn't run here.
2. **Typing is mandatory.** No click-to-execute shortcuts. The kid
   builds muscle memory by literally typing.
3. **The player graduates.** By M10, the kid can open a real Terminal
   and navigate their own Mac. That's the graduation moment.
4. **No gamified shortcuts at the cost of muscle memory.** A kid who
   only earned the badges but never typed `ls` 50 times didn't learn.

## The three layers, hierarchically

Because this is the heart, here is the strict hierarchy of the bible:

```
┌──────────────────────────────────────────────────────────┐
│  HEART: Real Linux commands, typed by a real kid         │  ← commands.md (this file)
├──────────────────────────────────────────────────────────┤
│  HOW WE USE THEM: the ethical-hacker ethos               │  ← ethos.md
├──────────────────────────────────────────────────────────┤
│  HOW WE TEACH THEM: Cyberchase-inspired pedagogy         │  ← educational.md
├──────────────────────────────────────────────────────────┤
│  WHERE IT HAPPENS: the workshop, Pip, Rex, Sprocket      │  ← setting.md, characters/*
└──────────────────────────────────────────────────────────┘
```

If any layer above ever conflicts with "real commands taught by real
typing," **the heart wins.** The ethos bends, the pedagogy bends, the
narrative bends — but the commands are the thing.

## Inspiration

- **Real-world parallels:** Duolingo (real language, not fake). Piano
  lessons (real piano, not toy piano). Bike with training wheels (real
  bike).
- **The test of graduation:** at the end of Season 1, the kid opens
  Terminal.app on a Mac. They type `pwd`. They smile. That is the
  whole product succeeding.
