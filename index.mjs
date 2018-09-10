// The app has a window to render DOM content in.
var hasWindow = typeof navigator !== 'undefined' && typeof window !== 'undefined'
// NW.JS' background script loads into invisible empty HTML page.
// Therefore NW.JS "main" script has all of window, document, navigator objects
// and window.open() won't be null if App's window is launched from such "main".
if (hasWindow && typeof nw !== 'undefined') {
	try {
		nw.Window.get()
	} catch(err) {
		hasWindow = false
	}
}
// The app runs in terminal/console and can only use console.log.
var isConsole = !hasWindow

var ua = hasWindow ? navigator.userAgent : undefined


// TODO: detext if the script runs in js or esm (if dirname is available)


// RUNTIME

// Fully functional Node & core modules.
// it is true for Node.js, Electron, NW.JS
// it is false for browsers with shims or bundles of some Node modules (shimmed process, EventEmitter, etc..)
var node = typeof process !== 'undefined'
		&& !!process.versions
		&& !!process.versions.node

// Detects if the APP is launched as standalone Progressive Web App. Still a website, but looking like OS app, without url bar.
// TODO: WARNING: this returns true even for popup windows created with window.open()
var pwa = hasWindow
		&& window.matchMedia('(display-mode: standalone)').matches
		&& (document.head.querySelector('[rel="manifest"]') !== null)

// Windows 10 app - Universal Windows Platform.
var uwp = typeof Windows !== 'undefined'
		&& typeof MSApp !== 'undefined'

// Node + Chromium
var nwjs     = !!(node && process.versions.nw)
var electron = !!(node && process.versions.electron)

// Cordova mobile app
var cordova = hasWindow && !!window.cordova

// Chrome app (Chrome OS app)
var chromeapp = undefined // todo

// Is the app just a plain old website, in a browsers, without node or any other special system bindings.
var web     = !node && !uwp && !nwjs && !electron && !cordova && !chromeapp// && typeof window === 'object'
var browser = !node && !uwp && !nwjs && !electron && !cordova && !chromeapp && !pwa// && typeof window === 'object'

// Script is executed inside Web Worker
var worker = !hasWindow
			&& typeof self !== 'undefined'
			&& !!self.importScripts
			&& !!self.close



// OS

var windows  = node ? process.platform === 'win32'  : ua.includes('Windows')
var linux    = node ? process.platform === 'linux'  : undefined // TODO: detect in browser
var macosx   = node ? process.platform === 'darwin' : ua.includes('Macintosh')
var ios      = undefined // TODO
var chromeos = hasWindow && ua.includes('CrOS') // TODO
var android  = hasWindow && ua.includes('Android') // TODO



// BROWSER / RENDERING ENGINE

// These return true if their rendering engine is used to render the app.
// I.e: UWP apps are rendered by Edge's EdgeHTML, Electron/NWJS apps are rendered by Chromium.

// https://blogs.windows.com/msedgedev/2017/10/05/microsoft-edge-ios-android-developer/#49Fi4TfpgzHAwuXQ.97
//var edgeAndroid = hasWindow && ua.includes('EdgiOS/')
//var edgeIos     = hasWindow && ua.includes('EdgA/')
var edgeWindows = hasWindow && ua.includes('Edge/')
// NOTE: Only returnin true for Edge (EdgeHtml) on windows. Android/iOs versions of Edge are powered by Webkit.
var edge        = edgeWindows
var chrome      = hasWindow && ua.includes('Chrome') && !ua.includes('Edge/') // TODO: verify
var safari      = hasWindow && ua.includes('Safari') // TODO: verify
//var firefox     = undefined // TODO
//var webkit  = undefined // TODO
//var v8      = undefined // TODO
//var chakra  = undefined // TODO


// FORM FACTOR / DEVICE FEATURES

var touch = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0
// TODO: something like hasKeyboard, hasMouse, hasInk so this lib could be helpful
// in variety of uwp, node, or iot apps.
// TODO: form factor like desktop, mobile, tablet, laptop


// OTHER

// Detects if the platform is constrained by Cancerous Security Policy.
var csp = uwp || chromeapp
// Detects if NW.JS runs in SDK version (console available) and if Electron is executed from npm/node_modules/electron global.
// TODO: would be nice to detect if UWP is attached to Visual Studio debugger.
var sdk = false
if (nwjs) {
	sdk = process.versions['nw-flavor'] === 'sdk'
} else if (electron) {
	sdk = process.execPath.replace(/\\/g, '/').includes('node_modules/electron/')
} else if (uwp) {
	sdk = Windows.ApplicationModel.Package.current.isDevelopmentMode
} else if (browser) {
	if (hasWindow) {
		// Matching window size is a good first indicator but it isn't bulletproof.
		// It won't work when devtools are detached from main window or in chrome remote debugging.
		sdk  = window.outerWidth  - window.innerWidth  > 50
			// NOTE: height has to incorporate at least 88px tall toolbar (even greater with touch UI).
			|| window.outerHeight - window.innerHeight > 140
	}
	if (!sdk) {
		// toString on object is only called in developer tools in console.
		let temp = /./
		temp.toString = () => sdk = true
		console.log('%c', temp)
	}
}
// Supports service workers
//var supportsServiceWorker = typeof navigator !== 'undefined' && !!navigator.serviceWorker && !!navigator.serviceWorker.register

export default {
	// system
	windows, android, chromeos,
	// rendering engine
	edge, chrome, safari,
	// runtime
	node, web, browser,
	pwa, uwp, cordova, chromeapp, nwjs, electron,
	nw: nwjs,
	// form factor
	touch,
	// app features
	hasWindow,
	isConsole,
	window: hasWindow,
	console: isConsole,
	// other
	csp,
	sdk,
	dev: sdk,
}

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