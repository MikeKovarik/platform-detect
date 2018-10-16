var p = {}
export default p

// The app has a window to render DOM content in.
p.window = typeof navigator !== 'undefined' && typeof window !== 'undefined'
// NW.JS' background script loads into invisible empty HTML page.
// Therefore NW.JS "main" script has all of window, document, navigator objects
// and window.open() won't be null if App's window is launched from such "main".
if (p.window && typeof nw !== 'undefined') {
	try {
		nw.Window.get()
	} catch(err) {
		p.window = false
	}
}
// The app runs in terminal/console and can only use console.log.
p.console = !p.window

var ua = p.window ? navigator.userAgent : undefined

function registerQuery(query, handler) {
	var mql = window.matchMedia(query)
	handler(mql.matches)
	var listener = () => handler(mql.matches)
	mql.addListener(listener)
	return () => mql.removeListener(listener)
}



////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// RUNTIME ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Fully functional Node & core modules.
// it is true for Node.js, Electron, NW.JS
// it is false for browsers with shims or bundles of some Node modules (shimmed process, EventEmitter, etc..)
p.node = typeof process !== 'undefined'
	&& !!process.versions
	&& !!process.versions.node

// Detects if the APP is launched as standalone Progressive Web App. Still a website, but looking like OS app, without url bar.
// TODO: WARNING: this returns true even for popup windows created with window.open()
p.pwa = p.window
	&& window.matchMedia('(display-mode: standalone)').matches
	&& (document.head.querySelector('[rel="manifest"]') !== null)

// Windows 10 app - Universal Windows Platform.
p.uwp = typeof Windows !== 'undefined'
	&& typeof MSApp !== 'undefined'

// Node + Chromium
p.nwjs     = !!(p.node && process.versions.nw)
p.electron = !!(p.node && process.versions.electron)

// Cordova mobile app
p.cordova = !!(p.window && window.cordova)

// Chrome app (Chrome OS app)
p.chromeapp = false // todo

// Is the app just a plain old website, in a browsers, without node or any other special system bindings.
p.web     = !p.node && !p.uwp && !p.nwjs && !p.electron && !p.cordova && !p.chromeapp// && typeof window === 'object'
p.browser = !p.node && !p.uwp && !p.nwjs && !p.electron && !p.cordova && !p.chromeapp && !p.pwa

// Script is executed inside Web Worker
p.worker = !p.window
	&& typeof self !== 'undefined'
	&& self.importScripts !== undefined
	&& self.close !== undefined

p.serviceWorker = undefined // TODO



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// OS //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// TODO: figure out if these should be mutually exclusive (Tizen and Android are based on linux and have Linux in their user agents)
p.windows  = p.node ? process.platform === 'win32'  : ua.includes('Windows')
p.macosx   = p.node ? process.platform === 'darwin' : ua.includes('Macintosh')
p.linux    = p.node ? process.platform === 'linux'  : ua.includes('Linux') // TODO: detect in browser properly. NOTE: Android and Tizen are based on Linux and will result in true
p.ios      = false // TODO
p.chromeos = p.window ? ua.includes('CrOS') : false // TODO
p.android  = p.window ? ua.includes('Android') : false // TODO
p.tizen    = p.window ? ua.includes('Tizen') : false // TODO



////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// BROWSER ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// These return true if their rendering engine is used to render the app.
// I.e: UWP apps are rendered by Edge's EdgeHTML, Electron/NWJS apps are rendered by Chromium.

// https://blogs.windows.com/msedgedev/2017/10/05/microsoft-edge-ios-android-developer/#49Fi4TfpgzHAwuXQ.97
p.edgeAndroid = p.window && ua.includes('EdgiOS/')
p.edgeIos     = p.window && ua.includes('EdgA/')
p.edgeWin     = p.window && ua.includes('Edge/')
// NOTE: Only returnin true for Edge (EdgeHtml) on windows. Android/iOs versions of Edge are powered by Webkit.
p.edge    = p.edgeWin
p.chrome  = p.window && ua.includes('Chrome') && !p.edge
p.safari  = p.window && ua.includes('Safari') // TODO: verify
p.firefox = undefined // TODO

// RENDERING & JS ENGINES

p.edgeHtml = p.edgeWin
p.webkit   = p.chrome || p.edgeAndroid || p.edgeIos || p.safarai
p.blink    = p.chrome || p.edgeAndroid || p.opera
//p.gecko    = p.firefox



////////////////////////////////////////////////////////////////////////////////
//////////////////// SCREEN,  FORM FACTOR, DEVICE FEATURES ////////////////////
////////////////////////////////////////////////////////////////////////////////

registerQuery('(pointer: coarse)', bool => {
	p.touch = bool
	p.mouse = !bool
	p.pointer = bool ? 'coarse' : 'fine'
	p.tabletMode = bool
	p.onupdate && p.onupdate()
})

registerQuery('(orientation: portrait)', bool => {
	p.portrait = bool
	p.landscape = !bool
	p.orientation = bool ? 'portrait' : 'landscape'
	p.onupdate && p.onupdate()
})

p.touchscreen = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0

if (p.window) {
		p.pixelRatio = parseFloat(window.devicePixelRatio.toFixed(2))
	// TODO: phone, table, desktop, tv
	if (ua.includes('TV'))
		p.devieType = 'tv'
	else
		p.devieType = 'desktop'
}



////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// OTHER ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Detects if the platform is constrained by Cancerous Security Policy.
p.csp = p.uwp || p.chromeapp
// Detects if NW.JS runs in SDK version (console available) and if Electron is executed from npm/node_modules/electron global.
// TODO: would be nice to detect if UWP is attached to Visual Studio debugger.
p.dev = false
if (p.nwjs) {
	p.dev = process.versions['nw-flavor'] === 'sdk'
} else if (p.electron) {
	p.dev = process.execPath.replace(/\\/g, '/').includes('node_modules/electron/')
} else if (p.uwp) {
	p.dev = Windows.ApplicationModel.Package.current.isDevelopmentMode
} else if (p.browser) {
	if (p.window) {
		// Matching window size is a good first indicator but it isn't bulletproof.
		// It won't work when devtools are detached from main window or in chrome remote debugging.
		p.dev = window.outerWidth - window.innerWidth > 50
			// NOTE: height has to incorporate at least 88px tall toolbar (even greater with touch UI).
			|| window.outerHeight - window.innerHeight > 140
	}
	if (!p.dev) {
		// toString on object is only called in developer tools in console.
		let temp = /./
		temp.toString = () => p.dev = true
		console.log('%c', temp)
	}
} else if (p.node) {
	p.dev = process.env.NODE_ENV !== 'production'
}
// Supports service workers
//var supportsServiceWorker = typeof navigator !== 'undefined' && !!navigator.serviceWorker && !!navigator.serviceWorker.register



/*

Windows.System.Profile.AnalyticsInfo.DeviceForm

var {UIViewSettings, UserInteractionMode} = Windows.UI.ViewManagement
var {AnalyticsInfo} = Windows.System.Profile
var {EasClientDeviceInformation} = Windows.Security.ExchangeActiveSyncProvisioning

function getFormFactor() {
	switch (AnalyticsInfo.versionInfo.deviceFamily) {
		case 'Windows.Mobile':
			return 'Phone'
		case 'Windows.Desktop':
			return UIViewSettings.getForCurrentView().UserInteractionMode == UserInteractionMode.Mouse ? 'Desktop' : 'Tablet'
		case 'Windows.Universal':
			return 'IoT'
		case 'Windows.Team':
			return 'SurfaceHub'
		default:
			return 'Other'
	}
}

*/