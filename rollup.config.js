const rm = require('rimraf')
const path = require('path')
const ts = require('rollup-plugin-typescript2')
const { terser } = require('rollup-plugin-terser')
const resolve = require('@rollup/plugin-node-resolve').default
const globals = require('rollup-plugin-node-globals')
const vue = require('rollup-plugin-vue')
const copy = require('rollup-plugin-copy-watch')
const csso = require('csso')
const svg = require('rollup-plugin-svg')
const json = require('@rollup/plugin-json')
const babel = require('@rollup/plugin-babel')

rm.sync(path.resolve('dist/**/*'))

const packageName = 'vue-next-select'
const pascalCasePackageName = 'VueNextSelect'

const input = 'src/index.vue'
const formats = ['es', 'iife', 'cjs']

if (process.env.DEVELOPMENT) formats.splice(2)

const configs = []
formats.forEach(format => {
  const config = {
    input,
    external: ['vue'],
    plugins: [
      json(),
      vue(),
      ts(),
      svg({ base64: true }),
      resolve(),
      globals(),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.ts', '.vue'],
      }),
    ],
    output: {
      globals: {
        vue: 'Vue',
      },
      format,
      name: pascalCasePackageName,
      extend: true,
      exports: 'auto',
    },
  }

  configs.push({
    ...config,
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.js`),
    },
  })

  configs.push({
    ...config,
    plugins: [...config.plugins, terser()],
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.prod.js`),
    },
  })
})

const isWatchMode = JSON.parse(process.env.npm_config_argv).original.includes('--watch')
configs[configs.length - 1].plugins.push(
  copy({
    watch: isWatchMode ? ['src/index.css'] : false,
    copyOnce: isWatchMode === false,
    verbose: true,
    targets: [
      {
        src: 'src/index.css',
        dest: 'dist',
        rename: (name, extension) => `${name}.min.${extension}`,
        transform: content => csso.minify(content).css,
      },
      { src: 'src/index.css', dest: 'dist' },
    ],
  }),
)

module.exports = configs
