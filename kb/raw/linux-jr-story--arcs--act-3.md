# Act 3 — Combine

**Theme:** The player uses everything they've learned in combination.
Missions don't introduce new commands (mostly); they introduce complexity
and responsibility.

**Ethos beat:** "Full ethical hacker: curious, clever, kind."

**Commands introduced:** `help`, `man`, maybe one small new thing per
mission (`rm`? `mv`? — tentative, Nick Jr. makes `rm` nervous. Substitute
with a "recycle" mechanic?).

**Emotional beat:** "I can do big things by putting small things together
— and I always do the right thing."

**Badge earned:** **White Hat** (the full ethical hacker — curious, clever,
kind. The player is now a proper friend of the workshop AND someone who
uses these powers well.)

**Season-arc payoff:** A neighbor-kid character (briefly introduced by name
in M6's "visitor" hint) arrives. The player helps them the way Pip and
Captain Rex helped the player.

---

## Mission 07 — The Big Clean-Up

- **Location:** workshop-wide (touches kitchen, garage, garden)
- **Problem:** Too many scattered `.todo.txt` notes from Pip. Can the
  player find and read them all?
- **Character focus:** Pip
- **Commands (Track A):** combo — recursive `cd`+`ls`, `cat` each
- **Concept (Track B):** *search strategy* — "when something's spread out,
  how do you hunt systematically?"
- **Vocabulary:** search, systematic, thorough, find
- **Hook:** "Have you ever had to find ALL of something — all your Legos,
  all your socks, all your stickers? You can search randomly, or you can
  go room by room. One way is faster."
- **Real World Moment:** "Going one room at a time is called **systematic
  search**. Librarians, scientists, and cleaners all do it. The opposite
  is running around hoping. Hoping is slower!"
- **Transfer question:** "Next time you have to find all of something,
  try going one place at a time. Did it work?"
- **Puzzle shape:** read all N hidden todo files across the workshop
- **New skill:** no new command, but first mission that requires breadth

---

## Mission 08 — The Recipe

- **Location:** kitchen + pantry + garden/greenhouse
- **Problem:** Captain Rex is baking for the visitor and the recipe is
  split across rooms
- **Character focus:** Captain Rex
- **Commands (Track A):** combo — `cat` multiple files, follow breadcrumbs,
  `echo >>` to append ingredients to a shopping list
- **Concept (Track B):** *assembly / algorithms* — "instructions in order =
  a recipe = an algorithm"
- **Vocabulary:** instruction, step, assemble, algorithm (optional, with
  kid paraphrase: "a recipe computers can follow")
- **Hook:** "Think of your favorite recipe. It's a list of stuff plus a
  list of steps in order. Mess up the order — put the frosting on before
  you bake — and you get a mess. Captain Rex's password recovery is
  the same idea."
- **Real World Moment:** "An **algorithm** is a fancy word for 'a recipe.'
  It's steps, in order, that turn stuff into other stuff. Your brain
  follows algorithms every time you brush your teeth or tie your shoes."
- **Transfer question:** "What's one algorithm you do every day without
  thinking about it?"
- **Puzzle shape:**
  1. Read partial recipe in kitchen
  2. Each ingredient references where the rest is ("see pantry/flour.txt")
  3. Assemble into a single notes file

**Story beat:** "Captain Rex is baking something for the visitor. 'The
recipe's a bit scattered,' he says. 'Would you help me pull it together?'"

---

## Mission 09 — Sprocket's Upgrade

- **Location:** workshop/garage/workbench + attic
- **Problem:** Sprocket wants better ears. Time to build them.
- **Character focus:** Sprocket + Pip
- **Commands (Track A):** combo — `mkdir` a project dir, `touch` files for
  parts, `echo >` plans into files
- **Concept (Track B):** *organization / design* — "think about the shape
  before you build"
- **Vocabulary:** project, structure, organize, plan
- **Hook:** "Before you build a Lego set, there's a picture on the box and
  a pile of sorted pieces. That's organization. It's half the build."
- **Real World Moment:** "Engineers, architects, even chefs organize
  BEFORE they start. A well-organized project is almost already done.
  A messy one is almost never finished."
- **Transfer question:** "What's one thing you could organize in your
  room that would make it easier to play with your stuff?"
- **Puzzle shape:** build up a project directory structure that mirrors a
  real workflow (plans/, parts/, notes/)

**Story beat:** "Sprocket's ears still don't swivel. Pip has a new design.
'Would you set up the project folder?' Pip asks. 'Just the shape — we'll
fill it in together.'"

---

## Mission 10 — The Visitor

- **Location:** workshop (all of it)
- **Problem:** A new kid is visiting and feels shy. Can the player show
  them around the workshop the way Pip and Captain Rex showed the player?
- **Character focus:** the player (now the guide), the visitor (new
  character: Juno), Pip and Captain Rex in supporting roles
- **Commands (Track A):** any of them — mission tests which one fits each ask
- **Concept (Track B):** *teaching is knowing* — "explaining to someone else
  proves you really understand"
- **Vocabulary:** explain, show, command (review of all commands), help
- **Hook:** "Have you ever tried to teach someone how to play your favorite
  game? It's harder than just playing, right? That's because teaching
  means you have to really, truly understand it."
- **Real World Moment:** "The deepest way to learn something is to teach
  it. Teachers, older kids, big cousins — they're learning too, every
  time they help someone younger. You just did that for Juno."
- **Transfer question:** "Who in your life could YOU teach one little
  thing to? A command? A trick? A song?"
- **Puzzle shape:** the visitor asks questions ("where do I put my bag?",
  "how do I find the cookies?") that each require a different command —
  player picks the right command for each ask

**Story beat:** "Juno is here for the first time. Everything is new to
them. 'Would you show them around?' Captain Rex asks. 'You remember what
it felt like to be new.'"

**This mission is also the Ethos Capstone** — every principle gets
surfaced in the guiding:
- ASK FIRST → the player asks Juno "what do you want to see?"
- HELP, NEVER HARM → nothing breaks, only welcome
- LOOK BEFORE YOU ACT → the player `ls`s each room for Juno before diving in
- SAY WHAT YOU DID → the player narrates each command
- CURIOSITY WITH KINDNESS → Juno is curious; the player meets it kindly

White Hat badge earned. Player becomes a true ethical hacker.

---

## Act 3 capstone / series outro

After M10: Pip, Captain Rex, Sprocket, and Juno all say thank you. Captain
Rex hands over the Workshop Key badge: "You're one of us now. Come back
anytime."

Hook for a hypothetical Act 4 / Season 2: Juno invites the player over to
their house next door, which has its own filesystem full of problems.

---

## Open for future

- `rm` / recycle bin mechanic (needs decision in age-register — currently
  avoided for Nick Jr. safety)
- Piping (`|`) — probably too abstract for age 7
- Permissions (`chmod`) — definitely too abstract
- Network metaphors — violate "no internet" setting rule
