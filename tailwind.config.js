module.exports = {
  important: true,
  purge: [
    './src/**/*.html',
    './src/**/*.js',
	'./src/**/*.jsx',
	'./src/**/*.ts',
	'./src/**/*.tsx',
	'./src/**/*.mjs',
	'./src/**/*.svelte',
	'./src/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
