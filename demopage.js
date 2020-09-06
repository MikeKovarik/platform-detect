// important: dont use var - older browsers (samsung tizen tvs use arcane chromium)

// !!! this script was rewritten from ES6 to ES5 in order to work in older browsers.
// Do not use any fancy new syntax!

var platform = window['platform-detect']
var $main = document.querySelector('main')
var $ua = document.querySelector('#ua')
var $additionalInfo = document.querySelector('#additional-info')
var $debuglog = document.querySelector('#debuglog')

// way to force-reload on phones where you can't do ctr+shift+r.
$ua.addEventListener('click', function () {
	window.location.reload(true)
})

// library's way of notifying you about changes (to input typu and formfactor change i.e. tablet mode)
platform.on('orientation', renderMainApi)
platform.on('input', renderMainApi)
platform.on('formfactor', renderMainApi)

// this is here only because we want to quickly emulate devices in chrome dev tools which changes
// useragent (which cannot be listened because it doesnt change in real world) and screen size
try {
	window.addEventListener('resize', debounce(renderMainApi, 150), {passive: true})
} catch(err) {
	window.addEventListener('resize', debounce(renderMainApi, 150))
}

function debounce(func, delay) {
	var timeout
	//return function(...args) {
	return function() {
		clearTimeout(timeout)
		var context = this
		timeout = setTimeout(function () {
			func.call(context, arguments)
		}, delay)
	}
}

function renderMainApi() {
	$ua.innerHTML = navigator.userAgent
	$main.innerHTML = ''
	renderToMain('OS', pick(platform, 'windows', 'android', 'chromeos', 'macos', 'ios', 'tizen', 'linux', 'linuxBased'))
	renderToMain('Runtime: specific', pick(platform, 'website', 'pwa', 'uwp', 'cordova', 'nwjs', 'electron'))
	renderToMain('Runtime: general', pick(platform, 'node', 'web', 'worker', 'serviceWorker'))
	renderToMain('Browser', pick(platform, 'chrome', 'safari', 'edge', 'ie', 'firefox', 'samsungBrowser', 'edgeIos', 'edgeAndroid', 'firefoxIos', 'chromeIos'))
	renderToMain('Rendering engine', pick(platform, 'edgeHtml', 'webkit', 'blink', 'gecko', 'trident'))
	renderToMain('Form factor: Input', pick(platform, 'formfactor', 'input', 'mouse', 'touch', 'gamepad'))
	renderToMain('Form factor: General', pick(platform, 'phone', 'tablet', 'hybrid', 'laptop', 'desktop', 'tv', 'gameconsole'))
	renderToMain('Screen', pick(platform, 'pixelRatio', 'orientation', 'landscape', 'portrait'))
	renderToMain('Other', pick(platform, 'gui', 'terminal', 'csp', 'dev'))
}

function renderAdditionalInfo() {
	var otherApis = {
		platform: navigator.platform,
	}
	if (window.clientInformation) {
		otherApis.deviceMemory = window.clientInformation.deviceMemory
		otherApis.hardwareConcurrency = window.clientInformation.hardwareConcurrency
		otherApis.language = window.clientInformation.language
		otherApis.languages = window.clientInformation.languages
	}
	renderToAdd('Other Web APIs', otherApis)

	renderGamepadInfo()

	if (navigator.getBattery) {
		navigator.getBattery().then(function(battery) {
			battery.addEventListener('chargingchange', renderBattery)
			battery.addEventListener('levelchange', renderBattery)
			battery.addEventListener('chargingtimechange', renderBattery)
			battery.addEventListener('dischargingtimechange', renderBattery)
			var batteryDiv
			function renderBattery() {
				var bat = pick(battery, 'charging', 'chargingTime', 'dischargingTime', 'level')
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
window.addEventListener('gamepadconnected', function() {
	connectedGamepads++
	log('gamepadconnected')
	renderGamepadInfo()
})
window.addEventListener('gamepaddisconnected', function() {
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
	var output = '<h2>' + name + '</h2>'
	output += '<table>'
	Object.keys(object)
		.forEach(function(key) {
			var value = object[key]
			output += '<tr>'
			output += '</tr>'
			output += '<td>' + key + '</td>'
			output += '<td>' + JSON.stringify(value) + '</td>'
		})
	output += '</table>'
	return output
}

//function pick(input, ...keys) {
function pick() {
	var keys = Array.from(arguments)
	var input = keys.shift()
	var output = {}
	keys.forEach(function(key) {
		output[key] = input[key]
	})
	return output
}

function log(data) {
	$debuglog.innerHTML += '\n' + data
}

renderMainApi()
renderAdditionalInfo()
