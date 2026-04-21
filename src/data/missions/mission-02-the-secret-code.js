export const MISSION_SECRET_CODE = {
  id: 'secret-code',
  title: 'The Secret Code',
  story: "Someone locked Bandit's computer with a 4-digit code! The digits are hidden in files across the workshop. Find all four clues to crack the code.",
  audio: {
    intro: 'mission-02-intro',
    complete: 'mission-02-complete',
  },
  filesystem: {
    workshop: {
      '.hint': 'Hint: There are 4 digits hidden in files. Use "ls" to see rooms, "cd" to enter, "cat" to read files.',
      garage: {
        '.hint': 'Hint: Check every file in here. Also look inside the workbench room!',
        'toolbox.txt': 'Wrenches, spanners, and a note taped to the wall:\n"The FIRST digit is how many wheels on a bike."',
        'oil-can.txt': 'Just motor oil. Smells weird.',
        'workbench': {
          'plans.txt': 'Blueprint for a go-kart. The measurements are all in millimeters.',
          '.sticky-note.txt': 'Bingo wrote: "The THIRD digit is how many legs a dog has."',
        },
      },
      kitchen: {
        '.hint': 'Hint: Read the fridge note. Also check deep inside the pantry...',
        'fridge-note.txt': 'Mum wrote: "The SECOND digit is how many Heeler kids there are."',
        'recipe.txt': 'Chilli\'s famous dumplings recipe. Not a clue, just delicious.',
        pantry: {
          'snacks.txt': 'Chips, biscuits, and a juice box. No clues here.',
          'back-shelf.txt': 'Behind the cereal box, you find a tiny note:\n"The FOURTH digit is how many eyes you have."',
        },
      },
      study: {
        '.hint': 'Hint: The computer needs the code. Did you find all 4 digits? Think about the answers to each riddle!',
        'computer.txt': 'The screen says: ENTER 4-DIGIT CODE TO UNLOCK\nYou need to find all four digits first!',
        'bookshelf.txt': 'Books about rockets, dogs, and one called "Binary for Beginners". Interesting.',
        'desk-drawer.txt': 'Pencils, erasers, and a photo of Bluey and Bingo at the beach.',
      },
      'readme.txt': 'The workshop has three rooms: garage, kitchen, and study.\nThe code digits are hidden in files. Read everything!',
    },
  },
  tasks: [
    {
      description: 'Look around the workshop to find the rooms (try: ls)',
      audio: 'mission-02-task-01',
      check: { type: 'command_used', command: 'ls' },
    },
    {
      description: 'Find the FIRST digit (it is somewhere in the garage...)',
      audio: 'mission-02-task-02',
      check: { type: 'output_contains', text: 'FIRST digit' },
    },
    {
      description: 'Find the SECOND digit (try the kitchen...)',
      audio: 'mission-02-task-03',
      check: { type: 'output_contains', text: 'SECOND digit' },
    },
    {
      description: 'Find the THIRD digit (keep exploring the garage...)',
      audio: 'mission-02-task-04',
      check: { type: 'output_contains', text: 'THIRD digit' },
    },
    {
      description: 'Find the FOURTH digit (check every shelf...)',
      audio: 'mission-02-task-05',
      check: { type: 'output_contains', text: 'FOURTH digit' },
    },
    {
      description: 'Now go to the study and read the computer (cd study, then cat computer.txt)',
      audio: 'mission-02-task-06',
      check: { type: 'file_read', path: 'computer.txt' },
    },
  ],
  // Answer: 2-2-4-2 (bike wheels, Heeler kids, dog legs, eyes)
  // The kid has to piece it together from the clues!
}
