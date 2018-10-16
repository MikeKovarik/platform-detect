# platform-detect

[![NPM](https://img.shields.io/npm/v/platform-detect.svg)](https://www.npmjs.com/package/platform-detect)
[![Dependency Status](https://david-dm.org/MikeKovarik/platform-detect.svg)](https://david-dm.org/MikeKovarik/platform-detect)
[![devDependency Status](https://david-dm.org/MikeKovarik/platform-detect/dev-status.svg)](https://david-dm.org/MikeKovarik/platform-detect#info=devDependencies)
[![Maintenance Status](http://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/MikeKovarik/platform-detect/pulse)
[![Known Vulnerabilities](https://snyk.io/test/github/MikeKovarik/platform-detect/badge.svg)](https://snyk.io/test/github/MikeKovarik/platform-detect)
[![Discord](https://img.shields.io/discord/419198557363634178.svg)](https://discord.gg/v2mUmeD)
[![Gitter](https://badges.gitter.im/MikeKovarik/platform-detect.svg)](https://gitter.im/MikeKovarik/platform-detect?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Maintainability](https://api.codeclimate.com/v1/badges/f4c0ee405c46126d6325/maintainability)](https://codeclimate.com/github/MikeKovarik/platform-detect/maintainability)

🃏 Minimalistic isomorphic library for detection of platform, runtime, APIs and more.

[Check out the demo](http://htmlpreview.github.io/?https://github.com/MikeKovarik/platform-detect/blob/master/example.html)

* No dependencies
* Small size ~3kB
* Split into multiple files *"import just what you need"*
* ... but also available as a bundle of all detectors.

## Detects

* **Systems**: Windows, Android, MacOsX, iOs, Linux
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


// The script has no window or GUI to render content to.
// It only runs in console / terminal. (Might be a Node script or WebWorker)
platform.console
// App has a window, access to DOM. Can render GUI.
platform.window

// Fully functional Node & core modules are available. (Might be an Electron / NWJ.JS app or a Node console script)
platform.node
// App has been loaded as a plain website in a browser.
platform.web
// Script is executed inside Web Worker.
platform.worker

// App has been loaded as a PWA / UWP / Electron / NW.JS / Cordova app
platform.pwa
platform.uwp
platform.electron
platform.nwjs
platform.cordova
```