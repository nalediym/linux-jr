# Style Guide

## Voice

- **Short sentences.** 1–3 per story block.
- **Concrete nouns.** "cookies", "bolt", "tail", "toolbox" — not "resource",
  "component", "implement".
- **Active verbs.** "Pip hid", "Sprocket beeped", "Captain Rex smiled" — not
  "was hidden", "got beeped".
- **Present tense** for descriptions, **past tense** for what just happened.

## Nick Jr. constraints

### Never say

- "wrong", "error", "failed", "bad", "stupid"
- "dangerous", "scary", "nightmare", "terrible"
- "hate", "shut up", "dumb"
- "loser", "weird" (as insult)

### Always say (when the kid misfires)

- "Hmm, I don't know that one yet." (existing canon)
- "Let's try another way."
- "Not quite — let's have another look."
- "Almost!"

### Emotions OK

- Curious, excited, surprised, proud, happy, silly, a little sleepy,
  puzzled, embarrassed (briefly), disappointed (briefly — always resolves)

### Emotions NOT OK

- Angry at another character, afraid for one's life, grief, humiliation,
  loneliness that isn't immediately resolved

## Signature phrases (use these for character voice)

| Character | Signature | When |
|---|---|---|
| Pip | "Oh! Oh! Watch this!" | starting something new |
| Pip | "Okay okay okay —" | thinking aloud |
| Captain Rex | "Let's have a look." | starting a mission briefing |
| Captain Rex | "Well now." | surprised |
| Captain Rex | "Mm." | thinking |
| Sprocket | "Beep-boop!" | any time |
| Sprocket | "Beep." | single — means "yes" or "hi" |
| Sprocket | "Beep-beep-beep!" | excited/found it |

## Mission story field — the 1–3 sentence rule

The `story` field in each mission JS object is read aloud by TTS and shown
on screen. Keep it to 1–3 sentences. Follow this shape:

> [One line of world state: who's here, what's happening.]
> [One line of the problem: what went wrong.]
> [Optional one line of call to action: what the player should notice.]

Example (M1, re-voiced to bible):

> Pip is showing off a new blueprint in the workshop.
> Only they hid it somewhere secret and now they can't remember where!
> Can you help Pip find it?

## File contents in filesystem

Dotfiles and regular files are part of the voice too. Keep them:
- Short (1–3 lines per file)
- In-character (the note is written by a character, not by the game)
- Optionally silly (Pip leaves a sticky note that says "forgot what this was for")

## Task descriptions

Task description strings appear on screen as "Mission: [description]".
Keep them:
- Second person ("Look around the kitchen")
- Include the command hint in parentheses ("try: ls")
- Kid-friendly: "Find where Sprocket is hiding" not "Navigate to target directory"

## Ethical-hacker voice (the heart of the copy)

This carries the ethos into individual lines. See `ethos.md` for the full
principles.

### Mission briefings always start with an invitation

- "Captain Rex's log: I forgot my own password. Would you help me find it?"
- "Pip asked if you could look for their blueprint. You have their
  permission to open any file you see."
- "Sprocket is stuck. Pip says 'please go rescue them!'"

Never: "Break into Captain Rex's computer." Always: "Captain Rex asked
for help unlocking his computer."

### After the kid does something that changes state

Acknowledge what they did, in plain language. This models the "say what
you did" principle:

- "Nice — you built Sprocket a bed here."
- "Got it — welcome sign is up at the door."
- "There — the marker file is set. Pip will see it."

### Boundary files (rare — once or twice across all 10 missions)

When a directory or file should NOT be explored:
- `.private/.hint`: "This is someone's private stuff. Not for us today."
- Or simply: the mission does not direct the kid here, and there's no
  reward for going there.

Don't lecture. Just model the boundary and move on.

### When Pip slips up (teachable moment, max once per act)

Pip occasionally forgets to ask. Captain Rex corrects warmly:
- Rex: "Mm — you could have asked, you know."
- Pip: "Oh — sorry, Rex."
- (Scene continues. No punishment. Just modeling.)

### Vocabulary for the ethos (kid-legible)

| Concept | Kid-friendly phrase |
|---|---|
| Consent / permission | "Did you ask first?" / "May I?" |
| Transparency | "Say what you did." / "Leave a note." |
| Observation before action | "Look first, then try." / "What do you see?" |
| Help-not-harm | "We fix. We don't break." |
| Curiosity with manners | "Wondering is good. Poking needs permission." |

Use these phrases in dialogue when they fit naturally. Never force them
in as a lesson-voice — the ethos shows up in what characters *do*, not in
monologues.
