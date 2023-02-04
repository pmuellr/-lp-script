#!/usr/bin/env node

import 'zx/globals'

import * as launchpad from './libraries/launchpad/index.mjs'
export * as launchpad from './libraries/launchpad/index.mjs'

import * as midi from './libraries/midi/index.mjs'
export * as midi from './libraries/midi/index.mjs'

import './globals.mjs'

import { resolve } from 'node:path'
import { logDebug, logFatal } from './lib/log.mjs'
import { isMainModule } from './lib/is-main-module.mjs'

if (isMainModule(import.meta.url)) main()

async function main() {
  const scriptArg = process.argv[2]
  if (!scriptArg) {
    logFatal('script required as argument')
  }

  const script = resolve(scriptArg)
  logDebug(`script argument from command-line: "${scriptArg}"`)
  logDebug(`script resolved:                   "${script}"`)
  if (!script) {
    await $`cat README.md`
    process.exit(1)
  }

  // assignment gets some type checking on our exports / "type doc"
  /** @type { Libraries } */  
  const libraries = { launchpad, midi }
  
  try {
    logDebug(`about to import "${script}"`)
    await import(script)
  } catch (err) {
    logFatal('error importing script', err)
  }
}

/** @typedef { import('./types').Libraries } Libraries */
