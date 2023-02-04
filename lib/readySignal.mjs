/** @template T @typedef { { wait(): Promise<T>; signal(value: T): void; isEmitted(): boolean; } } ReadySignal */

/** @type { <T>() => ReadySignal<T> } */
export function createReadySignal() {
  /** @type { <T>(value: T) => void} */
  let resolver
  let emitted = false

  const promise = new Promise((resolve) => {
    resolver = resolve
  })

  async function wait() {
    return await promise
  }

  /** @type { <T>(value: T) => void} */
  function signal(value) {
    emitted = true
    resolver(value)
  }

  function isEmitted() {
    return emitted
  }

  return { wait, signal, isEmitted }
}
