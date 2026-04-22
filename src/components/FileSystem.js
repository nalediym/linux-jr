/**
 * In-memory virtual filesystem.
 * Directories are objects, files are strings.
 *
 * Example:
 * {
 *   "workshop": {
 *     "toolbox": { "hammer.txt": "Just a hammer." },
 *     "secret-room": { ".hidden-blueprint.txt": "FLAG{you_found_it}" }
 *   }
 * }
 *
 * Options:
 *   hidesDotfiles  default false. When true, ls hides entries starting with "."
 *                  unless { all: true } is passed. Used by arcade Game #4
 *                  ("Dot Files") to teach the real Linux semantics. Campaign
 *                  missions leave it false so dotfiles stay visible.
 */

export function createFileSystem(tree, options = {}) {
  const { hidesDotfiles = false } = options
  let cwd = '/'

  function resolvePath(path) {
    if (path === '/') return []
    const parts = path.startsWith('/')
      ? path.split('/').filter(Boolean)
      : [...cwd.split('/').filter(Boolean), ...path.split('/').filter(Boolean)]

    const resolved = []
    for (const part of parts) {
      if (part === '..') resolved.pop()
      else if (part !== '.') resolved.push(part)
    }
    return resolved
  }

  function getNode(path) {
    const parts = resolvePath(path)
    let node = tree
    for (const part of parts) {
      if (node == null || typeof node !== 'object') return undefined
      node = node[part]
    }
    return node
  }

  function joinPath(parts) {
    return '/' + parts.join('/')
  }

  function walk(startParts, visit) {
    let node = tree
    for (const part of startParts) {
      if (node == null || typeof node !== 'object') return
      node = node[part]
    }
    if (node == null || typeof node !== 'object') return
    function recurse(currentParts, currentNode) {
      for (const name of Object.keys(currentNode)) {
        const childParts = [...currentParts, name]
        const child = currentNode[name]
        const isDir = typeof child === 'object'
        visit({ name, parts: childParts, isDir, content: isDir ? null : child })
        if (isDir) recurse(childParts, child)
      }
    }
    recurse(startParts, node)
  }

  return {
    pwd() {
      return cwd
    },

    ls(path, { all = false } = {}) {
      const target = path ? getNode(path) : getNode(cwd)
      if (target === undefined) return { error: `No such directory: ${path || cwd}` }
      if (typeof target === 'string') return { error: `Not a directory: ${path}` }
      const visible = (name) => all || !hidesDotfiles || !name.startsWith('.')
      const entries = Object.keys(target)
        .filter(visible)
        .map(name => ({
          name,
          isDir: typeof target[name] === 'object',
        }))
      return { entries }
    },

    cd(path) {
      if (!path) return { error: 'Where do you want to go? Like: cd workshop' }
      const parts = resolvePath(path)
      const node = getNode(path)
      if (node === undefined) return { error: `That room doesn't exist. Try ls to see what's here.` }
      if (typeof node === 'string') return { error: `That's a file, not a room. Try: cat ${path}` }
      cwd = joinPath(parts)
      return { ok: true }
    },

    cat(path) {
      if (!path) return { error: 'Which file? Like: cat readme.txt' }
      const node = getNode(path)
      if (node === undefined) return { error: `Can't find that file. Try ls to see what's here.` }
      if (typeof node === 'object') return { error: `That's a room, not a file. Try: cd ${path}` }
      return { content: node }
    },

    /** Return entries in cwd (or path) that start with prefix, for tab completion */
    complete(prefix) {
      const target = getNode(cwd)
      if (!target || typeof target !== 'object') return []
      return Object.keys(target).filter(name => {
        if (!name.startsWith(prefix)) return false
        if (hidesDotfiles && name.startsWith('.') && !prefix.startsWith('.')) return false
        return true
      })
    },

    mkdir(name) {
      if (!name) return { error: 'What should we call it? Like: mkdir my-folder' }
      const parent = getNode(cwd)
      if (typeof parent !== 'object') return { error: 'Something went wrong.' }
      if (parent[name] !== undefined) return { error: `${name} already exists!` }
      parent[name] = {}
      return { ok: true, message: `Created room: ${name}` }
    },

    /** stat — returns { size, type } for a path. size is byte length of utf-8 file content. */
    stat(path) {
      const node = getNode(path)
      if (node === undefined) return { error: `Can't find that file.` }
      if (typeof node === 'object') {
        return { type: 'dir', size: 0 }
      }
      const size = new TextEncoder().encode(node).length
      return { type: 'file', size }
    },

    /**
     * find — recursively walk PATH, return entries matching predicates.
     * predicates: { name?: glob, size?: bytes, type?: 'f'|'d' }
     * Glob supports * and ? only. Patterns match the basename, not the full path.
     *
     * Caps: pattern length 64, total results 10000. The pattern matcher is
     * a hand-rolled non-backtracking walker (NOT regex with `.*`) — converting
     * `*foo*bar*` to `^.*foo.*bar.*$` is catastrophically slow on adversarial
     * inputs (ReDoS).
     */
    find(path, predicates = {}) {
      const startParts = resolvePath(path || cwd)
      const start = getNode(path || cwd)
      if (start === undefined) return { error: `find: ${path}: No such file or directory` }
      if (predicates.name != null && predicates.name.length > 64) {
        return { error: `find: pattern too long (max 64 characters)` }
      }
      const results = []
      const RESULT_CAP = 10000

      // Tokenize the glob into literal segments separated by `*`. Each segment
      // is matched with a left-to-right greedy scan — no backtracking.
      let segments = null
      if (predicates.name != null) {
        segments = predicates.name.split('*').map(seg => {
          // `?` inside a segment matches any single char.
          // Returns a function that tests whether the segment matches at offset i in name.
          return { len: seg.length, chars: [...seg] }
        })
      }
      const matchesName = (name) => {
        if (segments == null) return true
        const segMatch = (segIdx, offset) => {
          const seg = segments[segIdx]
          if (offset + seg.len > name.length) return -1
          for (let i = 0; i < seg.len; i++) {
            const c = seg.chars[i]
            if (c !== '?' && c !== name[offset + i]) return -1
          }
          return offset + seg.len
        }
        // First segment must match at start (unless empty, meaning leading `*`).
        let pos = 0
        if (segments[0].len > 0) {
          const end = segMatch(0, 0)
          if (end < 0) return false
          pos = end
        }
        // Middle segments: scan forward, find next occurrence (linear).
        for (let s = 1; s < segments.length - 1; s++) {
          const seg = segments[s]
          if (seg.len === 0) continue
          let found = -1
          for (let i = pos; i + seg.len <= name.length; i++) {
            const end = segMatch(s, i)
            if (end >= 0) { found = end; break }
          }
          if (found < 0) return false
          pos = found
        }
        // Last segment must match at end (unless empty, meaning trailing `*`).
        if (segments.length > 1) {
          const last = segments[segments.length - 1]
          if (last.len > 0) {
            const start = name.length - last.len
            if (start < pos) return false
            return segMatch(segments.length - 1, start) === name.length
          }
          return true
        }
        // Single segment with no `*` — must match the entire name.
        return pos === name.length
      }
      const matchesSize = (size) => predicates.size == null || predicates.size === size
      const matchesType = (isDir) => {
        if (predicates.type == null) return true
        if (predicates.type === 'd') return isDir
        if (predicates.type === 'f') return !isDir
        return true
      }

      // Hoisted: avoid allocating a TextEncoder per node.
      const encoder = predicates.size != null ? new TextEncoder() : null
      const sizeOf = (isDir, content) => {
        if (isDir) return 0
        if (encoder == null) return 0 // unused when size predicate absent
        return encoder.encode(content).length
      }

      // Optionally include the start path itself as the first entry (real `find` does this).
      const startName = startParts.length === 0 ? '.' : startParts[startParts.length - 1]
      const startIsDir = typeof start === 'object'
      const startSize = sizeOf(startIsDir, start)
      if (matchesName(startName) && matchesSize(startSize) && matchesType(startIsDir)) {
        results.push(joinPath(startParts) || '/')
      }

      let truncated = false
      walk(startParts, ({ name, parts, isDir, content }) => {
        if (results.length >= RESULT_CAP) { truncated = true; return }
        const size = sizeOf(isDir, content)
        if (matchesName(name) && matchesSize(size) && matchesType(isDir)) {
          results.push(joinPath(parts))
        }
      })
      if (truncated) results.push(`(truncated at ${RESULT_CAP} results)`)
      return { results }
    },
  }
}
