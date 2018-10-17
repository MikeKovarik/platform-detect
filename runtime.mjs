import {hasWindow} from './util.mjs'


// Fully functional Node & core modules.
// it is true for Node.js, Electron, NW.JS
// it is false for browsers with shims or bundles of some Node modules (shimmed process, EventEmitter, etc..)
export var node = typeof process !== 'undefined'
	&& !!process.versions
	&& !!process.versions.node

// Detects if the APP is launched as standalone Progressive Web App. Still a website, but looking like OS app, without url bar.
// TODO: WARNING: this returns true even for popup windows created with window.open()
export var pwa = hasWindow
	&& window.matchMedia('(display-mode: standalone)').matches
	&& (document.head.querySelector('[rel="manifest"]') !== null)

// Windows 10 app - Universal Windows Platform.
export var uwp = typeof Windows !== 'undefined'
	&& typeof MSApp !== 'undefined'

// Node + Chromium
export var nwjs     = !!(node && process.versions.nw)
export var electron = !!(node && process.versions.electron)

// Cordova mobile app
export var cordova = !!(hasWindow && window.cordova)

// Chrome app (Chrome OS app)
export var chromeapp = false // todo

// The platform requires app to be compiled, bundled or packaged.
export var packaged = uwp || nwjs || electron || cordova || chromeapp

// The app runs inside browser and is served from a server or browser cache.
export var web = !node && !packaged

// App is a plain old webpage and not a PWA.
export var website = web && !pwa

// Script is executed inside Web Worker
export var worker = !hasWindow
	&& typeof self !== 'undefined'
	&& self.importScripts !== undefined
	//&& self.close !== undefined

export var serviceWorker = worker && !!navigator.serviceWorker.controller

// Supports service workers
//var supportsServiceWorker = typeof navigator !== 'undefined' && !!navigator.serviceWorker && !!navigator.serviceWorker.register
