# M1 — The Missing Blueprint

> **First seen in:** [act-1.md](../sources/linux-jr-story--arcs--act-1.md.md)
> **Also referenced by:** [mission-01](../sources/src--data--missions--mission-01-find-the-flag.js.md), [commands.md](../sources/linux-jr-story--world--commands.md.md), [pip.yaml](../sources/linux-jr-story--characters--pip.yaml.md), [sprocket.yaml](../sources/linux-jr-story--characters--sprocket.yaml.md)
> **Confidence:** high (5 sources agree)
> **Aliases:** find-the-flag, M1, Missing Blueprint

## Definition
The opening mission. Pip hid a robot-cat blueprint in the workshop and forgot where. The player finds it — in the process they learn `pwd`, `ls`, `cd`, `cat`, and dotfiles.
— [act-1.md](../sources/linux-jr-story--arcs--act-1.md.md)#c-d18daf3e, [mission-01](../sources/src--data--missions--mission-01-find-the-flag.js.md)#c-407ad082

## Details
- **Character focus:** Pip.
- **Track A commands:** pwd, ls, cd, cat, dotfiles.
- **Track B concept:** *location* — "everything lives somewhere."
- **Vocabulary introduced:** directory, file, path, hidden, flag.
- **Real-world callback:** "When you tap Photos on a phone, the phone is doing something like `ls`."
— [act-1.md](../sources/linux-jr-story--arcs--act-1.md.md)#c-d18daf3e

The flag file lives at `/workshop/secret-room/.hidden-blueprint.txt` and contains `FLAG{you_found_it_hacker}` plus the canon reveal that the blueprint is for **Sprocket**.
— [mission-01](../sources/src--data--missions--mission-01-find-the-flag.js.md)#c-407ad082, [sprocket.yaml](../sources/linux-jr-story--characters--sprocket.yaml.md)#c-c92a975b

M1 is the one mission where the filesystem shape itself (root → workshop → rooms) is the lesson — matching the commands.md ladder entry "dotfiles + filesystem shape."
— [commands.md](../sources/linux-jr-story--world--commands.md.md)#c-c07ae2a4

Pip is the source of the problem (hid the blueprint) per pip.yaml canon.
— [pip.yaml](../sources/linux-jr-story--characters--pip.yaml.md)#c-7527fb1c

## Connections
- Related to: [command-ladder](command-ladder.md) — rung 1
- Related to: [pip](pip.md)
- Related to: [sprocket](sprocket.md) — M1's payoff is Sprocket's origin
- Related to: [workshop](workshop.md) — M1 filesystem = the workshop
- Related to: [flag-convention](flag-convention.md)
- Related to: [mission-shape](mission-shape.md)

## Provenance
- [act-1.md](../sources/linux-jr-story--arcs--act-1.md.md) — c-d18daf3e
- [mission-01](../sources/src--data--missions--mission-01-find-the-flag.js.md) — c-407ad082
- [commands.md](../sources/linux-jr-story--world--commands.md.md) — c-c07ae2a4
- [pip.yaml](../sources/linux-jr-story--characters--pip.yaml.md) — c-7527fb1c
- [sprocket.yaml](../sources/linux-jr-story--characters--sprocket.yaml.md) — c-c92a975b

<!-- human notes below -->
