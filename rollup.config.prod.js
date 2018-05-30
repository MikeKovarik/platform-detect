import fs from 'fs'
import uglify from 'rollup-plugin-uglify-es'


var pkg = JSON.parse(fs.readFileSync('package.json').toString())

export default {
	treeshake: false,
	input: 'index.mjs',
	plugins: [uglify()],
	output: {
		file: `index.js`,
		format: 'umd',
		name: pkg.name,
	},
}