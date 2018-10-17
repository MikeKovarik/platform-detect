import {ua, hasWindow, registerQuery} from './util.mjs'
import {edge} from './browser.mjs'


// minimal EventEmitter like API for notifying abou changes
var listeners = {}
export function on(name, listener) {
	listeners[name] = listeners[name] || new Set
	listeners[name].add(listener)
}
export function removeListener(name, listener) {
	if (listeners[name])
		listeners[name].delete(listener)
}
function emit(name, value) {
	if (listeners[name])
		listeners[name].forEach(listener => listener(value))
}

// string 'portrait' or 'landscape'
export var orientation
// bool
export var portrait
// bool
export var landscape
// string 'phone,' 'tablet', 'desktop' or 'tv'
export var formFactor
// float number of the scale of how many physical pixels are used to render one logical pixel.
export var pixelRatio
// bool whether the device has a touchscreen. If it has, it's always true, regardless of
// current primary input type and tablet mode state.
export var touchscreen
// string of current primary input type 'mouse' or 'touch'.
// It's watched and may change when keyboard is attached/detached on hybrid devices.
export var inputType
// bool representation of inputType. True when primary input type is touch (phones, tablet mode)
export var touch
// bool representation of inputType. True when primary input type is mouse (desktops, laptops)
export var mouse
// bool. Just like inputType, but is true when touch is the primary input type.
export var tabletMode
// bool
// TODO: implement
export var hasBattery

if (hasWindow) {

	pixelRatio = parseFloat(window.devicePixelRatio.toFixed(2))
	touchscreen = navigator.maxTouchPoints > 0

	// TODO: apply some light transpilation with babel because my relatively new smart tv runs tizen
	// with 2 years old chromium which doesn't support destructuring syntax.
	var width = window.screen.width
	var height = window.screen.height
	var shorter = Math.min(width, height)

	registerQuery('(orientation: portrait)', bool => {
		portrait = bool
		landscape = !bool
		orientation = bool ? 'portrait' : 'landscape'
		emit('orientation', orientation)
	})

	// WARNING: this doesn't work in Edge as of Windows 1809, tested on Surface Pro.
	// Works well in chrome though. Edge doesn't change pointer to coarse in tablet mode.
	if (edge) {
		updatePointer(touchscreen)
	} else {
		registerQuery('(pointer: coarse)', updatePointer)
	}
	function updatePointer(coarse) {
		touch = coarse
		mouse = !coarse
		inputType = coarse ? 'touch'  : 'mouse'
		tabletMode = coarse
		emit('inputType', inputType)
		emit('tabletMode', tabletMode)
		var newFormFactor = getFormFactor()
		if (newFormFactor !== formFactor) {
			emit('formFactor', formFactor)
			formFactor = newFormFactor
		}
	}

	function getFormFactor() {
		// TODO: add 'iot' or some other form of window-less app or monitor-less hardware.
		if (ua.includes('TV'))
			return 'tv'
		else if (touch && shorter < 600)
			return 'phone'
		else if (touch)
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