export interface MidiLibrary {
  listPorts(): string[]
  openPort(name: string): MidiPort
}

export interface MidiPort {
  readonly name:   string
  readonly iName:  string
  readonly oName:  string
  readonly iIndex: number
  readonly oIndex: number
  getMessage(): Promise<{ deltaTime: number, message: number[] }>
  sendMessage(message: number[]): void
  close(): void
}
