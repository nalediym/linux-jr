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
     */
    find(path, predicates = {}) {
      const startParts = resolvePath(path || cwd)
      const start = getNode(path || cwd)
      if (start === undefined) return { error: `find: ${path}: No such file or directory` }
      const results = []
      const matchesName = (name) => {
        if (predicates.name == null) return true
        const re = new RegExp(
          '^' + predicates.name.split('').map(c => {
            if (c === '*') return '.*'
            if (c === '?') return '.'
            return c.replace(/[.+^${}()|[\]\\]/g, '\\$&')
          }).join('') + '$'
        )
        return re.test(name)
      }
      const matchesSize = (size) => predicates.size == null || predicates.size === size
      const matchesType = (isDir) => {
        if (predicates.type == null) return true
        if (predicates.type === 'd') return isDir
        if (predicates.type === 'f') return !isDir
        return true
      }

      // Optionally include the start path itself as the first entry (real `find` does this).
      const startName = startParts.length === 0 ? '.' : startParts[startParts.length - 1]
      const startIsDir = typeof start === 'object'
      const startSize = startIsDir ? 0 : new TextEncoder().encode(start).length
      if (matchesName(startName) && matchesSize(startSize) && matchesType(startIsDir)) {
        results.push(joinPath(startParts) || '/')
      }

      walk(startParts, ({ name, parts, isDir, content }) => {
        const size = isDir ? 0 : new TextEncoder().encode(content).length
        if (matchesName(name) && matchesSize(size) && matchesType(isDir)) {
          results.push(joinPath(parts))
        }
      })
      return { results }
    },
  }
}
