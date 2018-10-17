import {ua, hasWindow} from './util.mjs'
import {node} from './runtime.mjs'


// TODO: test user agent availability in worker
// TODO: figure out if these should be mutually exclusive (Tizen and Android are based on linux and have Linux in their user agents)
export var android    = hasWindow ? ua.includes('Android') : false // TODO
export var chromeos   = hasWindow ? ua.includes('CrOS') : false // TODO
export var tizen      = hasWindow ? ua.includes('Tizen') : false // TODO
export var ios        = hasWindow && /iPad|iPhone|iPod/.test(ua) && !window.MSStream || false
export var linuxBased = android || tizen
export var windows    = node ? process.platform === 'win32'  : ua.includes('Windows')
export var macos      = node ? process.platform === 'darwin' : ua.includes('Macintosh')
export var linux      = node ? process.platform === 'linux'  : ua.includes('Linux') && !linuxBased
