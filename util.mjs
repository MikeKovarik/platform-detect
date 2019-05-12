// The app has a window to render DOM content in.
export var gui = typeof navigator !== 'undefined' && typeof window !== 'undefined'
// NW.JS' background script loads into invisible empty HTML page.
// Therefore NW.JS "main" script has all of window, document, navigator objects
// and window.open() won't be null if App's window is launched from such "main".
if (gui && typeof nw !== 'undefined') {
	try {
		nw.Window.get()
	} catch(err) {
		gui = false
	}
}

// The app runs in terminal/console and can only use console.log.
export var terminal = !gui

export var ua = gui ? navigator.userAgent : undefined

export function registerQuery(query, handler) {
	var mql = window.matchMedia(query)
	handler(mql.matches)
	var listener = () => handler(mql.matches)
	mql.addListener(listener)
	return () => mql.removeListener(listener)
}

// The holy grail
export var p = {gui, terminal, registerQuery}