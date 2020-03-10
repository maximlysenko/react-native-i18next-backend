import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"

export default {
	input: "src/asyncStorageBackend.js",
	output: {
		file: "dist/index.js",
		format: "es",
	},
	external: ["@react-native-community/async-storage"],
	plugins: [
		babel(),
		commonjs(),
	],
}
