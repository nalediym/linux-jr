export const MISSION_THE_MAZE = {
  id: 'the-maze',
  title: 'The Maze',
  story: "Captain Rex's log: Pip took Sprocket down to the basement and got a bit turned around. Sprocket is beeping from somewhere deep. Each room has a clue — would you help us find them?",
  audio: {
    intro: 'mission-03-intro',
    complete: 'mission-03-complete',
  },
  filesystem: {
    basement: {
      '.hint': 'Hint: The maze entrance is just ahead. Type: cd entrance',
      entrance: {
        '.hint': 'Hint: Read the note! It tells you which way to go first.',
        'sign.txt': 'WELCOME TO THE MAZE\nRule 1: Read the notes.\nRule 2: Go back with cd ..\nRule 3: Pip is waiting at the end!',
        'note.txt': 'The first step is always LEFT. (Try: cd left)',
        left: {
          '.hint': 'Hint: Read the note. It says which direction to go next.',
          'note.txt': 'Good choice! You hear Pip giggling and Sprocket beeping somewhere deeper.\nGo DOWN from here.',
          right: {
            '.hint': 'Hint: Dead end! Use "cd .." to go back.',
            'note.txt': 'Dead end! Just a spider. Go back with: cd ..',
            '.spider.txt': 'The spider waves at you. Hi spider!',
          },
          down: {
            'note.txt': 'A fork in the path! One way smells like cookies, the other like old socks.\nThe COOKIE smell is RIGHT.',
            left: {
              'note.txt': 'Eww! Old socks! This is a dead end.\nGo back: cd ..',
              'old-sock.txt': 'A very stinky sock. Definitely not where Pip is.',
            },
            right: {
              'note.txt': 'The cookies smell stronger! You must be getting close.\nKeep going DOWN.',
              down: {
                'note.txt': 'Almost there! You can hear Pip singing.\nThey are hiding in the SECRET room. Look carefully...',
                '.secret': {
                  'pip.txt': 'FLAG{pip_found}\n\n"You FOUND us!" says Pip.\n"Sprocket was down here the whole time — beep-boop!"\n"That was the best maze ever! Let\'s do it again!"\n\nPip gives you a high five!',
                  'cookies.txt': 'A plate of fresh chocolate chip cookies. Pip was snacking while they waited!',
                },
                'empty-room.txt': 'Nothing here but echoes. The secret room must be hidden...',
              },
            },
          },
        },
        right: {
          'note.txt': 'Oops! A wall. This is not the way.\nTry going LEFT instead. Use: cd ..',
          'wall.txt': 'Just a brick wall with "Pip woz here" scratched into it.',
        },
      },
      'readme.txt': 'The maze entrance is just ahead. Type: cd entrance',
    },
  },
  tasks: [
    {
      description: 'Enter the maze (try: cd entrance)',
      audio: 'mission-03-task-01',
      check: { type: 'pwd_equals', path: '/basement/entrance' },
    },
    {
      description: 'Read the sign and find which way to go first',
      audio: 'mission-03-task-02',
      check: { type: 'pwd_equals', path: '/basement/entrance/left' },
    },
    {
      description: 'Keep following the clues deeper into the maze',
      audio: 'mission-03-task-03',
      check: { type: 'pwd_equals', path: '/basement/entrance/left/down' },
    },
    {
      description: 'Which way smells like cookies? Follow your nose!',
      audio: 'mission-03-task-04',
      check: { type: 'pwd_equals', path: '/basement/entrance/left/down/right' },
    },
    {
      description: 'Almost there! Keep going deeper...',
      audio: 'mission-03-task-05',
      check: { type: 'pwd_equals', path: '/basement/entrance/left/down/right/down' },
    },
    {
      description: 'Pip is in a SECRET room. Hidden things start with a dot... (try: ls)',
      audio: 'mission-03-task-06',
      check: { type: 'output_contains', text: 'FLAG{pip_found}' },
    },
  ],
}
