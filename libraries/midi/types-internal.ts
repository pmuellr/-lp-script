export interface MidiPortOptions {
  active: boolean
  sysex:  boolean
  timing: boolean
}

export type OnMessage = (deltaTime: number, message: number[]) => void

export interface MidiPortDesc {
  name:       string
  hasInput:   boolean
  hasOutput:  boolean
  input:  { name: string, index: number }
  output: { name: string, index: number }
}
