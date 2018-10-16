import {ua, hasWindow} from './util.mjs'
import {node} from './runtime.mjs'


// TODO: figure out if these should be mutually exclusive (Tizen and Android are based on linux and have Linux in their user agents)
export var windows  = node ? process.platform === 'win32'  : ua.includes('Windows')
export var macosx   = node ? process.platform === 'darwin' : ua.includes('Macintosh')
export var linux    = node ? process.platform === 'linux'  : ua.includes('Linux') // TODO: detect in browser properly. NOTE: Android and Tizen are based on Linux and will result in true
export var ios      = false // TODO
export var chromeos = hasWindow ? ua.includes('CrOS') : false // TODO
export var android  = hasWindow ? ua.includes('Android') : false // TODO
export var tizen    = hasWindow ? ua.includes('Tizen') : false // TODO
