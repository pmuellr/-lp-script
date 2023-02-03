import { rgbToString, stringToRgb } from './rgb.mjs'

/** @type { RGB[] } */
const Palette = []

/** @type { Map<string, number> } */
const PaletteCache = new Map()

initialize()

/** @type { (rgb: RGB) => number } */
function rgb2palette(rgb) {
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
  }

  PaletteCache.set(string, closestIndex)
  return closestIndex
}

/** @type { (rgb1: RGB, rgb2: RGB) => number } */
function getDistance(rgb1, rgb2) {
  return (
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  )
}

function initialize() {
  // first 4 entries!
  Palette.push(stringToRgb('#000000'))
  Palette.push(stringToRgb('#2A2A2A'))
  Palette.push(stringToRgb('#555555'))
  Palette.push(stringToRgb('#7F7F7F'))
}

/** @typedef { import('../types').RGB } RGB */
