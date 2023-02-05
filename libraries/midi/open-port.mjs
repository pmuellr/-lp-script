import { require } from '../../lib/require.mjs'
import { createReadySignal } from '../../lib/readySignal.mjs'
import { getPorts } from './get-ports.mjs'

const midi = require('midi')

/** @type { MidiLibrary["openPort"]} */
export function openPort(name, messageHandler) {
  const ports = getPorts()
  const desc = ports.get(name)
  
  if (!desc) throw new Error(`port not found: "${name}"`)

  const iPort = new midi.Input()
  const oPort = new midi.Output()
  let isClosed = false

  const thisPort = {
    name,
    iName: desc.input.name,
    oName: desc.output.name,
    iIndex: desc.input.index,
    oIndex: desc.output.index,
    sendMessage,
    close,
  }

  iPort.openPort(desc.input.index)
  oPort.openPort(desc.output.index)
  iPort.ignoreTypes(false, true, true)
  
  iPort.on('message', (deltaTime, message) => {
    setImmediate(() => onMessage(deltaTime, message))
  })

  return thisPort

  /** @type { (deltaTime: number, message: number[]) => void } */
  function onMessage(deltaTime, message) {
    if (!messageHandler) return
    messageHandler.onMessage?.(thisPort, deltaTime, message)

    const [b1, b2, b3] = message
    const messageType = b1 & 0xF0
    const channel     = b1 & 0x0F

    if (messageType === 0x80) {
      const [note, velocity] = [ b2, b3 ]
      messageHandler.onNoteOff?.(thisPort, deltaTime, { channel, note: b2, velocity: b3 })
    }

    if (messageType === 0x90) {
      messageHandler.onNoteOn?.(thisPort, deltaTime, { channel, note: b2, velocity: b3 })
    }

    if (messageType === 0xB0) {
      messageHandler.onCc?.(thisPort, deltaTime, { channel, control: b2, value: b3 })      
    }

    if (b1 === 0xF0) {
      messageHandler.onSysex?.(thisPort, deltaTime, { data: message })
    }
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
/** @typedef { import('./types').MidiPort } MidiPort */
/** @typedef { import('./types').MidiLibrary } MidiLibrary */
