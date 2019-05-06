var ViewManagement = Windows.UI.ViewManagement
var uiViewSettings = ViewManagement.UIViewSettings.getForCurrentView()
var systemNavigationManager = Windows.UI.Core.SystemNavigationManager.getForCurrentView()
var uiSettings = new ViewManagement.UISettings()
var {UserInteractionMode, UIColorType} = ViewManagement

var $log = document.querySelector('#log')
function log(text) {
	$log.textContent += text + '\n'
}


var platform = {}

function determineTheme() {
	var color = uiSettings.getColorValue(UIColorType.background)
	var isDark = (color.r + color.g + color.b) < 382
	platform.theme = isDark ? 'dark' : 'light'
}
function determineInputType() {
	console.log('determineInputType')
	platform.tabletMode = uiViewSettings.userInteractionMode === UserInteractionMode.touch
	platform.inputType = platform.tabletMode ? 'touch' : 'mouse'
}

determineTheme()
determineInputType()

var $status = document.querySelector('#status')
function renderStatus() {
	determineTheme()
	determineInputType()
	$status.textContent = `STATUS
	theme: ${platform.theme}
	inputType: ${platform.inputType}
	advancedEffectsEnabled: ${uiSettings.advancedEffectsEnabled}
	animationsEnabled: ${uiSettings.animationsEnabled}
	`
	document.body.setAttribute(platform.theme, '')
	document.body.removeAttribute(platform.theme === 'dark' ? 'light' : 'dark')
}

renderStatus()
uiSettings.addEventListener('colorvalueschanged', renderStatus)
uiSettings.addEventListener('advancedeffectsenabledchanged', renderStatus)
window.addEventListener('interactionmodechanged', renderStatus)


// listens to resize and creates custom event for tablet mode change
var lastValue = uiViewSettings.userInteractionMode
function updateInteractionMode() {
	if (lastValue !== uiViewSettings.userInteractionMode) {
		var event = new Event('interactionmodechanged')
		window.dispatchEvent(event)
	}
	lastValue = uiViewSettings.userInteractionMode
}
var resizeTimeout
window.addEventListener('resize', () => {
	console.log('resize')
	clearTimeout(resizeTimeout)
	resizeTimeout = setTimeout(updateInteractionMode, 200)
})


/////////////////////////////// COLOR ////////////////////////////////////


var $colors = document.querySelector('#colors')
function logColor(name, color) {
	var color = uiSettings.getColorValue(UIColorType[name])
	var r = color.r
	var g = color.g
	var b = color.b
	var hex = rgbToHex(r, g, b)
	$colors.innerHTML += `
	<div>
		<span class="color" style="background-color: ${hex}"></span>
		${name}: ${r},${g},${b}
	</div>`
}

uiSettings.addEventListener('colorvalueschanged', function() {
	console.log('colorvalueschanged listener')
	logAllColors()
})

logAllColors()

function logAllColors() {
	$colors.innerHTML = ''
	logColor('accentLight3');
	logColor('accentLight2');
	logColor('accentLight1');
	logColor('accent');
	logColor('accentDark1');
	logColor('accentDark2');
	logColor('accentDark3');
	logColor('background');
	logColor('foreground');

	var color = uiSettings.getColorValue(ViewManagement.UIColorType.background)
	var isDark = (color.r + color.g + color.b) < 382
	var theme = isDark ? 'dark' : 'light'
	log(`${color.r},${color.g},${color.b} | ${theme}`)
	//logColor('complement');
}


function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



/////////////////////////////// ELSE ////////////////////////////////////


uiSettings.addEventListener('advancedeffectsenabledchanged', function() {
	console.log('advancedeffectsenabledchanged', uiSettings.advancedEffectsEnabled)
	log(`advancedEffectsEnabled: ${uiSettings.advancedEffectsEnabled}`)
});


/////////////////// NAVIGATION /////////////////////////////////


var nativeBackButtonVisible = false
function showNativeBackButton() {
	systemNavigationManager.appViewBackButtonVisibility = Windows.UI.Core.AppViewBackButtonVisibility.visible
	nativeBackButtonVisible = true
}
function hideNativeBackButton() {
	systemNavigationManager.appViewBackButtonVisibility = Windows.UI.Core.AppViewBackButtonVisibility.collapsed
	nativeBackButtonVisible = false
}

var $now = document.querySelector('#now')

//window.addEventListener('popstate', updateLocation)
window.addEventListener('hashchange', updateLocation)
function updateLocation(e) {
	if (nativeBackButtonVisible && location.hash === '')
		hideNativeBackButton()
	else if (!nativeBackButtonVisible && location.hash !== '')
		showNativeBackButton()
	$now.innerText = `${history.length} ${location.hash}`
}


systemNavigationManager.addEventListener('backrequested', function(e) {
	//console.log('back requested', history.length, document.referrer == '', e)
	// checking for change in location to determine wheter there is location to go back to. history.length is unreliable
	var prevUrl = location.href
	history.back()
	// if we returned to location (different than current one), prevent windows from closing app
	if (location.href != prevUrl)
		e.handled = true
	$now.innerText = `${history.length} ${location.hash}`
})


//console.log('ViewManagement.UIElementType', ViewManagement.UIElementType)
//console.log('ViewManagement.UIColorType', ViewManagement.UIColorType)

var userInteractionMode = uiViewSettings.userInteractionMode;
if (userInteractionMode == ViewManagement.UserInteractionMode.mouse) {
	console.log('userInteractionMode', 'mouse');
}
if (userInteractionMode == ViewManagement.UserInteractionMode.touch) {
	console.log('userInteractionMode', 'touch');
}



