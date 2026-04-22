import { describe, test, expect } from 'vitest'
import { createFileSystem } from '../../src/components/FileSystem.js'
import { executeCommand, tokenize } from '../../src/components/CommandParser.js'

function makeFs() {
  return createFileSystem({
    workshop: {
      'readme.txt': 'hello world',
      toolbox: { 'hammer.txt': 'a hammer' },
    },
  })
}

describe('executeCommand: empty input', () => {
  test('empty string returns null', () => {
    expect(executeCommand('', makeFs())).toBeNull()
  })

  test('whitespace only returns null', () => {
    expect(executeCommand('   ', makeFs())).toBeNull()
  })
})

describe('executeCommand: pwd', () => {
  test('returns current path', () => {
    const fs = makeFs()
    const result = executeCommand('pwd', fs)
    expect(result.output).toBe('/')
    expect(result.command).toBe('pwd')
  })
})

describe('executeCommand: ls', () => {
  test('tags directories with trailing slash', () => {
    const fs = makeFs()
    const result = executeCommand('ls', fs)
    expect(result.output).toContain('workshop/')
    expect(result.isError).toBeFalsy()
  })

  test('files have no trailing slash', () => {
    const fs = makeFs()
    fs.cd('workshop')
    const result = executeCommand('ls', fs)
    expect(result.output).toContain('readme.txt')
    expect(result.output).not.toContain('readme.txt/')
  })

  test('empty dir shows (empty)', () => {
    const fs = createFileSystem({ empty: {} })
    fs.cd('empty')
    expect(executeCommand('ls', fs).output).toBe('(empty)')
  })

  test('ls on nonexistent returns friendly error', () => {
    const fs = makeFs()
    const result = executeCommand('ls nope', fs)
    expect(result.isError).toBe(true)
  })
})

describe('executeCommand: cd', () => {
  test('successful cd reports new location', () => {
    const fs = makeFs()
    const result = executeCommand('cd workshop', fs)
    expect(result.output).toContain('/workshop')
    expect(result.isError).toBeFalsy()
  })

  test('failed cd is flagged as error', () => {
    const fs = makeFs()
    const result = executeCommand('cd nope', fs)
    expect(result.isError).toBe(true)
  })
})

describe('executeCommand: cat', () => {
  test('reads file', () => {
    const fs = makeFs()
    fs.cd('workshop')
    const result = executeCommand('cat readme.txt', fs)
    expect(result.output).toBe('hello world')
  })

  test('missing file is an error', () => {
    const fs = makeFs()
    const result = executeCommand('cat nope.txt', fs)
    expect(result.isError).toBe(true)
  })
})

describe('executeCommand: mkdir', () => {
  test('creates room', () => {
    const fs = makeFs()
    fs.cd('workshop')
    const result = executeCommand('mkdir hideout', fs)
    expect(result.output).toContain('hideout')
    expect(result.isError).toBeFalsy()
  })

  test('missing name is an error', () => {
    const result = executeCommand('mkdir', makeFs())
    expect(result.isError).toBe(true)
  })
})

describe('executeCommand: help', () => {
  test('help lists commands', () => {
    const result = executeCommand('help', makeFs())
    expect(result.output).toContain('pwd')
    expect(result.output).toContain('ls')
    expect(result.output).toContain('cd')
  })
})

describe('executeCommand: man', () => {
  test('man ls shows usage', () => {
    const result = executeCommand('man ls', makeFs())
    expect(result.output.toLowerCase()).toContain('list')
  })

  test('man without arg is an error', () => {
    const result = executeCommand('man', makeFs())
    expect(result.isError).toBe(true)
  })

  test('man for unknown command is an error', () => {
    const result = executeCommand('man xyzzy', makeFs())
    expect(result.isError).toBe(true)
  })
})

describe('executeCommand: clear', () => {
  test('returns __CLEAR__ sentinel', () => {
    const result = executeCommand('clear', makeFs())
    expect(result.output).toBe('__CLEAR__')
  })
})

describe('executeCommand: unknown command', () => {
  test('friendly error (no "command not found")', () => {
    const result = executeCommand('xyzzy', makeFs())
    expect(result.isError).toBe(true)
    expect(result.output.toLowerCase()).not.toContain('command not found')
    expect(result.output).toMatch(/don'?t know|hmm/i)
  })
})

describe('tokenize: quoting and escapes', () => {
  test('plain whitespace split', () => {
    expect(tokenize('cat readme')).toEqual(['cat', 'readme'])
  })
  test('double-quoted argument with spaces', () => {
    expect(tokenize('cat "spaces in name"')).toEqual(['cat', 'spaces in name'])
  })
  test('single-quoted argument with spaces', () => {
    expect(tokenize("cat 'spaces in name'")).toEqual(['cat', 'spaces in name'])
  })
  test('backslash escapes whitespace', () => {
    expect(tokenize('cat spaces\\ in\\ name')).toEqual(['cat', 'spaces in name'])
  })
})

describe('executeCommand: ls -a (hidesDotfiles)', () => {
  test('plain ls hides dotfiles when hidesDotfiles is true', () => {
    const fs = createFileSystem({ '.secret': 'x', readme: 'y' }, { hidesDotfiles: true })
    const r = executeCommand('ls', fs)
    expect(r.output).toContain('readme')
    expect(r.output).not.toContain('.secret')
  })
  test('ls -a shows dotfiles when hidesDotfiles is true', () => {
    const fs = createFileSystem({ '.secret': 'x', readme: 'y' }, { hidesDotfiles: true })
    const r = executeCommand('ls -a', fs)
    expect(r.output).toContain('.secret')
    expect(r.output).toContain('readme')
  })
  test('plain ls still shows dotfiles when hidesDotfiles is false (default)', () => {
    const fs = createFileSystem({ '.secret': 'x', readme: 'y' })
    const r = executeCommand('ls', fs)
    expect(r.output).toContain('.secret')
  })
})

describe('executeCommand: cat ./- (file named dash)', () => {
  test('reads a file literally named "-" via ./-', () => {
    const fs = createFileSystem({ '-': 'flag inside dash' })
    const r = executeCommand('cat ./-', fs)
    expect(r.output).toBe('flag inside dash')
  })
})

describe('executeCommand: file', () => {
  test('classifies ASCII text', () => {
    const fs = createFileSystem({ readme: 'hello world\n' })
    const r = executeCommand('file readme', fs)
    expect(r.output).toContain('ASCII text')
  })
  test('classifies binary-ish data', () => {
    const fs = createFileSystem({ binary: '\x01\x02\x03\x04\x05\x06\x07\x08\x0b\x0c\x0e\x0f' })
    const r = executeCommand('file binary', fs)
    expect(r.output).toContain('data')
  })
  test('handles directories', () => {
    const fs = createFileSystem({ workshop: { readme: 'x' } })
    const r = executeCommand('file workshop', fs)
    expect(r.output).toContain('directory')
  })
})

describe('executeCommand: find', () => {
  test('-name glob matches', () => {
    const fs = createFileSystem({
      a: 'hi', b: 'hi', c: { 'note.txt': 'yo', 'other.md': 'no' },
    })
    const r = executeCommand('find . -name "*.txt"', fs)
    expect(r.output).toContain('/c/note.txt')
    expect(r.output).not.toContain('other.md')
  })
  test('-size matches exact byte count', () => {
    const fs = createFileSystem({ a: 'abc', b: 'abcd', c: 'ab' })
    const r = executeCommand('find . -size 3c', fs)
    expect(r.output).toContain('/a')
    expect(r.output).not.toContain('/b')
    expect(r.output).not.toContain('/c')
  })
  test('no matches returns "(no matches)"', () => {
    const fs = createFileSystem({ a: 'hi' })
    const r = executeCommand('find . -name "*.xyz"', fs)
    expect(r.output).toBe('(no matches)')
  })
})

describe('executeCommand: grep', () => {
  test('returns matching lines only', () => {
    const fs = createFileSystem({ data: 'one\nFLAG{abc}\nthree\n' })
    const r = executeCommand('grep FLAG data', fs)
    expect(r.output).toBe('FLAG{abc}')
  })
  test('no match returns sentinel', () => {
    const fs = createFileSystem({ data: 'one\ntwo\n' })
    const r = executeCommand('grep nope data', fs)
    expect(r.output).toBe('(no match)')
  })
  test('missing args is an error', () => {
    const r = executeCommand('grep', makeFs())
    expect(r.isError).toBe(true)
  })
})

describe('executeCommand: base64 -d', () => {
  test('decodes a valid base64 file', () => {
    // "FLAG{base64_works}\n" -> base64
    const fs = createFileSystem({ encoded: 'RkxBR3tiYXNlNjRfd29ya3N9Cg==\n' })
    const r = executeCommand('base64 -d encoded', fs)
    expect(r.output).toContain('FLAG{base64_works}')
  })
  test('without -d flag is an error', () => {
    const fs = createFileSystem({ encoded: 'aGVsbG8=' })
    const r = executeCommand('base64 encoded', fs)
    expect(r.isError).toBe(true)
  })
  test('invalid base64 surfaces an error', () => {
    const fs = createFileSystem({ junk: 'this is not base64 !!!' })
    const r = executeCommand('base64 -d junk', fs)
    expect(r.isError).toBe(true)
  })
})

describe('executeCommand: strings', () => {
  test('extracts printable runs from binary noise', () => {
    const noise = '\x01\x02\x03'
    const content = noise + 'FLAG{visible}' + noise + 'short' + noise
    const fs = createFileSystem({ mystery: content })
    const r = executeCommand('strings mystery', fs)
    expect(r.output).toContain('FLAG{visible}')
    expect(r.output).toContain('short')
  })
  test('runs shorter than the threshold are dropped', () => {
    const fs = createFileSystem({ tiny: '\x01a\x01' })
    const r = executeCommand('strings tiny', fs)
    expect(r.output).toBe('(no printable strings found)')
  })
})
