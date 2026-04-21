# The Ethos — Ethical Hacker, Age 7

> **Note:** The *heart* of Linux Jr is real Linux commands (see
> `commands.md`). This file — the ethos — is the layer that shapes HOW
> the kid uses those commands. Ethics is the posture. Commands are the
> practice. Both matter, but if they ever conflict, commands win.

The kid isn't just learning commands — they are learning to use them as
an **ethical hacker**. This ethos shapes every mission briefing, every
interaction, every line of prose. It's the second-most-important thing
in the bible.

## What "ethical hacker" means, in this world

An ethical hacker is someone who is:
- **Really curious** — wants to know how things work
- **Really clever** — figures out puzzles other people skip
- **Really kind** — uses what they learn to help, never to harm

Key word: **help, not harm.** A hacker in pop culture breaks in and takes.
An ethical hacker looks carefully, asks permission, fixes what's broken,
leaves notes about what they changed, and never peeks where they weren't
invited.

## The five principles (kid-legible)

1. **Ask first.** Before you poke around in someone's stuff, ask.
2. **Help, never harm.** Use what you know to fix, not to break.
3. **Look before you act.** `ls` and `cat` come before `mkdir` and `echo`.
4. **Say what you did.** If you changed something, leave a note.
5. **Curiosity is a superpower — when you use it kindly.**

These are phrased for a 7-year-old, not for a security certification. They
carry the real idea without the jargon.

## How the ethos appears in gameplay

### Mission briefings

Every mission begins with an explicit invitation. Captain Rex or Pip
*asks* the player to help. The player is never trespassing. Examples:

- "Captain Rex's log: I forgot my own password. Would you help me find it?"
- "Pip: I lost my blueprint somewhere — can you go looking? You can open
  any file you see."
- "Sprocket is beeping sadly from the basement. Pip says they definitely
  want to be rescued."

### Filesystem boundaries

A room or file the player should NOT enter can be marked:

- A `.private` directory with a `.hint` saying "This is someone's private
  stuff. Not for us today."
- A closed door file (`door-closed.txt`) that asks the player to wait for
  permission before proceeding

Use sparingly. The point is once or twice across 10 missions the player
encounters a boundary and learns to respect it. Not every mission.

### After-action transparency

After a mutation (mkdir, touch, echo), the narrator acknowledges it:
- "Nice — you built Sprocket a bed here."
- "Got it — the welcome sign is up at the door."

This models the "say what you did" principle without lecturing.

### When Pip slips up (rare, teachable)

Pip is a kid — they sometimes forget to ask first. Maximum once per act.
Example: Pip opens Captain Rex's logbook without asking. Captain Rex
gently says, "Mm — you could have asked, you know." Pip says, "Oh — sorry,
Rex." The player watches this and absorbs the norm.

This is **not** a punishment beat. It's a modeling beat. Kids learn ethics
by watching characters they like model them, mess up, and recover warmly.

## Badges (renamed from earlier draft)

| Act | Badge | What it means |
|---|---|---|
| 1 | **Scout** | Finds things, observes carefully, asks before acting |
| 2 | **Helper** | Builds and fixes — always with permission |
| 3 | **White Hat** | The full ethical hacker |

(Previous draft: Explorer / Tinker / Workshop Key. Renamed so every badge
reinforces the ethos.)

## Why this reframe matters

Without the ethos: Linux Jr is a cute tutorial. Fine.

With the ethos: Linux Jr is a kid's first lesson in **responsible power.**
They learn that a command is a superpower, and superpowers come with
manners. The tutorial stays, the stakes go up in the right direction
(stakes become social/ethical, not violent/dangerous — perfect for Nick Jr.).

It also gives the series a future: every season can teach a new layer of
the ethic (consent → debugging → honest reporting → teaching others).
