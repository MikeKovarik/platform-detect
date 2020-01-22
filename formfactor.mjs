import {p, ua, registerQuery} from './util.mjs'
import './browser.mjs' // edge

export default p

// minimal EventEmitter like API for notifying abou changes
var listeners = {}
p.on = function(name, listener) {
	listeners[name] = listeners[name] || new Set
	listeners[name].add(listener)
}
p.off = p.removeListener = function(name, listener) {
	if (listeners[name])
		listeners[name].delete(listener)
}
var emit = p.emit = function(name, value) {
	if (listeners[name])
		listeners[name].forEach(listener => listener(value))
}

function applyAndEmit(key, newVal) {
	if (p[key] === newVal) return false
	p[key] = newVal
	emit(key, newVal)
	return true
}


if (p.gui) {

	p.pixelRatio = parseFloat(window.devicePixelRatio.toFixed(2))
	p.gameconsole = ua.includes('Xbox') || ua.includes('PlayStation')

	var gamepadCount = 0
	window.addEventListener('gamepadconnected', e => gamepadCount++)
	window.addEventListener('gamepaddisconnected', e => gamepadCount--)

	if (p.gameconsole) {

		// WARNING: do not use Gamepad API unless necessary. On Xbox it automatically hides pointer and shows warning that the site uses
		//          custom gamepad controls. We don't want to trigger that. This library only observes.
		p.gamepad = true
		p.mouse = true // this is controvertial. if app decides to use gamepad controls, then it doesnt have the mouse & hover anymore
		p.touch = false
		p.tv = true
		p.battery = false
		p.phone = p.tablet = p.hybrid = p.laptop = p.desktop = false
		p.formfactor = 'gameconsole'

	} else {

		p.touch = navigator.maxTouchPoints > 0
		p.tv = ua.includes('TV')

		// TODO: detect when gamepad is custom handled (and used not just used to control the emulated pointer on smart TVs)
		// TODO: throw gamepad into the platform.input

		// warning: older browsers filled used undefined instead of null
		gamepadCount = navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(g => g !== null && g !== undefined).length : 0
		p.gamepad = gamepadCount > 0

		registerQuery('(orientation: portrait)', bool => {
			p.portrait = bool
			p.landscape = !bool
			p.orientation = bool ? 'portrait' : 'landscape'
			emit('portrait', p.portrait)
			emit('landscape', p.landscape)
			emit('orientation', p.orientation)
		})

		registerQuery('(any-pointer: coarse)', bool => {
			applyAndEmit('touch', bool)
			let formFactorChanged = applyAndEmit('formfactor', getFormfactor())
			if (formFactorChanged) applyFormFactor()
		})

		registerQuery('(hover: hover)', bool => {
			applyAndEmit('mouse', bool)
			applyAndEmit('input', bool ? 'mouse' : 'touch')
			let formFactorChanged = applyAndEmit('formfactor', getFormfactor())
			if (formFactorChanged) applyFormFactor()
		})

		function applyFormFactor() {
			applyAndEmit('tv',      p.formfactor === 'tv')
			applyAndEmit('phone',   p.formfactor === 'phone')
			applyAndEmit('tablet',  p.formfactor === 'tablet')
			applyAndEmit('hybrid',  p.formfactor === 'hybrid')
			applyAndEmit('laptop',  p.formfactor === 'laptop')
			applyAndEmit('desktop', p.formfactor === 'desktop')
		}

		function getFormfactor() {
			var shorterScreenSide = Math.min(window.screen.width, window.screen.height)
			// TODO: add 'iot' or some other form of window-less app or monitor-less hardware.
			if (p.tv)
				return 'tv'
			else if (p.touch && shorterScreenSide < 600)
				return 'phone'
			else if (p.touch && !p.mouse)
				return 'tablet'
			else if (p.touch && p.mouse)
				return 'hybrid'
			else if (p.battery)
				return 'laptop'
			else
				return 'desktop'
		}

	}

}