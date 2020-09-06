import fs from 'fs'
import notify from 'rollup-plugin-notify'
import babel from '@rollup/plugin-babel'



var pkg = JSON.parse(fs.readFileSync('package.json').toString())

export default {
	treeshake: false,
	input: 'index.mjs',
	plugins: [notify(), babel()],
	output: {
		file: `index.js`,
		format: 'umd',
		name: pkg.name,
		amd: {id: pkg.name},
	},
}