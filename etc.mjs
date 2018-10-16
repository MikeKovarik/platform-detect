import {hasWindow} from './util.mjs'
import {uwp, nwjs, electron, chromeapp, web, node} from './runtime.mjs'

// Detects if the platform is constrained by Cancerous Security Policy.
export var csp = uwp || chromeapp

// Detects if NW.JS runs in SDK version (console available) and if Electron is executed from npm/node_modules/electron global.
// TODO: would be nice to detect if UWP is attached to Visual Studio debugger.
export var dev = false

if (nwjs) {
	dev = process.versions['nw-flavor'] === 'sdk'
} else if (electron) {
	dev = process.execPath.replace(/\\/g, '/').includes('node_modules/electron/')
} else if (uwp) {
	dev = Windows.ApplicationModel.Package.current.isDevelopmentMode
} else if (web) {
	if (hasWindow) {
		// Matching window size is a good first indicator but it isn't bulletproof.
		// It won't work when devtools are detached from main window or in chrome remote debugging.
		dev = window.outerWidth - window.innerWidth > 50
			// NOTE: height has to incorporate at least 88px tall toolbar (even greater with touch UI).
			|| window.outerHeight - window.innerHeight > 140
	}
	if (!dev) {
		// toString on object is only called in developer tools in console.
		let temp = /./
		temp.toString = () => dev = true
		console.log('%c', temp)
	}
} else if (node) {
	dev = process.env.NODE_ENV !== 'production'
}