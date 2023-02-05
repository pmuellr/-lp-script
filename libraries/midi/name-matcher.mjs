import { intersection, union } from '../../lib/set-extras.mjs'

/** @typedef {  { matched: string[], notMatched: string[], closeMatched: string[][] } } MatchNamesResult */

/** @type { (listA: IterableIterator<string>, listB: IterableIterator<string>) => MatchNamesResult } */
export function matchNames(listA, listB) {
  const resultNotMatchedSet = newStringSet()
  /** @type { string[][] } */
  const closeMatched = []

  const setA = new Set(listA)
  const setB = new Set(listB)

  // perfect matches
  const resultMatchedSet = intersection(setA, setB)
  for (const elem of resultMatchedSet) {
    setA.delete(elem)
    setB.delete(elem)
  }

  // match except for first word
  for (const elemA of setA) {
    const elemAMod = firstWordRemoved(elemA)
    for (const elemB of setB) {
      const elemBMod = firstWordRemoved(elemB)

      if (elemAMod === elemBMod) {
        closeMatched.push([elemAMod, elemA, elemB])
      }
    }
  }

  for (const entry of closeMatched) {
    const [computedName, elemA, elemB] = entry
    setA.delete(elemA)
    setB.delete(elemB)
  }

  // match except for last word
  for (const elemA of setA) {
    const elemAMod = lastWordRemoved(elemA)
    for (const elemB of setB) {
      const elemBMod = lastWordRemoved(elemB)

      if (elemAMod === elemBMod) {
        closeMatched.push([elemAMod, elemA, elemB])
      }
    }
  }

  for (const entry of closeMatched) {
    const [computedName, elemA, elemB] = entry
    setA.delete(elemA)
    setB.delete(elemB)
  }

  const matched = Array.from(resultMatchedSet)
  const notMatched = Array.from(union(setA, setB))

  return { matched, notMatched, closeMatched }
}

function newStringSet() {
  const set = new Set([''])
  set.clear()
  return set
}

/** @type { (s: string) => s } */
function firstWordRemoved(s) {
  const words = s.trim().split(/\s+/g)
  words.shift()

  if (words.length === 0) return s
  return words.join(' ')
}

/** @type { (s: string): s } */
function lastWordRemoved(s) {
  const words = s.trim().split(/\s+/g)
  words.pop()
 
  if (words.length === 0) return s
  return words.join(' ')
}