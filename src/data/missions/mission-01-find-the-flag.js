export const MISSION_FIND_THE_FLAG = {
  id: 'find-the-flag',
  title: 'The Missing Blueprint',
  story: "Bingo hid a secret blueprint somewhere in the workshop. She says it's in a room you can't see at first. Can you find it?",
  // Audio key for pre-generated ElevenLabs narration (falls back to TTS if missing)
  audio: {
    intro: 'mission-01-intro',
    complete: 'mission-01-complete',
  },
  filesystem: {
    workshop: {
      '.hint': 'Hint: Use "ls" to see rooms, "cd" to enter one. The blueprint is hidden somewhere secret...',
      toolbox: {
        '.hint': 'Hint: Nothing secret here. Try a different room — maybe one that sounds... secret?',
        'hammer.txt': 'Just a regular hammer. Nothing special here.',
        'screwdriver.txt': 'A Phillips head screwdriver. Not what we need.',
        'readme.txt': 'Welcome to the toolbox! Try looking in other rooms too.',
      },
      kitchen: {
        '.hint': 'Hint: No blueprints in the kitchen. Try "cd .." to go back.',
        'recipe.txt': 'Bluey pancakes: flour, eggs, blue food coloring. Yum!',
        'shopping-list.txt': 'Bananas, milk, and... wait, this is not a blueprint.',
      },
      'secret-room': {
        '.hint': 'Hint: Hidden files start with a dot. Use "ls" and look carefully at EVERY name...',
        '.hidden-blueprint.txt': 'FLAG{you_found_it_hacker}\n\nBingo\'s secret blueprint for a robot dog!\nGreat work finding this hidden file!',
        'note.txt': 'Bingo was here! The really secret stuff starts with a dot...',
      },
      'readme.txt': 'Welcome to the workshop! Look around using ls and cd into rooms.',
    },
  },
  tasks: [
    {
      description: 'Figure out where you are (try: pwd)',
      audio: 'mission-01-task-01',
      check: { type: 'command_used', command: 'pwd' },
    },
    {
      description: 'Look around the workshop (try: ls)',
      audio: 'mission-01-task-02',
      check: { type: 'command_used', command: 'ls' },
    },
    {
      description: 'Go into the workshop first (try: cd workshop)',
      audio: 'mission-01-task-03a',
      check: { type: 'pwd_equals', path: '/workshop' },
    },
    {
      description: 'Now explore the secret room (try: cd secret-room)',
      audio: 'mission-01-task-03',
      check: { type: 'pwd_equals', path: '/workshop/secret-room' },
    },
    {
      description: 'Find the hidden blueprint (look for files starting with a dot...)',
      audio: 'mission-01-task-04',
      check: { type: 'output_contains', text: 'FLAG{' },
    },
  ],
}
