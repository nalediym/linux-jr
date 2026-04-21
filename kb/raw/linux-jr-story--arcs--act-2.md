# Act 2 — Make & Fix

**Theme:** The player can find things now. Time to make and fix things —
always with permission. Each mission introduces a building/creating
command, and each briefing comes with an explicit invitation.

**Ethos beat:** "Build to help. Ask before. Note what you did."

**Commands introduced:** `mkdir`, `touch`, `echo > file`, maybe simple
overwrite with `echo > existing`.

**Emotional beat:** "I can make things exist. I can leave my mark on the
workshop — and I always leave a note."

**Badge earned:** **Helper** (builds and fixes, always with permission)

**Sprocket arc:** Sprocket's tail falls off in M4, is found in M5,
gets attached in M6. Little recurring thread.

---

## Mission 04 — A Room for Sprocket

- **Location:** workshop/garage (plus one new dir the player creates)
- **Problem:** Sprocket keeps sleeping in the oil pan. Needs a proper bed.
- **Character focus:** Sprocket + Pip
- **Commands (Track A):** `mkdir` (make a named directory)
- **Concept (Track B):** *abstraction / containers* — "a folder is an idea
  that holds things"
- **Vocabulary:** create, folder (directory), container
- **Hook:** "When you get a new toy, where does it go? Probably in a spot
  that's already named — the toy box, the bookshelf, the kitchen drawer.
  Sprocket needs a spot that doesn't exist yet — so you'll *make* one."
- **Real World Moment:** "Making a folder on a computer is like putting
  a new label on an empty box. Now the computer knows: 'this is where
  this kind of thing lives.'"
- **Transfer question:** "What's one thing in your room that needs its own
  labeled box?"
- **Puzzle shape:**
  1. Explore garage to see where Sprocket is now
  2. `mkdir sprocket-bed` inside garage
  3. Verify by `ls` that the new room exists
  4. Flag trigger: `cd sprocket-bed` + `pwd`

**Story beat (one-sentence draft):** "Sprocket has been sleeping in the oil
pan again and Captain Rex says 'that is absolutely not a bed.' Pip asked
if you could build Sprocket a proper room in the garage."

**Sprocket caption** on first `mkdir`: "beep-boop!" → *mkdir = make directory*

---

## Mission 05 — The Missing Tail

- **Location:** workshop/garage/workbench + garden/shed
- **Problem:** Sprocket's tail has detached and rolled somewhere. They can
  only beep sadly.
- **Character focus:** Sprocket
- **Commands (Track A):** `ls` deep, `cat` for clues, **`touch`** to leave a
  "found it" marker
- **Concept (Track B):** *inference* — "clues in one place tell you where
  to look next"
- **Vocabulary:** clue, marker, empty file, trail
- **Hook:** "Ever played hide and seek where 'warmer' and 'colder' clues
  pointed the way? Sprocket's tail left a clue trail just like that."
- **Real World Moment:** "Scientists, detectives, even doctors use clues
  to figure out where to look next. One clue leads to another. That's
  called **inference** — figuring something out from what you already know."
- **Transfer question:** "Can you think of a time you figured something
  out from a clue?"
- **Puzzle shape:**
  1. Read clues across garage and workbench (reuses Act 1 skills)
  2. Each clue points to the next location
  3. Find the tail in a new location (garden/shed/spare-parts/)
  4. `touch` a marker file to say "claimed!"
  5. Flag trigger: the marker file exists

**Story beat:** "Sprocket's tail fell off again. Pip says 'the last time
this happened it rolled all the way to the garden shed.' Sprocket is
beeping sadly — can you help track it down?"

**Sprocket caption** on `touch`: "beep!" → *touch = make an empty file*

---

## Mission 06 — The Welcome Sign

- **Location:** workshop (any room, player's choice — but canon is front door)
- **Problem:** Pip wants to make a welcome sign for a visitor (a hint at
  the Act 3 arrival)
- **Character focus:** Pip
- **Commands (Track A):** **`echo > file`** (write text into a new file)
- **Concept (Track B):** *writing data* — "words on a screen become words
  stored forever"
- **Vocabulary:** write, contents, save, message
- **Hook:** "When you write your name on your homework, that writing stays
  there the whole year. On a computer, we do the same thing — we take
  words and save them somewhere."
- **Real World Moment:** "Every note you save on a phone, every sign
  someone hangs on a door, every label on a box — those are all the same
  idea as `echo > welcome.txt`. Take some words. Put them in a place.
  Now other people can read them."
- **Transfer question:** "If you could put a sign on your door, what would
  it say?"
- **Puzzle shape:**
  1. Explore to find out what the sign should say (hint file says
     "make it SHORT and HAPPY")
  2. `echo "WELCOME" > welcome.txt` at workshop root
  3. `cat welcome.txt` to check
  4. Flag trigger: file exists AND contains the right text

**Story beat:** "Pip has a surprise planned — someone special is visiting
soon. 'Could you make the welcome sign?' Pip asks. 'Keep it SHORT and HAPPY.'"

**Sprocket caption** on first `echo >`: "beep-boop!" → *echo writes words
into a file*

---

## Act 2 capstone moment

After M6: Captain Rex inspects the player's work. Sprocket has a room, a
tail, and there's a welcome sign at the door. "Mm. Tinker badge. Earned."
Hint at Act 3: "Now — about that visitor..."
