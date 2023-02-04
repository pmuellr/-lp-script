/** @type { <T>(set: Set<T>, fn: (elem:T) => boolean) => Set<T> } */
export function filter(set, fn) {
  const result = newSetWithType(set)

  for (const elem of set) {
    if (fn(elem)) result.add(elem)
  }

  return result
}

/** @type { <T,R>(set: Set<T>, fn: (elem:T) => R) => Set<R> } */
export function map(set, fn) {
  const result = new Set()
  for (const elem of set) {
    result.add(fn(elem))
  }

  return result
}
/** @type { <T>(setA: Set<T>, setB: Set<T>) => Set<T> } */
export function union(setA, setB) {
  const result = newSetWithType(setA)

  for (const el of setA) result.add(el) 
  for (const el of setB) result.add(el) 

  return result
}

/** @type { <T>(setA: Set<T>, setB: Set<T>) => Set<T> } */
export function intersection(setA, setB) {
  const result = newSetWithType(setA)

  for (const el of setA) {
    if (setB.has(el)) {
      result.add(el)
    }
  }

  return result
}

/** @type { <T>(setA: Set<T>, setB: Set<T>) => Set<T> } */
export function without(setA, setB) {
  const result = new Set(setA)

  for (const el of setB) {
    result.delete(el)
  }

  return result
}

/** @type { <T>(set: Set<T>) => Set<T> } */
function newSetWithType(set) {
  const result =  new Set(set)
  result.clear()
  return result
}
