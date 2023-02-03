lp-script - Novation Launchpad script runner
================================================================================

TODO - intro


usage
================================================================================


    lp-script <script-file-name>

The following environment variables can be used:

`DEBUG` - print extra debugging information

`LAUNCHPAD_NAME` - a substring of the name of the Launchpad ports to use, instead
of using the default ports the code will pick.


libraries
================================================================================

The following libraries are available as built-in globals:

- `lp` - contains low-level functions to access the Launchpad device
- `midi` - contains functions to read / write MIDI data


library `lp`
================================================================================

`setPadColor(x: number, y: number, color: number): void`

blah blah

`setPadPulse(x: number, y: number, color: number): void`

blah blah

`setPadFlash(x: number, y: number, colorOn: number): void`

blah blah

`async onEvent(eventName: string, handler: (event:Event) => void): void`

blah blah


library `midi`
================================================================================

`createMidiPort(name: string): MidiPort`

blah blah


install
================================================================================

    npm install -g pmuellr/lp-script


license
================================================================================

This package is licensed under the MIT license.  See the [LICENSE.md][] file
for more information.


contributing
================================================================================

Awesome!  We're happy that you want to contribute.

Please read the [CONTRIBUTING.md][] file for more information.


[LICENSE.md]: LICENSE.md
[CONTRIBUTING.md]: CONTRIBUTING.md
[CHANGELOG.md]: CHANGELOG.md