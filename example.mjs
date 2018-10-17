//import {node, pwa, website, electron} from 'platform-detect/runtime.mjs'
//import {windows} from 'platform-detect/os.mjs'
//import * as platform from 'platform-detect'
import {node, pwa, website, electron} from './runtime.mjs'
import {windows} from './os.mjs'
import * as platform from './index.mjs'


console.log('windows', windows)
console.log('node', node)
console.log('pwa', pwa)
console.log('website', website)
console.log('electron', electron)

console.log('platform', platform)