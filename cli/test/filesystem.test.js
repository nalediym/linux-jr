import { describe, test, expect } from 'vitest'
import { createFileSystem } from '../../src/components/FileSystem.js'

function makeTree() {
  return {
    workshop: {
      'readme.txt': 'hi',
      toolbox: { 'hammer.txt': 'a hammer' },
      'secret-room': { '.hidden.txt': 'FLAG{secret}' },
    },
  }
}

describe('FileSystem.pwd', () => {
  test('starts at root', () => {
    const fs = createFileSystem(makeTree())
    expect(fs.pwd()).toBe('/')
  })
})

describe('FileSystem.ls', () => {
  test('lists entries in cwd with dir tags', () => {
    const fs = createFileSystem(makeTree())
    const result = fs.ls()
    expect(result.error).toBeUndefined()
    expect(result.entries).toEqual([{ name: 'workshop', isDir: true }])
  })

  test('lists entries in subdirectory by explicit path', () => {
    const fs = createFileSystem(makeTree())
    fs.cd('workshop')
    const result = fs.ls()
    const names = result.entries.map(e => e.name).sort()
    expect(names).toEqual(['readme.txt', 'secret-room', 'toolbox'])
    const readme = result.entries.find(e => e.name === 'readme.txt')
    expect(readme.isDir).toBe(false)
    const toolbox = result.entries.find(e => e.name === 'toolbox')
    expect(toolbox.isDir).toBe(true)
  })

  test('includes dotfiles by default', () => {
    const fs = createFileSystem(makeTree())
    fs.cd('/workshop/secret-room')
    const names = fs.ls().entries.map(e => e.name)
    expect(names).toContain('.hidden.txt')
  })

  test('returns error for nonexistent path', () => {
    const fs = createFileSystem(makeTree())
    const result = fs.ls('/nope')
    expect(result.error).toBeDefined()
  })

  test('returns error when target is a file', () => {
    const fs = createFileSystem(makeTree())
    fs.cd('workshop')
    const result = fs.ls('readme.txt')
    expect(result.error).toBeDefined()
  })
})

describe('FileSystem.cd', () => {
  test('empty arg returns friendly error', () => {
    const fs = createFileSystem(makeTree())
    const result = fs.cd()
    expect(result.error).toBeDefined()
  })

  test('cd into directory updates pwd', () => {
    const fs = createFileSystem(makeTree())
    expect(fs.cd('workshop').ok).toBe(true)
    expect(fs.pwd()).toBe('/workshop')
  })

  test('cd to absolute path', () => {
    const fs = createFileSystem(makeTree())
    fs.cd('workshop')
    fs.cd('/workshop/toolbox')
    expect(fs.pwd()).toBe('/workshop/toolbox')
  })

  test('cd .. goes up one level', () => {
    const fs = createFileSystem(makeTree())
    fs.cd('workshop')
    fs.cd('toolbox')
    expect(fs.pwd()).toBe('/workshop/toolbox')
    fs.cd('..')
    expect(fs.pwd()).toBe('/workshop')
  })

  test('cd .. at root stays at root', () => {
    const fs = createFileSystem(makeTree())
    fs.cd('..')
    expect(fs.pwd()).toBe('/')
  })

  test('cd to nonexistent returns friendly error', () => {
    const fs = createFileSystem(makeTree())
    const result = fs.cd('nope')
    expect(result.error).toBeDefined()
    expect(result.error.toLowerCase()).not.toContain('enoent')
  })

  test('cd into a file returns friendly error', () => {
    const fs = createFileSystem(makeTree())
    fs.cd('workshop')
    const result = fs.cd('readme.txt')
    expect(result.error).toBeDefined()
  })
})

describe('FileSystem.cat', () => {
  test('reads file content', () => {
    const fs = createFileSystem(makeTree())
    fs.cd('workshop')
    expect(fs.cat('readme.txt').content).toBe('hi')
  })

  test('missing arg returns friendly error', () => {
    const fs = createFileSystem(makeTree())
    expect(fs.cat().error).toBeDefined()
  })

  test('nonexistent file returns friendly error', () => {
    const fs = createFileSystem(makeTree())
    expect(fs.cat('nope.txt').error).toBeDefined()
  })

  test('cat on directory returns friendly error', () => {
    const fs = createFileSystem(makeTree())
    expect(fs.cat('workshop').error).toBeDefined()
  })
})

describe('FileSystem.mkdir', () => {
  test('creates a new directory in cwd', () => {
    const fs = createFileSystem(makeTree())
    fs.cd('workshop')
    const result = fs.mkdir('new-room')
    expect(result.ok).toBe(true)
    const names = fs.ls().entries.map(e => e.name)
    expect(names).toContain('new-room')
  })

  test('missing name returns friendly error', () => {
    const fs = createFileSystem(makeTree())
    expect(fs.mkdir().error).toBeDefined()
  })

  test('name collision returns friendly error', () => {
    const fs = createFileSystem(makeTree())
    fs.cd('workshop')
    expect(fs.mkdir('toolbox').error).toBeDefined()
  })
})

describe('FileSystem.complete', () => {
  test('returns entries matching prefix', () => {
    const fs = createFileSystem(makeTree())
    fs.cd('workshop')
    expect(fs.complete('tool')).toEqual(['toolbox'])
  })

  test('returns empty array when nothing matches', () => {
    const fs = createFileSystem(makeTree())
    fs.cd('workshop')
    expect(fs.complete('zzz')).toEqual([])
  })
})
