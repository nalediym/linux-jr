import { describe, test, expect } from 'vitest'
import { createFileSystem } from '../../src/components/FileSystem.js'
import { executeCommand } from '../../src/components/CommandParser.js'

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
