!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?module.exports=o():"function"==typeof define&&define.amd?define(o):e["platform-detect"]=o()}(this,function(){"use strict";var e="undefined"!=typeof navigator&&"undefined"!=typeof window;if(e&&"undefined"!=typeof nw)try{nw.Window.get()}catch(o){e=!1}var o=!e,n=e?navigator.userAgent:void 0,s="undefined"!=typeof process&&!!process.versions&&!!process.versions.node,d=e&&window.matchMedia("(display-mode: standalone)").matches,i="undefined"!=typeof Windows&&"undefined"!=typeof MSApp,r=!(!s||!process.versions.nw),t=!(!s||!process.versions.electron),c=e&&!!window.cordova,p=!(s||d||i||r||t||c),a=(!e&&"undefined"!=typeof self&&!!self.importScripts&&self.close,s?"win32"===process.platform:n.includes("Windows")),f=(s&&process.platform,s?process.platform:n.includes("Macintosh"),e&&n.includes("CrOS")),u=e&&n.includes("Android"),l=e&&n.includes("Edge/"),w=e&&n.includes("Chrome")&&!n.includes("Edge/"),v=e&&n.includes("Safari"),m="undefined"!=typeof navigator&&navigator.maxTouchPoints>0,h=i||void 0,y=r&&"sdk"===process.versions["nw-flavor"]||t&&process.execPath.replace(/\\/g,"/").includes("node_modules/electron/");return{windows:a,android:u,chromeos:f,edge:l,chrome:w,safari:v,node:s,web:p,pwa:d,uwp:i,cordova:c,chromeapp:void 0,nwjs:r,electron:t,nw:r,touch:m,hasWindow:e,isConsole:o,window:e,console:o,csp:h,sdk:y,dev:y}});
