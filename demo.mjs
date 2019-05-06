import {registerQuery} from './util.mjs'

registerQuery('(pointer: coarse)', bool => {
	console.log('(pointer: coarse)', bool)
})

registerQuery('(pointer: fine)', bool => {
	console.log('(pointer: fine)', bool)
})

registerQuery('(hover: hover)', bool => {
	console.log('(hover: hover)', bool)
	//console.log('primary', bool ? 'mouse' : 'touch')
})


import platform from './index.mjs'
window.platform = platform
//let platform = window['platform-detect']
let $main = document.querySelector('main')
let $ua = document.querySelector('#ua')
let $additionalInfo = document.querySelector('#additional-info')
let $debuglog = document.querySelector('#debuglog')

// library's way of notifying you about changes (to input typu and formfactor change i.e. tablet mode)
platform.on('orientation', renderMainApi)
platform.on('input', renderMainApi)
platform.on('formFactor', renderMainApi)

// this is here only because we want to quickly emulate devices in chrome dev tools which changes
// useragent (which cannot be listened because it doesnt change in real world) and screen size
try {
	window.addEventListener('resize', debounce(renderMainApi, 150), {passive: true})
} catch(err) {
	window.addEventListener('resize', debounce(renderMainApi, 150))
}

function debounce(func, delay) {
	let timeout
	return function(...args) {
		clearTimeout(timeout)
		let context = this
		timeout = setTimeout(() => func.call(context, ...args), delay)
	}
}

function renderMainApi() {
	$ua.innerHTML = navigator.userAgent
	$main.innerHTML = ''
	renderToMain('OS', pick(platform, 'windows', 'android', 'chromeos', 'macos', 'ios', 'tizen', 'linux', 'linuxBased'))
	renderToMain('Runtime: specific', pick(platform, 'website', 'pwa', 'uwp', 'cordova', 'chromeapp', 'nwjs', 'electron'))
	renderToMain('Runtime: general', pick(platform, 'node', 'web', 'worker', 'serviceWorker'))
	renderToMain('Browser', pick(platform, 'chrome', 'safari', 'edge', /*'edgeWin', 'edgeIos', 'edgeAndroid',*/ 'firefox'))
	renderToMain('Rendering engine', pick(platform, 'edgeHtml', 'webkit', 'blink', 'gecko'))
	renderToMain('Form factor: Input', pick(platform, 'formFactor', 'input', 'mouse', 'touch', 'gamepad'))
	renderToMain('Form factor: General', pick(platform, 'phone', 'tablet', 'hybrid', 'laptop', 'desktop', 'tv', 'gameconsole'))
	renderToMain('Screen', pick(platform, 'pixelRatio', 'orientation', 'landscape', 'portrait'))
	renderToMain('Other', pick(platform, 'gui', 'terminal', 'csp', 'dev'))
}

function renderAdditionalInfo() {
	renderToAdd('Other Web APIs', {
		'platform': navigator.platform,
		'deviceMemory': window.clientInformation.deviceMemory,
		'hardwareConcurrency': window.clientInformation.hardwareConcurrency,
		'language': window.clientInformation.language,
		'languages': window.clientInformation.languages,
	})

	renderGamepadInfo()

	if (navigator.getBattery) {
		navigator.getBattery().then(battery => {
			battery.addEventListener('chargingchange', renderBattery)
			battery.addEventListener('levelchange', renderBattery)
			battery.addEventListener('chargingtimechange', renderBattery)
			battery.addEventListener('dischargingtimechange', renderBattery)
			let batteryDiv
			function renderBattery() {
				let bat = pick(battery, 'charging', 'chargingTime', 'dischargingTime', 'level')
				batteryDiv = renderToAdd('Battery', bat, batteryDiv)
			}
			renderBattery()
		})
	}
}

// simply calling navigator.getGamepads() switches xbox from mouse like hovering pointer to controller.
// we dont do this by default in the library because it would change behavior of the app/website. 
var gamepadList// = navigator.getGamepads()
var connectedGamepads = 0
window.addEventListener('gamepadconnected', e => {
	connectedGamepads++
	log('gamepadconnected')
	renderGamepadInfo()
})
window.addEventListener('gamepaddisconnected', e => {
	connectedGamepads--
	log('gamepaddisconnected')
	renderGamepadInfo()
})

function renderGamepadInfo() {
	var table = {
		'connected': connectedGamepads,
	}
	if (gamepadList) {
		table['0'] = gamepadList[0]
		table['1'] = gamepadList[1]
		table['2'] = gamepadList[2]
		table['3'] = gamepadList[3]
	}
	renderToAdd('Gamepad', table)
}

function renderToMain(name, data) {
	renderToDom($main, name, data)
}

function renderToAdd(name, data) {
	renderToDom($additionalInfo, name, data)
}

function renderToDom(container, name, data) {
	var id = name.toLowerCase().replace(/\W/g, '')
	var node = container.querySelector('#' + id) || document.createElement('div')
	node.id = id
	node.innerHTML = updateTableContent(name, data)
	if (!container.contains(node))
		container.appendChild(node)
}

function updateTableContent(name, object) {
	var output = `<h2>${name}</h2>`
	output += '<table>'
	for (let [key, value] of Object.entries(object)) {
		output += `
			<tr>
				<td>${key}</td>
				<td>${JSON.stringify(value)}</td>
			</tr>`
	}
	output += '</table>'
	return output
}

function pick(input, ...keys) {
	let output = {}
	for (let key of keys)
		output[key] = input[key]
	return output
}

function log(data) {
	$debuglog.innerHTML += '\n' + data
}

renderMainApi()
renderAdditionalInfo()
