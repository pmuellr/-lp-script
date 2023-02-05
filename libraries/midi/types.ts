export interface NoteOnMessage { channel: number, note: number, velocity: number }
export interface NoteOffMessage { channel: number, note: number, velocity: number }
export interface CcMessage { channel: number, control: number, value: number }
export interface SysexMessage { data: number[] }
  
export interface MessageHandler {
  onMessage?(midiPort: MidiPort, deltaTime: number, message: number[])
  onNoteOn?(midiPort: MidiPort, deltaTime: number, message: NoteOnMessage)
  onNoteOff?(midiPort: MidiPort, deltaTime: number, message: NoteOffMessage)
  onCc?(midiPort: MidiPort, deltaTime: number, message: CcMessage)
  onSysex?(midiPort: MidiPort, deltaTime: number, message: SysexMessage)
}
export interface MidiLibrary {
  listPorts(): string[]
  openPort(name: string, messageHandler?: MessageHandler): MidiPort
}

export interface MidiPort {
  readonly name:   string
  readonly iName:  string
  readonly oName:  string
  readonly iIndex: number
  readonly oIndex: number
  sendMessage(message: number[]): void
  close(): void
}
