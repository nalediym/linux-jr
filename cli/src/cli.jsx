import React, { useState, useMemo, useEffect } from 'react'
import { render, Box, Text, useApp, useInput } from 'ink'
import TextInput from 'ink-text-input'
import { createFileSystem } from '../../src/components/FileSystem.js'
import { executeCommand } from '../../src/components/CommandParser.js'
import { createMissionEngine } from '../../src/components/MissionEngine.js'
import { ALL_MISSIONS } from '../../src/data/missions/index.js'

const COMMANDS = ['pwd', 'ls', 'cd', 'cat', 'mkdir', 'man', 'help', 'clear', 'quit', 'exit', 'next']

const argv = process.argv.slice(2)

if (argv.includes('--version') || argv.includes('-v')) {
  console.log('linuxjr 0.1.0')
  process.exit(0)
}

if (argv.includes('--help') || argv.includes('-h')) {
  console.log(`Linux Jr — learn Linux commands through missions.

Usage:
  npx linuxjr              Start the first mission
  npx linuxjr --version    Print version
  npx linuxjr --help       Show this message

Commands inside the game:
  pwd, ls, cd, cat, mkdir, man, help, clear
  next        (after a mission completes) advance to the next mission
  quit        exit the game
  Ctrl+C      exit anytime

Missions: ${ALL_MISSIONS.length} available (${ALL_MISSIONS.map(m => m.title).join(', ')})
Docs: https://linux-jr.vercel.app`)
  process.exit(0)
}

if (!process.stdout.isTTY) {
  console.error('Linux Jr needs a real terminal. Open Terminal.app (or any terminal) and run: npx linuxjr')
  process.exit(1)
}

function Banner() {
  return (
    <Box flexDirection="column" marginBottom={1}>
      <Text color="cyanBright" bold>{'╭──────────────────────────────────╮'}</Text>
      <Text color="cyanBright" bold>{'│         L I N U X   J R          │'}</Text>
      <Text color="cyanBright" bold>{'│    learn linux, one mission      │'}</Text>
      <Text color="cyanBright" bold>{'│         at a time 🚀             │'}</Text>
      <Text color="cyanBright" bold>{'╰──────────────────────────────────╯'}</Text>
    </Box>
  )
}

function MissionHeader({ mission, index, total }) {
  return (
    <Box flexDirection="column" marginBottom={1}>
      <Text color="yellowBright" bold>
        Mission {index + 1}/{total}: {mission.title}
      </Text>
      <Text color="gray">{mission.story}</Text>
    </Box>
  )
}

function TaskHint({ task, taskNum, totalTasks }) {
  if (!task) return null
  return (
    <Box marginTop={1}>
      <Text color="magentaBright">
        {'▸ '}
      </Text>
      <Text color="whiteBright">
        Task {taskNum}/{totalTasks}: {task.description}
      </Text>
    </Box>
  )
}

function OutputLine({ line }) {
  if (line.kind === 'prompt') {
    return (
      <Text>
        <Text color="greenBright" bold>{line.cwd}</Text>
        <Text color="gray">{' > '}</Text>
        <Text>{line.input}</Text>
      </Text>
    )
  }
  if (line.kind === 'error') {
    return <Text color="redBright">{line.text}</Text>
  }
  if (line.kind === 'success') {
    return <Text color="greenBright" bold>{line.text}</Text>
  }
  return <Text>{line.text}</Text>
}

function MissionRunner({ mission, index, total, onComplete }) {
  const fs = useMemo(
    () => createFileSystem(structuredClone(mission.filesystem)),
    [mission],
  )
  const engine = useMemo(() => createMissionEngine(mission), [mission])

  const [lines, setLines] = useState([
    { kind: 'info', text: `Type commands to play. Need help? Type: help` },
  ])
  const [input, setInput] = useState('')
  const [cwd, setCwd] = useState(fs.pwd())
  const [task, setTask] = useState(engine.getCurrentTask())
  const [done, setDone] = useState(false)

  function append(...newLines) {
    setLines(prev => [...prev, ...newLines])
  }

  function handleSubmit(raw) {
    const trimmed = raw.trim()
    setInput('')
    if (!trimmed) return

    const lowered = trimmed.toLowerCase()
    if (lowered === 'quit' || lowered === 'exit') {
      process.exit(0)
    }
    if (done && lowered === 'next') {
      onComplete()
      return
    }

    const result = executeCommand(trimmed, fs)
    if (!result) return

    const promptLine = { kind: 'prompt', cwd, input: trimmed }

    if (result.output === '__CLEAR__') {
      setLines([{ kind: 'info', text: `Screen cleared. Keep going!` }])
      setCwd(fs.pwd())
      return
    }

    const outputLine = result.isError
      ? { kind: 'error', text: result.output }
      : { kind: 'output', text: result.output }

    append(promptLine, outputLine)
    setCwd(fs.pwd())

    const evalResult = engine.evaluate({
      pwd: fs.pwd(),
      lastCommand: result.command,
      lastArgs: result.args,
      lastOutput: result.output,
    })

    if (evalResult.advanced) {
      if (evalResult.complete) {
        append({ kind: 'success', text: `\n🎉 Mission complete! You did it!\n` })
        if (index + 1 < total) {
          append({
            kind: 'info',
            text: `Type "next" for the next mission, or "quit" to stop.`,
          })
        } else {
          append({
            kind: 'success',
            text: `\n★ You finished every mission! Amazing. ★\nType "quit" to exit.`,
          })
        }
        setDone(true)
        setTask(null)
      } else {
        const nextTask = engine.getCurrentTask()
        setTask(nextTask)
        append({ kind: 'success', text: `✓ Nice! Next task coming up...` })
      }
    }
  }

  function handleTab() {
    const parts = input.split(/\s+/)
    if (parts.length <= 1) {
      const matches = COMMANDS.filter(c => c.startsWith(parts[0] || ''))
      if (matches.length === 1) setInput(matches[0] + ' ')
      return
    }
    const last = parts[parts.length - 1]
    const matches = fs.complete(last)
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0]
      setInput(parts.join(' '))
    }
  }

  useInput((ch, key) => {
    if (key.ctrl && ch === 'c') process.exit(0)
    if (key.tab) handleTab()
  })

  return (
    <Box flexDirection="column">
      <MissionHeader mission={mission} index={index} total={total} />
      {lines.map((line, i) => (
        <OutputLine key={i} line={line} />
      ))}
      <TaskHint
        task={task}
        taskNum={engine.getProgress().current + 1}
        totalTasks={engine.getProgress().total}
      />
      <Box marginTop={1}>
        <Text color="greenBright" bold>{cwd}</Text>
        <Text color="gray">{' > '}</Text>
        <TextInput value={input} onChange={setInput} onSubmit={handleSubmit} />
      </Box>
    </Box>
  )
}

function App() {
  const { exit } = useApp()
  const [missionIndex, setMissionIndex] = useState(0)
  const mission = ALL_MISSIONS[missionIndex]

  function advance() {
    if (missionIndex + 1 < ALL_MISSIONS.length) {
      setMissionIndex(missionIndex + 1)
    } else {
      exit()
    }
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Banner />
      <MissionRunner
        key={mission.id}
        mission={mission}
        index={missionIndex}
        total={ALL_MISSIONS.length}
        onComplete={advance}
      />
    </Box>
  )
}

render(<App />)
