/** @type { <T>(o: T) => T } */
export function clone(o) {
  return JSON.parse(JSON.stringify(o))
}