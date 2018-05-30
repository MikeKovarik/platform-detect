# platform-detect

🃏 Minimalistic isomorphic library for detection of platform, runtime, APIs and more.

Detects Browsers, Node, Electron, NW.JS, PWA, UWP, Web workers and child processes.

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