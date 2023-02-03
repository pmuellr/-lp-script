/** @type {RGB} */
const Black = { r: 0, g: 0, b: 0 }

/** @implements {IPad} */
export class Pad  {
  /** @param {number} row */
  /** @param {number} col */
  constructor(row, col) {
    this._row = row
    this._col = col
    /** @type {RGB} */
    this._color = Black
    /** @type {RGB} */
    this._flashColor = Black
    /** @type {Pattern} */
    this._pattern = 'solid'
    this._events = new EventTarget()
  }

  get row() { return this._row }
  get col() { return this._col }
  get color() { return this._color }
  get flashColor() { return this._flashColor }
  get pattern() { return this._pattern }

  /** @type { ( type: EventType, listener: (event: PadEvent) => void) => void } */
  addEventListener( type, listener) {
    this._events.addEventListener(type, listener)
  }

  /** @type { ( type: EventType, listener: (event: PadEvent) => void) => void } */
  removeEventListener( type, listener) {
    this._events.addEventListener(type, listener)
  }

  /** @type { ( color: RGB) => void } */
  setColor(color) {
    this._color = color
    this._flashColor = Black
    this._pattern = 'solid'
  }

  /** @type { ( color: RGB) => void } */
  setPulse(color) {
    this._color = color
    this._flashColor = Black
    this._pattern = 'pulse'
  }

  /** @type { ( colorOn: RGB, colorOff: RGB) => void } */
  setFlash(colorOn, colorOff) {
    this._color = colorOn
    this._flashColor = colorOff
    this._pattern = 'flash'
  }
}

/** @typedef { import('../types').RGB } RGB */
/** @typedef { import('../types').IPad } IPad */
/** @typedef { import('../types').PadEvent } PadEvent */
/** @typedef { import('../types').PadEventType } EventType */
/** @typedef { import('../types').Pattern } Pattern */
