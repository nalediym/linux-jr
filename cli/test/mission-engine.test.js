import { describe, test, expect } from 'vitest'
import { createMissionEngine } from '../../src/components/MissionEngine.js'

function makeMission(tasks) {
  return { id: 'test', title: 'Test', story: 's', filesystem: {}, tasks }
}

describe('MissionEngine.evaluate: pwd_equals', () => {
  test('advances when pwd matches', () => {
    const engine = createMissionEngine(
      makeMission([{ description: 'go to /a', check: { type: 'pwd_equals', path: '/a' } }]),
    )
    const result = engine.evaluate({ pwd: '/a', lastCommand: 'cd', lastArgs: ['a'] })
    expect(result.advanced).toBe(true)
    expect(result.complete).toBe(true)
  })

  test('does not advance when pwd mismatches', () => {
    const engine = createMissionEngine(
      makeMission([{ description: 'go to /a', check: { type: 'pwd_equals', path: '/a' } }]),
    )
    const result = engine.evaluate({ pwd: '/b', lastCommand: 'cd', lastArgs: ['b'] })
    expect(result.advanced).toBe(false)
  })
})

describe('MissionEngine.evaluate: command_used', () => {
  test('advances when command matches', () => {
    const engine = createMissionEngine(
      makeMission([{ description: 'run ls', check: { type: 'command_used', command: 'ls' } }]),
    )
    const result = engine.evaluate({ pwd: '/', lastCommand: 'ls', lastArgs: [] })
    expect(result.advanced).toBe(true)
  })

  test('does not advance on different command', () => {
    const engine = createMissionEngine(
      makeMission([{ description: 'run ls', check: { type: 'command_used', command: 'ls' } }]),
    )
    const result = engine.evaluate({ pwd: '/', lastCommand: 'pwd', lastArgs: [] })
    expect(result.advanced).toBe(false)
  })
})

describe('MissionEngine.evaluate: output_contains', () => {
  test('advances when output contains text', () => {
    const engine = createMissionEngine(
      makeMission([{ description: 'find flag', check: { type: 'output_contains', text: 'FLAG{' } }]),
    )
    const result = engine.evaluate({
      pwd: '/',
      lastCommand: 'cat',
      lastArgs: ['flag.txt'],
      lastOutput: 'the prize: FLAG{win}',
    })
    expect(result.advanced).toBe(true)
  })

  test('does not advance when text missing', () => {
    const engine = createMissionEngine(
      makeMission([{ description: 'find flag', check: { type: 'output_contains', text: 'FLAG{' } }]),
    )
    const result = engine.evaluate({
      pwd: '/',
      lastCommand: 'cat',
      lastArgs: ['not.txt'],
      lastOutput: 'nothing here',
    })
    expect(result.advanced).toBe(false)
  })

  test('handles undefined output safely', () => {
    const engine = createMissionEngine(
      makeMission([{ description: 'x', check: { type: 'output_contains', text: 'foo' } }]),
    )
    const result = engine.evaluate({ pwd: '/', lastCommand: 'pwd', lastArgs: [] })
    expect(result.advanced).toBe(false)
  })
})

describe('MissionEngine.evaluate: file_read', () => {
  test('advances when cat matches the path', () => {
    const engine = createMissionEngine(
      makeMission([{ description: 'cat secret.txt', check: { type: 'file_read', path: 'secret.txt' } }]),
    )
    const result = engine.evaluate({
      pwd: '/',
      lastCommand: 'cat',
      lastArgs: ['secret.txt'],
      lastOutput: 'boo',
    })
    expect(result.advanced).toBe(true)
  })

  test('does not advance when cat path differs', () => {
    const engine = createMissionEngine(
      makeMission([{ description: 'cat secret.txt', check: { type: 'file_read', path: 'secret.txt' } }]),
    )
    const result = engine.evaluate({
      pwd: '/',
      lastCommand: 'cat',
      lastArgs: ['other.txt'],
    })
    expect(result.advanced).toBe(false)
  })

  test('does not advance when command is not cat', () => {
    const engine = createMissionEngine(
      makeMission([{ description: 'cat secret.txt', check: { type: 'file_read', path: 'secret.txt' } }]),
    )
    const result = engine.evaluate({
      pwd: '/',
      lastCommand: 'ls',
      lastArgs: ['secret.txt'],
    })
    expect(result.advanced).toBe(false)
  })
})

describe('MissionEngine progression', () => {
  test('advances one task at a time', () => {
    const engine = createMissionEngine(
      makeMission([
        { description: 't1', check: { type: 'command_used', command: 'pwd' } },
        { description: 't2', check: { type: 'command_used', command: 'ls' } },
      ]),
    )
    const r1 = engine.evaluate({ pwd: '/', lastCommand: 'pwd', lastArgs: [] })
    expect(r1.advanced).toBe(true)
    expect(r1.complete).toBe(false)

    const r2 = engine.evaluate({ pwd: '/', lastCommand: 'ls', lastArgs: [] })
    expect(r2.advanced).toBe(true)
    expect(r2.complete).toBe(true)
  })

  test('evaluate after completion is idempotent', () => {
    const engine = createMissionEngine(
      makeMission([{ description: 't1', check: { type: 'command_used', command: 'pwd' } }]),
    )
    engine.evaluate({ pwd: '/', lastCommand: 'pwd', lastArgs: [] })
    const r = engine.evaluate({ pwd: '/', lastCommand: 'pwd', lastArgs: [] })
    expect(r.advanced).toBe(false)
    expect(r.complete).toBe(true)
  })
})

describe('MissionEngine.restoreProgress', () => {
  test('restores to specific task', () => {
    const engine = createMissionEngine(
      makeMission([
        { description: 't1', check: { type: 'command_used', command: 'pwd' } },
        { description: 't2', check: { type: 'command_used', command: 'ls' } },
        { description: 't3', check: { type: 'command_used', command: 'cd' } },
      ]),
    )
    engine.restoreProgress(2)
    expect(engine.getProgress().current).toBe(2)
  })

  test('clamps to task count', () => {
    const engine = createMissionEngine(
      makeMission([{ description: 't1', check: { type: 'command_used', command: 'pwd' } }]),
    )
    engine.restoreProgress(99)
    expect(engine.getProgress().current).toBe(1)
    expect(engine.getProgress().complete).toBe(true)
  })
})
