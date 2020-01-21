import {p, ua} from './util.mjs'

export default p

// These return true if their rendering engine is used to render the app.
// I.e: UWP apps are rendered by Edge's EdgeHTML, Electron/NWJS apps are rendered by Chromium.

// https://blogs.windows.com/msedgedev/2017/10/05/microsoft-edge-ios-android-developer/#49Fi4TfpgzHAwuXQ.97
// https://www.whatismybrowser.com/guides/the-latest-user-agent/edge
// https://www.whatismybrowser.com/guides/the-latest-user-agent/chrome
// https://www.whatismybrowser.com/guides/the-latest-user-agent/safari
// https://www.whatismybrowser.com/guides/the-latest-user-agent/opera
// https://www.whatismybrowser.com/guides/the-latest-user-agent/firefox

p.edgeHtml       = p.gui && ua.includes('Edge/')
p.edgeChromium   = p.gui && ua.includes('Edg/')
p.edgeAndroid    = p.gui && ua.includes('EdgA/')
p.edgeIos        = p.gui && ua.includes('EdgiOS/')
p.edge           = p.edgeHtml || p.edgeChromium || p.edgeAndroid || p.edgeIos
p.chrome         = p.gui && ua.includes('Chrome') && !p.edge
p.firefox        = p.gui && (ua.includes('Firefox') || ua.includes('FxiOS/'))
p.opera          = p.gui && (ua.includes('Opera') || ua.includes('OPR/'))
p.safari         = p.gui && ua.includes('Safari') && !p.chrome && !p.edge && !p.firefox && !p.opera
p.ie = p.trident = p.gui && ua.includes('Trident')
p.blink          = p.chrome
p.webkit         = p.chrome || p.safari
p.gecko          = p.firefox && !p.webkit