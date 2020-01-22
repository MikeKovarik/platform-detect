import {p, ua} from './util.mjs'
import './runtime.mjs' // node

export default p

// TODO: test user agent availability in worker
// TODO: figure out if these should be mutually exclusive (Tizen and Android are based on linux and have Linux in their user agents)
p.android    = p.gui ? ua.includes('Android') : false
p.chromeos   = p.gui ? ua.includes('CrOS') : false
p.tizen      = p.gui ? ua.includes('Tizen') : false
p.ios        = p.gui && /iPad|iPhone|iPod/.test(ua) && !window.MSStream || false
p.linuxBased = p.android || p.tizen
p.windows    = p.node ? process.platform === 'win32'  : ua.includes('Windows')
p.macos      = p.node ? process.platform === 'darwin' : ua.includes('Macintosh')
p.linux      = p.node ? process.platform === 'linux'  : ua.includes('Linux') && !p.linuxBased && !p.macos
