import {ua, hasWindow} from './util.mjs'


// These return true if their rendering engine is used to render the app.
// I.e: UWP apps are rendered by Edge's EdgeHTML, Electron/NWJS apps are rendered by Chromium.

// https://blogs.windows.com/msedgedev/2017/10/05/microsoft-edge-ios-android-developer/#49Fi4TfpgzHAwuXQ.97
export var edgeAndroid = hasWindow && ua.includes('EdgiOS/')
export var edgeIos     = hasWindow && ua.includes('EdgA/')
export var edgeWin     = hasWindow && ua.includes('Edge/')
// NOTE: Only returnin true for Edge (EdgeHtml) on windows. Android/iOs versions of Edge are powered by Webkit.
export var edge    = edgeWin
export var chrome  = hasWindow && ua.includes('Chrome') && !edge
export var safari  = hasWindow && ua.includes('Safari') // TODO: verify
export var firefox = undefined // TODO

// RENDERING & JS ENGINES

export var edgeHtml = edgeWin
export var webkit   = chrome || edgeAndroid || edgeIos || safarai
export var blink    = chrome || edgeAndroid || opera
//export var gecko    = firefox
