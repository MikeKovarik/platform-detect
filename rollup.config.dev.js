import fs from 'fs'


var pkg = JSON.parse(fs.readFileSync('package.json').toString())

export default {
	treeshake: false,
	input: 'index.mjs',
	output: {
		file: `index.js`,
		format: 'umd',
		name: pkg.name,
	},
}