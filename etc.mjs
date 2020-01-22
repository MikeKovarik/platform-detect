import {p} from './util.mjs'
import './runtime.mjs'

export default p

// Detects if the platform is constrained by Cancerous Security Policy.
p.csp = p.uwp || false

// Detects if NW.JS runs in SDK version (console available) and if Electron is executed from npm/node_modules/electron global.
if (p.nwjs) {
	p.dev = process.versions['nw-flavor'] === 'sdk'
} else if (p.electron) {
	p.dev = process.execPath.replace(/\\/g, '/').includes('node_modules/electron/')
} else if (p.uwp) {
	p.dev = Windows.ApplicationModel.Package.current.isDevelopmentMode
} else if (p.node) {
	p.dev = process.env.NODE_ENV !== 'production'
//} else if (p.web) {
//	p.dev = undefined // no longer working in latest chrome
} else {
	// TODO: would be nice to detect if UWP is attached to Visual Studio debugger.
	p.dev = undefined
}