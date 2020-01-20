import {p, ua} from './util.mjs'

export default p

// These return true if their rendering engine is used to render the app.
// I.e: UWP apps are rendered by Edge's EdgeHTML, Electron/NWJS apps are rendered by Chromium.

// https://blogs.windows.com/msedgedev/2017/10/05/microsoft-edge-ios-android-developer/#49Fi4TfpgzHAwuXQ.97
//p.edgeAndroid = p.gui && ua.includes('EdgiOS/')
//p.edgeIos     = p.gui && ua.includes('EdgA/')
//p.edgeWin     = p.gui && ua.includes('Edge/')
//p.edge    = edgeWin
// NOTE: Only returnin true for Edge (EdgeHtml) on windows. Android/iOs versions of Edge are powered by Webkit.
p.edge    = p.gui && ua.includes('Edge/')
p.ie      = p.gui && ua.includes('Trident')
p.chrome  = p.gui && ua.includes('Chrome') && !p.edge
p.safari  = p.gui && ua.includes('Safari') && !p.chrome && !p.edge
p.opera   = p.gui && ua.includes('Opera')
p.firefox = p.gui && ua.includes('Firefox')

// RENDERING & JS ENGINES

// TODO: all other android/ios browsers are webkit based.
p.edgeHtml = p.edge
p.blink    = p.chrome// || edgeAndroid
p.webkit   = p.blink || p.safari// || edgeIos
p.gecko    = p.firefox