import fs from 'fs'
import notify from 'rollup-plugin-notify'


var pkg = JSON.parse(fs.readFileSync('package.json').toString())

export default {
	treeshake: false,
	input: 'index.mjs',
	plugins: [notify()],
	output: {
		file: `index.js`,
		format: 'umd',
		name: pkg.name,
	},
}