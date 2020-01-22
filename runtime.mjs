import {p} from './util.mjs'

export default p

// Fully functional Node & core modules.
// it is true for Node.js, Electron, NW.JS
// it is false for browsers with shims or bundles of some Node modules (shimmed process, EventEmitter, etc..)
p.node = typeof process !== 'undefined'
	&& !!process.versions
	&& !!process.versions.node

// Detects if the APP is launched as standalone Progressive Web App. Still a website, but looking like OS app, without url bar.
// TODO: WARNING: this returns true even for popup windows created with window.open()
p.pwa = p.gui
	&& window.matchMedia('(display-mode: standalone)').matches
	&& (document.head.querySelector('[rel="manifest"]') !== null)

// Windows 10 app - Universal Windows Platform.
p.uwp = typeof Windows !== 'undefined' && typeof MSApp !== 'undefined'

// Node + Chromium
p.nwjs     = !!(p.node && process.versions.nw)
p.electron = !!(p.node && process.versions.electron)

// Cordova mobile app
p.cordova = !!(p.gui && window.cordova)

// The platform requires app to be compiled, bundled or packaged.
p.packaged = p.uwp || p.nwjs || p.electron || p.cordova

// The app runs inside browser and is served from a server or browser cache.
p.web = !p.node && !p.packaged
p.browser = p.web // alias

// App is a plain old webpage and not a PWA.
p.website = p.web && !p.pwa

// Script is executed inside Web Worker
p.worker = !p.gui
	&& typeof self !== 'undefined'
	&& self.importScripts !== undefined
	//&& self.close !== undefined

p.serviceWorker = p.worker && !!navigator.serviceWorker.controller || false