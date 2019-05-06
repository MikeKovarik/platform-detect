# platform-detect

[![Build Status](https://travis-ci.org/MikeKovarik/platform-detect.svg)](https://travis-ci.org/MikeKovarik/platform-detect)
[![NPM](https://img.shields.io/npm/v/platform-detect.svg)](https://www.npmjs.com/package/platform-detect)
[![License](http://img.shields.io/npm/l/platform-detect.svg?style=flat)](LICENSE)
[![Dependency Status](https://david-dm.org/MikeKovarik/platform-detect.svg)](https://david-dm.org/MikeKovarik/platform-detect)
[![devDependency Status](https://david-dm.org/MikeKovarik/platform-detect/dev-status.svg)](https://david-dm.org/MikeKovarik/platform-detect#info=devDependencies)

[![Known Vulnerabilities](https://snyk.io/test/github/MikeKovarik/platform-detect/badge.svg)](https://snyk.io/test/github/MikeKovarik/platform-detect)
[![Maintainability](https://api.codeclimate.com/v1/badges/f4c0ee405c46126d6325/maintainability)](https://codeclimate.com/github/MikeKovarik/platform-detect/maintainability)
[![Discord](https://img.shields.io/discord/419198557363634178.svg)](https://discord.gg/v2mUmeD)
[![Gitter](https://badges.gitter.im/MikeKovarik/platform-detect.svg)](https://gitter.im/MikeKovarik/platform-detect?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

🃏 Minimalistic isomorphic library for detection of platform, runtime, APIs and more.

[Check out the demo](http://htmlpreview.github.io/?https://github.com/MikeKovarik/platform-detect/blob/master/example.html)

* No dependencies
* Small size ~3kB
* Split into multiple files *"import just what you need"*
* ... but also available as a bundle of all detectors.

## Detects

* **Systems**: Windows, Android, macOS, iOS, Linux
* **Runtime**
  * **general:** Node.js, browser, web worker
  * **specific:** website, PWA, Electron, NW.JS, console app, UWP (Windows Store)
* **Context**: has rendererer (i.e. has window); is console script (Node, web worker, NW background script, Electron main script); running on SDK build, with DEV context, Dev Tools open or debugger attached.
* **Form factor**: phone, tablet, desktop, tv
* **Screen**: touchscreen, input type (touch, mouse), tablet mode (whether keyboard is attached/detached on 2-in-1 like Surface Pro)


## Installation

```js
npm install platform-detect
```

## Usage

Import everything

```js
import platform from 'platform-detect'
// The script has no GUI to render content to.
// It only runs in console / terminal. (Might be a Node script or WebWorker)
platform.terminal
// App has a window, access to DOM. Can render GUI.
platform.gui
```

```js
var platform = require('platform-detect')
// Fully functional Node & core modules are available. (Might be an Electron / NWJS app or a good old Node console script)
platform.node
// App has been loaded as a plain website in a browser.
platform.website
// App is served from the web (could be website or PWA)
platform.web
// App is packaged, compiled or bundled and not served from the web. Could be UWP, Electron, NW.JS, Chrome App, Cordova, etc...
platform.packaged
// Script is executed inside Web Worker.
platform.worker
```

Or import just what you need

```js
import {windows, android, linux, macos, tizen} from 'platform-detect/os.mjs'
import {chrome, edge, safari} from 'platform-detect/browser.mjs'
import {input, mouse, touch, formFactor} from 'platform-detect/formfactor.mjs'

if (formFactor === 'tv' && tizen) {
  console.log(`I'm a Samsung Smart TV!`)
}

if (windows && edge && (uwp || pwa)) {
  console.log(`I should use Fluent Design System`)
} else if (android || chromeos) {
  console.log(`I should use Material Design Language`)
}

if (touch) {
  console.log(`I'm a device with touchscreen`)
  if (mouse) {
    console.log(`But I also have a mouse (it's the primary input type now)`)
    console.log(`I'm a laptop with touchscreen or a Surface Pro with attached keyboard`)
  } else {
    console.log(`Mouse is currently not the primary input type`)
    console.log(`I might be phone, tablet, or Surface Pro in tablet mode`)
  }
}

```

You can choose between the old UMD module.

```html
<script src="./node_modules/platform-detect/index.js"></script>
<script>
var platform = window['platform-detect']
console.log('pixel ratio of this device is', platform.pixelRatio)
</script>
```

Or the new ES Modules.

```html
<script type="module">
import platform from './node_modules/platform-detect/index.mjs'
console.log(platform.pwa ? `I'm installed PWA app` : `I'm just a website`)
platform.on('orientation', orientation => console.log(orientation))
</script>
```

## API

[Check out the demo for full table of APIs](http://htmlpreview.github.io/?https://github.com/MikeKovarik/platform-detect/blob/master/example.html)

By importing the `index.js` bundle you get all of the below. Or you can pick only certain file with the checks you need.

* **`terminal`** bool
<br>Script running in console or terminal (Node, Worker)
* **`gui`** bool
<br>App has a window, access to DOM. Can render GUI

### `runtime.mjs`

* **`node`** bool
<br>True when Node.js & core modules are available. (Node, Electron, NWJS app)
* **`pwa`** bool
<br>App has been loaded as a PWA with separate window. Not just a plain website.
* **`web`** bool
<br>App is served from the web (could be website or PWA)
* **`website`** bool
<br>App has been loaded as a plain website in a browser (and is not PWA)
* **`packaged`** bool
<br>App is packaged, compiled or bundled and not served from the web (UWP, Electron, NW.JS, Chrome App, Cordova, etc...)
* **`worker`** bool
<br>Script is executed inside Web Worker
* **`nwjs`** bool
* **`electron`** bool
* **`cordova`** bool
* **`uwp`** bool
* ~~**`chromeapp`** bool~~

### `formfactor.mjs`

* **`orientation`** string, event
<br>values: `portrait` or `landscape`
* **`portrait`** bool, event
* **`landscape`** bool, event
* **`formFactor`** string, event
<br>values: `phone`, `tablet`, `desktop` or `tv`
* **`pixelRatio`** float
<br>number of the scale of how many physical pixels are used to render one logical pixel.
* **`input`** string, event
<br>values: `mouse` or `touch`
<br>Current primary input type. It's watched and may change when keyboard attached/detached on hybrid devices.
* **`touch`** bool
<br>Always `true` if the device has a touchscreen, regardless of current primary input type, tablet mode, etc...
* **`mouse`** bool, event
<br>True when primary input type is mouse (desktops, laptops, hybrid with attached keyboards)
* **`gamepad`** bool

### `browser.mjs`

Browsers:

* **`edge`** bool
* **`chrome`** bool
* **`safari`** bool
* **`opera`** bool
* **`firefox`** bool

Rendering engines:

* **`edgeHtml`** bool
* **`blink`** bool
* **`webkit`** bool
* **`gecko`** bool

### `os.mjs`

* **`android`** bool
* **`chromeos`** bool
* **`tizen`** bool
* **`ios`** bool
* **`linuxBased`** bool
* **`windows`** bool
* **`macos`** bool
* **`linux`** bool

### Events

Some aspects can change during app's life. You can listen to these changes with EventEmitter-like api.

```js
platform.on('orientation', orientation => console.log('orientation changed': orientation))

platform.on('input', input => {
	if (input === 'mouse)
		console.log('keyboard attached')
	else
		console.log('tablet mode')
})
```

## TO-DOs & Ideas for the future

* even better documentation
* battery (platform.hasBattery)
* battery saver mode (there's hardly any battery api, let alone battery saver in it)