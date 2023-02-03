// just used for type definitions, never used at runtime

export type RGB = { r: number, g: number, b: number }
export type Pattern = 'solid' | 'pulse' | 'flash'

export type PadEventType = 'press-on' | 'press-off'
export interface PadEvent extends Event {
  type: 'press-on' | 'press-off'
  time: number // ms, Date.now()
  row: number
  col: number
}

export interface IPad {
  readonly row: number
  readonly col: number
  readonly color: RGB
  readonly flashColor: RGB
  readonly pattern: Pattern
  addEventListener( type: PadEventType, listener: (event: PadEvent) => void): void
  removeEventListener( type: PadEventType, listener: (event: PadEvent) => void): void
}
