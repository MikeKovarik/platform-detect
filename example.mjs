// to run this code in Node.js use --experimental-modules flag
// 'node --experimental-modules example.mjs'

import platform from './index.mjs'


console.log('windows', platform.windows)
console.log('node', platform.node)
console.log('web', platform.web)
console.log('pwa', platform.pwa)
console.log('website', platform.website)
console.log('electron', platform.electron)

console.log('platform', platform.platform)