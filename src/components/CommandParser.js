/**
 * Parse and execute commands against a virtual filesystem.
 * Returns { output: string, command: string, args: string[], flags?: object }
 */

const HELP_TEXT = `Available commands:
  pwd      Where am I?
  ls       What's in here?       (ls -a shows hidden files)
  cd       Go to a room          (cd workshop)
  cat      Read a file           (cat readme.txt)
  file     What kind of file?    (file mystery)
  find     Search the tree       (find . -name "*.txt")
  grep     Search inside a file  (grep FLAG data.txt)
  base64   Decode base64         (base64 -d secret)
  strings  Pull readable text    (strings binary)
  mkdir    Build a new room      (mkdir my-stuff)
  man      Learn about a command (man ls)
  help     Show this list
  clear    Clear the screen

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
       ls -a            (also show hidden dotfiles)
       ls [room-name]

Example:
  > ls
  toolbox/  kitchen/  readme.txt
  > ls -a
  .secret  toolbox/  kitchen/  readme.txt`,

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

  file: `FILE - Identify a File

Looks at a file and tells you what KIND of thing it is.
Text? A picture? Mystery binary? Use this before opening
something you don't recognize.

Usage: file [path]
       file *           (everything in this room)

Example:
  > file mystery
  mystery: ASCII text`,

  find: `FIND - Search the Filesystem

Walks through every room from where you are and prints
files that match what you're looking for. Real hackers
use this all the time.

Usage: find [path] -name "[pattern]"
       find [path] -size [bytes]c
       find [path] -type f|d

Example:
  > find . -name "*.txt"
  ./workshop/readme.txt
  > find . -size 1033c
  ./inhere/maybepasswd`,

  grep: `GREP - Search Inside a File

Reads a file and prints only the lines that contain
your pattern. Lifesaver for finding ONE line in a sea
of text.

Usage: grep [pattern] [filename]

Example:
  > grep FLAG data.txt
  hidden line: FLAG{hello}`,

  base64: `BASE64 - Decode Base64

Base64 is a way to disguise text as a string of letters
and digits. CTF puzzles love it. Use -d to flip it back.

Usage: base64 -d [filename]
       base64 --decode [filename]

Example:
  > base64 -d encoded
  FLAG{decoded_at_last}`,

  strings: `STRINGS - Pull Readable Text

Some files look like nonsense (binaries, images) but
they have readable text hidden inside. strings shows
you only the printable bits.

Usage: strings [filename]

Example:
  > strings mystery
  GIF89a
  FLAG{found_in_the_noise}`,

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

/**
 * Tokenize an input line into tokens. Respects double-quoted strings,
 * single-quoted strings, and backslash escapes. Whitespace splits tokens.
 * Returns array of strings; quoted strings keep their internal whitespace.
 */
export function tokenize(input) {
  const tokens = []
  let current = ''
  let quote = null // '"' | "'" | null
  let escape = false
  for (let i = 0; i < input.length; i++) {
    const ch = input[i]
    if (escape) {
      current += ch
      escape = false
      continue
    }
    if (ch === '\\' && quote !== "'") {
      escape = true
      continue
    }
    if (quote) {
      if (ch === quote) {
        quote = null
        continue
      }
      current += ch
      continue
    }
    if (ch === '"' || ch === "'") {
      quote = ch
      continue
    }
    if (/\s/.test(ch)) {
      if (current.length > 0) {
        tokens.push(current)
        current = ''
      }
      continue
    }
    current += ch
  }
  if (current.length > 0) tokens.push(current)
  return tokens
}

/**
 * Separate flags from positional args. A flag starts with `-` and is NOT
 * a path (paths can also start with `-` like `./-`, but not `--` or `-x`
 * where x is a letter and the next char is a path-separator-friendly thing).
 *
 * For arcade scope: flags are `-x` (single letter) or `--word` (long form).
 * Anything else starting with `-` is treated as a path so `cat -` and
 * `cat ./-` both work.
 */
function splitFlagsAndArgs(tokens) {
  const flags = {}
  const args = []
  for (const t of tokens) {
    const isShortFlag = /^-[A-Za-z]$/.test(t)
    const isLongFlag = /^--[A-Za-z][A-Za-z0-9-]*$/.test(t)
    if (isShortFlag) {
      flags[t.slice(1)] = true
    } else if (isLongFlag) {
      flags[t.slice(2)] = true
    } else {
      args.push(t)
    }
  }
  return { flags, args }
}

function classifyContent(text) {
  if (text == null) return 'data'
  if (text.length === 0) return 'empty'
  let printable = 0
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i)
    // printable ASCII range + tab/newline/CR
    if ((code >= 0x20 && code < 0x7f) || code === 0x09 || code === 0x0a || code === 0x0d) {
      printable++
    }
  }
  const ratio = printable / text.length
  if (ratio > 0.95) return 'ASCII text'
  if (ratio > 0.7) return 'data with text'
  return 'data'
}

function extractPrintableRuns(text, minLen = 4) {
  const runs = []
  let buf = ''
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i)
    const isPrintable = (code >= 0x20 && code < 0x7f) || code === 0x09
    if (isPrintable) {
      buf += text[i]
    } else {
      if (buf.length >= minLen) runs.push(buf)
      buf = ''
    }
  }
  if (buf.length >= minLen) runs.push(buf)
  return runs
}

export function executeCommand(input, fs) {
  const trimmed = input.trim()
  if (!trimmed) return null

  const tokens = tokenize(trimmed)
  if (tokens.length === 0) return null
  const command = tokens[0].toLowerCase()
  const rest = tokens.slice(1)
  const { flags, args } = splitFlagsAndArgs(rest)
  const arg = args[0]

  switch (command) {
    case 'pwd': {
      return { output: fs.pwd(), command, args, flags }
    }

    case 'ls': {
      const all = !!(flags.a || flags.all)
      const result = fs.ls(arg, { all })
      if (result.error) return { output: result.error, command, args, flags, isError: true }
      const entries = result.entries.map(({ name, isDir }) => isDir ? `${name}/` : name)
      return { output: entries.join('  ') || '(empty)', command, args, flags }
    }

    case 'cd': {
      const result = fs.cd(arg)
      if (result.error) return { output: result.error, command, args, flags, isError: true }
      return { output: `Moved to ${fs.pwd()}`, command, args, flags }
    }

    case 'cat': {
      const result = fs.cat(arg)
      if (result.error) return { output: result.error, command, args, flags, isError: true }
      return { output: result.content, command, args, flags }
    }

    case 'file': {
      if (!arg) return { output: 'Which file? Like: file mystery', command, args, flags, isError: true }
      // Support multiple paths: `file a b c`
      const lines = []
      for (const p of args) {
        const stat = fs.stat(p)
        if (stat.error) {
          lines.push(`${p}: cannot open (${stat.error})`)
          continue
        }
        if (stat.type === 'dir') {
          lines.push(`${p}: directory`)
          continue
        }
        const node = fs.cat(p)
        const kind = classifyContent(node.content)
        lines.push(`${p}: ${kind}`)
      }
      return { output: lines.join('\n'), command, args, flags }
    }

    case 'find': {
      const path = arg || '.'
      // Predicates come from flags + their following positional values.
      // Re-tokenize to keep order so `-name "*.txt"` and `-size 1033c` work.
      const predicates = {}
      for (let i = 0; i < rest.length; i++) {
        const t = rest[i]
        if (t === '-name' && rest[i + 1] != null) {
          predicates.name = rest[++i]
        } else if (t === '-size' && rest[i + 1] != null) {
          const v = rest[++i]
          const m = /^(\d+)c?$/.exec(v)
          if (m) predicates.size = parseInt(m[1], 10)
        } else if (t === '-type' && rest[i + 1] != null) {
          predicates.type = rest[++i]
        }
      }
      const result = fs.find(path, predicates)
      if (result.error) return { output: result.error, command, args, flags, isError: true }
      return { output: result.results.join('\n') || '(no matches)', command, args, flags }
    }

    case 'grep': {
      if (args.length < 2) {
        return { output: 'Usage: grep PATTERN FILE', command, args, flags, isError: true }
      }
      const [pattern, filename] = args
      const result = fs.cat(filename)
      if (result.error) return { output: result.error, command, args, flags, isError: true }
      const matches = result.content.split('\n').filter(line => line.includes(pattern))
      return {
        output: matches.length ? matches.join('\n') : '(no match)',
        command, args, flags,
      }
    }

    case 'base64': {
      if (!flags.d && !flags.decode) {
        return {
          output: 'This arcade only supports decoding. Try: base64 -d FILE',
          command, args, flags, isError: true,
        }
      }
      if (!arg) return { output: 'Which file? Like: base64 -d secret', command, args, flags, isError: true }
      const result = fs.cat(arg)
      if (result.error) return { output: result.error, command, args, flags, isError: true }
      try {
        // atob is available in browsers and modern bun/node
        const decoded = atob(result.content.trim())
        return { output: decoded, command, args, flags }
      } catch {
        return { output: `base64: ${arg}: invalid base64 input`, command, args, flags, isError: true }
      }
    }

    case 'strings': {
      if (!arg) return { output: 'Which file? Like: strings mystery', command, args, flags, isError: true }
      const result = fs.cat(arg)
      if (result.error) return { output: result.error, command, args, flags, isError: true }
      const runs = extractPrintableRuns(result.content)
      return {
        output: runs.length ? runs.join('\n') : '(no printable strings found)',
        command, args, flags,
      }
    }

    case 'mkdir': {
      const result = fs.mkdir(arg)
      if (result.error) return { output: result.error, command, args, flags, isError: true }
      return { output: result.message, command, args, flags }
    }

    case 'man': {
      if (!arg) {
        return { output: 'What command do you want to learn about? Try: man ls', command, args, flags, isError: true }
      }
      const page = MAN_PAGES[arg.toLowerCase()]
      if (page) {
        return { output: page, command, args, flags }
      }
      return { output: `No manual for "${arg}". Try: man ls, man cd, man cat`, command, args, flags, isError: true }
    }

    case 'help': {
      return { output: HELP_TEXT, command, args, flags }
    }

    case 'clear': {
      return { output: '__CLEAR__', command, args, flags }
    }

    default: {
      return {
        output: `Hmm, I don't know that one yet. Try help to see what you can do!`,
        command,
        args,
        flags,
        isError: true,
      }
    }
  }
}
