const RGBpattern1 = /#[0123456789ABCDEF]{3}/
const RGBpattern2 = /#[0123456789ABCDEF]{6}/

/** @type { (string: string) => RGB } */
export function stringToRgb(string) {
  let { r, g, b } = { r: '', g: '', b: '' }
  if (string.match(RGBpattern1)) {
    r = string.slice(1, 3)
    g = string.slice(3, 5)
    b = string.slice(5, 7)
  } else if (string.match(RGBpattern2)) {
    r = string.slice(1, 2)
    g = string.slice(2, 3)
    b = string.slice(3, 4)
  } else {
    throw new Error(`invalid color value ${string}`)
  }

  const [ar, ag, ab] = [ parseInt(r, 16), parseInt(g, 16), parseInt(b, 16) ]
  if (isNaN(ar + ag + ab)) throw new Error(`invalid hex color value ${string}`)
  return { r: ar, g: ag, b: ab }
}

/** @type { (rgb: RGB) => string } */
export function rgbToString(rgb) {
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`
}

/** @type { (n: number) => string } */
function toHex(n) {
  return n.toString(16).padStart(2, '0')
}

/** @typedef { import('../types').RGB } RGB */
