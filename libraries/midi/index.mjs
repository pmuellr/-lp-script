import { require } from '../../lib/require.mjs'

const midi = require('midi')

import { getPorts } from './get-ports.mjs'
import { openPort } from './open-port.mjs'
export { openPort } from './open-port.mjs'

/** @type { MidiLibrary["listPorts"]} */
export function listPorts() {
  return Array.from(getPorts().keys())
}

/** @typedef { import('./types').MidiLibrary } MidiLibrary */
