import { MidiLibrary } from './libraries/midi/types'
import { LaunchpadLibrary } from './libraries/launchpad/types'

export interface Libraries {
  midi: MidiLibrary,
  launchpad: LaunchpadLibrary,
}
