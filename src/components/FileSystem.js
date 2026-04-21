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
 */

export function createFileSystem(tree) {
  let cwd = '/'

  function resolvePath(path) {
    if (path === '/') return []
    // Handle absolute paths
    const parts = path.startsWith('/')
      ? path.split('/').filter(Boolean)
      : [...cwd.split('/').filter(Boolean), ...path.split('/').filter(Boolean)]

    // Resolve .. and .
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

  return {
    pwd() {
      return cwd
    },

    ls(path) {
      const target = path ? getNode(path) : getNode(cwd)
      if (target === undefined) return { error: `No such directory: ${path || cwd}` }
      if (typeof target === 'string') return { error: `Not a directory: ${path}` }
      // Show all entries including dotfiles (design decision: no ls -a needed for age 7)
      return { entries: Object.keys(target) }
    },

    cd(path) {
      if (!path) return { error: 'Where do you want to go? Like: cd workshop' }
      const parts = resolvePath(path)
      const node = getNode(path)
      if (node === undefined) return { error: `That room doesn't exist. Try ls to see what's here.` }
      if (typeof node === 'string') return { error: `That's a file, not a room. Try: cat ${path}` }
      cwd = '/' + parts.join('/')
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
      return Object.keys(target).filter(name => name.startsWith(prefix))
    },

    mkdir(name) {
      if (!name) return { error: 'What should we call it? Like: mkdir my-folder' }
      const parent = getNode(cwd)
      if (typeof parent !== 'object') return { error: 'Something went wrong.' }
      if (parent[name] !== undefined) return { error: `${name} already exists!` }
      parent[name] = {}
      return { ok: true, message: `Created room: ${name}` }
    },
  }
}
