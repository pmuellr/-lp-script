import { require } from '../../lib/require.mjs'

const midi = require('midi')

import { matchNames } from './name-matcher.mjs'

// const ports = Array.from(getPorts().entries())
// console.log(JSON.stringify(ports, null, 4))

/** @type { () => Map<string, MidiPortDesc> } */
export function getPorts() {
  const iPorts = getPortsRaw(true)
  const oPorts = getPortsRaw(false)

  /** @type { Map<string, MidiPortRaw> } */
  const iPortsMap = new Map()
  for (const port of iPorts) iPortsMap.set(port.name, port)

  /** @type { Map<string, MidiPortRaw> } */
  const oPortsMap = new Map()
  for (const port of oPorts) oPortsMap.set(port.name, port)

  const iNames = new Set(iPorts.map(port => port.name))
  const oNames = new Set(oPorts.map(port => port.name))

  const matched = matchNames(iPortsMap.keys(), oPortsMap.keys())

  /** @type { MidiPortDesc[] } */
  const result = []
  const unknownPort = { name: 'unknown', index: -1 }

  // copy matches
  for (const name of matched.matched) {
    const hasInput = true, hasOutput = true
    const iPort = iPortsMap.get(name) || unknownPort
    const oPort = oPortsMap.get(name) || unknownPort

    result.push({
      name, hasInput, hasOutput,
      input: iPort,
      output: oPort
    })
  }

  // copy close matches
  for (const [ name, iName, oName ] of matched.closeMatched) {
    const hasInput = true, hasOutput = true
    const iIndex = iPortsMap.get(iName)?.index || unknownPort.index
    const oIndex = oPortsMap.get(oName)?.index || unknownPort.index

    result.push({
      name, hasInput, hasOutput,
      input:  { name: iName, index: iIndex},
      output: { name: oName, index: oIndex},
    })
  }

  // remaining are input- or output- only
  for (const name of matched.notMatched) {
    if (iNames.has(name)) {
      const index = iPortsMap.get(name)?.index || unknownPort.index
      result.push({
        name, hasInput: true, hasOutput: false,
        input:  { name: name, index: index},
        output: unknownPort,
      })
    } else {
      const index = oPortsMap.get(name)?.index || unknownPort.index
      result.push({
        name, hasInput: false, hasOutput: true,
        input:  unknownPort,
        output: { name: name, index: index},
      })
    }
  }

  /** @type { Map<string, MidiPortDesc> } */
  const resultMap = new Map()
  for (const midiPort of result) {
    resultMap.set(midiPort.name, midiPort)
  }

  return resultMap
}

/** @type { (input: boolean) => MidiPortRaw[] } */
function getPortsRaw(isInput) {
  const ports = isInput ? new midi.Input() : new midi.Output()
  const count = ports.getPortCount()
  /** @type { MidiPortRaw[] } */
  const result = []

  for (let i = 0; i < count; i++) {
    result.push({ index: i , name: ports.getPortName(i)} )
  }

  return result
}

/** @typedef { { name: string, index: number } } MidiPortRaw */

/** @typedef { import('./types-internal').OnMessage } OnMessage */
/** @typedef { import('./types-internal').MidiPortOptions } MidiPortOptions */
/** @typedef { import('./types-internal').MidiPortDesc } MidiPortDesc */
