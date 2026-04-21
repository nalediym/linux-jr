# Mission Shape (Six Beats)

> **First seen in:** [educational.md](../sources/linux-jr-story--world--educational.md.md)
> **Also referenced by:** [story.yaml](../sources/linux-jr-story--story.yaml.md), [style.md](../sources/linux-jr-story--world--style.md.md), [CLAUDE.md](../sources/CLAUDE.md.md)
> **Confidence:** high (4 sources agree)
> **Aliases:** the six beats, Cyberchase mission structure

## Definition
Every mission follows a fixed six-beat shape borrowed from Cyberchase: Hook → Mission Brief → Concept Intro → The Adventure → The Real World Moment → Ethos Reflection.
— [educational.md](../sources/linux-jr-story--world--educational.md.md)#c-20f806d3, [story.yaml](../sources/linux-jr-story--story.yaml.md)#c-b795fdab

## Details
1. **Hook** (15s, real-world relatable): "Have you ever lost something in your room?"
2. **Mission Brief** (Captain Rex, with permission): the invitation.
3. **Concept Intro** (Pip, 1–2 sentences, kid-speak): the lesson stated aloud.
4. **The Adventure**: the typed-command puzzle itself.
5. **The Real World Moment** (post-completion card): explicit callback to daily life.
6. **Ethos Reflection** (Rex, warm): "You asked first, you looked, you said what you did."
— [educational.md](../sources/linux-jr-story--world--educational.md.md)#c-20f806d3

The in-code `story` field follows the 1–3 sentence rule: [world state] / [problem] / [optional CTA]. This feeds TTS and shows on screen.
— [style.md](../sources/linux-jr-story--world--style.md.md)#c-17a067c0

**Implementation gap:** the current mission objects in code only wire the `story` + `tasks`. The other five beats (hook card, concept-intro line, real-world moment card, ethos reflection line) are not yet data-modeled — they'd need new fields.
— [CLAUDE.md](../sources/CLAUDE.md.md)#c-0eb8d978

## Connections
- Related to: [cyberchase-pedagogy](cyberchase-pedagogy.md) — this shape IS the pedagogy
- Related to: [style-voice](style-voice.md) — voice rules govern every beat
- Related to: [ethos-ethical-hacker](ethos-ethical-hacker.md) — briefings and reflections carry the ethos
- Related to: [command-ladder](command-ladder.md) — each adventure is one ladder rung
- Related to: [vocabulary-ladder](vocabulary-ladder.md) — concept-intro lines introduce the staged vocab

## Provenance
- [story.yaml](../sources/linux-jr-story--story.yaml.md) — c-b795fdab
- [educational.md](../sources/linux-jr-story--world--educational.md.md) — c-20f806d3
- [style.md](../sources/linux-jr-story--world--style.md.md) — c-17a067c0
- [CLAUDE.md](../sources/CLAUDE.md.md) — c-0eb8d978

<!-- human notes below -->
