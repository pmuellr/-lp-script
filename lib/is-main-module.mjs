import * as url from 'node:url'

// see: https://2ality.com/2022/07/nodejs-esm-main.html

/** @type { (metaUrl: string) => boolean }  */
export function isMainModule(metaUrl) {
  if (!metaUrl.startsWith('file:')) return false

  const modulePath = url.fileURLToPath(metaUrl);
  return (process.argv[1] === modulePath)
}

