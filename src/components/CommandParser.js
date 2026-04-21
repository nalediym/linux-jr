/**
 * Parse and execute commands against a virtual filesystem.
 * Returns { output: string, command: string, args: string[] }
 */

const HELP_TEXT = `Available commands:
  pwd     Where am I?
  ls      What's in here?
  cd      Go to a room        (cd workshop)
  cat     Read a file          (cat readme.txt)
  mkdir   Build a new room     (mkdir my-stuff)
  man     Learn about a command (man ls)
  help    Show this list
  clear   Clear the screen

Tip: Press TAB to auto-complete filenames!`

const MAN_PAGES = {
  pwd: `PWD - Print Working Directory

Shows you WHERE you are right now.
Think of it like asking "What room am I in?"

Usage: pwd

Example:
  > pwd
  /workshop/toolbox`,

  ls: `LS - List

Shows you WHAT is in the current room.
Files and folders will be listed. Folders end with /
Files that start with a dot (.) are hidden secrets!

Usage: ls
       ls [room-name]

Example:
  > ls
  toolbox/  kitchen/  readme.txt`,

  cd: `CD - Change Directory

MOVES you to a different room.
Use "cd .." to go BACK to the previous room.

Usage: cd [room-name]
       cd ..

Example:
  > cd toolbox
  Moved to /workshop/toolbox
  > cd ..
  Moved to /workshop`,

  cat: `CAT - Read a File

Opens a file and shows you what is inside.
This is how you read clues, notes, and secrets!

Usage: cat [filename]

Example:
  > cat readme.txt
  Welcome to the workshop!`,

  mkdir: `MKDIR - Make Directory

Builds a brand new room! You name it.

Usage: mkdir [room-name]

Example:
  > mkdir my-hideout
  Created room: my-hideout`,

  man: `MAN - Manual

Shows you how to use any command.
You are reading a man page right now!

Usage: man [command]

Example:
  > man ls
  (shows how ls works)`,

  help: `HELP - Help

Shows the list of all available commands.

Usage: help`,

  clear: `CLEAR - Clear Screen

Wipes the screen clean. Your progress is NOT lost.

Usage: clear`,
}

export function executeCommand(input, fs) {
  const trimmed = input.trim()
  if (!trimmed) return null

  const parts = trimmed.split(/\s+/)
  const command = parts[0].toLowerCase()
  const args = parts.slice(1)
  const arg = args[0]

  switch (command) {
    case 'pwd': {
      return { output: fs.pwd(), command, args }
    }

    case 'ls': {
      const result = fs.ls(arg)
      if (result.error) return { output: result.error, command, args, isError: true }
      const entries = result.entries.map(name => {
        // Check if directory or file by trying to ls it
        const path = arg ? `${arg}/${name}` : name
        const child = fs.ls(path)
        const isDir = child.entries !== undefined
        return isDir ? `${name}/` : name
      })
      return { output: entries.join('  ') || '(empty)', command, args }
    }

    case 'cd': {
      const result = fs.cd(arg)
      if (result.error) return { output: result.error, command, args, isError: true }
      return { output: `Moved to ${fs.pwd()}`, command, args }
    }

    case 'cat': {
      const result = fs.cat(arg)
      if (result.error) return { output: result.error, command, args, isError: true }
      return { output: result.content, command, args }
    }

    case 'mkdir': {
      const result = fs.mkdir(arg)
      if (result.error) return { output: result.error, command, args, isError: true }
      return { output: result.message, command, args }
    }

    case 'man': {
      if (!arg) {
        return { output: 'What command do you want to learn about? Try: man ls', command, args, isError: true }
      }
      const page = MAN_PAGES[arg.toLowerCase()]
      if (page) {
        return { output: page, command, args }
      }
      return { output: `No manual for "${arg}". Try: man ls, man cd, man cat`, command, args, isError: true }
    }

    case 'help': {
      return { output: HELP_TEXT, command, args }
    }

    case 'clear': {
      return { output: '__CLEAR__', command, args }
    }

    default: {
      return {
        output: `Hmm, I don't know that one yet. Try help to see what you can do!`,
        command,
        args,
        isError: true,
      }
    }
  }
}
