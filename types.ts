
export interface Libraries {
  midi: MidiLibrary
  launchpad: LaunchpadLibrary
}

export interface LaunchpadLibrary {
  getPad(row: number, col: number): Pad
  getPads(row1: number, row2: number, col1: number, col2: number): Pad[][]
}

export interface MidiLibrary {
  listPorts(): string[]
  openPort(name: string): MidiPort
}

export type RGB = { r: number, g: number, b: number }
export type Pattern = 'solid' | 'pulse' | 'flash'

export type PadEventType = 'press-on' | 'press-off'
export interface PadEvent extends Event {
  type: 'press-on' | 'press-off'
  time: number // ms, Date.now()
  dur:  number // ms, time since 'press-on' 
  vel:  number
  row:  number
  col:  number
}

export interface Pad {
  readonly row: number
  readonly col: number
  readonly color: RGB
  readonly flashColor: RGB
  readonly pattern: Pattern
  addEventListener( type: PadEventType, listener: (event: PadEvent) => void): void
  removeEventListener( type: PadEventType, listener: (event: PadEvent) => void): void
}

export interface MidiPort {
  readonly name:   string
  readonly iName:  string
  readonly oName:  string
  readonly iIndex: number
  readonly oIndex: number
  getMessage(): Promise<{ deltaTime: number, message: number[] }>
  sendMessage(message: number[]): void
  close(): void
}
