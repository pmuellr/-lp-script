import { require } from '../../lib/require.mjs'

const midi = require('midi')

import { getPorts } from './port.mjs'
import { createReadySignal } from '../../lib/readySignal.mjs'

export function listPorts() {
  return Array.from(getPorts().keys())
}

/** @type { (name: string) => MidiPort } */
export function openPort(name) {
  const ports = getPorts()
  const desc = ports.get(name)
  
  if (!desc) throw new Error(`port not found: "${name}"`)

  const iPort = new midi.Input()
  const oPort = new midi.Output()
  let isClosed = false

  iPort.openPort(desc.input.index)
  oPort.openPort(desc.output.index)

  /** @type { number[][] } */
  const messages = []
  iPort.on('message', (deltaTime, message) => {
    messages.push([ deltaTime, ...message ])

    const signals = readySignals.slice()
    readySignals.splice(0, readySignals.length)
    for (const signal of signals) {
      signal.signal(null)
    }
  })

  /** @type { ReadySignal<null>[] } */
  const readySignals = []

  return {
    name,
    iName: desc.input.name,
    oName: desc.output.name,
    iIndex: desc.input.index,
    oIndex: desc.output.index,
    getMessage,
    sendMessage,
    close,
  }
  
  /** @type { () => Promise<{ deltaTime: number, message: number[] }> } */
  async function getMessage() {
    /** @type { { deltaTime: number, message: number[] } } */
    const result = { deltaTime: 0, message: [] }
    if (isClosed) return result

    if (messages.length > 1) {
      const message = messages.shift() || []

      result.deltaTime = message.shift() || 0
      result.message   = message || []

      return result
    }

    const readySignal = createReadySignal()
    readySignals.push(readySignal)
    await readySignal.wait()

    return await getMessage()
  }

  /** @type { (message: number[]) => void } */
  function sendMessage(message) {
    if (isClosed) return

    // @ts-ignore
    oPort.sendMessage(message)
  }

  /** @type { () => void } */
  function close() {
    if (isClosed) return

    isClosed = true
    iPort.closePort()
    oPort.closePort()
  }
}

/** @template T @typedef { { wait(): Promise<T>; signal(value: T): void; isEmitted(): boolean; } } ReadySignal */
/** @typedef { import('../../types').MidiPort } MidiPort */
