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

```js
import platform from 'platform-detect'


// The script has no GUI to render content to.
// It only runs in console / terminal. (Might be a Node script or WebWorker)
platform.terminal
// App has a window, access to DOM. Can render GUI.
platform.gui

// Fully functional Node & core modules are available. (Might be an Electron / NWJ.JS app or a good old Node console script)
platform.node
// App has been loaded as a plain website in a browser.
platform.website
// App is served from web (could be website or PWA)
platform.web
// App is packaged, compiled or bundled and not served from the web. Could be UWP, Electron, NW.JS, Chrome App, Cordova, etc...
platform.packaged
// Script is executed inside Web Worker.
platform.worker

// App has been loaded as a PWA / UWP / Electron / NW.JS / Cordova app
platform.pwa
platform.uwp
platform.electron
platform.nwjs
platform.cordova
```

Or import just what you need

```js
import {windows, android, linux, macos, tizen} from 'platform-detect/os.mjs'
import {chrome, edge, safari} from 'platform-detect/browser.mjs'
import {inputType, mouse, touch, touchscreen, tabletMode, formFactor} from 'platform-detect/formfactor.mjs'

if (formFactor === 'tv' && tizen) {
  console.log(`I'm a Samsung Smart TV!`)
}

if (windows && edge && (uwp || pwa)) {
  console.log(`I should use Fluent Design System`)
} else if (android || chromeos) {
  console.log(`I should use Material Design Language`)
}

if (touchscreen) {
  console.log(`This is a device with touchscreen`)
  if (!touch) {
    console.log(`But mouse is currently the primary input type`)
    console.log('inputType', inputType) // 'mouse'
    console.log(`The device is likely in tablet mode (Surface Pro with attached keyboard)`)
    console.log('tabletMode', tabletMode) // true
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
import platform from './node_modules/platform-detect/index.js'
console.log(platform.pwa ? `I'm installed PWA app` : `I'm just a website`)
platform.on('orientation', orientation => console.log(orientation))
platform.on('tabletMode', tabletMode => console.log('the device', tabletMode ? 'entered' : 'left', 'tablet mode'))
</script>
```

## API

[Check out the demo for full table of APIs](http://htmlpreview.github.io/?https://github.com/MikeKovarik/platform-detect/blob/master/example.html)

## Ideas for the future

* battery (platform.hasBattery)
* battery saver mode (there's hardly any battery api, let alone battery saver in it)