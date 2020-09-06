import fs from 'fs'
import notify from 'rollup-plugin-notify'
import babel from '@rollup/plugin-babel'
import uglify from 'rollup-plugin-uglify-es'


var pkg = JSON.parse(fs.readFileSync('package.json').toString())

export default {
	treeshake: false,
	input: 'index.mjs',
	plugins: [notify(), babel(), uglify()],
	output: {
		file: `index.js`,
		format: 'umd',
		name: pkg.name,
		amd: {id: pkg.name},
	},
}