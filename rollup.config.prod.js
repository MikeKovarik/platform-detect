import fs from 'fs'
import notify from 'rollup-plugin-notify'
import uglify from 'rollup-plugin-uglify-es'


var pkg = JSON.parse(fs.readFileSync('package.json').toString())

export default {
	treeshake: false,
	input: 'index.mjs',
	plugins: [notify(), uglify()],
	output: {
		file: `index.js`,
		format: 'umd',
		name: pkg.name,
		amd: {id: pkg.name},
	},
}