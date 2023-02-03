import { Pad } from './pad.mjs'

/** @type { IPad[][] } */ 
const Pads = []

// Note that only the "bigger/better" Launchpads have the extra column
// of buttons on the left (column 0) and the extra row of buttons on the
// bottom (row 0).
// So Launchpad mini goes from (1,1) to (9,9), bigger goes from (0,0) to (9,9).
// Also, (0,0) is not a real pad, and (9,9) does not generate input events.
const PadRows = 10
const PadCols = 10

initialize()

/** @type { (row: number, col: number) => IPad } */
export function getPad(row, col) {
  if (row < 0 || row >= PadRows) throw new Error(`invalid row: ${row}`)
  if (col < 0 || col >= PadCols) throw new Error(`invalid col: ${col}`)
  return Pads[row][col]
}

/** @type { () => IPad[][] } */
export function getPads(row1 = 0, row2 = PadRows-1, col1 = 0, col2 = PadCols-1) {
  /** @type { IPad[][] } */ 
  const result = []

  // get the values in order, if they weren't already
  const [ rowA, rowB ] = [ Math.min(row1, row2), Math.max(row1, row2)]
  const [ colA, colB ] = [ Math.min(col1, col2), Math.max(col1, col2)]

  if (rowA === rowB || colA === colB) return result
  if (rowA < 0 || rowB >= PadRows) return result
  if (colA < 0 || colB >= PadCols) return result

  for (let row=rowA; row<=rowB; row++) {
    /** @type { IPad[] } */ 
    const resultRow = []
    result.push(resultRow)
    for (let col=colA; col<=colB; col++) {
      resultRow.push(Pads[row][col])
    }
  }
  return result
}

function initialize() {
  for (let row=0; row<10; row++) {
    /** @type { IPad[] } */ 
    const row = []
    Pads.push(row)
    for (let col=0; col<10; col++) {
      /** @type { IPad } */ 
      const pad = new Pad(row, col);
      row.push(pad)
    }
  }
}

/** @typedef { import('../types').IPad } IPad */
/** @typedef { import('../types').PadEvent } PadEvent */
/** @typedef { import('../types').PadEventType } EventType */
/** @typedef { import('../types').Pattern } Pattern */
