import rm from 'rimraf'
import path from 'path'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import globals from 'rollup-plugin-node-globals'

rm.sync(path.resolve('dist/**/*'))

const packageName = 'vue-select'
const pascalCasePackageName = 'VueSelect'

const input = 'src/index.ts'
const formats = ['es', 'umd', 'amd', 'cjs', 'iife', 'system']

const configs = []
formats.forEach(format => {
  const config = {
    input,
    output: {
      format,
      name: pascalCasePackageName,
      extend: true,
      exports: 'auto',
    },
  }

  configs.push({
    ...config,
    plugins: [ts(), resolve(), globals()],
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.js`),
    },
  })

  configs.push({
    ...config,
    plugins: [ts(), resolve(), globals(), terser()],
    output: {
      ...config.output,
      file: path.resolve(`dist/${packageName}.${format}.prod.js`),
    },
  })
})
export default configs
