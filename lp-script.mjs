#!/usr/bin/env node

import 'zx/globals'

import * as lp from './libraries/lp/index.mjs'
export * as lp from './libraries/lp/index.mjs'

import * as midi from './libraries/midi/index.mjs'
export * as midi from './libraries/midi/index.mjs'

import { resolve } from 'node:path'
import { logDebug, logFatal } from './lib/log.mjs'

let script = process.argv[2]

const scriptResolved = resolve(script)
logDebug(`script argument from command-line: "${script}"`)
logDebug(`script resolved:                   "${scriptResolved}"`)

main(scriptResolved)

/** @type { (script: string) => Promise<void> } */
async function main(script) {
  logDebug(`main("${script}")`)
  if (!script) {
    await $`cat README.md`
    process.exit(1)
  }

  // assignment gets some type checking on our exports / "type doc"
  /** @type { Libraries } */  
  const libraries = { lp, midi }
  Object.assign(global, libraries)
  
  try {
    logDebug(`about to import "${script}"`)
    await import(script)
  } catch (err) {
    logFatal('error importing script', err)
  }
}

/** @typedef { import('./types').Libraries } Libraries */
