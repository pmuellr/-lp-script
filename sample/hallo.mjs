import '../globals.mjs'

main()

async function main() {
  console.log(`midi: `, midi)
  console.log(`launchpad: `, launchpad)
  
  const midiPorts = midi.listPorts()
  console.log(midiPorts.join('\n'))
  
  const lpName = 'Launchpad Mini MK3 LPMiniMK3 MIDI'
  const port = midi.openPort(lpName, {
  //onMessage(mp, dt, message) { console.log(`message:  ${JSON.stringify(message)}`) },
    onCc(     mp, dt, message) { console.log(`cc:       ${JSON.stringify(message)}`) },
    onNoteOff(mp, dt, message) { console.log(`note off: ${JSON.stringify(message)}`) },
    onNoteOn( mp, dt, message) { console.log(`note on:  ${JSON.stringify(message)}`) },
    onSysex(  mp, dt, message) { console.log(`sysex:    ${JSON.stringify(message)}`) },
  })
  
  // send device inquiry
  console.log('\nsend device inquiry')
  port.sendMessage([0xF0, 0x7E, 0x7F, 0x06, 0x01, 0xF7])
  await sleep(1000)
  
  console.log('\nread programmer / live mode switch')
  // read programmer / live mode switch for x, mini, pro
  // port.sendMessage([0xF0, 0x00, 0x20, 0x29, 0x02, 0x0C, 0x0E, 0xF7])
  port.sendMessage([0xF0, 0x00, 0x20, 0x29, 0x02, 0x0D, 0x0E, 0xF7])
  // port.sendMessage([0xF0, 0x00, 0x20, 0x29, 0x02, 0x0E, 0x0E, 0xF7])
  await sleep(1000)
  
  // set programmer / live mode switch to programmer
  console.log('\nset programmer / live mode switch to programmer')
  port.sendMessage([0xF0, 0x00, 0x20, 0x29, 0x02, 0x0D, 0x0E, 0x01, 0xF7])
  await sleep(1000)

  console.log('\nread programmer / live mode switch')
  port.sendMessage([0xF0, 0x00, 0x20, 0x29, 0x02, 0x0D, 0x0E, 0xF7])
  await sleep(1000)
  
  // set programmer / live mode switch to live
  console.log('\nset programmer / live mode switch to live')
  port.sendMessage([0xF0, 0x00, 0x20, 0x29, 0x02, 0x0D, 0x0E, 0x00, 0xF7])
  await sleep(1000)

  console.log('\nread programmer / live mode switch')
  port.sendMessage([0xF0, 0x00, 0x20, 0x29, 0x02, 0x0D, 0x0E, 0xF7])
  await sleep(1000)
}
