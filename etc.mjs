import {p} from './util.mjs'
import './runtime.mjs'

export default p

// Detects if the platform is constrained by Cancerous Security Policy.
p.csp = p.uwp || p.chromeapp || false

if (p.nwjs) {
	p.dev = process.versions['nw-flavor'] === 'sdk'
} else if (p.electron) {
	p.dev = process.execPath.replace(/\\/g, '/').includes('node_modules/electron/')
} else if (p.uwp) {
	p.dev = Windows.ApplicationModel.Package.current.isDevelopmentMode
} else if (p.web) {
	// toString on object is only called in developer tools in console.
	// NOTE: Printing extra empty line into console is not ideal but it's the only reliable way.
	//       Window size checking seemed to be somewhat reliable but was failing on Tizen smart TV in the end.
	let temp = /./
	temp.toString = () => p.dev = true
	console.log('%c', temp)
	// TODO: doesnt work anymore in latest chrome
} else if (p.node) {
	p.dev = process.env.NODE_ENV !== 'production'
} else {
	// Detects if NW.JS runs in SDK version (console available) and if Electron is executed from npm/node_modules/electron global.
	// TODO: would be nice to detect if UWP is attached to Visual Studio debugger.
	p.dev = false
}