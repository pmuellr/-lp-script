#!/usr/bin/env npx zx

import 'zx/globals'
import * as jzz from 'jzz'
import * as lp from './lib/lp.mjs'
import * as midi from './lib/midi.mjs'

const ENV_DEBUG = process.env.DEBUG != null

let script = process.argv[2]
if (script.endsWith('lp-script.mjs')) script = process.argv[3]

console.log(`argv: ${process.argv.join(' ,')}`)
main(script)

/** @type { (script: string) => Promise<void> } */
async function main(script) {
  console.log(`main("${script}")`)
  if (!script) {
    await $`cat README.md`
    process.exit(1)
  }

  Object.assign(global, { jzz, lp, midi })
  
  try {
    console.log(`about to import "${script}"`)
    await import(script)
  } catch (err) {
    console.log(`error importing script: ${err}`)
    process.exit(1)
  }
}
