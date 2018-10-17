import {ua, hasWindow} from './util.mjs'


// These return true if their rendering engine is used to render the app.
// I.e: UWP apps are rendered by Edge's EdgeHTML, Electron/NWJS apps are rendered by Chromium.

// https://blogs.windows.com/msedgedev/2017/10/05/microsoft-edge-ios-android-developer/#49Fi4TfpgzHAwuXQ.97
//export var edgeAndroid = hasWindow && ua.includes('EdgiOS/')
//export var edgeIos     = hasWindow && ua.includes('EdgA/')
//export var edgeWin     = hasWindow && ua.includes('Edge/')
//export var edge    = edgeWin
// NOTE: Only returnin true for Edge (EdgeHtml) on windows. Android/iOs versions of Edge are powered by Webkit.
export var edge    = hasWindow && ua.includes('Edge/')
export var chrome  = hasWindow && ua.includes('Chrome') && !edge
export var safari  = hasWindow && ua.includes('Safari') && !chrome && !edge
export var opera   = hasWindow && ua.includes('Opera')
export var firefox = hasWindow && ua.includes('Firefox')

// RENDERING & JS ENGINES

// TODO: all other android/ios browsers are webkit based.
export var edgeHtml = edge
export var blink    = chrome// || edgeAndroid
export var webkit   = blink || safari// || edgeIos
export var gecko    = firefox