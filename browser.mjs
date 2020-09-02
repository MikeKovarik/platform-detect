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
p.chromeIos      = p.gui && ua.includes('CriOS/')
p.firefoxIos     = p.gui && ua.includes('FxiOS/')
p.edge           = p.edgeHtml || p.edgeChromium || p.edgeAndroid || p.edgeIos
p.samsungBrowser = p.gui && ua.includes('SamsungBrowser/')
p.opera          = p.gui && (ua.includes('Opera')   || ua.includes('OPR/'))
p.firefox        = p.gui && (ua.includes('Firefox') || p.firefoxIos)
p.chrome         = p.gui && (ua.includes('Chrome')  || p.chromeIos) && !p.edge && !p.opera && !p.samsungBrowser
p.safari         = (p.gui && ua.includes('Safari') && !p.chrome && !p.edge && !p.firefox && !p.opera && !p.samsungBrowser) || p.edgeIos || p.chromeIos || p.firefoxIos
p.ie = p.trident = p.gui && ua.includes('Trident')
p.blink          = (p.chrome && !p.chromeIos) || p.edgeChromium || p.edgeAndroid || p.samsungBrowser
p.webkit         = p.blink || p.safari
p.gecko          = p.firefox && !p.firefoxIos && !p.webkit && !p.safari // even android firefox now uses gecko