import * as midi from '../midi/index.mjs'
import { logDebug } from '../../lib/log.mjs'

function connectLaunchpad() {
  const port = getLaunchpadPort()
  midi.openPort(port)
}

function getLaunchpadPort() {
  const ports = midi.listPorts().filter(port => port.match(/launchpad/i))
  console.log(`getLaunchpadPort candidates: ${ports}`)  

  const port = ports.sort((a, b) => b.length - a.length)[0]
  console.log(`getLaunchpadPort final:      ${port}`)  

  return port
}