# Command Ladder

> **First seen in:** [commands.md](../sources/linux-jr-story--world--commands.md.md)
> **Also referenced by:** [act-1.md](../sources/linux-jr-story--arcs--act-1.md.md), [act-2.md](../sources/linux-jr-story--arcs--act-2.md.md), [act-3.md](../sources/linux-jr-story--arcs--act-3.md.md), [CLAUDE.md](../sources/CLAUDE.md.md), [index.js](../sources/src--data--missions--index.js.md)
> **Confidence:** high (5 sources agree)
> **Aliases:** the command progression, mission-by-mission ladder

## Definition
The ordered plan by which the 10 missions introduce and reinforce every command the kid must learn. No mission is decorative — each either introduces a new command or reinforces existing ones.
— [commands.md](../sources/linux-jr-story--world--commands.md.md)#c-c07ae2a4

## Details
Mission-by-mission (per commands.md):
- **M1 Missing Blueprint:** introduces `pwd` `ls` `cd` `cat` + dotfiles, filesystem shape.
- **M2 Secret Code:** reinforces `ls` `cd` `cat` across deeper trees (no new command).
- **M3 The Maze:** introduces `cd ..`.
- **M4 Room for Sprocket:** introduces `mkdir`.
- **M5 Missing Tail:** introduces `touch`.
- **M6 Welcome Sign:** introduces `echo >`.
- **M7 Big Clean-Up:** no new command; breadth search combo.
- **M8 The Recipe:** introduces `echo >>`.
- **M9 Sprocket's Upgrade:** introduces `help` / `man`.
- **M10 The Visitor:** capstone; any/all commands.
— [commands.md](../sources/linux-jr-story--world--commands.md.md)#c-c07ae2a4

Act-level introduction summaries match: Act 1 pwd/ls/cd/cat/dotfiles (Scout), Act 2 mkdir/touch/echo (Helper), Act 3 help/man (White Hat).
— [act-1.md](../sources/linux-jr-story--arcs--act-1.md.md)#c-41cedbe1, [act-2.md](../sources/linux-jr-story--arcs--act-2.md.md)#c-87e6566f, [act-3.md](../sources/linux-jr-story--arcs--act-3.md.md)#c-a953819b

**Implementation gap:** CLAUDE.md lists only 6 commands in the current `CommandParser.js` (pwd, ls, cd, cat, mkdir, help). `touch`, `echo`, and `man` from the ladder are NOT yet wired. Only 3 of 10 missions are implemented.
— [CLAUDE.md](../sources/CLAUDE.md.md)#c-ac29fd74, [index.js](../sources/src--data--missions--index.js.md)#c-a93f0b7f

## Connections
- Related to: [heart-real-commands](heart-real-commands.md) — the ladder is how the heart is delivered
- Related to: [mission-shape](mission-shape.md) — every mission-shape instance sits on a ladder rung
- Related to: [mission-01-blueprint](mission-01-blueprint.md)
- Related to: [mission-02-secret-code](mission-02-secret-code.md)
- Related to: [mission-03-maze](mission-03-maze.md)
- Related to: [deferred-commands](deferred-commands.md) — the commands NOT on the ladder (rm, pipes, permissions, network)

## Provenance
- [commands.md](../sources/linux-jr-story--world--commands.md.md) — c-c07ae2a4, c-c6ef427f
- [act-1.md](../sources/linux-jr-story--arcs--act-1.md.md) — c-41cedbe1
- [act-2.md](../sources/linux-jr-story--arcs--act-2.md.md) — c-87e6566f
- [act-3.md](../sources/linux-jr-story--arcs--act-3.md.md) — c-a953819b
- [CLAUDE.md](../sources/CLAUDE.md.md) — c-ac29fd74
- [index.js](../sources/src--data--missions--index.js.md) — c-a93f0b7f

<!-- human notes below -->
