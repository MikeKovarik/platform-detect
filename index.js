(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('platform-detect', ['exports'], factory) :
	(factory((global['platform-detect'] = {})));
}(this, (function (exports) { 'use strict';

	// The app has a window to render DOM content in.
	exports.hasWindow = typeof navigator !== 'undefined' && typeof window !== 'undefined';
	// NW.JS' background script loads into invisible empty HTML page.
	// Therefore NW.JS "main" script has all of window, document, navigator objects
	// and window.open() won't be null if App's window is launched from such "main".
	if (exports.hasWindow && typeof nw !== 'undefined') {
		try {
			nw.Window.get();
		} catch(err) {
			exports.hasWindow = false;
		}
	}

	// The app runs in terminal/console and can only use console.log.
	var isConsole = !exports.hasWindow;

	var ua = exports.hasWindow ? navigator.userAgent : undefined;

	function registerQuery(query, handler) {
		var mql = window.matchMedia(query);
		handler(mql.matches);
		var listener = () => handler(mql.matches);
		mql.addListener(listener);
		return () => mql.removeListener(listener)
	}

	// Fully functional Node & core modules.
	// it is true for Node.js, Electron, NW.JS
	// it is false for browsers with shims or bundles of some Node modules (shimmed process, EventEmitter, etc..)
	var node = typeof process !== 'undefined'
		&& !!process.versions
		&& !!process.versions.node;

	// Detects if the APP is launched as standalone Progressive Web App. Still a website, but looking like OS app, without url bar.
	// TODO: WARNING: this returns true even for popup windows created with window.open()
	var pwa = exports.hasWindow
		&& window.matchMedia('(display-mode: standalone)').matches
		&& (document.head.querySelector('[rel="manifest"]') !== null);

	// Windows 10 app - Universal Windows Platform.
	var uwp = typeof Windows !== 'undefined'
		&& typeof MSApp !== 'undefined';

	// Node + Chromium
	var nwjs     = !!(node && process.versions.nw);
	var electron = !!(node && process.versions.electron);

	// Cordova mobile app
	var cordova = !!(exports.hasWindow && window.cordova);

	// Chrome app (Chrome OS app)
	var chromeapp = false; // todo

	// The platform requires app to be compiled, bundled or packaged.
	var packaged = uwp || nwjs || electron || cordova || chromeapp;

	// The app runs inside browser and is served from a server or browser cache.
	var web = !node && !packaged;

	// App is a plain old webpage and not a PWA.
	var website = web && !pwa;

	// Script is executed inside Web Worker
	var worker = !exports.hasWindow
		&& typeof self !== 'undefined'
		&& self.importScripts !== undefined
		&& self.close !== undefined;

	var serviceWorker = undefined; // TODO

	// Supports service workers
	//var supportsServiceWorker = typeof navigator !== 'undefined' && !!navigator.serviceWorker && !!navigator.serviceWorker.register

	// TODO: figure out if these should be mutually exclusive (Tizen and Android are based on linux and have Linux in their user agents)
	var windows  = node ? process.platform === 'win32'  : ua.includes('Windows');
	var macosx   = node ? process.platform === 'darwin' : ua.includes('Macintosh');
	var linux    = node ? process.platform === 'linux'  : ua.includes('Linux'); // TODO: detect in browser properly. NOTE: Android and Tizen are based on Linux and will result in true
	var ios      = false; // TODO
	var chromeos = exports.hasWindow ? ua.includes('CrOS') : false; // TODO
	var android  = exports.hasWindow ? ua.includes('Android') : false; // TODO
	var tizen    = exports.hasWindow ? ua.includes('Tizen') : false; // TODO

	// These return true if their rendering engine is used to render the app.
	// I.e: UWP apps are rendered by Edge's EdgeHTML, Electron/NWJS apps are rendered by Chromium.

	// https://blogs.windows.com/msedgedev/2017/10/05/microsoft-edge-ios-android-developer/#49Fi4TfpgzHAwuXQ.97
	var edgeAndroid = exports.hasWindow && ua.includes('EdgiOS/');
	var edgeIos     = exports.hasWindow && ua.includes('EdgA/');
	var edgeWin     = exports.hasWindow && ua.includes('Edge/');
	// NOTE: Only returnin true for Edge (EdgeHtml) on windows. Android/iOs versions of Edge are powered by Webkit.
	var edge    = edgeWin;
	var chrome  = exports.hasWindow && ua.includes('Chrome') && !edge;
	var safari  = exports.hasWindow && ua.includes('Safari'); // TODO: verify
	var firefox = undefined; // TODO

	// RENDERING & JS ENGINES

	var edgeHtml = edgeWin;
	var webkit   = chrome || edgeAndroid || edgeIos || safarai;
	var blink    = chrome || edgeAndroid || opera;
	//export var gecko    = firefox

	// bool
	var hasBattery;

	if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {

		exports.pixelRatio = parseFloat(window.devicePixelRatio.toFixed(2));
		exports.touchscreen = navigator.maxTouchPoints > 0;

		// TODO: apply some light transpilation with babel because my relatively new smart tv runs tizen
		// with 2 years old chromium which doesn't support destructuring syntax.
		var width = window.screen.width;
		var height = window.screen.height;
		var longer  = Math.max(width, height);
		var shorter = Math.min(width, height);

		registerQuery('(orientation: portrait)', bool => {
			exports.portrait = bool;
			exports.landscape = !bool;
			exports.orientation = bool ? 'portrait' : 'landscape';
			//onupdate && onupdate()
		});

		// WARNING: this doesn't work in Edge as of Windows 1809, tested on Surface Pro.
		// Works well in chrome though. Edge doesn't change pointer to coarse in tablet mode.
		if (edgeWin) {
			updatePointer(exports.touchscreen);
		} else {
			registerQuery('(pointer: coarse)', updatePointer);
		}
		function updatePointer(coarse) {
			exports.touch = coarse;
			exports.mouse = !coarse;
			exports.inputType = coarse ? 'touch'  : 'mouse';
			exports.tabletMode = coarse;
			exports.formFactor = getFormFactor();
			//onupdate && onupdate()
		}

		function getFormFactor() {
			console.log("ua.includes('TV')", ua.includes('TV'));
			console.log("touch", exports.touch);
			console.log("shorter < 600", shorter < 600);
			console.log("hasBattery", hasBattery);
			// TODO: add 'iot' or some other form of window-less app or monitor-less hardware.
			if (ua.includes('TV'))
				return 'tv'
			else if (exports.touch && shorter < 600)
				return 'phone'
			else if (exports.touch)
				return 'tablet'
			else if (hasBattery)
				return 'laptop'
			else
				return 'desktop'
		}

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

	// Detects if the platform is constrained by Cancerous Security Policy.
	var csp = uwp || chromeapp;

	// Detects if NW.JS runs in SDK version (console available) and if Electron is executed from npm/node_modules/electron global.
	// TODO: would be nice to detect if UWP is attached to Visual Studio debugger.
	exports.dev = false;

	if (nwjs) {
		exports.dev = process.versions['nw-flavor'] === 'sdk';
	} else if (electron) {
		exports.dev = process.execPath.replace(/\\/g, '/').includes('node_modules/electron/');
	} else if (uwp) {
		exports.dev = Windows.ApplicationModel.Package.current.isDevelopmentMode;
	} else if (web) {
		if (exports.hasWindow) {
			// Matching window size is a good first indicator but it isn't bulletproof.
			// It won't work when devtools are detached from main window or in chrome remote debugging.
			exports.dev = window.outerWidth - window.innerWidth > 50
				// NOTE: height has to incorporate at least 88px tall toolbar (even greater with touch UI).
				|| window.outerHeight - window.innerHeight > 140;
		}
		if (!exports.dev) {
			// toString on object is only called in developer tools in console.
			let temp = /./;
			temp.toString = () => exports.dev = true;
			console.log('%c', temp);
		}
	} else if (node) {
		exports.dev = process.env.NODE_ENV !== 'production';
	}

	exports.isConsole = isConsole;
	exports.ua = ua;
	exports.registerQuery = registerQuery;
	exports.node = node;
	exports.pwa = pwa;
	exports.uwp = uwp;
	exports.nwjs = nwjs;
	exports.electron = electron;
	exports.cordova = cordova;
	exports.chromeapp = chromeapp;
	exports.packaged = packaged;
	exports.web = web;
	exports.website = website;
	exports.worker = worker;
	exports.serviceWorker = serviceWorker;
	exports.windows = windows;
	exports.macosx = macosx;
	exports.linux = linux;
	exports.ios = ios;
	exports.chromeos = chromeos;
	exports.android = android;
	exports.tizen = tizen;
	exports.edgeAndroid = edgeAndroid;
	exports.edgeIos = edgeIos;
	exports.edgeWin = edgeWin;
	exports.edge = edge;
	exports.chrome = chrome;
	exports.safari = safari;
	exports.firefox = firefox;
	exports.edgeHtml = edgeHtml;
	exports.webkit = webkit;
	exports.blink = blink;
	exports.hasBattery = hasBattery;
	exports.csp = csp;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
