import { rgbToString, stringToRgb } from './rgb.mjs'

/** @type { RGB[] } */
const Palette = []

/** @type { Map<string, number> } */
const PaletteCache = new Map()

initialize()

/** @type { (rgb: RGB) => number } */
export function rgb2palette(rgb) {
  const string = rgbToString(rgb)
  const cached = PaletteCache.get(string)
  if (cached != null) return cached

  let closestDistance = Number.MAX_SAFE_INTEGER
  let closestIndex = -1

  for (let i=0; i<Palette.length; i++) {
    const distance = getDistance(rgb, Palette[i])
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = i
    }

    if (closestDistance === 0) break
  }

  PaletteCache.set(string, closestIndex)
  return closestIndex
}

/** @type { (rgb1: RGB, rgb2: RGB) => number } */
function getDistance(rgb1, rgb2) {
  const [ rd, gd, bd ] = [rgb1.r - rgb2.r, rgb1.g - rgb2.g, rgb1.b - rgb2.b]
  return rd*rd + gd*gd + bd*bd // don't really need to sqrt this :-)
}

function initialize() {
  Palette.push(stringToRgb('#000000'))
  Palette.push(stringToRgb('#2A2A2A'))
  Palette.push(stringToRgb('#555555'))
  Palette.push(stringToRgb('#7F7F7F'))

  // add remaining entries :-)
}

/** @typedef { import('./types').RGB } RGB */
