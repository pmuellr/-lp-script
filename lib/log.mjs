import { pkg } from './pkg.mjs'

let Debug = !!process.env.DEBUG

/** @type { (message: string) => void } */
export function log(message) {
  console.log(`${pkg.name}: ${message}`)
}

/** @type { (message: string) => void } */
export function logDebug(message) {
  if (Debug) log(`DEBUG: ${message}`)
}

/** @type { (message: string, error?: Error) => void } */
export function logFatal(message, error) {
  if (error) {
    message = `${message}; error: ${error}`
  }

  log(message)
  process.exit(1)
}

/** @type { (debug: boolean) => void } */
export function setDebug(debug) {
  Debug = !!debug
}
