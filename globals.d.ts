import * as _ from './lp-script.mjs';

declare global {
    var midi: typeof _.midi
    var launchpad: typeof _.launchpad
}
