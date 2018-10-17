import * as util from './util.mjs'
import * as runtime from './runtime.mjs'
import * as os from './os.mjs'
import * as browser from './browser.mjs'
import * as formfactor from './formfactor.mjs'
import * as etc from './etc.mjs'

export default Object.assign({}, util, runtime, os, browser, formfactor, etc)