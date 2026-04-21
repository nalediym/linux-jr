# The Educational Framework — Cyberchase-Inspired

> **Note:** The *heart* of Linux Jr is real Linux commands (see
> `commands.md`). This file — the pedagogy — is the layer that shapes
> HOW we teach those commands memorably. Cyberchase-style structure
> (explicit goals, real-world callbacks, logic framing) makes every
> typed command stick. But the command itself is still the thing being
> taught. The pedagogy serves the command, not the other way around.

Every mission is a lesson with an explicit learning goal, a real-world
callback, and at least one concept beyond "type this thing" — so the
commands don't just get memorized, they get *understood*. This is the
Cyberchase spine.

## Two learning tracks

Every mission hits both — but **Track A is the heart, Track B is the
scaffolding around it**:

### Track A: Real Linux commands (THE HEART)
The actual commands (`pwd`, `ls`, `cd`, `cat`, `mkdir`, `touch`, `echo`,
`help`). These are what the kid types, dozens of times per mission,
until the muscle memory is real. This is the non-negotiable thing.
See `commands.md` for the command ladder.

### Track B: Computational thinking (the understanding)
The ideas *behind* the commands. These turn memorized keystrokes into
transferable knowledge. Four recurring concepts:

| Concept | What it means, for a 7-year-old |
|---|---|
| **Decomposition** | Break a big problem into small steps |
| **Pattern matching** | "This looks like something I've seen before" |
| **Abstraction** | A folder is an idea — it holds things, like a box |
| **Sequencing** | Order matters: look before you act, list before you read |

## Mission shape (every mission follows this)

Cyberchase opens every episode with a real-world kid facing a real-world
version of the math problem they'll solve in Cyberspace, then ties it back
at the end. We borrow that exact structure.

1. **Hook** (15 seconds, real-world relatable)
   - "Have you ever lost something in your room? Pip has too!"
   - Shown in the mission intro, read by TTS

2. **Mission Brief** (Captain Rex, with permission)
   - The explicit invitation. The ethos in action.
   - "Captain Rex's log: Pip asked if you'd help find the blueprint."

3. **Concept Intro** (Pip, 1–2 sentences, kid-speak)
   - The lesson stated out loud.
   - "Okay okay okay — every file on a computer has a place it lives.
     You find it by asking 'where am I?' — that's `pwd`."

4. **The Adventure** (the puzzle itself — typing commands)

5. **The Real World Moment** (post-completion card)
   - Brief. One or two sentences. Explicit callback.
   - "When you look in your phone for saved photos, you're using
     something like `ls`!"
   - Delivered as on-screen card + TTS line

6. **Ethos Reflection** (Captain Rex, warm)
   - "Nice work. You asked first, you looked carefully, and you said
     what you did. That's what ethical hackers do."

## Per-mission deliverables

Each mission's arc doc now specifies:

- **Learning objective (Linux):** the command(s) being taught
- **Learning objective (Computational):** the deep concept
- **Vocabulary:** new terms introduced (2–5 words max per mission)
- **Real World Moment:** the post-mission callback line
- **Transfer question:** one optional open-ended question the kid could
  answer out loud ("Where do YOU keep your important things?")

## Vocabulary ladder (across all 10 missions)

A running list. Each mission introduces 2–5 new words. By mission 10 the
kid has a working computing vocabulary.

| Act | Words introduced |
|---|---|
| 1 | directory, file, path, hidden, flag, root, parent (folder), listing |
| 2 | create, empty file, write, contents, marker, structure |
| 3 | search, organize, combine, project, command, help |

Terms **never** used (too jargony for age 7): syscall, kernel, shell,
stdin/stdout, exit code, pipe (except as metaphor in later seasons),
permissions (deferred to Season 2), process.

## Sprocket as the fact-beeper (the Digit role)

Digit in Cyberchase narrates facts and pipes in with reminders. Sprocket
gets that role in Linux Jr, translated through beeps + on-screen captions:

```
SPROCKET: beep-boop! ← (caption: "pwd = print working directory")
SPROCKET: beep-beep-beep! ← (caption: "found it!")
SPROCKET: beeeeep. ← (caption: "oh no, that wasn't it")
```

Sprocket's captions do the educational reinforcement — restating what the
kid just learned, in even simpler words, without feeling like a lecture.
Max 2–3 Sprocket-caption moments per mission.

## Logic and pattern layers (beyond commands)

Cyberchase teaches more than arithmetic — it teaches *reasoning*. We do
the same. Missions gradually introduce puzzles that require thinking
alongside typing:

- **M2 (The Secret Code):** decomposition — break a 4-digit problem into
  four 1-digit problems. Pattern matching — each clue references something
  countable.
- **M3 (The Maze):** sequencing — "first left, then down, then right" is
  an algorithm.
- **M5 (The Missing Tail):** inference — use clues in one file to decide
  where to look next.
- **M7 (The Big Clean-Up):** search strategy — what's the best way to
  find N items across many rooms?
- **M8 (The Recipe):** assembly — multiple inputs combine into one output.
- **M9 (Sprocket's Upgrade):** organization — designing a structure
  before building it.
- **M10 (The Visitor):** teaching — explaining a concept IS knowing it.

## "For Real" bonus mode (optional future feature)

Cyberchase's closing real-world segment is live-action. For Linux Jr,
this could become an optional bonus screen after each mission:

- Age 7+: short text card
- Age 9+: mini-challenge ("Can you draw a map of your house as a folder
  tree?")

Not required for Season 1. Flag as a Season 2 enhancement.

## Why blend ethical-hacker + Cyberchase

- **Ethical hacker** gives the *values* spine (ask, help, transparency)
- **Cyberchase** gives the *pedagogy* spine (explicit goals, real-world
  callbacks, logic puzzles)

Together: a kid who learns to think computationally, act ethically, and
speak fluent command-line. That's the whole product in one sentence.
