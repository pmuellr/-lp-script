import '../globals.mjs'

console.log(`midi: `, midi)
console.log(`launchpad: `, launchpad)

const midiPorts = midi.listPorts()
console.log(midiPorts.join('\n'))
